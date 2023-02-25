import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { useGetUserDetailsQuery } from "../app/services/auth/authService";
import { setCredentials } from "../features/auth/authSlice";

const Profile = () => {
    const { userInfo } = useAppSelector((state) => state.auth);

    const dispatch = useAppDispatch();
    // automatically authenticate user if token is found
    const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
        // perform a refetch every 15mins
        pollingInterval: 900000,
    });

    useEffect(() => {
        if (data) dispatch(setCredentials(data));
    }, [data, dispatch]);

    return (
        <div>
            <span>
                {isFetching
                    ? `Fetching your profile...`
                    : userInfo !== null
                    ? `Logged in as ${userInfo.email}`
                    : "You're not logged in"}
            </span>
            <figure>{userInfo?.fullName.charAt(0).toUpperCase()}</figure>
            <span>
                Welcome <strong>{userInfo?.fullName}!</strong> You can view this
                page because you're logged in
            </span>
        </div>
    );
};
export default Profile;
