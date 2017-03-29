#!/usr/bin/env node

'use strict';

const log = require('../lib/logger');
const mongo = require('../lib/config/mongodb');
const add_credit = require('commander');
const Storage = require('storj-service-storage-models');

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

var today = new Date();
var oneYearFromToday = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());

const storage  = new Storage(mongo.url, mongo.opts);
let Credit = storage.models.Credit;
let manualCreditArgs = {
  user: add_credit.user,
  type: 'manual',
  promo_amount: parseInt(add_credit.amount),
  promo_code: 'new-signup',
  promo_expires: oneYearFromToday
};
let manualCreditObj = new Credit(manualCreditArgs);

manualCreditObj.save((err, credit) => {
 if (err) {
   return log('error', 'Failed to save credit, reason: %s', err.message);
 }
 log('info', 'Successfully saved credit: %s', credit);
});
