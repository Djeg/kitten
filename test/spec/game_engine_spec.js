describe('The kitten GameEngine', function() {
  it('should throw when you create a game engine on inexistent selector', function() {
    var iA = function () {
      return new kitten.GameEngine('invalid selector');
    };

    expect(iA).toThrow();
  });

  it('should contains canvas context', function () {
    var engine = new kitten.GameEngine('#game');

    expect(engine.context).not.toBeNull();
  });

  it('should contains a screen', function() {
    var engine = new kitten.GameEngine('#game');

    expect(engine.screen).toBeDefined();
  });

  it('should contains a keyboard', function() {
    var engine = new kitten.GameEngine('#game');

    expect(engine.keyboard).toBeDefined();
  });

  it('should accept screen configuration', function() {
    var engine = new kitten.GameEngine('#game', {
      screen: {
        resolution: [800, 600],
        width: 1024,
        height: 768
      }
    });

    expect(engine.$element.width()).toBe(1024);
    expect(engine.$element.height()).toBe(768);
    expect(engine.canvas.width).toBe(800);
    expect(engine.canvas.height).toBe(600);
  });

  it('should not be played on undefined scene', function() {
    var engine = new kitten.GameEngine('#game');
    var f = function () { engine.play('invalid'); };

    expect(f).toThrow();
  });

  it('shouldn\'t be possible to play twice', function() {
      var engine     = new kitten.GameEngine('#game');
      var scene      = new kitten.BaseScene();
      engine.addScene('plop', scene);
      engine.started = true;
      var f = function () { engine.play('plop'); };

      expect(f).toThrow();
  });

  it('should set up a timer with the scene update inside', function() {
    var engine   = new kitten.GameEngine('#game', {
        fps: 25
    });
    var scene    = new kitten.BaseScene();
    var update   = jasmine.createSpy('update');
    scene.update = update;
    jasmine.Clock.useMock();

    engine.addScene('test', scene);
    engine.play('test');

    expect(scene.update).not.toHaveBeenCalled();

    jasmine.Clock.tick(1000/25);

    expect(scene.update.callCount).toBe(1);

    jasmine.Clock.tick(1000/25);

    expect(scene.update.callCount).toBe(2);

    expect(engine.runningScene).toBe(scene);
  });

  it('should stop a started scene', function() {
    var engine   = new kitten.GameEngine('#game', {
        fps: 25
    });
    var stop = jasmine.createSpy('stop');
    var scene    = new kitten.BaseScene();
    scene.stop = stop;

    engine.addScene('test', scene);
    engine.play('test');

    expect(engine.runningScene).toBe(scene);
    expect(engine.gameLoop).not.toBe(null);

    engine.stop();

    expect(scene.stop).toHaveBeenCalled();

    expect(engine.runningScene).toBe(null);
    expect(engine.gameLoop).toBe(null);
  });

  it('should contains a mouse', function() {
    var engine = new kitten.GameEngine('#game');

    expect(engine.mouse).toBeDefined();
  });
});
