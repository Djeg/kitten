/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten
 */

'use strict';

/**
 * This object represent a canvas screen and allow you to adjust
 * it with some configuration and of course fullscreen your game ! ;)
 *
 * @class Screen
 * @constructor
 * @author David Jegat <david.jegat@gmail.com>
 */
kitten.Screen = Class.$extend({

  /**
   * Create a new screen object. It takes a simple configuration object
   * with the following keys :
   * - resolution : contains the x and y canvas resolution : ([800, 600])
   * - width : the canvas width
   * - height : the canvas height
   * - autoSize : a boolean with true to adjust width/height
   *
   * @param {Object} configuration
   * @param {kitten.GameEngine} engine
   */
  __init__: function (configuration, engine) {
    this.configProcessor = new kitten.ConfigProcessor(configuration);
    this.resizerEvent    = null;
    this.isFullscreen    = false;
    this.noFsWidth       = null;
    this.noFsHeight      = null;

    if (!(engine instanceof kitten.GameEngine)) {
      throw kitten.Error('You must precised a valid game engine on a screen object');
    }

    this.engine     = engine;

    // attach an event on fullscreen change
    $(document).bind('onfullscreenchange', function () {
      this.onFullscreenChange();
    });
  },

  /**
   * Adjust the canvas resolution and size.
   *
   * @method adjust
   *
   * @param {Boolean} [onScreen = false], calculate the width and the height
   * with screen and not with the parent canvas element.
   */
  adjust: function (onScreen) {
    onScreen = onScreen || false;
    var resolution = null;
    if (this.configProcessor.get('autoSize', false)) {
      var width       = onScreen ?
        screen.width :
        this.engine.$element.parent().width()
      ;
      var height      = onScreen ?
        screen.height :
        this.engine.$element.parent().height()
      ;

      resolution = this.configProcessor.get('resolution', [800, 600]);
      this.setResolution(resolution[0], resolution[1]);

      var size   = this.calculateClosestSize(width, height, resolution);
      this.setSize(size.width, size.height);

      if (null === this.resizerEvent) {
        window.onresize = this.resizerEvent = function () {
          this.adjust();
        };
      }
    } else {
       // resize canvas to the width and height
      this.resizeCanvas(
        onScreen ? screen.width : this.configProcessor.get('width', 800),
        onScreen ? screen.height : this.configProcessor.get('height', 600)
      );
      // apply resolution
      resolution = this.configProcessor.get('resolution', [800, 600]);
      this.setResolution(resolution[0], resolution[1]);
    }

    this.isFullscreen = onScreen;
  },

  /**
   * Apply a given resolution
   *
   * @method setResolution
   *
   * @param {Number} x
   * @param {Number} y
   */
  setResolution: function (x, y) {
    this.engine.canvas.width  = x;
    this.engine.canvas.height = y;
  },

  /**
   * Set the canvas element size
   *
   * @method setSize
   *
   * @param {Number} width
   * @param {Number} height
   */
  setSize: function (width, height) {
    this.engine.$element.width(width);
    this.engine.$element.height(height);
  },

  /**
   * Calculate the closest size for a given maxWidth, maxHeight and a resolution
   *
   * @method calculateClosestSize
   *
   * @param {Number} width
   * @param {Number} height
   * @param {Array} resolution
   *
   * @return {Object}, contains the width and height size
   */
  calculateClosestSize: function (width, height, resolution) {
    var ratio = Math.floor( (resolution[0]/resolution[1]) * 100) / 100;

    if (ratio >= 1) {
      while (width !== resolution[0]) {
        if (width > resolution[0]) {
          resolution[0] += 1;
          resolution[1] += 1;
        } else {
          resolution[0] -= 1;
          resolution[1] -= 1;
        }
      }
    } else {
      while (height !== resolution[1]) {
        if (height > resolution[1]) {
          resolution[0] += 1;
          resolution[1] += 1;
        } else {
          resolution[0] -= 1;
          resolution[1] -= 1;
        }
      }
    }

    return {
      width: resolution[0],
      height: resolution[1]
    };
  },

  /**
   * Fullscreen the canvas
   *
   * @method fullscreen
   */
  fullscreen: function () {
    this.noFsWidth  = this.engine.$element.width();
    this.noFsHeight = this.engine.$element.height();
    this.adjust(!this.isFullscrenn);
    this.engine.$element.toggleFullScreen();
  },

  /**
   * This method is launched on fullscreen changement
   * an recalculate the canvas size.
   *
   * @mehod onfullscreenchange
   */
  onFullscreenChange: function () {
    if ($(document).fullScreen()) {
      this.engine.$element.width(screen.width);
      this.engine.$element.height(screen.height);
    } else {
      // fix the fullscreen to fit the entire screen on webkit
      // browser.
      this.engine.$element.width(this.noFsWidth);
      this.engine.$element.height(this.noFsHeight);
      this.noFsWidth  = null;
      this.noFsHeight = null;
    }
  },

  /**
   * Resize the canvas element to the given width and height
   *
   * @method resizeCanvas
   *
   * @param {Number} width
   * @param {Number} height
   */
  resizeCanvas: function (width, height) {
    this.engine.$element.width(width);
    this.engine.$element.height(height);
  }
});

