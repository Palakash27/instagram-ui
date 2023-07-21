import { NavLink } from "react-router-dom";
import { useAppSelector } from "../app/hook";
import styled from "styled-components";

const Footer = () => {
    const { userInfo } = useAppSelector((state) => state.auth);

    return (
        <StyledFooter>
            <nav className="container navigation">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/explore">Explore</NavLink>
                <NavLink to={`/${userInfo?.username}`}>
                    {userInfo?.username}
                </NavLink>
            </nav>
        </StyledFooter>
    );
};
export default Footer;

const StyledFooter = styled.footer`
    position: fixed;
    transform: translate(50%, 0);
    left: 0;
    bottom: 0;
    margin: 0 auto;
    max-width: 50vw;
    width: 100%;
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: inherit;
    height: 3rem;
    border-top: 2px solid #dbdbdb;
    background-color: #fafafa;
    nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: row;
    }
`;
