import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// This detects when the user clicks on the map
function MapClickHandler({ onLocationSelected }) {
    useMapEvents({
        click(event) {
            const { lat, lng } = event.latlng;

            onLocationSelected({
                latitude: lat,
                longitude: lng,
            });
        },
    });

    return null;
}

function OpenStreetMap({
    latitude,
    longitude,
    onLocationSelected,
}) {
    const [selectedPosition, setSelectedPosition] = useState(
        latitude !== null && longitude !== null
            ? { lat: latitude, lng: longitude }
            : null
    );

    // Default position: Cape Town
    const defaultPosition = [-33.9249, 18.4241];

    function handleLocationSelected(location) {
        const position = {
            lat: location.latitude,
            lng: location.longitude,
        };

        setSelectedPosition(position);

        onLocationSelected(location);
    }

    return (
        <MapContainer
            center={
                selectedPosition
                    ? [selectedPosition.lat, selectedPosition.lng]
                    : defaultPosition
            }
            zoom={12}
            style={{
                width: "100%",
                height: "400px",
            }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapClickHandler
                onLocationSelected={handleLocationSelected}
            />

            {selectedPosition && (
                <Marker
                    position={[
                        selectedPosition.lat,
                        selectedPosition.lng,
                    ]}
                />
            )}
        </MapContainer>
    );
}

export default OpenStreetMap