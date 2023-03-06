// React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
import { DetailedUserInfo } from "../../../features/auth/authSlice";
import customFetchBase from "./customFetchBase";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        getUserDetails: builder.query({
            query: () => ({
                url: "api/user/profile",
                method: "GET",
            }),
        }),
        searchUsers: builder.query<DetailedUserInfo[], string>({
            query: (searchTerm) => ({
                url: `api/user/search?query=${searchTerm}`,
                method: "GET",
            }),
            keepUnusedDataFor: 0,
        }),
    }),
});

export const { useGetUserDetailsQuery, useSearchUsersQuery } = authApi;
