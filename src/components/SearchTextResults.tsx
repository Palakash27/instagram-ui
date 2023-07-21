import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSearchUsersQuery } from "../app/services/auth/authService";

interface Props {
    searchText: string;
}

export default function SearchTextResults({ searchText }: Props) {
    let { data: users, isFetching } = useSearchUsersQuery(searchText);
    let navigate = useNavigate();

    return (
        <>
            {isFetching ? (
                <div>Loading...</div>
            ) : (
                <StyledUserList className="user-list">
                    {users?.map((user) => (
                        <li
                            className="user-item"
                            key={user._id}
                            onClick={() => navigate(`/${user.username}`)}
                        >
                            <img
                                src="https://d2r55xnwy6nx47.cloudfront.net/uploads/2019/07/Olivier_1500_Trptch.jpg"
                                alt="user-img"
                            />
                            <div className="username">
                                <p>{user?.username}</p>
                                <p>{user?.fullName}</p>
                            </div>
                        </li>
                    ))}
                </StyledUserList>
            )}
        </>
    );
}

const StyledUserList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    height: 95%;
    overflow-y: scroll;
    overflow-x: hidden;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }

    .user-item {
        display: flex;
        align-items: center;
        padding: 0.5rem 0;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid #dbdbdb;
            margin: 0 1rem;
        }
        .username {
            p {
                margin: 0;
                font-size: 1rem;
                font-weight: 400;
            }
            p:first-child {
                font-weight: 600;
            }
            p:last-child {
                font-weight: 400;
                color: #8e8e8e;
            }
        }
    }
`;
