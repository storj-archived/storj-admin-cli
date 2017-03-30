'use strict';

const log = require('./logger');
const utils = require('./utils');

/**
 * Handles credit related operations
 * @constructor
 */
function CreditOperations(opts) {
  if (!(this instanceof CreditOperations)) {
    return new CreditOperations(opts);
  }

  this.storage = opts.storage; 
}

/**
 * Manually add credit to given mongodb instance
 * @param {string} userEmail
 * @param {number} creditAmount 
 */
CreditOperations.prototype.addManualCredit = function(email, amount, next) {
  let Credit = this.storage.models.Credit;
  let User = this.storage.models.User; 

  let manualCreditArgs = {
    user: email,
    type: 'manual',
    promo_amount: amount,
    promo_code: 'storj-event',
    promo_expires: utils.addYearsToCurrentDate(1)
  };
  let manualCreditObj = new Credit(manualCreditArgs);

  User.findOne({_id: email}, (err, user) => {
    if (err) {
       return next(log('error', 'Failed on user lookup, reason %s',
  		   err.message));
    }
  
    if (!user) {
      return next(log('error', 'User must have Storj account to add credit'));
    }

    manualCreditObj.save((err, credit) => {
      if (err) {
        return next(log('error', 'Failed to save credit, reason: %s', 
        	             err.message));
      }
    return next(log('info', 'Successfully saved credit: %s', credit));
    });
  });
};

module.exports = CreditOperations; 
