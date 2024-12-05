const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const candidatform = new Schema({
    
    langues: String,
    competences: String,
    photo:String,
    lettre_motivation: String,
    experience_professionnelle: String,
    emploi_desire : String,
    titre_emploi_desire: String,
    salaire: String,
    status:String,
    nombreannee: String,
    Detail : String,
    Mission: String,
    Description: String,
    niveau_etude: String,
    diplome : String,
    universite: String,
    UserId: String
   
    

}, {timestamps: true})
module.exports = mongoose.model('candidatform', candidatform)