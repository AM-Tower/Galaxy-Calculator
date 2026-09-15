#!/usr/bin/env node
/* ****************************************************************************
 * make-html.js
 * Turns the project's Markdown into HTML pages, in the style of the site.
 *
 * A browser cannot render Markdown. Firefox and Chrome both show a .md file as
 * plain text, so a link straight to ACCURACY.md gives a reader a wall of pipe
 * characters instead of a table. ACCURACY.md stays, because that is the file
 * GitHub renders; this script makes the page a browser can read.
 *
 *   node make-accuracy.js
 *
 * ACCURACY.md is the source. Do not edit ACCURACY.html by hand: it is
 * overwritten every time this runs, and run-tests.js checks the two are in
 * step so they cannot drift apart unnoticed.
 *
 * Written for the Galaxy Calculator, Jeffrey Scott Flesher
 * *************************************************************************** */
'use strict';

const fs = require('fs');
const path = require('path');

const here = __dirname;
/* Every page this builds. A source that is not on disk is skipped, so a fresh
 * clone without the local-only notes builds what it has and says nothing.
 *
 *   tracked  ACCURACY.md is in git and so is its page; GitHub renders the
 *            Markdown, a browser reads the HTML, and run-tests.js keeps the
 *            two in step.
 *   local    NOTES.md is gitignored working material. Its page is built for
 *            reading on this machine and goes no further. */
const DOCS = [
    { source: 'ACCURACY.md', target: 'ACCURACY.html', tracked: true },
    { source: 'NOTES.md',    target: 'NOTES.html',    tracked: false }
];

/* Text becomes HTML text: the three characters that would otherwise be read
 * as markup are escaped first, then the inline Markdown is turned into tags. */
function inline(text) {
    let s = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    s = s.replace(/`([^`]+)`/g, '<span class="text_code">$1</span>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    s = s.replace(/(^|[^*])\*([^*]+)\*/g, '$1<i>$2</i>');
    /* Links carry the site's font class and open in their own tab, which is
     * what the rest of the pages do. */
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
        '<a class="medium-font" href="$2" target="_blank">$1</a>');
    return s;
}

/* A Markdown table is a header row, an alignment row of dashes, then the body.
 * The site's tables carry the ridge borders and striped rows, so this builds
 * the same markup the hand written pages use. */
function table(rows) {
    const cells = (line) => line.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
    const head = cells(rows[0]);
    const body = rows.slice(2);
    let html = '        <div class="tableContainer">\n';
    html += '            <table class="ridge">\n';
    html += '                <thead class="ridge">\n                    <tr class="ridge">\n';
    for (const h of head) {
        html += '                        <th class="medium-font ridge">' + inline(h) + '</th>\n';
    }
    html += '                    </tr>\n                </thead>\n';
    html += '                <tbody class="medium-font">\n';
    body.forEach((line, i) => {
        html += '                    <tr class="ridge ' + (i % 2 === 0 ? 'oddRow' : 'evenRow') + '">\n';
        for (const c of cells(line)) {
            html += '                        <td class="ridge">' + inline(c) + '</td>\n';
        }
        html += '                    </tr>\n';
    });
    html += '                </tbody>\n            </table>\n        </div>\n\n';
    return html;
}

/* A run of list items becomes one list. Bullets and numbers are told apart by
 * the marker, and the content of each item goes through inline() like any
 * other text. */
function list(items, ordered) {
    const tag = ordered ? 'ol' : 'ul';
    let html = '        <' + tag + ' class="medium-font">\n';
    for (const item of items) {
        html += '            <li>' + inline(item) + '</li>\n';
    }
    return html + '        </' + tag + '>\n\n';
}

/* Code is the one place the text must survive exactly as written, so it is
 * escaped and nothing else is done to it -- no bold, no links, no code spans. */
function codeBlock(lines) {
    const escaped = lines.map((l) => l
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')).join('\n');
    return '        <pre class="medium-font"><code>' + escaped + '</code></pre>\n\n';
}

function convert(markdown) {
    const lines = markdown.split('\n');
    let out = '';
    let paragraph = [];

    const flush = () => {
        if (paragraph.length === 0) { return; }
        out += '        <p class="medium-font">\n            ' +
            paragraph.map(inline).join(' <br />\n            ') + '\n        </p>\n\n';
        paragraph = [];
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.trim() === '') { flush(); continue; }

        if (/^---+$/.test(line.trim())) { flush(); out += '        <hr />\n\n'; continue; }

        const heading = line.match(/^(#{1,4})\s+(.*)$/);
        if (heading) {
            flush();
            const level = heading[1].length + 1;   // # is the page title, so ## becomes h2
            out += '        <h' + level + '>' + inline(heading[2]) + '</h' + level + '>\n\n';
            continue;
        }

        /* Fenced code. Everything up to the closing fence is taken verbatim. */
        if (line.trim().startsWith('```')) {
            flush();
            const code = [];
            i = i + 1;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                code.push(lines[i]);
                i = i + 1;
            }
            out += codeBlock(code);
            continue;
        }

        /* Indented code. Four spaces, and only when it is not a list item that
         * happens to be indented. */
        if (/^ {4}\S/.test(line) && !/^ {4}[-*+\d]/.test(line)) {
            flush();
            const code = [];
            while (i < lines.length && (/^ {4}/.test(lines[i]) || lines[i].trim() === '')) {
                if (lines[i].trim() === '' &&
                        !(i + 1 < lines.length && /^ {4}\S/.test(lines[i + 1]))) {
                    break;
                }
                code.push(lines[i].replace(/^ {4}/, ''));
                i = i + 1;
            }
            i = i - 1;
            out += codeBlock(code);
            continue;
        }

        /* Block quotes. A run of "> " lines is one quote; the markers come off
         * and what is left goes through as ordinary text. */
        if (line.trim().startsWith('>')) {
            flush();
            const quoted = [];
            while (i < lines.length && lines[i].trim().startsWith('>')) {
                quoted.push(lines[i].replace(/^\s*>\s?/, ''));
                i = i + 1;
            }
            i = i - 1;
            out += '        <blockquote class="medium-font">\n            ' +
                quoted.filter((q) => q.trim() !== '').map(inline).join(' <br />\n            ') +
                '\n        </blockquote>\n\n';
            continue;
        }

        /* Lists. A run of items at the same kind of marker is one list. */
        const bullet = line.match(/^\s*[-*+]\s+(.*)$/);
        const numbered = line.match(/^\s*\d+\.\s+(.*)$/);
        if (bullet || numbered) {
            flush();
            const ordered = Boolean(numbered);
            const items = [];
            while (i < lines.length) {
                const b = lines[i].match(/^\s*[-*+]\s+(.*)$/);
                const n = lines[i].match(/^\s*\d+\.\s+(.*)$/);
                if (b && !ordered) { items.push(b[1]); }
                else if (n && ordered) { items.push(n[1]); }
                else if (/^\s+\S/.test(lines[i]) && items.length > 0) {
                    /* a wrapped continuation line belongs to the item above */
                    items[items.length - 1] += ' ' + lines[i].trim();
                } else { break; }
                i = i + 1;
            }
            i = i - 1;
            out += list(items, ordered);
            continue;
        }

        if (line.trim().startsWith('|')) {
            flush();
            const rows = [];
            while (i < lines.length && lines[i].trim().startsWith('|')) {
                rows.push(lines[i].trim());
                i = i + 1;
            }
            i = i - 1;
            out += table(rows);
            continue;
        }

        paragraph.push(line.trim());
    }
    flush();
    return out;
}

function build(doc) {
const markdown = fs.readFileSync(path.join(here, doc.source), 'utf8');
const title = (markdown.match(/^#\s+(.*)$/m) || [null, 'Accuracy'])[1];
const body = convert(markdown.replace(/^#\s+.*$/m, ''));

return `<!DOCTYPE html>
<html lang="en">
<head>
    <title>${title} - Galaxy Calculator</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="author" content="Jeffrey Scott Flesher" />
    <meta name="description" content="Author: Jeffrey Scott Flesher, every value the Galaxy Calculator uses measured against the current published figure" />
    <meta name="keywords" content="Accuracy,Galaxy Calculator,Trinary,Measurement,Jeffrey Scott Flesher" />
    <link rel="shortcut icon" type="image/ico" href="favicon.ico" />
    <link rel="stylesheet" href="pico.min.css" />
    <link rel="stylesheet" href="galaxy.css" />
</head>
<body>
    <!-- Generated from ACCURACY.md by make-accuracy.js. Do not edit by hand. -->

    <h1>${title}</h1>

    <div class="container">
${body}        <hr />

        <p class="medium-font">
            <a class="medium-font" href="index.html" target="_blank">Back to the Galaxy Calculator</a>
        </p>
    </div>
</body>
</html>
`;

}

module.exports = { build: build, docs: DOCS, here: here };

/* Only write when run directly, so run-tests.js can require this and compare
 * what the page should be against what is on disk. */
if (require.main === module) {
    for (const doc of DOCS) {
        if (!fs.existsSync(path.join(here, doc.source))) {
            console.log(doc.source + ' is not here, skipping ' + doc.target);
            continue;
        }
        const page = build(doc);
        fs.writeFileSync(path.join(here, doc.target), page);
        console.log(doc.target + ' written from ' + doc.source + ', ' +
            page.split('\n').length + ' lines' + (doc.tracked ? '' : ' (local only)'));
    }
}
