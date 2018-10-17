import React from 'react';
import MyMapComponent from '../components/map'
import { lang } from 'moment';



export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: null,
            long: null
        }
    }


    setLocation = () => {
        const { long, lat } = this.state
        if (!long && !lat) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                })
            })
        }
    }

    dragEnd = (newPossiton) => {
        this.setState({
            lat : newPossiton.latLng.lat(),
            long : newPossiton.latLng.lng()
        })
        console.log({
            lat : newPossiton.latLng.lat(),
            long : newPossiton.latLng.lng()
        })
    }

    render() {
        const { long, lat } = this.state;
        this.setLocation()
        return (
            lat &&
            <MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                lat= {lat}
                long= {long}
                dragEnd={this.dragEnd}
            />
        )
    }
}