import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGetUserDetailsQuery } from "../app/services/auth/authService";
// import { getUserDetails } from "../features/auth/authActions";
import { logout, setCredentials } from "../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../app/hook";

const Header = () => {
    const { userInfo } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    console.log(`userInfo: ${JSON.stringify(userInfo)}`);
    // // automatically authenticate user if token is found
    // useEffect(() => {
    //     if (userToken) {
    //         dispatch(getUserDetails());
    //     }
    // }, [userToken, dispatch]);

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
        // perform a refetch every 15mins
        pollingInterval: 900000,
    });

    useEffect(() => {
        console.log(`data: ${JSON.stringify(data)}`);
        if (data) dispatch(setCredentials(data));
    }, [data, dispatch]);

    return (
        <header>
            <div className="header-status">
                <span>
                    {isFetching
                        ? `Fetching your profile...`
                        : userInfo !== null
                        ? `Logged in as ${userInfo.email}`
                        : "You're not logged in"}
                </span>
                <div className="cta">
                    {userInfo ? (
                        <button
                            className="button"
                            onClick={() => dispatch(logout())}
                        >
                            Logout
                        </button>
                    ) : (
                        <NavLink className="button" to="/login">
                            Login
                        </NavLink>
                    )}
                </div>
            </div>
            <nav className="container navigation">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/user-profile">Profile</NavLink>
            </nav>
        </header>
    );
};
export default Header;
