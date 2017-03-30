'use strict';

const credits = require('../lib/credits');
const {expect} = require('chai');
const sinon = require('sinon');

describe('Credit functions', function() {
  const sandbox = sinon.sandbox.create();
  afterEach(() => sandbox.restore());
  describe('#addManualCredit', function() {
    it('should log error if user does not exist', function() {

    });

    it('should log error if credit insert fails', function() {

    });

    it('should log credit data on insert success', function() {

    });
  });
});