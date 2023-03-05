import { useLocation } from "react-router-dom";
// import { useAppSelector } from "../app/hook";
import SearchBar from "../components/SearchBar";

const Explore = () => {
    // const { userInfo } = useAppSelector((state) => state.auth);

    const location = useLocation();
    console.log(location.pathname);

    return (
        <div>
            <SearchBar />
        </div>
    );
};
export default Explore;
