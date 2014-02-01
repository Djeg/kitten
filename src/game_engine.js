/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten
 */

'use strict';

/**
 * This is the kitten game engine, starting point of any kitten
 * games.
 *
 * @class GameEngine
 * @constructor
 * @author David Jegat <david.jegat@gmail.com>
 */
kitten.GameEngine = Class.$extend({

  /**
   * Create a new game engine. Simply attach a selector of the <canvas>
   * element ^.^
   *
   * @method __init__
   *
   * @param {String} selector
   * @param {Object} [config = {}]
   */
  __init__: function (selector, config) {
    this.$element = $(selector);
    this.selector = selector;

    if (this.$element.length === 0) {
      throw kitten.Error('Invalid canvas selector "%s"', this.selector);
    }

    this.canvas   = this.$element.eq(0)[0];

    if (!this.canvas.getContext) {
      throw kitten.Error('Canvas context is not accessible. Maybe a wrong selector or an outdated navigator ?');
    }

    this.context      = this.canvas.getContext('2d');
    this.scenes       = {};
    this.started      = false;
    this.runningScene = null;
    this.config       = new kitten.ConfigProcessor(config);
    this.gameLoop     = false;
    this.screen       = new kitten.Screen(this.config.get('screen', {}), this);
    this.screen.adjust();
  },

  /**
   * A a kitty scene to the game engine.
   *
   * @method addScene
   *
   * @param {String} name
   * @param {kitten.BaseScene} scene
   * @chainable
   */
  addScene: function (name, scene) {
    if (undefined !== this.scenes[name]) {
      throw kitten.Error('A scene named "%s" is always register into the GameEngine :(', name);
    }

    if (!scene instanceof kitten.BaseScene) {
      throw kitten.Error('A scene must be an instance of kitten.BaseScene');
    }

    this.scenes[name] = scene;

    return this;
  },

  /**
   * Play a scene
   *
   * @method play
   *
   * @param {String} name
   *
   * @chainable
   */
  play: function (name) {
    if (undefined === this.scenes[name]) {
      throw kitten.Error('No scene named "%s" has been found', name);
    }

    if (this.started) {
      throw kitten.Error('The scene "%s" is already playing right now', name);
    }

    this.runningScene = this.scenes[name];
    this.runningScene.setUp(this);
    var scene = this.runningScene;
    this.gameLoop     = setInterval(function () {
      scene.update();
    }, 1000 / this.config.get('fps', 25) );

    return this;
  },

  /**
   * Stop the current scene
   *
   * @method stop
   *
   * @chainable
   */
  stop: function () {
    if (null === this.runningScene) {
      throw kitten.Error('Youps ... no scene is actually playing');
    }

    clearInterval(this.gameLoop);
    this.gameLoop = null;
    this.runningScene.stop();

    this.runningScene = null;

    return this;
  }
});
