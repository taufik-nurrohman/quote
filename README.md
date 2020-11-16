Quote Utility
=============

> Convert double quote to single quote in a string and vice-versa.

Methods
-------

### HTML.doubleQuote(string)

Force HTML attribute&rsquo;s quote to double quote.

~~~ .js
import {HTML} from '@taufik-nurrohman/quote';

let test = `
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

<script>
let node = '<foo bar="baz">';
</script>

<script foo="bar > 0">
let node = '<foo bar="baz">';
</script>
`;

console.log(HTML.doubleQuote(test));
~~~

### HTML.singleQuote(string)

Force HTML attribute&rsquo;s quote to single quote.

~~~ .js
import {HTML} from '@taufik-nurrohman/quote';

let test = `
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

<script>
let node = "<foo bar='baz'>";
</script>

<script foo='bar > 0'>
let node = "<foo bar='baz'>";
</script>
`;

console.log(HTML.singleQuote(test));
~~~

### JSON.toObject(string)

Remove quotes in JSON keys.

~~~ .js
import {JSON, singleQuote} from '@taufik-nurrohman/quote';

let test = `
{
    "foo": "bar",
    "baz:qux": 1,
    "bar": ["foo", "bar", {
        "$": 1,
        "0": 1,
        "a": 1,
        "_": 1,
        "$FooBar": 1,
        "0FooBar": 1,
        "aFooBar": 1,
        "_FooBar": 1,
    }]
}
`;

console.log(singleQuote(JSON.toObject(test)));
~~~

### SGML.doubleQuote(string)

~~~ .js
import {SGML} from '@taufik-nurrohman/quote';
~~~

### SGML.singleQuote(string)

### XML.doubleQuote(string)

### XML.singleQuote(string)

### toggleQuote(string)

Toggle quotes. Convert single quotes to double quotes, double quotes to single quotes.

~~~ .js
import {toggleQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(toggleQuote(test));
~~~

### doubleQuote(string)

Convert single quotes to double quotes.

~~~ .js
import {doubleQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(doubleQuote(test));
~~~

### singleQuote(string)

Convert double quotes to single quotes.

~~~ .js
import {singleQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(singleQuote(test));
~~~
