import React, { Component } from "react";
import Header from "./Header.jsx";
import { Dashboard } from "./Dashboard.jsx";
import SideBarComponent from "./SideBarComponent.jsx";

export default class Sidebar extends Component{

     state = { renderedComponent : Dashboard };
 
     changeRender = stateValue => this.setState({renderedComponent : stateValue});

     render(){
          return (
          <div id="container" >    
               <Header />  
               <div  className="sideBarContainer">
                    <div className = "row sideBarClass">
                         <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-2">
                              <SideBarComponent changeRender={this.changeRender} />
                         </div>
                         <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-10">
                             {< this.state.renderedComponent  changeRender={this.changeRender} />}
                         </div>
                    </div>
               </div>
          </div>
          )
     }
}