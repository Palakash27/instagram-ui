import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useGetLoggedInUserDetailsQuery } from "../app/services/auth/authService";
import { setCredentials } from "../features/auth/authSlice";

const ProtectedRoute = () => {
    const { userToken, userInfo } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    // show unauthorized screen if no user is found in redux store

    const dispatch = useAppDispatch();

    // automatically authenticate user if token is found
    const { data, isFetching } = useGetLoggedInUserDetailsQuery(
        userInfo?.username,
        {
            // perform a refetch every 15mins
            pollingInterval: 900000,
        }
    );

    useEffect(() => {
        if (data) dispatch(setCredentials(data));
    }, [data, dispatch]);

    useEffect(() => {
        if (!userToken) {
            navigate("/login");
        }
    }, [userToken, navigate]);

    // returns child route elements
    return <Outlet context={isFetching} />;
};
export default ProtectedRoute;
