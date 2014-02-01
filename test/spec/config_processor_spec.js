describe('The ConfigProcessor', function() {
  it('should contains configuration', function() {
    var configProcessesor = new kitten.ConfigProcessor({
      'foo' : 'plop ?',
      'bar': 'plop ?'
    });

    expect(configProcessesor.raw).toEqual({
      foo: 'plop ?',
      bar: 'plop ?'
    });
  });

  it('should retrieve default configuration or null', function() {
    var config = new kitten.ConfigProcessor({
      key: 'value'
    });

    expect(config.get('FPS', 20)).toEqual(20);
    expect(config.get('foo')).toBeNull();
    expect(config.get('key', 'other value')).toEqual('value');
  });
});
