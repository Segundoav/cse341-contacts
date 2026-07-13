const express = require('express');
const cors = require('cors');
const mongodb = require('./db/connect');
const contactsRoutes = require('./routes/contacts');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/contacts', contactsRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});