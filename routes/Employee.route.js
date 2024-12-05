const express = require('express');
const { AddEmployee, FindEmployees, FindSinglEmployee, UpdateEmployee, DeleteEmployee } = require('../controllers/employee.controller');
const router = express.Router()


/* add user */
router.post('/Employees', AddEmployee)

/* find all users */
router.get('/Employees', FindEmployees)

/* find single user */
router.get('/Employees/:id', FindSinglEmployee)

/* add user */
router.put('/Employees/:id', UpdateEmployee)

/* add user */
router.delete('/Employees/:id', DeleteEmployee)

module.exports = router;