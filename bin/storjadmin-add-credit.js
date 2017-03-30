#!/usr/bin/env node

'use strict';

const credits = require('../lib/credits');
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

const userOption = add_credit.user;
const amountOption = parseInt(add_credit.amount);

const storage  = new Storage(mongo.url, mongo.opts);

credits.addManualCredit(userOption, amountOption, storage);
