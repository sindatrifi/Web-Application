const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidatSchema = new Schema({
    Email: String,
    Lastname : String,
    Firstname: String,
    Age: String,
    Phone:String,
    Adress: String,
    
    

}, {timestamps: true})




module.exports = mongoose.model('candidats', CandidatSchema)
