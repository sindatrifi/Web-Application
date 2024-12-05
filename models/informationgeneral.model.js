const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const informationgeneralesSchema = new Schema({
    photo:mongoose.Schema.Types.Mixed,
    lettre_motivation: String,
    
    
    
    

}, {timestamps: true})




module.exports = mongoose.model('informationgenerales', informationgeneralesSchema)