import { APIProvider, Map, AdvancedMarker, useMapsLibrary} from "@vis.gl/react-google-maps";
import { useState,useEffect, useRef } from "react";

function PlaceSearch({ onPlaceSelected }) {
    const places = useMapsLibrary("places");
    const inputRef = useRef(null);
    useEffect(() => {
        if (!places || !inputRef.current) {
            return
        }
        const autocomplete = new places.Autocomplete(
            inputRef.current,{fields: ["name","formatted_address","geometry"]
            }
        );
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            const selectedPlace = {
                name: place.name,
                address: place.formatted_address,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            };
            onPlaceSelected(selectedPlace);
        });

    }, [places, onPlaceSelected]);
    return (
        <input ref={inputRef} type="text" placeholder="Search for a venue..."/>
    );
}

function GoogleMap({ latitude, longitude, onPlaceSelected}) {
    const position = latitude !== null && longitude !== null? {lat: latitude,lng: longitude}
    : {lat: -33.9249,lng: 18.4241}
    
    const [userLocation, setUserLocation] = useState(null);
useEffect(() => {
  if (!navigator.geolocation) {
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    },
    (error) => {
      console.error("Location error:", error);
    }
  );
}, []);

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <PlaceSearch onPlaceSelected={onPlaceSelected}/>
            <Map center={position} zoom={12} mapId="VENUEFLOW_MAP"
                style={{
                    width: "100%",
                    height: "400px"
                }}
            >
            {latitude !== null &&
              longitude !== null && (
                <AdvancedMarker position={position}/>)}
            </Map>
        </APIProvider>
    );
}

export default GoogleMap