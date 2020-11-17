const test = require('ava');
const {doubleQuote, singleQuote, HTML} = require('./index.js');

test('common', t => {
    t.is(doubleQuote("'foo'"), '"foo"');
    t.is(singleQuote('"foo"'), "'foo'");
});

test('HTML', t => {
    t.is(HTML.doubleQuote("<span class='foo'>foo</span>"), '<span class="foo">foo</span>');
    t.is(HTML.singleQuote('<span class="foo">foo</span>'), "<span class='foo'>foo</span>");
});
