import { p as commonjsGlobal, I as require$$1, q as getDefaultExportFromCjs, E as Extension, V as Vue, P as PPF, i as ECommonKey, a as EAction, w as EDataResultType, J as EUserDataRange, r as dayjs, f as filters, F as FileSaver, n as normalizeComponent } from "./index-a-kPTsLM.js";
import { d as domtoimage } from "./dom-to-image-tglxW4Rh.js";
var highchartsVue_min$2 = { exports: {} };
var highcharts$1 = { exports: {} };
var highcharts = highcharts$1.exports;
var hasRequiredHighcharts;
function requireHighcharts() {
  if (hasRequiredHighcharts)
    return highcharts$1.exports;
  hasRequiredHighcharts = 1;
  (function(module) {
    (function(aa, K) {
      module.exports ? (K["default"] = K, module.exports = aa.document ? K(aa) : K) : false ? (void 0)("highcharts/highcharts", function() {
        return K(aa);
      }) : (aa.Highcharts && aa.Highcharts.error(16, true), aa.Highcharts = K(aa));
    })("undefined" !== typeof window ? window : commonjsGlobal, function(aa) {
      function K(a, A, g2, F) {
        a.hasOwnProperty(A) || (a[A] = F.apply(null, g2), "function" === typeof CustomEvent && aa.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: A, module: a[A] } })));
      }
      var g = {};
      K(g, "Core/Globals.js", [], function() {
        var a;
        (function(a2) {
          a2.SVG_NS = "http://www.w3.org/2000/svg";
          a2.product = "Highcharts";
          a2.version = "10.3.3";
          a2.win = "undefined" !== typeof aa ? aa : {};
          a2.doc = a2.win.document;
          a2.svg = a2.doc && a2.doc.createElementNS && !!a2.doc.createElementNS(a2.SVG_NS, "svg").createSVGRect;
          a2.userAgent = a2.win.navigator && a2.win.navigator.userAgent || "";
          a2.isChrome = -1 !== a2.userAgent.indexOf("Chrome");
          a2.isFirefox = -1 !== a2.userAgent.indexOf("Firefox");
          a2.isMS = /(edge|msie|trident)/i.test(a2.userAgent) && !a2.win.opera;
          a2.isSafari = !a2.isChrome && -1 !== a2.userAgent.indexOf("Safari");
          a2.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(a2.userAgent);
          a2.isWebKit = -1 !== a2.userAgent.indexOf("AppleWebKit");
          a2.deg2rad = 2 * Math.PI / 360;
          a2.hasBidiBug = a2.isFirefox && 4 > parseInt(a2.userAgent.split("Firefox/")[1], 10);
          a2.hasTouch = !!a2.win.TouchEvent;
          a2.marginNames = ["plotTop", "marginRight", "marginBottom", "plotLeft"];
          a2.noop = function() {
          };
          a2.supportsPassiveEvents = function() {
            var g2 = false;
            if (!a2.isMS) {
              var A = Object.defineProperty({}, "passive", { get: function() {
                g2 = true;
              } });
              a2.win.addEventListener && a2.win.removeEventListener && (a2.win.addEventListener("testPassive", a2.noop, A), a2.win.removeEventListener("testPassive", a2.noop, A));
            }
            return g2;
          }();
          a2.charts = [];
          a2.dateFormats = {};
          a2.seriesTypes = {};
          a2.symbolSizes = {};
          a2.chartCount = 0;
        })(a || (a = {}));
        "";
        return a;
      });
      K(g, "Core/Utilities.js", [g["Core/Globals.js"]], function(a) {
        function g2(b2, c2, n2, J) {
          var z = c2 ? "Highcharts error" : "Highcharts warning";
          32 === b2 && (b2 = "" + z + ": Deprecated member");
          var q = l(b2), u2 = q ? "" + z + " #" + b2 + ": www.highcharts.com/errors/" + b2 + "/" : b2.toString();
          if ("undefined" !== typeof J) {
            var N = "";
            q && (u2 += "?");
            E(J, function(b3, z2) {
              N += "\n - ".concat(z2, ": ").concat(b3);
              q && (u2 += encodeURI(z2) + "=" + encodeURI(b3));
            });
            u2 += N;
          }
          y(a, "displayError", { chart: n2, code: b2, message: u2, params: J }, function() {
            if (c2)
              throw Error(u2);
            f.console && -1 === g2.messages.indexOf(u2) && console.warn(u2);
          });
          g2.messages.push(u2);
        }
        function x(b2, f2) {
          var z = {};
          E(b2, function(c2, q) {
            if (H(b2[q], true) && !b2.nodeType && f2[q])
              c2 = x(b2[q], f2[q]), Object.keys(c2).length && (z[q] = c2);
            else if (H(b2[q]) || b2[q] !== f2[q] || q in b2 && !(q in f2))
              z[q] = b2[q];
          });
          return z;
        }
        function F(b2, f2) {
          return parseInt(b2, f2 || 10);
        }
        function C(b2) {
          return "string" === typeof b2;
        }
        function B(b2) {
          b2 = Object.prototype.toString.call(b2);
          return "[object Array]" === b2 || "[object Array Iterator]" === b2;
        }
        function H(b2, f2) {
          return !!b2 && "object" === typeof b2 && (!f2 || !B(b2));
        }
        function t(b2) {
          return H(b2) && "number" === typeof b2.nodeType;
        }
        function r(b2) {
          var f2 = b2 && b2.constructor;
          return !(!H(b2, true) || t(b2) || !f2 || !f2.name || "Object" === f2.name);
        }
        function l(b2) {
          return "number" === typeof b2 && !isNaN(b2) && Infinity > b2 && -Infinity < b2;
        }
        function e(b2) {
          return "undefined" !== typeof b2 && null !== b2;
        }
        function d(b2, f2, c2) {
          var z = C(f2) && !e(c2), q, n2 = function(f3, c3) {
            e(f3) ? b2.setAttribute(c3, f3) : z ? (q = b2.getAttribute(c3)) || "class" !== c3 || (q = b2.getAttribute(c3 + "Name")) : b2.removeAttribute(c3);
          };
          C(f2) ? n2(c2, f2) : E(f2, n2);
          return q;
        }
        function h(b2, f2) {
          var c2;
          b2 || (b2 = {});
          for (c2 in f2)
            b2[c2] = f2[c2];
          return b2;
        }
        function m() {
          for (var b2 = arguments, f2 = b2.length, c2 = 0; c2 < f2; c2++) {
            var J = b2[c2];
            if ("undefined" !== typeof J && null !== J)
              return J;
          }
        }
        function k(b2, f2) {
          a.isMS && !a.svg && f2 && e(f2.opacity) && (f2.filter = "alpha(opacity=".concat(100 * f2.opacity, ")"));
          h(
            b2.style,
            f2
          );
        }
        function p(b2) {
          return Math.pow(10, Math.floor(Math.log(b2) / Math.LN10));
        }
        function D(b2, f2) {
          return 1e14 < b2 ? b2 : parseFloat(b2.toPrecision(f2 || 14));
        }
        function I(b2, c2, n2) {
          var z = a.getStyle || I;
          if ("width" === c2)
            return c2 = Math.min(b2.offsetWidth, b2.scrollWidth), n2 = b2.getBoundingClientRect && b2.getBoundingClientRect().width, n2 < c2 && n2 >= c2 - 1 && (c2 = Math.floor(n2)), Math.max(0, c2 - (z(b2, "padding-left", true) || 0) - (z(b2, "padding-right", true) || 0));
          if ("height" === c2)
            return Math.max(0, Math.min(b2.offsetHeight, b2.scrollHeight) - (z(b2, "padding-top", true) || 0) - (z(
              b2,
              "padding-bottom",
              true
            ) || 0));
          f.getComputedStyle || g2(27, true);
          if (b2 = f.getComputedStyle(b2, void 0)) {
            var q = b2.getPropertyValue(c2);
            m(n2, "opacity" !== c2) && (q = F(q));
          }
          return q;
        }
        function E(b2, f2, c2) {
          for (var z in b2)
            Object.hasOwnProperty.call(b2, z) && f2.call(c2 || b2[z], b2[z], z, b2);
        }
        function L(b2, f2, c2) {
          function z(f3, c3) {
            var v = b2.removeEventListener || a.removeEventListenerPolyfill;
            v && v.call(b2, f3, c3, false);
          }
          function q(c3) {
            var v;
            if (b2.nodeName) {
              if (f2) {
                var q2 = {};
                q2[f2] = true;
              } else
                q2 = c3;
              E(q2, function(b3, f3) {
                if (c3[f3])
                  for (v = c3[f3].length; v--; )
                    z(f3, c3[f3][v].fn);
              });
            }
          }
          var n2 = "function" === typeof b2 && b2.prototype || b2;
          if (Object.hasOwnProperty.call(n2, "hcEvents")) {
            var u2 = n2.hcEvents;
            f2 ? (n2 = u2[f2] || [], c2 ? (u2[f2] = n2.filter(function(b3) {
              return c2 !== b3.fn;
            }), z(f2, c2)) : (q(u2), u2[f2] = [])) : (q(u2), delete n2.hcEvents);
          }
        }
        function y(b2, f2, c2, J) {
          c2 = c2 || {};
          if (w.createEvent && (b2.dispatchEvent || b2.fireEvent && b2 !== a)) {
            var z = w.createEvent("Events");
            z.initEvent(f2, true, true);
            c2 = h(z, c2);
            b2.dispatchEvent ? b2.dispatchEvent(c2) : b2.fireEvent(f2, c2);
          } else if (b2.hcEvents) {
            c2.target || h(c2, {
              preventDefault: function() {
                c2.defaultPrevented = true;
              },
              target: b2,
              type: f2
            });
            z = [];
            for (var q = b2, n2 = false; q.hcEvents; )
              Object.hasOwnProperty.call(q, "hcEvents") && q.hcEvents[f2] && (z.length && (n2 = true), z.unshift.apply(z, q.hcEvents[f2])), q = Object.getPrototypeOf(q);
            n2 && z.sort(function(b3, f3) {
              return b3.order - f3.order;
            });
            z.forEach(function(f3) {
              false === f3.fn.call(b2, c2) && c2.preventDefault();
            });
          }
          J && !c2.defaultPrevented && J.call(b2, c2);
        }
        var c = a.charts, w = a.doc, f = a.win;
        (g2 || (g2 = {})).messages = [];
        Math.easeInOutSine = function(b2) {
          return -0.5 * (Math.cos(Math.PI * b2) - 1);
        };
        var n = Array.prototype.find ? function(b2, f2) {
          return b2.find(f2);
        } : function(b2, f2) {
          var c2, q = b2.length;
          for (c2 = 0; c2 < q; c2++)
            if (f2(b2[c2], c2))
              return b2[c2];
        };
        E({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function(b2, f2) {
          a[f2] = function(c2) {
            var q;
            g2(32, false, void 0, (q = {}, q["Highcharts.".concat(f2)] = "use Array.".concat(b2), q));
            return Array.prototype[b2].apply(c2, [].slice.call(arguments, 1));
          };
        });
        var b, u = function() {
          var f2 = Math.random().toString(36).substring(2, 9) + "-", c2 = 0;
          return function() {
            return "highcharts-" + (b ? "" : f2) + c2++;
          };
        }();
        f.jQuery && (f.jQuery.fn.highcharts = function() {
          var b2 = [].slice.call(arguments);
          if (this[0])
            return b2[0] ? (new a[C(b2[0]) ? b2.shift() : "Chart"](this[0], b2[0], b2[1]), this) : c[d(this[0], "data-highcharts-chart")];
        });
        n = {
          addEvent: function(b2, f2, c2, J) {
            void 0 === J && (J = {});
            var q = "function" === typeof b2 && b2.prototype || b2;
            Object.hasOwnProperty.call(q, "hcEvents") || (q.hcEvents = {});
            q = q.hcEvents;
            a.Point && b2 instanceof a.Point && b2.series && b2.series.chart && (b2.series.chart.runTrackerClick = true);
            var z = b2.addEventListener || a.addEventListenerPolyfill;
            z && z.call(b2, f2, c2, a.supportsPassiveEvents ? { passive: void 0 === J.passive ? -1 !== f2.indexOf("touch") : J.passive, capture: false } : false);
            q[f2] || (q[f2] = []);
            q[f2].push({ fn: c2, order: "number" === typeof J.order ? J.order : Infinity });
            q[f2].sort(function(b3, f3) {
              return b3.order - f3.order;
            });
            return function() {
              L(b2, f2, c2);
            };
          },
          arrayMax: function(b2) {
            for (var f2 = b2.length, c2 = b2[0]; f2--; )
              b2[f2] > c2 && (c2 = b2[f2]);
            return c2;
          },
          arrayMin: function(b2) {
            for (var f2 = b2.length, c2 = b2[0]; f2--; )
              b2[f2] < c2 && (c2 = b2[f2]);
            return c2;
          },
          attr: d,
          clamp: function(b2, f2, c2) {
            return b2 > f2 ? b2 < c2 ? b2 : c2 : f2;
          },
          cleanRecursively: x,
          clearTimeout: function(b2) {
            e(b2) && clearTimeout(b2);
          },
          correctFloat: D,
          createElement: function(b2, f2, c2, J, n2) {
            b2 = w.createElement(b2);
            f2 && h(b2, f2);
            n2 && k(b2, { padding: "0", border: "none", margin: "0" });
            c2 && k(b2, c2);
            J && J.appendChild(b2);
            return b2;
          },
          css: k,
          defined: e,
          destroyObjectProperties: function(b2, f2) {
            E(b2, function(c2, q) {
              c2 && c2 !== f2 && c2.destroy && c2.destroy();
              delete b2[q];
            });
          },
          discardElement: function(b2) {
            b2 && b2.parentElement && b2.parentElement.removeChild(b2);
          },
          erase: function(b2, f2) {
            for (var c2 = b2.length; c2--; )
              if (b2[c2] === f2) {
                b2.splice(c2, 1);
                break;
              }
          },
          error: g2,
          extend: h,
          extendClass: function(b2, f2) {
            var c2 = function() {
            };
            c2.prototype = new b2();
            h(c2.prototype, f2);
            return c2;
          },
          find: n,
          fireEvent: y,
          getMagnitude: p,
          getNestedProperty: function(b2, c2) {
            for (b2 = b2.split("."); b2.length && e(c2); ) {
              var q = b2.shift();
              if ("undefined" === typeof q || "__proto__" === q)
                return;
              c2 = c2[q];
              if (!e(c2) || "function" === typeof c2 || "number" === typeof c2.nodeType || c2 === f)
                return;
            }
            return c2;
          },
          getStyle: I,
          inArray: function(b2, c2, f2) {
            g2(32, false, void 0, { "Highcharts.inArray": "use Array.indexOf" });
            return c2.indexOf(b2, f2);
          },
          isArray: B,
          isClass: r,
          isDOMElement: t,
          isFunction: function(b2) {
            return "function" === typeof b2;
          },
          isNumber: l,
          isObject: H,
          isString: C,
          keys: function(b2) {
            g2(32, false, void 0, { "Highcharts.keys": "use Object.keys" });
            return Object.keys(b2);
          },
          merge: function() {
            var b2, c2 = arguments, f2 = {}, J = function(b3, c3) {
              "object" !== typeof b3 && (b3 = {});
              E(c3, function(f3, v) {
                "__proto__" !== v && "constructor" !== v && (!H(f3, true) || r(f3) || t(f3) ? b3[v] = c3[v] : b3[v] = J(b3[v] || {}, f3));
              });
              return b3;
            };
            true === c2[0] && (f2 = c2[1], c2 = Array.prototype.slice.call(c2, 2));
            var n2 = c2.length;
            for (b2 = 0; b2 < n2; b2++)
              f2 = J(f2, c2[b2]);
            return f2;
          },
          normalizeTickInterval: function(b2, c2, f2, J, n2) {
            var q = b2;
            f2 = m(f2, p(b2));
            var u2 = b2 / f2;
            c2 || (c2 = n2 ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], false === J && (1 === f2 ? c2 = c2.filter(function(b3) {
              return 0 === b3 % 1;
            }) : 0.1 >= f2 && (c2 = [1 / f2])));
            for (J = 0; J < c2.length && !(q = c2[J], n2 && q * f2 >= b2 || !n2 && u2 <= (c2[J] + (c2[J + 1] || c2[J])) / 2); J++)
              ;
            return q = D(q * f2, -Math.round(Math.log(1e-3) / Math.LN10));
          },
          objectEach: E,
          offset: function(b2) {
            var c2 = w.documentElement;
            b2 = b2.parentElement || b2.parentNode ? b2.getBoundingClientRect() : { top: 0, left: 0, width: 0, height: 0 };
            return { top: b2.top + (f.pageYOffset || c2.scrollTop) - (c2.clientTop || 0), left: b2.left + (f.pageXOffset || c2.scrollLeft) - (c2.clientLeft || 0), width: b2.width, height: b2.height };
          },
          pad: function(b2, c2, f2) {
            return Array((c2 || 2) + 1 - String(b2).replace("-", "").length).join(f2 || "0") + b2;
          },
          pick: m,
          pInt: F,
          relativeLength: function(b2, c2, f2) {
            return /%$/.test(b2) ? c2 * parseFloat(b2) / 100 + (f2 || 0) : parseFloat(b2);
          },
          removeEvent: L,
          splat: function(b2) {
            return B(b2) ? b2 : [b2];
          },
          stableSort: function(b2, c2) {
            var f2 = b2.length, J, n2;
            for (n2 = 0; n2 < f2; n2++)
              b2[n2].safeI = n2;
            b2.sort(function(b3, f3) {
              J = c2(b3, f3);
              return 0 === J ? b3.safeI - f3.safeI : J;
            });
            for (n2 = 0; n2 < f2; n2++)
              delete b2[n2].safeI;
          },
          syncTimeout: function(b2, c2, f2) {
            if (0 < c2)
              return setTimeout(b2, c2, f2);
            b2.call(0, f2);
            return -1;
          },
          timeUnits: { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5, month: 24192e5, year: 314496e5 },
          uniqueKey: u,
          useSerialIds: function(c2) {
            return b = m(c2, b);
          },
          wrap: function(b2, c2, f2) {
            var n2 = b2[c2];
            b2[c2] = function() {
              var b3 = arguments, c3 = this;
              return f2.apply(this, [function() {
                return n2.apply(c3, arguments.length ? arguments : b3);
              }].concat([].slice.call(arguments)));
            };
          }
        };
        "";
        return n;
      });
      K(g, "Core/Chart/ChartDefaults.js", [], function() {
        return { alignThresholds: false, panning: {
          enabled: false,
          type: "x"
        }, styledMode: false, borderRadius: 0, colorCount: 10, allowMutatingData: true, defaultSeriesType: "line", ignoreHiddenSeries: true, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } }, zoomBySingleTouch: false, zooming: { singleTouch: false, resetButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } } }, width: null, height: null, borderColor: "#335cad", backgroundColor: "#ffffff", plotBorderColor: "#cccccc" };
      });
      K(g, "Core/Color/Color.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function(a, g2) {
        var A = g2.isNumber, F = g2.merge, C = g2.pInt;
        g2 = function() {
          function g3(A2) {
            this.rgba = [NaN, NaN, NaN, NaN];
            this.input = A2;
            var t = a.Color;
            if (t && t !== g3)
              return new t(A2);
            if (!(this instanceof g3))
              return new g3(A2);
            this.init(A2);
          }
          g3.parse = function(a2) {
            return a2 ? new g3(a2) : g3.None;
          };
          g3.prototype.init = function(a2) {
            var t;
            if ("object" === typeof a2 && "undefined" !== typeof a2.stops)
              this.stops = a2.stops.map(function(d) {
                return new g3(d[1]);
              });
            else if ("string" === typeof a2) {
              this.input = a2 = g3.names[a2.toLowerCase()] || a2;
              if ("#" === a2.charAt(0)) {
                var r = a2.length;
                var l = parseInt(a2.substr(1), 16);
                7 === r ? t = [(l & 16711680) >> 16, (l & 65280) >> 8, l & 255, 1] : 4 === r && (t = [(l & 3840) >> 4 | (l & 3840) >> 8, (l & 240) >> 4 | l & 240, (l & 15) << 4 | l & 15, 1]);
              }
              if (!t)
                for (l = g3.parsers.length; l-- && !t; ) {
                  var e = g3.parsers[l];
                  (r = e.regex.exec(a2)) && (t = e.parse(r));
                }
            }
            t && (this.rgba = t);
          };
          g3.prototype.get = function(a2) {
            var t = this.input, r = this.rgba;
            if ("object" === typeof t && "undefined" !== typeof this.stops) {
              var l = F(t);
              l.stops = [].slice.call(l.stops);
              this.stops.forEach(function(e, d) {
                l.stops[d] = [l.stops[d][0], e.get(a2)];
              });
              return l;
            }
            return r && A(r[0]) ? "rgb" === a2 || !a2 && 1 === r[3] ? "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")" : "a" === a2 ? "".concat(r[3]) : "rgba(" + r.join(",") + ")" : t;
          };
          g3.prototype.brighten = function(a2) {
            var t = this.rgba;
            if (this.stops)
              this.stops.forEach(function(l) {
                l.brighten(a2);
              });
            else if (A(a2) && 0 !== a2)
              for (var r = 0; 3 > r; r++)
                t[r] += C(255 * a2), 0 > t[r] && (t[r] = 0), 255 < t[r] && (t[r] = 255);
            return this;
          };
          g3.prototype.setOpacity = function(a2) {
            this.rgba[3] = a2;
            return this;
          };
          g3.prototype.tweenTo = function(a2, t) {
            var r = this.rgba, l = a2.rgba;
            if (!A(r[0]) || !A(l[0]))
              return a2.input || "none";
            a2 = 1 !== l[3] || 1 !== r[3];
            return (a2 ? "rgba(" : "rgb(") + Math.round(l[0] + (r[0] - l[0]) * (1 - t)) + "," + Math.round(l[1] + (r[1] - l[1]) * (1 - t)) + "," + Math.round(l[2] + (r[2] - l[2]) * (1 - t)) + (a2 ? "," + (l[3] + (r[3] - l[3]) * (1 - t)) : "") + ")";
          };
          g3.names = { white: "#ffffff", black: "#000000" };
          g3.parsers = [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function(a2) {
            return [C(a2[1]), C(a2[2]), C(a2[3]), parseFloat(a2[4], 10)];
          } }, { regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function(a2) {
            return [
              C(a2[1]),
              C(a2[2]),
              C(a2[3]),
              1
            ];
          } }];
          g3.None = new g3("");
          return g3;
        }();
        "";
        return g2;
      });
      K(g, "Core/Color/Palettes.js", [], function() {
        return { colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" ") };
      });
      K(g, "Core/Time.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function(a, g2) {
        var A = a.win, F = g2.defined, C = g2.error, B = g2.extend, H = g2.isObject, t = g2.merge, r = g2.objectEach, l = g2.pad, e = g2.pick, d = g2.splat, h = g2.timeUnits, m = a.isSafari && A.Intl && A.Intl.DateTimeFormat.prototype.formatRange, k = a.isSafari && A.Intl && !A.Intl.DateTimeFormat.prototype.formatRange;
        g2 = function() {
          function p(d2) {
            this.options = {};
            this.variableTimezone = this.useUTC = false;
            this.Date = A.Date;
            this.getTimezoneOffset = this.timezoneOffsetFunction();
            this.update(d2);
          }
          p.prototype.get = function(d2, e2) {
            if (this.variableTimezone || this.timezoneOffset) {
              var h2 = e2.getTime(), k2 = h2 - this.getTimezoneOffset(e2);
              e2.setTime(k2);
              d2 = e2["getUTC" + d2]();
              e2.setTime(h2);
              return d2;
            }
            return this.useUTC ? e2["getUTC" + d2]() : e2["get" + d2]();
          };
          p.prototype.set = function(d2, e2, h2) {
            if (this.variableTimezone || this.timezoneOffset) {
              if ("Milliseconds" === d2 || "Seconds" === d2 || "Minutes" === d2 && 0 === this.getTimezoneOffset(e2) % 36e5)
                return e2["setUTC" + d2](h2);
              var k2 = this.getTimezoneOffset(e2);
              k2 = e2.getTime() - k2;
              e2.setTime(k2);
              e2["setUTC" + d2](h2);
              d2 = this.getTimezoneOffset(e2);
              k2 = e2.getTime() + d2;
              return e2.setTime(k2);
            }
            return this.useUTC || m && "FullYear" === d2 ? e2["setUTC" + d2](h2) : e2["set" + d2](h2);
          };
          p.prototype.update = function(d2) {
            void 0 === d2 && (d2 = {});
            var h2 = e(d2.useUTC, true);
            this.options = d2 = t(true, this.options, d2);
            this.Date = d2.Date || A.Date || Date;
            this.timezoneOffset = (this.useUTC = h2) && d2.timezoneOffset || void 0;
            this.getTimezoneOffset = this.timezoneOffsetFunction();
            this.variableTimezone = h2 && !(!d2.getTimezoneOffset && !d2.timezone);
          };
          p.prototype.makeTime = function(d2, h2, m2, p2, y, c) {
            if (this.useUTC) {
              var w = this.Date.UTC.apply(0, arguments);
              var f = this.getTimezoneOffset(w);
              w += f;
              var n = this.getTimezoneOffset(w);
              f !== n ? w += n - f : f - 36e5 !== this.getTimezoneOffset(w - 36e5) || k || (w -= 36e5);
            } else
              w = new this.Date(d2, h2, e(m2, 1), e(p2, 0), e(y, 0), e(c, 0)).getTime();
            return w;
          };
          p.prototype.timezoneOffsetFunction = function() {
            var d2 = this, e2 = this.options, h2 = e2.getTimezoneOffset, k2 = e2.moment || A.moment;
            if (!this.useUTC)
              return function(d3) {
                return 6e4 * new Date(d3.toString()).getTimezoneOffset();
              };
            if (e2.timezone) {
              if (k2)
                return function(d3) {
                  return 6e4 * -k2.tz(d3, e2.timezone).utcOffset();
                };
              C(25);
            }
            return this.useUTC && h2 ? function(d3) {
              return 6e4 * h2(d3.valueOf());
            } : function() {
              return 6e4 * (d2.timezoneOffset || 0);
            };
          };
          p.prototype.dateFormat = function(d2, h2, k2) {
            if (!F(h2) || isNaN(h2))
              return a.defaultOptions.lang && a.defaultOptions.lang.invalidDate || "";
            d2 = e(d2, "%Y-%m-%d %H:%M:%S");
            var m2 = this, p2 = new this.Date(h2), c = this.get("Hours", p2), w = this.get("Day", p2), f = this.get("Date", p2), n = this.get("Month", p2), b = this.get("FullYear", p2), u = a.defaultOptions.lang, z = u && u.weekdays, q = u && u.shortWeekdays;
            p2 = B({ a: q ? q[w] : z[w].substr(0, 3), A: z[w], d: l(f), e: l(f, 2, " "), w, b: u.shortMonths[n], B: u.months[n], m: l(n + 1), o: n + 1, y: b.toString().substr(2, 2), Y: b, H: l(c), k: c, I: l(c % 12 || 12), l: c % 12 || 12, M: l(this.get("Minutes", p2)), p: 12 > c ? "AM" : "PM", P: 12 > c ? "am" : "pm", S: l(p2.getSeconds()), L: l(Math.floor(h2 % 1e3), 3) }, a.dateFormats);
            r(
              p2,
              function(b2, c2) {
                for (; -1 !== d2.indexOf("%" + c2); )
                  d2 = d2.replace("%" + c2, "function" === typeof b2 ? b2.call(m2, h2) : b2);
              }
            );
            return k2 ? d2.substr(0, 1).toUpperCase() + d2.substr(1) : d2;
          };
          p.prototype.resolveDTLFormat = function(e2) {
            return H(e2, true) ? e2 : (e2 = d(e2), { main: e2[0], from: e2[1], to: e2[2] });
          };
          p.prototype.getTimeTicks = function(d2, k2, p2, m2) {
            var y = this, c = [], w = {}, f = new y.Date(k2), n = d2.unitRange, b = d2.count || 1, u;
            m2 = e(m2, 1);
            if (F(k2)) {
              y.set("Milliseconds", f, n >= h.second ? 0 : b * Math.floor(y.get("Milliseconds", f) / b));
              n >= h.second && y.set("Seconds", f, n >= h.minute ? 0 : b * Math.floor(y.get("Seconds", f) / b));
              n >= h.minute && y.set("Minutes", f, n >= h.hour ? 0 : b * Math.floor(y.get("Minutes", f) / b));
              n >= h.hour && y.set("Hours", f, n >= h.day ? 0 : b * Math.floor(y.get("Hours", f) / b));
              n >= h.day && y.set("Date", f, n >= h.month ? 1 : Math.max(1, b * Math.floor(y.get("Date", f) / b)));
              if (n >= h.month) {
                y.set("Month", f, n >= h.year ? 0 : b * Math.floor(y.get("Month", f) / b));
                var z = y.get("FullYear", f);
              }
              n >= h.year && y.set("FullYear", f, z - z % b);
              n === h.week && (z = y.get("Day", f), y.set("Date", f, y.get("Date", f) - z + m2 + (z < m2 ? -7 : 0)));
              z = y.get(
                "FullYear",
                f
              );
              m2 = y.get("Month", f);
              var q = y.get("Date", f), N = y.get("Hours", f);
              k2 = f.getTime();
              !y.variableTimezone && y.useUTC || !F(p2) || (u = p2 - k2 > 4 * h.month || y.getTimezoneOffset(k2) !== y.getTimezoneOffset(p2));
              k2 = f.getTime();
              for (f = 1; k2 < p2; )
                c.push(k2), k2 = n === h.year ? y.makeTime(z + f * b, 0) : n === h.month ? y.makeTime(z, m2 + f * b) : !u || n !== h.day && n !== h.week ? u && n === h.hour && 1 < b ? y.makeTime(z, m2, q, N + f * b) : k2 + n * b : y.makeTime(z, m2, q + f * b * (n === h.day ? 1 : 7)), f++;
              c.push(k2);
              n <= h.hour && 1e4 > c.length && c.forEach(function(b2) {
                0 === b2 % 18e5 && "000000000" === y.dateFormat(
                  "%H%M%S%L",
                  b2
                ) && (w[b2] = "day");
              });
            }
            c.info = B(d2, { higherRanks: w, totalRange: n * b });
            return c;
          };
          p.prototype.getDateFormat = function(d2, e2, k2, p2) {
            var m2 = this.dateFormat("%m-%d %H:%M:%S.%L", e2), c = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, w = "millisecond";
            for (f in h) {
              if (d2 === h.week && +this.dateFormat("%w", e2) === k2 && "00:00:00.000" === m2.substr(6)) {
                var f = "week";
                break;
              }
              if (h[f] > d2) {
                f = w;
                break;
              }
              if (c[f] && m2.substr(c[f]) !== "01-01 00:00:00.000".substr(c[f]))
                break;
              "week" !== f && (w = f);
            }
            return this.resolveDTLFormat(p2[f]).main;
          };
          return p;
        }();
        "";
        return g2;
      });
      K(g, "Core/Defaults.js", [g["Core/Chart/ChartDefaults.js"], g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Color/Palettes.js"], g["Core/Time.js"], g["Core/Utilities.js"]], function(a, g2, x, F, C, B) {
        g2 = g2.parse;
        var A = B.merge, t = {
          colors: F.colors,
          symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
          lang: {
            loading: "Loading...",
            months: "January February March April May June July August September October November December".split(" "),
            shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            decimalPoint: ".",
            numericSymbols: "kMGTPE".split(""),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: " "
          },
          global: {},
          time: { Date: void 0, getTimezoneOffset: void 0, timezone: void 0, timezoneOffset: 0, useUTC: true },
          chart: a,
          title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 },
          subtitle: { text: "", align: "center", widthAdjust: -44 },
          caption: { margin: 15, text: "", align: "left", verticalAlign: "bottom" },
          plotOptions: {},
          labels: { style: { position: "absolute", color: "#333333" } },
          legend: { enabled: true, align: "center", alignColumns: true, className: "highcharts-no-tooltip", layout: "horizontal", labelFormatter: function() {
            return this.name;
          }, borderColor: "#999999", borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" }, itemStyle: { color: "#333333", cursor: "pointer", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis" }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" }, shadow: false, itemCheckboxStyle: {
            position: "absolute",
            width: "13px",
            height: "13px"
          }, squareSymbol: true, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bold" } } },
          loading: { labelStyle: { fontWeight: "bold", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: 0.5, textAlign: "center" } },
          tooltip: { enabled: true, animation: x.svg, borderRadius: 3, dateTimeLabelFormats: {
            millisecond: "%A, %b %e, %H:%M:%S.%L",
            second: "%A, %b %e, %H:%M:%S",
            minute: "%A, %b %e, %H:%M",
            hour: "%A, %b %e, %H:%M",
            day: "%A, %b %e, %Y",
            week: "Week from %A, %b %e, %Y",
            month: "%B %Y",
            year: "%Y"
          }, footerFormat: "", headerShape: "callout", hideDelay: 500, padding: 8, shape: "callout", shared: false, snap: x.isTouchDevice ? 25 : 10, headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>', pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>', backgroundColor: g2("#f7f7f7").setOpacity(0.85).get(), borderWidth: 1, shadow: true, stickOnContact: false, style: { color: "#333333", cursor: "default", fontSize: "12px", whiteSpace: "nowrap" }, useHTML: false },
          credits: {
            enabled: true,
            href: "https://www.highcharts.com?credits",
            position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 },
            style: { cursor: "pointer", color: "#999999", fontSize: "9px" },
            text: "Highcharts.com"
          }
        };
        t.chart.styledMode = false;
        "";
        var r = new C(A(t.global, t.time));
        a = { defaultOptions: t, defaultTime: r, getOptions: function() {
          return t;
        }, setOptions: function(l) {
          A(true, t, l);
          if (l.time || l.global)
            x.time ? x.time.update(A(t.global, t.time, l.global, l.time)) : x.time = r;
          return t;
        } };
        "";
        return a;
      });
      K(g, "Core/Animation/Fx.js", [
        g["Core/Color/Color.js"],
        g["Core/Globals.js"],
        g["Core/Utilities.js"]
      ], function(a, g2, x) {
        var A = a.parse, C = g2.win, B = x.isNumber, H = x.objectEach;
        return function() {
          function a2(a3, l, e) {
            this.pos = NaN;
            this.options = l;
            this.elem = a3;
            this.prop = e;
          }
          a2.prototype.dSetter = function() {
            var a3 = this.paths, l = a3 && a3[0];
            a3 = a3 && a3[1];
            var e = this.now || 0, d = [];
            if (1 !== e && l && a3)
              if (l.length === a3.length && 1 > e)
                for (var h = 0; h < a3.length; h++) {
                  for (var m = l[h], k = a3[h], p = [], D = 0; D < k.length; D++) {
                    var I = m[D], E = k[D];
                    B(I) && B(E) && ("A" !== k[0] || 4 !== D && 5 !== D) ? p[D] = I + e * (E - I) : p[D] = E;
                  }
                  d.push(p);
                }
              else
                d = a3;
            else
              d = this.toD || [];
            this.elem.attr("d", d, void 0, true);
          };
          a2.prototype.update = function() {
            var a3 = this.elem, l = this.prop, e = this.now, d = this.options.step;
            if (this[l + "Setter"])
              this[l + "Setter"]();
            else
              a3.attr ? a3.element && a3.attr(l, e, null, true) : a3.style[l] = e + this.unit;
            d && d.call(a3, e, this);
          };
          a2.prototype.run = function(r, l, e) {
            var d = this, h = d.options, m = function(e2) {
              return m.stopped ? false : d.step(e2);
            }, k = C.requestAnimationFrame || function(d2) {
              setTimeout(d2, 13);
            }, p = function() {
              for (var d2 = 0; d2 < a2.timers.length; d2++)
                a2.timers[d2]() || a2.timers.splice(
                  d2--,
                  1
                );
              a2.timers.length && k(p);
            };
            r !== l || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +/* @__PURE__ */ new Date(), this.start = r, this.end = l, this.unit = e, this.now = this.start, this.pos = 0, m.elem = this.elem, m.prop = this.prop, m() && 1 === a2.timers.push(m) && k(p)) : (delete h.curAnim[this.prop], h.complete && 0 === Object.keys(h.curAnim).length && h.complete.call(this.elem));
          };
          a2.prototype.step = function(a3) {
            var l = +/* @__PURE__ */ new Date(), e = this.options, d = this.elem, h = e.complete, m = e.duration, k = e.curAnim;
            if (d.attr && !d.element)
              a3 = false;
            else if (a3 || l >= m + this.startTime) {
              this.now = this.end;
              this.pos = 1;
              this.update();
              var p = k[this.prop] = true;
              H(k, function(d2) {
                true !== d2 && (p = false);
              });
              p && h && h.call(d);
              a3 = false;
            } else
              this.pos = e.easing((l - this.startTime) / m), this.now = this.start + (this.end - this.start) * this.pos, this.update(), a3 = true;
            return a3;
          };
          a2.prototype.initPath = function(a3, l, e) {
            function d(d2, c) {
              for (; d2.length < L; ) {
                var e2 = d2[0], f = c[L - d2.length];
                f && "M" === e2[0] && (d2[0] = "C" === f[0] ? ["C", e2[1], e2[2], e2[1], e2[2], e2[1], e2[2]] : ["L", e2[1], e2[2]]);
                d2.unshift(e2);
                p && (e2 = d2.pop(), d2.push(d2[d2.length - 1], e2));
              }
            }
            function h(d2, c) {
              for (; d2.length < L; )
                if (c = d2[Math.floor(d2.length / D) - 1].slice(), "C" === c[0] && (c[1] = c[5], c[2] = c[6]), p) {
                  var e2 = d2[Math.floor(d2.length / D)].slice();
                  d2.splice(d2.length / 2, 0, c, e2);
                } else
                  d2.push(c);
            }
            var m = a3.startX, k = a3.endX;
            e = e.slice();
            var p = a3.isArea, D = p ? 2 : 1;
            l = l && l.slice();
            if (!l)
              return [e, e];
            if (m && k && k.length) {
              for (a3 = 0; a3 < m.length; a3++)
                if (m[a3] === k[0]) {
                  var I = a3;
                  break;
                } else if (m[0] === k[k.length - m.length + a3]) {
                  I = a3;
                  var E = true;
                  break;
                } else if (m[m.length - 1] === k[k.length - m.length + a3]) {
                  I = m.length - a3;
                  break;
                }
              "undefined" === typeof I && (l = []);
            }
            if (l.length && B(I)) {
              var L = e.length + I * D;
              E ? (d(l, e), h(e, l)) : (d(e, l), h(l, e));
            }
            return [l, e];
          };
          a2.prototype.fillSetter = function() {
            a2.prototype.strokeSetter.apply(this, arguments);
          };
          a2.prototype.strokeSetter = function() {
            this.elem.attr(this.prop, A(this.start).tweenTo(A(this.end), this.pos), void 0, true);
          };
          a2.timers = [];
          return a2;
        }();
      });
      K(g, "Core/Animation/AnimationUtilities.js", [g["Core/Animation/Fx.js"], g["Core/Utilities.js"]], function(a, g2) {
        function A(d2) {
          return r(d2) ? l({ duration: 500, defer: 0 }, d2) : { duration: d2 ? 500 : 0, defer: 0 };
        }
        function F(d2, e2) {
          for (var k = a.timers.length; k--; )
            a.timers[k].elem !== d2 || e2 && e2 !== a.timers[k].prop || (a.timers[k].stopped = true);
        }
        var C = g2.defined, B = g2.getStyle, H = g2.isArray, t = g2.isNumber, r = g2.isObject, l = g2.merge, e = g2.objectEach, d = g2.pick;
        return { animate: function(d2, m, k) {
          var p, h = "", I, E;
          if (!r(k)) {
            var g3 = arguments;
            k = { duration: g3[2], easing: g3[3], complete: g3[4] };
          }
          t(k.duration) || (k.duration = 400);
          k.easing = "function" === typeof k.easing ? k.easing : Math[k.easing] || Math.easeInOutSine;
          k.curAnim = l(m);
          e(m, function(e2, c) {
            F(d2, c);
            E = new a(d2, k, c);
            I = void 0;
            "d" === c && H(m.d) ? (E.paths = E.initPath(d2, d2.pathArray, m.d), E.toD = m.d, p = 0, I = 1) : d2.attr ? p = d2.attr(c) : (p = parseFloat(B(d2, c)) || 0, "opacity" !== c && (h = "px"));
            I || (I = e2);
            "string" === typeof I && I.match("px") && (I = I.replace(/px/g, ""));
            E.run(p, I, h);
          });
        }, animObject: A, getDeferredAnimation: function(d2, e2, k) {
          var p = A(e2), h = 0, m = 0;
          (k ? [k] : d2.series).forEach(function(d3) {
            d3 = A(d3.options.animation);
            h = e2 && C(e2.defer) ? p.defer : Math.max(h, d3.duration + d3.defer);
            m = Math.min(p.duration, d3.duration);
          });
          d2.renderer.forExport && (h = 0);
          return { defer: Math.max(0, h - m), duration: Math.min(h, m) };
        }, setAnimation: function(e2, m) {
          m.renderer.globalAnimation = d(e2, m.options.chart.animation, true);
        }, stop: F };
      });
      K(g, "Core/Renderer/HTML/AST.js", [g["Core/Globals.js"], g["Core/Utilities.js"]], function(a, g2) {
        var A = a.SVG_NS, F = g2.attr, C = g2.createElement, B = g2.css, H = g2.error, t = g2.isFunction, r = g2.isString, l = g2.objectEach, e = g2.splat, d = (g2 = a.win.trustedTypes) && t(g2.createPolicy) && g2.createPolicy("highcharts", { createHTML: function(d2) {
          return d2;
        } }), h = d ? d.createHTML("") : "";
        try {
          var m = !!new DOMParser().parseFromString(h, "text/html");
        } catch (k) {
          m = false;
        }
        t = function() {
          function k(d2) {
            this.nodes = "string" === typeof d2 ? this.parseMarkup(d2) : d2;
          }
          k.filterUserAttributes = function(d2) {
            l(d2, function(e2, h2) {
              var m2 = true;
              -1 === k.allowedAttributes.indexOf(h2) && (m2 = false);
              -1 !== ["background", "dynsrc", "href", "lowsrc", "src"].indexOf(h2) && (m2 = r(e2) && k.allowedReferences.some(function(d3) {
                return 0 === e2.indexOf(d3);
              }));
              m2 || (H(33, false, void 0, { "Invalid attribute in config": "".concat(h2) }), delete d2[h2]);
              r(e2) && d2[h2] && (d2[h2] = e2.replace(/</g, "&lt;"));
            });
            return d2;
          };
          k.parseStyle = function(d2) {
            return d2.split(";").reduce(function(d3, e2) {
              e2 = e2.split(":").map(function(d4) {
                return d4.trim();
              });
              var k2 = e2.shift();
              k2 && e2.length && (d3[k2.replace(/-([a-z])/g, function(d4) {
                return d4[1].toUpperCase();
              })] = e2.join(":"));
              return d3;
            }, {});
          };
          k.setElementHTML = function(d2, e2) {
            d2.innerHTML = k.emptyHTML;
            e2 && new k(e2).addToDOM(d2);
          };
          k.prototype.addToDOM = function(d2) {
            function h2(d3, m2) {
              var p;
              e(d3).forEach(function(d4) {
                var c = d4.tagName, e2 = d4.textContent ? a.doc.createTextNode(d4.textContent) : void 0, f = k.bypassHTMLFiltering;
                if (c)
                  if ("#text" === c)
                    var n = e2;
                  else if (-1 !== k.allowedTags.indexOf(c) || f) {
                    c = a.doc.createElementNS("svg" === c ? A : m2.namespaceURI || A, c);
                    var b = d4.attributes || {};
                    l(d4, function(c2, f2) {
                      "tagName" !== f2 && "attributes" !== f2 && "children" !== f2 && "style" !== f2 && "textContent" !== f2 && (b[f2] = c2);
                    });
                    F(c, f ? b : k.filterUserAttributes(b));
                    d4.style && B(c, d4.style);
                    e2 && c.appendChild(e2);
                    h2(d4.children || [], c);
                    n = c;
                  } else
                    H(33, false, void 0, { "Invalid tagName in config": c });
                n && m2.appendChild(n);
                p = n;
              });
              return p;
            }
            return h2(this.nodes, d2);
          };
          k.prototype.parseMarkup = function(e2) {
            var h2 = [];
            e2 = e2.trim().replace(/ style=(["'])/g, " data-style=$1");
            if (m)
              e2 = new DOMParser().parseFromString(d ? d.createHTML(e2) : e2, "text/html");
            else {
              var p = C("div");
              p.innerHTML = e2;
              e2 = { body: p };
            }
            var a2 = function(d2, e3) {
              var c = d2.nodeName.toLowerCase(), h3 = { tagName: c };
              "#text" === c && (h3.textContent = d2.textContent || "");
              if (c = d2.attributes) {
                var f = {};
                [].forEach.call(c, function(b) {
                  "data-style" === b.name ? h3.style = k.parseStyle(b.value) : f[b.name] = b.value;
                });
                h3.attributes = f;
              }
              if (d2.childNodes.length) {
                var n = [];
                [].forEach.call(d2.childNodes, function(b) {
                  a2(b, n);
                });
                n.length && (h3.children = n);
              }
              e3.push(h3);
            };
            [].forEach.call(e2.body.childNodes, function(d2) {
              return a2(d2, h2);
            });
            return h2;
          };
          k.allowedAttributes = "aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align text-anchor textAnchor textLength title type valign width x x1 x2 xlink:href y y1 y2 zIndex".split(" ");
          k.allowedReferences = "https:// http:// mailto: / ../ ./ #".split(" ");
          k.allowedTags = "a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text textPath thead title tbody tspan td th tr u ul #text".split(" ");
          k.emptyHTML = h;
          k.bypassHTMLFiltering = false;
          return k;
        }();
        "";
        return t;
      });
      K(g, "Core/FormatUtilities.js", [g["Core/Defaults.js"], g["Core/Utilities.js"]], function(a, g2) {
        function A(a2, e, d, h) {
          a2 = +a2 || 0;
          e = +e;
          var m = F.lang, k = (a2.toString().split(".")[1] || "").split("e")[0].length, p = a2.toString().split("e"), l = e;
          if (-1 === e)
            e = Math.min(k, 20);
          else if (!H(e))
            e = 2;
          else if (e && p[1] && 0 > p[1]) {
            var g3 = e + +p[1];
            0 <= g3 ? (p[0] = (+p[0]).toExponential(g3).split("e")[0], e = g3) : (p[0] = p[0].split(".")[0] || 0, a2 = 20 > e ? (p[0] * Math.pow(10, p[1])).toFixed(e) : 0, p[1] = 0);
          }
          g3 = (Math.abs(p[1] ? p[0] : a2) + Math.pow(10, -Math.max(
            e,
            k
          ) - 1)).toFixed(e);
          k = String(r(g3));
          var E = 3 < k.length ? k.length % 3 : 0;
          d = t(d, m.decimalPoint);
          h = t(h, m.thousandsSep);
          a2 = (0 > a2 ? "-" : "") + (E ? k.substr(0, E) + h : "");
          a2 = 0 > +p[1] && !l ? "0" : a2 + k.substr(E).replace(/(\d{3})(?=\d)/g, "$1" + h);
          e && (a2 += d + g3.slice(-e));
          p[1] && 0 !== +a2 && (a2 += "e" + p[1]);
          return a2;
        }
        var F = a.defaultOptions, C = a.defaultTime, B = g2.getNestedProperty, H = g2.isNumber, t = g2.pick, r = g2.pInt;
        return { dateFormat: function(a2, e, d) {
          return C.dateFormat(a2, e, d);
        }, format: function(a2, e, d) {
          var h = "{", m = false, k = /f$/, p = /\.([0-9])/, l = F.lang, g3 = d && d.time || C;
          d = d && d.numberFormatter || A;
          for (var E = []; a2; ) {
            var t2 = a2.indexOf(h);
            if (-1 === t2)
              break;
            var y = a2.slice(0, t2);
            if (m) {
              y = y.split(":");
              h = B(y.shift() || "", e);
              if (y.length && "number" === typeof h)
                if (y = y.join(":"), k.test(y)) {
                  var c = parseInt((y.match(p) || ["", "-1"])[1], 10);
                  null !== h && (h = d(h, c, l.decimalPoint, -1 < y.indexOf(",") ? l.thousandsSep : ""));
                } else
                  h = g3.dateFormat(y, h);
              E.push(h);
            } else
              E.push(y);
            a2 = a2.slice(t2 + 1);
            h = (m = !m) ? "}" : "{";
          }
          E.push(a2);
          return E.join("");
        }, numberFormat: A };
      });
      K(
        g,
        "Core/Renderer/RendererUtilities.js",
        [g["Core/Utilities.js"]],
        function(a) {
          var g2 = a.clamp, x = a.pick, F = a.stableSort, C;
          (function(a2) {
            function A(a3, r, l) {
              var e = a3, d = e.reducedLen || r, h = function(d2, e2) {
                return (e2.rank || 0) - (d2.rank || 0);
              }, m = function(d2, e2) {
                return d2.target - e2.target;
              }, k, p = true, D = [], I = 0;
              for (k = a3.length; k--; )
                I += a3[k].size;
              if (I > d) {
                F(a3, h);
                for (I = k = 0; I <= d; )
                  I += a3[k].size, k++;
                D = a3.splice(k - 1, a3.length);
              }
              F(a3, m);
              for (a3 = a3.map(function(d2) {
                return { size: d2.size, targets: [d2.target], align: x(d2.align, 0.5) };
              }); p; ) {
                for (k = a3.length; k--; )
                  d = a3[k], h = (Math.min.apply(0, d.targets) + Math.max.apply(0, d.targets)) / 2, d.pos = g2(h - d.size * d.align, 0, r - d.size);
                k = a3.length;
                for (p = false; k--; )
                  0 < k && a3[k - 1].pos + a3[k - 1].size > a3[k].pos && (a3[k - 1].size += a3[k].size, a3[k - 1].targets = a3[k - 1].targets.concat(a3[k].targets), a3[k - 1].align = 0.5, a3[k - 1].pos + a3[k - 1].size > r && (a3[k - 1].pos = r - a3[k - 1].size), a3.splice(k, 1), p = true);
              }
              e.push.apply(e, D);
              k = 0;
              a3.some(function(d2) {
                var h2 = 0;
                return (d2.targets || []).some(function() {
                  e[k].pos = d2.pos + h2;
                  if ("undefined" !== typeof l && Math.abs(e[k].pos - e[k].target) > l)
                    return e.slice(0, k + 1).forEach(function(d3) {
                      return delete d3.pos;
                    }), e.reducedLen = (e.reducedLen || r) - 0.1 * r, e.reducedLen > 0.1 * r && A(e, r, l), true;
                  h2 += e[k].size;
                  k++;
                  return false;
                });
              });
              F(e, m);
              return e;
            }
            a2.distribute = A;
          })(C || (C = {}));
          return C;
        }
      );
      K(g, "Core/Renderer/SVG/SVGElement.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Utilities.js"]], function(a, g2, x, F) {
        var A = a.animate, B = a.animObject, H = a.stop, t = x.deg2rad, r = x.doc, l = x.svg, e = x.SVG_NS, d = x.win, h = F.addEvent, m = F.attr, k = F.createElement, p = F.css, D = F.defined, I = F.erase, E = F.extend, L = F.fireEvent, y = F.isArray, c = F.isFunction, w = F.isString, f = F.merge, n = F.objectEach, b = F.pick, u = F.pInt, z = F.syncTimeout, q = F.uniqueKey;
        a = function() {
          function a2() {
            this.element = void 0;
            this.onEvents = {};
            this.opacity = 1;
            this.renderer = void 0;
            this.SVG_NS = e;
            this.symbolCustomAttribs = "x y width height r start end innerR anchorX anchorY rounded".split(" ");
          }
          a2.prototype._defaultGetter = function(c2) {
            c2 = b(this[c2 + "Value"], this[c2], this.element ? this.element.getAttribute(c2) : null, 0);
            /^[\-0-9\.]+$/.test(c2) && (c2 = parseFloat(c2));
            return c2;
          };
          a2.prototype._defaultSetter = function(b2, c2, f2) {
            f2.setAttribute(c2, b2);
          };
          a2.prototype.add = function(b2) {
            var c2 = this.renderer, f2 = this.element;
            b2 && (this.parentGroup = b2);
            "undefined" !== typeof this.textStr && "text" === this.element.nodeName && c2.buildText(this);
            this.added = true;
            if (!b2 || b2.handleZ || this.zIndex)
              var d2 = this.zIndexSetter();
            d2 || (b2 ? b2.element : c2.box).appendChild(f2);
            if (this.onAdd)
              this.onAdd();
            return this;
          };
          a2.prototype.addClass = function(b2, c2) {
            var f2 = c2 ? "" : this.attr("class") || "";
            b2 = (b2 || "").split(/ /g).reduce(
              function(b3, c3) {
                -1 === f2.indexOf(c3) && b3.push(c3);
                return b3;
              },
              f2 ? [f2] : []
            ).join(" ");
            b2 !== f2 && this.attr("class", b2);
            return this;
          };
          a2.prototype.afterSetters = function() {
            this.doTransform && (this.updateTransform(), this.doTransform = false);
          };
          a2.prototype.align = function(c2, f2, d2) {
            var n2 = {}, e2 = this.renderer, v = e2.alignedObjects, q2, J, u2;
            if (c2) {
              if (this.alignOptions = c2, this.alignByTranslate = f2, !d2 || w(d2))
                this.alignTo = q2 = d2 || "renderer", I(v, this), v.push(this), d2 = void 0;
            } else
              c2 = this.alignOptions, f2 = this.alignByTranslate, q2 = this.alignTo;
            d2 = b(d2, e2[q2], "scrollablePlotBox" === q2 ? e2.plotBox : void 0, e2);
            q2 = c2.align;
            var a3 = c2.verticalAlign;
            e2 = (d2.x || 0) + (c2.x || 0);
            v = (d2.y || 0) + (c2.y || 0);
            "right" === q2 ? J = 1 : "center" === q2 && (J = 2);
            J && (e2 += (d2.width - (c2.width || 0)) / J);
            n2[f2 ? "translateX" : "x"] = Math.round(e2);
            "bottom" === a3 ? u2 = 1 : "middle" === a3 && (u2 = 2);
            u2 && (v += (d2.height - (c2.height || 0)) / u2);
            n2[f2 ? "translateY" : "y"] = Math.round(v);
            this[this.placed ? "animate" : "attr"](n2);
            this.placed = true;
            this.alignAttr = n2;
            return this;
          };
          a2.prototype.alignSetter = function(b2) {
            var c2 = { left: "start", center: "middle", right: "end" };
            c2[b2] && (this.alignValue = b2, this.element.setAttribute(
              "text-anchor",
              c2[b2]
            ));
          };
          a2.prototype.animate = function(c2, f2, d2) {
            var e2 = this, q2 = B(b(f2, this.renderer.globalAnimation, true));
            f2 = q2.defer;
            b(r.hidden, r.msHidden, r.webkitHidden, false) && (q2.duration = 0);
            0 !== q2.duration ? (d2 && (q2.complete = d2), z(function() {
              e2.element && A(e2, c2, q2);
            }, f2)) : (this.attr(c2, void 0, d2 || q2.complete), n(c2, function(b2, c3) {
              q2.step && q2.step.call(this, b2, { prop: c3, pos: 1, elem: this });
            }, this));
            return this;
          };
          a2.prototype.applyTextOutline = function(b2) {
            var c2 = this.element;
            -1 !== b2.indexOf("contrast") && (b2 = b2.replace(/contrast/g, this.renderer.getContrast(c2.style.fill)));
            var f2 = b2.split(" ");
            b2 = f2[f2.length - 1];
            if ((f2 = f2[0]) && "none" !== f2 && x.svg) {
              this.fakeTS = true;
              f2 = f2.replace(/(^[\d\.]+)(.*?)$/g, function(b3, c3, f3) {
                return 2 * Number(c3) + f3;
              });
              this.removeTextOutline();
              var d2 = r.createElementNS(e, "tspan");
              m(d2, { "class": "highcharts-text-outline", fill: b2, stroke: b2, "stroke-width": f2, "stroke-linejoin": "round" });
              b2 = c2.querySelector("textPath") || c2;
              [].forEach.call(b2.childNodes, function(b3) {
                var c3 = b3.cloneNode(true);
                c3.removeAttribute && ["fill", "stroke", "stroke-width", "stroke"].forEach(function(b4) {
                  return c3.removeAttribute(b4);
                });
                d2.appendChild(c3);
              });
              var n2 = 0;
              [].forEach.call(b2.querySelectorAll("text tspan"), function(b3) {
                n2 += Number(b3.getAttribute("dy"));
              });
              f2 = r.createElementNS(e, "tspan");
              f2.textContent = "​";
              m(f2, { x: Number(c2.getAttribute("x")), dy: -n2 });
              d2.appendChild(f2);
              b2.insertBefore(d2, b2.firstChild);
            }
          };
          a2.prototype.attr = function(b2, c2, f2, d2) {
            var e2 = this.element, v = this.symbolCustomAttribs, q2, u2 = this, J, a3;
            if ("string" === typeof b2 && "undefined" !== typeof c2) {
              var G = b2;
              b2 = {};
              b2[G] = c2;
            }
            "string" === typeof b2 ? u2 = (this[b2 + "Getter"] || this._defaultGetter).call(
              this,
              b2,
              e2
            ) : (n(b2, function(c3, f3) {
              J = false;
              d2 || H(this, f3);
              this.symbolName && -1 !== v.indexOf(f3) && (q2 || (this.symbolAttr(b2), q2 = true), J = true);
              !this.rotation || "x" !== f3 && "y" !== f3 || (this.doTransform = true);
              J || (a3 = this[f3 + "Setter"] || this._defaultSetter, a3.call(this, c3, f3, e2), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(f3) && this.updateShadows(f3, c3, a3));
            }, this), this.afterSetters());
            f2 && f2.call(this);
            return u2;
          };
          a2.prototype.clip = function(b2) {
            return this.attr("clip-path", b2 ? "url(" + this.renderer.url + "#" + b2.id + ")" : "none");
          };
          a2.prototype.crisp = function(b2, c2) {
            c2 = c2 || b2.strokeWidth || 0;
            var f2 = Math.round(c2) % 2 / 2;
            b2.x = Math.floor(b2.x || this.x || 0) + f2;
            b2.y = Math.floor(b2.y || this.y || 0) + f2;
            b2.width = Math.floor((b2.width || this.width || 0) - 2 * f2);
            b2.height = Math.floor((b2.height || this.height || 0) - 2 * f2);
            D(b2.strokeWidth) && (b2.strokeWidth = c2);
            return b2;
          };
          a2.prototype.complexColor = function(b2, c2, d2) {
            var e2 = this.renderer, u2, v, a3, J, h2, z2, G, k2, M, w2, m2 = [], p2;
            L(this.renderer, "complexColor", { args: arguments }, function() {
              b2.radialGradient ? v = "radialGradient" : b2.linearGradient && (v = "linearGradient");
              if (v) {
                a3 = b2[v];
                h2 = e2.gradients;
                z2 = b2.stops;
                M = d2.radialReference;
                y(a3) && (b2[v] = a3 = { x1: a3[0], y1: a3[1], x2: a3[2], y2: a3[3], gradientUnits: "userSpaceOnUse" });
                "radialGradient" === v && M && !D(a3.gradientUnits) && (J = a3, a3 = f(a3, e2.getRadialAttr(M, J), { gradientUnits: "userSpaceOnUse" }));
                n(a3, function(b3, c3) {
                  "id" !== c3 && m2.push(c3, b3);
                });
                n(z2, function(b3) {
                  m2.push(b3);
                });
                m2 = m2.join(",");
                if (h2[m2])
                  w2 = h2[m2].attr("id");
                else {
                  a3.id = w2 = q();
                  var U = h2[m2] = e2.createElement(v).attr(a3).add(e2.defs);
                  U.radAttr = J;
                  U.stops = [];
                  z2.forEach(function(b3) {
                    0 === b3[1].indexOf("rgba") ? (u2 = g2.parse(b3[1]), G = u2.get("rgb"), k2 = u2.get("a")) : (G = b3[1], k2 = 1);
                    b3 = e2.createElement("stop").attr({ offset: b3[0], "stop-color": G, "stop-opacity": k2 }).add(U);
                    U.stops.push(b3);
                  });
                }
                p2 = "url(" + e2.url + "#" + w2 + ")";
                d2.setAttribute(c2, p2);
                d2.gradient = m2;
                b2.toString = function() {
                  return p2;
                };
              }
            });
          };
          a2.prototype.css = function(b2) {
            var c2 = this.styles, d2 = {}, e2 = this.element, q2 = !c2;
            b2.color && (b2.fill = b2.color);
            c2 && n(b2, function(b3, f2) {
              c2 && c2[f2] !== b3 && (d2[f2] = b3, q2 = true);
            });
            if (q2) {
              c2 && (b2 = E(c2, d2));
              if (null === b2.width || "auto" === b2.width)
                delete this.textWidth;
              else if ("text" === e2.nodeName.toLowerCase() && b2.width)
                var v = this.textWidth = u(b2.width);
              this.styles = b2;
              v && !l && this.renderer.forExport && delete b2.width;
              var a3 = f(b2);
              e2.namespaceURI === this.SVG_NS && ["textOutline", "textOverflow", "width"].forEach(function(b3) {
                return a3 && delete a3[b3];
              });
              p(e2, a3);
              this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), b2.textOutline && this.applyTextOutline(b2.textOutline));
            }
            return this;
          };
          a2.prototype.dashstyleSetter = function(c2) {
            var f2 = this["stroke-width"];
            "inherit" === f2 && (f2 = 1);
            if (c2 = c2 && c2.toLowerCase()) {
              var d2 = c2.replace(
                "shortdashdotdot",
                "3,1,1,1,1,1,"
              ).replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
              for (c2 = d2.length; c2--; )
                d2[c2] = "" + u(d2[c2]) * b(f2, NaN);
              c2 = d2.join(",").replace(/NaN/g, "none");
              this.element.setAttribute("stroke-dasharray", c2);
            }
          };
          a2.prototype.destroy = function() {
            var b2 = this, c2 = b2.element || {}, f2 = b2.renderer, d2 = c2.ownerSVGElement, e2 = f2.isSVG && "SPAN" === c2.nodeName && b2.parentGroup || void 0;
            c2.onclick = c2.onmouseout = c2.onmouseover = c2.onmousemove = c2.point = null;
            H(b2);
            if (b2.clipPath && d2) {
              var v = b2.clipPath;
              [].forEach.call(d2.querySelectorAll("[clip-path],[CLIP-PATH]"), function(b3) {
                -1 < b3.getAttribute("clip-path").indexOf(v.element.id) && b3.removeAttribute("clip-path");
              });
              b2.clipPath = v.destroy();
            }
            if (b2.stops) {
              for (d2 = 0; d2 < b2.stops.length; d2++)
                b2.stops[d2].destroy();
              b2.stops.length = 0;
              b2.stops = void 0;
            }
            b2.safeRemoveChild(c2);
            for (f2.styledMode || b2.destroyShadows(); e2 && e2.div && 0 === e2.div.childNodes.length; )
              c2 = e2.parentGroup, b2.safeRemoveChild(e2.div), delete e2.div, e2 = c2;
            b2.alignTo && I(f2.alignedObjects, b2);
            n(b2, function(c3, f3) {
              b2[f3] && b2[f3].parentGroup === b2 && b2[f3].destroy && b2[f3].destroy();
              delete b2[f3];
            });
          };
          a2.prototype.destroyShadows = function() {
            (this.shadows || []).forEach(function(b2) {
              this.safeRemoveChild(b2);
            }, this);
            this.shadows = void 0;
          };
          a2.prototype.dSetter = function(b2, c2, f2) {
            y(b2) && ("string" === typeof b2[0] && (b2 = this.renderer.pathToSegments(b2)), this.pathArray = b2, b2 = b2.reduce(function(b3, c3, f3) {
              return c3 && c3.join ? (f3 ? b3 + " " : "") + c3.join(" ") : (c3 || "").toString();
            }, ""));
            /(NaN| {2}|^$)/.test(b2) && (b2 = "M 0 0");
            this[c2] !== b2 && (f2.setAttribute(c2, b2), this[c2] = b2);
          };
          a2.prototype.fadeOut = function(c2) {
            var f2 = this;
            f2.animate({ opacity: 0 }, { duration: b(c2, 150), complete: function() {
              f2.hide();
            } });
          };
          a2.prototype.fillSetter = function(b2, c2, f2) {
            "string" === typeof b2 ? f2.setAttribute(c2, b2) : b2 && this.complexColor(b2, c2, f2);
          };
          a2.prototype.getBBox = function(f2, d2) {
            var n2 = this.alignValue, e2 = this.element, q2 = this.renderer, v = this.styles, u2 = this.textStr, h2 = q2.cache, z2 = q2.cacheKeys, k2 = e2.namespaceURI === this.SVG_NS;
            d2 = b(d2, this.rotation, 0);
            var G = q2.styledMode ? e2 && a2.prototype.getStyle.call(
              e2,
              "font-size"
            ) : v && v.fontSize, m2;
            if (D(u2)) {
              var M = u2.toString();
              -1 === M.indexOf("<") && (M = M.replace(/[0-9]/g, "0"));
              M += ["", d2, G, this.textWidth, n2, v && v.textOverflow, v && v.fontWeight].join();
            }
            M && !f2 && (m2 = h2[M]);
            if (!m2) {
              if (k2 || q2.forExport) {
                try {
                  var w2 = this.fakeTS && function(b2) {
                    var c2 = e2.querySelector(".highcharts-text-outline");
                    c2 && p(c2, { display: b2 });
                  };
                  c(w2) && w2("none");
                  m2 = e2.getBBox ? E({}, e2.getBBox()) : { width: e2.offsetWidth, height: e2.offsetHeight, x: 0, y: 0 };
                  c(w2) && w2("");
                } catch (V) {
                  "";
                }
                if (!m2 || 0 > m2.width)
                  m2 = { x: 0, y: 0, width: 0, height: 0 };
              } else
                m2 = this.htmlGetBBox();
              if (q2.isSVG && (q2 = m2.width, f2 = m2.height, k2 && (m2.height = f2 = { "11px,17": 14, "13px,20": 16 }["" + (G || "") + ",".concat(Math.round(f2))] || f2), d2)) {
                k2 = Number(e2.getAttribute("y") || 0) - m2.y;
                n2 = { right: 1, center: 0.5 }[n2 || 0] || 0;
                v = d2 * t;
                G = (d2 - 90) * t;
                var J = q2 * Math.cos(v);
                d2 = q2 * Math.sin(v);
                w2 = Math.cos(G);
                v = Math.sin(G);
                q2 = m2.x + n2 * (q2 - J) + k2 * w2;
                G = q2 + J;
                w2 = G - f2 * w2;
                J = w2 - J;
                k2 = m2.y + k2 - n2 * d2 + k2 * v;
                n2 = k2 + d2;
                f2 = n2 - f2 * v;
                d2 = f2 - d2;
                m2.x = Math.min(q2, G, w2, J);
                m2.y = Math.min(k2, n2, f2, d2);
                m2.width = Math.max(q2, G, w2, J) - m2.x;
                m2.height = Math.max(k2, n2, f2, d2) - m2.y;
              }
              if (M && ("" === u2 || 0 < m2.height)) {
                for (; 250 < z2.length; )
                  delete h2[z2.shift()];
                h2[M] || z2.push(M);
                h2[M] = m2;
              }
            }
            return m2;
          };
          a2.prototype.getStyle = function(b2) {
            return d.getComputedStyle(this.element || this, "").getPropertyValue(b2);
          };
          a2.prototype.hasClass = function(b2) {
            return -1 !== ("" + this.attr("class")).split(" ").indexOf(b2);
          };
          a2.prototype.hide = function() {
            return this.attr({ visibility: "hidden" });
          };
          a2.prototype.htmlGetBBox = function() {
            return { height: 0, width: 0, x: 0, y: 0 };
          };
          a2.prototype.init = function(b2, c2) {
            this.element = "span" === c2 ? k(c2) : r.createElementNS(this.SVG_NS, c2);
            this.renderer = b2;
            L(this, "afterInit");
          };
          a2.prototype.on = function(b2, c2) {
            var f2 = this.onEvents;
            if (f2[b2])
              f2[b2]();
            f2[b2] = h(this.element, b2, c2);
            return this;
          };
          a2.prototype.opacitySetter = function(b2, c2, f2) {
            this.opacity = b2 = Number(Number(b2).toFixed(3));
            f2.setAttribute(c2, b2);
          };
          a2.prototype.removeClass = function(b2) {
            return this.attr("class", ("" + this.attr("class")).replace(w(b2) ? new RegExp("(^| )".concat(b2, "( |$)")) : b2, " ").replace(/ +/g, " ").trim());
          };
          a2.prototype.removeTextOutline = function() {
            var b2 = this.element.querySelector("tspan.highcharts-text-outline");
            b2 && this.safeRemoveChild(b2);
          };
          a2.prototype.safeRemoveChild = function(b2) {
            var c2 = b2.parentNode;
            c2 && c2.removeChild(b2);
          };
          a2.prototype.setRadialReference = function(b2) {
            var c2 = this.element.gradient && this.renderer.gradients[this.element.gradient];
            this.element.radialReference = b2;
            c2 && c2.radAttr && c2.animate(this.renderer.getRadialAttr(b2, c2.radAttr));
            return this;
          };
          a2.prototype.setTextPath = function(b2, c2) {
            var d2 = this;
            c2 = f(true, { enabled: true, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } }, c2);
            var n2 = this.renderer.url, e2 = this.text || this, v = e2.textPath, u2 = c2.attributes, a3 = c2.enabled;
            b2 = b2 || v && v.path;
            v && v.undo();
            b2 && a3 ? (c2 = h(e2, "afterModifyTree", function(c3) {
              if (b2 && a3) {
                var f2 = b2.attr("id");
                f2 || b2.attr("id", f2 = q());
                var v2 = { x: 0, y: 0 };
                D(u2.dx) && (v2.dx = u2.dx, delete u2.dx);
                D(u2.dy) && (v2.dy = u2.dy, delete u2.dy);
                e2.attr(v2);
                d2.attr({ transform: "" });
                d2.box && (d2.box = d2.box.destroy());
                v2 = c3.nodes.slice(0);
                c3.nodes.length = 0;
                c3.nodes[0] = { tagName: "textPath", attributes: E(u2, { "text-anchor": u2.textAnchor, href: "" + n2 + "#".concat(f2) }), children: v2 };
              }
            }), e2.textPath = { path: b2, undo: c2 }) : (e2.attr({ dx: 0, dy: 0 }), delete e2.textPath);
            this.added && (e2.textCache = "", this.renderer.buildText(e2));
            return this;
          };
          a2.prototype.shadow = function(b2, c2, f2) {
            var d2 = [], e2 = this.element, v = this.oldShadowOptions, q2 = this.parentGroup, u2 = q2 && 90 === q2.rotation;
            q2 = { color: "#000000", offsetX: u2 ? -1 : 1, offsetY: u2 ? -1 : 1, opacity: 0.15, width: 3 };
            var a3 = false, h2;
            true === b2 ? h2 = q2 : "object" === typeof b2 && (h2 = E(q2, b2));
            h2 && (h2 && v && n(h2, function(b3, c3) {
              b3 !== v[c3] && (a3 = true);
            }), a3 && this.destroyShadows(), this.oldShadowOptions = h2);
            if (!h2)
              this.destroyShadows();
            else if (!this.shadows) {
              q2 = h2.opacity / h2.width;
              var G = u2 ? "translate(".concat(h2.offsetY, ", ").concat(h2.offsetX, ")") : "translate(".concat(
                h2.offsetX,
                ", "
              ).concat(h2.offsetY, ")");
              for (u2 = 1; u2 <= h2.width; u2++) {
                var k2 = e2.cloneNode(false);
                var z2 = 2 * h2.width + 1 - 2 * u2;
                m(k2, { stroke: b2.color || "#000000", "stroke-opacity": q2 * u2, "stroke-width": z2, transform: G, fill: "none" });
                k2.setAttribute("class", (k2.getAttribute("class") || "") + " highcharts-shadow");
                f2 && (m(k2, "height", Math.max(m(k2, "height") - z2, 0)), k2.cutHeight = z2);
                c2 ? c2.element.appendChild(k2) : e2.parentNode && e2.parentNode.insertBefore(k2, e2);
                d2.push(k2);
              }
              this.shadows = d2;
            }
            return this;
          };
          a2.prototype.show = function(b2) {
            void 0 === b2 && (b2 = true);
            return this.attr({ visibility: b2 ? "inherit" : "visible" });
          };
          a2.prototype["stroke-widthSetter"] = function(b2, c2, f2) {
            this[c2] = b2;
            f2.setAttribute(c2, b2);
          };
          a2.prototype.strokeWidth = function() {
            if (!this.renderer.styledMode)
              return this["stroke-width"] || 0;
            var b2 = this.getStyle("stroke-width"), c2 = 0;
            if (b2.indexOf("px") === b2.length - 2)
              c2 = u(b2);
            else if ("" !== b2) {
              var f2 = r.createElementNS(e, "rect");
              m(f2, { width: b2, "stroke-width": 0 });
              this.element.parentNode.appendChild(f2);
              c2 = f2.getBBox().width;
              f2.parentNode.removeChild(f2);
            }
            return c2;
          };
          a2.prototype.symbolAttr = function(c2) {
            var f2 = this;
            "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(d2) {
              f2[d2] = b(c2[d2], f2[d2]);
            });
            f2.attr({ d: f2.renderer.symbols[f2.symbolName](f2.x, f2.y, f2.width, f2.height, f2) });
          };
          a2.prototype.textSetter = function(b2) {
            b2 !== this.textStr && (delete this.textPxLength, this.textStr = b2, this.added && this.renderer.buildText(this));
          };
          a2.prototype.titleSetter = function(c2) {
            var f2 = this.element, d2 = f2.getElementsByTagName("title")[0] || r.createElementNS(this.SVG_NS, "title");
            f2.insertBefore ? f2.insertBefore(d2, f2.firstChild) : f2.appendChild(d2);
            d2.textContent = String(b(c2, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
          };
          a2.prototype.toFront = function() {
            var b2 = this.element;
            b2.parentNode.appendChild(b2);
            return this;
          };
          a2.prototype.translate = function(b2, c2) {
            return this.attr({ translateX: b2, translateY: c2 });
          };
          a2.prototype.updateShadows = function(b2, c2, f2) {
            var d2 = this.shadows;
            if (d2)
              for (var e2 = d2.length; e2--; )
                f2.call(d2[e2], "height" === b2 ? Math.max(c2 - (d2[e2].cutHeight || 0), 0) : "d" === b2 ? this.d : c2, b2, d2[e2]);
          };
          a2.prototype.updateTransform = function() {
            var c2 = this.element, f2 = this.matrix, d2 = this.rotation;
            d2 = void 0 === d2 ? 0 : d2;
            var e2 = this.scaleX, n2 = this.scaleY, v = this.translateX, q2 = this.translateY;
            v = ["translate(" + (void 0 === v ? 0 : v) + "," + (void 0 === q2 ? 0 : q2) + ")"];
            D(f2) && v.push("matrix(" + f2.join(",") + ")");
            d2 && v.push("rotate(" + d2 + " " + b(this.rotationOriginX, c2.getAttribute("x"), 0) + " " + b(this.rotationOriginY, c2.getAttribute("y") || 0) + ")");
            (D(e2) || D(n2)) && v.push("scale(" + b(e2, 1) + " " + b(n2, 1) + ")");
            v.length && !(this.text || this).textPath && c2.setAttribute("transform", v.join(" "));
          };
          a2.prototype.visibilitySetter = function(b2, c2, f2) {
            "inherit" === b2 ? f2.removeAttribute(c2) : this[c2] !== b2 && f2.setAttribute(c2, b2);
            this[c2] = b2;
          };
          a2.prototype.xGetter = function(b2) {
            "circle" === this.element.nodeName && ("x" === b2 ? b2 = "cx" : "y" === b2 && (b2 = "cy"));
            return this._defaultGetter(b2);
          };
          a2.prototype.zIndexSetter = function(b2, c2) {
            var f2 = this.renderer, d2 = this.parentGroup, e2 = (d2 || f2).element || f2.box, v = this.element;
            f2 = e2 === f2.box;
            var n2 = false;
            var q2 = this.added;
            var a3;
            D(b2) ? (v.setAttribute("data-z-index", b2), b2 = +b2, this[c2] === b2 && (q2 = false)) : D(this[c2]) && v.removeAttribute("data-z-index");
            this[c2] = b2;
            if (q2) {
              (b2 = this.zIndex) && d2 && (d2.handleZ = true);
              c2 = e2.childNodes;
              for (a3 = c2.length - 1; 0 <= a3 && !n2; a3--) {
                d2 = c2[a3];
                q2 = d2.getAttribute("data-z-index");
                var h2 = !D(q2);
                if (d2 !== v) {
                  if (0 > b2 && h2 && !f2 && !a3)
                    e2.insertBefore(v, c2[a3]), n2 = true;
                  else if (u(q2) <= b2 || h2 && (!D(b2) || 0 <= b2))
                    e2.insertBefore(v, c2[a3 + 1] || null), n2 = true;
                }
              }
              n2 || (e2.insertBefore(v, c2[f2 ? 3 : 0] || null), n2 = true);
            }
            return n2;
          };
          return a2;
        }();
        a.prototype.strokeSetter = a.prototype.fillSetter;
        a.prototype.yGetter = a.prototype.xGetter;
        a.prototype.matrixSetter = a.prototype.rotationOriginXSetter = a.prototype.rotationOriginYSetter = a.prototype.rotationSetter = a.prototype.scaleXSetter = a.prototype.scaleYSetter = a.prototype.translateXSetter = a.prototype.translateYSetter = a.prototype.verticalAlignSetter = function(b2, c2) {
          this[c2] = b2;
          this.doTransform = true;
        };
        "";
        return a;
      });
      K(g, "Core/Renderer/RendererRegistry.js", [g["Core/Globals.js"]], function(a) {
        var g2;
        (function(g3) {
          g3.rendererTypes = {};
          var A;
          g3.getRendererType = function(a2) {
            void 0 === a2 && (a2 = A);
            return g3.rendererTypes[a2] || g3.rendererTypes[A];
          };
          g3.registerRendererType = function(x, B, H) {
            g3.rendererTypes[x] = B;
            if (!A || H)
              A = x, a.Renderer = B;
          };
        })(g2 || (g2 = {}));
        return g2;
      });
      K(g, "Core/Renderer/SVG/SVGLabel.js", [g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]], function(a, g2) {
        var A = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(e, d) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, e2) {
              d2.__proto__ = e2;
            } || function(d2, e2) {
              for (var a3 in e2)
                e2.hasOwnProperty(a3) && (d2[a3] = e2[a3]);
            };
            return a2(e, d);
          };
          return function(e, d) {
            function h() {
              this.constructor = e;
            }
            a2(e, d);
            e.prototype = null === d ? Object.create(d) : (h.prototype = d.prototype, new h());
          };
        }(), F = g2.defined, C = g2.extend, B = g2.isNumber, H = g2.merge, t = g2.pick, r = g2.removeEvent;
        return function(g3) {
          function e(d, a2, m, k, p, l, I, E, r2, y) {
            var c = g3.call(this) || this;
            c.paddingLeftSetter = c.paddingSetter;
            c.paddingRightSetter = c.paddingSetter;
            c.init(d, "g");
            c.textStr = a2;
            c.x = m;
            c.y = k;
            c.anchorX = l;
            c.anchorY = I;
            c.baseline = r2;
            c.className = y;
            c.addClass("button" === y ? "highcharts-no-tooltip" : "highcharts-label");
            y && c.addClass("highcharts-" + y);
            c.text = d.text(void 0, 0, 0, E).attr({ zIndex: 1 });
            var h;
            "string" === typeof p && ((h = /^url\((.*?)\)$/.test(p)) || c.renderer.symbols[p]) && (c.symbolKey = p);
            c.bBox = e.emptyBBox;
            c.padding = 3;
            c.baselineOffset = 0;
            c.needsBox = d.styledMode || h;
            c.deferredAttr = {};
            c.alignFactor = 0;
            return c;
          }
          A(e, g3);
          e.prototype.alignSetter = function(d) {
            d = { left: 0, center: 0.5, right: 1 }[d];
            d !== this.alignFactor && (this.alignFactor = d, this.bBox && B(this.xSetting) && this.attr({ x: this.xSetting }));
          };
          e.prototype.anchorXSetter = function(d, e2) {
            this.anchorX = d;
            this.boxAttr(e2, Math.round(d) - this.getCrispAdjust() - this.xSetting);
          };
          e.prototype.anchorYSetter = function(d, e2) {
            this.anchorY = d;
            this.boxAttr(e2, d - this.ySetting);
          };
          e.prototype.boxAttr = function(d, e2) {
            this.box ? this.box.attr(d, e2) : this.deferredAttr[d] = e2;
          };
          e.prototype.css = function(d) {
            if (d) {
              var h = {};
              d = H(d);
              e.textProps.forEach(function(e2) {
                "undefined" !== typeof d[e2] && (h[e2] = d[e2], delete d[e2]);
              });
              this.text.css(h);
              "fontSize" in h || "fontWeight" in h ? this.updateTextPadding() : ("width" in h || "textOverflow" in h) && this.updateBoxSize();
            }
            return a.prototype.css.call(this, d);
          };
          e.prototype.destroy = function() {
            r(this.element, "mouseenter");
            r(this.element, "mouseleave");
            this.text && this.text.destroy();
            this.box && (this.box = this.box.destroy());
            a.prototype.destroy.call(this);
          };
          e.prototype.fillSetter = function(d, e2) {
            d && (this.needsBox = true);
            this.fill = d;
            this.boxAttr(e2, d);
          };
          e.prototype.getBBox = function() {
            this.textStr && 0 === this.bBox.width && 0 === this.bBox.height && this.updateBoxSize();
            var d = this.padding, e2 = t(this.paddingLeft, d);
            return { width: this.width, height: this.height, x: this.bBox.x - e2, y: this.bBox.y - d };
          };
          e.prototype.getCrispAdjust = function() {
            return this.renderer.styledMode && this.box ? this.box.strokeWidth() % 2 / 2 : (this["stroke-width"] ? parseInt(this["stroke-width"], 10) : 0) % 2 / 2;
          };
          e.prototype.heightSetter = function(d) {
            this.heightSetting = d;
          };
          e.prototype.onAdd = function() {
            this.text.add(this);
            this.attr({ text: t(this.textStr, ""), x: this.x || 0, y: this.y || 0 });
            this.box && F(this.anchorX) && this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
          };
          e.prototype.paddingSetter = function(d, e2) {
            B(d) ? d !== this[e2] && (this[e2] = d, this.updateTextPadding()) : this[e2] = void 0;
          };
          e.prototype.rSetter = function(d, e2) {
            this.boxAttr(
              e2,
              d
            );
          };
          e.prototype.shadow = function(d) {
            d && !this.renderer.styledMode && (this.updateBoxSize(), this.box && this.box.shadow(d));
            return this;
          };
          e.prototype.strokeSetter = function(d, e2) {
            this.stroke = d;
            this.boxAttr(e2, d);
          };
          e.prototype["stroke-widthSetter"] = function(d, e2) {
            d && (this.needsBox = true);
            this["stroke-width"] = d;
            this.boxAttr(e2, d);
          };
          e.prototype["text-alignSetter"] = function(d) {
            this.textAlign = d;
          };
          e.prototype.textSetter = function(d) {
            "undefined" !== typeof d && this.text.attr({ text: d });
            this.updateTextPadding();
          };
          e.prototype.updateBoxSize = function() {
            var d = this.text, a2 = d.element.style, m = {}, k = this.padding, p = this.bBox = B(this.widthSetting) && B(this.heightSetting) && !this.textAlign || !F(d.textStr) ? e.emptyBBox : d.getBBox();
            this.width = this.getPaddedWidth();
            this.height = (this.heightSetting || p.height || 0) + 2 * k;
            a2 = this.renderer.fontMetrics(a2 && a2.fontSize, d);
            this.baselineOffset = k + Math.min((this.text.firstLineMetrics || a2).b, p.height || Infinity);
            this.heightSetting && (this.baselineOffset += (this.heightSetting - a2.h) / 2);
            this.needsBox && !d.textPath && (this.box || (d = this.box = this.symbolKey ? this.renderer.symbol(this.symbolKey) : this.renderer.rect(), d.addClass(("button" === this.className ? "" : "highcharts-label-box") + (this.className ? " highcharts-" + this.className + "-box" : "")), d.add(this)), d = this.getCrispAdjust(), m.x = d, m.y = (this.baseline ? -this.baselineOffset : 0) + d, m.width = Math.round(this.width), m.height = Math.round(this.height), this.box.attr(C(m, this.deferredAttr)), this.deferredAttr = {});
          };
          e.prototype.updateTextPadding = function() {
            var d = this.text;
            if (!d.textPath) {
              this.updateBoxSize();
              var e2 = this.baseline ? 0 : this.baselineOffset, a2 = t(this.paddingLeft, this.padding);
              F(this.widthSetting) && this.bBox && ("center" === this.textAlign || "right" === this.textAlign) && (a2 += { center: 0.5, right: 1 }[this.textAlign] * (this.widthSetting - this.bBox.width));
              if (a2 !== d.x || e2 !== d.y)
                d.attr("x", a2), d.hasBoxWidthChanged && (this.bBox = d.getBBox(true)), "undefined" !== typeof e2 && d.attr("y", e2);
              d.x = a2;
              d.y = e2;
            }
          };
          e.prototype.widthSetter = function(d) {
            this.widthSetting = B(d) ? d : void 0;
          };
          e.prototype.getPaddedWidth = function() {
            var d = this.padding, e2 = t(this.paddingLeft, d);
            d = t(this.paddingRight, d);
            return (this.widthSetting || this.bBox.width || 0) + e2 + d;
          };
          e.prototype.xSetter = function(d) {
            this.x = d;
            this.alignFactor && (d -= this.alignFactor * this.getPaddedWidth(), this["forceAnimate:x"] = true);
            this.xSetting = Math.round(d);
            this.attr("translateX", this.xSetting);
          };
          e.prototype.ySetter = function(d) {
            this.ySetting = this.y = Math.round(d);
            this.attr("translateY", this.ySetting);
          };
          e.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
          e.textProps = "color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width".split(" ");
          return e;
        }(a);
      });
      K(g, "Core/Renderer/SVG/Symbols.js", [g["Core/Utilities.js"]], function(a) {
        function g2(a2, g3, l, e, d) {
          var h = [];
          if (d) {
            var m = d.start || 0, k = H(d.r, l);
            l = H(d.r, e || l);
            var p = (d.end || 0) - 1e-3;
            e = d.innerR;
            var D = H(d.open, 1e-3 > Math.abs((d.end || 0) - m - 2 * Math.PI)), I = Math.cos(m), E = Math.sin(m), r = Math.cos(p), y = Math.sin(p);
            m = H(d.longArc, 1e-3 > p - m - Math.PI ? 0 : 1);
            h.push(["M", a2 + k * I, g3 + l * E], ["A", k, l, 0, m, H(d.clockwise, 1), a2 + k * r, g3 + l * y]);
            C(e) && h.push(D ? ["M", a2 + e * r, g3 + e * y] : ["L", a2 + e * r, g3 + e * y], ["A", e, e, 0, m, C(d.clockwise) ? 1 - d.clockwise : 0, a2 + e * I, g3 + e * E]);
            D || h.push(["Z"]);
          }
          return h;
        }
        function x(a2, g3, l, e, d) {
          return d && d.r ? F(a2, g3, l, e, d) : [["M", a2, g3], ["L", a2 + l, g3], ["L", a2 + l, g3 + e], ["L", a2, g3 + e], ["Z"]];
        }
        function F(a2, g3, l, e, d) {
          d = d && d.r || 0;
          return [["M", a2 + d, g3], ["L", a2 + l - d, g3], ["C", a2 + l, g3, a2 + l, g3, a2 + l, g3 + d], ["L", a2 + l, g3 + e - d], ["C", a2 + l, g3 + e, a2 + l, g3 + e, a2 + l - d, g3 + e], ["L", a2 + d, g3 + e], ["C", a2, g3 + e, a2, g3 + e, a2, g3 + e - d], ["L", a2, g3 + d], ["C", a2, g3, a2, g3, a2 + d, g3]];
        }
        var C = a.defined, B = a.isNumber, H = a.pick;
        return { arc: g2, callout: function(a2, g3, l, e, d) {
          var h = Math.min(d && d.r || 0, l, e), m = h + 6, k = d && d.anchorX;
          d = d && d.anchorY || 0;
          var p = F(a2, g3, l, e, { r: h });
          if (!B(k))
            return p;
          a2 + k >= l ? d > g3 + m && d < g3 + e - m ? p.splice(3, 1, ["L", a2 + l, d - 6], ["L", a2 + l + 6, d], ["L", a2 + l, d + 6], ["L", a2 + l, g3 + e - h]) : p.splice(3, 1, ["L", a2 + l, e / 2], ["L", k, d], ["L", a2 + l, e / 2], ["L", a2 + l, g3 + e - h]) : 0 >= a2 + k ? d > g3 + m && d < g3 + e - m ? p.splice(7, 1, ["L", a2, d + 6], ["L", a2 - 6, d], ["L", a2, d - 6], ["L", a2, g3 + h]) : p.splice(7, 1, ["L", a2, e / 2], ["L", k, d], ["L", a2, e / 2], ["L", a2, g3 + h]) : d && d > e && k > a2 + m && k < a2 + l - m ? p.splice(5, 1, ["L", k + 6, g3 + e], ["L", k, g3 + e + 6], ["L", k - 6, g3 + e], ["L", a2 + h, g3 + e]) : d && 0 > d && k > a2 + m && k < a2 + l - m && p.splice(
            1,
            1,
            ["L", k - 6, g3],
            ["L", k, g3 - 6],
            ["L", k + 6, g3],
            ["L", l - h, g3]
          );
          return p;
        }, circle: function(a2, r, l, e) {
          return g2(a2 + l / 2, r + e / 2, l / 2, e / 2, { start: 0.5 * Math.PI, end: 2.5 * Math.PI, open: false });
        }, diamond: function(a2, g3, l, e) {
          return [["M", a2 + l / 2, g3], ["L", a2 + l, g3 + e / 2], ["L", a2 + l / 2, g3 + e], ["L", a2, g3 + e / 2], ["Z"]];
        }, rect: x, roundedRect: F, square: x, triangle: function(a2, g3, l, e) {
          return [["M", a2 + l / 2, g3], ["L", a2 + l, g3 + e], ["L", a2, g3 + e], ["Z"]];
        }, "triangle-down": function(a2, g3, l, e) {
          return [["M", a2, g3], ["L", a2 + l, g3], ["L", a2 + l / 2, g3 + e], ["Z"]];
        } };
      });
      K(g, "Core/Renderer/SVG/TextBuilder.js", [
        g["Core/Renderer/HTML/AST.js"],
        g["Core/Globals.js"],
        g["Core/Utilities.js"]
      ], function(a, g2, x) {
        var A = g2.doc, C = g2.SVG_NS, B = g2.win, H = x.attr, t = x.extend, r = x.fireEvent, l = x.isString, e = x.objectEach, d = x.pick;
        return function() {
          function h(d2) {
            var e2 = d2.styles;
            this.renderer = d2.renderer;
            this.svgElement = d2;
            this.width = d2.textWidth;
            this.textLineHeight = e2 && e2.lineHeight;
            this.textOutline = e2 && e2.textOutline;
            this.ellipsis = !(!e2 || "ellipsis" !== e2.textOverflow);
            this.noWrap = !(!e2 || "nowrap" !== e2.whiteSpace);
            this.fontSize = e2 && e2.fontSize;
          }
          h.prototype.buildSVG = function() {
            var e2 = this.svgElement, k = e2.element, h2 = e2.renderer, g3 = d(e2.textStr, "").toString(), I = -1 !== g3.indexOf("<"), E = k.childNodes;
            h2 = this.width && !e2.added && h2.box;
            var L = /<br.*?>/g, y = [g3, this.ellipsis, this.noWrap, this.textLineHeight, this.textOutline, this.fontSize, this.width].join();
            if (y !== e2.textCache) {
              e2.textCache = y;
              delete e2.actualWidth;
              for (y = E.length; y--; )
                k.removeChild(E[y]);
              I || this.ellipsis || this.width || e2.textPath || -1 !== g3.indexOf(" ") && (!this.noWrap || L.test(g3)) ? "" !== g3 && (h2 && h2.appendChild(k), g3 = new a(g3), this.modifyTree(g3.nodes), g3.addToDOM(k), this.modifyDOM(), this.ellipsis && -1 !== (k.textContent || "").indexOf("…") && e2.attr("title", this.unescapeEntities(e2.textStr || "", ["&lt;", "&gt;"])), h2 && h2.removeChild(k)) : k.appendChild(A.createTextNode(this.unescapeEntities(g3)));
              l(this.textOutline) && e2.applyTextOutline && e2.applyTextOutline(this.textOutline);
            }
          };
          h.prototype.modifyDOM = function() {
            var d2 = this, e2 = this.svgElement, a2 = H(e2.element, "x");
            e2.firstLineMetrics = void 0;
            for (var h2; h2 = e2.element.firstChild; )
              if (/^[\s\u200B]*$/.test(h2.textContent || " "))
                e2.element.removeChild(h2);
              else
                break;
            [].forEach.call(e2.element.querySelectorAll("tspan.highcharts-br"), function(h3, c) {
              h3.nextSibling && h3.previousSibling && (0 === c && 1 === h3.previousSibling.nodeType && (e2.firstLineMetrics = e2.renderer.fontMetrics(void 0, h3.previousSibling)), H(h3, { dy: d2.getLineHeight(h3.nextSibling), x: a2 }));
            });
            var g3 = this.width || 0;
            if (g3) {
              var l2 = function(h3, c) {
                var w = h3.textContent || "", f = w.replace(/([^\^])-/g, "$1- ").split(" "), n = !d2.noWrap && (1 < f.length || 1 < e2.element.childNodes.length), b = d2.getLineHeight(c), u = 0, z = e2.actualWidth;
                if (d2.ellipsis)
                  w && d2.truncate(h3, w, void 0, 0, Math.max(0, g3 - parseInt(d2.fontSize || 12, 10)), function(b2, c2) {
                    return b2.substring(0, c2) + "…";
                  });
                else if (n) {
                  w = [];
                  for (n = []; c.firstChild && c.firstChild !== h3; )
                    n.push(c.firstChild), c.removeChild(c.firstChild);
                  for (; f.length; )
                    f.length && !d2.noWrap && 0 < u && (w.push(h3.textContent || ""), h3.textContent = f.join(" ").replace(/- /g, "-")), d2.truncate(h3, void 0, f, 0 === u ? z || 0 : 0, g3, function(b2, c2) {
                      return f.slice(0, c2).join(" ").replace(/- /g, "-");
                    }), z = e2.actualWidth, u++;
                  n.forEach(function(b2) {
                    c.insertBefore(b2, h3);
                  });
                  w.forEach(function(f2) {
                    c.insertBefore(A.createTextNode(f2), h3);
                    f2 = A.createElementNS(C, "tspan");
                    f2.textContent = "​";
                    H(f2, { dy: b, x: a2 });
                    c.insertBefore(f2, h3);
                  });
                }
              }, L = function(d3) {
                [].slice.call(d3.childNodes).forEach(function(c) {
                  c.nodeType === B.Node.TEXT_NODE ? l2(c, d3) : (-1 !== c.className.baseVal.indexOf("highcharts-br") && (e2.actualWidth = 0), L(c));
                });
              };
              L(e2.element);
            }
          };
          h.prototype.getLineHeight = function(d2) {
            var e2;
            d2 = d2.nodeType === B.Node.TEXT_NODE ? d2.parentElement : d2;
            this.renderer.styledMode || (e2 = d2 && /(px|em)$/.test(d2.style.fontSize) ? d2.style.fontSize : this.fontSize || this.renderer.style.fontSize || 12);
            return this.textLineHeight ? parseInt(this.textLineHeight.toString(), 10) : this.renderer.fontMetrics(e2, d2 || this.svgElement.element).h;
          };
          h.prototype.modifyTree = function(d2) {
            var e2 = this, a2 = function(h2, k) {
              var m = h2.attributes;
              m = void 0 === m ? {} : m;
              var p = h2.children, g3 = h2.style;
              g3 = void 0 === g3 ? {} : g3;
              var c = h2.tagName, w = e2.renderer.styledMode;
              if ("b" === c || "strong" === c)
                w ? m["class"] = "highcharts-strong" : g3.fontWeight = "bold";
              else if ("i" === c || "em" === c)
                w ? m["class"] = "highcharts-emphasized" : g3.fontStyle = "italic";
              g3 && g3.color && (g3.fill = g3.color);
              "br" === c ? (m["class"] = "highcharts-br", h2.textContent = "​", (k = d2[k + 1]) && k.textContent && (k.textContent = k.textContent.replace(/^ +/gm, ""))) : "a" === c && p && p.some(function(c2) {
                return "#text" === c2.tagName;
              }) && (h2.children = [{ children: p, tagName: "tspan" }]);
              "#text" !== c && "a" !== c && (h2.tagName = "tspan");
              t(h2, { attributes: m, style: g3 });
              p && p.filter(function(c2) {
                return "#text" !== c2.tagName;
              }).forEach(a2);
            };
            d2.forEach(a2);
            r(this.svgElement, "afterModifyTree", { nodes: d2 });
          };
          h.prototype.truncate = function(d2, e2, a2, h2, g3, l2) {
            var k = this.svgElement, m = k.renderer, c = k.rotation, w = [], f = a2 ? 1 : 0, n = (e2 || a2 || "").length, b = n, u, z = function(b2, c2) {
              c2 = c2 || b2;
              var f2 = d2.parentNode;
              if (f2 && "undefined" === typeof w[c2])
                if (f2.getSubStringLength)
                  try {
                    w[c2] = h2 + f2.getSubStringLength(0, a2 ? c2 + 1 : c2);
                  } catch (Q) {
                    "";
                  }
                else
                  m.getSpanWidth && (d2.textContent = l2(e2 || a2, b2), w[c2] = h2 + m.getSpanWidth(k, d2));
              return w[c2];
            };
            k.rotation = 0;
            var q = z(d2.textContent.length);
            if (h2 + q > g3) {
              for (; f <= n; )
                b = Math.ceil((f + n) / 2), a2 && (u = l2(a2, b)), q = z(b, u && u.length - 1), f === n ? f = n + 1 : q > g3 ? n = b - 1 : f = b;
              0 === n ? d2.textContent = "" : e2 && n === e2.length - 1 || (d2.textContent = u || l2(e2 || a2, b));
            }
            a2 && a2.splice(0, b);
            k.actualWidth = q;
            k.rotation = c;
          };
          h.prototype.unescapeEntities = function(d2, a2) {
            e(this.renderer.escapes, function(e2, h2) {
              a2 && -1 !== a2.indexOf(e2) || (d2 = d2.toString().replace(new RegExp(e2, "g"), h2));
            });
            return d2;
          };
          return h;
        }();
      });
      K(g, "Core/Renderer/SVG/SVGRenderer.js", [
        g["Core/Renderer/HTML/AST.js"],
        g["Core/Color/Color.js"],
        g["Core/Globals.js"],
        g["Core/Renderer/RendererRegistry.js"],
        g["Core/Renderer/SVG/SVGElement.js"],
        g["Core/Renderer/SVG/SVGLabel.js"],
        g["Core/Renderer/SVG/Symbols.js"],
        g["Core/Renderer/SVG/TextBuilder.js"],
        g["Core/Utilities.js"]
      ], function(a, g2, x, F, C, B, H, t, r) {
        var l = x.charts, e = x.deg2rad, d = x.doc, h = x.isFirefox, m = x.isMS, k = x.isWebKit, p = x.noop, D = x.SVG_NS, I = x.symbolSizes, E = x.win, L = r.addEvent, y = r.attr, c = r.createElement, w = r.css, f = r.defined, n = r.destroyObjectProperties, b = r.extend, u = r.isArray, z = r.isNumber, q = r.isObject, N = r.isString, J = r.merge, O = r.pick, Q = r.pInt, A = r.uniqueKey, Y;
        x = function() {
          function v(b2, c2, f2, d2, e2, v2, a2) {
            this.width = this.url = this.style = this.isSVG = this.imgCount = this.height = this.gradients = this.globalAnimation = this.defs = this.chartIndex = this.cacheKeys = this.cache = this.boxWrapper = this.box = this.alignedObjects = void 0;
            this.init(b2, c2, f2, d2, e2, v2, a2);
          }
          v.prototype.init = function(b2, c2, f2, e2, v2, a2, n2) {
            var G = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" }), q2 = G.element;
            n2 || G.css(this.getStyle(e2));
            b2.appendChild(q2);
            y(b2, "dir", "ltr");
            -1 === b2.innerHTML.indexOf("xmlns") && y(q2, "xmlns", this.SVG_NS);
            this.isSVG = true;
            this.box = q2;
            this.boxWrapper = G;
            this.alignedObjects = [];
            this.url = this.getReferenceURL();
            this.createElement("desc").add().element.appendChild(d.createTextNode("Created with Highcharts 10.3.3"));
            this.defs = this.createElement("defs").add();
            this.allowHTML = a2;
            this.forExport = v2;
            this.styledMode = n2;
            this.gradients = {};
            this.cache = {};
            this.cacheKeys = [];
            this.imgCount = 0;
            this.setSize(c2, f2, false);
            var u2;
            h && b2.getBoundingClientRect && (c2 = function() {
              w(b2, { left: 0, top: 0 });
              u2 = b2.getBoundingClientRect();
              w(b2, { left: Math.ceil(u2.left) - u2.left + "px", top: Math.ceil(u2.top) - u2.top + "px" });
            }, c2(), this.unSubPixelFix = L(E, "resize", c2));
          };
          v.prototype.definition = function(b2) {
            return new a([b2]).addToDOM(this.defs.element);
          };
          v.prototype.getReferenceURL = function() {
            if ((h || k) && d.getElementsByTagName("base").length) {
              if (!f(Y)) {
                var b2 = A();
                b2 = new a([{ tagName: "svg", attributes: { width: 8, height: 8 }, children: [{ tagName: "defs", children: [{ tagName: "clipPath", attributes: { id: b2 }, children: [{ tagName: "rect", attributes: { width: 4, height: 4 } }] }] }, { tagName: "rect", attributes: { id: "hitme", width: 8, height: 8, "clip-path": "url(#".concat(b2, ")"), fill: "rgba(0,0,0,0.001)" } }] }]).addToDOM(d.body);
                w(b2, { position: "fixed", top: 0, left: 0, zIndex: 9e5 });
                var c2 = d.elementFromPoint(6, 6);
                Y = "hitme" === (c2 && c2.id);
                d.body.removeChild(b2);
              }
              if (Y)
                return E.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20");
            }
            return "";
          };
          v.prototype.getStyle = function(c2) {
            return this.style = b({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, c2);
          };
          v.prototype.setStyle = function(b2) {
            this.boxWrapper.css(this.getStyle(b2));
          };
          v.prototype.isHidden = function() {
            return !this.boxWrapper.getBBox().width;
          };
          v.prototype.destroy = function() {
            var b2 = this.defs;
            this.box = null;
            this.boxWrapper = this.boxWrapper.destroy();
            n(this.gradients || {});
            this.gradients = null;
            b2 && (this.defs = b2.destroy());
            this.unSubPixelFix && this.unSubPixelFix();
            return this.alignedObjects = null;
          };
          v.prototype.createElement = function(b2) {
            var c2 = new this.Element();
            c2.init(this, b2);
            return c2;
          };
          v.prototype.getRadialAttr = function(b2, c2) {
            return { cx: b2[0] - b2[2] / 2 + (c2.cx || 0) * b2[2], cy: b2[1] - b2[2] / 2 + (c2.cy || 0) * b2[2], r: (c2.r || 0) * b2[2] };
          };
          v.prototype.buildText = function(b2) {
            new t(b2).buildSVG();
          };
          v.prototype.getContrast = function(b2) {
            b2 = g2.parse(b2).rgba.map(function(b3) {
              b3 /= 255;
              return 0.03928 >= b3 ? b3 / 12.92 : Math.pow((b3 + 0.055) / 1.055, 2.4);
            });
            b2 = 0.2126 * b2[0] + 0.7152 * b2[1] + 0.0722 * b2[2];
            return 1.05 / (b2 + 0.05) > (b2 + 0.05) / 0.05 ? "#FFFFFF" : "#000000";
          };
          v.prototype.button = function(c2, f2, d2, e2, v2, n2, u2, h2, z2, w2) {
            void 0 === v2 && (v2 = {});
            var G = this.label(c2, f2, d2, z2, void 0, void 0, w2, void 0, "button"), k2 = this.styledMode;
            c2 = v2.states || {};
            var M = 0;
            v2 = J(v2);
            delete v2.states;
            var g3 = J({ color: "#333333", cursor: "pointer", fontWeight: "normal" }, v2.style);
            delete v2.style;
            var p2 = a.filterUserAttributes(v2);
            G.attr(J({ padding: 8, r: 2 }, p2));
            if (!k2) {
              p2 = J({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1 }, p2);
              n2 = J(p2, { fill: "#e6e6e6" }, a.filterUserAttributes(n2 || c2.hover || {}));
              var U = n2.style;
              delete n2.style;
              u2 = J(p2, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, a.filterUserAttributes(u2 || c2.select || {}));
              var P = u2.style;
              delete u2.style;
              h2 = J(p2, { style: { color: "#cccccc" } }, a.filterUserAttributes(h2 || c2.disabled || {}));
              var y2 = h2.style;
              delete h2.style;
            }
            L(G.element, m ? "mouseover" : "mouseenter", function() {
              3 !== M && G.setState(1);
            });
            L(G.element, m ? "mouseout" : "mouseleave", function() {
              3 !== M && G.setState(M);
            });
            G.setState = function(b2) {
              1 !== b2 && (G.state = M = b2);
              G.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][b2 || 0]);
              k2 || (G.attr([p2, n2, u2, h2][b2 || 0]), b2 = [g3, U, P, y2][b2 || 0], q(b2) && G.css(b2));
            };
            k2 || (G.attr(p2).css(b({ cursor: "default" }, g3)), w2 && G.text.css({ pointerEvents: "none" }));
            return G.on("touchstart", function(b2) {
              return b2.stopPropagation();
            }).on(
              "click",
              function(b2) {
                3 !== M && e2.call(G, b2);
              }
            );
          };
          v.prototype.crispLine = function(b2, c2, d2) {
            void 0 === d2 && (d2 = "round");
            var e2 = b2[0], v2 = b2[1];
            f(e2[1]) && e2[1] === v2[1] && (e2[1] = v2[1] = Math[d2](e2[1]) - c2 % 2 / 2);
            f(e2[2]) && e2[2] === v2[2] && (e2[2] = v2[2] = Math[d2](e2[2]) + c2 % 2 / 2);
            return b2;
          };
          v.prototype.path = function(c2) {
            var f2 = this.styledMode ? {} : { fill: "none" };
            u(c2) ? f2.d = c2 : q(c2) && b(f2, c2);
            return this.createElement("path").attr(f2);
          };
          v.prototype.circle = function(b2, c2, f2) {
            b2 = q(b2) ? b2 : "undefined" === typeof b2 ? {} : { x: b2, y: c2, r: f2 };
            c2 = this.createElement("circle");
            c2.xSetter = c2.ySetter = function(b3, c3, f3) {
              f3.setAttribute("c" + c3, b3);
            };
            return c2.attr(b2);
          };
          v.prototype.arc = function(b2, c2, f2, d2, e2, v2) {
            q(b2) ? (d2 = b2, c2 = d2.y, f2 = d2.r, b2 = d2.x) : d2 = { innerR: d2, start: e2, end: v2 };
            b2 = this.symbol("arc", b2, c2, f2, f2, d2);
            b2.r = f2;
            return b2;
          };
          v.prototype.rect = function(b2, c2, f2, d2, e2, v2) {
            e2 = q(b2) ? b2.r : e2;
            var a2 = this.createElement("rect");
            b2 = q(b2) ? b2 : "undefined" === typeof b2 ? {} : { x: b2, y: c2, width: Math.max(f2, 0), height: Math.max(d2, 0) };
            this.styledMode || ("undefined" !== typeof v2 && (b2["stroke-width"] = v2, b2 = a2.crisp(b2)), b2.fill = "none");
            e2 && (b2.r = e2);
            a2.rSetter = function(b3, c3, f3) {
              a2.r = b3;
              y(f3, { rx: b3, ry: b3 });
            };
            a2.rGetter = function() {
              return a2.r || 0;
            };
            return a2.attr(b2);
          };
          v.prototype.setSize = function(b2, c2, f2) {
            this.width = b2;
            this.height = c2;
            this.boxWrapper.animate({ width: b2, height: c2 }, { step: function() {
              this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") });
            }, duration: O(f2, true) ? void 0 : 0 });
            this.alignElements();
          };
          v.prototype.g = function(b2) {
            var c2 = this.createElement("g");
            return b2 ? c2.attr({ "class": "highcharts-" + b2 }) : c2;
          };
          v.prototype.image = function(b2, c2, f2, d2, e2, v2) {
            var a2 = { preserveAspectRatio: "none" }, n2 = function(b3, c3) {
              b3.setAttributeNS ? b3.setAttributeNS("http://www.w3.org/1999/xlink", "href", c3) : b3.setAttribute("hc-svg-href", c3);
            };
            z(c2) && (a2.x = c2);
            z(f2) && (a2.y = f2);
            z(d2) && (a2.width = d2);
            z(e2) && (a2.height = e2);
            var G = this.createElement("image").attr(a2);
            c2 = function(c3) {
              n2(G.element, b2);
              v2.call(G, c3);
            };
            v2 ? (n2(G.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), f2 = new E.Image(), L(f2, "load", c2), f2.src = b2, f2.complete && c2({})) : n2(G.element, b2);
            return G;
          };
          v.prototype.symbol = function(e2, v2, a2, n2, G, q2) {
            var u2 = this, h2 = /^url\((.*?)\)$/, z2 = h2.test(e2), k2 = !z2 && (this.symbols[e2] ? e2 : "circle"), g3 = k2 && this.symbols[k2], m2;
            if (g3) {
              "number" === typeof v2 && (m2 = g3.call(this.symbols, Math.round(v2 || 0), Math.round(a2 || 0), n2 || 0, G || 0, q2));
              var p2 = this.path(m2);
              u2.styledMode || p2.attr("fill", "none");
              b(p2, { symbolName: k2 || void 0, x: v2, y: a2, width: n2, height: G });
              q2 && b(p2, q2);
            } else if (z2) {
              var P = e2.match(h2)[1];
              var U = p2 = this.image(P);
              U.imgwidth = O(I[P] && I[P].width, q2 && q2.width);
              U.imgheight = O(I[P] && I[P].height, q2 && q2.height);
              var N2 = function(b2) {
                return b2.attr({ width: b2.width, height: b2.height });
              };
              [
                "width",
                "height"
              ].forEach(function(b2) {
                U[b2 + "Setter"] = function(b3, c2) {
                  this[c2] = b3;
                  b3 = this.alignByTranslate;
                  var d2 = this.element, e3 = this.width, v3 = this.height, a3 = this.imgwidth, n3 = this.imgheight, G2 = this["img" + c2];
                  if (f(G2)) {
                    var u3 = 1;
                    q2 && "within" === q2.backgroundSize && e3 && v3 ? (u3 = Math.min(e3 / a3, v3 / n3), G2 = Math.round(G2 * u3), y(d2, { width: Math.round(a3 * u3), height: Math.round(n3 * u3) })) : d2 && d2.setAttribute(c2, G2);
                    b3 || this.translate(((e3 || 0) - G2 * u3) / 2, ((v3 || 0) - G2 * u3) / 2);
                  }
                };
              });
              f(v2) && U.attr({ x: v2, y: a2 });
              U.isImg = true;
              f(U.imgwidth) && f(U.imgheight) ? N2(U) : (U.attr({ width: 0, height: 0 }), c("img", { onload: function() {
                var b2 = l[u2.chartIndex];
                0 === this.width && (w(this, { position: "absolute", top: "-999em" }), d.body.appendChild(this));
                I[P] = { width: this.width, height: this.height };
                U.imgwidth = this.width;
                U.imgheight = this.height;
                U.element && N2(U);
                this.parentNode && this.parentNode.removeChild(this);
                u2.imgCount--;
                if (!u2.imgCount && b2 && !b2.hasLoaded)
                  b2.onload();
              }, src: P }), this.imgCount++);
            }
            return p2;
          };
          v.prototype.clipRect = function(b2, c2, f2, d2) {
            var e2 = A() + "-", v2 = this.createElement("clipPath").attr({ id: e2 }).add(this.defs);
            b2 = this.rect(
              b2,
              c2,
              f2,
              d2,
              0
            ).add(v2);
            b2.id = e2;
            b2.clipPath = v2;
            b2.count = 0;
            return b2;
          };
          v.prototype.text = function(b2, c2, d2, e2) {
            var v2 = {};
            if (e2 && (this.allowHTML || !this.forExport))
              return this.html(b2, c2, d2);
            v2.x = Math.round(c2 || 0);
            d2 && (v2.y = Math.round(d2));
            f(b2) && (v2.text = b2);
            b2 = this.createElement("text").attr(v2);
            if (!e2 || this.forExport && !this.allowHTML)
              b2.xSetter = function(b3, c3, f2) {
                for (var d3 = f2.getElementsByTagName("tspan"), e3 = f2.getAttribute(c3), v3 = 0, a2; v3 < d3.length; v3++)
                  a2 = d3[v3], a2.getAttribute(c3) === e3 && a2.setAttribute(c3, b3);
                f2.setAttribute(c3, b3);
              };
            return b2;
          };
          v.prototype.fontMetrics = function(b2, c2) {
            b2 = !this.styledMode && /px/.test(b2) || !E.getComputedStyle ? b2 || c2 && c2.style && c2.style.fontSize || this.style && this.style.fontSize : c2 && C.prototype.getStyle.call(c2, "font-size");
            b2 = /px/.test(b2) ? Q(b2) : 12;
            c2 = 24 > b2 ? b2 + 3 : Math.round(1.2 * b2);
            return { h: c2, b: Math.round(0.8 * c2), f: b2 };
          };
          v.prototype.rotCorr = function(b2, c2, f2) {
            var d2 = b2;
            c2 && f2 && (d2 = Math.max(d2 * Math.cos(c2 * e), 4));
            return { x: -b2 / 3 * Math.sin(c2 * e), y: d2 };
          };
          v.prototype.pathToSegments = function(b2) {
            for (var c2 = [], f2 = [], d2 = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 }, e2 = 0; e2 < b2.length; e2++)
              N(f2[0]) && z(b2[e2]) && f2.length === d2[f2[0].toUpperCase()] && b2.splice(e2, 0, f2[0].replace("M", "L").replace("m", "l")), "string" === typeof b2[e2] && (f2.length && c2.push(f2.slice(0)), f2.length = 0), f2.push(b2[e2]);
            c2.push(f2.slice(0));
            return c2;
          };
          v.prototype.label = function(b2, c2, f2, d2, e2, v2, a2, n2, q2) {
            return new B(this, b2, c2, f2, d2, e2, v2, a2, n2, q2);
          };
          v.prototype.alignElements = function() {
            this.alignedObjects.forEach(function(b2) {
              return b2.align();
            });
          };
          return v;
        }();
        b(x.prototype, {
          Element: C,
          SVG_NS: D,
          escapes: { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" },
          symbols: H,
          draw: p
        });
        F.registerRendererType("svg", x, true);
        "";
        return x;
      });
      K(g, "Core/Renderer/HTML/HTMLElement.js", [g["Core/Globals.js"], g["Core/Renderer/SVG/SVGElement.js"], g["Core/Utilities.js"]], function(a, g2, x) {
        var A = this && this.__extends || /* @__PURE__ */ function() {
          var d2 = function(e2, a2) {
            d2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d3, e3) {
              d3.__proto__ = e3;
            } || function(d3, e3) {
              for (var a3 in e3)
                e3.hasOwnProperty(a3) && (d3[a3] = e3[a3]);
            };
            return d2(e2, a2);
          };
          return function(e2, a2) {
            function h2() {
              this.constructor = e2;
            }
            d2(e2, a2);
            e2.prototype = null === a2 ? Object.create(a2) : (h2.prototype = a2.prototype, new h2());
          };
        }(), C = a.isFirefox, B = a.isMS, H = a.isWebKit, t = a.win, r = x.css, l = x.defined, e = x.extend, d = x.pick, h = x.pInt;
        return function(a2) {
          function k() {
            return null !== a2 && a2.apply(this, arguments) || this;
          }
          A(k, a2);
          k.compose = function(d2) {
            if (-1 === k.composedClasses.indexOf(d2)) {
              k.composedClasses.push(d2);
              var e2 = k.prototype, a3 = d2.prototype;
              a3.getSpanCorrection = e2.getSpanCorrection;
              a3.htmlCss = e2.htmlCss;
              a3.htmlGetBBox = e2.htmlGetBBox;
              a3.htmlUpdateTransform = e2.htmlUpdateTransform;
              a3.setSpanRotation = e2.setSpanRotation;
            }
            return d2;
          };
          k.prototype.getSpanCorrection = function(d2, e2, a3) {
            this.xCorr = -d2 * a3;
            this.yCorr = -e2;
          };
          k.prototype.htmlCss = function(a3) {
            var h2 = "SPAN" === this.element.tagName && a3 && "width" in a3, k2 = d(h2 && a3.width, void 0);
            if (h2) {
              delete a3.width;
              this.textWidth = k2;
              var g3 = true;
            }
            a3 && "ellipsis" === a3.textOverflow && (a3.whiteSpace = "nowrap", a3.overflow = "hidden");
            this.styles = e(this.styles, a3);
            r(this.element, a3);
            g3 && this.htmlUpdateTransform();
            return this;
          };
          k.prototype.htmlGetBBox = function() {
            var d2 = this.element;
            return {
              x: d2.offsetLeft,
              y: d2.offsetTop,
              width: d2.offsetWidth,
              height: d2.offsetHeight
            };
          };
          k.prototype.htmlUpdateTransform = function() {
            if (this.added) {
              var d2 = this.renderer, e2 = this.element, a3 = this.translateX || 0, k2 = this.translateY || 0, g3 = this.x || 0, m = this.y || 0, c = this.textAlign || "left", w = { left: 0, center: 0.5, right: 1 }[c], f = this.styles;
              f = f && f.whiteSpace;
              r(e2, { marginLeft: a3, marginTop: k2 });
              !d2.styledMode && this.shadows && this.shadows.forEach(function(b2) {
                r(b2, { marginLeft: a3 + 1, marginTop: k2 + 1 });
              });
              this.inverted && [].forEach.call(e2.childNodes, function(b2) {
                d2.invertChild(b2, e2);
              });
              if ("SPAN" === e2.tagName) {
                var n = this.rotation, b = this.textWidth && h(this.textWidth), u = [n, c, e2.innerHTML, this.textWidth, this.textAlign].join(), z = void 0;
                z = false;
                if (b !== this.oldTextWidth) {
                  if (this.textPxLength)
                    var q = this.textPxLength;
                  else
                    r(e2, { width: "", whiteSpace: f || "nowrap" }), q = e2.offsetWidth;
                  (b > this.oldTextWidth || q > b) && (/[ \-]/.test(e2.textContent || e2.innerText) || "ellipsis" === e2.style.textOverflow) && (r(e2, { width: q > b || n ? b + "px" : "auto", display: "block", whiteSpace: f || "normal" }), this.oldTextWidth = b, z = true);
                }
                this.hasBoxWidthChanged = z;
                u !== this.cTT && (z = d2.fontMetrics(e2.style.fontSize, e2).b, !l(n) || n === (this.oldRotation || 0) && c === this.oldAlign || this.setSpanRotation(n, w, z), this.getSpanCorrection(!l(n) && this.textPxLength || e2.offsetWidth, z, w, n, c));
                r(e2, { left: g3 + (this.xCorr || 0) + "px", top: m + (this.yCorr || 0) + "px" });
                this.cTT = u;
                this.oldRotation = n;
                this.oldAlign = c;
              }
            } else
              this.alignOnAdd = true;
          };
          k.prototype.setSpanRotation = function(d2, e2, a3) {
            var h2 = {}, k2 = B && !/Edge/.test(t.navigator.userAgent) ? "-ms-transform" : H ? "-webkit-transform" : C ? "MozTransform" : t.opera ? "-o-transform" : void 0;
            k2 && (h2[k2] = h2.transform = "rotate(" + d2 + "deg)", h2[k2 + (C ? "Origin" : "-origin")] = h2.transformOrigin = 100 * e2 + "% " + a3 + "px", r(this.element, h2));
          };
          k.composedClasses = [];
          return k;
        }(g2);
      });
      K(g, "Core/Renderer/HTML/HTMLRenderer.js", [g["Core/Renderer/HTML/AST.js"], g["Core/Renderer/SVG/SVGElement.js"], g["Core/Renderer/SVG/SVGRenderer.js"], g["Core/Utilities.js"]], function(a, g2, x, F) {
        var A = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(e, d) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, e2) {
              d2.__proto__ = e2;
            } || function(d2, e2) {
              for (var a3 in e2)
                e2.hasOwnProperty(a3) && (d2[a3] = e2[a3]);
            };
            return a2(e, d);
          };
          return function(e, d) {
            function h() {
              this.constructor = e;
            }
            a2(e, d);
            e.prototype = null === d ? Object.create(d) : (h.prototype = d.prototype, new h());
          };
        }(), B = F.attr, H = F.createElement, t = F.extend, r = F.pick;
        return function(l) {
          function e() {
            return null !== l && l.apply(this, arguments) || this;
          }
          A(e, l);
          e.compose = function(d) {
            -1 === e.composedClasses.indexOf(d) && (e.composedClasses.push(d), d.prototype.html = e.prototype.html);
            return d;
          };
          e.prototype.html = function(d, e2, m) {
            var h = this.createElement("span"), p = h.element, l2 = h.renderer, I = l2.isSVG, E = function(d2, e3) {
              ["opacity", "visibility"].forEach(function(c) {
                d2[c + "Setter"] = function(a2, f, n) {
                  var b = d2.div ? d2.div.style : e3;
                  g2.prototype[c + "Setter"].call(this, a2, f, n);
                  b && (b[f] = a2);
                };
              });
              d2.addedSetters = true;
            };
            h.textSetter = function(d2) {
              d2 !== this.textStr && (delete this.bBox, delete this.oldTextWidth, a.setElementHTML(this.element, r(d2, "")), this.textStr = d2, h.doTransform = true);
            };
            I && E(h, h.element.style);
            h.xSetter = h.ySetter = h.alignSetter = h.rotationSetter = function(d2, e3) {
              "align" === e3 ? h.alignValue = h.textAlign = d2 : h[e3] = d2;
              h.doTransform = true;
            };
            h.afterSetters = function() {
              this.doTransform && (this.htmlUpdateTransform(), this.doTransform = false);
            };
            h.attr({ text: d, x: Math.round(e2), y: Math.round(m) }).css({ position: "absolute" });
            l2.styledMode || h.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize });
            p.style.whiteSpace = "nowrap";
            h.css = h.htmlCss;
            I && (h.add = function(d2) {
              var e3 = l2.box.parentNode, c = [];
              if (this.parentGroup = d2) {
                var a2 = d2.div;
                if (!a2) {
                  for (; d2; )
                    c.push(d2), d2 = d2.parentGroup;
                  c.reverse().forEach(function(f) {
                    function d3(b2, c2) {
                      f[c2] = b2;
                      "translateX" === c2 ? z.left = b2 + "px" : z.top = b2 + "px";
                      f.doTransform = true;
                    }
                    var b = B(f.element, "class"), u = f.styles || {};
                    a2 = f.div = f.div || H("div", b ? { className: b } : void 0, { position: "absolute", left: (f.translateX || 0) + "px", top: (f.translateY || 0) + "px", display: f.display, opacity: f.opacity, cursor: u.cursor, pointerEvents: u.pointerEvents, visibility: f.visibility }, a2 || e3);
                    var z = a2.style;
                    t(f, { classSetter: /* @__PURE__ */ function(b2) {
                      return function(c2) {
                        this.element.setAttribute("class", c2);
                        b2.className = c2;
                      };
                    }(a2), on: function() {
                      c[0].div && h.on.apply({
                        element: c[0].div,
                        onEvents: f.onEvents
                      }, arguments);
                      return f;
                    }, translateXSetter: d3, translateYSetter: d3 });
                    f.addedSetters || E(f);
                  });
                }
              } else
                a2 = e3;
              a2.appendChild(p);
              h.added = true;
              h.alignOnAdd && h.htmlUpdateTransform();
              return h;
            });
            return h;
          };
          e.composedClasses = [];
          return e;
        }(x);
      });
      K(g, "Core/Axis/AxisDefaults.js", [], function() {
        var a;
        (function(a2) {
          a2.defaultXAxisOptions = {
            alignTicks: true,
            allowDecimals: void 0,
            panningEnabled: true,
            zIndex: 2,
            zoomEnabled: true,
            dateTimeLabelFormats: {
              millisecond: { main: "%H:%M:%S.%L", range: false },
              second: { main: "%H:%M:%S", range: false },
              minute: { main: "%H:%M", range: false },
              hour: { main: "%H:%M", range: false },
              day: { main: "%e. %b" },
              week: { main: "%e. %b" },
              month: { main: "%b '%y" },
              year: { main: "%Y" }
            },
            endOnTick: false,
            gridLineDashStyle: "Solid",
            gridZIndex: 1,
            labels: { autoRotation: void 0, autoRotationLimit: 80, distance: void 0, enabled: true, indentation: 10, overflow: "justify", padding: 5, reserveSpace: void 0, rotation: void 0, staggerLines: 0, step: 0, useHTML: false, x: 0, zIndex: 7, style: { color: "#666666", cursor: "default", fontSize: "11px" } },
            maxPadding: 0.01,
            minorGridLineDashStyle: "Solid",
            minorTickLength: 2,
            minorTickPosition: "outside",
            minPadding: 0.01,
            offset: void 0,
            opposite: false,
            reversed: void 0,
            reversedStacks: false,
            showEmpty: true,
            showFirstLabel: true,
            showLastLabel: true,
            startOfWeek: 1,
            startOnTick: false,
            tickLength: 10,
            tickPixelInterval: 100,
            tickmarkPlacement: "between",
            tickPosition: "outside",
            title: { align: "middle", rotation: 0, useHTML: false, x: 0, y: 0, style: { color: "#666666" } },
            type: "linear",
            uniqueNames: true,
            visible: true,
            minorGridLineColor: "#f2f2f2",
            minorGridLineWidth: 1,
            minorTickColor: "#999999",
            lineColor: "#ccd6eb",
            lineWidth: 1,
            gridLineColor: "#e6e6e6",
            gridLineWidth: void 0,
            tickColor: "#ccd6eb"
          };
          a2.defaultYAxisOptions = { reversedStacks: true, endOnTick: true, maxPadding: 0.05, minPadding: 0.05, tickPixelInterval: 72, showLastLabel: true, labels: { x: -8 }, startOnTick: true, title: { rotation: 270, text: "Values" }, stackLabels: { animation: {}, allowOverlap: false, enabled: false, crop: true, overflow: "justify", formatter: function() {
            var a3 = this.axis.chart.numberFormatter;
            return a3(this.total || 0, -1);
          }, style: { color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 };
          a2.defaultLeftAxisOptions = { labels: { x: -15 }, title: { rotation: 270 } };
          a2.defaultRightAxisOptions = { labels: { x: 15 }, title: { rotation: 90 } };
          a2.defaultBottomAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } };
          a2.defaultTopAxisOptions = { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } };
        })(a || (a = {}));
        return a;
      });
      K(g, "Core/Foundation.js", [g["Core/Utilities.js"]], function(a) {
        var g2 = a.addEvent, x = a.isFunction, F = a.objectEach, C = a.removeEvent, B;
        (function(a2) {
          a2.registerEventOptions = function(a3, r) {
            a3.eventOptions = a3.eventOptions || {};
            F(r.events, function(l, e) {
              a3.eventOptions[e] !== l && (a3.eventOptions[e] && (C(a3, e, a3.eventOptions[e]), delete a3.eventOptions[e]), x(l) && (a3.eventOptions[e] = l, g2(a3, e, l)));
            });
          };
        })(B || (B = {}));
        return B;
      });
      K(g, "Core/Axis/Tick.js", [g["Core/FormatUtilities.js"], g["Core/Globals.js"], g["Core/Utilities.js"]], function(a, g2, x) {
        var A = g2.deg2rad, C = x.clamp, B = x.correctFloat, H = x.defined, t = x.destroyObjectProperties, r = x.extend, l = x.fireEvent, e = x.isNumber, d = x.merge, h = x.objectEach, m = x.pick;
        g2 = function() {
          function g3(d2, e2, a2, h2, g4) {
            this.isNewLabel = this.isNew = true;
            this.axis = d2;
            this.pos = e2;
            this.type = a2 || "";
            this.parameters = g4 || {};
            this.tickmarkOffset = this.parameters.tickmarkOffset;
            this.options = this.parameters.options;
            l(this, "init");
            a2 || h2 || this.addLabel();
          }
          g3.prototype.addLabel = function() {
            var d2 = this, h2 = d2.axis, g4 = h2.options, k = h2.chart, L = h2.categories, y = h2.logarithmic, c = h2.names, w = d2.pos, f = m(d2.options && d2.options.labels, g4.labels), n = h2.tickPositions, b = w === n[0], u = w === n[n.length - 1], z = (!f.step || 1 === f.step) && 1 === h2.tickInterval;
            n = n.info;
            var q = d2.label, N;
            L = this.parameters.category || (L ? m(L[w], c[w], w) : w);
            y && e(L) && (L = B(y.lin2log(L)));
            if (h2.dateTime)
              if (n) {
                var J = k.time.resolveDTLFormat(g4.dateTimeLabelFormats[!g4.grid && n.higherRanks[w] || n.unitName]);
                var O = J.main;
              } else
                e(L) && (O = h2.dateTime.getXDateFormat(L, g4.dateTimeLabelFormats || {}));
            d2.isFirst = b;
            d2.isLast = u;
            var Q = { axis: h2, chart: k, dateTimeLabelFormat: O, isFirst: b, isLast: u, pos: w, tick: d2, tickPositionInfo: n, value: L };
            l(this, "labelFormat", Q);
            var t2 = function(b2) {
              return f.formatter ? f.formatter.call(b2, b2) : f.format ? (b2.text = h2.defaultLabelFormatter.call(b2, b2), a.format(f.format, b2, k)) : h2.defaultLabelFormatter.call(b2, b2);
            };
            g4 = t2.call(Q, Q);
            var Y = J && J.list;
            d2.shortenLabel = Y ? function() {
              for (N = 0; N < Y.length; N++)
                if (r(Q, { dateTimeLabelFormat: Y[N] }), q.attr({ text: t2.call(Q, Q) }), q.getBBox().width < h2.getSlotWidth(d2) - 2 * f.padding)
                  return;
              q.attr({ text: "" });
            } : void 0;
            z && h2._addedPlotLB && d2.moveLabel(g4, f);
            H(q) || d2.movedLabel ? q && q.textStr !== g4 && !z && (!q.textWidth || f.style.width || q.styles.width || q.css({ width: null }), q.attr({ text: g4 }), q.textPxLength = q.getBBox().width) : (d2.label = q = d2.createLabel({ x: 0, y: 0 }, g4, f), d2.rotation = 0);
          };
          g3.prototype.createLabel = function(e2, a2, h2) {
            var g4 = this.axis, k = g4.chart;
            if (e2 = H(a2) && h2.enabled ? k.renderer.text(a2, e2.x, e2.y, h2.useHTML).add(g4.labelGroup) : null)
              k.styledMode || e2.css(d(h2.style)), e2.textPxLength = e2.getBBox().width;
            return e2;
          };
          g3.prototype.destroy = function() {
            t(this, this.axis);
          };
          g3.prototype.getPosition = function(d2, e2, a2, h2) {
            var g4 = this.axis, k = g4.chart, c = h2 && k.oldChartHeight || k.chartHeight;
            d2 = { x: d2 ? B(g4.translate(e2 + a2, void 0, void 0, h2) + g4.transB) : g4.left + g4.offset + (g4.opposite ? (h2 && k.oldChartWidth || k.chartWidth) - g4.right - g4.left : 0), y: d2 ? c - g4.bottom + g4.offset - (g4.opposite ? g4.height : 0) : B(c - g4.translate(e2 + a2, void 0, void 0, h2) - g4.transB) };
            d2.y = C(d2.y, -1e5, 1e5);
            l(this, "afterGetPosition", { pos: d2 });
            return d2;
          };
          g3.prototype.getLabelPosition = function(d2, e2, a2, h2, g4, k, c, w) {
            var f = this.axis, n = f.transA, b = f.isLinked && f.linkedParent ? f.linkedParent.reversed : f.reversed, u = f.staggerLines, z = f.tickRotCorr || { x: 0, y: 0 }, q = h2 || f.reserveSpaceDefault ? 0 : -f.labelOffset * ("center" === f.labelAlign ? 0.5 : 1), m2 = {};
            a2 = 0 === f.side ? a2.rotation ? -8 : -a2.getBBox().height : 2 === f.side ? z.y + 8 : Math.cos(a2.rotation * A) * (z.y - a2.getBBox(false, 0).height / 2);
            H(g4.y) && (a2 = 0 === f.side && f.horiz ? g4.y + a2 : g4.y);
            d2 = d2 + g4.x + q + z.x - (k && h2 ? k * n * (b ? -1 : 1) : 0);
            e2 = e2 + a2 - (k && !h2 ? k * n * (b ? 1 : -1) : 0);
            u && (h2 = c / (w || 1) % u, f.opposite && (h2 = u - h2 - 1), e2 += f.labelOffset / u * h2);
            m2.x = d2;
            m2.y = Math.round(e2);
            l(this, "afterGetLabelPosition", { pos: m2, tickmarkOffset: k, index: c });
            return m2;
          };
          g3.prototype.getLabelSize = function() {
            return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0;
          };
          g3.prototype.getMarkPath = function(d2, e2, a2, h2, g4, k) {
            return k.crispLine([["M", d2, e2], ["L", d2 + (g4 ? 0 : -a2), e2 + (g4 ? a2 : 0)]], h2);
          };
          g3.prototype.handleOverflow = function(d2) {
            var e2 = this.axis, a2 = e2.options.labels, h2 = d2.x, g4 = e2.chart.chartWidth, k = e2.chart.spacing, c = m(e2.labelLeft, Math.min(e2.pos, k[3]));
            k = m(e2.labelRight, Math.max(e2.isRadial ? 0 : e2.pos + e2.len, g4 - k[1]));
            var w = this.label, f = this.rotation, n = { left: 0, center: 0.5, right: 1 }[e2.labelAlign || w.attr("align")], b = w.getBBox().width, u = e2.getSlotWidth(this), z = {}, q = u, p = 1, l2;
            if (f || "justify" !== a2.overflow)
              0 > f && h2 - n * b < c ? l2 = Math.round(h2 / Math.cos(f * A) - c) : 0 < f && h2 + n * b > k && (l2 = Math.round((g4 - h2) / Math.cos(f * A)));
            else if (g4 = h2 + (1 - n) * b, h2 - n * b < c ? q = d2.x + q * (1 - n) - c : g4 > k && (q = k - d2.x + q * n, p = -1), q = Math.min(u, q), q < u && "center" === e2.labelAlign && (d2.x += p * (u - q - n * (u - Math.min(b, q)))), b > q || e2.autoRotation && (w.styles || {}).width)
              l2 = q;
            l2 && (this.shortenLabel ? this.shortenLabel() : (z.width = Math.floor(l2) + "px", (a2.style || {}).textOverflow || (z.textOverflow = "ellipsis"), w.css(z)));
          };
          g3.prototype.moveLabel = function(d2, e2) {
            var a2 = this, g4 = a2.label, k = a2.axis, m2 = k.reversed, c = false;
            g4 && g4.textStr === d2 ? (a2.movedLabel = g4, c = true, delete a2.label) : h(k.ticks, function(f) {
              c || f.isNew || f === a2 || !f.label || f.label.textStr !== d2 || (a2.movedLabel = f.label, c = true, f.labelPos = a2.movedLabel.xy, delete f.label);
            });
            if (!c && (a2.labelPos || g4)) {
              var w = a2.labelPos || g4.xy;
              g4 = k.horiz ? m2 ? 0 : k.width + k.left : w.x;
              k = k.horiz ? w.y : m2 ? k.width + k.left : 0;
              a2.movedLabel = a2.createLabel({ x: g4, y: k }, d2, e2);
              a2.movedLabel && a2.movedLabel.attr({ opacity: 0 });
            }
          };
          g3.prototype.render = function(d2, e2, a2) {
            var h2 = this.axis, g4 = h2.horiz, k = this.pos, c = m(this.tickmarkOffset, h2.tickmarkOffset);
            k = this.getPosition(
              g4,
              k,
              c,
              e2
            );
            c = k.x;
            var w = k.y;
            h2 = g4 && c === h2.pos + h2.len || !g4 && w === h2.pos ? -1 : 1;
            g4 = m(a2, this.label && this.label.newOpacity, 1);
            a2 = m(a2, 1);
            this.isActive = true;
            this.renderGridLine(e2, a2, h2);
            this.renderMark(k, a2, h2);
            this.renderLabel(k, e2, g4, d2);
            this.isNew = false;
            l(this, "afterRender");
          };
          g3.prototype.renderGridLine = function(d2, e2, a2) {
            var h2 = this.axis, g4 = h2.options, k = {}, c = this.pos, w = this.type, f = m(this.tickmarkOffset, h2.tickmarkOffset), n = h2.chart.renderer, b = this.gridLine, u = g4.gridLineWidth, z = g4.gridLineColor, q = g4.gridLineDashStyle;
            "minor" === this.type && (u = g4.minorGridLineWidth, z = g4.minorGridLineColor, q = g4.minorGridLineDashStyle);
            b || (h2.chart.styledMode || (k.stroke = z, k["stroke-width"] = u || 0, k.dashstyle = q), w || (k.zIndex = 1), d2 && (e2 = 0), this.gridLine = b = n.path().attr(k).addClass("highcharts-" + (w ? w + "-" : "") + "grid-line").add(h2.gridGroup));
            if (b && (a2 = h2.getPlotLinePath({ value: c + f, lineWidth: b.strokeWidth() * a2, force: "pass", old: d2, acrossPanes: false })))
              b[d2 || this.isNew ? "attr" : "animate"]({ d: a2, opacity: e2 });
          };
          g3.prototype.renderMark = function(d2, e2, a2) {
            var h2 = this.axis, g4 = h2.options, k = h2.chart.renderer, c = this.type, w = h2.tickSize(c ? c + "Tick" : "tick"), f = d2.x;
            d2 = d2.y;
            var n = m(g4["minor" !== c ? "tickWidth" : "minorTickWidth"], !c && h2.isXAxis ? 1 : 0);
            g4 = g4["minor" !== c ? "tickColor" : "minorTickColor"];
            var b = this.mark, u = !b;
            w && (h2.opposite && (w[0] = -w[0]), b || (this.mark = b = k.path().addClass("highcharts-" + (c ? c + "-" : "") + "tick").add(h2.axisGroup), h2.chart.styledMode || b.attr({ stroke: g4, "stroke-width": n })), b[u ? "attr" : "animate"]({ d: this.getMarkPath(f, d2, w[0], b.strokeWidth() * a2, h2.horiz, k), opacity: e2 }));
          };
          g3.prototype.renderLabel = function(d2, a2, h2, g4) {
            var k = this.axis, l2 = k.horiz, c = k.options, w = this.label, f = c.labels, n = f.step;
            k = m(this.tickmarkOffset, k.tickmarkOffset);
            var b = d2.x;
            d2 = d2.y;
            var u = true;
            w && e(b) && (w.xy = d2 = this.getLabelPosition(b, d2, w, l2, f, k, g4, n), this.isFirst && !this.isLast && !c.showFirstLabel || this.isLast && !this.isFirst && !c.showLastLabel ? u = false : !l2 || f.step || f.rotation || a2 || 0 === h2 || this.handleOverflow(d2), n && g4 % n && (u = false), u && e(d2.y) ? (d2.opacity = h2, w[this.isNewLabel ? "attr" : "animate"](d2).show(true), this.isNewLabel = false) : (w.hide(), this.isNewLabel = true));
          };
          g3.prototype.replaceMovedLabel = function() {
            var d2 = this.label, e2 = this.axis, a2 = e2.reversed;
            if (d2 && !this.isNew) {
              var h2 = e2.horiz ? a2 ? e2.left : e2.width + e2.left : d2.xy.x;
              a2 = e2.horiz ? d2.xy.y : a2 ? e2.width + e2.top : e2.top;
              d2.animate({ x: h2, y: a2, opacity: 0 }, void 0, d2.destroy);
              delete this.label;
            }
            e2.isDirty = true;
            this.label = this.movedLabel;
            delete this.movedLabel;
          };
          return g3;
        }();
        "";
        return g2;
      });
      K(g, "Core/Axis/Axis.js", [
        g["Core/Animation/AnimationUtilities.js"],
        g["Core/Axis/AxisDefaults.js"],
        g["Core/Color/Color.js"],
        g["Core/Defaults.js"],
        g["Core/Foundation.js"],
        g["Core/Globals.js"],
        g["Core/Axis/Tick.js"],
        g["Core/Utilities.js"]
      ], function(a, g2, x, F, C, B, H, t) {
        var r = a.animObject, l = F.defaultOptions, e = C.registerEventOptions, d = B.deg2rad, h = t.arrayMax, m = t.arrayMin, k = t.clamp, p = t.correctFloat, D = t.defined, I = t.destroyObjectProperties, E = t.erase, A = t.error, y = t.extend, c = t.fireEvent, w = t.isArray, f = t.isNumber, n = t.isString, b = t.merge, u = t.normalizeTickInterval, z = t.objectEach, q = t.pick, N = t.relativeLength, J = t.removeEvent, O = t.splat, Q = t.syncTimeout, T = function(b2, c2) {
          return u(c2, void 0, void 0, q(
            b2.options.allowDecimals,
            0.5 > c2 || void 0 !== b2.tickAmount
          ), !!b2.tickAmount);
        };
        a = function() {
          function a2(b2, c2) {
            this.zoomEnabled = this.width = this.visible = this.userOptions = this.translationSlope = this.transB = this.transA = this.top = this.ticks = this.tickRotCorr = this.tickPositions = this.tickmarkOffset = this.tickInterval = this.tickAmount = this.side = this.series = this.right = this.positiveValuesOnly = this.pos = this.pointRangePadding = this.pointRange = this.plotLinesAndBandsGroups = this.plotLinesAndBands = this.paddedTicks = this.overlap = this.options = this.offset = this.names = this.minPixelPadding = this.minorTicks = this.minorTickInterval = this.min = this.maxLabelLength = this.max = this.len = this.left = this.labelFormatter = this.labelEdge = this.isLinked = this.height = this.hasVisibleSeries = this.hasNames = this.eventOptions = this.coll = this.closestPointRange = this.chart = this.bottom = this.alternateBands = void 0;
            this.init(b2, c2);
          }
          a2.prototype.init = function(b2, d2) {
            var a3 = d2.isX;
            this.chart = b2;
            this.horiz = b2.inverted && !this.isZAxis ? !a3 : a3;
            this.isXAxis = a3;
            this.coll = this.coll || (a3 ? "xAxis" : "yAxis");
            c(
              this,
              "init",
              { userOptions: d2 }
            );
            this.opposite = q(d2.opposite, this.opposite);
            this.side = q(d2.side, this.side, this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3);
            this.setOptions(d2);
            var v = this.options, n2 = v.labels, h2 = v.type;
            this.userOptions = d2;
            this.minPixelPadding = 0;
            this.reversed = q(v.reversed, this.reversed);
            this.visible = v.visible;
            this.zoomEnabled = v.zoomEnabled;
            this.hasNames = "category" === h2 || true === v.categories;
            this.categories = v.categories || (this.hasNames ? [] : void 0);
            this.names || (this.names = [], this.names.keys = {});
            this.plotLinesAndBandsGroups = {};
            this.positiveValuesOnly = !!this.logarithmic;
            this.isLinked = D(v.linkedTo);
            this.ticks = {};
            this.labelEdge = [];
            this.minorTicks = {};
            this.plotLinesAndBands = [];
            this.alternateBands = {};
            this.len = 0;
            this.minRange = this.userMinRange = v.minRange || v.maxZoom;
            this.range = v.range;
            this.offset = v.offset || 0;
            this.min = this.max = null;
            d2 = q(v.crosshair, O(b2.options.tooltip.crosshairs)[a3 ? 0 : 1]);
            this.crosshair = true === d2 ? {} : d2;
            -1 === b2.axes.indexOf(this) && (a3 ? b2.axes.splice(b2.xAxis.length, 0, this) : b2.axes.push(this), b2[this.coll].push(this));
            this.series = this.series || [];
            b2.inverted && !this.isZAxis && a3 && "undefined" === typeof this.reversed && (this.reversed = true);
            this.labelRotation = f(n2.rotation) ? n2.rotation : void 0;
            e(this, v);
            c(this, "afterInit");
          };
          a2.prototype.setOptions = function(f2) {
            this.options = b(g2.defaultXAxisOptions, "yAxis" === this.coll && g2.defaultYAxisOptions, [g2.defaultTopAxisOptions, g2.defaultRightAxisOptions, g2.defaultBottomAxisOptions, g2.defaultLeftAxisOptions][this.side], b(l[this.coll], f2));
            c(this, "afterSetOptions", { userOptions: f2 });
          };
          a2.prototype.defaultLabelFormatter = function(b2) {
            var c2 = this.axis;
            b2 = this.chart.numberFormatter;
            var d2 = f(this.value) ? this.value : NaN, a3 = c2.chart.time, e2 = this.dateTimeLabelFormat, v = l.lang, n2 = v.numericSymbols;
            v = v.numericSymbolMagnitude || 1e3;
            var h2 = c2.logarithmic ? Math.abs(d2) : c2.tickInterval, q2 = n2 && n2.length;
            if (c2.categories)
              var u2 = "".concat(this.value);
            else if (e2)
              u2 = a3.dateFormat(e2, d2);
            else if (q2 && 1e3 <= h2)
              for (; q2-- && "undefined" === typeof u2; )
                c2 = Math.pow(v, q2 + 1), h2 >= c2 && 0 === 10 * d2 % c2 && null !== n2[q2] && 0 !== d2 && (u2 = b2(d2 / c2, -1) + n2[q2]);
            "undefined" === typeof u2 && (u2 = 1e4 <= Math.abs(d2) ? b2(
              d2,
              -1
            ) : b2(d2, -1, void 0, ""));
            return u2;
          };
          a2.prototype.getSeriesExtremes = function() {
            var b2 = this, d2 = b2.chart, a3;
            c(this, "getSeriesExtremes", null, function() {
              b2.hasVisibleSeries = false;
              b2.dataMin = b2.dataMax = b2.threshold = null;
              b2.softThreshold = !b2.isXAxis;
              b2.series.forEach(function(c2) {
                if (c2.visible || !d2.options.chart.ignoreHiddenSeries) {
                  var e2 = c2.options, v = e2.threshold;
                  b2.hasVisibleSeries = true;
                  b2.positiveValuesOnly && 0 >= v && (v = null);
                  if (b2.isXAxis) {
                    if (e2 = c2.xData, e2.length) {
                      e2 = b2.logarithmic ? e2.filter(b2.validatePositiveValue) : e2;
                      a3 = c2.getXExtremes(e2);
                      var n2 = a3.min;
                      var h2 = a3.max;
                      f(n2) || n2 instanceof Date || (e2 = e2.filter(f), a3 = c2.getXExtremes(e2), n2 = a3.min, h2 = a3.max);
                      e2.length && (b2.dataMin = Math.min(q(b2.dataMin, n2), n2), b2.dataMax = Math.max(q(b2.dataMax, h2), h2));
                    }
                  } else if (c2 = c2.applyExtremes(), f(c2.dataMin) && (n2 = c2.dataMin, b2.dataMin = Math.min(q(b2.dataMin, n2), n2)), f(c2.dataMax) && (h2 = c2.dataMax, b2.dataMax = Math.max(q(b2.dataMax, h2), h2)), D(v) && (b2.threshold = v), !e2.softThreshold || b2.positiveValuesOnly)
                    b2.softThreshold = false;
                }
              });
            });
            c(this, "afterGetSeriesExtremes");
          };
          a2.prototype.translate = function(b2, c2, d2, a3, e2, n2) {
            var v = this.linkedParent || this, h2 = a3 && v.old ? v.old.min : v.min;
            if (!f(h2))
              return NaN;
            var q2 = v.minPixelPadding;
            e2 = (v.isOrdinal || v.brokenAxis && v.brokenAxis.hasBreaks || v.logarithmic && e2) && v.lin2val;
            var u2 = 1, G = 0;
            a3 = a3 && v.old ? v.old.transA : v.transA;
            a3 || (a3 = v.transA);
            d2 && (u2 *= -1, G = v.len);
            v.reversed && (u2 *= -1, G -= u2 * (v.sector || v.len));
            c2 ? (n2 = (b2 * u2 + G - q2) / a3 + h2, e2 && (n2 = v.lin2val(n2))) : (e2 && (b2 = v.val2lin(b2)), b2 = u2 * (b2 - h2) * a3, n2 = (v.isRadial ? b2 : p(b2)) + G + u2 * q2 + (f(n2) ? a3 * n2 : 0));
            return n2;
          };
          a2.prototype.toPixels = function(b2, c2) {
            return this.translate(
              b2,
              false,
              !this.horiz,
              void 0,
              true
            ) + (c2 ? 0 : this.pos);
          };
          a2.prototype.toValue = function(b2, c2) {
            return this.translate(b2 - (c2 ? 0 : this.pos), true, !this.horiz, void 0, true);
          };
          a2.prototype.getPlotLinePath = function(b2) {
            function d2(b3, c2, f2) {
              "pass" !== p2 && (b3 < c2 || b3 > f2) && (p2 ? b3 = k(b3, c2, f2) : r2 = true);
              return b3;
            }
            var a3 = this, e2 = a3.chart, v = a3.left, n2 = a3.top, h2 = b2.old, u2 = b2.value, g3 = b2.lineWidth, z2 = h2 && e2.oldChartHeight || e2.chartHeight, w2 = h2 && e2.oldChartWidth || e2.chartWidth, m2 = a3.transB, l2 = b2.translatedValue, p2 = b2.force, J2, N2, y2, O2, r2;
            b2 = {
              value: u2,
              lineWidth: g3,
              old: h2,
              force: p2,
              acrossPanes: b2.acrossPanes,
              translatedValue: l2
            };
            c(this, "getPlotLinePath", b2, function(b3) {
              l2 = q(l2, a3.translate(u2, void 0, void 0, h2));
              l2 = k(l2, -1e5, 1e5);
              J2 = y2 = Math.round(l2 + m2);
              N2 = O2 = Math.round(z2 - l2 - m2);
              f(l2) ? a3.horiz ? (N2 = n2, O2 = z2 - a3.bottom, J2 = y2 = d2(J2, v, v + a3.width)) : (J2 = v, y2 = w2 - a3.right, N2 = O2 = d2(N2, n2, n2 + a3.height)) : (r2 = true, p2 = false);
              b3.path = r2 && !p2 ? null : e2.renderer.crispLine([["M", J2, N2], ["L", y2, O2]], g3 || 1);
            });
            return b2.path;
          };
          a2.prototype.getLinearTickPositions = function(b2, c2, f2) {
            var d2 = p(Math.floor(c2 / b2) * b2);
            f2 = p(Math.ceil(f2 / b2) * b2);
            var a3 = [], e2;
            p(d2 + b2) === d2 && (e2 = 20);
            if (this.single)
              return [c2];
            for (c2 = d2; c2 <= f2; ) {
              a3.push(c2);
              c2 = p(c2 + b2, e2);
              if (c2 === v)
                break;
              var v = c2;
            }
            return a3;
          };
          a2.prototype.getMinorTickInterval = function() {
            var b2 = this.options;
            return true === b2.minorTicks ? q(b2.minorTickInterval, "auto") : false === b2.minorTicks ? null : b2.minorTickInterval;
          };
          a2.prototype.getMinorTickPositions = function() {
            var b2 = this.options, c2 = this.tickPositions, f2 = this.minorTickInterval, d2 = this.pointRangePadding || 0, a3 = this.min - d2;
            d2 = this.max + d2;
            var e2 = d2 - a3, n2 = [];
            if (e2 && e2 / f2 < this.len / 3) {
              var h2 = this.logarithmic;
              if (h2)
                this.paddedTicks.forEach(function(b3, c3, d3) {
                  c3 && n2.push.apply(
                    n2,
                    h2.getLogTickPositions(f2, d3[c3 - 1], d3[c3], true)
                  );
                });
              else if (this.dateTime && "auto" === this.getMinorTickInterval())
                n2 = n2.concat(this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(f2), a3, d2, b2.startOfWeek));
              else
                for (b2 = a3 + (c2[0] - a3) % f2; b2 <= d2 && b2 !== n2[0]; b2 += f2)
                  n2.push(b2);
            }
            0 !== n2.length && this.trimTicks(n2);
            return n2;
          };
          a2.prototype.adjustForMinRange = function() {
            var b2 = this.options, c2 = this.logarithmic, f2 = this.min, d2 = this.max, a3 = 0, e2, n2, u2, g3;
            this.isXAxis && "undefined" === typeof this.minRange && !c2 && (D(b2.min) || D(b2.max) || D(b2.floor) || D(b2.ceiling) ? this.minRange = null : (this.series.forEach(function(b3) {
              u2 = b3.xData;
              g3 = b3.xIncrement ? 1 : u2.length - 1;
              if (1 < u2.length) {
                for (e2 = g3; 0 < e2; e2--)
                  if (n2 = u2[e2] - u2[e2 - 1], !a3 || n2 < a3)
                    a3 = n2;
              }
            }), this.minRange = Math.min(5 * a3, this.dataMax - this.dataMin)));
            if (d2 - f2 < this.minRange) {
              var z2 = this.dataMax - this.dataMin >= this.minRange;
              var k2 = this.minRange;
              var w2 = (k2 - d2 + f2) / 2;
              w2 = [f2 - w2, q(b2.min, f2 - w2)];
              z2 && (w2[2] = this.logarithmic ? this.logarithmic.log2lin(this.dataMin) : this.dataMin);
              f2 = h(w2);
              d2 = [f2 + k2, q(b2.max, f2 + k2)];
              z2 && (d2[2] = c2 ? c2.log2lin(this.dataMax) : this.dataMax);
              d2 = m(d2);
              d2 - f2 < k2 && (w2[0] = d2 - k2, w2[1] = q(b2.min, d2 - k2), f2 = h(w2));
            }
            this.min = f2;
            this.max = d2;
          };
          a2.prototype.getClosest = function() {
            var b2;
            this.categories ? b2 = 1 : this.series.forEach(function(c2) {
              var f2 = c2.closestPointRange, d2 = c2.visible || !c2.chart.options.chart.ignoreHiddenSeries;
              !c2.noSharedTooltip && D(f2) && d2 && (b2 = D(b2) ? Math.min(b2, f2) : f2);
            });
            return b2;
          };
          a2.prototype.nameToX = function(b2) {
            var c2 = w(this.options.categories), f2 = c2 ? this.categories : this.names, d2 = b2.options.x;
            b2.series.requireSorting = false;
            D(d2) || (d2 = this.options.uniqueNames && f2 ? c2 ? f2.indexOf(b2.name) : q(
              f2.keys[b2.name],
              -1
            ) : b2.series.autoIncrement());
            if (-1 === d2) {
              if (!c2 && f2)
                var a3 = f2.length;
            } else
              a3 = d2;
            "undefined" !== typeof a3 ? (this.names[a3] = b2.name, this.names.keys[b2.name] = a3) : b2.x && (a3 = b2.x);
            return a3;
          };
          a2.prototype.updateNames = function() {
            var b2 = this, c2 = this.names;
            0 < c2.length && (Object.keys(c2.keys).forEach(function(b3) {
              delete c2.keys[b3];
            }), c2.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(c3) {
              c3.xIncrement = null;
              if (!c3.points || c3.isDirtyData)
                b2.max = Math.max(b2.max, c3.xData.length - 1), c3.processData(), c3.generatePoints();
              c3.data.forEach(function(f2, d2) {
                if (f2 && f2.options && "undefined" !== typeof f2.name) {
                  var a3 = b2.nameToX(f2);
                  "undefined" !== typeof a3 && a3 !== f2.x && (f2.x = a3, c3.xData[d2] = a3);
                }
              });
            }));
          };
          a2.prototype.setAxisTranslation = function() {
            var b2 = this, f2 = b2.max - b2.min, d2 = b2.linkedParent, a3 = !!b2.categories, e2 = b2.isXAxis, h2 = b2.axisPointRange || 0, u2 = 0, g3 = 0, k2 = b2.transA;
            if (e2 || a3 || h2) {
              var z2 = b2.getClosest();
              d2 ? (u2 = d2.minPointOffset, g3 = d2.pointRangePadding) : b2.series.forEach(function(c2) {
                var f3 = a3 ? 1 : e2 ? q(c2.options.pointRange, z2, 0) : b2.axisPointRange || 0, d3 = c2.options.pointPlacement;
                h2 = Math.max(h2, f3);
                if (!b2.single || a3)
                  c2 = c2.is("xrange") ? !e2 : e2, u2 = Math.max(u2, c2 && n(d3) ? 0 : f3 / 2), g3 = Math.max(g3, c2 && "on" === d3 ? 0 : f3);
              });
              d2 = b2.ordinal && b2.ordinal.slope && z2 ? b2.ordinal.slope / z2 : 1;
              b2.minPointOffset = u2 *= d2;
              b2.pointRangePadding = g3 *= d2;
              b2.pointRange = Math.min(h2, b2.single && a3 ? 1 : f2);
              e2 && (b2.closestPointRange = z2);
            }
            b2.translationSlope = b2.transA = k2 = b2.staticScale || b2.len / (f2 + g3 || 1);
            b2.transB = b2.horiz ? b2.left : b2.bottom;
            b2.minPixelPadding = k2 * u2;
            c(this, "afterSetAxisTranslation");
          };
          a2.prototype.minFromRange = function() {
            return this.max - this.range;
          };
          a2.prototype.setTickInterval = function(b2) {
            var d2 = this.chart, a3 = this.logarithmic, e2 = this.options, n2 = this.isXAxis, h2 = this.isLinked, u2 = e2.tickPixelInterval, v = this.categories, g3 = this.softThreshold, k2 = e2.maxPadding, z2 = e2.minPadding, w2 = f(e2.tickInterval) && 0 <= e2.tickInterval ? e2.tickInterval : void 0, m2 = f(this.threshold) ? this.threshold : null;
            this.dateTime || v || h2 || this.getTickAmount();
            var l2 = q(this.userMin, e2.min);
            var J2 = q(this.userMax, e2.max);
            if (h2) {
              this.linkedParent = d2[this.coll][e2.linkedTo];
              var N2 = this.linkedParent.getExtremes();
              this.min = q(N2.min, N2.dataMin);
              this.max = q(N2.max, N2.dataMax);
              e2.type !== this.linkedParent.options.type && A(11, 1, d2);
            } else {
              if (g3 && D(m2)) {
                if (this.dataMin >= m2)
                  N2 = m2, z2 = 0;
                else if (this.dataMax <= m2) {
                  var y2 = m2;
                  k2 = 0;
                }
              }
              this.min = q(l2, N2, this.dataMin);
              this.max = q(J2, y2, this.dataMax);
            }
            a3 && (this.positiveValuesOnly && !b2 && 0 >= Math.min(this.min, q(this.dataMin, this.min)) && A(10, 1, d2), this.min = p(a3.log2lin(this.min), 16), this.max = p(a3.log2lin(this.max), 16));
            this.range && D(this.max) && (this.userMin = this.min = l2 = Math.max(this.dataMin, this.minFromRange()), this.userMax = J2 = this.max, this.range = null);
            c(this, "foundExtremes");
            this.beforePadding && this.beforePadding();
            this.adjustForMinRange();
            !(v || this.axisPointRange || this.stacking && this.stacking.usePercentage || h2) && D(this.min) && D(this.max) && (d2 = this.max - this.min) && (!D(l2) && z2 && (this.min -= d2 * z2), !D(J2) && k2 && (this.max += d2 * k2));
            f(this.userMin) || (f(e2.softMin) && e2.softMin < this.min && (this.min = l2 = e2.softMin), f(e2.floor) && (this.min = Math.max(this.min, e2.floor)));
            f(this.userMax) || (f(e2.softMax) && e2.softMax > this.max && (this.max = J2 = e2.softMax), f(e2.ceiling) && (this.max = Math.min(
              this.max,
              e2.ceiling
            )));
            g3 && D(this.dataMin) && (m2 = m2 || 0, !D(l2) && this.min < m2 && this.dataMin >= m2 ? this.min = this.options.minRange ? Math.min(m2, this.max - this.minRange) : m2 : !D(J2) && this.max > m2 && this.dataMax <= m2 && (this.max = this.options.minRange ? Math.max(m2, this.min + this.minRange) : m2));
            f(this.min) && f(this.max) && !this.chart.polar && this.min > this.max && (D(this.options.min) ? this.max = this.min : D(this.options.max) && (this.min = this.max));
            this.tickInterval = this.min === this.max || "undefined" === typeof this.min || "undefined" === typeof this.max ? 1 : h2 && this.linkedParent && !w2 && u2 === this.linkedParent.options.tickPixelInterval ? w2 = this.linkedParent.tickInterval : q(w2, this.tickAmount ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1) : void 0, v ? 1 : (this.max - this.min) * u2 / Math.max(this.len, u2));
            if (n2 && !b2) {
              var O2 = this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max);
              this.series.forEach(function(b3) {
                b3.forceCrop = b3.forceCropping && b3.forceCropping();
                b3.processData(O2);
              });
              c(this, "postProcessData", { hasExtremesChanged: O2 });
            }
            this.setAxisTranslation();
            c(this, "initialAxisTranslation");
            this.pointRange && !w2 && (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
            b2 = q(e2.minTickInterval, this.dateTime && !this.series.some(function(b3) {
              return b3.noSharedTooltip;
            }) ? this.closestPointRange : 0);
            !w2 && this.tickInterval < b2 && (this.tickInterval = b2);
            this.dateTime || this.logarithmic || w2 || (this.tickInterval = T(this, this.tickInterval));
            this.tickAmount || (this.tickInterval = this.unsquish());
            this.setTickPositions();
          };
          a2.prototype.setTickPositions = function() {
            var b2 = this.options, d2 = b2.tickPositions, a3 = b2.tickPositioner, e2 = this.getMinorTickInterval(), n2 = this.hasVerticalPanning(), h2 = "colorAxis" === this.coll, u2 = (h2 || !n2) && b2.startOnTick;
            n2 = (h2 || !n2) && b2.endOnTick;
            h2 = [];
            var q2;
            this.tickmarkOffset = this.categories && "between" === b2.tickmarkPlacement && 1 === this.tickInterval ? 0.5 : 0;
            this.minorTickInterval = "auto" === e2 && this.tickInterval ? this.tickInterval / 5 : e2;
            this.single = this.min === this.max && D(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || false !== b2.allowDecimals);
            if (d2)
              h2 = d2.slice();
            else if (f(this.min) && f(this.max)) {
              if (this.ordinal && this.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)))
                if (this.dateTime)
                  h2 = this.getTimeTicks(this.dateTime.normalizeTimeTickInterval(this.tickInterval, b2.units), this.min, this.max, b2.startOfWeek, this.ordinal && this.ordinal.positions, this.closestPointRange, true);
                else if (this.logarithmic)
                  h2 = this.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
                else
                  for (e2 = b2 = this.tickInterval; e2 <= 2 * b2; )
                    if (h2 = this.getLinearTickPositions(this.tickInterval, this.min, this.max), this.tickAmount && h2.length > this.tickAmount)
                      this.tickInterval = T(this, e2 *= 1.1);
                    else
                      break;
              else
                h2 = [this.min, this.max], A(19, false, this.chart);
              h2.length > this.len && (h2 = [h2[0], h2[h2.length - 1]], h2[0] === h2[1] && (h2.length = 1));
              a3 && (this.tickPositions = h2, (q2 = a3.apply(this, [this.min, this.max])) && (h2 = q2));
            }
            this.tickPositions = h2;
            this.paddedTicks = h2.slice(0);
            this.trimTicks(h2, u2, n2);
            !this.isLinked && f(this.min) && f(this.max) && (this.single && 2 > h2.length && !this.categories && !this.series.some(function(b3) {
              return b3.is("heatmap") && "between" === b3.options.pointPlacement;
            }) && (this.min -= 0.5, this.max += 0.5), d2 || q2 || this.adjustTickAmount());
            c(this, "afterSetTickPositions");
          };
          a2.prototype.trimTicks = function(b2, f2, d2) {
            var a3 = b2[0], e2 = b2[b2.length - 1], h2 = !this.isOrdinal && this.minPointOffset || 0;
            c(this, "trimTicks");
            if (!this.isLinked) {
              if (f2 && -Infinity !== a3)
                this.min = a3;
              else
                for (; this.min - h2 > b2[0]; )
                  b2.shift();
              if (d2)
                this.max = e2;
              else
                for (; this.max + h2 < b2[b2.length - 1]; )
                  b2.pop();
              0 === b2.length && D(a3) && !this.options.tickPositions && b2.push((e2 + a3) / 2);
            }
          };
          a2.prototype.alignToOthers = function() {
            var b2 = this, c2 = [this], d2 = b2.options, a3 = "yAxis" === this.coll && this.chart.options.chart.alignThresholds, e2 = [], h2;
            b2.thresholdAlignment = void 0;
            if ((false !== this.chart.options.chart.alignTicks && d2.alignTicks || a3) && false !== d2.startOnTick && false !== d2.endOnTick && !b2.logarithmic) {
              var n2 = function(b3) {
                var c3 = b3.options;
                return [b3.horiz ? c3.left : c3.top, c3.width, c3.height, c3.pane].join();
              }, u2 = n2(this);
              this.chart[this.coll].forEach(function(f2) {
                var d3 = f2.series;
                d3.length && d3.some(function(b3) {
                  return b3.visible;
                }) && f2 !== b2 && n2(f2) === u2 && (h2 = true, c2.push(f2));
              });
            }
            if (h2 && a3) {
              c2.forEach(function(c3) {
                c3 = c3.getThresholdAlignment(b2);
                f(c3) && e2.push(c3);
              });
              var q2 = 1 < e2.length ? e2.reduce(function(b3, c3) {
                return b3 + c3;
              }, 0) / e2.length : void 0;
              c2.forEach(function(b3) {
                b3.thresholdAlignment = q2;
              });
            }
            return h2;
          };
          a2.prototype.getThresholdAlignment = function(b2) {
            (!f(this.dataMin) || this !== b2 && this.series.some(function(b3) {
              return b3.isDirty || b3.isDirtyData;
            })) && this.getSeriesExtremes();
            if (f(this.threshold))
              return b2 = k((this.threshold - (this.dataMin || 0)) / ((this.dataMax || 0) - (this.dataMin || 0)), 0, 1), this.options.reversed && (b2 = 1 - b2), b2;
          };
          a2.prototype.getTickAmount = function() {
            var b2 = this.options, c2 = b2.tickPixelInterval, f2 = b2.tickAmount;
            !D(b2.tickInterval) && !f2 && this.len < c2 && !this.isRadial && !this.logarithmic && b2.startOnTick && b2.endOnTick && (f2 = 2);
            !f2 && this.alignToOthers() && (f2 = Math.ceil(this.len / c2) + 1);
            4 > f2 && (this.finalTickAmt = f2, f2 = 5);
            this.tickAmount = f2;
          };
          a2.prototype.adjustTickAmount = function() {
            var b2 = this, c2 = b2.finalTickAmt, d2 = b2.max, a3 = b2.min, e2 = b2.options, h2 = b2.tickPositions, n2 = b2.tickAmount, u2 = b2.thresholdAlignment, g3 = h2 && h2.length, k2 = q(b2.threshold, b2.softThreshold ? 0 : null);
            var z2 = b2.tickInterval;
            if (f(u2)) {
              var w2 = 0.5 > u2 ? Math.ceil(u2 * (n2 - 1)) : Math.floor(u2 * (n2 - 1));
              e2.reversed && (w2 = n2 - 1 - w2);
            }
            if (b2.hasData() && f(a3) && f(d2)) {
              u2 = function() {
                b2.transA *= (g3 - 1) / (n2 - 1);
                b2.min = e2.startOnTick ? h2[0] : Math.min(a3, h2[0]);
                b2.max = e2.endOnTick ? h2[h2.length - 1] : Math.max(d2, h2[h2.length - 1]);
              };
              if (f(w2) && f(b2.threshold)) {
                for (; h2[w2] !== k2 || h2.length !== n2 || h2[0] > a3 || h2[h2.length - 1] < d2; ) {
                  h2.length = 0;
                  for (h2.push(b2.threshold); h2.length < n2; )
                    void 0 === h2[w2] || h2[w2] > b2.threshold ? h2.unshift(p(h2[0] - z2)) : h2.push(p(h2[h2.length - 1] + z2));
                  if (z2 > 8 * b2.tickInterval)
                    break;
                  z2 *= 2;
                }
                u2();
              } else if (g3 < n2) {
                for (; h2.length < n2; )
                  h2.length % 2 || a3 === k2 ? h2.push(p(h2[h2.length - 1] + z2)) : h2.unshift(p(h2[0] - z2));
                u2();
              }
              if (D(c2)) {
                for (z2 = k2 = h2.length; z2--; )
                  (3 === c2 && 1 === z2 % 2 || 2 >= c2 && 0 < z2 && z2 < k2 - 1) && h2.splice(z2, 1);
                b2.finalTickAmt = void 0;
              }
            }
          };
          a2.prototype.setScale = function() {
            var b2 = false, f2 = false;
            this.series.forEach(function(c2) {
              b2 = b2 || c2.isDirtyData || c2.isDirty;
              f2 = f2 || c2.xAxis && c2.xAxis.isDirty || false;
            });
            this.setAxisSize();
            var d2 = this.len !== (this.old && this.old.len);
            d2 || b2 || f2 || this.isLinked || this.forceRedraw || this.userMin !== (this.old && this.old.userMin) || this.userMax !== (this.old && this.old.userMax) || this.alignToOthers() ? (this.stacking && (this.stacking.resetStacks(), this.stacking.buildStacks()), this.forceRedraw = false, this.getSeriesExtremes(), this.setTickInterval(), this.isDirty || (this.isDirty = d2 || this.min !== (this.old && this.old.min) || this.max !== (this.old && this.old.max))) : this.stacking && this.stacking.cleanStacks();
            b2 && this.panningState && (this.panningState.isDirty = true);
            c(this, "afterSetScale");
          };
          a2.prototype.setExtremes = function(b2, f2, d2, a3, e2) {
            var h2 = this, n2 = h2.chart;
            d2 = q(d2, true);
            h2.series.forEach(function(b3) {
              delete b3.kdTree;
            });
            e2 = y(e2, {
              min: b2,
              max: f2
            });
            c(h2, "setExtremes", e2, function() {
              h2.userMin = b2;
              h2.userMax = f2;
              h2.eventArgs = e2;
              d2 && n2.redraw(a3);
            });
          };
          a2.prototype.zoom = function(b2, f2) {
            var d2 = this, a3 = this.dataMin, e2 = this.dataMax, h2 = this.options, n2 = Math.min(a3, q(h2.min, a3)), u2 = Math.max(e2, q(h2.max, e2));
            b2 = { newMin: b2, newMax: f2 };
            c(this, "zoom", b2, function(b3) {
              var c2 = b3.newMin, f3 = b3.newMax;
              if (c2 !== d2.min || f3 !== d2.max)
                d2.allowZoomOutside || (D(a3) && (c2 < n2 && (c2 = n2), c2 > u2 && (c2 = u2)), D(e2) && (f3 < n2 && (f3 = n2), f3 > u2 && (f3 = u2))), d2.displayBtn = "undefined" !== typeof c2 || "undefined" !== typeof f3, d2.setExtremes(
                  c2,
                  f3,
                  false,
                  void 0,
                  { trigger: "zoom" }
                );
              b3.zoomed = true;
            });
            return b2.zoomed;
          };
          a2.prototype.setAxisSize = function() {
            var b2 = this.chart, c2 = this.options, f2 = c2.offsets || [0, 0, 0, 0], d2 = this.horiz, a3 = this.width = Math.round(N(q(c2.width, b2.plotWidth - f2[3] + f2[1]), b2.plotWidth)), e2 = this.height = Math.round(N(q(c2.height, b2.plotHeight - f2[0] + f2[2]), b2.plotHeight)), h2 = this.top = Math.round(N(q(c2.top, b2.plotTop + f2[0]), b2.plotHeight, b2.plotTop));
            c2 = this.left = Math.round(N(q(c2.left, b2.plotLeft + f2[3]), b2.plotWidth, b2.plotLeft));
            this.bottom = b2.chartHeight - e2 - h2;
            this.right = b2.chartWidth - a3 - c2;
            this.len = Math.max(d2 ? a3 : e2, 0);
            this.pos = d2 ? c2 : h2;
          };
          a2.prototype.getExtremes = function() {
            var b2 = this.logarithmic;
            return { min: b2 ? p(b2.lin2log(this.min)) : this.min, max: b2 ? p(b2.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax };
          };
          a2.prototype.getThreshold = function(b2) {
            var c2 = this.logarithmic, f2 = c2 ? c2.lin2log(this.min) : this.min;
            c2 = c2 ? c2.lin2log(this.max) : this.max;
            null === b2 || -Infinity === b2 ? b2 = f2 : Infinity === b2 ? b2 = c2 : f2 > b2 ? b2 = f2 : c2 < b2 && (b2 = c2);
            return this.translate(b2, 0, 1, 0, 1);
          };
          a2.prototype.autoLabelAlign = function(b2) {
            var f2 = (q(b2, 0) - 90 * this.side + 720) % 360;
            b2 = { align: "center" };
            c(this, "autoLabelAlign", b2, function(b3) {
              15 < f2 && 165 > f2 ? b3.align = "right" : 195 < f2 && 345 > f2 && (b3.align = "left");
            });
            return b2.align;
          };
          a2.prototype.tickSize = function(b2) {
            var f2 = this.options, d2 = q(f2["tick" === b2 ? "tickWidth" : "minorTickWidth"], "tick" === b2 && this.isXAxis && !this.categories ? 1 : 0), a3 = f2["tick" === b2 ? "tickLength" : "minorTickLength"];
            if (d2 && a3) {
              "inside" === f2[b2 + "Position"] && (a3 = -a3);
              var e2 = [a3, d2];
            }
            b2 = { tickSize: e2 };
            c(this, "afterTickSize", b2);
            return b2.tickSize;
          };
          a2.prototype.labelMetrics = function() {
            var b2 = this.tickPositions && this.tickPositions[0] || 0;
            return this.chart.renderer.fontMetrics(this.options.labels.style.fontSize, this.ticks[b2] && this.ticks[b2].label);
          };
          a2.prototype.unsquish = function() {
            var b2 = this.options.labels, c2 = this.horiz, a3 = this.tickInterval, e2 = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / a3), h2 = b2.rotation, n2 = this.labelMetrics(), u2 = Math.max(this.max - this.min, 0), g3 = function(b3) {
              var c3 = b3 / (e2 || 1);
              c3 = 1 < c3 ? Math.ceil(c3) : 1;
              c3 * a3 > u2 && Infinity !== b3 && Infinity !== e2 && u2 && (c3 = Math.ceil(u2 / a3));
              return p(c3 * a3);
            }, z2 = a3, k2 = Number.MAX_VALUE;
            if (c2) {
              if (!b2.staggerLines)
                if (f(h2))
                  var w2 = [h2];
                else
                  e2 < b2.autoRotationLimit && (w2 = b2.autoRotation);
              if (w2)
                for (var m2 = c2 = void 0, l2 = 0, J2 = w2; l2 < J2.length; l2++) {
                  var N2 = J2[l2];
                  if (N2 === h2 || N2 && -90 <= N2 && 90 >= N2) {
                    if (c2 = g3(Math.abs(n2.h / Math.sin(d * N2))), m2 = c2 + Math.abs(N2 / 360), m2 < k2) {
                      k2 = m2;
                      var y2 = N2;
                      z2 = c2;
                    }
                  }
                }
            } else
              z2 = g3(n2.h);
            this.autoRotation = w2;
            this.labelRotation = q(y2, f(h2) ? h2 : 0);
            return b2.step ? a3 : z2;
          };
          a2.prototype.getSlotWidth = function(b2) {
            var c2 = this.chart, d2 = this.horiz, a3 = this.options.labels, e2 = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), h2 = c2.margin[3];
            if (b2 && f(b2.slotWidth))
              return b2.slotWidth;
            if (d2 && 2 > a3.step)
              return a3.rotation ? 0 : (this.staggerLines || 1) * this.len / e2;
            if (!d2) {
              b2 = a3.style.width;
              if (void 0 !== b2)
                return parseInt(String(b2), 10);
              if (h2)
                return h2 - c2.spacing[3];
            }
            return 0.33 * c2.chartWidth;
          };
          a2.prototype.renderUnsquish = function() {
            var b2 = this.chart, c2 = b2.renderer, f2 = this.tickPositions, d2 = this.ticks, a3 = this.options.labels, e2 = a3.style, h2 = this.horiz, u2 = this.getSlotWidth(), q2 = Math.max(1, Math.round(u2 - 2 * a3.padding)), g3 = {}, z2 = this.labelMetrics(), k2 = e2.textOverflow, w2 = 0;
            n(a3.rotation) || (g3.rotation = a3.rotation || 0);
            f2.forEach(function(b3) {
              b3 = d2[b3];
              b3.movedLabel && b3.replaceMovedLabel();
              b3 && b3.label && b3.label.textPxLength > w2 && (w2 = b3.label.textPxLength);
            });
            this.maxLabelLength = w2;
            if (this.autoRotation)
              w2 > q2 && w2 > z2.h ? g3.rotation = this.labelRotation : this.labelRotation = 0;
            else if (u2) {
              var m2 = q2;
              if (!k2) {
                var l2 = "clip";
                for (q2 = f2.length; !h2 && q2--; ) {
                  var p2 = f2[q2];
                  if (p2 = d2[p2].label)
                    p2.styles && "ellipsis" === p2.styles.textOverflow ? p2.css({ textOverflow: "clip" }) : p2.textPxLength > u2 && p2.css({ width: u2 + "px" }), p2.getBBox().height > this.len / f2.length - (z2.h - z2.f) && (p2.specificTextOverflow = "ellipsis");
                }
              }
            }
            g3.rotation && (m2 = w2 > 0.5 * b2.chartHeight ? 0.33 * b2.chartHeight : w2, k2 || (l2 = "ellipsis"));
            if (this.labelAlign = a3.align || this.autoLabelAlign(this.labelRotation))
              g3.align = this.labelAlign;
            f2.forEach(function(b3) {
              var c3 = (b3 = d2[b3]) && b3.label, f3 = e2.width, a4 = {};
              c3 && (c3.attr(g3), b3.shortenLabel ? b3.shortenLabel() : m2 && !f3 && "nowrap" !== e2.whiteSpace && (m2 < c3.textPxLength || "SPAN" === c3.element.tagName) ? (a4.width = m2 + "px", k2 || (a4.textOverflow = c3.specificTextOverflow || l2), c3.css(a4)) : c3.styles && c3.styles.width && !a4.width && !f3 && c3.css({ width: null }), delete c3.specificTextOverflow, b3.rotation = g3.rotation);
            }, this);
            this.tickRotCorr = c2.rotCorr(z2.b, this.labelRotation || 0, 0 !== this.side);
          };
          a2.prototype.hasData = function() {
            return this.series.some(function(b2) {
              return b2.hasData();
            }) || this.options.showEmpty && D(this.min) && D(this.max);
          };
          a2.prototype.addTitle = function(c2) {
            var f2 = this.chart.renderer, d2 = this.horiz, a3 = this.opposite, e2 = this.options.title, h2 = this.chart.styledMode, n2;
            this.axisTitle || ((n2 = e2.textAlign) || (n2 = (d2 ? {
              low: "left",
              middle: "center",
              high: "right"
            } : { low: a3 ? "right" : "left", middle: "center", high: a3 ? "left" : "right" })[e2.align]), this.axisTitle = f2.text(e2.text || "", 0, 0, e2.useHTML).attr({ zIndex: 7, rotation: e2.rotation, align: n2 }).addClass("highcharts-axis-title"), h2 || this.axisTitle.css(b(e2.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = true);
            h2 || e2.style.width || this.isRadial || this.axisTitle.css({ width: this.len + "px" });
            this.axisTitle[c2 ? "show" : "hide"](c2);
          };
          a2.prototype.generateTick = function(b2) {
            var c2 = this.ticks;
            c2[b2] ? c2[b2].addLabel() : c2[b2] = new H(
              this,
              b2
            );
          };
          a2.prototype.getOffset = function() {
            var b2 = this, f2 = this, d2 = f2.chart, a3 = f2.horiz, e2 = f2.options, h2 = f2.side, n2 = f2.ticks, u2 = f2.tickPositions, g3 = f2.coll, k2 = f2.axisParent, w2 = d2.renderer, m2 = d2.inverted && !f2.isZAxis ? [1, 0, 3, 2][h2] : h2, l2 = f2.hasData(), p2 = e2.title, N2 = e2.labels, J2 = d2.axisOffset;
            d2 = d2.clipOffset;
            var y2 = [-1, 1, 1, -1][h2], O2 = e2.className, r2, Q2 = 0, ja = 0, da = 0;
            f2.showAxis = r2 = l2 || e2.showEmpty;
            f2.staggerLines = f2.horiz && N2.staggerLines || void 0;
            if (!f2.axisGroup) {
              var I2 = function(c2, f3, d3) {
                return w2.g(c2).attr({ zIndex: d3 }).addClass("highcharts-".concat(g3.toLowerCase()).concat(
                  f3,
                  " "
                ) + (b2.isRadial ? "highcharts-radial-axis".concat(f3, " ") : "") + (O2 || "")).add(k2);
              };
              f2.gridGroup = I2("grid", "-grid", e2.gridZIndex);
              f2.axisGroup = I2("axis", "", e2.zIndex);
              f2.labelGroup = I2("axis-labels", "-labels", N2.zIndex);
            }
            l2 || f2.isLinked ? (u2.forEach(function(b3) {
              f2.generateTick(b3);
            }), f2.renderUnsquish(), f2.reserveSpaceDefault = 0 === h2 || 2 === h2 || { 1: "left", 3: "right" }[h2] === f2.labelAlign, q(N2.reserveSpace, "center" === f2.labelAlign ? true : null, f2.reserveSpaceDefault) && u2.forEach(function(b3) {
              da = Math.max(n2[b3].getLabelSize(), da);
            }), f2.staggerLines && (da *= f2.staggerLines), f2.labelOffset = da * (f2.opposite ? -1 : 1)) : z(n2, function(b3, c2) {
              b3.destroy();
              delete n2[c2];
            });
            if (p2 && p2.text && false !== p2.enabled && (f2.addTitle(r2), r2 && false !== p2.reserveSpace)) {
              f2.titleOffset = Q2 = f2.axisTitle.getBBox()[a3 ? "height" : "width"];
              var t2 = p2.offset;
              ja = D(t2) ? 0 : q(p2.margin, a3 ? 5 : 10);
            }
            f2.renderLine();
            f2.offset = y2 * q(e2.offset, J2[h2] ? J2[h2] + (e2.margin || 0) : 0);
            f2.tickRotCorr = f2.tickRotCorr || { x: 0, y: 0 };
            p2 = 0 === h2 ? -f2.labelMetrics().h : 2 === h2 ? f2.tickRotCorr.y : 0;
            l2 = Math.abs(da) + ja;
            da && (l2 = l2 - p2 + y2 * (a3 ? q(N2.y, f2.tickRotCorr.y + 8 * y2) : N2.x));
            f2.axisTitleMargin = q(t2, l2);
            f2.getMaxLabelDimensions && (f2.maxLabelDimensions = f2.getMaxLabelDimensions(n2, u2));
            "colorAxis" !== g3 && (a3 = this.tickSize("tick"), J2[h2] = Math.max(J2[h2], (f2.axisTitleMargin || 0) + Q2 + y2 * f2.offset, l2, u2 && u2.length && a3 ? a3[0] + y2 * f2.offset : 0), e2 = !f2.axisLine || e2.offset ? 0 : 2 * Math.floor(f2.axisLine.strokeWidth() / 2), d2[m2] = Math.max(d2[m2], e2));
            c(this, "afterGetOffset");
          };
          a2.prototype.getLinePath = function(b2) {
            var c2 = this.chart, f2 = this.opposite, d2 = this.offset, a3 = this.horiz, e2 = this.left + (f2 ? this.width : 0) + d2;
            d2 = c2.chartHeight - this.bottom - (f2 ? this.height : 0) + d2;
            f2 && (b2 *= -1);
            return c2.renderer.crispLine([["M", a3 ? this.left : e2, a3 ? d2 : this.top], ["L", a3 ? c2.chartWidth - this.right : e2, a3 ? d2 : c2.chartHeight - this.bottom]], b2);
          };
          a2.prototype.renderLine = function() {
            this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }));
          };
          a2.prototype.getTitlePosition = function() {
            var b2 = this.horiz, f2 = this.left, d2 = this.top, a3 = this.len, e2 = this.options.title, h2 = b2 ? f2 : d2, n2 = this.opposite, u2 = this.offset, q2 = e2.x, g3 = e2.y, z2 = this.axisTitle, k2 = this.chart.renderer.fontMetrics(e2.style.fontSize, z2);
            z2 = z2 ? Math.max(z2.getBBox(false, 0).height - k2.h - 1, 0) : 0;
            a3 = { low: h2 + (b2 ? 0 : a3), middle: h2 + a3 / 2, high: h2 + (b2 ? a3 : 0) }[e2.align];
            f2 = (b2 ? d2 + this.height : f2) + (b2 ? 1 : -1) * (n2 ? -1 : 1) * (this.axisTitleMargin || 0) + [-z2, z2, k2.f, -z2][this.side];
            b2 = { x: b2 ? a3 + q2 : f2 + (n2 ? this.width : 0) + u2 + q2, y: b2 ? f2 + g3 - (n2 ? this.height : 0) + u2 : a3 + g3 };
            c(this, "afterGetTitlePosition", { titlePosition: b2 });
            return b2;
          };
          a2.prototype.renderMinorTick = function(b2, c2) {
            var f2 = this.minorTicks;
            f2[b2] || (f2[b2] = new H(this, b2, "minor"));
            c2 && f2[b2].isNew && f2[b2].render(null, true);
            f2[b2].render(null, false, 1);
          };
          a2.prototype.renderTick = function(b2, c2, f2) {
            var d2 = this.ticks;
            if (!this.isLinked || b2 >= this.min && b2 <= this.max || this.grid && this.grid.isColumn)
              d2[b2] || (d2[b2] = new H(this, b2)), f2 && d2[b2].isNew && d2[b2].render(c2, true, -1), d2[b2].render(c2);
          };
          a2.prototype.render = function() {
            var b2 = this, d2 = b2.chart, a3 = b2.logarithmic, e2 = b2.options, h2 = b2.isLinked, n2 = b2.tickPositions, u2 = b2.axisTitle, q2 = b2.ticks, g3 = b2.minorTicks, k2 = b2.alternateBands, w2 = e2.stackLabels, m2 = e2.alternateGridColor, l2 = b2.tickmarkOffset, p2 = b2.axisLine, N2 = b2.showAxis, J2 = r(d2.renderer.globalAnimation), y2, O2;
            b2.labelEdge.length = 0;
            b2.overlap = false;
            [q2, g3, k2].forEach(function(b3) {
              z(b3, function(b4) {
                b4.isActive = false;
              });
            });
            if (b2.hasData() || h2) {
              var D2 = b2.chart.hasRendered && b2.old && f(b2.old.min);
              b2.minorTickInterval && !b2.categories && b2.getMinorTickPositions().forEach(function(c2) {
                b2.renderMinorTick(c2, D2);
              });
              n2.length && (n2.forEach(function(c2, f2) {
                b2.renderTick(c2, f2, D2);
              }), l2 && (0 === b2.min || b2.single) && (q2[-1] || (q2[-1] = new H(b2, -1, null, true)), q2[-1].render(-1)));
              m2 && n2.forEach(function(c2, f2) {
                O2 = "undefined" !== typeof n2[f2 + 1] ? n2[f2 + 1] + l2 : b2.max - l2;
                0 === f2 % 2 && c2 < b2.max && O2 <= b2.max + (d2.polar ? -l2 : l2) && (k2[c2] || (k2[c2] = new B.PlotLineOrBand(b2)), y2 = c2 + l2, k2[c2].options = { from: a3 ? a3.lin2log(y2) : y2, to: a3 ? a3.lin2log(O2) : O2, color: m2, className: "highcharts-alternate-grid" }, k2[c2].render(), k2[c2].isActive = true);
              });
              b2._addedPlotLB || (b2._addedPlotLB = true, (e2.plotLines || []).concat(e2.plotBands || []).forEach(function(c2) {
                b2.addPlotBandOrLine(c2);
              }));
            }
            [q2, g3, k2].forEach(function(b3) {
              var c2 = [], f2 = J2.duration;
              z(b3, function(b4, f3) {
                b4.isActive || (b4.render(f3, false, 0), b4.isActive = false, c2.push(f3));
              });
              Q(function() {
                for (var f3 = c2.length; f3--; )
                  b3[c2[f3]] && !b3[c2[f3]].isActive && (b3[c2[f3]].destroy(), delete b3[c2[f3]]);
              }, b3 !== k2 && d2.hasRendered && f2 ? f2 : 0);
            });
            p2 && (p2[p2.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(p2.strokeWidth()) }), p2.isPlaced = true, p2[N2 ? "show" : "hide"](N2));
            u2 && N2 && (e2 = b2.getTitlePosition(), u2[u2.isNew ? "attr" : "animate"](e2), u2.isNew = false);
            w2 && w2.enabled && b2.stacking && b2.stacking.renderStackTotals();
            b2.old = { len: b2.len, max: b2.max, min: b2.min, transA: b2.transA, userMax: b2.userMax, userMin: b2.userMin };
            b2.isDirty = false;
            c(this, "afterRender");
          };
          a2.prototype.redraw = function() {
            this.visible && (this.render(), this.plotLinesAndBands.forEach(function(b2) {
              b2.render();
            }));
            this.series.forEach(function(b2) {
              b2.isDirty = true;
            });
          };
          a2.prototype.getKeepProps = function() {
            return this.keepProps || a2.keepProps;
          };
          a2.prototype.destroy = function(b2) {
            var f2 = this, d2 = f2.plotLinesAndBands, a3 = this.eventOptions;
            c(this, "destroy", { keepEvents: b2 });
            b2 || J(f2);
            [f2.ticks, f2.minorTicks, f2.alternateBands].forEach(function(b3) {
              I(b3);
            });
            if (d2)
              for (b2 = d2.length; b2--; )
                d2[b2].destroy();
            "axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(b3) {
              f2[b3] && (f2[b3] = f2[b3].destroy());
            });
            for (var e2 in f2.plotLinesAndBandsGroups)
              f2.plotLinesAndBandsGroups[e2] = f2.plotLinesAndBandsGroups[e2].destroy();
            z(f2, function(b3, c2) {
              -1 === f2.getKeepProps().indexOf(c2) && delete f2[c2];
            });
            this.eventOptions = a3;
          };
          a2.prototype.drawCrosshair = function(b2, f2) {
            var d2 = this.crosshair, a3 = q(d2 && d2.snap, true), e2 = this.chart, h2, n2 = this.cross;
            c(this, "drawCrosshair", { e: b2, point: f2 });
            b2 || (b2 = this.cross && this.cross.e);
            if (d2 && false !== (D(f2) || !a3)) {
              a3 ? D(f2) && (h2 = q("colorAxis" !== this.coll ? f2.crosshairPos : null, this.isXAxis ? f2.plotX : this.len - f2.plotY)) : h2 = b2 && (this.horiz ? b2.chartX - this.pos : this.len - b2.chartY + this.pos);
              if (D(h2)) {
                var u2 = { value: f2 && (this.isXAxis ? f2.x : q(f2.stackY, f2.y)), translatedValue: h2 };
                e2.polar && y(u2, { isCrosshair: true, chartX: b2 && b2.chartX, chartY: b2 && b2.chartY, point: f2 });
                u2 = this.getPlotLinePath(u2) || null;
              }
              if (!D(u2)) {
                this.hideCrosshair();
                return;
              }
              a3 = this.categories && !this.isRadial;
              n2 || (this.cross = n2 = e2.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (a3 ? "category " : "thin ") + (d2.className || "")).attr({ zIndex: q(d2.zIndex, 2) }).add(), e2.styledMode || (n2.attr({ stroke: d2.color || (a3 ? x.parse("#ccd6eb").setOpacity(0.25).get() : "#cccccc"), "stroke-width": q(d2.width, 1) }).css({ "pointer-events": "none" }), d2.dashStyle && n2.attr({ dashstyle: d2.dashStyle })));
              n2.show().attr({ d: u2 });
              a3 && !d2.width && n2.attr({ "stroke-width": this.transA });
              this.cross.e = b2;
            } else
              this.hideCrosshair();
            c(this, "afterDrawCrosshair", { e: b2, point: f2 });
          };
          a2.prototype.hideCrosshair = function() {
            this.cross && this.cross.hide();
            c(this, "afterHideCrosshair");
          };
          a2.prototype.hasVerticalPanning = function() {
            var b2 = this.chart.options.chart.panning;
            return !!(b2 && b2.enabled && /y/.test(b2.type));
          };
          a2.prototype.validatePositiveValue = function(b2) {
            return f(b2) && 0 < b2;
          };
          a2.prototype.update = function(c2, f2) {
            var d2 = this.chart;
            c2 = b(this.userOptions, c2);
            this.destroy(true);
            this.init(d2, c2);
            d2.isDirtyBox = true;
            q(f2, true) && d2.redraw();
          };
          a2.prototype.remove = function(b2) {
            for (var c2 = this.chart, f2 = this.coll, d2 = this.series, a3 = d2.length; a3--; )
              d2[a3] && d2[a3].remove(false);
            E(c2.axes, this);
            E(c2[f2], this);
            c2[f2].forEach(function(b3, c3) {
              b3.options.index = b3.userOptions.index = c3;
            });
            this.destroy();
            c2.isDirtyBox = true;
            q(b2, true) && c2.redraw();
          };
          a2.prototype.setTitle = function(b2, c2) {
            this.update({ title: b2 }, c2);
          };
          a2.prototype.setCategories = function(b2, c2) {
            this.update({ categories: b2 }, c2);
          };
          a2.defaultOptions = g2.defaultXAxisOptions;
          a2.keepProps = "extKey hcEvents names series userMax userMin".split(" ");
          return a2;
        }();
        "";
        return a;
      });
      K(g, "Core/Axis/DateTimeAxis.js", [g["Core/Utilities.js"]], function(a) {
        var g2 = a.addEvent, x = a.getMagnitude, F = a.normalizeTickInterval, C = a.timeUnits, B;
        (function(a2) {
          function t() {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
          }
          function r(d) {
            "datetime" !== d.userOptions.type ? this.dateTime = void 0 : this.dateTime || (this.dateTime = new e(this));
          }
          var l = [];
          a2.compose = function(d) {
            -1 === l.indexOf(d) && (l.push(d), d.keepProps.push("dateTime"), d.prototype.getTimeTicks = t, g2(d, "init", r));
            return d;
          };
          var e = function() {
            function d(d2) {
              this.axis = d2;
            }
            d.prototype.normalizeTimeTickInterval = function(d2, a3) {
              var e2 = a3 || [["millisecond", [
                1,
                2,
                5,
                10,
                20,
                25,
                50,
                100,
                200,
                500
              ]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
              a3 = e2[e2.length - 1];
              var h = C[a3[0]], g3 = a3[1], m;
              for (m = 0; m < e2.length && !(a3 = e2[m], h = C[a3[0]], g3 = a3[1], e2[m + 1] && d2 <= (h * g3[g3.length - 1] + C[e2[m + 1][0]]) / 2); m++)
                ;
              h === C.year && d2 < 5 * h && (g3 = [1, 2, 5]);
              d2 = F(d2 / h, g3, "year" === a3[0] ? Math.max(x(d2 / h), 1) : 1);
              return { unitRange: h, count: d2, unitName: a3[0] };
            };
            d.prototype.getXDateFormat = function(d2, a3) {
              var e2 = this.axis, h = e2.chart.time;
              return e2.closestPointRange ? h.getDateFormat(e2.closestPointRange, d2, e2.options.startOfWeek, a3) || h.resolveDTLFormat(a3.year).main : h.resolveDTLFormat(a3.day).main;
            };
            return d;
          }();
          a2.Additions = e;
        })(B || (B = {}));
        return B;
      });
      K(g, "Core/Axis/LogarithmicAxis.js", [g["Core/Utilities.js"]], function(a) {
        var g2 = a.addEvent, x = a.normalizeTickInterval, F = a.pick, C;
        (function(a2) {
          function A(a3) {
            var d = this.logarithmic;
            "logarithmic" !== a3.userOptions.type ? this.logarithmic = void 0 : d || (this.logarithmic = new l(this));
          }
          function t() {
            var a3 = this.logarithmic;
            a3 && (this.lin2val = function(d) {
              return a3.lin2log(d);
            }, this.val2lin = function(d) {
              return a3.log2lin(d);
            });
          }
          var r = [];
          a2.compose = function(a3) {
            -1 === r.indexOf(a3) && (r.push(a3), a3.keepProps.push("logarithmic"), g2(a3, "init", A), g2(a3, "afterInit", t));
            return a3;
          };
          var l = function() {
            function a3(d) {
              this.axis = d;
            }
            a3.prototype.getLogTickPositions = function(d, a4, e, g3) {
              var h = this.axis, k = h.len, m = h.options, l2 = [];
              g3 || (this.minorAutoInterval = void 0);
              if (0.5 <= d)
                d = Math.round(d), l2 = h.getLinearTickPositions(d, a4, e);
              else if (0.08 <= d) {
                var r2 = Math.floor(a4), y, c = m = void 0;
                for (k = 0.3 < d ? [1, 2, 4] : 0.15 < d ? [1, 2, 4, 6, 8] : [
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9
                ]; r2 < e + 1 && !c; r2++) {
                  var w = k.length;
                  for (y = 0; y < w && !c; y++) {
                    var f = this.log2lin(this.lin2log(r2) * k[y]);
                    f > a4 && (!g3 || m <= e) && "undefined" !== typeof m && l2.push(m);
                    m > e && (c = true);
                    m = f;
                  }
                }
              } else
                a4 = this.lin2log(a4), e = this.lin2log(e), d = g3 ? h.getMinorTickInterval() : m.tickInterval, d = F("auto" === d ? null : d, this.minorAutoInterval, m.tickPixelInterval / (g3 ? 5 : 1) * (e - a4) / ((g3 ? k / h.tickPositions.length : k) || 1)), d = x(d), l2 = h.getLinearTickPositions(d, a4, e).map(this.log2lin), g3 || (this.minorAutoInterval = d / 5);
              g3 || (h.tickInterval = d);
              return l2;
            };
            a3.prototype.lin2log = function(d) {
              return Math.pow(10, d);
            };
            a3.prototype.log2lin = function(d) {
              return Math.log(d) / Math.LN10;
            };
            return a3;
          }();
          a2.Additions = l;
        })(C || (C = {}));
        return C;
      });
      K(g, "Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js", [g["Core/Utilities.js"]], function(a) {
        var g2 = a.erase, x = a.extend, F = a.isNumber, C;
        (function(a2) {
          var A = [], t;
          a2.compose = function(a3, e) {
            t || (t = a3);
            -1 === A.indexOf(e) && (A.push(e), x(e.prototype, r.prototype));
            return e;
          };
          var r = function() {
            function a3() {
            }
            a3.prototype.getPlotBandPath = function(a4, d, h) {
              void 0 === h && (h = this.options);
              var e = this.getPlotLinePath({ value: d, force: true, acrossPanes: h.acrossPanes }), g3 = [], l = this.horiz;
              d = !F(this.min) || !F(this.max) || a4 < this.min && d < this.min || a4 > this.max && d > this.max;
              a4 = this.getPlotLinePath({ value: a4, force: true, acrossPanes: h.acrossPanes });
              h = 1;
              if (a4 && e) {
                if (d) {
                  var r2 = a4.toString() === e.toString();
                  h = 0;
                }
                for (d = 0; d < a4.length; d += 2) {
                  var t2 = a4[d], E = a4[d + 1], A2 = e[d], y = e[d + 1];
                  "M" !== t2[0] && "L" !== t2[0] || "M" !== E[0] && "L" !== E[0] || "M" !== A2[0] && "L" !== A2[0] || "M" !== y[0] && "L" !== y[0] || (l && A2[1] === t2[1] ? (A2[1] += h, y[1] += h) : l || A2[2] !== t2[2] || (A2[2] += h, y[2] += h), g3.push(["M", t2[1], t2[2]], ["L", E[1], E[2]], ["L", y[1], y[2]], ["L", A2[1], A2[2]], ["Z"]));
                  g3.isFlat = r2;
                }
              }
              return g3;
            };
            a3.prototype.addPlotBand = function(a4) {
              return this.addPlotBandOrLine(a4, "plotBands");
            };
            a3.prototype.addPlotLine = function(a4) {
              return this.addPlotBandOrLine(a4, "plotLines");
            };
            a3.prototype.addPlotBandOrLine = function(a4, d) {
              var e = this, g3 = this.userOptions, k = new t(this, a4);
              this.visible && (k = k.render());
              if (k) {
                this._addedPlotLB || (this._addedPlotLB = true, (g3.plotLines || []).concat(g3.plotBands || []).forEach(function(a5) {
                  e.addPlotBandOrLine(a5);
                }));
                if (d) {
                  var l = g3[d] || [];
                  l.push(a4);
                  g3[d] = l;
                }
                this.plotLinesAndBands.push(k);
              }
              return k;
            };
            a3.prototype.removePlotBandOrLine = function(a4) {
              var d = this.plotLinesAndBands, e = this.options, m = this.userOptions;
              if (d) {
                for (var k = d.length; k--; )
                  d[k].id === a4 && d[k].destroy();
                [e.plotLines || [], m.plotLines || [], e.plotBands || [], m.plotBands || []].forEach(function(d2) {
                  for (k = d2.length; k--; )
                    (d2[k] || {}).id === a4 && g2(d2, d2[k]);
                });
              }
            };
            a3.prototype.removePlotBand = function(a4) {
              this.removePlotBandOrLine(a4);
            };
            a3.prototype.removePlotLine = function(a4) {
              this.removePlotBandOrLine(a4);
            };
            return a3;
          }();
        })(C || (C = {}));
        return C;
      });
      K(g, "Core/Axis/PlotLineOrBand/PlotLineOrBand.js", [g["Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js"], g["Core/Utilities.js"]], function(a, g2) {
        var A = g2.arrayMax, F = g2.arrayMin, C = g2.defined, B = g2.destroyObjectProperties, H = g2.erase, t = g2.fireEvent, r = g2.merge, l = g2.objectEach, e = g2.pick;
        g2 = function() {
          function d(a2, d2) {
            this.axis = a2;
            d2 && (this.options = d2, this.id = d2.id);
          }
          d.compose = function(e2) {
            return a.compose(d, e2);
          };
          d.prototype.render = function() {
            t(this, "render");
            var a2 = this, d2 = a2.axis, g3 = d2.horiz, p = d2.logarithmic, D = a2.options, I = D.color, E = e(D.zIndex, 0), A2 = D.events, y = {}, c = d2.chart.renderer, w = D.label, f = a2.label, n = D.to, b = D.from, u = D.value, z = a2.svgElem, q = [], N = C(b) && C(n);
            q = C(u);
            var J = !z, O = { "class": "highcharts-plot-" + (N ? "band " : "line ") + (D.className || "") }, Q = N ? "bands" : "lines";
            p && (b = p.log2lin(b), n = p.log2lin(n), u = p.log2lin(u));
            d2.chart.styledMode || (q ? (O.stroke = I || "#999999", O["stroke-width"] = e(D.width, 1), D.dashStyle && (O.dashstyle = D.dashStyle)) : N && (O.fill = I || "#e6ebf5", D.borderWidth && (O.stroke = D.borderColor, O["stroke-width"] = D.borderWidth)));
            y.zIndex = E;
            Q += "-" + E;
            (p = d2.plotLinesAndBandsGroups[Q]) || (d2.plotLinesAndBandsGroups[Q] = p = c.g("plot-" + Q).attr(y).add());
            J && (a2.svgElem = z = c.path().attr(O).add(p));
            if (q)
              q = d2.getPlotLinePath({ value: u, lineWidth: z.strokeWidth(), acrossPanes: D.acrossPanes });
            else if (N)
              q = d2.getPlotBandPath(b, n, D);
            else
              return;
            !a2.eventsAdded && A2 && (l(A2, function(b2, c2) {
              z.on(c2, function(b3) {
                A2[c2].apply(a2, [b3]);
              });
            }), a2.eventsAdded = true);
            (J || !z.d) && q && q.length ? z.attr({ d: q }) : z && (q ? (z.show(), z.animate({ d: q })) : z.d && (z.hide(), f && (a2.label = f = f.destroy())));
            w && (C(w.text) || C(w.formatter)) && q && q.length && 0 < d2.width && 0 < d2.height && !q.isFlat ? (w = r({ align: g3 && N && "center", x: g3 ? !N && 4 : 10, verticalAlign: !g3 && N && "middle", y: g3 ? N ? 16 : 10 : N ? 6 : -4, rotation: g3 && !N && 90 }, w), this.renderLabel(w, q, N, E)) : f && f.hide();
            return a2;
          };
          d.prototype.renderLabel = function(a2, d2, e2, g3) {
            var h = this.axis, k = h.chart.renderer, m = this.label;
            m || (this.label = m = k.text(this.getLabelText(a2), 0, 0, a2.useHTML).attr({ align: a2.textAlign || a2.align, rotation: a2.rotation, "class": "highcharts-plot-" + (e2 ? "band" : "line") + "-label " + (a2.className || ""), zIndex: g3 }).add(), h.chart.styledMode || m.css(r({ textOverflow: "ellipsis" }, a2.style)));
            g3 = d2.xBounds || [d2[0][1], d2[1][1], e2 ? d2[2][1] : d2[0][1]];
            d2 = d2.yBounds || [d2[0][2], d2[1][2], e2 ? d2[2][2] : d2[0][2]];
            e2 = F(g3);
            k = F(d2);
            m.align(a2, false, { x: e2, y: k, width: A(g3) - e2, height: A(d2) - k });
            m.alignValue && "left" !== m.alignValue || (a2 = a2.clip ? h.width : h.chart.chartWidth, m.css({ width: (90 === m.rotation ? h.height - (m.alignAttr.y - h.top) : a2 - (m.alignAttr.x - h.left)) + "px" }));
            m.show(true);
          };
          d.prototype.getLabelText = function(a2) {
            return C(a2.formatter) ? a2.formatter.call(this) : a2.text;
          };
          d.prototype.destroy = function() {
            H(this.axis.plotLinesAndBands, this);
            delete this.axis;
            B(this);
          };
          return d;
        }();
        "";
        "";
        return g2;
      });
      K(g, "Core/Tooltip.js", [g["Core/FormatUtilities.js"], g["Core/Globals.js"], g["Core/Renderer/RendererUtilities.js"], g["Core/Renderer/RendererRegistry.js"], g["Core/Utilities.js"]], function(a, g2, x, F, C) {
        var A = a.format, H = g2.doc, t = x.distribute, r = C.clamp, l = C.css, e = C.discardElement, d = C.extend, h = C.fireEvent, m = C.isArray, k = C.isNumber, p = C.isString, D = C.merge, I = C.pick, E = C.splat, L = C.syncTimeout;
        a = function() {
          function a2(c, a3) {
            this.allowShared = true;
            this.container = void 0;
            this.crosshairs = [];
            this.distance = 0;
            this.isHidden = true;
            this.isSticky = false;
            this.now = {};
            this.options = {};
            this.outside = false;
            this.chart = c;
            this.init(c, a3);
          }
          a2.prototype.applyFilter = function() {
            var c = this.chart;
            c.renderer.definition({ tagName: "filter", attributes: { id: "drop-shadow-" + c.index, opacity: 0.5 }, children: [{ tagName: "feGaussianBlur", attributes: {
              "in": "SourceAlpha",
              stdDeviation: 1
            } }, { tagName: "feOffset", attributes: { dx: 1, dy: 1 } }, { tagName: "feComponentTransfer", children: [{ tagName: "feFuncA", attributes: { type: "linear", slope: 0.3 } }] }, { tagName: "feMerge", children: [{ tagName: "feMergeNode" }, { tagName: "feMergeNode", attributes: { "in": "SourceGraphic" } }] }] });
          };
          a2.prototype.bodyFormatter = function(c) {
            return c.map(function(c2) {
              var f = c2.series.tooltipOptions;
              return (f[(c2.point.formatPrefix || "point") + "Formatter"] || c2.point.tooltipFormatter).call(c2.point, f[(c2.point.formatPrefix || "point") + "Format"] || "");
            });
          };
          a2.prototype.cleanSplit = function(c) {
            this.chart.series.forEach(function(a3) {
              var f = a3 && a3.tt;
              f && (!f.isActive || c ? a3.tt = f.destroy() : f.isActive = false);
            });
          };
          a2.prototype.defaultFormatter = function(c) {
            var a3 = this.points || E(this);
            var f = [c.tooltipFooterHeaderFormatter(a3[0])];
            f = f.concat(c.bodyFormatter(a3));
            f.push(c.tooltipFooterHeaderFormatter(a3[0], true));
            return f;
          };
          a2.prototype.destroy = function() {
            this.label && (this.label = this.label.destroy());
            this.split && this.tt && (this.cleanSplit(true), this.tt = this.tt.destroy());
            this.renderer && (this.renderer = this.renderer.destroy(), e(this.container));
            C.clearTimeout(this.hideTimer);
            C.clearTimeout(this.tooltipTimeout);
          };
          a2.prototype.getAnchor = function(c, a3) {
            var f = this.chart, d2 = f.pointer, b = f.inverted, e2 = f.plotTop;
            f = f.plotLeft;
            c = E(c);
            c[0].series && c[0].series.yAxis && !c[0].series.yAxis.options.reversedStacks && (c = c.slice().reverse());
            if (this.followPointer && a3)
              "undefined" === typeof a3.chartX && (a3 = d2.normalize(a3)), c = [a3.chartX - f, a3.chartY - e2];
            else if (c[0].tooltipPos)
              c = c[0].tooltipPos;
            else {
              var h2 = 0, g3 = 0;
              c.forEach(function(b2) {
                if (b2 = b2.pos(true))
                  h2 += b2[0], g3 += b2[1];
              });
              h2 /= c.length;
              g3 /= c.length;
              this.shared && 1 < c.length && a3 && (b ? h2 = a3.chartX : g3 = a3.chartY);
              c = [h2 - f, g3 - e2];
            }
            return c.map(Math.round);
          };
          a2.prototype.getClassName = function(c, a3, f) {
            var d2 = c.series, b = d2.options;
            return [this.options.className, "highcharts-label", f && "highcharts-tooltip-header", a3 ? "highcharts-tooltip-box" : "highcharts-tooltip", !f && "highcharts-color-" + I(c.colorIndex, d2.colorIndex), b && b.className].filter(p).join(" ");
          };
          a2.prototype.getLabel = function() {
            var c = this, a3 = this.chart.styledMode, f = this.options, d2 = this.split && this.allowShared, b = f.style.pointerEvents || (this.shouldStickOnContact() ? "auto" : "none"), e2, h2 = this.chart.renderer;
            if (c.label) {
              var q = !c.label.hasClass("highcharts-label");
              (d2 && !q || !d2 && q) && c.destroy();
            }
            if (!this.label) {
              if (this.outside) {
                q = this.chart.options.chart.style;
                var k2 = F.getRendererType();
                this.container = e2 = g2.doc.createElement("div");
                e2.className = "highcharts-tooltip-container";
                l(e2, { position: "absolute", top: "1px", pointerEvents: b, zIndex: Math.max(this.options.style.zIndex || 0, (q && q.zIndex || 0) + 3) });
                g2.doc.body.appendChild(e2);
                this.renderer = h2 = new k2(e2, 0, 0, q, void 0, void 0, h2.styledMode);
              }
              d2 ? this.label = h2.g("tooltip") : (this.label = h2.label("", 0, 0, f.shape, void 0, void 0, f.useHTML, void 0, "tooltip").attr({ padding: f.padding, r: f.borderRadius }), a3 || this.label.attr({ fill: f.backgroundColor, "stroke-width": f.borderWidth }).css(f.style).css({ pointerEvents: b }).shadow(f.shadow));
              a3 && f.shadow && (this.applyFilter(), this.label.attr({ filter: "url(#drop-shadow-" + this.chart.index + ")" }));
              if (c.outside && !c.split) {
                var m2 = this.label, p2 = m2.xSetter, y = m2.ySetter;
                m2.xSetter = function(b2) {
                  p2.call(m2, c.distance);
                  e2.style.left = b2 + "px";
                };
                m2.ySetter = function(b2) {
                  y.call(m2, c.distance);
                  e2.style.top = b2 + "px";
                };
              }
              this.label.attr({ zIndex: 8 }).add();
            }
            return this.label;
          };
          a2.prototype.getPosition = function(c, a3, f) {
            var d2 = this.chart, b = this.distance, e2 = {}, h2 = d2.inverted && f.h || 0, g3 = this.outside, k2 = g3 ? H.documentElement.clientWidth - 2 * b : d2.chartWidth, w = g3 ? Math.max(H.body.scrollHeight, H.documentElement.scrollHeight, H.body.offsetHeight, H.documentElement.offsetHeight, H.documentElement.clientHeight) : d2.chartHeight, m2 = d2.pointer.getChartPosition(), l2 = function(e3) {
              var h3 = "x" === e3;
              return [e3, h3 ? k2 : w, h3 ? c : a3].concat(g3 ? [h3 ? c * m2.scaleX : a3 * m2.scaleY, h3 ? m2.left - b + (f.plotX + d2.plotLeft) * m2.scaleX : m2.top - b + (f.plotY + d2.plotTop) * m2.scaleY, 0, h3 ? k2 : w] : [h3 ? c : a3, h3 ? f.plotX + d2.plotLeft : f.plotY + d2.plotTop, h3 ? d2.plotLeft : d2.plotTop, h3 ? d2.plotLeft + d2.plotWidth : d2.plotTop + d2.plotHeight]);
            }, p2 = l2("y"), y = l2("x"), v;
            l2 = !!f.negative;
            !d2.polar && d2.hoverSeries && d2.hoverSeries.yAxis && d2.hoverSeries.yAxis.reversed && (l2 = !l2);
            var r2 = !this.followPointer && I(f.ttBelow, !d2.inverted === l2), t2 = function(c2, f2, a4, d3, n, u, q) {
              var z = g3 ? "y" === c2 ? b * m2.scaleY : b * m2.scaleX : b, k3 = (a4 - d3) / 2, w2 = d3 < n - b, G2 = n + b + d3 < f2, l3 = n - z - a4 + k3;
              n = n + z - k3;
              if (r2 && G2)
                e2[c2] = n;
              else if (!r2 && w2)
                e2[c2] = l3;
              else if (w2)
                e2[c2] = Math.min(q - d3, 0 > l3 - h2 ? l3 : l3 - h2);
              else if (G2)
                e2[c2] = Math.max(u, n + h2 + a4 > f2 ? n : n + h2);
              else
                return false;
            }, D2 = function(c2, f2, a4, d3, h3) {
              var n;
              h3 < b || h3 > f2 - b ? n = false : e2[c2] = h3 < a4 / 2 ? 1 : h3 > f2 - d3 / 2 ? f2 - d3 - 2 : h3 - a4 / 2;
              return n;
            }, E2 = function(b2) {
              var c2 = p2;
              p2 = y;
              y = c2;
              v = b2;
            }, G = function() {
              false !== t2.apply(0, p2) ? false !== D2.apply(0, y) || v || (E2(true), G()) : v ? e2.x = e2.y = 0 : (E2(true), G());
            };
            (d2.inverted || 1 < this.len) && E2();
            G();
            return e2;
          };
          a2.prototype.hide = function(c) {
            var a3 = this;
            C.clearTimeout(this.hideTimer);
            c = I(c, this.options.hideDelay);
            this.isHidden || (this.hideTimer = L(function() {
              a3.getLabel().fadeOut(c ? void 0 : c);
              a3.isHidden = true;
            }, c));
          };
          a2.prototype.init = function(c, a3) {
            this.chart = c;
            this.options = a3;
            this.crosshairs = [];
            this.now = { x: 0, y: 0 };
            this.isHidden = true;
            this.split = a3.split && !c.inverted && !c.polar;
            this.shared = a3.shared || this.split;
            this.outside = I(a3.outside, !(!c.scrollablePixelsX && !c.scrollablePixelsY));
          };
          a2.prototype.shouldStickOnContact = function(c) {
            return !(this.followPointer || !this.options.stickOnContact || c && !this.chart.pointer.inClass(c.target, "highcharts-tooltip"));
          };
          a2.prototype.move = function(c, a3, f, e2) {
            var b = this, h2 = b.now, n = false !== b.options.animation && !b.isHidden && (1 < Math.abs(c - h2.x) || 1 < Math.abs(a3 - h2.y)), g3 = b.followPointer || 1 < b.len;
            d(h2, { x: n ? (2 * h2.x + c) / 3 : c, y: n ? (h2.y + a3) / 2 : a3, anchorX: g3 ? void 0 : n ? (2 * h2.anchorX + f) / 3 : f, anchorY: g3 ? void 0 : n ? (h2.anchorY + e2) / 2 : e2 });
            b.getLabel().attr(h2);
            b.drawTracker();
            n && (C.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
              b && b.move(
                c,
                a3,
                f,
                e2
              );
            }, 32));
          };
          a2.prototype.refresh = function(c, a3) {
            var f = this.chart, d2 = this.options, b = f.pointer, e2 = E(c), g3 = e2[0], q = [], k2 = d2.formatter || this.defaultFormatter, w = this.shared, l2 = f.styledMode, p2 = {};
            if (d2.enabled && g3.series) {
              C.clearTimeout(this.hideTimer);
              this.allowShared = !(!m(c) && c.series && c.series.noSharedTooltip);
              this.followPointer = !this.split && g3.series.tooltipOptions.followPointer;
              c = this.getAnchor(c, a3);
              var y = c[0], r2 = c[1];
              w && this.allowShared ? (b.applyInactiveState(e2), e2.forEach(function(b2) {
                b2.setState("hover");
                q.push(b2.getLabelConfig());
              }), p2 = { x: g3.category, y: g3.y }, p2.points = q) : p2 = g3.getLabelConfig();
              this.len = q.length;
              k2 = k2.call(p2, this);
              w = g3.series;
              this.distance = I(w.tooltipOptions.distance, 16);
              if (false === k2)
                this.hide();
              else {
                if (this.split && this.allowShared)
                  this.renderSplit(k2, e2);
                else {
                  var v = y, t2 = r2;
                  a3 && b.isDirectTouch && (v = a3.chartX - f.plotLeft, t2 = a3.chartY - f.plotTop);
                  if (f.polar || false === w.options.clip || e2.some(function(c2) {
                    return b.isDirectTouch || c2.series.shouldShowTooltip(v, t2);
                  }))
                    a3 = this.getLabel(), d2.style.width && !l2 || a3.css({ width: f.spacingBox.width + "px" }), a3.attr({ text: k2 && k2.join ? k2.join("") : k2 }), a3.addClass(this.getClassName(g3), true), l2 || a3.attr({ stroke: d2.borderColor || g3.color || w.color || "#666666" }), this.updatePosition({ plotX: y, plotY: r2, negative: g3.negative, ttBelow: g3.ttBelow, h: c[2] || 0 });
                  else {
                    this.hide();
                    return;
                  }
                }
                this.isHidden && this.label && this.label.attr({ opacity: 1 }).show();
                this.isHidden = false;
              }
              h(this, "refresh");
            }
          };
          a2.prototype.renderSplit = function(c, a3) {
            function f(b2, c2, a4, f2, d2) {
              void 0 === d2 && (d2 = true);
              a4 ? (c2 = R ? 0 : ba, b2 = r(b2 - f2 / 2, P.left, P.right - f2 - (e2.outside ? V : 0))) : (c2 -= Z, b2 = d2 ? b2 - f2 - x2 : b2 + x2, b2 = r(
                b2,
                d2 ? b2 : P.left,
                P.right
              ));
              return { x: b2, y: c2 };
            }
            var e2 = this, b = e2.chart, h2 = e2.chart, g3 = h2.chartWidth, q = h2.chartHeight, k2 = h2.plotHeight, w = h2.plotLeft, m2 = h2.plotTop, l2 = h2.pointer, y = h2.scrollablePixelsY;
            y = void 0 === y ? 0 : y;
            var D2 = h2.scrollablePixelsX, v = h2.scrollingContainer;
            v = void 0 === v ? { scrollLeft: 0, scrollTop: 0 } : v;
            var E2 = v.scrollLeft;
            v = v.scrollTop;
            var A2 = h2.styledMode, x2 = e2.distance, L2 = e2.options, G = e2.options.positioner, P = e2.outside && "number" !== typeof D2 ? H.documentElement.getBoundingClientRect() : { left: E2, right: E2 + g3, top: v, bottom: v + q }, M = e2.getLabel(), X = this.renderer || b.renderer, R = !(!b.xAxis[0] || !b.xAxis[0].opposite);
            b = l2.getChartPosition();
            var V = b.left;
            b = b.top;
            var Z = m2 + v, C2 = 0, ba = k2 - y;
            p(c) && (c = [false, c]);
            c = c.slice(0, a3.length + 1).reduce(function(b2, c2, d2) {
              if (false !== c2 && "" !== c2) {
                d2 = a3[d2 - 1] || { isHeader: true, plotX: a3[0].plotX, plotY: k2, series: {} };
                var h3 = d2.isHeader, n = h3 ? e2 : d2.series;
                c2 = c2.toString();
                var g4 = n.tt, u = d2.isHeader;
                var q2 = d2.series;
                g4 || (g4 = { padding: L2.padding, r: L2.borderRadius }, A2 || (g4.fill = L2.backgroundColor, g4["stroke-width"] = L2.borderWidth), g4 = X.label(
                  "",
                  0,
                  0,
                  L2[u ? "headerShape" : "shape"],
                  void 0,
                  void 0,
                  L2.useHTML
                ).addClass(e2.getClassName(d2, true, u)).attr(g4).add(M));
                g4.isActive = true;
                g4.attr({ text: c2 });
                A2 || g4.css(L2.style).shadow(L2.shadow).attr({ stroke: L2.borderColor || d2.color || q2.color || "#333333" });
                n = n.tt = g4;
                u = n.getBBox();
                c2 = u.width + n.strokeWidth();
                h3 && (C2 = u.height, ba += C2, R && (Z -= C2));
                q2 = d2.plotX;
                q2 = void 0 === q2 ? 0 : q2;
                g4 = d2.plotY;
                g4 = void 0 === g4 ? 0 : g4;
                var z = d2.series;
                if (d2.isHeader) {
                  q2 = w + q2;
                  var l3 = m2 + k2 / 2;
                } else {
                  var v2 = z.xAxis, p2 = z.yAxis;
                  q2 = v2.pos + r(q2, -x2, v2.len + x2);
                  z.shouldShowTooltip(0, p2.pos - m2 + g4, { ignoreX: true }) && (l3 = p2.pos + g4);
                }
                q2 = r(q2, P.left - x2, P.right + x2);
                "number" === typeof l3 ? (u = u.height + 1, g4 = G ? G.call(e2, c2, u, d2) : f(q2, l3, h3, c2), b2.push({ align: G ? 0 : void 0, anchorX: q2, anchorY: l3, boxWidth: c2, point: d2, rank: I(g4.rank, h3 ? 1 : 0), size: u, target: g4.y, tt: n, x: g4.x })) : n.isActive = false;
              }
              return b2;
            }, []);
            !G && c.some(function(b2) {
              var c2 = (e2.outside ? V : 0) + b2.anchorX;
              return c2 < P.left && c2 + b2.boxWidth < P.right ? true : c2 < V - P.left + b2.boxWidth && P.right - c2 > c2;
            }) && (c = c.map(function(b2) {
              var c2 = f(b2.anchorX, b2.anchorY, b2.point.isHeader, b2.boxWidth, false);
              return d(b2, { target: c2.y, x: c2.x });
            }));
            e2.cleanSplit();
            t(c, ba);
            var B = V, F2 = V;
            c.forEach(function(b2) {
              var c2 = b2.x, a4 = b2.boxWidth;
              b2 = b2.isHeader;
              b2 || (e2.outside && V + c2 < B && (B = V + c2), !b2 && e2.outside && B + a4 > F2 && (F2 = V + c2));
            });
            c.forEach(function(b2) {
              var c2 = b2.x, a4 = b2.anchorX, f2 = b2.pos, d2 = b2.point.isHeader;
              f2 = { visibility: "undefined" === typeof f2 ? "hidden" : "inherit", x: c2, y: (f2 || 0) + Z, anchorX: a4, anchorY: b2.anchorY };
              if (e2.outside && c2 < a4) {
                var h3 = V - B;
                0 < h3 && (d2 || (f2.x = c2 + h3, f2.anchorX = a4 + h3), d2 && (f2.x = (F2 - B) / 2, f2.anchorX = a4 + h3));
              }
              b2.tt.attr(f2);
            });
            c = e2.container;
            y = e2.renderer;
            e2.outside && c && y && (h2 = M.getBBox(), y.setSize(h2.width + h2.x, h2.height + h2.y, false), c.style.left = B + "px", c.style.top = b + "px");
          };
          a2.prototype.drawTracker = function() {
            if (this.shouldStickOnContact()) {
              var c = this.chart, a3 = this.label, f = this.shared ? c.hoverPoints : c.hoverPoint;
              if (a3 && f) {
                var d2 = { x: 0, y: 0, width: 0, height: 0 };
                f = this.getAnchor(f);
                var b = a3.getBBox();
                f[0] += c.plotLeft - a3.translateX;
                f[1] += c.plotTop - a3.translateY;
                d2.x = Math.min(0, f[0]);
                d2.y = Math.min(0, f[1]);
                d2.width = 0 > f[0] ? Math.max(Math.abs(f[0]), b.width - f[0]) : Math.max(Math.abs(f[0]), b.width);
                d2.height = 0 > f[1] ? Math.max(Math.abs(f[1]), b.height - Math.abs(f[1])) : Math.max(
                  Math.abs(f[1]),
                  b.height
                );
                this.tracker ? this.tracker.attr(d2) : (this.tracker = a3.renderer.rect(d2).addClass("highcharts-tracker").add(a3), c.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }));
              }
            } else
              this.tracker && this.tracker.destroy();
          };
          a2.prototype.styledModeFormat = function(c) {
            return c.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex} {series.options.className} {point.options.className}"');
          };
          a2.prototype.tooltipFooterHeaderFormatter = function(c, a3) {
            var f = c.series, d2 = f.tooltipOptions, b = f.xAxis, e2 = b && b.dateTime;
            b = { isFooter: a3, labelConfig: c };
            var g3 = d2.xDateFormat, q = d2[a3 ? "footerFormat" : "headerFormat"];
            h(this, "headerFormatter", b, function(b2) {
              e2 && !g3 && k(c.key) && (g3 = e2.getXDateFormat(c.key, d2.dateTimeLabelFormats));
              e2 && g3 && (c.point && c.point.tooltipDateKeys || ["key"]).forEach(function(b3) {
                q = q.replace("{point." + b3 + "}", "{point." + b3 + ":" + g3 + "}");
              });
              f.chart.styledMode && (q = this.styledModeFormat(q));
              b2.text = A(q, { point: c, series: f }, this.chart);
            });
            return b.text;
          };
          a2.prototype.update = function(c) {
            this.destroy();
            D(true, this.chart.options.tooltip.userOptions, c);
            this.init(this.chart, D(true, this.options, c));
          };
          a2.prototype.updatePosition = function(c) {
            var a3 = this.chart, f = this.distance, d2 = this.options, b = a3.pointer, e2 = this.getLabel(), h2 = b.getChartPosition();
            b = h2.left;
            var g3 = h2.top, k2 = h2.scaleX;
            h2 = h2.scaleY;
            var m2 = (d2.positioner || this.getPosition).call(this, e2.width, e2.height, c), p2 = (c.plotX || 0) + a3.plotLeft;
            c = (c.plotY || 0) + a3.plotTop;
            if (this.outside) {
              d2.positioner && (m2.x += b - f, m2.y += g3 - f);
              f = d2.borderWidth + 2 * f;
              this.renderer.setSize(e2.width + f, e2.height + f, false);
              if (1 !== k2 || 1 !== h2)
                l(this.container, { transform: "scale(".concat(k2, ", ").concat(h2, ")") }), p2 *= k2, c *= h2;
              p2 += b - m2.x;
              c += g3 - m2.y;
            }
            this.move(Math.round(m2.x), Math.round(m2.y || 0), p2, c);
          };
          return a2;
        }();
        "";
        return a;
      });
      K(g, "Core/Series/Point.js", [g["Core/Renderer/HTML/AST.js"], g["Core/Animation/AnimationUtilities.js"], g["Core/Defaults.js"], g["Core/FormatUtilities.js"], g["Core/Utilities.js"]], function(a, g2, x, F, C) {
        var A = g2.animObject, H = x.defaultOptions, t = F.format, r = C.addEvent, l = C.defined, e = C.erase, d = C.extend, h = C.fireEvent, m = C.getNestedProperty, k = C.isArray, p = C.isFunction, D = C.isNumber, I = C.isObject, E = C.merge, L = C.objectEach, y = C.pick, c = C.syncTimeout, w = C.removeEvent, f = C.uniqueKey;
        g2 = function() {
          function g3() {
            this.category = void 0;
            this.formatPrefix = "point";
            this.id = void 0;
            this.isNull = false;
            this.percentage = this.options = this.name = void 0;
            this.selected = false;
            this.total = this.shapeArgs = this.series = void 0;
            this.visible = true;
            this.x = void 0;
          }
          g3.prototype.animateBeforeDestroy = function() {
            var b = this, c2 = { x: b.startXPos, opacity: 0 }, a2 = b.getGraphicalProps();
            a2.singular.forEach(function(a3) {
              b[a3] = b[a3].animate("dataLabel" === a3 ? { x: b[a3].startXPos, y: b[a3].startYPos, opacity: 0 } : c2);
            });
            a2.plural.forEach(function(c3) {
              b[c3].forEach(function(c4) {
                c4.element && c4.animate(d({ x: b.startXPos }, c4.startYPos ? { x: c4.startXPos, y: c4.startYPos } : {}));
              });
            });
          };
          g3.prototype.applyOptions = function(b, c2) {
            var a2 = this.series, f2 = a2.options.pointValKey || a2.pointValKey;
            b = g3.prototype.optionsToObject.call(this, b);
            d(this, b);
            this.options = this.options ? d(this.options, b) : b;
            b.group && delete this.group;
            b.dataLabels && delete this.dataLabels;
            f2 && (this.y = g3.prototype.getNestedProperty.call(this, f2));
            this.formatPrefix = (this.isNull = this.isValid && !this.isValid()) ? "null" : "point";
            this.selected && (this.state = "select");
            "name" in this && "undefined" === typeof c2 && a2.xAxis && a2.xAxis.hasNames && (this.x = a2.xAxis.nameToX(this));
            "undefined" === typeof this.x && a2 ? this.x = "undefined" === typeof c2 ? a2.autoIncrement() : c2 : D(b.x) && a2.options.relativeXValue && (this.x = a2.autoIncrement(b.x));
            return this;
          };
          g3.prototype.destroy = function() {
            function b() {
              if (a2.graphic || a2.graphics || a2.dataLabel || a2.dataLabels)
                w(a2), a2.destroyElements();
              for (n in a2)
                a2[n] = null;
            }
            var a2 = this, f2 = a2.series, d2 = f2.chart;
            f2 = f2.options.dataSorting;
            var h2 = d2.hoverPoints, g4 = A(a2.series.chart.renderer.globalAnimation), n;
            a2.legendItem && d2.legend.destroyItem(a2);
            h2 && (a2.setState(), e(h2, a2), h2.length || (d2.hoverPoints = null));
            if (a2 === d2.hoverPoint)
              a2.onMouseOut();
            f2 && f2.enabled ? (this.animateBeforeDestroy(), c(b, g4.duration)) : b();
            d2.pointCount--;
          };
          g3.prototype.destroyElements = function(b) {
            var c2 = this;
            b = c2.getGraphicalProps(b);
            b.singular.forEach(function(b2) {
              c2[b2] = c2[b2].destroy();
            });
            b.plural.forEach(function(b2) {
              c2[b2].forEach(function(b3) {
                b3 && b3.element && b3.destroy();
              });
              delete c2[b2];
            });
          };
          g3.prototype.firePointEvent = function(b, c2, a2) {
            var f2 = this, d2 = this.series.options;
            (d2.point.events[b] || f2.options && f2.options.events && f2.options.events[b]) && f2.importEvents();
            "click" === b && d2.allowPointSelect && (a2 = function(b2) {
              f2.select && f2.select(null, b2.ctrlKey || b2.metaKey || b2.shiftKey);
            });
            h(f2, b, c2, a2);
          };
          g3.prototype.getClassName = function() {
            return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !== typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "");
          };
          g3.prototype.getGraphicalProps = function(b) {
            var c2 = this, a2 = [], f2 = { singular: [], plural: [] }, d2;
            b = b || { graphic: 1, dataLabel: 1 };
            b.graphic && a2.push("graphic", "shadowGroup");
            b.dataLabel && a2.push(
              "dataLabel",
              "dataLabelPath",
              "dataLabelUpper",
              "connector"
            );
            for (d2 = a2.length; d2--; ) {
              var e2 = a2[d2];
              c2[e2] && f2.singular.push(e2);
            }
            ["graphic", "dataLabel", "connector"].forEach(function(a3) {
              var d3 = a3 + "s";
              b[a3] && c2[d3] && f2.plural.push(d3);
            });
            return f2;
          };
          g3.prototype.getLabelConfig = function() {
            return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal };
          };
          g3.prototype.getNestedProperty = function(b) {
            if (b)
              return 0 === b.indexOf("custom.") ? m(b, this.options) : this[b];
          };
          g3.prototype.getZone = function() {
            var b = this.series, c2 = b.zones;
            b = b.zoneAxis || "y";
            var a2, f2 = 0;
            for (a2 = c2[f2]; this[b] >= a2.value; )
              a2 = c2[++f2];
            this.nonZonedColor || (this.nonZonedColor = this.color);
            this.color = a2 && a2.color && !this.options.color ? a2.color : this.nonZonedColor;
            return a2;
          };
          g3.prototype.hasNewShapeType = function() {
            return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType;
          };
          g3.prototype.init = function(b, c2, a2) {
            this.series = b;
            this.applyOptions(
              c2,
              a2
            );
            this.id = l(this.id) ? this.id : f();
            this.resolveColor();
            b.chart.pointCount++;
            h(this, "afterInit");
            return this;
          };
          g3.prototype.isValid = function() {
            return null !== this.x && D(this.y);
          };
          g3.prototype.optionsToObject = function(b) {
            var c2 = this.series, a2 = c2.options.keys, f2 = a2 || c2.pointArrayMap || ["y"], d2 = f2.length, e2 = {}, h2 = 0, n = 0;
            if (D(b) || null === b)
              e2[f2[0]] = b;
            else if (k(b))
              for (!a2 && b.length > d2 && (c2 = typeof b[0], "string" === c2 ? e2.name = b[0] : "number" === c2 && (e2.x = b[0]), h2++); n < d2; )
                a2 && "undefined" === typeof b[h2] || (0 < f2[n].indexOf(".") ? g3.prototype.setNestedProperty(
                  e2,
                  b[h2],
                  f2[n]
                ) : e2[f2[n]] = b[h2]), h2++, n++;
            else
              "object" === typeof b && (e2 = b, b.dataLabels && (c2._hasPointLabels = true), b.marker && (c2._hasPointMarkers = true));
            return e2;
          };
          g3.prototype.pos = function(b, c2) {
            void 0 === c2 && (c2 = this.plotY);
            var a2 = this.plotX, f2 = this.series, d2 = f2.chart, e2 = f2.xAxis;
            f2 = f2.yAxis;
            var h2 = 0, g4 = 0;
            if (D(a2) && D(c2))
              return b && (h2 = e2 ? e2.pos : d2.plotLeft, g4 = f2 ? f2.pos : d2.plotTop), d2.inverted && e2 && f2 ? [f2.len - c2 + g4, e2.len - a2 + h2] : [a2 + h2, c2 + g4];
          };
          g3.prototype.resolveColor = function() {
            var b = this.series, c2 = b.chart.styledMode;
            var a2 = b.chart.options.chart.colorCount;
            delete this.nonZonedColor;
            if (b.options.colorByPoint) {
              if (!c2) {
                a2 = b.options.colors || b.chart.options.colors;
                var f2 = a2[b.colorCounter];
                a2 = a2.length;
              }
              c2 = b.colorCounter;
              b.colorCounter++;
              b.colorCounter === a2 && (b.colorCounter = 0);
            } else
              c2 || (f2 = b.color), c2 = b.colorIndex;
            this.colorIndex = y(this.options.colorIndex, c2);
            this.color = y(this.options.color, f2);
          };
          g3.prototype.setNestedProperty = function(b, c2, a2) {
            a2.split(".").reduce(function(b2, a3, f2, d2) {
              b2[a3] = d2.length - 1 === f2 ? c2 : I(b2[a3], true) ? b2[a3] : {};
              return b2[a3];
            }, b);
            return b;
          };
          g3.prototype.shouldDraw = function() {
            return !this.isNull;
          };
          g3.prototype.tooltipFormatter = function(b) {
            var c2 = this.series, a2 = c2.tooltipOptions, f2 = y(a2.valueDecimals, ""), d2 = a2.valuePrefix || "", e2 = a2.valueSuffix || "";
            c2.chart.styledMode && (b = c2.chart.tooltip.styledModeFormat(b));
            (c2.pointArrayMap || ["y"]).forEach(function(c3) {
              c3 = "{point." + c3;
              if (d2 || e2)
                b = b.replace(RegExp(c3 + "}", "g"), d2 + c3 + "}" + e2);
              b = b.replace(RegExp(c3 + "}", "g"), c3 + ":,." + f2 + "f}");
            });
            return t(b, { point: this, series: this.series }, c2.chart);
          };
          g3.prototype.update = function(b, c2, a2, f2) {
            function d2() {
              e2.applyOptions(b);
              var f3 = g4 && e2.hasMockGraphic;
              f3 = null === e2.y ? !f3 : f3;
              g4 && f3 && (e2.graphic = g4.destroy(), delete e2.hasMockGraphic);
              I(b, true) && (g4 && g4.element && b && b.marker && "undefined" !== typeof b.marker.symbol && (e2.graphic = g4.destroy()), b && b.dataLabels && e2.dataLabel && (e2.dataLabel = e2.dataLabel.destroy()), e2.connector && (e2.connector = e2.connector.destroy()));
              u = e2.index;
              h2.updateParallelArrays(e2, u);
              q.data[u] = I(q.data[u], true) || I(b, true) ? e2.options : y(b, q.data[u]);
              h2.isDirty = h2.isDirtyData = true;
              !h2.fixedBox && h2.hasCartesianSeries && (n.isDirtyBox = true);
              "point" === q.legendType && (n.isDirtyLegend = true);
              c2 && n.redraw(a2);
            }
            var e2 = this, h2 = e2.series, g4 = e2.graphic, n = h2.chart, q = h2.options, u;
            c2 = y(c2, true);
            false === f2 ? d2() : e2.firePointEvent("update", { options: b }, d2);
          };
          g3.prototype.remove = function(b, c2) {
            this.series.removePoint(this.series.data.indexOf(this), b, c2);
          };
          g3.prototype.select = function(b, c2) {
            var a2 = this, f2 = a2.series, d2 = f2.chart;
            this.selectedStaging = b = y(b, !a2.selected);
            a2.firePointEvent(b ? "select" : "unselect", { accumulate: c2 }, function() {
              a2.selected = a2.options.selected = b;
              f2.options.data[f2.data.indexOf(a2)] = a2.options;
              a2.setState(b && "select");
              c2 || d2.getSelectedPoints().forEach(function(b2) {
                var c3 = b2.series;
                b2.selected && b2 !== a2 && (b2.selected = b2.options.selected = false, c3.options.data[c3.data.indexOf(b2)] = b2.options, b2.setState(d2.hoverPoints && c3.options.inactiveOtherPoints ? "inactive" : ""), b2.firePointEvent("unselect"));
              });
            });
            delete this.selectedStaging;
          };
          g3.prototype.onMouseOver = function(b) {
            var c2 = this.series.chart, a2 = c2.pointer;
            b = b ? a2.normalize(b) : a2.getChartCoordinatesFromPoint(this, c2.inverted);
            a2.runPointActions(b, this);
          };
          g3.prototype.onMouseOut = function() {
            var b = this.series.chart;
            this.firePointEvent("mouseOut");
            this.series.options.inactiveOtherPoints || (b.hoverPoints || []).forEach(function(b2) {
              b2.setState();
            });
            b.hoverPoints = b.hoverPoint = null;
          };
          g3.prototype.importEvents = function() {
            if (!this.hasImportedEvents) {
              var b = this, c2 = E(b.series.options.point, b.options).events;
              b.events = c2;
              L(c2, function(c3, a2) {
                p(c3) && r(b, a2, c3);
              });
              this.hasImportedEvents = true;
            }
          };
          g3.prototype.setState = function(b, c2) {
            var f2 = this.series, e2 = this.state, g4 = f2.options.states[b || "normal"] || {}, n = H.plotOptions[f2.type].marker && f2.options.marker, u = n && false === n.enabled, k2 = n && n.states && n.states[b || "normal"] || {}, m2 = false === k2.enabled, w2 = this.marker || {}, l2 = f2.chart, p2 = n && f2.markerAttribs, r2 = f2.halo, t2, E2 = f2.stateMarkerGraphic;
            b = b || "";
            if (!(b === this.state && !c2 || this.selected && "select" !== b || false === g4.enabled || b && (m2 || u && false === k2.enabled) || b && w2.states && w2.states[b] && false === w2.states[b].enabled)) {
              this.state = b;
              p2 && (t2 = f2.markerAttribs(this, b));
              if (this.graphic && !this.hasMockGraphic) {
                e2 && this.graphic.removeClass("highcharts-point-" + e2);
                b && this.graphic.addClass("highcharts-point-" + b);
                if (!l2.styledMode) {
                  e2 = f2.pointAttribs(this, b);
                  var G = y(l2.options.chart.animation, g4.animation);
                  var P = e2.opacity;
                  f2.options.inactiveOtherPoints && D(P) && ((this.dataLabels || []).forEach(function(b2) {
                    b2 && !b2.hasClass("highcharts-data-label-hidden") && b2.animate({ opacity: P }, G);
                  }), this.connector && this.connector.animate({ opacity: P }, G));
                  this.graphic.animate(e2, G);
                }
                t2 && this.graphic.animate(t2, y(l2.options.chart.animation, k2.animation, n.animation));
                E2 && E2.hide();
              } else {
                if (b && k2) {
                  n = w2.symbol || f2.symbol;
                  E2 && E2.currentSymbol !== n && (E2 = E2.destroy());
                  if (t2)
                    if (E2)
                      E2[c2 ? "animate" : "attr"]({ x: t2.x, y: t2.y });
                    else
                      n && (f2.stateMarkerGraphic = E2 = l2.renderer.symbol(n, t2.x, t2.y, t2.width, t2.height).add(f2.markerGroup), E2.currentSymbol = n);
                  !l2.styledMode && E2 && "inactive" !== this.state && E2.attr(f2.pointAttribs(this, b));
                }
                E2 && (E2[b && this.isInside ? "show" : "hide"](), E2.element.point = this, E2.addClass(this.getClassName(), true));
              }
              g4 = g4.halo;
              t2 = (E2 = this.graphic || E2) && E2.visibility || "inherit";
              g4 && g4.size && E2 && "hidden" !== t2 && !this.isCluster ? (r2 || (f2.halo = r2 = l2.renderer.path().add(E2.parentGroup)), r2.show()[c2 ? "animate" : "attr"]({ d: this.haloPath(g4.size) }), r2.attr({ "class": "highcharts-halo highcharts-color-" + y(this.colorIndex, f2.colorIndex) + (this.className ? " " + this.className : ""), visibility: t2, zIndex: -1 }), r2.point = this, l2.styledMode || r2.attr(d({ fill: this.color || f2.color, "fill-opacity": g4.opacity }, a.filterUserAttributes(g4.attributes || {})))) : r2 && r2.point && r2.point.haloPath && r2.animate({ d: r2.point.haloPath(0) }, null, r2.hide);
              h(this, "afterSetState", { state: b });
            }
          };
          g3.prototype.haloPath = function(b) {
            var c2 = this.pos();
            return c2 ? this.series.chart.renderer.symbols.circle(Math.floor(c2[0]) - b, c2[1] - b, 2 * b, 2 * b) : [];
          };
          return g3;
        }();
        "";
        return g2;
      });
      K(g, "Core/Pointer.js", [g["Core/Color/Color.js"], g["Core/Globals.js"], g["Core/Tooltip.js"], g["Core/Utilities.js"]], function(a, g2, x, F) {
        var A = a.parse, B = g2.charts, H = g2.noop, t = F.addEvent, r = F.attr, l = F.css, e = F.defined, d = F.extend, h = F.find, m = F.fireEvent, k = F.isNumber, p = F.isObject, D = F.objectEach, I = F.offset, E = F.pick, L = F.splat;
        a = function() {
          function a2(c, a3) {
            this.lastValidTouch = {};
            this.pinchDown = [];
            this.runChartClick = false;
            this.eventsToUnbind = [];
            this.chart = c;
            this.hasDragged = false;
            this.options = a3;
            this.init(c, a3);
          }
          a2.prototype.applyInactiveState = function(c) {
            var a3 = [], f;
            (c || []).forEach(function(c2) {
              f = c2.series;
              a3.push(f);
              f.linkedParent && a3.push(f.linkedParent);
              f.linkedSeries && (a3 = a3.concat(f.linkedSeries));
              f.navigatorSeries && a3.push(f.navigatorSeries);
            });
            this.chart.series.forEach(function(c2) {
              -1 === a3.indexOf(c2) ? c2.setState("inactive", true) : c2.options.inactiveOtherPoints && c2.setAllPointsToState("inactive");
            });
          };
          a2.prototype.destroy = function() {
            var c = this;
            this.eventsToUnbind.forEach(function(c2) {
              return c2();
            });
            this.eventsToUnbind = [];
            g2.chartCount || (a2.unbindDocumentMouseUp && (a2.unbindDocumentMouseUp = a2.unbindDocumentMouseUp()), a2.unbindDocumentTouchEnd && (a2.unbindDocumentTouchEnd = a2.unbindDocumentTouchEnd()));
            clearInterval(c.tooltipTimeout);
            D(c, function(a3, f) {
              c[f] = void 0;
            });
          };
          a2.prototype.getSelectionMarkerAttrs = function(c, a3) {
            var f = this, d2 = { args: { chartX: c, chartY: a3 }, attrs: {}, shapeType: "rect" };
            m(this, "getSelectionMarkerAttrs", d2, function(b) {
              var d3 = f.chart, e2 = f.mouseDownX;
              e2 = void 0 === e2 ? 0 : e2;
              var h2 = f.mouseDownY;
              h2 = void 0 === h2 ? 0 : h2;
              var g3 = f.zoomHor, n = f.zoomVert;
              b = b.attrs;
              b.x = d3.plotLeft;
              b.y = d3.plotTop;
              b.width = g3 ? 1 : d3.plotWidth;
              b.height = n ? 1 : d3.plotHeight;
              g3 && (d3 = c - e2, b.width = Math.abs(d3), b.x = (0 < d3 ? 0 : d3) + e2);
              n && (d3 = a3 - h2, b.height = Math.abs(d3), b.y = (0 < d3 ? 0 : d3) + h2);
            });
            return d2;
          };
          a2.prototype.drag = function(c) {
            var a3 = this.chart, f = a3.options.chart, d2 = a3.plotLeft, b = a3.plotTop, e2 = a3.plotWidth, h2 = a3.plotHeight, g3 = this.mouseDownX || 0, k2 = this.mouseDownY || 0, m2 = p(f.panning) ? f.panning && f.panning.enabled : f.panning, l2 = f.panKey && c[f.panKey + "Key"], y = c.chartX, r2 = c.chartY, t2 = this.selectionMarker;
            t2 && t2.touch || (y < d2 ? y = d2 : y > d2 + e2 && (y = d2 + e2), r2 < b ? r2 = b : r2 > b + h2 && (r2 = b + h2), this.hasDragged = Math.sqrt(Math.pow(g3 - y, 2) + Math.pow(k2 - r2, 2)), 10 < this.hasDragged && (d2 = a3.isInsidePlot(g3 - d2, k2 - b, { visiblePlotOnly: true }), r2 = this.getSelectionMarkerAttrs(y, r2), y = r2.shapeType, r2 = r2.attrs, !a3.hasCartesianSeries && !a3.mapView || !this.zoomX && !this.zoomY || !d2 || l2 || t2 || (this.selectionMarker = t2 = a3.renderer[y](), t2.attr({ "class": "highcharts-selection-marker", zIndex: 7 }).add(), a3.styledMode || t2.attr({ fill: f.selectionMarkerFill || A("#335cad").setOpacity(0.25).get() })), t2 && t2.attr(r2), d2 && !t2 && m2 && a3.pan(c, f.panning)));
          };
          a2.prototype.dragStart = function(c) {
            var a3 = this.chart;
            a3.mouseIsDown = c.type;
            a3.cancelClick = false;
            a3.mouseDownX = this.mouseDownX = c.chartX;
            a3.mouseDownY = this.mouseDownY = c.chartY;
          };
          a2.prototype.getSelectionBox = function(c) {
            var a3 = { args: { marker: c }, result: {} };
            m(this, "getSelectionBox", a3, function(a4) {
              a4.result = { x: c.attr ? +c.attr("x") : c.x, y: c.attr ? +c.attr("y") : c.y, width: c.attr ? c.attr("width") : c.width, height: c.attr ? c.attr("height") : c.height };
            });
            return a3.result;
          };
          a2.prototype.drop = function(c) {
            var a3 = this, f = this.chart, h2 = this.hasPinched;
            if (this.selectionMarker) {
              var b = this.getSelectionBox(this.selectionMarker), g3 = b.x, z = b.y, q = b.width, p2 = b.height, y = { originalEvent: c, xAxis: [], yAxis: [], x: g3, y: z, width: q, height: p2 }, r2 = !!f.mapView;
              if (this.hasDragged || h2)
                f.axes.forEach(function(b2) {
                  if (b2.zoomEnabled && e(b2.min) && (h2 || a3[{ xAxis: "zoomX", yAxis: "zoomY" }[b2.coll]]) && k(g3) && k(z) && k(q) && k(p2)) {
                    var f2 = b2.horiz, d2 = "touchend" === c.type ? b2.minPixelPadding : 0, n = b2.toValue((f2 ? g3 : z) + d2);
                    f2 = b2.toValue((f2 ? g3 + q : z + p2) - d2);
                    y[b2.coll].push({ axis: b2, min: Math.min(
                      n,
                      f2
                    ), max: Math.max(n, f2) });
                    r2 = true;
                  }
                }), r2 && m(f, "selection", y, function(b2) {
                  f.zoom(d(b2, h2 ? { animation: false } : null));
                });
              k(f.index) && (this.selectionMarker = this.selectionMarker.destroy());
              h2 && this.scaleGroups();
            }
            f && k(f.index) && (l(f.container, { cursor: f._cursor }), f.cancelClick = 10 < this.hasDragged, f.mouseIsDown = this.hasDragged = this.hasPinched = false, this.pinchDown = []);
          };
          a2.prototype.findNearestKDPoint = function(c, a3, f) {
            var d2;
            c.forEach(function(b) {
              var c2 = !(b.noSharedTooltip && a3) && 0 > b.options.findNearestPointBy.indexOf("y");
              b = b.searchPoint(
                f,
                c2
              );
              if ((c2 = p(b, true) && b.series) && !(c2 = !p(d2, true))) {
                c2 = d2.distX - b.distX;
                var e2 = d2.dist - b.dist, h2 = (b.series.group && b.series.group.zIndex) - (d2.series.group && d2.series.group.zIndex);
                c2 = 0 < (0 !== c2 && a3 ? c2 : 0 !== e2 ? e2 : 0 !== h2 ? h2 : d2.series.index > b.series.index ? -1 : 1);
              }
              c2 && (d2 = b);
            });
            return d2;
          };
          a2.prototype.getChartCoordinatesFromPoint = function(c, a3) {
            var f = c.series, d2 = f.xAxis;
            f = f.yAxis;
            var b = c.shapeArgs;
            if (d2 && f) {
              var e2 = E(c.clientX, c.plotX), h2 = c.plotY || 0;
              c.isNode && b && k(b.x) && k(b.y) && (e2 = b.x, h2 = b.y);
              return a3 ? { chartX: f.len + f.pos - h2, chartY: d2.len + d2.pos - e2 } : { chartX: e2 + d2.pos, chartY: h2 + f.pos };
            }
            if (b && b.x && b.y)
              return { chartX: b.x, chartY: b.y };
          };
          a2.prototype.getChartPosition = function() {
            if (this.chartPosition)
              return this.chartPosition;
            var c = this.chart.container, a3 = I(c);
            this.chartPosition = { left: a3.left, top: a3.top, scaleX: 1, scaleY: 1 };
            var f = c.offsetWidth;
            c = c.offsetHeight;
            2 < f && 2 < c && (this.chartPosition.scaleX = a3.width / f, this.chartPosition.scaleY = a3.height / c);
            return this.chartPosition;
          };
          a2.prototype.getCoordinates = function(c) {
            var a3 = { xAxis: [], yAxis: [] };
            this.chart.axes.forEach(function(f) {
              a3[f.isXAxis ? "xAxis" : "yAxis"].push({ axis: f, value: f.toValue(c[f.horiz ? "chartX" : "chartY"]) });
            });
            return a3;
          };
          a2.prototype.getHoverData = function(c, a3, f, d2, b, e2) {
            var g3 = [];
            d2 = !(!d2 || !c);
            var n = function(c2) {
              return c2.visible && !(!b && c2.directTouch) && E(c2.options.enableMouseTracking, true);
            }, k2 = { chartX: e2 ? e2.chartX : void 0, chartY: e2 ? e2.chartY : void 0, shared: b };
            m(this, "beforeGetHoverData", k2);
            var u = a3 && !a3.stickyTracking ? [a3] : f.filter(function(b2) {
              return b2.stickyTracking && (k2.filter || n)(b2);
            });
            var l2 = d2 || !e2 ? c : this.findNearestKDPoint(u, b, e2);
            a3 = l2 && l2.series;
            l2 && (b && !a3.noSharedTooltip ? (u = f.filter(function(b2) {
              return k2.filter ? k2.filter(b2) : n(b2) && !b2.noSharedTooltip;
            }), u.forEach(function(b2) {
              var c2 = h(b2.points, function(b3) {
                return b3.x === l2.x && !b3.isNull;
              });
              p(c2) && (b2.boosted && b2.boost && (c2 = b2.boost.getPoint(c2)), g3.push(c2));
            })) : g3.push(l2));
            k2 = { hoverPoint: l2 };
            m(this, "afterGetHoverData", k2);
            return { hoverPoint: k2.hoverPoint, hoverSeries: a3, hoverPoints: g3 };
          };
          a2.prototype.getPointFromEvent = function(c) {
            c = c.target;
            for (var a3; c && !a3; )
              a3 = c.point, c = c.parentNode;
            return a3;
          };
          a2.prototype.onTrackerMouseOut = function(c) {
            c = c.relatedTarget || c.toElement;
            var a3 = this.chart.hoverSeries;
            this.isDirectTouch = false;
            if (!(!a3 || !c || a3.stickyTracking || this.inClass(c, "highcharts-tooltip") || this.inClass(c, "highcharts-series-" + a3.index) && this.inClass(c, "highcharts-tracker")))
              a3.onMouseOut();
          };
          a2.prototype.inClass = function(c, a3) {
            for (var f; c; ) {
              if (f = r(c, "class")) {
                if (-1 !== f.indexOf(a3))
                  return true;
                if (-1 !== f.indexOf("highcharts-container"))
                  return false;
              }
              c = c.parentElement;
            }
          };
          a2.prototype.init = function(c, a3) {
            this.options = a3;
            this.chart = c;
            this.runChartClick = !(!a3.chart.events || !a3.chart.events.click);
            this.pinchDown = [];
            this.lastValidTouch = {};
            x && (c.tooltip = new x(c, a3.tooltip));
            this.setDOMEvents();
          };
          a2.prototype.normalize = function(c, a3) {
            var f = c.touches, e2 = f ? f.length ? f.item(0) : E(f.changedTouches, c.changedTouches)[0] : c;
            a3 || (a3 = this.getChartPosition());
            f = e2.pageX - a3.left;
            e2 = e2.pageY - a3.top;
            f /= a3.scaleX;
            e2 /= a3.scaleY;
            return d(c, { chartX: Math.round(f), chartY: Math.round(e2) });
          };
          a2.prototype.onContainerClick = function(c) {
            var a3 = this.chart, f = a3.hoverPoint;
            c = this.normalize(c);
            var e2 = a3.plotLeft, b = a3.plotTop;
            a3.cancelClick || (f && this.inClass(c.target, "highcharts-tracker") ? (m(f.series, "click", d(c, { point: f })), a3.hoverPoint && f.firePointEvent("click", c)) : (d(c, this.getCoordinates(c)), a3.isInsidePlot(c.chartX - e2, c.chartY - b, { visiblePlotOnly: true }) && m(a3, "click", c)));
          };
          a2.prototype.onContainerMouseDown = function(a3) {
            var c = 1 === ((a3.buttons || a3.button) & 1);
            a3 = this.normalize(a3);
            if (g2.isFirefox && 0 !== a3.button)
              this.onContainerMouseMove(a3);
            if ("undefined" === typeof a3.button || c)
              this.zoomOption(a3), c && a3.preventDefault && a3.preventDefault(), this.dragStart(a3);
          };
          a2.prototype.onContainerMouseLeave = function(c) {
            var d2 = B[E(a2.hoverChartIndex, -1)], f = this.chart.tooltip;
            c = this.normalize(c);
            d2 && (c.relatedTarget || c.toElement) && (d2.pointer.reset(), d2.pointer.chartPosition = void 0);
            f && !f.isHidden && this.reset();
          };
          a2.prototype.onContainerMouseEnter = function(a3) {
            delete this.chartPosition;
          };
          a2.prototype.onContainerMouseMove = function(a3) {
            var c = this.chart, f = c.tooltip;
            a3 = this.normalize(a3);
            this.setHoverChartIndex();
            a3.preventDefault || (a3.returnValue = false);
            ("mousedown" === c.mouseIsDown || this.touchSelect(a3)) && this.drag(a3);
            c.openMenu || !this.inClass(a3.target, "highcharts-tracker") && !c.isInsidePlot(a3.chartX - c.plotLeft, a3.chartY - c.plotTop, { visiblePlotOnly: true }) || f && f.shouldStickOnContact(a3) || (this.inClass(a3.target, "highcharts-no-tooltip") ? this.reset(false, 0) : this.runPointActions(a3));
          };
          a2.prototype.onDocumentTouchEnd = function(c) {
            var d2 = B[E(a2.hoverChartIndex, -1)];
            d2 && d2.pointer.drop(c);
          };
          a2.prototype.onContainerTouchMove = function(a3) {
            if (this.touchSelect(a3))
              this.onContainerMouseMove(a3);
            else
              this.touch(a3);
          };
          a2.prototype.onContainerTouchStart = function(a3) {
            if (this.touchSelect(a3))
              this.onContainerMouseDown(a3);
            else
              this.zoomOption(a3), this.touch(a3, true);
          };
          a2.prototype.onDocumentMouseMove = function(a3) {
            var c = this.chart, f = c.tooltip, d2 = this.chartPosition;
            a3 = this.normalize(a3, d2);
            !d2 || c.isInsidePlot(a3.chartX - c.plotLeft, a3.chartY - c.plotTop, { visiblePlotOnly: true }) || f && f.shouldStickOnContact(a3) || this.inClass(a3.target, "highcharts-tracker") || this.reset();
          };
          a2.prototype.onDocumentMouseUp = function(c) {
            var d2 = B[E(a2.hoverChartIndex, -1)];
            d2 && d2.pointer.drop(c);
          };
          a2.prototype.pinch = function(a3) {
            var c = this, f = c.chart, e2 = c.pinchDown, b = a3.touches || [], h2 = b.length, g3 = c.lastValidTouch, k2 = c.hasZoom, l2 = {}, p2 = 1 === h2 && (c.inClass(a3.target, "highcharts-tracker") && f.runTrackerClick || c.runChartClick), y = {}, r2 = c.chart.tooltip;
            r2 = 1 === h2 && E(r2 && r2.options.followTouchMove, true);
            var t2 = c.selectionMarker;
            1 < h2 ? c.initiated = true : r2 && (c.initiated = false);
            k2 && c.initiated && !p2 && false !== a3.cancelable && a3.preventDefault();
            [].map.call(b, function(b2) {
              return c.normalize(b2);
            });
            "touchstart" === a3.type ? ([].forEach.call(
              b,
              function(b2, a4) {
                e2[a4] = { chartX: b2.chartX, chartY: b2.chartY };
              }
            ), g3.x = [e2[0].chartX, e2[1] && e2[1].chartX], g3.y = [e2[0].chartY, e2[1] && e2[1].chartY], f.axes.forEach(function(b2) {
              if (b2.zoomEnabled) {
                var a4 = f.bounds[b2.horiz ? "h" : "v"], c2 = b2.minPixelPadding, d2 = b2.toPixels(Math.min(E(b2.options.min, b2.dataMin), b2.dataMin)), e3 = b2.toPixels(Math.max(E(b2.options.max, b2.dataMax), b2.dataMax)), h3 = Math.max(d2, e3);
                a4.min = Math.min(b2.pos, Math.min(d2, e3) - c2);
                a4.max = Math.max(b2.pos + b2.len, h3 + c2);
              }
            }), c.res = true) : r2 ? this.runPointActions(c.normalize(a3)) : e2.length && (m(
              f,
              "touchpan",
              { originalEvent: a3 },
              function() {
                t2 || (c.selectionMarker = t2 = d({ destroy: H, touch: true }, f.plotBox));
                c.pinchTranslate(e2, b, l2, t2, y, g3);
                c.hasPinched = k2;
                c.scaleGroups(l2, y);
              }
            ), c.res && (c.res = false, this.reset(false, 0)));
          };
          a2.prototype.pinchTranslate = function(a3, d2, f, e2, b, h2) {
            this.zoomHor && this.pinchTranslateDirection(true, a3, d2, f, e2, b, h2);
            this.zoomVert && this.pinchTranslateDirection(false, a3, d2, f, e2, b, h2);
          };
          a2.prototype.pinchTranslateDirection = function(a3, d2, f, e2, b, h2, g3, k2) {
            var c = this.chart, n = a3 ? "x" : "y", q = a3 ? "X" : "Y", u = "chart" + q, m2 = a3 ? "width" : "height", l2 = c["plot" + (a3 ? "Left" : "Top")], z = c.inverted, p2 = c.bounds[a3 ? "h" : "v"], w = 1 === d2.length, y = d2[0][u], r2 = !w && d2[1][u];
            d2 = function() {
              "number" === typeof R && 20 < Math.abs(y - r2) && (M = k2 || Math.abs(t2 - R) / Math.abs(y - r2));
              P = (l2 - t2) / M + y;
              G = c["plot" + (a3 ? "Width" : "Height")] / M;
            };
            var G, P, M = k2 || 1, t2 = f[0][u], R = !w && f[1][u];
            d2();
            f = P;
            if (f < p2.min) {
              f = p2.min;
              var E2 = true;
            } else
              f + G > p2.max && (f = p2.max - G, E2 = true);
            E2 ? (t2 -= 0.8 * (t2 - g3[n][0]), "number" === typeof R && (R -= 0.8 * (R - g3[n][1])), d2()) : g3[n] = [t2, R];
            z || (h2[n] = P - l2, h2[m2] = G);
            h2 = z ? 1 / M : M;
            b[m2] = G;
            b[n] = f;
            e2[z ? a3 ? "scaleY" : "scaleX" : "scale" + q] = M;
            e2["translate" + q] = h2 * l2 + (t2 - h2 * y);
          };
          a2.prototype.reset = function(a3, d2) {
            var c = this.chart, e2 = c.hoverSeries, b = c.hoverPoint, h2 = c.hoverPoints, g3 = c.tooltip, k2 = g3 && g3.shared ? h2 : b;
            a3 && k2 && L(k2).forEach(function(b2) {
              b2.series.isCartesian && "undefined" === typeof b2.plotX && (a3 = false);
            });
            if (a3)
              g3 && k2 && L(k2).length && (g3.refresh(k2), g3.shared && h2 ? h2.forEach(function(b2) {
                b2.setState(b2.state, true);
                b2.series.isCartesian && (b2.series.xAxis.crosshair && b2.series.xAxis.drawCrosshair(null, b2), b2.series.yAxis.crosshair && b2.series.yAxis.drawCrosshair(null, b2));
              }) : b && (b.setState(
                b.state,
                true
              ), c.axes.forEach(function(a4) {
                a4.crosshair && b.series[a4.coll] === a4 && a4.drawCrosshair(null, b);
              })));
            else {
              if (b)
                b.onMouseOut();
              h2 && h2.forEach(function(b2) {
                b2.setState();
              });
              if (e2)
                e2.onMouseOut();
              g3 && g3.hide(d2);
              this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
              c.axes.forEach(function(b2) {
                b2.hideCrosshair();
              });
              this.hoverX = c.hoverPoints = c.hoverPoint = null;
            }
          };
          a2.prototype.runPointActions = function(c, d2, f) {
            var e2 = this.chart, b = e2.tooltip && e2.tooltip.options.enabled ? e2.tooltip : void 0, g3 = b ? b.shared : false, k2 = d2 || e2.hoverPoint, q = k2 && k2.series || e2.hoverSeries;
            d2 = this.getHoverData(k2, q, e2.series, (!c || "touchmove" !== c.type) && (!!d2 || q && q.directTouch && this.isDirectTouch), g3, c);
            k2 = d2.hoverPoint;
            q = d2.hoverSeries;
            var m2 = d2.hoverPoints;
            d2 = q && q.tooltipOptions.followPointer && !q.tooltipOptions.split;
            var l2 = g3 && q && !q.noSharedTooltip;
            if (k2 && (f || k2 !== e2.hoverPoint || b && b.isHidden)) {
              (e2.hoverPoints || []).forEach(function(b2) {
                -1 === m2.indexOf(b2) && b2.setState();
              });
              if (e2.hoverSeries !== q)
                q.onMouseOver();
              this.applyInactiveState(m2);
              (m2 || []).forEach(function(b2) {
                b2.setState("hover");
              });
              e2.hoverPoint && e2.hoverPoint.firePointEvent("mouseOut");
              if (!k2.series)
                return;
              e2.hoverPoints = m2;
              e2.hoverPoint = k2;
              k2.firePointEvent("mouseOver", void 0, function() {
                b && k2 && b.refresh(l2 ? m2 : k2, c);
              });
            } else
              d2 && b && !b.isHidden && (f = b.getAnchor([{}], c), e2.isInsidePlot(f[0], f[1], { visiblePlotOnly: true }) && b.updatePosition({ plotX: f[0], plotY: f[1] }));
            this.unDocMouseMove || (this.unDocMouseMove = t(e2.container.ownerDocument, "mousemove", function(b2) {
              var c2 = B[a2.hoverChartIndex];
              if (c2)
                c2.pointer.onDocumentMouseMove(b2);
            }), this.eventsToUnbind.push(this.unDocMouseMove));
            e2.axes.forEach(function(b2) {
              var a3 = E((b2.crosshair || {}).snap, true), d3;
              a3 && ((d3 = e2.hoverPoint) && d3.series[b2.coll] === b2 || (d3 = h(m2, function(a4) {
                return a4.series && a4.series[b2.coll] === b2;
              })));
              d3 || !a3 ? b2.drawCrosshair(c, d3) : b2.hideCrosshair();
            });
          };
          a2.prototype.scaleGroups = function(a3, d2) {
            var c = this.chart;
            c.series.forEach(function(f) {
              var b = a3 || f.getPlotBox();
              f.group && (f.xAxis && f.xAxis.zoomEnabled || c.mapView) && (f.group.attr(b), f.markerGroup && (f.markerGroup.attr(b), f.markerGroup.clip(d2 ? c.clipRect : null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(b));
            });
            c.clipRect.attr(d2 || c.clipBox);
          };
          a2.prototype.setDOMEvents = function() {
            var c = this, d2 = this.chart.container, f = d2.ownerDocument;
            d2.onmousedown = this.onContainerMouseDown.bind(this);
            d2.onmousemove = this.onContainerMouseMove.bind(this);
            d2.onclick = this.onContainerClick.bind(this);
            this.eventsToUnbind.push(t(d2, "mouseenter", this.onContainerMouseEnter.bind(this)));
            this.eventsToUnbind.push(t(d2, "mouseleave", this.onContainerMouseLeave.bind(this)));
            a2.unbindDocumentMouseUp || (a2.unbindDocumentMouseUp = t(f, "mouseup", this.onDocumentMouseUp.bind(this)));
            for (var e2 = this.chart.renderTo.parentElement; e2 && "BODY" !== e2.tagName; )
              this.eventsToUnbind.push(t(e2, "scroll", function() {
                delete c.chartPosition;
              })), e2 = e2.parentElement;
            g2.hasTouch && (this.eventsToUnbind.push(t(d2, "touchstart", this.onContainerTouchStart.bind(this), { passive: false })), this.eventsToUnbind.push(t(d2, "touchmove", this.onContainerTouchMove.bind(this), { passive: false })), a2.unbindDocumentTouchEnd || (a2.unbindDocumentTouchEnd = t(f, "touchend", this.onDocumentTouchEnd.bind(this), { passive: false })));
          };
          a2.prototype.setHoverChartIndex = function() {
            var c = this.chart, d2 = g2.charts[E(a2.hoverChartIndex, -1)];
            if (d2 && d2 !== c)
              d2.pointer.onContainerMouseLeave({ relatedTarget: c.container });
            d2 && d2.mouseIsDown || (a2.hoverChartIndex = c.index);
          };
          a2.prototype.touch = function(a3, d2) {
            var c = this.chart, e2;
            this.setHoverChartIndex();
            if (1 === a3.touches.length)
              if (a3 = this.normalize(a3), (e2 = c.isInsidePlot(a3.chartX - c.plotLeft, a3.chartY - c.plotTop, { visiblePlotOnly: true })) && !c.openMenu) {
                d2 && this.runPointActions(a3);
                if ("touchmove" === a3.type) {
                  d2 = this.pinchDown;
                  var b = d2[0] ? 4 <= Math.sqrt(Math.pow(d2[0].chartX - a3.chartX, 2) + Math.pow(d2[0].chartY - a3.chartY, 2)) : false;
                }
                E(b, true) && this.pinch(a3);
              } else
                d2 && this.reset();
            else
              2 === a3.touches.length && this.pinch(a3);
          };
          a2.prototype.touchSelect = function(a3) {
            return !(!this.chart.options.chart.zooming.singleTouch || !a3.touches || 1 !== a3.touches.length);
          };
          a2.prototype.zoomOption = function(a3) {
            var c = this.chart, d2 = c.options.chart;
            c = c.inverted;
            var e2 = d2.zooming.type || "";
            /touch/.test(a3.type) && (e2 = E(d2.zooming.pinchType, e2));
            this.zoomX = a3 = /x/.test(e2);
            this.zoomY = d2 = /y/.test(e2);
            this.zoomHor = a3 && !c || d2 && c;
            this.zoomVert = d2 && !c || a3 && c;
            this.hasZoom = a3 || d2;
          };
          return a2;
        }();
        "";
        return a;
      });
      K(g, "Core/MSPointer.js", [g["Core/Globals.js"], g["Core/Pointer.js"], g["Core/Utilities.js"]], function(a, g2, x) {
        function A() {
          var a2 = [];
          a2.item = function(a3) {
            return this[a3];
          };
          h(p, function(d2) {
            a2.push({ pageX: d2.pageX, pageY: d2.pageY, target: d2.target });
          });
          return a2;
        }
        function C(a2, d2, e2, h2) {
          var c = H[g2.hoverChartIndex || NaN];
          "touch" !== a2.pointerType && a2.pointerType !== a2.MSPOINTER_TYPE_TOUCH || !c || (c = c.pointer, h2(a2), c[d2]({ type: e2, target: a2.currentTarget, preventDefault: r, touches: A() }));
        }
        var B = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(d2, e2) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a3, c) {
              a3.__proto__ = c;
            } || function(a3, c) {
              for (var d3 in c)
                c.hasOwnProperty(d3) && (a3[d3] = c[d3]);
            };
            return a2(d2, e2);
          };
          return function(d2, e2) {
            function h2() {
              this.constructor = d2;
            }
            a2(d2, e2);
            d2.prototype = null === e2 ? Object.create(e2) : (h2.prototype = e2.prototype, new h2());
          };
        }(), H = a.charts, t = a.doc, r = a.noop, l = a.win, e = x.addEvent, d = x.css, h = x.objectEach, m = x.pick, k = x.removeEvent, p = {}, D = !!l.PointerEvent;
        return function(h2) {
          function g3() {
            return null !== h2 && h2.apply(this, arguments) || this;
          }
          B(g3, h2);
          g3.isRequired = function() {
            return !(a.hasTouch || !l.PointerEvent && !l.MSPointerEvent);
          };
          g3.prototype.batchMSEvents = function(a2) {
            a2(this.chart.container, D ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
            a2(this.chart.container, D ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
            a2(t, D ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp);
          };
          g3.prototype.destroy = function() {
            this.batchMSEvents(k);
            h2.prototype.destroy.call(this);
          };
          g3.prototype.init = function(a2, e2) {
            h2.prototype.init.call(
              this,
              a2,
              e2
            );
            this.hasZoom && d(a2.container, { "-ms-touch-action": "none", "touch-action": "none" });
          };
          g3.prototype.onContainerPointerDown = function(a2) {
            C(a2, "onContainerTouchStart", "touchstart", function(a3) {
              p[a3.pointerId] = { pageX: a3.pageX, pageY: a3.pageY, target: a3.currentTarget };
            });
          };
          g3.prototype.onContainerPointerMove = function(a2) {
            C(a2, "onContainerTouchMove", "touchmove", function(a3) {
              p[a3.pointerId] = { pageX: a3.pageX, pageY: a3.pageY };
              p[a3.pointerId].target || (p[a3.pointerId].target = a3.currentTarget);
            });
          };
          g3.prototype.onDocumentPointerUp = function(a2) {
            C(
              a2,
              "onDocumentTouchEnd",
              "touchend",
              function(a3) {
                delete p[a3.pointerId];
              }
            );
          };
          g3.prototype.setDOMEvents = function() {
            var a2 = this.chart.tooltip;
            h2.prototype.setDOMEvents.call(this);
            (this.hasZoom || m(a2 && a2.options.followTouchMove, true)) && this.batchMSEvents(e);
          };
          return g3;
        }(g2);
      });
      K(g, "Core/Legend/Legend.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/FormatUtilities.js"], g["Core/Globals.js"], g["Core/Series/Point.js"], g["Core/Renderer/RendererUtilities.js"], g["Core/Utilities.js"]], function(a, g2, x, F, C, B) {
        var A = a.animObject, t = a.setAnimation, r = g2.format, l = x.marginNames, e = C.distribute, d = B.addEvent, h = B.createElement, m = B.css, k = B.defined, p = B.discardElement, D = B.find, I = B.fireEvent, E = B.isNumber, L = B.merge, y = B.pick, c = B.relativeLength, w = B.stableSort, f = B.syncTimeout;
        a = function() {
          function a2(b, a3) {
            this.allItems = [];
            this.contentGroup = this.box = void 0;
            this.display = false;
            this.group = void 0;
            this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop = this.itemMarginBottom = this.itemHeight = this.initialItemY = 0;
            this.options = void 0;
            this.padding = 0;
            this.pages = [];
            this.proximate = false;
            this.scrollGroup = void 0;
            this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0;
            this.chart = b;
            this.init(b, a3);
          }
          a2.prototype.init = function(b, a3) {
            this.chart = b;
            this.setOptions(a3);
            a3.enabled && (this.render(), d(this.chart, "endResize", function() {
              this.legend.positionCheckboxes();
            }), this.proximate ? this.unchartrender = d(this.chart, "render", function() {
              this.legend.proximatePositions();
              this.legend.positionItems();
            }) : this.unchartrender && this.unchartrender());
          };
          a2.prototype.setOptions = function(b) {
            var a3 = y(b.padding, 8);
            this.options = b;
            this.chart.styledMode || (this.itemStyle = b.itemStyle, this.itemHiddenStyle = L(this.itemStyle, b.itemHiddenStyle));
            this.itemMarginTop = b.itemMarginTop || 0;
            this.itemMarginBottom = b.itemMarginBottom || 0;
            this.padding = a3;
            this.initialItemY = a3 - 5;
            this.symbolWidth = y(b.symbolWidth, 16);
            this.pages = [];
            this.proximate = "proximate" === b.layout && !this.chart.inverted;
            this.baseline = void 0;
          };
          a2.prototype.update = function(b, a3) {
            var c2 = this.chart;
            this.setOptions(L(true, this.options, b));
            this.destroy();
            c2.isDirtyLegend = c2.isDirtyBox = true;
            y(a3, true) && c2.redraw();
            I(this, "afterUpdate");
          };
          a2.prototype.colorizeItem = function(b, a3) {
            var c2 = b.legendItem || {}, d2 = c2.group, f2 = c2.label, e2 = c2.line;
            c2 = c2.symbol;
            if (d2)
              d2[a3 ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
            if (!this.chart.styledMode) {
              var h2 = this.options;
              d2 = this.itemHiddenStyle.color;
              h2 = a3 ? h2.itemStyle.color : d2;
              var g3 = a3 ? b.color || d2 : d2, k2 = b.options && b.options.marker, n = { fill: g3 };
              f2 && f2.css({ fill: h2, color: h2 });
              e2 && e2.attr({ stroke: g3 });
              c2 && (k2 && c2.isMarker && (n = b.pointAttribs(), a3 || (n.stroke = n.fill = d2)), c2.attr(n));
            }
            I(this, "afterColorizeItem", { item: b, visible: a3 });
          };
          a2.prototype.positionItems = function() {
            this.allItems.forEach(this.positionItem, this);
            this.chart.isResizing || this.positionCheckboxes();
          };
          a2.prototype.positionItem = function(b) {
            var a3 = this, c2 = b.legendItem || {}, d2 = c2.group, f2 = c2.x;
            f2 = void 0 === f2 ? 0 : f2;
            c2 = c2.y;
            c2 = void 0 === c2 ? 0 : c2;
            var e2 = this.options, h2 = e2.symbolPadding, g3 = !e2.rtl;
            e2 = b.checkbox;
            d2 && d2.element && (h2 = { translateX: g3 ? f2 : this.legendWidth - f2 - 2 * h2 - 4, translateY: c2 }, d2[k(d2.translateY) ? "animate" : "attr"](h2, void 0, function() {
              I(a3, "afterPositionItem", { item: b });
            }));
            e2 && (e2.x = f2, e2.y = c2);
          };
          a2.prototype.destroyItem = function(b) {
            for (var a3 = b.checkbox, c2 = b.legendItem || {}, d2 = 0, f2 = ["group", "label", "line", "symbol"]; d2 < f2.length; d2++) {
              var e2 = f2[d2];
              c2[e2] && (c2[e2] = c2[e2].destroy());
            }
            a3 && p(a3);
            b.legendItem = void 0;
          };
          a2.prototype.destroy = function() {
            for (var b = 0, a3 = this.getAllItems(); b < a3.length; b++)
              this.destroyItem(a3[b]);
            b = 0;
            for (a3 = "clipRect up down pager nav box title group".split(" "); b < a3.length; b++) {
              var c2 = a3[b];
              this[c2] && (this[c2] = this[c2].destroy());
            }
            this.display = null;
          };
          a2.prototype.positionCheckboxes = function() {
            var b = this.group && this.group.alignAttr, a3 = this.clipHeight || this.legendHeight, c2 = this.titleHeight;
            if (b) {
              var d2 = b.translateY;
              this.allItems.forEach(function(f2) {
                var e2 = f2.checkbox;
                if (e2) {
                  var h2 = d2 + c2 + e2.y + (this.scrollOffset || 0) + 3;
                  m(e2, { left: b.translateX + f2.checkboxOffset + e2.x - 20 + "px", top: h2 + "px", display: this.proximate || h2 > d2 - 6 && h2 < d2 + a3 - 6 ? "" : "none" });
                }
              }, this);
            }
          };
          a2.prototype.renderTitle = function() {
            var b = this.options, a3 = this.padding, c2 = b.title, d2 = 0;
            c2.text && (this.title || (this.title = this.chart.renderer.label(c2.text, a3 - 3, a3 - 4, void 0, void 0, void 0, b.useHTML, void 0, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(c2.style), this.title.add(this.group)), c2.width || this.title.css({ width: this.maxLegendWidth + "px" }), b = this.title.getBBox(), d2 = b.height, this.offsetWidth = b.width, this.contentGroup.attr({ translateY: d2 }));
            this.titleHeight = d2;
          };
          a2.prototype.setText = function(b) {
            var a3 = this.options;
            b.legendItem.label.attr({ text: a3.labelFormat ? r(a3.labelFormat, b, this.chart) : a3.labelFormatter.call(b) });
          };
          a2.prototype.renderItem = function(b) {
            var a3 = b.legendItem = b.legendItem || {}, c2 = this.chart, d2 = c2.renderer, f2 = this.options, e2 = this.symbolWidth, h2 = f2.symbolPadding || 0, g3 = this.itemStyle, k2 = this.itemHiddenStyle, n = "horizontal" === f2.layout ? y(f2.itemDistance, 20) : 0, m2 = !f2.rtl, l2 = !b.series, p2 = !l2 && b.series.drawLegendSymbol ? b.series : b, r2 = p2.options, w2 = this.createCheckboxForItem && r2 && r2.showCheckbox, G = f2.useHTML, P = b.options.className, M = a3.label;
            r2 = e2 + h2 + n + (w2 ? 20 : 0);
            M || (a3.group = d2.g("legend-item").addClass("highcharts-" + p2.type + "-series highcharts-color-" + b.colorIndex + (P ? " " + P : "") + (l2 ? " highcharts-series-" + b.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a3.label = M = d2.text("", m2 ? e2 + h2 : -h2, this.baseline || 0, G), c2.styledMode || M.css(L(b.visible ? g3 : k2)), M.attr({ align: m2 ? "left" : "right", zIndex: 2 }).add(a3.group), this.baseline || (this.fontMetrics = d2.fontMetrics(c2.styledMode ? 12 : g3.fontSize, M), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, M.attr("y", this.baseline), this.symbolHeight = f2.symbolHeight || this.fontMetrics.f, f2.squareSymbol && (this.symbolWidth = y(f2.symbolWidth, Math.max(this.symbolHeight, 16)), r2 = this.symbolWidth + h2 + n + (w2 ? 20 : 0), m2 && M.attr("x", this.symbolWidth + h2))), p2.drawLegendSymbol(this, b), this.setItemEvents && this.setItemEvents(b, M, G));
            w2 && !b.checkbox && this.createCheckboxForItem && this.createCheckboxForItem(b);
            this.colorizeItem(b, b.visible);
            !c2.styledMode && g3.width || M.css({ width: (f2.itemWidth || this.widthOption || c2.spacingBox.width) - r2 + "px" });
            this.setText(b);
            c2 = M.getBBox();
            d2 = this.fontMetrics && this.fontMetrics.h || 0;
            b.itemWidth = b.checkboxOffset = f2.itemWidth || a3.labelWidth || c2.width + r2;
            this.maxItemWidth = Math.max(this.maxItemWidth, b.itemWidth);
            this.totalItemWidth += b.itemWidth;
            this.itemHeight = b.itemHeight = Math.round(a3.labelHeight || (c2.height > 1.5 * d2 ? c2.height : d2));
          };
          a2.prototype.layoutItem = function(b) {
            var a3 = this.options, c2 = this.padding, d2 = "horizontal" === a3.layout, f2 = b.itemHeight, e2 = this.itemMarginBottom, h2 = this.itemMarginTop, g3 = d2 ? y(a3.itemDistance, 20) : 0, k2 = this.maxLegendWidth;
            a3 = a3.alignColumns && this.totalItemWidth > k2 ? this.maxItemWidth : b.itemWidth;
            var n = b.legendItem || {};
            d2 && this.itemX - c2 + a3 > k2 && (this.itemX = c2, this.lastLineHeight && (this.itemY += h2 + this.lastLineHeight + e2), this.lastLineHeight = 0);
            this.lastItemY = h2 + this.itemY + e2;
            this.lastLineHeight = Math.max(f2, this.lastLineHeight);
            n.x = this.itemX;
            n.y = this.itemY;
            d2 ? this.itemX += a3 : (this.itemY += h2 + f2 + e2, this.lastLineHeight = f2);
            this.offsetWidth = this.widthOption || Math.max((d2 ? this.itemX - c2 - (b.checkbox ? 0 : g3) : a3) + c2, this.offsetWidth);
          };
          a2.prototype.getAllItems = function() {
            var b = [];
            this.chart.series.forEach(function(a3) {
              var c2 = a3 && a3.options;
              a3 && y(
                c2.showInLegend,
                k(c2.linkedTo) ? false : void 0,
                true
              ) && (b = b.concat((a3.legendItem || {}).labels || ("point" === c2.legendType ? a3.data : a3)));
            });
            I(this, "afterGetAllItems", { allItems: b });
            return b;
          };
          a2.prototype.getAlignment = function() {
            var b = this.options;
            return this.proximate ? b.align.charAt(0) + "tv" : b.floating ? "" : b.align.charAt(0) + b.verticalAlign.charAt(0) + b.layout.charAt(0);
          };
          a2.prototype.adjustMargins = function(b, a3) {
            var c2 = this.chart, d2 = this.options, f2 = this.getAlignment();
            f2 && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(e2, h2) {
              e2.test(f2) && !k(b[h2]) && (c2[l[h2]] = Math.max(c2[l[h2]], c2.legend[(h2 + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][h2] * d2[h2 % 2 ? "x" : "y"] + y(d2.margin, 12) + a3[h2] + (c2.titleOffset[h2] || 0)));
            });
          };
          a2.prototype.proximatePositions = function() {
            var b = this.chart, a3 = [], c2 = "left" === this.options.align;
            this.allItems.forEach(function(d3) {
              var f3;
              var e2 = c2;
              if (d3.yAxis) {
                d3.xAxis.options.reversed && (e2 = !e2);
                d3.points && (f3 = D(e2 ? d3.points : d3.points.slice(0).reverse(), function(b2) {
                  return E(b2.plotY);
                }));
                e2 = this.itemMarginTop + d3.legendItem.label.getBBox().height + this.itemMarginBottom;
                var h3 = d3.yAxis.top - b.plotTop;
                d3.visible ? (f3 = f3 ? f3.plotY : d3.yAxis.height, f3 += h3 - 0.3 * e2) : f3 = h3 + d3.yAxis.height;
                a3.push({ target: f3, size: e2, item: d3 });
              }
            }, this);
            for (var d2, f2 = 0, h2 = e(a3, b.plotHeight); f2 < h2.length; f2++) {
              var g3 = h2[f2];
              d2 = g3.item.legendItem || {};
              E(g3.pos) && (d2.y = b.plotTop - b.spacing[0] + g3.pos);
            }
          };
          a2.prototype.render = function() {
            var b = this.chart, a3 = b.renderer, d2 = this.options, f2 = this.padding, e2 = this.getAllItems(), h2 = this.group, g3 = this.box;
            this.itemX = f2;
            this.itemY = this.initialItemY;
            this.lastItemY = this.offsetWidth = 0;
            this.widthOption = c(d2.width, b.spacingBox.width - f2);
            var k2 = b.spacingBox.width - 2 * f2 - d2.x;
            -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (k2 /= 2);
            this.maxLegendWidth = this.widthOption || k2;
            h2 || (this.group = h2 = a3.g("legend").addClass(d2.className || "").attr({ zIndex: 7 }).add(), this.contentGroup = a3.g().attr({ zIndex: 1 }).add(h2), this.scrollGroup = a3.g().add(this.contentGroup));
            this.renderTitle();
            w(e2, function(b2, a4) {
              return (b2.options && b2.options.legendIndex || 0) - (a4.options && a4.options.legendIndex || 0);
            });
            d2.reversed && e2.reverse();
            this.allItems = e2;
            this.display = k2 = !!e2.length;
            this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
            e2.forEach(this.renderItem, this);
            e2.forEach(this.layoutItem, this);
            e2 = (this.widthOption || this.offsetWidth) + f2;
            var n = this.lastItemY + this.lastLineHeight + this.titleHeight;
            n = this.handleOverflow(n);
            n += f2;
            g3 || (this.box = g3 = a3.rect().addClass("highcharts-legend-box").attr({ r: d2.borderRadius }).add(h2));
            b.styledMode || g3.attr({ stroke: d2.borderColor, "stroke-width": d2.borderWidth || 0, fill: d2.backgroundColor || "none" }).shadow(d2.shadow);
            if (0 < e2 && 0 < n)
              g3[g3.placed ? "animate" : "attr"](g3.crisp.call({}, { x: 0, y: 0, width: e2, height: n }, g3.strokeWidth()));
            h2[k2 ? "show" : "hide"]();
            b.styledMode && "none" === h2.getStyle("display") && (e2 = n = 0);
            this.legendWidth = e2;
            this.legendHeight = n;
            k2 && this.align();
            this.proximate || this.positionItems();
            I(this, "afterRender");
          };
          a2.prototype.align = function(b) {
            void 0 === b && (b = this.chart.spacingBox);
            var a3 = this.chart, c2 = this.options, d2 = b.y;
            /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a3.titleOffset[0] ? d2 += a3.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < a3.titleOffset[2] && (d2 -= a3.titleOffset[2]);
            d2 !== b.y && (b = L(b, { y: d2 }));
            a3.hasRendered || (this.group.placed = false);
            this.group.align(L(c2, { width: this.legendWidth, height: this.legendHeight, verticalAlign: this.proximate ? "top" : c2.verticalAlign }), true, b);
          };
          a2.prototype.handleOverflow = function(b) {
            var a3 = this, c2 = this.chart, d2 = c2.renderer, f2 = this.options, e2 = f2.y, h2 = "top" === f2.verticalAlign, g3 = this.padding, k2 = f2.maxHeight, n = f2.navigation, m2 = y(n.animation, true), l2 = n.arrowSize || 12, p2 = this.pages, r2 = this.allItems, w2 = function(b2) {
              "number" === typeof b2 ? D2.attr({ height: b2 }) : D2 && (a3.clipRect = D2.destroy(), a3.contentGroup.clip());
              a3.contentGroup.div && (a3.contentGroup.div.style.clip = b2 ? "rect(" + g3 + "px,9999px," + (g3 + b2) + "px,0)" : "auto");
            }, G = function(b2) {
              a3[b2] = d2.circle(0, 0, 1.3 * l2).translate(l2 / 2, l2 / 2).add(R);
              c2.styledMode || a3[b2].attr("fill", "rgba(0,0,0,0.0001)");
              return a3[b2];
            }, P, M, t2;
            e2 = c2.spacingBox.height + (h2 ? -e2 : e2) - g3;
            var R = this.nav, D2 = this.clipRect;
            "horizontal" !== f2.layout || "middle" === f2.verticalAlign || f2.floating || (e2 /= 2);
            k2 && (e2 = Math.min(e2, k2));
            p2.length = 0;
            b && 0 < e2 && b > e2 && false !== n.enabled ? (this.clipHeight = P = Math.max(e2 - 20 - this.titleHeight - g3, 0), this.currentPage = y(this.currentPage, 1), this.fullHeight = b, r2.forEach(function(b2, a4) {
              t2 = b2.legendItem || {};
              b2 = t2.y || 0;
              var c3 = Math.round(t2.label.getBBox().height), d3 = p2.length;
              if (!d3 || b2 - p2[d3 - 1] > P && (M || b2) !== p2[d3 - 1])
                p2.push(M || b2), d3++;
              t2.pageIx = d3 - 1;
              M && ((r2[a4 - 1].legendItem || {}).pageIx = d3 - 1);
              a4 === r2.length - 1 && b2 + c3 - p2[d3 - 1] > P && c3 <= P && (p2.push(b2), t2.pageIx = d3);
              b2 !== M && (M = b2);
            }), D2 || (D2 = a3.clipRect = d2.clipRect(0, g3, 9999, 0), a3.contentGroup.clip(D2)), w2(P), R || (this.nav = R = d2.g().attr({ zIndex: 1 }).add(this.group), this.up = d2.symbol("triangle", 0, 0, l2, l2).add(R), G("upTracker").on("click", function() {
              a3.scroll(-1, m2);
            }), this.pager = d2.text("", 15, 10).addClass("highcharts-legend-navigation"), !c2.styledMode && n.style && this.pager.css(n.style), this.pager.add(R), this.down = d2.symbol("triangle-down", 0, 0, l2, l2).add(R), G("downTracker").on("click", function() {
              a3.scroll(1, m2);
            })), a3.scroll(0), b = e2) : R && (w2(), this.nav = R.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0);
            return b;
          };
          a2.prototype.scroll = function(b, a3) {
            var c2 = this, d2 = this.chart, e2 = this.pages, h2 = e2.length, g3 = this.clipHeight, k2 = this.options.navigation, n = this.pager, m2 = this.padding, l2 = this.currentPage + b;
            l2 > h2 && (l2 = h2);
            0 < l2 && ("undefined" !== typeof a3 && t(a3, d2), this.nav.attr({ translateX: m2, translateY: g3 + this.padding + 7 + this.titleHeight, visibility: "inherit" }), [this.up, this.upTracker].forEach(function(b2) {
              b2.attr({ "class": 1 === l2 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
            }), n.attr({ text: l2 + "/" + h2 }), [this.down, this.downTracker].forEach(function(b2) {
              b2.attr({ x: 18 + this.pager.getBBox().width, "class": l2 === h2 ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" });
            }, this), d2.styledMode || (this.up.attr({ fill: 1 === l2 ? k2.inactiveColor : k2.activeColor }), this.upTracker.css({ cursor: 1 === l2 ? "default" : "pointer" }), this.down.attr({ fill: l2 === h2 ? k2.inactiveColor : k2.activeColor }), this.downTracker.css({ cursor: l2 === h2 ? "default" : "pointer" })), this.scrollOffset = -e2[l2 - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = l2, this.positionCheckboxes(), b = A(y(a3, d2.renderer.globalAnimation, true)), f(function() {
              I(c2, "afterScroll", { currentPage: l2 });
            }, b.duration));
          };
          a2.prototype.setItemEvents = function(b, a3, c2) {
            var d2 = this, f2 = b.legendItem || {}, e2 = d2.chart.renderer.boxWrapper, h2 = b instanceof F, g3 = "highcharts-legend-" + (h2 ? "point" : "series") + "-active", k2 = d2.chart.styledMode, n = function(a4) {
              d2.allItems.forEach(function(c3) {
                b !== c3 && [c3].concat(c3.linkedSeries || []).forEach(function(b2) {
                  b2.setState(a4, !h2);
                });
              });
            }, m2 = 0;
            for (c2 = c2 ? [a3, f2.symbol] : [f2.group]; m2 < c2.length; m2++)
              if (f2 = c2[m2])
                f2.on("mouseover", function() {
                  b.visible && n("inactive");
                  b.setState("hover");
                  b.visible && e2.addClass(g3);
                  k2 || a3.css(d2.options.itemHoverStyle);
                }).on("mouseout", function() {
                  d2.chart.styledMode || a3.css(L(b.visible ? d2.itemStyle : d2.itemHiddenStyle));
                  n("");
                  e2.removeClass(g3);
                  b.setState();
                }).on("click", function(a4) {
                  var c3 = function() {
                    b.setVisible && b.setVisible();
                    n(b.visible ? "inactive" : "");
                  };
                  e2.removeClass(g3);
                  a4 = { browserEvent: a4 };
                  b.firePointEvent ? b.firePointEvent("legendItemClick", a4, c3) : I(b, "legendItemClick", a4, c3);
                });
          };
          a2.prototype.createCheckboxForItem = function(b) {
            b.checkbox = h("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: b.selected, defaultChecked: b.selected }, this.options.itemCheckboxStyle, this.chart.container);
            d(b.checkbox, "click", function(a3) {
              I(b.series || b, "checkboxClick", { checked: a3.target.checked, item: b }, function() {
                b.select();
              });
            });
          };
          return a2;
        }();
        "";
        return a;
      });
      K(g, "Core/Series/SeriesRegistry.js", [g["Core/Globals.js"], g["Core/Defaults.js"], g["Core/Series/Point.js"], g["Core/Utilities.js"]], function(a, g2, x, F) {
        var A = g2.defaultOptions, B = F.extendClass, H = F.merge, t;
        (function(g3) {
          function l(a2, d) {
            var e = A.plotOptions || {}, m = d.defaultOptions, k = d.prototype;
            k.type = a2;
            k.pointClass || (k.pointClass = x);
            m && (e[a2] = m);
            g3.seriesTypes[a2] = d;
          }
          g3.seriesTypes = a.seriesTypes;
          g3.registerSeriesType = l;
          g3.seriesType = function(a2, d, h, m, k) {
            var e = A.plotOptions || {};
            d = d || "";
            e[a2] = H(e[d], h);
            l(a2, B(g3.seriesTypes[d] || function() {
            }, m));
            g3.seriesTypes[a2].prototype.type = a2;
            k && (g3.seriesTypes[a2].prototype.pointClass = B(x, k));
            return g3.seriesTypes[a2];
          };
        })(t || (t = {}));
        return t;
      });
      K(g, "Core/Chart/Chart.js", [
        g["Core/Animation/AnimationUtilities.js"],
        g["Core/Axis/Axis.js"],
        g["Core/Defaults.js"],
        g["Core/FormatUtilities.js"],
        g["Core/Foundation.js"],
        g["Core/Globals.js"],
        g["Core/Legend/Legend.js"],
        g["Core/MSPointer.js"],
        g["Core/Pointer.js"],
        g["Core/Renderer/RendererRegistry.js"],
        g["Core/Series/SeriesRegistry.js"],
        g["Core/Renderer/SVG/SVGRenderer.js"],
        g["Core/Time.js"],
        g["Core/Utilities.js"],
        g["Core/Renderer/HTML/AST.js"]
      ], function(a, g2, x, F, C, B, H, t, r, l, e, d, h, m, k) {
        var p = a.animate, D = a.animObject, A = a.setAnimation, E = x.defaultOptions, L = x.defaultTime, y = F.numberFormat, c = C.registerEventOptions, w = B.charts, f = B.doc, n = B.marginNames, b = B.svg, u = B.win, z = e.seriesTypes, q = m.addEvent, N = m.attr, J = m.cleanRecursively, O = m.createElement, Q = m.css, T = m.defined, Y = m.discardElement, v = m.erase, U = m.error, K2 = m.extend, ca = m.find, S = m.fireEvent, G = m.getStyle, P = m.isArray, M = m.isNumber, X = m.isObject, R = m.isString, V = m.merge, Z = m.objectEach, W = m.pick, ba = m.pInt, fa = m.relativeLength, ha = m.removeEvent, ea = m.splat, ia = m.syncTimeout, ka = m.uniqueKey;
        a = function() {
          function a2(b2, a3, c2) {
            this.series = this.renderTo = this.renderer = this.pointer = this.pointCount = this.plotWidth = this.plotTop = this.plotLeft = this.plotHeight = this.plotBox = this.options = this.numberFormatter = this.margin = this.legend = this.labelCollectors = this.isResizing = this.index = this.eventOptions = this.container = this.colorCounter = this.clipBox = this.chartWidth = this.chartHeight = this.bounds = this.axisOffset = this.axes = void 0;
            this.sharedClips = {};
            this.yAxis = this.xAxis = this.userOptions = this.titleOffset = this.time = this.symbolCounter = this.spacingBox = this.spacing = void 0;
            this.getArgs(
              b2,
              a3,
              c2
            );
          }
          a2.chart = function(b2, c2, d2) {
            return new a2(b2, c2, d2);
          };
          a2.prototype.getArgs = function(b2, a3, c2) {
            R(b2) || b2.nodeName ? (this.renderTo = b2, this.init(a3, c2)) : this.init(b2, a3);
          };
          a2.prototype.init = function(b2, a3) {
            var d2 = b2.plotOptions || {};
            S(this, "init", { args: arguments }, function() {
              var f2 = V(E, b2), e2 = f2.chart;
              Z(f2.plotOptions, function(b3, a4) {
                X(b3) && (b3.tooltip = d2[a4] && V(d2[a4].tooltip) || void 0);
              });
              f2.tooltip.userOptions = b2.chart && b2.chart.forExport && b2.tooltip.userOptions || b2.tooltip;
              this.userOptions = b2;
              this.margin = [];
              this.spacing = [];
              this.bounds = {
                h: {},
                v: {}
              };
              this.labelCollectors = [];
              this.callback = a3;
              this.isResizing = 0;
              var g3 = e2.zooming = e2.zooming || {};
              b2.chart && !b2.chart.zooming && (g3.resetButton = e2.resetZoomButton);
              g3.key = W(g3.key, e2.zoomKey);
              g3.pinchType = W(g3.pinchType, e2.pinchType);
              g3.singleTouch = W(g3.singleTouch, e2.zoomBySingleTouch);
              g3.type = W(g3.type, e2.zoomType);
              this.options = f2;
              this.axes = [];
              this.series = [];
              this.time = b2.time && Object.keys(b2.time).length ? new h(b2.time) : B.time;
              this.numberFormatter = e2.numberFormatter || y;
              this.styledMode = e2.styledMode;
              this.hasCartesianSeries = e2.showAxes;
              this.index = w.length;
              w.push(this);
              B.chartCount++;
              c(this, e2);
              this.xAxis = [];
              this.yAxis = [];
              this.pointCount = this.colorCounter = this.symbolCounter = 0;
              S(this, "afterInit");
              this.firstRender();
            });
          };
          a2.prototype.initSeries = function(b2) {
            var a3 = this.options.chart;
            a3 = b2.type || a3.type || a3.defaultSeriesType;
            var c2 = z[a3];
            c2 || U(17, true, this, { missingModuleFor: a3 });
            a3 = new c2();
            "function" === typeof a3.init && a3.init(this, b2);
            return a3;
          };
          a2.prototype.setSeriesData = function() {
            this.getSeriesOrderByLinks().forEach(function(b2) {
              b2.points || b2.data || !b2.enabledDataSorting || b2.setData(b2.options.data, false);
            });
          };
          a2.prototype.getSeriesOrderByLinks = function() {
            return this.series.concat().sort(function(b2, a3) {
              return b2.linkedSeries.length || a3.linkedSeries.length ? a3.linkedSeries.length - b2.linkedSeries.length : 0;
            });
          };
          a2.prototype.orderSeries = function(b2) {
            var a3 = this.series;
            b2 = b2 || 0;
            for (var c2 = a3.length; b2 < c2; ++b2)
              a3[b2] && (a3[b2].index = b2, a3[b2].name = a3[b2].getName());
          };
          a2.prototype.isInsidePlot = function(b2, a3, c2) {
            void 0 === c2 && (c2 = {});
            var d2 = this.inverted, f2 = this.plotBox, e2 = this.plotLeft, h2 = this.plotTop, g3 = this.scrollablePlotBox, k2 = 0;
            var n2 = 0;
            c2.visiblePlotOnly && this.scrollingContainer && (n2 = this.scrollingContainer, k2 = n2.scrollLeft, n2 = n2.scrollTop);
            var m2 = c2.series;
            f2 = c2.visiblePlotOnly && g3 || f2;
            g3 = c2.inverted ? a3 : b2;
            a3 = c2.inverted ? b2 : a3;
            b2 = { x: g3, y: a3, isInsidePlot: true, options: c2 };
            if (!c2.ignoreX) {
              var q2 = m2 && (d2 && !this.polar ? m2.yAxis : m2.xAxis) || { pos: e2, len: Infinity };
              g3 = c2.paneCoordinates ? q2.pos + g3 : e2 + g3;
              g3 >= Math.max(k2 + e2, q2.pos) && g3 <= Math.min(k2 + e2 + f2.width, q2.pos + q2.len) || (b2.isInsidePlot = false);
            }
            !c2.ignoreY && b2.isInsidePlot && (d2 = c2.axis && !c2.axis.isXAxis && c2.axis || m2 && (d2 ? m2.xAxis : m2.yAxis) || { pos: h2, len: Infinity }, c2 = c2.paneCoordinates ? d2.pos + a3 : h2 + a3, c2 >= Math.max(n2 + h2, d2.pos) && c2 <= Math.min(n2 + h2 + f2.height, d2.pos + d2.len) || (b2.isInsidePlot = false));
            S(this, "afterIsInsidePlot", b2);
            return b2.isInsidePlot;
          };
          a2.prototype.redraw = function(b2) {
            S(this, "beforeRedraw");
            var a3 = this.hasCartesianSeries ? this.axes : this.colorAxis || [], c2 = this.series, d2 = this.pointer, f2 = this.legend, e2 = this.userOptions.legend, h2 = this.renderer, g3 = h2.isHidden(), k2 = [], n2 = this.isDirtyBox, m2 = this.isDirtyLegend;
            this.setResponsive && this.setResponsive(false);
            A(this.hasRendered ? b2 : false, this);
            g3 && this.temporaryDisplay();
            this.layOutTitles();
            for (b2 = c2.length; b2--; ) {
              var q2 = c2[b2];
              if (q2.options.stacking || q2.options.centerInCategory) {
                var l2 = true;
                if (q2.isDirty) {
                  var G2 = true;
                  break;
                }
              }
            }
            if (G2)
              for (b2 = c2.length; b2--; )
                q2 = c2[b2], q2.options.stacking && (q2.isDirty = true);
            c2.forEach(function(b3) {
              b3.isDirty && ("point" === b3.options.legendType ? ("function" === typeof b3.updateTotals && b3.updateTotals(), m2 = true) : e2 && (e2.labelFormatter || e2.labelFormat) && (m2 = true));
              b3.isDirtyData && S(b3, "updatedData");
            });
            m2 && f2 && f2.options.enabled && (f2.render(), this.isDirtyLegend = false);
            l2 && this.getStacks();
            a3.forEach(function(b3) {
              b3.updateNames();
              b3.setScale();
            });
            this.getMargins();
            a3.forEach(function(b3) {
              b3.isDirty && (n2 = true);
            });
            a3.forEach(function(b3) {
              var a4 = b3.min + "," + b3.max;
              b3.extKey !== a4 && (b3.extKey = a4, k2.push(function() {
                S(b3, "afterSetExtremes", K2(b3.eventArgs, b3.getExtremes()));
                delete b3.eventArgs;
              }));
              (n2 || l2) && b3.redraw();
            });
            n2 && this.drawChartBox();
            S(this, "predraw");
            c2.forEach(function(b3) {
              (n2 || b3.isDirty) && b3.visible && b3.redraw();
              b3.isDirtyData = false;
            });
            d2 && d2.reset(true);
            h2.draw();
            S(this, "redraw");
            S(this, "render");
            g3 && this.temporaryDisplay(true);
            k2.forEach(function(b3) {
              b3.call();
            });
          };
          a2.prototype.get = function(b2) {
            function a3(a4) {
              return a4.id === b2 || a4.options && a4.options.id === b2;
            }
            for (var c2 = this.series, d2 = ca(this.axes, a3) || ca(this.series, a3), f2 = 0; !d2 && f2 < c2.length; f2++)
              d2 = ca(c2[f2].points || [], a3);
            return d2;
          };
          a2.prototype.getAxes = function() {
            var b2 = this, a3 = this.options, c2 = a3.xAxis = ea(a3.xAxis || {});
            a3 = a3.yAxis = ea(a3.yAxis || {});
            S(this, "getAxes");
            c2.forEach(function(b3, a4) {
              b3.index = a4;
              b3.isX = true;
            });
            a3.forEach(function(b3, a4) {
              b3.index = a4;
            });
            c2.concat(a3).forEach(function(a4) {
              new g2(
                b2,
                a4
              );
            });
            S(this, "afterGetAxes");
          };
          a2.prototype.getSelectedPoints = function() {
            return this.series.reduce(function(b2, a3) {
              a3.getPointsCollection().forEach(function(a4) {
                W(a4.selectedStaging, a4.selected) && b2.push(a4);
              });
              return b2;
            }, []);
          };
          a2.prototype.getSelectedSeries = function() {
            return this.series.filter(function(b2) {
              return b2.selected;
            });
          };
          a2.prototype.setTitle = function(b2, a3, c2) {
            this.applyDescription("title", b2);
            this.applyDescription("subtitle", a3);
            this.applyDescription("caption", void 0);
            this.layOutTitles(c2);
          };
          a2.prototype.applyDescription = function(b2, a3) {
            var c2 = this, d2 = "title" === b2 ? { color: "#333333", fontSize: this.options.isStock ? "16px" : "18px" } : { color: "#666666" };
            d2 = this.options[b2] = V(!this.styledMode && { style: d2 }, this.options[b2], a3);
            var f2 = this[b2];
            f2 && a3 && (this[b2] = f2 = f2.destroy());
            d2 && !f2 && (f2 = this.renderer.text(d2.text, 0, 0, d2.useHTML).attr({ align: d2.align, "class": "highcharts-" + b2, zIndex: d2.zIndex || 4 }).add(), f2.update = function(a4) {
              c2[{ title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }[b2]](a4);
            }, this.styledMode || f2.css(d2.style), this[b2] = f2);
          };
          a2.prototype.layOutTitles = function(b2) {
            var a3 = [0, 0, 0], c2 = this.renderer, d2 = this.spacingBox;
            ["title", "subtitle", "caption"].forEach(function(b3) {
              var f3 = this[b3], e2 = this.options[b3], h2 = e2.verticalAlign || "top";
              b3 = "title" === b3 ? "top" === h2 ? -3 : 0 : "top" === h2 ? a3[0] + 2 : 0;
              var g3;
              if (f3) {
                this.styledMode || (g3 = e2.style && e2.style.fontSize);
                g3 = c2.fontMetrics(g3, f3).b;
                f3.css({ width: (e2.width || d2.width + (e2.widthAdjust || 0)) + "px" });
                var k2 = Math.round(f3.getBBox(e2.useHTML).height);
                f3.align(K2({ y: "bottom" === h2 ? g3 : b3 + g3, height: k2 }, e2), false, "spacingBox");
                e2.floating || ("top" === h2 ? a3[0] = Math.ceil(a3[0] + k2) : "bottom" === h2 && (a3[2] = Math.ceil(a3[2] + k2)));
              }
            }, this);
            a3[0] && "top" === (this.options.title.verticalAlign || "top") && (a3[0] += this.options.title.margin);
            a3[2] && "bottom" === this.options.caption.verticalAlign && (a3[2] += this.options.caption.margin);
            var f2 = !this.titleOffset || this.titleOffset.join(",") !== a3.join(",");
            this.titleOffset = a3;
            S(this, "afterLayOutTitles");
            !this.isDirtyBox && f2 && (this.isDirtyBox = this.isDirtyLegend = f2, this.hasRendered && W(b2, true) && this.isDirtyBox && this.redraw());
          };
          a2.prototype.getChartSize = function() {
            var b2 = this.options.chart, a3 = b2.width;
            b2 = b2.height;
            var c2 = this.renderTo;
            T(a3) || (this.containerWidth = G(c2, "width"));
            T(b2) || (this.containerHeight = G(c2, "height"));
            this.chartWidth = Math.max(0, a3 || this.containerWidth || 600);
            this.chartHeight = Math.max(0, fa(b2, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400));
          };
          a2.prototype.temporaryDisplay = function(b2) {
            var a3 = this.renderTo;
            if (b2)
              for (; a3 && a3.style; )
                a3.hcOrigStyle && (Q(a3, a3.hcOrigStyle), delete a3.hcOrigStyle), a3.hcOrigDetached && (f.body.removeChild(a3), a3.hcOrigDetached = false), a3 = a3.parentNode;
            else
              for (; a3 && a3.style; ) {
                f.body.contains(a3) || a3.parentNode || (a3.hcOrigDetached = true, f.body.appendChild(a3));
                if ("none" === G(a3, "display", false) || a3.hcOricDetached)
                  a3.hcOrigStyle = { display: a3.style.display, height: a3.style.height, overflow: a3.style.overflow }, b2 = { display: "block", overflow: "hidden" }, a3 !== this.renderTo && (b2.height = 0), Q(a3, b2), a3.offsetWidth || a3.style.setProperty("display", "block", "important");
                a3 = a3.parentNode;
                if (a3 === f.body)
                  break;
              }
          };
          a2.prototype.setClassName = function(b2) {
            this.container.className = "highcharts-container " + (b2 || "");
          };
          a2.prototype.getContainer = function() {
            var a3 = this.options, c2 = a3.chart, e2 = ka(), h2, g3 = this.renderTo;
            g3 || (this.renderTo = g3 = c2.renderTo);
            R(g3) && (this.renderTo = g3 = f.getElementById(g3));
            g3 || U(13, true, this);
            var n2 = ba(N(g3, "data-highcharts-chart"));
            M(n2) && w[n2] && w[n2].hasRendered && w[n2].destroy();
            N(g3, "data-highcharts-chart", this.index);
            g3.innerHTML = k.emptyHTML;
            c2.skipClone || g3.offsetWidth || this.temporaryDisplay();
            this.getChartSize();
            n2 = this.chartWidth;
            var m2 = this.chartHeight;
            Q(g3, { overflow: "hidden" });
            this.styledMode || (h2 = K2({
              position: "relative",
              overflow: "hidden",
              width: n2 + "px",
              height: m2 + "px",
              textAlign: "left",
              lineHeight: "normal",
              zIndex: 0,
              "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
              userSelect: "none",
              "touch-action": "manipulation",
              outline: "none"
            }, c2.style || {}));
            this.container = e2 = O("div", { id: e2 }, h2, g3);
            this._cursor = e2.style.cursor;
            this.renderer = new (c2.renderer || !b ? l.getRendererType(c2.renderer) : d)(e2, n2, m2, void 0, c2.forExport, a3.exporting && a3.exporting.allowHTML, this.styledMode);
            A(void 0, this);
            this.setClassName(c2.className);
            if (this.styledMode)
              for (var q2 in a3.defs)
                this.renderer.definition(a3.defs[q2]);
            else
              this.renderer.setStyle(c2.style);
            this.renderer.chartIndex = this.index;
            S(this, "afterGetContainer");
          };
          a2.prototype.getMargins = function(b2) {
            var a3 = this.spacing, c2 = this.margin, d2 = this.titleOffset;
            this.resetMargins();
            d2[0] && !T(c2[0]) && (this.plotTop = Math.max(this.plotTop, d2[0] + a3[0]));
            d2[2] && !T(c2[2]) && (this.marginBottom = Math.max(this.marginBottom, d2[2] + a3[2]));
            this.legend && this.legend.display && this.legend.adjustMargins(c2, a3);
            S(this, "getMargins");
            b2 || this.getAxisMargins();
          };
          a2.prototype.getAxisMargins = function() {
            var b2 = this, a3 = b2.axisOffset = [0, 0, 0, 0], c2 = b2.colorAxis, d2 = b2.margin, f2 = function(b3) {
              b3.forEach(function(b4) {
                b4.visible && b4.getOffset();
              });
            };
            b2.hasCartesianSeries ? f2(b2.axes) : c2 && c2.length && f2(c2);
            n.forEach(function(c3, f3) {
              T(d2[f3]) || (b2[c3] += a3[f3]);
            });
            b2.setChartSize();
          };
          a2.prototype.reflow = function(b2) {
            var a3 = this, c2 = a3.options.chart, d2 = a3.renderTo, e2 = T(c2.width) && T(c2.height), h2 = c2.width || G(d2, "width");
            c2 = c2.height || G(d2, "height");
            d2 = b2 ? b2.target : u;
            delete a3.pointer.chartPosition;
            if (!e2 && !a3.isPrinting && h2 && c2 && (d2 === u || d2 === f)) {
              if (h2 !== a3.containerWidth || c2 !== a3.containerHeight)
                m.clearTimeout(a3.reflowTimeout), a3.reflowTimeout = ia(function() {
                  a3.container && a3.setSize(void 0, void 0, false);
                }, b2 ? 100 : 0);
              a3.containerWidth = h2;
              a3.containerHeight = c2;
            }
          };
          a2.prototype.setReflow = function(b2) {
            var a3 = this;
            false === b2 || this.unbindReflow ? false === b2 && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = q(u, "resize", function(b3) {
              a3.options && a3.reflow(b3);
            }), q(this, "destroy", this.unbindReflow));
          };
          a2.prototype.setSize = function(b2, a3, c2) {
            var d2 = this, f2 = d2.renderer;
            d2.isResizing += 1;
            A(c2, d2);
            c2 = f2.globalAnimation;
            d2.oldChartHeight = d2.chartHeight;
            d2.oldChartWidth = d2.chartWidth;
            "undefined" !== typeof b2 && (d2.options.chart.width = b2);
            "undefined" !== typeof a3 && (d2.options.chart.height = a3);
            d2.getChartSize();
            d2.styledMode || (c2 ? p : Q)(d2.container, { width: d2.chartWidth + "px", height: d2.chartHeight + "px" }, c2);
            d2.setChartSize(true);
            f2.setSize(d2.chartWidth, d2.chartHeight, c2);
            d2.axes.forEach(function(b3) {
              b3.isDirty = true;
              b3.setScale();
            });
            d2.isDirtyLegend = true;
            d2.isDirtyBox = true;
            d2.layOutTitles();
            d2.getMargins();
            d2.redraw(c2);
            d2.oldChartHeight = null;
            S(
              d2,
              "resize"
            );
            ia(function() {
              d2 && S(d2, "endResize", null, function() {
                --d2.isResizing;
              });
            }, D(c2).duration);
          };
          a2.prototype.setChartSize = function(b2) {
            var a3 = this.inverted, c2 = this.renderer, d2 = this.chartWidth, f2 = this.chartHeight, e2 = this.options.chart, h2 = this.spacing, g3 = this.clipOffset, k2, n2, m2, q2;
            this.plotLeft = k2 = Math.round(this.plotLeft);
            this.plotTop = n2 = Math.round(this.plotTop);
            this.plotWidth = m2 = Math.max(0, Math.round(d2 - k2 - this.marginRight));
            this.plotHeight = q2 = Math.max(0, Math.round(f2 - n2 - this.marginBottom));
            this.plotSizeX = a3 ? q2 : m2;
            this.plotSizeY = a3 ? m2 : q2;
            this.plotBorderWidth = e2.plotBorderWidth || 0;
            this.spacingBox = c2.spacingBox = { x: h2[3], y: h2[0], width: d2 - h2[3] - h2[1], height: f2 - h2[0] - h2[2] };
            this.plotBox = c2.plotBox = { x: k2, y: n2, width: m2, height: q2 };
            a3 = 2 * Math.floor(this.plotBorderWidth / 2);
            d2 = Math.ceil(Math.max(a3, g3[3]) / 2);
            f2 = Math.ceil(Math.max(a3, g3[0]) / 2);
            this.clipBox = { x: d2, y: f2, width: Math.floor(this.plotSizeX - Math.max(a3, g3[1]) / 2 - d2), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(a3, g3[2]) / 2 - f2)) };
            b2 || (this.axes.forEach(function(b3) {
              b3.setAxisSize();
              b3.setAxisTranslation();
            }), c2.alignElements());
            S(this, "afterSetChartSize", { skipAxes: b2 });
          };
          a2.prototype.resetMargins = function() {
            S(this, "resetMargins");
            var b2 = this, a3 = b2.options.chart;
            ["margin", "spacing"].forEach(function(c2) {
              var d2 = a3[c2], f2 = X(d2) ? d2 : [d2, d2, d2, d2];
              ["Top", "Right", "Bottom", "Left"].forEach(function(d3, e2) {
                b2[c2][e2] = W(a3[c2 + d3], f2[e2]);
              });
            });
            n.forEach(function(a4, c2) {
              b2[a4] = W(b2.margin[c2], b2.spacing[c2]);
            });
            b2.axisOffset = [0, 0, 0, 0];
            b2.clipOffset = [0, 0, 0, 0];
          };
          a2.prototype.drawChartBox = function() {
            var b2 = this.options.chart, a3 = this.renderer, c2 = this.chartWidth, d2 = this.chartHeight, f2 = this.styledMode, e2 = this.plotBGImage, h2 = b2.backgroundColor, g3 = b2.plotBackgroundColor, k2 = b2.plotBackgroundImage, n2 = this.plotLeft, m2 = this.plotTop, q2 = this.plotWidth, l2 = this.plotHeight, G2 = this.plotBox, u2 = this.clipRect, p2 = this.clipBox, M2 = this.chartBackground, v2 = this.plotBackground, w2 = this.plotBorder, r2, z2 = "animate";
            M2 || (this.chartBackground = M2 = a3.rect().addClass("highcharts-background").add(), z2 = "attr");
            if (f2)
              var y2 = r2 = M2.strokeWidth();
            else {
              y2 = b2.borderWidth || 0;
              r2 = y2 + (b2.shadow ? 8 : 0);
              h2 = { fill: h2 || "none" };
              if (y2 || M2["stroke-width"])
                h2.stroke = b2.borderColor, h2["stroke-width"] = y2;
              M2.attr(h2).shadow(b2.shadow);
            }
            M2[z2]({ x: r2 / 2, y: r2 / 2, width: c2 - r2 - y2 % 2, height: d2 - r2 - y2 % 2, r: b2.borderRadius });
            z2 = "animate";
            v2 || (z2 = "attr", this.plotBackground = v2 = a3.rect().addClass("highcharts-plot-background").add());
            v2[z2](G2);
            f2 || (v2.attr({ fill: g3 || "none" }).shadow(b2.plotShadow), k2 && (e2 ? (k2 !== e2.attr("href") && e2.attr("href", k2), e2.animate(G2)) : this.plotBGImage = a3.image(k2, n2, m2, q2, l2).add()));
            u2 ? u2.animate({ width: p2.width, height: p2.height }) : this.clipRect = a3.clipRect(p2);
            z2 = "animate";
            w2 || (z2 = "attr", this.plotBorder = w2 = a3.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add());
            f2 || w2.attr({ stroke: b2.plotBorderColor, "stroke-width": b2.plotBorderWidth || 0, fill: "none" });
            w2[z2](w2.crisp({ x: n2, y: m2, width: q2, height: l2 }, -w2.strokeWidth()));
            this.isDirtyBox = false;
            S(this, "afterDrawChartBox");
          };
          a2.prototype.propFromSeries = function() {
            var b2 = this, a3 = b2.options.chart, c2 = b2.options.series, d2, f2, e2;
            ["inverted", "angular", "polar"].forEach(function(h2) {
              f2 = z[a3.type || a3.defaultSeriesType];
              e2 = a3[h2] || f2 && f2.prototype[h2];
              for (d2 = c2 && c2.length; !e2 && d2--; )
                (f2 = z[c2[d2].type]) && f2.prototype[h2] && (e2 = true);
              b2[h2] = e2;
            });
          };
          a2.prototype.linkSeries = function() {
            var b2 = this, a3 = b2.series;
            a3.forEach(function(b3) {
              b3.linkedSeries.length = 0;
            });
            a3.forEach(function(a4) {
              var c2 = a4.options.linkedTo;
              R(c2) && (c2 = ":previous" === c2 ? b2.series[a4.index - 1] : b2.get(c2)) && c2.linkedParent !== a4 && (c2.linkedSeries.push(a4), a4.linkedParent = c2, c2.enabledDataSorting && a4.setDataSortingOptions(), a4.visible = W(a4.options.visible, c2.options.visible, a4.visible));
            });
            S(this, "afterLinkSeries");
          };
          a2.prototype.renderSeries = function() {
            this.series.forEach(function(b2) {
              b2.translate();
              b2.render();
            });
          };
          a2.prototype.renderLabels = function() {
            var b2 = this, a3 = b2.options.labels;
            a3.items && a3.items.forEach(function(c2) {
              var d2 = K2(a3.style, c2.style), f2 = ba(d2.left) + b2.plotLeft, e2 = ba(d2.top) + b2.plotTop + 12;
              delete d2.left;
              delete d2.top;
              b2.renderer.text(c2.html, f2, e2).attr({ zIndex: 2 }).css(d2).add();
            });
          };
          a2.prototype.render = function() {
            var b2 = this.axes, a3 = this.colorAxis, c2 = this.renderer, d2 = this.options, f2 = function(b3) {
              b3.forEach(function(b4) {
                b4.visible && b4.render();
              });
            }, e2 = 0;
            this.setTitle();
            this.legend = new H(this, d2.legend);
            this.getStacks && this.getStacks();
            this.getMargins(true);
            this.setChartSize();
            d2 = this.plotWidth;
            b2.some(function(b3) {
              if (b3.horiz && b3.visible && b3.options.labels.enabled && b3.series.length)
                return e2 = 21, true;
            });
            var h2 = this.plotHeight = Math.max(this.plotHeight - e2, 0);
            b2.forEach(function(b3) {
              b3.setScale();
            });
            this.getAxisMargins();
            var g3 = 1.1 < d2 / this.plotWidth, k2 = 1.05 < h2 / this.plotHeight;
            if (g3 || k2)
              b2.forEach(function(b3) {
                (b3.horiz && g3 || !b3.horiz && k2) && b3.setTickInterval(true);
              }), this.getMargins();
            this.drawChartBox();
            this.hasCartesianSeries ? f2(b2) : a3 && a3.length && f2(a3);
            this.seriesGroup || (this.seriesGroup = c2.g("series-group").attr({ zIndex: 3 }).add());
            this.renderSeries();
            this.renderLabels();
            this.addCredits();
            this.setResponsive && this.setResponsive();
            this.hasRendered = true;
          };
          a2.prototype.addCredits = function(b2) {
            var a3 = this, c2 = V(true, this.options.credits, b2);
            c2.enabled && !this.credits && (this.credits = this.renderer.text(c2.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
              c2.href && (u.location.href = c2.href);
            }).attr({ align: c2.position.align, zIndex: 8 }), a3.styledMode || this.credits.css(c2.style), this.credits.add().align(c2.position), this.credits.update = function(b3) {
              a3.credits = a3.credits.destroy();
              a3.addCredits(b3);
            });
          };
          a2.prototype.destroy = function() {
            var b2 = this, a3 = b2.axes, c2 = b2.series, d2 = b2.container, f2 = d2 && d2.parentNode, e2;
            S(b2, "destroy");
            b2.renderer.forExport ? v(w, b2) : w[b2.index] = void 0;
            B.chartCount--;
            b2.renderTo.removeAttribute("data-highcharts-chart");
            ha(b2);
            for (e2 = a3.length; e2--; )
              a3[e2] = a3[e2].destroy();
            this.scroller && this.scroller.destroy && this.scroller.destroy();
            for (e2 = c2.length; e2--; )
              c2[e2] = c2[e2].destroy();
            "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a4) {
              var c3 = b2[a4];
              c3 && c3.destroy && (b2[a4] = c3.destroy());
            });
            d2 && (d2.innerHTML = k.emptyHTML, ha(d2), f2 && Y(d2));
            Z(b2, function(a4, c3) {
              delete b2[c3];
            });
          };
          a2.prototype.firstRender = function() {
            var b2 = this, a3 = b2.options;
            if (!b2.isReadyToRender || b2.isReadyToRender()) {
              b2.getContainer();
              b2.resetMargins();
              b2.setChartSize();
              b2.propFromSeries();
              b2.getAxes();
              (P(a3.series) ? a3.series : []).forEach(function(a4) {
                b2.initSeries(a4);
              });
              b2.linkSeries();
              b2.setSeriesData();
              S(b2, "beforeRender");
              r && (t.isRequired() ? b2.pointer = new t(b2, a3) : b2.pointer = new r(b2, a3));
              b2.render();
              b2.pointer.getChartPosition();
              if (!b2.renderer.imgCount && !b2.hasLoaded)
                b2.onload();
              b2.temporaryDisplay(true);
            }
          };
          a2.prototype.onload = function() {
            this.callbacks.concat([this.callback]).forEach(function(b2) {
              b2 && "undefined" !== typeof this.index && b2.apply(this, [this]);
            }, this);
            S(this, "load");
            S(this, "render");
            T(this.index) && this.setReflow(this.options.chart.reflow);
            this.warnIfA11yModuleNotLoaded();
            this.hasLoaded = true;
          };
          a2.prototype.warnIfA11yModuleNotLoaded = function() {
            var b2 = this.options, a3 = this.title;
            b2 && !this.accessibility && (this.renderer.boxWrapper.attr({ role: "img", "aria-label": (a3 && a3.element.textContent || "").replace(/</g, "&lt;") }), b2.accessibility && false === b2.accessibility.enabled || U(
              'Highcharts warning: Consider including the "accessibility.js" module to make your chart more usable for people with disabilities. Set the "accessibility.enabled" option to false to remove this warning. See https://www.highcharts.com/docs/accessibility/accessibility-module.',
              false,
              this
            ));
          };
          a2.prototype.addSeries = function(b2, a3, c2) {
            var d2 = this, f2;
            b2 && (a3 = W(a3, true), S(d2, "addSeries", { options: b2 }, function() {
              f2 = d2.initSeries(b2);
              d2.isDirtyLegend = true;
              d2.linkSeries();
              f2.enabledDataSorting && f2.setData(b2.data, false);
              S(d2, "afterAddSeries", { series: f2 });
              a3 && d2.redraw(c2);
            }));
            return f2;
          };
          a2.prototype.addAxis = function(b2, a3, c2, d2) {
            return this.createAxis(a3 ? "xAxis" : "yAxis", { axis: b2, redraw: c2, animation: d2 });
          };
          a2.prototype.addColorAxis = function(b2, a3, c2) {
            return this.createAxis("colorAxis", { axis: b2, redraw: a3, animation: c2 });
          };
          a2.prototype.createAxis = function(b2, a3) {
            b2 = new g2(this, V(a3.axis, { index: this[b2].length, isX: "xAxis" === b2 }));
            W(a3.redraw, true) && this.redraw(a3.animation);
            return b2;
          };
          a2.prototype.showLoading = function(b2) {
            var a3 = this, c2 = a3.options, d2 = c2.loading, f2 = function() {
              e2 && Q(e2, { left: a3.plotLeft + "px", top: a3.plotTop + "px", width: a3.plotWidth + "px", height: a3.plotHeight + "px" });
            }, e2 = a3.loadingDiv, h2 = a3.loadingSpan;
            e2 || (a3.loadingDiv = e2 = O("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, a3.container));
            h2 || (a3.loadingSpan = h2 = O(
              "span",
              { className: "highcharts-loading-inner" },
              null,
              e2
            ), q(a3, "redraw", f2));
            e2.className = "highcharts-loading";
            k.setElementHTML(h2, W(b2, c2.lang.loading, ""));
            a3.styledMode || (Q(e2, K2(d2.style, { zIndex: 10 })), Q(h2, d2.labelStyle), a3.loadingShown || (Q(e2, { opacity: 0, display: "" }), p(e2, { opacity: d2.style.opacity || 0.5 }, { duration: d2.showDuration || 0 })));
            a3.loadingShown = true;
            f2();
          };
          a2.prototype.hideLoading = function() {
            var b2 = this.options, a3 = this.loadingDiv;
            a3 && (a3.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || p(a3, { opacity: 0 }, {
              duration: b2.loading.hideDuration || 100,
              complete: function() {
                Q(a3, { display: "none" });
              }
            }));
            this.loadingShown = false;
          };
          a2.prototype.update = function(b2, a3, d2, f2) {
            var e2 = this, g3 = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }, k2 = b2.isResponsiveOptions, n2 = [], m2, q2;
            S(e2, "update", { options: b2 });
            k2 || e2.setResponsive(false, true);
            b2 = J(b2, e2.options);
            e2.userOptions = V(e2.userOptions, b2);
            var l2 = b2.chart;
            if (l2) {
              V(true, e2.options.chart, l2);
              "className" in l2 && e2.setClassName(l2.className);
              "reflow" in l2 && e2.setReflow(l2.reflow);
              if ("inverted" in l2 || "polar" in l2 || "type" in l2) {
                e2.propFromSeries();
                var G2 = true;
              }
              "alignTicks" in l2 && (G2 = true);
              "events" in l2 && c(this, l2);
              Z(l2, function(b3, a4) {
                -1 !== e2.propsRequireUpdateSeries.indexOf("chart." + a4) && (m2 = true);
                -1 !== e2.propsRequireDirtyBox.indexOf(a4) && (e2.isDirtyBox = true);
                -1 !== e2.propsRequireReflow.indexOf(a4) && (k2 ? e2.isDirtyBox = true : q2 = true);
              });
              !e2.styledMode && l2.style && e2.renderer.setStyle(e2.options.chart.style || {});
            }
            !e2.styledMode && b2.colors && (this.options.colors = b2.colors);
            b2.time && (this.time === L && (this.time = new h(b2.time)), V(true, e2.options.time, b2.time));
            Z(b2, function(a4, c2) {
              if (e2[c2] && "function" === typeof e2[c2].update)
                e2[c2].update(a4, false);
              else if ("function" === typeof e2[g3[c2]])
                e2[g3[c2]](a4);
              else
                "colors" !== c2 && -1 === e2.collectionsWithUpdate.indexOf(c2) && V(true, e2.options[c2], b2[c2]);
              "chart" !== c2 && -1 !== e2.propsRequireUpdateSeries.indexOf(c2) && (m2 = true);
            });
            this.collectionsWithUpdate.forEach(function(a4) {
              if (b2[a4]) {
                var c2 = [];
                e2[a4].forEach(function(b3, a5) {
                  b3.options.isInternal || c2.push(W(b3.options.index, a5));
                });
                ea(b2[a4]).forEach(function(b3, f3) {
                  var h2 = T(b3.id), g4;
                  h2 && (g4 = e2.get(b3.id));
                  !g4 && e2[a4] && (g4 = e2[a4][c2 ? c2[f3] : f3]) && h2 && T(g4.options.id) && (g4 = void 0);
                  g4 && g4.coll === a4 && (g4.update(b3, false), d2 && (g4.touched = true));
                  !g4 && d2 && e2.collectionsWithInit[a4] && (e2.collectionsWithInit[a4][0].apply(e2, [b3].concat(e2.collectionsWithInit[a4][1] || []).concat([false])).touched = true);
                });
                d2 && e2[a4].forEach(function(b3) {
                  b3.touched || b3.options.isInternal ? delete b3.touched : n2.push(b3);
                });
              }
            });
            n2.forEach(function(b3) {
              b3.chart && b3.remove && b3.remove(false);
            });
            G2 && e2.axes.forEach(function(b3) {
              b3.update({}, false);
            });
            m2 && e2.getSeriesOrderByLinks().forEach(function(b3) {
              b3.chart && b3.update({}, false);
            }, this);
            G2 = l2 && l2.width;
            l2 = l2 && (R(l2.height) ? fa(l2.height, G2 || e2.chartWidth) : l2.height);
            q2 || M(G2) && G2 !== e2.chartWidth || M(l2) && l2 !== e2.chartHeight ? e2.setSize(G2, l2, f2) : W(a3, true) && e2.redraw(f2);
            S(e2, "afterUpdate", { options: b2, redraw: a3, animation: f2 });
          };
          a2.prototype.setSubtitle = function(b2, a3) {
            this.applyDescription("subtitle", b2);
            this.layOutTitles(a3);
          };
          a2.prototype.setCaption = function(b2, a3) {
            this.applyDescription("caption", b2);
            this.layOutTitles(a3);
          };
          a2.prototype.showResetZoom = function() {
            function b2() {
              a3.zoomOut();
            }
            var a3 = this, c2 = E.lang, d2 = a3.options.chart.zooming.resetButton, f2 = d2.theme, e2 = "chart" === d2.relativeTo || "spacingBox" === d2.relativeTo ? null : "scrollablePlotBox";
            S(this, "beforeShowResetZoom", null, function() {
              a3.resetZoomButton = a3.renderer.button(c2.resetZoom, null, null, b2, f2).attr({ align: d2.position.align, title: c2.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(d2.position, false, e2);
            });
            S(this, "afterShowResetZoom");
          };
          a2.prototype.zoomOut = function() {
            S(this, "selection", { resetSelection: true }, this.zoom);
          };
          a2.prototype.zoom = function(b2) {
            var a3 = this, c2 = a3.pointer, d2 = false, f2;
            !b2 || b2.resetSelection ? (a3.axes.forEach(function(b3) {
              f2 = b3.zoom();
            }), c2.initiated = false) : b2.xAxis.concat(b2.yAxis).forEach(function(b3) {
              var e3 = b3.axis;
              if (c2[e3.isXAxis ? "zoomX" : "zoomY"] && T(c2.mouseDownX) && T(c2.mouseDownY) && a3.isInsidePlot(c2.mouseDownX - a3.plotLeft, c2.mouseDownY - a3.plotTop, { axis: e3 }) || !T(a3.inverted ? c2.mouseDownX : c2.mouseDownY))
                f2 = e3.zoom(b3.min, b3.max), e3.displayBtn && (d2 = true);
            });
            var e2 = a3.resetZoomButton;
            d2 && !e2 ? a3.showResetZoom() : !d2 && X(e2) && (a3.resetZoomButton = e2.destroy());
            f2 && a3.redraw(W(a3.options.chart.animation, b2 && b2.animation, 100 > a3.pointCount));
          };
          a2.prototype.pan = function(b2, a3) {
            var c2 = this, d2 = c2.hoverPoints;
            a3 = "object" === typeof a3 ? a3 : { enabled: a3, type: "x" };
            var f2 = c2.options.chart;
            f2 && f2.panning && (f2.panning = a3);
            var e2 = a3.type, h2;
            S(this, "pan", { originalEvent: b2 }, function() {
              d2 && d2.forEach(function(b3) {
                b3.setState();
              });
              var a4 = c2.xAxis;
              "xy" === e2 ? a4 = a4.concat(c2.yAxis) : "y" === e2 && (a4 = c2.yAxis);
              var f3 = {};
              a4.forEach(function(a5) {
                if (a5.options.panningEnabled && !a5.options.isInternal) {
                  var d3 = a5.horiz, g3 = b2[d3 ? "chartX" : "chartY"];
                  d3 = d3 ? "mouseDownX" : "mouseDownY";
                  var k2 = c2[d3], n2 = a5.minPointOffset || 0, m2 = a5.reversed && !c2.inverted || !a5.reversed && c2.inverted ? -1 : 1, l2 = a5.getExtremes(), q2 = a5.toValue(k2 - g3, true) + n2 * m2, G2 = a5.toValue(k2 + a5.len - g3, true) - (n2 * m2 || a5.isXAxis && a5.pointRangePadding || 0), u2 = G2 < q2;
                  m2 = a5.hasVerticalPanning();
                  k2 = u2 ? G2 : q2;
                  q2 = u2 ? q2 : G2;
                  var p2 = a5.panningState;
                  !m2 || a5.isXAxis || p2 && !p2.isDirty || a5.series.forEach(function(b3) {
                    var a6 = b3.getProcessedData(true);
                    a6 = b3.getExtremes(a6.yData, true);
                    p2 || (p2 = { startMin: Number.MAX_VALUE, startMax: -Number.MAX_VALUE });
                    M(a6.dataMin) && M(a6.dataMax) && (p2.startMin = Math.min(W(b3.options.threshold, Infinity), a6.dataMin, p2.startMin), p2.startMax = Math.max(W(b3.options.threshold, -Infinity), a6.dataMax, p2.startMax));
                  });
                  m2 = Math.min(W(p2 && p2.startMin, l2.dataMin), n2 ? l2.min : a5.toValue(a5.toPixels(l2.min) - a5.minPixelPadding));
                  G2 = Math.max(W(p2 && p2.startMax, l2.dataMax), n2 ? l2.max : a5.toValue(a5.toPixels(l2.max) + a5.minPixelPadding));
                  a5.panningState = p2;
                  a5.isOrdinal || (n2 = m2 - k2, 0 < n2 && (q2 += n2, k2 = m2), n2 = q2 - G2, 0 < n2 && (q2 = G2, k2 -= n2), a5.series.length && k2 !== l2.min && q2 !== l2.max && k2 >= m2 && q2 <= G2 && (a5.setExtremes(k2, q2, false, false, { trigger: "pan" }), !c2.resetZoomButton && k2 !== m2 && q2 !== G2 && e2.match("y") && (c2.showResetZoom(), a5.displayBtn = false), h2 = true), f3[d3] = g3);
                }
              });
              Z(f3, function(b3, a5) {
                c2[a5] = b3;
              });
              h2 && c2.redraw(false);
              Q(c2.container, { cursor: "move" });
            });
          };
          return a2;
        }();
        K2(a.prototype, {
          callbacks: [],
          collectionsWithInit: { xAxis: [a.prototype.addAxis, [true]], yAxis: [a.prototype.addAxis, [false]], series: [a.prototype.addSeries] },
          collectionsWithUpdate: ["xAxis", "yAxis", "series"],
          propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
          propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),
          propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" ")
        });
        "";
        return a;
      });
      K(g, "Core/Legend/LegendSymbol.js", [g["Core/Utilities.js"]], function(a) {
        var g2 = a.extend, x = a.merge, F = a.pick, C;
        (function(a2) {
          a2.drawLineMarker = function(a3) {
            var t = this.legendItem = this.legendItem || {}, r = this.options, l = a3.symbolWidth, e = a3.symbolHeight, d = e / 2, h = this.chart.renderer, m = t.group;
            a3 = a3.baseline - Math.round(0.3 * a3.fontMetrics.b);
            var k = {}, p = r.marker, D = 0;
            this.chart.styledMode || (k = { "stroke-width": Math.min(r.lineWidth || 0, 24) }, r.dashStyle ? k.dashstyle = r.dashStyle : "square" !== r.linecap && (k["stroke-linecap"] = "round"));
            t.line = h.path().addClass("highcharts-graph").attr(k).add(m);
            k["stroke-linecap"] && (D = Math.min(t.line.strokeWidth(), l) / 2);
            t.line.attr({ d: [["M", D, a3], ["L", l - D, a3]] });
            p && false !== p.enabled && l && (r = Math.min(F(p.radius, d), d), 0 === this.symbol.indexOf("url") && (p = x(p, { width: e, height: e }), r = 0), t.symbol = t = h.symbol(this.symbol, l / 2 - r, a3 - r, 2 * r, 2 * r, g2({ context: "legend" }, p)).addClass("highcharts-point").add(m), t.isMarker = true);
          };
          a2.drawRectangle = function(a3, g3) {
            g3 = g3.legendItem || {};
            var r = a3.symbolHeight, l = a3.options.squareSymbol;
            g3.symbol = this.chart.renderer.rect(l ? (a3.symbolWidth - r) / 2 : 0, a3.baseline - r + 1, l ? r : a3.symbolWidth, r, F(a3.options.symbolRadius, r / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(g3.group);
          };
        })(C || (C = {}));
        return C;
      });
      K(g, "Core/Series/SeriesDefaults.js", [], function() {
        return {
          lineWidth: 2,
          allowPointSelect: false,
          crisp: true,
          showCheckbox: false,
          animation: { duration: 1e3 },
          events: {},
          marker: {
            enabledThreshold: 2,
            lineColor: "#ffffff",
            lineWidth: 0,
            radius: 4,
            states: { normal: { animation: true }, hover: { animation: { duration: 50 }, enabled: true, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } }
          },
          point: { events: {} },
          dataLabels: { animation: {}, align: "center", borderWidth: 0, defer: true, formatter: function() {
            var a = this.series.chart.numberFormatter;
            return "number" !== typeof this.y ? "" : a(this.y, -1);
          }, padding: 5, style: { fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast" }, verticalAlign: "bottom", x: 0, y: 0 },
          cropThreshold: 300,
          opacity: 1,
          pointRange: 0,
          softThreshold: true,
          states: { normal: { animation: true }, hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: 0.25 } }, select: { animation: { duration: 0 } }, inactive: { animation: { duration: 50 }, opacity: 0.2 } },
          stickyTracking: true,
          turboThreshold: 1e3,
          findNearestPointBy: "x"
        };
      });
      K(g, "Core/Series/Series.js", [
        g["Core/Animation/AnimationUtilities.js"],
        g["Core/Defaults.js"],
        g["Core/Foundation.js"],
        g["Core/Globals.js"],
        g["Core/Legend/LegendSymbol.js"],
        g["Core/Series/Point.js"],
        g["Core/Series/SeriesDefaults.js"],
        g["Core/Series/SeriesRegistry.js"],
        g["Core/Renderer/SVG/SVGElement.js"],
        g["Core/Utilities.js"]
      ], function(a, g2, x, F, C, B, H, t, r, l) {
        var e = a.animObject, d = a.setAnimation, h = g2.defaultOptions, m = x.registerEventOptions, k = F.hasTouch, p = F.svg, D = F.win, A = t.seriesTypes, E = l.arrayMax, L = l.arrayMin, y = l.clamp, c = l.cleanRecursively, w = l.correctFloat, f = l.defined, n = l.erase, b = l.error, u = l.extend, z = l.find, q = l.fireEvent, N = l.getNestedProperty, J = l.isArray, O = l.isNumber, Q = l.isString, T = l.merge, Y = l.objectEach, v = l.pick, U = l.removeEvent, K2 = l.splat, ca = l.syncTimeout;
        a = function() {
          function a2() {
            this.zones = this.yAxis = this.xAxis = this.userOptions = this.tooltipOptions = this.processedYData = this.processedXData = this.points = this.options = this.linkedSeries = this.index = this.eventsToUnbind = this.eventOptions = this.data = this.chart = this._i = void 0;
          }
          a2.prototype.init = function(b2, a3) {
            q(this, "init", { options: a3 });
            var c2 = this, d2 = b2.series;
            this.eventsToUnbind = [];
            c2.chart = b2;
            c2.options = c2.setOptions(a3);
            a3 = c2.options;
            c2.linkedSeries = [];
            c2.bindAxes();
            u(
              c2,
              { name: a3.name, state: "", visible: false !== a3.visible, selected: true === a3.selected }
            );
            m(this, a3);
            var f2 = a3.events;
            if (f2 && f2.click || a3.point && a3.point.events && a3.point.events.click || a3.allowPointSelect)
              b2.runTrackerClick = true;
            c2.getColor();
            c2.getSymbol();
            c2.parallelArrays.forEach(function(b3) {
              c2[b3 + "Data"] || (c2[b3 + "Data"] = []);
            });
            c2.isCartesian && (b2.hasCartesianSeries = true);
            var e2;
            d2.length && (e2 = d2[d2.length - 1]);
            c2._i = v(e2 && e2._i, -1) + 1;
            c2.opacity = c2.options.opacity;
            b2.orderSeries(this.insert(d2));
            a3.dataSorting && a3.dataSorting.enabled ? c2.setDataSortingOptions() : c2.points || c2.data || c2.setData(a3.data, false);
            q(this, "afterInit");
          };
          a2.prototype.is = function(b2) {
            return A[b2] && this instanceof A[b2];
          };
          a2.prototype.insert = function(b2) {
            var a3 = this.options.index, c2;
            if (O(a3)) {
              for (c2 = b2.length; c2--; )
                if (a3 >= v(b2[c2].options.index, b2[c2]._i)) {
                  b2.splice(c2 + 1, 0, this);
                  break;
                }
              -1 === c2 && b2.unshift(this);
              c2 += 1;
            } else
              b2.push(this);
            return v(c2, b2.length - 1);
          };
          a2.prototype.bindAxes = function() {
            var a3 = this, c2 = a3.options, d2 = a3.chart, f2;
            q(this, "bindAxes", null, function() {
              (a3.axisTypes || []).forEach(function(e2) {
                var h2 = 0;
                d2[e2].forEach(function(b2) {
                  f2 = b2.options;
                  if (c2[e2] === h2 && !f2.isInternal || "undefined" !== typeof c2[e2] && c2[e2] === f2.id || "undefined" === typeof c2[e2] && 0 === f2.index)
                    a3.insert(b2.series), a3[e2] = b2, b2.isDirty = true;
                  f2.isInternal || h2++;
                });
                a3[e2] || a3.optionalAxis === e2 || b(18, true, d2);
              });
            });
            q(this, "afterBindAxes");
          };
          a2.prototype.updateParallelArrays = function(b2, a3) {
            var c2 = b2.series, d2 = arguments, f2 = O(a3) ? function(d3) {
              var f3 = "y" === d3 && c2.toYData ? c2.toYData(b2) : b2[d3];
              c2[d3 + "Data"][a3] = f3;
            } : function(b3) {
              Array.prototype[a3].apply(c2[b3 + "Data"], Array.prototype.slice.call(d2, 2));
            };
            c2.parallelArrays.forEach(f2);
          };
          a2.prototype.hasData = function() {
            return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length;
          };
          a2.prototype.autoIncrement = function(b2) {
            var a3 = this.options, c2 = a3.pointIntervalUnit, d2 = a3.relativeXValue, f2 = this.chart.time, e2 = this.xIncrement, h2;
            e2 = v(e2, a3.pointStart, 0);
            this.pointInterval = h2 = v(this.pointInterval, a3.pointInterval, 1);
            d2 && O(b2) && (h2 *= b2);
            c2 && (a3 = new f2.Date(e2), "day" === c2 ? f2.set("Date", a3, f2.get("Date", a3) + h2) : "month" === c2 ? f2.set("Month", a3, f2.get(
              "Month",
              a3
            ) + h2) : "year" === c2 && f2.set("FullYear", a3, f2.get("FullYear", a3) + h2), h2 = a3.getTime() - e2);
            if (d2 && O(b2))
              return e2 + h2;
            this.xIncrement = e2 + h2;
            return e2;
          };
          a2.prototype.setDataSortingOptions = function() {
            var b2 = this.options;
            u(this, { requireSorting: false, sorted: false, enabledDataSorting: true, allowDG: false });
            f(b2.pointRange) || (b2.pointRange = 1);
          };
          a2.prototype.setOptions = function(b2) {
            var a3 = this.chart, c2 = a3.options, d2 = c2.plotOptions, e2 = a3.userOptions || {};
            b2 = T(b2);
            a3 = a3.styledMode;
            var g3 = { plotOptions: d2, userOptions: b2 };
            q(this, "setOptions", g3);
            var k2 = g3.plotOptions[this.type], n2 = e2.plotOptions || {};
            this.userOptions = g3.userOptions;
            e2 = T(k2, d2.series, e2.plotOptions && e2.plotOptions[this.type], b2);
            this.tooltipOptions = T(h.tooltip, h.plotOptions.series && h.plotOptions.series.tooltip, h.plotOptions[this.type].tooltip, c2.tooltip.userOptions, d2.series && d2.series.tooltip, d2[this.type].tooltip, b2.tooltip);
            this.stickyTracking = v(b2.stickyTracking, n2[this.type] && n2[this.type].stickyTracking, n2.series && n2.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? true : e2.stickyTracking);
            null === k2.marker && delete e2.marker;
            this.zoneAxis = e2.zoneAxis;
            d2 = this.zones = (e2.zones || []).slice();
            !e2.negativeColor && !e2.negativeFillColor || e2.zones || (c2 = { value: e2[this.zoneAxis + "Threshold"] || e2.threshold || 0, className: "highcharts-negative" }, a3 || (c2.color = e2.negativeColor, c2.fillColor = e2.negativeFillColor), d2.push(c2));
            d2.length && f(d2[d2.length - 1].value) && d2.push(a3 ? {} : { color: this.color, fillColor: this.fillColor });
            q(this, "afterSetOptions", { options: e2 });
            return e2;
          };
          a2.prototype.getName = function() {
            return v(this.options.name, "Series " + (this.index + 1));
          };
          a2.prototype.getCyclic = function(b2, a3, c2) {
            var d2 = this.chart, e2 = this.userOptions, h2 = b2 + "Index", g3 = b2 + "Counter", k2 = c2 ? c2.length : v(d2.options.chart[b2 + "Count"], d2[b2 + "Count"]);
            if (!a3) {
              var n2 = v(e2[h2], e2["_" + h2]);
              f(n2) || (d2.series.length || (d2[g3] = 0), e2["_" + h2] = n2 = d2[g3] % k2, d2[g3] += 1);
              c2 && (a3 = c2[n2]);
            }
            "undefined" !== typeof n2 && (this[h2] = n2);
            this[b2] = a3;
          };
          a2.prototype.getColor = function() {
            this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.color = "#cccccc" : this.getCyclic(
              "color",
              this.options.color || h.plotOptions[this.type].color,
              this.chart.options.colors
            );
          };
          a2.prototype.getPointsCollection = function() {
            return (this.hasGroupedData ? this.points : this.data) || [];
          };
          a2.prototype.getSymbol = function() {
            this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols);
          };
          a2.prototype.findPointIndex = function(b2, a3) {
            var c2 = b2.id, d2 = b2.x, f2 = this.points, e2 = this.options.dataSorting, h2, g3;
            if (c2)
              e2 = this.chart.get(c2), e2 instanceof B && (h2 = e2);
            else if (this.linkedParent || this.enabledDataSorting || this.options.relativeXValue) {
              if (h2 = function(a4) {
                return !a4.touched && a4.index === b2.index;
              }, e2 && e2.matchByName ? h2 = function(a4) {
                return !a4.touched && a4.name === b2.name;
              } : this.options.relativeXValue && (h2 = function(a4) {
                return !a4.touched && a4.options.x === b2.x;
              }), h2 = z(f2, h2), !h2)
                return;
            }
            if (h2) {
              var k2 = h2 && h2.index;
              "undefined" !== typeof k2 && (g3 = true);
            }
            "undefined" === typeof k2 && O(d2) && (k2 = this.xData.indexOf(d2, a3));
            -1 !== k2 && "undefined" !== typeof k2 && this.cropped && (k2 = k2 >= this.cropStart ? k2 - this.cropStart : k2);
            !g3 && O(k2) && f2[k2] && f2[k2].touched && (k2 = void 0);
            return k2;
          };
          a2.prototype.updateData = function(b2, a3) {
            var c2 = this.options, d2 = c2.dataSorting, e2 = this.points, h2 = [], g3 = this.requireSorting, k2 = b2.length === e2.length, n2, m2, q2, l2 = true;
            this.xIncrement = null;
            b2.forEach(function(b3, a4) {
              var m3 = f(b3) && this.pointClass.prototype.optionsToObject.call({ series: this }, b3) || {}, l3 = m3.x;
              if (m3.id || O(l3)) {
                if (m3 = this.findPointIndex(m3, q2), -1 === m3 || "undefined" === typeof m3 ? h2.push(b3) : e2[m3] && b3 !== c2.data[m3] ? (e2[m3].update(b3, false, null, false), e2[m3].touched = true, g3 && (q2 = m3 + 1)) : e2[m3] && (e2[m3].touched = true), !k2 || a4 !== m3 || d2 && d2.enabled || this.hasDerivedData)
                  n2 = true;
              } else
                h2.push(b3);
            }, this);
            if (n2)
              for (b2 = e2.length; b2--; )
                (m2 = e2[b2]) && !m2.touched && m2.remove && m2.remove(false, a3);
            else
              !k2 || d2 && d2.enabled ? l2 = false : (b2.forEach(function(b3, a4) {
                b3 !== e2[a4].y && e2[a4].update && e2[a4].update(b3, false, null, false);
              }), h2.length = 0);
            e2.forEach(function(b3) {
              b3 && (b3.touched = false);
            });
            if (!l2)
              return false;
            h2.forEach(function(b3) {
              this.addPoint(b3, false, null, null, false);
            }, this);
            null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = E(this.xData), this.autoIncrement());
            return true;
          };
          a2.prototype.setData = function(a3, c2, d2, f2) {
            void 0 === c2 && (c2 = true);
            var e2 = this, h2 = e2.points, g3 = h2 && h2.length || 0, k2 = e2.options, n2 = e2.chart, m2 = k2.dataSorting, l2 = e2.xAxis, q2 = k2.turboThreshold, u2 = this.xData, p2 = this.yData, G = e2.pointArrayMap;
            G = G && G.length;
            var v2 = k2.keys, w2, r2 = 0, z2 = 1, y2 = null;
            if (!n2.options.chart.allowMutatingData) {
              k2.data && delete e2.options.data;
              e2.userOptions.data && delete e2.userOptions.data;
              var M = T(true, a3);
            }
            a3 = M || a3 || [];
            M = a3.length;
            m2 && m2.enabled && (a3 = this.sortData(a3));
            n2.options.chart.allowMutatingData && false !== f2 && M && g3 && !e2.cropped && !e2.hasGroupedData && e2.visible && !e2.boosted && (w2 = this.updateData(a3, d2));
            if (!w2) {
              e2.xIncrement = null;
              e2.colorCounter = 0;
              this.parallelArrays.forEach(function(b2) {
                e2[b2 + "Data"].length = 0;
              });
              if (q2 && M > q2)
                if (y2 = e2.getFirstValidPoint(a3), O(y2))
                  for (d2 = 0; d2 < M; d2++)
                    u2[d2] = this.autoIncrement(), p2[d2] = a3[d2];
                else if (J(y2))
                  if (G)
                    if (y2.length === G)
                      for (d2 = 0; d2 < M; d2++)
                        u2[d2] = this.autoIncrement(), p2[d2] = a3[d2];
                    else
                      for (d2 = 0; d2 < M; d2++)
                        f2 = a3[d2], u2[d2] = f2[0], p2[d2] = f2.slice(1, G + 1);
                  else if (v2 && (r2 = v2.indexOf("x"), z2 = v2.indexOf("y"), r2 = 0 <= r2 ? r2 : 0, z2 = 0 <= z2 ? z2 : 1), 1 === y2.length && (z2 = 0), r2 === z2)
                    for (d2 = 0; d2 < M; d2++)
                      u2[d2] = this.autoIncrement(), p2[d2] = a3[d2][z2];
                  else
                    for (d2 = 0; d2 < M; d2++)
                      f2 = a3[d2], u2[d2] = f2[r2], p2[d2] = f2[z2];
                else
                  b(12, false, n2);
              else
                for (d2 = 0; d2 < M; d2++)
                  "undefined" !== typeof a3[d2] && (f2 = { series: e2 }, e2.pointClass.prototype.applyOptions.apply(f2, [a3[d2]]), e2.updateParallelArrays(f2, d2));
              p2 && Q(p2[0]) && b(14, true, n2);
              e2.data = [];
              e2.options.data = e2.userOptions.data = a3;
              for (d2 = g3; d2--; )
                h2[d2] && h2[d2].destroy && h2[d2].destroy();
              l2 && (l2.minRange = l2.userMinRange);
              e2.isDirty = n2.isDirtyBox = true;
              e2.isDirtyData = !!h2;
              d2 = false;
            }
            "point" === k2.legendType && (this.processData(), this.generatePoints());
            c2 && n2.redraw(d2);
          };
          a2.prototype.sortData = function(b2) {
            var a3 = this, c2 = a3.options.dataSorting.sortKey || "y", d2 = function(b3, a4) {
              return f(a4) && b3.pointClass.prototype.optionsToObject.call(
                { series: b3 },
                a4
              ) || {};
            };
            b2.forEach(function(c3, e2) {
              b2[e2] = d2(a3, c3);
              b2[e2].index = e2;
            }, this);
            b2.concat().sort(function(b3, a4) {
              b3 = N(c2, b3);
              a4 = N(c2, a4);
              return a4 < b3 ? -1 : a4 > b3 ? 1 : 0;
            }).forEach(function(b3, a4) {
              b3.x = a4;
            }, this);
            a3.linkedSeries && a3.linkedSeries.forEach(function(a4) {
              var c3 = a4.options, e2 = c3.data;
              c3.dataSorting && c3.dataSorting.enabled || !e2 || (e2.forEach(function(c4, f2) {
                e2[f2] = d2(a4, c4);
                b2[f2] && (e2[f2].x = b2[f2].x, e2[f2].index = f2);
              }), a4.setData(e2, false));
            });
            return b2;
          };
          a2.prototype.getProcessedData = function(a3) {
            var c2 = this.xAxis, d2 = this.options, e2 = d2.cropThreshold, f2 = a3 || this.getExtremesFromAll || d2.getExtremesFromAll, h2 = this.isCartesian;
            a3 = c2 && c2.val2lin;
            d2 = !(!c2 || !c2.logarithmic);
            var g3 = 0, k2 = this.xData, n2 = this.yData, m2 = this.requireSorting;
            var l2 = false;
            var q2 = k2.length;
            if (c2) {
              l2 = c2.getExtremes();
              var u2 = l2.min;
              var p2 = l2.max;
              l2 = !(!c2.categories || c2.names.length);
            }
            if (h2 && this.sorted && !f2 && (!e2 || q2 > e2 || this.forceCrop)) {
              if (k2[q2 - 1] < u2 || k2[0] > p2)
                k2 = [], n2 = [];
              else if (this.yData && (k2[0] < u2 || k2[q2 - 1] > p2)) {
                var G = this.cropData(this.xData, this.yData, u2, p2);
                k2 = G.xData;
                n2 = G.yData;
                g3 = G.start;
                G = true;
              }
            }
            for (e2 = k2.length || 1; --e2; )
              if (c2 = d2 ? a3(k2[e2]) - a3(k2[e2 - 1]) : k2[e2] - k2[e2 - 1], 0 < c2 && ("undefined" === typeof v2 || c2 < v2))
                var v2 = c2;
              else
                0 > c2 && m2 && !l2 && (b(15, false, this.chart), m2 = false);
            return { xData: k2, yData: n2, cropped: G, cropStart: g3, closestPointRange: v2 };
          };
          a2.prototype.processData = function(b2) {
            var a3 = this.xAxis;
            if (this.isCartesian && !this.isDirty && !a3.isDirty && !this.yAxis.isDirty && !b2)
              return false;
            b2 = this.getProcessedData();
            this.cropped = b2.cropped;
            this.cropStart = b2.cropStart;
            this.processedXData = b2.xData;
            this.processedYData = b2.yData;
            this.closestPointRange = this.basePointRange = b2.closestPointRange;
            q(this, "afterProcessData");
          };
          a2.prototype.cropData = function(b2, a3, c2, d2, e2) {
            var f2 = b2.length, h2, g3 = 0, k2 = f2;
            e2 = v(e2, this.cropShoulder);
            for (h2 = 0; h2 < f2; h2++)
              if (b2[h2] >= c2) {
                g3 = Math.max(0, h2 - e2);
                break;
              }
            for (c2 = h2; c2 < f2; c2++)
              if (b2[c2] > d2) {
                k2 = c2 + e2;
                break;
              }
            return { xData: b2.slice(g3, k2), yData: a3.slice(g3, k2), start: g3, end: k2 };
          };
          a2.prototype.generatePoints = function() {
            var b2 = this.options, a3 = this.processedData || b2.data, c2 = this.processedXData, d2 = this.processedYData, e2 = this.pointClass, f2 = c2.length, h2 = this.cropStart || 0, g3 = this.hasGroupedData, k2 = b2.keys, n2 = [];
            b2 = b2.dataGrouping && b2.dataGrouping.groupAll ? h2 : 0;
            var m2, l2, p2 = this.data;
            if (!p2 && !g3) {
              var v2 = [];
              v2.length = a3.length;
              p2 = this.data = v2;
            }
            k2 && g3 && (this.options.keys = false);
            for (l2 = 0; l2 < f2; l2++) {
              v2 = h2 + l2;
              if (g3) {
                var r2 = new e2().init(this, [c2[l2]].concat(K2(d2[l2])));
                r2.dataGroup = this.groupMap[b2 + l2];
                r2.dataGroup.options && (r2.options = r2.dataGroup.options, u(r2, r2.dataGroup.options), delete r2.dataLabels);
              } else
                (r2 = p2[v2]) || "undefined" === typeof a3[v2] || (p2[v2] = r2 = new e2().init(this, a3[v2], c2[l2]));
              r2 && (r2.index = g3 ? b2 + l2 : v2, n2[l2] = r2);
            }
            this.options.keys = k2;
            if (p2 && (f2 !== (m2 = p2.length) || g3))
              for (l2 = 0; l2 < m2; l2++)
                l2 !== h2 || g3 || (l2 += f2), p2[l2] && (p2[l2].destroyElements(), p2[l2].plotX = void 0);
            this.data = p2;
            this.points = n2;
            q(this, "afterGeneratePoints");
          };
          a2.prototype.getXExtremes = function(b2) {
            return { min: L(b2), max: E(b2) };
          };
          a2.prototype.getExtremes = function(b2, a3) {
            var c2 = this.xAxis, d2 = this.yAxis, e2 = this.processedXData || this.xData, f2 = [], h2 = this.requireSorting ? this.cropShoulder : 0;
            d2 = d2 ? d2.positiveValuesOnly : false;
            var g3, k2 = 0, n2 = 0, m2 = 0;
            b2 = b2 || this.stackedYData || this.processedYData || [];
            var l2 = b2.length;
            if (c2) {
              var p2 = c2.getExtremes();
              k2 = p2.min;
              n2 = p2.max;
            }
            for (g3 = 0; g3 < l2; g3++) {
              var u2 = e2[g3];
              p2 = b2[g3];
              var G = (O(p2) || J(p2)) && (p2.length || 0 < p2 || !d2);
              u2 = a3 || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !c2 || (e2[g3 + h2] || u2) >= k2 && (e2[g3 - h2] || u2) <= n2;
              if (G && u2)
                if (G = p2.length)
                  for (; G--; )
                    O(p2[G]) && (f2[m2++] = p2[G]);
                else
                  f2[m2++] = p2;
            }
            b2 = { activeYData: f2, dataMin: L(f2), dataMax: E(f2) };
            q(this, "afterGetExtremes", { dataExtremes: b2 });
            return b2;
          };
          a2.prototype.applyExtremes = function() {
            var b2 = this.getExtremes();
            this.dataMin = b2.dataMin;
            this.dataMax = b2.dataMax;
            return b2;
          };
          a2.prototype.getFirstValidPoint = function(b2) {
            for (var a3 = b2.length, c2 = 0, d2 = null; null === d2 && c2 < a3; )
              d2 = b2[c2], c2++;
            return d2;
          };
          a2.prototype.translate = function() {
            this.processedXData || this.processData();
            this.generatePoints();
            var b2 = this.options, a3 = b2.stacking, c2 = this.xAxis, d2 = c2.categories, e2 = this.enabledDataSorting, h2 = this.yAxis, g3 = this.points, k2 = g3.length, n2 = this.pointPlacementToXValue(), m2 = !!n2, l2 = b2.threshold, p2 = b2.startFromThreshold ? l2 : 0, u2 = this.zoneAxis || "y", r2, z2, t2 = Number.MAX_VALUE;
            for (r2 = 0; r2 < k2; r2++) {
              var D2 = g3[r2], E2 = D2.x, A2 = void 0, N2 = void 0, I = D2.y, x2 = D2.low, C2 = a3 && h2.stacking && h2.stacking.stacks[(this.negStacks && I < (p2 ? 0 : l2) ? "-" : "") + this.stackKey];
              if (h2.positiveValuesOnly && !h2.validatePositiveValue(I) || c2.positiveValuesOnly && !c2.validatePositiveValue(E2))
                D2.isNull = true;
              D2.plotX = z2 = w(y(c2.translate(E2, 0, 0, 0, 1, n2, "flags" === this.type), -1e5, 1e5));
              if (a3 && this.visible && C2 && C2[E2]) {
                var L2 = this.getStackIndicator(L2, E2, this.index);
                !D2.isNull && L2.key && (A2 = C2[E2], N2 = A2.points[L2.key]);
                A2 && J(N2) && (x2 = N2[0], I = N2[1], x2 === p2 && L2.key === C2[E2].base && (x2 = v(O(l2) ? l2 : h2.min)), h2.positiveValuesOnly && f(x2) && 0 >= x2 && (x2 = void 0), D2.total = D2.stackTotal = v(A2.total), D2.percentage = f(D2.y) && A2.total ? D2.y / A2.total * 100 : void 0, D2.stackY = I, this.irregularWidths || A2.setOffset(this.pointXOffset || 0, this.barW || 0, void 0, void 0, void 0, this.xAxis));
              }
              D2.yBottom = f(x2) ? y(h2.translate(x2, 0, 1, 0, 1), -1e5, 1e5) : void 0;
              this.dataModify && (I = this.dataModify.modifyValue(I, r2));
              D2.plotY = void 0;
              O(I) && (A2 = h2.translate(I, false, true, false, true), "undefined" !== typeof A2 && (D2.plotY = y(A2, -1e5, 1e5)));
              D2.isInside = this.isPointInside(D2);
              D2.clientX = m2 ? w(c2.translate(E2, 0, 0, 0, 1, n2)) : z2;
              D2.negative = D2[u2] < (b2[u2 + "Threshold"] || l2 || 0);
              D2.category = v(d2 && d2[D2.x], D2.x);
              if (!D2.isNull && false !== D2.visible) {
                "undefined" !== typeof B2 && (t2 = Math.min(t2, Math.abs(z2 - B2)));
                var B2 = z2;
              }
              D2.zone = this.zones.length ? D2.getZone() : void 0;
              !D2.graphic && this.group && e2 && (D2.isNew = true);
            }
            this.closestPointRangePx = t2;
            q(this, "afterTranslate");
          };
          a2.prototype.getValidPoints = function(b2, a3, c2) {
            var d2 = this.chart;
            return (b2 || this.points || []).filter(function(b3) {
              return a3 && !d2.isInsidePlot(b3.plotX, b3.plotY, { inverted: d2.inverted }) ? false : false !== b3.visible && (c2 || !b3.isNull);
            });
          };
          a2.prototype.getClipBox = function() {
            var b2 = this.chart, a3 = this.xAxis, c2 = this.yAxis, d2 = T(b2.clipBox);
            a3 && a3.len !== b2.plotSizeX && (d2.width = a3.len);
            c2 && c2.len !== b2.plotSizeY && (d2.height = c2.len);
            return d2;
          };
          a2.prototype.getSharedClipKey = function() {
            return this.sharedClipKey = (this.options.xAxis || 0) + "," + (this.options.yAxis || 0);
          };
          a2.prototype.setClip = function() {
            var b2 = this.chart, a3 = this.group, c2 = this.markerGroup, d2 = b2.sharedClips;
            b2 = b2.renderer;
            var e2 = this.getClipBox(), f2 = this.getSharedClipKey(), h2 = d2[f2];
            h2 ? h2.animate(e2) : d2[f2] = h2 = b2.clipRect(e2);
            a3 && a3.clip(false === this.options.clip ? void 0 : h2);
            c2 && c2.clip();
          };
          a2.prototype.animate = function(b2) {
            var a3 = this.chart, c2 = this.group, d2 = this.markerGroup, f2 = a3.inverted, h2 = e(this.options.animation), g3 = [this.getSharedClipKey(), h2.duration, h2.easing, h2.defer].join(), k2 = a3.sharedClips[g3], n2 = a3.sharedClips[g3 + "m"];
            if (b2 && c2)
              h2 = this.getClipBox(), k2 ? k2.attr("height", h2.height) : (h2.width = 0, f2 && (h2.x = a3.plotHeight), k2 = a3.renderer.clipRect(h2), a3.sharedClips[g3] = k2, n2 = a3.renderer.clipRect({ x: -99, y: -99, width: f2 ? a3.plotWidth + 199 : 99, height: f2 ? 99 : a3.plotHeight + 199 }), a3.sharedClips[g3 + "m"] = n2), c2.clip(k2), d2 && d2.clip(n2);
            else if (k2 && !k2.hasClass("highcharts-animating")) {
              a3 = this.getClipBox();
              var m2 = h2.step;
              d2 && d2.element.childNodes.length && (h2.step = function(b3, a4) {
                m2 && m2.apply(a4, arguments);
                "width" === a4.prop && n2 && n2.element && n2.attr(f2 ? "height" : "width", b3 + 99);
              });
              k2.addClass("highcharts-animating").animate(a3, h2);
            }
          };
          a2.prototype.afterAnimate = function() {
            var b2 = this;
            this.setClip();
            Y(this.chart.sharedClips, function(a3, c2, d2) {
              a3 && !b2.chart.container.querySelector('[clip-path="url(#'.concat(a3.id, ')"]')) && (a3.destroy(), delete d2[c2]);
            });
            this.finishedAnimating = true;
            q(this, "afterAnimate");
          };
          a2.prototype.drawPoints = function(b2) {
            void 0 === b2 && (b2 = this.points);
            var a3 = this.chart, c2 = a3.styledMode, d2 = this.colorAxis, e2 = this.options.marker, f2 = this[this.specialGroup || "markerGroup"], h2 = this.xAxis, g3 = v(e2.enabled, !h2 || h2.isRadial ? true : null, this.closestPointRangePx >= e2.enabledThreshold * e2.radius), k2, n2;
            if (false !== e2.enabled || this._hasPointMarkers)
              for (k2 = 0; k2 < b2.length; k2++) {
                var m2 = b2[k2];
                var l2 = (n2 = m2.graphic) ? "animate" : "attr";
                var q2 = m2.marker || {};
                var p2 = !!m2.marker;
                if ((g3 && "undefined" === typeof q2.enabled || q2.enabled) && !m2.isNull && false !== m2.visible) {
                  var u2 = v(
                    q2.symbol,
                    this.symbol,
                    "rect"
                  );
                  var G = this.markerAttribs(m2, m2.selected && "select");
                  this.enabledDataSorting && (m2.startXPos = h2.reversed ? -(G.width || 0) : h2.width);
                  var r2 = false !== m2.isInside;
                  !n2 && r2 && (0 < (G.width || 0) || m2.hasImage) && (m2.graphic = n2 = a3.renderer.symbol(u2, G.x, G.y, G.width, G.height, p2 ? q2 : e2).add(f2), this.enabledDataSorting && a3.hasRendered && (n2.attr({ x: m2.startXPos }), l2 = "animate"));
                  n2 && "animate" === l2 && n2[r2 ? "show" : "hide"](r2).animate(G);
                  if (n2)
                    if (q2 = this.pointAttribs(m2, c2 || !m2.selected ? void 0 : "select"), c2)
                      d2 && n2.css({ fill: q2.fill });
                    else
                      n2[l2](q2);
                  n2 && n2.addClass(m2.getClassName(), true);
                } else
                  n2 && (m2.graphic = n2.destroy());
              }
          };
          a2.prototype.markerAttribs = function(b2, a3) {
            var c2 = this.options, d2 = c2.marker, e2 = b2.marker || {}, f2 = e2.symbol || d2.symbol, h2 = {}, g3 = v(e2.radius, d2 && d2.radius);
            a3 && (d2 = d2.states[a3], a3 = e2.states && e2.states[a3], g3 = v(a3 && a3.radius, d2 && d2.radius, g3 && g3 + (d2 && d2.radiusPlus || 0)));
            b2.hasImage = f2 && 0 === f2.indexOf("url");
            b2.hasImage && (g3 = 0);
            b2 = b2.pos();
            O(g3) && b2 && (h2.x = b2[0] - g3, h2.y = b2[1] - g3, c2.crisp && (h2.x = Math.floor(h2.x)));
            g3 && (h2.width = h2.height = 2 * g3);
            return h2;
          };
          a2.prototype.pointAttribs = function(b2, a3) {
            var c2 = this.options.marker, d2 = b2 && b2.options, e2 = d2 && d2.marker || {}, f2 = d2 && d2.color, h2 = b2 && b2.color, g3 = b2 && b2.zone && b2.zone.color, k2 = this.color;
            b2 = v(e2.lineWidth, c2.lineWidth);
            d2 = 1;
            k2 = f2 || g3 || h2 || k2;
            f2 = e2.fillColor || c2.fillColor || k2;
            h2 = e2.lineColor || c2.lineColor || k2;
            a3 = a3 || "normal";
            c2 = c2.states[a3] || {};
            a3 = e2.states && e2.states[a3] || {};
            b2 = v(a3.lineWidth, c2.lineWidth, b2 + v(a3.lineWidthPlus, c2.lineWidthPlus, 0));
            f2 = a3.fillColor || c2.fillColor || f2;
            h2 = a3.lineColor || c2.lineColor || h2;
            d2 = v(a3.opacity, c2.opacity, d2);
            return { stroke: h2, "stroke-width": b2, fill: f2, opacity: d2 };
          };
          a2.prototype.destroy = function(b2) {
            var a3 = this, c2 = a3.chart, d2 = /AppleWebKit\/533/.test(D.navigator.userAgent), e2 = a3.data || [], f2, h2, g3, k2;
            q(a3, "destroy", { keepEventsForUpdate: b2 });
            this.removeEvents(b2);
            (a3.axisTypes || []).forEach(function(b3) {
              (k2 = a3[b3]) && k2.series && (n(k2.series, a3), k2.isDirty = k2.forceRedraw = true);
            });
            a3.legendItem && a3.chart.legend.destroyItem(a3);
            for (h2 = e2.length; h2--; )
              (g3 = e2[h2]) && g3.destroy && g3.destroy();
            a3.clips && a3.clips.forEach(function(b3) {
              return b3.destroy();
            });
            l.clearTimeout(a3.animationTimeout);
            Y(a3, function(b3, a4) {
              b3 instanceof r && !b3.survive && (f2 = d2 && "group" === a4 ? "hide" : "destroy", b3[f2]());
            });
            c2.hoverSeries === a3 && (c2.hoverSeries = void 0);
            n(c2.series, a3);
            c2.orderSeries();
            Y(a3, function(c3, d3) {
              b2 && "hcEvents" === d3 || delete a3[d3];
            });
          };
          a2.prototype.applyZones = function() {
            var b2 = this, a3 = this.chart, c2 = a3.renderer, d2 = this.zones, e2 = this.clips || [], f2 = this.graph, h2 = this.area, g3 = Math.max(a3.plotWidth, a3.plotHeight), k2 = this[(this.zoneAxis || "y") + "Axis"], n2 = a3.inverted, m2, l2, q2, p2, u2, r2, z2, w2, t2 = false;
            if (d2.length && (f2 || h2) && k2 && "undefined" !== typeof k2.min) {
              var D2 = k2.reversed;
              var E2 = k2.horiz;
              f2 && !this.showLine && f2.hide();
              h2 && h2.hide();
              var A2 = k2.getExtremes();
              d2.forEach(function(d3, G) {
                m2 = D2 ? E2 ? a3.plotWidth : 0 : E2 ? 0 : k2.toPixels(A2.min) || 0;
                m2 = y(v(l2, m2), 0, g3);
                l2 = y(Math.round(k2.toPixels(v(d3.value, A2.max), true) || 0), 0, g3);
                t2 && (m2 = l2 = k2.toPixels(A2.max));
                p2 = Math.abs(m2 - l2);
                u2 = Math.min(m2, l2);
                r2 = Math.max(m2, l2);
                k2.isXAxis ? (q2 = { x: n2 ? r2 : u2, y: 0, width: p2, height: g3 }, E2 || (q2.x = a3.plotHeight - q2.x)) : (q2 = { x: 0, y: n2 ? r2 : u2, width: g3, height: p2 }, E2 && (q2.y = a3.plotWidth - q2.y));
                n2 && c2.isVML && (q2 = k2.isXAxis ? { x: 0, y: D2 ? u2 : r2, height: q2.width, width: a3.chartWidth } : {
                  x: q2.y - a3.plotLeft - a3.spacingBox.x,
                  y: 0,
                  width: q2.height,
                  height: a3.chartHeight
                });
                e2[G] ? e2[G].animate(q2) : e2[G] = c2.clipRect(q2);
                z2 = b2["zone-area-" + G];
                w2 = b2["zone-graph-" + G];
                f2 && w2 && w2.clip(e2[G]);
                h2 && z2 && z2.clip(e2[G]);
                t2 = d3.value > A2.max;
                b2.resetZones && 0 === l2 && (l2 = void 0);
              });
              this.clips = e2;
            } else
              b2.visible && (f2 && f2.show(), h2 && h2.show());
          };
          a2.prototype.plotGroup = function(b2, a3, c2, d2, e2) {
            var h2 = this[b2], g3 = !h2;
            c2 = { visibility: c2, zIndex: d2 || 0.1 };
            "undefined" === typeof this.opacity || this.chart.styledMode || "inactive" === this.state || (c2.opacity = this.opacity);
            g3 && (this[b2] = h2 = this.chart.renderer.g().add(e2));
            h2.addClass("highcharts-" + a3 + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (f(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (h2.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), true);
            h2.attr(c2)[g3 ? "attr" : "animate"](this.getPlotBox(a3));
            return h2;
          };
          a2.prototype.getPlotBox = function(b2) {
            var a3 = this.xAxis, c2 = this.yAxis, d2 = this.chart;
            b2 = d2.inverted && !d2.polar && a3 && false !== this.invertible && "series" === b2;
            d2.inverted && (a3 = c2, c2 = this.xAxis);
            return { translateX: a3 ? a3.left : d2.plotLeft, translateY: c2 ? c2.top : d2.plotTop, rotation: b2 ? 90 : 0, rotationOriginX: b2 ? (a3.len - c2.len) / 2 : 0, rotationOriginY: b2 ? (a3.len + c2.len) / 2 : 0, scaleX: b2 ? -1 : 1, scaleY: 1 };
          };
          a2.prototype.removeEvents = function(b2) {
            b2 || U(this);
            this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function(b3) {
              b3();
            }), this.eventsToUnbind.length = 0);
          };
          a2.prototype.render = function() {
            var b2 = this, a3 = b2.chart, c2 = b2.options, d2 = e(c2.animation), f2 = b2.visible ? "inherit" : "hidden", h2 = c2.zIndex, g3 = b2.hasRendered, k2 = a3.seriesGroup;
            a3 = !b2.finishedAnimating && a3.renderer.isSVG ? d2.duration : 0;
            q(this, "render");
            b2.plotGroup("group", "series", f2, h2, k2);
            b2.markerGroup = b2.plotGroup("markerGroup", "markers", f2, h2, k2);
            false !== c2.clip && b2.setClip();
            b2.animate && a3 && b2.animate(true);
            b2.drawGraph && (b2.drawGraph(), b2.applyZones());
            b2.visible && b2.drawPoints();
            b2.drawDataLabels && b2.drawDataLabels();
            b2.redrawPoints && b2.redrawPoints();
            b2.drawTracker && false !== b2.options.enableMouseTracking && b2.drawTracker();
            b2.animate && a3 && b2.animate();
            g3 || (a3 && d2.defer && (a3 += d2.defer), b2.animationTimeout = ca(function() {
              b2.afterAnimate();
            }, a3 || 0));
            b2.isDirty = false;
            b2.hasRendered = true;
            q(b2, "afterRender");
          };
          a2.prototype.redraw = function() {
            var b2 = this.isDirty || this.isDirtyData;
            this.translate();
            this.render();
            b2 && delete this.kdTree;
          };
          a2.prototype.searchPoint = function(b2, a3) {
            var c2 = this.xAxis, d2 = this.yAxis, e2 = this.chart.inverted;
            return this.searchKDTree({ clientX: e2 ? c2.len - b2.chartY + c2.pos : b2.chartX - c2.pos, plotY: e2 ? d2.len - b2.chartX + d2.pos : b2.chartY - d2.pos }, a3, b2);
          };
          a2.prototype.buildKDTree = function(b2) {
            function a3(b3, d3, e2) {
              var f2 = b3 && b3.length;
              if (f2) {
                var h2 = c2.kdAxisArray[d3 % e2];
                b3.sort(function(b4, a4) {
                  return b4[h2] - a4[h2];
                });
                f2 = Math.floor(f2 / 2);
                return {
                  point: b3[f2],
                  left: a3(b3.slice(0, f2), d3 + 1, e2),
                  right: a3(b3.slice(f2 + 1), d3 + 1, e2)
                };
              }
            }
            this.buildingKdTree = true;
            var c2 = this, d2 = -1 < c2.options.findNearestPointBy.indexOf("y") ? 2 : 1;
            delete c2.kdTree;
            ca(function() {
              c2.kdTree = a3(c2.getValidPoints(null, !c2.directTouch), d2, d2);
              c2.buildingKdTree = false;
            }, c2.options.kdNow || b2 && "touchstart" === b2.type ? 0 : 1);
          };
          a2.prototype.searchKDTree = function(b2, a3, c2) {
            function d2(b3, a4, c3, n2) {
              var m2 = a4.point, l2 = e2.kdAxisArray[c3 % n2], q2 = m2, p2 = f(b3[h2]) && f(m2[h2]) ? Math.pow(b3[h2] - m2[h2], 2) : null;
              var u2 = f(b3[g3]) && f(m2[g3]) ? Math.pow(b3[g3] - m2[g3], 2) : null;
              u2 = (p2 || 0) + (u2 || 0);
              m2.dist = f(u2) ? Math.sqrt(u2) : Number.MAX_VALUE;
              m2.distX = f(p2) ? Math.sqrt(p2) : Number.MAX_VALUE;
              l2 = b3[l2] - m2[l2];
              u2 = 0 > l2 ? "left" : "right";
              p2 = 0 > l2 ? "right" : "left";
              a4[u2] && (u2 = d2(b3, a4[u2], c3 + 1, n2), q2 = u2[k2] < q2[k2] ? u2 : m2);
              a4[p2] && Math.sqrt(l2 * l2) < q2[k2] && (b3 = d2(b3, a4[p2], c3 + 1, n2), q2 = b3[k2] < q2[k2] ? b3 : q2);
              return q2;
            }
            var e2 = this, h2 = this.kdAxisArray[0], g3 = this.kdAxisArray[1], k2 = a3 ? "distX" : "dist";
            a3 = -1 < e2.options.findNearestPointBy.indexOf("y") ? 2 : 1;
            this.kdTree || this.buildingKdTree || this.buildKDTree(c2);
            if (this.kdTree)
              return d2(b2, this.kdTree, a3, a3);
          };
          a2.prototype.pointPlacementToXValue = function() {
            var b2 = this.options, a3 = b2.pointRange, c2 = this.xAxis;
            b2 = b2.pointPlacement;
            "between" === b2 && (b2 = c2.reversed ? -0.5 : 0.5);
            return O(b2) ? b2 * (a3 || c2.pointRange) : 0;
          };
          a2.prototype.isPointInside = function(b2) {
            var a3 = this.chart, c2 = this.xAxis, d2 = this.yAxis;
            return "undefined" !== typeof b2.plotY && "undefined" !== typeof b2.plotX && 0 <= b2.plotY && b2.plotY <= (d2 ? d2.len : a3.plotHeight) && 0 <= b2.plotX && b2.plotX <= (c2 ? c2.len : a3.plotWidth);
          };
          a2.prototype.drawTracker = function() {
            var b2 = this, a3 = b2.options, c2 = a3.trackByArea, d2 = [].concat(c2 ? b2.areaPath : b2.graphPath), e2 = b2.chart, f2 = e2.pointer, h2 = e2.renderer, g3 = e2.options.tooltip.snap, n2 = b2.tracker, m2 = function(a4) {
              if (e2.hoverSeries !== b2)
                b2.onMouseOver();
            }, l2 = "rgba(192,192,192," + (p ? 1e-4 : 2e-3) + ")";
            n2 ? n2.attr({ d: d2 }) : b2.graph && (b2.tracker = h2.path(d2).attr({ visibility: b2.visible ? "inherit" : "hidden", zIndex: 2 }).addClass(c2 ? "highcharts-tracker-area" : "highcharts-tracker-line").add(b2.group), e2.styledMode || b2.tracker.attr({ "stroke-linecap": "round", "stroke-linejoin": "round", stroke: l2, fill: c2 ? l2 : "none", "stroke-width": b2.graph.strokeWidth() + (c2 ? 0 : 2 * g3) }), [
              b2.tracker,
              b2.markerGroup,
              b2.dataLabelsGroup
            ].forEach(function(b3) {
              if (b3 && (b3.addClass("highcharts-tracker").on("mouseover", m2).on("mouseout", function(b4) {
                f2.onTrackerMouseOut(b4);
              }), a3.cursor && !e2.styledMode && b3.css({ cursor: a3.cursor }), k))
                b3.on("touchstart", m2);
            }));
            q(this, "afterDrawTracker");
          };
          a2.prototype.addPoint = function(b2, a3, c2, d2, e2) {
            var f2 = this.options, h2 = this.data, g3 = this.chart, k2 = this.xAxis;
            k2 = k2 && k2.hasNames && k2.names;
            var n2 = f2.data, m2 = this.xData, l2;
            a3 = v(a3, true);
            var p2 = { series: this };
            this.pointClass.prototype.applyOptions.apply(p2, [b2]);
            var u2 = p2.x;
            var r2 = m2.length;
            if (this.requireSorting && u2 < m2[r2 - 1])
              for (l2 = true; r2 && m2[r2 - 1] > u2; )
                r2--;
            this.updateParallelArrays(p2, "splice", r2, 0, 0);
            this.updateParallelArrays(p2, r2);
            k2 && p2.name && (k2[u2] = p2.name);
            n2.splice(r2, 0, b2);
            if (l2 || this.processedData)
              this.data.splice(r2, 0, null), this.processData();
            "point" === f2.legendType && this.generatePoints();
            c2 && (h2[0] && h2[0].remove ? h2[0].remove(false) : (h2.shift(), this.updateParallelArrays(p2, "shift"), n2.shift()));
            false !== e2 && q(this, "addPoint", { point: p2 });
            this.isDirtyData = this.isDirty = true;
            a3 && g3.redraw(d2);
          };
          a2.prototype.removePoint = function(b2, a3, c2) {
            var e2 = this, f2 = e2.data, h2 = f2[b2], g3 = e2.points, k2 = e2.chart, n2 = function() {
              g3 && g3.length === f2.length && g3.splice(b2, 1);
              f2.splice(b2, 1);
              e2.options.data.splice(b2, 1);
              e2.updateParallelArrays(h2 || { series: e2 }, "splice", b2, 1);
              h2 && h2.destroy();
              e2.isDirty = true;
              e2.isDirtyData = true;
              a3 && k2.redraw();
            };
            d(c2, k2);
            a3 = v(a3, true);
            h2 ? h2.firePointEvent("remove", null, n2) : n2();
          };
          a2.prototype.remove = function(b2, a3, c2, d2) {
            function e2() {
              f2.destroy(d2);
              h2.isDirtyLegend = h2.isDirtyBox = true;
              h2.linkSeries();
              v(b2, true) && h2.redraw(a3);
            }
            var f2 = this, h2 = f2.chart;
            false !== c2 ? q(
              f2,
              "remove",
              null,
              e2
            ) : e2();
          };
          a2.prototype.update = function(a3, d2) {
            a3 = c(a3, this.userOptions);
            q(this, "update", { options: a3 });
            var e2 = this, f2 = e2.chart, h2 = e2.userOptions, g3 = e2.initialType || e2.type, k2 = f2.options.plotOptions, n2 = A[g3].prototype, m2 = e2.finishedAnimating && { animation: false }, l2 = {}, p2 = ["eventOptions", "navigatorSeries", "baseSeries"], r2 = a3.type || h2.type || f2.options.chart.type, z2 = !(this.hasDerivedData || r2 && r2 !== this.type || "undefined" !== typeof a3.pointStart || "undefined" !== typeof a3.pointInterval || "undefined" !== typeof a3.relativeXValue || a3.joinBy || a3.mapData || e2.hasOptionChanged("dataGrouping") || e2.hasOptionChanged("pointStart") || e2.hasOptionChanged("pointInterval") || e2.hasOptionChanged("pointIntervalUnit") || e2.hasOptionChanged("keys"));
            r2 = r2 || g3;
            z2 && (p2.push("data", "isDirtyData", "points", "processedData", "processedXData", "processedYData", "xIncrement", "cropped", "_hasPointMarkers", "_hasPointLabels", "clips", "nodes", "layout", "level", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), false !== a3.visible && p2.push("area", "graph"), e2.parallelArrays.forEach(function(b2) {
              p2.push(b2 + "Data");
            }), a3.data && (a3.dataSorting && u(e2.options.dataSorting, a3.dataSorting), this.setData(a3.data, false)));
            a3 = T(h2, m2, { index: "undefined" === typeof h2.index ? e2.index : h2.index, pointStart: v(k2 && k2.series && k2.series.pointStart, h2.pointStart, e2.xData[0]) }, !z2 && { data: e2.options.data }, a3);
            z2 && a3.data && (a3.data = e2.options.data);
            p2 = ["group", "markerGroup", "dataLabelsGroup", "transformGroup", "shadowGroup"].concat(p2);
            p2.forEach(function(b2) {
              p2[b2] = e2[b2];
              delete e2[b2];
            });
            k2 = false;
            if (A[r2]) {
              if (k2 = r2 !== e2.type, e2.remove(false, false, false, true), k2)
                if (Object.setPrototypeOf)
                  Object.setPrototypeOf(
                    e2,
                    A[r2].prototype
                  );
                else {
                  m2 = Object.hasOwnProperty.call(e2, "hcEvents") && e2.hcEvents;
                  for (w2 in n2)
                    e2[w2] = void 0;
                  u(e2, A[r2].prototype);
                  m2 ? e2.hcEvents = m2 : delete e2.hcEvents;
                }
            } else
              b(17, true, f2, { missingModuleFor: r2 });
            p2.forEach(function(b2) {
              e2[b2] = p2[b2];
            });
            e2.init(f2, a3);
            if (z2 && this.points) {
              a3 = e2.options;
              if (false === a3.visible)
                l2.graphic = 1, l2.dataLabel = 1;
              else if (!e2._hasPointLabels) {
                n2 = a3.marker;
                var w2 = a3.dataLabels;
                h2 = h2.marker || {};
                !n2 || false !== n2.enabled && h2.symbol === n2.symbol && h2.height === n2.height && h2.width === n2.width || (l2.graphic = 1);
                w2 && false === w2.enabled && (l2.dataLabel = 1);
              }
              h2 = 0;
              for (n2 = this.points; h2 < n2.length; h2++)
                (w2 = n2[h2]) && w2.series && (w2.resolveColor(), Object.keys(l2).length && w2.destroyElements(l2), false === a3.showInLegend && w2.legendItem && f2.legend.destroyItem(w2));
            }
            e2.initialType = g3;
            f2.linkSeries();
            k2 && e2.linkedSeries.length && (e2.isDirtyData = true);
            q(this, "afterUpdate");
            v(d2, true) && f2.redraw(z2 ? void 0 : false);
          };
          a2.prototype.setName = function(b2) {
            this.name = this.options.name = this.userOptions.name = b2;
            this.chart.isDirtyLegend = true;
          };
          a2.prototype.hasOptionChanged = function(b2) {
            var a3 = this.options[b2], c2 = this.chart.options.plotOptions, d2 = this.userOptions[b2];
            return d2 ? a3 !== d2 : a3 !== v(c2 && c2[this.type] && c2[this.type][b2], c2 && c2.series && c2.series[b2], a3);
          };
          a2.prototype.onMouseOver = function() {
            var b2 = this.chart, a3 = b2.hoverSeries;
            b2.pointer.setHoverChartIndex();
            if (a3 && a3 !== this)
              a3.onMouseOut();
            this.options.events.mouseOver && q(this, "mouseOver");
            this.setState("hover");
            b2.hoverSeries = this;
          };
          a2.prototype.onMouseOut = function() {
            var b2 = this.options, a3 = this.chart, c2 = a3.tooltip, d2 = a3.hoverPoint;
            a3.hoverSeries = null;
            if (d2)
              d2.onMouseOut();
            this && b2.events.mouseOut && q(this, "mouseOut");
            !c2 || this.stickyTracking || c2.shared && !this.noSharedTooltip || c2.hide();
            a3.series.forEach(function(b3) {
              b3.setState("", true);
            });
          };
          a2.prototype.setState = function(b2, a3) {
            var c2 = this, d2 = c2.options, e2 = c2.graph, f2 = d2.inactiveOtherPoints, h2 = d2.states, g3 = v(h2[b2 || "normal"] && h2[b2 || "normal"].animation, c2.chart.options.chart.animation), k2 = d2.lineWidth, n2 = 0, m2 = d2.opacity;
            b2 = b2 || "";
            if (c2.state !== b2 && ([c2.group, c2.markerGroup, c2.dataLabelsGroup].forEach(function(a4) {
              a4 && (c2.state && a4.removeClass("highcharts-series-" + c2.state), b2 && a4.addClass("highcharts-series-" + b2));
            }), c2.state = b2, !c2.chart.styledMode)) {
              if (h2[b2] && false === h2[b2].enabled)
                return;
              b2 && (k2 = h2[b2].lineWidth || k2 + (h2[b2].lineWidthPlus || 0), m2 = v(h2[b2].opacity, m2));
              if (e2 && !e2.dashstyle && O(k2))
                for (d2 = { "stroke-width": k2 }, e2.animate(d2, g3); c2["zone-graph-" + n2]; )
                  c2["zone-graph-" + n2].animate(d2, g3), n2 += 1;
              f2 || [c2.group, c2.markerGroup, c2.dataLabelsGroup, c2.labelBySeries].forEach(function(b3) {
                b3 && b3.animate({ opacity: m2 }, g3);
              });
            }
            a3 && f2 && c2.points && c2.setAllPointsToState(b2 || void 0);
          };
          a2.prototype.setAllPointsToState = function(b2) {
            this.points.forEach(function(a3) {
              a3.setState && a3.setState(b2);
            });
          };
          a2.prototype.setVisible = function(b2, a3) {
            var c2 = this, d2 = c2.chart, e2 = d2.options.chart.ignoreHiddenSeries, f2 = c2.visible, h2 = (c2.visible = b2 = c2.options.visible = c2.userOptions.visible = "undefined" === typeof b2 ? !f2 : b2) ? "show" : "hide";
            ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(b3) {
              if (c2[b3])
                c2[b3][h2]();
            });
            if (d2.hoverSeries === c2 || (d2.hoverPoint && d2.hoverPoint.series) === c2)
              c2.onMouseOut();
            c2.legendItem && d2.legend.colorizeItem(c2, b2);
            c2.isDirty = true;
            c2.options.stacking && d2.series.forEach(function(b3) {
              b3.options.stacking && b3.visible && (b3.isDirty = true);
            });
            c2.linkedSeries.forEach(function(a4) {
              a4.setVisible(b2, false);
            });
            e2 && (d2.isDirtyBox = true);
            q(c2, h2);
            false !== a3 && d2.redraw();
          };
          a2.prototype.show = function() {
            this.setVisible(true);
          };
          a2.prototype.hide = function() {
            this.setVisible(false);
          };
          a2.prototype.select = function(b2) {
            this.selected = b2 = this.options.selected = "undefined" === typeof b2 ? !this.selected : b2;
            this.checkbox && (this.checkbox.checked = b2);
            q(this, b2 ? "select" : "unselect");
          };
          a2.prototype.shouldShowTooltip = function(b2, a3, c2) {
            void 0 === c2 && (c2 = {});
            c2.series = this;
            c2.visiblePlotOnly = true;
            return this.chart.isInsidePlot(b2, a3, c2);
          };
          a2.defaultOptions = H;
          a2.types = t.seriesTypes;
          a2.registerType = t.registerSeriesType;
          return a2;
        }();
        u(a.prototype, { axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0, cropShoulder: 1, directTouch: false, drawLegendSymbol: C.drawLineMarker, isCartesian: true, kdAxisArray: ["clientX", "plotY"], parallelArrays: ["x", "y"], pointClass: B, requireSorting: true, sorted: true });
        t.series = a;
        "";
        "";
        return a;
      });
      K(g, "Extensions/ScrollablePlotArea.js", [
        g["Core/Animation/AnimationUtilities.js"],
        g["Core/Axis/Axis.js"],
        g["Core/Chart/Chart.js"],
        g["Core/Series/Series.js"],
        g["Core/Renderer/RendererRegistry.js"],
        g["Core/Utilities.js"]
      ], function(a, g2, x, F, C, B) {
        var A = a.stop, t = B.addEvent, r = B.createElement, l = B.defined, e = B.merge, d = B.pick;
        t(x, "afterSetChartSize", function(a2) {
          var d2 = this.options.chart.scrollablePlotArea, h = d2 && d2.minWidth;
          d2 = d2 && d2.minHeight;
          if (!this.renderer.forExport) {
            if (h) {
              if (this.scrollablePixelsX = h = Math.max(0, h - this.chartWidth)) {
                this.scrollablePlotBox = this.renderer.scrollablePlotBox = e(this.plotBox);
                this.plotBox.width = this.plotWidth += h;
                this.inverted ? this.clipBox.height += h : this.clipBox.width += h;
                var p = { 1: { name: "right", value: h } };
              }
            } else
              d2 && (this.scrollablePixelsY = h = Math.max(0, d2 - this.chartHeight), l(h) && (this.scrollablePlotBox = this.renderer.scrollablePlotBox = e(this.plotBox), this.plotBox.height = this.plotHeight += h, this.inverted ? this.clipBox.width += h : this.clipBox.height += h, p = { 2: { name: "bottom", value: h } }));
            p && !a2.skipAxes && this.axes.forEach(function(a3) {
              p[a3.side] ? a3.getPlotLinePath = function() {
                var d3 = p[a3.side].name, e2 = this[d3];
                this[d3] = e2 - p[a3.side].value;
                var h2 = g2.prototype.getPlotLinePath.apply(this, arguments);
                this[d3] = e2;
                return h2;
              } : (a3.setAxisSize(), a3.setAxisTranslation());
            });
          }
        });
        t(x, "render", function() {
          this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed();
        });
        x.prototype.setUpScrolling = function() {
          var a2 = this, d2 = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" };
          this.scrollablePixelsX && (d2.overflowX = "auto");
          this.scrollablePixelsY && (d2.overflowY = "auto");
          this.scrollingParent = r("div", { className: "highcharts-scrolling-parent" }, { position: "relative" }, this.renderTo);
          this.scrollingContainer = r("div", { className: "highcharts-scrolling" }, d2, this.scrollingParent);
          var e2;
          t(this.scrollingContainer, "scroll", function() {
            a2.pointer && (delete a2.pointer.chartPosition, a2.hoverPoint && (e2 = a2.hoverPoint), a2.pointer.runPointActions(void 0, e2, true));
          });
          this.innerContainer = r("div", { className: "highcharts-inner-container" }, null, this.scrollingContainer);
          this.innerContainer.appendChild(this.container);
          this.setUpScrolling = null;
        };
        x.prototype.moveFixedElements = function() {
          var a2 = this.container, d2 = this.fixedRenderer, e2 = ".highcharts-breadcrumbs-group .highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "), g3;
          this.scrollablePixelsX && !this.inverted ? g3 = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? g3 = ".highcharts-xaxis" : this.scrollablePixelsY && !this.inverted ? g3 = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (g3 = ".highcharts-yaxis");
          g3 && e2.push("" + g3 + ":not(.highcharts-radial-axis)", "" + g3 + "-labels:not(.highcharts-radial-axis-labels)");
          e2.forEach(function(e3) {
            [].forEach.call(a2.querySelectorAll(e3), function(a3) {
              (a3.namespaceURI === d2.SVG_NS ? d2.box : d2.box.parentNode).appendChild(a3);
              a3.style.pointerEvents = "auto";
            });
          });
        };
        x.prototype.applyFixed = function() {
          var a2 = !this.fixedDiv, e2 = this.options.chart, g3 = e2.scrollablePlotArea, l2 = C.getRendererType();
          a2 ? (this.fixedDiv = r("div", { className: "highcharts-fixed" }, { position: "absolute", overflow: "hidden", pointerEvents: "none", zIndex: (e2.style && e2.style.zIndex || 0) + 2, top: 0 }, null, true), this.scrollingContainer && this.scrollingContainer.parentNode.insertBefore(this.fixedDiv, this.scrollingContainer), this.renderTo.style.overflow = "visible", this.fixedRenderer = e2 = new l2(this.fixedDiv, this.chartWidth, this.chartHeight, this.options.chart.style), this.scrollableMask = e2.path().attr({ fill: this.options.chart.backgroundColor || "#fff", "fill-opacity": d(g3.opacity, 0.85), zIndex: -1 }).addClass("highcharts-scrollable-mask").add(), t(this, "afterShowResetZoom", this.moveFixedElements), t(this, "afterApplyDrilldown", this.moveFixedElements), t(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
          if (this.scrollableDirty || a2)
            this.scrollableDirty = false, this.moveFixedElements();
          e2 = this.chartWidth + (this.scrollablePixelsX || 0);
          l2 = this.chartHeight + (this.scrollablePixelsY || 0);
          A(this.container);
          this.container.style.width = e2 + "px";
          this.container.style.height = l2 + "px";
          this.renderer.boxWrapper.attr({ width: e2, height: l2, viewBox: [0, 0, e2, l2].join(" ") });
          this.chartBackground.attr({ width: e2, height: l2 });
          this.scrollingContainer.style.height = this.chartHeight + "px";
          a2 && (g3.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * g3.scrollPositionX), g3.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * g3.scrollPositionY));
          l2 = this.axisOffset;
          a2 = this.plotTop - l2[0] - 1;
          g3 = this.plotLeft - l2[3] - 1;
          e2 = this.plotTop + this.plotHeight + l2[2] + 1;
          l2 = this.plotLeft + this.plotWidth + l2[1] + 1;
          var D = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0), x2 = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
          a2 = this.scrollablePixelsX ? [["M", 0, a2], ["L", this.plotLeft - 1, a2], ["L", this.plotLeft - 1, e2], ["L", 0, e2], ["Z"], ["M", D, a2], ["L", this.chartWidth, a2], ["L", this.chartWidth, e2], ["L", D, e2], ["Z"]] : this.scrollablePixelsY ? [["M", g3, 0], ["L", g3, this.plotTop - 1], ["L", l2, this.plotTop - 1], ["L", l2, 0], ["Z"], ["M", g3, x2], ["L", g3, this.chartHeight], ["L", l2, this.chartHeight], ["L", l2, x2], ["Z"]] : [["M", 0, 0]];
          "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({ d: a2 });
        };
        t(g2, "afterInit", function() {
          this.chart.scrollableDirty = true;
        });
        t(F, "show", function() {
          this.chart.scrollableDirty = true;
        });
        "";
      });
      K(g, "Core/Axis/Stacking/StackItem.js", [g["Core/FormatUtilities.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(a, g2, x) {
        var A = a.format, C = g2.series, B = x.destroyObjectProperties, H = x.pick, t = x.isNumber;
        a = function() {
          function a2(a3, e, d, h, g3) {
            var k = a3.chart.inverted, m = a3.reversed;
            this.axis = a3;
            a3 = this.isNegative = !!d !== !!m;
            this.options = e = e || {};
            this.x = h;
            this.cumulative = this.total = null;
            this.points = {};
            this.hasValidPoints = false;
            this.stack = g3;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = { align: e.align || (k ? a3 ? "left" : "right" : "center"), verticalAlign: e.verticalAlign || (k ? "middle" : a3 ? "bottom" : "top"), y: e.y, x: e.x };
            this.textAlign = e.textAlign || (k ? a3 ? "right" : "left" : "center");
          }
          a2.prototype.destroy = function() {
            B(
              this,
              this.axis
            );
          };
          a2.prototype.render = function(a3) {
            var e = this.axis.chart, d = this.options, h = d.format;
            h = h ? A(h, this, e) : d.formatter.call(this);
            this.label ? this.label.attr({ text: h, visibility: "hidden" }) : (this.label = e.renderer.label(h, null, void 0, d.shape, void 0, void 0, d.useHTML, false, "stack-labels"), h = { r: d.borderRadius || 0, text: h, padding: H(d.padding, 5), visibility: "hidden" }, e.styledMode || (h.fill = d.backgroundColor, h.stroke = d.borderColor, h["stroke-width"] = d.borderWidth, this.label.css(d.style || {})), this.label.attr(h), this.label.added || this.label.add(a3));
            this.label.labelrank = e.plotSizeY;
          };
          a2.prototype.setOffset = function(a3, e, d, h, g3, k) {
            var m = this.alignOptions, l = this.axis, r = this.label, E = this.options, A2 = this.textAlign, y = l.chart;
            a3 = this.getStackBox({ xOffset: a3, width: e, boxBottom: d, boxTop: h, defaultX: g3, xAxis: k });
            g3 = m.verticalAlign;
            r && a3 && (e = r.getBBox(), d = r.padding, h = "justify" === H(E.overflow, "justify"), m.x = E.x || 0, m.y = E.y || 0, g3 = this.adjustStackPosition({ labelBox: e, verticalAlign: g3, textAlign: A2 }), A2 = g3.x, g3 = g3.y, a3.x -= A2, a3.y -= g3, r.align(m, false, a3), (A2 = y.isInsidePlot(r.alignAttr.x + m.x + A2, r.alignAttr.y + m.y + g3)) || (h = false), h && C.prototype.justifyDataLabel.call(l, r, m, r.alignAttr, e, a3), r.attr({ x: r.alignAttr.x, y: r.alignAttr.y, rotation: E.rotation, rotationOriginX: e.width / 2, rotationOriginY: e.height / 2 }), H(!h && E.crop, true) && (A2 = t(r.x) && t(r.y) && y.isInsidePlot(r.x - d + r.width, r.y) && y.isInsidePlot(r.x + d, r.y)), r[A2 ? "show" : "hide"]());
          };
          a2.prototype.adjustStackPosition = function(a3) {
            var e = a3.labelBox, d = { bottom: 0, middle: 1, top: 2, right: 1, center: 0, left: -1 };
            return { x: e.width / 2 + e.width / 2 * d[a3.textAlign], y: e.height / 2 * d[a3.verticalAlign] };
          };
          a2.prototype.getStackBox = function(a3) {
            var e = this.axis, d = e.chart, h = a3.boxTop, g3 = a3.defaultX, k = a3.xOffset, l = a3.width, r = a3.boxBottom;
            h = e.stacking.usePercentage ? 100 : H(h, this.total, 0);
            h = e.toPixels(h);
            a3 = H(g3, (a3.xAxis || d.xAxis[0]).toPixels(this.x)) + k;
            e = e.toPixels(r ? r : 0);
            e = Math.abs(h - e);
            r = this.isNegative;
            return d.inverted ? { x: (r ? h : h - e) - d.plotLeft, y: a3 - d.plotTop, width: e, height: l } : { x: a3 - d.plotLeft, y: (r ? h - e : h) - d.plotTop, width: l, height: e };
          };
          return a2;
        }();
        "";
        return a;
      });
      K(
        g,
        "Core/Axis/Stacking/StackingAxis.js",
        [g["Core/Animation/AnimationUtilities.js"], g["Core/Axis/Axis.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Axis/Stacking/StackItem.js"], g["Core/Utilities.js"]],
        function(a, g2, x, F, C) {
          function A() {
            var b2 = this, a2 = b2.inverted;
            b2.yAxis.forEach(function(b3) {
              b3.stacking && b3.stacking.stacks && b3.hasVisibleSeries && (b3.stacking.oldStacks = b3.stacking.stacks);
            });
            b2.series.forEach(function(c2) {
              var d2 = c2.xAxis && c2.xAxis.options || {};
              !c2.options.stacking || true !== c2.visible && false !== b2.options.chart.ignoreHiddenSeries || (c2.stackKey = [
                c2.type,
                f(c2.options.stack, ""),
                a2 ? d2.top : d2.left,
                a2 ? d2.height : d2.width
              ].join());
            });
          }
          function H() {
            var b2 = this.stacking;
            if (b2) {
              var a2 = b2.stacks;
              w(a2, function(b3, c2) {
                E(b3);
                a2[c2] = null;
              });
              b2 && b2.stackTotalGroup && b2.stackTotalGroup.destroy();
            }
          }
          function t() {
            "yAxis" !== this.coll || this.stacking || (this.stacking = new n(this));
          }
          function r(b2, a2, c2, d2) {
            !I(b2) || b2.x !== a2 || d2 && b2.stackKey !== d2 ? b2 = { x: a2, index: 0, key: d2, stackKey: d2 } : b2.index++;
            b2.key = [c2, a2, b2.index].join();
            return b2;
          }
          function l() {
            var b2 = this, a2 = b2.stackKey, c2 = b2.yAxis.stacking.stacks, d2 = b2.processedXData, e2 = b2[b2.options.stacking + "Stacker"], f2;
            e2 && [a2, "-" + a2].forEach(function(a3) {
              for (var h2 = d2.length, g3, k2; h2--; )
                g3 = d2[h2], f2 = b2.getStackIndicator(f2, g3, b2.index, a3), (k2 = (g3 = c2[a3] && c2[a3][g3]) && g3.points[f2.key]) && e2.call(b2, k2, g3, h2);
            });
          }
          function e(b2, a2, c2) {
            a2 = a2.total ? 100 / a2.total : 0;
            b2[0] = D(b2[0] * a2);
            b2[1] = D(b2[1] * a2);
            this.stackedYData[c2] = b2[1];
          }
          function d() {
            var b2 = this.yAxis.stacking;
            this.options.centerInCategory && (this.is("column") || this.is("columnrange")) && !this.options.stacking && 1 < this.chart.series.length ? k.setStackedPoints.call(this, "group") : b2 && w(b2.stacks, function(a2, c2) {
              "group" === c2.slice(-5) && (w(a2, function(b3) {
                return b3.destroy();
              }), delete b2.stacks[c2]);
            });
          }
          function h(b2) {
            var a2 = this.chart, c2 = b2 || this.options.stacking;
            if (c2 && (true === this.visible || false === a2.options.chart.ignoreHiddenSeries)) {
              var d2 = this.processedXData, e2 = this.processedYData, h2 = [], g3 = e2.length, k2 = this.options, n2 = k2.threshold, m2 = f(k2.startFromThreshold && n2, 0);
              k2 = k2.stack;
              b2 = b2 ? "" + this.type + ",".concat(c2) : this.stackKey;
              var l2 = "-" + b2, p2 = this.negStacks;
              a2 = "group" === c2 ? a2.yAxis[0] : this.yAxis;
              var u = a2.stacking.stacks, r2 = a2.stacking.oldStacks, w2, t2;
              a2.stacking.stacksTouched += 1;
              for (t2 = 0; t2 < g3; t2++) {
                var E2 = d2[t2];
                var A2 = e2[t2];
                var x2 = this.getStackIndicator(x2, E2, this.index);
                var C2 = x2.key;
                var B = (w2 = p2 && A2 < (m2 ? 0 : n2)) ? l2 : b2;
                u[B] || (u[B] = {});
                u[B][E2] || (r2[B] && r2[B][E2] ? (u[B][E2] = r2[B][E2], u[B][E2].total = null) : u[B][E2] = new F(a2, a2.options.stackLabels, !!w2, E2, k2));
                B = u[B][E2];
                null !== A2 ? (B.points[C2] = B.points[this.index] = [f(B.cumulative, m2)], I(B.cumulative) || (B.base = C2), B.touched = a2.stacking.stacksTouched, 0 < x2.index && false === this.singleStacks && (B.points[C2][0] = B.points[this.index + "," + E2 + ",0"][0])) : B.points[C2] = B.points[this.index] = null;
                "percent" === c2 ? (w2 = w2 ? b2 : l2, p2 && u[w2] && u[w2][E2] ? (w2 = u[w2][E2], B.total = w2.total = Math.max(w2.total, B.total) + Math.abs(A2) || 0) : B.total = D(B.total + (Math.abs(A2) || 0))) : "group" === c2 ? (y(A2) && (A2 = A2[0]), null !== A2 && (B.total = (B.total || 0) + 1)) : B.total = D(B.total + (A2 || 0));
                B.cumulative = "group" === c2 ? (B.total || 1) - 1 : f(B.cumulative, m2) + (A2 || 0);
                null !== A2 && (B.points[C2].push(B.cumulative), h2[t2] = B.cumulative, B.hasValidPoints = true);
              }
              "percent" === c2 && (a2.stacking.usePercentage = true);
              "group" !== c2 && (this.stackedYData = h2);
              a2.stacking.oldStacks = {};
            }
          }
          var m = a.getDeferredAnimation, k = x.series.prototype, p = C.addEvent, D = C.correctFloat, I = C.defined, E = C.destroyObjectProperties, L = C.fireEvent, y = C.isArray, c = C.isNumber, w = C.objectEach, f = C.pick, n = function() {
            function b2(b3) {
              this.oldStacks = {};
              this.stacks = {};
              this.stacksTouched = 0;
              this.axis = b3;
            }
            b2.prototype.buildStacks = function() {
              var b3 = this.axis, a2 = b3.series, c2 = b3.options.reversedStacks, d2 = a2.length, e2;
              this.usePercentage = false;
              for (e2 = d2; e2--; ) {
                var f2 = a2[c2 ? e2 : d2 - e2 - 1];
                f2.setStackedPoints();
                f2.setGroupedPoints();
              }
              for (e2 = 0; e2 < d2; e2++)
                a2[e2].modifyStacks();
              L(b3, "afterBuildStacks");
            };
            b2.prototype.cleanStacks = function() {
              if (this.oldStacks)
                var b3 = this.stacks = this.oldStacks;
              w(b3, function(b4) {
                w(b4, function(b5) {
                  b5.cumulative = b5.total;
                });
              });
            };
            b2.prototype.resetStacks = function() {
              var b3 = this;
              w(this.stacks, function(a2) {
                w(a2, function(d2, e2) {
                  c(d2.touched) && d2.touched < b3.stacksTouched ? (d2.destroy(), delete a2[e2]) : (d2.total = null, d2.cumulative = null);
                });
              });
            };
            b2.prototype.renderStackTotals = function() {
              var b3 = this.axis, a2 = b3.chart, c2 = a2.renderer, d2 = this.stacks;
              b3 = m(a2, b3.options.stackLabels && b3.options.stackLabels.animation || false);
              var e2 = this.stackTotalGroup = this.stackTotalGroup || c2.g("stack-labels").attr({ zIndex: 6, opacity: 0 }).add();
              e2.translate(a2.plotLeft, a2.plotTop);
              w(d2, function(b4) {
                w(b4, function(b5) {
                  b5.render(e2);
                });
              });
              e2.animate({ opacity: 1 }, b3);
            };
            return b2;
          }(), b;
          (function(b2) {
            var a2 = [];
            b2.compose = function(b3, c2, f2) {
              -1 === a2.indexOf(b3) && (a2.push(b3), p(b3, "init", t), p(b3, "destroy", H));
              -1 === a2.indexOf(c2) && (a2.push(c2), c2.prototype.getStacks = A);
              -1 === a2.indexOf(f2) && (a2.push(f2), b3 = f2.prototype, b3.getStackIndicator = r, b3.modifyStacks = l, b3.percentStacker = e, b3.setGroupedPoints = d, b3.setStackedPoints = h);
            };
          })(b || (b = {}));
          return b;
        }
      );
      K(g, "Series/Line/LineSeries.js", [g["Core/Series/Series.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(a, g2, x) {
        var A = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(g3, r) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a3, e) {
              a3.__proto__ = e;
            } || function(a3, e) {
              for (var d in e)
                e.hasOwnProperty(d) && (a3[d] = e[d]);
            };
            return a2(g3, r);
          };
          return function(g3, r) {
            function l() {
              this.constructor = g3;
            }
            a2(g3, r);
            g3.prototype = null === r ? Object.create(r) : (l.prototype = r.prototype, new l());
          };
        }(), C = x.defined, B = x.merge;
        x = function(g3) {
          function t() {
            var a2 = null !== g3 && g3.apply(this, arguments) || this;
            a2.data = void 0;
            a2.options = void 0;
            a2.points = void 0;
            return a2;
          }
          A(t, g3);
          t.prototype.drawGraph = function() {
            var a2 = this, g4 = this.options, e = (this.gappedPath || this.getGraphPath).call(this), d = this.chart.styledMode, h = [["graph", "highcharts-graph"]];
            d || h[0].push(g4.lineColor || this.color || "#cccccc", g4.dashStyle);
            h = a2.getZonesGraphs(h);
            h.forEach(function(h2, k) {
              var m = h2[0], l = a2[m], r = l ? "animate" : "attr";
              l ? (l.endX = a2.preventGraphAnimation ? null : e.xMap, l.animate({ d: e })) : e.length && (a2[m] = l = a2.chart.renderer.path(e).addClass(h2[1]).attr({ zIndex: 1 }).add(a2.group));
              l && !d && (m = { stroke: h2[2], "stroke-width": g4.lineWidth || 0, fill: a2.fillGraph && a2.color || "none" }, h2[3] ? m.dashstyle = h2[3] : "square" !== g4.linecap && (m["stroke-linecap"] = m["stroke-linejoin"] = "round"), l[r](m).shadow(2 > k && g4.shadow));
              l && (l.startX = e.xMap, l.isArea = e.isArea);
            });
          };
          t.prototype.getGraphPath = function(a2, g4, e) {
            var d = this, h = d.options, m = [], k = [], l, r = h.step;
            a2 = a2 || d.points;
            var t2 = a2.reversed;
            t2 && a2.reverse();
            (r = { right: 1, center: 2 }[r] || r && 3) && t2 && (r = 4 - r);
            a2 = this.getValidPoints(a2, false, !(h.connectNulls && !g4 && !e));
            a2.forEach(function(p, t3) {
              var y = p.plotX, c = p.plotY, w = a2[t3 - 1];
              (p.leftCliff || w && w.rightCliff) && !e && (l = true);
              p.isNull && !C(g4) && 0 < t3 ? l = !h.connectNulls : p.isNull && !g4 ? l = true : (0 === t3 || l ? t3 = [["M", p.plotX, p.plotY]] : d.getPointSpline ? t3 = [d.getPointSpline(a2, p, t3)] : r ? (t3 = 1 === r ? [["L", w.plotX, c]] : 2 === r ? [["L", (w.plotX + y) / 2, w.plotY], ["L", (w.plotX + y) / 2, c]] : [["L", y, w.plotY]], t3.push(["L", y, c])) : t3 = [["L", y, c]], k.push(p.x), r && (k.push(p.x), 2 === r && k.push(p.x)), m.push.apply(m, t3), l = false);
            });
            m.xMap = k;
            return d.graphPath = m;
          };
          t.prototype.getZonesGraphs = function(a2) {
            this.zones.forEach(function(g4, e) {
              e = ["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (g4.className || "")];
              this.chart.styledMode || e.push(g4.color || this.color, g4.dashStyle || this.options.dashStyle);
              a2.push(e);
            }, this);
            return a2;
          };
          t.defaultOptions = B(a.defaultOptions, {});
          return t;
        }(a);
        g2.registerSeriesType(
          "line",
          x
        );
        "";
        return x;
      });
      K(g, "Series/Area/AreaSeries.js", [g["Core/Color/Color.js"], g["Core/Legend/LegendSymbol.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(a, g2, x, F) {
        var A = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(d, e) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a3, d2) {
              a3.__proto__ = d2;
            } || function(a3, d2) {
              for (var e2 in d2)
                d2.hasOwnProperty(e2) && (a3[e2] = d2[e2]);
            };
            return a2(d, e);
          };
          return function(d, e) {
            function h() {
              this.constructor = d;
            }
            a2(d, e);
            d.prototype = null === e ? Object.create(e) : (h.prototype = e.prototype, new h());
          };
        }(), B = a.parse, H = x.seriesTypes.line;
        a = F.extend;
        var t = F.merge, r = F.objectEach, l = F.pick;
        F = function(a2) {
          function d() {
            var d2 = null !== a2 && a2.apply(this, arguments) || this;
            d2.data = void 0;
            d2.options = void 0;
            d2.points = void 0;
            return d2;
          }
          A(d, a2);
          d.prototype.drawGraph = function() {
            this.areaPath = [];
            a2.prototype.drawGraph.apply(this);
            var d2 = this, e = this.areaPath, g3 = this.options, p = [["area", "highcharts-area", this.color, g3.fillColor]];
            this.zones.forEach(function(a3, e2) {
              p.push(["zone-area-" + e2, "highcharts-area highcharts-zone-area-" + e2 + " " + a3.className, a3.color || d2.color, a3.fillColor || g3.fillColor]);
            });
            p.forEach(function(a3) {
              var h = a3[0], k = {}, m = d2[h], p2 = m ? "animate" : "attr";
              m ? (m.endX = d2.preventGraphAnimation ? null : e.xMap, m.animate({ d: e })) : (k.zIndex = 0, m = d2[h] = d2.chart.renderer.path(e).addClass(a3[1]).add(d2.group), m.isArea = true);
              d2.chart.styledMode || (k.fill = l(a3[3], B(a3[2]).setOpacity(l(g3.fillOpacity, 0.75)).get()));
              m[p2](k);
              m.startX = e.xMap;
              m.shiftUnit = g3.step ? 2 : 1;
            });
          };
          d.prototype.getGraphPath = function(a3) {
            var d2 = H.prototype.getGraphPath, e = this.options, h = e.stacking, g3 = this.yAxis, r2 = [], t2 = [], A2 = this.index, y = g3.stacking.stacks[this.stackKey], c = e.threshold, w = Math.round(g3.getThreshold(e.threshold));
            e = l(e.connectNulls, "percent" === h);
            var f = function(b2, d3, e2) {
              var f2 = a3[b2];
              b2 = h && y[f2.x].points[A2];
              var n2 = f2[e2 + "Null"] || 0;
              e2 = f2[e2 + "Cliff"] || 0;
              f2 = true;
              if (e2 || n2) {
                var k = (n2 ? b2[0] : b2[1]) + e2;
                var m = b2[0] + e2;
                f2 = !!n2;
              } else
                !h && a3[d3] && a3[d3].isNull && (k = m = c);
              "undefined" !== typeof k && (t2.push({ plotX: z, plotY: null === k ? w : g3.getThreshold(k), isNull: f2, isCliff: true }), r2.push({ plotX: z, plotY: null === m ? w : g3.getThreshold(m), doCurve: false }));
            };
            a3 = a3 || this.points;
            h && (a3 = this.getStackPoints(a3));
            for (var n = 0, b = a3.length; n < b; ++n) {
              h || (a3[n].leftCliff = a3[n].rightCliff = a3[n].leftNull = a3[n].rightNull = void 0);
              var u = a3[n].isNull;
              var z = l(a3[n].rectPlotX, a3[n].plotX);
              var q = h ? l(a3[n].yBottom, w) : w;
              if (!u || e)
                e || f(n, n - 1, "left"), u && !h && e || (t2.push(a3[n]), r2.push({ x: n, plotX: z, plotY: q })), e || f(n, n + 1, "right");
            }
            f = d2.call(this, t2, true, true);
            r2.reversed = true;
            u = d2.call(this, r2, true, true);
            (q = u[0]) && "M" === q[0] && (u[0] = ["L", q[1], q[2]]);
            u = f.concat(u);
            u.length && u.push(["Z"]);
            d2 = d2.call(this, t2, false, e);
            u.xMap = f.xMap;
            this.areaPath = u;
            return d2;
          };
          d.prototype.getStackPoints = function(a3) {
            var d2 = this, e = [], h = [], g3 = this.xAxis, t2 = this.yAxis, A2 = t2.stacking.stacks[this.stackKey], x2 = {}, y = t2.series, c = y.length, w = t2.options.reversedStacks ? 1 : -1, f = y.indexOf(d2);
            a3 = a3 || this.points;
            if (this.options.stacking) {
              for (var n = 0; n < a3.length; n++)
                a3[n].leftNull = a3[n].rightNull = void 0, x2[a3[n].x] = a3[n];
              r(A2, function(b2, a4) {
                null !== b2.total && h.push(a4);
              });
              h.sort(function(b2, a4) {
                return b2 - a4;
              });
              var b = y.map(function(b2) {
                return b2.visible;
              });
              h.forEach(function(a4, n2) {
                var k = 0, m, p;
                if (x2[a4] && !x2[a4].isNull)
                  e.push(x2[a4]), [-1, 1].forEach(function(e2) {
                    var g4 = 1 === e2 ? "rightNull" : "leftNull", k2 = A2[h[n2 + e2]], l2 = 0;
                    if (k2)
                      for (var q = f; 0 <= q && q < c; ) {
                        var u2 = y[q].index;
                        m = k2.points[u2];
                        m || (u2 === d2.index ? x2[a4][g4] = true : b[q] && (p = A2[a4].points[u2]) && (l2 -= p[1] - p[0]));
                        q += w;
                      }
                    x2[a4][1 === e2 ? "rightCliff" : "leftCliff"] = l2;
                  });
                else {
                  for (var u = f; 0 <= u && u < c; ) {
                    if (m = A2[a4].points[y[u].index]) {
                      k = m[1];
                      break;
                    }
                    u += w;
                  }
                  k = l(k, 0);
                  k = t2.translate(k, 0, 1, 0, 1);
                  e.push({ isNull: true, plotX: g3.translate(a4, 0, 0, 0, 1), x: a4, plotY: k, yBottom: k });
                }
              });
            }
            return e;
          };
          d.defaultOptions = t(H.defaultOptions, { threshold: 0 });
          return d;
        }(H);
        a(F.prototype, { singleStacks: false, drawLegendSymbol: g2.drawRectangle });
        x.registerSeriesType("area", F);
        "";
        return F;
      });
      K(g, "Series/Spline/SplineSeries.js", [g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(a, g2) {
        var A = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(g3, r) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a3, e) {
              a3.__proto__ = e;
            } || function(a3, e) {
              for (var d in e)
                e.hasOwnProperty(d) && (a3[d] = e[d]);
            };
            return a2(g3, r);
          };
          return function(g3, r) {
            function l() {
              this.constructor = g3;
            }
            a2(g3, r);
            g3.prototype = null === r ? Object.create(r) : (l.prototype = r.prototype, new l());
          };
        }(), F = a.seriesTypes.line, C = g2.merge, B = g2.pick;
        g2 = function(a2) {
          function g3() {
            var g4 = null !== a2 && a2.apply(this, arguments) || this;
            g4.data = void 0;
            g4.options = void 0;
            g4.points = void 0;
            return g4;
          }
          A(g3, a2);
          g3.prototype.getPointSpline = function(a3, g4, e) {
            var d = g4.plotX || 0, h = g4.plotY || 0, m = a3[e - 1];
            e = a3[e + 1];
            if (m && !m.isNull && false !== m.doCurve && !g4.isCliff && e && !e.isNull && false !== e.doCurve && !g4.isCliff) {
              a3 = m.plotY || 0;
              var k = e.plotX || 0;
              e = e.plotY || 0;
              var l = 0;
              var r = (1.5 * d + (m.plotX || 0)) / 2.5;
              var t = (1.5 * h + a3) / 2.5;
              k = (1.5 * d + k) / 2.5;
              var A2 = (1.5 * h + e) / 2.5;
              k !== r && (l = (A2 - t) * (k - d) / (k - r) + h - A2);
              t += l;
              A2 += l;
              t > a3 && t > h ? (t = Math.max(a3, h), A2 = 2 * h - t) : t < a3 && t < h && (t = Math.min(a3, h), A2 = 2 * h - t);
              A2 > e && A2 > h ? (A2 = Math.max(e, h), t = 2 * h - A2) : A2 < e && A2 < h && (A2 = Math.min(e, h), t = 2 * h - A2);
              g4.rightContX = k;
              g4.rightContY = A2;
            }
            g4 = ["C", B(m.rightContX, m.plotX, 0), B(m.rightContY, m.plotY, 0), B(r, d, 0), B(t, h, 0), d, h];
            m.rightContX = m.rightContY = void 0;
            return g4;
          };
          g3.defaultOptions = C(F.defaultOptions);
          return g3;
        }(F);
        a.registerSeriesType(
          "spline",
          g2
        );
        "";
        return g2;
      });
      K(g, "Series/AreaSpline/AreaSplineSeries.js", [g["Series/Spline/SplineSeries.js"], g["Core/Legend/LegendSymbol.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(a, g2, x, F) {
        var A = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(e, d) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a3, d2) {
              a3.__proto__ = d2;
            } || function(a3, d2) {
              for (var e2 in d2)
                d2.hasOwnProperty(e2) && (a3[e2] = d2[e2]);
            };
            return a2(e, d);
          };
          return function(e, d) {
            function g3() {
              this.constructor = e;
            }
            a2(e, d);
            e.prototype = null === d ? Object.create(d) : (g3.prototype = d.prototype, new g3());
          };
        }(), B = x.seriesTypes, H = B.area;
        B = B.area.prototype;
        var t = F.extend, r = F.merge;
        F = function(g3) {
          function e() {
            var a2 = null !== g3 && g3.apply(this, arguments) || this;
            a2.data = void 0;
            a2.points = void 0;
            a2.options = void 0;
            return a2;
          }
          A(e, g3);
          e.defaultOptions = r(a.defaultOptions, H.defaultOptions);
          return e;
        }(a);
        t(F.prototype, { getGraphPath: B.getGraphPath, getStackPoints: B.getStackPoints, drawGraph: B.drawGraph, drawLegendSymbol: g2.drawRectangle });
        x.registerSeriesType("areaspline", F);
        "";
        return F;
      });
      K(g, "Series/Column/ColumnSeriesDefaults.js", [], function() {
        "";
        return { borderRadius: 0, centerInCategory: false, groupPadding: 0.2, marker: null, pointPadding: 0.1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: false, brightness: 0.1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 }, startFromThreshold: true, stickyTracking: false, tooltip: { distance: 6 }, threshold: 0, borderColor: "#ffffff" };
      });
      K(g, "Series/Column/ColumnSeries.js", [
        g["Core/Animation/AnimationUtilities.js"],
        g["Core/Color/Color.js"],
        g["Series/Column/ColumnSeriesDefaults.js"],
        g["Core/Globals.js"],
        g["Core/Legend/LegendSymbol.js"],
        g["Core/Series/Series.js"],
        g["Core/Series/SeriesRegistry.js"],
        g["Core/Utilities.js"]
      ], function(a, g2, x, F, C, B, H, t) {
        var r = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(c, d2) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a3, b) {
              a3.__proto__ = b;
            } || function(a3, b) {
              for (var c2 in b)
                b.hasOwnProperty(c2) && (a3[c2] = b[c2]);
            };
            return a2(c, d2);
          };
          return function(c, d2) {
            function e2() {
              this.constructor = c;
            }
            a2(c, d2);
            c.prototype = null === d2 ? Object.create(d2) : (e2.prototype = d2.prototype, new e2());
          };
        }(), l = a.animObject, e = g2.parse, d = F.hasTouch;
        a = F.noop;
        var h = t.clamp, m = t.defined, k = t.extend, p = t.fireEvent, A = t.isArray, I = t.isNumber, E = t.merge, L = t.pick, y = t.objectEach;
        t = function(a2) {
          function c() {
            var c2 = null !== a2 && a2.apply(this, arguments) || this;
            c2.borderWidth = void 0;
            c2.data = void 0;
            c2.group = void 0;
            c2.options = void 0;
            c2.points = void 0;
            return c2;
          }
          r(c, a2);
          c.prototype.animate = function(a3) {
            var c2 = this, b = this.yAxis, d2 = c2.options, e2 = this.chart.inverted, f = {}, g3 = e2 ? "translateX" : "translateY";
            if (a3)
              f.scaleY = 1e-3, a3 = h(b.toPixels(d2.threshold), b.pos, b.pos + b.len), e2 ? f.translateX = a3 - b.len : f.translateY = a3, c2.clipBox && c2.setClip(), c2.group.attr(f);
            else {
              var m2 = Number(c2.group.attr(g3));
              c2.group.animate({ scaleY: 1 }, k(l(c2.options.animation), { step: function(a4, d3) {
                c2.group && (f[g3] = m2 + d3.pos * (b.pos - m2), c2.group.attr(f));
              } }));
            }
          };
          c.prototype.init = function(c2, d2) {
            a2.prototype.init.apply(this, arguments);
            var b = this;
            c2 = b.chart;
            c2.hasRendered && c2.series.forEach(function(a3) {
              a3.type === b.type && (a3.isDirty = true);
            });
          };
          c.prototype.getColumnMetrics = function() {
            var a3 = this, c2 = a3.options, b = a3.xAxis, d2 = a3.yAxis, e2 = b.options.reversedStacks;
            e2 = b.reversed && !e2 || !b.reversed && e2;
            var g3 = {}, h2, k2 = 0;
            false === c2.grouping ? k2 = 1 : a3.chart.series.forEach(function(b2) {
              var c3 = b2.yAxis, e3 = b2.options;
              if (b2.type === a3.type && (b2.visible || !a3.chart.options.chart.ignoreHiddenSeries) && d2.len === c3.len && d2.pos === c3.pos) {
                if (e3.stacking && "group" !== e3.stacking) {
                  h2 = b2.stackKey;
                  "undefined" === typeof g3[h2] && (g3[h2] = k2++);
                  var f = g3[h2];
                } else
                  false !== e3.grouping && (f = k2++);
                b2.columnIndex = f;
              }
            });
            var m2 = Math.min(Math.abs(b.transA) * (b.ordinal && b.ordinal.slope || c2.pointRange || b.closestPointRange || b.tickInterval || 1), b.len), l2 = m2 * c2.groupPadding, p2 = (m2 - 2 * l2) / (k2 || 1);
            c2 = Math.min(c2.maxPointWidth || b.len, L(c2.pointWidth, p2 * (1 - 2 * c2.pointPadding)));
            a3.columnMetrics = { width: c2, offset: (p2 - c2) / 2 + (l2 + ((a3.columnIndex || 0) + (e2 ? 1 : 0)) * p2 - m2 / 2) * (e2 ? -1 : 1), paddedWidth: p2, columnCount: k2 };
            return a3.columnMetrics;
          };
          c.prototype.crispCol = function(a3, c2, b, d2) {
            var e2 = this.chart, f = this.borderWidth, g3 = -(f % 2 ? 0.5 : 0);
            f = f % 2 ? 0.5 : 1;
            e2.inverted && e2.renderer.isVML && (f += 1);
            this.options.crisp && (b = Math.round(a3 + b) + g3, a3 = Math.round(a3) + g3, b -= a3);
            d2 = Math.round(c2 + d2) + f;
            g3 = 0.5 >= Math.abs(c2) && 0.5 < d2;
            c2 = Math.round(c2) + f;
            d2 -= c2;
            g3 && d2 && (--c2, d2 += 1);
            return { x: a3, y: c2, width: b, height: d2 };
          };
          c.prototype.adjustForMissingColumns = function(a3, c2, b, d2) {
            var e2 = this, f = this.options.stacking;
            if (!b.isNull && 1 < d2.columnCount) {
              var g3 = this.yAxis.options.reversedStacks, h2 = 0, k2 = g3 ? 0 : -d2.columnCount;
              y(this.yAxis.stacking && this.yAxis.stacking.stacks, function(a4) {
                if ("number" === typeof b.x) {
                  var c3 = a4[b.x.toString()];
                  c3 && (a4 = c3.points[e2.index], f ? (a4 && (h2 = k2), c3.hasValidPoints && (g3 ? k2++ : k2--)) : A(a4) && (a4 = Object.keys(c3.points).filter(function(b2) {
                    return !b2.match(",") && c3.points[b2] && 1 < c3.points[b2].length;
                  }).map(parseFloat).sort(function(b2, a5) {
                    return a5 - b2;
                  }), h2 = a4.indexOf(e2.index), k2 = a4.length));
                }
              });
              a3 = (b.plotX || 0) + ((k2 - 1) * d2.paddedWidth + c2) / 2 - c2 - h2 * d2.paddedWidth;
            }
            return a3;
          };
          c.prototype.translate = function() {
            var a3 = this, c2 = a3.chart, b = a3.options, d2 = a3.dense = 2 > a3.closestPointRange * a3.xAxis.transA;
            d2 = a3.borderWidth = L(b.borderWidth, d2 ? 0 : 1);
            var e2 = a3.xAxis, g3 = a3.yAxis, k2 = b.threshold, l2 = a3.translatedThreshold = g3.getThreshold(k2), p2 = L(b.minPointLength, 5), r2 = a3.getColumnMetrics(), w = r2.width, y2 = a3.pointXOffset = r2.offset, v = a3.dataMin, t2 = a3.dataMax, A2 = a3.barW = Math.max(w, 1 + 2 * d2);
            c2.inverted && (l2 -= 0.5);
            b.pointPadding && (A2 = Math.ceil(A2));
            B.prototype.translate.apply(a3);
            a3.points.forEach(function(d3) {
              var f = L(d3.yBottom, l2), n = 999 + Math.abs(f), q = d3.plotX || 0;
              n = h(d3.plotY, -n, g3.len + n);
              var u = Math.min(n, f), z = Math.max(n, f) - u, D = w, x2 = q + y2, E2 = A2;
              p2 && Math.abs(z) < p2 && (z = p2, q = !g3.reversed && !d3.negative || g3.reversed && d3.negative, I(k2) && I(t2) && d3.y === k2 && t2 <= k2 && (g3.min || 0) < k2 && (v !== t2 || (g3.max || 0) <= k2) && (q = !q), u = Math.abs(u - l2) > p2 ? f - p2 : l2 - (q ? p2 : 0));
              m(d3.options.pointWidth) && (D = E2 = Math.ceil(d3.options.pointWidth), x2 -= Math.round((D - w) / 2));
              b.centerInCategory && (x2 = a3.adjustForMissingColumns(x2, D, d3, r2));
              d3.barX = x2;
              d3.pointWidth = D;
              d3.tooltipPos = c2.inverted ? [h(g3.len + g3.pos - c2.plotLeft - n, g3.pos - c2.plotLeft, g3.len + g3.pos - c2.plotLeft), e2.len + e2.pos - c2.plotTop - x2 - E2 / 2, z] : [e2.left - c2.plotLeft + x2 + E2 / 2, h(n + g3.pos - c2.plotTop, g3.pos - c2.plotTop, g3.len + g3.pos - c2.plotTop), z];
              d3.shapeType = a3.pointClass.prototype.shapeType || "rect";
              d3.shapeArgs = a3.crispCol.apply(a3, d3.isNull ? [x2, l2, E2, 0] : [x2, u, E2, z]);
            });
          };
          c.prototype.drawGraph = function() {
            this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data");
          };
          c.prototype.pointAttribs = function(a3, c2) {
            var b = this.options, d2 = this.pointAttrToOptions || {}, f = d2.stroke || "borderColor", g3 = d2["stroke-width"] || "borderWidth", h2 = a3 && a3.color || this.color, k2 = a3 && a3[f] || b[f] || h2;
            d2 = a3 && a3.options.dashStyle || b.dashStyle;
            var n = a3 && a3[g3] || b[g3] || this[g3] || 0, m2 = L(a3 && a3.opacity, b.opacity, 1);
            if (a3 && this.zones.length) {
              var l2 = a3.getZone();
              h2 = a3.options.color || l2 && (l2.color || a3.nonZonedColor) || this.color;
              l2 && (k2 = l2.borderColor || k2, d2 = l2.dashStyle || d2, n = l2.borderWidth || n);
            }
            c2 && a3 && (a3 = E(b.states[c2], a3.options.states && a3.options.states[c2] || {}), c2 = a3.brightness, h2 = a3.color || "undefined" !== typeof c2 && e(h2).brighten(a3.brightness).get() || h2, k2 = a3[f] || k2, n = a3[g3] || n, d2 = a3.dashStyle || d2, m2 = L(a3.opacity, m2));
            f = { fill: h2, stroke: k2, "stroke-width": n, opacity: m2 };
            d2 && (f.dashstyle = d2);
            return f;
          };
          c.prototype.drawPoints = function(a3) {
            void 0 === a3 && (a3 = this.points);
            var c2 = this, b = this.chart, d2 = c2.options, e2 = b.renderer, f = d2.animationLimit || 250, g3;
            a3.forEach(function(a4) {
              var h2 = a4.graphic, k2 = !!h2, n = h2 && b.pointCount < f ? "animate" : "attr";
              if (I(a4.plotY) && null !== a4.y) {
                g3 = a4.shapeArgs;
                h2 && a4.hasNewShapeType() && (h2 = h2.destroy());
                c2.enabledDataSorting && (a4.startXPos = c2.xAxis.reversed ? -(g3 ? g3.width || 0 : 0) : c2.xAxis.width);
                h2 || (a4.graphic = h2 = e2[a4.shapeType](g3).add(a4.group || c2.group)) && c2.enabledDataSorting && b.hasRendered && b.pointCount < f && (h2.attr({ x: a4.startXPos }), k2 = true, n = "animate");
                if (h2 && k2)
                  h2[n](E(g3));
                if (d2.borderRadius)
                  h2[n]({ r: d2.borderRadius });
                b.styledMode || h2[n](c2.pointAttribs(a4, a4.selected && "select")).shadow(false !== a4.allowShadow && d2.shadow, null, d2.stacking && !d2.borderRadius);
                h2 && (h2.addClass(a4.getClassName(), true), h2.attr({ visibility: a4.visible ? "inherit" : "hidden" }));
              } else
                h2 && (a4.graphic = h2.destroy());
            });
          };
          c.prototype.drawTracker = function(a3) {
            void 0 === a3 && (a3 = this.points);
            var c2 = this, b = c2.chart, e2 = b.pointer, f = function(a4) {
              var b2 = e2.getPointFromEvent(a4);
              "undefined" !== typeof b2 && (e2.isDirectTouch = true, b2.onMouseOver(a4));
            }, g3;
            a3.forEach(function(a4) {
              g3 = A(a4.dataLabels) ? a4.dataLabels : a4.dataLabel ? [a4.dataLabel] : [];
              a4.graphic && (a4.graphic.element.point = a4);
              g3.forEach(function(b2) {
                b2.div ? b2.div.point = a4 : b2.element.point = a4;
              });
            });
            c2._hasTracking || (c2.trackerGroups.forEach(function(a4) {
              if (c2[a4]) {
                c2[a4].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function(a5) {
                  e2.onTrackerMouseOut(a5);
                });
                if (d)
                  c2[a4].on("touchstart", f);
                !b.styledMode && c2.options.cursor && c2[a4].css({ cursor: c2.options.cursor });
              }
            }), c2._hasTracking = true);
            p(this, "afterDrawTracker");
          };
          c.prototype.remove = function() {
            var a3 = this, c2 = a3.chart;
            c2.hasRendered && c2.series.forEach(function(b) {
              b.type === a3.type && (b.isDirty = true);
            });
            B.prototype.remove.apply(a3, arguments);
          };
          c.defaultOptions = E(B.defaultOptions, x);
          return c;
        }(B);
        k(t.prototype, { cropShoulder: 0, directTouch: true, drawLegendSymbol: C.drawRectangle, getSymbol: a, negStacks: true, trackerGroups: ["group", "dataLabelsGroup"] });
        H.registerSeriesType("column", t);
        "";
        return t;
      });
      K(g, "Core/Series/DataLabel.js", [g["Core/Animation/AnimationUtilities.js"], g["Core/FormatUtilities.js"], g["Core/Utilities.js"]], function(a, g2, x) {
        var A = a.getDeferredAnimation, C = g2.format, B = x.defined, H = x.extend, t = x.fireEvent, r = x.isArray, l = x.isString, e = x.merge, d = x.objectEach, h = x.pick, m = x.splat, k;
        (function(a2) {
          function g3(a3, c2, b, d2, e2) {
            var f = this, g4 = this.chart, k3 = this.isCartesian && g4.inverted, n = this.enabledDataSorting, m2 = a3.plotX, l2 = a3.plotY, p2 = b.rotation, r2 = b.align, u = B(m2) && B(l2) && g4.isInsidePlot(m2, Math.round(l2), { inverted: k3, paneCoordinates: true, series: f });
            l2 = function(b2) {
              n && f.xAxis && !w2 && f.setDataLabelStartPos(a3, c2, e2, u, b2);
            };
            var w2 = "justify" === h(b.overflow, n ? "none" : "justify");
            m2 = this.visible && false !== a3.visible && B(m2) && (a3.series.forceDL || n && !w2 || u || h(b.inside, !!this.options.stacking) && d2 && g4.isInsidePlot(m2, k3 ? d2.x + 1 : d2.y + d2.height - 1, { inverted: k3, paneCoordinates: true, series: f }));
            k3 = a3.pos();
            if (m2 && k3) {
              p2 && c2.attr({ align: r2 });
              r2 = c2.getBBox(true);
              var y2 = [0, 0];
              var t2 = g4.renderer.fontMetrics(g4.styledMode ? void 0 : b.style.fontSize, c2).b;
              d2 = H({ x: k3[0], y: Math.round(k3[1]), width: 0, height: 0 }, d2);
              H(b, { width: r2.width, height: r2.height });
              p2 ? (w2 = false, y2 = g4.renderer.rotCorr(t2, p2), t2 = { x: d2.x + (b.x || 0) + d2.width / 2 + y2.x, y: d2.y + (b.y || 0) + { top: 0, middle: 0.5, bottom: 1 }[b.verticalAlign] * d2.height }, y2 = [r2.x - Number(c2.attr("x")), r2.y - Number(c2.attr("y"))], l2(t2), c2[e2 ? "attr" : "animate"](t2)) : (l2(d2), c2.align(b, void 0, d2), t2 = c2.alignAttr);
              w2 && 0 <= d2.height ? this.justifyDataLabel(c2, b, t2, r2, d2, e2) : h(b.crop, true) && (d2 = t2.x, l2 = t2.y, d2 += y2[0], l2 += y2[1], m2 = g4.isInsidePlot(d2, l2, { paneCoordinates: true, series: f }) && g4.isInsidePlot(d2 + r2.width, l2 + r2.height, { paneCoordinates: true, series: f }));
              if (b.shape && !p2)
                c2[e2 ? "attr" : "animate"]({ anchorX: k3[0], anchorY: k3[1] });
            }
            e2 && n && (c2.placed = false);
            m2 || n && !w2 ? c2.show() : (c2.hide(), c2.placed = false);
          }
          function k2(a3, c2) {
            var b = c2.filter;
            return b ? (c2 = b.operator, a3 = a3[b.property], b = b.value, ">" === c2 && a3 > b || "<" === c2 && a3 < b || ">=" === c2 && a3 >= b || "<=" === c2 && a3 <= b || "==" === c2 && a3 == b || "===" === c2 && a3 === b ? true : false) : true;
          }
          function p(a3) {
            void 0 === a3 && (a3 = this.points);
            var c2 = this, b = c2.chart, e2 = c2.options, f = c2.hasRendered || 0, g4 = b.renderer, p2 = b.options.chart, w2 = p2.backgroundColor;
            p2 = p2.plotBackgroundColor;
            var x3 = g4.getContrast(l(p2) && p2 || l(w2) && w2 || "#000000"), D = e2.dataLabels, E;
            w2 = D.animation;
            w2 = D.defer ? A(b, w2, c2) : { defer: 0, duration: 0 };
            D = y(y(
              b.options.plotOptions && b.options.plotOptions.series && b.options.plotOptions.series.dataLabels,
              b.options.plotOptions && b.options.plotOptions[c2.type] && b.options.plotOptions[c2.type].dataLabels
            ), D);
            t(this, "drawDataLabels");
            if (r(D) || D.enabled || c2._hasPointLabels) {
              var F = c2.plotGroup("dataLabelsGroup", "data-labels", f ? "inherit" : "hidden", D.zIndex || 6);
              F.attr({ opacity: +f });
              !f && (f = c2.dataLabelsGroup) && (c2.visible && F.show(), f[e2.animation ? "animate" : "attr"]({ opacity: 1 }, w2));
              a3.forEach(function(a4) {
                E = m(y(D, a4.dlOptions || a4.options && a4.options.dataLabels));
                E.forEach(function(f2, n) {
                  var m2 = f2.enabled && (!a4.isNull || a4.dataLabelOnNull) && k2(a4, f2), l2 = a4.connectors ? a4.connectors[n] : a4.connector, p3 = a4.dataLabels ? a4.dataLabels[n] : a4.dataLabel, q = !p3, r2 = h(f2.distance, a4.labelDistance);
                  if (m2) {
                    var u = a4.getLabelConfig();
                    var w3 = h(f2[a4.formatPrefix + "Format"], f2.format);
                    u = B(w3) ? C(w3, u, b) : (f2[a4.formatPrefix + "Formatter"] || f2.formatter).call(u, f2);
                    w3 = f2.style;
                    var y2 = f2.rotation;
                    b.styledMode || (w3.color = h(f2.color, w3.color, c2.color, "#000000"), "contrast" === w3.color ? (a4.contrastColor = g4.getContrast(a4.color || c2.color), w3.color = !B(r2) && f2.inside || 0 > r2 || e2.stacking ? a4.contrastColor : x3) : delete a4.contrastColor, e2.cursor && (w3.cursor = e2.cursor));
                    var t2 = { r: f2.borderRadius || 0, rotation: y2, padding: f2.padding, zIndex: 1 };
                    if (!b.styledMode) {
                      r2 = f2.backgroundColor;
                      var v = f2.borderColor;
                      t2.fill = "auto" === r2 ? a4.color : r2;
                      t2.stroke = "auto" === v ? a4.color : v;
                      t2["stroke-width"] = f2.borderWidth;
                    }
                    d(t2, function(a5, b2) {
                      "undefined" === typeof a5 && delete t2[b2];
                    });
                  }
                  !p3 || m2 && B(u) && !!p3.div === !!f2.useHTML && (p3.rotation && f2.rotation || p3.rotation === f2.rotation) || (q = true, a4.dataLabel = p3 = a4.dataLabel && a4.dataLabel.destroy(), a4.dataLabels && (1 === a4.dataLabels.length ? delete a4.dataLabels : delete a4.dataLabels[n]), n || delete a4.dataLabel, l2 && (a4.connector = a4.connector.destroy(), a4.connectors && (1 === a4.connectors.length ? delete a4.connectors : delete a4.connectors[n])));
                  m2 && B(u) ? (p3 ? t2.text = u : (a4.dataLabels = a4.dataLabels || [], p3 = a4.dataLabels[n] = y2 ? g4.text(u, 0, 0, f2.useHTML).addClass("highcharts-data-label") : g4.label(u, 0, 0, f2.shape, null, null, f2.useHTML, null, "data-label"), n || (a4.dataLabel = p3), p3.addClass(" highcharts-data-label-color-" + a4.colorIndex + " " + (f2.className || "") + (f2.useHTML ? " highcharts-tracker" : ""))), p3.options = f2, p3.attr(t2), b.styledMode || p3.css(w3).shadow(f2.shadow), (n = f2[a4.formatPrefix + "TextPath"] || f2.textPath) && !f2.useHTML && (p3.setTextPath(a4.getDataLabelPath && a4.getDataLabelPath(p3) || a4.graphic, n), a4.dataLabelPath && !n.enabled && (a4.dataLabelPath = a4.dataLabelPath.destroy())), p3.added || p3.add(F), c2.alignDataLabel(a4, p3, f2, null, q)) : p3 && p3.hide();
                });
              });
            }
            t(this, "afterDrawDataLabels");
          }
          function x2(a3, c2, b, d2, e2, g4) {
            var f = this.chart, h2 = c2.align, k3 = c2.verticalAlign, n = a3.box ? 0 : a3.padding || 0, m2 = c2.x;
            m2 = void 0 === m2 ? 0 : m2;
            var l2 = c2.y;
            l2 = void 0 === l2 ? 0 : l2;
            var p2 = (b.x || 0) + n;
            if (0 > p2) {
              "right" === h2 && 0 <= m2 ? (c2.align = "left", c2.inside = true) : m2 -= p2;
              var q = true;
            }
            p2 = (b.x || 0) + d2.width - n;
            p2 > f.plotWidth && ("left" === h2 && 0 >= m2 ? (c2.align = "right", c2.inside = true) : m2 += f.plotWidth - p2, q = true);
            p2 = b.y + n;
            0 > p2 && ("bottom" === k3 && 0 <= l2 ? (c2.verticalAlign = "top", c2.inside = true) : l2 -= p2, q = true);
            p2 = (b.y || 0) + d2.height - n;
            p2 > f.plotHeight && ("top" === k3 && 0 >= l2 ? (c2.verticalAlign = "bottom", c2.inside = true) : l2 += f.plotHeight - p2, q = true);
            q && (c2.x = m2, c2.y = l2, a3.placed = !g4, a3.align(c2, void 0, e2));
            return q;
          }
          function y(a3, c2) {
            var b = [], d2;
            if (r(a3) && !r(c2))
              b = a3.map(function(a4) {
                return e(
                  a4,
                  c2
                );
              });
            else if (r(c2) && !r(a3))
              b = c2.map(function(b2) {
                return e(a3, b2);
              });
            else if (r(a3) || r(c2))
              for (d2 = Math.max(a3.length, c2.length); d2--; )
                b[d2] = e(a3[d2], c2[d2]);
            else
              b = e(a3, c2);
            return b;
          }
          function c(a3, c2, b, d2, e2) {
            var f = this.chart, g4 = f.inverted, h2 = this.xAxis, k3 = h2.reversed, m2 = g4 ? c2.height / 2 : c2.width / 2;
            a3 = (a3 = a3.pointWidth) ? a3 / 2 : 0;
            c2.startXPos = g4 ? e2.x : k3 ? -m2 - a3 : h2.width - m2 + a3;
            c2.startYPos = g4 ? k3 ? this.yAxis.height - m2 + a3 : -m2 - a3 : e2.y;
            d2 ? "hidden" === c2.visibility && (c2.show(), c2.attr({ opacity: 0 }).animate({ opacity: 1 })) : c2.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, c2.hide);
            f.hasRendered && (b && c2.attr({ x: c2.startXPos, y: c2.startYPos }), c2.placed = true);
          }
          var w = [];
          a2.compose = function(a3) {
            if (-1 === w.indexOf(a3)) {
              var d2 = a3.prototype;
              w.push(a3);
              d2.alignDataLabel = g3;
              d2.drawDataLabels = p;
              d2.justifyDataLabel = x2;
              d2.setDataLabelStartPos = c;
            }
          };
        })(k || (k = {}));
        "";
        return k;
      });
      K(g, "Series/Column/ColumnDataLabel.js", [g["Core/Series/DataLabel.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(a, g2, x) {
        var A = g2.series, C = x.merge, B = x.pick, H;
        (function(g3) {
          function r(a2, d, g4, m, k) {
            var e = this.chart.inverted, h = a2.series, l2 = (h.xAxis ? h.xAxis.len : this.chart.plotSizeX) || 0;
            h = (h.yAxis ? h.yAxis.len : this.chart.plotSizeY) || 0;
            var r2 = a2.dlBox || a2.shapeArgs, t = B(a2.below, a2.plotY > B(this.translatedThreshold, h)), y = B(g4.inside, !!this.options.stacking);
            r2 && (m = C(r2), 0 > m.y && (m.height += m.y, m.y = 0), r2 = m.y + m.height - h, 0 < r2 && r2 < m.height && (m.height -= r2), e && (m = { x: h - m.y - m.height, y: l2 - m.x - m.width, width: m.height, height: m.width }), y || (e ? (m.x += t ? 0 : m.width, m.width = 0) : (m.y += t ? m.height : 0, m.height = 0)));
            g4.align = B(g4.align, !e || y ? "center" : t ? "right" : "left");
            g4.verticalAlign = B(g4.verticalAlign, e || y ? "middle" : t ? "top" : "bottom");
            A.prototype.alignDataLabel.call(this, a2, d, g4, m, k);
            g4.inside && a2.contrastColor && d.css({ color: a2.contrastColor });
          }
          var l = [];
          g3.compose = function(e) {
            a.compose(A);
            -1 === l.indexOf(e) && (l.push(e), e.prototype.alignDataLabel = r);
          };
        })(H || (H = {}));
        return H;
      });
      K(g, "Series/Bar/BarSeries.js", [g["Series/Column/ColumnSeries.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]], function(a, g2, x) {
        var A = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(g3, r) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a3, e) {
              a3.__proto__ = e;
            } || function(a3, e) {
              for (var d in e)
                e.hasOwnProperty(d) && (a3[d] = e[d]);
            };
            return a2(g3, r);
          };
          return function(g3, r) {
            function l() {
              this.constructor = g3;
            }
            a2(g3, r);
            g3.prototype = null === r ? Object.create(r) : (l.prototype = r.prototype, new l());
          };
        }(), C = x.extend, B = x.merge;
        x = function(g3) {
          function t() {
            var a2 = null !== g3 && g3.apply(this, arguments) || this;
            a2.data = void 0;
            a2.options = void 0;
            a2.points = void 0;
            return a2;
          }
          A(t, g3);
          t.defaultOptions = B(a.defaultOptions, {});
          return t;
        }(a);
        C(x.prototype, { inverted: true });
        g2.registerSeriesType("bar", x);
        "";
        return x;
      });
      K(g, "Series/Scatter/ScatterSeriesDefaults.js", [], function() {
        "";
        return { lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: true }, tooltip: { headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 10px"> {series.name}</span><br/>', pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>" } };
      });
      K(g, "Series/Scatter/ScatterSeries.js", [
        g["Series/Scatter/ScatterSeriesDefaults.js"],
        g["Core/Series/SeriesRegistry.js"],
        g["Core/Utilities.js"]
      ], function(a, g2, x) {
        var A = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(e, d) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a3, d2) {
              a3.__proto__ = d2;
            } || function(a3, d2) {
              for (var e2 in d2)
                d2.hasOwnProperty(e2) && (a3[e2] = d2[e2]);
            };
            return a2(e, d);
          };
          return function(e, d) {
            function g3() {
              this.constructor = e;
            }
            a2(e, d);
            e.prototype = null === d ? Object.create(d) : (g3.prototype = d.prototype, new g3());
          };
        }(), C = g2.seriesTypes, B = C.column, H = C.line;
        C = x.addEvent;
        var t = x.extend, r = x.merge;
        x = function(g3) {
          function e() {
            var a2 = null !== g3 && g3.apply(this, arguments) || this;
            a2.data = void 0;
            a2.options = void 0;
            a2.points = void 0;
            return a2;
          }
          A(e, g3);
          e.prototype.applyJitter = function() {
            var a2 = this, e2 = this.options.jitter, g4 = this.points.length;
            e2 && this.points.forEach(function(d, h) {
              ["x", "y"].forEach(function(k, m) {
                var l = "plot" + k.toUpperCase();
                if (e2[k] && !d.isNull) {
                  var p = a2[k + "Axis"];
                  var r2 = e2[k] * p.transA;
                  if (p && !p.isLog) {
                    var c = Math.max(0, d[l] - r2);
                    p = Math.min(p.len, d[l] + r2);
                    m = 1e4 * Math.sin(h + m * g4);
                    d[l] = c + (p - c) * (m - Math.floor(m));
                    "x" === k && (d.clientX = d.plotX);
                  }
                }
              });
            });
          };
          e.prototype.drawGraph = function() {
            this.options.lineWidth ? g3.prototype.drawGraph.call(this) : this.graph && (this.graph = this.graph.destroy());
          };
          e.defaultOptions = r(H.defaultOptions, a);
          return e;
        }(H);
        t(x.prototype, { drawTracker: B.prototype.drawTracker, sorted: false, requireSorting: false, noSharedTooltip: true, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: false });
        C(x, "afterTranslate", function() {
          this.applyJitter();
        });
        g2.registerSeriesType("scatter", x);
        return x;
      });
      K(g, "Series/CenteredUtilities.js", [
        g["Core/Globals.js"],
        g["Core/Series/Series.js"],
        g["Core/Utilities.js"]
      ], function(a, g2, x) {
        var A = a.deg2rad, C = x.fireEvent, B = x.isNumber, H = x.pick, t = x.relativeLength, r;
        (function(a2) {
          a2.getCenter = function() {
            var a3 = this.options, d = this.chart, h = 2 * (a3.slicedOffset || 0), m = d.plotWidth - 2 * h, k = d.plotHeight - 2 * h, l = a3.center, r2 = Math.min(m, k), A2 = a3.thickness, x2 = a3.size, F = a3.innerSize || 0;
            "string" === typeof x2 && (x2 = parseFloat(x2));
            "string" === typeof F && (F = parseFloat(F));
            a3 = [H(l[0], "50%"), H(l[1], "50%"), H(x2 && 0 > x2 ? void 0 : a3.size, "100%"), H(F && 0 > F ? void 0 : a3.innerSize || 0, "0%")];
            !d.angular || this instanceof g2 || (a3[3] = 0);
            for (l = 0; 4 > l; ++l)
              x2 = a3[l], d = 2 > l || 2 === l && /%$/.test(x2), a3[l] = t(x2, [m, k, r2, a3[2]][l]) + (d ? h : 0);
            a3[3] > a3[2] && (a3[3] = a3[2]);
            B(A2) && 2 * A2 < a3[2] && 0 < A2 && (a3[3] = a3[2] - 2 * A2);
            C(this, "afterGetCenter", { positions: a3 });
            return a3;
          };
          a2.getStartAndEndRadians = function(a3, d) {
            a3 = B(a3) ? a3 : 0;
            d = B(d) && d > a3 && 360 > d - a3 ? d : a3 + 360;
            return { start: A * (a3 + -90), end: A * (d + -90) };
          };
        })(r || (r = {}));
        "";
        return r;
      });
      K(
        g,
        "Series/Pie/PiePoint.js",
        [g["Core/Animation/AnimationUtilities.js"], g["Core/Series/Point.js"], g["Core/Utilities.js"]],
        function(a, g2, x) {
          var A = this && this.__extends || /* @__PURE__ */ function() {
            var a2 = function(d, e) {
              a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a3, d2) {
                a3.__proto__ = d2;
              } || function(a3, d2) {
                for (var e2 in d2)
                  d2.hasOwnProperty(e2) && (a3[e2] = d2[e2]);
              };
              return a2(d, e);
            };
            return function(d, e) {
              function g3() {
                this.constructor = d;
              }
              a2(d, e);
              d.prototype = null === e ? Object.create(e) : (g3.prototype = e.prototype, new g3());
            };
          }(), C = a.setAnimation, B = x.addEvent, H = x.defined;
          a = x.extend;
          var t = x.isNumber, r = x.pick, l = x.relativeLength;
          g2 = function(a2) {
            function d() {
              var d2 = null !== a2 && a2.apply(this, arguments) || this;
              d2.labelDistance = void 0;
              d2.options = void 0;
              d2.series = void 0;
              return d2;
            }
            A(d, a2);
            d.prototype.getConnectorPath = function() {
              var a3 = this.labelPosition, d2 = this.series.options.dataLabels, e = this.connectorShapes, g3 = d2.connectorShape;
              e[g3] && (g3 = e[g3]);
              return g3.call(this, { x: a3.final.x, y: a3.final.y, alignment: a3.alignment }, a3.connectorPosition, d2);
            };
            d.prototype.getTranslate = function() {
              return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 };
            };
            d.prototype.haloPath = function(a3) {
              var d2 = this.shapeArgs;
              return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(d2.x, d2.y, d2.r + a3, d2.r + a3, { innerR: d2.r - 1, start: d2.start, end: d2.end });
            };
            d.prototype.init = function() {
              var d2 = this;
              a2.prototype.init.apply(this, arguments);
              this.name = r(this.name, "Slice");
              var e = function(a3) {
                d2.slice("select" === a3.type);
              };
              B(this, "select", e);
              B(this, "unselect", e);
              return this;
            };
            d.prototype.isValid = function() {
              return t(this.y) && 0 <= this.y;
            };
            d.prototype.setVisible = function(a3, d2) {
              var e = this, g3 = this.series, h = g3.chart, m = g3.options.ignoreHiddenPoint;
              d2 = r(d2, m);
              a3 !== this.visible && (this.visible = this.options.visible = a3 = "undefined" === typeof a3 ? !this.visible : a3, g3.options.data[g3.data.indexOf(this)] = this.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(d3) {
                if (e[d3])
                  e[d3][a3 ? "show" : "hide"](a3);
              }), this.legendItem && h.legend.colorizeItem(this, a3), a3 || "hover" !== this.state || this.setState(""), m && (g3.isDirty = true), d2 && h.redraw());
            };
            d.prototype.slice = function(a3, d2, e) {
              var g3 = this.series;
              C(e, g3.chart);
              r(d2, true);
              this.sliced = this.options.sliced = H(a3) ? a3 : !this.sliced;
              g3.options.data[g3.data.indexOf(this)] = this.options;
              this.graphic && this.graphic.animate(this.getTranslate());
              this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
            };
            return d;
          }(g2);
          a(g2.prototype, { connectorShapes: { fixedOffset: function(a2, d, g3) {
            var e = d.breakAt;
            d = d.touchingSliceAt;
            return [["M", a2.x, a2.y], g3.softConnector ? ["C", a2.x + ("left" === a2.alignment ? -5 : 5), a2.y, 2 * e.x - d.x, 2 * e.y - d.y, e.x, e.y] : ["L", e.x, e.y], ["L", d.x, d.y]];
          }, straight: function(a2, d) {
            d = d.touchingSliceAt;
            return [["M", a2.x, a2.y], ["L", d.x, d.y]];
          }, crookedLine: function(a2, d, g3) {
            d = d.touchingSliceAt;
            var e = this.series, h = e.center[0], p = e.chart.plotWidth, r2 = e.chart.plotLeft;
            e = a2.alignment;
            var t2 = this.shapeArgs.r;
            g3 = l(g3.crookDistance, 1);
            p = "left" === e ? h + t2 + (p + r2 - h - t2) * (1 - g3) : r2 + (h - t2) * g3;
            g3 = ["L", p, a2.y];
            h = true;
            if ("left" === e ? p > a2.x || p < d.x : p < a2.x || p > d.x)
              h = false;
            a2 = [["M", a2.x, a2.y]];
            h && a2.push(g3);
            a2.push(["L", d.x, d.y]);
            return a2;
          } } });
          return g2;
        }
      );
      K(g, "Series/Pie/PieSeriesDefaults.js", [], function() {
        "";
        return { center: [null, null], clip: false, colorByPoint: true, dataLabels: {
          allowOverlap: true,
          connectorPadding: 5,
          connectorShape: "fixedOffset",
          crookDistance: "70%",
          distance: 30,
          enabled: true,
          formatter: function() {
            return this.point.isNull ? void 0 : this.point.name;
          },
          softConnector: true,
          x: 0
        }, fillColor: void 0, ignoreHiddenPoint: true, inactiveOtherPoints: true, legendType: "point", marker: null, size: null, showInLegend: false, slicedOffset: 10, stickyTracking: false, tooltip: { followPointer: true }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0, states: { hover: { brightness: 0.1 } } };
      });
      K(g, "Series/Pie/PieSeries.js", [
        g["Series/CenteredUtilities.js"],
        g["Series/Column/ColumnSeries.js"],
        g["Core/Globals.js"],
        g["Core/Legend/LegendSymbol.js"],
        g["Series/Pie/PiePoint.js"],
        g["Series/Pie/PieSeriesDefaults.js"],
        g["Core/Series/Series.js"],
        g["Core/Series/SeriesRegistry.js"],
        g["Core/Renderer/SVG/Symbols.js"],
        g["Core/Utilities.js"]
      ], function(a, g2, x, F, C, B, H, t, r, l) {
        var e = this && this.__extends || /* @__PURE__ */ function() {
          var a2 = function(d2, e2) {
            a2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(a3, d3) {
              a3.__proto__ = d3;
            } || function(a3, d3) {
              for (var c in d3)
                d3.hasOwnProperty(c) && (a3[c] = d3[c]);
            };
            return a2(d2, e2);
          };
          return function(d2, e2) {
            function c() {
              this.constructor = d2;
            }
            a2(d2, e2);
            d2.prototype = null === e2 ? Object.create(e2) : (c.prototype = e2.prototype, new c());
          };
        }(), d = a.getStartAndEndRadians;
        x = x.noop;
        var h = l.clamp, m = l.extend, k = l.fireEvent, p = l.merge, A = l.pick, I = l.relativeLength;
        l = function(a2) {
          function g3() {
            var d2 = null !== a2 && a2.apply(this, arguments) || this;
            d2.center = void 0;
            d2.data = void 0;
            d2.maxLabelDistance = void 0;
            d2.options = void 0;
            d2.points = void 0;
            return d2;
          }
          e(g3, a2);
          g3.prototype.animate = function(a3) {
            var c = this, d2 = c.points, e2 = c.startAngleRad;
            a3 || d2.forEach(function(a4) {
              var b = a4.graphic, d3 = a4.shapeArgs;
              b && d3 && (b.attr({ r: A(a4.startR, c.center && c.center[3] / 2), start: e2, end: e2 }), b.animate({ r: d3.r, start: d3.start, end: d3.end }, c.options.animation));
            });
          };
          g3.prototype.drawEmpty = function() {
            var a3 = this.startAngleRad, c = this.endAngleRad, d2 = this.options;
            if (0 === this.total && this.center) {
              var e2 = this.center[0];
              var g4 = this.center[1];
              this.graph || (this.graph = this.chart.renderer.arc(e2, g4, this.center[1] / 2, 0, a3, c).addClass("highcharts-empty-series").add(this.group));
              this.graph.attr({ d: r.arc(e2, g4, this.center[2] / 2, 0, { start: a3, end: c, innerR: this.center[3] / 2 }) });
              this.chart.styledMode || this.graph.attr({ "stroke-width": d2.borderWidth, fill: d2.fillColor || "none", stroke: d2.color || "#cccccc" });
            } else
              this.graph && (this.graph = this.graph.destroy());
          };
          g3.prototype.drawPoints = function() {
            var a3 = this.chart.renderer;
            this.points.forEach(function(c) {
              c.graphic && c.hasNewShapeType() && (c.graphic = c.graphic.destroy());
              c.graphic || (c.graphic = a3[c.shapeType](c.shapeArgs).add(c.series.group), c.delayedRendering = true);
            });
          };
          g3.prototype.generatePoints = function() {
            a2.prototype.generatePoints.call(this);
            this.updateTotals();
          };
          g3.prototype.getX = function(a3, c, d2) {
            var e2 = this.center, g4 = this.radii ? this.radii[d2.index] || 0 : e2[2] / 2;
            a3 = Math.asin(h((a3 - e2[1]) / (g4 + d2.labelDistance), -1, 1));
            return e2[0] + (c ? -1 : 1) * Math.cos(a3) * (g4 + d2.labelDistance) + (0 < d2.labelDistance ? (c ? -1 : 1) * this.options.dataLabels.padding : 0);
          };
          g3.prototype.hasData = function() {
            return !!this.processedXData.length;
          };
          g3.prototype.redrawPoints = function() {
            var a3 = this, c = a3.chart, d2 = c.renderer, e2 = a3.options.shadow, g4, b, h2, k2;
            this.drawEmpty();
            !e2 || a3.shadowGroup || c.styledMode || (a3.shadowGroup = d2.g("shadow").attr({ zIndex: -1 }).add(a3.group));
            a3.points.forEach(function(f) {
              var n = {};
              b = f.graphic;
              if (!f.isNull && b) {
                var l2 = void 0;
                k2 = f.shapeArgs;
                g4 = f.getTranslate();
                c.styledMode || (l2 = f.shadowGroup, e2 && !l2 && (l2 = f.shadowGroup = d2.g("shadow").add(a3.shadowGroup)), l2 && l2.attr(g4), h2 = a3.pointAttribs(f, f.selected && "select"));
                f.delayedRendering ? (b.setRadialReference(a3.center).attr(k2).attr(g4), c.styledMode || b.attr(h2).attr({ "stroke-linejoin": "round" }).shadow(e2, l2), f.delayedRendering = false) : (b.setRadialReference(a3.center), c.styledMode || p(true, n, h2), p(true, n, k2, g4), b.animate(n));
                b.attr({ visibility: f.visible ? "inherit" : "hidden" });
                b.addClass(f.getClassName(), true);
              } else
                b && (f.graphic = b.destroy());
            });
          };
          g3.prototype.sortByAngle = function(a3, c) {
            a3.sort(function(a4, d2) {
              return "undefined" !== typeof a4.angle && (d2.angle - a4.angle) * c;
            });
          };
          g3.prototype.translate = function(a3) {
            k(this, "translate");
            this.generatePoints();
            var c = this.options, e2 = c.slicedOffset, f = e2 + (c.borderWidth || 0), g4 = d(c.startAngle, c.endAngle), b = this.startAngleRad = g4.start;
            g4 = (this.endAngleRad = g4.end) - b;
            var h2 = this.points, l2 = c.dataLabels.distance;
            c = c.ignoreHiddenPoint;
            var m2 = h2.length, p2, r2 = 0;
            a3 || (this.center = a3 = this.getCenter());
            for (p2 = 0; p2 < m2; p2++) {
              var t2 = h2[p2];
              var y = b + r2 * g4;
              !t2.isValid() || c && !t2.visible || (r2 += t2.percentage / 100);
              var x2 = b + r2 * g4;
              var D = { x: a3[0], y: a3[1], r: a3[2] / 2, innerR: a3[3] / 2, start: Math.round(1e3 * y) / 1e3, end: Math.round(1e3 * x2) / 1e3 };
              t2.shapeType = "arc";
              t2.shapeArgs = D;
              t2.labelDistance = A(t2.options.dataLabels && t2.options.dataLabels.distance, l2);
              t2.labelDistance = I(t2.labelDistance, D.r);
              this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, t2.labelDistance);
              x2 = (x2 + y) / 2;
              x2 > 1.5 * Math.PI ? x2 -= 2 * Math.PI : x2 < -Math.PI / 2 && (x2 += 2 * Math.PI);
              t2.slicedTranslation = { translateX: Math.round(Math.cos(x2) * e2), translateY: Math.round(Math.sin(x2) * e2) };
              D = Math.cos(x2) * a3[2] / 2;
              var v = Math.sin(x2) * a3[2] / 2;
              t2.tooltipPos = [a3[0] + 0.7 * D, a3[1] + 0.7 * v];
              t2.half = x2 < -Math.PI / 2 || x2 > Math.PI / 2 ? 1 : 0;
              t2.angle = x2;
              y = Math.min(f, t2.labelDistance / 5);
              t2.labelPosition = { natural: { x: a3[0] + D + Math.cos(x2) * t2.labelDistance, y: a3[1] + v + Math.sin(x2) * t2.labelDistance }, "final": {}, alignment: 0 > t2.labelDistance ? "center" : t2.half ? "right" : "left", connectorPosition: { breakAt: { x: a3[0] + D + Math.cos(x2) * y, y: a3[1] + v + Math.sin(x2) * y }, touchingSliceAt: { x: a3[0] + D, y: a3[1] + v } } };
            }
            k(this, "afterTranslate");
          };
          g3.prototype.updateTotals = function() {
            var a3 = this.points, c = a3.length, d2 = this.options.ignoreHiddenPoint, e2, g4 = 0;
            for (e2 = 0; e2 < c; e2++) {
              var b = a3[e2];
              !b.isValid() || d2 && !b.visible || (g4 += b.y);
            }
            this.total = g4;
            for (e2 = 0; e2 < c; e2++)
              b = a3[e2], b.percentage = 0 < g4 && (b.visible || !d2) ? b.y / g4 * 100 : 0, b.total = g4;
          };
          g3.defaultOptions = p(H.defaultOptions, B);
          return g3;
        }(H);
        m(l.prototype, {
          axisTypes: [],
          directTouch: true,
          drawGraph: void 0,
          drawLegendSymbol: F.drawRectangle,
          drawTracker: g2.prototype.drawTracker,
          getCenter: a.getCenter,
          getSymbol: x,
          isCartesian: false,
          noSharedTooltip: true,
          pointAttribs: g2.prototype.pointAttribs,
          pointClass: C,
          requireSorting: false,
          searchPoint: x,
          trackerGroups: ["group", "dataLabelsGroup"]
        });
        t.registerSeriesType("pie", l);
        return l;
      });
      K(
        g,
        "Series/Pie/PieDataLabel.js",
        [g["Core/Series/DataLabel.js"], g["Core/Globals.js"], g["Core/Renderer/RendererUtilities.js"], g["Core/Series/SeriesRegistry.js"], g["Core/Utilities.js"]],
        function(a, g2, x, F, C) {
          var A = g2.noop, H = x.distribute, t = F.series, r = C.arrayMax, l = C.clamp, e = C.defined, d = C.merge, h = C.pick, m = C.relativeLength, k;
          (function(g3) {
            function k2() {
              var a2 = this, g4 = a2.data, f = a2.chart, k3 = a2.options.dataLabels || {}, b = k3.connectorPadding, l2 = f.plotWidth, m2 = f.plotHeight, p2 = f.plotLeft, y2 = Math.round(f.chartWidth / 3), A2 = a2.center, x3 = A2[2] / 2, D = A2[1], B2 = [[], []], E = [0, 0, 0, 0], v = a2.dataLabelPositioners, C2, F2, I, L, G, K2, M, X, R, V, Z, W;
              a2.visible && (k3.enabled || a2._hasPointLabels) && (g4.forEach(function(a3) {
                a3.dataLabel && a3.visible && a3.dataLabel.shortened && (a3.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }), a3.dataLabel.shortened = false);
              }), t.prototype.drawDataLabels.apply(a2), g4.forEach(function(a3) {
                a3.dataLabel && (a3.visible ? (B2[a3.half].push(a3), a3.dataLabel._pos = null, !e(k3.style.width) && !e(a3.options.dataLabels && a3.options.dataLabels.style && a3.options.dataLabels.style.width) && a3.dataLabel.getBBox().width > y2 && (a3.dataLabel.css({ width: Math.round(0.7 * y2) + "px" }), a3.dataLabel.shortened = true)) : (a3.dataLabel = a3.dataLabel.destroy(), a3.dataLabels && 1 === a3.dataLabels.length && delete a3.dataLabels));
              }), B2.forEach(function(c, d2) {
                var g5 = c.length, n = [], q;
                if (g5) {
                  a2.sortByAngle(c, d2 - 0.5);
                  if (0 < a2.maxLabelDistance) {
                    var r2 = Math.max(0, D - x3 - a2.maxLabelDistance);
                    var t2 = Math.min(D + x3 + a2.maxLabelDistance, f.plotHeight);
                    c.forEach(function(a3) {
                      0 < a3.labelDistance && a3.dataLabel && (a3.top = Math.max(0, D - x3 - a3.labelDistance), a3.bottom = Math.min(D + x3 + a3.labelDistance, f.plotHeight), q = a3.dataLabel.getBBox().height || 21, a3.distributeBox = { target: a3.labelPosition.natural.y - a3.top + q / 2, size: q, rank: a3.y }, n.push(a3.distributeBox));
                    });
                    r2 = t2 + q - r2;
                    H(n, r2, r2 / 5);
                  }
                  for (Z = 0; Z < g5; Z++) {
                    C2 = c[Z];
                    K2 = C2.labelPosition;
                    L = C2.dataLabel;
                    V = false === C2.visible ? "hidden" : "inherit";
                    R = r2 = K2.natural.y;
                    n && e(C2.distributeBox) && ("undefined" === typeof C2.distributeBox.pos ? V = "hidden" : (M = C2.distributeBox.size, R = v.radialDistributionY(C2)));
                    delete C2.positionIndex;
                    if (k3.justify)
                      X = v.justify(C2, x3, A2);
                    else
                      switch (k3.alignTo) {
                        case "connectors":
                          X = v.alignToConnectors(c, d2, l2, p2);
                          break;
                        case "plotEdges":
                          X = v.alignToPlotEdges(L, d2, l2, p2);
                          break;
                        default:
                          X = v.radialDistributionX(a2, C2, R, r2);
                      }
                    L._attr = {
                      visibility: V,
                      align: K2.alignment
                    };
                    W = C2.options.dataLabels || {};
                    L._pos = { x: X + h(W.x, k3.x) + ({ left: b, right: -b }[K2.alignment] || 0), y: R + h(W.y, k3.y) - 10 };
                    K2.final.x = X;
                    K2.final.y = R;
                    h(k3.crop, true) && (G = L.getBBox().width, r2 = null, X - G < b && 1 === d2 ? (r2 = Math.round(G - X + b), E[3] = Math.max(r2, E[3])) : X + G > l2 - b && 0 === d2 && (r2 = Math.round(X + G - l2 + b), E[1] = Math.max(r2, E[1])), 0 > R - M / 2 ? E[0] = Math.max(Math.round(-R + M / 2), E[0]) : R + M / 2 > m2 && (E[2] = Math.max(Math.round(R + M / 2 - m2), E[2])), L.sideOverflow = r2);
                  }
                }
              }), 0 === r(E) || this.verifyDataLabelOverflow(E)) && (this.placeDataLabels(), this.points.forEach(function(b2) {
                W = d(k3, b2.options.dataLabels);
                if (F2 = h(W.connectorWidth, 1)) {
                  var c;
                  I = b2.connector;
                  if ((L = b2.dataLabel) && L._pos && b2.visible && 0 < b2.labelDistance) {
                    V = L._attr.visibility;
                    if (c = !I)
                      b2.connector = I = f.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + b2.colorIndex + (b2.className ? " " + b2.className : "")).add(a2.dataLabelsGroup), f.styledMode || I.attr({ "stroke-width": F2, stroke: W.connectorColor || b2.color || "#666666" });
                    I[c ? "attr" : "animate"]({ d: b2.getConnectorPath() });
                    I.attr("visibility", V);
                  } else
                    I && (b2.connector = I.destroy());
                }
              }));
            }
            function p() {
              this.points.forEach(function(a2) {
                var c = a2.dataLabel, d2;
                c && a2.visible && ((d2 = c._pos) ? (c.sideOverflow && (c._attr.width = Math.max(c.getBBox().width - c.sideOverflow, 0), c.css({ width: c._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }), c.shortened = true), c.attr(c._attr), c[c.moved ? "animate" : "attr"](d2), c.moved = true) : c && c.attr({ y: -9999 }));
                delete a2.distributeBox;
              }, this);
            }
            function x2(a2) {
              var c = this.center, d2 = this.options, e2 = d2.center, b = d2.minSize || 80, g4 = null !== d2.size;
              if (!g4) {
                if (null !== e2[0])
                  var h2 = Math.max(c[2] - Math.max(a2[1], a2[3]), b);
                else
                  h2 = Math.max(c[2] - a2[1] - a2[3], b), c[0] += (a2[3] - a2[1]) / 2;
                null !== e2[1] ? h2 = l(h2, b, c[2] - Math.max(a2[0], a2[2])) : (h2 = l(h2, b, c[2] - a2[0] - a2[2]), c[1] += (a2[0] - a2[2]) / 2);
                h2 < c[2] ? (c[2] = h2, c[3] = Math.min(d2.thickness ? Math.max(0, h2 - 2 * d2.thickness) : Math.max(0, m(d2.innerSize || 0, h2)), h2), this.translate(c), this.drawDataLabels && this.drawDataLabels()) : g4 = true;
              }
              return g4;
            }
            var B = [], y = { radialDistributionY: function(a2) {
              return a2.top + a2.distributeBox.pos;
            }, radialDistributionX: function(a2, d2, e2, g4) {
              return a2.getX(e2 < d2.top + 2 || e2 > d2.bottom - 2 ? g4 : e2, d2.half, d2);
            }, justify: function(a2, d2, e2) {
              return e2[0] + (a2.half ? -1 : 1) * (d2 + a2.labelDistance);
            }, alignToPlotEdges: function(a2, d2, e2, g4) {
              a2 = a2.getBBox().width;
              return d2 ? a2 + g4 : e2 - a2 - g4;
            }, alignToConnectors: function(a2, d2, e2, g4) {
              var b = 0, c;
              a2.forEach(function(a3) {
                c = a3.dataLabel.getBBox().width;
                c > b && (b = c);
              });
              return d2 ? b + g4 : e2 - b - g4;
            } };
            g3.compose = function(c) {
              a.compose(t);
              -1 === B.indexOf(c) && (B.push(c), c = c.prototype, c.dataLabelPositioners = y, c.alignDataLabel = A, c.drawDataLabels = k2, c.placeDataLabels = p, c.verifyDataLabelOverflow = x2);
            };
          })(k || (k = {}));
          return k;
        }
      );
      K(g, "Extensions/OverlappingDataLabels.js", [g["Core/Chart/Chart.js"], g["Core/Utilities.js"]], function(a, g2) {
        function A(a2, e) {
          var d = false;
          if (a2) {
            var g3 = a2.newOpacity;
            a2.oldOpacity !== g3 && (a2.alignAttr && a2.placed ? (a2[g3 ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), d = true, a2.alignAttr.opacity = g3, a2[a2.isOld ? "animate" : "attr"](a2.alignAttr, null, function() {
              e.styledMode || a2.css({ pointerEvents: g3 ? "auto" : "none" });
            }), C(e, "afterHideOverlappingLabel")) : a2.attr({ opacity: g3 }));
            a2.isOld = true;
          }
          return d;
        }
        var F = g2.addEvent, C = g2.fireEvent, B = g2.isArray, H = g2.isNumber, t = g2.objectEach, r = g2.pick;
        F(a, "render", function() {
          var a2 = this, e = [];
          (this.labelCollectors || []).forEach(function(a3) {
            e = e.concat(a3());
          });
          (this.yAxis || []).forEach(function(a3) {
            a3.stacking && a3.options.stackLabels && !a3.options.stackLabels.allowOverlap && t(a3.stacking.stacks, function(a4) {
              t(a4, function(a5) {
                a5.label && e.push(a5.label);
              });
            });
          });
          (this.series || []).forEach(function(d) {
            var g3 = d.options.dataLabels;
            d.visible && (false !== g3.enabled || d._hasPointLabels) && (g3 = function(d2) {
              return d2.forEach(function(d3) {
                d3.visible && (B(d3.dataLabels) ? d3.dataLabels : d3.dataLabel ? [d3.dataLabel] : []).forEach(function(g4) {
                  var h = g4.options;
                  g4.labelrank = r(h.labelrank, d3.labelrank, d3.shapeArgs && d3.shapeArgs.height);
                  h.allowOverlap ? (g4.oldOpacity = g4.opacity, g4.newOpacity = 1, A(g4, a2)) : e.push(g4);
                });
              });
            }, g3(d.nodes || []), g3(d.points));
          });
          this.hideOverlappingLabels(e);
        });
        a.prototype.hideOverlappingLabels = function(a2) {
          var e = this, d = a2.length, g3 = e.renderer, l, k, p, r2 = false;
          var t2 = function(a3) {
            var c, d2 = a3.box ? 0 : a3.padding || 0, e2 = c = 0, h;
            if (a3 && (!a3.alignAttr || a3.placed)) {
              var b = a3.alignAttr || { x: a3.attr("x"), y: a3.attr("y") };
              var k2 = a3.parentGroup;
              a3.width || (c = a3.getBBox(), a3.width = c.width, a3.height = c.height, c = g3.fontMetrics(null, a3.element).h);
              var l2 = a3.width - 2 * d2;
              (h = { left: "0", center: "0.5", right: "1" }[a3.alignValue]) ? e2 = +h * l2 : H(a3.x) && Math.round(a3.x) !== a3.translateX && (e2 = a3.x - a3.translateX);
              return { x: b.x + (k2.translateX || 0) + d2 - (e2 || 0), y: b.y + (k2.translateY || 0) + d2 - c, width: a3.width - 2 * d2, height: a3.height - 2 * d2 };
            }
          };
          for (k = 0; k < d; k++)
            if (l = a2[k])
              l.oldOpacity = l.opacity, l.newOpacity = 1, l.absoluteBox = t2(l);
          a2.sort(function(a3, c) {
            return (c.labelrank || 0) - (a3.labelrank || 0);
          });
          for (k = 0; k < d; k++) {
            var x = (t2 = a2[k]) && t2.absoluteBox;
            for (l = k + 1; l < d; ++l) {
              var B2 = (p = a2[l]) && p.absoluteBox;
              !x || !B2 || t2 === p || 0 === t2.newOpacity || 0 === p.newOpacity || "hidden" === t2.visibility || "hidden" === p.visibility || B2.x >= x.x + x.width || B2.x + B2.width <= x.x || B2.y >= x.y + x.height || B2.y + B2.height <= x.y || ((t2.labelrank < p.labelrank ? t2 : p).newOpacity = 0);
            }
          }
          a2.forEach(function(a3) {
            A(a3, e) && (r2 = true);
          });
          r2 && C(e, "afterHideAllOverlappingLabels");
        };
      });
      K(g, "Core/Responsive.js", [g["Core/Utilities.js"]], function(a) {
        var g2 = a.extend, x = a.find, F = a.isArray, C = a.isObject, B = a.merge, H = a.objectEach, t = a.pick, r = a.splat, l = a.uniqueKey, e;
        (function(a2) {
          var d = [];
          a2.compose = function(a3) {
            -1 === d.indexOf(a3) && (d.push(a3), g2(a3.prototype, e2.prototype));
            return a3;
          };
          var e2 = function() {
            function a3() {
            }
            a3.prototype.currentOptions = function(a4) {
              function d2(a5, g4, c, h) {
                var f;
                H(a5, function(a6, b) {
                  if (!h && -1 < e3.collectionsWithUpdate.indexOf(b) && g4[b])
                    for (a6 = r(a6), c[b] = [], f = 0; f < Math.max(a6.length, g4[b].length); f++)
                      g4[b][f] && (void 0 === a6[f] ? c[b][f] = g4[b][f] : (c[b][f] = {}, d2(a6[f], g4[b][f], c[b][f], h + 1)));
                  else
                    C(a6) ? (c[b] = F(a6) ? [] : {}, d2(a6, g4[b] || {}, c[b], h + 1)) : c[b] = "undefined" === typeof g4[b] ? null : g4[b];
                });
              }
              var e3 = this, g3 = {};
              d2(a4, this.options, g3, 0);
              return g3;
            };
            a3.prototype.matchResponsiveRule = function(a4, d2) {
              var e3 = a4.condition;
              (e3.callback || function() {
                return this.chartWidth <= t(e3.maxWidth, Number.MAX_VALUE) && this.chartHeight <= t(e3.maxHeight, Number.MAX_VALUE) && this.chartWidth >= t(e3.minWidth, 0) && this.chartHeight >= t(e3.minHeight, 0);
              }).call(this) && d2.push(a4._id);
            };
            a3.prototype.setResponsive = function(a4, d2) {
              var e3 = this, g3 = this.options.responsive, h = this.currentResponsive, k = [];
              !d2 && g3 && g3.rules && g3.rules.forEach(function(a5) {
                "undefined" === typeof a5._id && (a5._id = l());
                e3.matchResponsiveRule(a5, k);
              }, this);
              d2 = B.apply(void 0, k.map(function(a5) {
                return x((g3 || {}).rules || [], function(c) {
                  return c._id === a5;
                });
              }).map(function(a5) {
                return a5 && a5.chartOptions;
              }));
              d2.isResponsiveOptions = true;
              k = k.toString() || void 0;
              k !== (h && h.ruleIds) && (h && this.update(h.undoOptions, a4, true), k ? (h = this.currentOptions(d2), h.isResponsiveOptions = true, this.currentResponsive = { ruleIds: k, mergedOptions: d2, undoOptions: h }, this.update(d2, a4, true)) : this.currentResponsive = void 0);
            };
            return a3;
          }();
        })(e || (e = {}));
        "";
        "";
        return e;
      });
      K(g, "masters/highcharts.src.js", [
        g["Core/Globals.js"],
        g["Core/Utilities.js"],
        g["Core/Defaults.js"],
        g["Core/Animation/Fx.js"],
        g["Core/Animation/AnimationUtilities.js"],
        g["Core/Renderer/HTML/AST.js"],
        g["Core/FormatUtilities.js"],
        g["Core/Renderer/RendererUtilities.js"],
        g["Core/Renderer/SVG/SVGElement.js"],
        g["Core/Renderer/SVG/SVGRenderer.js"],
        g["Core/Renderer/HTML/HTMLElement.js"],
        g["Core/Renderer/HTML/HTMLRenderer.js"],
        g["Core/Axis/Axis.js"],
        g["Core/Axis/DateTimeAxis.js"],
        g["Core/Axis/LogarithmicAxis.js"],
        g["Core/Axis/PlotLineOrBand/PlotLineOrBand.js"],
        g["Core/Axis/Tick.js"],
        g["Core/Tooltip.js"],
        g["Core/Series/Point.js"],
        g["Core/Pointer.js"],
        g["Core/MSPointer.js"],
        g["Core/Legend/Legend.js"],
        g["Core/Chart/Chart.js"],
        g["Core/Axis/Stacking/StackingAxis.js"],
        g["Core/Axis/Stacking/StackItem.js"],
        g["Core/Series/Series.js"],
        g["Core/Series/SeriesRegistry.js"],
        g["Series/Column/ColumnSeries.js"],
        g["Series/Column/ColumnDataLabel.js"],
        g["Series/Pie/PieSeries.js"],
        g["Series/Pie/PieDataLabel.js"],
        g["Core/Series/DataLabel.js"],
        g["Core/Responsive.js"],
        g["Core/Color/Color.js"],
        g["Core/Time.js"]
      ], function(a, g2, x, F, C, B, H, t, r, l, e, d, h, m, k, p, D, I, E, L, y, c, w, f, n, b, u, z, q, K2, J, O, Q, T, Y) {
        a.animate = C.animate;
        a.animObject = C.animObject;
        a.getDeferredAnimation = C.getDeferredAnimation;
        a.setAnimation = C.setAnimation;
        a.stop = C.stop;
        a.timers = F.timers;
        a.AST = B;
        a.Axis = h;
        a.Chart = w;
        a.chart = w.chart;
        a.Fx = F;
        a.Legend = c;
        a.PlotLineOrBand = p;
        a.Point = E;
        a.Pointer = y.isRequired() ? y : L;
        a.Series = b;
        a.StackItem = n;
        a.SVGElement = r;
        a.SVGRenderer = l;
        a.Tick = D;
        a.Time = Y;
        a.Tooltip = I;
        a.Color = T;
        a.color = T.parse;
        d.compose(l);
        e.compose(r);
        a.defaultOptions = x.defaultOptions;
        a.getOptions = x.getOptions;
        a.time = x.defaultTime;
        a.setOptions = x.setOptions;
        a.dateFormat = H.dateFormat;
        a.format = H.format;
        a.numberFormat = H.numberFormat;
        a.addEvent = g2.addEvent;
        a.arrayMax = g2.arrayMax;
        a.arrayMin = g2.arrayMin;
        a.attr = g2.attr;
        a.clearTimeout = g2.clearTimeout;
        a.correctFloat = g2.correctFloat;
        a.createElement = g2.createElement;
        a.css = g2.css;
        a.defined = g2.defined;
        a.destroyObjectProperties = g2.destroyObjectProperties;
        a.discardElement = g2.discardElement;
        a.distribute = t.distribute;
        a.erase = g2.erase;
        a.error = g2.error;
        a.extend = g2.extend;
        a.extendClass = g2.extendClass;
        a.find = g2.find;
        a.fireEvent = g2.fireEvent;
        a.getMagnitude = g2.getMagnitude;
        a.getStyle = g2.getStyle;
        a.inArray = g2.inArray;
        a.isArray = g2.isArray;
        a.isClass = g2.isClass;
        a.isDOMElement = g2.isDOMElement;
        a.isFunction = g2.isFunction;
        a.isNumber = g2.isNumber;
        a.isObject = g2.isObject;
        a.isString = g2.isString;
        a.keys = g2.keys;
        a.merge = g2.merge;
        a.normalizeTickInterval = g2.normalizeTickInterval;
        a.objectEach = g2.objectEach;
        a.offset = g2.offset;
        a.pad = g2.pad;
        a.pick = g2.pick;
        a.pInt = g2.pInt;
        a.relativeLength = g2.relativeLength;
        a.removeEvent = g2.removeEvent;
        a.seriesType = u.seriesType;
        a.splat = g2.splat;
        a.stableSort = g2.stableSort;
        a.syncTimeout = g2.syncTimeout;
        a.timeUnits = g2.timeUnits;
        a.uniqueKey = g2.uniqueKey;
        a.useSerialIds = g2.useSerialIds;
        a.wrap = g2.wrap;
        q.compose(z);
        O.compose(b);
        m.compose(h);
        k.compose(h);
        J.compose(K2);
        p.compose(h);
        Q.compose(w);
        f.compose(
          h,
          w,
          b
        );
        return a;
      });
      g["masters/highcharts.src.js"]._modules = g;
      return g["masters/highcharts.src.js"];
    });
  })(highcharts$1);
  return highcharts$1.exports;
}
var highchartsVue_min = highchartsVue_min$2.exports;
(function(module, exports) {
  !function(t, e) {
    true ? module.exports = e(requireHighcharts(), require$$1) : false ? (void 0)(["highcharts", "vue"], e) : true ? exports.HighchartsVue = e(requireHighcharts(), require$$1) : t.HighchartsVue = e(t.Highcharts, t.Vue);
  }(window, function(r, n) {
    return c = {}, o.m = i = [function(t, e) {
      t.exports = r;
    }, function(t, e) {
      t.exports = n;
    }, function(t, e, r2) {
      "use strict";
      r2.r(e), r2.d(e, "Chart", function() {
        return l;
      }), r2.d(e, "default", function() {
        return h;
      });
      var e = r2(0), c2 = r2.n(e);
      function n2(t2, e2) {
        return function r3(n3, o3, i3) {
          function t3(t4, e3) {
            !c2.a.isObject(t4, !i3) || c2.a.isClass(t4) || c2.a.isDOMElement(t4) ? n3[e3] = o3[e3] : n3[e3] = r3(n3[e3] || c2.a.isArray(t4) ? [] : {}, t4, i3);
          }
          return c2.a.isArray(o3) ? o3.forEach(t3) : c2.a.objectEach(o3, t3), n3;
        }({}, t2, e2);
      }
      var o2 = r2(1);
      function i2(t2) {
        return function(t3) {
          if (Array.isArray(t3))
            return a(t3);
        }(t2) || function(t3) {
          if ("undefined" != typeof Symbol && null != t3[Symbol.iterator] || null != t3["@@iterator"])
            return Array.from(t3);
        }(t2) || function(t3, e2) {
          if (t3) {
            if ("string" == typeof t3)
              return a(t3, e2);
            var r3 = Object.prototype.toString.call(t3).slice(8, -1);
            return "Map" === (r3 = "Object" === r3 && t3.constructor ? t3.constructor.name : r3) || "Set" === r3 ? Array.from(t3) : "Arguments" === r3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r3) ? a(t3, e2) : void 0;
          }
        }(t2) || function() {
          throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }();
      }
      function a(t2, e2) {
        (null == e2 || e2 > t2.length) && (e2 = t2.length);
        for (var r3 = 0, n3 = new Array(e2); r3 < e2; r3++)
          n3[r3] = t2[r3];
        return n3;
      }
      function u(e2, t2) {
        var r3, n3 = Object.keys(e2);
        return Object.getOwnPropertySymbols && (r3 = Object.getOwnPropertySymbols(e2), t2 && (r3 = r3.filter(function(t3) {
          return Object.getOwnPropertyDescriptor(e2, t3).enumerable;
        })), n3.push.apply(n3, r3)), n3;
      }
      function s(n3) {
        for (var t2 = 1; t2 < arguments.length; t2++) {
          var o3 = null != arguments[t2] ? arguments[t2] : {};
          t2 % 2 ? u(Object(o3), true).forEach(function(t3) {
            var e2, r3;
            e2 = n3, t3 = o3[r3 = t3], r3 in e2 ? Object.defineProperty(e2, r3, { value: t3, enumerable: true, configurable: true, writable: true }) : e2[r3] = t3;
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n3, Object.getOwnPropertyDescriptors(o3)) : u(Object(o3)).forEach(function(t3) {
            Object.defineProperty(n3, t3, Object.getOwnPropertyDescriptor(o3, t3));
          });
        }
        return n3;
      }
      function f() {
        this.chart && this.chart.destroy();
      }
      var p = function(e2, t2) {
        t2 = t2.split(".")[0] < 3 ? { render: function(t3) {
          return t3("div", { ref: "chart" });
        }, beforeDestroy: f } : { render: function() {
          return Object(o2.h)("div", { ref: "chart" });
        }, beforeUnmount: f };
        return s({ template: '<div ref="chart"></div>', props: { constructorType: { type: String, default: "chart" }, options: { type: Object, required: true }, callback: Function, updateArgs: { type: Array, default: function() {
          return [true, true];
        } }, highcharts: { type: Object }, deepCopyOnUpdate: { type: Boolean, default: true } }, watch: { options: { handler: function(t3) {
          var e3;
          (e3 = this.chart).update.apply(e3, [n2(t3, this.deepCopyOnUpdate)].concat(i2(this.updateArgs)));
        }, deep: true } }, mounted: function() {
          var t3 = this.highcharts || e2;
          this.options && t3[this.constructorType] ? this.chart = t3[this.constructorType](this.$refs.chart, n2(this.options, true), this.callback || null) : this.options ? console.warn("'".concat(this.constructorType, "' constructor-type is incorrect. Sometimes this error is caused by the fact, that the corresponding module wasn't imported.")) : console.warn('The "options" parameter was not passed.');
        } }, t2);
      }, l = p(c2.a, o2.version || r2.n(o2).a.version);
      function h(t2) {
        var e2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
        t2.component(e2.tagName || "highcharts", p(e2.highcharts || c2.a, t2.version));
      }
    }], o.c = c, o.d = function(t, e, r2) {
      o.o(t, e) || Object.defineProperty(t, e, { enumerable: true, get: r2 });
    }, o.r = function(t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: true });
    }, o.t = function(e, t) {
      if (1 & t && (e = o(e)), 8 & t)
        return e;
      if (4 & t && "object" == typeof e && e && e.__esModule)
        return e;
      var r2 = /* @__PURE__ */ Object.create(null);
      if (o.r(r2), Object.defineProperty(r2, "default", { enumerable: true, value: e }), 2 & t && "string" != typeof e)
        for (var n2 in e)
          o.d(r2, n2, (function(t2) {
            return e[t2];
          }).bind(null, n2));
      return r2;
    }, o.n = function(t) {
      var e = t && t.__esModule ? function() {
        return t.default;
      } : function() {
        return t;
      };
      return o.d(e, "a", e), e;
    }, o.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, o.p = "", o(o.s = 2);
    function o(t) {
      if (c[t])
        return c[t].exports;
      var e = c[t] = { i: t, l: false, exports: {} };
      return i[t].call(e.exports, e, e.exports, o), e.l = true, e.exports;
    }
    var i, c;
  });
})(highchartsVue_min$2, highchartsVue_min$2.exports);
var highchartsVue_minExports = highchartsVue_min$2.exports;
const highchartsVue_min$1 = /* @__PURE__ */ getDefaultExportFromCjs(highchartsVue_minExports);
const extension = new Extension();
function formatBonus(v) {
  let result = 0;
  let unit = "";
  switch (true) {
    case v >= 1e9:
      return "∞";
    case v >= 1e8:
      unit = "亿";
      result = v / 1e8;
      break;
    case v >= 1e7:
      unit = "千万";
      result = v / 1e7;
      break;
    case v >= 1e6:
      unit = "百万";
      result = v / 1e6;
      break;
    case v >= 1e4:
      unit = "万";
      result = v / 1e4;
      break;
    case v >= 1e3:
      unit = "千";
      result = v / 1e3;
      break;
    default:
      return v;
  }
  return parseFloat(result.toString()).toFixed(2) + " " + unit;
}
const _sfc_main = Vue.extend({
  components: {
    highcharts: highchartsVue_minExports.Chart
  },
  data() {
    return {
      chartBaseData: {},
      chartExtData: {},
      chartBarData: {},
      chartBonusData: {},
      host: "",
      options: this.$store.state.options,
      selectedSite: {},
      shareing: false,
      shareTime: /* @__PURE__ */ new Date(),
      version: "",
      userName: "",
      sites: [],
      rawData: {},
      beginDate: "",
      endDate: "",
      dateRange: "30day"
    };
  },
  mounted() {
    this.initEvents();
    this.init(this.$route.params["host"]);
  },
  created() {
    this.version = PPF.getVersion();
    this.sites.push({
      name: this.$t("statistic.allSite").toString(),
      host: ECommonKey.allSite,
      icon: "",
      url: "",
      tags: []
    });
    this.options.sites.forEach((site) => {
      if (site.allowGetUserInfo) {
        this.sites.push(JSON.parse(JSON.stringify(site)));
      }
    });
  },
  methods: {
    initEvents() {
    },
    init(host = "") {
      if (host == ECommonKey.allSite) {
        host = "";
      }
      this.host = host;
      this.selectedSite = this.options.sites.find((item) => {
        return item.host == this.host;
      });
      this.resetDateRange();
      extension.sendRequest(EAction.getUserHistoryData, null, this.host).then((data) => {
        console.log(data);
        this.rawData = data;
        this.resetData(data);
      });
    },
    /**
     * 获取合计数据
     */
    getTotalData(source) {
      let result = {};
      let nameInfo = { name: "", maxCount: 0 };
      let userNames = {};
      let days = [];
      for (const host in source) {
        if (source.hasOwnProperty(host)) {
          const siteData = this.fillData(source[host]);
          let site = this.options.sites.find((item) => {
            return item.host == host;
          });
          if (!site) {
            continue;
          }
          if (!site.allowGetUserInfo) {
            continue;
          }
          for (const date in siteData) {
            if (siteData.hasOwnProperty(date)) {
              const data = siteData[date];
              if (!data.uploaded && !data.downloaded && !data.seedingSize && !data.seeding) {
                continue;
              }
              let item = result[date];
              if (!item) {
                item = {
                  uploaded: 0,
                  downloaded: 0,
                  seedingSize: 0,
                  seeding: 0,
                  bonus: 0,
                  name: "",
                  lastUpdateStatus: EDataResultType.success
                };
              }
              item.uploaded += this.getNumber(data.uploaded);
              item.downloaded += this.getNumber(data.downloaded);
              if (data.seeding && data.seeding > 0) {
                item.seeding += Math.round(data.seeding);
              }
              item.seedingSize += this.getNumber(data.seedingSize);
              item.bonus += this.getNumber(data.bonus);
              if (!userNames[data.name]) {
                userNames[data.name] = 0;
              }
              userNames[data.name]++;
              if (userNames[data.name] > nameInfo.maxCount) {
                nameInfo.name = data.name;
                nameInfo.maxCount = userNames[data.name];
              }
              result[date] = item;
              if (!days.includes(date)) {
                days.push(date);
              }
            }
          }
        }
      }
      let datas = {};
      days.sort().forEach((day) => {
        datas[day] = result[day];
      });
      this.userName = nameInfo.name;
      return datas;
    },
    //-> { site: [ { date, relativeUploaded }] }
    getRelativeData(source) {
      const result = {};
      for (const [host, siteData] of Object.entries(source)) {
        const site = this.options.sites.find((item) => item.host == host);
        if (!site) {
          continue;
        }
        if (!site.allowGetUserInfo) {
          continue;
        }
        const newSiteData = this.fillData(siteData);
        const absoluteSiteData = [];
        for (const [date, item] of Object.entries(newSiteData)) {
          if (date == EUserDataRange.latest) {
            continue;
          }
          absoluteSiteData.push({
            date: new Date(date),
            uploaded: item.uploaded,
            bonusPerHour: item.bonusPerHour
          });
        }
        const relativeSiteData = [];
        for (let i = 1; i < absoluteSiteData.length; i++) {
          const a = absoluteSiteData[i - 1];
          const b = absoluteSiteData[i];
          relativeSiteData.push({ date: a.date, relativeUploaded: b.uploaded - a.uploaded, bonusPerHour: a.bonusPerHour });
        }
        result[site.name] = relativeSiteData;
      }
      return result;
    },
    getNumber(source) {
      if (typeof source === "string") {
        source = source.replace(/,/g, "");
      }
      if (/^(-)?\d+(.\d+)?$/.test(source)) {
        return parseFloat(source.toString());
      }
      return 0;
    },
    /**
     * 填充数据，将两个日期中间空白的数据由前一天数据填充
     */
    fillData(result, fill = true) {
      let datas = {};
      let lastDate = null;
      let lastData = null;
      for (const key in result) {
        if (dayjs(key).isValid()) {
          let data = result[key];
          let isValidDate = true;
          if (!data.uploaded && !data.downloaded && !data.seedingSize && !data.seeding && !data.bonusPerHour) {
            data = lastData;
          } else if (lastData && !data.id && !data.name) {
            data = lastData;
          }
          if (!data) {
            continue;
          }
          let date = dayjs(key);
          if (!lastDate) {
            lastDate = date;
          }
          if (!lastData) {
            lastData = PPF.clone(data);
          }
          if (fill) {
            let day = date.diff(lastDate, "day");
            if (day > 1) {
              for (let index = 0; index < day - 1; index++) {
                lastDate = lastDate.add(1, "day");
                if (this.inDateRange(lastDate)) {
                  datas[lastDate.format("YYYY-MM-DD")] = lastData;
                }
              }
            }
          }
          lastData = PPF.clone(data);
          lastDate = date;
          if (this.inDateRange(date)) {
            datas[key] = data;
          }
        }
      }
      datas["latest"] = result["latest"];
      return datas;
    },
    inDateRange(date) {
      if (dayjs(this.beginDate).isValid() && date.diff(this.beginDate, "day") < 0) {
        return false;
      }
      if (dayjs(this.endDate).isValid() && date.diff(this.endDate, "day") > 0) {
        return false;
      }
      return true;
    },
    resetData(result) {
      if (this.host) {
        const newResult = this.fillData(result, false);
        this.resetBaseData(newResult);
        this.resetExtData(newResult);
        const data = this.getRelativeData({ [this.host]: result });
        this.resetBarData(data);
        this.resetBonusData(data);
      } else {
        let data = this.getTotalData(result);
        this.selectedSite = {
          name: this.$t("statistic.allSite").toString(),
          host: ECommonKey.allSite
        };
        this.resetBaseData(data);
        this.resetExtData(data);
        const data2 = this.getRelativeData(result);
        this.resetBarData(data2);
        this.resetBonusData(data2);
      }
    },
    /**
     * 基础数据
     */
    resetBaseData(result) {
      var fillOpacity = 0.3;
      var datas = [
        {
          type: "spline",
          name: this.$t("statistic.upload").toString(),
          tooltip: {
            formatter: function() {
              let _this = this;
              return filters.formatSize(_this.x);
            }
          },
          fillOpacity,
          data: []
        },
        {
          type: "spline",
          name: this.$t("statistic.download").toString(),
          tooltip: {
            valueSuffix: " "
          },
          fillOpacity,
          data: []
        },
        {
          type: "spline",
          name: this.$t("statistic.bonus").toString(),
          yAxis: 1,
          tooltip: {
            valueSuffix: " "
          },
          fillOpacity,
          data: []
        }
      ];
      var types = {};
      var colors = ["#1b5e20", "#b71c1c", "#2f7ed8", "#03A9F4"];
      var categories = [];
      let latest = {
        downloaded: 0,
        uploaded: 0,
        bonus: 0,
        name: ""
      };
      let _self = this;
      for (const date in result) {
        if (result.hasOwnProperty(date)) {
          const data = result[date];
          if (!data.uploaded && !data.downloaded) {
            continue;
          }
          if (date == EUserDataRange.latest) {
            latest = data;
            continue;
          }
          const time = new Date(date).getTime();
          datas[0].data.push([time, this.getNumber(data.uploaded)]);
          datas[1].data.push([time, this.getNumber(data.downloaded)]);
          datas[2].data.push([time, this.getNumber(data.bonus)]);
          categories.push(date);
        }
      }
      var chart = {
        chart: {
          backgroundColor: null
        },
        series: datas,
        colors,
        // 版权信息
        credits: {
          enabled: false
        },
        subtitle: {
          text: this.$t("statistic.baseDataSubTitle", {
            uploaded: filters.formatSize(latest.uploaded),
            downloaded: filters.formatSize(latest.downloaded),
            bonus: filters.formatNumber(latest.bonus)
          }).toString()
        },
        title: {
          text: this.$t("statistic.baseDataTitle", {
            userName: latest.name || this.userName,
            site: this.selectedSite.name
          }).toString()
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            day: "%Y-%m-%d",
            week: "%Y-%m-%d",
            month: "%Y-%m-%d",
            year: "%Y-%m-%d"
          },
          // categories: categories,
          gridLineDashStyle: "ShortDash",
          gridLineWidth: 1,
          gridLineColor: "#dddddd",
          labels: {
            rotation: -45
          }
        },
        yAxis: [
          {
            labels: {
              formatter: function() {
                let _this = this;
                return filters.formatSize(_this.value);
              },
              style: {
                color: colors[3]
              }
            },
            title: {
              text: this.$t("statistic.data").toString(),
              style: {
                color: colors[3]
              }
            },
            lineWidth: 1,
            gridLineDashStyle: "ShortDash"
          },
          {
            opposite: true,
            labels: {
              formatter: function() {
                let _this = this;
                return formatBonus(_this.value);
              },
              style: {
                color: colors[2]
              }
            },
            title: {
              text: this.$t("statistic.bonus").toString(),
              style: {
                color: colors[2]
              }
            },
            lineWidth: 1,
            gridLineDashStyle: "ShortDash"
          }
        ],
        tooltip: {
          shared: true,
          crosshairs: {
            width: 1,
            color: "red",
            dashStyle: "shortdot"
          },
          useHTML: true,
          formatter: function() {
            function createTipItem(text, color = "#000") {
              return `<div style='color:${color};'>${text}</div>`;
            }
            let _this = this;
            let tips = [];
            tips.push(createTipItem(dayjs(_this.x).format("YYYY-MM-DD")));
            _this.points.forEach((point) => {
              let value = point.y;
              switch (point.series.name) {
                case _self.$t("statistic.upload").toString():
                case _self.$t("statistic.download").toString():
                  value = filters.formatSize(point.y);
                  break;
                case _self.$t("statistic.bonus").toString():
                  value = filters.formatNumber(point.y);
                  break;
              }
              tips.push(
                createTipItem(`${point.series.name}: ${value}`, point.color)
              );
            });
            let result2 = `<div>${tips.join("")}</div>`;
            return result2;
          }
        }
      };
      this.chartBaseData = chart;
    },
    /**
     * 其他数据
     */
    resetExtData(result) {
      var fillOpacity = 0.3;
      var datas = [
        {
          type: "spline",
          name: this.$t("statistic.seedingSize").toString(),
          fillOpacity,
          data: []
        },
        {
          type: "spline",
          name: this.$t("statistic.seedingCount").toString(),
          //"做种数",
          yAxis: 1,
          fillOpacity,
          data: []
        }
      ];
      var types = {};
      var colors = ["#FF6F00", "#2E7D32", "#2f7ed8", "#03A9F4"];
      var categories = [];
      let latest = {
        seeding: 0,
        seedingSize: 0,
        name: ""
      };
      for (const date in result) {
        if (result.hasOwnProperty(date)) {
          const data = result[date];
          if (!data.seedingSize && !data.seeding) {
            continue;
          }
          if (date == EUserDataRange.latest) {
            latest = data;
            continue;
          }
          const time = new Date(date).getTime();
          datas[0].data.push([time, parseFloat(data.seedingSize)]);
          datas[1].data.push([time, parseFloat(data.seeding)]);
          categories.push(date);
        }
      }
      let _self = this;
      var chart = {
        chart: {
          backgroundColor: null
        },
        series: datas,
        colors,
        // 版权信息
        credits: {
          enabled: false
        },
        subtitle: {
          text: this.$t("statistic.seedingDataSubTitle", {
            seedingSize: filters.formatSize(latest.seedingSize),
            count: latest.seeding
          }).toString()
        },
        title: {
          text: this.$t("statistic.seedingDataTitle", {
            userName: latest.name || this.userName,
            site: this.selectedSite.name
          }).toString()
        },
        xAxis: {
          // categories: categories,
          type: "datetime",
          dateTimeLabelFormats: {
            day: "%Y-%m-%d",
            week: "%Y-%m-%d",
            month: "%Y-%m-%d",
            year: "%Y-%m-%d"
          },
          gridLineDashStyle: "ShortDash",
          gridLineWidth: 1,
          gridLineColor: "#dddddd",
          labels: {
            rotation: -45
          }
        },
        yAxis: [
          {
            labels: {
              formatter: function() {
                let _this = this;
                return filters.formatSize(_this.value);
              },
              style: {
                color: colors[0]
              }
            },
            title: {
              text: this.$t("statistic.size").toString(),
              //"体积",
              style: {
                color: colors[0]
              }
            },
            lineWidth: 1,
            gridLineDashStyle: "ShortDash"
          },
          {
            opposite: true,
            labels: {
              formatter: function() {
                let _this = this;
                return formatBonus(_this.value);
              },
              style: {
                color: colors[1]
              }
            },
            title: {
              text: this.$t("statistic.count").toString(),
              //"数量",
              style: {
                color: colors[1]
              }
            },
            lineWidth: 1,
            gridLineDashStyle: "ShortDash"
          }
        ],
        tooltip: {
          shared: true,
          useHTML: true,
          crosshairs: {
            width: 1,
            color: "red",
            dashStyle: "shortdot"
          },
          formatter: function() {
            function createTipItem(text, color = "#000") {
              return `<div style='color:${color};'>${text}</div>`;
            }
            let _this = this;
            let tips = [];
            tips.push(createTipItem(dayjs(_this.x).format("YYYY-MM-DD")));
            _this.points.forEach((point) => {
              let value = point.y;
              switch (point.series.name) {
                case _self.$t("statistic.seedingSize").toString():
                  value = filters.formatSize(point.y);
                  break;
              }
              tips.push(
                createTipItem(`${point.series.name}: ${value}`, point.color)
              );
            });
            let result2 = `<div>${tips.join("")}</div>`;
            return result2;
          }
        }
      };
      this.chartExtData = chart;
    },
    /**
     * Bar数据
     */
    resetBarData(result) {
      const $t = this.$t.bind(this);
      const series = Object.entries(result).map(([siteName, data]) => ({
        name: siteName,
        data: data.map((v) => [
          v.date.getTime(),
          v.relativeUploaded
        ])
      }));
      const chart = {
        series,
        chart: {
          backgroundColor: null,
          type: "column"
        },
        credits: {
          enabled: false
        },
        title: {
          text: this.$t("statistic.barDataTitle", {
            userName: this.userName,
            site: this.selectedSite.name
          }).toString()
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            day: "%Y-%m-%d",
            week: "%Y-%m-%d",
            month: "%Y-%m-%d",
            year: "%Y-%m-%d"
          },
          gridLineDashStyle: "ShortDash",
          gridLineWidth: 1,
          gridLineColor: "#dddddd",
          labels: {
            rotation: -45
          }
        },
        yAxis: {
          title: {
            text: this.$t("statistic.data").toString()
          },
          lineWidth: 1,
          gridLineDashStyle: "ShortDash"
        },
        tooltip: {
          useHTML: true,
          formatter: function() {
            const { x, y, total, color, series: { name: siteName } } = this;
            let sites = [];
            for (const site of series) {
              const siteY = (site.data.find(([a]) => a === x) || [0, 0])[1];
              if (y < 0 && siteY < 0 || y > 0 && siteY > 0) {
                const percentage = Math.ceil(siteY / total * 100);
                sites.push({
                  name: site.name,
                  value: siteY,
                  valueDisplay: filters.formatSizeWithNegative(siteY),
                  percentageDisplay: `${percentage}%`,
                  isActive: site.name === siteName
                });
              }
            }
            sites.sort((a, b) => b.value - a.value);
            const date = dayjs(x).format("YYYY-MM-DD");
            const totalDisplay = filters.formatSizeWithNegative(total);
            const totalText = $t("statistic.total").toString();
            const createTr = ({ name, valueDisplay, percentageDisplay, isActive }) => {
              return `
                <tr style='color: ${isActive ? color : "inherit"};'>
                  <td>${name}</td>
                  <td style='padding-left: 5px;'>${valueDisplay}</td>
                  <td style='padding-left: 5px;'>${percentageDisplay}</td>
                </tr>
              `;
            };
            return `
              ${date}<br/>
              <table>
                ${createTr({ name: totalText, valueDisplay: totalDisplay, percentageDisplay: "100%" })}
                ${sites.map(createTr).join("")}
              </table>
            `;
          }
        },
        plotOptions: {
          column: {
            stacking: "normal"
          }
        }
      };
      this.chartBarData = chart;
    },
    /**
     * 时魔数据趋势
     */
    resetBonusData(result) {
      console.log("resetBonusData");
      const $t = this.$t.bind(this);
      const series = Object.entries(result).map(([siteName, data]) => ({
        name: siteName,
        data: data.map((v) => [
          v.date.getTime(),
          // filters.formatNumber 计算时会丢失 U2 的数据, 还是自己处理吧
          // parseFloat(filters.formatNumber(parseFloat(v.bonusPerHour) || 0)),
          parseFloat((parseFloat(v.bonusPerHour) || 0).toFixed(2))
        ])
      }));
      const chart = {
        series,
        chart: {
          backgroundColor: null,
          type: "column"
        },
        credits: {
          enabled: false
        },
        title: {
          text: this.$t("statistic.hourlyBonusDataTitle", {
            userName: this.userName,
            site: this.selectedSite.name
          }).toString()
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            day: "%Y-%m-%d",
            week: "%Y-%m-%d",
            month: "%Y-%m-%d",
            year: "%Y-%m-%d"
          },
          gridLineDashStyle: "ShortDash",
          gridLineWidth: 1,
          gridLineColor: "#dddddd",
          labels: {
            rotation: -45
          }
        },
        yAxis: {
          title: {
            text: this.$t("statistic.hourlyBonus").toString()
          },
          lineWidth: 1,
          gridLineDashStyle: "ShortDash"
        },
        tooltip: {
          useHTML: true,
          formatter: function() {
            const { x, y, total, color, series: { name: siteName } } = this;
            let sites = [];
            for (const site of series) {
              const siteY = (site.data.find(([a]) => a === x) || [0, 0])[1];
              if (y < 0 && siteY < 0 || y > 0 && siteY > 0) {
                const percentage = Math.ceil(siteY / total * 100);
                sites.push({
                  name: site.name,
                  value: siteY,
                  valueDisplay: siteY.toString(),
                  percentageDisplay: `${percentage}%`,
                  isActive: site.name === siteName
                });
              }
            }
            sites.sort((a, b) => b.value - a.value);
            const date = dayjs(x).format("YYYY-MM-DD");
            const totalDisplay = total.toString();
            const totalText = $t("statistic.total").toString();
            const createTr = ({ name, valueDisplay, percentageDisplay, isActive }) => {
              return `
                <tr style='color: ${isActive ? color : "inherit"};'>
                  <td>${name}</td>
                  <td style='padding-left: 5px;'>${valueDisplay}</td>
                  <td style='padding-left: 5px;'>${percentageDisplay}</td>
                </tr>
              `;
            };
            return `
              ${date}<br/>
              <table>
                ${createTr({ name: totalText, valueDisplay: totalDisplay, percentageDisplay: "100%" })}
                ${sites.map(createTr).join("")}
              </table>
            `;
          }
        },
        plotOptions: {
          column: {
            stacking: "normal"
          }
        }
      };
      this.chartBonusData = chart;
    },
    joinTags(tags) {
      if (tags && tags.join) {
        return tags.join(", ");
      }
      return "";
    },
    share() {
      let div = this.$refs.charts;
      this.shareing = true;
      this.shareTime = /* @__PURE__ */ new Date();
      domtoimage.toJpeg(div, {
        filter: (node) => {
          if (node.nodeType === 1) {
            return !node.classList.contains("by_pass_canvas");
          }
          return true;
        }
      }).then((dataUrl) => {
        if (dataUrl) {
          FileSaver.saveAs(dataUrl, "PT-Plugin-Plus-UserData.jpg");
        }
        this.shareing = false;
      });
    },
    /**
     * 导出原始数据
     */
    exportRawData() {
      const data = new Blob([JSON.stringify(this.rawData)], {
        type: "text/plain"
      });
      FileSaver.saveAs(
        data,
        `PT-Plugin-Plus-Statistic-${this.selectedSite.host}.json`
      );
    },
    resetDateRange() {
      const now = dayjs();
      this.endDate = now.toString();
      switch (this.dateRange) {
        case "7day":
          this.beginDate = now.add(-7, "day").toString();
          break;
        case "30day":
          this.beginDate = now.add(-30, "day").toString();
          break;
        case "60day":
          this.beginDate = now.add(-60, "day").toString();
          break;
        case "90day":
          this.beginDate = now.add(-90, "day").toString();
          break;
        case "180day":
          this.beginDate = now.add(-180, "day").toString();
          break;
        default:
          this.beginDate = "";
          break;
      }
    }
  },
  watch: {
    dateRange() {
      this.resetDateRange();
      this.resetData(this.rawData);
    }
  }
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "container" }, [_c("v-autocomplete", { attrs: { "items": _vm.sites, "label": _vm.$t("statistic.selectSite"), "persistent-hint": "", "single-line": "", "item-text": "name", "item-value": "host", "return-object": "" }, on: { "input": function($event) {
    return _vm.init(_vm.selectedSite.host);
  } }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
    return [item.icon ? _c("v-list-tile-avatar", [_c("img", { attrs: { "src": item.icon } })]) : _vm._e(), _c("span", { domProps: { "textContent": _vm._s(item.name) } })];
  } }, { key: "item", fn: function(data) {
    return [data.item.icon ? _c("v-list-tile-avatar", [_c("img", { attrs: { "src": data.item.icon } })]) : _vm._e(), _c("v-list-tile-content", [_c("v-list-tile-title", { domProps: { "innerHTML": _vm._s(data.item.name) } }), _c("v-list-tile-sub-title", { domProps: { "innerHTML": _vm._s(data.item.url) } })], 1), _c("v-list-tile-action", [_c("v-list-tile-action-text", [_vm._v(_vm._s(_vm.joinTags(data.item.tags)))])], 1)];
  } }]), model: { value: _vm.selectedSite, callback: function($$v) {
    _vm.selectedSite = $$v;
  }, expression: "selectedSite" } }), _c("v-layout", { staticClass: "mb-2", attrs: { "row": "", "wrap": "" } }, [_c("v-btn", { attrs: { "depressed": "", "small": "", "to": "/home" } }, [_vm._v(_vm._s(_vm.$t("statistic.goback")))]), _c("v-btn", { attrs: { "depressed": "", "small": "" }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.exportRawData.apply(null, arguments);
  } } }, [_vm._v(_vm._s(_vm.$t("statistic.exportRawData")))]), _c("v-spacer", [_c("v-btn-toggle", { staticClass: "ml-5", model: { value: _vm.dateRange, callback: function($$v) {
    _vm.dateRange = $$v;
  }, expression: "dateRange" } }, [_c("v-btn", { attrs: { "flat": "", "value": "7day" }, domProps: { "textContent": _vm._s(_vm.$t("statistic.dateRange.7day")) } }), _c("v-btn", { attrs: { "flat": "", "value": "30day" }, domProps: { "textContent": _vm._s(_vm.$t("statistic.dateRange.30day")) } }), _c("v-btn", { attrs: { "flat": "", "value": "60day" }, domProps: { "textContent": _vm._s(_vm.$t("statistic.dateRange.60day")) } }), _c("v-btn", { attrs: { "flat": "", "value": "90day" }, domProps: { "textContent": _vm._s(_vm.$t("statistic.dateRange.90day")) } }), _c("v-btn", { attrs: { "flat": "", "value": "180day" }, domProps: { "textContent": _vm._s(_vm.$t("statistic.dateRange.180day")) } }), _c("v-btn", { attrs: { "flat": "", "value": "all" }, domProps: { "textContent": _vm._s(_vm.$t("statistic.dateRange.all")) } })], 1)], 1), !_vm.shareing ? _c("v-btn", { attrs: { "flat": "", "icon": "", "small": "", "title": _vm.$t("statistic.share") }, on: { "click": _vm.share } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("share")])], 1) : _vm._e(), _vm.shareing ? _c("v-progress-circular", { staticClass: "by_pass_canvas", attrs: { "indeterminate": "", "width": 3, "size": "30", "color": "green" } }) : _vm._e()], 1), _c("div", { ref: "charts", staticClass: "charts" }, [_c("highcharts", { attrs: { "options": _vm.chartBarData } }), _c("highcharts", { staticClass: "mt-4", attrs: { "options": _vm.chartBaseData } }), _c("highcharts", { staticClass: "mt-4", attrs: { "options": _vm.chartExtData } }), _c("highcharts", { staticClass: "mt-4", attrs: { "options": _vm.chartBonusData } }), _c("v-card-actions", [_c("v-spacer"), _c("span", [_vm._v(_vm._s(_vm._f("formatDate")(_vm.shareTime, "YYYY-MM-DD HH:mm:ss")))]), _c("span", { staticClass: "ml-1" }, [_vm._v("Created By " + _vm._s(_vm.$t("app.name")) + " " + _vm._s(_vm.version))])], 1)], 1), _c("v-alert", { attrs: { "value": true, "type": "info", "color": "grey" } }, [_c("div", { domProps: { "innerHTML": _vm._s(_vm.$t("statistic.note")) } })])], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "55d1ff4d",
  null,
  null
);
const SiteBase = __component__.exports;
export {
  SiteBase as default
};
