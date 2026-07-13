const { MongoClient } = require('mongodb');
require('dotenv').config();

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client.db('contactsDB');
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error('Db not initialized');
  }
  return database;
};

module.exports = { initDb, getDb };