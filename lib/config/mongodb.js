'use strict'; 

const mongoConnectionString = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/test'
const mongoOptions = {
  user: process.env.MONGO_USERNAME && process.env.MONGO_USERNAME.match(/\S+/)[0],
  pass: process.env.MONGO_PASSWORD && process.env.MONGO_PASSWORD.match(/\S+/)[0],
  mongos: JSON.parse(process.env.MONGOS || 'false'),
  ssl: JSON.parse(process.env.MONGO_SSL || 'false')
};

module.exports = {
	url: mongoConnectionString,
	opts: mongoOptions
};
