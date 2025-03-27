import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "@/contexts/AuthContext";

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles = [] }: ProtectedRouteProps) => {
    const { isAuthenticated, currentUser } = useContext(AuthContext);

    console.log(currentUser)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If there are allowed roles specified, check if the user has permission
    if (allowedRoles.length > 0 && currentUser && !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;