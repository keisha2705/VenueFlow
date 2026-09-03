import React from 'react';
import Navbar from '../Components/Navbar';
import '../Styling/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-page">

      <Navbar />

      {/* Hero */}
      <section className="about-hero">

        <div className="about-hero-content">

          <p className="about-eyebrow">
            ABOUT NOVUS
          </p>

          <h1>
            Discover experiences.
            <br />
            Make memories.
          </h1>

          <p className="about-intro">
            NOVUS makes it easier to discover, explore and book
            events happening around you.
          </p>

        </div>

      </section>


      {/* About */}
      <section className="about-section">

        <div className="about-heading">
          <span>01</span>
          <h2>Who we are</h2>
        </div>

        <div className="about-content">

          <h3>
            Your place to discover
            what’s happening.
          </h3>

          <div>
            <p>
              NOVUS is an event discovery and booking platform
              created to connect people with experiences they
              enjoy.
            </p>

            <p>
              From live music and fashion shows to exhibitions
              and other events, NOVUS gives users one simple
              place to find something worth attending.
            </p>
          </div>

        </div>

      </section>


      {/* What we offer */}
      <section className="offer-section">

        <div className="about-heading">
          <span>02</span>
          <h2>What we offer</h2>
        </div>

        <div className="offer-grid">

          <div className="offer-card">

            <span>01</span>

            <h3>Discover Events</h3>

            <p>
              Browse events by category and find experiences
              that interest you.
            </p>

          </div>


          <div className="offer-card">

            <span>02</span>

            <h3>Simple Booking</h3>

            <p>
              View event information and book your place
              quickly and easily.
            </p>

          </div>


          <div className="offer-card">

            <span>03</span>

            <h3>For Event Managers</h3>

            <p>
              Create and manage events while making them
              available to a wider audience.
            </p>

          </div>

        </div>

      </section>


      {/* How it works */}
      <section className="process-section">

        <div className="about-heading">
          <span>03</span>
          <h2>How it works</h2>
        </div>

        <div className="process-list">

          <div className="process-item">

            <span>01</span>

            <div>
              <h3>Find an event</h3>
              <p>
                Explore upcoming events available on NOVUS.
              </p>
            </div>

          </div>


          <div className="process-item">

            <span>02</span>

            <div>
              <h3>View the details</h3>
              <p>
                Check the event date, time, venue and other
                important information.
              </p>
            </div>

          </div>


          <div className="process-item">

            <span>03</span>

            <div>
              <h3>Book your experience</h3>
              <p>
                Select your preferred option and complete
                your booking.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Mission */}
      <section className="mission">

        <p>OUR MISSION</p>

        <h2>
          Making great events
          <br />
          easier to discover.
        </h2>

      </section>


      {/* Footer */}
      <footer className="about-footer">

        <div>
          <strong>NOVUS</strong>
          <p>Discover your next experience.</p>
        </div>

        <span>
          © 2026 NOVUS
        </span>

      </footer>

    </div>
  );
}

export default AboutUs;