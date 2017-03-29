'use strict'; 

const localConnectionString = 'mongodb://127.0.0.1:27017/test';
const mongoConnectionString = process.env.MONGO_URL || localConnectionString;
const userFormat = process.env.MONGO_USERNAME.match(/\S+/)[0];
const passFormat = process.env.MONGO_PASSWORD.match(/\S+/)[0];
const mongoOptions = {
  user: process.env.MONGO_USERNAME && userFormat,
  pass: process.env.MONGO_PASSWORD && passFormat,
  mongos: JSON.parse(process.env.MONGOS || 'false'),
  ssl: JSON.parse(process.env.MONGO_SSL || 'false')
};

module.exports = {
	url: mongoConnectionString,
	opts: mongoOptions
};
