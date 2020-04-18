import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import CreatenewTicket from "./CreatenewTicket.jsx";


class Ticket extends Component{

    componentDidMount = () => {
        
        this.props.fetchTicketList();
        console.log("Ticket data is ---", this.props.ticketList);
    }
    renderTicketList = () => {
        return this.props.ticketList.map( (item, index)  => {
         return <li className="listGroupItem" key={index}> { item.ticketName } </li>
     })
    }
    createNewTicket = () => {
        //this.props.props.history.push("/createNewProject");
        this.props.changeRender(CreatenewTicket);
    }

    render(){
        
        return(
            <div  className="projectListContainer">
                <div className="row">
                    <div className="col-xl-2 createNewProject">
                    <button className="btn btn-primary loginButton" style={{ backgroundColor : "blue"}}
                                    onClick={this.createNewTicket}>New</button>
                    </div>
                    <div className="col-xl-8 "></div>
                    <div className="col-xl-2 createNewProject">
                    <button className="btn btn-primary loginButton" style={{ backgroundColor : "blue"}}>Search</button>
                    </div>
                </div>{/**Header Section of ProjectMain Page ends here */}
                <div>
                    <ul className="list-group">{this.renderTicketList()}</ul>                  
                </div>
                
            </div>
        )

    }
}

const mapStateToProps = state => {
    return { ticketList : state.ticket.ticketList,
    ticketListError : state.ticket.ticketListError };
}

export default connect(mapStateToProps, actions)(Ticket);