import React, {Component} from "react";
import { connect } from "react-redux";
import Tickets from "./Tickets.jsx";
import SearchBar from "../../util/searchbox.js";
import CreateTicketForm from "./CreateTicketForm.jsx";
import MultiSelectSearchBar from "../../util/multiselectSearch.js";
import { validate } from "../../util/utility.js";
import * as actions from "../../actions";
var flag = false;
var selectedUsers = [];
class TicketDetails extends Component{
    state = { projectName : "", ticketDescription : "", comments  : "", ticketName : "", ticketNameValidate : "", priority : "", assignedToUsers : [],
              priorityValidate : "", projectNameValidate : "", ticketDescriptionValidate : "", selectedUsersValidate : [],
              selectedValue : [], status : "", statusValidate : "", fileToUpload : "", binaryFile : "", filext : ""};

    back = () => this.props.changeRender(Tickets);

    handleTicketDescription = event => this.setState({ ticketDescription : event.target.value });

    handleComments = event => this.setState({comments : event.target.value });

    handleProjectName  = event => this.setState({ projectName : event });

    handleTicketName = event => this.setState({ticketName : event.target.value});

    handlePriority = event => this.setState({priority : event.target.value});

    handleStatus = event => this.setState({status : event.target.value});

    handleFileUpload = (event, binaryFile, name) => this.setState({fileToUpload : event, binaryFile, filext : name});

    addSelectedUsers = user => {
        let indexOfUser = selectedUsers.indexOf(user);
        if(indexOfUser > -1)selectedUsers[indexOfUser]="";
        else selectedUsers.push(user);
        console.log("Selected Users", selectedUsers);
    }

    componentDidMount(){
        if(this.props.renderedData.assignedTo)this.setState({assignedToUsers : this.props.renderedData.assignedTo});
        if(this.props.renderedData.ticketName)this.setState({ticketName : this.props.renderedData.ticketName});
        if(this.props.renderedData.project)this.setState({projectName : this.props.renderedData.project});
        if(this.props.renderedData.priority)this.setState({priority : this.props.renderedData.priority});
        if(this.props.renderedData.status) this.setState({status : this.props.renderedData.status});
        if(this.props.renderedData.comments) this.setState({comments : this.props.renderedData.comments});
        if(this.props.renderedData.description) this.setState({TicketDescription : this.props.renderedData.description});
        if(this.props.renderedData.filext) this.setState({filext : this.props.renderedData.filext});
        if(this.props.renderedData.fileToUpload) this.setState({fileToUpload : this.props.renderedData.fileToUpload});
    }

    createTicket = event => {
        debugger
        event.preventDefault();
        const createdBy = localStorage.getItem("userProfile");
        let ticketObj = {  ticketName : this.state.ticketName,
                           description : this.state.ticketDescription,
                           priority : this.state.priority,
                           project : this.state.projectName,
                           status : this.state.status,
                           assignedTo : selectedUsers,
                           comments : this.state.comments,
                           assignedBy : createdBy,
                           filext : this.state.filext,
                           fileToUpload : this.state.fileToUpload
                            };

        if(validate(this, "createTicket")){
            flag = true;
            this.props.upload(this.state.fileToUpload, response => {
                ticketObj["fileToUpload"] = response;
                this.props.saveTicket(ticketObj, responseData => {
                    console.log("responseData". responseData);
                })
            })
            // this.props.createProject(projectObj, response => {
            //     if(response.data.Msg === "Same project name exists") this.setState({ projectNameValidate : "username already exists"})
            //     else if(response.data.Msg === "project saved successfully") flag = false;
            //     this.back();
            // });
        }
    }
   
    render(){
        console.log("this.state.hadleFile", this.state.fileToUpload);
        return(
            <div className="createProjectContainer">
                <div className="createProjectDiv createTicketDiv">
                    <h3 className="createTicketHeading">Create New Project</h3>
                    <div className="row">
                        {/*<form>*/}
                            <div className="col-xl-6">
                                <div className="row">
                                    <div className="col-xl-1"></div>
                                    <div className="col-xl-10">
                                        <div className="row">
                                            <div className="col-xl-4 form-group createProjectName">
                                                <label className="ticketLabels">Ticket Name :</label>
                                            </div>
                                            <div className="col-xl-8 form-group createProjectForm createProjectName">
                                            <input type="text" onChange={this.handleTicketName} value={this.state.ticketName} 
                                                className="formControl projectNameInput" />   
                                                <label className="loginValidateMsg projectLabelMsg ticketLabels">{this.state.ticketNameValidate}</label> 
                                            </div>
                                        </div> {/* TicketName ends here*/}
                                        <div className="row">
                                            <div className="col-xl-4 form-group createProjectName">
                                                <label className="ticketLabels">Project :</label>
                                                <label className="ticketLabels">Priority :</label>
                                            </div>
                                            <div className="col-xl-8 form-group createProjectForm createProjectName">
                                                <SearchBar selectNode="project" handleProjectName={this.handleProjectName} 
                                                projectName={this.props.renderedData.project}/> 
                                                <label className="loginValidateMsg projectLabelMsg ticketLabels">{this.state.projectNameValidate}</label> 
                                                <select className="customSelect selectRoles selectRolesTicket projectNameInput" onChange = {this.handlePriority} id="prioritySelect">
                                                    <option selected = {this.state.priority === "Select Priority..."}  className="rolesOption">Select Priority...</option>
                                                    <option selected = {this.state.priority === "P1"} value="P1" className="rolesOption" >P1</option>
                                                    <option selected = {this.state.priority === "P2"} value="P2" className="rolesOption">P2</option>
                                                    <option selected = {this.state.priority === "P3"} value="P3" className="rolesOption" >P3</option>
                                                </select>   
                                                <label className="loginValidateMsg projectLabelMsg ticketLabels">{this.state.priorityValidate}</label>  
                                            </div>
                                        </div>{/* ProjectName ends here*/}
                                        <div className="row">
                                            <div className="col-xl-4 form-group createProjectName">
                                                <label className="ticketLabels">Status :</label>
                                                <CreateTicketForm handleFileUpload={this.handleFileUpload}
                                                fileToUpload={this.state.fileToUpload ? this.state.fileToUpload : this.props.renderedData.fileToUpload}
                                                 binaryFile={this.state.binaryFile} filext={this.state.filext?this.state.fileToUpload:this.props.renderedData.filext}/>
                                            </div>
                                            <div className="col-xl-8 form-group createProjectForm createProjectName">
                                            <select className="customSelect selectRoles selectRolesTicket projectNameInput" onChange = {this.handleStatus} id="statusSelect">
                                                <option selected = {this.state.status === "Select Status..."}  className="rolesOption">Select Status...</option>
                                                <option selected = {this.state.status === "1"} value="1" className="rolesOption" >Admin</option>
                                                <option selected = {this.state.status === "2"} value="2" className="rolesOption" >Manager</option>
                                                <option selected = {this.state.status === "3"} value="3" className="rolesOption" >User</option>
                                            </select>   
                                                <label className="loginValidateMsg projectLabelMsg ticketLabels">{this.state.statusValidate}</label> 
                                            </div>
                                        </div>{/* Priority ends here*/}
                                    </div>{/* col 10 ends here*/}
                                    <div className="col-xl-1"></div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="row">
                                    <div className="col-xl-1"></div>
                                    <div className="col-xl-10">
                                        <div className="row">
                                                <div className="col-xl-4 form-group createProjectName">
                                                    <label className="ticketLabels">Assigned to :</label>
                                                    <label className="ticketLabels">Description :</label>
                                                </div>
                                                <div className="col-xl-8 form-group createProjectForm createProjectName">
                                                    <MultiSelectSearchBar selectNode="assigned" addSelectedUsers={this.addSelectedUsers}
                                                    ticketAssignedTo={this.props.renderedData.assignedTo} /> 
                                                    <label className="loginValidateMsg projectLabelMsg ticketLabels"></label> 
                                                    <textarea className="formControl projectDescription ticketDescription"  onChange={this.handleTicketDescription} 
                                                        value={this.state.TicketDescription}
                                                        placeholder="Max 200 letters" maxLength = "200" rows="3" /> 
                                                    <label className="loginValidateMsg projectLabelMsg ticketLabels">{this.state.ticketDescriptionValidate}</label>
                                                </div>
                                            </div>{/* Multiselect ends here*/}
                                            <div className="row">
                                                <div className="col-xl-4 form-group createProjectName">
                                                    <label className="ticketLabels">Comments :</label>
                                                </div>
                                                <div className="col-xl-8 form-group createProjectForm createProjectName">
                                                <textarea className="formControl projectDescription ticketComments"  onChange={this.handleComments} 
                                                    value={this.state.comments}
                                                    placeholder="Max 200 letters" maxLength = "200" rows="3" /> 
                                                    <label className="loginValidateMsg projectLabelMsg ticketLabels"></label>   
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xl-6">
                                                <button className="btn btn-primary loginButton ticketButton" style={{ backgroundColor : "blue"}}
                                        onClick={this.createTicket}>Create Ticket</button>
                                                </div>
                                                <div className="col-xl-6">
                                                <button className="btn btn-primary loginButton ticketButton" style={{ backgroundColor : "blue"}}
                                        onClick={this.createProject}>Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="col-xl-1"></div>
                                </div>
                            </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        )
    }
}

//const mapStateToprops = state => return { }
export default connect(null, actions)(TicketDetails);