const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const informationsprofessionellesSchema = new Schema({
    langues: String,
    competences: String,
    
    
    

}, {timestamps: true})




module.exports = mongoose.model('informationsprofessionelles', informationsprofessionellesSchema)