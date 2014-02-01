/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten.factory
 */

'use strict';

/**
 * This factory allow you to instanciate a graphic easily
 * by simply provide the graphic name and some of this options
 *
 * @class GraphicFactory
 * @constructor
 * @author David Jegat <david.jegat@gmail.com>
 */
kitten.factory.GraphicFactory = Class.$extend({

  /**
   * Create a new GraphicFactory
   *
   * @method __init__
   */
  __init__: function () {
    this.configProcessor = new kitten.ConfigProcessor();
  },

  /**
   * Create a new graphic. Just provide two keys, the graphic type and it's
   * options
   *
   * @method create
   *
   * @param {Object} configuration
   *
   * @return {kitten.graphic.BaseGraphic}
   */
  create: function (configuration) {
    this.configProcessor.setConfiguration(configuration);
    var type = this.configProcessor.get('type', null);
    var options = this.configProcessor.get('options', {});

    // format the type string to be in CamlCase
    type = type.replace(/_/g, ' ');

    var members = type.split(' ');
    type = '';
    for (var i in members) {
      if (i === members.length - 1) {
        if (members[i].toLowerCase() === 'graphic') {
          break;
        }
      }
      var tmp = members[i].toLowerCase();

      type += tmp.charAt(0).toUpperCase() + tmp.slice(1);
    }

    type += 'Graphic';

    if (null === type) {
      throw kitten.Error('You must precised a graphic type');
    }

    if (undefined === kitten.graphic[type]) {
      throw kitten.Error('Undefined graphic "kitten.graphic.%s"', type);
    }

    return new kitten.graphic[type](options);
  }
});
