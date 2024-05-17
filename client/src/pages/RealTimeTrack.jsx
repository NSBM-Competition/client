import React, { useCallback, useRef, useState } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const containerStyle = {
  width: '80%',
  height: '600px',
justifyContent: 'center',
alignItems: 'center',
};

const center = {
  lat: 6.2667,
  lng: 80.0333,
};

const Home = () => {
  const [searchBox, setSearchBox] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onSearchBoxLoad = useCallback((ref) => {
    setSearchBox(ref);
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (!searchBox) return;

    const places = searchBox.getPlaces();

    if (places.length === 0) return;

    const newMarkers = places.map((place) => ({
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }));

    setMarkers(newMarkers);

    const bounds = new window.google.maps.LatLngBounds();
    newMarkers.forEach((marker) => {
      bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng));
    });
    mapRef.current.fitBounds(bounds);
  }, [searchBox]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U" libraries={['places']}>
      <div>
        <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
          <input
            type="text"
            placeholder="Search for a place"
            style={{
              boxSizing: 'border-box',
              border: '1px solid transparent',
              width: '240px',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
              fontSize: '14px',
              outline: 'none',
              textOverflow: 'ellipses',
              position: 'absolute',
              left: '50%',
              marginLeft: '-120px',
              top: '10px',
            }}
          />
        </StandaloneSearchBox>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Home;