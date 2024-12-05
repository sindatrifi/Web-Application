const Offres = require("../models/offres.model");
const ValidateOffre = require("../validation/offres.validation");
const AddOffre = async (req, res) => {
  const { errors, isValid } = ValidateOffre(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      await Offres.findOne({ Email: req.body.Email }).then(async (exist) => {
       
          await Offres.create(req.body);
          res.status(201).json({ message: "Offre added with success" });
        })
    
    };
    
  } catch (error) {
    console.log(error.message);
  }
};

const FindAllOffres = async (req, res) => {
  try {
    const data = await Offres.find();
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const FindSinglOffre = async (req, res) => {
  try {
    const data = await Offres.findOne({ _id: req.params.id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
  }
};

const UpdateOffre = async (req, res) => {
  const { errors, isValid } = ValidateOffre(req.body);
  try {
    if (!isValid) {
      res.status(404).json(errors);
    } else {
      const data = await Offres.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    }
  } catch (error) {
    console.log(error.message);
  }
};

const DeleteOffre = async (req, res) => {
  try {
    await Offres.deleteOne({ _id: req.params.id });
    res.status(201).json({ message: "Offre deleted with success" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  AddOffre,
  FindAllOffres,
  FindSinglOffre,
  UpdateOffre,
  DeleteOffre,

};
