const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    niveau_etude: String,
    diplome : String,
    universite: String,
   
    
    

}, {timestamps: true})




module.exports = mongoose.model('education', EducationSchema)