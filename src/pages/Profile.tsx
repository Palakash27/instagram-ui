import { useAppSelector } from "../app/hook";

const Profile = () => {
    const { userInfo } = useAppSelector((state) => state.auth);

    return (
        <div>
            <figure>{userInfo?.fullName.charAt(0).toUpperCase()}</figure>
            <span>
                Welcome <strong>{userInfo?.fullName}!</strong> You can view this
                page because you're logged in
            </span>
        </div>
    );
};
export default Profile;
