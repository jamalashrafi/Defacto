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
        console.log("TicketList from Db is ",response);
        dispatch({ type : TICKET_LIST, payload : response.data});
    }catch(error){
        
        let msg = "";
        if (isNetworkError(error))  msg="It seems you are not connected to network";
        else if (error.response.status === 401)   msg="Invalid credentials";  
        else  msg = "Please try again ";
        console.log("Error in fetching projectList is ",error);
        dispatch({ type : TICKET_LIST_ERROR, payload : msg})

    }
}