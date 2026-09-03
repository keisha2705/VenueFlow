import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styling/CheckoutPage.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Expect the previous page (seat selection) to pass these via:
  // navigate("/checkout", { state: { eventId, venueId, selectedSeats, eventName, price } })
  const {
    eventId,
    venueId,
    selectedSeats = [],
    eventName = "Selected Event",
    price = 0, // total price for the selected seats, computed on the previous page
  } = location.state || {};

  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle | processing | error
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async () => {
    if (!eventId || !venueId || selectedSeats.length === 0) {
      setErrorMessage(
        "Missing booking details. Please go back and select your seats again.",
      );
      return;
    }

    setPaymentStatus("processing");
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/paystack/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            eventId,
            venueId,
            selectedSeats,
            // Paystack redirects the browser here after payment.
            // This page reads ?reference= from the URL and verifies it.
            callbackUrl: `${window.location.origin}/payment-callback`,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Paystack initialize failed:", data);
        setErrorMessage(data.message || "Could not start payment.");
        setPaymentStatus("error");
        return;
      }

      // Hand off to Paystack's hosted checkout page.
      window.location.href = data.authorization_url;
    } catch (err) {
      console.error("Payment init error:", err);
      setErrorMessage("Something went wrong starting payment.");
      setPaymentStatus("error");
    }
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your venue booking</p>
      </header>

      <main className="checkout-container">
        <section className="booking-section">
          <h2>Booking Details</h2>

          <div className="booking-card">
            <div className="booking-item">
              <span>Event</span>
              <strong>{eventName}</strong>
            </div>

            <div className="booking-item">
              <span>Seats</span>
              <strong>
                {selectedSeats.length > 0
                  ? selectedSeats.join(", ")
                  : "No seats selected"}
              </strong>
            </div>
          </div>
        </section>

        <section className="payment-section">
          <h2>Payment</h2>

          <div className="payment-card">
            <div className="price-row">
              <span>Tickets ({selectedSeats.length})</span>
              <span>R{price}</span>
            </div>

            <div className="price-row">
              <span>Booking fee</span>
              <span>R0</span>
            </div>

            <hr />

            <div className="total-row">
              <strong>Total</strong>
              <strong>R{price}</strong>
            </div>

            {paymentStatus === "processing" && (
              <div className="payment-message">
                Redirecting to secure payment...
              </div>
            )}

            {paymentStatus === "error" && (
              <div className="payment-error">{errorMessage}</div>
            )}

            <button
              className="pay-button"
              onClick={handlePayment}
              disabled={paymentStatus === "processing"}
            >
              {paymentStatus === "processing"
                ? "Redirecting..."
                : `Pay R${price}`}
            </button>

            <p className="secure-payment">
              Secure payment powered by Paystack
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Checkout;