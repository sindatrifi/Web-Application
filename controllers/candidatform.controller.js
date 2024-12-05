const candidatform = require("../models/candidatformulaire.models");

const Addcandidatform = async (req, res) => {
   
   const savedCandidatForm = await candidatform.create(req.body);

    // Send a response to the client with the new CandidatForm object and its ID
    res.status(201).json({
      message: "CandidatForm created successfully" + req.body.UserId,
      candidatform: savedCandidatForm,
      id: savedCandidatForm._id,
    });
  };

        
    
  


const Findcandidatform = async (req, res) => {
  
    const data = await candidatform.find();
    res.status(201).json(data);
  
};

const FindSinglcandidatform= async (req, res) => {
    try {
      const data = await candidatform.findOne({ _id: req.params.id });
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  

const Updatecandidatform = async (req, res) => {
    const data = await candidatform.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(201).json(data);
  }
  



module.exports = {
   Addcandidatform,
  Findcandidatform,
  Updatecandidatform,
  FindSinglcandidatform
};
