import { useAuth } from "@/contexts/AuthContext";
import { FC, Fragment } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRoute = {
    children: React.ReactNode;
};

const ProtectedRoute: FC<ProtectedRoute> = ({ children }) => {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/sign-in" />
    }

    return <Fragment>{children}</Fragment>;
}

export default ProtectedRoute;