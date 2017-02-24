/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function readmeDemo(assert) {
  if (!assert) { assert = require('assert'); }
  //#u
  var qs = require('qrystr'), eq = assert.deepStrictEqual, sym, x, y, u,
    opt, shebang = { prefix: '#!' };

  sym = function symmetricEqual(dict, qstr) {
    eq(qs(dict),            qstr);
    eq(qs.stringify(dict),  qstr);
    eq(qs(qstr),            dict);
    eq(qs.parse(qstr),      dict);
    eq(qs('?' + qstr),      dict);
    eq(qs('#' + qstr),      dict);
    eq(qs('#!' + qstr, shebang), dict);
  };

  sym({ bar: '42', eq: '=', flag: true, foo: '23' },
    'bar=42&eq=%3D&flag&foo=23');
  sym({ '@': [ 'Æ', ' ', '?', '&' ], foo: [ 'hi', true, 'cu' ] },
    '%40=%C3%86&%40=+&%40=%3F&%40=%26&foo=hi&foo&foo=cu');

  x = { empty: [], nope: false, nothing: null, neither: [ null, false ] };
  y = [ 23, undefined, 'hi', true, 42, null, 'cu' ];
  u = '=23&=hi&&=42&=cu';
  eq(qs(x),  '');
  eq(qs(y),  u);
  eq(qs(u),  { '': [ '23', 'hi', true, '42', 'cu' ] });

  eq(qs(x, shebang),  '');
  eq(qs(y, shebang),  '#!' + u);

  opt = { prefix: '?' };
  eq(qs(x, opt),  '');
  eq(qs(y, opt),  '?' + u);
  //#r

  console.log("+OK usage test passed.");    //= "+OK usage test passed."
}












(function (e) {
  /*global define: true */
  var d = ((typeof define === 'function') && define),
    m = ((typeof module === 'object') && module);
  if (d && d.amd) { d(function () { return e; }); }
  if (m && m.exports) {
    m.exports = e;
    if ((typeof require === 'function') && (require.main === m)) { e(); }
  }
}(readmeDemo));
