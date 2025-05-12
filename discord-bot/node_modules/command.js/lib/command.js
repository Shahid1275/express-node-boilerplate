/**
 * Module dependencies
 */

var exec = require('child_process').exec;

/**
 * Expose `Command`
 */

module.exports = Command;

/**
 * Initialize `Command`
 */

function Command(options) {
  if(!(this instanceof Command)) return new Command(options);
  this.options = options || {};
  this.commands = [];
}

/**
 * Run a command
 *
 * @param {String} cmd
 * @return {Command}
 * @api public
 */

Command.prototype.run = function(cmd) {
  this.commands.push(cmd);
  return this;
};

/**
 * Execute the commands
 *
 * @param {Function} fn
 * @return {Command}
 * @api public
 */

Command.prototype.end = function(fn) {
  exec(this.commands.join('&&'), fn);
  return this;
};
