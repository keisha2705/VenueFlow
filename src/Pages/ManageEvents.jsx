import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";

function ManageEvents() {
    const [venues, setVenues] = useState([]);
    const [events, setEvents] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [venueId, setVenueId] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [ticketSales, setTicketSales] = useState("");
    const [ticketSalesClosingDate, setTicketSalesClosingDate] = useState("");

    useEffect(() => {
        getVenues();
        getEvents()
    }, []);

    async function getVenues() {
        try {
            if (!auth.currentUser) {
                alert("You are not logged in!");
                return
            }
            const token = await auth.currentUser.getIdToken();
            const response = await fetch("http://localhost:3000/venues",
              {
                headers: {Authorization: `Bearer ${token}`}
              }
            );
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

    async function getEvents() {
    try {
        if (!auth.currentUser) {
            alert("You are not logged in!");
            return
        }
        const token = await auth.currentUser.getIdToken();
        const response = await fetch("http://localhost:3000/events",
            {
              headers: {Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        setEvents(data);
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
        const eventData = { name, description, venueId, date, startTime, ticketSales: Number(ticketSales), ticketSalesClosingDate};
        let response;
        if (editingEvent) {
            //updating an event only if it exists
            response = await fetch(`http://localhost:3000/events/${editingEvent._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                    body: JSON.stringify(eventData)
                }
            );
        } else {
            //creating an event
            response = await fetch("http://localhost:3000/events",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}`},
                    body: JSON.stringify(eventData)
                }
            );
        }
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        if (editingEvent) {
            alert("Event updated successfully!");
        } else {
            alert("Event created successfully!");
        }
        await getEvents();
        setName("");
        setDescription("");
        setVenueId("");
        setDate("");
        setStartTime("");
        setTicketSales("");
        setTicketSalesClosingDate("");
        setEditingEvent(null);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}
// add the edit function from the venue page here

async function deleteEvent(id) {
    try {
        if (!auth.currentUser) {
            alert("You are not logged in!");
            return
        }
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this event?"
        );
        if (!confirmDelete) {
            return
        }
        const token = await auth.currentUser.getIdToken();
        const response = await fetch(`http://localhost:3000/events/${id}`,
            {
                method: "DELETE",
                headers: {"Authorization": `Bearer ${token}`}
            }
        );
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        alert("Event deleted successfully!");
        await getEvents();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}
    return (
        <div>
            <h1>Manage Events</h1>
            <p>Create and manage your events.</p>
            <form onSubmit={handleSubmit}>
                <h2>{editingEvent ? "Edit Event" : "Create Event"}</h2>
                
                <label>Event Name</label>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} required/>

                <label>Description</label>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)}required/>

                <label>Venue</label>
                <select value={venueId} onChange={(event) =>setVenueId(event.target.value)}required>

                <option value="">Select a venue</option>
                    {venues.map((venue) => (
                     <option key={venue._id} value={venue._id}> {venue.name}</option>
                    ))}
                </select>

                <label>Date</label>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required/>

                <label>Start Time</label>
                <input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)}required />

                <label>Ticket Sales</label>
                <input type="number" value={ticketSales} onChange={(event) =>setTicketSales(event.target.value)}required/>

                <label>Ticket Sales Closing Date</label>
                <input type="date" value={ticketSalesClosingDate} onChange={(event) =>setTicketSalesClosingDate(event.target.value)}required/>

                <button type="submit"> {editingEvent ? "Update Event" : "Create Event"}</button>

            </form>
           <h2>Your Events</h2>

{events.length === 0 ? (
    <p>No events have been created yet.</p>
) : (
    events.map((event) => {
        //this finds the venue that matches the events venueId and returns it in literal words and not numbers and letetrs
        const venue = venues.find(
            (venue) => venue._id === event.venueId
        );
        return (
            <div key={event._id}>
                <h3>{event.name}</h3>
                <p>{event.description}</p>
                <p>Date: {event.date}</p>
                <p>Start Time: {event.startTime}</p>
                <p>Ticket Sales: {event.ticketSales}</p>
                <p> Ticket Sales Closing Date:{" "} {event.ticketSalesClosingDate}</p>
                <p> Venue:{" "} {venue ? venue.name : "Venue not found"}</p>
                <p> Address:{" "} {venue ? venue.address : "Address not found"}</p>
                <p> Capacity:{" "} {venue ? venue.capacity : "Capacity not found"}</p>
                <button onClick={() => editEvent(event)}>Edit</button>
                <button onClick={() => deleteEvent(event._id)}>Delete</button>
            </div> 
        );
    })
)}
    </div>
  );
}

export default ManageEvents