const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
  try {
    const db = getDb();
    const contacts = await db.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingleContact = async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const contact = await db.collection('contacts').findOne({ _id: contactId });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday, phone } = req.body;

   if (!firstName || !lastName || !email || !favoriteColor || !birthday || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const db = getDb();
    
    const newContact = { firstName, lastName, email, favoriteColor, birthday, phone };
    const result = await db.collection('contacts').insertOne(newContact);

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);
    const { firstName, lastName, email, favoriteColor, birthday, phone } = req.body;

    if (!firstName || !lastName || !email || !favoriteColor || !birthday || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await db.collection('contacts').updateOne(
      { _id: contactId },
      { $set: { firstName, lastName, email, favoriteColor, birthday, phone } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const db = getDb();
    const contactId = new ObjectId(req.params.id);

    const result = await db.collection('contacts').deleteOne({ _id: contactId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllContacts, getSingleContact, createContact, updateContact, deleteContact };