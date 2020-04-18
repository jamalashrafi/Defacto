export const  validate = (_this, Msg) => {
    
    let validateFlag = true;

        if(Msg === "login"){
            if(!_this.state.userName){
                _this.setState({userNameValidate : "username is required"});
                validateFlag = false;
            }else {  _this.setState({userNameValidate : ""});}

            if(!_this.state.password){
                _this.setState({passwordValidate : "password is required"});
                validateFlag = false;
            }else {  _this.setState({passwordValidate : ""});}
        }
        
        if(Msg === "signup"){
            if(!_this.state.email){
                _this.setState({emailValidate : "email is required"});
                validateFlag = false;
            }else {  _this.setState({emailValidate : ""});}  

            if(!_this.state.role){
                _this.setState({roleValidate : "please select a role"});
                validateFlag = false;
            }else {  _this.setState({roleValidate : ""});}
        }

        if(Msg === "createProject"){
            if(!_this.state.projectName){
                _this.setState({projectNameValidate : "project name is required"});
                validateFlag = false;
            }else {  _this.setState({projectNameValidate : ""});} 

            if(!_this.state.projectDescription){
                _this.setState({projectDescriptionValidate : "description is required"});
                validateFlag = false;
            }else {  _this.setState({projectDescriptionValidate : ""});} 

            if(!_this.state.projectManager){
                _this.setState({projectManagerValidate : "manager is required"});
                validateFlag = false;
            }else {  _this.setState({projectManagerValidate : ""});} 
        }

        if(Msg === "createTicket"){
            if(!_this.state.projectName){
                _this.setState({projectNameValidate : "project name is required"});
                validateFlag = false;
            }else {  _this.setState({projectNameValidate : ""});} 

            if(!_this.state.ticketName){
                _this.setState({ticketNameValidate : "ticket name is required"});
                validateFlag = false;
            }else {  _this.setState({ticketNameValidate : ""});}

            if(!_this.state.ticketDescription){
                _this.setState({ticketDescriptionValidate : "description is required"});
                validateFlag = false;
            }else {  _this.setState({ticketDescriptionValidate : ""});} 

            if(!_this.state.priority){
                _this.setState({priorityValidate : "ticket name is required"});
                validateFlag = false;
            }else {  _this.setState({priorityValidate : ""});} 

            if(!_this.state.selectedUsers){
                _this.setState({selectedUsersValidate : "Atleast one assignee is required"});
                validateFlag = false;
            }else {  _this.setState({selectedUsersValidate : ""});}

            if(!_this.state.status){
                _this.setState({statusValidate : "status is required"});
                validateFlag = false;
            }else {  _this.setState({statusValidate : ""});}

        }
            
        return validateFlag;      
}

export const  isNetworkError = error => { return !!error.isAxiosError && !error.response; }
  