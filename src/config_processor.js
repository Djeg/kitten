/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten
 */

'use strict';

/**
 * Process to a kitten.GameEngine configuration
 *
 * @class ConfigProcessor
 * @constructor
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
kitten.ConfigProcessor = Class.$extend({

  /**
   * Create a configuration processor
   *
   * @method __init__
   *
   * @param {Object} [configuration = {}]
   */
  __init__: function (configuration) {
    this.raw = configuration || {};
  },

  /**
   * Set up a configuration
   *
   * @method setConfiguration
   *
   * @param {Object} configuration
   */
  setConfiguration: function (configuration) {
    this.raw = configuration;
  },

  /**
   * Get a config key or a default configuration
   *
   * @method get
   *
   * @param {String} key
   * @param {*} [defaultValue = null], the default value
   *
   * @return {*}, the configuration value or the default value
   */
  get: function (key, defaultValue) {
    if (undefined === defaultValue) {
      defaultValue = null;
    }

    if (undefined === this.raw[key]) {
      return defaultValue;
    }

    return this.raw[key];
  }
});
