const express = require('express')
const router = express.Router()
const {getAllEvents, newEvent, deleteEvent, getEvenstByClientEmail, getOneEvent, updateEvent} = require('../Controller/eventController')
const {getAllClients, newClient, deleteClient, getOneClient, updateClient} = require('../Controller/clientController')

//events routes
router.get('/event/getAllEvents', getAllEvents) 
router.post('/event/newEvent', newEvent) 
router.delete('/event/deleteEvent/:id', deleteEvent) 
router.post('/event/getEvenstByClientEmail',getEvenstByClientEmail)
router.get('/event/getOneEvent/:id',getOneEvent)
router.patch('/event/updateEvent/:id',updateEvent)


//client routes
router.get('/client/getAllClients', getAllClients) 
router.post('/client/newClient', newClient) 
router.delete('/client/deleteClient/:id', deleteClient) 
router.get('/client/getOneClient/:id',getOneClient)
router.patch('/client/updateClient/:id',updateClient)


//employees routes


module.exports=router