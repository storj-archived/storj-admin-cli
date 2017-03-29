#!/usr/bin/env node

'use strict';

const storjadmin = require('commander');

storjadmin
  .version('0.0.1')
  .command('add-credit', 'manually add user credit')
  .parse(process.argv);
  