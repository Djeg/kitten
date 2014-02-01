'use strict';

describe('Kiten error', function() {
  it('should return a formated error string', function() {
    var e = kitten.Error('Foo ?');

    expect(e).toMatch('Kitten has some troubles: Foo ?');
  });

  it('should interpret arguments and replace it', function() {
    var e = kitten.Error('Foo %s, bar %s', 'test', 'plop');

    expect(e).toMatch('Kitten has some troubles: Foo test, bar plop');
  });
});
