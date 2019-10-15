import { underscorer } from 'utilities';

describe('Underscorer tests', () => {
  test('returns a trimmed, lowercased string with whitespace characters replaced with underscores', () => {
    const normal = 'This is a String';
    const double = '2  spaces';
    const hanging = ' This has extra whitespace ';
    expect(underscorer(double)).toBe('2__spaces');
    expect(underscorer(normal)).toBe('this_is_a_string');
    expect(underscorer(hanging)).toBe('this_has_extra_whitespace');
  });
});
