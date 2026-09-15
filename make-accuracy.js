#!/usr/bin/env node
/* ****************************************************************************
 * make-accuracy.js
 * Turns ACCURACY.md into ACCURACY.html, in the style of the rest of the site.
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
const SOURCE = path.join(here, 'ACCURACY.md');
const TARGET = path.join(here, 'ACCURACY.html');

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

function build() {
const markdown = fs.readFileSync(SOURCE, 'utf8');
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

module.exports = { build: build, TARGET: TARGET };

/* Only write when run directly, so run-tests.js can require this and compare
 * what the page should be against what is on disk. */
if (require.main === module) {
    const page = build();
    fs.writeFileSync(TARGET, page);
    console.log('ACCURACY.html written from ACCURACY.md, ' + page.split('\n').length + ' lines');
}
