import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import { Route, Router } from "react-router-dom";
import reducers from "./reducers";
import history from "./util/history.js";
import App from "./components/App.jsx";
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Project  from "./components/project/Project.jsx";
import ProjectDetails from "./components/project/ProjectDetails.jsx";
import CreatenewProject from './components/project/CreatenewProject.jsx';


const store = createStore(
    reducers,
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store = { store }>
        <Router history={history}>
            <App>
                <Route path="/" exact component={Login} />
                <Route path="/sidebar" exact component={Sidebar} /> 
                <Route path="/signup"  component={Signup} />
                <Route path="/dashboard"  component={Dashboard} />  
                <Route path="/project" component={Project}/>
                <Route path="/projectDetails" component={ProjectDetails} />
                <Route path="/createNewProject" component={CreatenewProject} />
            </App>
        </Router>       
    </Provider>,
    document.querySelector("#root")
);