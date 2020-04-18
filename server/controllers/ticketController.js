const ticketModel = require("../models/tickets.js");

exports.listTickets = function(req, res){
    
    ticketModel.find({}, (err,results) => {
        if(err) return res.send(err);   
        res.send(results);
    });
    
 }

exports.createTicket = function(req, res, next){
    const saveObj = {
        ticketName :  req.body.ticketName,
        uniqueId : req.body.ticketName + req.body.project,
        description : req.body.description,
        project : req.body.project,
        priority : req.body.priority,
        status : req.body.status,
        assignedTo : req.body.assignedTo,
        assignedBy : req.body.assignedBy,
        createdDate : new Date(),
        comments : req.body.comments,
        history : []
    }
    
    ticketModel.findOne({ uniqueId : saveObj.uniqueId }, (err, existingTicket) => {
        if(err) return next(err);

        if(existingTicket) return res.status(422).send("Ticket with same name already exists in the project");


        const ticketNameObj={propertyName : "ticketName", oldValue : "", newValue : "", modifiedBy : "", modifiedDate : "", modified : false};
        saveObj.history.push(ticketNameObj);
        const descriptionObj={propertyName : "description", oldValue : "", newValue : "", modifiedBy : "", modifiedDate : "", modified : false};
        saveObj.history.push(descriptionObj);
        const projectObj={propertyName : "project", oldValue : "", newValue : "", modifiedBy : "", modifiedDate : "", modified : false}
        saveObj.history.push(projectObj);
        const priorityObj={propertyName : "priority", oldValue : "", newValue : "", modifiedBy : "", modifiedDate : "", modified : false};
        saveObj.history.push(priorityObj);
        const statusObj={propertyName : "status", oldValue : "", newValue : "", modifiedBy : "", modifiedDate : "", modified : false};
        saveObj.history.push(statusObj);
        const assignedToObj={propertyName : "assignedTo", oldValue : "", newValue : "", modifiedBy : "", modifiedDate : "", modified : false};
        saveObj.history.push(assignedToObj);
        const assignedByObj={propertyName : "assignedBy", oldValue : "", newValue : "", modifiedBy : "", modifiedDate : "", modified : false};
        saveObj.history.push(assignedByObj);
        const commentsObj={propertyName : "comments", oldValue : "", newValue : "", modifiedBy : "", modifiedDate : "", modified : false};
        saveObj.history.push(commentsObj);

        const ticketInstance = new ticketModel(saveObj);
        ticketInstance.save(err => {
            if(err) return next(err);

            res.json("Ticket saved successfully");
        });

});

};

exports.updateTicket = function(req, res, next){
    const requestObj = {
        ticketName :  req.body.ticketName,
        uniqueId : req.body.ticketName + req.body.project,
        description : req.body.description,
        project : req.body.project,
        priority : req.body.priority,
        status : req.body.status,
        assignedTo : req.body.assignedTo,
        assignedBy : req.body.assignedBy,
        createdDate : new Date(),
        comments : req.body.comments,
        history : []
    }
  
    const _id = "5e6fd9a80824dd4124158ec5";
    ticketModel.findById(_id, (err, existingTicket) => {
        if(err) return next(err);

        if(existingTicket){ 
        var history = existingTicket.history;
        //It will give us an array of objects
        //[{propertyName = "description", oldValue="x",newValue="y",modifiedBy="z",modifiedDate="k""}]       
            if(requestObj.ticketName != existingTicket.ticketName){
                   var testarr = updateProperty("ticketName", history, requestObj.ticketName);
                   history = testarr;
            }
            if(requestObj.description != existingTicket.description){
                var testarr = updateProperty("description", history, requestObj.description);
                history = testarr;
            }
            if(requestObj.project != existingTicket.project){
                   var testarr = updateProperty("project", history, requestObj.project);
                   history = testarr;
            }
            if(requestObj.priority != existingTicket.priority){
                var testarr = updateProperty("priority", history, requestObj.priority);
                history = testarr;
            }
            if(requestObj.status != existingTicket.status){
                var testarr = updateProperty("status", history, requestObj.status);
                history = testarr;
            }
            if(requestObj.assignedTo != existingTicket.assignedTo){
                var testarr = updateProperty("assignedTo", history, requestObj.assignedTo);
                history = testarr;
            }
            if(requestObj.assignedBy != existingTicket.assignedBy){
                var testarr = updateProperty("assignedBy", history, requestObj.assignedBy);
                history = testarr;
            }
            if(requestObj.comments != existingTicket.comments){
                var testarr = updateProperty("comments", history, requestObj.comments);
                history = testarr;
            }
            if(requestObj.modifiedBy != existingTicket.modifiedBy){
                var testarr = updateProperty("modifiedBy", history, requestObj.modifiedBy);
                history = testarr;
            }
            console.log("final-------",history)
            existingTicket.history = history;
            existingTicket.ticketName = requestObj.ticketName;
            existingTicket.description = requestObj.description;
            existingTicket.project = requestObj.propertyName;
            existingTicket.priority = requestObj.priority;
            existingTicket.status = requestObj.status;
            existingTicket.assignedTo = requestObj.assignedTo;
            existingTicket.assignedBy = requestObj.assignedBy;
            existingTicket.comments = requestObj.comments;
        
            
        }//Existing Ticket ends
        const ticketInstance = new ticketModel(existingTicket);
        ticketInstance.save(err => {
            if(err) return next(err);

            res.json("Ticket updated successfully");
        });

});

};
//building the history array
function updateProperty(propertyName, history, changedValue){
    console.log("req123-----",propertyName);
    history.map(item => {
        if(item.propertyName == propertyName){
            item.oldValue = item.newValue;
            item.newValue = changedValue;
            item.modifiedBy = "currentUser";
            item.modified = true; //To filter display of changed values in history.
            item.modifiedDate = new Date().getTime();
        }
    })
    return history;
}

//We need to use either findById or we need to use other methidos to updatE


