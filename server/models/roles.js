const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
    roleName : {type : Array, "default" : ["Admin", "manager", "user"] }
});

const roleClass = mongoose.model('rolesSchema',rolesSchema);

module.exports = roleClass;