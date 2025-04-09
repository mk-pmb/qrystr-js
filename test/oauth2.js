/* -*- coding: UTF-8, tab-width: 2 -*- */
/*jslint indent: 2, maxlen: 80, browser: true */
(function namespace() {
  'use strict';
  var EX = function oauth2demo(assert) {
    var cl = console.log.bind(console), qrystr = require('qrystr'),
      loca = ((typeof location === 'object') && location);

    cl('');
    cl('OAuth2 demo');
    cl('===========');

    function test(input, expect) {
      cl('Input URL hash: ' + JSON.stringify(input));
      var r = qrystr(input, { sepRx: /&/ });
      r = JSON.stringify(r, null, 2).replace(/\n\s*/g, ' ');
      cl('     -> result: ' + r);
      if (expect) { assert.strictEqual(r, expect); }
    }

    cl('Example redirect URL hashes from chapter 3 of <'
      + 'https://web.archive.org/web/20250406/'
      + 'https://developers.google.com/identity/protocols/oauth2/'
      + 'javascript-implicit-flow>:');
    test('#access_token=4/P7q7W91&token;_type=Bearer&expires;_in=3600',
      '{ "access_token": "4/P7q7W91", "token;_type": "Bearer",'
      + ' "expires;_in": "3600" }');
    test('#error=access_denied', '{ "error": "access_denied" }');

    cl('Current document location:');
    test(loca ? loca.hash : '#error=not_running_in_a_browser');
    cl('');

    cl('+OK oauth2 demo passed.');
  };


















  (function unifiedExport(e) {
    /*global define: true */
    var d = ((typeof define === 'function') && define),
      m = ((typeof module === 'object') && module);
    if (d && d.amd) { d(function f() { return e; }); }
    if (m && m.exports) { m.exports = e; }
  }(EX));
}());
