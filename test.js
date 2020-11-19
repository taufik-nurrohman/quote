const test = require('ava');
const {
    doubleQuote,
    noQuote,
    singleQuote,
    toggleQuote,
    HTML,
    JSON,
    SGML,
    XML
} = require('./index.js');

test('doubleQuote', t => {
    t.is(doubleQuote(`aaa"`), `aaa"`);
    t.is(doubleQuote(`aaa'`), `aaa"`);
    t.is(doubleQuote(`aaa\\"`), `aaa\\"`);
    t.is(doubleQuote(`aaa\\'`), `aaa\\"`);
    t.is(doubleQuote(`'aaa"`), `"aaa"`);
});

test('noQuote', t => {
    t.is(noQuote(`aaa"`), `aaa`);
    t.is(noQuote(`aaa'`), `aaa`);
    t.is(noQuote(`aaa\\"`), `aaa\\"`);
    t.is(noQuote(`aaa\\'`), `aaa\\'`);
    t.is(noQuote(`'aaa"`), `aaa`);
});

test('singleQuote', t => {
    t.is(singleQuote(`aaa"`), `aaa'`);
    t.is(singleQuote(`aaa'`), `aaa'`);
    t.is(singleQuote(`aaa\\"`), `aaa\\'`);
    t.is(singleQuote(`aaa\\'`), `aaa\\'`);
    t.is(singleQuote(`'aaa"`), `'aaa'`);
});

test('toggleQuote', t => {
    t.is(toggleQuote(`foo "bar" baz 'qux'`), `foo 'bar' baz "qux"`);
    t.is(toggleQuote(`foo \\"bar" baz \\'qux'`), `foo \\'bar' baz \\"qux"`);
});

test('HTML.doubleQuote', t => {
    t.is(HTML.doubleQuote(`
<foo bar="baz">
<foo bar='baz'>

<foo bar="baz 'qux'">
<foo bar='baz "qux"'>

"foo" bar
'foo' bar

"foo 'bar'" baz
'foo "bar"' baz

<foo bar="baz > 0">
<foo bar="baz < 0">

<foo bar='baz > 0'>
<foo bar='baz < 0'>

<foo bar="'baz' + qux">
<foo bar='"baz" + qux'>

<foo bar="'baz=\\"qux\\"' + qux">
<foo bar='"baz=\\'qux\\'" + qux'>

<scr` + `ipt>
let node = "<foo bar='baz'>";
</scr` + `ipt>

<scr` + `ipt foo='bar > 0'>
let node = "<foo bar='baz'>";
</scr` + `ipt>
`), `
<foo bar="baz">
<foo bar="baz">

<foo bar="baz 'qux'">
<foo bar="baz 'qux'">

"foo" bar
'foo' bar

"foo 'bar'" baz
'foo "bar"' baz

<foo bar="baz > 0">
<foo bar="baz < 0">

<foo bar="baz > 0">
<foo bar="baz < 0">

<foo bar="'baz' + qux">
<foo bar="'baz' + qux">

<foo bar="'baz=\\"qux\\"' + qux">
<foo bar="'baz=\\"qux\\"' + qux">

<scr` + `ipt>
let node = "<foo bar='baz'>";
</scr` + `ipt>

<scr` + `ipt foo="bar > 0">
let node = "<foo bar='baz'>";
</scr` + `ipt>
`);
});

test('HTML.noQuote', t => {
    t.is(HTML.noQuote(`
<aaa bbb="ccc" ddd eee="fff">
<aaa bbb='ccc' ddd eee='fff'>
<aaa bbb=ccc ddd eee=fff>

<aaa bbb="0ccc" ddd eee="0fff">
<aaa bbb='0ccc' ddd eee='0fff'>

<aaa bbb="ccc ccc" ddd eee="fff fff">
<aaa bbb='ccc ccc' ddd eee='fff fff'>

<aaa bbb="" ccc ddd="">
<aaa bbb='' ccc ddd=''>
`), `
<aaa bbb=ccc ddd eee=fff>
<aaa bbb=ccc ddd eee=fff>
<aaa bbb=ccc ddd eee=fff>

<aaa bbb="0ccc" ddd eee="0fff">
<aaa bbb='0ccc' ddd eee='0fff'>

<aaa bbb="ccc ccc" ddd eee="fff fff">
<aaa bbb='ccc ccc' ddd eee='fff fff'>

<aaa bbb= ccc ddd=>
<aaa bbb= ccc ddd=>
`);
});

test('HTML.singleQuote', t => {
    t.is(HTML.singleQuote(`
<foo bar="baz">
<foo bar='baz'>

<foo bar="baz 'qux'">
<foo bar='baz "qux"'>

"foo" bar
'foo' bar

"foo 'bar'" baz
'foo "bar"' baz

<foo bar="baz > 0">
<foo bar="baz < 0">

<foo bar='baz > 0'>
<foo bar='baz < 0'>

<foo bar="'baz' + qux">
<foo bar='"baz" + qux'>

<foo bar="'baz=\\"qux\\"' + qux">
<foo bar='"baz=\\'qux\\'" + qux'>

<scr` + `ipt>
let node = '<foo bar="baz">';
</scr` + `ipt>

<scr` + `ipt foo="bar > 0">
let node = '<foo bar="baz">';
</scr` + `ipt>
`), `
<foo bar='baz'>
<foo bar='baz'>

<foo bar='baz "qux"'>
<foo bar='baz "qux"'>

"foo" bar
'foo' bar

"foo 'bar'" baz
'foo "bar"' baz

<foo bar='baz > 0'>
<foo bar='baz < 0'>

<foo bar='baz > 0'>
<foo bar='baz < 0'>

<foo bar='"baz" + qux'>
<foo bar='"baz" + qux'>

<foo bar='"baz=\\'qux\\'" + qux'>
<foo bar='"baz=\\'qux\\'" + qux'>

<scr` + `ipt>
let node = '<foo bar="baz">';
</scr` + `ipt>

<scr` + `ipt foo='bar > 0'>
let node = '<foo bar="baz">';
</scr` + `ipt>
`);
});

test('JSON.noQuote', t => {
    t.is(JSON.noQuote(`
{
  "foo": "bar",
  "bar": ["foo", "bar", {
    "$": 1,
    "0": 1,
    "a": 1,
    "_": 1,
    "$FooBar": 1,
    "0FooBar": 1,
    "aFooBar": 1,
    "_FooBar": 1
  }],
  "baz:qux": 1
}
`), `
{
  foo: "bar",
  bar: ["foo", "bar", {
    $: 1,
    "0": 1,
    a: 1,
    _: 1,
    $FooBar: 1,
    "0FooBar": 1,
    aFooBar: 1,
    _FooBar: 1
  }],
  "baz:qux": 1
}
`);
});

test('#5', t => {
    t.is(HTML.singleQuote(`
<head>
  <script src="theme.js"/>
</head>
<body class="home">
  <script>
  let foo = '<bar baz="qux">';
  </script>
  <div class="body">
    <main/>
  </div>
</body>
`), `
<head>
  <script src='theme.js'/>
</head>
<body class='home'>
  <script>
  let foo = '<bar baz="qux">';
  </script>
  <div class='body'>
    <main/>
  </div>
</body>
`);
});

// `SGML` and `XML` are mostly just alias for `HTML`
test.todo('SGML.doubleQuote');
test.todo('SGML.noQuote');
test.todo('SGML.singleQuote');
test.todo('XML.doubleQuote');
test.todo('XML.singleQuote');
