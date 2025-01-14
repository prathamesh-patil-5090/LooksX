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
      <strong>${place.placeName || 'Unnamed Shop'}</strong><br>
      ${fullAddress}<br>
      Distance: ${place.distance || 'N/A'} m<br>
      <button class="book-btn" data-shop='${encodeURIComponent(JSON.stringify({
        shopName: place.placeName || '',
        address: fullAddress
      }))}'>
        📅 Book Appointment
      </button>
      <button class="redirect-btn" onclick="window.open('https://www.mappls.com/${place.eLoc}', '_blank')">
        🔗 Open in Mappls
      </button>
    `;
    
    div.appendChild(info);

    // Attach event listener to the Book button
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
      const response = await fetch('https://looksx-backend.onrender.com/api/appointments/', {
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
