import React, {Component} from "react";
import { connect } from "react-redux";
import SearchBar from "../../util/searchbox.js";
import Project from "./Project.jsx";
import { validate } from "../../util/utility.js";
import * as actions from "../../actions";
var flag = false;

class CreatenewProject extends Component{
    state = { projectName : "", projectDescription : "", projectManager  : "", 
              projectNameValidate : "", projectDescriptionValidate : "", projectManagerValidate : ""};

    back = () => this.props.changeRender(Project);

    handleProjectName = event => this.setState({ projectName : event.target.value });

    handleProjectDescription = event => this.setState({ projectDescription : event.target.value });

    handleProjectManager = event => this.setState({projectManager : event });

    createProject = event => {
        event.preventDefault();
        const createdBy = localStorage.getItem("userProfile");
        let projectObj = { projectName : this.state.projectName,
                           projectDescription : this.state.projectDescription,
                           projectManager : this.state.projectManager,
                           createdBy : createdBy.userName };

        if(validate(this, "createProject")){
            flag = true;
            this.props.createProject(projectObj, response => {
                if(response.data.Msg === "Same project name exists") this.setState({ projectNameValidate : "username already exists"})
                else if(response.data.Msg === "project saved successfully") flag = false;
                this.back();
            });
        }
    }

    render(){
        return(
            <div className="createProjectContainer">
                <div className="createProjectDiv">
                    <h3 className="createProjectHeading">Create New Project</h3>
                    <div className="row">
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-xs-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 projectLabelDiv">
                            <form>
                                <div className="row">
                                    <div className="col-xs-6 col-sm-5 col-md-5 col-lg-4 col-xl-4 form-group createProjectName projectLblCol">
                                        <label>Project Name :</label>
                                    </div>
                                    <div className="col-xs-6 col-sm-7 col-md-7 col-lg-8 col-xl-8 form-group createProjectForm createProjectName projctLblRight">
                                    <input type="text" onChange={this.handleProjectName} value={this.state.projectName} 
                                        className="formControl projectNameInput" />   
                                        <label className="loginValidateMsg projectLabelMsg">{ this.state.projectNameValidate }</label> 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6 col-sm-5 col-md-5 col-lg-4 col-xl-4 form-group createProjectName projectLblCol">
                                         <label>Manager :</label>
                                         <label>Description :</label>
                                    </div>
                                    <div className="col-xs-6 col-sm-7 col-md-7 col-lg-8 col-xl-8 form-group createProjectForm projctLblRight">
                                        <SearchBar handleProjectManager={this.handleProjectManager}/>
                                        <label className="loginValidateMsg projectLabelMsg">{ this.state.projectManagerValidate }</label>
                                        <textarea className="formControl projectDescription"  onChange={this.handleProjectDescription} 
                                        value={this.state.projectDescription}
                                        placeholder="Max 120 words" maxLength = "120" rows="1" /> 
                                        <label className="loginValidateMsg projectLabelMsg">{ this.state.projectDescriptionValidate }</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xs-6 col-sm-5 col-md-5 col-lg-5 col-xl-4"></div>
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-7 col-xl-4">
                                        <button className="btn btn-primary loginButton " style={{ backgroundColor : "blue"}}
                                        onClick={this.createProject}>Create Project</button>
                                    </div>
                                    <div className="col-xl-4"></div>
                                </div>

                            </form>
                        </div>
                        <div className="col-xl-1"></div>
                    </div>{/**Row ends here */}
                </div>
            </div>
        )
    }
}

//const mapStateToprops = state => return { }
export default connect(null, actions)(CreatenewProject);