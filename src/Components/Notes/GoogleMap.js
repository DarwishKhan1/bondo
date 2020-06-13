import React from "react";
import PropTypes from "prop-types";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
let lat;
let long;
function map() {
  return (
    <GoogleMap defaultZoom={5} defaultCenter={{ lat: 30.3753, lng: 69.34 }}>
      <Marker position={{ lat: lat, lng: long }} />
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(map));

const GoogleMaps = ({ longitude, latitude}) => {
    lat = latitude;
    long = longitude;
  return (
    <div style={{ width: "75vw", height: "70vh", position: "relative" }}>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBxZzD-KekhDCYnlZEeLu2_GVhQZMY1ASI&libraries=places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
};

GoogleMaps.propTypes = {};

export default GoogleMaps;
