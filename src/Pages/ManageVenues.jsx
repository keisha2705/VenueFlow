import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import GoogleMap from "../Components/GoogleMap"
import "../Styling/ManageVenues.css"

function ManageVenues() {
    const [venues, setVenues] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingVenue, setEditingVenue] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [capacity, setCapacity] = useState("");
    const [rows, setRows] = useState("");
    const [seatsPerRow, setSeatsPerRow] = useState("");
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    useEffect(() => {
    getVenues();
}, []);
    async function getVenues() {
    try {
        if (!auth.currentUser) {
            alert("You are not logged in!");
            return
        }
        const token = await auth.currentUser.getIdToken();
        const response = await fetch("http://localhost:3000/venues", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        setVenues(data);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    try {
        if (!auth.currentUser) {
            alert("You are not logged in!");
            return
        }
        const token = await auth.currentUser.getIdToken();
        const venue = { 
            name, description, address, capacity: Number(capacity),
            rows: Number(rows), seatsPerRow: Number(seatsPerRow), location, latitude, longitude
        };
        let response;
        if (editingVenue) {
            //editing the existing venue
            response = await fetch(
                `http://localhost:3000/venues/${editingVenue._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                    body: JSON.stringify(venue)
                }
            );
        } else {
            //creating a new venue
            response = await fetch(
                "http://localhost:3000/venues",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                    body: JSON.stringify(venue)
                }
            );
        }

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        if (editingVenue) {
            alert("Venue updated successfully!");
        } else {
            alert("Venue created successfully!");
        }
        await getVenues();
        setName("");
        setDescription("");
        setAddress("");
        setCapacity("");
        setRows("");
        setSeatsPerRow("");
        setEditingVenue(null);
        setShowForm(false);
        setLocation("");
        setLatitude(null);
        setLongitude(null);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}
async function deleteVenue(id) {
    try {
        if (!auth.currentUser) {
            alert("You are not logged in!");
            return
        }
        const token = await auth.currentUser.getIdToken();
        const response = await fetch(`http://localhost:3000/venues/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        alert("Venue deleted successfully!");
        getVenues();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}
// this gets the current info and fills the form alraefy so that the manager can just edit what they want
function editVenue(venue) {
    setEditingVenue(venue);
    setName(venue.name);
    setDescription(venue.description);
    setAddress(venue.address);
    setCapacity(venue.capacity);
    setRows(venue.rows);
    setSeatsPerRow(venue.seatsPerRow);
    setLocation(venue.location || "");
    setLatitude(venue.latitude || null);
    setLongitude(venue.longitude || null);
    setShowForm(true);
}
return (
    <div className="venues-page">
        <div className="venues-container">

            <div className="venues-header">
                <h1>Manage Venues</h1>
                <button className="add-venue-button" onClick={() => setShowForm(!showForm)} >Add Venue</button>
            </div>

            {showForm && (
                <div className="venue-form-container">
                    <h2>{editingVenue ? "Edit Venue" : "Create Venue"}</h2>
                    <form onSubmit={handleSubmit} className="venue-form">
                        <div className="form-group">
                            <label>Venue Name</label>
                            <input type="text" value={name} onChange={(event) => setName(event.target.value)}required/>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea value={description} onChange={(event) =>setDescription(event.target.value)}required/>
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" value={address} onChange={(event) =>setAddress(event.target.value)}required/>
                        </div>

                        <div className="map-section">
                            <label className="searching">Search Venue Location</label>
                            <GoogleMap  latitude={latitude} longitude={longitude} onPlaceSelected={(place) => {
                                    setLocation(place.name);
                                    setAddress(place.address);
                                    setLatitude(place.latitude);
                                    setLongitude(place.longitude);
                                }}
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label>Capacity</label>
                                <input type="number" value={capacity} onChange={(event) =>setCapacity(event.target.value)}required/>
                            </div>

                            <div className="form-group">
                                <label>Number of Rows</label>
                                <input type="number" value={rows} onChange={(event) =>setRows(event.target.value)}required/>
                            </div>

                            <div className="form-group">
                                <label>Seats Per Row</label>
                                <input type="number" value={seatsPerRow} onChange={(event) =>setSeatsPerRow(event.target.value)}required/>
                            </div>
                        </div>

                        <div className="form-buttons">
                            <button type="submit" className="primary-button">{editingVenue ? "Update Venue" : "Create Venue"}</button>
                            <button type="button className="secondary-button onClick={() => { setShowForm(false); setEditingVenue(null);}}>Cancel</button>
                        </div>
                    </form>
                </div>)}

            <div className="venues-list-section">
                <h2>Your Created Venues</h2>
                {venues.length === 0 ? (
                    <div className="no-venues">
                        <p>No venues have been created yet.</p>
                    </div>
                ) : (
                <div className="venues-grid">
                        {venues.map((venue) => (
                            <div className="venue-card" key={venue._id}>
                                <h2>{venue.name}</h2>
                                <p className="venue-description">{venue.description}</p>
                                <div className="venue-details">
                                    <p><strong>Address:</strong>{venue.address} </p>
                                    <p><strong>Location:</strong>{venue.location} </p>
                                    <p><strong>Coordinates:</strong>{venue.latitude},{venue.longitude} </p>
                                    <p><strong>Capacity:</strong>{venue.capacity} </p>
                                    <p><strong>Rows:</strong>{venue.rows} </p>
                                    <p><strong>Seats per row:</strong>{venue.seatsPerRow} </p>
                                </div>
                                <div className="venue-actions">
                                    <button className="edit-button" onClick={() =>editVenue(venue)}>Edit</button>
                                    <button className="delete-button" onClick={() =>deleteVenue(venue._id)}>Delete</button>
                                </div>
                            </div>))}
                    </div>)}
            </div>
        </div>
    </div>
);
}
export default ManageVenues