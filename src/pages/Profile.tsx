import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { useGetLoggedInUserDetailsQuery } from "../app/services/auth/authService";
import { logout } from "../features/auth/authSlice";

const Profile = () => {
    const { userInfo } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const isFetching = useOutletContext();
    let { username } = useParams();
    if (userInfo?.username !== username) {
        const { data, isFetching } = useGetLoggedInUserDetailsQuery(
            userInfo?.username
        );
    }
    useEffect(() => {}, []);

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
                        <div className="stats">
                            <div className="posts">
                                <p>{userInfo?.posts.length}</p>
                                <p>Posts</p>
                            </div>
                            <div className="followers">
                                <p>{userInfo?.followers.length}</p>
                                <p>Followers</p>
                            </div>
                            <div className="following">
                                <p>{userInfo?.following.length}</p>
                                <p>Following</p>
                            </div>
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
                    <div className="profile-buttons">
                        {username === userInfo?.username ? (
                            <>
                                <button>Edit profile</button>
                                <button>Share Profile</button>
                            </>
                        ) : (
                            <>
                                <button>Follow</button>
                                <button>Message</button>
                            </>
                        )}
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
        padding: 1rem 0;
        margin: 1rem 0;
        width: 100%;
        .posts,
        .followers,
        .following {
            display: flex;
            flex-direction: column;
            align-items: center;
            p {
                font-size: 1rem;
            }
        }
    }
    .profile-buttons {
        display: flex;
        flex-direction: row;
        button {
            flex: 1;
            margin: 0 0.5rem;
        }
    }
`;
