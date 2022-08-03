import { FC } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface IPropsRequireAuth {
    allowedRoles: Array<number>;
}

const RequireAuth:FC<IPropsRequireAuth> = ({ allowedRoles }) => {
    const { currentUser } = useAuth();
    const location = useLocation();

    return (
        // currentUser?.roles?.find((role:any) => allowedRoles?.includes(role))
        //     ? <Outlet />
        //     : currentUser
        //         ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        //         : <Navigate to="/login" state={{ from: location }} replace />

        currentUser ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;