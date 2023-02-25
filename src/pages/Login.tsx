import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";

import { userLogin } from "../features/auth/authActions";
import Error from "../components/Error";

const Login = () => {
    const { loading, userInfo, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userInfo) {
            navigate("/user-profile");
        }
    }, [navigate, userInfo]);

    const submitForm = (data: any) => {
        dispatch(userLogin(data));
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            {error && <Error>{error}</Error>}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    className="form-input"
                    {...register("email")}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-input"
                    {...register("password")}
                    required
                />
            </div>
            <button type="submit" className="button" disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>
        </form>
    );
};
export default Login;
