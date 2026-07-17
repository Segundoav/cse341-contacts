const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API para gestionar contactos - WDD 330 / CSE 341',
  },
  host: 'cse341-contacts.onrender.com', // Aquí pondrás tu enlace de Render final
  schemes: ['https', 'http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

// Genera el archivo swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);