/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten
 */

'use strict';

/**
 * Represent an kitten error °.°
 *
 * @param {String} message
 * @param {String} parameters*
 */
kitten.Error = function (message) {
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      message = message.replace('%s', arguments[i]);
    }
  }

  return [
    'Kitten has some troubles: ' + message,
    '',
    (new Error('Stack trace')).stack
  ].join('\n');
};
