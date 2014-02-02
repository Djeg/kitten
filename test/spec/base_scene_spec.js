describe('A BaseScene', function() {
  it('should be setUp with a GameEngine', function() {
    var scene  = new kitten.BaseScene();
    var engine = new kitten.GameEngine('#game');
    var f      = function () {
      scene.setUp('plop ?');
    };

    scene.setUp(engine);

    expect(f).toThrow();
    expect(scene.engine).toBe(engine);
  });

  it('should have an initialize method', function() {
    var scene = new kitten.BaseScene();
    var f     = function () { scene.initiliaze(); };

    expect(scene.initialize).toBeDefined();
    expect(f).toThrow();
  });

  it('should have an act method', function() {
    var scene = new kitten.BaseScene();
    var f     = function () { scene.act(); };

    expect(scene.act).toBeDefined();
    expect(f).toThrow();
  });

  it('shouln\'t be updated witheout engine', function() {
    var scene = new kitten.BaseScene();
    var f     = function () { scene.update(); };
    var engine = new kitten.GameEngine('#game');

    expect(f).toThrow();

    scene.setUp(engine);
    scene.act = function () {
      return;
    };

    expect(f).not.toThrow();
  });

  it('should build layer and graphics', function() {
    var scene    = new kitten.BaseScene();
    var iLayer   = new kitten.Layer();
    var iGraphic = new kitten.graphic.BaseGraphic({x: 10});
    iLayer.addGraphic('foo', iGraphic);
    iLayer.depth = 0;

    scene.addLayer('plop', {
      depth: 0,
      graphics: {
        foo: {
          type: 'base',
          options: {
            x: 10
          }
        }
      }
    });

    expect(scene.getLayer('plop')).toEqual(iLayer);
    expect(scene.getGraphic('plop:foo')).toEqual(iGraphic);
  });

  it('should use a layer factory to build layer', function () {
    var scene = new kitten.BaseScene();
    var factory = new kitten.factory.LayerFactory();

    scene.layerFactory = factory;

    factory.create = jasmine.createSpy('create');

    scene.addLayer('foo', {
      plop: 'foo'
    });

    expect(factory.create).toHaveBeenCalledWith({
      plop: 'foo'
    });
  });

  it('should stop', function() {
    var scene = new kitten.BaseScene();
    scene.addLayer('plop', {
      depth: 0,
      graphics: {
        foo: {
          type: 'base',
          options: {
            x: 10
          }
        }
      }
    });

    expect(scene.layers.plop).toBeDefined();

    var clear = jasmine.createSpy('clear');
    scene.layers.plop.clear = clear;

    scene.acting = true;

    scene.stop();

    expect(clear).toHaveBeenCalled();

    expect(scene.layers).toEqual({});
  });

  it('should be possible to switch between scene', function() {
    var scene  = new kitten.BaseScene();
    var engine = new kitten.GameEngine('#game');

    scene.setUp(engine);

    engine.stop = jasmine.createSpy('stop');
    engine.start = jasmine.createSpy('start');

    scene.changeScene('other scene');

    expect(engine.stop).toHaveBeenCalled();
    expect(engine.start).toHaveBeenCalledWith('other scene');
  });

  it('should act and draw layers', function() {
    var engine = new kitten.GameEngine('#game');
    var scene  = new kitten.BaseScene();
    scene
      .addLayer('layer1', {
        depth: 0,
        graphics: {}
      })
      .addLayer('layer2', {
        depth: 0,
        graphics: {}
      })
      .addLayer('layer3', {
        depth: 1,
        graphics: {}
      })
    ;
    scene.setUp(engine);
    var layers = scene.layers;
    scene.act = jasmine.createSpy('act');

    for (var name in layers) {
      layers[name].draw = jasmine.createSpy('draw_' + name);
      layers[name].setUp = jasmine.createSpy('setUp_' + name);
    }

    scene.update();

    expect(scene.act).toHaveBeenCalled();
    expect(scene.orderedLayers).toEqual([
        [layers.layer1, layers.layer2],
        [layers.layer3]
    ]);

    for (i in layers) {
      expect(layers[i].draw).toHaveBeenCalled();
      expect(layers[i].setUp).toHaveBeenCalled();
      layers[i].setUp = jasmine.createSpy('new_setUp_' + name);
    }

    scene.update();

    for (i in layers) {
      expect(layers[i].setUp).not.toHaveBeenCalled();
    }
  });

  it('should can be load', function() {
    var engine = new kitten.GameEngine('#game');
    var scene = new kitten.BaseScene();

    expect(scene.load).toBeDefined();

    scene.addLayer('layer', {});

    scene.getLayer('layer').isReady = function () {
      return false;
    };

    scene.load = jasmine.createSpy('load');
    scene.act = jasmine.createSpy('act');

    scene.setUp(engine);

    scene.update();

    expect(scene.load).toHaveBeenCalled();

    scene.getLayer('layer').isReady = function () {
      return true;
    };
    scene.load = jasmine.createSpy('load');

    scene.update();

    expect(scene.act).toHaveBeenCalled();
    expect(scene.load).not.toHaveBeenCalled();
  });
});
