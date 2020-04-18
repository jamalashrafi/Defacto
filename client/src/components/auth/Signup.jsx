import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../../actions";
import DisplayVideo from "./DisplayVideo.jsx";
import { validate } from "../../util/utility.js";
var flag = false;
class Signup extends Component {
    
    state = { userName : "", password : "", email : "", userNameValidate : "",
    emailValidate : "", passwordValidate : "", role : "", roleValidate : ""};

    componentDidMount(){ this.props.getUserRoles();}

    handleName = event => this.setState({ userName : event.target.value});   

    handlePassword = event => this.setState({ password : event.target.value});

    handleEmail = event => this.setState({ email : event.target.value});

    handleRole = event => this.setState({ role : event.target.value});

    registerUser = event => {
        event.preventDefault();
        let userObj = {userName:this.state.userName,
                        password:this.state.password,
                        email:this.state.email,
                        role:this.state.role};
        console.log(userObj);
        if(validate(this, "signup")){
            flag = true;
            this.props.signup(userObj, response => {
                console.log("response.data",this.props.authenticated);
                if(response.data === "userNameValidate") this.setState({ userNameValidate : "username already exists"})
                else if(response.data === "emailValidate") this.setState({ emailValidate : "email already exists"})
                else if(response.data.Msg === "success") flag = false; 
                localStorage.setItem("authenticated",response.data.token);
                this.props.history.push({
                    pathname : "/",
                    state: { Msg : "success" }});                  
            });
        }
    }

    renderComponent = () => {
        if(flag)return <div>Loading...</div>
        else{
            return ( 
        <div>
            <DisplayVideo />
            <div className="row">
            
                <div className="col-xs-3 col-sm-4 col-md-4 col-lg-4 col-xl-3"></div>
                <div className="col-xs-3 col-sm-7 col-md-7 col-lg-7 col-xl-6 loginForm signupForm">
                    <h2><label>Create Your Profile</label></h2>
                    <form onSubmit={this.registerUser}>
                       <div className="form-group">
                            <span className="glyphicon glyphicon-user loginIcon"></span>
                            <input type="text" id="userName" value={this.state.userName} onChange={this.handleName}
                            className="form-control loginInput" placeholder="User Name" autoComplete="none"/>   
                            <label className="loginValidateMsg">{ this.state.userNameValidate }</label>
                       </div>
                       <div className="form-group">
                            <span className="glyphicon glyphicon-lock loginIcon"></span>
                            <input type="password" value={this.state.password} onChange={this.handlePassword}
                            className="form-control loginInput" placeholder="Password"/>
                            <label className="loginValidateMsg">{ this.state.passwordValidate }</label>
                       </div>
                       <div className="form-group">
                            <span className="glyphicon glyphicon-user loginIcon"></span>
                            <input type="email" value={this.state.email} onChange={this.handleEmail}
                            className="form-control loginInput" placeholder="Email" />
                            <label className="loginValidateMsg">{ this.state.emailValidate}</label>
                       </div>
                       <div className="form-group">
                            <select className="customSelect selectRoles" onChange = {this.handleRole} id="rolesSelect">
                                <option selected className="rolesOption">Select Role...</option>
                                <option value="1" className="rolesOption" onSelect = {this.handleRole}>Admin</option>
                                <option value="2" className="rolesOption">Manager</option>
                                <option value="3" className="rolesOption">User</option>
                            </select>
                       </div>
                       <label className="loginValidateMsg">{ this.state.roleValidate}</label>
                       <div className="signupDiv">
                            <button className="btn btn-primary loginButton signupButton"
                            type="submit">SignUp</button>
                        </div>
                    </form>
                </div>
                <div className="col-xs-3 col-sm-1 col-md-1 col-lg-1 col-xl-3"></div>
            </div>
        </div>
            )
        }
    }

    render(){
        return(
            <div className="container">
            { this.renderComponent() }
            </div>
        ) 
    }
}

function mapStateToProps(state){
 return {   authenticated : state.auth.authenticated,
            errorMessage : state.auth.errorMessage }
}
export default connect(mapStateToProps, action)(Signup);