const express = require('express');
const { Addinteret, Findinteret, Updateinteret } = require('../controllers/interet.controller');
const { Addinformationgenerales,Findinformationgenerales,Updateinformationgenerales, } = require('../controllers/generale.controller');
const { Addprofessionnelle,Findprofessionnelle,Updateprofessionnelle } = require('../controllers/professionelle.controller');
const { Addexperience,Findexperience,Updateexperience } = require('../controllers/experience.controller');
const { Addeducation,Findeducation,Updateeducation } = require('../controllers/education.controller');
const router = express.Router()
/*interet */
router.post('/interet', Addinteret)

router.get('/interet', Findinteret)

router.put('/interet/:id', Updateinteret)
/* informationgenerales */

router.post('/informationgenerales', Addinformationgenerales)

router.get('/informationgenerales',Findinformationgenerales,)

router.put('/informationgenerales/:id', Updateinformationgenerales)
/*informationprofessionnelle*/

router.post('/informationprofessionnelle', Addprofessionnelle)


router.get('/informationprofessionnelle',Findprofessionnelle,)

router.put('/informationprofessionnelle/:id', Updateprofessionnelle)

/*experience */

router.post('/experience', Addexperience)

router.get('/experience',Findexperience)

router.put('/experience/:id', Updateexperience)

/* education */

router.post('/education', Addeducation)

router.get('/education',Findeducation)

router.put('/education/:id', Updateeducation)

module.exports = router;