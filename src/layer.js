/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten
 */

'use strict';

/**
 * This is a layer. A layer is a simple graphics container that can have
 * a z position (for the depth)
 *
 * @class Layer
 * @constructor
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
kitten.Layer = Class.$extend({

  /**
   * Create a new layer
   *
   * @method __init__
   */
  __init__: function () {
    this.engine   = null;
    this.depth    = 0;
    this.graphics = {};
  },

  /**
   * Add a graphic
   *
   * @param {String} name
   * @param {kitten.graphic.BaseGraphic} graphic
   *
   * @chainable
   */
  addGraphic: function (name, graphic) {
    if (undefined !== this.graphics[name]) {
      throw kitten.Error('You have already register the graphice "%s" in this layer', name);
    }

    if (!(graphic instanceof kitten.graphic.BaseGraphic)) {
      throw kitten.Error('You must precised an instance of BaseGraphic');
    }

    this.graphics[name] = graphic;

    return this;
  },

  /**
   * Get a graphic. Return null if no graphics found :)
   *
   * @method getGraphic
   *
   * @param {String} name
   *
   * @return {kitten.graphic.BaseGraphic|null}
   */
  getGraphic: function (name) {
    if (undefined === this.graphics[name]) {
      return null;
    }

    return this.graphics[name];
  },

  /**
   * Set up a layer with a kitten engine
   *
   * @method setUp
   *
   * @param {kitten.GameEngine} engine
   */
  setUp: function (engine) {
    if (!(engine instanceof kitten.GameEngine)) {
      throw kitten.Error('You must set up a layer with a valid GameEngine');
    }

    this.engine = engine;

    // set up graphics
    for (var name in this.graphics) {
      this.graphics[name].setUp(engine);
    }
  },

  /**
   * Draw the layer on the canvas context
   *
   * @method draw
   */
  draw: function () {
    // draw graphics
    for (var i in this.graphics) {
      if (!this.graphics[i].enabled) {
        continue;
      }

      this.graphics[i].draw();
    }
  },

  /**
   * Clear the layer by free the graphics memory
   *
   * @method clear
   */
  clear: function () {
    for (var i in this.graphics) {
      this.graphics[i].clear();
    }

    this.graphics = {};
    this.engine   = null;
  },

  /**
   * Test if this layer is ready to be draw
   *
   * @method isReady
   *
   * @return {boolean}
   */
  isReady: function () {
    for (var i in this.graphics) {
      if (!this.graphics[i].isReady()) {
        return false;
      }
    }

    return true;
  }
});
