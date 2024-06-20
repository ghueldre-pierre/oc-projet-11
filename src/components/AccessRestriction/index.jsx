import { Navigate, Outlet } from "react-router-dom";
import { getIsConnected } from "../../features/user/userSlice";
import { useSelector } from "react-redux";

function AccessRestriction({ userConnected = true, redirectTo = "/" }) {
    const isConnected = useSelector(getIsConnected);

    if(isConnected !== userConnected) {
        return <Navigate to={redirectTo} replace />;
    }

    return <Outlet />
}

export { AccessRestriction };