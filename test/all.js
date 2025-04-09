/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

try { require('usnam-pmb'); } catch (ignore) {}

var assert = require('equal-pmb');

require('./usage.js')(assert);
require('./oauth2.js')(assert);



console.log("+OK all tests passed.");   //= "+OK all tests passed."
