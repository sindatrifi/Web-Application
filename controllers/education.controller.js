const education = require("../models/education.model");

const Addeducation = async (req, res) => {
   await education.create(req.body);
          res.status(201).json({ message: "data added with success" });
        }
    
  


const Findeducation = async (req, res) => {
  
    const data = await education.find();
    res.status(201).json(data);
  
};



const Updateeducation = async (req, res) => {
  
    
      const data = await education.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    }
  



module.exports = {
   Addeducation,
  Findeducation,
  Updateeducation,
 
};
