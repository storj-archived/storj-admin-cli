#!/usr/bin/env node

'use strict';

const mongo = require('../lib/config/mongodb');
const rate_limit = require('commander');
const Storage = require('storj-service-storage-models');
const UserOperations = require('../lib/users');
const utils = require('../lib/utils');

rate_limit
  .description('Add or remove rate limiting for user')
  .option('-u, --user <user>', 'User email address')
  .option('-o, --off', 'Turn rate limit off for user')
  .parse(process.argv);

if (!rate_limit.user) {
  console.error('\n  missing user, try --help');
  process.exit(1);
}

const userOption = rate_limit.user; 
const rateLimitFlagOption = utils.setOptionFlag(rate_limit.off);

const userOptions = {
    storage: new Storage(mongo.url, mongo.opts)
  };

const userOperations = new UserOperations(userOptions);

userOperations.setUserRateLimitFlag(
	userOption, 
	rateLimitFlagOption, 
	process.exit
);
