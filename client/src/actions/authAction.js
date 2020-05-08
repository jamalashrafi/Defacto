import axios from "axios";
import { AUTH_TYPE, AUTH_SIGNIN, AUTH_ERROR } from "./types.js";
import { isNetworkError } from "../util/utility.js";
import history from "../util/history.js";
import { BASE_URL } from "../util/serverConfig.js";

export const signup = (userObj, callback) => async dispatch => {
    try{
        const response = await axios.post(`${BASE_URL}/signup`,userObj);
           // console.log("Response after saving user", response);
            callback(response);           
            dispatch({ type : AUTH_TYPE, payload : response.data.token });
            localStorage.setItem("token",response.data.token);
    }catch(error){
        let msg = "";
        if (isNetworkError(error))  msg="It seems you are not connected to network";
        else if (error.response.status === 422)   msg="All the fields are mandatory";  
        else  msg = "Please try again ";
        dispatch({ type : AUTH_ERROR, payload : msg });
    }       
} 

export const signout = () => {
    localStorage.removeItem("token");
    return {
        type: AUTH_TYPE,
        payload : ""
    }
}

export const signin = (loginObj, callback) => async dispatch => {

    try{
        const response = await  axios.post(`${BASE_URL}/signin`, loginObj);
       //console.log("Login response", response);
        dispatch({ type : AUTH_SIGNIN, payload : response.data.token });
        history.replace("/sidebar");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userProfile", JSON.stringify(response.data.userProfile));
        callback(response);
   } catch(error){
        //console.log("error in processing", error.response.status,  "----------", error.status);
        let msg = "";
        if (isNetworkError(error))  msg="It seems you are not connected to network";
        else if (error.response.status === 401)   msg="Invalid credentials";  
        else  msg = "Please try again ";
        dispatch({ type : AUTH_ERROR, payload : msg});
   }
};

export const clearAuthStore = () => dispatch => {
    dispatch({ type : AUTH_TYPE, payload : ""});
    dispatch({ type : AUTH_ERROR, payload : ""});
}