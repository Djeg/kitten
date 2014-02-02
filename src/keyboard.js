/**
 * Kitten the adorable game engine (miou ^.^)
 *
 * @module kitten
 */

'use strict';

/**
 * Represent a simple kitten keys sequences
 *
 * @class Keys
 * @static
 */
kitten.Keyboard = Class.$extend({
  __classvars__: {
    ENTER:  13,
    enter:  13,
    SPACE:  32,
    space:  32,
    UP:     38,
    up:     38,
    DOWN:   40,
    down:   40,
    LEFT:   37,
    left:   37,
    RIGHT:  39,
    right:  39,
    A:      65,
    B:      66,
    C:      67,
    D:      68,
    E:      69,
    F:      70,
    G:      71,
    H:      72,
    I:      73,
    J:      74,
    K:      75,
    L:      76,
    M:      77,
    N:      78,
    O:      79,
    P:      80,
    Q:      81,
    R:      82,
    S:      83,
    T:      84,
    U:      85,
    V:      86,
    W:      87,
    X:      88,
    Y:      89,
    Z:      90,
    a:      97,
    b:      98,
    c:      99,
    d:      100,
    e:      101,
    f:      102,
    g:      103,
    h:      104,
    i:      105,
    j:      106,
    k:      107,
    l:      108,
    m:      109,
    n:      110,
    o:      111,
    p:      112,
    q:      113,
    r:      114,
    s:      115,
    t:      116,
    u:      117,
    v:      118,
    w:      119,
    x:      120,
    y:      121,
    z:      122,
    ',':    44,
    ';':    59,
    ':':    58,
    '!':    33,
    '?':    63,
    '.':    46,
    '/':    47,
    '§':    167,
    '^':    94,
    '$':    36,
    'ù':    249,
    '*':    42,
    '¨':    168,
    '£':    163,
    '%':    37,
    'µ':    181,
    'ê':    234,
    '&':    238,
    'é':    233,
    '"':    34,
    '\'':   39,
    '(':    40,
    '-':    45,
    'è':    232,
    '_':    95,
    'ç':    231,
    'à':    224,
    ')':    41,
    '=':    61,
    '~':    126,
    '#':    35,
    '{':    123,
    '[':    91,
    '|':    124,
    '`':    96,
    '\\':   92,
    '@':    64,
    ']':    93,
    '}':    125,
    '<':    60,
    '>':    62,
    'œ':    339,
    '°':    176,
    '+':    43,
    '0':    48,
    '1':    49,
    '2':    50,
    '3':    51,
    '4':    52,
    '5':    53,
    '6':    54,
    '7':    55,
    '8':    56,
    '9':    57
  },

  /**
   * Create a new Keys object
   *
   * @method __init__
   */
  __init__: function () {
    this.pressed = [];
  },

  /**
   * Update a pressed key
   *
   * @method doPress
   *
   * @param {Number} wich
   */
  doPress: function (wich) {
    this.pressed[wich] = true;
  },

  /**
   * Update a released key
   *
   * @method doRelease
   *
   * @param {Number} wich
   */
  doRelease: function (wich) {
    this.pressed[wich] = null;
  },

  /**
   * Test if a key is pressed
   *
   * @method isPressed
   *
   * @param {Number} keyCode
   *
   * @return {Boolean}
   */
  isPressed: function (keyCode) {
    return this.pressed[keyCode] ? true : false;
  },

  /**
   * Test if a key is pushed
   *
   * @method isPushed
   *
   * @param {Number} keyCode
   *
   * @return {Boolean}
   */
  isPushed: function (keyCode) {
    var pushed = this.pressed[keyCode] ? true : false;

    this.doRelease(keyCode);

    return pushed;
  }
});
