const express = require('express');
const router = express.Router();
const Contact = require('../models/contact.model');

// CREATE a new contact
router.post('/contacts', (req, res) => {
  const contact = new Contact({
    email: req.body.email,
    name: req.body.name,
    message: req.body.message
  });

  contact.save()
    .then(() => {
      res.status(201).send(contact);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// READ all contacts
router.get('/contacts', (req, res) => {
  Contact.find()
    .then((contacts) => {
      res.send(contacts);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
module.exports = router;