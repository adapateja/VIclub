import axios from "axios";
import { message } from "antd";



//  Register User


export const registerUser = (values) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });

    try {
        await axios.post("/api/users/register", values);
        message.success("User Registered Successfully");
        setTimeout(() => {
            window.location.href = "/login";
        }, 1000);
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        message.error("something went wrong , please try later");
        dispatch({ type: "LOADING", payload: false });
    }
};



//  Login User


export const loginUser = (values) => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });

    try {
        const user = await axios.post("/api/users/login", values);
        
        // Validate code and set role
        const code = values.code;
        if (code !== "Student001" && code !== "Teacher001") {
            message.error("Invalid code. Please enter Student001 or Teacher001");
            dispatch({ type: "LOADING", payload: false });
            return;
        }

        // Add role to user object based on code
        const userData = {
            ...user.data,
            role: code === "Student001" ? "student" : "teacher",
            code: code
        };

        message.success("Login success");
        localStorage.setItem("user", JSON.stringify(userData));
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        message.error("invalid credentials");
        dispatch({ type: "LOADING", payload: false });
    }
};



//  Update User

export const updateUser = (values) => async (dispatch) => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const userid = currentUser._id;

    values._id = userid;

    dispatch({ type: "LOADING", payload: true });

    try {
        const user = await axios.post("/api/users/update", values);
        
        // Preserve code and role from current user session
        const updatedUserData = {
            ...user.data,
            code: currentUser.code,
            role: currentUser.role
        };
        
        message.success("User updated successfully");
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        message.error("something went wrong , please try later");
        dispatch({ type: "LOADING", payload: false });
    }
};



//  Get All Users


export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "LOADING", payload: true });
    try {
        const response = await axios.get("/api/users/getallusers");
        dispatch({ type: "GET_ALL_USERS", payload: response.data });
        dispatch({ type: "LOADING", payload: false });
    } catch (error) {
        dispatch({ type: "LOADING", payload: false });
    }
};
