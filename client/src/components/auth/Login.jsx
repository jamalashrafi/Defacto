import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { validate } from "../../util/utility.js";
import DisplayVideo from "./DisplayVideo.jsx";

class Login extends Component {
    
    state = { userName : "", password : "", userNameValidate : "",
    passwordValidate : ""};
 
    handleName = event => this.setState({ userName : event.target.value});   

    handlePassword = event => this.setState({ password : event.target.value});
   
    register = () => this.props.history.push("/signup"); 

    renderMesage = () => {
     
        if(this.props.authenticated || this.props.errorMessage){          
            return ( 
            <div className="alert alert-success registerSuccessAlert" role="alert">
               { this.props.errorMessage ? this.props.errorMessage : "Successfully Registered!!! " }
            </div>
            ); }
    }

    componentWillUnmount(){ this.props.clearAuthStore(); }
   
    onSubmit = event => {
        debugger;
        event.preventDefault();
        if(validate(this, "login")){
        let loginObj = { userName : this.state.userName,
            password : this.state.password };
            this.props.signin(loginObj, response => { });
        } 
    }
    
    render(){
       
        return(
            <div className="container">
                <DisplayVideo />
                <div className="row">
                
                    <div className="col-xs-3 col-sm-4 col-md-4 col-lg-4 col-xl-3"></div>
                    <div className="col-xs-3 col-sm-7 col-md-7 col-lg-7 col-xl-6 loginForm">
                    { this.renderMesage() }
                        <h2><label>Welcome to Defacto</label></h2>
                        <form onSubmit= { this.onSubmit}>
                           <div className="form-group">
                               
                                <span className="glyphicon glyphicon-user loginIcon"></span>
                                <input type="text" id="userName" className="form-control loginInput" value={this.state.userName} onChange={this.handleName}
                                autoComplete="none" placeholder="User name" />
                                 <label className="loginValidateMsg">{ this.state.userNameValidate }</label>
                                
                           </div>
                           <div className="form-group">
                                <span className="glyphicon glyphicon-lock loginIcon"></span>
                                <input type="password" className="form-control loginInput" value={this.state.password} onChange={this.handlePassword}
                                  placeholder="Password"/>
                                 <label className="loginValidateMsg">{ this.state.passwordValidate }</label>
                           </div>
                           <div className="row">
                               <div className="col-lg-6">
                                    <button className="btn btn-primary loginButton pull-left" type="submit">Login</button>
                               </div>
                               <div className="col-lg-6">
                                    <button className="btn btn-primary loginButton pull-left"
                                    onClick={this.register}>Register</button>
                               </div>
                           </div>
                        </form>
                    </div>
                    <div className="col-xs-3 col-sm-1 col-md-1 col-lg-1 col-xl-3"></div>
                </div>
                 
            </div>
        )
    }

}

const mapStateToProps = state => { 
    return { authenticated : state.auth.authenticated,
             errorMessage : state.auth.errorMessage } }
export default connect(mapStateToProps, actions)(Login);
// export default compose(connect(mapStateToProps, actions),
// withRouter)(Login);
