import { AUTH_TYPE, AUTH_SIGNIN, AUTH_ERROR } from "../actions/types.js";

const INITIAL_STATE = {
    authenticatedSignup : "",
    authenticatedSignin : "",
    errorMessage : ""
};

export default function(state = INITIAL_STATE, action){
    switch(action.type){
        case AUTH_TYPE :
            return {...state, authenticated : action.payload };
        case AUTH_SIGNIN :
            return {...state, authenticatedSignin : action.payload };
        case AUTH_ERROR :
            return {...state, errorMessage : action.payload};
        default :
            return state;    
    }
}