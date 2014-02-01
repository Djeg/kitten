describe('A screen', function() {
  it('should be build with configuration and game engine', function() {
    var engine = new kitten.GameEngine('#game');
    var f = function () {
      return new kitten.Screen();
    };

    expect(f).toThrow();

    var sc = new kitten.Screen({}, engine);

    expect(sc.engine).toEqual(engine);
  });

  it('should be adjust', function() {
    var engine = new kitten.GameEngine('#game');
    var sc = new kitten.Screen({
      resolution: [1024, 768],
      width: 800,
      height: 600
    }, engine);

    sc.adjust();

    expect(engine.$element.width()).toBe(800);
    expect(engine.$element.height()).toBe(600);
    expect(engine.canvas.width).toBe(1024);
    expect(engine.canvas.height).toBe(768);
  });

  it('should pe possible to switch fullscreen', function() {
    var engine = new kitten.GameEngine('#game');
    engine.$element.toggleFullScreen = jasmine.createSpy('fullscreen');

    var screen = new kitten.Screen({}, engine);

    screen.fullscreen();

    expect(engine.$element.toggleFullScreen).toHaveBeenCalled();
    expect(engine.$element.width()).toBe(window.screen.width);
    expect(engine.$element.height()).toBe(window.screen.height);

    screen.fullscreen();

    expect(engine.$element.toggleFullScreen).toHaveBeenCalled();
  });
});
