const express = require('express')
const router = express.Router();
const rolesModel = require('../models/roles.js');

exports.listRoles = function(req, res){

    // const roleModel = new rolesModel(["Jamal"]);
    // roleModel.save();
    
    rolesModel.find({}, (err,results) => {
        if(err) return res.send(err);   
        res.send(results);
    });
 }
