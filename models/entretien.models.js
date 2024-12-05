const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EntretienSchema = new Schema({
    employeeid:String,
    type: String,
    date: String,
    offre: String,
    heure: String, 
    user: [String],
    accepted: [String],
    refused: [String],
    nombre_candidat: String,
    adresse:String,
    Documents_demandes:String,
    url:String,
    evaluation:String,
    code_access:String,
  }, {timestamps: true})



module.exports = mongoose.model('entretien', EntretienSchema)