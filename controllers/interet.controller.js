const interet = require("../models/interet.model");

const Addinteret = async (req, res) => {
   await interet.create(req.body);
          res.status(201).json({ message: "data added with success" });
        }
    
  


const Findinteret = async (req, res) => {
  
    const data = await interet.find();
    res.status(201).json(data);
  
};



const Updateinteret = async (req, res) => {
    const data = await interet.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(201).json(data);
  }
  



module.exports = {
   Addinteret,
  Findinteret,
  Updateinteret,
 
};
