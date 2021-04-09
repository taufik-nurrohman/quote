Quote Utility
=============

Convert double quote to single quote in string and vice-versa.

Usage
-----

### CommonJS

~~~ js
const {toggleQuote} = require('@taufik-nurrohman/quote');

console.log(toggleQuote(`foo "bar" baz 'qux'`));
~~~

### ECMAScript

~~~ js
import {toggleQuote} from '@taufik-nurrohman/quote';

console.log(toggleQuote(`foo "bar" baz 'qux'`));
~~~

Methods
-------

### doubleQuote(string)

Convert single quotes to double quotes.

~~~ js
let test = `foo "bar" baz 'qux'`;

console.log(doubleQuote(test));
~~~

### noQuote(string)

Remove quotes in string.

~~~ js
let test = `foo "bar" baz 'qux'`;

console.log(noQuote(test));
~~~

### singleQuote(string)

Convert double quotes to single quotes.

~~~ js
let test = `foo "bar" baz 'qux'`;

console.log(singleQuote(test));
~~~

### toggleQuote(string)

Toggle quotes. Convert single quotes to double quotes, double quotes to single quotes.

~~~ js
let test = `foo "bar" baz 'qux'`;

console.log(toggleQuote(test));
~~~

### HTML.doubleQuote(string)

Force HTML attribute&rsquo;s quote to double quote.

~~~ js
let test = `
<foo bar="baz">
<foo bar='baz'>
`;

console.log(HTML.doubleQuote(test));
~~~

### HTML.noQuote(string)

Remove quotes in HTML attribute&rsquo;s value where possible.

~~~ js
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
let test = `
<foo bar="baz">
<foo bar='baz'>
`;

console.log(HTML.singleQuote(test));
~~~

### JSON.noQuote(string)

Remove quotes in JSON keys.

~~~ js
let test = `{"foo": "bar"}`;

console.log(singleQuote(JSON.noQuote(test)));
~~~

### SGML.doubleQuote(string)

~~~ js
let test = `<foo bar='baz'>`;

console.log(SGML.doubleQuote(test));
~~~

### SGML.noQuote(string)

Remove quotes in SGML attribute&rsquo;s value where possible.

~~~ js
let test = `<foo bar="baz">`;

console.log(SGML.noQuote(test));
~~~

### SGML.singleQuote(string)

~~~ js
let test = `<foo bar="baz">`;

console.log(SGML.singleQuote(test));
~~~

### XML.doubleQuote(string)

~~~ js
let test = `<foo bar='baz'>`;

console.log(XML.doubleQuote(test));
~~~

### XML.singleQuote(string)

~~~ js
let test = `<foo bar="baz">`;

console.log(XML.singleQuote(test));
~~~
