import axios from "axios";
import { PROJECT_LIST, Project_LIST_ERROR, SEARCHBAR_DATA } from "./types.js";
import { isNetworkError } from "../util/utility.js";
import { BASE_URL } from "../util/serverConfig.js";

export const fetchProjectList = () => async dispatch => {
    const token = localStorage.getItem("token");
    
    try{
        const response = await axios.get(`${BASE_URL}/listProjects`, 
        { headers : {'Authorization': token} });
        //console.log("ProjectList from Db is ",response);
        dispatch({ type : PROJECT_LIST, payload : response.data});
    }catch(error){
        
        let msg = "";
        if (isNetworkError(error))  msg="It seems you are not connected to network";
        else if (error.response.status === 401)   msg="Invalid credentials";  
        else  msg = "Please try again ";
        //console.log("Error in fetching projectList is ",error);
        dispatch({ type : Project_LIST_ERROR, payload : msg})

    }
}

export const getUserRoles = () => async dispatch => {
    try{
        const response = await axios.get("http://localhost:41111/");
        localStorage.setItem("userRoles", response.data[0].roleName);
    }catch(error){
        //console.log("Error Message from UserTable", error);
    }
}//Error handling left

// Search Bar Action
export const getSearchData = () => async dispatch => {
    try{
        const response = await axios.get("http://localhost:41111/getUsers");
        //console.log("response", response);
        let filteredUserList = response.data.map(user => { return user.userName });
        //console.log("filteredUserList", filteredUserList)
        dispatch({ type : SEARCHBAR_DATA, payload : filteredUserList});
    }catch(error){
        let msg = "";
        if (isNetworkError(error))  msg="It seems you are not connected to network";
        else if (error.response.status === 401)   msg="Invalid credentials";  
        else  msg = "Please try again ";
        //console.log("Error in fetching projectList is ",error, msg);
    }
}//Error handling left

//CreateProject

export const createProject = (projectObj, callback) => async dispatch => {
    debugger;
    let authorization = localStorage.getItem("token");
    let headers = { "authorization" : authorization, 'Accept' : 'application/json', 'Content-Type': 'application/json' };
    try{
        const response = await axios.post("http://localhost:41111/createProject", projectObj, { headers });//Es6 {header : header}
        //console.log("response.data after create project", response.data);
        dispatch({ type : PROJECT_LIST, payload : response.data.projectList});
        callback(response);
    }catch(error){
        let msg = "";
        if (isNetworkError(error))  msg="It seems you are not connected to network";
        else if (error.response.status === 401)   msg="Invalid credentials";  
        else  msg = "Please try again ";
        //console.log("Error in fetching projectList is ",error, msg);
    }
}