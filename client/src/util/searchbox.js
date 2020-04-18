import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
var timer = 1;
class SearchBar extends Component{
    state = {queryString : "", searchedData : [], searchResultsDisplay : false};

    componentDidMount(){ 
        this.props.getSearchData(); 
        this.props.fetchProjectList();
    }

    handleSearch = event => {
        let queryString = event.target.value;
        console.log("this.props.serachedUsers", queryString.length);
        if(queryString.length > 0) this.setState({searchResultsDisplay : true}); else this.setState({searchResultsDisplay:false})
        if(this.props.selectNode === "assigned"){
            let searchedData = this.props.serachedUsers.filter(user => {return user.toLowerCase().includes(queryString.toLowerCase())});}
        else if(this.props.selectNode === "project"){
            let filteredData = this.props.projectList.filter(project => {return project["projectName"].toLowerCase().includes(queryString.toLowerCase())});
            var searchedData= filteredData.map( project => { return project.projectName } );
        }
        this.setState({queryString, searchedData});
    }
    
    hideSearchBar = event => this.setState({searchResultsDisplay : false});
  
    selectUser = event => { 
        debugger;
        timer = 2
        this.setState({ queryString : event.target.innerText, searchResultsDisplay : false});
        if(this.props.selectNode === "assigned")
            this.props.handleProjectManager(event.target.innerText); 
        else if(this.props.selectNode === "project")
            this.props.handleProjectName(event.target.innerText);
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
        return(
            <div  id="searchMainDiv" onBlur={this.hideSearchDiv}>
                <input placeholder="search user..." className="projectNameInput"
                value={this.state.queryString}  onChange={this.handleSearch}  />
                {this.state.searchResultsDisplay === true ?
                <div className="searchBarDiv"  id="searchParaDiv">
                    {this.state.searchedData.map(i => <p className="searchBarPara"
                    value={i} key={i} onClick={this.selectUser}>{i}</p>)}
                </div> : ""}
            </div>
        );
    }
}
const mapStateToProps = state => {
     return { serachedUsers : state.searchBar.searchedUser,
              projectList : state.project.projectList } };

export default connect(mapStateToProps, actions)(SearchBar);