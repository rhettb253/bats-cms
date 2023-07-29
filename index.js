'use strict';

require('dotenv').config();
const { db } = require('./src/models/index.js');
const server = require('./src/server.js');
const PORT = process.env.PORT

db.sync().then(() => {
  server.start(PORT);
});