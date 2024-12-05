const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ContactSchema = new Schema({
    email: String,
    name : String,
    message: String,
   
    
}, {timestamps: true})



  


module.exports = mongoose.model('contact', ContactSchema)
