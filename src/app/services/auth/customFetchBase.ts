import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { logout } from "../../../features/auth/authSlice";

const baseUrl = "http://127.0.0.1:5001/";

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, api) => {
        const getState = api.getState as any;
        const token = getState().auth.userToken;
        if (token) {
            // include token in req header
            headers.set("authorization", `Bearer ${token}`);
            return headers;
        }
    },
});

const customFetchBase: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        api.dispatch(logout());
        window.location.href = "/login";
    }
    return result;
};

export default customFetchBase;
