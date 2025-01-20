import { x as ERequestMethod, y as FileDownloader, t as EResourceOrderMode, K as EResourceOrderBy, L as EConfigKey, M as localStorage, N as Favicon, g as ESizeUnit, d as EBeforeSearchingItemSearchMode, O as EPluginPosition, A as APP, P as PPF, Q as API, J as EUserDataRange, F as FileSaver, r as dayjs, j as EBackupServerType, w as EDataResultType, a as EAction, q as getDefaultExportFromCjs, p as commonjsGlobal, C as ERequestResultType, R as cryptoJsExports, S as ERequestType, b as EModule, T as BASE_TAG_COLORS, H as EUserDataRequestStatus, U as path, c as EMediaServerType, f as filters, W as EDownloadClientType, X as EWikiLink, i as ECommonKey, Y as ELogEvent, Z as EAlarm, o as EBrowserType } from "./index-DJA1DKKX.js";
import { B as BackupFileParser } from "./backupFileParser-DeRKjG9L.js";
import { M as MovieInfoService } from "./movieInfoService-CNXC4TTX.js";
import { P as PathHandler } from "./pathHandler-yIpW4LsR.js";
class SyncStorage {
  constructor() {
    this.arrayValues = {};
  }
  isArray(o2) {
    return Object.prototype.toString.call(o2) == "[object Array]";
  }
  /**
   * 清除所有参数
   */
  clear() {
    return new Promise((resolve2, reject2) => {
      try {
        chrome.storage.sync.clear();
        if (chrome.runtime.lastError) {
          reject2(chrome.runtime.lastError);
        } else {
          resolve2();
        }
      } catch (error2) {
        reject2(error2);
      }
    });
  }
  /**
   * 保存一个键值
   * @param key 键名
   * @param value 键值
   * @param count 当参数为数组时，数组的长度
   * @param onSuccess 成功时回调
   * @param onError 失败时回调
   */
  _set(key2, value, count = 0, onSuccess, onError) {
    let _data = value;
    let _key = key2;
    let index2 = -1;
    if (this.isArray(value)) {
      if (count == 0) {
        count = value.length;
        this._set(
          `${key2}__count`,
          count,
          0,
          () => {
            this._set(key2, value, count, onSuccess, onError);
          },
          onError
        );
        return;
      }
      index2 = value.length - 1;
      _data = value.pop();
      _key = `${key2}_${index2}`;
    }
    chrome.storage.sync.set(
      {
        [_key]: _data
      },
      () => {
        if (chrome.runtime.lastError) {
          onError(chrome.runtime.lastError);
        } else {
          if (index2 > 0) {
            this._set(key2, value, count, onSuccess, onError);
          } else {
            onSuccess(value);
          }
        }
      }
    );
  }
  /**
   * 获取指定的键值
   * @param key 键名
   * @param checkArray 是否检查数组
   * @param index 当前索引
   * @param onSuccess 成功回调
   * @param onError 失败回调
   */
  _get(key2, checkArray = false, index2 = 0, onSuccess, onError) {
    if (checkArray) {
      this._get(
        `${key2}__count`,
        false,
        0,
        (result2) => {
          if (result2 > 0) {
            this.arrayValues[key2] = [];
            this._get(key2, false, result2, onSuccess, onError);
          } else {
            this._get(key2, false, 0, onSuccess, onError);
          }
        },
        (error2) => {
          if (error2 == "参数不存在") {
            this._get(key2, false, 0, onSuccess, onError);
          } else {
            onError && onError(error2);
          }
        }
      );
      return;
    }
    let _key = key2;
    if (index2 > 0) {
      _key = `${key2}_${index2 - 1}`;
    }
    try {
      chrome.storage.sync.get(_key, (result2) => {
        let value = null;
        try {
          if (result2[_key]) {
            value = result2[_key];
          } else {
            onError("参数不存在");
            return;
          }
        } catch (error2) {
          onError(error2);
          return;
        }
        index2--;
        if (index2 <= 0) {
          if (this.arrayValues[key2]) {
            this.arrayValues[key2].push(value);
            onSuccess(this.arrayValues[key2]);
            delete this.arrayValues[key2];
          } else {
            onSuccess(value);
          }
        } else {
          this.arrayValues[key2].push(value);
          this._get(key2, false, index2, onSuccess, onError);
        }
      });
    } catch (error2) {
      onError(error2);
    }
  }
  /**
   * 保存指定的键值到Google
   * @param key
   * @param value
   */
  set(key2, value) {
    return new Promise((resolve2, reject2) => {
      if (chrome.storage && chrome.storage.sync) {
        try {
          this._set(
            key2,
            value,
            0,
            () => {
              resolve2(value);
            },
            (error2) => {
              reject2(error2);
            }
          );
        } catch (error2) {
          reject2(error2);
        }
      } else {
        reject2("chrome.storage 不存在");
      }
    });
  }
  /**
   * 从Google中获取指定的键值
   * @param key
   */
  get(key2) {
    return new Promise((resolve2, reject2) => {
      if (chrome.storage && chrome.storage.sync) {
        try {
          this._get(
            key2,
            true,
            0,
            (result2) => {
              resolve2(result2);
            },
            (error2) => {
              reject2(error2);
            }
          );
        } catch (error2) {
          reject2(error2);
        }
      } else {
        reject2("chrome.storage 不存在");
      }
    });
  }
}
class OWSS {
  constructor(options2) {
    this.options = options2;
    this.serverURL = "";
    this.serverURL = this.options.address;
    if (this.serverURL.substr(-1) !== "/") {
      this.serverURL += "/";
    }
  }
  /**
   * 发送指定的请求
   * @param action 指令
   * @param method 请求方法（GET，POST）
   * @param data 请求数据
   */
  request(action, method = ERequestMethod.GET, data2) {
    return new Promise((resolve2, reject2) => {
      let options2 = {
        url: this.serverURL + `${action}`,
        method,
        dataType: "json",
        data: data2
      };
      if (method === ERequestMethod.POST) {
        options2.processData = false;
        options2.contentType = false;
      }
      $.ajax(options2).done((result2) => {
        resolve2(result2);
      }).fail((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 申请资源ID
   */
  create() {
    return new Promise((resolve2, reject2) => {
      this.request("create").then((result2) => {
        if (result2 == null ? void 0 : result2.data) {
          resolve2(result2.data);
        } else {
          reject2();
        }
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 添加文件
   * @param formData
   */
  add(formData) {
    return new Promise((resolve2, reject2) => {
      this.request(
        `${this.options.authCode}/add`,
        ERequestMethod.POST,
        formData
      ).then((result2) => {
        if ((result2 == null ? void 0 : result2.data) === true) {
          resolve2(true);
        } else {
          reject2(false);
        }
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 获取（下载）一个文件
   * @param path
   * @returns 返回一个 blob 对象
   */
  get(path2) {
    return new Promise((resolve2, reject2) => {
      let url2 = `${this.serverURL}${this.options.authCode}/get/${path2}`;
      let file = new FileDownloader({
        url: url2,
        getDataOnly: true
      });
      file.onCompleted = () => {
        resolve2(file.content);
      };
      file.onError = (e2) => {
        console.log(e2);
        reject2(e2);
      };
      file.start();
    });
  }
  /**
   * 删除一个文件
   * @param path
   */
  delete(path2) {
    return new Promise((resolve2, reject2) => {
      this.request(
        `${this.options.authCode}/delete/${path2}`,
        ERequestMethod.POST
      ).then((result2) => {
        if (result2 == null ? void 0 : result2.data) {
          resolve2(result2.data);
        } else {
          reject2(false);
        }
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 获取资源列表
   * @param options
   */
  list(options2 = {}) {
    return new Promise((resolve2, reject2) => {
      this.request(`${this.options.authCode}/list`, ERequestMethod.GET, options2).then((result2) => {
        if (result2 == null ? void 0 : result2.data) {
          resolve2(result2.data);
        } else {
          reject2(false);
        }
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 验证服务器可用性
   */
  ping() {
    return new Promise((resolve2, reject2) => {
      this.request(`${this.options.authCode}/list`, ERequestMethod.GET, {
        pageSize: 1
      }).then(() => {
        resolve2(true);
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
}
var define_process_env_default = {};
/*! For license information please see index.js.LICENSE.txt */
var t$1 = { 2: (t2) => {
  function e2(t3, e3, o2) {
    t3 instanceof RegExp && (t3 = n2(t3, o2)), e3 instanceof RegExp && (e3 = n2(e3, o2));
    var i2 = r2(t3, e3, o2);
    return i2 && { start: i2[0], end: i2[1], pre: o2.slice(0, i2[0]), body: o2.slice(i2[0] + t3.length, i2[1]), post: o2.slice(i2[1] + e3.length) };
  }
  function n2(t3, e3) {
    var n3 = e3.match(t3);
    return n3 ? n3[0] : null;
  }
  function r2(t3, e3, n3) {
    var r3, o2, i2, s2, a2, c2 = n3.indexOf(t3), u2 = n3.indexOf(e3, c2 + 1), l2 = c2;
    if (c2 >= 0 && u2 > 0) {
      for (r3 = [], i2 = n3.length; l2 >= 0 && !a2; )
        l2 == c2 ? (r3.push(l2), c2 = n3.indexOf(t3, l2 + 1)) : 1 == r3.length ? a2 = [r3.pop(), u2] : ((o2 = r3.pop()) < i2 && (i2 = o2, s2 = u2), u2 = n3.indexOf(e3, l2 + 1)), l2 = c2 < u2 && c2 >= 0 ? c2 : u2;
      r3.length && (a2 = [i2, s2]);
    }
    return a2;
  }
  t2.exports = e2, e2.range = r2;
}, 101: function(t2, e2, n2) {
  var r2;
  t2 = n2.nmd(t2), function(o2) {
    var i2 = (t2 && t2.exports, "object" == typeof global && global);
    i2.global !== i2 && i2.window;
    var s2 = function(t3) {
      this.message = t3;
    };
    (s2.prototype = new Error()).name = "InvalidCharacterError";
    var a2 = function(t3) {
      throw new s2(t3);
    }, c2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", u2 = /[\t\n\f\r ]/g, l2 = { encode: function(t3) {
      t3 = String(t3), /[^\0-\xFF]/.test(t3) && a2("The string to be encoded contains characters outside of the Latin1 range.");
      for (var e3, n3, r3, o3, i3 = t3.length % 3, s3 = "", u3 = -1, l3 = t3.length - i3; ++u3 < l3; )
        e3 = t3.charCodeAt(u3) << 16, n3 = t3.charCodeAt(++u3) << 8, r3 = t3.charCodeAt(++u3), s3 += c2.charAt((o3 = e3 + n3 + r3) >> 18 & 63) + c2.charAt(o3 >> 12 & 63) + c2.charAt(o3 >> 6 & 63) + c2.charAt(63 & o3);
      return 2 == i3 ? (e3 = t3.charCodeAt(u3) << 8, n3 = t3.charCodeAt(++u3), s3 += c2.charAt((o3 = e3 + n3) >> 10) + c2.charAt(o3 >> 4 & 63) + c2.charAt(o3 << 2 & 63) + "=") : 1 == i3 && (o3 = t3.charCodeAt(u3), s3 += c2.charAt(o3 >> 2) + c2.charAt(o3 << 4 & 63) + "=="), s3;
    }, decode: function(t3) {
      var e3 = (t3 = String(t3).replace(u2, "")).length;
      e3 % 4 == 0 && (e3 = (t3 = t3.replace(/==?$/, "")).length), (e3 % 4 == 1 || /[^+a-zA-Z0-9/]/.test(t3)) && a2("Invalid character: the string to be decoded is not correctly encoded.");
      for (var n3, r3, o3 = 0, i3 = "", s3 = -1; ++s3 < e3; )
        r3 = c2.indexOf(t3.charAt(s3)), n3 = o3 % 4 ? 64 * n3 + r3 : r3, o3++ % 4 && (i3 += String.fromCharCode(255 & n3 >> (-2 * o3 & 6)));
      return i3;
    }, version: "1.0.0" };
    void 0 === (r2 = (function() {
      return l2;
    }).call(e2, n2, e2, t2)) || (t2.exports = r2);
  }();
}, 172: (t2, e2) => {
  e2.d = function(t3) {
    if (!t3)
      return 0;
    for (var e3 = (t3 = t3.toString()).length, n2 = t3.length; n2--; ) {
      var r2 = t3.charCodeAt(n2);
      56320 <= r2 && r2 <= 57343 && n2--, 127 < r2 && r2 <= 2047 ? e3++ : 2047 < r2 && r2 <= 65535 && (e3 += 2);
    }
    return e3;
  };
}, 526: (t2) => {
  var e2 = { utf8: { stringToBytes: function(t3) {
    return e2.bin.stringToBytes(unescape(encodeURIComponent(t3)));
  }, bytesToString: function(t3) {
    return decodeURIComponent(escape(e2.bin.bytesToString(t3)));
  } }, bin: { stringToBytes: function(t3) {
    for (var e3 = [], n2 = 0; n2 < t3.length; n2++)
      e3.push(255 & t3.charCodeAt(n2));
    return e3;
  }, bytesToString: function(t3) {
    for (var e3 = [], n2 = 0; n2 < t3.length; n2++)
      e3.push(String.fromCharCode(t3[n2]));
    return e3.join("");
  } } };
  t2.exports = e2;
}, 298: (t2) => {
  var e2, n2;
  e2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n2 = { rotl: function(t3, e3) {
    return t3 << e3 | t3 >>> 32 - e3;
  }, rotr: function(t3, e3) {
    return t3 << 32 - e3 | t3 >>> e3;
  }, endian: function(t3) {
    if (t3.constructor == Number)
      return 16711935 & n2.rotl(t3, 8) | 4278255360 & n2.rotl(t3, 24);
    for (var e3 = 0; e3 < t3.length; e3++)
      t3[e3] = n2.endian(t3[e3]);
    return t3;
  }, randomBytes: function(t3) {
    for (var e3 = []; t3 > 0; t3--)
      e3.push(Math.floor(256 * Math.random()));
    return e3;
  }, bytesToWords: function(t3) {
    for (var e3 = [], n3 = 0, r2 = 0; n3 < t3.length; n3++, r2 += 8)
      e3[r2 >>> 5] |= t3[n3] << 24 - r2 % 32;
    return e3;
  }, wordsToBytes: function(t3) {
    for (var e3 = [], n3 = 0; n3 < 32 * t3.length; n3 += 8)
      e3.push(t3[n3 >>> 5] >>> 24 - n3 % 32 & 255);
    return e3;
  }, bytesToHex: function(t3) {
    for (var e3 = [], n3 = 0; n3 < t3.length; n3++)
      e3.push((t3[n3] >>> 4).toString(16)), e3.push((15 & t3[n3]).toString(16));
    return e3.join("");
  }, hexToBytes: function(t3) {
    for (var e3 = [], n3 = 0; n3 < t3.length; n3 += 2)
      e3.push(parseInt(t3.substr(n3, 2), 16));
    return e3;
  }, bytesToBase64: function(t3) {
    for (var n3 = [], r2 = 0; r2 < t3.length; r2 += 3)
      for (var o2 = t3[r2] << 16 | t3[r2 + 1] << 8 | t3[r2 + 2], i2 = 0; i2 < 4; i2++)
        8 * r2 + 6 * i2 <= 8 * t3.length ? n3.push(e2.charAt(o2 >>> 6 * (3 - i2) & 63)) : n3.push("=");
    return n3.join("");
  }, base64ToBytes: function(t3) {
    t3 = t3.replace(/[^A-Z0-9+\/]/gi, "");
    for (var n3 = [], r2 = 0, o2 = 0; r2 < t3.length; o2 = ++r2 % 4)
      0 != o2 && n3.push((e2.indexOf(t3.charAt(r2 - 1)) & Math.pow(2, -2 * o2 + 8) - 1) << 2 * o2 | e2.indexOf(t3.charAt(r2)) >>> 6 - 2 * o2);
    return n3;
  } }, t2.exports = n2;
}, 635: (t2, e2, n2) => {
  const r2 = n2(31), o2 = n2(338), i2 = n2(221);
  t2.exports = { XMLParser: o2, XMLValidator: r2, XMLBuilder: i2 };
}, 705: (t2, e2) => {
  const n2 = ":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", r2 = "[" + n2 + "][" + n2 + "\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*", o2 = new RegExp("^" + r2 + "$");
  e2.isExist = function(t3) {
    return void 0 !== t3;
  }, e2.isEmptyObject = function(t3) {
    return 0 === Object.keys(t3).length;
  }, e2.merge = function(t3, e3, n3) {
    if (e3) {
      const r3 = Object.keys(e3), o3 = r3.length;
      for (let i2 = 0; i2 < o3; i2++)
        t3[r3[i2]] = "strict" === n3 ? [e3[r3[i2]]] : e3[r3[i2]];
    }
  }, e2.getValue = function(t3) {
    return e2.isExist(t3) ? t3 : "";
  }, e2.isName = function(t3) {
    return !(null == o2.exec(t3));
  }, e2.getAllMatches = function(t3, e3) {
    const n3 = [];
    let r3 = e3.exec(t3);
    for (; r3; ) {
      const o3 = [];
      o3.startIndex = e3.lastIndex - r3[0].length;
      const i2 = r3.length;
      for (let t4 = 0; t4 < i2; t4++)
        o3.push(r3[t4]);
      n3.push(o3), r3 = e3.exec(t3);
    }
    return n3;
  }, e2.nameRegexp = r2;
}, 31: (t2, e2, n2) => {
  const r2 = n2(705), o2 = { allowBooleanAttributes: false, unpairedTags: [] };
  function i2(t3) {
    return " " === t3 || "	" === t3 || "\n" === t3 || "\r" === t3;
  }
  function s2(t3, e3) {
    const n3 = e3;
    for (; e3 < t3.length; e3++)
      if ("?" != t3[e3] && " " != t3[e3])
        ;
      else {
        const r3 = t3.substr(n3, e3 - n3);
        if (e3 > 5 && "xml" === r3)
          return d2("InvalidXml", "XML declaration allowed only at the start of the document.", m(t3, e3));
        if ("?" == t3[e3] && ">" == t3[e3 + 1]) {
          e3++;
          break;
        }
      }
    return e3;
  }
  function a2(t3, e3) {
    if (t3.length > e3 + 5 && "-" === t3[e3 + 1] && "-" === t3[e3 + 2]) {
      for (e3 += 3; e3 < t3.length; e3++)
        if ("-" === t3[e3] && "-" === t3[e3 + 1] && ">" === t3[e3 + 2]) {
          e3 += 2;
          break;
        }
    } else if (t3.length > e3 + 8 && "D" === t3[e3 + 1] && "O" === t3[e3 + 2] && "C" === t3[e3 + 3] && "T" === t3[e3 + 4] && "Y" === t3[e3 + 5] && "P" === t3[e3 + 6] && "E" === t3[e3 + 7]) {
      let n3 = 1;
      for (e3 += 8; e3 < t3.length; e3++)
        if ("<" === t3[e3])
          n3++;
        else if (">" === t3[e3] && (n3--, 0 === n3))
          break;
    } else if (t3.length > e3 + 9 && "[" === t3[e3 + 1] && "C" === t3[e3 + 2] && "D" === t3[e3 + 3] && "A" === t3[e3 + 4] && "T" === t3[e3 + 5] && "A" === t3[e3 + 6] && "[" === t3[e3 + 7]) {
      for (e3 += 8; e3 < t3.length; e3++)
        if ("]" === t3[e3] && "]" === t3[e3 + 1] && ">" === t3[e3 + 2]) {
          e3 += 2;
          break;
        }
    }
    return e3;
  }
  e2.validate = function(t3, e3) {
    e3 = Object.assign({}, o2, e3);
    const n3 = [];
    let c3 = false, u3 = false;
    "\uFEFF" === t3[0] && (t3 = t3.substr(1));
    for (let o3 = 0; o3 < t3.length; o3++)
      if ("<" === t3[o3] && "?" === t3[o3 + 1]) {
        if (o3 += 2, o3 = s2(t3, o3), o3.err)
          return o3;
      } else {
        if ("<" !== t3[o3]) {
          if (i2(t3[o3]))
            continue;
          return d2("InvalidChar", "char '" + t3[o3] + "' is not expected.", m(t3, o3));
        }
        {
          let g2 = o3;
          if (o3++, "!" === t3[o3]) {
            o3 = a2(t3, o3);
            continue;
          }
          {
            let v2 = false;
            "/" === t3[o3] && (v2 = true, o3++);
            let y = "";
            for (; o3 < t3.length && ">" !== t3[o3] && " " !== t3[o3] && "	" !== t3[o3] && "\n" !== t3[o3] && "\r" !== t3[o3]; o3++)
              y += t3[o3];
            if (y = y.trim(), "/" === y[y.length - 1] && (y = y.substring(0, y.length - 1), o3--), h3 = y, !r2.isName(h3)) {
              let e4;
              return e4 = 0 === y.trim().length ? "Invalid space after '<'." : "Tag '" + y + "' is an invalid name.", d2("InvalidTag", e4, m(t3, o3));
            }
            const b = l2(t3, o3);
            if (false === b)
              return d2("InvalidAttr", "Attributes for '" + y + "' have open quote.", m(t3, o3));
            let w = b.value;
            if (o3 = b.index, "/" === w[w.length - 1]) {
              const n4 = o3 - w.length;
              w = w.substring(0, w.length - 1);
              const r3 = p2(w, e3);
              if (true !== r3)
                return d2(r3.err.code, r3.err.msg, m(t3, n4 + r3.err.line));
              c3 = true;
            } else if (v2) {
              if (!b.tagClosed)
                return d2("InvalidTag", "Closing tag '" + y + "' doesn't have proper closing.", m(t3, o3));
              if (w.trim().length > 0)
                return d2("InvalidTag", "Closing tag '" + y + "' can't have attributes or invalid starting.", m(t3, g2));
              {
                const e4 = n3.pop();
                if (y !== e4.tagName) {
                  let n4 = m(t3, e4.tagStartPos);
                  return d2("InvalidTag", "Expected closing tag '" + e4.tagName + "' (opened in line " + n4.line + ", col " + n4.col + ") instead of closing tag '" + y + "'.", m(t3, g2));
                }
                0 == n3.length && (u3 = true);
              }
            } else {
              const r3 = p2(w, e3);
              if (true !== r3)
                return d2(r3.err.code, r3.err.msg, m(t3, o3 - w.length + r3.err.line));
              if (true === u3)
                return d2("InvalidXml", "Multiple possible root nodes found.", m(t3, o3));
              -1 !== e3.unpairedTags.indexOf(y) || n3.push({ tagName: y, tagStartPos: g2 }), c3 = true;
            }
            for (o3++; o3 < t3.length; o3++)
              if ("<" === t3[o3]) {
                if ("!" === t3[o3 + 1]) {
                  o3++, o3 = a2(t3, o3);
                  continue;
                }
                if ("?" !== t3[o3 + 1])
                  break;
                if (o3 = s2(t3, ++o3), o3.err)
                  return o3;
              } else if ("&" === t3[o3]) {
                const e4 = f2(t3, o3);
                if (-1 == e4)
                  return d2("InvalidChar", "char '&' is not expected.", m(t3, o3));
                o3 = e4;
              } else if (true === u3 && !i2(t3[o3]))
                return d2("InvalidXml", "Extra text at the end", m(t3, o3));
            "<" === t3[o3] && o3--;
          }
        }
      }
    var h3;
    return c3 ? 1 == n3.length ? d2("InvalidTag", "Unclosed tag '" + n3[0].tagName + "'.", m(t3, n3[0].tagStartPos)) : !(n3.length > 0) || d2("InvalidXml", "Invalid '" + JSON.stringify(n3.map((t4) => t4.tagName), null, 4).replace(/\r?\n/g, "") + "' found.", { line: 1, col: 1 }) : d2("InvalidXml", "Start tag expected.", 1);
  };
  const c2 = '"', u2 = "'";
  function l2(t3, e3) {
    let n3 = "", r3 = "", o3 = false;
    for (; e3 < t3.length; e3++) {
      if (t3[e3] === c2 || t3[e3] === u2)
        "" === r3 ? r3 = t3[e3] : r3 !== t3[e3] || (r3 = "");
      else if (">" === t3[e3] && "" === r3) {
        o3 = true;
        break;
      }
      n3 += t3[e3];
    }
    return "" === r3 && { value: n3, index: e3, tagClosed: o3 };
  }
  const h2 = new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`, "g");
  function p2(t3, e3) {
    const n3 = r2.getAllMatches(t3, h2), o3 = {};
    for (let t4 = 0; t4 < n3.length; t4++) {
      if (0 === n3[t4][1].length)
        return d2("InvalidAttr", "Attribute '" + n3[t4][2] + "' has no space in starting.", v(n3[t4]));
      if (void 0 !== n3[t4][3] && void 0 === n3[t4][4])
        return d2("InvalidAttr", "Attribute '" + n3[t4][2] + "' is without value.", v(n3[t4]));
      if (void 0 === n3[t4][3] && !e3.allowBooleanAttributes)
        return d2("InvalidAttr", "boolean attribute '" + n3[t4][2] + "' is not allowed.", v(n3[t4]));
      const r3 = n3[t4][2];
      if (!g(r3))
        return d2("InvalidAttr", "Attribute '" + r3 + "' is an invalid name.", v(n3[t4]));
      if (o3.hasOwnProperty(r3))
        return d2("InvalidAttr", "Attribute '" + r3 + "' is repeated.", v(n3[t4]));
      o3[r3] = 1;
    }
    return true;
  }
  function f2(t3, e3) {
    if (";" === t3[++e3])
      return -1;
    if ("#" === t3[e3])
      return function(t4, e4) {
        let n4 = /\d/;
        for ("x" === t4[e4] && (e4++, n4 = /[\da-fA-F]/); e4 < t4.length; e4++) {
          if (";" === t4[e4])
            return e4;
          if (!t4[e4].match(n4))
            break;
        }
        return -1;
      }(t3, ++e3);
    let n3 = 0;
    for (; e3 < t3.length; e3++, n3++)
      if (!(t3[e3].match(/\w/) && n3 < 20)) {
        if (";" === t3[e3])
          break;
        return -1;
      }
    return e3;
  }
  function d2(t3, e3, n3) {
    return { err: { code: t3, msg: e3, line: n3.line || n3, col: n3.col } };
  }
  function g(t3) {
    return r2.isName(t3);
  }
  function m(t3, e3) {
    const n3 = t3.substring(0, e3).split(/\r?\n/);
    return { line: n3.length, col: n3[n3.length - 1].length + 1 };
  }
  function v(t3) {
    return t3.startIndex + t3[1].length;
  }
}, 221: (t2, e2, n2) => {
  const r2 = n2(87), o2 = { attributeNamePrefix: "@_", attributesGroupName: false, textNodeName: "#text", ignoreAttributes: true, cdataPropName: false, format: false, indentBy: "  ", suppressEmptyNode: false, suppressUnpairedNode: true, suppressBooleanAttributes: true, tagValueProcessor: function(t3, e3) {
    return e3;
  }, attributeValueProcessor: function(t3, e3) {
    return e3;
  }, preserveOrder: false, commentPropName: false, unpairedTags: [], entities: [{ regex: new RegExp("&", "g"), val: "&amp;" }, { regex: new RegExp(">", "g"), val: "&gt;" }, { regex: new RegExp("<", "g"), val: "&lt;" }, { regex: new RegExp("'", "g"), val: "&apos;" }, { regex: new RegExp('"', "g"), val: "&quot;" }], processEntities: true, stopNodes: [], oneListGroup: false };
  function i2(t3) {
    this.options = Object.assign({}, o2, t3), this.options.ignoreAttributes || this.options.attributesGroupName ? this.isAttribute = function() {
      return false;
    } : (this.attrPrefixLen = this.options.attributeNamePrefix.length, this.isAttribute = c2), this.processTextOrObjNode = s2, this.options.format ? (this.indentate = a2, this.tagEndChar = ">\n", this.newLine = "\n") : (this.indentate = function() {
      return "";
    }, this.tagEndChar = ">", this.newLine = "");
  }
  function s2(t3, e3, n3) {
    const r3 = this.j2x(t3, n3 + 1);
    return void 0 !== t3[this.options.textNodeName] && 1 === Object.keys(t3).length ? this.buildTextValNode(t3[this.options.textNodeName], e3, r3.attrStr, n3) : this.buildObjectNode(r3.val, e3, r3.attrStr, n3);
  }
  function a2(t3) {
    return this.options.indentBy.repeat(t3);
  }
  function c2(t3) {
    return !(!t3.startsWith(this.options.attributeNamePrefix) || t3 === this.options.textNodeName) && t3.substr(this.attrPrefixLen);
  }
  i2.prototype.build = function(t3) {
    return this.options.preserveOrder ? r2(t3, this.options) : (Array.isArray(t3) && this.options.arrayNodeName && this.options.arrayNodeName.length > 1 && (t3 = { [this.options.arrayNodeName]: t3 }), this.j2x(t3, 0).val);
  }, i2.prototype.j2x = function(t3, e3) {
    let n3 = "", r3 = "";
    for (let o3 in t3)
      if (void 0 === t3[o3])
        this.isAttribute(o3) && (r3 += "");
      else if (null === t3[o3])
        this.isAttribute(o3) ? r3 += "" : "?" === o3[0] ? r3 += this.indentate(e3) + "<" + o3 + "?" + this.tagEndChar : r3 += this.indentate(e3) + "<" + o3 + "/" + this.tagEndChar;
      else if (t3[o3] instanceof Date)
        r3 += this.buildTextValNode(t3[o3], o3, "", e3);
      else if ("object" != typeof t3[o3]) {
        const i3 = this.isAttribute(o3);
        if (i3)
          n3 += this.buildAttrPairStr(i3, "" + t3[o3]);
        else if (o3 === this.options.textNodeName) {
          let e4 = this.options.tagValueProcessor(o3, "" + t3[o3]);
          r3 += this.replaceEntitiesValue(e4);
        } else
          r3 += this.buildTextValNode(t3[o3], o3, "", e3);
      } else if (Array.isArray(t3[o3])) {
        const n4 = t3[o3].length;
        let i3 = "";
        for (let s3 = 0; s3 < n4; s3++) {
          const n5 = t3[o3][s3];
          void 0 === n5 || (null === n5 ? "?" === o3[0] ? r3 += this.indentate(e3) + "<" + o3 + "?" + this.tagEndChar : r3 += this.indentate(e3) + "<" + o3 + "/" + this.tagEndChar : "object" == typeof n5 ? this.options.oneListGroup ? i3 += this.j2x(n5, e3 + 1).val : i3 += this.processTextOrObjNode(n5, o3, e3) : i3 += this.buildTextValNode(n5, o3, "", e3));
        }
        this.options.oneListGroup && (i3 = this.buildObjectNode(i3, o3, "", e3)), r3 += i3;
      } else if (this.options.attributesGroupName && o3 === this.options.attributesGroupName) {
        const e4 = Object.keys(t3[o3]), r4 = e4.length;
        for (let i3 = 0; i3 < r4; i3++)
          n3 += this.buildAttrPairStr(e4[i3], "" + t3[o3][e4[i3]]);
      } else
        r3 += this.processTextOrObjNode(t3[o3], o3, e3);
    return { attrStr: n3, val: r3 };
  }, i2.prototype.buildAttrPairStr = function(t3, e3) {
    return e3 = this.options.attributeValueProcessor(t3, "" + e3), e3 = this.replaceEntitiesValue(e3), this.options.suppressBooleanAttributes && "true" === e3 ? " " + t3 : " " + t3 + '="' + e3 + '"';
  }, i2.prototype.buildObjectNode = function(t3, e3, n3, r3) {
    if ("" === t3)
      return "?" === e3[0] ? this.indentate(r3) + "<" + e3 + n3 + "?" + this.tagEndChar : this.indentate(r3) + "<" + e3 + n3 + this.closeTag(e3) + this.tagEndChar;
    {
      let o3 = "</" + e3 + this.tagEndChar, i3 = "";
      return "?" === e3[0] && (i3 = "?", o3 = ""), !n3 && "" !== n3 || -1 !== t3.indexOf("<") ? false !== this.options.commentPropName && e3 === this.options.commentPropName && 0 === i3.length ? this.indentate(r3) + "<!--".concat(t3, "-->") + this.newLine : this.indentate(r3) + "<" + e3 + n3 + i3 + this.tagEndChar + t3 + this.indentate(r3) + o3 : this.indentate(r3) + "<" + e3 + n3 + i3 + ">" + t3 + o3;
    }
  }, i2.prototype.closeTag = function(t3) {
    let e3 = "";
    return -1 !== this.options.unpairedTags.indexOf(t3) ? this.options.suppressUnpairedNode || (e3 = "/") : e3 = this.options.suppressEmptyNode ? "/" : "></".concat(t3), e3;
  }, i2.prototype.buildTextValNode = function(t3, e3, n3, r3) {
    if (false !== this.options.cdataPropName && e3 === this.options.cdataPropName)
      return this.indentate(r3) + "<![CDATA[".concat(t3, "]]>") + this.newLine;
    if (false !== this.options.commentPropName && e3 === this.options.commentPropName)
      return this.indentate(r3) + "<!--".concat(t3, "-->") + this.newLine;
    if ("?" === e3[0])
      return this.indentate(r3) + "<" + e3 + n3 + "?" + this.tagEndChar;
    {
      let o3 = this.options.tagValueProcessor(e3, t3);
      return o3 = this.replaceEntitiesValue(o3), "" === o3 ? this.indentate(r3) + "<" + e3 + n3 + this.closeTag(e3) + this.tagEndChar : this.indentate(r3) + "<" + e3 + n3 + ">" + o3 + "</" + e3 + this.tagEndChar;
    }
  }, i2.prototype.replaceEntitiesValue = function(t3) {
    if (t3 && t3.length > 0 && this.options.processEntities)
      for (let e3 = 0; e3 < this.options.entities.length; e3++) {
        const n3 = this.options.entities[e3];
        t3 = t3.replace(n3.regex, n3.val);
      }
    return t3;
  }, t2.exports = i2;
}, 87: (t2) => {
  function e2(t3, s2, a2, c2) {
    let u2 = "", l2 = false;
    for (let h2 = 0; h2 < t3.length; h2++) {
      const p2 = t3[h2], f2 = n2(p2);
      let d2 = "";
      if (d2 = 0 === a2.length ? f2 : "".concat(a2, ".").concat(f2), f2 === s2.textNodeName) {
        let t4 = p2[f2];
        o2(d2, s2) || (t4 = s2.tagValueProcessor(f2, t4), t4 = i2(t4, s2)), l2 && (u2 += c2), u2 += t4, l2 = false;
        continue;
      }
      if (f2 === s2.cdataPropName) {
        l2 && (u2 += c2), u2 += "<![CDATA[".concat(p2[f2][0][s2.textNodeName], "]]>"), l2 = false;
        continue;
      }
      if (f2 === s2.commentPropName) {
        u2 += c2 + "<!--".concat(p2[f2][0][s2.textNodeName], "-->"), l2 = true;
        continue;
      }
      if ("?" === f2[0]) {
        const t4 = r2(p2[":@"], s2), e3 = "?xml" === f2 ? "" : c2;
        let n3 = p2[f2][0][s2.textNodeName];
        n3 = 0 !== n3.length ? " " + n3 : "", u2 += e3 + "<".concat(f2).concat(n3).concat(t4, "?>"), l2 = true;
        continue;
      }
      let g = c2;
      "" !== g && (g += s2.indentBy);
      const m = r2(p2[":@"], s2), v = c2 + "<".concat(f2).concat(m), y = e2(p2[f2], s2, d2, g);
      -1 !== s2.unpairedTags.indexOf(f2) ? s2.suppressUnpairedNode ? u2 += v + ">" : u2 += v + "/>" : y && 0 !== y.length || !s2.suppressEmptyNode ? y && y.endsWith(">") ? u2 += v + ">".concat(y).concat(c2, "</").concat(f2, ">") : (u2 += v + ">", y && "" !== c2 && (y.includes("/>") || y.includes("</")) ? u2 += c2 + s2.indentBy + y + c2 : u2 += y, u2 += "</".concat(f2, ">")) : u2 += v + "/>", l2 = true;
    }
    return u2;
  }
  function n2(t3) {
    const e3 = Object.keys(t3);
    for (let t4 = 0; t4 < e3.length; t4++) {
      const n3 = e3[t4];
      if (":@" !== n3)
        return n3;
    }
  }
  function r2(t3, e3) {
    let n3 = "";
    if (t3 && !e3.ignoreAttributes)
      for (let r3 in t3) {
        let o3 = e3.attributeValueProcessor(r3, t3[r3]);
        o3 = i2(o3, e3), true === o3 && e3.suppressBooleanAttributes ? n3 += " ".concat(r3.substr(e3.attributeNamePrefix.length)) : n3 += " ".concat(r3.substr(e3.attributeNamePrefix.length), '="').concat(o3, '"');
      }
    return n3;
  }
  function o2(t3, e3) {
    let n3 = (t3 = t3.substr(0, t3.length - e3.textNodeName.length - 1)).substr(t3.lastIndexOf(".") + 1);
    for (let r3 in e3.stopNodes)
      if (e3.stopNodes[r3] === t3 || e3.stopNodes[r3] === "*." + n3)
        return true;
    return false;
  }
  function i2(t3, e3) {
    if (t3 && t3.length > 0 && e3.processEntities)
      for (let n3 = 0; n3 < e3.entities.length; n3++) {
        const r3 = e3.entities[n3];
        t3 = t3.replace(r3.regex, r3.val);
      }
    return t3;
  }
  t2.exports = function(t3, n3) {
    let r3 = "";
    return n3.format && n3.indentBy.length > 0 && (r3 = "\n"), e2(t3, n3, "", r3);
  };
}, 193: (t2, e2, n2) => {
  const r2 = n2(705);
  function o2(t3, e3) {
    let n3 = "";
    for (; e3 < t3.length && "'" !== t3[e3] && '"' !== t3[e3]; e3++)
      n3 += t3[e3];
    if (n3 = n3.trim(), -1 !== n3.indexOf(" "))
      throw new Error("External entites are not supported");
    const r3 = t3[e3++];
    let o3 = "";
    for (; e3 < t3.length && t3[e3] !== r3; e3++)
      o3 += t3[e3];
    return [n3, o3, e3];
  }
  function i2(t3, e3) {
    return "!" === t3[e3 + 1] && "-" === t3[e3 + 2] && "-" === t3[e3 + 3];
  }
  function s2(t3, e3) {
    return "!" === t3[e3 + 1] && "E" === t3[e3 + 2] && "N" === t3[e3 + 3] && "T" === t3[e3 + 4] && "I" === t3[e3 + 5] && "T" === t3[e3 + 6] && "Y" === t3[e3 + 7];
  }
  function a2(t3, e3) {
    return "!" === t3[e3 + 1] && "E" === t3[e3 + 2] && "L" === t3[e3 + 3] && "E" === t3[e3 + 4] && "M" === t3[e3 + 5] && "E" === t3[e3 + 6] && "N" === t3[e3 + 7] && "T" === t3[e3 + 8];
  }
  function c2(t3, e3) {
    return "!" === t3[e3 + 1] && "A" === t3[e3 + 2] && "T" === t3[e3 + 3] && "T" === t3[e3 + 4] && "L" === t3[e3 + 5] && "I" === t3[e3 + 6] && "S" === t3[e3 + 7] && "T" === t3[e3 + 8];
  }
  function u2(t3, e3) {
    return "!" === t3[e3 + 1] && "N" === t3[e3 + 2] && "O" === t3[e3 + 3] && "T" === t3[e3 + 4] && "A" === t3[e3 + 5] && "T" === t3[e3 + 6] && "I" === t3[e3 + 7] && "O" === t3[e3 + 8] && "N" === t3[e3 + 9];
  }
  function l2(t3) {
    if (r2.isName(t3))
      return t3;
    throw new Error("Invalid entity name ".concat(t3));
  }
  t2.exports = function(t3, e3) {
    const n3 = {};
    if ("O" !== t3[e3 + 3] || "C" !== t3[e3 + 4] || "T" !== t3[e3 + 5] || "Y" !== t3[e3 + 6] || "P" !== t3[e3 + 7] || "E" !== t3[e3 + 8])
      throw new Error("Invalid Tag instead of DOCTYPE");
    {
      e3 += 9;
      let r3 = 1, h2 = false, p2 = false, f2 = "";
      for (; e3 < t3.length; e3++)
        if ("<" !== t3[e3] || p2)
          if (">" === t3[e3]) {
            if (p2 ? "-" === t3[e3 - 1] && "-" === t3[e3 - 2] && (p2 = false, r3--) : r3--, 0 === r3)
              break;
          } else
            "[" === t3[e3] ? h2 = true : f2 += t3[e3];
        else {
          if (h2 && s2(t3, e3))
            e3 += 7, [entityName, val, e3] = o2(t3, e3 + 1), -1 === val.indexOf("&") && (n3[l2(entityName)] = { regx: RegExp("&".concat(entityName, ";"), "g"), val });
          else if (h2 && a2(t3, e3))
            e3 += 8;
          else if (h2 && c2(t3, e3))
            e3 += 8;
          else if (h2 && u2(t3, e3))
            e3 += 9;
          else {
            if (!i2)
              throw new Error("Invalid DOCTYPE");
            p2 = true;
          }
          r3++, f2 = "";
        }
      if (0 !== r3)
        throw new Error("Unclosed DOCTYPE");
    }
    return { entities: n3, i: e3 };
  };
}, 63: (t2, e2) => {
  const n2 = { preserveOrder: false, attributeNamePrefix: "@_", attributesGroupName: false, textNodeName: "#text", ignoreAttributes: true, removeNSPrefix: false, allowBooleanAttributes: false, parseTagValue: true, parseAttributeValue: false, trimValues: true, cdataPropName: false, numberParseOptions: { hex: true, leadingZeros: true, eNotation: true }, tagValueProcessor: function(t3, e3) {
    return e3;
  }, attributeValueProcessor: function(t3, e3) {
    return e3;
  }, stopNodes: [], alwaysCreateTextNode: false, isArray: () => false, commentPropName: false, unpairedTags: [], processEntities: true, htmlEntities: false, ignoreDeclaration: false, ignorePiTags: false, transformTagName: false, transformAttributeName: false, updateTag: function(t3, e3, n3) {
    return t3;
  } };
  e2.buildOptions = function(t3) {
    return Object.assign({}, n2, t3);
  }, e2.defaultOptions = n2;
}, 299: (t2, e2, n2) => {
  const r2 = n2(705), o2 = n2(365), i2 = n2(193), s2 = n2(494);
  function a2(t3) {
    const e3 = Object.keys(t3);
    for (let n3 = 0; n3 < e3.length; n3++) {
      const r3 = e3[n3];
      this.lastEntities[r3] = { regex: new RegExp("&" + r3 + ";", "g"), val: t3[r3] };
    }
  }
  function c2(t3, e3, n3, r3, o3, i3, s3) {
    if (void 0 !== t3 && (this.options.trimValues && !r3 && (t3 = t3.trim()), t3.length > 0)) {
      s3 || (t3 = this.replaceEntitiesValue(t3));
      const r4 = this.options.tagValueProcessor(e3, t3, n3, o3, i3);
      return null == r4 ? t3 : typeof r4 != typeof t3 || r4 !== t3 ? r4 : this.options.trimValues || t3.trim() === t3 ? w(t3, this.options.parseTagValue, this.options.numberParseOptions) : t3;
    }
  }
  function u2(t3) {
    if (this.options.removeNSPrefix) {
      const e3 = t3.split(":"), n3 = "/" === t3.charAt(0) ? "/" : "";
      if ("xmlns" === e3[0])
        return "";
      2 === e3.length && (t3 = n3 + e3[1]);
    }
    return t3;
  }
  "<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)".replace(/NAME/g, r2.nameRegexp);
  const l2 = new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`, "gm");
  function h2(t3, e3, n3) {
    if (!this.options.ignoreAttributes && "string" == typeof t3) {
      const n4 = r2.getAllMatches(t3, l2), o3 = n4.length, i3 = {};
      for (let t4 = 0; t4 < o3; t4++) {
        const r3 = this.resolveNameSpace(n4[t4][1]);
        let o4 = n4[t4][4], s3 = this.options.attributeNamePrefix + r3;
        if (r3.length)
          if (this.options.transformAttributeName && (s3 = this.options.transformAttributeName(s3)), "__proto__" === s3 && (s3 = "#__proto__"), void 0 !== o4) {
            this.options.trimValues && (o4 = o4.trim()), o4 = this.replaceEntitiesValue(o4);
            const t5 = this.options.attributeValueProcessor(r3, o4, e3);
            i3[s3] = null == t5 ? o4 : typeof t5 != typeof o4 || t5 !== o4 ? t5 : w(o4, this.options.parseAttributeValue, this.options.numberParseOptions);
          } else
            this.options.allowBooleanAttributes && (i3[s3] = true);
      }
      if (!Object.keys(i3).length)
        return;
      if (this.options.attributesGroupName) {
        const t4 = {};
        return t4[this.options.attributesGroupName] = i3, t4;
      }
      return i3;
    }
  }
  const p2 = function(t3) {
    t3 = t3.replace(/\r\n?/g, "\n");
    const e3 = new o2("!xml");
    let n3 = e3, r3 = "", s3 = "";
    for (let a3 = 0; a3 < t3.length; a3++)
      if ("<" === t3[a3])
        if ("/" === t3[a3 + 1]) {
          const e4 = v(t3, ">", a3, "Closing Tag is not closed.");
          let o3 = t3.substring(a3 + 2, e4).trim();
          if (this.options.removeNSPrefix) {
            const t4 = o3.indexOf(":");
            -1 !== t4 && (o3 = o3.substr(t4 + 1));
          }
          this.options.transformTagName && (o3 = this.options.transformTagName(o3)), n3 && (r3 = this.saveTextToParentTag(r3, n3, s3));
          const i3 = s3.substring(s3.lastIndexOf(".") + 1);
          if (o3 && -1 !== this.options.unpairedTags.indexOf(o3))
            throw new Error("Unpaired tag can not be used as closing tag: </".concat(o3, ">"));
          let c3 = 0;
          i3 && -1 !== this.options.unpairedTags.indexOf(i3) ? (c3 = s3.lastIndexOf(".", s3.lastIndexOf(".") - 1), this.tagsNodeStack.pop()) : c3 = s3.lastIndexOf("."), s3 = s3.substring(0, c3), n3 = this.tagsNodeStack.pop(), r3 = "", a3 = e4;
        } else if ("?" === t3[a3 + 1]) {
          let e4 = y(t3, a3, false, "?>");
          if (!e4)
            throw new Error("Pi Tag is not closed.");
          if (r3 = this.saveTextToParentTag(r3, n3, s3), this.options.ignoreDeclaration && "?xml" === e4.tagName || this.options.ignorePiTags)
            ;
          else {
            const t4 = new o2(e4.tagName);
            t4.add(this.options.textNodeName, ""), e4.tagName !== e4.tagExp && e4.attrExpPresent && (t4[":@"] = this.buildAttributesMap(e4.tagExp, s3, e4.tagName)), this.addChild(n3, t4, s3);
          }
          a3 = e4.closeIndex + 1;
        } else if ("!--" === t3.substr(a3 + 1, 3)) {
          const e4 = v(t3, "-->", a3 + 4, "Comment is not closed.");
          if (this.options.commentPropName) {
            const o3 = t3.substring(a3 + 4, e4 - 2);
            r3 = this.saveTextToParentTag(r3, n3, s3), n3.add(this.options.commentPropName, [{ [this.options.textNodeName]: o3 }]);
          }
          a3 = e4;
        } else if ("!D" === t3.substr(a3 + 1, 2)) {
          const e4 = i2(t3, a3);
          this.docTypeEntities = e4.entities, a3 = e4.i;
        } else if ("![" === t3.substr(a3 + 1, 2)) {
          const e4 = v(t3, "]]>", a3, "CDATA is not closed.") - 2, o3 = t3.substring(a3 + 9, e4);
          if (r3 = this.saveTextToParentTag(r3, n3, s3), this.options.cdataPropName)
            n3.add(this.options.cdataPropName, [{ [this.options.textNodeName]: o3 }]);
          else {
            let t4 = this.parseTextData(o3, n3.tagname, s3, true, false, true);
            null == t4 && (t4 = ""), n3.add(this.options.textNodeName, t4);
          }
          a3 = e4 + 2;
        } else {
          let i3 = y(t3, a3, this.options.removeNSPrefix), c3 = i3.tagName, u3 = i3.tagExp, l3 = i3.attrExpPresent, h3 = i3.closeIndex;
          this.options.transformTagName && (c3 = this.options.transformTagName(c3)), n3 && r3 && "!xml" !== n3.tagname && (r3 = this.saveTextToParentTag(r3, n3, s3, false));
          const p3 = n3;
          if (p3 && -1 !== this.options.unpairedTags.indexOf(p3.tagname) && (n3 = this.tagsNodeStack.pop(), s3 = s3.substring(0, s3.lastIndexOf("."))), c3 !== e3.tagname && (s3 += s3 ? "." + c3 : c3), this.isItStopNode(this.options.stopNodes, s3, c3)) {
            let e4 = "";
            if (u3.length > 0 && u3.lastIndexOf("/") === u3.length - 1)
              a3 = i3.closeIndex;
            else if (-1 !== this.options.unpairedTags.indexOf(c3))
              a3 = i3.closeIndex;
            else {
              const n4 = this.readStopNodeData(t3, c3, h3 + 1);
              if (!n4)
                throw new Error("Unexpected end of ".concat(c3));
              a3 = n4.i, e4 = n4.tagContent;
            }
            const r4 = new o2(c3);
            c3 !== u3 && l3 && (r4[":@"] = this.buildAttributesMap(u3, s3, c3)), e4 && (e4 = this.parseTextData(e4, c3, s3, true, l3, true, true)), s3 = s3.substr(0, s3.lastIndexOf(".")), r4.add(this.options.textNodeName, e4), this.addChild(n3, r4, s3);
          } else {
            if (u3.length > 0 && u3.lastIndexOf("/") === u3.length - 1) {
              "/" === c3[c3.length - 1] ? (c3 = c3.substr(0, c3.length - 1), s3 = s3.substr(0, s3.length - 1), u3 = c3) : u3 = u3.substr(0, u3.length - 1), this.options.transformTagName && (c3 = this.options.transformTagName(c3));
              const t4 = new o2(c3);
              c3 !== u3 && l3 && (t4[":@"] = this.buildAttributesMap(u3, s3, c3)), this.addChild(n3, t4, s3), s3 = s3.substr(0, s3.lastIndexOf("."));
            } else {
              const t4 = new o2(c3);
              this.tagsNodeStack.push(n3), c3 !== u3 && l3 && (t4[":@"] = this.buildAttributesMap(u3, s3, c3)), this.addChild(n3, t4, s3), n3 = t4;
            }
            r3 = "", a3 = h3;
          }
        }
      else
        r3 += t3[a3];
    return e3.child;
  };
  function f2(t3, e3, n3) {
    const r3 = this.options.updateTag(e3.tagname, n3, e3[":@"]);
    false === r3 || ("string" == typeof r3 ? (e3.tagname = r3, t3.addChild(e3)) : t3.addChild(e3));
  }
  const d2 = function(t3) {
    if (this.options.processEntities) {
      for (let e3 in this.docTypeEntities) {
        const n3 = this.docTypeEntities[e3];
        t3 = t3.replace(n3.regx, n3.val);
      }
      for (let e3 in this.lastEntities) {
        const n3 = this.lastEntities[e3];
        t3 = t3.replace(n3.regex, n3.val);
      }
      if (this.options.htmlEntities)
        for (let e3 in this.htmlEntities) {
          const n3 = this.htmlEntities[e3];
          t3 = t3.replace(n3.regex, n3.val);
        }
      t3 = t3.replace(this.ampEntity.regex, this.ampEntity.val);
    }
    return t3;
  };
  function g(t3, e3, n3, r3) {
    return t3 && (void 0 === r3 && (r3 = 0 === Object.keys(e3.child).length), void 0 !== (t3 = this.parseTextData(t3, e3.tagname, n3, false, !!e3[":@"] && 0 !== Object.keys(e3[":@"]).length, r3)) && "" !== t3 && e3.add(this.options.textNodeName, t3), t3 = ""), t3;
  }
  function m(t3, e3, n3) {
    const r3 = "*." + n3;
    for (const n4 in t3) {
      const o3 = t3[n4];
      if (r3 === o3 || e3 === o3)
        return true;
    }
    return false;
  }
  function v(t3, e3, n3, r3) {
    const o3 = t3.indexOf(e3, n3);
    if (-1 === o3)
      throw new Error(r3);
    return o3 + e3.length - 1;
  }
  function y(t3, e3, n3) {
    const r3 = function(t4, e4) {
      let n4, r4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ">", o4 = "";
      for (let i4 = e4; i4 < t4.length; i4++) {
        let e5 = t4[i4];
        if (n4)
          e5 === n4 && (n4 = "");
        else if ('"' === e5 || "'" === e5)
          n4 = e5;
        else if (e5 === r4[0]) {
          if (!r4[1])
            return { data: o4, index: i4 };
          if (t4[i4 + 1] === r4[1])
            return { data: o4, index: i4 };
        } else
          "	" === e5 && (e5 = " ");
        o4 += e5;
      }
    }(t3, e3 + 1, arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ">");
    if (!r3)
      return;
    let o3 = r3.data;
    const i3 = r3.index, s3 = o3.search(/\s/);
    let a3 = o3, c3 = true;
    if (-1 !== s3 && (a3 = o3.substr(0, s3).replace(/\s\s*$/, ""), o3 = o3.substr(s3 + 1)), n3) {
      const t4 = a3.indexOf(":");
      -1 !== t4 && (a3 = a3.substr(t4 + 1), c3 = a3 !== r3.data.substr(t4 + 1));
    }
    return { tagName: a3, tagExp: o3, closeIndex: i3, attrExpPresent: c3 };
  }
  function b(t3, e3, n3) {
    const r3 = n3;
    let o3 = 1;
    for (; n3 < t3.length; n3++)
      if ("<" === t3[n3])
        if ("/" === t3[n3 + 1]) {
          const i3 = v(t3, ">", n3, "".concat(e3, " is not closed"));
          if (t3.substring(n3 + 2, i3).trim() === e3 && (o3--, 0 === o3))
            return { tagContent: t3.substring(r3, n3), i: i3 };
          n3 = i3;
        } else if ("?" === t3[n3 + 1])
          n3 = v(t3, "?>", n3 + 1, "StopNode is not closed.");
        else if ("!--" === t3.substr(n3 + 1, 3))
          n3 = v(t3, "-->", n3 + 3, "StopNode is not closed.");
        else if ("![" === t3.substr(n3 + 1, 2))
          n3 = v(t3, "]]>", n3, "StopNode is not closed.") - 2;
        else {
          const r4 = y(t3, n3, ">");
          r4 && ((r4 && r4.tagName) === e3 && "/" !== r4.tagExp[r4.tagExp.length - 1] && o3++, n3 = r4.closeIndex);
        }
  }
  function w(t3, e3, n3) {
    if (e3 && "string" == typeof t3) {
      const e4 = t3.trim();
      return "true" === e4 || "false" !== e4 && s2(t3, n3);
    }
    return r2.isExist(t3) ? t3 : "";
  }
  t2.exports = class {
    constructor(t3) {
      this.options = t3, this.currentNode = null, this.tagsNodeStack = [], this.docTypeEntities = {}, this.lastEntities = { apos: { regex: /&(apos|#39|#x27);/g, val: "'" }, gt: { regex: /&(gt|#62|#x3E);/g, val: ">" }, lt: { regex: /&(lt|#60|#x3C);/g, val: "<" }, quot: { regex: /&(quot|#34|#x22);/g, val: '"' } }, this.ampEntity = { regex: /&(amp|#38|#x26);/g, val: "&" }, this.htmlEntities = { space: { regex: /&(nbsp|#160);/g, val: " " }, cent: { regex: /&(cent|#162);/g, val: "¢" }, pound: { regex: /&(pound|#163);/g, val: "£" }, yen: { regex: /&(yen|#165);/g, val: "¥" }, euro: { regex: /&(euro|#8364);/g, val: "€" }, copyright: { regex: /&(copy|#169);/g, val: "©" }, reg: { regex: /&(reg|#174);/g, val: "®" }, inr: { regex: /&(inr|#8377);/g, val: "₹" } }, this.addExternalEntities = a2, this.parseXml = p2, this.parseTextData = c2, this.resolveNameSpace = u2, this.buildAttributesMap = h2, this.isItStopNode = m, this.replaceEntitiesValue = d2, this.readStopNodeData = b, this.saveTextToParentTag = g, this.addChild = f2;
    }
  };
}, 338: (t2, e2, n2) => {
  const { buildOptions: r2 } = n2(63), o2 = n2(299), { prettify: i2 } = n2(728), s2 = n2(31);
  t2.exports = class {
    constructor(t3) {
      this.externalEntities = {}, this.options = r2(t3);
    }
    parse(t3, e3) {
      if ("string" == typeof t3)
        ;
      else {
        if (!t3.toString)
          throw new Error("XML data is accepted in String or Bytes[] form.");
        t3 = t3.toString();
      }
      if (e3) {
        true === e3 && (e3 = {});
        const n4 = s2.validate(t3, e3);
        if (true !== n4)
          throw Error("".concat(n4.err.msg, ":").concat(n4.err.line, ":").concat(n4.err.col));
      }
      const n3 = new o2(this.options);
      n3.addExternalEntities(this.externalEntities);
      const r3 = n3.parseXml(t3);
      return this.options.preserveOrder || void 0 === r3 ? r3 : i2(r3, this.options);
    }
    addEntity(t3, e3) {
      if (-1 !== e3.indexOf("&"))
        throw new Error("Entity value can't have '&'");
      if (-1 !== t3.indexOf("&") || -1 !== t3.indexOf(";"))
        throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");
      if ("&" === e3)
        throw new Error("An entity with value '&' is not permitted");
      this.externalEntities[t3] = e3;
    }
  };
}, 728: (t2, e2) => {
  function n2(t3, e3, s2) {
    let a2;
    const c2 = {};
    for (let u2 = 0; u2 < t3.length; u2++) {
      const l2 = t3[u2], h2 = r2(l2);
      let p2 = "";
      if (p2 = void 0 === s2 ? h2 : s2 + "." + h2, h2 === e3.textNodeName)
        void 0 === a2 ? a2 = l2[h2] : a2 += "" + l2[h2];
      else {
        if (void 0 === h2)
          continue;
        if (l2[h2]) {
          let t4 = n2(l2[h2], e3, p2);
          const r3 = i2(t4, e3);
          l2[":@"] ? o2(t4, l2[":@"], p2, e3) : 1 !== Object.keys(t4).length || void 0 === t4[e3.textNodeName] || e3.alwaysCreateTextNode ? 0 === Object.keys(t4).length && (e3.alwaysCreateTextNode ? t4[e3.textNodeName] = "" : t4 = "") : t4 = t4[e3.textNodeName], void 0 !== c2[h2] && c2.hasOwnProperty(h2) ? (Array.isArray(c2[h2]) || (c2[h2] = [c2[h2]]), c2[h2].push(t4)) : e3.isArray(h2, p2, r3) ? c2[h2] = [t4] : c2[h2] = t4;
        }
      }
    }
    return "string" == typeof a2 ? a2.length > 0 && (c2[e3.textNodeName] = a2) : void 0 !== a2 && (c2[e3.textNodeName] = a2), c2;
  }
  function r2(t3) {
    const e3 = Object.keys(t3);
    for (let t4 = 0; t4 < e3.length; t4++) {
      const n3 = e3[t4];
      if (":@" !== n3)
        return n3;
    }
  }
  function o2(t3, e3, n3, r3) {
    if (e3) {
      const o3 = Object.keys(e3), i3 = o3.length;
      for (let s2 = 0; s2 < i3; s2++) {
        const i4 = o3[s2];
        r3.isArray(i4, n3 + "." + i4, true, true) ? t3[i4] = [e3[i4]] : t3[i4] = e3[i4];
      }
    }
  }
  function i2(t3, e3) {
    const { textNodeName: n3 } = e3, r3 = Object.keys(t3).length;
    return 0 === r3 || !(1 !== r3 || !t3[n3] && "boolean" != typeof t3[n3] && 0 !== t3[n3]);
  }
  e2.prettify = function(t3, e3) {
    return n2(t3, e3);
  };
}, 365: (t2) => {
  t2.exports = class {
    constructor(t3) {
      this.tagname = t3, this.child = [], this[":@"] = {};
    }
    add(t3, e2) {
      "__proto__" === t3 && (t3 = "#__proto__"), this.child.push({ [t3]: e2 });
    }
    addChild(t3) {
      "__proto__" === t3.tagname && (t3.tagname = "#__proto__"), t3[":@"] && Object.keys(t3[":@"]).length > 0 ? this.child.push({ [t3.tagname]: t3.child, ":@": t3[":@"] }) : this.child.push({ [t3.tagname]: t3.child });
    }
  };
}, 135: (t2) => {
  function e2(t3) {
    return !!t3.constructor && "function" == typeof t3.constructor.isBuffer && t3.constructor.isBuffer(t3);
  }
  t2.exports = function(t3) {
    return null != t3 && (e2(t3) || function(t4) {
      return "function" == typeof t4.readFloatLE && "function" == typeof t4.slice && e2(t4.slice(0, 0));
    }(t3) || !!t3._isBuffer);
  };
}, 542: (t2, e2, n2) => {
  var r2, o2, i2, s2, a2;
  r2 = n2(298), o2 = n2(526).utf8, i2 = n2(135), s2 = n2(526).bin, (a2 = function(t3, e3) {
    t3.constructor == String ? t3 = e3 && "binary" === e3.encoding ? s2.stringToBytes(t3) : o2.stringToBytes(t3) : i2(t3) ? t3 = Array.prototype.slice.call(t3, 0) : Array.isArray(t3) || t3.constructor === Uint8Array || (t3 = t3.toString());
    for (var n3 = r2.bytesToWords(t3), c2 = 8 * t3.length, u2 = 1732584193, l2 = -271733879, h2 = -1732584194, p2 = 271733878, f2 = 0; f2 < n3.length; f2++)
      n3[f2] = 16711935 & (n3[f2] << 8 | n3[f2] >>> 24) | 4278255360 & (n3[f2] << 24 | n3[f2] >>> 8);
    n3[c2 >>> 5] |= 128 << c2 % 32, n3[14 + (c2 + 64 >>> 9 << 4)] = c2;
    var d2 = a2._ff, g = a2._gg, m = a2._hh, v = a2._ii;
    for (f2 = 0; f2 < n3.length; f2 += 16) {
      var y = u2, b = l2, w = h2, x = p2;
      u2 = d2(u2, l2, h2, p2, n3[f2 + 0], 7, -680876936), p2 = d2(p2, u2, l2, h2, n3[f2 + 1], 12, -389564586), h2 = d2(h2, p2, u2, l2, n3[f2 + 2], 17, 606105819), l2 = d2(l2, h2, p2, u2, n3[f2 + 3], 22, -1044525330), u2 = d2(u2, l2, h2, p2, n3[f2 + 4], 7, -176418897), p2 = d2(p2, u2, l2, h2, n3[f2 + 5], 12, 1200080426), h2 = d2(h2, p2, u2, l2, n3[f2 + 6], 17, -1473231341), l2 = d2(l2, h2, p2, u2, n3[f2 + 7], 22, -45705983), u2 = d2(u2, l2, h2, p2, n3[f2 + 8], 7, 1770035416), p2 = d2(p2, u2, l2, h2, n3[f2 + 9], 12, -1958414417), h2 = d2(h2, p2, u2, l2, n3[f2 + 10], 17, -42063), l2 = d2(l2, h2, p2, u2, n3[f2 + 11], 22, -1990404162), u2 = d2(u2, l2, h2, p2, n3[f2 + 12], 7, 1804603682), p2 = d2(p2, u2, l2, h2, n3[f2 + 13], 12, -40341101), h2 = d2(h2, p2, u2, l2, n3[f2 + 14], 17, -1502002290), u2 = g(u2, l2 = d2(l2, h2, p2, u2, n3[f2 + 15], 22, 1236535329), h2, p2, n3[f2 + 1], 5, -165796510), p2 = g(p2, u2, l2, h2, n3[f2 + 6], 9, -1069501632), h2 = g(h2, p2, u2, l2, n3[f2 + 11], 14, 643717713), l2 = g(l2, h2, p2, u2, n3[f2 + 0], 20, -373897302), u2 = g(u2, l2, h2, p2, n3[f2 + 5], 5, -701558691), p2 = g(p2, u2, l2, h2, n3[f2 + 10], 9, 38016083), h2 = g(h2, p2, u2, l2, n3[f2 + 15], 14, -660478335), l2 = g(l2, h2, p2, u2, n3[f2 + 4], 20, -405537848), u2 = g(u2, l2, h2, p2, n3[f2 + 9], 5, 568446438), p2 = g(p2, u2, l2, h2, n3[f2 + 14], 9, -1019803690), h2 = g(h2, p2, u2, l2, n3[f2 + 3], 14, -187363961), l2 = g(l2, h2, p2, u2, n3[f2 + 8], 20, 1163531501), u2 = g(u2, l2, h2, p2, n3[f2 + 13], 5, -1444681467), p2 = g(p2, u2, l2, h2, n3[f2 + 2], 9, -51403784), h2 = g(h2, p2, u2, l2, n3[f2 + 7], 14, 1735328473), u2 = m(u2, l2 = g(l2, h2, p2, u2, n3[f2 + 12], 20, -1926607734), h2, p2, n3[f2 + 5], 4, -378558), p2 = m(p2, u2, l2, h2, n3[f2 + 8], 11, -2022574463), h2 = m(h2, p2, u2, l2, n3[f2 + 11], 16, 1839030562), l2 = m(l2, h2, p2, u2, n3[f2 + 14], 23, -35309556), u2 = m(u2, l2, h2, p2, n3[f2 + 1], 4, -1530992060), p2 = m(p2, u2, l2, h2, n3[f2 + 4], 11, 1272893353), h2 = m(h2, p2, u2, l2, n3[f2 + 7], 16, -155497632), l2 = m(l2, h2, p2, u2, n3[f2 + 10], 23, -1094730640), u2 = m(u2, l2, h2, p2, n3[f2 + 13], 4, 681279174), p2 = m(p2, u2, l2, h2, n3[f2 + 0], 11, -358537222), h2 = m(h2, p2, u2, l2, n3[f2 + 3], 16, -722521979), l2 = m(l2, h2, p2, u2, n3[f2 + 6], 23, 76029189), u2 = m(u2, l2, h2, p2, n3[f2 + 9], 4, -640364487), p2 = m(p2, u2, l2, h2, n3[f2 + 12], 11, -421815835), h2 = m(h2, p2, u2, l2, n3[f2 + 15], 16, 530742520), u2 = v(u2, l2 = m(l2, h2, p2, u2, n3[f2 + 2], 23, -995338651), h2, p2, n3[f2 + 0], 6, -198630844), p2 = v(p2, u2, l2, h2, n3[f2 + 7], 10, 1126891415), h2 = v(h2, p2, u2, l2, n3[f2 + 14], 15, -1416354905), l2 = v(l2, h2, p2, u2, n3[f2 + 5], 21, -57434055), u2 = v(u2, l2, h2, p2, n3[f2 + 12], 6, 1700485571), p2 = v(p2, u2, l2, h2, n3[f2 + 3], 10, -1894986606), h2 = v(h2, p2, u2, l2, n3[f2 + 10], 15, -1051523), l2 = v(l2, h2, p2, u2, n3[f2 + 1], 21, -2054922799), u2 = v(u2, l2, h2, p2, n3[f2 + 8], 6, 1873313359), p2 = v(p2, u2, l2, h2, n3[f2 + 15], 10, -30611744), h2 = v(h2, p2, u2, l2, n3[f2 + 6], 15, -1560198380), l2 = v(l2, h2, p2, u2, n3[f2 + 13], 21, 1309151649), u2 = v(u2, l2, h2, p2, n3[f2 + 4], 6, -145523070), p2 = v(p2, u2, l2, h2, n3[f2 + 11], 10, -1120210379), h2 = v(h2, p2, u2, l2, n3[f2 + 2], 15, 718787259), l2 = v(l2, h2, p2, u2, n3[f2 + 9], 21, -343485551), u2 = u2 + y >>> 0, l2 = l2 + b >>> 0, h2 = h2 + w >>> 0, p2 = p2 + x >>> 0;
    }
    return r2.endian([u2, l2, h2, p2]);
  })._ff = function(t3, e3, n3, r3, o3, i3, s3) {
    var a3 = t3 + (e3 & n3 | ~e3 & r3) + (o3 >>> 0) + s3;
    return (a3 << i3 | a3 >>> 32 - i3) + e3;
  }, a2._gg = function(t3, e3, n3, r3, o3, i3, s3) {
    var a3 = t3 + (e3 & r3 | n3 & ~r3) + (o3 >>> 0) + s3;
    return (a3 << i3 | a3 >>> 32 - i3) + e3;
  }, a2._hh = function(t3, e3, n3, r3, o3, i3, s3) {
    var a3 = t3 + (e3 ^ n3 ^ r3) + (o3 >>> 0) + s3;
    return (a3 << i3 | a3 >>> 32 - i3) + e3;
  }, a2._ii = function(t3, e3, n3, r3, o3, i3, s3) {
    var a3 = t3 + (n3 ^ (e3 | ~r3)) + (o3 >>> 0) + s3;
    return (a3 << i3 | a3 >>> 32 - i3) + e3;
  }, a2._blocksize = 16, a2._digestsize = 16, t2.exports = function(t3, e3) {
    if (null == t3)
      throw new Error("Illegal argument " + t3);
    var n3 = r2.wordsToBytes(a2(t3, e3));
    return e3 && e3.asBytes ? n3 : e3 && e3.asString ? s2.bytesToString(n3) : r2.bytesToHex(n3);
  };
}, 285: (t2, e2, n2) => {
  var r2 = n2(2);
  t2.exports = function(t3) {
    return t3 ? ("{}" === t3.substr(0, 2) && (t3 = "\\{\\}" + t3.substr(2)), m(function(t4) {
      return t4.split("\\\\").join(o2).split("\\{").join(i2).split("\\}").join(s2).split("\\,").join(a2).split("\\.").join(c2);
    }(t3), true).map(l2)) : [];
  };
  var o2 = "\0SLASH" + Math.random() + "\0", i2 = "\0OPEN" + Math.random() + "\0", s2 = "\0CLOSE" + Math.random() + "\0", a2 = "\0COMMA" + Math.random() + "\0", c2 = "\0PERIOD" + Math.random() + "\0";
  function u2(t3) {
    return parseInt(t3, 10) == t3 ? parseInt(t3, 10) : t3.charCodeAt(0);
  }
  function l2(t3) {
    return t3.split(o2).join("\\").split(i2).join("{").split(s2).join("}").split(a2).join(",").split(c2).join(".");
  }
  function h2(t3) {
    if (!t3)
      return [""];
    var e3 = [], n3 = r2("{", "}", t3);
    if (!n3)
      return t3.split(",");
    var o3 = n3.pre, i3 = n3.body, s3 = n3.post, a3 = o3.split(",");
    a3[a3.length - 1] += "{" + i3 + "}";
    var c3 = h2(s3);
    return s3.length && (a3[a3.length - 1] += c3.shift(), a3.push.apply(a3, c3)), e3.push.apply(e3, a3), e3;
  }
  function p2(t3) {
    return "{" + t3 + "}";
  }
  function f2(t3) {
    return /^-?0\d/.test(t3);
  }
  function d2(t3, e3) {
    return t3 <= e3;
  }
  function g(t3, e3) {
    return t3 >= e3;
  }
  function m(t3, e3) {
    var n3 = [], o3 = r2("{", "}", t3);
    if (!o3)
      return [t3];
    var i3 = o3.pre, a3 = o3.post.length ? m(o3.post, false) : [""];
    if (/\$$/.test(o3.pre))
      for (var c3 = 0; c3 < a3.length; c3++) {
        var l3 = i3 + "{" + o3.body + "}" + a3[c3];
        n3.push(l3);
      }
    else {
      var v, y, b = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(o3.body), w = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(o3.body), x = b || w, N = o3.body.indexOf(",") >= 0;
      if (!x && !N)
        return o3.post.match(/,.*\}/) ? m(t3 = o3.pre + "{" + o3.body + s2 + o3.post) : [t3];
      if (x)
        v = o3.body.split(/\.\./);
      else if (1 === (v = h2(o3.body)).length && 1 === (v = m(v[0], false).map(p2)).length)
        return a3.map(function(t4) {
          return o3.pre + v[0] + t4;
        });
      if (x) {
        var P = u2(v[0]), A = u2(v[1]), O = Math.max(v[0].length, v[1].length), E = 3 == v.length ? Math.abs(u2(v[2])) : 1, T = d2;
        A < P && (E *= -1, T = g);
        var j = v.some(f2);
        y = [];
        for (var C = P; T(C, A); C += E) {
          var S;
          if (w)
            "\\" === (S = String.fromCharCode(C)) && (S = "");
          else if (S = String(C), j) {
            var I = O - S.length;
            if (I > 0) {
              var k = new Array(I + 1).join("0");
              S = C < 0 ? "-" + k + S.slice(1) : k + S;
            }
          }
          y.push(S);
        }
      } else {
        y = [];
        for (var R = 0; R < v.length; R++)
          y.push.apply(y, m(v[R], false));
      }
      for (R = 0; R < y.length; R++)
        for (c3 = 0; c3 < a3.length; c3++)
          l3 = i3 + y[R] + a3[c3], (!e3 || x || l3) && n3.push(l3);
    }
    return n3;
  }
}, 829: (t2) => {
  function e2(t3) {
    return e2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
      return typeof t4;
    } : function(t4) {
      return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
    }, e2(t3);
  }
  function n2(t3) {
    var e3 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
    return n2 = function(t4) {
      if (null === t4 || (n3 = t4, -1 === Function.toString.call(n3).indexOf("[native code]")))
        return t4;
      var n3;
      if ("function" != typeof t4)
        throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== e3) {
        if (e3.has(t4))
          return e3.get(t4);
        e3.set(t4, s3);
      }
      function s3() {
        return r2(t4, arguments, i2(this).constructor);
      }
      return s3.prototype = Object.create(t4.prototype, { constructor: { value: s3, enumerable: false, writable: true, configurable: true } }), o2(s3, t4);
    }, n2(t3);
  }
  function r2(t3, e3, n3) {
    return r2 = function() {
      if ("undefined" == typeof Reflect || !Reflect.construct)
        return false;
      if (Reflect.construct.sham)
        return false;
      if ("function" == typeof Proxy)
        return true;
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        })), true;
      } catch (t4) {
        return false;
      }
    }() ? Reflect.construct : function(t4, e4, n4) {
      var r3 = [null];
      r3.push.apply(r3, e4);
      var i3 = new (Function.bind.apply(t4, r3))();
      return n4 && o2(i3, n4.prototype), i3;
    }, r2.apply(null, arguments);
  }
  function o2(t3, e3) {
    return o2 = Object.setPrototypeOf || function(t4, e4) {
      return t4.__proto__ = e4, t4;
    }, o2(t3, e3);
  }
  function i2(t3) {
    return i2 = Object.setPrototypeOf ? Object.getPrototypeOf : function(t4) {
      return t4.__proto__ || Object.getPrototypeOf(t4);
    }, i2(t3);
  }
  var s2 = function(t3) {
    function n3(t4) {
      var r3;
      return function(t5, e3) {
        if (!(t5 instanceof e3))
          throw new TypeError("Cannot call a class as a function");
      }(this, n3), (r3 = function(t5, n4) {
        return !n4 || "object" !== e2(n4) && "function" != typeof n4 ? function(t6) {
          if (void 0 === t6)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return t6;
        }(t5) : n4;
      }(this, i2(n3).call(this, t4))).name = "ObjectPrototypeMutationError", r3;
    }
    return function(t4, e3) {
      if ("function" != typeof e3 && null !== e3)
        throw new TypeError("Super expression must either be null or a function");
      t4.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t4, writable: true, configurable: true } }), e3 && o2(t4, e3);
    }(n3, t3), n3;
  }(n2(Error));
  function a2(t3, n3) {
    for (var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {
    }, o3 = n3.split("."), i3 = o3.length, s3 = function(e3) {
      var n4 = o3[e3];
      if (!t3)
        return { v: void 0 };
      if ("+" === n4) {
        if (Array.isArray(t3))
          return { v: t3.map(function(n5, i5) {
            var s4 = o3.slice(e3 + 1);
            return s4.length > 0 ? a2(n5, s4.join("."), r3) : r3(t3, i5, o3, e3);
          }) };
        var i4 = o3.slice(0, e3).join(".");
        throw new Error("Object at wildcard (".concat(i4, ") is not an array"));
      }
      t3 = r3(t3, n4, o3, e3);
    }, c3 = 0; c3 < i3; c3++) {
      var u2 = s3(c3);
      if ("object" === e2(u2))
        return u2.v;
    }
    return t3;
  }
  function c2(t3, e3) {
    return t3.length === e3 + 1;
  }
  t2.exports = { set: function(t3, n3, r3) {
    if ("object" != e2(t3) || null === t3)
      return t3;
    if (void 0 === n3)
      return t3;
    if ("number" == typeof n3)
      return t3[n3] = r3, t3[n3];
    try {
      return a2(t3, n3, function(t4, e3, n4, o3) {
        if (t4 === Reflect.getPrototypeOf({}))
          throw new s2("Attempting to mutate Object.prototype");
        if (!t4[e3]) {
          var i3 = Number.isInteger(Number(n4[o3 + 1])), a3 = "+" === n4[o3 + 1];
          t4[e3] = i3 || a3 ? [] : {};
        }
        return c2(n4, o3) && (t4[e3] = r3), t4[e3];
      });
    } catch (e3) {
      if (e3 instanceof s2)
        throw e3;
      return t3;
    }
  }, get: function(t3, n3) {
    if ("object" != e2(t3) || null === t3)
      return t3;
    if (void 0 === n3)
      return t3;
    if ("number" == typeof n3)
      return t3[n3];
    try {
      return a2(t3, n3, function(t4, e3) {
        return t4[e3];
      });
    } catch (e3) {
      return t3;
    }
  }, has: function(t3, n3) {
    var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if ("object" != e2(t3) || null === t3)
      return false;
    if (void 0 === n3)
      return false;
    if ("number" == typeof n3)
      return n3 in t3;
    try {
      var o3 = false;
      return a2(t3, n3, function(t4, e3, n4, i3) {
        if (!c2(n4, i3))
          return t4 && t4[e3];
        o3 = r3.own ? t4.hasOwnProperty(e3) : e3 in t4;
      }), o3;
    } catch (t4) {
      return false;
    }
  }, hasOwn: function(t3, e3, n3) {
    return this.has(t3, e3, n3 || { own: true });
  }, isIn: function(t3, n3, r3) {
    var o3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    if ("object" != e2(t3) || null === t3)
      return false;
    if (void 0 === n3)
      return false;
    try {
      var i3 = false, s3 = false;
      return a2(t3, n3, function(t4, n4, o4, a3) {
        return i3 = i3 || t4 === r3 || !!t4 && t4[n4] === r3, s3 = c2(o4, a3) && "object" === e2(t4) && n4 in t4, t4 && t4[n4];
      }), o3.validPath ? i3 && s3 : i3;
    } catch (t4) {
      return false;
    }
  }, ObjectPrototypeMutationError: s2 };
}, 47: (t2, e2, n2) => {
  var r2 = n2(410), o2 = function(t3) {
    return "string" == typeof t3;
  };
  function i2(t3, e3) {
    for (var n3 = [], r3 = 0; r3 < t3.length; r3++) {
      var o3 = t3[r3];
      o3 && "." !== o3 && (".." === o3 ? n3.length && ".." !== n3[n3.length - 1] ? n3.pop() : e3 && n3.push("..") : n3.push(o3));
    }
    return n3;
  }
  var s2 = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, a2 = {};
  function c2(t3) {
    return s2.exec(t3).slice(1);
  }
  a2.resolve = function() {
    for (var t3 = "", e3 = false, n3 = arguments.length - 1; n3 >= -1 && !e3; n3--) {
      var r3 = n3 >= 0 ? arguments[n3] : process.cwd();
      if (!o2(r3))
        throw new TypeError("Arguments to path.resolve must be strings");
      r3 && (t3 = r3 + "/" + t3, e3 = "/" === r3.charAt(0));
    }
    return (e3 ? "/" : "") + (t3 = i2(t3.split("/"), !e3).join("/")) || ".";
  }, a2.normalize = function(t3) {
    var e3 = a2.isAbsolute(t3), n3 = "/" === t3.substr(-1);
    return (t3 = i2(t3.split("/"), !e3).join("/")) || e3 || (t3 = "."), t3 && n3 && (t3 += "/"), (e3 ? "/" : "") + t3;
  }, a2.isAbsolute = function(t3) {
    return "/" === t3.charAt(0);
  }, a2.join = function() {
    for (var t3 = "", e3 = 0; e3 < arguments.length; e3++) {
      var n3 = arguments[e3];
      if (!o2(n3))
        throw new TypeError("Arguments to path.join must be strings");
      n3 && (t3 += t3 ? "/" + n3 : n3);
    }
    return a2.normalize(t3);
  }, a2.relative = function(t3, e3) {
    function n3(t4) {
      for (var e4 = 0; e4 < t4.length && "" === t4[e4]; e4++)
        ;
      for (var n4 = t4.length - 1; n4 >= 0 && "" === t4[n4]; n4--)
        ;
      return e4 > n4 ? [] : t4.slice(e4, n4 + 1);
    }
    t3 = a2.resolve(t3).substr(1), e3 = a2.resolve(e3).substr(1);
    for (var r3 = n3(t3.split("/")), o3 = n3(e3.split("/")), i3 = Math.min(r3.length, o3.length), s3 = i3, c3 = 0; c3 < i3; c3++)
      if (r3[c3] !== o3[c3]) {
        s3 = c3;
        break;
      }
    var u2 = [];
    for (c3 = s3; c3 < r3.length; c3++)
      u2.push("..");
    return (u2 = u2.concat(o3.slice(s3))).join("/");
  }, a2._makeLong = function(t3) {
    return t3;
  }, a2.dirname = function(t3) {
    var e3 = c2(t3), n3 = e3[0], r3 = e3[1];
    return n3 || r3 ? (r3 && (r3 = r3.substr(0, r3.length - 1)), n3 + r3) : ".";
  }, a2.basename = function(t3, e3) {
    var n3 = c2(t3)[2];
    return e3 && n3.substr(-1 * e3.length) === e3 && (n3 = n3.substr(0, n3.length - e3.length)), n3;
  }, a2.extname = function(t3) {
    return c2(t3)[3];
  }, a2.format = function(t3) {
    if (!r2.isObject(t3))
      throw new TypeError("Parameter 'pathObject' must be an object, not " + typeof t3);
    var e3 = t3.root || "";
    if (!o2(e3))
      throw new TypeError("'pathObject.root' must be a string or undefined, not " + typeof t3.root);
    return (t3.dir ? t3.dir + a2.sep : "") + (t3.base || "");
  }, a2.parse = function(t3) {
    if (!o2(t3))
      throw new TypeError("Parameter 'pathString' must be a string, not " + typeof t3);
    var e3 = c2(t3);
    if (!e3 || 4 !== e3.length)
      throw new TypeError("Invalid path '" + t3 + "'");
    return e3[1] = e3[1] || "", e3[2] = e3[2] || "", e3[3] = e3[3] || "", { root: e3[0], dir: e3[0] + e3[1].slice(0, e3[1].length - 1), base: e3[2], ext: e3[3], name: e3[2].slice(0, e3[2].length - e3[3].length) };
  }, a2.sep = "/", a2.delimiter = ":", t2.exports = a2;
}, 647: (t2, e2) => {
  var n2 = Object.prototype.hasOwnProperty;
  function r2(t3) {
    try {
      return decodeURIComponent(t3.replace(/\+/g, " "));
    } catch (t4) {
      return null;
    }
  }
  function o2(t3) {
    try {
      return encodeURIComponent(t3);
    } catch (t4) {
      return null;
    }
  }
  e2.stringify = function(t3, e3) {
    e3 = e3 || "";
    var r3, i2, s2 = [];
    for (i2 in "string" != typeof e3 && (e3 = "?"), t3)
      if (n2.call(t3, i2)) {
        if ((r3 = t3[i2]) || null != r3 && !isNaN(r3) || (r3 = ""), i2 = o2(i2), r3 = o2(r3), null === i2 || null === r3)
          continue;
        s2.push(i2 + "=" + r3);
      }
    return s2.length ? e3 + s2.join("&") : "";
  }, e2.parse = function(t3) {
    for (var e3, n3 = /([^=?#&]+)=?([^&]*)/g, o3 = {}; e3 = n3.exec(t3); ) {
      var i2 = r2(e3[1]), s2 = r2(e3[2]);
      null === i2 || null === s2 || i2 in o3 || (o3[i2] = s2);
    }
    return o3;
  };
}, 670: (t2) => {
  t2.exports = function(t3, e2) {
    if (e2 = e2.split(":")[0], !(t3 = +t3))
      return false;
    switch (e2) {
      case "http":
      case "ws":
        return 80 !== t3;
      case "https":
      case "wss":
        return 443 !== t3;
      case "ftp":
        return 21 !== t3;
      case "gopher":
        return 70 !== t3;
      case "file":
        return false;
    }
    return 0 !== t3;
  };
}, 494: (t2) => {
  const e2 = /^[-+]?0x[a-fA-F0-9]+$/, n2 = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;
  !Number.parseInt && window.parseInt && (Number.parseInt = window.parseInt), !Number.parseFloat && window.parseFloat && (Number.parseFloat = window.parseFloat);
  const r2 = { hex: true, leadingZeros: true, decimalPoint: ".", eNotation: true };
  t2.exports = function(t3) {
    let o2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    if (o2 = Object.assign({}, r2, o2), !t3 || "string" != typeof t3)
      return t3;
    let i2 = t3.trim();
    if (void 0 !== o2.skipLike && o2.skipLike.test(i2))
      return t3;
    if (o2.hex && e2.test(i2))
      return Number.parseInt(i2, 16);
    {
      const e3 = n2.exec(i2);
      if (e3) {
        const n3 = e3[1], r3 = e3[2];
        let a2 = (s2 = e3[3]) && -1 !== s2.indexOf(".") ? ("." === (s2 = s2.replace(/0+$/, "")) ? s2 = "0" : "." === s2[0] ? s2 = "0" + s2 : "." === s2[s2.length - 1] && (s2 = s2.substr(0, s2.length - 1)), s2) : s2;
        const c2 = e3[4] || e3[6];
        if (!o2.leadingZeros && r3.length > 0 && n3 && "." !== i2[2])
          return t3;
        if (!o2.leadingZeros && r3.length > 0 && !n3 && "." !== i2[1])
          return t3;
        {
          const e4 = Number(i2), s3 = "" + e4;
          return -1 !== s3.search(/[eE]/) || c2 ? o2.eNotation ? e4 : t3 : -1 !== i2.indexOf(".") ? "0" === s3 && "" === a2 || s3 === a2 || n3 && s3 === "-" + a2 ? e4 : t3 : r3 ? a2 === s3 || n3 + a2 === s3 ? e4 : t3 : i2 === s3 || i2 === n3 + s3 ? e4 : t3;
        }
      }
      return t3;
    }
    var s2;
  };
}, 737: (t2, e2, n2) => {
  var r2 = n2(670), o2 = n2(647), i2 = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, s2 = /[\n\r\t]/g, a2 = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, c2 = /:\d+$/, u2 = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, l2 = /^[a-zA-Z]:/;
  function h2(t3) {
    return (t3 || "").toString().replace(i2, "");
  }
  var p2 = [["#", "hash"], ["?", "query"], function(t3, e3) {
    return g(e3.protocol) ? t3.replace(/\\/g, "/") : t3;
  }, ["/", "pathname"], ["@", "auth", 1], [NaN, "host", void 0, 1, 1], [/:(\d*)$/, "port", void 0, 1], [NaN, "hostname", void 0, 1, 1]], f2 = { hash: 1, query: 1 };
  function d2(t3) {
    var e3, n3 = ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}).location || {}, r3 = {}, o3 = typeof (t3 = t3 || n3);
    if ("blob:" === t3.protocol)
      r3 = new v(unescape(t3.pathname), {});
    else if ("string" === o3)
      for (e3 in r3 = new v(t3, {}), f2)
        delete r3[e3];
    else if ("object" === o3) {
      for (e3 in t3)
        e3 in f2 || (r3[e3] = t3[e3]);
      void 0 === r3.slashes && (r3.slashes = a2.test(t3.href));
    }
    return r3;
  }
  function g(t3) {
    return "file:" === t3 || "ftp:" === t3 || "http:" === t3 || "https:" === t3 || "ws:" === t3 || "wss:" === t3;
  }
  function m(t3, e3) {
    t3 = (t3 = h2(t3)).replace(s2, ""), e3 = e3 || {};
    var n3, r3 = u2.exec(t3), o3 = r3[1] ? r3[1].toLowerCase() : "", i3 = !!r3[2], a3 = !!r3[3], c3 = 0;
    return i3 ? a3 ? (n3 = r3[2] + r3[3] + r3[4], c3 = r3[2].length + r3[3].length) : (n3 = r3[2] + r3[4], c3 = r3[2].length) : a3 ? (n3 = r3[3] + r3[4], c3 = r3[3].length) : n3 = r3[4], "file:" === o3 ? c3 >= 2 && (n3 = n3.slice(2)) : g(o3) ? n3 = r3[4] : o3 ? i3 && (n3 = n3.slice(2)) : c3 >= 2 && g(e3.protocol) && (n3 = r3[4]), { protocol: o3, slashes: i3 || g(o3), slashesCount: c3, rest: n3 };
  }
  function v(t3, e3, n3) {
    if (t3 = (t3 = h2(t3)).replace(s2, ""), !(this instanceof v))
      return new v(t3, e3, n3);
    var i3, a3, c3, u3, f3, y, b = p2.slice(), w = typeof e3, x = this, N = 0;
    for ("object" !== w && "string" !== w && (n3 = e3, e3 = null), n3 && "function" != typeof n3 && (n3 = o2.parse), i3 = !(a3 = m(t3 || "", e3 = d2(e3))).protocol && !a3.slashes, x.slashes = a3.slashes || i3 && e3.slashes, x.protocol = a3.protocol || e3.protocol || "", t3 = a3.rest, ("file:" === a3.protocol && (2 !== a3.slashesCount || l2.test(t3)) || !a3.slashes && (a3.protocol || a3.slashesCount < 2 || !g(x.protocol))) && (b[3] = [/(.*)/, "pathname"]); N < b.length; N++)
      "function" != typeof (u3 = b[N]) ? (c3 = u3[0], y = u3[1], c3 != c3 ? x[y] = t3 : "string" == typeof c3 ? ~(f3 = "@" === c3 ? t3.lastIndexOf(c3) : t3.indexOf(c3)) && ("number" == typeof u3[2] ? (x[y] = t3.slice(0, f3), t3 = t3.slice(f3 + u3[2])) : (x[y] = t3.slice(f3), t3 = t3.slice(0, f3))) : (f3 = c3.exec(t3)) && (x[y] = f3[1], t3 = t3.slice(0, f3.index)), x[y] = x[y] || i3 && u3[3] && e3[y] || "", u3[4] && (x[y] = x[y].toLowerCase())) : t3 = u3(t3, x);
    n3 && (x.query = n3(x.query)), i3 && e3.slashes && "/" !== x.pathname.charAt(0) && ("" !== x.pathname || "" !== e3.pathname) && (x.pathname = function(t4, e4) {
      if ("" === t4)
        return e4;
      for (var n4 = (e4 || "/").split("/").slice(0, -1).concat(t4.split("/")), r3 = n4.length, o3 = n4[r3 - 1], i4 = false, s3 = 0; r3--; )
        "." === n4[r3] ? n4.splice(r3, 1) : ".." === n4[r3] ? (n4.splice(r3, 1), s3++) : s3 && (0 === r3 && (i4 = true), n4.splice(r3, 1), s3--);
      return i4 && n4.unshift(""), "." !== o3 && ".." !== o3 || n4.push(""), n4.join("/");
    }(x.pathname, e3.pathname)), "/" !== x.pathname.charAt(0) && g(x.protocol) && (x.pathname = "/" + x.pathname), r2(x.port, x.protocol) || (x.host = x.hostname, x.port = ""), x.username = x.password = "", x.auth && (~(f3 = x.auth.indexOf(":")) ? (x.username = x.auth.slice(0, f3), x.username = encodeURIComponent(decodeURIComponent(x.username)), x.password = x.auth.slice(f3 + 1), x.password = encodeURIComponent(decodeURIComponent(x.password))) : x.username = encodeURIComponent(decodeURIComponent(x.auth)), x.auth = x.password ? x.username + ":" + x.password : x.username), x.origin = "file:" !== x.protocol && g(x.protocol) && x.host ? x.protocol + "//" + x.host : "null", x.href = x.toString();
  }
  v.prototype = { set: function(t3, e3, n3) {
    var i3 = this;
    switch (t3) {
      case "query":
        "string" == typeof e3 && e3.length && (e3 = (n3 || o2.parse)(e3)), i3[t3] = e3;
        break;
      case "port":
        i3[t3] = e3, r2(e3, i3.protocol) ? e3 && (i3.host = i3.hostname + ":" + e3) : (i3.host = i3.hostname, i3[t3] = "");
        break;
      case "hostname":
        i3[t3] = e3, i3.port && (e3 += ":" + i3.port), i3.host = e3;
        break;
      case "host":
        i3[t3] = e3, c2.test(e3) ? (e3 = e3.split(":"), i3.port = e3.pop(), i3.hostname = e3.join(":")) : (i3.hostname = e3, i3.port = "");
        break;
      case "protocol":
        i3.protocol = e3.toLowerCase(), i3.slashes = !n3;
        break;
      case "pathname":
      case "hash":
        if (e3) {
          var s3 = "pathname" === t3 ? "/" : "#";
          i3[t3] = e3.charAt(0) !== s3 ? s3 + e3 : e3;
        } else
          i3[t3] = e3;
        break;
      case "username":
      case "password":
        i3[t3] = encodeURIComponent(e3);
        break;
      case "auth":
        var a3 = e3.indexOf(":");
        ~a3 ? (i3.username = e3.slice(0, a3), i3.username = encodeURIComponent(decodeURIComponent(i3.username)), i3.password = e3.slice(a3 + 1), i3.password = encodeURIComponent(decodeURIComponent(i3.password))) : i3.username = encodeURIComponent(decodeURIComponent(e3));
    }
    for (var u3 = 0; u3 < p2.length; u3++) {
      var l3 = p2[u3];
      l3[4] && (i3[l3[1]] = i3[l3[1]].toLowerCase());
    }
    return i3.auth = i3.password ? i3.username + ":" + i3.password : i3.username, i3.origin = "file:" !== i3.protocol && g(i3.protocol) && i3.host ? i3.protocol + "//" + i3.host : "null", i3.href = i3.toString(), i3;
  }, toString: function(t3) {
    t3 && "function" == typeof t3 || (t3 = o2.stringify);
    var e3, n3 = this, r3 = n3.host, i3 = n3.protocol;
    i3 && ":" !== i3.charAt(i3.length - 1) && (i3 += ":");
    var s3 = i3 + (n3.protocol && n3.slashes || g(n3.protocol) ? "//" : "");
    return n3.username ? (s3 += n3.username, n3.password && (s3 += ":" + n3.password), s3 += "@") : n3.password ? (s3 += ":" + n3.password, s3 += "@") : "file:" !== n3.protocol && g(n3.protocol) && !r3 && "/" !== n3.pathname && (s3 += "@"), (":" === r3[r3.length - 1] || c2.test(n3.hostname) && !n3.port) && (r3 += ":"), s3 += r3 + n3.pathname, (e3 = "object" == typeof n3.query ? t3(n3.query) : n3.query) && (s3 += "?" !== e3.charAt(0) ? "?" + e3 : e3), n3.hash && (s3 += n3.hash), s3;
  } }, v.extractProtocol = m, v.location = d2, v.trimLeft = h2, v.qs = o2, t2.exports = v;
}, 410: () => {
}, 388: () => {
}, 805: () => {
}, 345: () => {
}, 800: () => {
} }, e = {};
function n(r2) {
  var o2 = e[r2];
  if (void 0 !== o2)
    return o2.exports;
  var i2 = e[r2] = { id: r2, loaded: false, exports: {} };
  return t$1[r2].call(i2.exports, i2, i2.exports, n), i2.loaded = true, i2.exports;
}
n.n = (t2) => {
  var e2 = t2 && t2.__esModule ? () => t2.default : () => t2;
  return n.d(e2, { a: e2 }), e2;
}, n.d = (t2, e2) => {
  for (var r2 in e2)
    n.o(e2, r2) && !n.o(t2, r2) && Object.defineProperty(t2, r2, { enumerable: true, get: e2[r2] });
}, n.o = (t2, e2) => Object.prototype.hasOwnProperty.call(t2, e2), n.nmd = (t2) => (t2.paths = [], t2.children || (t2.children = []), t2);
var r = {};
(() => {
  n.d(r, { hT: () => C, O4: () => S, Kd: () => T, YK: () => j, UU: () => Ke, Gu: () => M, ky: () => te, h4: () => Jt, ch: () => Qt, hq: () => zt, i5: () => ee });
  var t2 = n(737), e2 = n.n(t2);
  function o2(t3) {
    if (!i2(t3))
      throw new Error("Parameter was not an error");
  }
  function i2(t3) {
    return "[object Error]" === (e3 = t3, Object.prototype.toString.call(e3)) || t3 instanceof Error;
    var e3;
  }
  class s2 extends Error {
    constructor(t3, e3) {
      const n2 = [...arguments], { options: r2, shortMessage: o3 } = function(t4) {
        let e4, n3 = "";
        if (0 === t4.length)
          e4 = {};
        else if (i2(t4[0]))
          e4 = { cause: t4[0] }, n3 = t4.slice(1).join(" ") || "";
        else if (t4[0] && "object" == typeof t4[0])
          e4 = Object.assign({}, t4[0]), n3 = t4.slice(1).join(" ") || "";
        else {
          if ("string" != typeof t4[0])
            throw new Error("Invalid arguments passed to Layerr");
          e4 = {}, n3 = n3 = t4.join(" ") || "";
        }
        return { options: e4, shortMessage: n3 };
      }(n2);
      let s3 = o3;
      if (r2.cause && (s3 = "".concat(s3, ": ").concat(r2.cause.message)), super(s3), this.message = s3, r2.name && "string" == typeof r2.name ? this.name = r2.name : this.name = "Layerr", r2.cause && Object.defineProperty(this, "_cause", { value: r2.cause }), Object.defineProperty(this, "_info", { value: {} }), r2.info && "object" == typeof r2.info && Object.assign(this._info, r2.info), Error.captureStackTrace) {
        const t4 = r2.constructorOpt || this.constructor;
        Error.captureStackTrace(this, t4);
      }
    }
    static cause(t3) {
      return o2(t3), t3._cause && i2(t3._cause) ? t3._cause : null;
    }
    static fullStack(t3) {
      o2(t3);
      const e3 = s2.cause(t3);
      return e3 ? "".concat(t3.stack, "\ncaused by: ").concat(s2.fullStack(e3)) : t3.stack;
    }
    static info(t3) {
      o2(t3);
      const e3 = {}, n2 = s2.cause(t3);
      return n2 && Object.assign(e3, s2.info(n2)), t3._info && Object.assign(e3, t3._info), e3;
    }
    cause() {
      return s2.cause(this);
    }
    toString() {
      let t3 = this.name || this.constructor.name || this.constructor.prototype.name;
      return this.message && (t3 = "".concat(t3, ": ").concat(this.message)), t3;
    }
  }
  var a2 = n(47), c2 = n.n(a2);
  const u2 = "__PATH_SEPARATOR_POSIX__", l2 = "__PATH_SEPARATOR_WINDOWS__";
  function h2(t3) {
    try {
      const e3 = t3.replace(/\//g, u2).replace(/\\\\/g, l2);
      return encodeURIComponent(e3).split(l2).join("\\\\").split(u2).join("/");
    } catch (t4) {
      throw new s2(t4, "Failed encoding path");
    }
  }
  function p2(t3) {
    return t3.startsWith("/") ? t3 : "/" + t3;
  }
  function f2(t3) {
    let e3 = t3;
    return "/" !== e3[0] && (e3 = "/" + e3), /^.+\/$/.test(e3) && (e3 = e3.substr(0, e3.length - 1)), e3;
  }
  function d2(t3) {
    let n2 = new (e2())(t3).pathname;
    return n2.length <= 0 && (n2 = "/"), f2(n2);
  }
  function g() {
    for (var t3 = arguments.length, e3 = new Array(t3), n2 = 0; n2 < t3; n2++)
      e3[n2] = arguments[n2];
    return function() {
      return function(t4) {
        var e4 = [];
        if (0 === t4.length)
          return "";
        if ("string" != typeof t4[0])
          throw new TypeError("Url must be a string. Received " + t4[0]);
        if (t4[0].match(/^[^/:]+:\/*$/) && t4.length > 1) {
          var n3 = t4.shift();
          t4[0] = n3 + t4[0];
        }
        t4[0].match(/^file:\/\/\//) ? t4[0] = t4[0].replace(/^([^/:]+):\/*/, "$1:///") : t4[0] = t4[0].replace(/^([^/:]+):\/*/, "$1://");
        for (var r2 = 0; r2 < t4.length; r2++) {
          var o3 = t4[r2];
          if ("string" != typeof o3)
            throw new TypeError("Url must be a string. Received " + o3);
          "" !== o3 && (r2 > 0 && (o3 = o3.replace(/^[\/]+/, "")), o3 = r2 < t4.length - 1 ? o3.replace(/[\/]+$/, "") : o3.replace(/[\/]+$/, "/"), e4.push(o3));
        }
        var i3 = e4.join("/"), s3 = (i3 = i3.replace(/\/(\?|&|#[^!])/g, "$1")).split("?");
        return s3.shift() + (s3.length > 0 ? "?" : "") + s3.join("&");
      }("object" == typeof arguments[0] ? arguments[0] : [].slice.call(arguments));
    }(e3.reduce((t4, e4, n3) => ((0 === n3 || "/" !== e4 || "/" === e4 && "/" !== t4[t4.length - 1]) && t4.push(e4), t4), []));
  }
  var m = n(542), v = n.n(m);
  const y = "abcdef0123456789";
  function b(t3, e3) {
    const n2 = t3.url.replace("//", ""), r2 = -1 == n2.indexOf("/") ? "/" : n2.slice(n2.indexOf("/")), o3 = t3.method ? t3.method.toUpperCase() : "GET", i3 = !!/(^|,)\s*auth\s*($|,)/.test(e3.qop) && "auth", s3 = "00000000".concat(e3.nc).slice(-8), a3 = function(t4, e4, n3, r3, o4, i4, s4) {
      const a4 = s4 || v()("".concat(e4, ":").concat(n3, ":").concat(r3));
      return t4 && "md5-sess" === t4.toLowerCase() ? v()("".concat(a4, ":").concat(o4, ":").concat(i4)) : a4;
    }(e3.algorithm, e3.username, e3.realm, e3.password, e3.nonce, e3.cnonce, e3.ha1), c3 = v()("".concat(o3, ":").concat(r2)), u3 = i3 ? v()("".concat(a3, ":").concat(e3.nonce, ":").concat(s3, ":").concat(e3.cnonce, ":").concat(i3, ":").concat(c3)) : v()("".concat(a3, ":").concat(e3.nonce, ":").concat(c3)), l3 = { username: e3.username, realm: e3.realm, nonce: e3.nonce, uri: r2, qop: i3, response: u3, nc: s3, cnonce: e3.cnonce, algorithm: e3.algorithm, opaque: e3.opaque }, h3 = [];
    for (const t4 in l3)
      l3[t4] && ("qop" === t4 || "nc" === t4 || "algorithm" === t4 ? h3.push("".concat(t4, "=").concat(l3[t4])) : h3.push("".concat(t4, '="').concat(l3[t4], '"')));
    return "Digest ".concat(h3.join(", "));
  }
  function w(t3) {
    return "digest" === (t3.headers && t3.headers.get("www-authenticate") || "").split(/\s/)[0].toLowerCase();
  }
  var x = n(101), N = n.n(x);
  function P(t3) {
    return N().decode(t3);
  }
  function A(t3, e3) {
    const n2 = (r2 = "".concat(t3, ":").concat(e3), N().encode(r2));
    var r2;
    return "Basic ".concat(n2);
  }
  const O = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : "undefined" != typeof window ? window : globalThis, E = O.fetch.bind(O), T = (O.Headers, O.Request), j = O.Response;
  let C = function(t3) {
    return t3.Auto = "auto", t3.Digest = "digest", t3.None = "none", t3.Password = "password", t3.Token = "token", t3;
  }({}), S = function(t3) {
    return t3.DataTypeNoLength = "data-type-no-length", t3.InvalidAuthType = "invalid-auth-type", t3.InvalidOutputFormat = "invalid-output-format", t3.LinkUnsupportedAuthType = "link-unsupported-auth", t3.InvalidUpdateRange = "invalid-update-range", t3.NotSupported = "not-supported", t3;
  }({});
  function I(t3, e3, n2, r2, o3) {
    switch (t3.authType) {
      case C.Auto:
        e3 && n2 && (t3.headers.Authorization = A(e3, n2));
        break;
      case C.Digest:
        t3.digest = /* @__PURE__ */ function(t4, e4, n3) {
          return { username: t4, password: e4, ha1: n3, nc: 0, algorithm: "md5", hasDigestAuth: false };
        }(e3, n2, o3);
        break;
      case C.None:
        break;
      case C.Password:
        t3.headers.Authorization = A(e3, n2);
        break;
      case C.Token:
        t3.headers.Authorization = "".concat((i3 = r2).token_type, " ").concat(i3.access_token);
        break;
      default:
        throw new s2({ info: { code: S.InvalidAuthType } }, "Invalid auth type: ".concat(t3.authType));
    }
    var i3;
  }
  n(345), n(800);
  const k = "@@HOTPATCHER", R = () => {
  };
  function L(t3) {
    return { original: t3, methods: [t3], final: false };
  }
  class _23 {
    constructor() {
      this._configuration = { registry: {}, getEmptyAction: "null" }, this.__type__ = k;
    }
    get configuration() {
      return this._configuration;
    }
    get getEmptyAction() {
      return this.configuration.getEmptyAction;
    }
    set getEmptyAction(t3) {
      this.configuration.getEmptyAction = t3;
    }
    control(t3) {
      let e3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      if (!t3 || t3.__type__ !== k)
        throw new Error("Failed taking control of target HotPatcher instance: Invalid type or object");
      return Object.keys(t3.configuration.registry).forEach((n2) => {
        this.configuration.registry.hasOwnProperty(n2) ? e3 && (this.configuration.registry[n2] = Object.assign({}, t3.configuration.registry[n2])) : this.configuration.registry[n2] = Object.assign({}, t3.configuration.registry[n2]);
      }), t3._configuration = this.configuration, this;
    }
    execute(t3) {
      const e3 = this.get(t3) || R;
      for (var n2 = arguments.length, r2 = new Array(n2 > 1 ? n2 - 1 : 0), o3 = 1; o3 < n2; o3++)
        r2[o3 - 1] = arguments[o3];
      return e3(...r2);
    }
    get(t3) {
      const e3 = this.configuration.registry[t3];
      if (!e3)
        switch (this.getEmptyAction) {
          case "null":
            return null;
          case "throw":
            throw new Error("Failed handling method request: No method provided for override: ".concat(t3));
          default:
            throw new Error("Failed handling request which resulted in an empty method: Invalid empty-action specified: ".concat(this.getEmptyAction));
        }
      return function() {
        for (var t4 = arguments.length, e4 = new Array(t4), n2 = 0; n2 < t4; n2++)
          e4[n2] = arguments[n2];
        if (0 === e4.length)
          throw new Error("Failed creating sequence: No functions provided");
        return function() {
          for (var t5 = arguments.length, n3 = new Array(t5), r2 = 0; r2 < t5; r2++)
            n3[r2] = arguments[r2];
          let o3 = n3;
          const i3 = this;
          for (; e4.length > 0; )
            o3 = [e4.shift().apply(i3, o3)];
          return o3[0];
        };
      }(...e3.methods);
    }
    isPatched(t3) {
      return !!this.configuration.registry[t3];
    }
    patch(t3, e3) {
      let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      const { chain: r2 = false } = n2;
      if (this.configuration.registry[t3] && this.configuration.registry[t3].final)
        throw new Error("Failed patching '".concat(t3, "': Method marked as being final"));
      if ("function" != typeof e3)
        throw new Error("Failed patching '".concat(t3, "': Provided method is not a function"));
      if (r2)
        this.configuration.registry[t3] ? this.configuration.registry[t3].methods.push(e3) : this.configuration.registry[t3] = L(e3);
      else if (this.isPatched(t3)) {
        const { original: n3 } = this.configuration.registry[t3];
        this.configuration.registry[t3] = Object.assign(L(e3), { original: n3 });
      } else
        this.configuration.registry[t3] = L(e3);
      return this;
    }
    patchInline(t3, e3) {
      this.isPatched(t3) || this.patch(t3, e3);
      for (var n2 = arguments.length, r2 = new Array(n2 > 2 ? n2 - 2 : 0), o3 = 2; o3 < n2; o3++)
        r2[o3 - 2] = arguments[o3];
      return this.execute(t3, ...r2);
    }
    plugin(t3) {
      for (var e3 = arguments.length, n2 = new Array(e3 > 1 ? e3 - 1 : 0), r2 = 1; r2 < e3; r2++)
        n2[r2 - 1] = arguments[r2];
      return n2.forEach((e4) => {
        this.patch(t3, e4, { chain: true });
      }), this;
    }
    restore(t3) {
      if (!this.isPatched(t3))
        throw new Error("Failed restoring method: No method present for key: ".concat(t3));
      if ("function" != typeof this.configuration.registry[t3].original)
        throw new Error("Failed restoring method: Original method not found or of invalid type for key: ".concat(t3));
      return this.configuration.registry[t3].methods = [this.configuration.registry[t3].original], this;
    }
    setFinal(t3) {
      if (!this.configuration.registry.hasOwnProperty(t3))
        throw new Error("Failed marking '".concat(t3, "' as final: No method found for key"));
      return this.configuration.registry[t3].final = true, this;
    }
  }
  let U = null;
  function M() {
    return U || (U = new _23()), U;
  }
  function F(t3) {
    return function(t4) {
      if ("object" != typeof t4 || null === t4 || "[object Object]" != Object.prototype.toString.call(t4))
        return false;
      if (null === Object.getPrototypeOf(t4))
        return true;
      let e3 = t4;
      for (; null !== Object.getPrototypeOf(e3); )
        e3 = Object.getPrototypeOf(e3);
      return Object.getPrototypeOf(t4) === e3;
    }(t3) ? Object.assign({}, t3) : Object.setPrototypeOf(Object.assign({}, t3), Object.getPrototypeOf(t3));
  }
  function D() {
    for (var t3 = arguments.length, e3 = new Array(t3), n2 = 0; n2 < t3; n2++)
      e3[n2] = arguments[n2];
    let r2 = null, o3 = [...e3];
    for (; o3.length > 0; ) {
      const t4 = o3.shift();
      r2 = r2 ? $2(r2, t4) : F(t4);
    }
    return r2;
  }
  function $2(t3, e3) {
    const n2 = F(t3);
    return Object.keys(e3).forEach((t4) => {
      n2.hasOwnProperty(t4) ? Array.isArray(e3[t4]) ? n2[t4] = Array.isArray(n2[t4]) ? [...n2[t4], ...e3[t4]] : [...e3[t4]] : "object" == typeof e3[t4] && e3[t4] ? n2[t4] = "object" == typeof n2[t4] && n2[t4] ? $2(n2[t4], e3[t4]) : F(e3[t4]) : n2[t4] = e3[t4] : n2[t4] = e3[t4];
    }), n2;
  }
  function B(t3) {
    const e3 = {};
    for (const n2 of t3.keys())
      e3[n2] = t3.get(n2);
    return e3;
  }
  function W() {
    for (var t3 = arguments.length, e3 = new Array(t3), n2 = 0; n2 < t3; n2++)
      e3[n2] = arguments[n2];
    if (0 === e3.length)
      return {};
    const r2 = {};
    return e3.reduce((t4, e4) => (Object.keys(e4).forEach((n3) => {
      const o3 = n3.toLowerCase();
      r2.hasOwnProperty(o3) ? t4[r2[o3]] = e4[n3] : (r2[o3] = n3, t4[n3] = e4[n3]);
    }), t4), {});
  }
  n(805);
  const V = "function" == typeof ArrayBuffer, { toString: z } = Object.prototype;
  function q(t3) {
    return V && (t3 instanceof ArrayBuffer || "[object ArrayBuffer]" === z.call(t3));
  }
  function G(t3) {
    return null != t3 && null != t3.constructor && "function" == typeof t3.constructor.isBuffer && t3.constructor.isBuffer(t3);
  }
  function H(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }
  function X(t3, e3, n2) {
    return n2 ? e3 ? e3(t3) : t3 : (t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3);
  }
  const Z = H(function(t3) {
    const e3 = t3._digest;
    return delete t3._digest, e3.hasDigestAuth && (t3 = D(t3, { headers: { Authorization: b(t3, e3) } })), X(Q(t3), function(n2) {
      let r2 = false;
      return o3 = function(t4) {
        return r2 ? t4 : n2;
      }, (i3 = function() {
        if (401 == n2.status)
          return e3.hasDigestAuth = function(t4, e4) {
            if (!w(t4))
              return false;
            const n3 = /([a-z0-9_-]+)=(?:"([^"]+)"|([a-z0-9_-]+))/gi;
            for (; ; ) {
              const r3 = t4.headers && t4.headers.get("www-authenticate") || "", o4 = n3.exec(r3);
              if (!o4)
                break;
              e4[o4[1]] = o4[2] || o4[3];
            }
            return e4.nc += 1, e4.cnonce = function() {
              let t5 = "";
              for (let e5 = 0; e5 < 32; ++e5)
                t5 = "".concat(t5).concat(y[Math.floor(16 * Math.random())]);
              return t5;
            }(), true;
          }(n2, e3), function() {
            if (e3.hasDigestAuth)
              return X(Q(t3 = D(t3, { headers: { Authorization: b(t3, e3) } })), function(t4) {
                return 401 == t4.status ? e3.hasDigestAuth = false : e3.nc++, r2 = true, t4;
              });
          }();
        e3.nc++;
      }()) && i3.then ? i3.then(o3) : o3(i3);
      var o3, i3;
    });
  }), Y = H(function(t3, e3) {
    return X(Q(t3), function(n2) {
      return n2.ok ? (e3.authType = C.Password, n2) : 401 == n2.status && w(n2) ? (e3.authType = C.Digest, I(e3, e3.username, e3.password, void 0, void 0), t3._digest = e3.digest, Z(t3)) : n2;
    });
  }), K = H(function(t3, e3) {
    return e3.authType === C.Auto ? Y(t3, e3) : t3._digest ? Z(t3) : Q(t3);
  });
  function J(t3, e3, n2) {
    const r2 = F(t3);
    return r2.headers = W(e3.headers, r2.headers || {}, n2.headers || {}), void 0 !== n2.data && (r2.data = n2.data), n2.signal && (r2.signal = n2.signal), e3.httpAgent && (r2.httpAgent = e3.httpAgent), e3.httpsAgent && (r2.httpsAgent = e3.httpsAgent), e3.digest && (r2._digest = e3.digest), "boolean" == typeof e3.withCredentials && (r2.withCredentials = e3.withCredentials), r2;
  }
  function Q(t3) {
    const e3 = M();
    return e3.patchInline("request", (t4) => e3.patchInline("fetch", E, t4.url, function(t5) {
      let e4 = {};
      const n2 = { method: t5.method };
      if (t5.headers && (e4 = W(e4, t5.headers)), void 0 !== t5.data) {
        const [r2, o3] = function(t6) {
          if ("string" == typeof t6)
            return [t6, {}];
          if (G(t6))
            return [t6, {}];
          if (q(t6))
            return [t6, {}];
          if (t6 && "object" == typeof t6)
            return [JSON.stringify(t6), { "content-type": "application/json" }];
          throw new Error("Unable to convert request body: Unexpected body type: ".concat(typeof t6));
        }(t5.data);
        n2.body = r2, e4 = W(e4, o3);
      }
      return t5.signal && (n2.signal = t5.signal), t5.withCredentials && (n2.credentials = "include"), n2.headers = e4, n2;
    }(t4)), t3);
  }
  var tt = n(285);
  const et = { "[:alnum:]": ["\\p{L}\\p{Nl}\\p{Nd}", true], "[:alpha:]": ["\\p{L}\\p{Nl}", true], "[:ascii:]": ["\\x00-\\x7f", false], "[:blank:]": ["\\p{Zs}\\t", true], "[:cntrl:]": ["\\p{Cc}", true], "[:digit:]": ["\\p{Nd}", true], "[:graph:]": ["\\p{Z}\\p{C}", true, true], "[:lower:]": ["\\p{Ll}", true], "[:print:]": ["\\p{C}", true], "[:punct:]": ["\\p{P}", true], "[:space:]": ["\\p{Z}\\t\\r\\n\\v\\f", true], "[:upper:]": ["\\p{Lu}", true], "[:word:]": ["\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}", true], "[:xdigit:]": ["A-Fa-f0-9", false] }, nt = (t3) => t3.replace(/[[\]\\-]/g, "\\$&"), rt = (t3) => t3.join(""), ot = (t3, e3) => {
    const n2 = e3;
    if ("[" !== t3.charAt(n2))
      throw new Error("not in a brace expression");
    const r2 = [], o3 = [];
    let i3 = n2 + 1, s3 = false, a3 = false, c3 = false, u3 = false, l3 = n2, h3 = "";
    t:
      for (; i3 < t3.length; ) {
        const e4 = t3.charAt(i3);
        if ("!" !== e4 && "^" !== e4 || i3 !== n2 + 1) {
          if ("]" === e4 && s3 && !c3) {
            l3 = i3 + 1;
            break;
          }
          if (s3 = true, "\\" !== e4 || c3) {
            if ("[" === e4 && !c3) {
              for (const [e5, [s4, c4, u4]] of Object.entries(et))
                if (t3.startsWith(e5, i3)) {
                  if (h3)
                    return ["$.", false, t3.length - n2, true];
                  i3 += e5.length, u4 ? o3.push(s4) : r2.push(s4), a3 = a3 || c4;
                  continue t;
                }
            }
            c3 = false, h3 ? (e4 > h3 ? r2.push(nt(h3) + "-" + nt(e4)) : e4 === h3 && r2.push(nt(e4)), h3 = "", i3++) : t3.startsWith("-]", i3 + 1) ? (r2.push(nt(e4 + "-")), i3 += 2) : t3.startsWith("-", i3 + 1) ? (h3 = e4, i3 += 2) : (r2.push(nt(e4)), i3++);
          } else
            c3 = true, i3++;
        } else
          u3 = true, i3++;
      }
    if (l3 < i3)
      return ["", false, 0, false];
    if (!r2.length && !o3.length)
      return ["$.", false, t3.length - n2, true];
    if (0 === o3.length && 1 === r2.length && /^\\?.$/.test(r2[0]) && !u3) {
      return [(p3 = 2 === r2[0].length ? r2[0].slice(-1) : r2[0], p3.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")), false, l3 - n2, false];
    }
    var p3;
    const f3 = "[" + (u3 ? "^" : "") + rt(r2) + "]", d3 = "[" + (u3 ? "" : "^") + rt(o3) + "]";
    return [r2.length && o3.length ? "(" + f3 + "|" + d3 + ")" : r2.length ? f3 : d3, a3, l3 - n2, true];
  };
  function it(t3, e3, n2) {
    var r2;
    return (e3 = "symbol" == typeof (r2 = function(t4, e4) {
      if ("object" != typeof t4 || !t4)
        return t4;
      var n3 = t4[Symbol.toPrimitive];
      if (void 0 !== n3) {
        var r3 = n3.call(t4, "string");
        if ("object" != typeof r3)
          return r3;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return String(t4);
    }(e3)) ? r2 : String(r2)) in t3 ? Object.defineProperty(t3, e3, { value: n2, enumerable: true, configurable: true, writable: true }) : t3[e3] = n2, t3;
  }
  const st = function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return Ft(e3), !(!n2.nocomment && "#" === e3.charAt(0)) && new Bt(e3, n2).match(t3);
  }, at = st, ct = /^\*+([^+@!?\*\[\(]*)$/, ut = (t3) => (e3) => !e3.startsWith(".") && e3.endsWith(t3), lt = (t3) => (e3) => e3.endsWith(t3), ht = (t3) => (t3 = t3.toLowerCase(), (e3) => !e3.startsWith(".") && e3.toLowerCase().endsWith(t3)), pt = (t3) => (t3 = t3.toLowerCase(), (e3) => e3.toLowerCase().endsWith(t3)), ft = /^\*+\.\*+$/, dt = (t3) => !t3.startsWith(".") && t3.includes("."), gt = (t3) => "." !== t3 && ".." !== t3 && t3.includes("."), mt = /^\.\*+$/, vt = (t3) => "." !== t3 && ".." !== t3 && t3.startsWith("."), yt = /^\*+$/, bt = (t3) => 0 !== t3.length && !t3.startsWith("."), wt = (t3) => 0 !== t3.length && "." !== t3 && ".." !== t3, xt = /^\?+([^+@!?\*\[\(]*)?$/, Nt = (t3) => {
    let [e3, n2 = ""] = t3;
    const r2 = Et([e3]);
    return n2 ? (n2 = n2.toLowerCase(), (t4) => r2(t4) && t4.toLowerCase().endsWith(n2)) : r2;
  }, Pt = (t3) => {
    let [e3, n2 = ""] = t3;
    const r2 = Tt([e3]);
    return n2 ? (n2 = n2.toLowerCase(), (t4) => r2(t4) && t4.toLowerCase().endsWith(n2)) : r2;
  }, At = (t3) => {
    let [e3, n2 = ""] = t3;
    const r2 = Tt([e3]);
    return n2 ? (t4) => r2(t4) && t4.endsWith(n2) : r2;
  }, Ot = (t3) => {
    let [e3, n2 = ""] = t3;
    const r2 = Et([e3]);
    return n2 ? (t4) => r2(t4) && t4.endsWith(n2) : r2;
  }, Et = (t3) => {
    let [e3] = t3;
    const n2 = e3.length;
    return (t4) => t4.length === n2 && !t4.startsWith(".");
  }, Tt = (t3) => {
    let [e3] = t3;
    const n2 = e3.length;
    return (t4) => t4.length === n2 && "." !== t4 && ".." !== t4;
  }, jt = "object" == typeof process && process ? "object" == typeof define_process_env_default && define_process_env_default && define_process_env_default.__MINIMATCH_TESTING_PLATFORM__ || process.platform : "posix";
  st.sep = "win32" === jt ? "\\" : "/";
  const Ct = Symbol("globstar **");
  st.GLOBSTAR = Ct;
  const St = { "!": { open: "(?:(?!(?:", close: "))[^/]*?)" }, "?": { open: "(?:", close: ")?" }, "+": { open: "(?:", close: ")+" }, "*": { open: "(?:", close: ")*" }, "@": { open: "(?:", close: ")" } }, It = "[^/]", kt = It + "*?", Rt = (t3) => t3.split("").reduce((t4, e3) => (t4[e3] = true, t4), {}), Lt = Rt("().*{}+?[]^$\\!"), _t = Rt("[.(");
  st.filter = function(t3) {
    let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return (n2) => st(n2, t3, e3);
  };
  const Ut = function(t3) {
    let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return Object.assign({}, t3, e3);
  };
  st.defaults = (t3) => {
    if (!t3 || "object" != typeof t3 || !Object.keys(t3).length)
      return st;
    const e3 = st;
    return Object.assign(function(n2, r2) {
      return e3(n2, r2, Ut(t3, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}));
    }, { Minimatch: class extends e3.Minimatch {
      constructor(e4) {
        super(e4, Ut(t3, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}));
      }
      static defaults(n2) {
        return e3.defaults(Ut(t3, n2)).Minimatch;
      }
    }, unescape: function(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e3.unescape(n2, Ut(t3, r2));
    }, escape: function(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e3.escape(n2, Ut(t3, r2));
    }, filter: function(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e3.filter(n2, Ut(t3, r2));
    }, defaults: (n2) => e3.defaults(Ut(t3, n2)), makeRe: function(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e3.makeRe(n2, Ut(t3, r2));
    }, braceExpand: function(n2) {
      let r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return e3.braceExpand(n2, Ut(t3, r2));
    }, match: function(n2, r2) {
      let o3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      return e3.match(n2, r2, Ut(t3, o3));
    }, sep: e3.sep, GLOBSTAR: Ct });
  };
  const Mt = function(t3) {
    let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return Ft(t3), e3.nobrace || !/\{(?:(?!\{).)*\}/.test(t3) ? [t3] : tt(t3);
  };
  st.braceExpand = Mt;
  const Ft = (t3) => {
    if ("string" != typeof t3)
      throw new TypeError("invalid pattern");
    if (t3.length > 65536)
      throw new TypeError("pattern is too long");
  };
  st.makeRe = function(t3) {
    return new Bt(t3, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).makeRe();
  }, st.match = function(t3, e3) {
    const n2 = new Bt(e3, arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {});
    return t3 = t3.filter((t4) => n2.match(t4)), n2.options.nonull && !t3.length && t3.push(e3), t3;
  };
  const Dt = /[?*]|[+@!]\(.*?\)|\[|\]/, $t = (t3) => t3.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  class Bt {
    constructor(t3) {
      let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      it(this, "options", void 0), it(this, "set", void 0), it(this, "pattern", void 0), it(this, "windowsPathsNoEscape", void 0), it(this, "nonegate", void 0), it(this, "negate", void 0), it(this, "comment", void 0), it(this, "empty", void 0), it(this, "preserveMultipleSlashes", void 0), it(this, "partial", void 0), it(this, "globSet", void 0), it(this, "globParts", void 0), it(this, "nocase", void 0), it(this, "isWindows", void 0), it(this, "platform", void 0), it(this, "windowsNoMagicRoot", void 0), it(this, "regexp", void 0), Ft(t3), e3 = e3 || {}, this.options = e3, this.pattern = t3, this.platform = e3.platform || jt, this.isWindows = "win32" === this.platform, this.windowsPathsNoEscape = !!e3.windowsPathsNoEscape || false === e3.allowWindowsEscape, this.windowsPathsNoEscape && (this.pattern = this.pattern.replace(/\\/g, "/")), this.preserveMultipleSlashes = !!e3.preserveMultipleSlashes, this.regexp = null, this.negate = false, this.nonegate = !!e3.nonegate, this.comment = false, this.empty = false, this.partial = !!e3.partial, this.nocase = !!this.options.nocase, this.windowsNoMagicRoot = void 0 !== e3.windowsNoMagicRoot ? e3.windowsNoMagicRoot : !(!this.isWindows || !this.nocase), this.globSet = [], this.globParts = [], this.set = [], this.make();
    }
    hasMagic() {
      if (this.options.magicalBraces && this.set.length > 1)
        return true;
      for (const t3 of this.set)
        for (const e3 of t3)
          if ("string" != typeof e3)
            return true;
      return false;
    }
    debug() {
    }
    make() {
      const t3 = this.pattern, e3 = this.options;
      if (!e3.nocomment && "#" === t3.charAt(0))
        return void (this.comment = true);
      if (!t3)
        return void (this.empty = true);
      this.parseNegate(), this.globSet = [...new Set(this.braceExpand())], e3.debug && (this.debug = function() {
        return console.error(...arguments);
      }), this.debug(this.pattern, this.globSet);
      const n2 = this.globSet.map((t4) => this.slashSplit(t4));
      this.globParts = this.preprocess(n2), this.debug(this.pattern, this.globParts);
      let r2 = this.globParts.map((t4, e4, n3) => {
        if (this.isWindows && this.windowsNoMagicRoot) {
          const e5 = !("" !== t4[0] || "" !== t4[1] || "?" !== t4[2] && Dt.test(t4[2]) || Dt.test(t4[3])), n4 = /^[a-z]:/i.test(t4[0]);
          if (e5)
            return [...t4.slice(0, 4), ...t4.slice(4).map((t5) => this.parse(t5))];
          if (n4)
            return [t4[0], ...t4.slice(1).map((t5) => this.parse(t5))];
        }
        return t4.map((t5) => this.parse(t5));
      });
      if (this.debug(this.pattern, r2), this.set = r2.filter((t4) => -1 === t4.indexOf(false)), this.isWindows)
        for (let t4 = 0; t4 < this.set.length; t4++) {
          const e4 = this.set[t4];
          "" === e4[0] && "" === e4[1] && "?" === this.globParts[t4][2] && "string" == typeof e4[3] && /^[a-z]:$/i.test(e4[3]) && (e4[2] = "?");
        }
      this.debug(this.pattern, this.set);
    }
    preprocess(t3) {
      if (this.options.noglobstar)
        for (let e4 = 0; e4 < t3.length; e4++)
          for (let n2 = 0; n2 < t3[e4].length; n2++)
            "**" === t3[e4][n2] && (t3[e4][n2] = "*");
      const { optimizationLevel: e3 = 1 } = this.options;
      return e3 >= 2 ? (t3 = this.firstPhasePreProcess(t3), t3 = this.secondPhasePreProcess(t3)) : t3 = e3 >= 1 ? this.levelOneOptimize(t3) : this.adjascentGlobstarOptimize(t3), t3;
    }
    adjascentGlobstarOptimize(t3) {
      return t3.map((t4) => {
        let e3 = -1;
        for (; -1 !== (e3 = t4.indexOf("**", e3 + 1)); ) {
          let n2 = e3;
          for (; "**" === t4[n2 + 1]; )
            n2++;
          n2 !== e3 && t4.splice(e3, n2 - e3);
        }
        return t4;
      });
    }
    levelOneOptimize(t3) {
      return t3.map((t4) => 0 === (t4 = t4.reduce((t5, e3) => {
        const n2 = t5[t5.length - 1];
        return "**" === e3 && "**" === n2 ? t5 : ".." === e3 && n2 && ".." !== n2 && "." !== n2 && "**" !== n2 ? (t5.pop(), t5) : (t5.push(e3), t5);
      }, [])).length ? [""] : t4);
    }
    levelTwoFileOptimize(t3) {
      Array.isArray(t3) || (t3 = this.slashSplit(t3));
      let e3 = false;
      do {
        if (e3 = false, !this.preserveMultipleSlashes) {
          for (let n3 = 1; n3 < t3.length - 1; n3++) {
            const r2 = t3[n3];
            1 === n3 && "" === r2 && "" === t3[0] || "." !== r2 && "" !== r2 || (e3 = true, t3.splice(n3, 1), n3--);
          }
          "." !== t3[0] || 2 !== t3.length || "." !== t3[1] && "" !== t3[1] || (e3 = true, t3.pop());
        }
        let n2 = 0;
        for (; -1 !== (n2 = t3.indexOf("..", n2 + 1)); ) {
          const r2 = t3[n2 - 1];
          r2 && "." !== r2 && ".." !== r2 && "**" !== r2 && (e3 = true, t3.splice(n2 - 1, 2), n2 -= 2);
        }
      } while (e3);
      return 0 === t3.length ? [""] : t3;
    }
    firstPhasePreProcess(t3) {
      let e3 = false;
      do {
        e3 = false;
        for (let n2 of t3) {
          let r2 = -1;
          for (; -1 !== (r2 = n2.indexOf("**", r2 + 1)); ) {
            let o4 = r2;
            for (; "**" === n2[o4 + 1]; )
              o4++;
            o4 > r2 && n2.splice(r2 + 1, o4 - r2);
            let i3 = n2[r2 + 1];
            const s3 = n2[r2 + 2], a3 = n2[r2 + 3];
            if (".." !== i3)
              continue;
            if (!s3 || "." === s3 || ".." === s3 || !a3 || "." === a3 || ".." === a3)
              continue;
            e3 = true, n2.splice(r2, 1);
            const c3 = n2.slice(0);
            c3[r2] = "**", t3.push(c3), r2--;
          }
          if (!this.preserveMultipleSlashes) {
            for (let t4 = 1; t4 < n2.length - 1; t4++) {
              const r3 = n2[t4];
              1 === t4 && "" === r3 && "" === n2[0] || "." !== r3 && "" !== r3 || (e3 = true, n2.splice(t4, 1), t4--);
            }
            "." !== n2[0] || 2 !== n2.length || "." !== n2[1] && "" !== n2[1] || (e3 = true, n2.pop());
          }
          let o3 = 0;
          for (; -1 !== (o3 = n2.indexOf("..", o3 + 1)); ) {
            const t4 = n2[o3 - 1];
            if (t4 && "." !== t4 && ".." !== t4 && "**" !== t4) {
              e3 = true;
              const t5 = 1 === o3 && "**" === n2[o3 + 1] ? ["."] : [];
              n2.splice(o3 - 1, 2, ...t5), 0 === n2.length && n2.push(""), o3 -= 2;
            }
          }
        }
      } while (e3);
      return t3;
    }
    secondPhasePreProcess(t3) {
      for (let e3 = 0; e3 < t3.length - 1; e3++)
        for (let n2 = e3 + 1; n2 < t3.length; n2++) {
          const r2 = this.partsMatch(t3[e3], t3[n2], !this.preserveMultipleSlashes);
          r2 && (t3[e3] = r2, t3[n2] = []);
        }
      return t3.filter((t4) => t4.length);
    }
    partsMatch(t3, e3) {
      let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r2 = 0, o3 = 0, i3 = [], s3 = "";
      for (; r2 < t3.length && o3 < e3.length; )
        if (t3[r2] === e3[o3])
          i3.push("b" === s3 ? e3[o3] : t3[r2]), r2++, o3++;
        else if (n2 && "**" === t3[r2] && e3[o3] === t3[r2 + 1])
          i3.push(t3[r2]), r2++;
        else if (n2 && "**" === e3[o3] && t3[r2] === e3[o3 + 1])
          i3.push(e3[o3]), o3++;
        else if ("*" !== t3[r2] || !e3[o3] || !this.options.dot && e3[o3].startsWith(".") || "**" === e3[o3]) {
          if ("*" !== e3[o3] || !t3[r2] || !this.options.dot && t3[r2].startsWith(".") || "**" === t3[r2])
            return false;
          if ("a" === s3)
            return false;
          s3 = "b", i3.push(e3[o3]), r2++, o3++;
        } else {
          if ("b" === s3)
            return false;
          s3 = "a", i3.push(t3[r2]), r2++, o3++;
        }
      return t3.length === e3.length && i3;
    }
    parseNegate() {
      if (this.nonegate)
        return;
      const t3 = this.pattern;
      let e3 = false, n2 = 0;
      for (let r2 = 0; r2 < t3.length && "!" === t3.charAt(r2); r2++)
        e3 = !e3, n2++;
      n2 && (this.pattern = t3.slice(n2)), this.negate = e3;
    }
    matchOne(t3, e3) {
      let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
      const r2 = this.options;
      if (this.isWindows) {
        const n3 = "" === t3[0] && "" === t3[1] && "?" === t3[2] && "string" == typeof t3[3] && /^[a-z]:$/i.test(t3[3]), r3 = "" === e3[0] && "" === e3[1] && "?" === e3[2] && "string" == typeof e3[3] && /^[a-z]:$/i.test(e3[3]);
        if (n3 && r3) {
          const n4 = t3[3], r4 = e3[3];
          n4.toLowerCase() === r4.toLowerCase() && (t3[3] = r4);
        } else if (r3 && "string" == typeof t3[0]) {
          const n4 = e3[3], r4 = t3[0];
          n4.toLowerCase() === r4.toLowerCase() && (e3[3] = r4, e3 = e3.slice(3));
        } else if (n3 && "string" == typeof e3[0]) {
          const n4 = t3[3];
          n4.toLowerCase() === e3[0].toLowerCase() && (e3[0] = n4, t3 = t3.slice(3));
        }
      }
      const { optimizationLevel: o3 = 1 } = this.options;
      o3 >= 2 && (t3 = this.levelTwoFileOptimize(t3)), this.debug("matchOne", this, { file: t3, pattern: e3 }), this.debug("matchOne", t3.length, e3.length);
      for (var i3 = 0, s3 = 0, a3 = t3.length, c3 = e3.length; i3 < a3 && s3 < c3; i3++, s3++) {
        this.debug("matchOne loop");
        var u3 = e3[s3], l3 = t3[i3];
        if (this.debug(e3, u3, l3), false === u3)
          return false;
        if (u3 === Ct) {
          this.debug("GLOBSTAR", [e3, u3, l3]);
          var h3 = i3, p3 = s3 + 1;
          if (p3 === c3) {
            for (this.debug("** at the end"); i3 < a3; i3++)
              if ("." === t3[i3] || ".." === t3[i3] || !r2.dot && "." === t3[i3].charAt(0))
                return false;
            return true;
          }
          for (; h3 < a3; ) {
            var f3 = t3[h3];
            if (this.debug("\nglobstar while", t3, h3, e3, p3, f3), this.matchOne(t3.slice(h3), e3.slice(p3), n2))
              return this.debug("globstar found match!", h3, a3, f3), true;
            if ("." === f3 || ".." === f3 || !r2.dot && "." === f3.charAt(0)) {
              this.debug("dot detected!", t3, h3, e3, p3);
              break;
            }
            this.debug("globstar swallow a segment, and continue"), h3++;
          }
          return !(!n2 || (this.debug("\n>>> no match, partial?", t3, h3, e3, p3), h3 !== a3));
        }
        let o4;
        if ("string" == typeof u3 ? (o4 = l3 === u3, this.debug("string match", u3, l3, o4)) : (o4 = u3.test(l3), this.debug("pattern match", u3, l3, o4)), !o4)
          return false;
      }
      if (i3 === a3 && s3 === c3)
        return true;
      if (i3 === a3)
        return n2;
      if (s3 === c3)
        return i3 === a3 - 1 && "" === t3[i3];
      throw new Error("wtf?");
    }
    braceExpand() {
      return Mt(this.pattern, this.options);
    }
    parse(t3) {
      Ft(t3);
      const e3 = this.options;
      if ("**" === t3)
        return Ct;
      if ("" === t3)
        return "";
      let n2, r2 = null;
      (n2 = t3.match(yt)) ? r2 = e3.dot ? wt : bt : (n2 = t3.match(ct)) ? r2 = (e3.nocase ? e3.dot ? pt : ht : e3.dot ? lt : ut)(n2[1]) : (n2 = t3.match(xt)) ? r2 = (e3.nocase ? e3.dot ? Pt : Nt : e3.dot ? At : Ot)(n2) : (n2 = t3.match(ft)) ? r2 = e3.dot ? gt : dt : (n2 = t3.match(mt)) && (r2 = vt);
      let o3 = "", i3 = false, s3 = false;
      const a3 = [], c3 = [];
      let u3, l3 = false, h3 = false, p3 = "." === t3.charAt(0), f3 = e3.dot || p3;
      const d3 = (t4) => "." === t4.charAt(0) ? "" : e3.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", g2 = () => {
        if (l3) {
          switch (l3) {
            case "*":
              o3 += kt, i3 = true;
              break;
            case "?":
              o3 += It, i3 = true;
              break;
            default:
              o3 += "\\" + l3;
          }
          this.debug("clearStateChar %j %j", l3, o3), l3 = false;
        }
      };
      for (let n3, r3 = 0; r3 < t3.length && (n3 = t3.charAt(r3)); r3++)
        if (this.debug("%s	%s %s %j", t3, r3, o3, n3), s3) {
          if ("/" === n3)
            return false;
          Lt[n3] && (o3 += "\\"), o3 += n3, s3 = false;
        } else
          switch (n3) {
            case "/":
              return false;
            case "\\":
              g2(), s3 = true;
              continue;
            case "?":
            case "*":
            case "+":
            case "@":
            case "!":
              this.debug("%s	%s %s %j <-- stateChar", t3, r3, o3, n3), this.debug("call clearStateChar %j", l3), g2(), l3 = n3, e3.noext && g2();
              continue;
            case "(": {
              if (!l3) {
                o3 += "\\(";
                continue;
              }
              const e4 = { type: l3, start: r3 - 1, reStart: o3.length, open: St[l3].open, close: St[l3].close };
              this.debug(this.pattern, "	", e4), a3.push(e4), o3 += e4.open, 0 === e4.start && "!" !== e4.type && (p3 = true, o3 += d3(t3.slice(r3 + 1))), this.debug("plType %j %j", l3, o3), l3 = false;
              continue;
            }
            case ")": {
              const t4 = a3[a3.length - 1];
              if (!t4) {
                o3 += "\\)";
                continue;
              }
              a3.pop(), g2(), i3 = true, u3 = t4, o3 += u3.close, "!" === u3.type && c3.push(Object.assign(u3, { reEnd: o3.length }));
              continue;
            }
            case "|": {
              const e4 = a3[a3.length - 1];
              if (!e4) {
                o3 += "\\|";
                continue;
              }
              g2(), o3 += "|", 0 === e4.start && "!" !== e4.type && (p3 = true, o3 += d3(t3.slice(r3 + 1)));
              continue;
            }
            case "[":
              g2();
              const [f4, m3, v3, y2] = ot(t3, r3);
              v3 ? (o3 += f4, h3 = h3 || m3, r3 += v3 - 1, i3 = i3 || y2) : o3 += "\\[";
              continue;
            case "]":
              o3 += "\\" + n3;
              continue;
            default:
              g2(), o3 += $t(n3);
          }
      for (u3 = a3.pop(); u3; u3 = a3.pop()) {
        let t4;
        t4 = o3.slice(u3.reStart + u3.open.length), this.debug(this.pattern, "setting tail", o3, u3), t4 = t4.replace(/((?:\\{2}){0,64})(\\?)\|/g, (t5, e5, n3) => (n3 || (n3 = "\\"), e5 + e5 + n3 + "|")), this.debug("tail=%j\n   %s", t4, t4, u3, o3);
        const e4 = "*" === u3.type ? kt : "?" === u3.type ? It : "\\" + u3.type;
        i3 = true, o3 = o3.slice(0, u3.reStart) + e4 + "\\(" + t4;
      }
      g2(), s3 && (o3 += "\\\\");
      const m2 = _t[o3.charAt(0)];
      for (let t4 = c3.length - 1; t4 > -1; t4--) {
        const e4 = c3[t4], n3 = o3.slice(0, e4.reStart), r3 = o3.slice(e4.reStart, e4.reEnd - 8);
        let i4 = o3.slice(e4.reEnd);
        const s4 = o3.slice(e4.reEnd - 8, e4.reEnd) + i4, a4 = n3.split(")").length, u4 = n3.split("(").length - a4;
        let l4 = i4;
        for (let t5 = 0; t5 < u4; t5++)
          l4 = l4.replace(/\)[+*?]?/, "");
        i4 = l4, o3 = n3 + r3 + i4 + ("" === i4 ? "(?:$|\\/)" : "") + s4;
      }
      if ("" !== o3 && i3 && (o3 = "(?=.)" + o3), m2 && (o3 = (p3 ? "" : f3 ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)") + o3), !e3.nocase || i3 || e3.nocaseMagicOnly || (i3 = t3.toUpperCase() !== t3.toLowerCase()), !i3)
        return o3.replace(/\\(.)/g, "$1");
      const v2 = (e3.nocase ? "i" : "") + (h3 ? "u" : "");
      try {
        const e4 = r2 ? { _glob: t3, _src: o3, test: r2 } : { _glob: t3, _src: o3 };
        return Object.assign(new RegExp("^" + o3 + "$", v2), e4);
      } catch (t4) {
        return this.debug("invalid regexp", t4), new RegExp("$.");
      }
    }
    makeRe() {
      if (this.regexp || false === this.regexp)
        return this.regexp;
      const t3 = this.set;
      if (!t3.length)
        return this.regexp = false, this.regexp;
      const e3 = this.options, n2 = e3.noglobstar ? kt : e3.dot ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?" : "(?:(?!(?:\\/|^)\\.).)*?", r2 = e3.nocase ? "i" : "";
      let o3 = t3.map((t4) => {
        const e4 = t4.map((t5) => "string" == typeof t5 ? $t(t5) : t5 === Ct ? Ct : t5._src);
        return e4.forEach((t5, r3) => {
          const o4 = e4[r3 + 1], i3 = e4[r3 - 1];
          t5 === Ct && i3 !== Ct && (void 0 === i3 ? void 0 !== o4 && o4 !== Ct ? e4[r3 + 1] = "(?:\\/|" + n2 + "\\/)?" + o4 : e4[r3] = n2 : void 0 === o4 ? e4[r3 - 1] = i3 + "(?:\\/|" + n2 + ")?" : o4 !== Ct && (e4[r3 - 1] = i3 + "(?:\\/|\\/" + n2 + "\\/)" + o4, e4[r3 + 1] = Ct));
        }), e4.filter((t5) => t5 !== Ct).join("/");
      }).join("|");
      o3 = "^(?:" + o3 + ")$", this.negate && (o3 = "^(?!" + o3 + ").*$");
      try {
        this.regexp = new RegExp(o3, r2);
      } catch (t4) {
        this.regexp = false;
      }
      return this.regexp;
    }
    slashSplit(t3) {
      return this.preserveMultipleSlashes ? t3.split("/") : this.isWindows && /^\/\/[^\/]+/.test(t3) ? ["", ...t3.split(/\/+/)] : t3.split(/\/+/);
    }
    match(t3) {
      let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.partial;
      if (this.debug("match", t3, this.pattern), this.comment)
        return false;
      if (this.empty)
        return "" === t3;
      if ("/" === t3 && e3)
        return true;
      const n2 = this.options;
      this.isWindows && (t3 = t3.split("\\").join("/"));
      const r2 = this.slashSplit(t3);
      this.debug(this.pattern, "split", r2);
      const o3 = this.set;
      this.debug(this.pattern, "set", o3);
      let i3 = r2[r2.length - 1];
      if (!i3)
        for (let t4 = r2.length - 2; !i3 && t4 >= 0; t4--)
          i3 = r2[t4];
      for (let t4 = 0; t4 < o3.length; t4++) {
        const s3 = o3[t4];
        let a3 = r2;
        if (n2.matchBase && 1 === s3.length && (a3 = [i3]), this.matchOne(a3, s3, e3))
          return !!n2.flipNegate || !this.negate;
      }
      return !n2.flipNegate && this.negate;
    }
    static defaults(t3) {
      return st.defaults(t3).Minimatch;
    }
  }
  function Wt(t3) {
    const e3 = new Error("".concat(arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "", "Invalid response: ").concat(t3.status, " ").concat(t3.statusText));
    return e3.status = t3.status, e3.response = t3, e3;
  }
  function Vt(t3, e3) {
    const { status: n2 } = e3;
    if (401 === n2 && t3.digest)
      return e3;
    if (n2 >= 400)
      throw Wt(e3);
    return e3;
  }
  function zt(t3, e3) {
    return arguments.length > 2 && void 0 !== arguments[2] && arguments[2] ? { data: e3, headers: t3.headers ? B(t3.headers) : {}, status: t3.status, statusText: t3.statusText } : e3;
  }
  st.Minimatch = Bt, st.escape = function(t3) {
    let { windowsPathsNoEscape: e3 = false } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e3 ? t3.replace(/[?*()[\]]/g, "[$&]") : t3.replace(/[?*()[\]\\]/g, "\\$&");
  }, st.unescape = function(t3) {
    let { windowsPathsNoEscape: e3 = false } = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return e3 ? t3.replace(/\[([^\/\\])\]/g, "$1") : t3.replace(/((?!\\).|^)\[([^\/\\])\]/g, "$1$2").replace(/\\([^\/])/g, "$1");
  };
  const qt = (Gt = function(t3, e3, n2) {
    let r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const o3 = J({ url: g(t3.remoteURL, h2(e3)), method: "COPY", headers: { Destination: g(t3.remoteURL, h2(n2)), Overwrite: false === r2.overwrite ? "F" : "T", Depth: r2.shallow ? "0" : "infinity" } }, t3, r2);
    return s3 = function(e4) {
      Vt(t3, e4);
    }, (i3 = K(o3, t3)) && i3.then || (i3 = Promise.resolve(i3)), s3 ? i3.then(s3) : i3;
    var i3, s3;
  }, function() {
    for (var t3 = [], e3 = 0; e3 < arguments.length; e3++)
      t3[e3] = arguments[e3];
    try {
      return Promise.resolve(Gt.apply(this, t3));
    } catch (t4) {
      return Promise.reject(t4);
    }
  });
  var Gt, Ht = n(635), Xt = n(829), Zt = n.n(Xt), Yt = function(t3) {
    return t3.Array = "array", t3.Object = "object", t3.Original = "original", t3;
  }(Yt || {});
  function Kt(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Yt.Original;
    const r2 = Zt().get(t3, e3);
    return "array" === n2 && false === Array.isArray(r2) ? [r2] : "object" === n2 && Array.isArray(r2) ? r2[0] : r2;
  }
  function Jt(t3) {
    return new Promise((e3) => {
      e3(function(t4) {
        const { multistatus: e4 } = t4;
        if ("" === e4)
          return { multistatus: { response: [] } };
        if (!e4)
          throw new Error("Invalid response: No root multistatus found");
        const n2 = { multistatus: Array.isArray(e4) ? e4[0] : e4 };
        return Zt().set(n2, "multistatus.response", Kt(n2, "multistatus.response", Yt.Array)), Zt().set(n2, "multistatus.response", Zt().get(n2, "multistatus.response").map((t5) => function(t6) {
          const e5 = Object.assign({}, t6);
          return e5.status ? Zt().set(e5, "status", Kt(e5, "status", Yt.Object)) : (Zt().set(e5, "propstat", Kt(e5, "propstat", Yt.Object)), Zt().set(e5, "propstat.prop", Kt(e5, "propstat.prop", Yt.Object))), e5;
        }(t5))), n2;
      }(new Ht.XMLParser({ removeNSPrefix: true, numberParseOptions: { hex: true, leadingZeros: false } }).parse(t3)));
    });
  }
  function Qt(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
    const { getlastmodified: r2 = null, getcontentlength: o3 = "0", resourcetype: i3 = null, getcontenttype: s3 = null, getetag: a3 = null } = t3, u3 = i3 && "object" == typeof i3 && void 0 !== i3.collection ? "directory" : "file", l3 = { filename: e3, basename: c2().basename(e3), lastmod: r2, size: parseInt(o3, 10), type: u3, etag: "string" == typeof a3 ? a3.replace(/"/g, "") : null };
    return "file" === u3 && (l3.mime = s3 && "string" == typeof s3 ? s3.split(";")[0] : ""), n2 && (l3.props = t3), l3;
  }
  function te(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2], r2 = null;
    try {
      t3.multistatus.response[0].propstat && (r2 = t3.multistatus.response[0]);
    } catch (t4) {
    }
    if (!r2)
      throw new Error("Failed getting item stat: bad response");
    const { propstat: { prop: o3, status: i3 } } = r2, [s3, a3, c3] = i3.split(" ", 3), u3 = parseInt(a3, 10);
    if (u3 >= 400) {
      const t4 = new Error("Invalid response: ".concat(u3, " ").concat(c3));
      throw t4.status = u3, t4;
    }
    return Qt(o3, f2(e3), n2);
  }
  function ee(t3) {
    switch (t3.toString()) {
      case "-3":
        return "unlimited";
      case "-2":
      case "-1":
        return "unknown";
      default:
        return parseInt(t3, 10);
    }
  }
  function ne(t3, e3, n2) {
    return n2 ? e3 ? e3(t3) : t3 : (t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3);
  }
  const re = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const { details: r2 = false } = n2, o3 = J({ url: g(t3.remoteURL, h2(e3)), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: "0" } }, t3, n2);
    return ne(K(o3, t3), function(n3) {
      return Vt(t3, n3), ne(n3.text(), function(t4) {
        return ne(Jt(t4), function(t5) {
          const o4 = te(t5, e3, r2);
          return zt(n3, o4, r2);
        });
      });
    });
  });
  function oe(t3, e3, n2) {
    return n2 ? e3 ? e3(t3) : t3 : (t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3);
  }
  const ie = se(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = function(t4) {
      if (!t4 || "/" === t4)
        return [];
      let e4 = t4;
      const n3 = [];
      do {
        n3.push(e4), e4 = c2().dirname(e4);
      } while (e4 && "/" !== e4);
      return n3;
    }(f2(e3));
    r2.sort((t4, e4) => t4.length > e4.length ? 1 : e4.length > t4.length ? -1 : 0);
    let o3 = false;
    return function(t4, e4, n3) {
      if ("function" == typeof t4[ue]) {
        let l3 = function(t5) {
          try {
            for (; !(r3 = s3.next()).done; )
              if ((t5 = e4(r3.value)) && t5.then) {
                if (!pe(t5))
                  return void t5.then(l3, i3 || (i3 = le.bind(null, o4 = new he(), 2)));
                t5 = t5.v;
              }
            o4 ? le(o4, 1, t5) : o4 = t5;
          } catch (t6) {
            le(o4 || (o4 = new he()), 2, t6);
          }
        };
        var r3, o4, i3, s3 = t4[ue]();
        if (l3(), s3.return) {
          var a3 = function(t5) {
            try {
              r3.done || s3.return();
            } catch (t6) {
            }
            return t5;
          };
          if (o4 && o4.then)
            return o4.then(a3, function(t5) {
              throw a3(t5);
            });
          a3();
        }
        return o4;
      }
      if (!("length" in t4))
        throw new TypeError("Object is not iterable");
      for (var c3 = [], u3 = 0; u3 < t4.length; u3++)
        c3.push(t4[u3]);
      return function(t5, e5, n4) {
        var r4, o5, i4 = -1;
        return function s4(a4) {
          try {
            for (; ++i4 < t5.length && (!n4 || !n4()); )
              if ((a4 = e5(i4)) && a4.then) {
                if (!pe(a4))
                  return void a4.then(s4, o5 || (o5 = le.bind(null, r4 = new he(), 2)));
                a4 = a4.v;
              }
            r4 ? le(r4, 1, a4) : r4 = a4;
          } catch (t6) {
            le(r4 || (r4 = new he()), 2, t6);
          }
        }(), r4;
      }(c3, function(t5) {
        return e4(c3[t5]);
      }, n3);
    }(r2, function(r3) {
      return i3 = function() {
        return function(n3, o4) {
          try {
            var i4 = oe(re(t3, r3), function(t4) {
              if ("directory" !== t4.type)
                throw new Error("Path includes a file: ".concat(e3));
            });
          } catch (t4) {
            return o4(t4);
          }
          return i4 && i4.then ? i4.then(void 0, o4) : i4;
        }(0, function(e4) {
          const i4 = e4;
          return function() {
            if (404 === i4.status)
              return o3 = true, ce(fe(t3, r3, { ...n2, recursive: false }));
            throw e4;
          }();
        });
      }, (s3 = function() {
        if (o3)
          return ce(fe(t3, r3, { ...n2, recursive: false }));
      }()) && s3.then ? s3.then(i3) : i3();
      var i3, s3;
    }, function() {
      return false;
    });
  });
  function se(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }
  function ae() {
  }
  function ce(t3, e3) {
    if (!e3)
      return t3 && t3.then ? t3.then(ae) : Promise.resolve();
  }
  const ue = "undefined" != typeof Symbol ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
  function le(t3, e3, n2) {
    if (!t3.s) {
      if (n2 instanceof he) {
        if (!n2.s)
          return void (n2.o = le.bind(null, t3, e3));
        1 & e3 && (e3 = n2.s), n2 = n2.v;
      }
      if (n2 && n2.then)
        return void n2.then(le.bind(null, t3, e3), le.bind(null, t3, 2));
      t3.s = e3, t3.v = n2;
      const r2 = t3.o;
      r2 && r2(t3);
    }
  }
  const he = function() {
    function t3() {
    }
    return t3.prototype.then = function(e3, n2) {
      const r2 = new t3(), o3 = this.s;
      if (o3) {
        const t4 = 1 & o3 ? e3 : n2;
        if (t4) {
          try {
            le(r2, 1, t4(this.v));
          } catch (t5) {
            le(r2, 2, t5);
          }
          return r2;
        }
        return this;
      }
      return this.o = function(t4) {
        try {
          const o4 = t4.v;
          1 & t4.s ? le(r2, 1, e3 ? e3(o4) : o4) : n2 ? le(r2, 1, n2(o4)) : le(r2, 2, o4);
        } catch (t5) {
          le(r2, 2, t5);
        }
      }, r2;
    }, t3;
  }();
  function pe(t3) {
    return t3 instanceof he && 1 & t3.s;
  }
  const fe = se(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    if (true === n2.recursive)
      return ie(t3, e3, n2);
    const r2 = J({ url: g(t3.remoteURL, (o3 = h2(e3), o3.endsWith("/") ? o3 : o3 + "/")), method: "MKCOL" }, t3, n2);
    var o3;
    return oe(K(r2, t3), function(e4) {
      Vt(t3, e4);
    });
  });
  var de = n(388), ge = n.n(de);
  const me = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = {};
    if ("object" == typeof n2.range && "number" == typeof n2.range.start) {
      let t4 = "bytes=".concat(n2.range.start, "-");
      "number" == typeof n2.range.end && (t4 = "".concat(t4).concat(n2.range.end)), r2.Range = t4;
    }
    const o3 = J({ url: g(t3.remoteURL, h2(e3)), method: "GET", headers: r2 }, t3, n2);
    return s3 = function(e4) {
      if (Vt(t3, e4), r2.Range && 206 !== e4.status) {
        const t4 = new Error("Invalid response code for partial request: ".concat(e4.status));
        throw t4.status = e4.status, t4;
      }
      return n2.callback && setTimeout(() => {
        n2.callback(e4);
      }, 0), e4.body;
    }, (i3 = K(o3, t3)) && i3.then || (i3 = Promise.resolve(i3)), s3 ? i3.then(s3) : i3;
    var i3, s3;
  }), ve = () => {
  }, ye = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3, n2) {
    n2.url || (n2.url = g(t3.remoteURL, h2(e3)));
    const r2 = J(n2, t3, {});
    return i3 = function(e4) {
      return Vt(t3, e4), e4;
    }, (o3 = K(r2, t3)) && o3.then || (o3 = Promise.resolve(o3)), i3 ? o3.then(i3) : o3;
    var o3, i3;
  }), be = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = J({ url: g(t3.remoteURL, h2(e3)), method: "DELETE" }, t3, n2);
    return i3 = function(e4) {
      Vt(t3, e4);
    }, (o3 = K(r2, t3)) && o3.then || (o3 = Promise.resolve(o3)), i3 ? o3.then(i3) : o3;
    var o3, i3;
  }), we = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    return function(r2, o3) {
      try {
        var i3 = (s3 = re(t3, e3, n2), a3 = function() {
          return true;
        }, c3 ? a3 ? a3(s3) : s3 : (s3 && s3.then || (s3 = Promise.resolve(s3)), a3 ? s3.then(a3) : s3));
      } catch (t4) {
        return o3(t4);
      }
      var s3, a3, c3;
      return i3 && i3.then ? i3.then(void 0, o3) : i3;
    }(0, function(t4) {
      if (404 === t4.status)
        return false;
      throw t4;
    });
  });
  function xe(t3, e3, n2) {
    return n2 ? e3 ? e3(t3) : t3 : (t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3);
  }
  const Ne = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = J({ url: g(t3.remoteURL, h2(e3), "/"), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: n2.deep ? "infinity" : "1" } }, t3, n2);
    return xe(K(r2, t3), function(r3) {
      return Vt(t3, r3), xe(r3.text(), function(o3) {
        if (!o3)
          throw new Error("Failed parsing directory contents: Empty response");
        return xe(Jt(o3), function(o4) {
          const i3 = p2(e3);
          let a3 = function(t4, e4, n3) {
            let r4 = arguments.length > 3 && void 0 !== arguments[3] && arguments[3], o5 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
            const i4 = c2().join(e4, "/"), { multistatus: { response: a4 } } = t4, u3 = a4.map((t5) => {
              const e5 = function(t6) {
                try {
                  return t6.replace(/^https?:\/\/[^\/]+/, "");
                } catch (t7) {
                  throw new s2(t7, "Failed normalising HREF");
                }
              }(t5.href), { propstat: { prop: n4 } } = t5;
              return Qt(n4, "/" === i4 ? decodeURIComponent(f2(e5)) : f2(c2().relative(decodeURIComponent(i4), decodeURIComponent(e5))), r4);
            });
            return o5 ? u3 : u3.filter((t5) => t5.basename && ("file" === t5.type || t5.filename !== n3.replace(/\/$/, "")));
          }(o4, p2(t3.remoteBasePath || t3.remotePath), i3, n2.details, n2.includeSelf);
          return n2.glob && (a3 = function(t4, e4) {
            return t4.filter((t5) => at(t5.filename, e4, { matchBase: true }));
          }(a3, n2.glob)), zt(r3, a3, n2.details);
        });
      });
    });
  });
  function Pe(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }
  const Ae = Pe(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = J({ url: g(t3.remoteURL, h2(e3)), method: "GET", headers: { Accept: "text/plain" }, transformResponse: [je] }, t3, n2);
    return Oe(K(r2, t3), function(e4) {
      return Vt(t3, e4), Oe(e4.text(), function(t4) {
        return zt(e4, t4, n2.details);
      });
    });
  });
  function Oe(t3, e3, n2) {
    return n2 ? e3 ? e3(t3) : t3 : (t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3);
  }
  const Ee = Pe(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = J({ url: g(t3.remoteURL, h2(e3)), method: "GET" }, t3, n2);
    return Oe(K(r2, t3), function(e4) {
      let r3;
      return Vt(t3, e4), function(t4, e5) {
        var n3 = t4();
        return n3 && n3.then ? n3.then(e5) : e5();
      }(function() {
        return Oe(e4.arrayBuffer(), function(t4) {
          r3 = t4;
        });
      }, function() {
        return zt(e4, r3, n2.details);
      });
    });
  }), Te = Pe(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const { format: r2 = "binary" } = n2;
    if ("binary" !== r2 && "text" !== r2)
      throw new s2({ info: { code: S.InvalidOutputFormat } }, "Invalid output format: ".concat(r2));
    return "text" === r2 ? Ae(t3, e3, n2) : Ee(t3, e3, n2);
  }), je = (t3) => t3;
  function Ce(t3) {
    return new Ht.XMLBuilder({ attributeNamePrefix: "@_", format: true, ignoreAttributes: false, suppressEmptyNode: true }).build(Se({ lockinfo: { "@_xmlns:d": "DAV:", lockscope: { exclusive: {} }, locktype: { write: {} }, owner: { href: t3 } } }, "d"));
  }
  function Se(t3, e3) {
    const n2 = { ...t3 };
    for (const t4 in n2)
      n2.hasOwnProperty(t4) && (n2[t4] && "object" == typeof n2[t4] && -1 === t4.indexOf(":") ? (n2["".concat(e3, ":").concat(t4)] = Se(n2[t4], e3), delete n2[t4]) : false === /^@_/.test(t4) && (n2["".concat(e3, ":").concat(t4)] = n2[t4], delete n2[t4]));
    return n2;
  }
  function Ie(t3, e3, n2) {
    return n2 ? e3 ? e3(t3) : t3 : (t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3);
  }
  function ke(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }
  const Re = ke(function(t3, e3, n2) {
    let r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const o3 = J({ url: g(t3.remoteURL, h2(e3)), method: "UNLOCK", headers: { "Lock-Token": n2 } }, t3, r2);
    return Ie(K(o3, t3), function(e4) {
      if (Vt(t3, e4), 204 !== e4.status && 200 !== e4.status)
        throw Wt(e4);
    });
  }), Le = ke(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const { refreshToken: r2, timeout: o3 = _e } = n2, i3 = { Accept: "text/plain,application/xml", Timeout: o3 };
    r2 && (i3.If = r2);
    const s3 = J({ url: g(t3.remoteURL, h2(e3)), method: "LOCK", headers: i3, data: Ce(t3.contactHref) }, t3, n2);
    return Ie(K(s3, t3), function(e4) {
      return Vt(t3, e4), Ie(e4.text(), function(t4) {
        const n3 = (i4 = t4, new Ht.XMLParser({ removeNSPrefix: true, parseAttributeValue: true, parseTagValue: true }).parse(i4)), r3 = Zt().get(n3, "prop.lockdiscovery.activelock.locktoken.href"), o4 = Zt().get(n3, "prop.lockdiscovery.activelock.timeout");
        var i4;
        if (!r3)
          throw Wt(e4, "No lock token received: ");
        return { token: r3, serverTimeout: o4 };
      });
    });
  }), _e = "Infinite, Second-4100000000";
  function Ue(t3, e3, n2) {
    return n2 ? e3 ? e3(t3) : t3 : (t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3);
  }
  const Me = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3) {
    let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const n2 = e3.path || "/", r2 = J({ url: g(t3.remoteURL, n2), method: "PROPFIND", headers: { Accept: "text/plain,application/xml", Depth: "0" } }, t3, e3);
    return Ue(K(r2, t3), function(n3) {
      return Vt(t3, n3), Ue(n3.text(), function(t4) {
        return Ue(Jt(t4), function(t5) {
          const r3 = function(t6) {
            try {
              const [e4] = t6.multistatus.response, { propstat: { prop: { "quota-used-bytes": n4, "quota-available-bytes": r4 } } } = e4;
              return void 0 !== n4 && void 0 !== r4 ? { used: parseInt(n4, 10), available: ee(r4) } : null;
            } catch (t7) {
            }
            return null;
          }(t5);
          return zt(n3, r3, e3.details);
        });
      });
    });
  });
  function Fe(t3, e3, n2) {
    return n2 ? e3 ? e3(t3) : t3 : (t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3);
  }
  const De = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const { details: r2 = false } = n2, o3 = J({ url: g(t3.remoteURL, h2(e3)), method: "SEARCH", headers: { Accept: "text/plain,application/xml", "Content-Type": t3.headers["Content-Type"] || "application/xml; charset=utf-8" } }, t3, n2);
    return Fe(K(o3, t3), function(n3) {
      return Vt(t3, n3), Fe(n3.text(), function(t4) {
        return Fe(Jt(t4), function(t5) {
          const o4 = function(t6, e4, n4) {
            const r3 = { truncated: false, results: [] };
            return r3.truncated = t6.multistatus.response.some((t7) => {
              var n5, r4;
              return "507" === (null === (n5 = (t7.status || (null === (r4 = t7.propstat) || void 0 === r4 ? void 0 : r4.status)).split(" ", 3)) || void 0 === n5 ? void 0 : n5[1]) && t7.href.replace(/\/$/, "").endsWith(h2(e4).replace(/\/$/, ""));
            }), t6.multistatus.response.forEach((t7) => {
              if (void 0 === t7.propstat)
                return;
              const e5 = t7.href.split("/").map(decodeURIComponent).join("/");
              r3.results.push(Qt(t7.propstat.prop, e5, n4));
            }), r3;
          }(t5, e3, r2);
          return zt(n3, o4, r2);
        });
      });
    });
  }), $e = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3, n2) {
    let r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const o3 = J({ url: g(t3.remoteURL, h2(e3)), method: "MOVE", headers: { Destination: g(t3.remoteURL, h2(n2)), Overwrite: false === r2.overwrite ? "F" : "T" } }, t3, r2);
    return s3 = function(e4) {
      Vt(t3, e4);
    }, (i3 = K(o3, t3)) && i3.then || (i3 = Promise.resolve(i3)), s3 ? i3.then(s3) : i3;
    var i3, s3;
  });
  var Be = n(172);
  const We = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3, n2) {
    let r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const { contentLength: o3 = true, overwrite: i3 = true } = r2, a3 = { "Content-Type": "application/octet-stream" };
    false === o3 || (a3["Content-Length"] = "".concat("number" == typeof o3 ? o3 : function(t4) {
      if (q(t4))
        return t4.byteLength;
      if (G(t4))
        return t4.length;
      if ("string" == typeof t4)
        return (0, Be.d)(t4);
      throw new s2({ info: { code: S.DataTypeNoLength } }, "Cannot calculate data length: Invalid type");
    }(n2))), i3 || (a3["If-None-Match"] = "*");
    const c3 = J({ url: g(t3.remoteURL, h2(e3)), method: "PUT", headers: a3, data: n2 }, t3, r2);
    return l3 = function(e4) {
      try {
        Vt(t3, e4);
      } catch (t4) {
        const e5 = t4;
        if (412 !== e5.status || i3)
          throw e5;
        return false;
      }
      return true;
    }, (u3 = K(c3, t3)) && u3.then || (u3 = Promise.resolve(u3)), l3 ? u3.then(l3) : u3;
    var u3, l3;
  }), Ve = /* @__PURE__ */ function(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }(function(t3, e3) {
    let n2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    const r2 = J({ url: g(t3.remoteURL, h2(e3)), method: "OPTIONS" }, t3, n2);
    return i3 = function(e4) {
      var n3, r3;
      try {
        Vt(t3, e4);
      } catch (t4) {
        throw t4;
      }
      return { compliance: (null !== (n3 = e4.headers.get("DAV")) && void 0 !== n3 ? n3 : "").split(",").map((t4) => t4.trim()), server: null !== (r3 = e4.headers.get("Server")) && void 0 !== r3 ? r3 : "" };
    }, (o3 = K(r2, t3)) && o3.then || (o3 = Promise.resolve(o3)), i3 ? o3.then(i3) : o3;
    var o3, i3;
  });
  function ze(t3, e3, n2) {
    return n2 ? e3 ? e3(t3) : t3 : (t3 && t3.then || (t3 = Promise.resolve(t3)), e3 ? t3.then(e3) : t3);
  }
  const qe = Xe(function(t3, e3, n2, r2, o3) {
    let i3 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
    if (n2 > r2 || n2 < 0)
      throw new s2({ info: { code: S.InvalidUpdateRange } }, "Invalid update range ".concat(n2, " for partial update"));
    const a3 = { "Content-Type": "application/octet-stream", "Content-Length": "".concat(r2 - n2 + 1), "Content-Range": "bytes ".concat(n2, "-").concat(r2, "/*") }, c3 = J({ url: g(t3.remoteURL, h2(e3)), method: "PUT", headers: a3, data: o3 }, t3, i3);
    return ze(K(c3, t3), function(e4) {
      Vt(t3, e4);
    });
  });
  function Ge(t3, e3) {
    var n2 = t3();
    return n2 && n2.then ? n2.then(e3) : e3(n2);
  }
  const He = Xe(function(t3, e3, n2, r2, o3) {
    let i3 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
    if (n2 > r2 || n2 < 0)
      throw new s2({ info: { code: S.InvalidUpdateRange } }, "Invalid update range ".concat(n2, " for partial update"));
    const a3 = { "Content-Type": "application/x-sabredav-partialupdate", "Content-Length": "".concat(r2 - n2 + 1), "X-Update-Range": "bytes=".concat(n2, "-").concat(r2) }, c3 = J({ url: g(t3.remoteURL, h2(e3)), method: "PATCH", headers: a3, data: o3 }, t3, i3);
    return ze(K(c3, t3), function(e4) {
      Vt(t3, e4);
    });
  });
  function Xe(t3) {
    return function() {
      for (var e3 = [], n2 = 0; n2 < arguments.length; n2++)
        e3[n2] = arguments[n2];
      try {
        return Promise.resolve(t3.apply(this, e3));
      } catch (t4) {
        return Promise.reject(t4);
      }
    };
  }
  const Ze = Xe(function(t3, e3, n2, r2, o3) {
    let i3 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
    return ze(Ve(t3, e3, i3), function(a3) {
      let c3 = false;
      return Ge(function() {
        if (a3.compliance.includes("sabredav-partialupdate"))
          return ze(He(t3, e3, n2, r2, o3, i3), function(t4) {
            return c3 = true, t4;
          });
      }, function(u3) {
        let l3 = false;
        return c3 ? u3 : Ge(function() {
          if (a3.server.includes("Apache") && a3.compliance.includes("<http://apache.org/dav/propset/fs/1>"))
            return ze(qe(t3, e3, n2, r2, o3, i3), function(t4) {
              return l3 = true, t4;
            });
        }, function(t4) {
          if (l3)
            return t4;
          throw new s2({ info: { code: S.NotSupported } }, "Not supported");
        });
      });
    });
  }), Ye = "https://github.com/perry-mitchell/webdav-client/blob/master/LOCK_CONTACT.md";
  function Ke(t3) {
    let e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const { authType: n2 = null, remoteBasePath: r2, contactHref: o3 = Ye, ha1: i3, headers: a3 = {}, httpAgent: c3, httpsAgent: u3, password: l3, token: p3, username: f3, withCredentials: m2 } = e3;
    let v2 = n2;
    v2 || (v2 = f3 || l3 ? C.Password : C.None);
    const y2 = { authType: v2, remoteBasePath: r2, contactHref: o3, ha1: i3, headers: Object.assign({}, a3), httpAgent: c3, httpsAgent: u3, password: l3, remotePath: d2(t3), remoteURL: t3, token: p3, username: f3, withCredentials: m2 };
    return I(y2, f3, l3, p3, i3), { copyFile: (t4, e4, n3) => qt(y2, t4, e4, n3), createDirectory: (t4, e4) => fe(y2, t4, e4), createReadStream: (t4, e4) => function(t5, e5) {
      let n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      const r3 = new (0, ge().PassThrough)();
      return me(t5, e5, n3).then((t6) => {
        t6.pipe(r3);
      }).catch((t6) => {
        r3.emit("error", t6);
      }), r3;
    }(y2, t4, e4), createWriteStream: (t4, e4, n3) => function(t5, e5) {
      let n4 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r3 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : ve;
      const o4 = new (0, ge().PassThrough)(), i4 = {};
      false === n4.overwrite && (i4["If-None-Match"] = "*");
      const s3 = J({ url: g(t5.remoteURL, h2(e5)), method: "PUT", headers: i4, data: o4, maxRedirects: 0 }, t5, n4);
      return K(s3, t5).then((e6) => Vt(t5, e6)).then((t6) => {
        setTimeout(() => {
          r3(t6);
        }, 0);
      }).catch((t6) => {
        o4.emit("error", t6);
      }), o4;
    }(y2, t4, e4, n3), customRequest: (t4, e4) => ye(y2, t4, e4), deleteFile: (t4, e4) => be(y2, t4, e4), exists: (t4, e4) => we(y2, t4, e4), getDirectoryContents: (t4, e4) => Ne(y2, t4, e4), getFileContents: (t4, e4) => Te(y2, t4, e4), getFileDownloadLink: (t4) => function(t5, e4) {
      let n3 = g(t5.remoteURL, h2(e4));
      const r3 = /^https:/i.test(n3) ? "https" : "http";
      switch (t5.authType) {
        case C.None:
          break;
        case C.Password: {
          const e5 = P(t5.headers.Authorization.replace(/^Basic /i, "").trim());
          n3 = n3.replace(/^https?:\/\//, "".concat(r3, "://").concat(e5, "@"));
          break;
        }
        default:
          throw new s2({ info: { code: S.LinkUnsupportedAuthType } }, "Unsupported auth type for file link: ".concat(t5.authType));
      }
      return n3;
    }(y2, t4), getFileUploadLink: (t4) => function(t5, e4) {
      let n3 = "".concat(g(t5.remoteURL, h2(e4)), "?Content-Type=application/octet-stream");
      const r3 = /^https:/i.test(n3) ? "https" : "http";
      switch (t5.authType) {
        case C.None:
          break;
        case C.Password: {
          const e5 = P(t5.headers.Authorization.replace(/^Basic /i, "").trim());
          n3 = n3.replace(/^https?:\/\//, "".concat(r3, "://").concat(e5, "@"));
          break;
        }
        default:
          throw new s2({ info: { code: S.LinkUnsupportedAuthType } }, "Unsupported auth type for file link: ".concat(t5.authType));
      }
      return n3;
    }(y2, t4), getHeaders: () => Object.assign({}, y2.headers), getQuota: (t4) => Me(y2, t4), lock: (t4, e4) => Le(y2, t4, e4), moveFile: (t4, e4, n3) => $e(y2, t4, e4, n3), putFileContents: (t4, e4, n3) => We(y2, t4, e4, n3), partialUpdateFileContents: (t4, e4, n3, r3, o4) => Ze(y2, t4, e4, n3, r3, o4), getDAVCompliance: (t4) => Ve(y2, t4), search: (t4, e4) => De(y2, t4, e4), setHeaders: (t4) => {
      y2.headers = Object.assign({}, t4);
    }, stat: (t4, e4) => re(y2, t4, e4), unlock: (t4, e4, n3) => Re(y2, t4, e4, n3) };
  }
})();
var o = r.hT, i$1 = r.O4, s = r.Kd, a = r.YK, c = r.UU, u = r.Gu, l = r.ky, h = r.h4, p = r.ch, f = r.hq, d = r.i5;
class WebDAV {
  constructor(options2) {
    this.options = options2;
    this.initServer();
  }
  /**
   * 初始化服务器
   */
  initServer() {
    this.service = c(this.options.address, {
      authType: this.options.digest ? o.Digest : o.Password,
      username: this.options.loginName,
      password: this.options.loginPwd
    });
  }
  /**
   * 获取资源列表
   * @param options
   */
  list(options2 = {}) {
    return new Promise((resolve2, reject2) => {
      this.service.getDirectoryContents("/", { glob: "*.zip" }).then((data2) => {
        console.log(data2);
        let result2 = [];
        let orderMode = options2.orderMode || EResourceOrderMode.desc;
        if (data2 && data2.length > 0) {
          data2.forEach((item) => {
            result2.push({
              name: item.basename,
              size: item.size,
              type: item.type,
              time: new Date(item.lastmod).getTime()
            });
          });
        }
        resolve2(
          result2.sort((a2, b) => {
            let v1, v2;
            switch (options2.orderBy) {
              case EResourceOrderBy.name:
                v1 = a2.name;
                v2 = b.name;
                break;
              case EResourceOrderBy.size:
                v1 = a2.size;
                v2 = b.size;
                break;
              default:
                v1 = a2.time;
                v2 = b.time;
                break;
            }
            if (orderMode === EResourceOrderMode.desc) {
              return v1.toString().localeCompare(v2) == 1 ? -1 : 1;
            } else {
              return v1.toString().localeCompare(v2);
            }
          })
        );
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 获取（下载）一个文件
   * @param path
   * @returns 返回一个 binary 数据
   */
  get(path2) {
    return new Promise((resolve2, reject2) => {
      this.service.getFileContents("/" + path2).then((result2) => {
        resolve2(result2);
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 添加文件
   * @param formData
   */
  add(formData) {
    return new Promise((resolve2, reject2) => {
      formData.get("data").arrayBuffer().then((data2) => {
        this.service.putFileContents(formData.get("name"), data2).then((result2) => {
          console.log(result2);
          if (result2) {
            resolve2(true);
          } else {
            reject2(false);
          }
        }).catch((error2) => {
          console.log(error2);
          reject2(error2);
        });
      });
    });
  }
  /**
   * 删除一个文件
   * @param path
   */
  delete(path2) {
    return new Promise((resolve2, reject2) => {
      this.service.deleteFile("/" + path2).then((result2) => {
        if (result2) {
          resolve2(result2.data);
        } else {
          reject2(false);
        }
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 验证服务器可用性
   */
  ping() {
    return new Promise((resolve2, reject2) => {
      this.service.getDirectoryContents("/").then(() => {
        resolve2(true);
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
}
class Config {
  constructor(service) {
    this.service = service;
    this.name = EConfigKey.default;
    this.localStorage = new localStorage();
    this.syncStorage = new SyncStorage();
    this.favicon = new Favicon(this.service);
    this.schemas = [];
    this.sites = [];
    this.clients = [];
    this.publicSites = [];
    this.requestCount = 0;
    this.backupFileParser = new BackupFileParser();
    this.options = {
      exceedSizeUnit: ESizeUnit.GiB,
      sites: [],
      clients: [],
      backupServers: [],
      system: {},
      allowDropToSend: true,
      allowSelectionTextSearch: true,
      needConfirmWhenExceedSize: true,
      exceedSize: 10,
      search: {
        rows: 50,
        // 搜索超时
        timeout: 3e4,
        saveKey: true,
        threads: 0
      },
      // 连接下载服务器超时时间（毫秒）
      connectClientTimeout: 3e4,
      rowsPerPageItems: [
        10,
        20,
        50,
        100,
        200,
        { text: "$vuetify.dataIterator.rowsPerPageAll", value: -1 }
      ],
      searchSolutions: [],
      navBarIsOpen: true,
      showMovieInfoCardOnSearch: true,
      beforeSearchingOptions: {
        getMovieInformation: true,
        maxMovieInformationCount: 5,
        searchModeForItem: EBeforeSearchingItemSearchMode.id
      },
      showToolbarOnContentPage: true,
      // 下载失败后是否进行重试
      downloadFailedRetry: false,
      // 下载失败重试次数
      downloadFailedFailedRetryCount: 3,
      // 下载失败间隔时间（秒）
      downloadFailedFailedRetryInterval: 5,
      // 批量下载时间间隔（秒）
      batchDownloadInterval: 0,
      // 启用后台下载任务
      enableBackgroundDownload: false,
      // 助手工具栏显示位置
      position: EPluginPosition.right,
      // 是否加密存储备份数据
      encryptBackupData: false,
      allowSaveSnapshot: true
    };
    this.uiOptions = {};
    this.optionsTypeRule = {
      connectClientTimeout: "number",
      exceedSize: "number",
      search: {
        rows: "number",
        timeout: "number",
        threads: "number"
      },
      downloadFailedFailedRetryCount: "number",
      downloadFailedFailedRetryInterval: "number",
      batchDownloadInterval: "number",
      beforeSearchingOptions: {
        maxMovieInformationCount: "number"
      }
    };
    this.reload();
  }
  reload() {
    APP.cache.clear();
    this.getSystemConfig();
  }
  /**
   * 保存配置
   * @param options 配置信息
   */
  save(options2) {
    if (options2) {
      this.options = options2;
    }
    this.localStorage.set(this.name, this.cleaningOptions(this.options));
  }
  /**
   * 根据指定的规则转换对象的值
   * @param obj 
   * @param rules 
   * @returns 
   */
  transformObjectProperties(obj, rules2) {
    if (obj && typeof obj === "object" && !Array.isArray(obj)) {
      for (const key2 in obj) {
        if (obj.hasOwnProperty(key2)) {
          const value = obj[key2];
          const rule2 = rules2[key2];
          if (rule2) {
            if (typeof rule2 === "string") {
              obj[key2] = this.castValueToType(value, rule2);
            } else if (typeof rule2 === "function") {
              obj[key2] = rule2(value);
            } else if (typeof rule2 === "object" && !Array.isArray(rule2)) {
              obj[key2] = this.transformObjectProperties(value, rule2);
            }
          }
        }
      }
    }
    return obj;
  }
  /**
   * 根据类型名称进行类型转换
   * @param value 
   * @param type 
   * @returns 
   */
  castValueToType(value, type) {
    switch (type.toLowerCase()) {
      case "string":
        return String(value);
      case "number":
        return Number(value);
      case "boolean":
        return Boolean(value);
      case "object":
        return value !== null && typeof value === "object" ? value : {};
      case "array":
        return Array.isArray(value) ? value : [value];
      default:
        return value;
    }
  }
  /**
   * 获取站点图标并缓存
   */
  getFavicons() {
    return new Promise((resolve2, reject2) => {
      let urls = [];
      this.sites.forEach((site2) => {
        urls.push(site2.activeURL || site2.url || "");
      });
      if (this.options.sites) {
        this.options.sites.forEach((site2) => {
          urls.push(site2.activeURL || site2.url || "");
        });
      }
      urls = [...new Set(urls)];
      this.favicon.gets(urls).then((results2) => {
        results2.forEach((result2) => {
          let site2 = this.options.sites.find((item) => {
            var _a;
            let cdn = [item.url].concat(item.cdn);
            cdn = cdn.concat((_a = item.formerHosts) == null ? void 0 : _a.map((x) => `//${x}`)).filter((_23) => !!_23);
            return item.host == result2.host || cdn.join("").indexOf(`//${result2.host}`) > -1;
          });
          if (site2) {
            site2.icon = result2.data;
          }
        });
        this.save();
        this.service.options = this.options;
        resolve2(this.options);
      }).catch((error2) => {
        this.service.debug(error2);
        reject2(error2);
      });
    });
  }
  /**
   * 获取单个站点图标
   * @param url
   */
  getFavicon(url2, reset = false) {
    return new Promise((resolve2, reject2) => {
      this.favicon.get(url2, reset).then((result2) => {
        let site2 = this.options.sites.find((item) => {
          var _a;
          let cdn = [item.url].concat(item.cdn, (_a = item.formerHosts) == null ? void 0 : _a.map((x) => `//${x}`));
          return item.host == result2.host || cdn.join("").indexOf(`//${result2.host}`) > -1;
        });
        if (site2) {
          site2.icon = result2.data;
          this.save();
          this.service.options = this.options;
        }
        resolve2(result2);
      }).catch((error2) => {
        this.service.debug(error2);
        reject2(error2);
      });
    });
  }
  /**
   * 清理参数配置，一些参数只需要运行时可用即可
   * @param options
   */
  cleaningOptions(options2) {
    let _options2 = JSON.parse(JSON.stringify(options2));
    if (_options2.sites) {
      _options2.sites.forEach((item) => {
        let systemSite = this.sites.find((site2) => {
          return site2.host == item.host;
        });
        if (systemSite) {
          [
            "categories",
            "selectors",
            "patterns",
            "torrentTagSelectors",
            "icon",
            "activeURL",
            "searchEntryConfig",
            "schema",
            "supportedFeatures",
            "mergeSchemaTagSelectors"
          ].forEach((key2) => {
            let _item = item;
            if (_item[key2]) {
              delete _item[key2];
            }
          });
          if (item.searchEntry) {
            item.searchEntry.forEach((entry2, index2) => {
              if (!entry2.isCustom) {
                item.searchEntry[index2] = {
                  name: entry2.name,
                  enabled: entry2.enabled
                };
              }
            });
          }
        }
        if (PPF.isExtensionMode && item.icon && item.icon.substr(0, 10) === "data:image") {
          delete item.icon;
        }
      });
    }
    if (_options2.clients) {
      _options2.clients.forEach((item) => {
        [
          "pathDescription",
          "description",
          "warning",
          "scripts",
          "ver",
          "icon"
        ].forEach((key2) => {
          if (item[key2]) {
            delete item[key2];
          }
        });
      });
    }
    _options2 = this.transformObjectProperties(_options2, this.optionsTypeRule);
    return _options2;
  }
  /**
   * 读取配置信息
   * @return Promise 配置信息
   */
  read() {
    return new Promise((resolve2, reject2) => {
      this.localStorage.get(EConfigKey.uiOptions, (result2) => {
        if (result2) {
          let defaultOptions = Object.assign({}, this.uiOptions);
          this.uiOptions = Object.assign(defaultOptions, result2);
        }
      });
      this.loadConfig(resolve2);
    });
  }
  /**
   * 加载配置
   * @param success
   */
  loadConfig(success) {
    if (this.requestCount > 0) {
      setTimeout(() => {
        this.loadConfig(success);
      }, 100);
      return;
    }
    this.localStorage.get(this.name, (result2) => {
      this.resetRunTimeOptions(result2);
      success && success(this.options);
    });
  }
  /**
   * 重置运行时配置
   * @param options
   */
  resetRunTimeOptions(options2) {
    if (options2) {
      if (options2.system) {
        delete options2.system;
      }
      let defaultOptions = Object.assign({}, this.options);
      this.options = Object.assign(defaultOptions, options2);
    }
    if (!this.options.locale) {
      this.options.locale = navigator.language || "zh-CN";
    }
    this.options.system = {
      schemas: this.schemas,
      sites: this.sites,
      clients: this.clients,
      publicSites: this.publicSites
    };
    this.upgradeSites();
    this.options.sites && this.options.sites.length && this.sites.forEach((systemSite) => {
      let index2 = this.options.sites.findIndex((site2) => {
        return site2.host === systemSite.host;
      });
      if (index2 > -1) {
        let _site = Object.assign(
          Object.assign({}, systemSite),
          this.options.sites[index2]
        );
        if (systemSite.categories) {
          _site.categories = systemSite.categories;
        }
        if (systemSite.schema) {
          _site.schema = systemSite.schema;
        }
        if (!systemSite.torrentTagSelectors && _site.torrentTagSelectors) {
          delete _site.torrentTagSelectors;
        } else {
          _site.torrentTagSelectors = systemSite.torrentTagSelectors;
        }
        if (!systemSite.patterns && _site.patterns) {
          delete _site.patterns;
        } else {
          _site.patterns = systemSite.patterns;
        }
        if (!systemSite.levelRequirements && _site.levelRequirements) {
          delete _site.levelRequirements;
        } else {
          _site.levelRequirements = systemSite.levelRequirements;
        }
        if (_site.searchEntry && systemSite.searchEntry) {
          systemSite.searchEntry.forEach((sysEntry) => {
            if (_site.searchEntry) {
              let _index = _site.searchEntry && _site.searchEntry.findIndex((entry2) => {
                return entry2.name == sysEntry.name && !entry2.isCustom;
              });
              if (_index != void 0 && _index > -1) {
                _site.searchEntry[_index] = Object.assign(
                  Object.assign({}, sysEntry),
                  {
                    enabled: _site.searchEntry[_index].enabled
                  }
                );
              } else {
                _site.searchEntry.push(Object.assign({}, sysEntry));
              }
            }
          });
        } else if (systemSite.searchEntry) {
          _site.searchEntry = systemSite.searchEntry;
        }
        if (!systemSite.icon && !_site.icon) {
          _site.icon = _site.url + "/favicon.ico";
        }
        this.options.sites[index2] = _site;
      }
    });
    this.options.sites.forEach((site2) => {
      if (site2.cdn && site2.cdn.length > 0) {
        site2.activeURL = site2.cdn[0];
        site2.cdn = this.arrayUnique(site2.cdn);
      } else {
        site2.activeURL = site2.url;
      }
      if (site2.priority == null) {
        site2.priority = 100;
      }
    });
    this.options.clients && this.options.clients.length && this.options.clients.forEach((item, index2) => {
      let client2 = this.clients.find((c2) => {
        return c2.type === item.type;
      });
      if (client2) {
        this.options.clients[index2] = Object.assign(
          Object.assign({}, client2),
          this.options.clients[index2]
        );
      }
    });
    if (PPF.isExtensionMode) {
      this.getFavicons();
    }
    this.options = this.transformObjectProperties(this.options, this.optionsTypeRule);
    console.log(this.options);
  }
  /**
   * 数组去重
   * @param source 源数组
   * @see https://www.cnblogs.com/wisewrong/p/9642264.html （性能比较）
   */
  arrayUnique(source2) {
    let result2 = [];
    let obj = {};
    source2.forEach((value) => {
      if (!obj[value]) {
        result2.push(value);
        obj[value] = 1;
      }
    });
    return result2;
  }
  /**
   * 升级网站信息
   */
  upgradeSites() {
    this.sites.forEach((systemSite) => {
      if (!systemSite.host) {
        return;
      }
      let formerHosts = systemSite.formerHosts;
      let newHost = systemSite.host;
      if (formerHosts && formerHosts.length > 0) {
        formerHosts.forEach((host2) => {
          let site2 = this.options.sites.find((site22) => {
            return site22.host === host2;
          });
          if (site2) {
            console.log("upgradeSites.site", site2, newHost);
            site2.host = newHost;
            site2.url = systemSite.url;
            if (!systemSite.icon && !site2.icon)
              site2.icon = site2.url + "/favicon.ico";
            else
              site2.icon = systemSite.icon;
          }
          if (this.options.searchSolutions) {
            this.options.searchSolutions.forEach(
              (soluteion) => {
                soluteion.range.forEach((range) => {
                  if (range.host == host2) {
                    console.log(
                      "upgradeSites.searchSolutions",
                      range.host,
                      newHost
                    );
                    range.host = newHost;
                  }
                });
              }
            );
          }
          if (this.options.clients && this.options.clients.length > 0) {
            this.options.clients.forEach((client2) => {
              let paths = client2.paths;
              if (paths) {
                for (const key2 in paths) {
                  if (key2 == host2 && paths.hasOwnProperty(key2)) {
                    console.log(
                      "upgradeSites.client.paths",
                      client2.name,
                      key2,
                      newHost
                    );
                    const element = paths[key2];
                    paths[newHost] = Object.assign([], element);
                    delete paths[key2];
                  }
                }
              }
            });
          }
        });
      }
    });
  }
  readUIOptions() {
    return new Promise((resolve2, reject2) => {
      this.localStorage.get(EConfigKey.uiOptions, (result2) => {
        if (result2) {
          let defaultOptions = Object.assign({}, this.uiOptions);
          this.uiOptions = Object.assign(defaultOptions, result2);
        }
        resolve2(this.uiOptions);
      });
    });
  }
  saveUIOptions(options2) {
    return new Promise((resolve2, reject2) => {
      this.localStorage.set(EConfigKey.uiOptions, options2 || this.uiOptions);
      resolve2();
    });
  }
  /**
   * 获取系统配置
   */
  getSystemConfig() {
    this.schemas = [];
    this.sites = [];
    this.clients = [];
    this.publicSites = [];
    this.getContentFromApi(`${API.systemConfig}`).then((result2) => {
      if (result2) {
        this.schemas = result2.schemas;
        this.sites = result2.sites;
        this.clients = result2.clients;
        this.publicSites = result2.publicSites;
      }
    });
  }
  /**
   * 获取支持的网站架构
   */
  getSchemas() {
    this.schemas = [];
    this.getContentFromApi(`${API.schemas}`).then((result2) => {
      if (result2.length) {
        result2.forEach((item) => {
          if (item.type === "dir") {
            this.addSchema(
              API.schemaConfig.replace(/\{\$schema\}/g, item.name)
            );
          }
        });
      }
    });
  }
  addSchema(path2) {
    this.getContentFromApi(path2).then((result2) => {
      if (result2 && result2.name) {
        this.schemas.push(result2);
      }
    });
  }
  getSites() {
    this.sites = [];
    this.getContentFromApi(API.sites).then((result2) => {
      if (result2.length) {
        result2.forEach((item) => {
          if (item.type === "dir") {
            this.addSite(API.siteConfig.replace(/\{\$site\}/g, item.name));
          }
        });
      }
    });
  }
  addSite(path2) {
    this.getContentFromApi(path2).then((result2) => {
      if (result2 && result2.name) {
        this.sites.push(result2);
      }
    });
  }
  getClients() {
    this.clients = [];
    this.getContentFromApi(API.clients).then((result2) => {
      if (result2.length) {
        result2.forEach((item) => {
          if (item.type === "dir") {
            this.addClient(
              API.clientConfig.replace(/\{\$client\}/g, item.name)
            );
          }
        });
      }
    });
  }
  addClient(path2) {
    this.getContentFromApi(path2).then((result2) => {
      if (result2 && result2.name) {
        this.clients.push(result2);
      }
    });
  }
  /**
   * 从远程请求指定的内容
   * @param api
   */
  getContentFromApi(api) {
    PPF.updateBadge(++this.requestCount);
    return new Promise((resolve2, reject2) => {
      let content2 = APP.cache.get(api);
      if (content2) {
        resolve2(content2);
        PPF.updateBadge(--this.requestCount);
        return;
      }
      $.getJSON(api).done((result2) => {
        APP.cache.set(api, result2);
        PPF.updateBadge(--this.requestCount);
        resolve2(result2);
      }).fail((result2) => {
        PPF.updateBadge(--this.requestCount);
        reject2 && reject2(result2);
      });
    });
  }
  /**
   * 将系统参数备份到Google
   */
  backupToGoogle() {
    return new Promise((resolve2, reject2) => {
      if (chrome.storage && chrome.storage.sync) {
        let options2 = this.cleaningOptions(this.options);
        if (options2.system) {
          delete options2.system;
        }
        let clients = Object.assign([], options2.clients);
        let sites = Object.assign([], options2.sites);
        delete options2.clients;
        delete options2.sites;
        this.syncStorage.set(this.name, options2).then(() => {
          this.syncStorage.set(this.name + ".clients", clients).then(() => {
            this.syncStorage.set(this.name + ".sites", sites).then(() => {
              resolve2(this.options);
            }).catch((error2) => {
              reject2(APP.createErrorMessage(error2));
            });
          }).catch((error2) => {
            reject2(APP.createErrorMessage(error2));
          });
        }).catch((error2) => {
          reject2(APP.createErrorMessage(error2));
        });
      } else {
        reject2(APP.createErrorMessage("chrome.storage 不存在"));
      }
    });
  }
  /**
   * 从Google云端恢复系统参数
   */
  restoreFromGoogle() {
    return new Promise((resolve2, reject2) => {
      if (chrome.storage && chrome.storage.sync) {
        this.syncStorage.get(this.name).then((result2) => {
          let system = Object.assign({}, this.options.system);
          let options2 = result2;
          options2.system = system;
          this.syncStorage.get(this.name + ".clients").then((result22) => {
            options2.clients = result22;
            this.syncStorage.get(this.name + ".sites").then((result3) => {
              options2.sites = result3;
              this.resetRunTimeOptions(options2);
              this.save();
              setTimeout(() => {
                resolve2(this.options);
              }, 300);
            }).catch((error2) => {
              reject2(APP.createErrorMessage(error2));
            });
          }).catch((error2) => {
            reject2(APP.createErrorMessage(error2));
          });
        }).catch((error2) => {
          reject2(APP.createErrorMessage(error2));
        });
      } else {
        reject2(APP.createErrorMessage("chrome.storage 不存在"));
      }
    });
  }
  /**
   * 获取备份原始数据，用于插件背景页和前端传输
   */
  getBackupRawData() {
    return new Promise((resolve2, reject2) => {
      try {
        const rawUserData = this.service.userData.get("", EUserDataRange.all);
        const rawOptions = this.cleaningOptions(this.service.options);
        delete rawOptions.system;
        let rawData = {
          options: rawOptions,
          userData: rawUserData,
          collection: {
            items: this.service.collection.items,
            groups: this.service.collection.groups
          },
          cookies: void 0,
          searchResultSnapshot: this.service.searchResultSnapshot.items,
          keepUploadTask: this.service.keepUploadTask.items,
          downloadHistory: void 0
        };
        const requests2 = [];
        requests2.push(this.service.controller.downloadHistory.load());
        if (this.service.options.allowBackupCookies && PPF.checkOptionalPermission("cookies")) {
          requests2.push(this.getAllSiteCookies());
        }
        Promise.all(requests2).then((results2) => {
          rawData.downloadHistory = results2[0];
          if (results2.length > 1) {
            rawData.cookies = results2[1];
          }
          resolve2(rawData);
        }).catch(() => {
          resolve2(rawData);
        });
      } catch (error2) {
        reject2(error2);
      }
    });
  }
  /**
   * 创建备份文件
   * @param fileName
   */
  createBackupFile(fileName) {
    return new Promise((resolve2, reject2) => {
      this.getBackupFileBlob().then((blob) => {
        FileSaver.saveAs(blob, fileName || this.getNewBackupFileName());
        resolve2(true);
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 获取备份数据
   */
  getBackupFileBlob() {
    return new Promise((resolve2, reject2) => {
      try {
        this.getBackupRawData().then((rawData) => {
          this.backupFileParser.createBackupFileBlob(rawData).then((blob) => {
            resolve2(blob);
          });
        }).catch((error2) => {
          reject2(error2);
        });
      } catch (error2) {
        reject2(error2);
      }
    });
  }
  /**
   * 获取所有站点Cookies
   */
  getAllSiteCookies() {
    return new Promise((resolve2, reject2) => {
      PPF.checkPermissions(["cookies"]).then(() => {
        const sites = this.options.sites;
        if (sites && sites.length > 0) {
          const requests2 = [];
          sites.forEach((site2) => {
            requests2.push(this.getCookiesFromSite(site2));
          });
          Promise.all(requests2).then((results2) => {
            resolve2(results2);
          }).catch((error2) => {
            reject2(error2);
          });
        }
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 获取指定站点Cookies
   * @param site
   */
  getCookiesFromSite(site2) {
    return new Promise((resolve2, reject2) => {
      const url2 = site2.activeURL || site2.url;
      chrome.cookies.getAll(
        {
          url: url2
        },
        (result2) => {
          if (chrome.runtime.lastError) {
            reject2(chrome.runtime.lastError.message);
            return;
          }
          resolve2({
            host: site2.host,
            url: url2,
            cookies: result2
          });
          console.log(result2);
        }
      );
    });
  }
  /**
   * 恢复Cookies
   * @param datas
   */
  restoreCookies(datas) {
    return new Promise((resolve2, reject2) => {
      let requests2 = [];
      const keepFields = [
        "name",
        "value",
        "domain",
        "path",
        "secure",
        "httpOnly",
        "expirationDate"
      ];
      datas.forEach((item) => {
        item.cookies.forEach((cookie) => {
          let options2 = PPF.clone(cookie);
          for (const key2 in options2) {
            if (options2.hasOwnProperty(key2) && !keepFields.includes(key2)) {
              delete options2[key2];
            }
          }
          options2.url = item.url;
          requests2.push(this.setCookies(options2, item.host));
        });
      });
      Promise.all(requests2).then(() => {
        resolve2();
      }).catch(() => {
        resolve2();
      });
    });
  }
  /**
   * 设置站点 Cookies
   * @param cookie
   * @param host
   */
  setCookies(cookie, host2) {
    return new Promise((resolve2, reject2) => {
      let site2 = PPF.getSiteFromHost(host2, this.service.options);
      chrome.cookies.get(
        {
          url: (site2.activeURL || site2.url) + "",
          name: cookie.name + ""
        },
        (_cookie) => {
          let allowSet = false;
          const now = (/* @__PURE__ */ new Date()).getTime() / 1e3;
          if (_cookie === null) {
            allowSet = true;
          } else if (
            // 如果站点存在这个Cookies，但已过期，允许设置
            _cookie.expirationDate && _cookie.expirationDate < now
          ) {
            allowSet = true;
          }
          if (allowSet) {
            if (cookie.expirationDate && cookie.expirationDate < now) {
              cookie.expirationDate = now + 60 * 60 * 24;
            }
            chrome.cookies.set(cookie, (result2) => {
              if (chrome.runtime.lastError) {
                reject2(chrome.runtime.lastError.message);
                return;
              }
              resolve2(result2);
              console.log(result2);
            });
          } else {
            console.log("跳过 %s: %s", host2, cookie.name);
            resolve2();
          }
        }
      );
    });
  }
  getNewBackupFileName() {
    return PPF.getNewBackupFileName();
  }
  /**
   * 备份配置到服务器
   * @param server
   */
  backupToServer(server) {
    console.log("backupToServer", server, this.options.backupServers);
    return new Promise((resolve2, reject2) => {
      const time = dayjs().valueOf();
      const fileName = this.getNewBackupFileName();
      let service = null;
      this.getBackupFileBlob().then((blob) => {
        const formData = new FormData();
        formData.append("name", fileName);
        formData.append("data", blob);
        switch (server.type) {
          case EBackupServerType.OWSS:
            service = new OWSS(server);
            break;
          case EBackupServerType.WebDAV:
            service = new WebDAV(server);
            break;
          default:
            reject2("暂不支持");
            break;
        }
        if (service) {
          service.add(formData).then((result2) => {
            resolve2({
              time,
              fileName
            });
          }).catch((error2) => {
            reject2(error2);
          });
        }
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 从备份服务器中恢复指定的文件
   * @param server
   * @param path
   */
  restoreFromServer(server, path2) {
    return new Promise((resolve2, reject2) => {
      let service = null;
      switch (server.type) {
        case EBackupServerType.OWSS:
          service = new OWSS(server);
          break;
        case EBackupServerType.WebDAV:
          service = new WebDAV(server);
          break;
        default:
          reject2("暂不支持");
          break;
      }
      if (service) {
        service.get(path2).then((data2) => {
          this.backupFileParser.loadZipData(
            data2,
            this.service.i18n.t("settings.backup.enterSecretKey"),
            this.service.options.encryptSecretKey
          ).then((result2) => {
            resolve2(result2);
          }).catch((error2) => {
            reject2(error2);
          });
        }).catch((error2) => {
          reject2(error2);
        });
      }
    });
  }
  /**
   * 获取备份文件列表
   * @param server
   * @param options
   */
  getBackupListFromServer(server, options2 = {}) {
    return new Promise((resolve2, reject2) => {
      let service = null;
      switch (server.type) {
        case EBackupServerType.OWSS:
          service = new OWSS(server);
          break;
        case EBackupServerType.WebDAV:
          service = new WebDAV(server);
          break;
        default:
          reject2("暂不支持");
          break;
      }
      if (service) {
        service.list(options2).then((result2) => {
          resolve2(result2);
        }).catch((error2) => {
          reject2(error2);
        });
      }
    });
  }
  /**
   * 删除指定的文件
   * @param server
   * @param path
   */
  deleteFileFromBackupServer(server, path2) {
    return new Promise((resolve2, reject2) => {
      let service = null;
      switch (server.type) {
        case EBackupServerType.OWSS:
          service = new OWSS(server);
          break;
        case EBackupServerType.WebDAV:
          service = new WebDAV(server);
          break;
        default:
          reject2("暂不支持");
          break;
      }
      if (service) {
        service.delete(path2).then((result2) => {
          resolve2(result2);
        }).catch((error2) => {
          reject2(error2);
        });
      }
    });
  }
  /**
   * 测试指定的服务器是否可连接
   * @param server
   */
  testBackupServerConnectivity(server) {
    return new Promise((resolve2, reject2) => {
      let service = null;
      switch (server.type) {
        case EBackupServerType.OWSS:
          service = new OWSS(server);
          break;
        case EBackupServerType.WebDAV:
          service = new WebDAV(server);
          break;
        default:
          reject2("暂不支持");
          break;
      }
      if (service) {
        service.ping().then((result2) => {
          resolve2(result2);
        }).catch((error2) => {
          reject2(error2);
        });
      }
    });
  }
}
const Config$1 = Config;
class ClientController {
  /**
   * 类初始化
   */
  constructor() {
    this.options = {
      sites: [],
      clients: []
    };
    this.clients = {};
  }
  init(options2) {
    this.options = options2;
    this.cleanUpClients();
  }
  /**
   * 清理已缓存的客户端
   */
  cleanUpClients() {
    this.clients = {};
  }
  /**
   * 根据指定客户端配置初始化客户端
   * @param clientOptions 客户端配置
   */
  getClient(clientOptions) {
    return new Promise((resolve, reject) => {
      if (typeof clientOptions === "string") {
        let clientId = clientOptions;
        clientOptions = this.options.clients.find((item) => {
          return item.id === clientId;
        });
        let client2 = this.clients[clientId];
        if (client2) {
          resolve({ client: client2, options: clientOptions });
          return;
        }
      }
      if (window[clientOptions.type] === void 0) {
        APP.execScript({
          type: "file",
          content: `clients/${clientOptions.type}/init.js`
        }).then(() => {
          let client;
          eval(`client = new ${clientOptions.type}()`);
          client.init({
            loginName: clientOptions.loginName,
            loginPwd: clientOptions.loginPwd,
            address: clientOptions.address,
            name: clientOptions.name
          });
          this.clients[clientOptions.id] = client;
          resolve({ client, options: clientOptions });
        }).catch((e2) => {
          console.log(e2);
          reject({
            initFailed: true,
            msg: e2
          });
        });
      } else {
        let client;
        eval(`client = new ${clientOptions.type}()`);
        client.init({
          loginName: clientOptions.loginName,
          loginPwd: clientOptions.loginPwd,
          address: clientOptions.address,
          name: clientOptions.name
        });
        this.clients[clientOptions.id] = client;
        resolve({ client, options: clientOptions });
      }
    });
  }
  /**
   * 测试客户端是否可连接
   * @param options 参数
   */
  testClientConnectivity(options2) {
    return new Promise((resolve2, reject2) => {
      let dataResult = {
        type: EDataResultType.unknown,
        success: false
      };
      this.getClient(options2).then((clientOptions2) => {
        clientOptions2.client.call(EAction.testClientConnectivity, options2).then((result2) => {
          dataResult.success = result2;
          if (result2) {
            dataResult.type = EDataResultType.success;
          }
          resolve2(dataResult);
        }).catch((result2) => {
          dataResult.data = result2;
          dataResult.type = EDataResultType.error;
          reject2(dataResult);
        });
      }).catch((e2) => {
        dataResult.data = e2;
        dataResult.type = EDataResultType.error;
        reject2(dataResult);
      });
    });
  }
}
class DownloadHistory {
  constructor() {
    this.items = [];
    this.storage = new localStorage();
    this.load();
  }
  /**
   * 获取下载历史记录
   */
  load() {
    return new Promise((resolve2, reject2) => {
      this.storage.get(EConfigKey.downloadHistory, (result2) => {
        this.items = result2 || [];
        resolve2(this.items);
      });
    });
  }
  /**
   * 保存下载记录
   * @param data 下载链接信息
   * @param host 站点域名
   * @param clientId 下载客户端ID
   */
  add(data2, host2 = "", clientId = "", success = true) {
    let saveData = {
      data: data2,
      clientId,
      host: host2,
      success,
      time: (/* @__PURE__ */ new Date()).getTime()
    };
    if (!this.items) {
      this.load().then(() => {
        this.items.push(saveData);
        this.updateData();
      });
    } else {
      let index2 = this.items.findIndex((item) => {
        return item.data.url === data2.url;
      });
      if (index2 === -1) {
        this.items.push(saveData);
        this.updateData();
      }
    }
  }
  /**
   * 删除下载历史记录
   * @param items 需要删除的列表
   */
  remove(items) {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        for (let index2 = this.items.length - 1; index2 >= 0; index2--) {
          let item = this.items[index2];
          let findIndex = items.findIndex((_data) => {
            return _data.data.url === item.data.url;
          });
          if (findIndex >= 0) {
            this.items.splice(index2, 1);
          }
        }
        this.updateData();
        resolve2(this.items);
      });
    });
  }
  /**
   * 清除下载记录
   */
  clear() {
    return new Promise((resolve2, reject2) => {
      this.items = [];
      this.updateData();
      resolve2(this.items);
    });
  }
  /**
   * 重置
   * @param datas
   */
  reset(datas) {
    return new Promise((resolve2, reject2) => {
      if (!datas) {
        reject2(false);
        return;
      }
      if (!Array.isArray(datas)) {
        reject2(false);
        return;
      }
      this.items = datas;
      this.updateData();
      resolve2(this.items);
    });
  }
  updateData() {
    this.storage.set(EConfigKey.downloadHistory, this.items);
  }
}
"use strict";
var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;
var isArray = function isArray2(arr) {
  if (typeof Array.isArray === "function") {
    return Array.isArray(arr);
  }
  return toStr.call(arr) === "[object Array]";
};
var isPlainObject = function isPlainObject2(obj) {
  if (!obj || toStr.call(obj) !== "[object Object]") {
    return false;
  }
  var hasOwnConstructor = hasOwn.call(obj, "constructor");
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }
  var key2;
  for (key2 in obj) {
  }
  return typeof key2 === "undefined" || hasOwn.call(obj, key2);
};
var setProperty = function setProperty2(target, options2) {
  if (defineProperty && options2.name === "__proto__") {
    defineProperty(target, options2.name, {
      enumerable: true,
      configurable: true,
      value: options2.newValue,
      writable: true
    });
  } else {
    target[options2.name] = options2.newValue;
  }
};
var getProperty = function getProperty2(obj, name2) {
  if (name2 === "__proto__") {
    if (!hasOwn.call(obj, name2)) {
      return void 0;
    } else if (gOPD) {
      return gOPD(obj, name2).value;
    }
  }
  return obj[name2];
};
var extend = function extend2() {
  var options2, name2, src, copy2, copyIsArray, clone;
  var target = arguments[0];
  var i2 = 1;
  var length = arguments.length;
  var deep = false;
  if (typeof target === "boolean") {
    deep = target;
    target = arguments[1] || {};
    i2 = 2;
  }
  if (target == null || typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  for (; i2 < length; ++i2) {
    options2 = arguments[i2];
    if (options2 != null) {
      for (name2 in options2) {
        src = getProperty(target, name2);
        copy2 = getProperty(options2, name2);
        if (target !== copy2) {
          if (deep && copy2 && (isPlainObject(copy2) || (copyIsArray = isArray(copy2)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }
            setProperty(target, { name: name2, newValue: extend2(deep, clone, copy2) });
          } else if (typeof copy2 !== "undefined") {
            setProperty(target, { name: name2, newValue: copy2 });
          }
        }
      }
    }
  }
  return target;
};
const extend$1 = /* @__PURE__ */ getDefaultExportFromCjs(extend);
class SiteService {
  constructor(options2, systemOptions) {
    this.options = options2;
    this.systemOptions = systemOptions;
    this.isLogin = false;
    this._schema = {};
    this.mergeOptions();
  }
  get schema() {
    if (this._schema.name) {
      return this._schema;
    }
    let schema2 = {};
    if (typeof this.options.schema === "string") {
      schema2 = this.systemOptions.system && this.systemOptions.system.schemas && this.systemOptions.system.schemas.find((item) => {
        return item.name == this.options.schema;
      });
    }
    this._schema = schema2;
    return schema2;
  }
  mergeOptions() {
    let site2 = this.systemOptions.system && this.systemOptions.system.sites && this.systemOptions.system.sites.find((item) => {
      return item.host == this.options.host;
    });
    if (site2) {
      let customSearchEntry = [];
      if (this.options.searchEntry) {
        for (let index2 = this.options.searchEntry.length - 1; index2 >= 0; index2--) {
          const item = this.options.searchEntry[index2];
          if (item.isCustom) {
            customSearchEntry.push(item);
            this.options.searchEntry.splice(index2, 1);
          }
        }
      }
      this.options = extend$1(true, {}, site2, this.options);
      if (this.options.searchEntry && customSearchEntry.length > 0) {
        this.options.searchEntry.push(...customSearchEntry);
      }
    }
    console.log(this.options);
  }
  // public checkLogin(): Promise<any> {
  //   return new Promise<any>((resolve?: any, reject?: any) => {
  //     let site = this.options;
  //     let schema = this.schema;
  //     let checker: any;
  //     if (site.checker && site.checker.isLogin) {
  //       checker = site.checker.isLogin;
  //     } else if (schema.checker && schema.checker.isLogin) {
  //       checker = schema.checker.isLogin;
  //     }
  //     if (checker) {
  //       $.get(`${site.url}/${checker.page}`)
  //         .done((result: string) => {
  //           resolve(new RegExp(result, "").test(checker.contains));
  //         })
  //         .fail(() => {
  //           reject();
  //         });
  //     } else {
  //       resolve(null);
  //     }
  //   });
  // }
}
var customParseFormat$2 = { exports: {} };
var customParseFormat = customParseFormat$2.exports;
(function(module, exports) {
  !function(e2, t2) {
    true ? module.exports = t2() : false ? (void 0)(t2) : (e2 = "undefined" != typeof globalThis ? globalThis : e2 || self).dayjs_plugin_customParseFormat = t2();
  }(commonjsGlobal, function() {
    "use strict";
    var e2 = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" }, t2 = /(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g, n2 = /\d\d/, r2 = /\d\d?/, i2 = /\d*[^-_:/,()\s\d]+/, o2 = {}, s2 = function(e3) {
      return (e3 = +e3) + (e3 > 68 ? 1900 : 2e3);
    };
    var a2 = function(e3) {
      return function(t3) {
        this[e3] = +t3;
      };
    }, f2 = [/[+-]\d\d:?(\d\d)?|Z/, function(e3) {
      (this.zone || (this.zone = {})).offset = function(e4) {
        if (!e4)
          return 0;
        if ("Z" === e4)
          return 0;
        var t3 = e4.match(/([+-]|\d\d)/g), n3 = 60 * t3[1] + (+t3[2] || 0);
        return 0 === n3 ? 0 : "+" === t3[0] ? -n3 : n3;
      }(e3);
    }], h2 = function(e3) {
      var t3 = o2[e3];
      return t3 && (t3.indexOf ? t3 : t3.s.concat(t3.f));
    }, u2 = function(e3, t3) {
      var n3, r3 = o2.meridiem;
      if (r3) {
        for (var i3 = 1; i3 <= 24; i3 += 1)
          if (e3.indexOf(r3(i3, 0, t3)) > -1) {
            n3 = i3 > 12;
            break;
          }
      } else
        n3 = e3 === (t3 ? "pm" : "PM");
      return n3;
    }, d2 = { A: [i2, function(e3) {
      this.afternoon = u2(e3, false);
    }], a: [i2, function(e3) {
      this.afternoon = u2(e3, true);
    }], S: [/\d/, function(e3) {
      this.milliseconds = 100 * +e3;
    }], SS: [n2, function(e3) {
      this.milliseconds = 10 * +e3;
    }], SSS: [/\d{3}/, function(e3) {
      this.milliseconds = +e3;
    }], s: [r2, a2("seconds")], ss: [r2, a2("seconds")], m: [r2, a2("minutes")], mm: [r2, a2("minutes")], H: [r2, a2("hours")], h: [r2, a2("hours")], HH: [r2, a2("hours")], hh: [r2, a2("hours")], D: [r2, a2("day")], DD: [n2, a2("day")], Do: [i2, function(e3) {
      var t3 = o2.ordinal, n3 = e3.match(/\d+/);
      if (this.day = n3[0], t3)
        for (var r3 = 1; r3 <= 31; r3 += 1)
          t3(r3).replace(/\[|\]/g, "") === e3 && (this.day = r3);
    }], M: [r2, a2("month")], MM: [n2, a2("month")], MMM: [i2, function(e3) {
      var t3 = h2("months"), n3 = (h2("monthsShort") || t3.map(function(e4) {
        return e4.slice(0, 3);
      })).indexOf(e3) + 1;
      if (n3 < 1)
        throw new Error();
      this.month = n3 % 12 || n3;
    }], MMMM: [i2, function(e3) {
      var t3 = h2("months").indexOf(e3) + 1;
      if (t3 < 1)
        throw new Error();
      this.month = t3 % 12 || t3;
    }], Y: [/[+-]?\d+/, a2("year")], YY: [n2, function(e3) {
      this.year = s2(e3);
    }], YYYY: [/\d{4}/, a2("year")], Z: f2, ZZ: f2 };
    function c2(n3) {
      var r3, i3;
      r3 = n3, i3 = o2 && o2.formats;
      for (var s3 = (n3 = r3.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(t3, n4, r4) {
        var o3 = r4 && r4.toUpperCase();
        return n4 || i3[r4] || e2[r4] || i3[o3].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(e3, t4, n5) {
          return t4 || n5.slice(1);
        });
      })).match(t2), a3 = s3.length, f3 = 0; f3 < a3; f3 += 1) {
        var h3 = s3[f3], u3 = d2[h3], c3 = u3 && u3[0], l2 = u3 && u3[1];
        s3[f3] = l2 ? { regex: c3, parser: l2 } : h3.replace(/^\[|\]$/g, "");
      }
      return function(e3) {
        for (var t3 = {}, n4 = 0, r4 = 0; n4 < a3; n4 += 1) {
          var i4 = s3[n4];
          if ("string" == typeof i4)
            r4 += i4.length;
          else {
            var o3 = i4.regex, f4 = i4.parser, h4 = e3.slice(r4), u4 = o3.exec(h4)[0];
            f4.call(t3, u4), e3 = e3.replace(u4, "");
          }
        }
        return function(e4) {
          var t4 = e4.afternoon;
          if (void 0 !== t4) {
            var n5 = e4.hours;
            t4 ? n5 < 12 && (e4.hours += 12) : 12 === n5 && (e4.hours = 0), delete e4.afternoon;
          }
        }(t3), t3;
      };
    }
    return function(e3, t3, n3) {
      n3.p.customParseFormat = true, e3 && e3.parseTwoDigitYear && (s2 = e3.parseTwoDigitYear);
      var r3 = t3.prototype, i3 = r3.parse;
      r3.parse = function(e4) {
        var t4 = e4.date, r4 = e4.utc, s3 = e4.args;
        this.$u = r4;
        var a3 = s3[1];
        if ("string" == typeof a3) {
          var f3 = true === s3[2], h3 = true === s3[3], u3 = f3 || h3, d3 = s3[2];
          h3 && (d3 = s3[2]), o2 = this.$locale(), !f3 && d3 && (o2 = n3.Ls[d3]), this.$d = function(e5, t5, n4) {
            try {
              if (["x", "X"].indexOf(t5) > -1)
                return new Date(("X" === t5 ? 1e3 : 1) * e5);
              var r5 = c2(t5)(e5), i4 = r5.year, o3 = r5.month, s4 = r5.day, a4 = r5.hours, f4 = r5.minutes, h4 = r5.seconds, u4 = r5.milliseconds, d4 = r5.zone, l3 = /* @__PURE__ */ new Date(), m2 = s4 || (i4 || o3 ? 1 : l3.getDate()), M2 = i4 || l3.getFullYear(), Y = 0;
              i4 && !o3 || (Y = o3 > 0 ? o3 - 1 : l3.getMonth());
              var p2 = a4 || 0, v = f4 || 0, D = h4 || 0, g = u4 || 0;
              return d4 ? new Date(Date.UTC(M2, Y, m2, p2, v, D, g + 60 * d4.offset * 1e3)) : n4 ? new Date(Date.UTC(M2, Y, m2, p2, v, D, g)) : new Date(M2, Y, m2, p2, v, D, g);
            } catch (e6) {
              return /* @__PURE__ */ new Date("");
            }
          }(t4, a3, r4), this.init(), d3 && true !== d3 && (this.$L = this.locale(d3).$L), u3 && t4 != this.format(a3) && (this.$d = /* @__PURE__ */ new Date("")), o2 = {};
        } else if (a3 instanceof Array)
          for (var l2 = a3.length, m = 1; m <= l2; m += 1) {
            s3[1] = a3[m - 1];
            var M = n3.apply(this, s3);
            if (M.isValid()) {
              this.$d = M.$d, this.$L = M.$L, this.init();
              break;
            }
            m === l2 && (this.$d = /* @__PURE__ */ new Date(""));
          }
        else
          i3.call(this, e4);
      };
    };
  });
})(customParseFormat$2, customParseFormat$2.exports);
var customParseFormatExports = customParseFormat$2.exports;
const customParseFormat$1 = /* @__PURE__ */ getDefaultExportFromCjs(customParseFormatExports);
var advancedFormat$2 = { exports: {} };
var advancedFormat = advancedFormat$2.exports;
(function(module, exports) {
  !function(e2, t2) {
    true ? module.exports = t2() : false ? (void 0)(t2) : (e2 = "undefined" != typeof globalThis ? globalThis : e2 || self).dayjs_plugin_advancedFormat = t2();
  }(commonjsGlobal, function() {
    "use strict";
    return function(e2, t2) {
      var r2 = t2.prototype, n2 = r2.format;
      r2.format = function(e3) {
        var t3 = this, r3 = this.$locale();
        if (!this.isValid())
          return n2.bind(this)(e3);
        var s2 = this.$utils(), a2 = (e3 || "YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g, function(e4) {
          switch (e4) {
            case "Q":
              return Math.ceil((t3.$M + 1) / 3);
            case "Do":
              return r3.ordinal(t3.$D);
            case "gggg":
              return t3.weekYear();
            case "GGGG":
              return t3.isoWeekYear();
            case "wo":
              return r3.ordinal(t3.week(), "W");
            case "w":
            case "ww":
              return s2.s(t3.week(), "w" === e4 ? 1 : 2, "0");
            case "W":
            case "WW":
              return s2.s(t3.isoWeek(), "W" === e4 ? 1 : 2, "0");
            case "k":
            case "kk":
              return s2.s(String(0 === t3.$H ? 24 : t3.$H), "k" === e4 ? 1 : 2, "0");
            case "X":
              return Math.floor(t3.$d.getTime() / 1e3);
            case "x":
              return t3.$d.getTime();
            case "z":
              return "[" + t3.offsetName() + "]";
            case "zzz":
              return "[" + t3.offsetName("long") + "]";
            default:
              return e4;
          }
        });
        return n2.bind(this)(a2);
      };
    };
  });
})(advancedFormat$2, advancedFormat$2.exports);
var advancedFormatExports = advancedFormat$2.exports;
const advancedFormat$1 = /* @__PURE__ */ getDefaultExportFromCjs(advancedFormatExports);
dayjs.extend(customParseFormat$1);
dayjs.extend(advancedFormat$1);
class InfoParser {
  constructor(service) {
    this.service = service;
  }
  /**
   * 根据指定规则和原始获取需要的数据
   * @param content 原始内容
   * @param rule 规则配置
   * @return Dictionary<any>
   */
  getResult(content2, rule2) {
    let results2 = {};
    if (content2) {
      for (const key2 in rule2.fields) {
        if (rule2.fields.hasOwnProperty(key2)) {
          let config2 = rule2.fields[key2];
          let result2 = this.getFieldData(content2, config2, rule2);
          if (result2 != null) {
            results2[key2] = result2;
          }
        }
      }
    }
    return results2;
  }
  debug(...msg) {
    if (this.service) {
      this.service.debug(...msg);
    } else {
      PPF.debug(...msg);
    }
  }
  /**
   * 获取字段信息
   * @param content 原始内容
   * @param config 当前字段定义信息
   * @param rule 选择器规则
   */
  getFieldData(content, config, rule) {
    let query;
    let selectorIndex = 0;
    let selectors = [];
    if (typeof config.selector == "string") {
      selectors.push(config.selector);
    } else if (config.selector && config.selector.length) {
      selectors = config.selector;
    } else {
      return config.value === void 0 ? null : config.value;
    }
    let lastSelector = "";
    selectors.some((selector) => {
      lastSelector = selector;
      try {
        switch (rule.dataType) {
          case ERequestResultType.JSON:
            if (selector == "") {
              query = content;
            } else if (selector.substr(0, 1) == "[") {
              query = eval("content" + selector);
            } else {
              query = eval("content." + selector);
            }
            if (query != null) {
              return true;
            }
            break;
          case ERequestResultType.TEXT:
          case ERequestResultType.HTML:
          default:
            if (selector == "") {
              query = content;
            } else {
              query = content.find(selector);
              if (query.length == 0)
                query = content.filter(selector);
            }
            if (query.length > 0) {
              return true;
            }
            break;
        }
        selectorIndex++;
      } catch (error2) {
        this.debug(
          "InfoParser.getFieldData.Error",
          selector,
          error2.message,
          error2.stack
        );
        return true;
      }
    });
    console.log(`selector result for ${lastSelector} :`);
    console.log(query);
    let result = null;
    let dateTime = dayjs;
    let _self = this;
    if (query != null) {
      if (config.attribute || config.filters || config.switchFilters) {
        if (config.attribute && rule.dataType != ERequestResultType.JSON) {
          query = query.attr(config.attribute);
        }
        let filters;
        if (config.switchFilters) {
          filters = config.switchFilters[selectorIndex] || null;
        } else {
          filters = config.filters;
        }
        if (filters) {
          filters.every((filter) => {
            try {
              query = eval(filter);
            } catch (error2) {
              this.debug(
                "InfoParser.filter.Error",
                filter,
                error2.message,
                error2.stack
              );
              query = null;
              return false;
            }
            return true;
          });
        }
        result = query;
        if (Array.isArray(filters)) {
          console.log(`filter result for ${filters.join(" => ")}: ${result}`);
        }
      } else {
        switch (rule.dataType) {
          case ERequestResultType.JSON:
            result = query;
            break;
          default:
            result = query.text().trim();
            break;
        }
      }
    }
    return result;
  }
  /**
   * 获取指定数组的合计尺寸
   * @param datas 表示大小的数组
   */
  getTotalSize(datas) {
    let total = 0;
    datas.forEach((item) => {
      let match = item.match(/^(\d*\.?\d+)(.*[^ZEPTGMK])?([ZEPTGMK](B|iB)?)$/i);
      if (!match) {
        return;
      }
      let size = parseFloat(match[1]);
      let unit = match[3].toLowerCase();
      switch (true) {
        case /ki?b/.test(unit):
          total += size * Math.pow(2, 10);
          break;
        case /mi?b/.test(unit):
          total += size * Math.pow(2, 20);
          break;
        case /gi?b/.test(unit):
          total += size * Math.pow(2, 30);
          break;
        case /ti?b?/.test(unit):
          total += size * Math.pow(2, 40);
          break;
        case /pi?b?/.test(unit):
          total += size * Math.pow(2, 50);
          break;
        case /ei?b?/.test(unit):
          total += size * Math.pow(2, 60);
          break;
        case /zi?b?/.test(unit):
          total += size * Math.pow(2, 70);
          break;
      }
    });
    return total;
  }
  /**
   * 获取指定数组的合计尺寸
   * @param imdbId 表示大小的数组
   */
  formatIMDbId(imdbId) {
    if (Number(imdbId)) {
      if (imdbId.length < 7)
        imdbId = imdbId.padStart(7, "0");
      imdbId = "tt" + imdbId;
    }
    return imdbId;
  }
}
class PageParser {
  /**
   * 初始化
   * @param options 解析配置
   * @param site 站点
   * @param timeout
   * @param commonDatas 指定的通用数据
   */
  constructor(options2, site2, timeout = 3e4, commonDatas) {
    this.options = options2;
    this.site = site2;
    this.timeout = timeout;
    this.commonDatas = commonDatas;
    this.infoParserCache = {};
    this.cacheKey = "";
    this.url = "";
    let url2 = site2.url + "";
    if (site2.cdn && site2.cdn.length > 0) {
      url2 = site2.cdn[0];
    }
    if ((url2 + "").substr(-1) != "/") {
      url2 += "/";
    }
    let page2 = this.options.page;
    if ((page2 + "").substr(0, 1) == "/") {
      page2 = (page2 + "").substr(1);
    }
    this.url = (url2 + page2).replace("://", "****").replace(/\/\//g, "/").replace("****", "://");
    this.requestData = this.options.requestData;
    if (this.requestData && this.commonDatas) {
      try {
        for (const key2 in this.requestData) {
          if (this.requestData.hasOwnProperty(key2)) {
            const value = this.requestData[key2];
            for (const commonKey in this.commonDatas) {
              if (this.commonDatas.hasOwnProperty(commonKey)) {
                this.requestData[key2] = PPF.replaceKeys(
                  value,
                  this.commonDatas[commonKey],
                  commonKey
                );
              }
            }
          }
        }
      } catch (error2) {
        console.log(error2);
      }
    }
    this.cacheKey = cryptoJsExports.MD5(this.url + JSON.stringify(this.requestData || {})).toString();
  }
  /**
   * 获取缓存
   */
  getCache() {
    let result2 = window.localStorage.getItem(this.cacheKey);
    if (result2) {
      let json = JSON.parse(result2);
      if (json.data && json.time) {
        let time = (/* @__PURE__ */ new Date()).getTime();
        if (json.time < time) {
          window.localStorage.removeItem(this.cacheKey);
          return null;
        }
        return json.data;
      }
    }
    return null;
  }
  /**
   * 设置缓存
   */
  setCache() {
    if (this.options.dataCacheTime && this.options.dataCacheTime > 0) {
      let cache = {
        data: this.resultData,
        time: (/* @__PURE__ */ new Date()).getTime() + this.options.dataCacheTime * 1e3
      };
      window.localStorage.setItem(this.cacheKey, JSON.stringify(cache));
    }
  }
  /**
   * 获取数据
   */
  getInfos() {
    return new Promise((resolve2, reject2) => {
      let cache = this.getCache();
      if (cache) {
        resolve2(cache);
        return;
      }
      if (this.options.parser && this.site) {
        if (this.runParser(resolve2, reject2)) {
          return;
        }
      }
      let request = $.ajax({
        url: this.url,
        method: this.options.requestMethod || ERequestMethod.GET,
        dataType: "text",
        headers: this.options.headers,
        data: this.requestData,
        timeout: this.timeout
      }).done((result2) => {
        let content2;
        try {
          if (this.options.dataType !== ERequestResultType.JSON) {
            let doc2 = new DOMParser().parseFromString(result2, "text/html");
            let topElement = this.options.topElement || "body";
            content2 = $(doc2).find(topElement);
          } else {
            content2 = JSON.parse(result2);
          }
        } catch (error2) {
          reject2(error2);
          return;
        }
        if (content2 && this.options) {
          try {
            let results2 = new InfoParser().getResult(content2, this.options);
            this.resultData = results2;
            this.setCache();
            resolve2(results2);
          } catch (error2) {
            reject2(error2);
          }
        }
      }).fail((error2) => {
        reject2(error2);
      });
    });
  }
  /**
   * 执行脚本解析器
   * @param rule
   * @param site
   * @param userInfo
   * @param resolve
   * @param reject
   */
  runParser(resolve, reject) {
    if (!this.site || !this.options.parser) {
      return false;
    }
    let siteConfigPath = this.site.schema == "publicSite" ? "publicSites" : "sites";
    if (this.site.path) {
      siteConfigPath += `/${this.site.path}`;
    } else {
      siteConfigPath += `/${this.site.host}`;
    }
    let path = this.options.parser;
    if (path.substr(0, 1) !== "/" && path.substr(0, 4) !== "http") {
      path = `${siteConfigPath}/${path}`;
    }
    let _options = {
      site: this.site,
      rule: this.options,
      commonDatas: this.commonDatas,
      resolve,
      reject
    };
    let _self = this;
    let script = this.infoParserCache[path];
    if (script) {
      eval(script);
    } else {
      APP.getScriptContent(path).then((script) => {
        this.infoParserCache[path] = script;
        eval(script);
      }).catch((error2) => {
        console.error("Error loading script:", error2);
      });
    }
    return true;
  }
}
var ESearchResultParseStatus = /* @__PURE__ */ ((ESearchResultParseStatus2) => {
  ESearchResultParseStatus2["success"] = "success";
  ESearchResultParseStatus2["needLogin"] = "needLogin";
  ESearchResultParseStatus2["noTorrents"] = "noTorrents";
  ESearchResultParseStatus2["torrentTableIsEmpty"] = "torrentTableIsEmpty";
  ESearchResultParseStatus2["parseError"] = "parseError";
  return ESearchResultParseStatus2;
})(ESearchResultParseStatus || {});
Object.assign(window, {
  ESearchResultParseStatus
});
class Searcher {
  constructor(service) {
    this.service = service;
    this.searchConfigs = {};
    this.parseScriptCache = {};
    this.options = {
      sites: [],
      clients: []
    };
    this.searchRequestQueue = {};
  }
  /**
   * 搜索种子
   * @param site 需要搜索的站点
   * @param key 需要搜索的关键字
   * @param payload 附加数据
   */
  searchTorrent(site, key = "", payload) {
    this.service.debug("searchTorrent: start", key, payload);
    return new Promise((resolve, reject) => {
      let result = {
        success: false
      };
      let siteService = new SiteService(
        PPF.clone(site),
        PPF.clone(this.options)
      );
      let searchConfig = {};
      let schema = this.getSiteSchema(site);
      let host = site.host;
      let siteSearchPage = "";
      let searchEntryConfig = extend$1(
        true,
        {
          torrentTagSelectors: []
        },
        (schema == null ? void 0 : schema.searchEntryConfig) ?? {},
        siteService.options.searchEntryConfig
      );
      let searchEntryConfigQueryString = "";
      let searchEntryConfigRequestData;
      if (siteService.options.searchEntry) {
        searchConfig.rootPath = `sites/${host}/`;
        searchConfig.entry = siteService.options.searchEntry;
      } else if (schema && schema.searchEntry) {
        searchConfig.rootPath = `schemas/${schema.name}/`;
        searchConfig.entry = schema.searchEntry;
      }
      if (schema && schema.torrentTagSelectors) {
        searchConfig.torrentTagSelectors = schema.torrentTagSelectors;
      }
      if (siteService.options.torrentTagSelectors) {
        if (siteService.options.mergeSchemaTagSelectors) {
          searchConfig.torrentTagSelectors = [
            ...new Map([
              ...searchConfig.torrentTagSelectors ?? [],
              ...siteService.options.torrentTagSelectors
            ].map((item) => [item.name, item])).values()
          ];
        } else {
          searchConfig.torrentTagSelectors = siteService.options.torrentTagSelectors;
        }
      }
      if (!searchConfig.entry) {
        result.msg = this.service.i18n.t(
          "service.searcher.siteSearchConfigEntryIsEmpty",
          {
            site
          }
        );
        result.type = EDataResultType.error;
        reject(result);
        this.service.debug("searchTorrent: tip");
        return;
      }
      let isImdbSearch = false;
      let imdb = key.match(/(tt\d+)/);
      let autoMatched = false;
      if (imdb && imdb.length >= 2) {
        key = imdb[1];
        isImdbSearch = true;
      }
      let skipSearch = false;
      if (searchEntryConfig && searchEntryConfig.page) {
        siteSearchPage = searchEntryConfig.page;
        searchEntryConfigQueryString = searchEntryConfig.queryString + "";
        if (searchEntryConfig.area && !site.disableSearchTransform) {
          searchEntryConfig.area.some((area) => {
            if (area.keyAutoMatch && new RegExp(area.keyAutoMatch, "u").test(key)) {
              if (area.page) {
                siteSearchPage = area.page;
              }
              autoMatched = true;
              if (area.queryString) {
                searchEntryConfigQueryString = area.queryString;
              }
              if (area.requestData)
                searchEntryConfigRequestData = area.requestData;
              if (area.appendQueryString) {
                searchEntryConfigQueryString += area.appendQueryString;
              }
              if (area.name == "IMDB" && area.replaceKeyByTVDB) {
                try {
                  $.ajax({
                    url: "https://thetvdb.com/api/GetSeriesByRemoteID.php?imdbid=" + key,
                    cache: true,
                    dataType: "text",
                    contentType: "text/plain",
                    timeout: this.options.connectClientTimeout || 3e4,
                    method: ERequestMethod.GET,
                    async: false
                  }).done((result2) => {
                    let doc2 = new DOMParser().parseFromString(result2, "text/html");
                    for (var replaceKey of area.replaceKeyByTVDB) {
                      switch (replaceKey) {
                        case "year":
                          let year = "";
                          let date = $(doc2).find("FirstAired").text();
                          if (date != "") {
                            year = new Date(date).getFullYear().toString();
                          }
                          searchEntryConfigQueryString = searchEntryConfigQueryString.replace("$year$", year);
                          break;
                        case "name":
                          let seriesName = $(doc2).find("SeriesName").text();
                          if (seriesName != "")
                            searchEntryConfigQueryString = searchEntryConfigQueryString.replace("$name$", seriesName);
                          else {
                            skipSearch = true;
                            return;
                          }
                          break;
                        default:
                          break;
                      }
                    }
                  }).fail((jqXHR, textStatus, errorThrown) => {
                    skipSearch = true;
                    result.type = EDataResultType.unknown;
                    reject(result);
                    return;
                  });
                } catch {
                  skipSearch = true;
                  result.type = EDataResultType.unknown;
                  reject(result);
                  return;
                }
              }
              if (area.name == "IMDB" && area.convertToANIDB) {
                try {
                  $.ajax({
                    url: "https://raw.githubusercontent.com/Anime-Lists/anime-lists/master/anime-list.xml",
                    cache: true,
                    dataType: "text",
                    contentType: "text/plain",
                    timeout: this.options.connectClientTimeout || 3e4,
                    method: ERequestMethod.GET,
                    async: false
                  }).done((result2) => {
                    let doc2 = $.parseHTML(result2);
                    let selector2 = "anime[imdbid*='" + key + "']:first";
                    let anime = $(selector2, doc2);
                    if (anime.length > 0 && key.length >= 9) {
                      let anidbid = anime.attr("anidbid");
                      if (anidbid)
                        searchEntryConfigQueryString = searchEntryConfigQueryString.replace("$anidb$", anidbid);
                    } else {
                      skipSearch = true;
                    }
                  }).fail((jqXHR, textStatus, errorThrown) => {
                    skipSearch = true;
                    result.type = EDataResultType.unknown;
                    reject(result);
                    return;
                  });
                } catch (error2) {
                  skipSearch = true;
                  result.type = EDataResultType.unknown;
                  reject(result);
                  return;
                }
              }
              if (area.replaceKey) {
                const old = key;
                key = key.replace(
                  new RegExp(area.replaceKey[0], "g"),
                  area.replaceKey[1]
                );
                console.log(`[${site.name}] "${old}" => "${key}"`);
              }
              if (area.parseScript) {
                try {
                  key = eval(area.parseScript);
                } catch (error2) {
                }
              }
              return true;
            }
            return false;
          });
        }
      }
      if (skipSearch) {
        resolve({
          status: "success",
          success: true,
          msg: this.getErrorMessage(
            site,
            "noTorrents",
            ""
          ),
          data: {},
          type: EDataResultType.success
        });
        return;
      }
      this.searchConfigs[host] = searchConfig;
      let results = [];
      let entryCount = 0;
      let doneCount = 0;
      const KEY = "$key$";
      if (!searchEntryConfig.keepOriginKey) {
        key = encodeURIComponent(key);
      }
      searchConfig.entry.forEach((entry2) => {
        if (entry2.skipIMDbId && isImdbSearch) {
          return;
        }
        let searchPage = entry2.entry || siteSearchPage;
        if (autoMatched && searchPage.indexOf(KEY) !== -1 && searchEntryConfigQueryString.indexOf(KEY) !== -1) {
          searchPage = PPF.removeQueryStringFromValue(searchPage, KEY);
        }
        let queryString = entry2.queryString;
        if (searchEntryConfigQueryString) {
          if (!queryString) {
            queryString = searchEntryConfigQueryString;
          } else if (queryString && queryString.indexOf(KEY) === -1) {
            queryString = searchEntryConfigQueryString + "&" + queryString;
          }
        }
        if (entry2.appendQueryString) {
          queryString += entry2.appendQueryString;
        }
        if (searchEntryConfig) {
          entry2.parseScriptFile = searchEntryConfig.parseScriptFile || entry2.parseScriptFile;
          entry2.resultType = searchEntryConfig.resultType || entry2.resultType;
          entry2.requestDataType = searchEntryConfig.requestDataType || entry2.requestDataType;
          entry2.resultSelector = searchEntryConfig.resultSelector || entry2.resultSelector;
          entry2.headers = searchEntryConfig.headers || entry2.headers;
          entry2.asyncParse = searchEntryConfig.asyncParse || entry2.asyncParse;
          entry2.requestData = searchEntryConfigRequestData || searchEntryConfig.requestData || entry2.requestData;
        }
        if (searchPage && entry2.parseScriptFile && entry2.enabled !== false) {
          let rows = this.options.search && this.options.search.rows ? this.options.search.rows : 10;
          if (site.cdn && site.cdn.length > 0) {
            site.url = site.cdn[0];
          }
          if ((site.url + "").substr(-1) != "/") {
            site.url += "/";
          }
          if ((searchPage + "").substr(0, 1) == "/") {
            searchPage = (searchPage + "").substr(1);
          }
          let url2 = "";
          if (site.apiCdn && site.apiCdn.length > 0) {
            if (!site.apiCdn[0].endsWith("/")) {
              site.apiCdn[0] += "/";
            }
            url2 = site.apiCdn[0] + searchPage;
          } else {
            url2 = site.url + searchPage;
          }
          if (queryString) {
            if (searchPage.indexOf("?") !== -1) {
              url2 += "&" + queryString;
            } else {
              url2 += "?" + queryString;
            }
          }
          url2 = PPF.removeDuplicateQueryString(url2);
          let searchKey = key + (entry2.appendToSearchKeyString ? ` ${entry2.appendToSearchKeyString}` : "");
          url2 = this.replaceKeys(url2, {
            key: searchKey,
            rows,
            passkey: site.passkey ? site.passkey : ""
          });
          if (entry2.requestData) {
            try {
              for (const key2 in entry2.requestData) {
                if (entry2.requestData.hasOwnProperty(key2)) {
                  const value = entry2.requestData[key2];
                  if (typeof value !== "string")
                    continue;
                  entry2.requestData[key2] = PPF.replaceKeys(value, {
                    key: searchKey,
                    passkey: site.passkey ? site.passkey : ""
                  });
                  if (site.user) {
                    entry2.requestData[key2] = PPF.replaceKeys(entry2.requestData[key2], site.user, "user");
                  }
                }
              }
            } catch (error2) {
              this.service.writeErrorLog(error2);
              this.service.debug(error2);
            }
          }
          if (entry2.headers) {
            for (const key2 in entry2.headers) {
              if (entry2.headers.hasOwnProperty(key2)) {
                const value = entry2.headers[key2];
                entry2.headers[key2] = PPF.replaceKeys(value, {
                  key: searchKey,
                  passkey: site.passkey ? site.passkey : ""
                });
                if (site.user) {
                  entry2.headers[key2] = PPF.replaceKeys(entry2.headers[key2], site.user, "user");
                }
                entry2.headers[key2] = PPF.replaceKeys(entry2.headers[key2], site, "site");
              }
            }
          }
          if (site.user) {
            url2 = this.replaceKeys(url2, site.user, "user");
          }
          entryCount++;
          let scriptPath = entry2.parseScriptFile;
          if (scriptPath.substr(0, 1) !== "/") {
            scriptPath = `${searchConfig.rootPath}${scriptPath}`;
          }
          entry2.parseScript = this.parseScriptCache[scriptPath];
          if (!entry2.parseScript) {
            this.service.debug("searchTorrent: getScriptContent", scriptPath);
            APP.getScriptContent(scriptPath).then((script2) => {
              this.service.debug(
                "searchTorrent: getScriptContent done",
                scriptPath
              );
              this.parseScriptCache[scriptPath] = script2;
              entry2.parseScript = script2;
              this.getSearchResult(
                url2,
                site,
                Object.assign(PPF.clone(searchEntryConfig), PPF.clone(entry2)),
                searchConfig.torrentTagSelectors
              ).then((result2) => {
                this.service.debug(
                  "searchTorrent: getSearchResult done",
                  url2
                );
                if (result2 && result2.length) {
                  results.push(...result2);
                }
                doneCount++;
                if (doneCount === entryCount || results.length >= rows) {
                  resolve(results.slice(0, rows));
                }
              }).catch((result2) => {
                this.service.debug(
                  "searchTorrent: getSearchResult catch",
                  url2,
                  result2
                );
                doneCount++;
                if (doneCount === entryCount) {
                  if (results.length > 0) {
                    resolve(results.slice(0, rows));
                  } else {
                    reject(result2);
                  }
                }
              });
            }).catch((error2) => {
              this.service.debug(
                "searchTorrent: getScriptContent fail",
                error2
              );
            });
          } else {
            this.getSearchResult(
              url2,
              site,
              Object.assign(PPF.clone(searchEntryConfig), PPF.clone(entry2)),
              searchConfig.torrentTagSelectors
            ).then((result2) => {
              if (result2 && result2.length) {
                results.push(...result2);
              }
              doneCount++;
              if (doneCount === entryCount || results.length >= rows) {
                resolve(results.slice(0, rows));
              }
            }).catch((result2) => {
              doneCount++;
              if (doneCount === entryCount) {
                if (results.length > 0) {
                  resolve(results.slice(0, rows));
                } else {
                  reject(result2);
                }
              }
            });
          }
        }
      });
      if (entryCount == 0) {
        result.msg = this.service.i18n.t(
          "service.searcher.siteSearchEntryIsEmpty",
          {
            site
          }
        );
        result.type = EDataResultType.error;
        reject(result);
      }
      this.service.debug("searchTorrent: queue done");
    });
  }
  /**
   * 获取搜索结果
   * @param url
   * @param site
   * @param entry
   * @param torrentTagSelectors
   */
  getSearchResult(url2, site2, entry2, torrentTagSelectors2) {
    return new Promise((resolve2, reject2) => {
      if (entry2.beforeSearch) {
        let pageParser = new PageParser(
          entry2.beforeSearch,
          site2,
          this.service.options.connectClientTimeout
        );
        pageParser.getInfos().then((beforeSearchData2) => {
          this.addSearchRequestQueue(
            url2,
            site2,
            entry2,
            torrentTagSelectors2,
            beforeSearchData2
          ).then((result2) => {
            resolve2(result2);
          }).catch((error2) => {
            reject2(error2);
          });
        }).catch((error2) => {
          this.service.writeErrorLog(error2);
          this.addSearchRequestQueue(url2, site2, entry2, torrentTagSelectors2).then((result2) => {
            resolve2(result2);
          }).catch((error22) => {
            reject2(error22);
          });
        });
      } else {
        this.addSearchRequestQueue(url2, site2, entry2, torrentTagSelectors2).then((result2) => {
          resolve2(result2);
        }).catch((error2) => {
          reject2(error2);
        });
      }
    });
  }
  /**
   * 获取搜索结果
   * @param url
   * @param site
   * @param entry
   * @param torrentTagSelectors
   */
  addSearchRequestQueue(url, site, entry, torrentTagSelectors, beforeSearchData) {
    let _entry = PPF.clone(entry);
    if (_entry.parseScript) {
      delete _entry.parseScript;
    }
    if (beforeSearchData) {
      this.service.debug("beforeSearchData", beforeSearchData);
      url = this.replaceKeys(url, beforeSearchData, "beforeSearchData");
      if (entry.requestData) {
        try {
          for (const key2 in entry.requestData) {
            if (entry.requestData.hasOwnProperty(key2)) {
              const value = entry.requestData[key2];
              entry.requestData[key2] = PPF.replaceKeys(
                value,
                beforeSearchData,
                "beforeSearchData"
              );
            }
          }
        } catch (error2) {
          this.service.writeErrorLog(error2);
          this.service.debug(error2);
        }
      }
    }
    this.service.debug("getSearchResult.start", {
      url,
      site: site.host,
      entry: _entry
    });
    let logId = "";
    let contentType = "text/plain";
    let data = entry.requestData;
    switch (entry.requestDataType) {
      case ERequestType.JSON:
        contentType = "application/json";
        if (data)
          data = JSON.stringify(data);
      case ERequestType.TEXT:
      default:
    }
    return new Promise((resolve, reject) => {
      this.searchRequestQueue[url] = $.ajax({
        url,
        cache: true,
        dataType: "text",
        contentType,
        timeout: this.options.connectClientTimeout || 3e4,
        headers: entry.headers,
        method: entry.requestMethod || ERequestMethod.GET,
        data
      }).done((result) => {
        var _a;
        this.service.debug("getSearchResult.done", url);
        delete this.searchRequestQueue[url];
        if (result && typeof result == "string" && result.length > 100 || typeof result == "object" || result && entry.resultType == ERequestResultType.JSON && result.toLowerCase().includes("success")) {
          let page;
          let doc;
          try {
            switch (entry.resultType) {
              case ERequestResultType.JSON:
                page = JSON.parse(result);
                break;
              default:
                doc = new DOMParser().parseFromString(result, "text/html");
                page = $(doc).find("body");
                break;
            }
          } catch (error2) {
            logId = this.service.logger.add({
              module: EModule.background,
              event: "service.searcher.getSearchResult.siteSearchResultParseFailed",
              msg: error2
            });
            reject({
              success: false,
              msg: this.service.i18n.t(
                "service.searcher.siteSearchResultParseFailed",
                {
                  site
                }
              ),
              data: {
                logId
              },
              type: EDataResultType.error
            });
            return;
          }
          let options = {
            results: [],
            responseText: result,
            site,
            resultSelector: entry.resultSelector,
            page,
            entry,
            torrentTagSelectors,
            errorMsg: "",
            isLogged: false,
            status: "success",
            searcher: this,
            url
          };
          try {
            console.log("entry.parseScript ", (_a = entry.parseScript) == null ? void 0 : _a.length);
            if (entry.parseScript) {
              if (entry.asyncParse) {
                options = Object.assign(
                  {
                    reject,
                    resolve
                  },
                  options
                );
                eval(entry.parseScript);
                return;
              } else {
                eval(entry.parseScript);
              }
            }
            if (options.errorMsg || options.status != "success") {
              reject({
                success: false,
                msg: this.getErrorMessage(
                  site,
                  options.status,
                  options.errorMsg
                ),
                data: {
                  site,
                  isLogged: options.isLogged
                }
              });
            } else {
              resolve(PPF.clone(options.results));
            }
          } catch (error2) {
            console.error(error2);
            logId = this.service.logger.add({
              module: EModule.background,
              event: "service.searcher.getSearchResult.siteEvalScriptFailed",
              msg: error2
            });
            reject({
              success: false,
              msg: this.service.i18n.t(
                "service.searcher.siteEvalScriptFailed",
                {
                  site
                }
              ),
              data: {
                logId
              }
            });
          }
        } else {
          logId = this.service.logger.add({
            module: EModule.background,
            event: "service.searcher.getSearchResult.siteSearchResultError",
            msg: result
          });
          reject({
            success: false,
            msg: this.service.i18n.t(
              "service.searcher.siteSearchResultError",
              {
                site
              }
            ),
            data: {
              logId
            },
            type: EDataResultType.error
          });
        }
      }).fail((jqXHR, textStatus, errorThrown) => {
        delete this.searchRequestQueue[url];
        this.service.debug({
          title: "getSearchResult.fail",
          url,
          entry,
          textStatus,
          errorThrown
        });
        logId = this.service.logger.add({
          module: EModule.background,
          event: "service.searcher.getSearchResult.fail",
          msg: errorThrown,
          data: {
            url,
            entry,
            code: jqXHR.status,
            textStatus,
            errorThrown,
            responseText: jqXHR.responseText
          }
        });
        reject({
          data: {
            logId,
            textStatus
          },
          msg: this.service.i18n.t("service.searcher.siteNetworkFailed", {
            site,
            msg: `${jqXHR.status} ${errorThrown}, ${textStatus}`
          }),
          success: false,
          type: EDataResultType.error
        });
      });
    });
  }
  /**
   * 根据错误代码获取错误信息
   * @param code
   */
  getErrorMessage(site2, status = "success", msg = "") {
    if (status != "success") {
      return this.service.i18n.t(`contentPage.search.${status}`, {
        siteName: site2.name,
        msg
      });
    }
    return msg;
  }
  /**
   * 取消正在执行的搜索请求
   * @param site
   * @param key
   */
  abortSearch(site2, key2 = "") {
    return new Promise((resolve2, reject2) => {
      let host2 = site2.host + "";
      let searchConfig2 = this.searchConfigs[host2];
      if (searchConfig2.entry) {
        this.service.logger.add({
          module: EModule.background,
          event: "searcher.abortSearch",
          msg: this.service.i18n.t("service.searcher.siteAbortSearch", {
            site: site2
          }),
          //`正在取消[${site.host}]的搜索请求`,
          data: {
            site: site2.host,
            key: key2
          }
        });
        searchConfig2.entry.forEach((entry2) => {
          if (entry2.entry && entry2.parseScriptFile && entry2.enabled !== false) {
            if (site2.cdn && site2.cdn.length > 0) {
              site2.url = site2.cdn[0];
            }
            let rows = this.options.search && this.options.search.rows ? this.options.search.rows : 10;
            let url2 = site2.url + entry2.entry;
            url2 = this.replaceKeys(url2, {
              key: key2,
              rows,
              passkey: site2.passkey ? site2.passkey : ""
            });
            let queue = this.searchRequestQueue[url2];
            if (queue) {
              try {
                queue.abort();
                resolve2();
              } catch (error2) {
                this.service.logger.add({
                  module: EModule.background,
                  event: "searcher.abortSearch.error",
                  msg: this.service.i18n.t(
                    "service.searcher.siteAbortSearchError",
                    {
                      site: site2
                    }
                  ),
                  // "取消搜索请求失败",
                  data: {
                    site: site2.host,
                    key: key2,
                    error: error2
                  }
                });
                reject2(error2);
              }
            } else {
              resolve2();
            }
          } else {
            resolve2();
          }
        });
      }
    });
  }
  /**
   * 根据指定的站点获取站点的架构信息
   * @param site 站点信息
   */
  getSiteSchema(site2) {
    let schema2 = {};
    if (typeof site2.schema === "string") {
      schema2 = this.options.system && this.options.system.schemas && this.options.system.schemas.find((item) => {
        return item.name == site2.schema;
      });
      if (schema2 === void 0) {
        return schema2;
      }
    }
    return PPF.clone(schema2);
  }
  /**
   * 替换指定的字符串列表
   * @param source
   * @param keys
   */
  replaceKeys(source2, keys, prefix = "") {
    let result2 = source2;
    for (const key2 in keys) {
      if (keys.hasOwnProperty(key2)) {
        const value = keys[key2];
        let search = "$" + key2 + "$";
        if (prefix) {
          search = `$${prefix}.${key2}$`;
        }
        result2 = result2.replace(search, value);
      }
    }
    return result2;
  }
  /**
   * 从当前行中获取指定字段的值
   * @param site 当前站点
   * @param row 当前行
   * @param fieldName 字段名称
   * @return null 表示没有获取到内容
   */
  getFieldValue(site2, row, fieldName = "") {
    let selector2;
    if (site2.searchEntryConfig && site2.searchEntryConfig.fieldSelector) {
      selector2 = site2.searchEntryConfig.fieldSelector[fieldName];
      if (!selector2) {
        return null;
      }
    } else {
      return null;
    }
    const parser2 = new InfoParser(this.service);
    return parser2.getFieldData(
      row,
      selector2,
      site2.searchEntryConfig.fieldSelector
    );
  }
  /**
   * 根据指定信息获取分类
   * @param site 站点
   * @param page 当前搜索页面
   * @param id 分类ID
   */
  getCategoryById(site2, page2, id) {
    let result2 = {};
    if (site2.categories) {
      site2.categories.forEach((item) => {
        if (item.category && (item.entry == "*" || page2.indexOf(item.entry))) {
          let category = item.category.find((c2) => {
            return c2.id == id;
          });
          if (category) {
            result2 = category;
          }
        }
      });
    }
    return result2;
  }
  /**
   * cloudflare Email 解码方法，来自 https://usamaejaz.com/cloudflare-email-decoding/
   * @param {*} encodedString
   */
  cfDecodeEmail(encodedString) {
    let email = "", r2 = parseInt(encodedString.substr(0, 2), 16), n2, i2;
    for (n2 = 2; encodedString.length - n2; n2 += 2) {
      i2 = parseInt(encodedString.substr(n2, 2), 16) ^ r2;
      email += String.fromCharCode(i2);
    }
    return email;
  }
  /**
   * 获取指定站点当前行标签列表
   * @param site
   * @param row
   */
  getRowTags(site2, row) {
    let tags = [];
    if (site2 && site2.host) {
      let config2 = this.searchConfigs[site2.host];
      let selectors2 = config2.torrentTagSelectors;
      if (selectors2 && selectors2.length > 0) {
        selectors2.forEach((item) => {
          if (item.selector) {
            let result2 = row.find(item.selector);
            if (result2.length) {
              let color = item.color || BASE_TAG_COLORS[item.name] || "";
              let data2 = {
                name: item.name,
                color
              };
              if (item.title && result2.attr(item.title)) {
                data2.title = result2.attr(item.title);
              }
              tags.push(data2);
            }
          }
        });
      }
    }
    return tags;
  }
}
"use strict";
var requiresPort = function required2(port2, protocol) {
  protocol = protocol.split(":")[0];
  port2 = +port2;
  if (!port2)
    return false;
  switch (protocol) {
    case "http":
    case "ws":
      return port2 !== 80;
    case "https":
    case "wss":
      return port2 !== 443;
    case "ftp":
      return port2 !== 21;
    case "gopher":
      return port2 !== 70;
    case "file":
      return false;
  }
  return port2 !== 0;
};
const index$1 = /* @__PURE__ */ getDefaultExportFromCjs(requiresPort);
var querystringify$1 = {};
"use strict";
var has = Object.prototype.hasOwnProperty, undef;
function decode$3(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, " "));
  } catch (e2) {
    return null;
  }
}
function encode$3(input) {
  try {
    return encodeURIComponent(input);
  } catch (e2) {
    return null;
  }
}
function querystring(query2) {
  var parser2 = /([^=?#&]+)=?([^&]*)/g, result2 = {}, part;
  while (part = parser2.exec(query2)) {
    var key2 = decode$3(part[1]), value = decode$3(part[2]);
    if (key2 === null || value === null || key2 in result2)
      continue;
    result2[key2] = value;
  }
  return result2;
}
function querystringify(obj, prefix) {
  prefix = prefix || "";
  var pairs = [], value, key2;
  if ("string" !== typeof prefix)
    prefix = "?";
  for (key2 in obj) {
    if (has.call(obj, key2)) {
      value = obj[key2];
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = "";
      }
      key2 = encode$3(key2);
      value = encode$3(value);
      if (key2 === null || value === null)
        continue;
      pairs.push(key2 + "=" + value);
    }
  }
  return pairs.length ? prefix + pairs.join("&") : "";
}
var stringify = querystringify$1.stringify = querystringify;
var parse = querystringify$1.parse = querystring;
"use strict";
var required = requiresPort, qs = querystringify$1, controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/, CRHTLF = /[\n\r\t]/g, slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//, port = /:\d+$/, protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i, windowsDriveLetter = /^[a-zA-Z]:/;
function trimLeft(str) {
  return (str ? str : "").toString().replace(controlOrWhitespace, "");
}
var rules = [
  ["#", "hash"],
  // Extract from the back.
  ["?", "query"],
  // Extract from the back.
  function sanitize(address, url2) {
    return isSpecial(url2.protocol) ? address.replace(/\\/g, "/") : address;
  },
  ["/", "pathname"],
  // Extract from the back.
  ["@", "auth", 1],
  // Extract from the front.
  [NaN, "host", void 0, 1, 1],
  // Set left over value.
  [/:(\d*)$/, "port", void 0, 1],
  // RegExp the back.
  [NaN, "hostname", void 0, 1, 1]
  // Set left over.
];
var ignore = { hash: 1, query: 1 };
function lolcation(loc) {
  var globalVar;
  if (typeof window !== "undefined")
    globalVar = window;
  else if (typeof commonjsGlobal !== "undefined")
    globalVar = commonjsGlobal;
  else if (typeof self !== "undefined")
    globalVar = self;
  else
    globalVar = {};
  var location = globalVar.location || {};
  loc = loc || location;
  var finaldestination = {}, type = typeof loc, key2;
  if ("blob:" === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ("string" === type) {
    finaldestination = new Url(loc, {});
    for (key2 in ignore)
      delete finaldestination[key2];
  } else if ("object" === type) {
    for (key2 in loc) {
      if (key2 in ignore)
        continue;
      finaldestination[key2] = loc[key2];
    }
    if (finaldestination.slashes === void 0) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }
  return finaldestination;
}
function isSpecial(scheme) {
  return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
}
function extractProtocol(address, location) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, "");
  location = location || {};
  var match = protocolre.exec(address);
  var protocol = match[1] ? match[1].toLowerCase() : "";
  var forwardSlashes = !!match[2];
  var otherSlashes = !!match[3];
  var slashesCount = 0;
  var rest;
  if (forwardSlashes) {
    if (otherSlashes) {
      rest = match[2] + match[3] + match[4];
      slashesCount = match[2].length + match[3].length;
    } else {
      rest = match[2] + match[4];
      slashesCount = match[2].length;
    }
  } else {
    if (otherSlashes) {
      rest = match[3] + match[4];
      slashesCount = match[3].length;
    } else {
      rest = match[4];
    }
  }
  if (protocol === "file:") {
    if (slashesCount >= 2) {
      rest = rest.slice(2);
    }
  } else if (isSpecial(protocol)) {
    rest = match[4];
  } else if (protocol) {
    if (forwardSlashes) {
      rest = rest.slice(2);
    }
  } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
    rest = match[4];
  }
  return {
    protocol,
    slashes: forwardSlashes || isSpecial(protocol),
    slashesCount,
    rest
  };
}
function resolve(relative, base) {
  if (relative === "")
    return base;
  var path2 = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i2 = path2.length, last = path2[i2 - 1], unshift = false, up = 0;
  while (i2--) {
    if (path2[i2] === ".") {
      path2.splice(i2, 1);
    } else if (path2[i2] === "..") {
      path2.splice(i2, 1);
      up++;
    } else if (up) {
      if (i2 === 0)
        unshift = true;
      path2.splice(i2, 1);
      up--;
    }
  }
  if (unshift)
    path2.unshift("");
  if (last === "." || last === "..")
    path2.push("");
  return path2.join("/");
}
function Url(address, location, parser2) {
  address = trimLeft(address);
  address = address.replace(CRHTLF, "");
  if (!(this instanceof Url)) {
    return new Url(address, location, parser2);
  }
  var relative, extracted, parse2, instruction, index2, key2, instructions = rules.slice(), type = typeof location, url2 = this, i2 = 0;
  if ("object" !== type && "string" !== type) {
    parser2 = location;
    location = null;
  }
  if (parser2 && "function" !== typeof parser2)
    parser2 = qs.parse;
  location = lolcation(location);
  extracted = extractProtocol(address || "", location);
  relative = !extracted.protocol && !extracted.slashes;
  url2.slashes = extracted.slashes || relative && location.slashes;
  url2.protocol = extracted.protocol || location.protocol || "";
  address = extracted.rest;
  if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url2.protocol))) {
    instructions[3] = [/(.*)/, "pathname"];
  }
  for (; i2 < instructions.length; i2++) {
    instruction = instructions[i2];
    if (typeof instruction === "function") {
      address = instruction(address, url2);
      continue;
    }
    parse2 = instruction[0];
    key2 = instruction[1];
    if (parse2 !== parse2) {
      url2[key2] = address;
    } else if ("string" === typeof parse2) {
      index2 = parse2 === "@" ? address.lastIndexOf(parse2) : address.indexOf(parse2);
      if (~index2) {
        if ("number" === typeof instruction[2]) {
          url2[key2] = address.slice(0, index2);
          address = address.slice(index2 + instruction[2]);
        } else {
          url2[key2] = address.slice(index2);
          address = address.slice(0, index2);
        }
      }
    } else if (index2 = parse2.exec(address)) {
      url2[key2] = index2[1];
      address = address.slice(0, index2.index);
    }
    url2[key2] = url2[key2] || (relative && instruction[3] ? location[key2] || "" : "");
    if (instruction[4])
      url2[key2] = url2[key2].toLowerCase();
  }
  if (parser2)
    url2.query = parser2(url2.query);
  if (relative && location.slashes && url2.pathname.charAt(0) !== "/" && (url2.pathname !== "" || location.pathname !== "")) {
    url2.pathname = resolve(url2.pathname, location.pathname);
  }
  if (url2.pathname.charAt(0) !== "/" && isSpecial(url2.protocol)) {
    url2.pathname = "/" + url2.pathname;
  }
  if (!required(url2.port, url2.protocol)) {
    url2.host = url2.hostname;
    url2.port = "";
  }
  url2.username = url2.password = "";
  if (url2.auth) {
    index2 = url2.auth.indexOf(":");
    if (~index2) {
      url2.username = url2.auth.slice(0, index2);
      url2.username = encodeURIComponent(decodeURIComponent(url2.username));
      url2.password = url2.auth.slice(index2 + 1);
      url2.password = encodeURIComponent(decodeURIComponent(url2.password));
    } else {
      url2.username = encodeURIComponent(decodeURIComponent(url2.auth));
    }
    url2.auth = url2.password ? url2.username + ":" + url2.password : url2.username;
  }
  url2.origin = url2.protocol !== "file:" && isSpecial(url2.protocol) && url2.host ? url2.protocol + "//" + url2.host : "null";
  url2.href = url2.toString();
}
function set(part, value, fn) {
  var url2 = this;
  switch (part) {
    case "query":
      if ("string" === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }
      url2[part] = value;
      break;
    case "port":
      url2[part] = value;
      if (!required(value, url2.protocol)) {
        url2.host = url2.hostname;
        url2[part] = "";
      } else if (value) {
        url2.host = url2.hostname + ":" + value;
      }
      break;
    case "hostname":
      url2[part] = value;
      if (url2.port)
        value += ":" + url2.port;
      url2.host = value;
      break;
    case "host":
      url2[part] = value;
      if (port.test(value)) {
        value = value.split(":");
        url2.port = value.pop();
        url2.hostname = value.join(":");
      } else {
        url2.hostname = value;
        url2.port = "";
      }
      break;
    case "protocol":
      url2.protocol = value.toLowerCase();
      url2.slashes = !fn;
      break;
    case "pathname":
    case "hash":
      if (value) {
        var char = part === "pathname" ? "/" : "#";
        url2[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url2[part] = value;
      }
      break;
    case "username":
    case "password":
      url2[part] = encodeURIComponent(value);
      break;
    case "auth":
      var index2 = value.indexOf(":");
      if (~index2) {
        url2.username = value.slice(0, index2);
        url2.username = encodeURIComponent(decodeURIComponent(url2.username));
        url2.password = value.slice(index2 + 1);
        url2.password = encodeURIComponent(decodeURIComponent(url2.password));
      } else {
        url2.username = encodeURIComponent(decodeURIComponent(value));
      }
  }
  for (var i2 = 0; i2 < rules.length; i2++) {
    var ins = rules[i2];
    if (ins[4])
      url2[ins[1]] = url2[ins[1]].toLowerCase();
  }
  url2.auth = url2.password ? url2.username + ":" + url2.password : url2.username;
  url2.origin = url2.protocol !== "file:" && isSpecial(url2.protocol) && url2.host ? url2.protocol + "//" + url2.host : "null";
  url2.href = url2.toString();
  return url2;
}
function toString(stringify2) {
  if (!stringify2 || "function" !== typeof stringify2)
    stringify2 = qs.stringify;
  var query2, url2 = this, host2 = url2.host, protocol = url2.protocol;
  if (protocol && protocol.charAt(protocol.length - 1) !== ":")
    protocol += ":";
  var result2 = protocol + (url2.protocol && url2.slashes || isSpecial(url2.protocol) ? "//" : "");
  if (url2.username) {
    result2 += url2.username;
    if (url2.password)
      result2 += ":" + url2.password;
    result2 += "@";
  } else if (url2.password) {
    result2 += ":" + url2.password;
    result2 += "@";
  } else if (url2.protocol !== "file:" && isSpecial(url2.protocol) && !host2 && url2.pathname !== "/") {
    result2 += "@";
  }
  if (host2[host2.length - 1] === ":" || port.test(url2.hostname) && !url2.port) {
    host2 += ":";
  }
  result2 += host2 + url2.pathname;
  query2 = "object" === typeof url2.query ? stringify2(url2.query) : url2.query;
  if (query2)
    result2 += "?" !== query2.charAt(0) ? "?" + query2 : query2;
  if (url2.hash)
    result2 += url2.hash;
  return result2;
}
Url.prototype = { set, toString };
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;
var urlParse = Url;
const URLParse = /* @__PURE__ */ getDefaultExportFromCjs(urlParse);
class User {
  constructor(service) {
    this.service = service;
    this.requestQueue = {};
    this.requestQueueCount = 0;
    this.infoParserCache = {};
    this.InfoParser = InfoParser;
  }
  /**
   * 刷新用户数据
   * @param failedOnly 是否仅刷新最近状态为失败的站点
   */
  refreshUserData(failedOnly = false) {
    return new Promise((resolve2, reject2) => {
      let requests2 = [];
      this.service.options.sites.forEach((site2) => {
        if (!site2.allowGetUserInfo || site2.offline) {
          return false;
        }
        if (!failedOnly) {
          requests2.push(this.getUserInfo(site2, true));
        } else {
          if (site2.user) {
            let enumStatus = [EUserDataRequestStatus.needLogin, EUserDataRequestStatus.unknown];
            let lastUpdateStatus = enumStatus.includes(site2.user.lastUpdateStatus);
            if (site2.user.lastUpdateStatus && lastUpdateStatus || !site2.user.lastUpdateStatus) {
              requests2.push(this.getUserInfo(site2, true));
            }
          }
        }
      });
      Promise.all(requests2).then((results2) => {
        resolve2(results2);
      });
    });
  }
  updateStatus(site2, userInfo2) {
    userInfo2.lastUpdateTime = (/* @__PURE__ */ new Date()).getTime();
    this.service.userData.update(site2, userInfo2);
  }
  getSiteURL(site2) {
    if (site2.apiCdn && site2.apiCdn.length > 0) {
      return site2.apiCdn[0];
    }
    if (site2.cdn && site2.cdn.length > 0) {
      return site2.cdn[0];
    }
    return site2.url;
  }
  /**
   * 获取指定站点的用户信息
   * @param site
   * @param returnResolve 指定为 true 时，失败时也调用 resolve
   */
  getUserInfo(site2, returnResolve = false) {
    this.service.options.autoRefreshUserDataLastTime = (/* @__PURE__ */ new Date()).getTime();
    this.service.saveConfig();
    return new Promise((resolve2, reject2) => {
      let rejectFN = returnResolve ? resolve2 : reject2;
      if (!site2) {
        rejectFN(null);
        return;
      }
      let userInfo2 = this.service.userData.get(site2.host) || {};
      let rule2 = this.service.getSiteSelector(site2, "userBaseInfo");
      if (!rule2) {
        userInfo2.lastUpdateStatus = EUserDataRequestStatus.notSupported;
        this.updateStatus(site2, userInfo2);
        rejectFN(
          APP.createErrorMessage({
            status: EUserDataRequestStatus.notSupported,
            msg: this.service.i18n.t("service.user.notSupported")
            // "暂不支持"
          })
        );
        return;
      }
      let url2 = `${this.getSiteURL(site2)}${rule2.page}`;
      let host2 = site2.host;
      if (this.checkQueue(host2, url2)) {
        resolve2(userInfo2);
        return;
      }
      this.getInfos(host2, url2, rule2, site2).then((result2) => {
        var _a;
        console.log("userBaseInfo", host2, result2);
        userInfo2 = Object.assign({}, result2);
        if ((_a = rule2 == null ? void 0 : rule2.fields) == null ? void 0 : _a.isLogged) {
          if (userInfo2.isLogged && (userInfo2.name || userInfo2.id)) {
            userInfo2.isLogged = true;
          } else {
            userInfo2.isLogged = false;
          }
        } else if (userInfo2.name || userInfo2.id) {
          userInfo2.isLogged = true;
        }
        if (!userInfo2.isLogged) {
          userInfo2.lastUpdateStatus = EUserDataRequestStatus.needLogin;
          rejectFN(
            APP.createErrorMessage({
              msg: this.service.i18n.t("service.user.notLogged"),
              //"未登录",
              status: EUserDataRequestStatus.needLogin
            })
          );
          return;
        }
        rule2 = this.service.getSiteSelector(site2, "userExtendInfo");
        if (!rule2) {
          this.updateStatus(site2, userInfo2);
          userInfo2.lastUpdateStatus = EUserDataRequestStatus.success;
          resolve2(userInfo2);
          return;
        }
        if (userInfo2.name || userInfo2.id) {
          let url3 = `${this.getSiteURL(site2)}${rule2.page.replace("$user.id$", userInfo2.id).replace("$user.name$", userInfo2.name).replace("$user.bonusPage$", userInfo2.bonusPage).replace("$user.unsatisfiedsPage$", userInfo2.unsatisfiedsPage)}`;
          if (this.checkQueue(host2, url3)) {
            resolve2(userInfo2);
            return;
          }
          this.getInfos(host2, url3, rule2, site2, userInfo2).then((result3) => {
            userInfo2 = Object.assign(userInfo2, result3);
            userInfo2.lastUpdateStatus = EUserDataRequestStatus.success;
            this.updateStatus(site2, userInfo2);
            this.getMoreInfos(site2, userInfo2).then(() => {
              resolve2(userInfo2);
            });
          }).catch((error2) => {
            userInfo2.lastUpdateStatus = EUserDataRequestStatus.unknown;
            rejectFN(APP.createErrorMessage(error2));
          });
        } else {
          userInfo2.lastUpdateStatus = EUserDataRequestStatus.unknown;
          rejectFN(
            APP.createErrorMessage({
              status: EUserDataRequestStatus.unknown,
              msg: this.service.i18n.t("service.user.getUserInfoFailed")
              //"获取用户名和编号失败"
            })
          );
        }
      }).catch((error2) => {
        userInfo2.lastUpdateStatus = EUserDataRequestStatus.unknown;
        console.log("getInfos Error :", error2);
        rejectFN(APP.createErrorMessage(error2));
      });
    });
  }
  /**
   * 获取更多用户信息（如有有定义的话）
   * @param site
   * @param userInfo
   */
  getMoreInfos(site, userInfo) {
    return new Promise((resolve, reject) => {
      let requests = [];
      let selectors = ["userSeedingTorrents", "bonusExtendInfo", "hnrExtendInfo", "levelExtendInfo", "userUploadedTorrents"];
      selectors.forEach((name) => {
        let host = site.host;
        let rule = this.service.getSiteSelector(site, name);
        if (rule && rule.page) {
          let url = `${this.getSiteURL(site)}${rule.page.replace("$user.id$", userInfo.id).replace("$user.name$", userInfo.name).replace("$user.bonusPage$", userInfo.bonusPage).replace("$user.unsatisfiedsPage$", userInfo.unsatisfiedsPage)}`;
          if (this.checkQueue(host, url)) {
            return;
          }
          if (rule.prerequisites) {
            const user = userInfo;
            try {
              let result = eval(rule.prerequisites);
              if (result !== true) {
                return;
              }
            } catch (error2) {
              console.log(error2);
              return;
            }
          }
          requests.push(this.getInfos(host, url, rule, site, userInfo));
        }
      });
      if (requests.length) {
        Promise.all(requests).then((results2) => {
          results2.forEach((result2) => {
            userInfo = Object.assign(userInfo, result2);
            console.log(userInfo);
            userInfo.lastUpdateStatus = EUserDataRequestStatus.success;
            this.updateStatus(site, userInfo);
          });
          resolve(userInfo);
        }).catch((result2) => {
          resolve(userInfo);
        });
      } else {
        resolve(userInfo);
      }
    });
  }
  /**
   * getInfos
   */
  getInfos(host2, url2, rule2, site2, userInfo2) {
    return new Promise((resolve2, reject2) => {
      url2 = url2.replace("://", "****").replace(/\/\//g, "/").replace("****", "://");
      let requestData = rule2.requestData;
      if (requestData && userInfo2) {
        try {
          for (const key2 in requestData) {
            if (requestData.hasOwnProperty(key2)) {
              const value = requestData[key2];
              if (value && typeof value === "object") {
                for (const innerKey in value) {
                  const value1 = value[innerKey];
                  value[innerKey] = PPF.replaceKeys(value1, userInfo2, "user");
                }
                requestData[key2] = value;
              } else {
                requestData[key2] = PPF.replaceKeys(value, userInfo2, "user");
              }
            }
          }
        } catch (error2) {
          console.log(error2);
        }
      }
      let headers = rule2.headers;
      if (headers && userInfo2) {
        try {
          for (const key2 in headers) {
            if (headers.hasOwnProperty(key2)) {
              const value = headers[key2];
              headers[key2] = PPF.replaceKeys(value, userInfo2, "user");
            }
          }
        } catch (error2) {
          console.log(error2);
        }
      }
      if (headers && site2) {
        try {
          for (const key2 in headers) {
            if (headers.hasOwnProperty(key2)) {
              const value = headers[key2];
              headers[key2] = PPF.replaceKeys(value, site2, "site");
            }
          }
        } catch (error2) {
          console.log(error2);
        }
      }
      if (rule2.parser && site2) {
        this.runParser(rule2, site2, userInfo2, resolve2, reject2);
        return;
      }
      PPF.updateBadge(++this.requestQueueCount);
      let request = $.ajax({
        url: url2,
        method: rule2.requestMethod || ERequestMethod.GET,
        dataType: "text",
        data: rule2.requestContentType == "application/json" ? JSON.stringify(requestData) : requestData,
        contentType: rule2.requestContentType == "application/json" ? "application/json" : "application/x-www-form-urlencoded",
        headers: rule2.headers,
        timeout: this.service.options.connectClientTimeout || 3e4,
        cache: (site2 == null ? void 0 : site2.getInfoAjaxCache) ? site2 == null ? void 0 : site2.getInfoAjaxCache : false
      }).done((result2) => {
        this.removeQueue(host2, url2);
        PPF.updateBadge(--this.requestQueueCount);
        let content2;
        try {
          if (rule2.dataType !== ERequestResultType.JSON) {
            let doc2 = new DOMParser().parseFromString(result2, "text/html");
            let topElement = rule2.topElement || "body";
            content2 = $(doc2).find(topElement);
          } else {
            content2 = JSON.parse(result2);
          }
        } catch (error2) {
          this.service.debug("getInfos.error", host2, url2, error2);
          reject2(error2);
          return;
        }
        if (content2 && rule2) {
          try {
            let results2 = new InfoParser().getResult(content2, rule2);
            resolve2(results2);
          } catch (error2) {
            this.service.debug(error2);
            reject2(error2);
          }
        }
      }).fail((jqXHR, textStatus, errorThrown) => {
        this.removeQueue(host2, url2);
        PPF.updateBadge(--this.requestQueueCount);
        let msg = this.service.i18n.t("service.searcher.siteNetworkFailed", {
          site: site2,
          msg: `${jqXHR.status} ${errorThrown}, ${textStatus}`
        });
        this.service.debug(msg, host2, url2, jqXHR.responseText);
        reject2(msg);
      });
      this.addQueue(host2, url2, request);
    });
  }
  /**
   * 执行脚本解析器
   * @param rule
   * @param site
   * @param userInfo
   * @param resolve
   * @param reject
   */
  runParser(rule, site, userInfo, resolve, reject) {
    let siteConfigPath = site.schema == "publicSite" ? "publicSites" : "sites";
    if (site.path) {
      siteConfigPath += `/${site.path}`;
    } else {
      siteConfigPath += `/${site.host}`;
    }
    let path = rule.parser;
    if (path.substr(0, 1) !== "/" && path.substr(0, 4) !== "http") {
      path = `${siteConfigPath}/${path}`;
    }
    let _options = {
      site,
      rule,
      userInfo,
      resolve,
      reject
    };
    let _self = this;
    let script = this.infoParserCache[path];
    if (script) {
      eval(script);
    } else {
      APP.getScriptContent(path).then((script) => {
        this.infoParserCache[path] = script;
        eval(script);
      }).catch((error2) => {
        console.error("Error loading script:", error2);
      });
    }
  }
  addQueue(host2, url2, request) {
    let queues = this.requestQueue[host2] || {};
    queues[url2] = request;
    this.requestQueue[host2] = queues;
  }
  checkQueue(host2, url2) {
    let queues = this.requestQueue[host2] || {};
    return queues[url2] ? true : false;
  }
  removeQueue(host2, url2) {
    let queues = this.requestQueue[host2] || {};
    if (queues[url2]) {
      delete queues[url2];
    }
    this.requestQueue[host2] = queues;
  }
  /**
   * 取消正在执行的搜索请求
   * @param site
   * @param key
   */
  abortGetUserInfo(site2) {
    return new Promise((resolve2, reject2) => {
      let host2 = site2.host;
      let queues = this.requestQueue[host2];
      let errors = [];
      if (queues) {
        for (const key2 in queues) {
          if (queues.hasOwnProperty(key2)) {
            const request = queues[key2];
            try {
              request.abort();
            } catch (error2) {
              this.service.logger.add({
                module: EModule.background,
                event: "user.abortGetUserInfo.error",
                msg: this.service.i18n.t("service.user.abortGetUserInfoFailed"),
                //"取消获取用户信息请求失败",
                data: {
                  site: site2.host,
                  error: error2
                }
              });
              errors.push(error2);
            }
          }
        }
        delete this.requestQueue[host2];
      }
      if (errors.length > 0) {
        reject2(errors);
      } else {
        resolve2(true);
      }
    });
  }
  // MAM需要在访问API时传入存于Cookies中的mam_id，构建这个辅助方法以便获取Cookie
  getCookie(site2, needle) {
    return new Promise((resolve2, reject2) => {
      PPF.checkPermissions(["cookies"]).then(() => {
        this.service.config.getCookiesFromSite(site2).then((result2) => {
          for (const cookie of result2.cookies) {
            if (cookie["name"] === needle) {
              resolve2(cookie["value"]);
            }
          }
          resolve2("");
        }).catch((error2) => {
          reject2(error2);
        });
      }).catch((error2) => {
        reject2(error2);
      });
    });
  }
}
/* Common package for dealing with hex/string/uint8 conversions (and sha1 hashing)
*
* @author   Jimmy Wärting <jimmy@warting.se> (https://jimmy.warting.se/opensource)
* @license  MIT
*/
const alphabet = "0123456789abcdef";
const encodeLookup = [];
const decodeLookup = [];
for (let i2 = 0; i2 < 256; i2++) {
  encodeLookup[i2] = alphabet[i2 >> 4 & 15] + alphabet[i2 & 15];
  if (i2 < 16) {
    if (i2 < 10) {
      decodeLookup[48 + i2] = i2;
    } else {
      decodeLookup[97 - 10 + i2] = i2;
    }
  }
}
const arr2hex = (data2) => {
  const length = data2.length;
  let string = "";
  let i2 = 0;
  while (i2 < length) {
    string += encodeLookup[data2[i2++]];
  }
  return string;
};
const hex2arr = (str) => {
  const sizeof = str.length >> 1;
  const length = sizeof << 1;
  const array = new Uint8Array(sizeof);
  let n2 = 0;
  let i2 = 0;
  while (i2 < length) {
    array[n2++] = decodeLookup[str.charCodeAt(i2++)] << 4 | decodeLookup[str.charCodeAt(i2++)];
  }
  return array;
};
const concat = (chunks, size = 0) => {
  const length = chunks.length || 0;
  if (!size) {
    let i3 = length;
    while (i3--)
      size += chunks[i3].length;
  }
  const b = new Uint8Array(size);
  let offset = size;
  let i2 = length;
  while (i2--) {
    offset -= chunks[i2].length;
    b.set(chunks[i2], offset);
  }
  return b;
};
const equal = (a2, b) => {
  if (a2.length !== b.length)
    return false;
  for (let i2 = a2.length; i2 > -1; i2 -= 1) {
    if (a2[i2] !== b[i2])
      return false;
  }
  return true;
};
var chars$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (var i = 0; i < chars$1.length; i++) {
  lookup[chars$1.charCodeAt(i)] = i;
}
var encode$2 = function(arraybuffer) {
  var bytes = new Uint8Array(arraybuffer), i2, len = bytes.length, base64 = "";
  for (i2 = 0; i2 < len; i2 += 3) {
    base64 += chars$1[bytes[i2] >> 2];
    base64 += chars$1[(bytes[i2] & 3) << 4 | bytes[i2 + 1] >> 4];
    base64 += chars$1[(bytes[i2 + 1] & 15) << 2 | bytes[i2 + 2] >> 6];
    base64 += chars$1[bytes[i2 + 2] & 63];
  }
  if (len % 3 === 2) {
    base64 = base64.substring(0, base64.length - 1) + "=";
  } else if (len % 3 === 1) {
    base64 = base64.substring(0, base64.length - 2) + "==";
  }
  return base64;
};
var decode$2 = function(base64) {
  var bufferLength = base64.length * 0.75, len = base64.length, i2, p2 = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  var arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i2 = 0; i2 < len; i2 += 4) {
    encoded1 = lookup[base64.charCodeAt(i2)];
    encoded2 = lookup[base64.charCodeAt(i2 + 1)];
    encoded3 = lookup[base64.charCodeAt(i2 + 2)];
    encoded4 = lookup[base64.charCodeAt(i2 + 3)];
    bytes[p2++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p2++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p2++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};
const decoder = new TextDecoder();
const arr2text = (data2, enc) => {
  if (!enc)
    return decoder.decode(data2);
  const dec = new TextDecoder(enc);
  return dec.decode(data2);
};
const encoder = new TextEncoder();
const text2arr = (str) => encoder.encode(str);
const arr2base = (data2) => encode$2(data2);
const base2arr = (str) => new Uint8Array(decode$2(str));
const bin2hex = (str) => {
  let res = "";
  let c2;
  let i2 = 0;
  const len = str.length;
  while (i2 < len) {
    c2 = str.charCodeAt(i2++);
    res += alphabet[c2 >> 4] + alphabet[c2 & 15];
  }
  return res;
};
const MAX_ARGUMENTS_LENGTH = 65536;
const hex2bin = (hex) => {
  const points = hex2arr(hex);
  if (points.length <= MAX_ARGUMENTS_LENGTH)
    return String.fromCharCode(...points);
  let res = "";
  let i2 = 0;
  while (i2 < points.length) {
    res += String.fromCharCode(...points.subarray(i2, i2 += MAX_ARGUMENTS_LENGTH));
  }
  return res;
};
const scope = typeof window !== "undefined" ? window : self;
const crypto = scope.crypto || scope.msCrypto || {};
const subtle = crypto.subtle || crypto.webkitSubtle;
const formatMap = {
  hex: arr2hex,
  base64: arr2base
};
const hash = async (data2, format, algo = "sha-1") => {
  if (!subtle)
    throw new Error("no web crypto support");
  if (typeof data2 === "string")
    data2 = text2arr(data2);
  const out = new Uint8Array(await subtle.digest(algo, data2));
  return format ? formatMap[format](out) : out;
};
const randomBytes = (size) => {
  const view = new Uint8Array(size);
  return crypto.getRandomValues(view);
};
function digitCount(value) {
  const sign = value < 0 ? 1 : 0;
  value = Math.abs(Number(value || 1));
  return Math.floor(Math.log10(value)) + 1 + sign;
}
function getType(value) {
  if (ArrayBuffer.isView(value))
    return "arraybufferview";
  if (Array.isArray(value))
    return "array";
  if (value instanceof Number)
    return "number";
  if (value instanceof Boolean)
    return "boolean";
  if (value instanceof Set)
    return "set";
  if (value instanceof Map)
    return "map";
  if (value instanceof String)
    return "string";
  if (value instanceof ArrayBuffer)
    return "arraybuffer";
  return typeof value;
}
function encode$1(data2, buffer, offset) {
  const buffers = [];
  let result2 = null;
  encode$1._encode(buffers, data2);
  result2 = concat(buffers);
  encode$1.bytes = result2.length;
  if (ArrayBuffer.isView(buffer)) {
    buffer.set(result2, offset);
    return buffer;
  }
  return result2;
}
encode$1.bytes = -1;
encode$1._floatConversionDetected = false;
encode$1._encode = function(buffers, data2) {
  if (data2 == null) {
    return;
  }
  switch (getType(data2)) {
    case "object":
      encode$1.dict(buffers, data2);
      break;
    case "map":
      encode$1.dictMap(buffers, data2);
      break;
    case "array":
      encode$1.list(buffers, data2);
      break;
    case "set":
      encode$1.listSet(buffers, data2);
      break;
    case "string":
      encode$1.string(buffers, data2);
      break;
    case "number":
      encode$1.number(buffers, data2);
      break;
    case "boolean":
      encode$1.number(buffers, data2);
      break;
    case "arraybufferview":
      encode$1.buffer(buffers, new Uint8Array(data2.buffer, data2.byteOffset, data2.byteLength));
      break;
    case "arraybuffer":
      encode$1.buffer(buffers, new Uint8Array(data2));
      break;
  }
};
const buffE = new Uint8Array([101]);
const buffD = new Uint8Array([100]);
const buffL = new Uint8Array([108]);
encode$1.buffer = function(buffers, data2) {
  buffers.push(text2arr(data2.length + ":"), data2);
};
encode$1.string = function(buffers, data2) {
  buffers.push(text2arr(text2arr(data2).byteLength + ":" + data2));
};
encode$1.number = function(buffers, data2) {
  if (Number.isInteger(data2))
    return buffers.push(text2arr("i" + BigInt(data2) + "e"));
  const maxLo = 2147483648;
  const hi = data2 / maxLo << 0;
  const lo = data2 % maxLo << 0;
  const val2 = hi * maxLo + lo;
  buffers.push(text2arr("i" + val2 + "e"));
  if (val2 !== data2 && !encode$1._floatConversionDetected) {
    encode$1._floatConversionDetected = true;
    console.warn(
      'WARNING: Possible data corruption detected with value "' + data2 + '":',
      'Bencoding only defines support for integers, value was converted to "' + val2 + '"'
    );
    console.trace();
  }
};
encode$1.dict = function(buffers, data2) {
  buffers.push(buffD);
  let j = 0;
  let k;
  const keys = Object.keys(data2).sort();
  const kl = keys.length;
  for (; j < kl; j++) {
    k = keys[j];
    if (data2[k] == null)
      continue;
    encode$1.string(buffers, k);
    encode$1._encode(buffers, data2[k]);
  }
  buffers.push(buffE);
};
encode$1.dictMap = function(buffers, data2) {
  buffers.push(buffD);
  const keys = Array.from(data2.keys()).sort();
  for (const key2 of keys) {
    if (data2.get(key2) == null)
      continue;
    ArrayBuffer.isView(key2) ? encode$1._encode(buffers, key2) : encode$1.string(buffers, String(key2));
    encode$1._encode(buffers, data2.get(key2));
  }
  buffers.push(buffE);
};
encode$1.list = function(buffers, data2) {
  let i2 = 0;
  const c2 = data2.length;
  buffers.push(buffL);
  for (; i2 < c2; i2++) {
    if (data2[i2] == null)
      continue;
    encode$1._encode(buffers, data2[i2]);
  }
  buffers.push(buffE);
};
encode$1.listSet = function(buffers, data2) {
  buffers.push(buffL);
  for (const item of data2) {
    if (item == null)
      continue;
    encode$1._encode(buffers, item);
  }
  buffers.push(buffE);
};
const INTEGER_START = 105;
const STRING_DELIM = 58;
const DICTIONARY_START = 100;
const LIST_START = 108;
const END_OF_TYPE = 101;
function getIntFromBuffer(buffer, start, end) {
  let sum = 0;
  let sign = 1;
  for (let i2 = start; i2 < end; i2++) {
    const num = buffer[i2];
    if (num < 58 && num >= 48) {
      sum = sum * 10 + (num - 48);
      continue;
    }
    if (i2 === start && num === 43) {
      continue;
    }
    if (i2 === start && num === 45) {
      sign = -1;
      continue;
    }
    if (num === 46) {
      break;
    }
    throw new Error("not a number: buffer[" + i2 + "] = " + num);
  }
  return sum * sign;
}
function decode$1(data2, start, end, encoding) {
  if (data2 == null || data2.length === 0) {
    return null;
  }
  if (typeof start !== "number" && encoding == null) {
    encoding = start;
    start = void 0;
  }
  if (typeof end !== "number" && encoding == null) {
    encoding = end;
    end = void 0;
  }
  decode$1.position = 0;
  decode$1.encoding = encoding || null;
  decode$1.data = !ArrayBuffer.isView(data2) ? text2arr(data2) : new Uint8Array(data2.slice(start, end));
  decode$1.bytes = decode$1.data.length;
  return decode$1.next();
}
decode$1.bytes = 0;
decode$1.position = 0;
decode$1.data = null;
decode$1.encoding = null;
decode$1.next = function() {
  switch (decode$1.data[decode$1.position]) {
    case DICTIONARY_START:
      return decode$1.dictionary();
    case LIST_START:
      return decode$1.list();
    case INTEGER_START:
      return decode$1.integer();
    default:
      return decode$1.buffer();
  }
};
decode$1.find = function(chr) {
  let i2 = decode$1.position;
  const c2 = decode$1.data.length;
  const d2 = decode$1.data;
  while (i2 < c2) {
    if (d2[i2] === chr)
      return i2;
    i2++;
  }
  throw new Error(
    'Invalid data: Missing delimiter "' + String.fromCharCode(chr) + '" [0x' + chr.toString(16) + "]"
  );
};
decode$1.dictionary = function() {
  decode$1.position++;
  const dict = {};
  while (decode$1.data[decode$1.position] !== END_OF_TYPE) {
    const buffer = decode$1.buffer();
    let key2 = arr2text(buffer);
    if (key2.includes("�"))
      key2 = arr2hex(buffer);
    dict[key2] = decode$1.next();
  }
  decode$1.position++;
  return dict;
};
decode$1.list = function() {
  decode$1.position++;
  const lst = [];
  while (decode$1.data[decode$1.position] !== END_OF_TYPE) {
    lst.push(decode$1.next());
  }
  decode$1.position++;
  return lst;
};
decode$1.integer = function() {
  const end = decode$1.find(END_OF_TYPE);
  const number = getIntFromBuffer(decode$1.data, decode$1.position + 1, end);
  decode$1.position += end + 1 - decode$1.position;
  return number;
};
decode$1.buffer = function() {
  let sep = decode$1.find(STRING_DELIM);
  const length = getIntFromBuffer(decode$1.data, decode$1.position, sep);
  const end = ++sep + length;
  decode$1.position = end;
  return decode$1.encoding ? arr2text(decode$1.data.slice(sep, end)) : decode$1.data.slice(sep, end);
};
function listLength(list) {
  let length = 1 + 1;
  for (const value of list) {
    length += encodingLength$1(value);
  }
  return length;
}
function mapLength(map) {
  let length = 1 + 1;
  for (const [key2, value] of map) {
    const keyLength = text2arr(key2).byteLength;
    length += digitCount(keyLength) + 1 + keyLength;
    length += encodingLength$1(value);
  }
  return length;
}
function objectLength(value) {
  let length = 1 + 1;
  const keys = Object.keys(value);
  for (let i2 = 0; i2 < keys.length; i2++) {
    const keyLength = text2arr(keys[i2]).byteLength;
    length += digitCount(keyLength) + 1 + keyLength;
    length += encodingLength$1(value[keys[i2]]);
  }
  return length;
}
function stringLength(value) {
  const length = text2arr(value).byteLength;
  return digitCount(length) + 1 + length;
}
function arrayBufferLength(value) {
  const length = value.byteLength - value.byteOffset;
  return digitCount(length) + 1 + length;
}
function encodingLength$1(value) {
  const length = 0;
  if (value == null)
    return length;
  const type = getType(value);
  switch (type) {
    case "arraybufferview":
      return arrayBufferLength(value);
    case "string":
      return stringLength(value);
    case "array":
    case "set":
      return listLength(value);
    case "number":
      return 1 + digitCount(Math.floor(value)) + 1;
    case "bigint":
      return 1 + value.toString().length + 1;
    case "object":
      return objectLength(value);
    case "map":
      return mapLength(value);
    default:
      throw new TypeError(`Unsupported value of type "${type}"`);
  }
}
const encodingLength = encodingLength$1;
const bencode = { encode: encode$1, decode: decode$1, byteLength: encodingLength$1, encodingLength };
const Blob$1 = self.Blob;
const File = self.File;
const FormData$1 = self.FormData;
const Headers = self.Headers;
const Request = self.Request;
const Response = self.Response;
const AbortController = self.AbortController;
const AbortSignal$1 = self.AbortSignal;
const fetch$1 = self.fetch || (() => {
  throw new Error("global fetch is not available!");
});
const charTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const byteTable = [
  255,
  255,
  26,
  27,
  28,
  29,
  30,
  31,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  255,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  255,
  255,
  255,
  255,
  255,
  255,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  255,
  255,
  255,
  255,
  255
];
function quintetCount(buff) {
  const quintets = Math.floor(buff.length / 5);
  return buff.length % 5 === 0 ? quintets : quintets + 1;
}
const encode = function(plain) {
  if (!ArrayBuffer.isView(plain) && typeof plain !== "string") {
    throw new TypeError("base32.encode only takes Buffer or string as parameter");
  }
  if (!ArrayBuffer.isView(plain)) {
    plain = text2arr(plain);
  }
  let i2 = 0;
  let j = 0;
  let shiftIndex = 0;
  let digit = 0;
  const encoded = new Uint8Array(quintetCount(plain) * 8);
  while (i2 < plain.length) {
    const current = plain[i2];
    if (shiftIndex > 3) {
      digit = current & 255 >> shiftIndex;
      shiftIndex = (shiftIndex + 5) % 8;
      digit = digit << shiftIndex | (i2 + 1 < plain.length ? plain[i2 + 1] : 0) >> 8 - shiftIndex;
      i2++;
    } else {
      digit = current >> 8 - (shiftIndex + 5) & 31;
      shiftIndex = (shiftIndex + 5) % 8;
      if (shiftIndex === 0) {
        i2++;
      }
    }
    encoded[j] = charTable.charCodeAt(digit);
    j++;
  }
  for (i2 = j; i2 < encoded.length; i2++) {
    encoded[i2] = 61;
  }
  return encoded;
};
const decode = function(encoded) {
  if (!ArrayBuffer.isView(encoded) && typeof encoded !== "string") {
    throw new TypeError("base32.decode only takes Buffer or string as parameter");
  }
  let shiftIndex = 0;
  let plainDigit = 0;
  let plainChar;
  let plainPos = 0;
  if (!ArrayBuffer.isView(encoded)) {
    encoded = text2arr(encoded);
  }
  const decoded = new Uint8Array(Math.ceil(encoded.length * 5 / 8));
  for (let i2 = 0; i2 < encoded.length; i2++) {
    if (encoded[i2] === 61) {
      break;
    }
    const encodedByte = encoded[i2] - 48;
    if (encodedByte < byteTable.length) {
      plainDigit = byteTable[encodedByte];
      if (shiftIndex <= 3) {
        shiftIndex = (shiftIndex + 5) % 8;
        if (shiftIndex === 0) {
          plainChar |= plainDigit;
          decoded[plainPos] = plainChar;
          plainPos++;
          plainChar = 0;
        } else {
          plainChar |= 255 & plainDigit << 8 - shiftIndex;
        }
      } else {
        shiftIndex = (shiftIndex + 5) % 8;
        plainChar |= 255 & plainDigit >>> shiftIndex;
        decoded[plainPos] = plainChar;
        plainPos++;
        plainChar = 255 & plainDigit << 8 - shiftIndex;
      }
    } else {
      throw new Error("Invalid input - it is not base32 encoded string");
    }
  }
  return decoded.subarray(0, plainPos);
};
const index = { encode, decode };
function composeRange(range) {
  return range.reduce((acc, cur, idx, arr) => {
    if (idx === 0 || cur !== arr[idx - 1] + 1)
      acc.push([]);
    acc[acc.length - 1].push(cur);
    return acc;
  }, []).map((cur) => {
    return cur.length > 1 ? `${cur[0]}-${cur[cur.length - 1]}` : `${cur[0]}`;
  });
}
function parseRange(range) {
  const generateRange = (start, end = start) => Array.from({ length: end - start + 1 }, (cur, idx) => idx + start);
  return range.reduce((acc, cur, idx, arr) => {
    const r2 = cur.split("-").map((cur2) => parseInt(cur2));
    return acc.concat(generateRange(...r2));
  }, []);
}
/*! magnet-uri. MIT License. WebTorrent LLC <https://webtorrent.io/opensource> */
function magnetURIDecode(uri) {
  const result2 = {};
  const data2 = uri.split("magnet:?")[1];
  const params = data2 && data2.length >= 0 ? data2.split("&") : [];
  params.forEach((param) => {
    const keyval = param.split("=");
    if (keyval.length !== 2)
      return;
    const key2 = keyval[0];
    let val2 = keyval[1];
    if (key2 === "dn")
      val2 = decodeURIComponent(val2).replace(/\+/g, " ");
    if (key2 === "tr" || key2 === "xs" || key2 === "as" || key2 === "ws") {
      val2 = decodeURIComponent(val2);
    }
    if (key2 === "kt")
      val2 = decodeURIComponent(val2).split("+");
    if (key2 === "ix")
      val2 = Number(val2);
    if (key2 === "so")
      val2 = parseRange(decodeURIComponent(val2).split(","));
    if (result2[key2]) {
      if (!Array.isArray(result2[key2])) {
        result2[key2] = [result2[key2]];
      }
      result2[key2].push(val2);
    } else {
      result2[key2] = val2;
    }
  });
  let m;
  if (result2.xt) {
    const xts = Array.isArray(result2.xt) ? result2.xt : [result2.xt];
    xts.forEach((xt) => {
      if (m = xt.match(/^urn:btih:(.{40})/)) {
        result2.infoHash = m[1].toLowerCase();
      } else if (m = xt.match(/^urn:btih:(.{32})/)) {
        result2.infoHash = arr2hex(decode(m[1]));
      } else if (m = xt.match(/^urn:btmh:1220(.{64})/)) {
        result2.infoHashV2 = m[1].toLowerCase();
      }
    });
  }
  if (result2.xs) {
    const xss = Array.isArray(result2.xs) ? result2.xs : [result2.xs];
    xss.forEach((xs) => {
      if (m = xs.match(/^urn:btpk:(.{64})/)) {
        result2.publicKey = m[1].toLowerCase();
      }
    });
  }
  if (result2.infoHash)
    result2.infoHashBuffer = hex2arr(result2.infoHash);
  if (result2.infoHashV2)
    result2.infoHashV2Buffer = hex2arr(result2.infoHashV2);
  if (result2.publicKey)
    result2.publicKeyBuffer = hex2arr(result2.publicKey);
  if (result2.dn)
    result2.name = result2.dn;
  if (result2.kt)
    result2.keywords = result2.kt;
  result2.announce = [];
  if (typeof result2.tr === "string" || Array.isArray(result2.tr)) {
    result2.announce = result2.announce.concat(result2.tr);
  }
  result2.urlList = [];
  if (typeof result2.as === "string" || Array.isArray(result2.as)) {
    result2.urlList = result2.urlList.concat(result2.as);
  }
  if (typeof result2.ws === "string" || Array.isArray(result2.ws)) {
    result2.urlList = result2.urlList.concat(result2.ws);
  }
  result2.peerAddresses = [];
  if (typeof result2["x.pe"] === "string" || Array.isArray(result2["x.pe"])) {
    result2.peerAddresses = result2.peerAddresses.concat(result2["x.pe"]);
  }
  result2.announce = Array.from(new Set(result2.announce));
  result2.urlList = Array.from(new Set(result2.urlList));
  result2.peerAddresses = Array.from(new Set(result2.peerAddresses));
  return result2;
}
function magnetURIEncode(obj) {
  obj = Object.assign({}, obj);
  let xts = /* @__PURE__ */ new Set();
  if (obj.xt && typeof obj.xt === "string")
    xts.add(obj.xt);
  if (obj.xt && Array.isArray(obj.xt))
    xts = new Set(obj.xt);
  if (obj.infoHashBuffer)
    xts.add(`urn:btih:${arr2hex(obj.infoHashBuffer)}`);
  if (obj.infoHash)
    xts.add(`urn:btih:${obj.infoHash}`);
  if (obj.infoHashV2Buffer)
    xts.add(obj.xt = `urn:btmh:1220${arr2hex(obj.infoHashV2Buffer)}`);
  if (obj.infoHashV2)
    xts.add(`urn:btmh:1220${obj.infoHashV2}`);
  const xtsDeduped = Array.from(xts);
  if (xtsDeduped.length === 1)
    obj.xt = xtsDeduped[0];
  if (xtsDeduped.length > 1)
    obj.xt = xtsDeduped;
  if (obj.publicKeyBuffer)
    obj.xs = `urn:btpk:${arr2hex(obj.publicKeyBuffer)}`;
  if (obj.publicKey)
    obj.xs = `urn:btpk:${obj.publicKey}`;
  if (obj.name)
    obj.dn = obj.name;
  if (obj.keywords)
    obj.kt = obj.keywords;
  if (obj.announce)
    obj.tr = obj.announce;
  if (obj.urlList) {
    obj.ws = obj.urlList;
    delete obj.as;
  }
  if (obj.peerAddresses)
    obj["x.pe"] = obj.peerAddresses;
  let result2 = "magnet:?";
  Object.keys(obj).filter((key2) => key2.length === 2 || key2 === "x.pe").forEach((key2, i2) => {
    const values = Array.isArray(obj[key2]) ? obj[key2] : [obj[key2]];
    values.forEach((val2, j) => {
      if ((i2 > 0 || j > 0) && (key2 !== "kt" && key2 !== "so" || j === 0))
        result2 += "&";
      if (key2 === "dn")
        val2 = encodeURIComponent(val2).replace(/%20/g, "+");
      if (key2 === "tr" || key2 === "as" || key2 === "ws") {
        val2 = encodeURIComponent(val2);
      }
      if (key2 === "xs" && !val2.startsWith("urn:btpk:")) {
        val2 = encodeURIComponent(val2);
      }
      if (key2 === "kt")
        val2 = encodeURIComponent(val2);
      if (key2 === "so")
        return;
      if (key2 === "kt" && j > 0)
        result2 += `+${val2}`;
      else
        result2 += `${key2}=${val2}`;
    });
    if (key2 === "so")
      result2 += `${key2}=${composeRange(values)}`;
  });
  return result2;
}
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let promise;
var queueMicrotask_1 = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : commonjsGlobal) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
  throw err;
}, 0));
const queueMicrotask$1 = /* @__PURE__ */ getDefaultExportFromCjs(queueMicrotask_1);
/*! parse-torrent. MIT License. WebTorrent LLC <https://webtorrent.io/opensource> */
async function parseTorrent(torrentId) {
  if (typeof torrentId === "string" && /^(stream-)?magnet:/.test(torrentId)) {
    const torrentObj = magnetURIDecode(torrentId);
    if (!torrentObj.infoHash) {
      throw new Error("Invalid torrent identifier");
    }
    return torrentObj;
  } else if (typeof torrentId === "string" && (/^[a-f0-9]{40}$/i.test(torrentId) || /^[a-z2-7]{32}$/i.test(torrentId))) {
    return magnetURIDecode(`magnet:?xt=urn:btih:${torrentId}`);
  } else if (ArrayBuffer.isView(torrentId) && torrentId.length === 20) {
    return magnetURIDecode(`magnet:?xt=urn:btih:${arr2hex(torrentId)}`);
  } else if (ArrayBuffer.isView(torrentId)) {
    return await decodeTorrentFile(torrentId);
  } else if (torrentId && torrentId.infoHash) {
    torrentId.infoHash = torrentId.infoHash.toLowerCase();
    if (!torrentId.announce)
      torrentId.announce = [];
    if (typeof torrentId.announce === "string") {
      torrentId.announce = [torrentId.announce];
    }
    if (!torrentId.urlList)
      torrentId.urlList = [];
    return torrentId;
  } else {
    throw new Error("Invalid torrent identifier");
  }
}
async function parseTorrentRemote(torrentId, opts, cb) {
  if (typeof opts === "function")
    return parseTorrentRemote(torrentId, {}, opts);
  if (typeof cb !== "function")
    throw new Error("second argument must be a Function");
  let parsedTorrent;
  try {
    parsedTorrent = await parseTorrent(torrentId);
  } catch (err) {
  }
  if (parsedTorrent && parsedTorrent.infoHash) {
    queueMicrotask$1(() => {
      cb(null, parsedTorrent);
    });
  } else if (isBlob(torrentId)) {
    try {
      const torrentBuf = new Uint8Array(await torrentId.arrayBuffer());
      parseOrThrow(torrentBuf);
    } catch (err) {
      return cb(new Error(`Error converting Blob: ${err.message}`));
    }
  } else if (/^https?:/.test(torrentId)) {
    try {
      const res = await fetch$1(torrentId, {
        headers: { "user-agent": "WebTorrent (https://webtorrent.io)" },
        signal: AbortSignal.timeout(30 * 1e3),
        ...opts
      });
      const torrentBuf = new Uint8Array(await res.arrayBuffer());
      parseOrThrow(torrentBuf);
    } catch (err) {
      return cb(new Error(`Error downloading torrent: ${err.message}`));
    }
  } else if (typeof path.readFile === "function" && typeof torrentId === "string") {
    path.readFile(torrentId, (err, torrentBuf) => {
      if (err)
        return cb(new Error("Invalid torrent identifier"));
      parseOrThrow(torrentBuf);
    });
  } else {
    queueMicrotask$1(() => {
      cb(new Error("Invalid torrent identifier"));
    });
  }
  async function parseOrThrow(torrentBuf) {
    try {
      parsedTorrent = await parseTorrent(torrentBuf);
    } catch (err) {
      return cb(err);
    }
    if (parsedTorrent && parsedTorrent.infoHash)
      cb(null, parsedTorrent);
    else
      cb(new Error("Invalid torrent identifier"));
  }
}
async function decodeTorrentFile(torrent) {
  if (ArrayBuffer.isView(torrent)) {
    torrent = bencode.decode(torrent);
  }
  ensure(torrent.info, "info");
  ensure(torrent.info["name.utf-8"] || torrent.info.name, "info.name");
  ensure(torrent.info["piece length"], "info['piece length']");
  ensure(torrent.info.pieces, "info.pieces");
  if (torrent.info.files) {
    torrent.info.files.forEach((file) => {
      ensure(typeof file.length === "number", "info.files[0].length");
      ensure(file["path.utf-8"] || file.path, "info.files[0].path");
    });
  } else {
    ensure(typeof torrent.info.length === "number", "info.length");
  }
  const result2 = {
    info: torrent.info,
    infoBuffer: bencode.encode(torrent.info),
    name: arr2text(torrent.info["name.utf-8"] || torrent.info.name),
    announce: []
  };
  result2.infoHashBuffer = await hash(result2.infoBuffer);
  result2.infoHash = arr2hex(result2.infoHashBuffer);
  if (torrent.info.private !== void 0)
    result2.private = !!torrent.info.private;
  if (torrent["creation date"])
    result2.created = new Date(torrent["creation date"] * 1e3);
  if (torrent["created by"])
    result2.createdBy = arr2text(torrent["created by"]);
  if (ArrayBuffer.isView(torrent.comment))
    result2.comment = arr2text(torrent.comment);
  if (Array.isArray(torrent["announce-list"]) && torrent["announce-list"].length > 0) {
    torrent["announce-list"].forEach((urls) => {
      urls.forEach((url2) => {
        result2.announce.push(arr2text(url2));
      });
    });
  } else if (torrent.announce) {
    result2.announce.push(arr2text(torrent.announce));
  }
  if (ArrayBuffer.isView(torrent["url-list"])) {
    torrent["url-list"] = torrent["url-list"].length > 0 ? [torrent["url-list"]] : [];
  }
  result2.urlList = (torrent["url-list"] || []).map((url2) => arr2text(url2));
  result2.announce = Array.from(new Set(result2.announce));
  result2.urlList = Array.from(new Set(result2.urlList));
  const files = torrent.info.files || [torrent.info];
  result2.files = files.map((file, i2) => {
    const parts = [].concat(result2.name, file["path.utf-8"] || file.path || []).map((p2) => ArrayBuffer.isView(p2) ? arr2text(p2) : p2);
    return {
      path: path.join.apply(null, [path.sep].concat(parts)).slice(1),
      name: parts[parts.length - 1],
      length: file.length,
      offset: files.slice(0, i2).reduce(sumLength, 0)
    };
  });
  result2.length = files.reduce(sumLength, 0);
  const lastFile = result2.files[result2.files.length - 1];
  result2.pieceLength = torrent.info["piece length"];
  result2.lastPieceLength = (lastFile.offset + lastFile.length) % result2.pieceLength || result2.pieceLength;
  result2.pieces = splitPieces(torrent.info.pieces);
  return result2;
}
function encodeTorrentFile(parsed) {
  const torrent = {
    info: parsed.info
  };
  torrent["announce-list"] = (parsed.announce || []).map((url2) => {
    if (!torrent.announce)
      torrent.announce = url2;
    url2 = text2arr(url2);
    return [url2];
  });
  torrent["url-list"] = parsed.urlList || [];
  if (parsed.private !== void 0) {
    torrent.private = Number(parsed.private);
  }
  if (parsed.created) {
    torrent["creation date"] = parsed.created.getTime() / 1e3 | 0;
  }
  if (parsed.createdBy) {
    torrent["created by"] = parsed.createdBy;
  }
  if (parsed.comment) {
    torrent.comment = parsed.comment;
  }
  return bencode.encode(torrent);
}
function isBlob(obj) {
  return typeof Blob !== "undefined" && obj instanceof Blob;
}
function sumLength(sum, file) {
  return sum + file.length;
}
function splitPieces(buf) {
  const pieces = [];
  for (let i2 = 0; i2 < buf.length; i2 += 20) {
    pieces.push(arr2hex(buf.slice(i2, i2 + 20)));
  }
  return pieces;
}
function ensure(bool, fieldName) {
  if (!bool)
    throw new Error(`Torrent is missing required field: ${fieldName}`);
}
const toMagnetURI = magnetURIEncode;
class Emby {
  constructor(options2) {
    this.options = options2;
    this.serverURL = "";
    this.API = {
      methods: {
        findFromIMDb: "Items?Recursive=true&Fields=Path,Size,OfficialRating,MediaSources&AnyProviderIdEquals=imdb.$imdbId$",
        getSystemInfo: "System/Info"
      }
    };
    this.serverURL = this.options.address;
    if (this.serverURL.substr(-1) !== "/") {
      this.serverURL += "/";
    }
  }
  /**
  * 替换指定的字符串列表
  * @param source
  * @param maps
  */
  replaceKeys(source2, maps, prefix = "") {
    if (!source2) {
      return source2;
    }
    let result2 = source2;
    for (const key2 in maps) {
      if (maps.hasOwnProperty(key2)) {
        const value = maps[key2];
        let search = "$" + key2 + "$";
        if (prefix) {
          search = `$${prefix}.${key2}$`;
        }
        result2 = result2.replace(search, value);
      }
    }
    return result2;
  }
  /**
   * 指定指定的API
   * @param method 
   * @param data 
   * @returns 
   */
  async execAPI(method = "", data2 = {}) {
    let m;
    let methods = method.split(".");
    if (methods.length == 1) {
      m = this.API.methods[method];
    } else {
      m = this.API.methods[methods[0]][methods[1]];
    }
    let url2 = "";
    let mode = "GET";
    if (typeof m == "string") {
      url2 = m;
    } else {
      url2 = m.url;
      mode = m.mode || "GET";
    }
    url2 = this.serverURL + this.replaceKeys(url2, data2);
    const options2 = {
      method: mode,
      headers: {
        accept: "application/json",
        "X-Emby-Token": `${this.options.apiKey}`
      }
    };
    try {
      const response = await fetch(url2, options2);
      if (response.ok) {
        const result2 = await response.json();
        return result2;
      } else {
        throw new Error(`HTTP 错误！状态码：${response.status}`);
      }
    } catch (error2) {
    }
    return false;
  }
  /**
   * 验证服务器可用性
   */
  async ping() {
    const result2 = await this.execAPI("getSystemInfo");
    if (result2 && result2.Id) {
      return true;
    }
    return false;
  }
  /**
   * 根据imdbId 获取媒体信息
   * @param imdbId 
   * @returns 
   */
  async getMediaFromMediaServer(imdbId) {
    const result2 = await this.execAPI("findFromIMDb", {
      imdbId
    });
    if (result2 && result2.Items) {
      return result2;
    }
    return false;
  }
}
class MediaServerManager {
  constructor() {
    this.servers = {};
  }
  getServer(options2) {
    let server = this.servers[options2.id];
    if (server) {
      return server;
    }
    switch (options2.type) {
      case EMediaServerType.Emby:
        server = new Emby(options2);
        break;
      default:
        break;
    }
    if (server) {
      this.servers[options2.id] = server;
    }
    return server;
  }
  reset() {
    for (const item of this.servers) {
      this.servers[item] = void 0;
      delete this.servers[item];
    }
    this.servers = {};
  }
  async ping(options2) {
    let server = this.getServer(options2);
    if (server) {
      return server.ping();
    }
    return false;
  }
  async getMediaFromMediaServer(options2, imdbId) {
    let server = this.getServer(options2);
    if (server) {
      return server.getMediaFromMediaServer(imdbId);
    }
    return false;
  }
}
class Controller {
  constructor(service) {
    this.service = service;
    this.options = {
      sites: [],
      clients: []
    };
    this.defaultClientOptions = {};
    this.siteDefaultClients = {};
    this.optionsTabId = 0;
    this.downloadHistory = new DownloadHistory();
    this.clients = {};
    this.searcher = new Searcher(this.service);
    this.userService = new User(this.service);
    this.movieInfoService = new MovieInfoService();
    this.mediaServerManager = new MediaServerManager();
    this.clientController = new ClientController();
    this.isInitialized = false;
    this.contentPages = [];
    this.debuggerTabId = 0;
    this.imageBase64Cache = {};
    this.downloadFailedRetriesCache = {};
    this.torrentInfosCache = {};
  }
  init(options2) {
    this.reset(options2);
    this.isInitialized = true;
  }
  /**
   * 重置并刷新配置
   * @param options
   */
  reset(options2) {
    this.options = options2;
    this.clientController.init(options2);
    this.searcher.options = options2;
    this.initDefaultClient();
    this.siteDefaultClients = {};
    if (options2.connectClientTimeout) {
      this.movieInfoService.timeout = options2.connectClientTimeout;
    }
    if (this.options.apiKey) {
      if (this.options.apiKey.omdb && this.options.apiKey.omdb.length > 0) {
        this.movieInfoService.appendApiKey("omdb", this.options.apiKey.omdb);
      }
      if (this.options.apiKey.douban && this.options.apiKey.douban.length > 0) {
        this.movieInfoService.appendApiKey(
          "douban",
          this.options.apiKey.douban
        );
      }
    }
  }
  /**
   * 获取搜索结果
   * @param options
   */
  getSearchResult(options2) {
    return this.searcher.searchTorrent(
      options2.site,
      options2.key,
      options2.payload
    );
  }
  /**
   * 取消一个正在执行的搜索请求
   * @param options
   */
  abortSearch(options2) {
    return this.searcher.abortSearch(options2.site, options2.key);
  }
  /**
   * 获取下载历史记录
   */
  getDownloadHistory() {
    return this.downloadHistory.load();
  }
  /**
   * 保存下载记录
   * @param data 下载链接信息
   * @param host 站点域名
   * @param clientId 下载客户端ID
   */
  saveDownloadHistory(data2, host2 = "", clientId = "", success = true) {
    if (this.options.saveDownloadHistory) {
      this.downloadHistory.add(data2, host2, clientId, success);
    }
  }
  /**
   * 删除下载历史记录
   * @param items 需要删除的列表
   */
  removeDownloadHistory(items) {
    return this.downloadHistory.remove(items);
  }
  /**
   * 清除下载记录
   */
  clearDownloadHistory() {
    return this.downloadHistory.clear();
  }
  /**
   * 重置下载历史
   */
  resetDownloadHistory(datas) {
    return this.downloadHistory.reset(datas);
  }
  /**
   * 发送下载信息到指定的客户端
   * @param data
   */
  sendTorrentToClient(data2) {
    return new Promise((resolve2, reject2) => {
      if (!data2.url) {
        reject2({
          msg: this.service.i18n.t("service.controller.invalidAddress")
          //"无效的地址"
        });
        return;
      }
      let URL = filters.parseURL(data2.url);
      let host2 = URL.host;
      let clientConfig = this.options.clients.find((item) => {
        return item.id === data2.clientId;
      });
      if (!clientConfig) {
        reject2({
          msg: this.service.i18n.t("service.controller.invalidDownloadServer")
          //"无效的下载服务器"
        });
        return;
      }
      this.getClient(clientConfig).then((result2) => {
        this.doDownload(result2, data2, host2).then((result22) => {
          resolve2(result22);
        }).catch((result22) => {
          reject2(result22);
        });
      });
    });
  }
  /**
   * 发送下载链接地址到默认服务器（客户端）
   * @param downloadOptions 下载选项
   */
  sendTorrentToDefaultClient(downloadOptions) {
    return new Promise((resolve2, reject2) => {
      let URL = filters.parseURL(downloadOptions.url);
      let host2 = URL.host;
      let site2 = this.getSiteFromHost(host2);
      host2 = site2.host + "";
      let siteDefaultPath = this.getSiteDefaultPath(site2);
      let siteClientConfig = this.siteDefaultClients[host2];
      if (!downloadOptions.savePath && siteDefaultPath) {
        downloadOptions.savePath = siteDefaultPath;
      }
      if (!siteClientConfig) {
        this.initSiteDefaultClient(host2).then((siteClientConfig2) => {
          this.siteDefaultClients[host2] = siteClientConfig2;
          this.doDownload(siteClientConfig2, downloadOptions, host2).then((result2) => {
            resolve2(result2);
          }).catch((result2) => {
            reject2(result2);
          });
        });
      } else {
        this.doDownload(siteClientConfig, downloadOptions, host2).then((result2) => {
          resolve2(result2);
        }).catch((result2) => {
          reject2(result2);
        });
      }
    });
  }
  /**
   * 执行下载操作
   * @param clientConfig
   * @param downloadOptions
   * @param host
   */
  doDownload(clientConfig, downloadOptions, host2 = "") {
    let URL = filters.parseURL(downloadOptions.url);
    let downloadHost = URL.host;
    let siteConfig = this.getSiteFromHost(downloadHost);
    console.log("doDownload", clientConfig, downloadOptions, host2, siteConfig);
    return new Promise((resolve2, reject2) => {
      clientConfig.client.call(EAction.addTorrentFromURL, {
        url: downloadOptions.url,
        savePath: downloadOptions.savePath !== void 0 && downloadOptions.savePath.includes(",") ? downloadOptions.savePath.split(",")[0] : downloadOptions.savePath,
        autoStart: downloadOptions.autoStart === void 0 ? false : downloadOptions.autoStart,
        category: downloadOptions.savePath !== void 0 && downloadOptions.savePath.includes(",") ? downloadOptions.savePath.split(",")[1] : null,
        imdbId: downloadOptions.tagIMDb ? downloadOptions.imdbId : null,
        upLoadLimit: siteConfig !== void 0 ? siteConfig.upLoadLimit : null,
        clientOptions: clientConfig.options,
        siteConfig
      }).then((result2) => {
        this.service.logger.add({
          module: EModule.background,
          event: "service.controller.doDownload.finished",
          msg: this.service.i18n.t("service.controller.downloadFinished", {
            name: clientConfig.options.name,
            action: EAction.addTorrentFromURL
          }),
          // `下载服务器${clientConfig.options.name}处理[${ EAction.addTorrentFromURL}]命令完成`,
          data: result2
        });
        if (!downloadOptions.title && this.torrentInfosCache[downloadOptions.url]) {
          downloadOptions.title = this.torrentInfosCache[downloadOptions.url];
        }
        if (result2 && (result2.code === 0 || result2.success === false)) {
          if (this.downloadFailedRetry(
            clientConfig,
            downloadOptions,
            host2,
            result2,
            resolve2,
            reject2
          )) {
            return;
          }
          switch (result2.msg) {
            case "timeout":
              reject2({
                success: false,
                msg: this.service.i18n.t(
                  "service.controller.downloadTimeout"
                ),
                //"连接下载服务器超时，请检查网络设置或调整服务器超时时间！",
                status: "error"
              });
              break;
            default:
              reject2({
                success: false,
                msg: result2.msg,
                status: "error"
              });
              break;
          }
          this.saveDownloadHistory(
            downloadOptions,
            host2,
            clientConfig.options.id,
            false
          );
          return;
        }
        this.saveDownloadHistory(
          downloadOptions,
          host2,
          clientConfig.options.id,
          true
        );
        this.formatSendResult(result2, clientConfig.options, downloadOptions).then((result22) => {
          resolve2(result22);
        }).catch((result22) => {
          reject2(result22);
        });
        if (this.downloadFailedRetriesCache[downloadOptions.url]) {
          delete this.downloadFailedRetriesCache[downloadOptions.url];
        }
      }).catch((result2) => {
        if (this.downloadFailedRetry(
          clientConfig,
          downloadOptions,
          host2,
          result2,
          resolve2,
          reject2
        )) {
          return;
        }
        this.service.logger.add({
          module: EModule.background,
          event: "service.controller.doDownload.error",
          msg: this.service.i18n.t("service.controller.downloadError", {
            name: clientConfig.options.name,
            action: EAction.addTorrentFromURL
          }),
          // `下载服务器${clientConfig.options.name}处理[${EAction.addTorrentFromURL}]命令失败`,
          data: result2
        });
        this.saveDownloadHistory(
          downloadOptions,
          host2,
          clientConfig.options.id,
          false
        );
        reject2(result2);
      });
    });
  }
  /**
   * 下载失败重试
   * @param clientConfig
   * @param downloadOptions
   * @param host
   * @param failedMsg
   * @param resolve
   * @param reject
   */
  downloadFailedRetry(clientConfig, downloadOptions, host2 = "", failedMsg, resolve2, reject2) {
    if (this.options.downloadFailedRetry) {
      let maxRetries = this.options.downloadFailedFailedRetryCount;
      if (maxRetries === void 0) {
        maxRetries = 0;
      }
      let retries = this.downloadFailedRetriesCache[downloadOptions.url];
      if (retries === void 0) {
        retries = 0;
      }
      if (retries < maxRetries) {
        retries++;
        this.service.logger.add({
          module: EModule.background,
          event: "service.controller.downloadFailedRetries",
          msg: this.service.i18n.t("service.controller.downloadError", {
            name: clientConfig.options.name,
            action: EAction.addTorrentFromURL
          }) + " (" + retries + ")",
          // `下载服务器${clientConfig.options.name}处理[${EAction.addTorrentFromURL}]命令失败`,
          data: failedMsg
        });
        this.downloadFailedRetriesCache[downloadOptions.url] = retries;
        if (this.options.downloadFailedFailedRetryInterval && this.options.downloadFailedFailedRetryInterval > 0) {
          setTimeout(() => {
            this.doDownload(clientConfig, downloadOptions, host2).then((result2) => {
              resolve2(result2);
            }).catch((result2) => {
              reject2(result2);
            });
          }, this.options.downloadFailedFailedRetryInterval * 1e3);
        } else {
          this.doDownload(clientConfig, downloadOptions, host2).then((result2) => {
            resolve2(result2);
          }).catch((result2) => {
            reject2(result2);
          });
        }
        return true;
      }
      delete this.downloadFailedRetriesCache[downloadOptions.url];
    }
    return false;
  }
  /**
   * 根据指定的域名获取站点配置信息
   * @param host 域名
   */
  getSiteFromHost(host2) {
    return this.options.sites.find((item) => {
      let cdn = [item.url].concat(item.cdn, item.apiCdn);
      return item.host == host2 || cdn.join("").indexOf(host2) > -1;
    });
  }
  /**
   * 获取当前站点的默认下载目录
   * @param string clientId 指定客户端ID，不指定表示使用默认下载客户端
   * @return string 目录信息，如果没有定义，则返回空字符串
   */
  getSiteDefaultPath(site2, clientId = "") {
    if (!clientId) {
      clientId = site2.defaultClientId || this.options.defaultClientId;
    }
    let client2 = this.options.clients.find((item) => {
      return item.id === clientId;
    });
    let path2 = "";
    if (client2 && client2.paths) {
      for (const host2 in client2.paths) {
        if (site2.host === host2) {
          path2 = client2.paths[host2][0];
          break;
        }
      }
    }
    return path2;
  }
  /**
   * 格式化发送结果
   * @param data
   * @param clientOptions
   * @param downloadOptions
   */
  formatSendResult(data2, clientOptions2, downloadOptions) {
    return new Promise((resolve2, reject2) => {
      let result2 = {
        type: EDataResultType.success,
        msg: this.service.i18n.t("service.controller.torrentAdded", {
          title: downloadOptions.title
        }) + (downloadOptions.savePath ? this.service.i18n.t("service.controller.torrentSavePath", {
          path: downloadOptions.savePath,
          interpolation: { escapeValue: false }
        }) : ""),
        //`${downloadOptions.title || ""} 种子已添加完成。` +
        // (downloadOptions.savePath
        //   ? `<br/>保存至 ${downloadOptions.savePath}`
        //   : ""),
        success: true,
        data: data2
      };
      switch (clientOptions2.type) {
        case EDownloadClientType.transmission:
          if (data2.id != void 0) {
            result2.msg = this.service.i18n.t(
              "service.controller.transmissionSuccess",
              {
                data: data2
              }
            );
            if (downloadOptions.savePath) {
              result2.msg += this.service.i18n.t(
                "service.controller.torrentSavePath",
                {
                  path: downloadOptions.savePath,
                  interpolation: { escapeValue: false }
                }
              );
            }
          } else if (data2.status) {
            switch (data2.status) {
              case "duplicate":
                result2.type = EDataResultType.error;
                result2.success = false;
                result2.msg = this.service.i18n.t(
                  "service.controller.transmissionDuplicate",
                  {
                    name: data2.torrent.name,
                    id: data2.torrent.id
                  }
                );
                break;
              case "error":
                result2.type = EDataResultType.error;
                result2.success = false;
                result2.msg = this.service.i18n.t(
                  "service.controller.transmissionError"
                );
                break;
              default:
                result2.msg = data2.msg;
                break;
            }
          } else {
            result2.msg = data2;
          }
          break;
        default:
          break;
      }
      resolve2(result2);
    });
  }
  /**
   * 根据指定客户端配置初始化客户端
   * @param clientOptions 客户端配置
   */
  getClient(clientOptions2) {
    return this.clientController.getClient(clientOptions2);
  }
  /**
   * 初始化默认客户端
   */
  initDefaultClient() {
    if (!this.options.clients) {
      return;
    }
    let clientOptions2 = this.options.clients.find((item) => {
      return item.id === this.options.defaultClientId;
    });
    if (clientOptions2) {
      this.getClient(clientOptions2).then((result2) => {
        this.defaultClient = result2.client;
        this.defaultClientOptions = result2.options;
      });
    }
  }
  /**
   * 初始化指定站点默认客户端
   * @param hostname 站点host名称
   */
  initSiteDefaultClient(hostname) {
    let site2 = this.options.sites.find((item) => {
      return item.host == hostname;
    });
    let clientOptions2 = this.options.clients.find((item) => {
      return item.id === site2.defaultClientId;
    });
    if (clientOptions2) {
      return this.getClient(clientOptions2);
    }
    return new Promise((resolve2, reject2) => {
      resolve2({
        client: this.defaultClient,
        options: this.defaultClientOptions
      });
    });
  }
  /**
   * 复制指定的内容到剪切板
   * @param text
   */
  copyTextToClipboard(text = "") {
    if (!text) {
      return false;
    }
    var copyFrom = $("<textarea/>");
    copyFrom.text(text);
    $("body").append(copyFrom);
    copyFrom.select();
    document.execCommand("copy");
    copyFrom.remove();
    return true;
  }
  /**
   * 获取指定客户端的可用空间
   * @param data
   */
  getFreeSpace(data2) {
    if (!data2.clientId) {
      return this.getDefaultClientFreeSpace(data2);
    }
    return new Promise((resolve2, reject2) => {
      let clientOptions2 = this.options.clients.find((item) => {
        return item.id === data2.clientId;
      });
      if (clientOptions2) {
        this.getClient(clientOptions2).then((result2) => {
          result2.client.call(EAction.getFreeSpace, data2).then((result22) => {
            resolve2(result22);
          });
        });
      }
    });
  }
  /**
   * 获取默认客户端的可用空间
   * @param data
   */
  getDefaultClientFreeSpace(data2) {
    return new Promise((resolve2, reject2) => {
      this.defaultClient.call(EAction.getFreeSpace, data2).then((result2) => {
        resolve2(result2);
      });
    });
  }
  updateOptionsTabId(id) {
    this.optionsTabId = id;
  }
  /**
   * 打开搜索种子页面
   * @param key 关键字
   * @param host 指定站点，默认搜索所有站
   */
  searchTorrent(key2 = "", host2 = "") {
    let url2 = "";
    if (key2) {
      url2 = `search-torrent/${key2}`;
    }
    if (host2) {
      url2 += `/${host2}`;
    }
    this.openOptions(url2);
  }
  /**
   * 打开配置页
   * @param path 要跳转的路径
   */
  openOptions(path2 = "") {
    let url2 = "/";
    if (path2) {
      url2 += path2;
    }
    if (this.optionsTabId == 0) {
      this.openURL(url2);
    } else {
      chrome.tabs.get(this.optionsTabId, (tab) => {
        if (!chrome.runtime.lastError && tab) {
          chrome.tabs.update(tab.id, {
            active: true,
            url: "index.html#" + url2
          });
        } else {
          this.openURL(url2);
        }
      });
    }
  }
  /**
   * 创建配置页面选项卡
   * @param url
   */
  openURL(url2 = "") {
    if (!url2) {
      return;
    }
    if (url2.substr(0, 1) === "/") {
      url2 = "index.html#" + url2;
    }
    chrome.tabs.create(
      {
        url: url2
      },
      (tab) => {
        this.optionsTabId = tab.id;
      }
    );
  }
  /**
   * 根据指定的站点获取站点的架构信息
   * @param site 站点信息
   */
  getSiteSchema(site2) {
    let schema2 = {};
    if (typeof site2.schema === "string") {
      schema2 = this.options.system && this.options.system.schemas && this.options.system.schemas.find((item) => {
        return item.name == site2.schema;
      });
    } else {
      let site22 = this.options.system && this.options.system.sites && this.options.system.sites.find((item) => {
        return item.host == site22.host;
      });
      if (site22 && site22.schema) {
        schema2 = site22.schema;
        schema2.siteOnly = true;
      }
    }
    return schema2;
  }
  replaceKeys(source2, keys) {
    let result2 = source2;
    for (const key2 in keys) {
      if (keys.hasOwnProperty(key2)) {
        const value = keys[key2];
        result2 = result2.replace("$" + key2 + "$", value);
      }
    }
    return result2;
  }
  /**
   * 接收由前台发回的指令并执行
   * @param action 指令
   * @param callback 回调函数
   */
  call(request, sender) {
    return new Promise((resolve2, reject2) => {
      let service = this;
      console.log("contorller.call", request.action);
      service[request.action](request.data, sender).then((result2) => {
        resolve2(result2);
      }).catch((result2) => {
        reject2(result2);
      });
    });
  }
  addContentPage(data2, sender) {
    return new Promise((resolve2, reject2) => {
      try {
        if (sender.tab) {
          this.contentPages.push(sender.tab.id);
        }
        resolve2();
      } catch (error2) {
        reject2(error2);
      }
    });
  }
  /**
   * 备份系统参数至Google
   */
  backupToGoogle() {
    return this.service.config.backupToGoogle();
  }
  /**
   * 从Google恢复系统参数
   */
  restoreFromGoogle() {
    return this.service.config.restoreFromGoogle();
  }
  /**
   * 从Google中清除已备份的参数
   */
  clearFromGoogle() {
    return this.service.config.syncStorage.clear();
  }
  /**
   * 重新从网络中加载配置文件
   */
  reloadConfig() {
    return new Promise((resolve2, reject2) => {
      this.service.config.reload();
      resolve2();
    });
  }
  /**
   * 从指定的链接获取种子文件内容
   * @param options
   */
  getTorrentDataFromURL(options2) {
    console.log("getTorrentDataFromURL", options2);
    return new Promise((resolve2, reject2) => {
      let url2 = "";
      if (typeof options2 === "string") {
        url2 = options2;
        options2 = {
          url: url2,
          parseTorrent: false
        };
      } else {
        url2 = options2.url;
      }
      let site2 = this.getSiteOptionsFromURL(url2);
      let requestMethod = ERequestMethod.GET;
      if (site2) {
        requestMethod = site2.downloadMethod || ERequestMethod.GET;
        switch (site2.name) {
          case "M-Team":
            let id = PPF.getIdFromMTURL(url2);
            console.log(`getTorrentDataFromURL.M-Team ${url2} -> ${id}`, options2);
            if (id) {
              if (parseInt(id)) {
                let torrentURL = PPF.resolveMTDownloadURL(id, site2);
                console.log(`getTorrentDataFromURL.M-Team1 ${url2} -> ${torrentURL}`, options2);
                url2 = torrentURL;
              } else {
                console.log(`getTorrentDataFromURL.M-Team2 ${url2}, id 链接可能已是直链, 不进行转换...`, options2);
              }
            } else {
              reject2(APP.createErrorMessage(
                this.service.i18n.t("service.controller.invalidTorrent", {
                  link: EWikiLink.faq
                })
              ));
            }
            break;
          default:
            break;
        }
      }
      let file = new FileDownloader({
        url: url2,
        getDataOnly: true,
        timeout: this.service.options.connectClientTimeout
      });
      file.requestMethod = requestMethod;
      file.onCompleted = () => {
        console.log("getTorrentDataFromURL.completed", url2);
        if (file.content && /octet-stream|x-bittorrent/gi.test(file.content.type)) {
          parseTorrentRemote(file.content, (err, torrent) => {
            if (err) {
              console.log("parse.error", err);
              if (options2.parseTorrent) {
                reject2(err);
              } else {
                resolve2(file.content);
              }
            } else {
              if (torrent) {
                this.torrentInfosCache[url2] = torrent.name;
              }
              if (options2.parseTorrent) {
                resolve2({
                  url: url2,
                  torrent,
                  content: file.content
                });
              } else {
                resolve2(file.content);
              }
            }
          });
        } else {
          reject2(
            APP.createErrorMessage(
              this.service.i18n.t("service.controller.invalidTorrent", {
                link: EWikiLink.faq
              })
            )
          );
        }
      };
      file.onError = (e2) => {
        reject2(APP.createErrorMessage(e2));
      };
      file.start();
    });
  }
  /**
   * 根据指定URL获取站点配置信息
   * @param url
   */
  getSiteOptionsFromURL(url2) {
    let host2 = new URLParse(url2).host;
    let site2 = this.getSiteFromHost(host2);
    return site2;
  }
  getUserInfoForAllSite() {
    return new Promise((resolve2, reject2) => {
      let count = 0;
      let completed = 0;
      let results2 = [];
      this.options.sites.forEach((site2) => {
        if (site2.allowGetUserInfo) {
          count++;
          this.getUserInfo(site2).then((result2) => {
            if (result2) {
              results2.push({
                site: site2,
                user: result2
              });
            }
            completed++;
            if (completed >= count) {
              resolve2(results2);
            }
          }).catch(() => {
            completed++;
            if (completed >= count) {
              resolve2(results2);
            }
          });
        }
      });
      if (completed == count && completed == 0) {
        reject2(
          this.service.i18n.t("service.controller.getUserInfoSiteIsEmpty")
        );
      }
    });
  }
  /**
   * 获取指定站点的用户信息
   * @param site
   * @param callback
   */
  getUserInfo(site2) {
    return this.userService.getUserInfo(site2);
  }
  abortGetUserInfo(site2) {
    return this.userService.abortGetUserInfo(site2);
  }
  /**
   * 根据指定的图片地址获取Base64信息
   * @param url 图片地址
   */
  getBase64FromImageUrl(url2) {
    return new Promise((resolve2, reject2) => {
      let data2 = this.imageBase64Cache[url2];
      if (data2) {
        resolve2(data2);
        return;
      }
      let file = new FileDownloader({
        url: url2,
        getDataOnly: true,
        timeout: this.service.options.connectClientTimeout
      });
      file.onCompleted = () => {
        console.log("getBase64FromImageUrl.completed", url2);
        if (file.content && /image/gi.test(file.content.type)) {
          var reader = new FileReader();
          reader.onloadend = () => {
            this.imageBase64Cache[url2] = reader.result;
            resolve2(reader.result);
          };
          reader.readAsDataURL(file.content);
        } else {
          reject2(
            APP.createErrorMessage(
              this.service.i18n.t("service.controller.invalidImage")
            )
          );
        }
      };
      file.onError = (e2) => {
        reject2(APP.createErrorMessage(e2));
      };
      file.start();
    });
  }
  getUserHistoryData(host2) {
    return new Promise((resolve2, reject2) => {
      let data2 = this.service.userData.get(host2, EUserDataRange.all);
      resolve2(data2);
    });
  }
  resetUserDatas(datas) {
    return new Promise((resolve2, reject2) => {
      this.service.userData.reset(datas);
      setTimeout(() => {
        this.service.userData.upgrade().then((r2) => {
          console.log("升级站点数据完成");
        }).catch((e2) => {
          console.error("升级站点数据失败", e2);
        });
      }, 1e3);
      resolve2();
    });
  }
  /**
   * 根据指定的关键字获取电影信息
   * @param key
   */
  getMovieInfos(key2) {
    return this.movieInfoService.getInfos(key2);
  }
  /**
   * 根据指定的 IMDbId 获取评分信息
   * @param IMDbId
   */
  getMovieRatings(IMDbId) {
    return this.movieInfoService.getRatings(IMDbId);
  }
  /**
  * 根据指定的 TMDB ID 获取 IMDbId
  * @param doubanId
  */
  getIMDbIdFromTMDB(source2) {
    return this.movieInfoService.getIMDbIdFromTMDB(source2);
  }
  /**
   * 根据指定的 doubanId 获取 IMDbId
   * @param doubanId
   */
  getIMDbIdFromDouban(doubanId) {
    return this.movieInfoService.getIMDbIdFromDouban(doubanId);
  }
  /**
   * 从豆瓣查询影片信息
   * @param key 需要查询的关键字
   * @param count 要显示的条目数量
   */
  queryMovieInfoFromDouban(options2) {
    return this.movieInfoService.queryMovieInfoFromDouban(
      options2.key,
      options2.count
    );
  }
  /**
   * 添加浏览器原生下载请求
   * @param options
   */
  addBrowserDownloads(options2) {
    return new Promise((resolve2, reject2) => {
      this.service.checkPermissions(["downloads"]).then(() => {
        let items = [];
        if (Array.isArray(options2)) {
          items = options2;
        } else {
          items.push(options2);
        }
        items.forEach((item) => {
          chrome.downloads.download(item, function(downloadId) {
            console.log(downloadId);
          });
        });
        resolve2(items.length);
      }).catch(() => {
        reject2({
          success: false,
          msg: this.service.i18n.t("service.controller.noPermission")
          //"无权限，请前往用户授权"
        });
      });
    });
  }
  /**
   * 获取当前语言资源
   * @param parentKey 指定这个key下的内容
   */
  getCurrentLanguageResource(parentKey) {
    return new Promise((resolve2, reject2) => {
      let locale = this.service.options.locale || "en";
      let resource = this.service.i18n.i18next.getResourceBundle(
        locale,
        "translation"
      );
      if (resource) {
        if (parentKey && resource[parentKey]) {
          resolve2(resource[parentKey]);
        } else {
          resolve2(resource);
        }
      } else {
        reject2();
      }
    });
  }
  addLanguage(resource) {
    return this.service.i18n.add(resource);
  }
  replaceLanguage(resource) {
    return this.service.i18n.replace(resource);
  }
  backupToServer(server) {
    return this.service.config.backupToServer(server);
  }
  getBackupListFromServer(options2 = {}) {
    const server = options2.server;
    delete options2.server;
    return this.service.config.getBackupListFromServer(server, options2);
  }
  restoreFromServer(options2 = {}) {
    return this.service.config.restoreFromServer(options2.server, options2.path);
  }
  deleteFileFromBackupServer(options2 = {}) {
    return this.service.config.deleteFileFromBackupServer(
      options2.server,
      options2.path
    );
  }
  sendTorrentsInBackground(items = []) {
    return new Promise((resolve2, reject2) => {
      this.service.downloadQuene.add(items).run();
      resolve2(
        this.service.i18n.t("service.controller.downloadTaskIsCreated", {
          count: items.length
        })
      );
    });
  }
  createBackupFile(fileName) {
    return this.service.config.createBackupFile(fileName);
  }
  addTorrentToCollection(data2) {
    if (this.options.defaultCollectionGroupId) {
      data2.groups = [this.options.defaultCollectionGroupId];
    }
    return this.service.collection.add(data2);
  }
  getTorrentCollections(groupId) {
    return this.service.collection.load(groupId);
  }
  deleteTorrentFromCollention(data2) {
    if (Array.isArray(data2)) {
      return this.service.collection.remove(data2);
    }
    return this.service.collection.delete(data2);
  }
  clearTorrentCollention() {
    return this.service.collection.clear();
  }
  getTorrentCollention(link) {
    return this.service.collection.get(link);
  }
  getSiteSelectorConfig(options2) {
    return new Promise((resolve2, reject2) => {
      const result2 = this.service.getSiteSelector(options2.host, options2.name);
      if (result2) {
        resolve2(result2);
      } else {
        reject2(false);
      }
    });
  }
  resetTorrentCollections(items) {
    return this.service.collection.reset(items);
  }
  getTorrentCollectionGroups() {
    return this.service.collection.getGroups();
  }
  addTorrentCollectionGroup(data2) {
    return this.service.collection.addGroup(data2);
  }
  addTorrentCollectionToGroup(options2) {
    return this.service.collection.addToGroup(options2.item, options2.groupId);
  }
  updateTorrentCollectionGroup(data2) {
    return this.service.collection.updateGroup(data2);
  }
  removeTorrentCollectionFromGroup(options2) {
    return this.service.collection.removeFromGroup(
      options2.item,
      options2.groupId
    );
  }
  removeTorrentCollectionGroup(data2) {
    return this.service.collection.removeGroup(data2);
  }
  updateTorrentCollention(data2) {
    return this.service.collection.update(data2);
  }
  getAllTorrentCollectionLinks() {
    return new Promise((resolve2, reject2) => {
      const result2 = this.service.collection.getAllLinks();
      if (result2) {
        resolve2(result2);
      } else {
        reject2(false);
      }
    });
  }
  restoreCookies(data2) {
    return this.service.config.restoreCookies(data2);
  }
  resetFavicons() {
    this.service.config.favicon.clear();
    return this.service.config.getFavicons();
  }
  resetFavicon(url2) {
    return this.service.config.getFavicon(url2, true);
  }
  getBackupRawData() {
    return this.service.config.getBackupRawData();
  }
  testBackupServerConnectivity(options2) {
    return this.service.config.testBackupServerConnectivity(options2);
  }
  testMediaServerConnectivity(options2) {
    return this.mediaServerManager.ping(options2);
  }
  getMediaFromMediaServer(options2) {
    return this.mediaServerManager.getMediaFromMediaServer(options2.server, options2.imdbId);
  }
  createSearchResultSnapshot(options2) {
    return this.service.searchResultSnapshot.add(options2);
  }
  getSearchResultSnapshot(id) {
    return this.service.searchResultSnapshot.get(id);
  }
  loadSearchResultSnapshot() {
    return this.service.searchResultSnapshot.load();
  }
  removeSearchResultSnapshot(options2) {
    return this.service.searchResultSnapshot.remove(options2);
  }
  clearSearchResultSnapshot() {
    return this.service.searchResultSnapshot.clear();
  }
  resetSearchResultSnapshot(datas) {
    return this.service.searchResultSnapshot.reset(datas);
  }
  createKeepUploadTask(options2) {
    return this.service.keepUploadTask.add(options2);
  }
  getKeepUploadTask(id) {
    return this.service.keepUploadTask.get(id);
  }
  loadKeepUploadTask() {
    return this.service.keepUploadTask.load();
  }
  removeKeepUploadTask(options2) {
    return this.service.keepUploadTask.remove(options2);
  }
  clearKeepUploadTask() {
    return this.service.keepUploadTask.clear();
  }
  resetKeepUploadTask(datas) {
    return this.service.keepUploadTask.reset(datas);
  }
  updateKeepUploadTask(options2) {
    return this.service.keepUploadTask.update(options2);
  }
  updateDebuggerTabId(id) {
    return new Promise((resolve2, reject2) => {
      this.debuggerTabId = id;
      this.debuggerPort = chrome.tabs.connect(id, {
        name: EModule.debugger
      });
      resolve2();
    });
  }
  pushDebugMsg(msg) {
    return new Promise((resolve2, reject2) => {
      console.log(msg);
      if (this.debuggerTabId) {
        chrome.tabs.get(this.debuggerTabId, (tab) => {
          if (tab && this.debuggerPort) {
            this.debuggerPort.postMessage({
              action: EAction.pushDebugMsg,
              data: msg
            });
          }
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
            this.debuggerTabId = 0;
            this.debuggerPort = void 0;
          }
        });
      }
      resolve2();
    });
  }
  getTopSearches(count = 9) {
    return this.movieInfoService.getTopSearches(count);
  }
}
let Logger$1 = class Logger2 {
  constructor() {
    this.maxLength = 1e3;
    this.items = [];
    this.storage = new localStorage();
    this.configKey = EConfigKey.systemLogs;
    this.load();
  }
  /**
   * 获取记录
   */
  load() {
    return new Promise((resolve2, reject2) => {
      this.storage.get(this.configKey, (result2) => {
        this.items = result2 || [];
        resolve2(this.items);
      });
    });
  }
  /**
   * 添加日志
   * @param data 日志信息
   */
  add(data2) {
    let time = (/* @__PURE__ */ new Date()).getTime();
    let saveData = Object.assign(
      {
        module: "",
        time,
        id: PPF.getNewId()
      },
      data2
    );
    if (!this.items) {
      this.load().then(() => {
        this.items.push(saveData);
        this.storage.set(this.configKey, this.items);
      });
    } else {
      if (this.items.length >= this.maxLength) {
        this.items.splice(0, 1);
      }
      this.items.push(saveData);
      this.storage.set(this.configKey, this.items);
    }
    return saveData.id;
  }
  /**
   * 删除历史记录
   * @param items 需要删除的列表
   */
  remove(items) {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        for (let index2 = this.items.length - 1; index2 >= 0; index2--) {
          let item = this.items[index2];
          let findIndex = items.findIndex((data2) => {
            return data2.id === item.id;
          });
          if (findIndex >= 0) {
            this.items.splice(index2, 1);
          }
        }
        this.storage.set(this.configKey, this.items);
        resolve2(this.items);
      });
    });
  }
  /**
   * 清除记录
   */
  clear() {
    return new Promise((resolve2, reject2) => {
      this.items = [];
      this.storage.set(this.configKey, this.items);
      resolve2(this.items);
    });
  }
};
class ContextMenus {
  constructor(service) {
    this.service = service;
    this.options = {
      sites: [],
      clients: []
    };
    this.rootId = "PT-Plugin-Plugin-Content-Menu";
    this.currentTabId = 0;
    this.siteMenus = [];
    this.pathHandler = new PathHandler();
    chrome && chrome.tabs && this.initBrowserEvent();
  }
  /**
   * 初始化浏览器事件
   */
  initBrowserEvent() {
    chrome.tabs.onActivated.addListener(
      (actionInfo) => {
        chrome.tabs.get(actionInfo.tabId, (tab) => {
          this.clearSiteMenus();
          if (tab.url) {
            let host2 = new URLParse(tab.url).host;
            this.createSiteMenus(host2);
          }
        });
      }
    );
    chrome.tabs.onUpdated.addListener(
      (tabId, changeInfo, tab) => {
        this.clearSiteMenus();
        if (tab.url) {
          let host2 = new URLParse(tab.url).host;
          this.createSiteMenus(host2);
        }
      }
    );
    chrome.browserAction.onClicked.addListener(() => {
      this.service.controller.openOptions();
    });
  }
  /**
   * 初始化上下文菜单
   * @param options Options 参数
   * @param service 后台服务
   */
  init(options2) {
    this.options = options2;
    this.clear();
    this.createSearchMenus();
    this.createClientMenus();
    this.createPluginIconPopupMenus();
  }
  /**
   * 创建插件图标右键菜单
   */
  createPluginIconPopupMenus() {
    this.add({
      title: this.service.i18n.t("service.contextMenus.history"),
      contexts: ["browser_action"],
      onclick: () => {
        chrome.tabs.create({
          url: "index.html#/history"
        });
      }
    });
    this.add({
      title: this.service.i18n.t("service.contextMenus.systemLog"),
      contexts: ["browser_action"],
      onclick: () => {
        chrome.tabs.create({
          url: "index.html#/system-logs"
        });
      }
    });
    this.add({
      type: "separator",
      contexts: ["browser_action"]
    });
    this.add({
      title: this.service.i18n.t("service.contextMenus.issues"),
      contexts: ["browser_action"],
      onclick: () => {
        chrome.tabs.create({
          url: "https://github.com/pt-plugins/PT-Plugin-Plus/issues/new"
        });
      }
    });
  }
  /**
   * 清除菜单
   */
  clear() {
    chrome && chrome.contextMenus && chrome.contextMenus.removeAll();
  }
  /**
   * 清除站点的上下文菜单
   */
  clearSiteMenus() {
    this.siteMenus.forEach((item) => {
      this.remove(item);
    });
    this.siteMenus = [];
  }
  /**
   * 获取指定站点的URL匹配规则
   * @param site
   */
  getSiteDocumentUrlPatterns(site2) {
    let url2 = site2.url + "";
    if (url2.substr(-1) != "/") {
      url2 += "/";
    }
    let documentUrlPatterns = [`*://${site2.host}/*`, `${url2}`];
    if (site2.cdn && site2.cdn.length > 0) {
      for (let i2 = 0; i2 < site2.cdn.length; i2++) {
        const url3 = site2.cdn[i2];
        documentUrlPatterns.push(`${url3}${url3.substr(-1) != "/" ? "/*" : "*"}`, url3);
      }
    }
    return documentUrlPatterns;
  }
  /**
   * 根据指定的目录信息创建菜单
   * @param paths
   * @param site
   * @param client
   * @param parentId
   */
  createPathMenus(paths, site2, client2, parentId) {
    paths.forEach((path2, index2) => {
      let id = `${client2.id}**${site2.host}**${path2}**${index2}`;
      this.add({
        id,
        title: this.pathHandler.replacePathKey(path2, site2),
        parentId,
        contexts: ["link"],
        documentUrlPatterns: this.getSiteDocumentUrlPatterns(site2),
        targetUrlPatterns: this.getSiteUrlPatterns(site2),
        onclick: (info, tab) => {
          let data2 = info.menuItemId.split("**");
          let options2 = {
            clientId: data2[0],
            url: info.linkUrl,
            savePath: data2[2]
          };
          this.sendTorrentToClient(tab.id, options2);
        }
      });
    });
  }
  /**
   * 创建站点上下文菜单
   */
  createSiteMenus(host2) {
    let site2 = this.options.sites.find((item) => {
      let cdn = [item.url].concat(item.cdn);
      return item.host === host2 || cdn.join("|").indexOf(host2) > -1;
    });
    if (!site2) {
      return;
    }
    if (this.options.allowSelectionTextSearch) {
      let menuId = site2.host;
      this.siteMenus.push(menuId);
      this.add({
        id: menuId,
        title: this.service.i18n.t(
          "service.contextMenus.searchSelectionTextOnThisSite"
        ),
        contexts: ["selection"],
        documentUrlPatterns: this.getSiteDocumentUrlPatterns(site2),
        onclick: (info, tab) => {
          this.service.controller.searchTorrent(info.selectionText, host2);
        }
      });
    }
    this.options.clients.forEach((client2) => {
      if (client2.paths) {
        let parentId = `${client2.id}-path`;
        let count = 0;
        this.add({
          id: parentId,
          title: this.service.i18n.t(
            "service.contextMenus.downloadClientPath",
            {
              clientName: client2.name
            }
          ),
          contexts: ["link"],
          documentUrlPatterns: this.getSiteDocumentUrlPatterns(site2),
          targetUrlPatterns: this.getSiteUrlPatterns(site2)
        });
        for (const host22 in client2.paths) {
          let paths = client2.paths[host22];
          if (host22 !== site2.host) {
            continue;
          }
          count++;
          this.createPathMenus(paths, site2, client2, parentId);
        }
        let publicPaths = client2.paths[ECommonKey.allSite];
        if (publicPaths) {
          count++;
          this.createPathMenus(publicPaths, site2, client2, parentId);
        }
        if (count > 0) {
          this.siteMenus.push(parentId);
        } else {
          this.remove(parentId);
        }
      }
    });
  }
  /**
   * 获取指定站点的配置种子链接规则
   * @param site
   */
  getSiteUrlPatterns(site2) {
    let result2 = [];
    if (site2.patterns && site2.patterns["torrentLinks"]) {
      result2 = site2.patterns["torrentLinks"];
    } else {
      let schema2 = this.getSiteSchema(site2);
      if (schema2 && schema2.patterns && schema2.patterns["torrentLinks"]) {
        result2 = schema2.patterns["torrentLinks"];
      } else {
        result2.push("*://*/*");
      }
    }
    return result2;
  }
  /**
   * 根据指定的站点获取站点的架构信息
   * @param site 站点信息
   */
  getSiteSchema(site2) {
    let schema2 = {};
    if (typeof site2.schema === "string") {
      schema2 = this.options.system && this.options.system.schemas && this.options.system.schemas.find((item) => {
        return item.name == site2.schema;
      });
    }
    return schema2;
  }
  /**
   * 发送种子到指定的服务器
   * @param tabid
   * @param options
   */
  sendTorrentToClient(tabid = 0, options2) {
    console.log("sendTorrentToClient", options2);
    let site2 = this.getSiteFromURL(options2.url);
    if (site2 && options2.savePath) {
      let savePath = this.pathHandler.getSavePath(options2.savePath, site2);
      if (savePath === false) {
        APP.showNotifications({
          message: this.service.i18n.t("service.contextMenus.userCanceled")
        });
        return;
      }
      options2.savePath = savePath;
    }
    let notice;
    try {
      chrome.tabs.sendMessage(
        tabid,
        {
          action: EAction.showMessage,
          data: {
            type: EDataResultType.info,
            msg: this.service.i18n.t("service.contextMenus.sendingLink"),
            timeout: 2,
            indeterminate: true
          }
        },
        (result2) => {
          if (chrome.runtime.lastError) {
            let message = chrome.runtime.lastError.message || "";
            if (message.match(/Could not establish connection/)) {
              APP.showNotifications({
                message: this.service.i18n.t(
                  "service.contextMenus.pluginStatusIsUnknown"
                )
              });
            } else {
              APP.showNotifications({
                message: chrome.runtime.lastError.message
              });
            }
            return;
          }
          notice = result2;
        }
      );
    } catch (error2) {
      APP.showNotifications({
        message: error2
      });
      return;
    }
    this.service.logger.add({
      module: EModule.background,
      event: "contextMenus.sendTorrentToClient.begin",
      msg: this.service.i18n.t("service.contextMenus.sendingLink"),
      data: options2
    });
    let client2 = this.options.clients.find((item) => {
      return item.id === options2.clientId;
    });
    if (!client2) {
      chrome.tabs.sendMessage(tabid, {
        action: EAction.showMessage,
        data: {
          type: EDataResultType.error,
          msg: this.service.i18n.t(
            "service.contextMenus.downloadClientGetFailed"
          )
        }
      });
      this.service.logger.add({
        module: EModule.background,
        event: "contextMenus.sendTorrentToClient.getClientError",
        msg: this.service.i18n.t(
          "service.contextMenus.downloadClientGetFailed"
        ),
        data: options2
      });
      this.hideNotice(tabid, notice);
      return;
    }
    options2.autoStart = client2.autoStart;
    console.log(options2);
    let url2 = this.getParsedURL(options2.url);
    if (typeof url2 !== "string") {
      chrome.tabs.sendMessage(tabid, {
        action: EAction.showMessage,
        data: url2
      });
      this.hideNotice(tabid, notice);
      return;
    }
    options2.url = url2;
    this.service.controller.sendTorrentToClient(options2).then((result2) => {
      this.service.logger.add({
        module: EModule.background,
        event: "contextMenus.sendTorrentToClient.done",
        msg: this.service.i18n.t(
          "service.contextMenus.sendTorrentToClientDone"
        ),
        // "下载链接发送完成。",
        data: result2
      });
      chrome.tabs.sendMessage(tabid, {
        action: EAction.showMessage,
        data: result2
      });
    }).catch((result2) => {
      this.service.logger.add({
        module: EModule.background,
        event: "contextMenus.sendTorrentToClient.error",
        msg: this.service.i18n.t(
          "service.contextMenus.sendTorrentToClientError"
        ),
        // "下载链接发送失败！",
        data: result2
      });
      chrome.tabs.sendMessage(tabid, {
        action: EAction.showMessage,
        data: result2.status == "" ? this.service.i18n.t("service.contextMenus.sendTorrentToClientError") : result2
      });
    }).finally(() => {
      this.hideNotice(tabid, notice);
    });
  }
  /**
   * 隐藏指定的 notice
   * @param tabid
   * @param notice
   */
  hideNotice(tabid = 0, notice) {
    if (!notice)
      return;
    if (notice.id) {
      chrome.tabs.sendMessage(tabid, {
        action: EAction.hideMessage,
        data: notice.id
      });
    } else if (notice.hide) {
      notice.hide();
    }
  }
  /**
   * 创建关键字搜索菜单，所有页面可用
   */
  createSearchMenus() {
    if (this.options.allowSelectionTextSearch) {
      this.add({
        title: this.service.i18n.t("service.contextMenus.searchSelectionText"),
        // '搜索 "%s" 相关的种子',
        contexts: ["selection"],
        onclick: (info, tab) => {
          this.service.controller.searchTorrent(info.selectionText);
        }
      });
      this.pushMoreSearchMenus();
    }
    let imdbMenuId = "searchWithIMDb";
    this.add({
      id: imdbMenuId,
      title: this.service.i18n.t("service.contextMenus.searchByIMDb"),
      // "搜索当前IMDb相关种子",
      contexts: ["link"],
      targetUrlPatterns: ["*://www.imdb.com/title/tt*"]
    });
    this.add({
      parentId: imdbMenuId,
      title: this.service.i18n.t("service.contextMenus.searchByDefault"),
      // "搜索当前IMDb相关种子",
      contexts: ["link"],
      targetUrlPatterns: ["*://www.imdb.com/title/tt*"],
      onclick: (info, tab) => {
        if (info.linkUrl) {
          let link = info.linkUrl.match(/(tt\d+)/);
          if (link && link.length >= 2) {
            this.service.controller.searchTorrent(link[1]);
          }
        }
      }
    });
    this.pushMoreSearchMenus(
      imdbMenuId,
      ["link"],
      ["*://www.imdb.com/title/tt*"],
      /(tt\d+)/
    );
    let donbanMenuId = "searchWithDouban";
    this.add({
      id: donbanMenuId,
      title: this.service.i18n.t("service.contextMenus.searchByDouban"),
      contexts: ["link"],
      targetUrlPatterns: ["*://movie.douban.com/subject/*"]
    });
    this.add({
      parentId: donbanMenuId,
      title: this.service.i18n.t("service.contextMenus.searchByDefault"),
      contexts: ["link"],
      targetUrlPatterns: ["*://movie.douban.com/subject/*"],
      onclick: (info, tab) => {
        if (info.linkUrl) {
          let link = info.linkUrl.match(/subject\/(\d+)/);
          if (link && link.length >= 2) {
            this.service.controller.searchTorrent("douban" + link[1]);
          }
        }
      }
    });
    this.pushMoreSearchMenus(
      donbanMenuId,
      ["link"],
      ["*://movie.douban.com/subject/*"],
      /subject\/(\d+)/,
      "douban"
    );
  }
  /**
   * 添加更多搜索相关菜单
   * @param _parentId
   * @param contexts
   * @param targetUrlPatterns
   * @param match
   * @param keyPrefix
   */
  pushMoreSearchMenus(_parentId = void 0, contexts = ["selection"], targetUrlPatterns = void 0, match = /(tt\d+)/, keyPrefix = "") {
    const sites = this.options.sites;
    if (sites && sites.length > 0) {
      let parentId = `${_parentId}searchInSite`;
      this.add({
        id: parentId,
        title: this.service.i18n.t("service.contextMenus.searchInSite"),
        contexts,
        parentId: _parentId,
        targetUrlPatterns
      });
      sites.forEach((site2) => {
        let id = `${parentId}**${site2.host}`;
        this.add({
          id,
          title: `${site2.name} - ${site2.host}`,
          parentId,
          contexts,
          targetUrlPatterns,
          onclick: (info, tab) => {
            let data2 = info.menuItemId.split("**");
            this.service.debug(
              this.service.i18n.t("service.contextMenus.searchInSite"),
              info
            );
            if (contexts.includes("link") && info.linkUrl) {
              let link = info.linkUrl.match(match);
              if (link && link.length >= 2) {
                this.service.controller.searchTorrent(
                  keyPrefix + link[1],
                  data2[1]
                );
              }
            } else {
              this.service.controller.searchTorrent(
                info.selectionText,
                data2[1]
              );
            }
          }
        });
      });
    }
    const solutions = this.options.searchSolutions;
    if (solutions && solutions.length > 0) {
      let parentId = `${_parentId}searchInSolution`;
      this.add({
        id: parentId,
        title: this.service.i18n.t("service.contextMenus.searchInSolution"),
        contexts,
        parentId: _parentId,
        targetUrlPatterns
      });
      solutions.forEach((item) => {
        let id = `${parentId}**${item.id}`;
        this.add({
          id,
          title: `${item.name}`,
          parentId,
          contexts,
          targetUrlPatterns,
          onclick: (info, tab) => {
            this.service.debug(
              this.service.i18n.t("service.contextMenus.searchInSolution"),
              info
            );
            let data2 = info.menuItemId.split("**");
            if (contexts.includes("link") && info.linkUrl) {
              let link = info.linkUrl.match(match);
              if (link && link.length >= 2) {
                this.service.controller.searchTorrent(
                  keyPrefix + link[1],
                  data2[1]
                );
              }
            } else {
              this.service.controller.searchTorrent(
                info.selectionText,
                data2[1]
              );
            }
          }
        });
      });
    }
    this.add({
      title: this.service.i18n.t("service.contextMenus.searchInAllSite"),
      parentId: _parentId,
      contexts,
      targetUrlPatterns,
      onclick: (info, tab) => {
        if (info.linkUrl) {
          let link = info.linkUrl.match(match);
          if (contexts.includes("link") && link && link.length >= 2) {
            this.service.controller.searchTorrent(keyPrefix + link[1], "all");
          }
        } else {
          this.service.controller.searchTorrent(info.selectionText, "all");
        }
      }
    });
  }
  /**
   * 创建下载客户端上下文菜单，所有页面可用
   */
  createClientMenus() {
    let clients = this.options.clients.filter((c2) => c2.enabled !== false);
    console.log("createClientMenus", this.options.clients);
    console.log("createClientMenus", clients);
    if (this.options.defaultClientId) {
      let client2 = this.options.clients.find((item) => {
        return item.id === this.options.defaultClientId;
      });
      if (client2) {
        this.add({
          id: client2.id,
          title: this.service.i18n.t(
            "service.contextMenus.sendTorrentToDefaultClient",
            {
              client: client2
            }
          ),
          // `发送到默认服务器 ${client.name} -> ${client.address}`,
          contexts: ["link"],
          onclick: (info, tab) => {
            this.sendTorrentToClient(tab.id, {
              clientId: info.menuItemId,
              url: info.linkUrl
            });
          }
        });
      }
    }
    if (clients.length > 1) {
      this.add({
        id: this.rootId,
        title: this.service.i18n.t("service.contextMenus.sendTorrentToClient"),
        // "发送到其他服务器",
        contexts: ["link"]
      });
      clients.forEach((client2) => {
        if (client2.id !== this.options.defaultClientId) {
          this.add({
            id: client2.id,
            title: `${client2.name} -> ${client2.address}`,
            parentId: this.rootId,
            contexts: ["link"],
            onclick: (info, tab) => {
              this.sendTorrentToClient(tab.id, {
                clientId: info.menuItemId,
                url: info.linkUrl
              });
            }
          });
        }
      });
    }
  }
  /**
   * 向浏览器添加上下文菜单
   * @param options 菜单选项
   * @param callback 回调
   */
  add(options2, callback) {
    if (!options2.id) {
      options2.id = this.getRandomString();
    }
    chrome && chrome.contextMenus && chrome.contextMenus.create(options2, callback);
  }
  /**
   * 从浏览器中删除指定的菜单
   * @param id 菜单ID
   * @param callback 回调
   */
  remove(id, callback) {
    try {
      chrome.contextMenus.remove(id, callback);
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError);
      }
    } catch (error2) {
      console.log(error2);
    }
  }
  /**
   * 获取随机字符串
   * @param  {number} length    [长度，默认为16]
   * @param  {boolean} noSimilar [是否包含容易混淆的字符，默认为包含]
   * @return {string}           [返回的内容]
   */
  getRandomString(length = 16, noSimilar = true) {
    let chars2 = noSimilar ? "abcdefhijkmnprstwxyz2345678ABCDEFGHJKMNPQRSTWXYZ" : "abcdefghijkmnopqrstuvwxyz0123456789ABCDEFGHIJKMNOPQRSTUVWXYZ";
    let maxLength = chars2.length;
    let result2 = [];
    for (let i2 = 0; i2 < length; i2++) {
      result2.push(chars2.charAt(Math.floor(Math.random() * maxLength)));
    }
    return result2.join("");
  }
  /**
   * 获取解析过的地址
   * @param source
   */
  getParsedURL(source) {
    let url = new URLParse(source);
    let site = this.getSiteFromURL(source);
    if (!site) {
      return source;
    }
    let options = {
      url,
      site,
      result: source,
      error: {}
    };
    let parser = this.getSiteParser(site.host, "downloadURL");
    if (parser) {
      try {
        eval(parser);
      } catch (error2) {
        console.error(error2);
      }
    }
    if (options.error && options.error.msg) {
      return options.error;
    }
    return options.result;
  }
  /**
   * 获取指定解析器
   * @param host
   * @param name
   */
  getSiteParser(host2, name2) {
    let site2 = this.options.system && this.options.system.sites && this.options.system.sites.find((item) => {
      return item.host === host2;
    });
    if (!site2) {
      return "";
    }
    let result2 = site2.parser && site2.parser[name2];
    if (!result2) {
      let schema2 = this.options.system && this.options.system.schemas && this.options.system.schemas.find((item) => {
        return item.name === site2.schema;
      });
      if (schema2 && schema2.parser) {
        result2 = schema2.parser[name2];
      }
    }
    return result2;
  }
  /**
   * 根据指定的URL获取站点信息
   * @param source
   */
  getSiteFromURL(source2) {
    let url2 = new URLParse(source2);
    if (!url2.host) {
      return null;
    }
    let site2 = this.options.sites.find((item) => {
      let cdn = [item.url].concat(item.cdn);
      return item.host == url2.host || cdn.join("").indexOf(url2.host) > -1;
    });
    if (!site2) {
      return null;
    }
    return site2;
  }
}
class UserData {
  constructor(service) {
    this.service = service;
    this.items = null;
    this.storage = new localStorage();
    this.configKey = EConfigKey.userDatas;
    this.load();
  }
  /**
   * 获取记录
   */
  load() {
    return new Promise((resolve2, reject2) => {
      this.storage.get(this.configKey, (result2) => {
        console.log("UserData.load", result2);
        this.items = result2 || {};
        resolve2(this.items);
      });
    });
  }
  /**
   * 获取指定站点的数据
   * @param host
   * @param range
   */
  get(host2, range = EUserDataRange.latest) {
    if (!this.items) {
      return null;
    }
    if (!host2) {
      return this.items;
    }
    let datas = this.items[host2];
    if (!datas) {
      return null;
    }
    switch (range) {
      case EUserDataRange.all:
        return datas;
      case EUserDataRange.today:
        return datas[PPF.getToDay()];
    }
    return datas[EUserDataRange.latest];
  }
  /**
   * 更新用户数据
   * @param site 站点信息
   * @param data 用户数据
   */
  update(site2, data2) {
    const host2 = site2.host;
    if (!host2) {
      return;
    }
    const saveData = Object.assign({}, data2);
    if (this.items == null) {
      this.load().then(() => {
        this.update(site2, data2);
      });
    } else {
      let siteData = this.items[host2];
      let key2 = PPF.getToDay();
      if (!siteData) {
        siteData = {};
      }
      siteData[key2] = saveData;
      siteData[EUserDataRange.latest] = saveData;
      this.items[host2] = siteData;
      this.storage.set(this.configKey, this.items).then(() => {
        this.service.saveUserData();
      });
    }
  }
  /**
   * 清除记录
   */
  clear() {
    return new Promise((resolve2, reject2) => {
      this.items = {};
      this.storage.set(this.configKey, this.items).then(() => {
        this.service.saveUserData();
        resolve2(this.items);
      });
    });
  }
  /**
   * 升级站点数据
   */
  upgrade() {
    return new Promise((resolve2, reject2) => {
      var _a, _b;
      if ((_b = (_a = this.service.options) == null ? void 0 : _a.system) == null ? void 0 : _b.sites) {
        const sites = this.service.options.system.sites;
        this.load().then((datas) => {
          if (datas) {
            sites.forEach((systemSite) => {
              if (!systemSite.host) {
                return;
              }
              const formerHosts = systemSite.formerHosts;
              const newHost = systemSite.host;
              if (formerHosts && formerHosts.length > 0) {
                formerHosts.forEach((host2) => {
                  for (const key2 in datas) {
                    if (key2 == host2 && datas.hasOwnProperty(key2)) {
                      const element = datas[key2];
                      datas[newHost] = Object.assign({}, element, datas[newHost] ?? {});
                      delete datas[key2];
                    }
                  }
                });
              }
            });
            this.items = datas;
            this.storage.set(this.configKey, datas);
            this.service.saveUserData();
            resolve2(datas);
          } else {
            reject2(null);
          }
        });
      } else {
        reject2(null);
      }
    });
  }
  /**
   * 重置数据
   * @param datas 源数据
   */
  reset(datas) {
    this.items = datas;
    this.storage.set(this.configKey, this.items).then(() => {
      this.service.saveUserData();
    });
  }
}
class OmniBox {
  constructor(service) {
    this.service = service;
    this.splitString = " → ";
    this.initEvents();
  }
  init() {
  }
  initEvents() {
    if (chrome && chrome.omnibox) {
      chrome.omnibox.onInputChanged.addListener((text, suggest) => {
        if (!text)
          return;
        if (this.service.options.searchSolutions) {
          let result2 = [];
          this.service.options.searchSolutions.forEach(
            (solution) => {
              result2.push({
                content: `${solution.name}${this.splitString}${text}`,
                description: this.service.i18n.t("service.omnibox.search", {
                  solutionName: solution.name,
                  text
                })
                //  `在《${
                //   solution.name
                // }》方案中搜索 “${text}” 的相关种子`
              });
            }
          );
          if (result2.length > 0) {
            suggest(result2);
          }
        }
      });
      chrome.omnibox.onInputEntered.addListener((text) => {
        let solutionName = "";
        let solutionId = "";
        let key2 = "";
        if (text.indexOf(this.splitString) != -1) {
          [solutionName, key2] = text.split(this.splitString);
          if (solutionName && this.service.options.searchSolutions) {
            let solution = this.service.options.searchSolutions.find(
              (item) => {
                return item.name == solutionName;
              }
            );
            if (solution) {
              solutionId = solution.id;
            }
          }
        } else {
          key2 = text;
        }
        chrome.tabs.create({
          url: "index.html#/search-torrent/" + key2 + (solutionId ? `/${solutionId}` : "")
        });
      });
    }
  }
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _classCallCheck(instance2, Constructor) {
  if (!(instance2 instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key2 = _toPrimitive(arg, "string");
  return _typeof(key2) === "symbol" ? key2 : String(key2);
}
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o2, p2);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _possibleConstructorReturn(self2, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self2);
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
function _defineProperty(obj, key2, value) {
  key2 = _toPropertyKey(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr))
    return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++)
    arr2[i2] = arr[i2];
  return arr2;
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o2, minLen);
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toArray(arr) {
  return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest();
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys(Object(source2), true).forEach(function(key2) {
        _defineProperty(target, key2, source2[key2]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys(Object(source2)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source2, key2));
      });
    }
  }
  return target;
}
var consoleLogger = {
  type: "logger",
  log: function log(args) {
    this.output("log", args);
  },
  warn: function warn(args) {
    this.output("warn", args);
  },
  error: function error(args) {
    this.output("error", args);
  },
  output: function output(type, args) {
    if (console && console[type])
      console[type].apply(console, args);
  }
};
var Logger = function() {
  function Logger3(concreteLogger) {
    var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, Logger3);
    this.init(concreteLogger, options2);
  }
  _createClass(Logger3, [{
    key: "init",
    value: function init2(concreteLogger) {
      var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      this.prefix = options2.prefix || "i18next:";
      this.logger = concreteLogger || consoleLogger;
      this.options = options2;
      this.debug = options2.debug;
    }
  }, {
    key: "setDebug",
    value: function setDebug(bool) {
      this.debug = bool;
    }
  }, {
    key: "log",
    value: function log2() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.forward(args, "log", "", true);
    }
  }, {
    key: "warn",
    value: function warn2() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return this.forward(args, "warn", "", true);
    }
  }, {
    key: "error",
    value: function error2() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return this.forward(args, "error", "");
    }
  }, {
    key: "deprecate",
    value: function deprecate() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
    }
  }, {
    key: "forward",
    value: function forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug)
        return null;
      if (typeof args[0] === "string")
        args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
      return this.logger[lvl](args);
    }
  }, {
    key: "create",
    value: function create(moduleName) {
      return new Logger3(this.logger, _objectSpread(_objectSpread({}, {
        prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
      }), this.options));
    }
  }, {
    key: "clone",
    value: function clone(options2) {
      options2 = options2 || this.options;
      options2.prefix = options2.prefix || this.prefix;
      return new Logger3(this.logger, options2);
    }
  }]);
  return Logger3;
}();
var baseLogger = new Logger();
var EventEmitter = function() {
  function EventEmitter2() {
    _classCallCheck(this, EventEmitter2);
    this.observers = {};
  }
  _createClass(EventEmitter2, [{
    key: "on",
    value: function on(events, listener) {
      var _this = this;
      events.split(" ").forEach(function(event) {
        _this.observers[event] = _this.observers[event] || [];
        _this.observers[event].push(listener);
      });
      return this;
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      if (!this.observers[event])
        return;
      if (!listener) {
        delete this.observers[event];
        return;
      }
      this.observers[event] = this.observers[event].filter(function(l2) {
        return l2 !== listener;
      });
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (this.observers[event]) {
        var cloned = [].concat(this.observers[event]);
        cloned.forEach(function(observer) {
          observer.apply(void 0, args);
        });
      }
      if (this.observers["*"]) {
        var _cloned = [].concat(this.observers["*"]);
        _cloned.forEach(function(observer) {
          observer.apply(observer, [event].concat(args));
        });
      }
    }
  }]);
  return EventEmitter2;
}();
function defer() {
  var res;
  var rej;
  var promise2 = new Promise(function(resolve2, reject2) {
    res = resolve2;
    rej = reject2;
  });
  promise2.resolve = res;
  promise2.reject = rej;
  return promise2;
}
function makeString(object) {
  if (object == null)
    return "";
  return "" + object;
}
function copy(a2, s2, t2) {
  a2.forEach(function(m) {
    if (s2[m])
      t2[m] = s2[m];
  });
}
function getLastOfPath(object, path2, Empty) {
  function cleanKey(key3) {
    return key3 && key3.indexOf("###") > -1 ? key3.replace(/###/g, ".") : key3;
  }
  function canNotTraverseDeeper() {
    return !object || typeof object === "string";
  }
  var stack = typeof path2 !== "string" ? [].concat(path2) : path2.split(".");
  while (stack.length > 1) {
    if (canNotTraverseDeeper())
      return {};
    var key2 = cleanKey(stack.shift());
    if (!object[key2] && Empty)
      object[key2] = new Empty();
    if (Object.prototype.hasOwnProperty.call(object, key2)) {
      object = object[key2];
    } else {
      object = {};
    }
  }
  if (canNotTraverseDeeper())
    return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}
function setPath(object, path2, newValue) {
  var _getLastOfPath = getLastOfPath(object, path2, Object), obj = _getLastOfPath.obj, k = _getLastOfPath.k;
  obj[k] = newValue;
}
function pushPath(object, path2, newValue, concat2) {
  var _getLastOfPath2 = getLastOfPath(object, path2, Object), obj = _getLastOfPath2.obj, k = _getLastOfPath2.k;
  obj[k] = obj[k] || [];
  if (concat2)
    obj[k] = obj[k].concat(newValue);
  if (!concat2)
    obj[k].push(newValue);
}
function getPath(object, path2) {
  var _getLastOfPath3 = getLastOfPath(object, path2), obj = _getLastOfPath3.obj, k = _getLastOfPath3.k;
  if (!obj)
    return void 0;
  return obj[k];
}
function getPathWithDefaults(data2, defaultData, key2) {
  var value = getPath(data2, key2);
  if (value !== void 0) {
    return value;
  }
  return getPath(defaultData, key2);
}
function deepExtend(target, source2, overwrite) {
  for (var prop in source2) {
    if (prop !== "__proto__" && prop !== "constructor") {
      if (prop in target) {
        if (typeof target[prop] === "string" || target[prop] instanceof String || typeof source2[prop] === "string" || source2[prop] instanceof String) {
          if (overwrite)
            target[prop] = source2[prop];
        } else {
          deepExtend(target[prop], source2[prop], overwrite);
        }
      } else {
        target[prop] = source2[prop];
      }
    }
  }
  return target;
}
function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var _entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function escape$1(data2) {
  if (typeof data2 === "string") {
    return data2.replace(/[&<>"'\/]/g, function(s2) {
      return _entityMap[s2];
    });
  }
  return data2;
}
var isIE10 = typeof window !== "undefined" && window.navigator && typeof window.navigator.userAgentData === "undefined" && window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE") > -1;
var chars = [" ", ",", "?", "!", ";"];
function looksLikeObjectPath(key2, nsSeparator, keySeparator) {
  nsSeparator = nsSeparator || "";
  keySeparator = keySeparator || "";
  var possibleChars = chars.filter(function(c2) {
    return nsSeparator.indexOf(c2) < 0 && keySeparator.indexOf(c2) < 0;
  });
  if (possibleChars.length === 0)
    return true;
  var r2 = new RegExp("(".concat(possibleChars.map(function(c2) {
    return c2 === "?" ? "\\?" : c2;
  }).join("|"), ")"));
  var matched = !r2.test(key2);
  if (!matched) {
    var ki = key2.indexOf(keySeparator);
    if (ki > 0 && !r2.test(key2.substring(0, ki))) {
      matched = true;
    }
  }
  return matched;
}
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$1(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$1(Object(source2), true).forEach(function(key2) {
        _defineProperty(target, key2, source2[key2]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys$1(Object(source2)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source2, key2));
      });
    }
  }
  return target;
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result2;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result2 = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result2 = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result2);
  };
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function deepFind(obj, path2) {
  var keySeparator = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!obj)
    return void 0;
  if (obj[path2])
    return obj[path2];
  var paths = path2.split(keySeparator);
  var current = obj;
  for (var i2 = 0; i2 < paths.length; ++i2) {
    if (!current)
      return void 0;
    if (typeof current[paths[i2]] === "string" && i2 + 1 < paths.length) {
      return void 0;
    }
    if (current[paths[i2]] === void 0) {
      var j = 2;
      var p2 = paths.slice(i2, i2 + j).join(keySeparator);
      var mix = current[p2];
      while (mix === void 0 && paths.length > i2 + j) {
        j++;
        p2 = paths.slice(i2, i2 + j).join(keySeparator);
        mix = current[p2];
      }
      if (mix === void 0)
        return void 0;
      if (mix === null)
        return null;
      if (path2.endsWith(p2)) {
        if (typeof mix === "string")
          return mix;
        if (p2 && typeof mix[p2] === "string")
          return mix[p2];
      }
      var joinedPath = paths.slice(i2 + j).join(keySeparator);
      if (joinedPath)
        return deepFind(mix, joinedPath, keySeparator);
      return void 0;
    }
    current = current[paths[i2]];
  }
  return current;
}
var ResourceStore = function(_EventEmitter) {
  _inherits(ResourceStore2, _EventEmitter);
  var _super = _createSuper(ResourceStore2);
  function ResourceStore2(data2) {
    var _this;
    var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    _classCallCheck(this, ResourceStore2);
    _this = _super.call(this);
    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }
    _this.data = data2 || {};
    _this.options = options2;
    if (_this.options.keySeparator === void 0) {
      _this.options.keySeparator = ".";
    }
    if (_this.options.ignoreJSONStructure === void 0) {
      _this.options.ignoreJSONStructure = true;
    }
    return _this;
  }
  _createClass(ResourceStore2, [{
    key: "addNamespaces",
    value: function addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    }
  }, {
    key: "removeNamespaces",
    value: function removeNamespaces(ns) {
      var index2 = this.options.ns.indexOf(ns);
      if (index2 > -1) {
        this.options.ns.splice(index2, 1);
      }
    }
  }, {
    key: "getResource",
    value: function getResource(lng, ns, key2) {
      var options2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      var keySeparator = options2.keySeparator !== void 0 ? options2.keySeparator : this.options.keySeparator;
      var ignoreJSONStructure = options2.ignoreJSONStructure !== void 0 ? options2.ignoreJSONStructure : this.options.ignoreJSONStructure;
      var path2 = [lng, ns];
      if (key2 && typeof key2 !== "string")
        path2 = path2.concat(key2);
      if (key2 && typeof key2 === "string")
        path2 = path2.concat(keySeparator ? key2.split(keySeparator) : key2);
      if (lng.indexOf(".") > -1) {
        path2 = lng.split(".");
      }
      var result2 = getPath(this.data, path2);
      if (result2 || !ignoreJSONStructure || typeof key2 !== "string")
        return result2;
      return deepFind(this.data && this.data[lng] && this.data[lng][ns], key2, keySeparator);
    }
  }, {
    key: "addResource",
    value: function addResource(lng, ns, key2, value) {
      var options2 = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
        silent: false
      };
      var keySeparator = this.options.keySeparator;
      if (keySeparator === void 0)
        keySeparator = ".";
      var path2 = [lng, ns];
      if (key2)
        path2 = path2.concat(keySeparator ? key2.split(keySeparator) : key2);
      if (lng.indexOf(".") > -1) {
        path2 = lng.split(".");
        value = ns;
        ns = path2[1];
      }
      this.addNamespaces(ns);
      setPath(this.data, path2, value);
      if (!options2.silent)
        this.emit("added", lng, ns, key2, value);
    }
  }, {
    key: "addResources",
    value: function addResources(lng, ns, resources) {
      var options2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
        silent: false
      };
      for (var m in resources) {
        if (typeof resources[m] === "string" || Object.prototype.toString.apply(resources[m]) === "[object Array]")
          this.addResource(lng, ns, m, resources[m], {
            silent: true
          });
      }
      if (!options2.silent)
        this.emit("added", lng, ns, resources);
    }
  }, {
    key: "addResourceBundle",
    value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
      var options2 = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
        silent: false
      };
      var path2 = [lng, ns];
      if (lng.indexOf(".") > -1) {
        path2 = lng.split(".");
        deep = resources;
        resources = ns;
        ns = path2[1];
      }
      this.addNamespaces(ns);
      var pack = getPath(this.data, path2) || {};
      if (deep) {
        deepExtend(pack, resources, overwrite);
      } else {
        pack = _objectSpread$1(_objectSpread$1({}, pack), resources);
      }
      setPath(this.data, path2, pack);
      if (!options2.silent)
        this.emit("added", lng, ns, resources);
    }
  }, {
    key: "removeResourceBundle",
    value: function removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }
      this.removeNamespaces(ns);
      this.emit("removed", lng, ns);
    }
  }, {
    key: "hasResourceBundle",
    value: function hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== void 0;
    }
  }, {
    key: "getResourceBundle",
    value: function getResourceBundle(lng, ns) {
      if (!ns)
        ns = this.options.defaultNS;
      if (this.options.compatibilityAPI === "v1")
        return _objectSpread$1(_objectSpread$1({}, {}), this.getResource(lng, ns));
      return this.getResource(lng, ns);
    }
  }, {
    key: "getDataByLanguage",
    value: function getDataByLanguage(lng) {
      return this.data[lng];
    }
  }, {
    key: "hasLanguageSomeTranslations",
    value: function hasLanguageSomeTranslations(lng) {
      var data2 = this.getDataByLanguage(lng);
      var n2 = data2 && Object.keys(data2) || [];
      return !!n2.find(function(v) {
        return data2[v] && Object.keys(data2[v]).length > 0;
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.data;
    }
  }]);
  return ResourceStore2;
}(EventEmitter);
var postProcessor = {
  processors: {},
  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key2, options2, translator) {
    var _this = this;
    processors.forEach(function(processor) {
      if (_this.processors[processor])
        value = _this.processors[processor].process(value, key2, options2, translator);
    });
    return value;
  }
};
function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$2(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$2(Object(source2), true).forEach(function(key2) {
        _defineProperty(target, key2, source2[key2]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys$2(Object(source2)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source2, key2));
      });
    }
  }
  return target;
}
function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result2;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result2 = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result2 = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result2);
  };
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
var checkedLoadedFor = {};
var Translator = function(_EventEmitter) {
  _inherits(Translator2, _EventEmitter);
  var _super = _createSuper$1(Translator2);
  function Translator2(services) {
    var _this;
    var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, Translator2);
    _this = _super.call(this);
    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }
    copy(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], services, _assertThisInitialized(_this));
    _this.options = options2;
    if (_this.options.keySeparator === void 0) {
      _this.options.keySeparator = ".";
    }
    _this.logger = baseLogger.create("translator");
    return _this;
  }
  _createClass(Translator2, [{
    key: "changeLanguage",
    value: function changeLanguage2(lng) {
      if (lng)
        this.language = lng;
    }
  }, {
    key: "exists",
    value: function exists2(key2) {
      var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        interpolation: {}
      };
      if (key2 === void 0 || key2 === null) {
        return false;
      }
      var resolved = this.resolve(key2, options2);
      return resolved && resolved.res !== void 0;
    }
  }, {
    key: "extractFromKey",
    value: function extractFromKey(key2, options2) {
      var nsSeparator = options2.nsSeparator !== void 0 ? options2.nsSeparator : this.options.nsSeparator;
      if (nsSeparator === void 0)
        nsSeparator = ":";
      var keySeparator = options2.keySeparator !== void 0 ? options2.keySeparator : this.options.keySeparator;
      var namespaces = options2.ns || this.options.defaultNS || [];
      var wouldCheckForNsInKey = nsSeparator && key2.indexOf(nsSeparator) > -1;
      var seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options2.keySeparator && !this.options.userDefinedNsSeparator && !options2.nsSeparator && !looksLikeObjectPath(key2, nsSeparator, keySeparator);
      if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
        var m = key2.match(this.interpolator.nestingRegexp);
        if (m && m.length > 0) {
          return {
            key: key2,
            namespaces
          };
        }
        var parts = key2.split(nsSeparator);
        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1)
          namespaces = parts.shift();
        key2 = parts.join(keySeparator);
      }
      if (typeof namespaces === "string")
        namespaces = [namespaces];
      return {
        key: key2,
        namespaces
      };
    }
  }, {
    key: "translate",
    value: function translate(keys, options2, lastKey) {
      var _this2 = this;
      if (_typeof(options2) !== "object" && this.options.overloadTranslationOptionHandler) {
        options2 = this.options.overloadTranslationOptionHandler(arguments);
      }
      if (!options2)
        options2 = {};
      if (keys === void 0 || keys === null)
        return "";
      if (!Array.isArray(keys))
        keys = [String(keys)];
      var returnDetails = options2.returnDetails !== void 0 ? options2.returnDetails : this.options.returnDetails;
      var keySeparator = options2.keySeparator !== void 0 ? options2.keySeparator : this.options.keySeparator;
      var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options2), key2 = _this$extractFromKey.key, namespaces = _this$extractFromKey.namespaces;
      var namespace = namespaces[namespaces.length - 1];
      var lng = options2.lng || this.language;
      var appendNamespaceToCIMode = options2.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
      if (lng && lng.toLowerCase() === "cimode") {
        if (appendNamespaceToCIMode) {
          var nsSeparator = options2.nsSeparator || this.options.nsSeparator;
          if (returnDetails) {
            resolved.res = "".concat(namespace).concat(nsSeparator).concat(key2);
            return resolved;
          }
          return "".concat(namespace).concat(nsSeparator).concat(key2);
        }
        if (returnDetails) {
          resolved.res = key2;
          return resolved;
        }
        return key2;
      }
      var resolved = this.resolve(keys, options2);
      var res = resolved && resolved.res;
      var resUsedKey = resolved && resolved.usedKey || key2;
      var resExactUsedKey = resolved && resolved.exactUsedKey || key2;
      var resType = Object.prototype.toString.apply(res);
      var noObject = ["[object Number]", "[object Function]", "[object RegExp]"];
      var joinArrays = options2.joinArrays !== void 0 ? options2.joinArrays : this.options.joinArrays;
      var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
      var handleAsObject = typeof res !== "string" && typeof res !== "boolean" && typeof res !== "number";
      if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === "string" && resType === "[object Array]")) {
        if (!options2.returnObjects && !this.options.returnObjects) {
          if (!this.options.returnedObjectHandler) {
            this.logger.warn("accessing an object - but returnObjects options is not enabled!");
          }
          var r2 = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, _objectSpread$2(_objectSpread$2({}, options2), {}, {
            ns: namespaces
          })) : "key '".concat(key2, " (").concat(this.language, ")' returned an object instead of string.");
          if (returnDetails) {
            resolved.res = r2;
            return resolved;
          }
          return r2;
        }
        if (keySeparator) {
          var resTypeIsArray = resType === "[object Array]";
          var copy2 = resTypeIsArray ? [] : {};
          var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
          for (var m in res) {
            if (Object.prototype.hasOwnProperty.call(res, m)) {
              var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
              copy2[m] = this.translate(deepKey, _objectSpread$2(_objectSpread$2({}, options2), {
                joinArrays: false,
                ns: namespaces
              }));
              if (copy2[m] === deepKey)
                copy2[m] = res[m];
            }
          }
          res = copy2;
        }
      } else if (handleAsObjectInI18nFormat && typeof joinArrays === "string" && resType === "[object Array]") {
        res = res.join(joinArrays);
        if (res)
          res = this.extendTranslation(res, keys, options2, lastKey);
      } else {
        var usedDefault = false;
        var usedKey = false;
        var needsPluralHandling = options2.count !== void 0 && typeof options2.count !== "string";
        var hasDefaultValue = Translator2.hasDefaultValue(options2);
        var defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options2.count, options2) : "";
        var defaultValue = options2["defaultValue".concat(defaultValueSuffix)] || options2.defaultValue;
        if (!this.isValidLookup(res) && hasDefaultValue) {
          usedDefault = true;
          res = defaultValue;
        }
        if (!this.isValidLookup(res)) {
          usedKey = true;
          res = key2;
        }
        var missingKeyNoValueFallbackToKey = options2.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
        var resForMissing = missingKeyNoValueFallbackToKey && usedKey ? void 0 : res;
        var updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
        if (usedKey || usedDefault || updateMissing) {
          this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, key2, updateMissing ? defaultValue : res);
          if (keySeparator) {
            var fk = this.resolve(key2, _objectSpread$2(_objectSpread$2({}, options2), {}, {
              keySeparator: false
            }));
            if (fk && fk.res)
              this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
          }
          var lngs = [];
          var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options2.lng || this.language);
          if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) {
            for (var i2 = 0; i2 < fallbackLngs.length; i2++) {
              lngs.push(fallbackLngs[i2]);
            }
          } else if (this.options.saveMissingTo === "all") {
            lngs = this.languageUtils.toResolveHierarchy(options2.lng || this.language);
          } else {
            lngs.push(options2.lng || this.language);
          }
          var send = function send2(l2, k, specificDefaultValue) {
            var defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
            if (_this2.options.missingKeyHandler) {
              _this2.options.missingKeyHandler(l2, namespace, k, defaultForMissing, updateMissing, options2);
            } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
              _this2.backendConnector.saveMissing(l2, namespace, k, defaultForMissing, updateMissing, options2);
            }
            _this2.emit("missingKey", l2, namespace, k, res);
          };
          if (this.options.saveMissing) {
            if (this.options.saveMissingPlurals && needsPluralHandling) {
              lngs.forEach(function(language) {
                _this2.pluralResolver.getSuffixes(language, options2).forEach(function(suffix) {
                  send([language], key2 + suffix, options2["defaultValue".concat(suffix)] || defaultValue);
                });
              });
            } else {
              send(lngs, key2, defaultValue);
            }
          }
        }
        res = this.extendTranslation(res, keys, options2, resolved, lastKey);
        if (usedKey && res === key2 && this.options.appendNamespaceToMissingKey)
          res = "".concat(namespace, ":").concat(key2);
        if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
          if (this.options.compatibilityAPI !== "v1") {
            res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(namespace, ":").concat(key2) : key2, usedDefault ? res : void 0);
          } else {
            res = this.options.parseMissingKeyHandler(res);
          }
        }
      }
      if (returnDetails) {
        resolved.res = res;
        return resolved;
      }
      return res;
    }
  }, {
    key: "extendTranslation",
    value: function extendTranslation(res, key2, options2, resolved, lastKey) {
      var _this3 = this;
      if (this.i18nFormat && this.i18nFormat.parse) {
        res = this.i18nFormat.parse(res, _objectSpread$2(_objectSpread$2({}, this.options.interpolation.defaultVariables), options2), resolved.usedLng, resolved.usedNS, resolved.usedKey, {
          resolved
        });
      } else if (!options2.skipInterpolation) {
        if (options2.interpolation)
          this.interpolator.init(_objectSpread$2(_objectSpread$2({}, options2), {
            interpolation: _objectSpread$2(_objectSpread$2({}, this.options.interpolation), options2.interpolation)
          }));
        var skipOnVariables = typeof res === "string" && (options2 && options2.interpolation && options2.interpolation.skipOnVariables !== void 0 ? options2.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
        var nestBef;
        if (skipOnVariables) {
          var nb = res.match(this.interpolator.nestingRegexp);
          nestBef = nb && nb.length;
        }
        var data2 = options2.replace && typeof options2.replace !== "string" ? options2.replace : options2;
        if (this.options.interpolation.defaultVariables)
          data2 = _objectSpread$2(_objectSpread$2({}, this.options.interpolation.defaultVariables), data2);
        res = this.interpolator.interpolate(res, data2, options2.lng || this.language, options2);
        if (skipOnVariables) {
          var na = res.match(this.interpolator.nestingRegexp);
          var nestAft = na && na.length;
          if (nestBef < nestAft)
            options2.nest = false;
        }
        if (options2.nest !== false)
          res = this.interpolator.nest(res, function() {
            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }
            if (lastKey && lastKey[0] === args[0] && !options2.context) {
              _this3.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key2[0]));
              return null;
            }
            return _this3.translate.apply(_this3, args.concat([key2]));
          }, options2);
        if (options2.interpolation)
          this.interpolator.reset();
      }
      var postProcess = options2.postProcess || this.options.postProcess;
      var postProcessorNames = typeof postProcess === "string" ? [postProcess] : postProcess;
      if (res !== void 0 && res !== null && postProcessorNames && postProcessorNames.length && options2.applyPostProcessor !== false) {
        res = postProcessor.handle(postProcessorNames, res, key2, this.options && this.options.postProcessPassResolved ? _objectSpread$2({
          i18nResolved: resolved
        }, options2) : options2, this);
      }
      return res;
    }
  }, {
    key: "resolve",
    value: function resolve2(keys) {
      var _this4 = this;
      var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var found;
      var usedKey;
      var exactUsedKey;
      var usedLng;
      var usedNS;
      if (typeof keys === "string")
        keys = [keys];
      keys.forEach(function(k) {
        if (_this4.isValidLookup(found))
          return;
        var extracted = _this4.extractFromKey(k, options2);
        var key2 = extracted.key;
        usedKey = key2;
        var namespaces = extracted.namespaces;
        if (_this4.options.fallbackNS)
          namespaces = namespaces.concat(_this4.options.fallbackNS);
        var needsPluralHandling = options2.count !== void 0 && typeof options2.count !== "string";
        var needsZeroSuffixLookup = needsPluralHandling && !options2.ordinal && options2.count === 0 && _this4.pluralResolver.shouldUseIntlApi();
        var needsContextHandling = options2.context !== void 0 && (typeof options2.context === "string" || typeof options2.context === "number") && options2.context !== "";
        var codes = options2.lngs ? options2.lngs : _this4.languageUtils.toResolveHierarchy(options2.lng || _this4.language, options2.fallbackLng);
        namespaces.forEach(function(ns) {
          if (_this4.isValidLookup(found))
            return;
          usedNS = ns;
          if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && _this4.utils && _this4.utils.hasLoadedNamespace && !_this4.utils.hasLoadedNamespace(usedNS)) {
            checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;
            _this4.logger.warn('key "'.concat(usedKey, '" for languages "').concat(codes.join(", "), `" won't get resolved as namespace "`).concat(usedNS, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
          }
          codes.forEach(function(code) {
            if (_this4.isValidLookup(found))
              return;
            usedLng = code;
            var finalKeys = [key2];
            if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
              _this4.i18nFormat.addLookupKeys(finalKeys, key2, code, ns, options2);
            } else {
              var pluralSuffix;
              if (needsPluralHandling)
                pluralSuffix = _this4.pluralResolver.getSuffix(code, options2.count, options2);
              var zeroSuffix = "".concat(_this4.options.pluralSeparator, "zero");
              if (needsPluralHandling) {
                finalKeys.push(key2 + pluralSuffix);
                if (needsZeroSuffixLookup) {
                  finalKeys.push(key2 + zeroSuffix);
                }
              }
              if (needsContextHandling) {
                var contextKey = "".concat(key2).concat(_this4.options.contextSeparator).concat(options2.context);
                finalKeys.push(contextKey);
                if (needsPluralHandling) {
                  finalKeys.push(contextKey + pluralSuffix);
                  if (needsZeroSuffixLookup) {
                    finalKeys.push(contextKey + zeroSuffix);
                  }
                }
              }
            }
            var possibleKey;
            while (possibleKey = finalKeys.pop()) {
              if (!_this4.isValidLookup(found)) {
                exactUsedKey = possibleKey;
                found = _this4.getResource(code, ns, possibleKey, options2);
              }
            }
          });
        });
      });
      return {
        res: found,
        usedKey,
        exactUsedKey,
        usedLng,
        usedNS
      };
    }
  }, {
    key: "isValidLookup",
    value: function isValidLookup(res) {
      return res !== void 0 && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
    }
  }, {
    key: "getResource",
    value: function getResource(code, ns, key2) {
      var options2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
      if (this.i18nFormat && this.i18nFormat.getResource)
        return this.i18nFormat.getResource(code, ns, key2, options2);
      return this.resourceStore.getResource(code, ns, key2, options2);
    }
  }], [{
    key: "hasDefaultValue",
    value: function hasDefaultValue(options2) {
      var prefix = "defaultValue";
      for (var option in options2) {
        if (Object.prototype.hasOwnProperty.call(options2, option) && prefix === option.substring(0, prefix.length) && void 0 !== options2[option]) {
          return true;
        }
      }
      return false;
    }
  }]);
  return Translator2;
}(EventEmitter);
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var LanguageUtil = function() {
  function LanguageUtil2(options2) {
    _classCallCheck(this, LanguageUtil2);
    this.options = options2;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create("languageUtils");
  }
  _createClass(LanguageUtil2, [{
    key: "getScriptPartFromCode",
    value: function getScriptPartFromCode(code) {
      if (!code || code.indexOf("-") < 0)
        return null;
      var p2 = code.split("-");
      if (p2.length === 2)
        return null;
      p2.pop();
      if (p2[p2.length - 1].toLowerCase() === "x")
        return null;
      return this.formatLanguageCode(p2.join("-"));
    }
  }, {
    key: "getLanguagePartFromCode",
    value: function getLanguagePartFromCode(code) {
      if (!code || code.indexOf("-") < 0)
        return code;
      var p2 = code.split("-");
      return this.formatLanguageCode(p2[0]);
    }
  }, {
    key: "formatLanguageCode",
    value: function formatLanguageCode(code) {
      if (typeof code === "string" && code.indexOf("-") > -1) {
        var specialCases = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
        var p2 = code.split("-");
        if (this.options.lowerCaseLng) {
          p2 = p2.map(function(part) {
            return part.toLowerCase();
          });
        } else if (p2.length === 2) {
          p2[0] = p2[0].toLowerCase();
          p2[1] = p2[1].toUpperCase();
          if (specialCases.indexOf(p2[1].toLowerCase()) > -1)
            p2[1] = capitalize(p2[1].toLowerCase());
        } else if (p2.length === 3) {
          p2[0] = p2[0].toLowerCase();
          if (p2[1].length === 2)
            p2[1] = p2[1].toUpperCase();
          if (p2[0] !== "sgn" && p2[2].length === 2)
            p2[2] = p2[2].toUpperCase();
          if (specialCases.indexOf(p2[1].toLowerCase()) > -1)
            p2[1] = capitalize(p2[1].toLowerCase());
          if (specialCases.indexOf(p2[2].toLowerCase()) > -1)
            p2[2] = capitalize(p2[2].toLowerCase());
        }
        return p2.join("-");
      }
      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  }, {
    key: "isSupportedCode",
    value: function isSupportedCode(code) {
      if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) {
        code = this.getLanguagePartFromCode(code);
      }
      return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
    }
  }, {
    key: "getBestMatchFromCodes",
    value: function getBestMatchFromCodes(codes) {
      var _this = this;
      if (!codes)
        return null;
      var found;
      codes.forEach(function(code) {
        if (found)
          return;
        var cleanedLng = _this.formatLanguageCode(code);
        if (!_this.options.supportedLngs || _this.isSupportedCode(cleanedLng))
          found = cleanedLng;
      });
      if (!found && this.options.supportedLngs) {
        codes.forEach(function(code) {
          if (found)
            return;
          var lngOnly = _this.getLanguagePartFromCode(code);
          if (_this.isSupportedCode(lngOnly))
            return found = lngOnly;
          found = _this.options.supportedLngs.find(function(supportedLng) {
            if (supportedLng.indexOf(lngOnly) === 0)
              return supportedLng;
          });
        });
      }
      if (!found)
        found = this.getFallbackCodes(this.options.fallbackLng)[0];
      return found;
    }
  }, {
    key: "getFallbackCodes",
    value: function getFallbackCodes(fallbacks, code) {
      if (!fallbacks)
        return [];
      if (typeof fallbacks === "function")
        fallbacks = fallbacks(code);
      if (typeof fallbacks === "string")
        fallbacks = [fallbacks];
      if (Object.prototype.toString.apply(fallbacks) === "[object Array]")
        return fallbacks;
      if (!code)
        return fallbacks["default"] || [];
      var found = fallbacks[code];
      if (!found)
        found = fallbacks[this.getScriptPartFromCode(code)];
      if (!found)
        found = fallbacks[this.formatLanguageCode(code)];
      if (!found)
        found = fallbacks[this.getLanguagePartFromCode(code)];
      if (!found)
        found = fallbacks["default"];
      return found || [];
    }
  }, {
    key: "toResolveHierarchy",
    value: function toResolveHierarchy(code, fallbackCode) {
      var _this2 = this;
      var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
      var codes = [];
      var addCode = function addCode2(c2) {
        if (!c2)
          return;
        if (_this2.isSupportedCode(c2)) {
          codes.push(c2);
        } else {
          _this2.logger.warn("rejecting language code not found in supportedLngs: ".concat(c2));
        }
      };
      if (typeof code === "string" && code.indexOf("-") > -1) {
        if (this.options.load !== "languageOnly")
          addCode(this.formatLanguageCode(code));
        if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly")
          addCode(this.getScriptPartFromCode(code));
        if (this.options.load !== "currentOnly")
          addCode(this.getLanguagePartFromCode(code));
      } else if (typeof code === "string") {
        addCode(this.formatLanguageCode(code));
      }
      fallbackCodes.forEach(function(fc) {
        if (codes.indexOf(fc) < 0)
          addCode(_this2.formatLanguageCode(fc));
      });
      return codes;
    }
  }]);
  return LanguageUtil2;
}();
var sets = [{
  lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
  nr: [1],
  fc: 3
}, {
  lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ["ar"],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ["cs", "sk"],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ["csb", "pl"],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ["cy"],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ["fr"],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ["ga"],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ["gd"],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ["is"],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ["jv"],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ["kw"],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ["lt"],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ["lv"],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ["mk"],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ["mnk"],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ["mt"],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ["or"],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ["ro"],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ["sl"],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ["he", "iw"],
  nr: [1, 2, 20, 21],
  fc: 22
}];
var _rulesPluralsTypes = {
  1: function _(n2) {
    return Number(n2 > 1);
  },
  2: function _2(n2) {
    return Number(n2 != 1);
  },
  3: function _3(n2) {
    return 0;
  },
  4: function _4(n2) {
    return Number(n2 % 10 == 1 && n2 % 100 != 11 ? 0 : n2 % 10 >= 2 && n2 % 10 <= 4 && (n2 % 100 < 10 || n2 % 100 >= 20) ? 1 : 2);
  },
  5: function _5(n2) {
    return Number(n2 == 0 ? 0 : n2 == 1 ? 1 : n2 == 2 ? 2 : n2 % 100 >= 3 && n2 % 100 <= 10 ? 3 : n2 % 100 >= 11 ? 4 : 5);
  },
  6: function _6(n2) {
    return Number(n2 == 1 ? 0 : n2 >= 2 && n2 <= 4 ? 1 : 2);
  },
  7: function _7(n2) {
    return Number(n2 == 1 ? 0 : n2 % 10 >= 2 && n2 % 10 <= 4 && (n2 % 100 < 10 || n2 % 100 >= 20) ? 1 : 2);
  },
  8: function _8(n2) {
    return Number(n2 == 1 ? 0 : n2 == 2 ? 1 : n2 != 8 && n2 != 11 ? 2 : 3);
  },
  9: function _9(n2) {
    return Number(n2 >= 2);
  },
  10: function _10(n2) {
    return Number(n2 == 1 ? 0 : n2 == 2 ? 1 : n2 < 7 ? 2 : n2 < 11 ? 3 : 4);
  },
  11: function _11(n2) {
    return Number(n2 == 1 || n2 == 11 ? 0 : n2 == 2 || n2 == 12 ? 1 : n2 > 2 && n2 < 20 ? 2 : 3);
  },
  12: function _12(n2) {
    return Number(n2 % 10 != 1 || n2 % 100 == 11);
  },
  13: function _13(n2) {
    return Number(n2 !== 0);
  },
  14: function _14(n2) {
    return Number(n2 == 1 ? 0 : n2 == 2 ? 1 : n2 == 3 ? 2 : 3);
  },
  15: function _15(n2) {
    return Number(n2 % 10 == 1 && n2 % 100 != 11 ? 0 : n2 % 10 >= 2 && (n2 % 100 < 10 || n2 % 100 >= 20) ? 1 : 2);
  },
  16: function _16(n2) {
    return Number(n2 % 10 == 1 && n2 % 100 != 11 ? 0 : n2 !== 0 ? 1 : 2);
  },
  17: function _17(n2) {
    return Number(n2 == 1 || n2 % 10 == 1 && n2 % 100 != 11 ? 0 : 1);
  },
  18: function _18(n2) {
    return Number(n2 == 0 ? 0 : n2 == 1 ? 1 : 2);
  },
  19: function _19(n2) {
    return Number(n2 == 1 ? 0 : n2 == 0 || n2 % 100 > 1 && n2 % 100 < 11 ? 1 : n2 % 100 > 10 && n2 % 100 < 20 ? 2 : 3);
  },
  20: function _20(n2) {
    return Number(n2 == 1 ? 0 : n2 == 0 || n2 % 100 > 0 && n2 % 100 < 20 ? 1 : 2);
  },
  21: function _21(n2) {
    return Number(n2 % 100 == 1 ? 1 : n2 % 100 == 2 ? 2 : n2 % 100 == 3 || n2 % 100 == 4 ? 3 : 0);
  },
  22: function _22(n2) {
    return Number(n2 == 1 ? 0 : n2 == 2 ? 1 : (n2 < 0 || n2 > 10) && n2 % 10 == 0 ? 2 : 3);
  }
};
var deprecatedJsonVersions = ["v1", "v2", "v3"];
var suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function createRules() {
  var rules2 = {};
  sets.forEach(function(set2) {
    set2.lngs.forEach(function(l2) {
      rules2[l2] = {
        numbers: set2.nr,
        plurals: _rulesPluralsTypes[set2.fc]
      };
    });
  });
  return rules2;
}
var PluralResolver = function() {
  function PluralResolver2(languageUtils) {
    var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, PluralResolver2);
    this.languageUtils = languageUtils;
    this.options = options2;
    this.logger = baseLogger.create("pluralResolver");
    if ((!this.options.compatibilityJSON || this.options.compatibilityJSON === "v4") && (typeof Intl === "undefined" || !Intl.PluralRules)) {
      this.options.compatibilityJSON = "v3";
      this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.");
    }
    this.rules = createRules();
  }
  _createClass(PluralResolver2, [{
    key: "addRule",
    value: function addRule(lng, obj) {
      this.rules[lng] = obj;
    }
  }, {
    key: "getRule",
    value: function getRule(code) {
      var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (this.shouldUseIntlApi()) {
        try {
          return new Intl.PluralRules(code, {
            type: options2.ordinal ? "ordinal" : "cardinal"
          });
        } catch (_unused) {
          return;
        }
      }
      return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
    }
  }, {
    key: "needsPlural",
    value: function needsPlural(code) {
      var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var rule2 = this.getRule(code, options2);
      if (this.shouldUseIntlApi()) {
        return rule2 && rule2.resolvedOptions().pluralCategories.length > 1;
      }
      return rule2 && rule2.numbers.length > 1;
    }
  }, {
    key: "getPluralFormsOfKey",
    value: function getPluralFormsOfKey(code, key2) {
      var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      return this.getSuffixes(code, options2).map(function(suffix) {
        return "".concat(key2).concat(suffix);
      });
    }
  }, {
    key: "getSuffixes",
    value: function getSuffixes(code) {
      var _this = this;
      var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var rule2 = this.getRule(code, options2);
      if (!rule2) {
        return [];
      }
      if (this.shouldUseIntlApi()) {
        return rule2.resolvedOptions().pluralCategories.sort(function(pluralCategory1, pluralCategory2) {
          return suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2];
        }).map(function(pluralCategory) {
          return "".concat(_this.options.prepend).concat(pluralCategory);
        });
      }
      return rule2.numbers.map(function(number) {
        return _this.getSuffix(code, number, options2);
      });
    }
  }, {
    key: "getSuffix",
    value: function getSuffix(code, count) {
      var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var rule2 = this.getRule(code, options2);
      if (rule2) {
        if (this.shouldUseIntlApi()) {
          return "".concat(this.options.prepend).concat(rule2.select(count));
        }
        return this.getSuffixRetroCompatible(rule2, count);
      }
      this.logger.warn("no plural rule found for: ".concat(code));
      return "";
    }
  }, {
    key: "getSuffixRetroCompatible",
    value: function getSuffixRetroCompatible(rule2, count) {
      var _this2 = this;
      var idx = rule2.noAbs ? rule2.plurals(count) : rule2.plurals(Math.abs(count));
      var suffix = rule2.numbers[idx];
      if (this.options.simplifyPluralSuffix && rule2.numbers.length === 2 && rule2.numbers[0] === 1) {
        if (suffix === 2) {
          suffix = "plural";
        } else if (suffix === 1) {
          suffix = "";
        }
      }
      var returnSuffix = function returnSuffix2() {
        return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
      };
      if (this.options.compatibilityJSON === "v1") {
        if (suffix === 1)
          return "";
        if (typeof suffix === "number")
          return "_plural_".concat(suffix.toString());
        return returnSuffix();
      } else if (this.options.compatibilityJSON === "v2") {
        return returnSuffix();
      } else if (this.options.simplifyPluralSuffix && rule2.numbers.length === 2 && rule2.numbers[0] === 1) {
        return returnSuffix();
      }
      return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
    }
  }, {
    key: "shouldUseIntlApi",
    value: function shouldUseIntlApi() {
      return !deprecatedJsonVersions.includes(this.options.compatibilityJSON);
    }
  }]);
  return PluralResolver2;
}();
function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$3(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$3(Object(source2), true).forEach(function(key2) {
        _defineProperty(target, key2, source2[key2]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys$3(Object(source2)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source2, key2));
      });
    }
  }
  return target;
}
var Interpolator = function() {
  function Interpolator2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, Interpolator2);
    this.logger = baseLogger.create("interpolator");
    this.options = options2;
    this.format = options2.interpolation && options2.interpolation.format || function(value) {
      return value;
    };
    this.init(options2);
  }
  _createClass(Interpolator2, [{
    key: "init",
    value: function init2() {
      var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      if (!options2.interpolation)
        options2.interpolation = {
          escapeValue: true
        };
      var iOpts = options2.interpolation;
      this.escape = iOpts.escape !== void 0 ? iOpts.escape : escape$1;
      this.escapeValue = iOpts.escapeValue !== void 0 ? iOpts.escapeValue : true;
      this.useRawValueToEscape = iOpts.useRawValueToEscape !== void 0 ? iOpts.useRawValueToEscape : false;
      this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || "{{";
      this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || "}}";
      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ",";
      this.unescapePrefix = iOpts.unescapeSuffix ? "" : iOpts.unescapePrefix || "-";
      this.unescapeSuffix = this.unescapePrefix ? "" : iOpts.unescapeSuffix || "";
      this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape("$t(");
      this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(")");
      this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ",";
      this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1e3;
      this.alwaysFormat = iOpts.alwaysFormat !== void 0 ? iOpts.alwaysFormat : false;
      this.resetRegExp();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.options)
        this.init(this.options);
    }
  }, {
    key: "resetRegExp",
    value: function resetRegExp() {
      var regexpStr = "".concat(this.prefix, "(.+?)").concat(this.suffix);
      this.regexp = new RegExp(regexpStr, "g");
      var regexpUnescapeStr = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
      this.regexpUnescape = new RegExp(regexpUnescapeStr, "g");
      var nestingRegexpStr = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
      this.nestingRegexp = new RegExp(nestingRegexpStr, "g");
    }
  }, {
    key: "interpolate",
    value: function interpolate(str, data2, lng, options2) {
      var _this = this;
      var match;
      var value;
      var replaces;
      var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
      function regexSafe(val2) {
        return val2.replace(/\$/g, "$$$$");
      }
      var handleFormat = function handleFormat2(key2) {
        if (key2.indexOf(_this.formatSeparator) < 0) {
          var path2 = getPathWithDefaults(data2, defaultData, key2);
          return _this.alwaysFormat ? _this.format(path2, void 0, lng, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options2), data2), {}, {
            interpolationkey: key2
          })) : path2;
        }
        var p2 = key2.split(_this.formatSeparator);
        var k = p2.shift().trim();
        var f2 = p2.join(_this.formatSeparator).trim();
        return _this.format(getPathWithDefaults(data2, defaultData, k), f2, lng, _objectSpread$3(_objectSpread$3(_objectSpread$3({}, options2), data2), {}, {
          interpolationkey: k
        }));
      };
      this.resetRegExp();
      var missingInterpolationHandler = options2 && options2.missingInterpolationHandler || this.options.missingInterpolationHandler;
      var skipOnVariables = options2 && options2.interpolation && options2.interpolation.skipOnVariables !== void 0 ? options2.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
      var todos = [{
        regex: this.regexpUnescape,
        safeValue: function safeValue(val2) {
          return regexSafe(val2);
        }
      }, {
        regex: this.regexp,
        safeValue: function safeValue(val2) {
          return _this.escapeValue ? regexSafe(_this.escape(val2)) : regexSafe(val2);
        }
      }];
      todos.forEach(function(todo) {
        replaces = 0;
        while (match = todo.regex.exec(str)) {
          var matchedVar = match[1].trim();
          value = handleFormat(matchedVar);
          if (value === void 0) {
            if (typeof missingInterpolationHandler === "function") {
              var temp = missingInterpolationHandler(str, match, options2);
              value = typeof temp === "string" ? temp : "";
            } else if (options2 && options2.hasOwnProperty(matchedVar)) {
              value = "";
            } else if (skipOnVariables) {
              value = match[0];
              continue;
            } else {
              _this.logger.warn("missed to pass in variable ".concat(matchedVar, " for interpolating ").concat(str));
              value = "";
            }
          } else if (typeof value !== "string" && !_this.useRawValueToEscape) {
            value = makeString(value);
          }
          var safeValue = todo.safeValue(value);
          str = str.replace(match[0], safeValue);
          if (skipOnVariables) {
            todo.regex.lastIndex += value.length;
            todo.regex.lastIndex -= match[0].length;
          } else {
            todo.regex.lastIndex = 0;
          }
          replaces++;
          if (replaces >= _this.maxReplaces) {
            break;
          }
        }
      });
      return str;
    }
  }, {
    key: "nest",
    value: function nest(str, fc) {
      var _this2 = this;
      var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var match;
      var value;
      var clonedOptions = _objectSpread$3({}, options2);
      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;
      function handleHasOptions(key2, inheritedOptions) {
        var sep = this.nestingOptionsSeparator;
        if (key2.indexOf(sep) < 0)
          return key2;
        var c2 = key2.split(new RegExp("".concat(sep, "[ ]*{")));
        var optionsString = "{".concat(c2[1]);
        key2 = c2[0];
        optionsString = this.interpolate(optionsString, clonedOptions);
        var matchedSingleQuotes = optionsString.match(/'/g);
        var matchedDoubleQuotes = optionsString.match(/"/g);
        if (matchedSingleQuotes && matchedSingleQuotes.length % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
          optionsString = optionsString.replace(/'/g, '"');
        }
        try {
          clonedOptions = JSON.parse(optionsString);
          if (inheritedOptions)
            clonedOptions = _objectSpread$3(_objectSpread$3({}, inheritedOptions), clonedOptions);
        } catch (e2) {
          this.logger.warn("failed parsing options string in nesting for key ".concat(key2), e2);
          return "".concat(key2).concat(sep).concat(optionsString);
        }
        delete clonedOptions.defaultValue;
        return key2;
      }
      while (match = this.nestingRegexp.exec(str)) {
        var formatters = [];
        var doReduce = false;
        if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
          var r2 = match[1].split(this.formatSeparator).map(function(elem) {
            return elem.trim();
          });
          match[1] = r2.shift();
          formatters = r2;
          doReduce = true;
        }
        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
        if (value && match[0] === str && typeof value !== "string")
          return value;
        if (typeof value !== "string")
          value = makeString(value);
        if (!value) {
          this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
          value = "";
        }
        if (doReduce) {
          value = formatters.reduce(function(v, f2) {
            return _this2.format(v, f2, options2.lng, _objectSpread$3(_objectSpread$3({}, options2), {}, {
              interpolationkey: match[1].trim()
            }));
          }, value.trim());
        }
        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
      }
      return str;
    }
  }]);
  return Interpolator2;
}();
function ownKeys$4(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$4(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$4(Object(source2), true).forEach(function(key2) {
        _defineProperty(target, key2, source2[key2]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys$4(Object(source2)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source2, key2));
      });
    }
  }
  return target;
}
function parseFormatStr(formatStr) {
  var formatName = formatStr.toLowerCase().trim();
  var formatOptions = {};
  if (formatStr.indexOf("(") > -1) {
    var p2 = formatStr.split("(");
    formatName = p2[0].toLowerCase().trim();
    var optStr = p2[1].substring(0, p2[1].length - 1);
    if (formatName === "currency" && optStr.indexOf(":") < 0) {
      if (!formatOptions.currency)
        formatOptions.currency = optStr.trim();
    } else if (formatName === "relativetime" && optStr.indexOf(":") < 0) {
      if (!formatOptions.range)
        formatOptions.range = optStr.trim();
    } else {
      var opts = optStr.split(";");
      opts.forEach(function(opt) {
        if (!opt)
          return;
        var _opt$split = opt.split(":"), _opt$split2 = _toArray(_opt$split), key2 = _opt$split2[0], rest = _opt$split2.slice(1);
        var val2 = rest.join(":").trim().replace(/^'+|'+$/g, "");
        if (!formatOptions[key2.trim()])
          formatOptions[key2.trim()] = val2;
        if (val2 === "false")
          formatOptions[key2.trim()] = false;
        if (val2 === "true")
          formatOptions[key2.trim()] = true;
        if (!isNaN(val2))
          formatOptions[key2.trim()] = parseInt(val2, 10);
      });
    }
  }
  return {
    formatName,
    formatOptions
  };
}
function createCachedFormatter(fn) {
  var cache = {};
  return function invokeFormatter(val2, lng, options2) {
    var key2 = lng + JSON.stringify(options2);
    var formatter = cache[key2];
    if (!formatter) {
      formatter = fn(lng, options2);
      cache[key2] = formatter;
    }
    return formatter(val2);
  };
}
var Formatter = function() {
  function Formatter2() {
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, Formatter2);
    this.logger = baseLogger.create("formatter");
    this.options = options2;
    this.formats = {
      number: createCachedFormatter(function(lng, options3) {
        var formatter = new Intl.NumberFormat(lng, options3);
        return function(val2) {
          return formatter.format(val2);
        };
      }),
      currency: createCachedFormatter(function(lng, options3) {
        var formatter = new Intl.NumberFormat(lng, _objectSpread$4(_objectSpread$4({}, options3), {}, {
          style: "currency"
        }));
        return function(val2) {
          return formatter.format(val2);
        };
      }),
      datetime: createCachedFormatter(function(lng, options3) {
        var formatter = new Intl.DateTimeFormat(lng, _objectSpread$4({}, options3));
        return function(val2) {
          return formatter.format(val2);
        };
      }),
      relativetime: createCachedFormatter(function(lng, options3) {
        var formatter = new Intl.RelativeTimeFormat(lng, _objectSpread$4({}, options3));
        return function(val2) {
          return formatter.format(val2, options3.range || "day");
        };
      }),
      list: createCachedFormatter(function(lng, options3) {
        var formatter = new Intl.ListFormat(lng, _objectSpread$4({}, options3));
        return function(val2) {
          return formatter.format(val2);
        };
      })
    };
    this.init(options2);
  }
  _createClass(Formatter2, [{
    key: "init",
    value: function init2(services) {
      var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
        interpolation: {}
      };
      var iOpts = options2.interpolation;
      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ",";
    }
  }, {
    key: "add",
    value: function add(name2, fc) {
      this.formats[name2.toLowerCase().trim()] = fc;
    }
  }, {
    key: "addCached",
    value: function addCached(name2, fc) {
      this.formats[name2.toLowerCase().trim()] = createCachedFormatter(fc);
    }
  }, {
    key: "format",
    value: function format(value, _format, lng, options2) {
      var _this = this;
      var formats = _format.split(this.formatSeparator);
      var result2 = formats.reduce(function(mem, f2) {
        var _parseFormatStr = parseFormatStr(f2), formatName = _parseFormatStr.formatName, formatOptions = _parseFormatStr.formatOptions;
        if (_this.formats[formatName]) {
          var formatted = mem;
          try {
            var valOptions = options2 && options2.formatParams && options2.formatParams[options2.interpolationkey] || {};
            var l2 = valOptions.locale || valOptions.lng || options2.locale || options2.lng || lng;
            formatted = _this.formats[formatName](mem, l2, _objectSpread$4(_objectSpread$4(_objectSpread$4({}, formatOptions), options2), valOptions));
          } catch (error2) {
            _this.logger.warn(error2);
          }
          return formatted;
        } else {
          _this.logger.warn("there was no format function for ".concat(formatName));
        }
        return mem;
      }, value);
      return result2;
    }
  }]);
  return Formatter2;
}();
function ownKeys$5(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$5(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$5(Object(source2), true).forEach(function(key2) {
        _defineProperty(target, key2, source2[key2]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys$5(Object(source2)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source2, key2));
      });
    }
  }
  return target;
}
function _createSuper$2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result2;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result2 = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result2 = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result2);
  };
}
function _isNativeReflectConstruct$2() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function removePending(q, name2) {
  if (q.pending[name2] !== void 0) {
    delete q.pending[name2];
    q.pendingCount--;
  }
}
var Connector = function(_EventEmitter) {
  _inherits(Connector2, _EventEmitter);
  var _super = _createSuper$2(Connector2);
  function Connector2(backend, store, services) {
    var _this;
    var options2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    _classCallCheck(this, Connector2);
    _this = _super.call(this);
    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }
    _this.backend = backend;
    _this.store = store;
    _this.services = services;
    _this.languageUtils = services.languageUtils;
    _this.options = options2;
    _this.logger = baseLogger.create("backendConnector");
    _this.waitingReads = [];
    _this.maxParallelReads = options2.maxParallelReads || 10;
    _this.readingCalls = 0;
    _this.maxRetries = options2.maxRetries >= 0 ? options2.maxRetries : 5;
    _this.retryTimeout = options2.retryTimeout >= 1 ? options2.retryTimeout : 350;
    _this.state = {};
    _this.queue = [];
    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options2.backend, options2);
    }
    return _this;
  }
  _createClass(Connector2, [{
    key: "queueLoad",
    value: function queueLoad(languages, namespaces, options2, callback) {
      var _this2 = this;
      var toLoad = {};
      var pending = {};
      var toLoadLanguages = {};
      var toLoadNamespaces = {};
      languages.forEach(function(lng) {
        var hasAllNamespaces = true;
        namespaces.forEach(function(ns) {
          var name2 = "".concat(lng, "|").concat(ns);
          if (!options2.reload && _this2.store.hasResourceBundle(lng, ns)) {
            _this2.state[name2] = 2;
          } else if (_this2.state[name2] < 0)
            ;
          else if (_this2.state[name2] === 1) {
            if (pending[name2] === void 0)
              pending[name2] = true;
          } else {
            _this2.state[name2] = 1;
            hasAllNamespaces = false;
            if (pending[name2] === void 0)
              pending[name2] = true;
            if (toLoad[name2] === void 0)
              toLoad[name2] = true;
            if (toLoadNamespaces[ns] === void 0)
              toLoadNamespaces[ns] = true;
          }
        });
        if (!hasAllNamespaces)
          toLoadLanguages[lng] = true;
      });
      if (Object.keys(toLoad).length || Object.keys(pending).length) {
        this.queue.push({
          pending,
          pendingCount: Object.keys(pending).length,
          loaded: {},
          errors: [],
          callback
        });
      }
      return {
        toLoad: Object.keys(toLoad),
        pending: Object.keys(pending),
        toLoadLanguages: Object.keys(toLoadLanguages),
        toLoadNamespaces: Object.keys(toLoadNamespaces)
      };
    }
  }, {
    key: "loaded",
    value: function loaded(name2, err, data2) {
      var s2 = name2.split("|");
      var lng = s2[0];
      var ns = s2[1];
      if (err)
        this.emit("failedLoading", lng, ns, err);
      if (data2) {
        this.store.addResourceBundle(lng, ns, data2);
      }
      this.state[name2] = err ? -1 : 2;
      var loaded2 = {};
      this.queue.forEach(function(q) {
        pushPath(q.loaded, [lng], ns);
        removePending(q, name2);
        if (err)
          q.errors.push(err);
        if (q.pendingCount === 0 && !q.done) {
          Object.keys(q.loaded).forEach(function(l2) {
            if (!loaded2[l2])
              loaded2[l2] = {};
            var loadedKeys = q.loaded[l2];
            if (loadedKeys.length) {
              loadedKeys.forEach(function(ns2) {
                if (loaded2[l2][ns2] === void 0)
                  loaded2[l2][ns2] = true;
              });
            }
          });
          q.done = true;
          if (q.errors.length) {
            q.callback(q.errors);
          } else {
            q.callback();
          }
        }
      });
      this.emit("loaded", loaded2);
      this.queue = this.queue.filter(function(q) {
        return !q.done;
      });
    }
  }, {
    key: "read",
    value: function read(lng, ns, fcName) {
      var _this3 = this;
      var tried = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
      var wait = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout;
      var callback = arguments.length > 5 ? arguments[5] : void 0;
      if (!lng.length)
        return callback(null, {});
      if (this.readingCalls >= this.maxParallelReads) {
        this.waitingReads.push({
          lng,
          ns,
          fcName,
          tried,
          wait,
          callback
        });
        return;
      }
      this.readingCalls++;
      return this.backend[fcName](lng, ns, function(err, data2) {
        _this3.readingCalls--;
        if (_this3.waitingReads.length > 0) {
          var next = _this3.waitingReads.shift();
          _this3.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
        }
        if (err && data2 && tried < _this3.maxRetries) {
          setTimeout(function() {
            _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
          }, wait);
          return;
        }
        callback(err, data2);
      });
    }
  }, {
    key: "prepareLoading",
    value: function prepareLoading(languages, namespaces) {
      var _this4 = this;
      var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var callback = arguments.length > 3 ? arguments[3] : void 0;
      if (!this.backend) {
        this.logger.warn("No backend was added via i18next.use. Will not load resources.");
        return callback && callback();
      }
      if (typeof languages === "string")
        languages = this.languageUtils.toResolveHierarchy(languages);
      if (typeof namespaces === "string")
        namespaces = [namespaces];
      var toLoad = this.queueLoad(languages, namespaces, options2, callback);
      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length)
          callback();
        return null;
      }
      toLoad.toLoad.forEach(function(name2) {
        _this4.loadOne(name2);
      });
    }
  }, {
    key: "load",
    value: function load(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {}, callback);
    }
  }, {
    key: "reload",
    value: function reload(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {
        reload: true
      }, callback);
    }
  }, {
    key: "loadOne",
    value: function loadOne(name2) {
      var _this5 = this;
      var prefix = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
      var s2 = name2.split("|");
      var lng = s2[0];
      var ns = s2[1];
      this.read(lng, ns, "read", void 0, void 0, function(err, data2) {
        if (err)
          _this5.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
        if (!err && data2)
          _this5.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data2);
        _this5.loaded(name2, err, data2);
      });
    }
  }, {
    key: "saveMissing",
    value: function saveMissing(languages, namespace, key2, fallbackValue, isUpdate) {
      var options2 = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {};
      if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
        this.logger.warn('did not save key "'.concat(key2, '" as the namespace "').concat(namespace, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
        return;
      }
      if (key2 === void 0 || key2 === null || key2 === "")
        return;
      if (this.backend && this.backend.create) {
        this.backend.create(languages, namespace, key2, fallbackValue, null, _objectSpread$5(_objectSpread$5({}, options2), {}, {
          isUpdate
        }));
      }
      if (!languages || !languages[0])
        return;
      this.store.addResource(languages[0], namespace, key2, fallbackValue);
    }
  }]);
  return Connector2;
}(EventEmitter);
function get() {
  return {
    debug: false,
    initImmediate: true,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: "all",
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: "fallback",
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: true,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle2(args) {
      var ret = {};
      if (_typeof(args[1]) === "object")
        ret = args[1];
      if (typeof args[1] === "string")
        ret.defaultValue = args[1];
      if (typeof args[2] === "string")
        ret.tDescription = args[2];
      if (_typeof(args[2]) === "object" || _typeof(args[3]) === "object") {
        var options2 = args[3] || args[2];
        Object.keys(options2).forEach(function(key2) {
          ret[key2] = options2[key2];
        });
      }
      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng, options2) {
        return value;
      },
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: true
    }
  };
}
function transformOptions(options2) {
  if (typeof options2.ns === "string")
    options2.ns = [options2.ns];
  if (typeof options2.fallbackLng === "string")
    options2.fallbackLng = [options2.fallbackLng];
  if (typeof options2.fallbackNS === "string")
    options2.fallbackNS = [options2.fallbackNS];
  if (options2.supportedLngs && options2.supportedLngs.indexOf("cimode") < 0) {
    options2.supportedLngs = options2.supportedLngs.concat(["cimode"]);
  }
  return options2;
}
function ownKeys$6(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread$6(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source2 = arguments[i2] != null ? arguments[i2] : {};
    if (i2 % 2) {
      ownKeys$6(Object(source2), true).forEach(function(key2) {
        _defineProperty(target, key2, source2[key2]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source2));
    } else {
      ownKeys$6(Object(source2)).forEach(function(key2) {
        Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source2, key2));
      });
    }
  }
  return target;
}
function _createSuper$3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$3();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result2;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result2 = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result2 = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result2);
  };
}
function _isNativeReflectConstruct$3() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e2) {
    return false;
  }
}
function noop() {
}
function bindMemberFunctions(inst) {
  var mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
  mems.forEach(function(mem) {
    if (typeof inst[mem] === "function") {
      inst[mem] = inst[mem].bind(inst);
    }
  });
}
var I18n = function(_EventEmitter) {
  _inherits(I18n2, _EventEmitter);
  var _super = _createSuper$3(I18n2);
  function I18n2() {
    var _this;
    var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : void 0;
    _classCallCheck(this, I18n2);
    _this = _super.call(this);
    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }
    _this.options = transformOptions(options2);
    _this.services = {};
    _this.logger = baseLogger;
    _this.modules = {
      external: []
    };
    bindMemberFunctions(_assertThisInitialized(_this));
    if (callback && !_this.isInitialized && !options2.isClone) {
      if (!_this.options.initImmediate) {
        _this.init(options2, callback);
        return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
      }
      setTimeout(function() {
        _this.init(options2, callback);
      }, 0);
    }
    return _this;
  }
  _createClass(I18n2, [{
    key: "init",
    value: function init2() {
      var _this2 = this;
      var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : void 0;
      if (typeof options2 === "function") {
        callback = options2;
        options2 = {};
      }
      if (!options2.defaultNS && options2.defaultNS !== false && options2.ns) {
        if (typeof options2.ns === "string") {
          options2.defaultNS = options2.ns;
        } else if (options2.ns.indexOf("translation") < 0) {
          options2.defaultNS = options2.ns[0];
        }
      }
      var defOpts = get();
      this.options = _objectSpread$6(_objectSpread$6(_objectSpread$6({}, defOpts), this.options), transformOptions(options2));
      if (this.options.compatibilityAPI !== "v1") {
        this.options.interpolation = _objectSpread$6(_objectSpread$6({}, defOpts.interpolation), this.options.interpolation);
      }
      if (options2.keySeparator !== void 0) {
        this.options.userDefinedKeySeparator = options2.keySeparator;
      }
      if (options2.nsSeparator !== void 0) {
        this.options.userDefinedNsSeparator = options2.nsSeparator;
      }
      function createClassOnDemand(ClassOrObject) {
        if (!ClassOrObject)
          return null;
        if (typeof ClassOrObject === "function")
          return new ClassOrObject();
        return ClassOrObject;
      }
      if (!this.options.isClone) {
        if (this.modules.logger) {
          baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          baseLogger.init(null, this.options);
        }
        var formatter;
        if (this.modules.formatter) {
          formatter = this.modules.formatter;
        } else if (typeof Intl !== "undefined") {
          formatter = Formatter;
        }
        var lu = new LanguageUtil(this.options);
        this.store = new ResourceStore(this.options.resources, this.options);
        var s2 = this.services;
        s2.logger = baseLogger;
        s2.resourceStore = this.store;
        s2.languageUtils = lu;
        s2.pluralResolver = new PluralResolver(lu, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        });
        if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
          s2.formatter = createClassOnDemand(formatter);
          s2.formatter.init(s2, this.options);
          this.options.interpolation.format = s2.formatter.format.bind(s2.formatter);
        }
        s2.interpolator = new Interpolator(this.options);
        s2.utils = {
          hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
        };
        s2.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s2.resourceStore, s2, this.options);
        s2.backendConnector.on("*", function(event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          _this2.emit.apply(_this2, [event].concat(args));
        });
        if (this.modules.languageDetector) {
          s2.languageDetector = createClassOnDemand(this.modules.languageDetector);
          s2.languageDetector.init(s2, this.options.detection, this.options);
        }
        if (this.modules.i18nFormat) {
          s2.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
          if (s2.i18nFormat.init)
            s2.i18nFormat.init(this);
        }
        this.translator = new Translator(this.services, this.options);
        this.translator.on("*", function(event) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          _this2.emit.apply(_this2, [event].concat(args));
        });
        this.modules.external.forEach(function(m) {
          if (m.init)
            m.init(_this2);
        });
      }
      this.format = this.options.interpolation.format;
      if (!callback)
        callback = noop;
      if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
        var codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        if (codes.length > 0 && codes[0] !== "dev")
          this.options.lng = codes[0];
      }
      if (!this.services.languageDetector && !this.options.lng) {
        this.logger.warn("init: no languageDetector is used and no lng is defined");
      }
      var storeApi = ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"];
      storeApi.forEach(function(fcName) {
        _this2[fcName] = function() {
          var _this2$store;
          return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
        };
      });
      var storeApiChained = ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"];
      storeApiChained.forEach(function(fcName) {
        _this2[fcName] = function() {
          var _this2$store2;
          (_this2$store2 = _this2.store)[fcName].apply(_this2$store2, arguments);
          return _this2;
        };
      });
      var deferred = defer();
      var load = function load2() {
        var finish = function finish2(err, t2) {
          if (_this2.isInitialized && !_this2.initializedStoreOnce)
            _this2.logger.warn("init: i18next is already initialized. You should call init just once!");
          _this2.isInitialized = true;
          if (!_this2.options.isClone)
            _this2.logger.log("initialized", _this2.options);
          _this2.emit("initialized", _this2.options);
          deferred.resolve(t2);
          callback(err, t2);
        };
        if (_this2.languages && _this2.options.compatibilityAPI !== "v1" && !_this2.isInitialized)
          return finish(null, _this2.t.bind(_this2));
        _this2.changeLanguage(_this2.options.lng, finish);
      };
      if (this.options.resources || !this.options.initImmediate) {
        load();
      } else {
        setTimeout(load, 0);
      }
      return deferred;
    }
  }, {
    key: "loadResources",
    value: function loadResources2(language) {
      var _this3 = this;
      var callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
      var usedCallback = callback;
      var usedLng = typeof language === "string" ? language : this.language;
      if (typeof language === "function")
        usedCallback = language;
      if (!this.options.resources || this.options.partialBundledLanguages) {
        if (usedLng && usedLng.toLowerCase() === "cimode")
          return usedCallback();
        var toLoad = [];
        var append = function append2(lng) {
          if (!lng)
            return;
          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
          lngs.forEach(function(l2) {
            if (toLoad.indexOf(l2) < 0)
              toLoad.push(l2);
          });
        };
        if (!usedLng) {
          var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          fallbacks.forEach(function(l2) {
            return append(l2);
          });
        } else {
          append(usedLng);
        }
        if (this.options.preload) {
          this.options.preload.forEach(function(l2) {
            return append(l2);
          });
        }
        this.services.backendConnector.load(toLoad, this.options.ns, function(e2) {
          if (!e2 && !_this3.resolvedLanguage && _this3.language)
            _this3.setResolvedLanguage(_this3.language);
          usedCallback(e2);
        });
      } else {
        usedCallback(null);
      }
    }
  }, {
    key: "reloadResources",
    value: function reloadResources2(lngs, ns, callback) {
      var deferred = defer();
      if (!lngs)
        lngs = this.languages;
      if (!ns)
        ns = this.options.ns;
      if (!callback)
        callback = noop;
      this.services.backendConnector.reload(lngs, ns, function(err) {
        deferred.resolve();
        callback(err);
      });
      return deferred;
    }
  }, {
    key: "use",
    value: function use2(module) {
      if (!module)
        throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
      if (!module.type)
        throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
      if (module.type === "backend") {
        this.modules.backend = module;
      }
      if (module.type === "logger" || module.log && module.warn && module.error) {
        this.modules.logger = module;
      }
      if (module.type === "languageDetector") {
        this.modules.languageDetector = module;
      }
      if (module.type === "i18nFormat") {
        this.modules.i18nFormat = module;
      }
      if (module.type === "postProcessor") {
        postProcessor.addPostProcessor(module);
      }
      if (module.type === "formatter") {
        this.modules.formatter = module;
      }
      if (module.type === "3rdParty") {
        this.modules.external.push(module);
      }
      return this;
    }
  }, {
    key: "setResolvedLanguage",
    value: function setResolvedLanguage(l2) {
      if (!l2 || !this.languages)
        return;
      if (["cimode", "dev"].indexOf(l2) > -1)
        return;
      for (var li = 0; li < this.languages.length; li++) {
        var lngInLngs = this.languages[li];
        if (["cimode", "dev"].indexOf(lngInLngs) > -1)
          continue;
        if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
          this.resolvedLanguage = lngInLngs;
          break;
        }
      }
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage2(lng, callback) {
      var _this4 = this;
      this.isLanguageChangingTo = lng;
      var deferred = defer();
      this.emit("languageChanging", lng);
      var setLngProps = function setLngProps2(l2) {
        _this4.language = l2;
        _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l2);
        _this4.resolvedLanguage = void 0;
        _this4.setResolvedLanguage(l2);
      };
      var done = function done2(err, l2) {
        if (l2) {
          setLngProps(l2);
          _this4.translator.changeLanguage(l2);
          _this4.isLanguageChangingTo = void 0;
          _this4.emit("languageChanged", l2);
          _this4.logger.log("languageChanged", l2);
        } else {
          _this4.isLanguageChangingTo = void 0;
        }
        deferred.resolve(function() {
          return _this4.t.apply(_this4, arguments);
        });
        if (callback)
          callback(err, function() {
            return _this4.t.apply(_this4, arguments);
          });
      };
      var setLng = function setLng2(lngs) {
        if (!lng && !lngs && _this4.services.languageDetector)
          lngs = [];
        var l2 = typeof lngs === "string" ? lngs : _this4.services.languageUtils.getBestMatchFromCodes(lngs);
        if (l2) {
          if (!_this4.language) {
            setLngProps(l2);
          }
          if (!_this4.translator.language)
            _this4.translator.changeLanguage(l2);
          if (_this4.services.languageDetector)
            _this4.services.languageDetector.cacheUserLanguage(l2);
        }
        _this4.loadResources(l2, function(err) {
          done(err, l2);
        });
      };
      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
        setLng(this.services.languageDetector.detect());
      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
        this.services.languageDetector.detect(setLng);
      } else {
        setLng(lng);
      }
      return deferred;
    }
  }, {
    key: "getFixedT",
    value: function getFixedT2(lng, ns, keyPrefix) {
      var _this5 = this;
      var fixedT = function fixedT2(key2, opts) {
        var options2;
        if (_typeof(opts) !== "object") {
          for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }
          options2 = _this5.options.overloadTranslationOptionHandler([key2, opts].concat(rest));
        } else {
          options2 = _objectSpread$6({}, opts);
        }
        options2.lng = options2.lng || fixedT2.lng;
        options2.lngs = options2.lngs || fixedT2.lngs;
        options2.ns = options2.ns || fixedT2.ns;
        options2.keyPrefix = options2.keyPrefix || keyPrefix || fixedT2.keyPrefix;
        var keySeparator = _this5.options.keySeparator || ".";
        var resultKey = options2.keyPrefix ? "".concat(options2.keyPrefix).concat(keySeparator).concat(key2) : key2;
        return _this5.t(resultKey, options2);
      };
      if (typeof lng === "string") {
        fixedT.lng = lng;
      } else {
        fixedT.lngs = lng;
      }
      fixedT.ns = ns;
      fixedT.keyPrefix = keyPrefix;
      return fixedT;
    }
  }, {
    key: "t",
    value: function t2() {
      var _this$translator;
      return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
    }
  }, {
    key: "exists",
    value: function exists2() {
      var _this$translator2;
      return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
    }
  }, {
    key: "setDefaultNamespace",
    value: function setDefaultNamespace2(ns) {
      this.options.defaultNS = ns;
    }
  }, {
    key: "hasLoadedNamespace",
    value: function hasLoadedNamespace2(ns) {
      var _this6 = this;
      var options2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (!this.isInitialized) {
        this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages);
        return false;
      }
      if (!this.languages || !this.languages.length) {
        this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages);
        return false;
      }
      var lng = this.resolvedLanguage || this.languages[0];
      var fallbackLng = this.options ? this.options.fallbackLng : false;
      var lastLng = this.languages[this.languages.length - 1];
      if (lng.toLowerCase() === "cimode")
        return true;
      var loadNotPending = function loadNotPending2(l2, n2) {
        var loadState = _this6.services.backendConnector.state["".concat(l2, "|").concat(n2)];
        return loadState === -1 || loadState === 2;
      };
      if (options2.precheck) {
        var preResult = options2.precheck(this, loadNotPending);
        if (preResult !== void 0)
          return preResult;
      }
      if (this.hasResourceBundle(lng, ns))
        return true;
      if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages)
        return true;
      if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns)))
        return true;
      return false;
    }
  }, {
    key: "loadNamespaces",
    value: function loadNamespaces2(ns, callback) {
      var _this7 = this;
      var deferred = defer();
      if (!this.options.ns) {
        callback && callback();
        return Promise.resolve();
      }
      if (typeof ns === "string")
        ns = [ns];
      ns.forEach(function(n2) {
        if (_this7.options.ns.indexOf(n2) < 0)
          _this7.options.ns.push(n2);
      });
      this.loadResources(function(err) {
        deferred.resolve();
        if (callback)
          callback(err);
      });
      return deferred;
    }
  }, {
    key: "loadLanguages",
    value: function loadLanguages2(lngs, callback) {
      var deferred = defer();
      if (typeof lngs === "string")
        lngs = [lngs];
      var preloaded = this.options.preload || [];
      var newLngs = lngs.filter(function(lng) {
        return preloaded.indexOf(lng) < 0;
      });
      if (!newLngs.length) {
        if (callback)
          callback();
        return Promise.resolve();
      }
      this.options.preload = preloaded.concat(newLngs);
      this.loadResources(function(err) {
        deferred.resolve();
        if (callback)
          callback(err);
      });
      return deferred;
    }
  }, {
    key: "dir",
    value: function dir(lng) {
      if (!lng)
        lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
      if (!lng)
        return "rtl";
      var rtlLngs = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"];
      return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
    }
  }, {
    key: "cloneInstance",
    value: function cloneInstance() {
      var _this8 = this;
      var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
      var mergedOptions = _objectSpread$6(_objectSpread$6(_objectSpread$6({}, this.options), options2), {
        isClone: true
      });
      var clone = new I18n2(mergedOptions);
      if (options2.debug !== void 0 || options2.prefix !== void 0) {
        clone.logger = clone.logger.clone(options2);
      }
      var membersToCopy = ["store", "services", "language"];
      membersToCopy.forEach(function(m) {
        clone[m] = _this8[m];
      });
      clone.services = _objectSpread$6({}, this.services);
      clone.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      clone.translator = new Translator(clone.services, clone.options);
      clone.translator.on("*", function(event) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }
        clone.emit.apply(clone, [event].concat(args));
      });
      clone.init(mergedOptions, callback);
      clone.translator.options = clone.options;
      clone.translator.backendConnector.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      return clone;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        options: this.options,
        store: this.store,
        language: this.language,
        languages: this.languages,
        resolvedLanguage: this.resolvedLanguage
      };
    }
  }]);
  return I18n2;
}(EventEmitter);
_defineProperty(I18n, "createInstance", function() {
  var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var callback = arguments.length > 1 ? arguments[1] : void 0;
  return new I18n(options2, callback);
});
var instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;
var createInstance = instance.createInstance;
var init = instance.init;
var loadResources = instance.loadResources;
var reloadResources = instance.reloadResources;
var use = instance.use;
var changeLanguage = instance.changeLanguage;
var getFixedT = instance.getFixedT;
var t = instance.t;
var exists = instance.exists;
var setDefaultNamespace = instance.setDefaultNamespace;
var hasLoadedNamespace = instance.hasLoadedNamespace;
var loadNamespaces = instance.loadNamespaces;
var loadLanguages = instance.loadLanguages;
class i18nService {
  constructor(service) {
    this.service = service;
    this.loadedLanguages = [];
    this.i18next = instance;
  }
  init() {
    instance.init({
      interpolation: {
        prefix: "{",
        suffix: "}"
      }
    });
    return this.reset(this.service.options.locale || "en");
  }
  /**
   * 重设语言
   * @param langCode 语言代码
   */
  reset(langCode) {
    return new Promise((resolve2, reject2) => {
      console.log(instance.language);
      if (instance.language !== langCode) {
        if (!this.loadedLanguages.includes(langCode)) {
          $.getJSON(`${API.host}/i18n/${langCode}.json`).done((result2) => {
            instance.addResourceBundle(
              langCode,
              "translation",
              result2.words,
              true,
              true
            );
            this.loadedLanguages.push(langCode);
            instance.changeLanguage(langCode).then(() => {
              resolve2(langCode);
            });
          }).fail((e2) => {
            if (langCode != "en") {
              this.reset("en").then(() => {
                resolve2(langCode);
              });
              return;
            }
            reject2(e2);
          });
          return;
        }
        instance.changeLanguage(langCode).then(() => {
          resolve2(langCode);
        });
        return;
      }
      resolve2(langCode);
    });
  }
  t(key2, options2) {
    return instance.t(key2, options2);
  }
  add(resource) {
    return new Promise((resolve2, reject2) => {
      if (resource.name && resource.code) {
        if (this.loadedLanguages.includes(resource.code)) {
          reject2();
        } else {
          instance.addResourceBundle(
            resource.code,
            "translation",
            resource.words,
            true,
            true
          );
          this.loadedLanguages.push(resource.code);
          instance.changeLanguage(resource.code).then(() => {
            resolve2(resource.code);
          });
        }
      } else {
        reject2();
      }
    });
  }
  /**
   * 替换已有语言资源
   * @param resource 语言资源内容
   */
  replace(resource) {
    return new Promise((resolve2, reject2) => {
      if (resource.name && resource.code) {
        if (this.loadedLanguages.includes(resource.code)) {
          instance.addResourceBundle(
            resource.code,
            "translation",
            resource.words,
            true,
            true
          );
          instance.changeLanguage(resource.code).then(() => {
            resolve2(resource.code);
          });
        }
      } else {
        reject2();
      }
    });
  }
}
class DownloadQuene {
  constructor(service) {
    this.service = service;
    this.queues = [];
    this.isRunning = false;
    this.timer = void 0;
    this.successCount = 0;
    this.failedCount = 0;
  }
  /**
   * 添加下载对列
   * @param options
   */
  add(options2) {
    if (Array.isArray(options2)) {
      this.queues.push(...options2);
    } else {
      this.queues.push(options2);
    }
    return this;
  }
  /**
   * 执行下载队列
   */
  run() {
    if (this.isRunning) {
      return this;
    }
    clearTimeout(this.timer);
    const queue = this.queues.shift();
    if (queue) {
      this.isRunning = true;
      const timout = (this.service.options.batchDownloadInterval || 0) * 1e3;
      const sender = queue.clientId ? this.service.controller.sendTorrentToClient : this.service.controller.sendTorrentToDefaultClient;
      sender.call(this.service.controller, queue).then(() => {
        this.successCount++;
      }).catch((error2) => {
        console.log(error2);
        this.failedCount++;
      }).finally(() => {
        this.isRunning = false;
        if (timout > 0) {
          this.timer = window.setTimeout(() => {
            this.run();
          }, timout);
        } else {
          this.run();
        }
      });
    } else {
      PPF.showNotifications(
        {
          message: this.service.i18n.t(
            "service.controller.downloadTaskIsCompleted",
            {
              success: this.successCount,
              failed: this.failedCount
            }
          )
        },
        1e4
      );
      this.successCount = 0;
      this.failedCount = 0;
    }
    return this;
  }
}
class Collection {
  constructor() {
    this.items = [];
    this.groups = [];
    this.storage = new localStorage();
    this.movieInfoService = new MovieInfoService();
    this.configKey = EConfigKey.collection;
    this.load();
  }
  /**
   * 获取收藏历史记录
   */
  load(groupId) {
    return new Promise((resolve2, reject2) => {
      this.storage.get(this.configKey, (result2) => {
        let data2 = {
          groups: [],
          items: []
        };
        if (Array.isArray(result2)) {
          data2.items = result2;
        } else if (result2) {
          data2 = Object.assign(data2, result2);
        }
        this.groups = data2.groups || [];
        this.items = data2.items || [];
        let _result = [];
        if (groupId) {
          this.items.forEach((item) => {
            if (item.groups && item.groups.includes(groupId)) {
              _result.push(item);
            }
          });
        } else {
          _result = this.items;
        }
        this.updateGroupCount();
        resolve2(_result);
      });
    });
  }
  updateGroupCount() {
    this.groups.forEach((group) => {
      group.count = 0;
      this.items.forEach((item) => {
        if (item.groups && group.id && item.groups.includes(group.id)) {
          if (!group.count) {
            group.count = 0;
          }
          group.count++;
        }
      });
    });
  }
  /**
   * 添加新记录
   * @param newItem
   */
  add(newItem) {
    return new Promise((resolve2, reject2) => {
      let saveData = Object.assign(
        {
          time: (/* @__PURE__ */ new Date()).getTime(),
          site: null
        },
        newItem
      );
      let movieInfo = Object.assign({}, saveData.movieInfo);
      if (saveData.site) {
        delete saveData.site;
      }
      saveData.link = PPF.getCleaningURL(saveData.link);
      if (movieInfo.imdbId || movieInfo.doubanId) {
        this.getMoviceInfo(movieInfo.imdbId, movieInfo.doubanId).then((result2) => {
          saveData.movieInfo = result2;
          this.push(saveData);
          resolve2(this.items);
        }).catch((error2) => {
          console.log(error2);
          this.push(saveData);
          resolve2(this.items);
        });
      } else {
        this.push(saveData);
        resolve2(this.items);
      }
    });
  }
  getMoviceInfo(imdbId = "", doubanId = "") {
    return new Promise((resolve2, reject2) => {
      let movieId = imdbId;
      let fn = this.movieInfoService.getInfoFromIMDb;
      if (doubanId) {
        movieId = doubanId;
        fn = this.movieInfoService.getInfoFromDoubanId;
      }
      fn.call(this.movieInfoService, movieId).then((result2) => {
        let movieInfo = {
          imdbId,
          doubanId: result2.id.toString().replace(/(\D)/g, ""),
          image: result2.image || (result2.images ? result2.images.small : void 0),
          title: result2.title,
          link: result2.mobile_link || result2.share_url,
          alt_title: result2.alt_title || result2.original_title,
          year: result2.year
        };
        if (!result2.year && result2.attrs) {
          movieInfo.year = result2.attrs.year[0];
        }
        resolve2(movieInfo);
      }).catch((error2) => {
        reject2();
      });
    });
  }
  push(newItem) {
    let index2 = this.items.findIndex((item) => {
      return item.link === newItem.link;
    });
    if (index2 === -1) {
      this.items.push(newItem);
      this.updateGroupCount();
      this.storage.set(this.configKey, {
        groups: this.groups,
        items: this.items
      });
    }
  }
  /**
   * 更新指定的记录
   * @param item
   */
  update(item) {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        item.link = PPF.getCleaningURL(item.link);
        let index2 = this.items.findIndex((data2) => {
          return data2.link === item.link;
        });
        if (index2 >= 0) {
          this.items[index2] = item;
          let movieInfo = Object.assign({}, item.movieInfo);
          if (item.site) {
            delete item.site;
          }
          if (movieInfo.imdbId || movieInfo.doubanId) {
            this.getMoviceInfo(movieInfo.imdbId, movieInfo.doubanId).then((result2) => {
              item.movieInfo = result2;
              this.items[index2] = item;
              this.updateData();
              resolve2(this.items);
            }).catch((error2) => {
              console.log(error2);
              this.updateData();
              resolve2(this.items);
            });
            return;
          }
        }
        this.updateData();
        resolve2(this.items);
      });
    });
  }
  updateData() {
    this.updateGroupCount();
    this.storage.set(this.configKey, {
      groups: this.groups,
      items: this.items
    });
  }
  /**
   * 删除单个记录
   * @param item
   */
  delete(item) {
    return this.remove([item]);
  }
  /**
   * 删除历史记录
   * @param items 需要删除的列表
   */
  remove(items) {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        for (let index2 = this.items.length - 1; index2 >= 0; index2--) {
          let item = this.items[index2];
          let findIndex = items.findIndex((data2) => {
            return data2.link === item.link;
          });
          if (findIndex >= 0) {
            this.items.splice(index2, 1);
          }
        }
        this.updateGroupCount();
        this.storage.set(this.configKey, {
          groups: this.groups,
          items: this.items
        });
        resolve2(this.items);
      });
    });
  }
  /**
   * 清除历史记录
   */
  clear() {
    return new Promise((resolve2, reject2) => {
      this.items = [];
      this.groups = [];
      this.storage.set(this.configKey, {});
      resolve2({});
    });
  }
  /**
   * 获取指定链接的收藏
   * @param link
   */
  get(link) {
    return new Promise((resolve2, reject2) => {
      link = PPF.getCleaningURL(link);
      this.load().then(() => {
        let item = this.items.find((data2) => {
          return data2.link === link;
        });
        if (item) {
          resolve2(item);
        } else {
          reject2(false);
        }
      });
    });
  }
  /**
   * 重置
   * @param datas
   */
  reset(datas) {
    return new Promise((resolve2, reject2) => {
      if (!datas) {
        reject2(false);
        return;
      }
      if (Array.isArray(datas)) {
        this.items = datas;
      } else {
        this.groups = datas.groups || this.groups;
        this.items = datas.items || this.items;
      }
      this.storage.set(this.configKey, {
        groups: this.groups,
        items: this.items
      });
      resolve2({
        groups: this.groups,
        items: this.items
      });
    });
  }
  /**
   * 添加分组
   * @param newItem
   */
  addGroup(newItem) {
    return new Promise((resolve2, reject2) => {
      let saveData = Object.assign(
        {
          id: PPF.getNewId().substr(0, 8),
          update: (/* @__PURE__ */ new Date()).getTime()
        },
        newItem
      );
      this.groups.push(saveData);
      this.storage.set(this.configKey, {
        groups: this.groups,
        items: this.items
      });
      resolve2(this.groups);
    });
  }
  /**
   * 删除分组信息
   * @param items 需要删除的列表
   */
  removeGroup(datas) {
    return new Promise((resolve2, reject2) => {
      let items = [];
      if (Array.isArray(datas)) {
        items = datas;
      } else {
        items.push(datas);
      }
      this.load().then(() => {
        for (let index2 = this.groups.length - 1; index2 >= 0; index2--) {
          let group = this.groups[index2];
          let findIndex = items.findIndex((data2) => {
            return data2.id === group.id;
          });
          if (findIndex >= 0) {
            this.items.forEach((item) => {
              if (!item.groups) {
                return;
              }
              let index22 = item.groups.findIndex((id) => {
                return id === group.id;
              });
              if (index22 !== -1) {
                item.groups.splice(index22, 1);
              }
            });
            this.groups.splice(index2, 1);
          }
        }
        this.updateGroupCount();
        this.storage.set(this.configKey, {
          groups: this.groups,
          items: this.items
        });
        resolve2(this.groups);
      });
    });
  }
  /**
   * 更新指定的分组信息
   * @param item
   */
  updateGroup(item) {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        let index2 = this.groups.findIndex((data2) => {
          return data2.id === item.id;
        });
        if (index2 >= 0) {
          this.groups[index2] = item;
        }
        this.storage.set(this.configKey, {
          groups: this.groups,
          items: this.items
        });
        resolve2(this.groups);
      });
    });
  }
  /**
   * 获取分组列表
   */
  getGroups() {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        resolve2(this.groups);
      });
    });
  }
  /**
   * 将收藏添加到指定的分组
   * @param item
   * @param groupId
   */
  addToGroup(item, groupId) {
    return new Promise((resolve2, reject2) => {
      if (!item.groups) {
        item.groups = [];
      }
      let index2 = item.groups.findIndex((id) => {
        return id === groupId;
      });
      if (index2 === -1) {
        item.groups.push(groupId);
        this.update(item).then(() => {
          resolve2(true);
        });
      } else {
        reject2(false);
      }
    });
  }
  /**
   * 将指定的收藏从分组中删除
   * @param item
   * @param groupId
   */
  removeFromGroup(item, groupId) {
    return new Promise((resolve2, reject2) => {
      if (item.groups) {
        let index2 = item.groups.findIndex((id) => {
          return id === groupId;
        });
        if (index2 !== -1) {
          item.groups.splice(index2, 1);
          this.update(item).then(() => {
            resolve2(true);
          });
        } else {
          reject2(false);
        }
      }
    });
  }
  getAllLinks() {
    let links = [];
    this.items.forEach((item) => {
      links.push(PPF.getCleaningURL(item.link));
    });
    return links;
  }
}
class SearchResultSnapshot {
  constructor() {
    this.items = [];
    this.storage = new localStorage();
    this.configKey = EConfigKey.searchResultSnapshot;
    this.load();
  }
  /**
   * 获取历史记录
   */
  load() {
    return new Promise((resolve2, reject2) => {
      this.storage.get(this.configKey, (result2) => {
        let data2 = {
          items: []
        };
        if (Array.isArray(result2)) {
          data2.items = result2;
        } else if (result2) {
          data2 = Object.assign(data2, result2);
        }
        this.items = data2.items || [];
        console.log(result2);
        resolve2(this.items);
      });
    });
  }
  /**
   * 添加新记录
   * @param newItem
   */
  add(newItem) {
    return new Promise((resolve2, reject2) => {
      let saveData = Object.assign(
        {
          time: (/* @__PURE__ */ new Date()).getTime(),
          id: PPF.getNewId()
        },
        newItem
      );
      this.items.push(saveData);
      this.updateData();
      resolve2(this.items);
    });
  }
  updateData() {
    this.storage.set(this.configKey, {
      items: this.items
    });
  }
  /**
   * 获取指定的内容
   * @param id
   */
  get(id) {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        let item = this.items.find((data2) => {
          return data2.id === id;
        });
        if (item) {
          resolve2(item);
        } else {
          reject2(false);
        }
      });
    });
  }
  /**
   * 删除单个记录
   * @param item
   */
  delete(item) {
    return this.remove([item]);
  }
  /**
   * 删除历史记录
   * @param items 需要删除的列表
   */
  remove(items) {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        for (let index2 = this.items.length - 1; index2 >= 0; index2--) {
          let item = this.items[index2];
          let findIndex = items.findIndex((data2) => {
            return data2.id === item.id;
          });
          if (findIndex >= 0) {
            this.items.splice(index2, 1);
          }
        }
        this.updateData();
        resolve2(this.items);
      });
    });
  }
  /**
   * 清除历史记录
   */
  clear() {
    return new Promise((resolve2, reject2) => {
      this.items = [];
      this.updateData();
      resolve2([]);
    });
  }
  /**
   * 重置
   * @param datas
   */
  reset(datas) {
    return new Promise((resolve2, reject2) => {
      if (!datas) {
        reject2(false);
        return;
      }
      if (!Array.isArray(datas)) {
        reject2(false);
        return;
      }
      this.items = datas;
      this.updateData();
      resolve2(this.items);
    });
  }
}
class KeepUploadTask {
  constructor() {
    this.items = [];
    this.storage = new localStorage();
    this.configKey = EConfigKey.keepUploadTask;
    this.load();
  }
  /**
   * 获取历史记录
   */
  load() {
    return new Promise((resolve2, reject2) => {
      this.storage.get(this.configKey, (result2) => {
        let data2 = {
          items: []
        };
        if (Array.isArray(result2)) {
          data2.items = result2;
        } else if (result2) {
          data2 = Object.assign(data2, result2);
        }
        this.items = data2.items || [];
        console.log(result2);
        resolve2(this.items);
      });
    });
  }
  /**
   * 添加新记录
   * @param newItem
   */
  add(newItem) {
    return new Promise((resolve2, reject2) => {
      let saveData = Object.assign(
        {
          time: (/* @__PURE__ */ new Date()).getTime(),
          id: PPF.getNewId()
        },
        newItem
      );
      this.items.push(saveData);
      this.updateData();
      resolve2(this.items);
    });
  }
  /**
   * 更新指定的记录
   * @param item
   */
  update(item) {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        let index2 = this.items.findIndex((data2) => {
          return data2.id === item.id;
        });
        if (index2 >= 0) {
          this.items[index2] = item;
        }
        this.updateData();
        resolve2(this.items);
      });
    });
  }
  updateData() {
    this.storage.set(this.configKey, {
      items: this.items
    });
  }
  /**
   * 获取指定的内容
   * @param id
   */
  get(id) {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        let item = this.items.find((data2) => {
          return data2.id === id;
        });
        if (item) {
          resolve2(item);
        } else {
          reject2(false);
        }
      });
    });
  }
  /**
   * 删除单个记录
   * @param item
   */
  delete(item) {
    return this.remove([item]);
  }
  /**
   * 删除历史记录
   * @param items 需要删除的列表
   */
  remove(items) {
    return new Promise((resolve2, reject2) => {
      this.load().then(() => {
        for (let index2 = this.items.length - 1; index2 >= 0; index2--) {
          let item = this.items[index2];
          let findIndex = items.findIndex((data2) => {
            return data2.id === item.id;
          });
          if (findIndex >= 0) {
            this.items.splice(index2, 1);
          }
        }
        this.updateData();
        resolve2(this.items);
      });
    });
  }
  /**
   * 清除历史记录
   */
  clear() {
    return new Promise((resolve2, reject2) => {
      this.items = [];
      this.updateData();
      resolve2([]);
    });
  }
  /**
   * 重置
   * @param datas
   */
  reset(datas) {
    return new Promise((resolve2, reject2) => {
      if (!datas) {
        reject2(false);
        return;
      }
      if (!Array.isArray(datas)) {
        reject2(false);
        return;
      }
      this.items = datas;
      this.updateData();
      resolve2(this.items);
    });
  }
}
class PTPlugin {
  constructor(localMode = false) {
    this.config = new Config$1(this);
    this.options = {
      sites: [],
      clients: []
    };
    this.localMode = false;
    this.controller = new Controller(this);
    this.logger = new Logger$1();
    this.contentMenus = new ContextMenus(this);
    this.userData = new UserData(this);
    this.omniBox = new OmniBox(this);
    this.i18n = new i18nService(this);
    this.downloadQuene = new DownloadQuene(this);
    this.collection = new Collection();
    this.searchResultSnapshot = new SearchResultSnapshot();
    this.keepUploadTask = new KeepUploadTask();
    this.reloadCount = 0;
    this.autoRefreshUserDataTimer = 0;
    this.autoRefreshUserDataIsWorking = false;
    this.autoRefreshUserDataFailedCount = 0;
    this.gDummyHeaderPrefix = "Overwrite-";
    if (!localMode) {
      this.initBrowserEvent();
    }
    this.logger.add({
      module: EModule.background,
      event: ELogEvent.init
    });
    this.localMode = localMode;
    this.initConfig();
  }
  /**
   * 接收由前台发回的指令并执行
   * @param action 指令
   * @param callback 回调函数
   */
  requestMessage(request, sender) {
    this.debug(`${ELogEvent.requestMessage}.${request.action}`);
    return new Promise((resolve2, reject2) => {
      let result2;
      try {
        switch (request.action) {
          case EAction.readConfig:
            if (this.localMode) {
              this.readConfig().then(() => {
                resolve2(this.options);
              });
            } else {
              resolve2(this.options);
            }
            break;
          case EAction.saveConfig:
            if (request.data.locale && request.data.locale != this.options.locale) {
              this.i18n.reset(request.data.locale);
            }
            this.config.save(request.data);
            this.options = request.data;
            if (this.controller.isInitialized) {
              this.controller.reset(this.options);
            }
            setTimeout(() => {
              this.contentMenus.init(this.options);
            }, 100);
            this.resetTimer();
            resolve2(this.options);
            break;
          case EAction.getClearedOptions:
            resolve2(this.config.cleaningOptions(this.options));
            break;
          case EAction.resetRunTimeOptions:
            this.config.resetRunTimeOptions(request.data);
            this.options = this.config.options;
            resolve2(this.options);
            break;
          case EAction.copyTextToClipboard:
            result2 = this.controller.copyTextToClipboard(request.data);
            if (result2) {
              resolve2(result2);
            } else {
              reject2();
            }
            break;
          case EAction.openOptions:
            this.controller.openOptions(request.data);
            resolve2(true);
            break;
          case EAction.updateOptionsTabId:
            this.controller.updateOptionsTabId(request.data);
            resolve2(true);
            break;
          case EAction.searchTorrent:
            console.log(request.data);
            this.controller.searchTorrent(request.data);
            resolve2(true);
            break;
          case EAction.testClientConnectivity:
            this.controller.clientController.testClientConnectivity(request.data).then((result22) => {
              resolve2(result22);
            }).catch((result22) => {
              this.logger.add({
                module: EModule.background,
                event: `${EAction.testClientConnectivity}`,
                msg: this.i18n.t("service.testClientConnectivityFailed", {
                  address: request.data.address
                }),
                // `测试客户连接失败[${request.data.address}]`,
                data: result22
              });
              reject2(result22);
            });
            break;
          case EAction.getSystemLogs:
            this.logger.load().then((result22) => {
              resolve2(result22);
            }).catch((result22) => {
              reject2(result22);
            });
            break;
          case EAction.removeSystemLogs:
            this.logger.remove(request.data).then((result22) => {
              resolve2(result22);
            }).catch((result22) => {
              reject2(result22);
            });
            break;
          case EAction.clearSystemLogs:
            this.logger.clear().then((result22) => {
              resolve2(result22);
            }).catch((result22) => {
              reject2(result22);
            });
            break;
          case EAction.writeLog:
            this.logger.add(request.data);
            resolve2(true);
            break;
          case EAction.readUIOptions:
            this.config.readUIOptions().then((result22) => {
              resolve2(result22);
            }).catch((result22) => {
              reject2(result22);
            });
            break;
          case EAction.saveUIOptions:
            this.config.saveUIOptions(request.data).then((result22) => {
              resolve2(result22);
            }).catch((result22) => {
              reject2(result22);
            });
            break;
          case EAction.changeLanguage:
            return this.i18n.reset(request.data);
            break;
          default:
            if (this[request.action]) {
              this[request.action](request.data, sender).then((result22) => {
                resolve2(result22);
              }).catch((result22) => {
                reject2(result22);
              });
              return;
            }
            this.controller.call(request, sender).then((result22) => {
              resolve2(result22);
            }).catch((result22) => {
              reject2(result22);
            });
            break;
        }
      } catch (error2) {
        reject2(error2);
      }
    });
  }
  /**
   * 初始化参数
   */
  initConfig() {
    if (this.reloadCount < 10 && (this.config.sites.length === 0 || this.config.clients.length === 0)) {
      setTimeout(() => {
        this.initConfig();
      }, 500);
      this.reloadCount++;
      return;
    }
    this.readConfig().then(() => {
      this.initI18n();
    });
  }
  /**
   * 初始化多语言环境
   */
  initI18n() {
    this.i18n.init().then(() => {
      this.init();
    }).catch(() => {
      console.debug("i18n init error");
    });
  }
  /**
   * 读取参数信息
   */
  readConfig() {
    return new Promise((resolve2, reject2) => {
      this.config.read().then((result2) => {
        this.initUserData();
        this.options = result2;
        resolve2(result2);
        if (!this.localMode) {
          this.controller.init(this.options);
        }
      });
    });
  }
  /**
   * 保存当前参数
   */
  saveConfig() {
    this.config.save(this.options);
  }
  /**
   * 初始化用户数据
   */
  initUserData() {
    this.options.sites.forEach((site2) => {
      site2.user = this.userData.get(site2.host);
    });
  }
  resetTimer(isInit = false) {
    clearInterval(this.autoRefreshUserDataTimer);
    let self2 = this;
    if (chrome == null ? void 0 : chrome.alarms) {
      chrome.alarms.clear(EAlarm.refreshJob, function(wasCleared) {
        if (wasCleared) {
          console.log(`Alarm ${EAlarm.refreshJob} was successfully cleared.`);
        } else {
          console.log(`Alarm ${EAlarm.refreshJob} was not cleared.`);
        }
        if (!self2.options.autoRefreshUserData) {
          return;
        }
        if (self2.options.autoRefreshByAlarm) {
          self2.setRefreshUserDataJob(isInit);
        } else {
          self2.resetAutoRefreshUserDataTimer(isInit);
        }
      });
    } else if (self2.options.autoRefreshUserData) {
      self2.resetAutoRefreshUserDataTimer(isInit);
    }
  }
  /**
   * 重设自动获取用户数据定时器
   */
  resetAutoRefreshUserDataTimer(isInit = false) {
    console.log(`resetAutoRefreshUserDataTimer`);
    clearInterval(this.autoRefreshUserDataTimer);
    this.options.autoRefreshUserDataNextTime = this.getNextTime(0);
    if ((/* @__PURE__ */ new Date()).getTime() >= this.options.autoRefreshUserDataNextTime) {
      if (isInit) {
        if (PPF.getToDay() != PPF.getToDay(this.options.autoRefreshUserDataLastTime)) {
          this.options.autoRefreshUserDataNextTime = (/* @__PURE__ */ new Date()).getTime() + 1e4;
        } else {
          this.options.autoRefreshUserDataNextTime = this.getNextTime();
        }
      } else {
        this.options.autoRefreshUserDataNextTime = this.getNextTime();
      }
    }
    this.autoRefreshUserDataTimer = window.setInterval(() => {
      this.refreshUserData();
    }, 1e3);
  }
  refreshUserData() {
    console.log("refreshUserData");
    let time = (/* @__PURE__ */ new Date()).getTime();
    this.autoRefreshUserDataFailedCount = 0;
    let failedRetryCount = this.options.autoRefreshUserDataFailedRetryCount || 3;
    let failedRetryInterval = this.options.autoRefreshUserDataFailedRetryInterval || 5;
    if (this.options.autoRefreshUserDataNextTime && time >= this.options.autoRefreshUserDataNextTime && !this.autoRefreshUserDataIsWorking) {
      this.options.autoRefreshUserDataNextTime = this.getNextTime();
      this.autoRefreshUserDataIsWorking = true;
      this.controller.userService.refreshUserData(this.autoRefreshUserDataFailedCount > 0).then((results2) => {
        var _a;
        this.debug("refreshUserData DONE.", results2);
        this.autoRefreshUserDataIsWorking = false;
        let haveError = false;
        results2.some((result2) => {
          if (!result2) {
            haveError = true;
            return true;
          }
          if (!result2.id) {
            if (result2.msg && result2.msg.status != EUserDataRequestStatus.notSupported) {
              haveError = true;
              return true;
            }
          }
        });
        if (haveError) {
          if (this.autoRefreshUserDataFailedCount < failedRetryCount) {
            this.options.autoRefreshUserDataNextTime = (/* @__PURE__ */ new Date()).getTime() + failedRetryInterval * 6e4;
            this.debug(
              "数据刷新失败, 下次重试时间",
              new Date(
                this.options.autoRefreshUserDataNextTime
              ).toLocaleString()
            );
            this.resetTimer();
          } else {
            this.debug("数据刷新失败, 重试次数已超限制");
          }
          this.autoRefreshUserDataFailedCount++;
        } else {
          this.debug("数据刷新完成");
          this.autoRefreshUserDataFailedCount = 0;
        }
        if (this.options.autoBackupData) {
          if (!haveError || this.autoRefreshUserDataFailedCount >= failedRetryCount) {
            let { autoBackupDataServerId } = this.options;
            console.log(`上传用户数据到 -> ${autoBackupDataServerId}`);
            let server = (_a = this.options.backupServers) == null ? void 0 : _a.filter((_23) => _23.id === autoBackupDataServerId)[0];
            if (server) {
              console.log(`开始上传用户数据到 -> ${server.name}`);
              this.controller.backupToServer(server).then((r2) => console.log(`用户数据上传完成 -> ${server.name}`, r2)).catch((e2) => console.log(`用户数据上传失败 -> ${server.name}`, e2));
            } else {
              console.log(`未找到备份服务器 -> ${autoBackupDataServerId}`, this.options.backupServers);
            }
          }
        }
      });
    } else {
      console.debug(`refresh data skipped...`);
    }
  }
  /**
   * 获取下一个时间
   * @param addDays
   */
  getNextTime(addDays = 1) {
    let today = PPF.getToDay();
    let time = /* @__PURE__ */ new Date(
      `${today} ${this.options.autoRefreshUserDataHours}:${this.options.autoRefreshUserDataMinutes}:00`
    );
    return new Date(time.setDate(time.getDate() + addDays)).getTime();
  }
  /**
   * 保存用户数据
   */
  saveUserData() {
    this.initUserData();
    this.config.save(this.options);
  }
  /**
   * 服务初始化
   */
  init() {
    if (!this.localMode) {
      this.contentMenus.init(this.options);
      this.resetTimer(true);
    }
  }
  /**
   * 输出调试信息
   * @param msg
   */
  debug(...msgs) {
    msgs.forEach((msg) => {
      this.controller.pushDebugMsg(msg);
    });
  }
  writeLog(msg) {
    this.logger.add(msg);
  }
  writeErrorLog(msg) {
    this.logger.add({
      module: EModule.background,
      event: "一般错误",
      msg: typeof msg === "string" ? msg : JSON.stringify(msg)
    });
  }
  /**
   * 初始化浏览器事件
   */
  initBrowserEvent() {
    if (window.chrome === void 0) {
      return;
    }
    if (!chrome.runtime) {
      return;
    }
    console.log("service.initBrowserEvent");
    chrome.runtime.onMessage && chrome.runtime.onMessage.addListener(
      (message, sender, callback) => {
        this.requestMessage(message, sender).then((result2) => {
          callback && callback({
            resolve: result2
          });
        }).catch((result2) => {
          callback && callback({
            reject: result2
          });
        });
        return true;
      }
    );
    chrome.runtime.onInstalled.addListener((details) => {
      console.log("chrome.runtime.onInstalled", details);
      if (details.reason == "update") {
        this.upgrade();
      }
    });
    let opt_extraInfoSpec = [];
    switch (PPF.browserName) {
      case EBrowserType.Firefox:
        opt_extraInfoSpec = ["requestHeaders", "blocking"];
        break;
      case EBrowserType.Edge:
      case EBrowserType.Chrome:
      default:
        opt_extraInfoSpec = ["requestHeaders", "blocking", "extraHeaders"];
        break;
    }
    chrome.webRequest.onBeforeSendHeaders.addListener(
      (details) => {
        let headers = [];
        if (details.requestHeaders) {
          headers = details.requestHeaders.map((header) => {
            if (header.name.startsWith(this.gDummyHeaderPrefix)) {
              const modifiedName = header.name.replace(this.gDummyHeaderPrefix, "");
              return { name: modifiedName, value: header.value };
            } else {
              return { name: header.name, value: header.value };
            }
          });
        }
        return { requestHeaders: headers };
      },
      {
        urls: ["<all_urls>"]
      },
      opt_extraInfoSpec
    );
  }
  /**
   * 升级相关内容
   */
  upgrade() {
    setTimeout(() => {
      this.userData.upgrade();
    }, 1e3);
  }
  /**
   * 获取指定解析器
   * @param host
   * @param name
   */
  getSiteParser(host2, name2) {
    let site2 = this.options.system && this.options.system.sites && this.options.system.sites.find((item) => {
      return item.host === host2;
    });
    if (!site2) {
      return "";
    }
    let result2 = site2.parser && site2.parser[name2];
    if (!result2) {
      let schema2 = this.options.system && this.options.system.schemas && this.options.system.schemas.find((item) => {
        return item.name === site2.schema;
      });
      result2 = schema2.parser && schema2.parser[name2];
    }
    return result2;
  }
  /**
   * 获取指定选择器
   * @param hostOrSite
   * @param name
   */
  getSiteSelector(hostOrSite, name2) {
    let host2 = typeof hostOrSite == "string" ? hostOrSite : hostOrSite.host;
    let system = this.clone(this.options.system);
    let sites = system.sites.concat(this.options.sites);
    let site2 = sites.find((item) => {
      return item.host === host2;
    });
    if (!site2) {
      if (typeof hostOrSite == "string") {
        return null;
      }
      site2 = hostOrSite;
    }
    let result2 = site2.selectors && site2.selectors[name2];
    let schema2 = system.schemas.find((item) => {
      return site2 != null && item.name === site2.schema;
    });
    if (!result2) {
      if (schema2 && schema2.selectors) {
        result2 = schema2.selectors[name2];
      }
    } else {
      if (result2.disabled === true) {
        return null;
      }
      if (schema2 && schema2.selectors && schema2.selectors[name2]) {
        if (result2.merge === true) {
          result2.fields = Object.assign(
            schema2.selectors[name2].fields,
            result2.fields
          );
          result2 = Object.assign(schema2.selectors[name2], result2);
        }
      }
    }
    return result2;
  }
  /**
   * 用JSON对象模拟对象克隆
   * @param source
   */
  clone(source2) {
    return PPF.clone(source2);
  }
  /**
   * 检查权限
   * @param permissions 需要检查的权限列表
   */
  checkPermissions(permissions) {
    return PPF.checkPermissions(permissions);
  }
  /**
   * 申请权限
   * @param permissions 需要申请的权限列表
   */
  requestPermissions(permissions) {
    return PPF.requestPermissions(permissions);
  }
  /**
   * call this only when init, or meanness
   */
  setRefreshUserDataJob(isInit = false) {
    let delayInMinutes = 0, periodInMinutes = 2, nextTime = this.getNextTime(0);
    if (Date.now() > nextTime) {
      if (isInit) {
        if (PPF.getToDay() != PPF.getToDay(this.options.autoRefreshUserDataLastTime)) {
          delayInMinutes = 1;
        }
      }
      if (delayInMinutes < 1) {
        this.options.autoRefreshUserDataNextTime = this.getNextTime();
        delayInMinutes = Math.round((this.options.autoRefreshUserDataNextTime - Date.now()) / 1e3 / 60);
        delayInMinutes = delayInMinutes > 1 ? delayInMinutes : 1;
      }
    } else {
      this.options.autoRefreshUserDataNextTime = nextTime;
      delayInMinutes = 1;
    }
    console.log(`setRefreshUserDataJob delay in ${delayInMinutes}, period: ${periodInMinutes}`);
    chrome.alarms.create(EAlarm.refreshJob, {
      delayInMinutes,
      periodInMinutes
    });
    chrome.alarms.onAlarm.addListener((alarm) => {
      if (alarm.name === EAlarm.refreshJob) {
        console.debug("alarm RefreshUserDataJob invoked");
        this.refreshUserData();
      }
    });
  }
}
export {
  PTPlugin as default
};
