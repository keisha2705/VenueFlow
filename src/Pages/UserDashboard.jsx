import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styling/UserDashboard.css";
import { Link } from "react-router-dom";
// Adjust this import to wherever your Firebase app/auth instance actually
// lives in this project (e.g. "../firebase", "../lib/firebase", etc.)
import { auth } from "../lib/firebase";

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Pull a FRESH ID token from Firebase instead of trusting whatever
        // was cached in localStorage at login. Firebase ID tokens expire
        // after ~1 hour; getIdToken() (with no args) returns the cached
        // token if it's still valid and silently refreshes it if it's
        // close to/past expiry — this is what was causing the 401 once
        // enough time had passed since login.
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error("Not signed in.");
        }
        const token = await currentUser.getIdToken();

        const response = await fetch("http://localhost:3000/events", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          console.error("Fetch events failed:", response.status, errBody);
          throw new Error(errBody.message || "Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Unable to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home">
      <Navbar />


      <section className="hero">
        <h1 className="hero-title">NOVUS.</h1>
        <p className="hero-text">
          Find concerts, fashion shows, and experiences in your city.
          Browse by category, save your favorites, and book in seconds.
        </p>
      </section>
<br></br>
      <section>
        <div className="events-header">
          <h2 className="section-heading">Featured Experiences</h2>
        </div>

        {error && <p className="error">{error}</p>}
        {!loading && !error && events.length === 0 && (
          <p className="no-events">No events available right now.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="modern-events-grid">
            {events.map((event) => (
              <Link
                to={`/bookings/${event._id}`}
                key={event._id}
                className="event-card-link"
              >
                <div className="professional-card">
                  {event.imageUrl ? (
                    <div className="card-image-box">
                      <img src={event.imageUrl} alt={event.name} className="card-img" />
                    </div>
                  ) : (
                    <div className="card-image-fallback">
                      <span>NOVUS SHOW</span>
                    </div>
                  )}

                  <div className="card-body-content">
                    <h3 className="card-event-name">{event.name}</h3>
                    <p className="card-event-description">{event.description}</p>

                    <div className="card-event-footer">
                      <span>-{event.date}</span>
                      <span>-{event.startTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default UserDashboard;