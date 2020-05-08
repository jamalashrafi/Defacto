import React, { Component } from "react";
import Header from "./Header.jsx";
import { Dashboard } from "./Dashboard.jsx";
import SideBarComponent from "./SideBarComponent.jsx";

export default class Sidebar extends Component{

     state = { renderedComponent : Dashboard, renderedData : "" };
 
     changeRender = (stateValue, data) => {          
          this.setState({renderedComponent : stateValue});
          if(data)  this.setState({renderedData : data});
     };

     render(){
          return (
          <div id="container" >    
               <Header />  
               <div  className="sideBarContainer">
                    <div className = "row sideBarClass">
                         <div className="col-xs-3 col-sm-3 col-md-3 col-lg-2 col-xl-2 sideBarLeftCol">
                              <SideBarComponent changeRender={this.changeRender} />
                         </div>
                         <div className="col-xs-9 col-sm-9 col-md-9 col-lg-10 col-xl-10 sideBarRightCol">
                             {< this.state.renderedComponent 
                             renderedData={this.state.renderedData} changeRender={this.changeRender} />}
                         </div>
                    </div>
               </div>
          </div>
          )
     }
}