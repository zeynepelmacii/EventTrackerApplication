const express = require('express')
const router = express.Router()
const {getAllEvents, newEvent, deleteEvent, getEvenstByClientEmail, getOneEvent, updateEvent} = require('../Controller/eventController')
const {getAllClients, newClient, deleteClient, getOneClient, updateClient} = require('../Controller/clientController')
const {getAllEmployees, newEmployee, deleteEmployee, getOneEmployee, updateEmployee} = require('../Controller/employeeController')

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
router.get('/employee/getAllEmployees', getAllEmployees) 
router.post('/employee/newEmployee', newEmployee) 
router.delete('/employee/deleteEmployee/:id', deleteEmployee) 
router.get('/employee/getOneEmployee/:id', getOneEmployee) 
router.patch('/employee/updateEmployee/:id', updateEmployee) 


module.exports=router