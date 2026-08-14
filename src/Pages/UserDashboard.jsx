import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import ManageEvents from '../Pages/ManageEvents.jsx';
import '../Styling/UserDashboard.css';

function UserDashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/events');

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();

        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Unable to load events.');
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

        <h1 className="hero-title">
          NOVUS
        </h1>

        <p className="hero-text">
          Find concerts, fashion shows, and experiences in your city.
          Browse by category,
          <br />
          save your favorites, and book in seconds.
        </p>

      </section>


      {/* EVENTS */}
      <section className="events-container">

        {loading && (
          <p className="loading">
            Loading events...
          </p>
        )}

        {error && (
          <p className="error">
            {error}
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="no-events">
            No events available yet.
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <>
            <EventSection
              title="Music"
              category="Music"
              events={events}
            />

            <EventSection
              title="Fashion Shows"
              category="Fashion"
              events={events}
            />
          </>
        )}

      </section>

    </div>
  );
}

export default UserDashboard;