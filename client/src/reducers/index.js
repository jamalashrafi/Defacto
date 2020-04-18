import { combineReducers } from "redux";
import auth from "./auth.js";
import project from "./project.js";
import searchBar from "./searchBar.js";
import ticket from "./ticket.js";

export default combineReducers({
    auth, //Es6 replacement for auth : auth
    project,
    searchBar,
    ticket
});