import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { logout } from "../features/auth/authSlice";

const Profile = () => {
    const { userInfo } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const isFetching = useOutletContext();

    return (
        <ProfileContainer>
            {isFetching ? (
                `Fetching your profile...`
            ) : userInfo === null ? (
                "You're not logged in"
            ) : (
                <>
                    <div className="image">
                        <img
                            src="https://d2r55xnwy6nx47.cloudfront.net/uploads/2019/07/Olivier_1500_Trptch.jpg"
                            alt="user-img"
                        />
                        <div className="username">
                            <p>{userInfo?.username}</p>
                            <button>Edit profile</button>
                        </div>
                    </div>
                    <div className="name">
                        <p>
                            {userInfo?.fullName}{" "}
                            <span className="pronouns">
                                {userInfo?.pronouns}
                            </span>
                        </p>
                        <p>{userInfo?.about}</p>
                    </div>
                    <div className="stats">
                        <p>{userInfo?.posts.length}</p>
                        <p>{userInfo?.followers.length}</p>
                        <p>{userInfo?.following.length}</p>
                    </div>
                    {userInfo && (
                        <button
                            className="button"
                            onClick={() => dispatch(logout())}
                        >
                            Logout
                        </button>
                    )}
                </>
            )}
        </ProfileContainer>
    );
};
export default Profile;

const ProfileContainer = styled.div`
    .image {
        display: flex;
        .username {
            flex: 3;
            p {
                font-size: 1.5rem;
            }
            button {
                border: none;
                background-color: #fff;
                color: #0095f6;
                font-size: 1.2rem;
                font-weight: 400;
                cursor: pointer;
            }
        }
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 1px solid #dbdbdb;
            margin: 0 2rem;
        }
    }
    .name {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
        margin: 1rem 0;
        .pronouns {
            font-size: 1.2rem;
            font-weight: 400;
            color: #8e8e8e;
        }
    }
    .stats {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        border-top: 1px solid #dbdbdb;
        border-bottom: 1px solid #dbdbdb;
        padding: 1rem 0;
        margin: 1rem 0;
    }
`;
