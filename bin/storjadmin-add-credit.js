#!/usr/bin/env node

'use strict';

const log = require('../lib/logger');
const mongo = require('../lib/config/mongodb');
const add_credit = require('commander');
const Storage = require('storj-service-storage-models');
const utils = require('../lib/utils');

add_credit
  .description('Manually add credit with user email and desired amount')
  .option('-u, --user <user>', 'User email address')
  .option('-a, --amount <amount>', 'Amount of credit in cents')
  .parse(process.argv);

if (!add_credit.user) {
  console.error('\n  missing user, try --help');
  process.exit(1);
}

if (!add_credit.amount) {
  console.error('\n  missing amount, try --help');
  process.exit(1);
}

const storage  = new Storage(mongo.url, mongo.opts);
let Credit = storage.models.Credit;
let User = storage.models.User; 

let manualCreditArgs = {
  user: add_credit.user,
  type: 'manual',
  promo_amount: parseInt(add_credit.amount),
  promo_code: 'new-signup',
  promo_expires: utils.addYearsToCurrentDate(1)
};
let manualCreditObj = new Credit(manualCreditArgs);

User.findOne({_id: add_credit.user}, (err, user) => {
  if (err) {
  	return log('error', 'Failed on user lookup, reason %s',
  		       err.message);
  }
  
  if (!user) {
  	return log('error', 'User must be have Storj account to add credit');
  }

  manualCreditObj.save((err, credit) => {
   if (err) {
     return log('error', 'Failed to save credit, reason: %s', err.message);
   }
   log('info', 'Successfully saved credit: %s', credit);
  });
});