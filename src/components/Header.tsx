import { NavLink } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useAppSelector, useAppDispatch } from "../app/hook";

const Header = () => {
    const { userInfo } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    return (
        <header>
            <div className="header-status">
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
