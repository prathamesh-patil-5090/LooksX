import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';
import './Map.css';

const Map = () => {
  const { user, token } = useUser(); // Include 'token'
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    service: '',
    appointmentDate: '',
  });

  // Add state for OAuth token
  const [oauthToken, setOauthToken] = useState(null);

  // Add state to track if the side panel is visible on mobile
  const [mobilePanelVisible, setMobilePanelVisible] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Function to fetch OAuth token
    const fetchOAuthToken = async () => {
      try {
        const response = await fetch('https://outpost.mapmyindia.com/api/security/oauth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.REACT_APP_MAPPLS_CLIENT_ID,
            client_secret: process.env.REACT_APP_MAPPLS_CLIENT_SECRET,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch OAuth token');
        }

        const data = await response.json();
        if (mounted) {
          setOauthToken(data.access_token);
        }
      } catch (error) {
        console.error('Error fetching OAuth token:', error);
      }
    };

    // Function to load Mappls scripts
    const loadMapScripts = () => {
      return new Promise((resolve, reject) => {
        if (!oauthToken) {
          reject(new Error('OAuth token is not available'));
          return;
        }

        // Load main map script with token if required
        const mapScript = document.createElement('script');
        mapScript.src = `https://apis.mappls.com/advancedmaps/api/${oauthToken}/map_sdk?layer=vector&v=3.0`;
        mapScript.async = true;

        mapScript.onload = () => {
          // Load plugin script after map script loads
          const pluginScript = document.createElement('script');
          pluginScript.src = `https://apis.mappls.com/advancedmaps/api/${oauthToken}/map_sdk_plugins?v=3.0`;
          pluginScript.async = true;

          pluginScript.onload = () => {
            if (mounted) {
              resolve();
            }
          };
          pluginScript.onerror = reject;
          document.body.appendChild(pluginScript);
        };
        mapScript.onerror = reject;
        document.body.appendChild(mapScript);
      });
    };

    const initializeMap = () => {
      try {
        const map = new window.mappls.Map('map', {
          center: [28.09, 78.3],
          zoom: 5
        });

        // Store map reference
        window.map = map;

        // Wait for map to load before getting location
        map.on('load', () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                try {
                  map.setCenter([lat, lng]);
                  map.setZoom(13);

                  const options = {
                    divId: 'nearby_search',
                    map: map,
                    keywords: 'barber shop',
                    location: [lat, lng],
                    refLocation: `${lat},${lng}`,
                    fitbounds: true,
                    icon: {
                      url: 'https://apis.mappls.com/map_v3/1.png'
                    }
                  };

                  if (window.mappls && typeof window.mappls.nearby === 'function') {
                    window.mappls.nearby(options, data => {
                      if (mounted && data && data.data) {
                        data.data = filterShops(data.data);
                        saveShopsData(data.data);
                        
                        const container = document.getElementById('nearby_search');
                        container.innerHTML = '<h3>Nearby Barber Shops</h3>';
                        
                        data.data.forEach(place => {
                          container.appendChild(createShopListItem(place));
                        });
                      }
                    });
                  }
                } catch (error) {
                  console.error('Error in map initialization:', error);
                }
              },
              error => {
                console.error('Geolocation error:', error);
                if (mounted) {
                  initNearbySearch([28.632735, 77.219696]);
                }
              }
            );
          }
        });
      } catch (error) {
        console.error('Map initialization error:', error);
      }
    };

    const setupMap = async () => {
      await fetchOAuthToken();
      await loadMapScripts();
      initializeMap();
    };

    setupMap()
      .catch(error => {
        console.error('Error setting up map:', error);
      });

    return () => {
      mounted = false;
      delete window.map;
      delete window.initMap1;
      const scripts = document.querySelectorAll('script[src*="mappls"]');
      scripts.forEach(script => script.remove());
    };
  }, [oauthToken]);

  // Add useEffect for the hamburger menu functionality
  useEffect(() => {
    const addHamburgerMenu = () => {
      // Create hamburger menu button for mobile view
      const container = document.querySelector('.container');
      if (!container) return;
      
      // Check if a hamburger already exists
      if (document.querySelector('.hamburger-menu')) return;
      
      const hamburger = document.createElement('button');
      hamburger.className = 'hamburger-menu';
      hamburger.setAttribute('aria-label', 'Toggle shop list');
      hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
      `;
      
      container.appendChild(hamburger);
      
      // Add click handler
      hamburger.addEventListener('click', () => {
        const nearbySearch = document.getElementById('nearby_search');
        if (nearbySearch) {
          // Toggle the visibility
          if (nearbySearch.classList.contains('hidden')) {
            nearbySearch.classList.remove('hidden');
            setMobilePanelVisible(true);
          } else {
            nearbySearch.classList.add('hidden');
            setMobilePanelVisible(false);
          }
          
          // Update hamburger appearance
          hamburger.classList.toggle('active');
          
          // Resize map to adjust to new layout
          if (window.map) {
            setTimeout(() => {
              window.map.resize();
            }, 300); // Wait for transition to complete
          }
        }
      });
    };
    
    // Wait a bit for the DOM to be ready
    setTimeout(addHamburgerMenu, 1000);
    
    return () => {
      const hamburger = document.querySelector('.hamburger-menu');
      if (hamburger) hamburger.remove();
    };
  }, []);

  const SHOPS_STORAGE_KEY = 'barber_shops';
  
  function saveShopsData(shops) {
    localStorage.setItem(SHOPS_STORAGE_KEY, JSON.stringify(shops));
  }

  function getSavedShops() {
    const saved = localStorage.getItem(SHOPS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  function initNearbySearch(location) {
    const [lat, lng] = location;
    const options = {
      divId: 'nearby_search',
      map: window.map,
      keywords: 'barber shop',
      location: [lat, lng], // Changed back to array
      refLocation: location.join(','),
      fitbounds: true,
      icon: {
        url: 'https://apis.mappls.com/map_v3/1.png'
      },
      click_callback: (d) => {
        if (d) {
          const l = `Name: ${d.placeName}\nAddress: ${d.placeAddress}\neLoc: ${d.eLoc}`;
          alert(l);
        }
      }
    };

    window.mappls.nearby(options, (data) => {
      if (data && data.data) {
        data.data = filterShops(data.data);
        saveShopsData(data.data);
        
        const container = document.getElementById('nearby_search');
        container.innerHTML = '<h3>Nearby Barber Shops</h3>';
        
        data.data.forEach(place => {
          container.appendChild(createShopListItem(place));
        });
      }
    });
  }

  function filterShops(shops) {
    const excludeTerms = ['beauty', 'makeup', 'parlour', 'salon'];
    return shops.filter(place => {
      if (!place || !place.keywords) return true;
      const keywords = String(place.keywords).toLowerCase();
      return !excludeTerms.some(term => keywords.includes(term));
    });
  }

  function createShopListItem(place) {
    const div = document.createElement('div');
    div.className = 'shop-item';
    
    div.setAttribute('data-eloc', place.eLoc);
    
    const info = document.createElement('div');
    info.className = 'shop-info';
    
    // Use the full address string
    const fullAddress = place.placeAddress || 'No address';

    info.innerHTML = `
      <div class="shop-header">
        <strong class="shop-name">${place.placeName || 'Unnamed Shop'}</strong>
        <div class="shop-actions">
          <button class="toggle-shop-btn" title="Expand/Collapse">▼</button>
          <button class="close-shop-btn" title="Close">&times;</button>
        </div>
      </div>
      <div class="shop-details">
        ${fullAddress}<br>
        Distance: ${place.distance || 'N/A'} m<br>
        <div class="shop-buttons">
          <button class="book-btn" data-shop='${encodeURIComponent(JSON.stringify({
            shopName: place.placeName || '',
            address: fullAddress
          }))}'>
            📅 Book Appointment
          </button>
          <button class="redirect-btn" onclick="window.open('https://www.mappls.com/${place.eLoc}', '_blank')">
            🔗 Open in Mappls
          </button>
        </div>
      </div>
    `;
    
    div.appendChild(info);

    // Attach event listeners after the element is added to the DOM
    setTimeout(() => {
      const bookBtn = info.querySelector('.book-btn');
      if (bookBtn) {
        bookBtn.addEventListener('click', () => {
          const encoded = bookBtn.getAttribute('data-shop');
          if (!encoded) return;
          const details = JSON.parse(decodeURIComponent(encoded));
          handleBookClick(details);
        });
      }

      // Add event listener for the close button
      const closeBtn = info.querySelector('.close-shop-btn');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          div.remove(); // Remove the shop item
        });
      }

      // Add event listener for the toggle button
      const toggleBtn = info.querySelector('.toggle-shop-btn');
      const shopDetails = info.querySelector('.shop-details');
      if (toggleBtn && shopDetails) {
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          
          // Toggle visibility of details
          const isCollapsed = shopDetails.classList.toggle('collapsed');
          
          // Update the toggle button icon
          toggleBtn.textContent = isCollapsed ? '▶' : '▼';
          toggleBtn.title = isCollapsed ? 'Expand' : 'Collapse';
          
          // Store the state in the button element
          toggleBtn.setAttribute('data-collapsed', isCollapsed);
        });
      }
    }, 0);

    return div;
  }

  function handleBookClick(shopDetails) {
    if (!user) {
      alert('Please login to book an appointment');
      return;
    }
    setSelectedShop(shopDetails);
    setShowAppointmentModal(true);
  }

  // Add this new function to handle appointment booking
  const bookAppointment = async (shopDetails) => {
    if (!user) {
      alert('Please login to book an appointment');
      return;
    }
    
    setSelectedShop(shopDetails);
    setShowAppointmentModal(true);
  }

  // Add this function to handle form submission
  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    
    // Make sure we have a valid name for the appointment
    const userName = user?.name || user?.email;
    if (!userName) {
      alert('Please update your profile with a name before booking.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8800/api/appointments/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Use token from context
        },
        body: JSON.stringify({
          name: userName,
          address: selectedShop.address,  // Use the full address string
          appointmentDate: appointmentData.appointmentDate,
          service: appointmentData.service,
          shopName: selectedShop.shopName
        })
      });

      if (response.ok) {
        alert('Appointment booked successfully!');
        setShowAppointmentModal(false);
      } else {
        alert('Failed to book appointment');
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment');
    }
  };

  function showCustomAlert(message, okCallback) {
    const overlay = document.getElementById('customAlertOverlay');
    const msgDiv = document.getElementById('customAlertMessage');
    const okBtn = document.getElementById('okBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    msgDiv.textContent = message;
    overlay.style.display = 'flex';

    okBtn.onclick = () => {
      overlay.style.display = 'none';
      okCallback();
    };
    
    cancelBtn.onclick = () => {
      overlay.style.display = 'none';
    };
  }

  return (
    <>
      <div className="container">
        <div id="map"></div>
        <div id="nearby_search"></div>
      </div>
      
      <style jsx="true">{`
        .container {
          display: flex;
          position: relative;
          height: 100vh;
          width: 100%;
        }
        
        #map {
          flex: 1;
          height: 100%;
        }
        
        #nearby_search {
          width: 350px;
          height: 100%;
          overflow-y: auto;
          padding: 10px;
          background-color: white;
          box-shadow: -2px 0 5px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, opacity 0.3s ease;
          padding-top: 60px; /* Add padding to the top to avoid navbar overlap */
        }
        
        /* Nearby search heading styling - removed sticky positioning */
        #nearby_search h3 {
          background: white;
          padding: 10px 0;
          margin-top: 0;
          margin-bottom: 15px;
          border-bottom: 1px solid #eee;
        }
        
        /* Hamburger menu styling - repositioned to bottom-right */
        .hamburger-menu {
          display: none;
          position: absolute;
          bottom: 15px;  /* Changed from top to bottom */
          right: 15px;
          z-index: 1000;
          background-color: white;
          border: none;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          width: 40px;
          height: 40px;
          padding: 5px;
          cursor: pointer;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }
        
        .hamburger-menu span {
          display: block;
          width: 25px;
          height: 3px;
          background-color: #333;
          transition: all 0.3s ease;
        }
        
        .hamburger-menu.active span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger-menu.active span:nth-child(2) {
          opacity: 0;
        }
        
        .hamburger-menu.active span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        .shop-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          width: 100%;
        }
        
        .shop-actions {
          display: flex;
          gap: 8px;
        }
        
        .toggle-shop-btn,
        .close-shop-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: #666;
          padding: 0 5px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .toggle-shop-btn:hover,
        .close-shop-btn:hover {
          color: #000;
        }
        
        .shop-details.collapsed {
          display: none;
        }
        
        .shop-item {
          border-bottom: 1px solid #ddd;
          margin-bottom: 10px;
          padding-bottom: 10px;
        }
        
        .shop-header {
          border-bottom: none;
        }
        
        .toggle-shop-btn {
          display: block; /* Show toggle in all modes */
        }
        
        .shop-name {
          font-size: 1.1rem;
          margin-right: 10px;
          flex-grow: 1;
        }
        
        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }
          
          #map {
            height: 100%;
            width: 100%;
          }
          
          #nearby_search {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 40%;
            max-height: 50vh;
            z-index: 10;
            box-shadow: 0 -2px 5px rgba(0,0,0,0.2);
            border-top-left-radius: 15px;
            border-top-right-radius: 15px;
            padding-bottom: 60px; /* Add padding to avoid content being hidden by hamburger button */
            padding-top: 20px; /* Less padding needed on top for mobile view */
          }
          
          #nearby_search.hidden {
            transform: translateY(calc(100% - 40px));
            opacity: 0.9;
          }
          
          #nearby_search::before {
            content: '';
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 5px;
            background-color: #ccc;
            border-radius: 5px;
          }
          
          .hamburger-menu {
            display: flex;
            bottom: 75px; /* Position it above the panel when collapsed */
            right: 15px;
            z-index: 1001; /* Make sure it's above the map controls */
          }
          
          /* Create a semi-transparent background behind the hamburger to improve visibility */
          .hamburger-menu::before {
            content: '';
            position: absolute;
            top: -5px;
            left: -5px;
            right: -5px;
            bottom: -5px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            z-index: -1;
          }
          
          .shop-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 10px;
          }
          
          .book-btn,
          .redirect-btn {
            width: 100%;
            padding: 10px;
          }
        }
        
        @media (min-width: 769px) {
          .shop-buttons {
            display: flex;
            gap: 10px;
            margin-top: 10px;
          }
          
          .book-btn,
          .redirect-btn {
            padding: 6px 12px;
          }

          /* Container adjustments for desktop */
          .container {
            padding-top: 60px; /* Add padding to account for fixed navbar */
            height: calc(100vh - 60px); /* Adjust height to account for navbar */
          }
          
          /* Ensure first shop is fully visible */
          #nearby_search {
            margin-top: 0;
          }
        }
      `}</style>
      
      {showAppointmentModal && (
        <div className="appointment-modal-overlay">
          <div className="appointment-modal">
            <h2>Book Appointment at {selectedShop?.shopName}</h2>
            <form onSubmit={handleAppointmentSubmit}>
              <select
                value={appointmentData.service}
                onChange={(e) => setAppointmentData({...appointmentData, service: e.target.value})}
                required
              >
                <option value="">Select Service</option>
                <option value="Haircut">Haircut</option>
                <option value="Shave">Shave</option>
                <option value="Hair Color">Hair Color</option>
                <option value="Facial">Facial</option>
              </select>
              
              <input
                type="datetime-local"
                value={appointmentData.appointmentDate}
                onChange={(e) => setAppointmentData({...appointmentData, appointmentDate: e.target.value})}
                required
              />
              
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowAppointmentModal(false)}>Cancel</button>
                <button type="submit">Book</button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div id="customAlertOverlay" className="modal-overlay">
        <div className="modal" id="customAlertModal">
          <div id="customAlertMessage"></div>
          <div className="modal-buttons">
            <button id="cancelBtn">Cancel</button>
            <button id="okBtn">OK</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
