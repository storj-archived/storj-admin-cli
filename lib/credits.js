/**
 * @module credits
 */
'use strict';

const log = require('./logger');
const utils = require('./utils');

/**
 * Manually add credit to given mongodb instance
 * @param {string} userEmail
 * @param {number} creditAmount 
 */
exports.addManualCredit = function(userEmail, creditAmount, db) {
  let Credit = db.models.Credit;
  let User = db.models.User; 

  let manualCreditArgs = {
    user: userEmail,
    type: 'manual',
    promo_amount: creditAmount,
    promo_code: 'storj-event',
    promo_expires: utils.addYearsToCurrentDate(1)
  };
  let manualCreditObj = new Credit(manualCreditArgs);

  User.findOne({_id: userEmail}, (err, user) => {
    if (err) {
      log('error', 'Failed on user lookup, reason %s',
  		           err.message);
      process.exit(1);
    }
  
    if (!user) {
      log('error', 'User must have Storj account to add credit');
      process.exit(1);
    }

    manualCreditObj.save((err, credit) => {
      if (err) {
        log('error', 'Failed to save credit, reason: %s', err.message);
        process.exit(1);
      }
    log('info', 'Successfully saved credit: %s', credit);
    process.exit(1);
    });
  });
};
