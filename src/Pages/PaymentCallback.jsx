import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../Styling/CheckoutPage.css";

function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");

    if (!reference) {
      setStatus("error");
      setMessage("No payment reference found in the URL.");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/paystack/verify/${reference}`,
        );
        const data = await response.json();

        if (!response.ok) {
          console.error("Verification failed:", data);
          setStatus("error");
          setMessage(data.message || "Payment verification failed.");
          return;
        }

        setStatus("success");
        setBookingDetails(data);
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("error");
        setMessage("Something went wrong verifying your payment.");
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="checkout-page">
      <main className="checkout-container" style={{ justifyContent: "center" }}>
        <section className="payment-section">
          <div className="payment-card">
            {status === "verifying" && (
              <div className="payment-message">Verifying your payment...</div>
            )}

            {status === "success" && bookingDetails && (
              <>
                <div className="success-icon">✓</div>
                <h2>Payment Successful!</h2>
                <p>Your booking has been confirmed.</p>

                <div className="payment-details">
                  <p>
                    <strong>Reference:</strong> {bookingDetails.bookingReference}
                  </p>
                  <p>
                    <strong>Seats:</strong> {bookingDetails.seats?.join(", ")}
                  </p>
                  <p>
                    <strong>Total:</strong> R{bookingDetails.totalPrice}
                  </p>
                </div>

                <button
                  className="continue-button"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </button>
              </>
            )}

            {status === "error" && (
              <>
                <h2>Payment Verification Failed</h2>
                <p className="payment-error">{message}</p>
                <button
                  className="continue-button"
                  onClick={() => navigate("/dashboard")}
                >
                  Back to Dashboard
                </button>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default PaymentCallback;