import axios from "axios";
import { TICKET_LIST, TICKET_LIST_ERROR } from "./types.js";
import { isNetworkError } from "../util/utility.js";
import { BASE_URL } from "../util/serverConfig.js";

//Ticket Fetch List
export const fetchTicketList = () => async dispatch => {
    const token = localStorage.getItem("token");
    
    try{
        const response = await axios.get(`${BASE_URL}/listTickets`, 
        { headers : {'Authorization': token} });
        //console.log("TicketList from Db is ",response);
        dispatch({ type : TICKET_LIST, payload : response.data});
    }catch(error){
        
        let msg = "";
        if (isNetworkError(error))  msg="It seems you are not connected to network";
        else if (error.response.status === 401)   msg="Invalid credentials";  
        else  msg = "Please try again ";
        //console.log("Error in fetching projectList is ",error);
        dispatch({ type : TICKET_LIST_ERROR, payload : msg})

    }
}

export const upload = (formData, callback) => async dispatch => {
    
    console.log("Upload Request ", formData);
    const response = await axios.post(`${BASE_URL}/uploads`, formData);
    //console.log("response",response.data);
    // const readStream = await axios.get(`http://localhost:4111/image/${response.data.file.filename}`);
    callback(response.data.file.filename);
}
export const getFile = (formData, callback) => async dispatch => {
  
    const response = await axios.get(`${BASE_URL}/image/${formData}`);
    //console.log("response",response.data);
    callback(response.data);
}

export const deleteFile = (filename, callback) => async dispatch => {
 
    const response = await axios.post(`http://localhost:4111/files/${filename}`);
    callback(response);
}

export const saveTicket = (ticketObj, callback) => async dispatch => {
    
    let authorization = localStorage.getItem("token");
    let headers = { "authorization" : authorization, 'Accept' : 'application/json', 'Content-Type': 'application/json' };
    try{
        console.log("Ticket save request object", ticketObj);
        const response = await axios.post(`${BASE_URL}/createTicket`, ticketObj, { headers });
        console.log("Ticket save response object", response);
        dispatch({ type : TICKET_LIST, payload : response.data.ticketList});
        callback(response);
    }catch(error){
        let msg = "";
        if (isNetworkError(error))  msg="It seems you are not connected to network";
        else if (error.response.status === 401)   msg="Invalid credentials";  
        else  msg = "Please try again ";
        //console.log("Error in fetching projectList is ",error);
        dispatch({ type : TICKET_LIST_ERROR, payload : msg})
    }
}