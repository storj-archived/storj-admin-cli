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
