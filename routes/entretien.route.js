const express = require('express');
const router = express.Router()
const Entretien = require('../models/entretien.models');

// GET all entretiens
router.get('/entretiens', (req, res) => {
  Entretien.find({}, (err, entretiens) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(entretiens);
    }
  });
});

// GET a single entretien by ID
router.get('/entretiens/:id', (req, res) => {
  Entretien.findById(req.params.id, (err, entretien) => {
    if (err) {
      res.status(500).send(err);
    } else if (!entretien) {
      res.status(404).send('Entretien not found');
    } else {
      res.status(200).send(entretien);
    }
  });
});

// CREATE a new entretien
router.post('/entretiens', (req, res) => {
  const entretien = new Entretien(req.body);
  entretien.save((err, savedEntretien) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(savedEntretien);
    }
  });
});

// UPDATE an existing entretien by ID
router.put('/entretiens/:id', (req, res) => {
  Entretien.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedEntretien) => {
    if (err) {
      res.status(500).send(err);
    } else if (!updatedEntretien) {
      res.status(404).send('Entretien not found');
    } else {
      res.status(200).send(updatedEntretien);
    }
  });
});

// DELETE an existing entretien by ID
router.delete('/entretiens/:id', (req, res) => {
  Entretien.findByIdAndDelete(req.params.id, (err, deletedEntretien) => {
    if (err) {
      res.status(500).send(err);
    } else if (!deletedEntretien) {
      res.status(404).send('Entretien not found');
    } else {
      res.status(204).send();
    }
  });
});
module.exports = router;