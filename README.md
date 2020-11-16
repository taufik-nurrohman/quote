Quote Utility
=============

> Convert double quote to single quote in a string and vice-versa.

Usage
-----

~~~ .js
import {SGML} from 'quote';

let test = `
<foo bar="baz">
<foo bar='baz'>

<foo bar="baz 'qux'">
<foo bar='baz "qux"'>

"foo" bar
'foo' bar

"foo 'bar'" baz
'foo "bar"' baz
`;

console.log(SGML.doubleQuoteAttributes(test));
console.log(SGML.singleQuoteAttributes(test));
~~~

Methods
-------

### JSON.toObject(string)

Remove quotes in JSON keys.

**TODO**

### SGML.doubleQuoteAttributes(string)

Force HTML/SGML/XML attribute&rsquo;s quote to double quote.

**TODO**

### SGML.singleQuoteAttributes(string)

Force HTML/SGML/XML attribute&rsquo;s quote to single quote.

**TODO**

### toggleQuote(string)

Toggle quotes. Convert single quotes to double quotes, double quotes to single quotes.

**TODO**

### doubleQuote(string)

Convert single quotes to double quotes.

**TODO**

### singleQuote(string)

Convert double quotes to single quotes.

**TODO**
