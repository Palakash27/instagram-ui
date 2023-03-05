import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hook";

const ProtectedRoute = () => {
    const { userToken } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    // show unauthorized screen if no user is found in redux store

    useEffect(() => {
        if (!userToken) {
            navigate("/login");
        }
    }, [userToken, navigate]);

    // returns child route elements
    return <Outlet />;
};
export default ProtectedRoute;
