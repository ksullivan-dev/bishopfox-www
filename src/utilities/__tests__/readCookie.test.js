import { readCookie } from 'utilities';

describe('ReadCookie tests', () => {
  test('gets cookies by name', () => {
    document.cookie = 'test_cookie=John Doe';
    document.cookie = 'another_test=Yep; path="/';
    expect(readCookie('test_cookie')).toBe('John Doe');
    expect(readCookie('fake_cookie')).toBe(null);
    expect(readCookie('another_test')).toBe('Yep');
  });
});
