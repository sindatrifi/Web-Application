var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors=require('cors');
require('dotenv').config()

const routerUsers = require('./routes/users.route')
const routerCandidats=require('./routes/Candidat.route')
const routerprotected=require('./routes/protected.route')
const routerlogin=require('./routes/auth.route')
const routerformulaire=require('./routes/formulaire.route')
const routeroffres=require('./routes/offres.route')
const routercandidatsform=require('./routes/candidatform.route')
const routerentretien=require('./routes/entretien.route')
const routeruserform=require('./routes/userformulaire.route')
const routernotification=require('./routes/notifications.route')
const routercontact=require('./routes/contact.route')
const routerformation=require('./routes/formation.route')
var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('DB CONNECTED'))
.catch(err=>console.log(err.message))

app.use('/api', routerUsers)
app.use('/api', routerCandidats)
app.use('/api',routerlogin)
app.use('/api',routerprotected)
app.use('/api',routerformulaire)
app.use('/api',routeroffres)
app.use('/api',routercandidatsform)
app.use('/api',routerentretien)
app.use('/api',routeruserform)
app.use('/api',routernotification)
app.use('/api',routercontact)
app.use('/api',routerformation)
module.exports = app;
