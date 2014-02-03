/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten
 */

'use strict';

/**
 * A kitty mouse controller :)
 *
 * @class Mouse
 * @constructor
 * @author David Jegat <david.jegat@gmail.com>
 */
kitten.Mouse = Class.$extend({
  __classvars__: {
    LEFT: 1,
    left: 1,
    MIDDLE: 2,
    middle: 2,
    RIGHT: 3,
    right: 3
  },

  /**
   * Create a mouse
   *
   * @method __init__
   *
   * @param {kitten.GameEngine} engine
   */
  __init__: function (engine) {
    this.pressed = [];
    this.x       = 0;
    this.y       = 0;

    if (!(engine instanceof kitten.GameEngine)) {
      throw kitten.Error('You must precised a valid kitten.GameEngine');
    }

    this.engine = engine;
  },

  /**
   * Test if a button is pressed
   *
   * @method isPressed
   *
   * @param {Number} [btnCode=1]
   */
  isPressed: function (btnCode) {
    btnCode = undefined === btnCode ? 1 : btnCode;

    return this.pressed[btnCode] ? true : false;
  },

  /**
   * Test if a button is clicked
   *
   * @method isClicked
   *
   * @param {Number} [btnCode=1]
   */
  isClicked: function (btnCode) {
    btnCode = undefined === btnCode ? 1 : btnCode;
    var c = this.pressed[btnCode] ? true : false;

    this.doRelease(btnCode);

    return c;
  },

  /**
   * Update mouse position
   *
   * @method updatePosition
   *
   * @param {Number} x
   * @param {Number} y
   */
  updatePosition: function (x, y) {
    x = x - this.engine.$element.offset().left;
    y = y - this.engine.$element.offset().top;
    var xd, yd, mx, my = 0;

    // calculate the differences between resolution and trully size
    xd = this.engine.$element.width() - this.engine.canvas.width;
    yd = this.engine.$element.height() - this.engine.canvas.height;

    mx = Math.round(x - xd);
    my = Math.round(y - yd);

    this.x = (mx < 0 || mx === xd) ? 0 : mx;
    this.y = (my < 0 || my === yd) ? 0 : my;
  },

  /**
   * Update pressed buttons
   *
   * @method doPress
   *
   * @param {Number} btnCode
   */
  doPress: function (btnCode) {
    this.pressed[btnCode] = true;
  },

  /**
   * Update released buttons
   *
   * @method doRelease
   *
   * @param {Number} btnCode
   */
  doRelease: function (btnCode) {
    this.pressed[btnCode] = null;
  }
});
