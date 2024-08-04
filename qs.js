/*jslint indent: 2, maxlen: 80, continue: false, unparam: false */
/* -*- tab-width: 2 -*- */
/*global define: true, module: true, require: true, window: true */
(function setup() {
  'use strict';
  var EX, OPtHas = Object.prototype.hasOwnProperty;

  EX = function qrystr(x, opt) {
    if (typeof x !== 'string') { return EX.stringify(x, opt); }
    var q = x.slice(0, 1), pfx = (opt || false).prefix,
      pxl = (pfx && pfx.length);
    if ((pxl > 0) && (x.slice(0, pxl) === pfx)) {
      x = x.slice(pxl);
    } else {
      if ((q === '?') || (q === '#')) { x = x.slice(1); }
    }
    return EX.parse(x, opt);
  };

  function decipher(m, hex, unihex) {
    hex = (hex || unihex);
    if (hex) { return String.fromCharCode(parseInt(hex, 16)); }
    return m;
  }
  decipher.rgx = /%(?:([0-9a-f]{2})|u([0-9a-f]{4}))/ig;

  function urlDecode(u) {
    u = u.replace(/\+/g, ' ');
    try { return decodeURIComponent(u); } catch (ignore) {}
    return u.replace(decipher.rgx, decipher);
  }
  EX.urldecode = urlDecode;

  function urlEncode(x, encOpt) {
    if (x === null) { return; }
    if (x === false) { return; }
    if (x === undefined) { return; }
    if (x === true) { return x; }
    x = encodeURIComponent(String(x));
    var sp = encOpt.space;
    if (sp !== '%20') { x = x.replace(/%20/g, (sp || '+')); }
    return x;
  }
  EX.urlencode = urlEncode;

  EX.sepRx = /&|;/;
  EX.keyRx = /^(\S*?)=/;

  function falseyNonString(x) { return ((x && '') !== ''); }
  function ifFun(f, d) { return (typeof f === 'function' ? f : d); }
  function isObj(x) { return ((x && typeof x) === 'object'); }
  function pushVal(a, x) { return (isObj(a) ? a.concat(x) : [a, x]); }

  function opportunisticForEach(x, f) {
    x = ((x.length > 0) && ifFun(x.forEach) && x);
    if (x) { x.forEach(f); }
    return x;
  }

  function qsDecode(qs, opt) {
    opt = (opt || false);
    qs = String(qs || '');
    var dict = (opt.dict || {}), keyRx = (opt.keyRx || EX.keyRx), key,
      ud = (opt.urldecode || urlDecode), decOpt = (opt.decOpt || false);
    if (!qs) { return dict; }
    qs.split(opt.sepRx || EX.sepRx).forEach(function (val) {
      key = val.match(keyRx);
      if (key) {
        val = ud(val.slice(key.index + key[0].length), decOpt);
        key = ud(key[1], decOpt);
      } else {
        key = ud(val, decOpt);
        val = true;
      }
      dict[key] = (OPtHas.call(dict, key) ? pushVal(dict[key], val) : val);
    });
    return dict;
  }
  EX.parse = EX.decode = qsDecode;

  function qsEncode(dict, opt) {
    opt = (opt || false);
    var qs = '', keySep = (opt.keySep || '&'), valSep = (opt.valSep || '='),
      ue = (opt.urlencode || urlEncode), encOpt = (opt.encOpt || false);
    function addVal(val) {
      val = ue(val, encOpt);
      if (falseyNonString(val)) { return; }
      qs += (qs && keySep) + addVal.key;
      if (val !== true) { qs += valSep + val; }
    }
    addVal.key = '';
    if (!opportunisticForEach(dict, addVal)) {
      Object.keys(dict).sort().forEach(function (key) {
        var val = dict[key];
        addVal.key = key = ue(key, encOpt);
        if (falseyNonString(key)) { return; }
        return (isObj(val) ? opportunisticForEach(val, addVal) : addVal(val));
      });
    }
    if (qs && opt.prefix) { qs = opt.prefix + qs; }
    return qs;
  }
  EX.stringify = EX.encode = qsEncode;



















  (function unifiedExport(e) {
    var d = ((typeof define === 'function') && define),
      m = ((typeof module === 'object') && module);
    if (d.amd) { d(function f() { return e; }); }
    if (m.exports) { m.exports = e; }
    if (d || m) { return; }
    m = ((typeof window === 'object') && window);
    if (m) { m.qrystr = e; }
  }(EX));

  return EX;
}());
