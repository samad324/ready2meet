import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React from 'react'

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ lat: props.lat, lng: props.long }}
    center={{ lat: props.lat, lng: props.long }}
    radius={5000}
  >
    {props.isMarkerShown && 
    <Marker
    position={{ lat: props.lat, lng: props.long }} 
    draggable={true}
    onDragEnd={props.dragEnd}
    />}
  </GoogleMap>
))


export default MyMapComponent;





