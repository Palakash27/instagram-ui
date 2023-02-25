import { NavLink, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hook";

const ProtectedRoute = () => {
    const { userToken } = useAppSelector((state) => state.auth);

    console.log("usertoken ", userToken);

    // show unauthorized screen if no user is found in redux store
    if (!userToken) {
        return (
            <div className="unauthorized">
                <h1>Unauthorized :D</h1>
                <span>
                    <NavLink to="/login">Login</NavLink> to gain access
                </span>
            </div>
        );
    }

    // returns child route elements
    return <Outlet />;
};
export default ProtectedRoute;
