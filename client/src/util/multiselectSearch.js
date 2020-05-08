import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
var timer=1;
class MultiSelectSearchBar extends Component{
    state = {queryString : "", searchedData : [], filteredData : [], searchResultsDisplay : false};

    componentDidMount(){ 
        // debugger;
        if(this.props.selectNode === "assigned")
            this.props.getSearchData(); 
        else if(this.props.selectNode === "project")
            this.props.fetchProjectList();
        console.log("this.props.selectedUsers11111111111", this.props.ticketAssignedTo);
        if(this.props.ticketAssignedTo)this.setState({filteredData : this.props.ticketAssignedTo, queryString : this.props.ticketAssignedTo[0].data + "..."});
    }

    handleSearch = event => {
       
        let queryString = event.target.value;
        if(queryString.length > 0) this.setState({searchResultsDisplay : true}); else this.setState({searchResultsDisplay:false})
        if(this.props.selectNode === "assigned"){
            if(this.state.searchedData.length > 0 ){
                this.setState({ filteredData : this.state.searchedData.filter(user => {
                    return user["data"].toLowerCase().includes(queryString.toLowerCase())})});
            }else{
                var searchedData = this.props.searchedUsers.map( user => {  
                    let userObj =new Object();;
                    userObj['data'] = user;
                    userObj['checked'] = false;
                    return userObj;
                }) ;
                this.setState({searchedData},() => {
                    this.setState({ filteredData : this.state.searchedData.filter(user => {
                        return user["data"].toLowerCase().includes(queryString.toLowerCase())})})});
            }
        }
        else if(this.props.selectNode === "project"){
            var filteredData = this.props.projectList.filter(project => {return project.projectName.toLowerCase().includes(queryString.toLowerCase())});
            var searchedData= filteredData.map( project => { return project.projectName } );
        }
            
       // this.setState({queryString, searchedData});
    }
    
    hideSearchBar = event => this.setState({searchResultsDisplay : false});
  
    selectUser = event => { 
       debugger
       var checkedUser = this.state.filteredData.map(user => { 
           if(user.data === event.target.value && user.checked === false) user["checked"] = true
           else if(user.data === event.target.value && user.checked === true) user["checked"] = false;
           return user;
        });
        // var checkedUserState = this.state.searchedData.map(user1 => {  
        //     if(user1.data === event.target.value && user1.checked === false) user1["checked"] = true
        //     else if(user1.data === event.target.value && user1.checked === true) user1["checked"] = false;
        //     return user1;
        //  }); 
         this.setState({filteredData : checkedUser, queryString : event.target.value + "..."});
         timer=2;
         let assignedToObj = { data : event.target.value, checked : true }
       this.props.addSelectedUsers(assignedToObj); 
    }
    hideSearchDiv = () => {
        
        setTimeout(()=>{
            if(timer==1){
            this.setState({searchResultsDisplay : false});
            }
        }, 150);
        timer=1;
    
    }
    render(){
        console.log("this.props.selectedUsers11111111111", this.props.ticketAssignedTo);
        return(
            <div  id="searchMainDiv" onBlur={this.hideSearchDiv}>
                <input placeholder="search user..." className="projectNameInput"
                value={this.state.queryString}  onChange={this.handleSearch}  />
                {this.state.searchResultsDisplay === true ?
                <div className="searchBarDiv multiSearchBarDiv"  id="searchParaDiv ">
                    {this.state.filteredData.map(i => <div className="multiSearchDiv row" key={i.data} id="multiSearchDiv"> 
                    <div className="col-xl-3 multiSearchInputDiv">
                    <input type="checkbox"  id={i.data} name="vehicle1" checked={i.checked} onChange={this.selectUser} value={i.data}/></div>
                    <div className="col-xl-9 multiSearchlabelDiv">
                    <label htmlFor={i.data}> {i.data}</label><br></br>  </div>   </div>                
                        )
                    }                 
                </div> : ""}
            </div>
        );
    }
}
const mapStateToProps = state => {
     return { searchedUsers : state.searchBar.searchedUser,
              projectList : state.project.projectList } };

export default connect(mapStateToProps, actions)(MultiSelectSearchBar);