const Client = require('../Model/clientModel')


const getAllClients = async (req, res) => {
    try {
      const clients = await Client.find(); 
      res.status(200).json({msg:'Clients Fetched', clients:clients}); 
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  }

const newClient = async (req,res) =>{
    const {name, bday, budget, phone, email} = req.body
    
    try {
        const client = await Client.create({name, bday, budget, phone, email})
        res.status(201).json({msg:'Client Created', client:client}); 
    } catch (error) {
        res.status(400).json({ msg: error.message }); 
    }
}

const deleteClient = async (req,res)=>{
    const {id:clientId} = req.params
    try {
        const client = await Client.findOneAndDelete({_id:clientId});
        if(!client) return res.status(404).json({msg:'No client found'})
        res.status(201).json({msg:'Client deleted', client:client})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

module.exports={getAllClients, newClient, deleteClient}