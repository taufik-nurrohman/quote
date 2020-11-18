Quote Utility
=============

Convert double quote to single quote in string and vice-versa.

Usage
-----

### Browser

~~~ html
<script src="./@taufik-nurrohman/quote/index.js"></script>
<script>
console.log(toggleQuote(`foo "bar" baz 'qux'`));
</script>
~~~

### Browser Module

~~~ html
<script type="module">
import {toggleQuote} from './@taufik-nurrohman/quote/index.mjs';

console.log(toggleQuote(`foo "bar" baz 'qux'`));
</script>
~~~

### CommonJS Module

~~~ js
const {toggleQuote} = require('@taufik-nurrohman/quote');

console.log(toggleQuote(`foo "bar" baz 'qux'`));
~~~

### ECMAScript Module

~~~ js
import {toggleQuote} from '@taufik-nurrohman/quote';

console.log(toggleQuote(`foo "bar" baz 'qux'`));
~~~

Methods
-------

### doubleQuote(string)

Convert single quotes to double quotes.

~~~ js
import {doubleQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(doubleQuote(test));
~~~

### noQuote(string)

Remove quotes in string.

~~~ js
import {noQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(noQuote(test));
~~~

### singleQuote(string)

Convert double quotes to single quotes.

~~~ js
import {singleQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(singleQuote(test));
~~~

### toggleQuote(string)

Toggle quotes. Convert single quotes to double quotes, double quotes to single quotes.

~~~ js
import {toggleQuote} from '@taufik-nurrohman/quote';

let test = `foo "bar" baz 'qux'`;

console.log(toggleQuote(test));
~~~

### HTML.doubleQuote(string)

Force HTML attribute&rsquo;s quote to double quote.

~~~ js
import {HTML} from '@taufik-nurrohman/quote';

let test = `
<foo bar="baz">
<foo bar='baz'>
`;

console.log(HTML.doubleQuote(test));
~~~

### HTML.noQuote(string)

Remove quotes in HTML attribute&rsquo;s value where possible.

~~~ js
import {HTML} from '@taufik-nurrohman/quote';

let test = `
<aaa bbb="ccc">
<aaa bbb=ccc>
<aaa bbb="0ccc">
<aaa bbb="ccc ccc">
<aaa bbb="">
`;

console.log(HTML.noQuote(test));
~~~

### HTML.singleQuote(string)

Force HTML attribute&rsquo;s quote to single quote.

~~~ js
import {HTML} from '@taufik-nurrohman/quote';

let test = `
<foo bar="baz">
<foo bar='baz'>
`;

console.log(HTML.singleQuote(test));
~~~

### JSON.noQuote(string)

Remove quotes in JSON keys.

~~~ js
import {JSON, singleQuote} from '@taufik-nurrohman/quote';

let test = `{"foo": "bar"}`;

console.log(singleQuote(JSON.noQuote(test)));
~~~

### SGML.doubleQuote(string)

~~~ js
import {SGML} from '@taufik-nurrohman/quote';

let test = `<foo bar='baz'>`;

console.log(SGML.doubleQuote(test));
~~~

### SGML.noQuote(string)

Remove quotes in SGML attribute&rsquo;s value where possible.

~~~ js
import {SGML} from '@taufik-nurrohman/quote';

let test = `<foo bar="baz">`;

console.log(SGML.noQuote(test));
~~~


### SGML.singleQuote(string)

~~~ js
import {SGML} from '@taufik-nurrohman/quote';

let test = `<foo bar="baz">`;

console.log(SGML.singleQuote(test));
~~~

### XML.doubleQuote(string)

~~~ js
import {XML} from '@taufik-nurrohman/quote';

let test = `<foo bar='baz'>`;

console.log(XML.doubleQuote(test));
~~~

### XML.singleQuote(string)

~~~ js
import {XML} from '@taufik-nurrohman/quote';

let test = `<foo bar="baz">`;

console.log(XML.singleQuote(test));
~~~
