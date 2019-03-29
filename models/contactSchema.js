const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userInfoSchema = new Schema({
    name: String,
    lastName: String,
    email :{type:String, required:true, unique:true},
    mobile: {type: Number},
    description: String,
    createdOn: {type:Date, default:Date.now()}
})

module.exports = mongoose.model('userInfo', userInfoSchema)