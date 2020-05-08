import React, { Component } from "react";
import { Dashboard } from "./Dashboard.jsx";
import Project from "./project/Project.jsx";
import Ticket from "./tickets/Tickets.jsx";


export default class SideBarComponent extends Component{

    changeRender = event => {
          let currentrightcomponent = localStorage.getItem("currentrightcomponenet");

          if(event.target.value === "project")this.props.changeRender(Project); 
          else if(event.target.value === "dashboard")this.props.changeRender(Dashboard); 
          else if(event.target.value === "ticket"){
               // if(currentrightcomponent == "createnewTicket"){
               //      var choice = prompt("You data will be lost you want to continue");
               //      if(choice){
               //           this.props.changeRender(Ticket); 
               //      }else{}
               // }else{
                    this.props.changeRender(Ticket); 
               // }
          }
    }

    render(){
          return (
               <div id="sideBarComp">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 sideBarElement">
                         <button value="dashboard" onClick={this.changeRender}>Dashboard</button>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 sideBarElement">
                         <button value="project" onClick={this.changeRender}>Project</button>
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 sideBarElement">
                         <button value="ticket" onClick={this.changeRender}>Tickets</button>
                    </div>
               </div>
          )
     }
}