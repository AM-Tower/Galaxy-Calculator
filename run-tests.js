#!/usr/bin/env node
/* ****************************************************************************
 * run-tests.js
 * Runs the Test Suite from the command line, so it can be checked without
 * opening a browser. The same test() and testGalaxy() that test.html runs.
 *
 *   node run-tests.js            quiet, just the result
 *   node run-tests.js --verbose  also show what the calculator logs
 *
 * Exits 0 when everything passes, 1 when anything fails, so update.bc.sh
 * and any build can act on it.
 */
'use strict';

const fs = require('fs');
const vm = require('vm');
const path = require('path');

const verbose = process.argv.indexOf('--verbose') > -1;
const here = __dirname;
const files = ['bignumber.js', 'bignumbermath.js', 'galaxycalculator.js'];

// The three files are written for a browser, where they share one global
// scope and no module system. A vm context gives them exactly that.
const quiet = function () {};
const sandbox = {
    console: {
        log: verbose ? console.log : quiet,
        debug: verbose ? console.log : quiet,
        error: console.error,
        warn: console.warn
    },
    Math: Math,
    parseInt: parseInt,
    parseFloat: parseFloat,
    isNaN: isNaN,
    isFinite: isFinite,
    Number: Number,
    String: String,
    Infinity: Infinity,
    Date: Date
};
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

for (const file of files) {
    const full = path.join(here, file);
    if (!fs.existsSync(full)) {
        console.error('run-tests.js: cannot find ' + file + ' next to this script');
        process.exit(1);
    }
    try {
        vm.runInContext(fs.readFileSync(full, 'utf8'), sandbox, { filename: file });
    } catch (e) {
        console.error('run-tests.js: ' + file + ' failed to load');
        console.error('  ' + e.message);
        process.exit(1);
    }
}

const version = (function () {
    const m = fs.readFileSync(path.join(here, 'bignumber.js'), 'utf8').match(/bignumber\.js v([\d.]+)/);
    return m ? m[1] : 'unknown';
})();

let results;
try {
    results = vm.runInContext('testAll()', sandbox);
} catch (e) {
    console.error('run-tests.js: the Test Suite itself threw');
    console.error('  ' + e.message);
    process.exit(1);
}

// ---------------------------------------------------------------------------
// Smart quotes in HTML tags. An editor set to curly quotes will silently turn
// class="ridge" into class=“ridge”, which the browser parses as an
// attribute value that includes the quote marks. Every class, id, src and
// onclick then stops matching, the stylesheet does nothing and the scripts do
// not load - and the page still looks half right, so it is easy to miss.
// This happened once. It is checked here so it cannot happen quietly again.
const smartQuoteFailures = [];
for (const name of fs.readdirSync(here)) {
    if (!name.endsWith('.html')) continue;
    const text = fs.readFileSync(path.join(here, name), 'utf8');
    let count = 0;
    for (const tag of text.match(/<[^<>]*>/g) || []) {
        for (const ch of tag) {
            if (ch === '\u201C' || ch === '\u201D') count = count + 1;
        }
    }
    if (count > 0) {
        smartQuoteFailures.push(name + ' has ' + count + ' smart quotes inside HTML tags');
    }
}

console.log('Galaxy Calculator Test Suite');
console.log('  bignumber.js v' + version);
console.log('  ' + results.passed + ' of ' + results.total + ' passed, ' + results.failed + ' failed');

if (smartQuoteFailures.length > 0) {
    console.log('');
    for (const failure of smartQuoteFailures) {
        console.log('  FAIL  ' + failure);
    }
}

if (results.failed > 0 || smartQuoteFailures.length > 0) {
    console.log('');
    for (const failure of results.failures) {
        console.log('  FAIL  ' + failure);
    }
    process.exit(1);
}
process.exit(0);
