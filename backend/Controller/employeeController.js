const Employee = require('../Model/employeeModel')

const getAllEmployees = async (req,res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({msg: "all employees fetched", employees:employees})
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

const newEmployee = async (req,res) => {
    const {name, bday, phone, email, role, manager} = req.body
    try {
        const employee = await Employee.create({name, bday, phone, email, role, manager})
        res.status(201).json({msg:'Employee Created', employee:employee}); 
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

const deleteEmployee = async (req,res) => {
    const {id:employeeId} = req.params
    try {
        const employee = await Employee.findOneAndDelete({_id:employeeId});
        if(!employee) return res.status(404).json({msg:'No employee found'})
        res.status(201).json({msg:'Employee deleted', employee:employee})
    } catch (error) {
        res.status(500).json({msg: error.message})
    }
}

const getOneEmployee = async (req,res) => {
    const {id:employeeId} = req.params
    try {
      const employee = await Employee.findById({_id:employeeId})
      if(!employee) {return res.status(404).json({msg:"No employee found"})}
      res.status(201).json({msg: 'Employee with specified ID', employee:employee})
    } catch (error) {
      res.status(500).json({msg: error})
    }
}

const updateEmployee = async (req,res) => {
    const {id:employeeId} = req.params
    try {
        const employee = await Employee.findOneAndUpdate({_id:employeeId},req.body,{ new: true })
        if(!employee)return res.status(404).json({msg:'No employee found'})
        res.status(201).json({msg: 'Employee updated ', employee:employee})
    } catch (error) {
        res.status(500).json({msg: error})
    }    
}

module.exports = {getAllEmployees, newEmployee, deleteEmployee, getOneEmployee, updateEmployee}