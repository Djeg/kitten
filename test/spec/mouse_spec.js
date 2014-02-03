describe('A mouse', function() {
  it('should be create with a game engine', function() {
    var engine = new kitten.GameEngine('#game');
    var f1  = function () {
      new kitten.Mouse();
    };
    var f2 = function () {
      new kitten.Mouse(engine);
    }

    expect(f1).toThrow();
    expect(f2).not.toThrow();
  });

  it('should detect mouse pressed boutons', function() {
    var engine = new kitten.GameEngine('#game');
    var mouse  = new kitten.Mouse(engine);

    mouse.doPress(kitten.Mouse.LEFT);

    expect(mouse.isPressed(kitten.Mouse.LEFT)).toBe(true);
  });

  it('should detect mouse clicked buttons', function() {
    var engine = new kitten.GameEngine('#game');
    var mouse  = new kitten.Mouse(engine);

    mouse.doPress(kitten.Mouse.MIDDLE);

    expect(mouse.isClicked(kitten.Mouse.MIDDLE)).toBe(true);
    expect(mouse.isClicked(kitten.Mouse.MIDDLE)).toBe(false);
  });

  it('should contains mouse coordinates', function() {
    var engine = new kitten.GameEngine('#game');
    var mouse  = new kitten.Mouse(engine);

    mouse.updatePosition(100, 50);

    expect(mouse.x).toBe(92);
    expect(mouse.y).toBe(42);
  });
});
