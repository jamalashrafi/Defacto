import { SEARCHBAR_DATA } from "../actions/types.js";

export default function (state = [], action){

    switch(action.type){

        case SEARCHBAR_DATA :
            return { ...state, searchedUser : action.payload };

        default :
            return state;
    }
    
}