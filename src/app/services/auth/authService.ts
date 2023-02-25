// React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isTokenExpired } from "../../../utils/token";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        // base url of backend API
        baseUrl: "http://127.0.0.1:5001/",
        // prepareHeaders is used to configure the header of every request and gives access to getState which we use to include the token from the store
        prepareHeaders: (headers, api) => {
            const getState = api.getState as any;

            const token = getState().auth.userToken;
            console.log(`token authapi: ${token}`);
            if (token) {
                // include token in req header
                headers.set("authorization", `Bearer ${token}`);
                return headers;
            }
        },
        fetchFn: (input, init) => {
            if (typeof input == "string") {
                return fetch(input, init);
            }

            let authToken = input.headers.get("authorization");
            authToken = authToken!.replace("Bearer ", "");
            if (authToken && isTokenExpired(authToken)) {
            }

            return fetch(input, init);
        },
    }),
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
