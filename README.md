
<!--#echo json="package.json" key="name" underline="=" -->
qrystr
======
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Yet another codec for urlencoded data, written from scratch for minimalism,
cares about a lot less stuff than node&#39;s does. Features include a
direction-guessing API and AMD/UMD support.
<!--/#echo -->


Still too large a library? You might not need any at all:
[URLSearchParams][usp-mdn] are now [widely supported][usp-ciu].

  [usp-mdn]: https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
  [usp-ciu]: https://caniuse.com/#feat=urlsearchparams


Usage
-----

from [test/usage.js](test/usage.js):

<!--#include file="test/usage.js" start="  //#u" stop="  //#r"
  outdent="  " code="javascript" -->
<!--#verbatim lncnt="34" -->
```javascript
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

sym({}, '');
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
```
<!--/include-->



<!--#toc stop="scan" -->



Known issues
------------

* It can't (yet?) work with deep objects.
* Needs more/better tests and docs. (See source for undocumented features.)




&nbsp;

License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
