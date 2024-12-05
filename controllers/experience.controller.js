const experience = require("../models/experience.model");

const Addexperience = async (req, res) => {
   await experience.create(req.body);
          res.status(201).json({ message: "data added with success" });
        }
    
  


const Findexperience = async (req, res) => {
  
    const data = await experience.find();
    res.status(201).json(data);
  
};



const Updateexperience = async (req, res) => {
  
    
      const data = await experience.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    }
  



module.exports = {
   Addexperience,
  Findexperience,
  Updateexperience,
 
};
