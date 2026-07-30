const test = require('node:test');
const assert = require('node:assert/strict');

const { resolveShareUrl } = require('../app/lib/share-url.js');

test('resolves relative fundraiser paths against the current origin', () => {
  assert.equal(
    resolveShareUrl('/f/my-fundraiser', 'https://pollacle.app'),
    'https://pollacle.app/f/my-fundraiser'
  );
});

test('preserves already absolute URLs', () => {
  const url = 'https://example.com/f/my-fundraiser';
  assert.equal(resolveShareUrl(url, 'https://pollacle.app'), url);
});
