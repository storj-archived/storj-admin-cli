'use strict';

var colors = require('colors/safe');

module.exports = function(type, message, args) {
  switch (type) {
    case 'info':
      message = colors.bold.cyan(' [info]   ') + message;
      break;
    case 'warn':
      message = colors.bold.yellow(' [warn]   ') + message;
      break;
    case 'error':
      message = colors.bold.red(' [error]  ') + message;
      break;
  }

  console.log.apply(console, [message].concat(args || []));
};
