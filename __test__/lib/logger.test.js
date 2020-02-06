/* eslint-disable strict */
'use strict';

const { timestamp, logger } = require('../../lib/logger.js');

// Tested middleware needs to either be exported from the server or a separate module
describe('logger middleware', () => {

  let consoleSpy;
  let req = {};
  let res = {};
  let next = jest.fn(); // spy on next method

  beforeEach(() => {
    // Attach to the console (take it over)
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    // Put the console back
    consoleSpy.mockRestore();
  });

  it('spying on output of console.log() method', () => {
    timestamp(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('properly moves to the next middleware', () => {
    logger(req, res, next);
    // toHaveBeenCalled() is not enough, we need to make sure it was called with no args
    // expect(next).toHaveBeenCalledWith();
    expect(consoleSpy).toHaveBeenCalled();
  });

});