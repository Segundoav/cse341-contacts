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


// Creates a new contact document in the "contacts" collection
const createContact = async (req, res) => {
  // req.body contains the JSON data sent by the client in the request
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  // Validation: reject the request if any required field is missing
  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const db = getDb();
  const newContact = { firstName, lastName, email, favoriteColor, birthday };

  // insertOne() adds the document to MongoDB and returns info about it,
  // including the auto-generated _id
  const result = await db.collection('contacts').insertOne(newContact);

  // 201 = "Created", the standard status code for a successful POST
  res.status(201).json({ id: result.insertedId });
};

// Updates an existing contact identified by the id in the URL
const updateContact = async (req, res) => {
  const db = getDb();
  const contactId = new ObjectId(req.params.id);
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const result = await db.collection('contacts').updateOne(
    { _id: contactId },
    { $set: { firstName, lastName, email, favoriteColor, birthday } }
  );

  if (result.matchedCount === 0) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.status(204).send();
};

// Deletes a contact identified by the id in the URL
const deleteContact = async (req, res) => {
  const db = getDb();
  const contactId = new ObjectId(req.params.id);

  const result = await db.collection('contacts').deleteOne({ _id: contactId });

  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  res.status(200).json({ message: 'Contact deleted' });
};

module.exports = { getAllContacts, getSingleContact, createContact, updateContact, deleteContact };