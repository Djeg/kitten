/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten.graphic
 */

'use strict';

/**
 * A basic graphic class. This class is the simplest graphic ever !
 *
 * @class BaseGraphic
 * @constructor
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
kitten.graphic.BaseGraphic = Class.$extend({

  /**
   * Create a graphic
   *
   * @method __init__
   *
   * @param {Object} [options]
   */
  __init__: function (options) {
    if (undefined === options || typeof options !== 'object') {
      this.context = null;
      return;
    }

    for (var i in options) {
      this[i] = options[i];
    }

    this.context = null;
    if (undefined === options.enabled) {
      this.enabled = true;
    }
  },

  /**
   * A simple method that allow the graphic to have a time to load
   *
   * @method isReady
   */
  isReady: function () {
    return true;
  },

  /**
   * Set up the engine context
   *
   * @method setUp
   *
   * @param {kitten.GameEngine} engine
   */
  setUp: function (engine) {
    if (!(engine instanceof kitten.GameEngine)) {
      throw kitten.Error('You must precised an instance of GameEngine');
    }

    this.context = engine.context;
  },

  /**
   * Display the graphic on the screne
   *
   * @method draw
   */
  draw: function () {
    throw kitten.Error('You must implement the draw method');
  },

  /**
   * This method is launched when the scene stop. It allows to free extra
   * graphics memory
   *
   * @method clear
   */
  clear: function () {
    return;
  }
});
