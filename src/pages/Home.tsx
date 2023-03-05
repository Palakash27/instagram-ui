import { useOutletContext } from "react-router-dom";
import { useAppSelector } from "../app/hook";

const Home = () => {
    const { userInfo } = useAppSelector((state) => state.auth);
    const isFetching = useOutletContext();

    return (
        <div>
            {isFetching ? (
                "Loading..."
            ) : (
                <span>
                    Welcome <strong>{userInfo?.fullName}!</strong> You can view
                    this page because you're logged in
                </span>
            )}
        </div>
    );
};
export default Home;
