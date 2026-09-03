import React, { useEffect, useState } from "react";

// Wire this up at the route you passed as `callbackUrl` in Checkout.jsx
// (e.g. "/payment/callback" in React Router).
const PaymentCallback = () => {
  const [status, setStatus] = useState("verifying"); // verifying | success | error
  const [message, setMessage] = useState("Confirming your payment...");
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");

    if (!reference) {
      setStatus("error");
      setMessage("No payment reference found.");
      return;
    }

    (async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/paystack/verify/${reference}`);
        const data = await response.json();

        if (!response.ok) {
          setStatus("error");
          setMessage(data.message || "We couldn't verify your payment.");
          return;
        }

        setStatus("success");
        setMessage(data.message);
        setBooking(data);
      } catch (error) {
        console.error("Payment verification error:", error);
        setStatus("error");
        setMessage("Something went wrong verifying your payment.");
      }
    })();
  }, []);

  return (
    <div className="max-w-md mx-auto my-12 px-4 text-center">
      {status === "verifying" && <p>{message}</p>}

      {status === "success" && (
        <div>
          <h1 className="text-[22px] font-[600] mb-2">Booking confirmed!</h1>
          <p className="mb-1">{message}</p>
          {booking && (
            <>
              <p className="mb-1">
                Booking reference: <strong>{booking.bookingReference}</strong>
              </p>
              <p className="mb-1">Seats: {booking.seats?.join(", ")}</p>
              <p>Total paid: R{booking.totalPrice}</p>
            </>
          )}
        </div>
      )}

      {status === "error" && (
        <div>
          <h1 className="text-[22px] font-[600] mb-2 text-red-600">
            Payment issue
          </h1>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentCallback;