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
 UserOperations.prototype.setUserRateLimitFlag = function(email, flag, next) {
  let User = this.storage.models.User;

  User.findByIdAndUpdate(email, {
    $set: {isFreeTier: flag}
    }, (err, user) => {
    if (err) {
      next(log('error', 'Failed on user update, reason %s', err.message));
    }

    if (!user) {
      next(log('error', 'User not found in db'));
    }

    next(log('info', 'User rate limit successfully updated: %s', user));
  });
};

module.exports = UserOperations;
