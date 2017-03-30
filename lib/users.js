/**
 * @module users
 */
'use strict';

const log = require('logger');

/**
 * Manually add credit to given mongodb instance
 * @param {string} userEmail
 * @param {number} creditAmount 
 */
 exports.setUserRateLimitFlag = function(userEmail, flag, db) {
  let User = db.models.User;

  User.findByIdAndUpdate(userEmail, {
    $set: {isFreeTier: flag}
    }, (err, user) => {
    if (err) {
      log('error', 'Failed on user update, reason %s', err.message);
      process.exit(1);
    }

    if (!user) {
      log('error', 'User not found in db');
      process.exit(1);
    }

    log('info', 'User rate limit successfully updated: %s', user);
    process.exit(1);
  });
};
