import React, {Component} from "react";

export default class Header extends Component{
    render(){
        return (
            <div >
            <div className = "row headerClass">
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                        Logo
                </div>
                <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">
                    Content
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                    SignOut
                </div>
            </div>
            </div>
        )
    }
}