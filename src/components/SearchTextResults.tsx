import React from "react";
import { useSearchUsersQuery } from "../app/services/auth/authService";

interface Props {
    searchText: string;
}

export default function SearchTextResults({ searchText }: Props) {
    let { data: users, isFetching } = useSearchUsersQuery(searchText);

    return (
        <>
            {isFetching ? (
                <div>Loading...</div>
            ) : (
                <ul className="user-list">
                    {users?.map((user) => (
                        <li className="user-item" key={user._id}>
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
                </ul>
            )}
        </>
    );
}
