import React, {Component} from "react";

export default class App extends Component{
    
       // let childrenProp = children.filter((child, index) => index !==0);
        render(){
            return(
                <div>
                    {this.props.children}               
                </div>
            ) 
        }
  
    
}