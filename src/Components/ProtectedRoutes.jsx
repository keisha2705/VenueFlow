import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
    // Simulate user authentication (replace with actual user context)
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        return <Navigate to="/" />;
    } else if (user.role !== role) {
        return <Navigate to="/*" />;
    }
    return (
        children
    )
}

export default ProtectedRoute