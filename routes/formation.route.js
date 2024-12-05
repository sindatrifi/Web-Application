const express = require('express');
const router = express.Router()
const Entretien = require('../models/formation.model');

// GET all formations
router.get('/formations', (req, res) => {
  Entretien.find({}, (err, formations) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(formations);
    }
  });
});

// GET a single formation by ID
router.get('/formations/:id', (req, res) => {
  Entretien.findById(req.params.id, (err, formation) => {
    if (err) {
      res.status(500).send(err);
    } else if (!formation) {
      res.status(404).send('Entretien not found');
    } else {
      res.status(200).send(formation);
    }
  });
});

// CREATE a new formation
router.post('/formations', (req, res) => {
  const formation = new Entretien(req.body);
  formation.save((err, savedEntretien) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(savedEntretien);
    }
  });
});

// UPDATE an existing formation by ID
router.put('/formations/:id', (req, res) => {
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

// DELETE an existing formation by ID
router.delete('/formations/:id', (req, res) => {
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