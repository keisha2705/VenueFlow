// const BOOKING_SESSION_KEY = "venueflow_booking_session";

// export function createBookingSession(eventId) {
//   const existing = getBookingSession();

//   // Reuse the existing session for the same event.
//   if (existing && existing.eventId === eventId) {
//     return existing;
//   }

//   const session = {
//     id: crypto.randomUUID(),
//     eventId,
//     createdAt: Date.now(),
//   };

//   sessionStorage.setItem(
//     BOOKING_SESSION_KEY,
//     JSON.stringify(session)
//   );

//   return session;
// }

// export function getBookingSession() {
//   try {
//     const value = sessionStorage.getItem(BOOKING_SESSION_KEY);

//     if (!value) return null;

//     return JSON.parse(value);
//   } catch (error) {
//     console.error("Could not read booking session:", error);
//     return null;
//   }
// }

// export function clearBookingSession() {
//   sessionStorage.removeItem(BOOKING_SESSION_KEY);
// }