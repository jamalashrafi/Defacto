const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

var projectSchema = new Schema({
    projectName : String,
    description : String,
    manager : String,
    //tickets : [String],
    //users : [String],
    createProject : String,
    createdDate : Date
    
});

const projectClass = mongoose.model('projectSchema', projectSchema);

module.exports = projectClass;

