'use strict';

const log = require('./logger');

/**
 * Handles user related operations
 * @constructor
 */
function UserOperations(opts) {
  if (!(this instanceof UserOperations)) {
    return new UserOperations(opts);
  }

  this.storage = opts.storage; 
}

/**
 * Adjust rate limit flag for given user
 * @param {string} userEmail
 * @param {boolean} flag 
 */
 UserOperations.prototype.setUserRateLimitFlag = function(userEmail, flag) {
  let User = this.storage.models.User;

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

module.exports = UserOperations;
