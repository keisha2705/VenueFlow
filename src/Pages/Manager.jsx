import { useNavigate } from "react-router-dom";
import "../Styling/Manager.css"
function Manager() {
    const navigate = useNavigate();
 return (
        <div className="manager-page">
            <div className="manager-container">
                <div className="manager-header">
                    <h1>Manager Dashboard</h1>
                </div>

                <div className="manager-cards">
                    <div className="manager-card">
                        <h2>Events</h2>
                        <p> View and manage all available events.</p>
                        {/* <button onClick={() => navigate("/events")} className="manager-button"> View Events </button> */}
                        <button onClick={() => navigate("/manager/events")} className="manager-button">Manage Events</button>
                    </div>

                    <div className="manager-card">
                        <h2>Bookings</h2>
                        <p> View and manage your event bookings.</p>
                        <button onClick={() => navigate("/bookings")} className="manager-button"> My Bookings </button>
                    </div>

                    <div className="manager-card">
                        <h2>Venues</h2>
                        <p> Add, edit and manage your event venues. </p>
                        <button onClick={() => navigate("/manager/venues")} className="manager-button" > Manage Venues </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Manager