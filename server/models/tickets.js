const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    ticketName : String,
    uniqueId : String,
    description : String,
    project : String,
    priority : String,
    status : String,
    assignedTo : [{}],
    assignedBy : String,
    createdDate : Date,
    comments : String,
    fileToUpload : String,
    filext : String,
    history : [{}]
});

const ticketClass = mongoose.model('ticketsSchema',ticketSchema);

module.exports = ticketClass;