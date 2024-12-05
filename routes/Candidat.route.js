const express = require('express');
const { AddCandidat, FindCandidats, FindSinglCandidat, UpdateCandidat, DeleteCandidat } = require('../controllers/candidat.controller');
const router = express.Router()


/* add user */
router.post('/Candidats', AddCandidat)

/* find all users */
router.get('/Candidats', FindCandidats)

/* find single user */
router.get('/Candidats/:id', FindSinglCandidat)

/* add user */
router.put('/Candidats/:id', UpdateCandidat)

/* add user */
router.delete('/Candidats/:id', DeleteCandidat)

module.exports = router;