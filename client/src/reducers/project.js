import { PROJECT_LIST, Project_LIST_ERROR } from "../actions/types.js";

const INITIAl_STATE = {
    projectList : [],
    projectListError : ""
}

export default function (state = INITIAl_STATE, action){
        switch(action.type){
            case PROJECT_LIST :
                return { ...state, projectList : action.payload };
            case Project_LIST_ERROR :
                return { ...state, projectListError : action.payload };
            default :
                return state; 
        }

} 