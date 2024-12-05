const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CandidatureSchema = new Schema({
    name: String,
    diploma:mongoose.Schema.Types.Mixed,
    cv:String,
    motivation:String,
    etat:String,
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'offres'
    },
    user: { type: mongoose.Schema.Types.ObjectId,
       ref: 'users' }
  });

const OffreSchema = new Schema({
  employee:String,
    type: String,
    name : String,
    Description: String,
    date: String,
    niveau_etude:String,
    salaire: String,
    langues:String,
    lieu :String ,
    mot_cles:String,
    date_dexpiration:String,
   entreprisenom:String,
   entreprisephone:String,
   entreprisemail:String,
   entreprisesite:String,
   CoefficientAge:Number,
   CoefficientLangues:Number,
   CoefficientExperience:Number,
   CoefficientSkills:Number,
   CommentPostuler:String,
    candidatures: [CandidatureSchema]
}, {timestamps: true})



  

module.exports = mongoose.model('candidature', CandidatureSchema)

module.exports = mongoose.model('offres', OffreSchema)
