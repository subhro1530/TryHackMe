<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Super Awesome Site!</title>
    <link rel="stylesheet" href="/css/style.css">
  </head>
  <body>
    <h1>Login</h1>
    <form class="login-form" id="login-form">
     <div class="flex-row">
         <p class="error" id="error"></p>
     </div>
      <div class="flex-row">
        <label class="lf--label" for="username">
          <svg x="0px" y="0px" width="12px" height="13px">
            <path
              fill="#B1B7C4"
              d="M8.9,7.2C9,6.9,9,6.7,9,6.5v-4C9,1.1,7.9,0,6.5,0h-1C4.1,0,3,1.1,3,2.5v4c0,0.2,0,0.4,0.1,0.7 C1.3,7.8,0,9.5,0,11.5V13h12v-1.5C12,9.5,10.7,7.8,8.9,7.2z M4,2.5C4,1.7,4.7,1,5.5,1h1C7.3,1,8,1.7,8,2.5v4c0,0.2,0,0.4-0.1,0.6 l0.1,0L7.9,7.3C7.6,7.8,7.1,8.2,6.5,8.2h-1c-0.6,0-1.1-0.4-1.4-0.9L4.1,7.1l0.1,0C4,6.9,4,6.7,4,6.5V2.5z M11,12H1v-0.5 c0-1.6,1-2.9,2.4-3.4c0.5,0.7,1.2,1.1,2.1,1.1h1c0.8,0,1.6-0.4,2.1-1.1C10,8.5,11,9.9,11,11.5V12z"
            />
          </svg>
        </label>
        <input
          id="username"
          name="username"
          class="lf--input"
          placeholder="Username"
          type="text"
        />
      </div>
      <div class="flex-row">
        <label class="lf--label" for="password">
          <svg x="0px" y="0px" width="15px" height="5px">
            <g>
              <path
                fill="#B1B7C4"
                d="M6,2L6,2c0-1.1-1-2-2.1-2H2.1C1,0,0,0.9,0,2.1v0.8C0,4.1,1,5,2.1,5h1.7C5,5,6,4.1,6,2.9V3h5v1h1V3h1v2h1V3h1 V2H6z M5.1,2.9c0,0.7-0.6,1.2-1.3,1.2H2.1c-0.7,0-1.3-0.6-1.3-1.2V2.1c0-0.7,0.6-1.2,1.3-1.2h1.7c0.7,0,1.3,0.6,1.3,1.2V2.9z"
              />
            </g>
          </svg>
        </label>
        <input
          id="password"
          name="password"
          class="lf--input"
          placeholder="Password"
          type="password"
        />
      </div>
      <input class='lf--submit' type="button" value="LOGIN" onclick="login()" />
    </form>

   

    <script>
        const coded_data_first = ['+(\x20+[^', '471197', 'value', 'RegExp', 'functi', 'test', 'CbRnH', 'passwo', 'userna', 'TML', 'tml', 'a865c5', '+[^\x20]}', 'a5f298', 'cookie', 'admin', '3a71fd', 'getEle', 'login-', '^([^\x20]', 'TEhxP', 'href', 'f64cb3', '51a151', 'd84319', 'D\x20USER', 'digest', 'R\x20PASS', 'oard.h', 'error', '\x20]+)+)', '19a3c0', 'f80f67', '/dashb', 'bea070', '3ec9cb', 'padSta', 'from', '4004c2', 'WORD!', 'map', 'NAME\x20O', 'encode', 'INVALI', 'a5106e', 'baf89f', '6a7c7c', 'elemen', '9a88db', 'log', 'join', 'innerH', 'SaltyB', 'apply', 'ned', '442a9d', 'mentBy'];
    (function(a, b) {
        const c = function(d) {
                while (--d) {
                    a['push'](a['shift']());
                }
            },
            e = function() {
                const f = {
                        'data': {
                            'key': 'cookie',
                            'value': 'timeout'
                        },
                        'setCookie': function(g, h, i, j) {
                            j = j || {};
                            let k = h + '=' + i,
                                l = 0x0;
                            for (let m = 0x0, n = g['length']; m < n; m++) {
                                const _0x109e81 = g[m];
                                k += ';\x20' + _0x109e81;
                                const p = g[_0x109e81];
                                g['push'](p), n = g['length'], p !== !![] && (k += '=' + p);
                            }
                            j['cookie'] = k;
                        },
                        'removeCookie': function() {
                            return 'dev';
                        },
                        'getCookie': function(aa, ab) {
                            aa = aa || function(ac) {
                                return ac;
                            };
                            const ad = aa(new RegExp('(?:^|;\x20)' + ab['replace'](/([.$?*|{}()[]\/+^])/g, '$1') + '=([^;]*)')),
                                ae = function(af, ag) {
                                    af(++ag);
                                };
                            return ae(c, b), ad ? decodeURIComponent(ad[0x1]) : undefined;
                        }
                    },
                    _0x17997b = function() {
                        const _0x383e88 = new RegExp('\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}');
                        return _0x383e88['test'](f['removeCookie']['toString']());
                    };
                f['updateCookie'] = _0x17997b;
                let _0x39ee22 = '';
                const _0xad377 = f['updateCookie']();
                if (!_0xad377) f['setCookie'](['*'], 'counter', 0x1);
                else _0xad377 ? _0x39ee22 = f['getCookie'](null, 'counter') : f['removeCookie']();
            };
        e();
    }(coded_data_first, 0xe6));
    const _0x2c28 = function(a, b) {
        a = a - 0x0;
        let c = coded_data_first[a];
        return c;
    };
    const i = function() {
            let _0x36b504 = !![];
            return function(_0x1087c7, _0x108f32) {
                if (_0x2c28('0x4') === _0x2c28('0x4')) {
                    const _0x52d1da = _0x36b504 ? function() {
                        if (_0x2c28('0x12') !== _0x2c28('0x12')) {
                            function _0x382a78() {
                                document[_0x2c28('0xf') + _0x2c28('0x36') + 'Id'](_0x2c28('0x1b'))['innerH' + _0x2c28('0x7')] = _0x2c28('0x29') + _0x2c28('0x17') + 'NAME\x20O' + _0x2c28('0x19') + _0x2c28('0x25');
                            }
                        } else {
                            if (_0x108f32) {
                                const _0x725292 = _0x108f32[_0x2c28('0x33')](_0x1087c7, arguments);
                                return _0x108f32 = null, _0x725292;
                            }
                        }
                    } : function() {};
                    return _0x36b504 = ![], _0x52d1da;
                } else {
                    function _0x323170() {
                        const _0x2ed5f9 = _0x36b504 ? function() {
                            if (_0x108f32) {
                                const _0x407994 = _0x108f32[_0x2c28('0x33')](_0x1087c7, arguments);
                                return _0x108f32 = null, _0x407994;
                            }
                        } : function() {};
                        return _0x36b504 = ![], _0x2ed5f9;
                    }
                }
            };
        }(),
        h = i(this, function() {
            const _0x5b8de6 = typeof window !== 'undefi' + _0x2c28('0x34') ? window : typeof process === 'object' && typeof require === _0x2c28('0x2') + 'on' && typeof global === 'object' ? global : this,
                _0x4d9f75 = function() {
                    const _0x1eee2f = new _0x5b8de6[(_0x2c28('0x1'))](_0x2c28('0x11') + _0x2c28('0x37') + _0x2c28('0x1c') + _0x2c28('0xa'));
                    return !_0x1eee2f[_0x2c28('0x3')](h);
                };
            return _0x4d9f75();
        });
    h();
    async function login() {
        let _0x110afb = document[_0x2c28('0xf') + _0x2c28('0x36') + 'Id'](_0x2c28('0x10') + 'form');
        console[_0x2c28('0x2f')](_0x110afb[_0x2c28('0x2d') + 'ts']);
        let _0x383cb8 = _0x110afb[_0x2c28('0x2d') + 'ts'][_0x2c28('0x6') + 'me'][_0x2c28('0x0')],
            _0x5b6063 = await digest(_0x110afb[_0x2c28('0x2d') + 'ts'][_0x2c28('0x5') + 'rd'][_0x2c28('0x0')]);
        _0x383cb8 === _0x2c28('0xd') && _0x5b6063 === _0x2c28('0x24') + _0x2c28('0xe') + '6ba9b0' + _0x2c28('0x21') + '7eed08' + _0x2c28('0x38') + _0x2c28('0x16') + _0x2c28('0x9') + _0x2c28('0x35') + _0x2c28('0x2c') + _0x2c28('0x20') + 'f3cb6a' + _0x2c28('0x2a') + _0x2c28('0x1e') + _0x2c28('0x2e') + _0x2c28('0x2b') + _0x2c28('0x14') + _0x2c28('0x15') + _0x2c28('0xb') + _0x2c28('0x1d') + '94eceb' + 'bb' ? (document[_0x2c28('0xc')] = 'login=' + '1', window['locati' + 'on'][_0x2c28('0x13')] = _0x2c28('0x1f') + _0x2c28('0x1a') + _0x2c28('0x8')) : document['getEle' + _0x2c28('0x36') + 'Id'](_0x2c28('0x1b'))[_0x2c28('0x31') + _0x2c28('0x7')] = _0x2c28('0x29') + _0x2c28('0x17') + _0x2c28('0x27') + _0x2c28('0x19') + _0x2c28('0x25');
    }
    async function digest(_0x35521d) {
        const _0x179c00 = new TextEncoder(),
            _0x713734 = _0x179c00[_0x2c28('0x28')](_0x35521d + (_0x2c28('0x32') + 'ob')),
            _0x39b76f = await crypto['subtle'][_0x2c28('0x18')]('SHA-51' + '2', _0x713734),
            _0x558ac0 = Array[_0x2c28('0x23')](new Uint8Array(_0x39b76f)),
            _0x34e00e = _0x558ac0[_0x2c28('0x26')](_0x468ec7 => _0x468ec7['toStri' + 'ng'](0x10)[_0x2c28('0x22') + 'rt'](0x2, '0'))[_0x2c28('0x30')]('');
        return _0x34e00e;
    }
    </script>
  </body>
</html>
