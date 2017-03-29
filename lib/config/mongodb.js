'use strict'; 

const localConnectionString = 'mongodb://127.0.0.1:27017/test';
const mongoConnectionString = process.env.MONGO_URL || localConnectionString;
const envUser = process.env.MONGO_USERNAME
const envPass = process.env.MONGO_PASSWORD
const mongoOptions = {
  user: envUser && envUser.match(/\S+/)[0],
  pass: envPass && envPass.match(/\S+/)[0],
  mongos: JSON.parse(process.env.MONGOS || 'false'),
  ssl: JSON.parse(process.env.MONGO_SSL || 'false')
};

module.exports = {
	url: mongoConnectionString,
	opts: mongoOptions
};
