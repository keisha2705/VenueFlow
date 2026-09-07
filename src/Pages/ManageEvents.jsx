import { useState, useEffect, useRef } from "react";
import { auth } from "../lib/firebase";
import "../Styling/ManageEvents.css";
import Navbar from '../Components/Navbar';

function ManageEvents() {
  const formRef = useRef(null);
  const [showForm, setShowForm] = useState(true);
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
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    getVenues();
    getEvents();
  }, []);

  async function getVenues() {
    try {
      if (!auth.currentUser) {
        alert("You are not logged in!");
        return
      }
      const token = await auth.currentUser.getIdToken();
      const response = await fetch("http://localhost:3000/venues", {
      headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setVenues(data);
    } catch (error) {
      console.error(error);
      // alert(error.message);
    }
  }

  async function getEvents() {
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch("http://localhost:3000/events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setEvents(data);
    } catch (error) {
      console.error(error);
      // alert(error.message);
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const token = await auth.currentUser.getIdToken();
      const eventData = { name, description, venueId, date, startTime, ticketSales: Number(ticketSales), ticketSalesClosingDate, imageUrl,};
      let response;
      if (editingEvent) {
        //updating an event only if it exists
        response = await fetch(
          `http://localhost:3000/events/${editingEvent._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`},
            body: JSON.stringify(eventData),
          },
        )
      } else {
        //creating an event
        response = await fetch("http://localhost:3000/events", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(eventData),
        });
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
      setImageUrl("");
    } catch (error) {
      console.error(error);
      // alert(error.message);
    }
  }
  // add the edit function from the venue page here
  function editEvent(event) {
    console.log("Editing event:", event);
    setEditingEvent(event);
    setName(event.name);
    setDescription(event.description);
    setVenueId(event.venueId);
    setDate(event.date);
    setStartTime(event.startTime);
    setTicketSales(event.ticketSales);
    setTicketSalesClosingDate(event.ticketSalesClosingDate);
    setImageUrl(event.imageUrl);
    setShowForm(true);
//this is so that when the user clicks on edit, it refers back to the 
//form at the top instead of them manually scrolling 
    setTimeout(() => {formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
}, 100);
}
  async function deleteEvent(id) {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this event?",)
      if (!confirmDelete) {
        return
      }
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      alert("Event deleted successfully!");
      await getEvents();
    } catch (error) {
      console.error(error);
      // alert(error.message);
    }
  }
  return (
    <div className="events-page">
      <Navbar />
      <div className="events-container">
        <div className="events-header">
          <h1>Manage Events</h1>
        </div>

      {showForm && (
        <div  ref={formRef} className="event-form-card">
          <h2>{editingEvent ? "Edit Event" : "Create Event"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Event Name</label>
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} required/>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={(event) => setDescription(event.target.value)} required/>
            </div>
            <div className="form-group">
              <label>Venue</label>
              <select value={venueId} onChange={(event) => setVenueId(event.target.value)} required >
                <option value="">Select a venue</option>
                {venues.map((venue) => (
                  <option key={venue._id} value={venue._id}>
                    {venue.name}
                  </option>))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <input type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ticket Sales</label>
                <input type="number" value={ticketSales} onChange={(event) => setTicketSales(event.target.value)} required/>
              </div>

              <div className="form-group">
                <label>Ticket Sales Closing Date</label>
                <input type="date" value={ticketSalesClosingDate} onChange={(event) =>
                    setTicketSalesClosingDate(event.target.value)
                  }required/>
                <label>Event Image URL</label>
                <input type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://example.com/j-act.jpg" required />
              </div>
            </div>
            <button className="event-submit-button" type="submit"> {editingEvent ? "Update Event" : "Create Event"}</button>
          </form>
        </div> )}

        <div className="your-events-section">
          <h2>Your Events</h2>
          {events.length === 0 ? (
            <div className="no-events">
              <p>No events have been created yet.</p>
            </div>
          ) : (
            <div className="events-grid">
              {events.map((event) => {
                const venue = venues.find(
                  (venue) => venue._id === event.venueId,
                )
                return (
                  <div className="event-card" key={event._id}>
                    <div className="event-card-content">
                      <h3>{event.name}</h3>
                      {event.imageUrl && (
                        <img src={event.imageUrl} alt={event.name} width="300" />)}
                      <p className="event-description">{event.description}</p>
                      <div className="event-details">
                        <p> <strong>Date:</strong> {event.date}</p>
                        <p> <strong>Start Time:</strong> {event.startTime}</p>
                        <p> <strong>Ticket Sales:</strong> {event.ticketSales}</p>
                        <p> <strong>Ticket Sales Closing Date:</strong> {event.ticketSalesClosingDate}</p>
                        <p> <strong>Venue:</strong> {venue ? venue.name : "Venue not found"}</p>
                        <p> <strong>Address:</strong> {venue ? venue.address : "Address not found"}</p>
                        <p> <strong>Capacity:</strong> {venue ? venue.capacity : "Capacity not found"}</p>
                      </div>

                      <div className="event-actions">
                        <button type="button" className="edit-button" onClick={() => editEvent(event)} > Edit</button>
                        <button type="button" className="delete-button" onClick={() => deleteEvent(event._id)} > Delete</button>
                      </div>
                    </div>
                  </div>)})}
            </div>)}
        </div>
      </div>
    </div>
  )
}
export default ManageEvents
