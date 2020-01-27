'use strict';

let logger = (req, res, next) => {

  console.log('request info:', req.method, req.path, req.requestTime);
  next();
};

let timestamp = (req, res, next)=> {

  let time = new Date();
  req.requestTime = time;
  next();

};

module.exports = { timestamp,logger, };