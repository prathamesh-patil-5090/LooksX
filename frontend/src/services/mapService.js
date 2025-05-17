const MAPPLS_CLIENT_ID = import.meta.env.VITE_MAPPLS_CLIENT_ID;
const MAPPLS_CLIENT_SECRET = import.meta.env.VITE_MAPPLS_CLIENT_SECRET;

let oauthToken = null;
let tokenPromise = null;

const fetchMapplsOAuthToken = async () => {
  if (oauthToken) {
    return oauthToken;
  }
  if (tokenPromise) {
    return tokenPromise;
  }

  tokenPromise = (async () => {
    try {
      const response = await fetch('https://outpost.mapmyindia.com/api/security/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: MAPPLS_CLIENT_ID,
          client_secret: MAPPLS_CLIENT_SECRET,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Failed to fetch Mappls OAuth token:', response.status, errorData);
        throw new Error(`Failed to fetch Mappls OAuth token: ${response.status}`);
      }

      const data = await response.json();
      oauthToken = data.access_token;
      return oauthToken;
    } catch (error) {
      console.error('Error fetching Mappls OAuth token:', error);
      throw error;
    } finally {
      tokenPromise = null; // Reset promise after completion or failure
    }
  })();
  return tokenPromise;
};

export const loadMapplsScripts = async () => {
  const token = await fetchMapplsOAuthToken();
  if (!token) {
    throw new Error('Mappls OAuth token is not available for loading scripts.');
  }

  return new Promise((resolve, reject) => {
    // Check if scripts are already loaded
    if (window.mappls && window.mappls.Map && window.mappls.nearby) {
        console.log('Mappls scripts already loaded.');
        resolve();
        return;
    }

    // Load main map script
    const mapScript = document.createElement('script');
    mapScript.id = 'mappls-map-sdk';
    mapScript.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk?layer=vector&v=3.0`;
    mapScript.async = true;
    mapScript.defer = true;

    mapScript.onload = () => {
      // Load plugin script after map script loads
      const pluginScript = document.createElement('script');
      pluginScript.id = 'mappls-map-sdk-plugins';
      pluginScript.src = `https://apis.mappls.com/advancedmaps/api/${token}/map_sdk_plugins?v=3.0`;
      pluginScript.async = true;
      pluginScript.defer = true;

      pluginScript.onload = resolve;
      pluginScript.onerror = () => reject(new Error('Failed to load Mappls plugin script.'));
      document.body.appendChild(pluginScript);
    };
    mapScript.onerror = () => reject(new Error('Failed to load Mappls map script.'));
    document.body.appendChild(mapScript);
  });
};

export const initializeMapAndSearch = (mapId, searchDivId, onShopsLoaded, onShopClick) => {
  if (!window.mappls || !window.mappls.Map) {
    console.error('Mappls SDK not available for map initialization.');
    return null;
  }

  const map = new window.mappls.Map(mapId, {
    center: [28.09, 78.3], // Initial default center
    zoom: 5,
  });

  map.on('load', () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          map.setCenter([lat, lng]);
          map.setZoom(13);
          performNearbySearch(map, searchDivId, [lat, lng], onShopsLoaded, onShopClick);
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          alert(`Geolocation error: ${error.message}. Using default location.`);
          performNearbySearch(map, searchDivId, [28.632735, 77.219696], onShopsLoaded, onShopClick); // Default location
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported. Using default location.');
      performNearbySearch(map, searchDivId, [28.632735, 77.219696], onShopsLoaded, onShopClick); // Default location
    }
  });

  map.on('error', (e) => {
    console.error('Mappls Map error event:', e);
  });

  return map; // Return the map instance
};

const performNearbySearch = (mapInstance, searchDivId, location, onShopsLoaded, onShopClick) => {
  if (!window.mappls || !window.mappls.nearby) {
    console.error('Mappls nearby function not available.');
    return;
  }
  const [lat, lng] = location;
  const options = {
    divId: searchDivId,
    map: mapInstance,
    keywords: 'barber shop',
    location: [lat, lng],
    refLocation: `${lat},${lng}`,
    fitbounds: true,
    icon: { url: 'https://apis.mappls.com/map_v3/1.png' },
    click_callback: (d) => { // Mappls internal click callback
        if (d && onShopClick) {
            onShopClick(d); // Call our custom click handler
        }
    }
  };

  window.mappls.nearby(options, (data) => {
    if (data && data.data && onShopsLoaded) {
      onShopsLoaded(data.data);
    } else if (data && !data.data && onShopsLoaded) {
      onShopsLoaded([]); // Pass empty array if no data
    }
  });
};
