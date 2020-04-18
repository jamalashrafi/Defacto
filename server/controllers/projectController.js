const projectModel = require('../models/project.js');

exports.listProjects = function(req, res){
    
    projectModel.find({}, (err,results) => {
        if(err) return res.send(err);   
        res.send(results);
    });
    //Here as the db operation was taking time so the need is to send the res,json from here not from router
    // as even if we will return results from here and send res.json from router than router will execute first and 
    //this operation will take time.
 }

exports.createProject = function(req, res, next){

    // const projectName = req.body.projectName;
    // const description = req.body.description;
    // const manager = req.body.description;
    // const users = req.body.users;
    // const tickets = req.body.tickets;

    // const savingObj = {
    //     projectName : projectName,
    //     description : description,
    //     manager : manager,
    //     users : users,
    //     tickets: tickets
    // }
    var dataFromRequest = {
        projectName : req.body.projectName,
        description : req.body.description,
        manager : req.body.manager,
        //users : req.body.users,
        //tickets: req.body.tickets
        createdBy : req.body.createdBy,
        createdDate : "1584942597703"
    }

    //res.status(200).send(projectName);
    projectModel.findOne( { projectName : dataFromRequest.projectName }, (err, existingProject) =>{
        if(err) return next(err);
        if(existingProject) return res.json("Same project name exists");

        const modelInstance = new projectModel(dataFromRequest);
        modelInstance.save(err  => {
            if(err) return next(err);
            projectModel.find({}, (err,results) => {
                if(err) return res.send(err);   
                res.send({ projectList : results, Msg : "project saved successfully"});
            });
        });
    } )
}

exports.updateProject = function(req, res, next){

    var dataFromRequest = {
        projectName : req.body.projectName,
        description : req.body.description,
        manager : req.body.manager,
        users : req.body.users,
        tickets: req.body.tickets
    }

    //res.status(200).send(projectName);
    // projectModel.findOne( { projectName : dataFromRequest.projectName }, (err, existingProject) =>{
    //     if(err) return next(err);
    //     if(!existingProject) return res.json("Project does not exists");

    //    // const modelInstance = new projectModel(dataFromRequest);
    //     // modelInstance.save(err  => {
    //     //     if(err) return next(err);

    //     //     res.json("project updated successfully");
    //     // });
    //     console.log("------------------------------", existingProject);
    //     projectModel.updateOne(
    //          { projectName:dataFromRequest.projectName },
    //          {description:dataFromRequest.description  },{manager:dataFromRequest.manager  },
    //         function(err){if(err) {
      
    //             console.log("error "+err);
    //              response.send(err);
    //         }
    //            return res.json("Project Updated Successfully");})
    // } )
    const _id = "5e6d437d8979743010f3c3e3";
    projectModel.findById(_id, (err, existingProject) =>{
        if(err) return next(err);
        existingProject.projectName =  dataFromRequest.projectName;
        existingProject.description = dataFromRequest.description;
        existingProject.manager = dataFromRequest.manager;
        existingProject.users = dataFromRequest.users;
        existingProject.tickets = dataFromRequest.tickets;   
        
        const modelInstance = new projectModel(existingProject);
        modelInstance.save(err  => {
            if(err) return next(err);
            res.json("project updated successfully");
        });
    });
}

//Need to implement findandUpdateById