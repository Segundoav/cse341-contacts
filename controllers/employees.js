const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllEmployees = async (req, res) => {
  try {
    const db = getDb();
    const employees = await db.collection('employees').find().toArray();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleEmployee = async (req, res) => {
  try {
    const db = getDb();
    const employeeId = new ObjectId(req.params.id);
    const employee = await db.collection('employees').findOne({ _id: employeeId });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, position, department, salary, hireDate } = req.body;

    if (!firstName || !lastName || !email || !position || !department || !salary || !hireDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = getDb();
    const newEmployee = { firstName, lastName, email, position, department, salary, hireDate };
    const result = await db.collection('employees').insertOne(newEmployee);

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const db = getDb();
    const employeeId = new ObjectId(req.params.id);
    const { firstName, lastName, email, position, department, salary, hireDate } = req.body;

    if (!firstName || !lastName || !email || !position || !department || !salary || !hireDate) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await db.collection('employees').updateOne(
      { _id: employeeId },
      { $set: { firstName, lastName, email, position, department, salary, hireDate } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const db = getDb();
    const employeeId = new ObjectId(req.params.id);

    const result = await db.collection('employees').deleteOne({ _id: employeeId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllEmployees, getSingleEmployee, createEmployee, updateEmployee, deleteEmployee };