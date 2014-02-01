describe('A graphic factory', function() {
  it('should create a graphic with a given configuration', function() {
    var factory = new kitten.factory.GraphicFactory();
    var graphic = new kitten.graphic.BaseGraphic({x: 10});
    var iGraphic = factory.create({
      type:'base',
      options: {
        x: 10
      }
    });

    expect(iGraphic).toEqual(graphic);
  });
});
