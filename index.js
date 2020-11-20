// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const doubleQuote = str => str.replace(/'/g, '"');
    const noQuote = str => str.replace(/(\\['"])|['"]/g, '$1');
    const singleQuote = str => str.replace(/"/g, "'");
    const toggleQuote = str => str.replace(/['"]/g, m0 => '"' === m0 ? "'" : '"');
    function e(pattern, opt) {
        return new RegExp(pattern, 'undefined' !== typeof opt ? opt : 'g');
    }
    const SAFE_JS_KEY = '[a-zA-Z_$][\\w$]*';
    const SAFE_SGML_VALUE = '[a-zA-Z_][\\w-]*';
    const STRING_DOUBLE = `(")((?:\\\\.|[^"])*)(")`;
    const STRING_SINGLE = `(')((?:\\\\.|[^'])*)(')`;
    const STRING_BOTH = '(?:' + STRING_DOUBLE + '|' + STRING_SINGLE + ')';
    const SGML_COMMENT_REGEX = '<!--[\\s\\S]*?-->';
    const SGML_TAG_REGEX = '<(?:' + STRING_BOTH + '|[^>])+>';
    const XML_TO_IGNORE = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';
    function convertNode(str, then, nodesToSkip) {
        let nodes = SGML_COMMENT_REGEX + '|' + XML_TO_IGNORE;
        let nodesToSkipRegex = nodesToSkip && nodesToSkip.map(
            nodeToSkip => '<' + nodeToSkip + '(?:\\s(?:' + STRING_BOTH + '|[^>])*?)?(?:\\/>|>[\\s\\S]*?<\\/' + nodeToSkip + '>)'
        ).join('|');
        nodes += nodesToSkipRegex ? '|' + nodesToSkipRegex : "";
        nodes += '|' + SGML_TAG_REGEX; // Capture any SGML tag last!
        return str.replace(e(nodes), node => {
            if ('<!--' === node.slice(0, 4) && '-->' === node.slice(-3)) {
                return node;
            }
            if ('<![CDATA[' === node.slice(0, 9) && ']]>' === node.slice(-3)) {
                return node;
            }
            if (nodesToSkipRegex && e('^(' + nodesToSkipRegex + ')$').test(node)) {
                let nodeStart = e('^<(' + nodesToSkip.join('|') + ')(\\s(' + STRING_BOTH + '|[^>])*)?>');
                return node.replace(nodeStart, m0 => then(m0));
            }
            return then(node);
        });
    }
    function convertNodeQuotes(str, quote, nodesToSkip) {
        return convertNode(str, node => {
            return node.replace(e('=' + STRING_BOTH), m0 => {
                if ('=' + quote === m0.slice(0, 2)) {
                    return m0; // Skip!
                }
                return m0.replace(e('"' === quote ? STRING_SINGLE : STRING_DOUBLE), (n0, n1, n2, n3) => {
                    return quote + toggleQuote(n2 || "") + quote;
                });
            });
        }, nodesToSkip);
    }
    function convertNodeNoQuotes(str, nodesToSkip) {
        return convertNode(str, node => node.replace(e('=([\'"])(' + SAFE_SGML_VALUE + '|)\\1'), '=$2'), nodesToSkip);
    }
    $$.doubleQuote = doubleQuote;
    $$.noQuote = noQuote;
    $$.singleQuote = singleQuote;
    $$.toggleQuote = toggleQuote;
    $$.HTML = {
        doubleQuote: str => convertNodeQuotes(str, '"', ['script', 'style', 'textarea']),
        noQuote: str => convertNodeNoQuotes(str, ['script', 'style', 'textarea']),
        singleQuote: str => convertNodeQuotes(str, "'", ['script', 'style', 'textarea'])
    };
    $$.JSON = {
        noQuote: str => {
            let test = str.trim();
            if (
                '{' === test.slice(0, 1) && '}' === test.slice(-1) ||
                '[' === test.slice(0, 1) && ']' === test.slice(-1)
            ) {
                return str.replace(e('([{,]\\s*)("' + SAFE_JS_KEY + '")(\\s*:)'), (m0, m1, m2, m3) => {
                    return m1 + noQuote(m2) + m3;
                });
            }
            return str;
        }
    };
    $$.SGML = {
        doubleQuote: str => convertNodeQuotes(str, '"'),
        noQuote: str => convertNodeNoQuotes(str),
        singleQuote: str => convertNodeQuotes(str, "'")
    };
    $$.XML = {
        doubleQuote: str => convertNodeQuotes(str, '"'),
        singleQuote: str => convertNodeQuotes(str, "'")
    };
})(exports || window || {});
