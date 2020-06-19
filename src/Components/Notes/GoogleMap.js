import React from "react";
import PropTypes from "prop-types";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const GoogleMap = (props) => {
  var lat = parseFloat(props.latitude);
  var long = parseFloat(props.longitude);

  console.log(lat, long);

  const style = {
    width: "70%",
    height: "70%",
  };
  return (
    (lat && long) !== NaN && (
      <div>
        <Map
          google={props.google}
          zoom={16}
          style={style}
          initialCenter={{
            lat: lat,
            lng: long,
          }}
        >
          <Marker position={{ lat: lat, lng: long }} />
        </Map>
      </div>
    )
  );
};

GoogleMap.propTypes = {};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBxZzD-KekhDCYnlZEeLu2_GVhQZMY1ASI",
})(GoogleMap);
