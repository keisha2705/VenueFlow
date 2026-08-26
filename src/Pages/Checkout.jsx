import React, { useState } from "react";

function Checkout() {
  const [paymentStatus, setPaymentStatus] = useState("idle");

  // Temporary booking information
  const booking = {
    venue: "Main Event Hall",
    date: "25 August 2026",
    time: "18:00",
    seat: "A12",
    price: 250,
  };

  const handlePayment = () => {
    setPaymentStatus("processing");

    // Paystack integration will go here
    console.log("Starting payment...");
  };

  return (
    <div className="checkout-page">

      {/* Header */}
      <header className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your booking</p>
      </header>

      <main className="checkout-container">

        {/* Left side - Booking Information */}
        <section className="booking-section">

          <h2>Booking Details</h2>

          <div className="booking-card">

            <div className="booking-item">
              <span>Venue</span>
              <strong>{booking.venue}</strong>
            </div>

            <div className="booking-item">
              <span>Date</span>
              <strong>{booking.date}</strong>
            </div>

            <div className="booking-item">
              <span>Time</span>
              <strong>{booking.time}</strong>
            </div>

            <div className="booking-item">
              <span>Seat</span>
              <strong>{booking.seat}</strong>
            </div>

          </div>

        </section>

        {/* Right side - Payment */}
        <section className="payment-section">

          <h2>Payment</h2>

          <div className="payment-card">

            <div className="price-row">
              <span>Ticket</span>
              <span>R{booking.price}</span>
            </div>

            <div className="price-row">
              <span>Booking fee</span>
              <span>R0</span>
            </div>

            <hr />

            <div className="total-row">
              <strong>Total</strong>
              <strong>R{booking.price}</strong>
            </div>

            {/* Payment status */}
            {paymentStatus === "processing" && (
              <div className="payment-message">
                Processing payment...
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="payment-success">
                Payment successful!
              </div>
            )}

            {paymentStatus === "failed" && (
              <div className="payment-error">
                Payment failed. Please try again.
              </div>
            )}

            {/* Pay button */}
            <button
              className="pay-button"
              onClick={handlePayment}
              disabled={paymentStatus === "processing"}
            >
              {paymentStatus === "processing"
                ? "Processing..."
                : `Pay R${booking.price}`}
            </button>

            <p className="secure-payment">
              🔒 Secure payment powered by Paystack
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Checkout;