// React-specific entry point to allow generating React hooks
import { createApi } from "@reduxjs/toolkit/query/react";
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
    }),
});

export const { useGetUserDetailsQuery } = authApi;
