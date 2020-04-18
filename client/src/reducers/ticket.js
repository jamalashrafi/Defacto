import { TICKET_LIST, TICKET_LIST_ERROR } from "../actions/types.js";

const INITIAl_STATE = {
    ticketList : [],
    ticketListError : ""
}

export default function (state = INITIAl_STATE, action){
        switch(action.type){
            case TICKET_LIST :
                return { ...state, ticketList : action.payload };
            case TICKET_LIST_ERROR :
                return { ...state, ticketListError : action.payload };
            default :
                return state; 
        }

} 