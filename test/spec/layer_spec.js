describe('A layer', function() {
  it('should contains the engine and a depth', function() {
    var layer = new kitten.Layer();

    expect(layer.engine).toBeNull();
    expect(layer.depth).toEqual(0);
  });

  it('should be setUp with a GameEgine', function() {
    var layer = new kitten.Layer();
    var engine = new kitten.GameEngine('#game');

    layer.setUp(engine);

    expect(layer.engine).toEqual(engine);
  });

  it('should throw when we set up a bad engine', function() {
    var layer  = new kitten.Layer();
    var engine = new kitten.GameEngine('#game');
    var f      = function () {
      return layer.setUp('foo ?');
    };
    var f2    = function () {
      return layer.setUp(engine);
    };

    expect(f).toThrow();
    expect(f2).not.toThrow();
  });
});
