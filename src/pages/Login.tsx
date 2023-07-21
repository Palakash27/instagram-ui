import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hook";

import { userLogin } from "../features/auth/authActions";
import Error from "../components/Error";
import styled from "styled-components";

const Login = () => {
    const { loading, userInfo, error } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    // redirect authenticated user to profile screen
    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [navigate, userInfo]);

    const submitForm = (data: any) => {
        dispatch(userLogin(data));
    };

    return (
        <StyledForm onSubmit={handleSubmit(submitForm)}>
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
        </StyledForm>
    );
};
export default Login;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto 0;

    .form-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        width: 90%;
        margin: 1rem 0;
    }
    input {
        width: 100%;
        height: 3rem;
        margin: 0.5rem 0;
        border: 1px solid #dbdbdb;
        border-radius: 0.3rem;
        padding: 0 1rem;
        font-size: 1.5rem;
        font-weight: 400;
        background-color: #fafafa;
    }
    button {
        width: 90%;
        height: 3rem;
        margin: 1rem;
        border: none;
        border-radius: 0.3rem;
        padding: 0 1rem;
        font-size: 1.5rem;
        font-weight: 400;
        background-color: #0095f6;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
    }
`;
