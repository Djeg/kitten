/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten.factory
 */

'use strict';

/**
 * This factory can instanciate a layer with a predefined configuration. You can
 * pass the following options to the factory :
 * - depth, the factory depth on screen
 * - graphics, a simple json with all the scene graphics named
 *
 * @class LayerFactory
 * @constructor
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
kitten.factory.LayerFactory = Class.$extend({

  /**
   * Constructor of a layer factory.
   *
   * @method __init__
   */
  __init__: function () {
    this.configProcessor = new kitten.ConfigProcessor();
    this.graphicFactory  = new kitten.factory.GraphicFactory();
  },

  /**
   * Instanciate a layer by pass a configuration object
   *
   * @method create
   *
   * @param {Object} configuration
   *
   * @return {kitten.Layer}
   */
  create: function (configuration) {
    this.configProcessor.setConfiguration(configuration);

    var layer = new kitten.Layer();

    layer.depth = this.configProcessor.get('depth', 0);

    var graphics = this.configProcessor.get('graphics', {});

    for (var name in graphics) {
      if (!(graphics[name] instanceof kitten.graphic.BaseGraphic)) {
        graphics[name] = this.graphicFactory.create(graphics[name]);
      }

      layer.addGraphic(name, graphics[name]);
    }

    return layer;
  }
});
