// Regular expression, because there is no DOM!
export const doubleQuote = str => str.replace(/'/g, '"');
export const noQuote = str => str.replace(/['"]/g, "");
export const singleQuote = str => str.replace(/"/g, "'");
export const toggleQuote = str => str.replace(/['"]/g, m0 => '"' === m0 ? "'" : '"');

function e(str, flags) {
    return new RegExp(str, flags ?? 'g');
}

const STRING_DOUBLE = `(")((?:\\\\.|[^"])*)(")`;
const STRING_SINGLE = `(')((?:\\\\.|[^'])*)(')`;
const STRING_BOTH = '(?:' + STRING_DOUBLE + '|' + STRING_SINGLE + ')';

const OBJECT_KEY = '[a-zA-Z_$][\\w]*';

export const JSON = {
    noQuote: str => {
        let test = str.trim();
        // Convert JSON array and object
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

// Capture string pattern first, to skip `<` and `>` character(s) that exist
// in SGML attribute’s value. Example: `<b:if cond='data:posts.size > 100'>`
const SGML_TAG_REGEX = '<(?:' + STRING_BOTH + '|[^>])+>';

// CDATA section should be ignored!
const XML_TO_IGNORE = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';

function convertNodes(str, quote, nodesToSkip) {
    let nodesToSkipRegex = nodesToSkip && nodesToSkip.map(
        nodeToSkip => '(<' + nodeToSkip + '(?:\\s(?:' + STRING_BOTH + '|[^>])*)?>)([\\s\\S]*?)(<\\/' + nodeToSkip + '>)'
    ).join('|');
    let nodes = SGML_COMMENT_REGEX + '|' + XML_TO_IGNORE;
    nodes += nodesToSkipRegex ? '|' + nodesToSkipRegex : "";
    nodes += '|' + SGML_TAG_REGEX; // Capture any SGML tag last!
    return str.replace(e(nodes), node => {
        // Skip comment node!
        if ('<!--' === node.slice(0, 4) && '-->' === node.slice(-3)) {
            return node;
        }
        // Skip CDATA section!
        if ('<![CDATA[' === node.slice(0, 9) && ']]>' === node.slice(-3)) {
            return node;
        }
        // Skip the excluded node contents, but convert its attribute(s) as well!
        if (nodesToSkipRegex && e('^(' + nodesToSkipRegex + ')$').test(node)) {
            let nodeStart = e('^<(' + nodesToSkip.join('|') + ')(\\s(' + STRING_BOTH + '|[^>])*)?>');
            return node.replace(nodeStart, m0 => convertNodes(m0, quote));
        }
        return node.replace(e('=' + STRING_BOTH), m0 => {
            if ('=' + quote === m0.slice(0, 2)) {
                return m0; // Skip!
            }
            return m0.replace(e('"' === quote ? STRING_SINGLE : STRING_DOUBLE), (n0, n1, n2, n3) => {
                return quote + toggleQuote(n2 || "") + quote;
            });
        });
    });
}

export const HTML = {
    doubleQuote: str => convertNodes(str, '"', ['script', 'style', 'textarea']),
    noQuote: str => {}, // TODO
    singleQuote: str => convertNodes(str, "'", ['script', 'style', 'textarea'])
};

export const SGML = {
    doubleQuote: str => convertNodes(str, '"'),
    noQuote: str => {}, // TODO
    singleQuote: str => convertNodes(str, "'")
};

export const XML = {
    doubleQuote: str => convertNodes(str, '"'),
    singleQuote: str => convertNodes(str, "'")
};
