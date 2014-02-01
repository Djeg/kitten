describe('A layer factory', function() {
  it('should create layer', function() {
    var factory = new kitten.factory.LayerFactory();
    var layer = new kitten.Layer();
    layer.depth = 2;
    var iLayer = factory.create({
      'depth': 2
    });

    expect(iLayer).toEqual(layer);
  });

  it('should create layer and graphics', function() {
    var factory = new kitten.factory.LayerFactory();
    var g1      = new kitten.graphic.BaseGraphic();
    var g2      = new kitten.graphic.BaseGraphic({x: 0});
    var iLayer  = factory.create({
      'depth': 2,
      'graphics': {
        'foo': new kitten.graphic.BaseGraphic(),
        'bar': {
          type: 'base',
          options: {
            x: 0
          }
        }
      }
    });

    expect(iLayer.getGraphic('foo')).toEqual(g1);
    expect(iLayer.getGraphic('bar')).toEqual(g2);
  });
});
