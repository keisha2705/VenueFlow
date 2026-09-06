import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../Styling/UserDashboard.css";
import { Link } from "react-router-dom";

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/events", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
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
                      <span>-{event.startTime}</span> <br/> <br/>
                      <span>R{Number(event.ticketPrice).toFixed(2)}</span>
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

export default UserDashboard
