Quote Utility
=============

> Convert double quote to single quote in a string and vice-versa.

Usage
-----

### Browser

~~~ .html
<script type="module">
import {toggleQuote} from '@taufik-nurrohman/quote/index.mjs';

console.log(toggleQuote(`foo "bar" baz 'qux'`));
</script>
~~~

### Module

~~~ .js
import {toggleQuote} from '@taufik-nurrohman/quote';

console.log(toggleQuote(`foo "bar" baz 'qux'`));
~~~

Methods
-------

### doubleQuote(string)

Convert single quotes to double quotes.

~~~ .js
import {doubleQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(doubleQuote(test));
~~~

### noQuote(string)

Remove quotes in string.

~~~ .js
import {noQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(noQuote(test));
~~~

### singleQuote(string)

Convert double quotes to single quotes.

~~~ .js
import {singleQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(singleQuote(test));
~~~

### toggleQuote(string)

Toggle quotes. Convert single quotes to double quotes, double quotes to single quotes.

~~~ .js
import {toggleQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(toggleQuote(test));
~~~

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

<scr` + `ipt>
let node = '<foo bar="baz">';
</scr` + `ipt>

<scr` + `ipt foo="bar > 0">
let node = '<foo bar="baz">';
</scr` + `ipt>
`;

console.log(HTML.doubleQuote(test));
~~~

### HTML.noQuote(string)

Remove quotes in HTML attribute&rsquo;s value where possible.

**TODO**

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

<scr` + `ipt>
let node = "<foo bar='baz'>";
</scr` + `ipt>

<scr` + `ipt foo='bar > 0'>
let node = "<foo bar='baz'>";
</scr` + `ipt>
`;

console.log(HTML.singleQuote(test));
~~~

### JSON.noQuote(string)

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

console.log(singleQuote(JSON.noQuote(test)));
~~~

### SGML.doubleQuote(string)

~~~ .js
import {SGML} from '@taufik-nurrohman/quote';

let test = `<foo bar='baz'>`;

console.log(SGML.doubleQuote(test));
~~~

### SGML.noQuote(string)

Remove quotes in SGML attribute&rsquo;s value where possible.

**TODO**

### SGML.singleQuote(string)

~~~ .js
import {SGML} from '@taufik-nurrohman/quote';

let test = `<foo bar="baz">`;

console.log(SGML.singleQuote(test));
~~~

### XML.doubleQuote(string)

~~~ .js
import {XML} from '@taufik-nurrohman/quote';

let test = `<foo bar='baz'>`;

console.log(XML.doubleQuote(test));
~~~

### XML.singleQuote(string)

~~~ .js
import {XML} from '@taufik-nurrohman/quote';

let test = `<foo bar="baz">`;

console.log(XML.singleQuote(test));
~~~
