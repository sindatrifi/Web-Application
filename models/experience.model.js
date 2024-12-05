const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
    nombreannee: String,
    Detail : String,
    Mission: String,
    Description: String,
    
    
    

}, {timestamps: true})




module.exports = mongoose.model('experience', experienceSchema)