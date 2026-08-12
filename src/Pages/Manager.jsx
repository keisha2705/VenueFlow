import { useNavigate } from "react-router-dom";
function Manager() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Manager Dashboard</h1>
            <p>Welcome Manager!</p>
            <button onClick={() => navigate("/events")}> View Events </button>
            <button onClick={() => navigate("/bookings")}> My Bookings</button>
            <button onClick={() => navigate("/manager/venues")}> Manage Venues</button>
        </div>
    );
}

export default Manager