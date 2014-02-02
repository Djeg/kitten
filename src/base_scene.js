/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten
 */

'use strict';

/**
 * The base scene. It represent a basic game scene. It's the entry point
 * of a kitten game. Create your own scene just inherit from this one and
 * start rocking with kitten engine ! (^.^ miou)
 *
 * @class BaseScene
 * @constructor
 *
 * @author David Jegat <david.jegat@gmail.com>
 */
kitten.BaseScene = Class.$extend({

  /**
   * Create a new BaseScene.
   *
   * @method __init__
   */
  __init__: function () {
    this.engine               = null;
    this.layers               = {};
    this.orderedLayers        = null;
    this.loadingLayers        = {};
    this.orderedLoadingLayers = null;
    this.acting               = false;
    this.layerFactory         = new kitten.factory.LayerFactory();
    this.ready                = false;
  },

  /**
   * Set up a scene with the kitten engine
   *
   * @param {kitten.GameEngine} engine
   *
   * @method setUp
   */
  setUp: function (engine) {
    if (!(engine instanceof kitten.GameEngine)) {
      throw kitten.Error('You must set up a scene with an instance of GameEngine');
    }

    this.engine = engine;
    this.acting = true;
  },

  /**
   * Create add a layer
   *
   * @method addLayer
   *
   * @param {String} name
   * @param {Object} config
   * @chainable
   */
  addLayer: function (name, config) {
    if (undefined !== this.layers[name]) {
      throw kitten.Error('The layer "%s" is always register in the scene :(', name);
    }

    this.layers[name] = this.layerFactory.create(config);

    return this;
  },

  /**
   * Add a loading layer
   *
   * @method addLoadingLayer
   *
   * @param {String} name
   * @param {Object} config
   * @chainable
   */
  addLoadingLayer: function (name, config) {
    if (undefined !== this.loadingLayers[name]) {
      throw kitten.Error('The loading layer "%s" is always register in the scene :(', name);
    }

    this.loadingLayers[name] = this.layerFactory.create(config);

    return this;
  },

  /**
   * Retrieve a graphic. This method take a special string formated like that :
   * "layer_name:graphic_name" and try to resolve it into a corect graphic
   *
   * @method getGraphic
   *
   * @param {String} fetcher
   *
   * @return {kitten.graphic.BaseGraphic}
   */
  getGraphic: function (fetcher) {
    var exploded = fetcher.split(':');

    if (exploded.length < 2) {
      throw kitten.Error('You must precised a valid graphic fetcher ' +
        '(ex: "layer_name:graphic_name"). "%s" given is invalid', fetcher);
    }

    var layerName   = exploded[0];
    var graphicName = exploded[1];

    if (undefined === this.layers[layerName]) {
      throw kitten.Error('Undefined layer "%s" :(', layerName);
    }

    var graphic = this.layers[layerName].getGraphic(graphicName);
    if (null === graphic) {
      throw kitten.Error('Undefined layer graphic "%s" :(', fetcher);
    }

    return graphic;
  },

  /**
   * Get a loading graphic. Like getGraphic it takes a special graphic fetcher
   *
   * @method getLoadingGraphic
   *
   * @param {String} fetcher
   *
   * @return {kitten.graphic.BaseGraphic}
   */
  getLoadingGraphic: function (fetcher) {
    var exploded = fetcher.split(':');

    if (exploded.length < 2) {
      throw kitten.Error('You must precised a valid graphic fetcher ' +
        '(ex: "layer_name:graphic_name"). "%s" given is invalid', fetcher);
    }

    var layerName   = exploded[0];
    var graphicName = exploded[1];

    if (undefined === this.loadingLayers[layerName]) {
      throw kitten.Error('Undefined layer "%s" :(', layerName);
    }

    var graphic = this.loadingLayers[layerName].getGraphic(graphicName);
    if (null === graphic) {
      throw kitten.Error('Undefined layer graphic "%s" :(', fetcher);
    }

    return graphic;
  },

  /**
   * Try to retrieve a layer
   *
   * @method getLayer
   *
   * @param {String} name
   *
   * @return {kitten.Layer}
   */
  getLayer: function (name) {
    if (undefined === this.layers[name]) {
      throw kitten.Error('Undefined layer "%s" :(', name);
    }

    return this.layers[name];
  },

  /**
   * Get a loading layer
   *
   * @method getLoadingLayer
   *
   * @param {String} name
   *
   * @return {kitten.Layer}
   */
  getLoadingLayer: function (name) {
    if (undefined === this.loadingLayers[name]) {
      throw kitten.Error('Undefined loading layer "%s" :(', name);
    }

    return this.loadingLayers[name];
  },

  /**
   * Test if a key is pressed
   *
   * @method isKeyPressed
   *
   * @param {Number} keyCode
   *
   * @return {Boolean}
   */
  isKeyPressed: function (keyCode) {
    return this.engine.keyboard.isPressed(keyCode);
  },

  /**
   * Test if a key is pushed
   *
   * @method isKeyPushed
   *
   * @param {Number} keyCode
   *
   * @return {Boolean}
   */
  isKeyPushed: function (keyCode) {
    return this.engine.keyboard.isPushed(keyCode);
  },

  /**
   * Retrieve a key code, that can be send into keyPressed or keyPushed
   * of a kitten.Keyboard object
   *
   * @method getKey
   *
   * @param {String} keyName
   *
   * @return {Boolean}
   */
  getKey: function (keyName) {
    return kitten.Keyboard[keyName];
  },

  /**
   * Change the scene. Stop this scene and start a new one
   *
   * @method changeScene
   *
   * @param {String} nextScene
   */
  changeScene: function (nextScene) {
    if (null !== this.engine) {
      this.engine.stop();

      this.engine.start(nextScene);
    }
  },

  /**
   * Initialize a scene. This method is to overide and attach layers and graphics
   *
   * @method initialize
   */
  initialize: function () {
    throw kitten.Error('You must implement the initialize method');
  },

  /**
   * This method is launched during the scene is loading. You can implement
   * a special loading scene
   *
   * @method load
   */
  load: function () {
    return;
  },

  /**
   * Act a scene. This method handle the scene logic and behavior. It throw by
   * default bcause you need to implement your scene behavior inside ^.^
   *
   * @method act
   */
  act: function () {
    throw kitten.Error('You must implement the act method');
  },

  /**
   * Update a scene. This method is called at each frame and allow the scene
   * to be draw on the canvas context. DO NOT overide this method if, just
   * implement the act method.
   *
   * @method update
   */
  update: function () {
    if (this.engine === null) {
      throw kitten.Error('You must set up a scene before act it');
    }

    this.orderedLayers = null === this.orderedLayers ?
      this.orderLayers(this.layers) :
      this.orderedLayers
    ;

    this.orderedLoadingLayers = null === this.orderedLoadingLayers ?
      this.orderLayers(this.loadingLayers) :
      this.orderedLoadingLayers
    ;

    // act or load the scene depending on the ready state
    this.checkReadyState();
    if (this.ready) {
      this.act();
    } else {
      this.load();
    }

    // draw layers
    // first draw the loading layer if it exists
    if (!this.ready) {
      // draw loading ordered layers
      for (var i in this.orderedLoadingLayers) {
        for (var j in this.orderedLoadingLayers[i]) {
          this.orderedLoadingLayers[i][j].draw();
        }
      }
    } else {
      // draw ordered layers
      for (var k in this.orderedLayers) {
        for (var l in this.orderedLayers[k]) {
          this.orderedLayers[k][l].draw();
        }
      }
    }
  },

  /**
   * Stop the actual scene. This method does nothing special, just clear
   * layers
   *
   * @method stop
   */
  stop: function () {
    if (!this.acting) {
      throw kitten.Error('You can\'t stop a scene that is not acting :(');
    }

    this.orderedLayers = null;
    for (var i in this.layers) {
      this.layers[i].clear();
    }
    this.layers        = {};
    this.acting        = false;
    this.ready         = false;
  },

  /**
   * Check the ready state of that scene
   *
   * @method checkReadyState
   */
  checkReadyState: function () {
    for (var i in this.layers) {
      if (!this.layers[i].isReady()) {
        return;
      }
    }

    this.ready = true;
    return;
  },

  /**
   * Order the given layers list
   *
   * @param {Object} layers
   *
   * @return {Array}, the ordered layers
   */
  orderLayers: function (layers) {
    var ordered = [];
    // order the layers by depth
    for (var name in layers) {
      // set up the layer
      layers[name].setUp(this.engine);
      if (undefined === ordered[layers[name].depth]) {
        ordered[layers[name].depth] = [layers[name]];
      } else {
        ordered[layers[name].depth].push(layers[name]);
      }
    }

    return ordered;
  }
});

