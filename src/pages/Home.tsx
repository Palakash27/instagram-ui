import { useAppSelector } from "../app/hook";

const Home = () => {
    const { userInfo } = useAppSelector((state) => state.auth);

    return (
        <div>
            <span>
                Welcome <strong>{userInfo?.fullName}!</strong> You can view this
                page because you're logged in
            </span>
        </div>
    );
};
export default Home;
