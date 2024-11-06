const express = require('express')
const router = express.Router()
const {getAllEvents, newEvent, deleteEvent} = require('../Controller/eventController')
const {getAllClients, newClient, deleteClient} = require('../Controller/clientController')

//events routes
router.get('/event/getAllEvents', getAllEvents)
router.post('/event/newEvent', newEvent)
router.delete('/event/deleteEvent/:id', deleteEvent)

//client routes
router.get('/client/getAllClients', getAllClients)
router.post('/client/newClient', newClient)
router.delete('/client/deleteClient/:id', deleteClient)

//employees routes


module.exports=router