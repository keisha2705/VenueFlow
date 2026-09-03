import React from "react";
import Navbar from "../Components/Navbar";
import "../Styling/AvailableVenues.css";

export function AvailableVenues() {
  return (
    <div className="home-page-root light-theme">
      <Navbar />

      <section className="honor-hero full-viewport-bleed light-hero">
        <div className="hero-overlay-content">
          <span className="hero-badge">Novus Experience</span>
          <h1 className="hero-title">
            Turn Moments <br /> Into Motion
          </h1>
          <p className="hero-subtitle">
            Explore premium live events, secure your seats instantly, or create your own experience.
          </p>
          <div className="hero-actions">
            <a href="/user" className="btn-primary-purple">Explore Events</a>
            <a href="#portal" className="btn-secondary-dark">Get Started</a>
          </div>
        </div>
      </section>

     
      <section id="portal" className="portal-giant-strip light-portals">
        {/* Segment A: For Attendees */}
        <div className="giant-portal-block attend-fullscreen-bg light-layer">
          <div className="giant-block-content">
            <span className="block-pretitle">The Audience Arena</span>
            <h2>Find Your Next <br />Experience</h2>
            <p>Book premium seats for live concerts, sports arenas, fashion circuits, and global exhibitions seamlessly.</p>
            <a href="/user" className="btn-primary-purple">Book a Seat Now</a>
          </div>
        </div>

        
        <div className="giant-portal-block host-fullscreen-bg light-layer">
          <div className="giant-block-content">
            <span className="block-pretitle">The Creator Suite</span>
            <h2>Become an Event <br />Organizer</h2>
            <p>Create, manage, verify seating layouts, and monetize your ticketing workflows with zero upfront software costs.</p>
            <a href="/Application" className="btn-secondary-outline">Create Event</a>
          </div>
        </div>
      </section>

     
      <section className="fullscreen-showcase-panel light-panel music-panel-bg">
        <div className="showcase-immersive-box light-box left-aligned">
          <span className="content-tag">Live Showcases</span>
          <h2 className="giant-panel-title">Acoustic Arenas & Concerts</h2>
          <p className="giant-panel-description">
            Step directly into the center of pristine spatial sound execution. Hand-inspected stadium tracking 
            certified to meet our structural layout standards for optimal crowd enjoyment and acoustics.
          </p>
          <a href="/user" className="btn-primary-purple">Explore Music Tickets</a>
        </div>
      </section>


      <section className="fullscreen-showcase-panel light-panel sports-panel-bg">
        <div className="showcase-immersive-box light-box right-aligned">
          <span className="content-tag">Elite Athletics</span>
          <h2 className="giant-panel-title">Grandstands & Premium Tiers</h2>
          <p className="giant-panel-description">
            Never miss a millisecond of premium championship performance tracking. Secure safe, vetted entry to 
            stadium gates and trackside lounges with immediate local transaction handling options.
          </p>
          <a href="/user" className="btn-primary-purple">Explore Sports Fixtures</a>
        </div>
      </section>

     
      <section className="featured-showcase-giant light-footer-showcase">
        <div className="content-wrapper-giant">
          <div className="left-side-giant">
            <img src="assets/pexels-photo4passion-1772873.jpg" alt="Featured Global Stadium Seating" />
          </div>
          <div className="right-side-giant">
            <div className="text-content-giant dark-text">
              <span className="content-tag">Premium Infrastructure</span>
              <h3 className="showcase-title-giant">The Grand Horizon Hall</h3>
              <p>
                Investing in a premium seating experience is an investment in unforgettable shared memories. 
                Beyond the aesthetic design metrics of premium architectural environments, superior structural 
                handling ensures flawless sightlines and lasting crowd comfort throughout.
              </p>
              <p>
                By choosing quality structural layouts over mass-produced compromises, you prioritize safe booking handling models, 
                streamlined venue turnstiles, and sophisticated ticket validation.
              </p>
              <a href="/user" className="btn-primary-purple">Secure A Seat Now</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AvailableVenues;
