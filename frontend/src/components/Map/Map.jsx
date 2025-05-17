import React, { useEffect, useState, useRef } from 'react'; // Added useRef
import { useUser } from '../../context/UserContext';
import './Map.css';
import { bookNewAppointment } from '../../services/appointmentService';
import { loadMapplsScripts, initializeMapAndSearch } from '../../services/mapService'; // Import map services

const Map = () => {
  const { user, token } = useUser();
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    service: '',
    appointmentDate: '',
  });
  const [mobilePanelVisible, setMobilePanelVisible] = useState(true);
  const mapInstanceRef = useRef(null); // To store map instance

  useEffect(() => {
    let mounted = true;

    const setupMap = async () => {
      try {
        await loadMapplsScripts();
        if (mounted && !mapInstanceRef.current) { // Initialize map only if not already initialized
          const map = initializeMapAndSearch(
            'map', // map DOM ID
            'nearby_search', // nearby search results DOM ID
            (shopsData) => { // onShopsLoaded callback
              if (mounted) {
                const filteredShops = filterShops(shopsData);
                saveShopsData(filteredShops);
                renderShopList(filteredShops);
              }
            },
            (shopDetailsFromMappls) => { // onShopClick callback from Mappls internal click
                // This is Mappls' own click callback, often used for info windows.
                // We handle our booking click via event delegation on custom buttons.
                console.log("Mappls shop clicked (internal):", shopDetailsFromMappls);
            }
          );
          mapInstanceRef.current = map;
        }
      } catch (error) {
        console.error('Error setting up Mappls map:', error);
        alert('Could not load map services. Please try refreshing the page.');
      }
    };

    setupMap();

    return () => {
      mounted = false;
      // Clean up map instance if it exists
      if (mapInstanceRef.current && typeof mapInstanceRef.current.destroy === 'function') {
        // Mappls might not have a destroy method, or it might be named differently.
        // This is a common pattern, but check Mappls docs for specific cleanup.
        // For now, we'll rely on removing scripts and DOM elements.
        console.log("Attempting to clean up map instance (if destroy method exists)");
      }
      mapInstanceRef.current = null; 

      // Remove Mappls scripts by ID
      const mapSdkScript = document.getElementById('mappls-map-sdk');
      if (mapSdkScript) mapSdkScript.remove();
      const pluginSdkScript = document.getElementById('mappls-map-sdk-plugins');
      if (pluginSdkScript) pluginSdkScript.remove();
      
      // Clear global Mappls objects if necessary, though this can be risky
      // delete window.mappls; 
      // delete window.map; // If you were setting window.map
    };
  }, []); // Empty dependency array, map setup runs once

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
          if (mapInstanceRef.current) { // Use map instance from ref
            setTimeout(() => {
              mapInstanceRef.current.resize();
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

  function filterShops(shops) {
    const excludeTerms = ['beauty', 'makeup', 'parlour', 'salon'];
    return shops.filter(place => {
      if (!place || !place.keywords) return true;
      const keywords = String(place.keywords).toLowerCase();
      return !excludeTerms.some(term => keywords.includes(term));
    });
  }

  const renderShopList = (shops) => {
    const container = document.getElementById('nearby_search');
    if (!container) return;
    container.innerHTML = '<h3>Nearby Barber Shops</h3>'; // Clear previous list
    shops.forEach(place => {
      container.appendChild(createShopListItem(place));
    });
  };


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

  const bookAppointment = async (shopDetails) => {
    if (!user) {
      alert('Please login to book an appointment');
      return;
    }
    
    setSelectedShop(shopDetails);
    setShowAppointmentModal(true);
  }

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    
    // Make sure we have a valid name for the appointment
    // The user object from context should have the username
    const userName = user?.username || user?.email; // Prefer username if available
    if (!userName) {
      alert('User information not found. Please ensure you are logged in and your profile is complete.');
      return;
    }

    if (!token) { // Check if token from context is available
        alert('Authentication token not found. Please log in again.');
        return;
    }

    const appointmentDetails = {
      name: userName, // This will be the name of the user booking
      address: selectedShop.address,
      appointmentDate: appointmentData.appointmentDate,
      service: appointmentData.service,
      shopName: selectedShop.shopName
      // userId will be added by the backend via `protect` middleware
    };

    try {
      // Call the service function
      await bookNewAppointment(appointmentDetails, token); 
      alert('Appointment booked successfully!');
      setShowAppointmentModal(false);
      // Optionally, clear appointmentData state
      setAppointmentData({ service: '', appointmentDate: '' });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert(error.message || 'Error booking appointment. Please try again.');
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
