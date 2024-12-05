const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    Email: String,
    Lastname : String,
    Firstname: String,
    Age: String,
    Phone:String,
    Adress: String,
    
    

}, {timestamps: true})




module.exports = mongoose.model('Employees', EmployeeSchema)
