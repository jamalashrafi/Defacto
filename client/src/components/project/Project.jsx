import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CreatenewProject from "./CreatenewProject.jsx";


class Project extends Component {

    componentDidMount = () => {
        this.props.fetchProjectList();
        console.log("Project data is ---", this.props.projectList);
    }
    renderProjectList = () => {
        return this.props.projectList.map( (item, index)  => {
         return <li className="listGroupItem" key={index}> { item.projectName } </li>
     })
    }
    createNewProject = () => {
        //this.props.props.history.push("/createNewProject");
        this.props.changeRender(CreatenewProject);
    }

    render(){
        
        return(
            <div  className="projectListContainer">
                <div className="row">
                    <div className="col-xl-2 createNewProject">
                    <button className="btn btn-primary loginButton" style={{ backgroundColor : "blue"}}
                                    onClick={this.createNewProject}>New</button>
                    </div>
                    <div className="col-xl-8 "></div>
                    <div className="col-xl-2 createNewProject">
                    <button className="btn btn-primary loginButton" style={{ backgroundColor : "blue"}}>Search</button>
                    </div>
                </div>{/**Header Section of ProjectMain Page ends here */}
                <div>
                    <ul className="list-group">{this.renderProjectList()}</ul>                  
                </div>
                
            </div>
        )

    }
}

const mapStateToProps = state => {
    return { projectList : state.project.projectList,
    projectListError : state.project.projectListError };
}

export default connect(mapStateToProps, actions)(Project);