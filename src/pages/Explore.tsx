import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { useAppSelector } from "../app/hook";

const Explore = () => {
    // const { userInfo } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    return (
        <StyledExplore>
            <input
                type="text"
                placeholder="Search"
                onClick={() => navigate("./search")}
            />
            <div>images</div>
        </StyledExplore>
    );
};
export default Explore;

const StyledExplore = styled.div`
    padding: 0.5rem 1rem;
    height: 100%;
    input {
        width: 100%;
        height: 2rem;
        border: 1px solid #dbdbdb;
        border-radius: 0.5rem;
        padding: 1rem;
        font-size: 1rem;
        font-weight: 400;
        text-align: center;
        background-color: #fafafa;
    }
`;
