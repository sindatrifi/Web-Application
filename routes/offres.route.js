const express = require('express');
const { AddOffre, FindAllOffres, FindSinglOffre, UpdateOffre, DeleteOffre } = require('../controllers/Offre.controller');
const router = express.Router()
const Offre = require('../models/offres.model');
const Candidature = require('../models/offres.model');
/* add user */
router.post('/Offres', AddOffre)

/* find all users */
router.get('/Offres', FindAllOffres)

/* find single user */
router.get('/Offres/:id', FindSinglOffre)

/* add user */
router.put('/Offres/:id', UpdateOffre)

/* add user */
router.delete('/Offres/:id', DeleteOffre)
router.get('/offres/:id/candidatures', async (req, res) => {
  const id = req.params.id;

  try {
    const offer = await Offre.findById(id).populate('candidatures.user', 'name');
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    res.status(200).json(offer.candidatures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/offres/:id/candidatures/:candidatureid', async (req, res) => {
  const { id, candidatureid } = req.params;

  try {
    const offer = await Offre.findById(id).populate('candidatures.user', 'name');
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    const candidature = offer.candidatures.find(c => c._id.toString() === candidatureid.toString());
    if (!candidature) {
      return res.status(404).json({ message: 'Candidature not found' });
    }

    res.status(200).json(candidature);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/offres/:id/candidatures/:candidatureId', async (req, res) => {
  const offerId = req.params.id;
  const candidatureId = req.params.candidatureId;

  try {
    const offer = await Offre.findById(offerId);
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    const candidature = offer.candidatures.find(c => c._id == candidatureId);
    if (!candidature) {
      return res.status(404).json({ message: 'Candidature not found' });
    }

    offer.candidatures = offer.candidatures.filter(c => c._id != candidatureId);
    await offer.save();
    res.status(200).json({ message: 'Candidature deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.post('/Offres/:id/candidatures', async (req, res) => {
    const id = req.params.id;
    const { name, diploma,cv,motivation ,etat} = req.body;
  
    try {
      const offer = await Offre.findById(id);
      if (!offer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
  
      const candidature = { name, diploma,cv,motivation ,etat};
      offer.candidatures.push(candidature);
  
      await offer.save();
      res.status(200).json({ message: 'Candidature submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.put('/offres/:id/candidatures/:candidatureId', async (req, res) => {
    const offerId = req.params.id;
    const candidatureId = req.params.candidatureId;
    const {  cv, motivation,etat } = req.body;
  
    try {
      const offer = await Offre.findById(offerId);
      if (!offer) {
        return res.status(404).json({ message: 'Offer not found' });
      }
  
      const candidature = offer.candidatures.find(c => c._id == candidatureId);
      if (!candidature) {
        return res.status(404).json({ message: 'Candidature not found' });
      }

      candidature.cv = cv;
      candidature.etat=etat;
      candidature.motivation = motivation;
  
      await offer.save();
      res.status(200).json({ message: 'Candidature updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;