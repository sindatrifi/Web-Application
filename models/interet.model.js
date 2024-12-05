const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interetSchema = new Schema({
    experience_professionnelle: String,
    emploi_desire : String,
    titre_emploi_desire: String,
    salaire: String,
    status:String,
  
    

}, {timestamps: true})




module.exports = mongoose.model('interet', interetSchema)