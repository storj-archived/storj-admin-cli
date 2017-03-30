/**
 * @module utils
 */

'use strict';

const assert = require('assert');

/**
 * Add n number of years to current date
 * @param {number} n
 */
exports.addYearsToCurrentDate = function(n) {
  assert(typeof n === 'number');
  var today = new Date();
  return new Date(
  	today.getFullYear() + n,
    today.getMonth(), 
    today.getDate()
    );
};

/**
 * Set undefined flags to false
 * @param {boolean} n
 */
exports.setOptionFlag = function(flag) {
	if (flag) {
	  return flag;
	}
	return false;
};
