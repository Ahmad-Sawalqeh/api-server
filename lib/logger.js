/* eslint-disable strict */
'use strict';

let logger = (req, res, next) => {

  console.log('Current Time:', req.requestTime);
  console.log('Path:', req.path);
  console.log('Method:', req.method);

  next();
};

let timestamp = (req, res, next)=> {

  let date = new Date();
  req.requestTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  console.log('Current Time:', req.requestTime);

  next();
};

module.exports = { timestamp, logger };
