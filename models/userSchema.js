const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: String,
    email :{type:String, required:true, unique:true},
    password: {type: String},
    mobile: {type: Number},
    createdOn: {type:Date, default:Date.now()}
})

module.exports = mongoose.model('users', userSchema)