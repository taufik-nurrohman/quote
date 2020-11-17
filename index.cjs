// This file is in sync with `index.mjs` file. If you want to add/remove
// something here, make sure to do it in the `index.mjs` file first.
($$ => {
    const doubleQuote = str => str.replace(/'/g, '"');
    const noQuote = str => str.replace(/['"]/g, "");
    const singleQuote = str => str.replace(/"/g, "'");
    const toggleQuote = str => str.replace(/['"]/g, m0 => '"' === m0 ? "'" : '"');
    function e(str, flags) {
        return new RegExp(str, flags ?? 'g');
    }
    const STRING_DOUBLE = `(")((?:\\\\.|[^"])*)(")`;
    const STRING_SINGLE = `(')((?:\\\\.|[^'])*)(')`;
    const STRING_BOTH = '(?:' + STRING_DOUBLE + '|' + STRING_SINGLE + ')';
    const OBJECT_KEY = '[a-zA-Z_$][\\w]*';
    const JSON = {
        noQuote: str => {
            let test = str.trim();
            if (
                '{' === test.slice(0, 1) && '}' === test.slice(-1) ||
                '[' === test.slice(0, 1) && ']' === test.slice(-1)
            ) {
                return str.replace(e('([{,]\\s*)("' + OBJECT_KEY + '")(\\s*:)'), (m0, m1, m2, m3) => {
                    return m1 + noQuote(m2) + m3;
                });
            }
            return str;
        }
    };
    const SGML_COMMENT_REGEX = '<!--[\\s\\S]*?-->';
    const SGML_TAG_REGEX = '<(?:' + STRING_BOTH + '|[^>])+>';
    const XML_TO_IGNORE = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';
    function convertNodes(str, quote, nodesToSkip) {
        let nodesToSkipRegex = nodesToSkip && nodesToSkip.map(
            nodeToSkip => '(<' + nodeToSkip + '(?:\\s(?:' + STRING_BOTH + '|[^>])*)?>)([\\s\\S]*?)(<\\/' + nodeToSkip + '>)'
        ).join('|');
        let nodes = SGML_COMMENT_REGEX + '|' + XML_TO_IGNORE;
        nodes += nodesToSkipRegex ? '|' + nodesToSkipRegex : "";
        nodes += '|' + SGML_TAG_REGEX;
        return str.replace(e(nodes), node => {
            if ('<!--' === node.slice(0, 4) && '-->' === node.slice(-3)) {
                return node;
            }
            if ('<![CDATA[' === node.slice(0, 9) && ']]>' === node.slice(-3)) {
                return node;
            }
            if (nodesToSkipRegex && e('^(' + nodesToSkipRegex + ')$').test(node)) {
                let nodeStart = e('^<(' + nodesToSkip.join('|') + ')(\\s(' + STRING_BOTH + '|[^>])*)?>');
                return node.replace(nodeStart, m0 => convertNodes(m0, quote));
            }
            return node.replace(e('=' + STRING_BOTH), m0 => {
                if ('=' + quote === m0.slice(0, 2)) {
                    return m0;
                }
                return m0.replace(e('"' === quote ? STRING_SINGLE : STRING_DOUBLE), (n0, n1, n2, n3) => {
                    return quote + toggleQuote(n2 || "") + quote;
                });
            });
        });
    }
    $$.doubleQuote = doubleQuote;
    $$.noQuote = noQuote;
    $$.singleQuote = singleQuote;
    $$.toggleQuote = toggleQuote;
    $$.HTML = {
        doubleQuote: str => convertNodes(str, '"', ['script', 'style', 'textarea']),
        noQuote: str => {}, // TODO
        singleQuote: str => convertNodes(str, "'", ['script', 'style', 'textarea'])
    };
    $$.SGML = {
        doubleQuote: str => convertNodes(str, '"'),
        noQuote: str => {}, // TODO
        singleQuote: str => convertNodes(str, "'")
    };
    $$.XML = {
        doubleQuote: str => convertNodes(str, '"'),
        singleQuote: str => convertNodes(str, "'")
    };
})(exports || window || {});
