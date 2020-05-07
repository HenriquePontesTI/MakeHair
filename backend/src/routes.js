var express = require('express');

var connection = require('./database/connection');
var OngController = require('./controllers/OngController');
var IncidentController = require('./controllers/IncidentController');
var ProfileController = require('./controllers/ProfileController');
var SessionController = require('./controllers/SessionController');

var routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);


routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;