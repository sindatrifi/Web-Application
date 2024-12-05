const informationgenerales = require("../models/informationgeneral.model");

const Addinformationgenerales = async (req, res) => {
   await informationgenerales.create(req.body);
          res.status(201).json({ message: "data added with success" });
        }
    
  


const Findinformationgenerales = async (req, res) => {
  
    const data = await informationgenerales.find();
    res.status(201).json(data);
  
};



const Updateinformationgenerales = async (req, res) => {
  
    
      const data = await informationgenerales.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    }
  



module.exports = {
    Addinformationgenerales,
    Findinformationgenerales,
    Updateinformationgenerales,
 
};
