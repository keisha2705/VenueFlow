import React, { useState } from "react";
import '../Styling/CheckoutPage.css';

function Checkout() {
  
  // BOOKING INFORMATION
  const booking = {
    venue: "Main Event Hall",
    date: "25 August 2026",
    time: "18:00",
    seat: "A12",
    price: 250,
  };

  // PAYMENT STATES
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [paymentReference, setPaymentReference] = useState("");

  // PAYSTACK PAYMENT
  const handlePayment = () => {
    setPaymentStatus("processing");

    const paystackPublicKey =
      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    if (!paystackPublicKey) {
      alert("Paystack public key is missing.");
      setPaymentStatus("idle");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,

      email: "customer@example.com",

      // Paystack expects the amount in kobo/cents.
      // R250 = 25000
      amount: booking.price * 100,

      currency: "ZAR",

      callback: function (response) {
        console.log("Payment successful:", response);

        setPaymentReference(response.reference);

        setPaymentStatus("success");

        // Show success modal
        setShowModal(true);
      },

      onClose: function () {
        console.log("Payment window closed");

        if (paymentStatus !== "success") {
          setPaymentStatus("idle");
        }
      },
    });

    handler.openIframe();
  };

  return (
    <div className="checkout-page">

      {/*  
          HEADER
        */}
      <header className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your venue booking</p>
      </header>


      <main className="checkout-container">

        {/*  
            BOOKING DETAILS
        */}
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


        {/* 
            PAYMENT
         */}
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


            {/* 
                PAYMENT STATUS
            */}

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


            {/* 
                PAY BUTTON
             */}

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


      {/* 
          SUCCESS MODAL
       */}

      {showModal && (
        <div className="modal-overlay">

          <div className="payment-modal">

            <div className="success-icon">
              ✓
            </div>

            <h2>Payment Successful!</h2>

            <p>
              Your payment has been completed successfully.
            </p>

            <div className="payment-details">

              <p>
                <strong>Venue:</strong>{" "}
                {booking.venue}
              </p>

              <p>
                <strong>Seat:</strong>{" "}
                {booking.seat}
              </p>

              <p>
                <strong>Amount:</strong>{" "}
                R{booking.price}
              </p>

              <p>
                <strong>Reference:</strong>{" "}
                {paymentReference}
              </p>

            </div>

            <button
              className="continue-button"
              onClick={() => setShowModal(false)}
            >
              Continue
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Checkout;