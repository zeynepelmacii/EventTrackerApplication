const Event = require('../Model/eventModel')
const Client = require('../Model/clientModel')

const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find().populate('client', 'name email phone');
      res.status(200).json({msg:'Events fetched', events:events}); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  }

const newEvent = async (req,res) =>{
  const {eventType, eventDate, eventLocation, eventDecors, eventAttendees,eventManager,eventOrganizers,eventStatus,client} = req.body
    
  try {
      const foundClient = await Client.findById(client);
      if (!foundClient) return res.status(404).json({ message: 'No client found' });
    
      const event = await Event.create({eventType, eventDate, eventLocation, eventBudget: foundClient.budget, eventDecors, eventAttendees,eventManager,eventOrganizers,eventStatus,client})
      res.status(201).json({msg:'Event Created', event:event}); 
  } catch (error) {
      res.status(400).json({ message: error.message }); 
  }
}

const deleteEvent = async (req,res)=>{
  const {id:eventId} = req.params
  try {
      const event = await Event.findOneAndDelete({_id:eventId});
      if(!event) return res.status(404).json({msg:'No event found'})
      res.status(201).json({msg:'Event deleted', event:event})
  } catch (error) {
      res.status(500).json({msg: error.message})
  }
}

const getEvenstByClientEmail = async (req,res)=>{
  const { email } = req.body

  try {
    const client = await Client.findOne({ email: email });
    if(!client) { return res.status(404).json({msg: "No client found"}); }

    const events = await Event.find({client : client._id})
    if (events.length === 0) {return res.status(404).json({ msg: "No events found for this client" });}

    res.status(200).json({ events: events });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

}


const getOneEvent = async (req,res) => {
  const {id:eventId} = req.params
  try {
    const event = await Event.findById({_id:eventId}).populate('client','name email phone')
    if(!event) {return res.status(404).json({msg:"No event found"})}
    res.status(201).json({msg: 'event with specified ID', event:event})
  } catch (error) {
    res.status(500).json({msg: error})
  }
}


const updateEvent = async (req,res) => {
  const {id:eventId} = req.params
  try {
      const event = await Event.findOneAndUpdate({_id:eventId},req.body,{ new: true })
      if(!event)return res.status(404).json({msg:'No event found'})

      res.status(201).json({msg: 'Event updated ', event:event})
  } catch (error) {
      res.status(500).json({msg: error})
  }    
}




module.exports = {getAllEvents, newEvent, deleteEvent, getEvenstByClientEmail, getOneEvent, updateEvent}