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
  });
});
