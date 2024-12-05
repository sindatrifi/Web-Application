const express = require('express');
const { Addcandidatform, Findcandidatform, FindSinglcandidatform, Updatecandidatform} = require('../controllers/candidatform.controller');
const router = express.Router()
const jwt = require('jsonwebtoken');
const candidatform = require("../models/candidatformulaire.models");


router.post('/candidatform', Addcandidatform)


router.get('/candidatform', Findcandidatform)
router.get('/candidatform/:id', FindSinglcandidatform)


router.get('/candidatform/user', async (req, res) => {
    try {
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded._id;
      const candidatform = await candidatform.findOne({ UserId: userId });
      res.status(200).json(candidatform);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Server Error');
    }
  });
router.put('/candidatform/:id', Updatecandidatform)
router.put('/candidatform', async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    const candidatformToUpdate = await candidatform.findOne({ UserId : userId });

    if (!candidatformToUpdate) {
      return res.status(404).json({ error: 'candidatform not found' });
    }

    candidatformToUpdate.langues = req.body.langues;
    candidatformToUpdate.competences = req.body.competences;
   
    candidatformToUpdate.lettre_motivation = req.body.lettre_motivation;
    candidatformToUpdate.experience_professionnelle = req.body.experience_professionnelle;
    candidatformToUpdate.emploi_desire = req.body.emploi_desire;
    candidatformToUpdate.titre_emploi_desire = req.body.titre_emploi_desire;
   
    candidatformToUpdate.nombreannee = req.body.nombreannee;
    candidatformToUpdate.Detail = req.body.Detail;
    candidatformToUpdate.Mission = req.body.Mission;
    candidatformToUpdate.Description = req.body.Description;
    candidatformToUpdate.niveau_etude = req.body.niveau_etude;
    candidatformToUpdate.diplome = req.body.diplome;
    candidatformToUpdate.universite = req.body.universite;

    const updatedCandidatform = await candidatformToUpdate.save();

    res.json(updatedCandidatform);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;