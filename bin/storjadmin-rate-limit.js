#!/usr/bin/env node

'use strict';

const log = require('../lib/logger');
const mongo = require('../lib/config/mongodb');
const rate_limit = require('commander');
const Storage = require('storj-service-storage-models');

rate_limit
  .description('Add or remove rate limiting for user')
  .option('-u, --user <user>', 'User email address')
  .option('-o, --off', 'Turn rate limit off for user')
  .parse(process.argv);

if (!rate_limit.user) {
  console.error('\n  missing user, try --help');
  process.exit(1);
}

const storage  = new Storage(mongo.url, mongo.opts);

let User = storage.models.User;

if (rate_limit.off) {
  User.findByIdAndUpdate(
  	rate_limit.user,
  	{
      $set: {
        isFreeTier: false
  	  }
    }, (err, user) => {
  	  if (err) {
        log('error', 'Failed on user update, reason %s',
  		    err.message);
        process.exit(1);
  	  }

  	  if (!user) {
  		  log('error', 'User not found in db');
  		  process.exit(1);
  	  }
  	  log('info', 'User rate limit successfully updated: %s',
  		  user);
  	  process.exit(1);
    });
}
