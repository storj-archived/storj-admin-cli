'use strict';

const utils = require('../lib/utils');
const {expect} = require('chai');

describe('utils functions', function() {

  describe('#addYearsToCurrentDate', function() {
    it('should fail for non numeric input', function() {
      expect(function () {
      	utils.addYearsToCurrentDate('one');
      }).to.throw(Error);
    });

    it('should return a date', function() {
      expect(utils.addYearsToCurrentDate(1)).to.be.an.instanceOf(Date);
    });
  });

  describe('#setOptionFlag', function() {
    const command = {
    	flag: true
    };

    it('should set undefined flags to false', function() {
      expect(utils.setOptionFlag(command.noFlag)).to.equal(false);
    });
    
    it('should set true flags to true', function() {
    	expect(utils.setOptionFlag(command.flag)).to.equal(true);
    });
  });
});
