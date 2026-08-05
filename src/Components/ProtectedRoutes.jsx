import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
// means user is not logged in
    if (!token || !user) {
        return <Navigate to="/" />;
    }
// User is logged in but has the wrong role
    if (role && user.role !== role) {
        return <Navigate to="/*" />;
    }
    return children;
}

export default ProtectedRoute;