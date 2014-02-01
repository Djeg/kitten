describe('A basic graphic', function() {
    it('It should contains options and context and be enabled', function() {
        var graphic = new kitten.graphic.BaseGraphic({
          foo: 'foo',
          bar: 'bar'
        });

        expect(graphic.foo).toEqual('foo');
        expect(graphic.bar).toEqual('bar');
        expect(graphic.context).toBeDefined();
        expect(graphic.enabled).toBe(true);
    });

    it('should contain a game context', function() {
      var engine = new kitten.GameEngine('#game');
      var graphic = new kitten.graphic.BaseGraphic();
      var f = function () {
        graphic.setUp('plop ?');
      };

      expect(f).toThrow();

      graphic.setUp(engine);

      expect(graphic.context).toBe(engine.context);
    });

    it('should have a draw method', function() {
      var graphic = new kitten.graphic.BaseGraphic();
      var f       = function () { graphic.draw(); };

      expect(graphic.draw).toBeDefined();
      expect(f).toThrow();
    });
});
