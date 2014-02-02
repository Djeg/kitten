describe('A keyboard', function() {
  it('should contains pressed key', function() {
    var keys = new kitten.Keyboard();

    keys.doPress(kitten.Keyboard.ENTER);

    expect(keys.pressed[kitten.Keyboard.ENTER]).toBe(true);
  });

  it('should detect pressed keys', function() {
    var key = new kitten.Keyboard();

    key.doPress(kitten.Keyboard.ENTER);

    expect(key.isPressed(kitten.Keyboard.ENTER)).toBe(true);
  });

  it('should detect pushed keys', function() {
    var key = new kitten.Keyboard();

    key.doPress(kitten.Keyboard.SPACE);

    expect(key.isPushed(kitten.Keyboard.SPACE)).toBe(true);
    expect(key.isPushed(kitten.Keyboard.SPACE)).toBe(false);
  });
});
