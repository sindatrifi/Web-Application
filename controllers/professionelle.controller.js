const professionnelle = require("../models/informationprofessionelle.model");

const Addprofessionnelle = async (req, res) => {
   await professionnelle.create(req.body);
          res.status(201).json({ message: "informations professionnelle added with success" });
        }
    
  


const Findprofessionnelle = async (req, res) => {
  
    const data = await professionnelle.find();
    res.status(201).json(data);
  
};



const Updateprofessionnelle = async (req, res) => {
  
    
      const data = await professionnelle.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    }
  



module.exports = {
   Addprofessionnelle,
  Findprofessionnelle,
  Updateprofessionnelle,
 
};
