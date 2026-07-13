const { getDb } = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAllContacts = async (req, res) => {
  const db = getDb();
  const contacts = await db.collection('contacts').find().toArray();
  res.status(200).json(contacts);
};

const getSingleContact = async (req, res) => {
  const db = getDb();
  const contactId = new ObjectId(req.params.id);
  const contact = await db.collection('contacts').findOne({ _id: contactId });
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.status(200).json(contact);
};

module.exports = { getAllContacts, getSingleContact };