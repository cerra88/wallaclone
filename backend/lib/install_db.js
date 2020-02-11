'use strict';

const db = require('../lib/connectMongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt')

db.once('open', async () => {
  try {

    await initUsuarios();
    db.close();

  } catch(err) {
    console.log('Hubo un error:', err);
    process.exit(1);
  }

});

async function initUsuarios() {
  await User.deleteMany();
  await User.insertMany([
    {
      username: 'angel',
      email: 'user@example.com',
      password: await User.hashPassword('1234')
    }
  ]);

}
