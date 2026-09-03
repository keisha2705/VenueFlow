import React, { useState } from "react";
import "../Styling/CheckoutPage.css";
// NOTE: adjust this import to wherever your Firebase app/auth instance
// actually lives in this project (e.g. "../firebase" or "../lib/firebase").
import { auth } from "../lib/firebase";

const Checkout = ({ eventId, venueId, selectedSeats }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async () => {
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        setErrorMessage("You need to be logged in to pay.");
        setIsSubmitting(false);
        return;
      }
      const idToken = await currentUser.getIdToken();

      // The backend looks up the logged-in user and recalculates the price
      // from the locked seats itself — it does NOT trust a client-sent amount.
      const response = await fetch("http://localhost:3000/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          eventId,
          venueId,
          selectedSeats,
          // Paystack redirects the browser here after payment; this page
          // should read the `reference` query param and call
          // GET /api/paystack/verify/:reference to confirm the booking.
          callbackUrl: `${window.location.origin}/payment/callback`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Could not start payment.");
        setIsSubmitting(false);
        return;
      }

      // Hand off to Paystack's hosted checkout page.
      window.location.href = data.authorization_url;
    } catch (error) {
      console.error("Payment initialization error:", error);
      setErrorMessage("Something went wrong starting your payment.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Complete Your Booking</h1>
        <p>You're one step away from securing your seats.</p>
      </div>

      <div className="checkout-container">
        <div className="booking-section">
          <h2>Your Selection</h2>
          <div className="booking-card">
            <div className="booking-item">
              <span>Tickets</span>
              <strong>{selectedSeats?.length || 0}</strong>
            </div>
            <div className="booking-item">
              <span>Seats</span>
              <strong>{selectedSeats?.join(", ") || "—"}</strong>
            </div>
            <div className="booking-item">
              <span>Reference</span>
              <strong>{eventId?.slice(-8).toUpperCase()}</strong>
            </div>
          </div>
        </div>

        <div className="payment-section">
          <h2>Payment Details</h2>
          <div className="payment-card">
            <input
              type="text"
              value={name}
              placeholder="Full name"
              className="checkout-input"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="tel"
              value={phoneNumber}
              placeholder="Phone Number"
              className="checkout-input"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <hr />

            {errorMessage && (
              <div className="payment-error">{errorMessage}</div>
            )}

            <button
              type="button"
              onClick={handlePayment}
              disabled={isSubmitting}
              className="pay-button"
            >
              {isSubmitting ? "Starting payment..." : "Pay Now"}
            </button>

            <p className="secure-payment">
              🔒 Payments are securely processed by Paystack.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;