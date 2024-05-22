import { P as PPF, E as Extension, V as Vue, c as EBeforeSearchingItemSearchMode, d as EEncryptMode, A as APP, a as EAction, e as ESizeUnit, n as normalizeComponent } from "./index-B3uaJg3z.js";
class MovieInfoService {
  constructor() {
    this.doubanApiURL = "https://api.douban.com/v2";
    this.doubanFrodoApi = "https://frodo.douban.com/api/v2";
    this.douban = {
      frodo: {
        apiKeys: [
          "054022eaeae0b00e0fc068c0c0a2102a"
        ],
        entApiKeys: [
          "054022eaeae0b00e0fc068c0c0a2102a"
        ],
        // 豆瓣 frodo 接口相关方法
        methods: {
          movie: {
            search: `${this.doubanFrodoApi}/search?q=$key$&count=$count$&apiKey=$apikey$`,
            /* 
              数据示例
              request: https://movie.douban.com/j/subject_suggest?q=tt0120762
              response:
              [{
                "episode": "",
                "img": "https://img9.doubanio.com\/view\/photo\/s_ratio_poster\/public\/p2443062814.jpg",
                "title": "花木兰",
                "url": "https:\/\/movie.douban.com\/subject\/1294833\/?suggest=tt0120762",
                "type": "movie",
                "year": "1998",
                "sub_title": "Mulan",
                "id": "1294833"
              }]
            */
            imdb: `https://omit.mkrobot.org/movie/infos/$imdbid$`,
            subject: `https://omit.mkrobot.org/movie/infos/douban$id$`
            // imdb: `https://movie.douban.com/j/subject_suggest?q=$imdbid$`,
            // subject: `${this.doubanFrodoApi}/movie/$id$?apiKey=$apikey$`
          }
        }
      },
      common: {
        apiKeys: [
          "02646d3fb69a52ff072d47bf23cef8fd",
          "0b2bdeda43b5688921839c8ecb20399b",
          "0dad551ec0f84ed02907ff5c42e8ec70",
          "0df993c66c0c636e29ecbb5344252a4a"
        ],
        entApiKeys: [
          "0dad551ec0f84ed02907ff5c42e8ec70",
          "02646d3fb69a52ff072d47bf23cef8fd"
        ],
        methods: {
          movie: {
            search: `${this.doubanApiURL}/movie/search?q=$key$&count=$count$&apikey=$apikey$`,
            imdb: `${this.doubanApiURL}/movie/imdb/$imdbid$?apikey=$apikey$`,
            subject: `${this.doubanApiURL}/movie/subject/$id$?apikey=$apikey$`
          }
        }
      }
    };
    this.omdbApiURL = "https://www.omdbapi.com";
    this.omitApiURL = "https://omit.mkrobot.org";
    this.omdbApiKeys = [
      "e0d3039d",
      "a67d9bce",
      "6be019fc",
      "4ee790e0",
      "d82cb888",
      "d58193b6",
      "15c0aa3f",
      "53acf36d",
      "3a864b75",
      "2892ab46",
      "b507af90",
      "7cf67120",
      "85b2a90c",
      "2896ff0a",
      "aa4b9983",
      "c4e08870",
      "5d5c0049",
      "79a462f2",
      "e4c3fce8",
      "918d70df",
      "e94cb667",
      "eb84d6d7",
      "e192b5a",
      "d62b4cf5",
      "5e6442a3",
      "9b1468c6"
    ];
    this.doubanApiKeys = [
      "02646d3fb69a52ff072d47bf23cef8fd",
      "0b2bdeda43b5688921839c8ecb20399b",
      "0dad551ec0f84ed02907ff5c42e8ec70",
      "0df993c66c0c636e29ecbb5344252a4a"
      // "07c78782db00a121175696889101e363"
    ];
    this.doubanEntApiKeys = [
      "0dad551ec0f84ed02907ff5c42e8ec70",
      "02646d3fb69a52ff072d47bf23cef8fd"
      // "07c78782db00a121175696889101e363"
    ];
    this.omitApiKeys = ["kiqMY6MC"];
    this.cache = {
      base: {},
      ratings: {},
      doubanToIMDb: {},
      search: {}
    };
    this.timeout = 3e3;
    this.doubanApi = this.douban.frodo;
    this.requsetQueue = {};
  }
  getInfos(key) {
    if (/(douban\d+)/.test(key)) {
      return this.getInfoFromDoubanId(key.replace("douban", ""));
    }
    if (/^(tt\d+)$/.test(key)) {
      return this.getInfoFromIMDb(key);
    }
    return new Promise((resolve, reject) => {
      reject("暂未实现");
    });
  }
  /**
   * 判断是否为 IMDbId
   * @param IMDbId
   */
  isIMDbId(IMDbId) {
    return /^(tt\d+)$/.test(IMDbId);
  }
  /**
   * 根据指定的 IMDbId 获取电影信息
   * @param IMDbId
   */
  getInfoFromIMDb(IMDbId) {
    return new Promise((resolve, reject) => {
      if (this.isIMDbId(IMDbId)) {
        let cache = this.cache.base[IMDbId];
        if (cache) {
          resolve(cache);
          return;
        }
        let url = PPF.replaceKeys(this.doubanApi.methods.movie.imdb, {
          imdbid: IMDbId,
          apikey: this.getDoubanApiKey()
        });
        $.ajax({
          url,
          timeout: this.timeout
        }).done((json) => {
          let result;
          if (json) {
            result = json.data || json;
          }
          this.cache.base[IMDbId] = result;
          resolve(result);
        }).fail((error) => {
          reject(error);
        });
      } else {
        reject("error IMDbId");
      }
    });
  }
  /**
   * 根据豆瓣ID获取影片信息
   * @param id
   */
  getInfoFromDoubanId(id) {
    return new Promise((resolve, reject) => {
      if (/^(\d+)$/.test(id)) {
        let cache = this.cache.base[id];
        if (cache) {
          resolve(cache);
          return;
        }
        let url = PPF.replaceKeys(this.doubanApi.methods.movie.subject, {
          id,
          apikey: this.getDoubanApiKey()
        });
        $.ajax({
          url,
          timeout: this.timeout
        }).done((json) => {
          let result;
          if (json) {
            result = json.data || json;
          }
          this.cache.base[id] = result;
          resolve(result);
        }).fail((error) => {
          reject(error);
        });
      } else {
        reject("error douban id");
      }
    });
  }
  /**
   * 获取评分信息
   * @param IMDbId
   */
  getRatings(IMDbId) {
    return new Promise((resolve, reject) => {
      if (this.isIMDbId(IMDbId)) {
        let cache = this.cache.ratings[IMDbId];
        if (cache) {
          resolve(cache);
          return;
        }
        let requestCount = 0;
        const request = () => {
          let apikey = this.getOmdbApiKey();
          let url = `${this.omdbApiURL}/?i=${IMDbId}&apikey=${apikey}&tomatoes=true`;
          $.ajax({
            url,
            timeout: this.timeout
          }).done((json) => {
            if (json && json.Error) {
              requestCount++;
              if (requestCount >= 5) {
                reject(json);
                return;
              }
              this.removeApiKey("omdb", apikey);
              request();
              return;
            }
            this.cache.ratings[IMDbId] = json;
            resolve(json);
          }).fail((error) => {
            reject(error);
          });
        };
        request();
      } else {
        reject("error IMDbId");
      }
    });
  }
  /**
   * 从OMDb apikey列表中随机获取一个key
   */
  getOmdbApiKey() {
    return this.omdbApiKeys[Math.floor(Math.random() * this.omdbApiKeys.length)];
  }
  /**
   * 从豆瓣apikey列表中随机获取一个key
   */
  getDoubanApiKey() {
    return this.doubanApi.apiKeys[Math.floor(Math.random() * this.doubanApi.apiKeys.length)];
  }
  /**
   * 获取用于查询的apikey
   */
  getDoubanEntApiKey() {
    return this.doubanApi.entApiKeys[Math.floor(Math.random() * this.doubanApi.entApiKeys.length)];
  }
  /**
   * 根据指定的 doubanId 获取 IMDbId
   * @param doubanId
   */
  getIMDbIdFromDouban(doubanId) {
    return new Promise((resolve, reject) => {
      let cache = this.cache.doubanToIMDb[doubanId];
      if (cache) {
        resolve(cache);
        return;
      }
      let url = `${this.omitApiURL}/movie/${doubanId}/douban/imdb`;
      if (this.requsetQueue[url]) {
        reject();
        return;
      }
      this.requsetQueue[url] = true;
      $.ajax({
        url,
        timeout: this.timeout
      }).done((json) => {
        console.log("getIMDbIdFromDouban", json);
        if (json.data) {
          this.cache.doubanToIMDb[doubanId] = json.data;
          resolve(json.data);
        } else {
          reject(json);
        }
      }).fail((error) => {
        reject(error);
      }).always(() => {
        delete this.requsetQueue[url];
      });
    });
  }
  /**
   * 查询指定关键的影片信息
   * @param key
   * @param count
   */
  queryMovieInfoFromDouban(key, count = 5) {
    if (this.isIMDbId(key)) {
      return this.getInfoFromIMDb(key);
    }
    return new Promise((resolve, reject) => {
      let cache = this.cache.search[key];
      if (cache) {
        resolve(cache);
        return;
      }
      let url = `${this.omitApiURL}/movie/search/${key}`;
      if (this.requsetQueue[url]) {
        reject();
        return;
      }
      this.requsetQueue[url] = true;
      $.ajax({
        url,
        timeout: this.timeout
      }).done((json) => {
        console.log("queryMovieInfoFromDouban", json);
        if (json.data) {
          this.cache.search[key] = json.data;
          resolve(json.data);
        } else {
          reject(json);
        }
      }).fail((error) => {
        reject(error);
      }).always(() => {
        delete this.requsetQueue[url];
      });
    });
  }
  /**
   * 追加API Key
   * @param type
   * @param keys
   */
  appendApiKey(type = "", keys) {
    let apiKeys;
    switch (type) {
      case "omdb":
        apiKeys = this.omdbApiKeys;
        break;
      case "douban":
        apiKeys = this.doubanApiKeys;
        break;
    }
    keys.forEach((key) => {
      if (key && !apiKeys.includes(key)) {
        apiKeys.push(key);
      }
    });
  }
  /**
   * 移除指定的Key
   * @param type
   * @param key
   */
  removeApiKey(type = "", key) {
    let apiKeys = [];
    switch (type) {
      case "omdb":
        apiKeys = this.omdbApiKeys;
        break;
      case "douban":
        apiKeys = this.doubanApiKeys;
        break;
    }
    let index = apiKeys.findIndex((item) => {
      if (item === key) {
        return true;
      }
    });
    if (index !== -1) {
      apiKeys.splice(index, 1);
    }
  }
  /**
   * 验证 OMDB API Key
   * @param key
   */
  verifyOmdbApiKey(key) {
    return new Promise((resolve, reject) => {
      let url = `${this.omdbApiURL}/?i=tt0111161&apikey=${key}&tomatoes=true`;
      $.ajax({
        url,
        timeout: this.timeout
      }).done((json) => {
        if (json && json.Error) {
          reject(json.Error);
          return;
        }
        resolve();
      }).fail((error) => {
        reject(error);
      });
    });
  }
  /**
   * 验证豆瓣Api Key
   * @param key
   */
  verifyDoubanApiKey(key) {
    return new Promise((resolve, reject) => {
      let url = `${this.doubanApiURL}/movie/imdb/tt0111161?apikey=${key}`;
      $.ajax({
        url,
        timeout: this.timeout
      }).done((json) => {
        if (json && json.title) {
          resolve();
        } else {
          reject(json.Error);
        }
      }).fail((error) => {
        reject(error);
      });
    });
  }
  /**
   * 获取热门搜索
   * @param count 需要获取的数量，最多为100
   */
  getTopSearches(count = 9) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${this.omitApiURL}/movie/top/${count}?apikey=${this.omitApiKeys[0]}`,
        timeout: this.timeout
      }).then((result) => {
        if (result && result.data) {
          resolve(result.data);
        } else {
          reject();
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
const extension = new Extension();
const _sfc_main = Vue.extend({
  data() {
    return {
      valid: false,
      rules: {
        require: [(v) => !!v || "!"]
      },
      options: {
        defaultClientId: "",
        search: {
          saveKey: true
        },
        needConfirmWhenExceedSize: false,
        autoRefreshUserData: false,
        autoRefreshUserDataHours: "00",
        autoRefreshUserDataMinutes: "00",
        autoRefreshUserDataFailedRetryCount: 3,
        autoRefreshUserDataFailedRetryInterval: 5,
        connectClientTimeout: 1e4,
        beforeSearchingOptions: {
          getMovieInformation: true,
          maxMovieInformationCount: 5,
          searchModeForItem: EBeforeSearchingItemSearchMode.id
        },
        showToolbarOnContentPage: true,
        downloadFailedRetry: false,
        downloadFailedFailedRetryCount: 3,
        downloadFailedFailedRetryInterval: 5,
        apiKey: {},
        batchDownloadInterval: 0,
        enableBackgroundDownload: false,
        position: "right",
        allowBackupCookies: false,
        encryptBackupData: false,
        encryptMode: EEncryptMode.AES,
        encryptSecretKey: "",
        allowSaveSnapshot: true
      },
      units: [],
      hours: [],
      minutes: [],
      haveError: false,
      haveSuccess: false,
      successMsg: "",
      errorMsg: "",
      lastUpdate: "",
      autoRefreshUserDataLastUpdate: "",
      activeTab: "base",
      apiKey: {
        omdb: "",
        douban: ""
      },
      apiKeyVerifyResults: {
        omdb: [],
        douban: []
      },
      apiKeyVerifying: false,
      showVerifyingStatus: false,
      showEncryptSecretKey: false
    };
  },
  methods: {
    save() {
      console.log(this.options);
      this.successMsg = "";
      if (!this.$refs.form.validate()) {
        this.activeTab = "base";
        this.$refs.defaultClient.focus();
      }
      if (!this.options.apiKey) {
        this.options.apiKey = {};
      }
      let omdbApiKeys = [];
      let doubanApiKeys = [];
      if (this.apiKey.omdb) {
        let items = this.apiKey.omdb.split("\n");
        items.forEach((item) => {
          if (/^[a-z0-9]{7,8}$/.test(item)) {
            omdbApiKeys.push(item);
          }
        });
      }
      if (this.apiKey.douban) {
        let items = this.apiKey.douban.split("\n");
        items.forEach((item) => {
          if (/^[a-z0-9]{32}$/.test(item)) {
            doubanApiKeys.push(item);
          }
        });
      }
      this.options.apiKey.omdb = omdbApiKeys;
      this.options.apiKey.douban = doubanApiKeys;
      if (this.options.allowBackupCookies) {
        PPF.usePermissions(
          ["cookies"],
          true,
          this.$t("permissions.request.cookies").toString()
        ).then(() => {
          this.$store.dispatch("saveConfig", this.options);
          this.successMsg = this.$t("settings.base.saved").toString();
        }).catch(() => {
          this.options.allowBackupCookies = false;
          this.$store.dispatch("saveConfig", this.options);
          this.successMsg = this.$t("settings.base.saved").toString();
        });
        return;
      }
      this.$store.dispatch("saveConfig", this.options);
      this.successMsg = this.$t("settings.base.saved").toString();
    },
    clearCache() {
      if (confirm(this.$t("settings.base.clearCacheConfirm").toString())) {
        APP.cache.clear();
        setTimeout(() => {
          extension.sendRequest(EAction.reloadConfig).then(() => {
            this.successMsg = this.$t(
              "settings.base.cacheIsCleared"
            ).toString();
          }).catch();
        }, 200);
      }
    },
    /**
     * 测试 Api Key
     */
    verifyApiKey() {
      let omdbKeys = this.apiKey.omdb.split("\n");
      let doubanKeys = this.apiKey.douban.split("\n");
      let count = omdbKeys.length + doubanKeys.length;
      if (count == 0) {
        return;
      }
      let movieSerice = new MovieInfoService();
      this.apiKeyVerifyResults = {
        omdb: [],
        douban: []
      };
      this.apiKeyVerifying = true;
      this.showVerifyingStatus = true;
      let doneCount = 0;
      omdbKeys.forEach((item) => {
        if (/^[a-z0-9]{7,8}$/.test(item)) {
          movieSerice.verifyOmdbApiKey(item).then(() => {
            this.apiKeyVerifyResults.omdb.push(`「${item}」 ok.`);
          }).catch((error) => {
            this.apiKeyVerifyResults.omdb.push(
              `<span style='color:red'>「${item}」 error. (${error})</span>`
            );
          }).finally(() => {
            doneCount++;
            if (doneCount === count) {
              this.apiKeyVerifying = false;
              window.setTimeout(() => {
                this.showVerifyingStatus = false;
              }, 6e4);
            }
          });
        } else {
          doneCount++;
        }
      });
      doubanKeys.forEach((item) => {
        if (/^[a-z0-9]{32}$/.test(item)) {
          movieSerice.verifyDoubanApiKey(item).then(() => {
            this.apiKeyVerifyResults.douban.push(`「${item}」 ok.`);
          }).catch((error) => {
            this.apiKeyVerifyResults.douban.push(
              `<span style='color:red'>「${item}」 error.</span>`
            );
          }).finally(() => {
            doneCount++;
            if (doneCount === count) {
              this.apiKeyVerifying = false;
              window.setTimeout(() => {
                this.showVerifyingStatus = false;
              }, 6e4);
            }
          });
        } else {
          doneCount++;
        }
      });
      if (doneCount === count) {
        this.apiKeyVerifying = false;
        this.showVerifyingStatus = false;
      }
    },
    /**
     * 随机生成一个密钥
     */
    createSecretKey() {
      this.options.encryptSecretKey = PPF.getRandomString();
    },
    /**
     * 复制密钥到剪切板
     */
    copySecretKeyToClipboard() {
      this.successMsg = "";
      extension.sendRequest(
        EAction.copyTextToClipboard,
        null,
        this.options.encryptSecretKey
      ).then((result) => {
        this.successMsg = this.$t("common.copyed").toString();
      }).catch(() => {
      });
    },
    checkOptionalPermission(key) {
      return PPF.checkOptionalPermission(key);
    }
  },
  created() {
    this.options = Object.assign(this.options, this.$store.state.options);
    this.units.push(ESizeUnit.MiB);
    this.units.push(ESizeUnit.GiB);
    this.units.push(ESizeUnit.TiB);
    this.units.push(ESizeUnit.PiB);
    for (let index = 0; index < 24; index++) {
      this.hours.push(`0${index}`.substr(-2));
    }
    for (let index = 0; index < 60; index += 5) {
      this.minutes.push(`0${index}`.substr(-2));
    }
    if (this.options.apiKey) {
      if (this.options.apiKey.omdb && this.options.apiKey.omdb.length > 0) {
        this.apiKey.omdb = this.options.apiKey.omdb.join("\n");
      }
      if (this.options.apiKey.douban && this.options.apiKey.douban.length > 0) {
        this.apiKey.douban = this.options.apiKey.douban.join("\n");
      }
    }
    APP.cache.getLastUpdateTime().then((time) => {
      if (time > 0) {
        this.lastUpdate = this.$t("settings.base.lastUpdate", {
          time: new Date(time).toLocaleString()
        }).toString();
      } else {
        this.lastUpdate = this.$t(
          "settings.base.lastUpdateUnknown"
        ).toString();
      }
    }).catch(() => {
      this.lastUpdate = this.$t("settings.base.lastUpdateFailed").toString();
    });
    if (this.options.autoRefreshUserDataLastTime) {
      this.autoRefreshUserDataLastUpdate = this.$t(
        "settings.base.autoRefreshUserDataLastUpdate",
        {
          time: new Date(
            this.options.autoRefreshUserDataLastTime
          ).toLocaleString()
        }
      ).toString();
    }
  },
  watch: {
    successMsg: {
      handler() {
        this.haveSuccess = this.successMsg != "";
      },
      deep: true
    },
    errorMsg() {
      this.haveError = this.errorMsg != "";
    }
  },
  computed: {
    getBackupServers() {
      return [].concat(this.$store.state.options.backupServers).map((item) => {
        return {
          text: item.name,
          value: item.id
        };
      });
    },
    getClientAddress() {
      if (!this.options.defaultClientId) {
        return "";
      }
      let client = this.$store.state.options.clients.find((data) => {
        return this.options.defaultClientId === data.id;
      });
      if (client) {
        return client.address;
      }
      return "";
    },
    searchModes() {
      return [
        {
          value: EBeforeSearchingItemSearchMode.id,
          text: this.$t(
            "settings.base.beforeSearchingItemSearchMode.id"
          ).toString()
        },
        {
          value: EBeforeSearchingItemSearchMode.name,
          text: this.$t(
            "settings.base.beforeSearchingItemSearchMode.name"
          ).toString()
        }
      ];
    }
  }
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-card", [_c("v-card-text", [_c("v-form", { ref: "form", model: { value: _vm.valid, callback: function($$v) {
    _vm.valid = $$v;
  }, expression: "valid" } }, [_c("v-tabs", { attrs: { "centered": "", "dark": "", "icons-and-text": "" }, model: { value: _vm.activeTab, callback: function($$v) {
    _vm.activeTab = $$v;
  }, expression: "activeTab" } }, [_c("v-tabs-slider", { attrs: { "color": "yellow" } }), _c("v-tab", { key: "base" }, [_vm._v(" " + _vm._s(_vm.$t("settings.base.tabs.base")) + " "), _c("v-icon", [_vm._v("settings")])], 1), _c("v-tab", { key: "search" }, [_vm._v(" " + _vm._s(_vm.$t("settings.base.tabs.search")) + " "), _c("v-icon", [_vm._v("search")])], 1), _c("v-tab", { key: "download" }, [_vm._v(" " + _vm._s(_vm.$t("settings.base.tabs.download")) + " "), _c("v-icon", [_vm._v("cloud_download")])], 1), _c("v-tab", { key: "advanced" }, [_vm._v(" " + _vm._s(_vm.$t("settings.base.tabs.advanced")) + " "), _c("v-icon", [_vm._v("memory")])], 1), _c("v-tab-item", { key: "base" }, [_c("v-container", { attrs: { "fluid": "", "grid-list-xs": "" } }, [_c("v-layout", { attrs: { "row": "", "wrap": "" } }, [_c("v-flex", { attrs: { "xs10": "" } }, [_c("v-autocomplete", { ref: "defaultClient", attrs: { "items": this.$store.state.options.clients, "label": _vm.$t("settings.base.defaultClient"), "menu-props": { maxHeight: "auto" }, "hint": _vm.getClientAddress, "persistent-hint": "", "item-text": "name", "item-value": "id", "required": "", "rules": _vm.rules.require, "autofocus": "" }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
    return [_c("span", { domProps: { "textContent": _vm._s(item.name) } })];
  } }, { key: "item", fn: function(data) {
    return [_c("v-list-tile-content", [_c("v-list-tile-title", { domProps: { "innerHTML": _vm._s(data.item.name) } }), _c("v-list-tile-sub-title", { domProps: { "innerHTML": _vm._s(data.item.address) } })], 1), _c("v-list-tile-action", [_c("v-list-tile-action-text", [_vm._v(_vm._s(data.item.type))])], 1)];
  } }]), model: { value: _vm.options.defaultClientId, callback: function($$v) {
    _vm.$set(_vm.options, "defaultClientId", $$v);
  }, expression: "options.defaultClientId" } }, [_c("template", { slot: "no-data" }, [_c("span", { staticClass: "ma-2" }, [_vm._v(_vm._s(_vm.$t("settings.base.noClient")))])])], 2)], 1), _c("v-flex", { attrs: { "xs2": "" } }), _c("v-flex", { attrs: { "xs10": "" } }, [_c("v-text-field", { attrs: { "label": _vm.$t("settings.base.connectClientTimeout"), "placeholder": _vm.$t("settings.base.connectClientTimeout"), "type": "number" }, model: { value: _vm.options.connectClientTimeout, callback: function($$v) {
    _vm.$set(_vm.options, "connectClientTimeout", $$v);
  }, expression: "options.connectClientTimeout" } })], 1), _c("v-flex", { attrs: { "xs2": "" } }, [_c("v-slider", { staticStyle: { "display": "none" }, attrs: { "max": 6e4, "min": 500, "step": 1 }, model: { value: _vm.options.connectClientTimeout, callback: function($$v) {
    _vm.$set(_vm.options, "connectClientTimeout", $$v);
  }, expression: "options.connectClientTimeout" } })], 1), _c("v-flex", { attrs: { "xs12": "" } }, [_c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.autoRefreshUserData") + _vm.autoRefreshUserDataLastUpdate }, model: { value: _vm.options.autoRefreshUserData, callback: function($$v) {
    _vm.$set(_vm.options, "autoRefreshUserData", $$v);
  }, expression: "options.autoRefreshUserData" } }), _vm.options.autoRefreshUserData ? _c("v-flex", { attrs: { "xs12": "" } }, [_c("div", { staticStyle: { "margin": "-40px 0 10px 45px" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("settings.base.autoRefreshUserDataTip1")))]), _c("v-select", { staticClass: "mx-2 d-inline-flex", staticStyle: { "max-width": "50px", "max-height": "30px" }, attrs: { "items": _vm.hours }, model: { value: _vm.options.autoRefreshUserDataHours, callback: function($$v) {
    _vm.$set(_vm.options, "autoRefreshUserDataHours", $$v);
  }, expression: "options.autoRefreshUserDataHours" } }), _c("span", [_vm._v(":")]), _c("v-select", { staticClass: "mx-2 d-inline-flex", staticStyle: { "max-width": "50px", "max-height": "30px" }, attrs: { "items": _vm.minutes }, model: { value: _vm.options.autoRefreshUserDataMinutes, callback: function($$v) {
    _vm.$set(_vm.options, "autoRefreshUserDataMinutes", $$v);
  }, expression: "options.autoRefreshUserDataMinutes" } }), _c("span", [_vm._v(_vm._s(_vm.$t("settings.base.autoRefreshUserDataTip2")))])], 1)]) : _vm._e(), _vm.options.autoRefreshUserData ? _c("v-flex", { attrs: { "xs12": "" } }, [_c("div", { staticStyle: { "margin": "-20px 0 10px 45px" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("settings.base.autoRefreshUserDataTip3")))]), _c("v-select", { staticClass: "mx-2 d-inline-flex", staticStyle: { "max-width": "50px", "max-height": "30px" }, attrs: { "items": [1, 2, 3, 4, 5] }, model: { value: _vm.options.autoRefreshUserDataFailedRetryCount, callback: function($$v) {
    _vm.$set(_vm.options, "autoRefreshUserDataFailedRetryCount", $$v);
  }, expression: "options.autoRefreshUserDataFailedRetryCount" } }), _c("span", [_vm._v(_vm._s(_vm.$t("settings.base.autoRefreshUserDataTip4")))]), _c("v-select", { staticClass: "mx-2 d-inline-flex", staticStyle: { "max-width": "50px", "max-height": "30px" }, attrs: { "items": [1, 2, 3, 4, 5] }, model: { value: _vm.options.autoRefreshUserDataFailedRetryInterval, callback: function($$v) {
    _vm.$set(_vm.options, "autoRefreshUserDataFailedRetryInterval", $$v);
  }, expression: "options.autoRefreshUserDataFailedRetryInterval" } }), _c("span", [_vm._v(_vm._s(_vm.$t("settings.base.autoRefreshUserDataTip5")))])], 1)]) : _vm._e(), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.autoRefreshByAlarmTip1") }, model: { value: _vm.options.autoRefreshByAlarm, callback: function($$v) {
    _vm.$set(_vm.options, "autoRefreshByAlarm", $$v);
  }, expression: "options.autoRefreshByAlarm" } }), _c("v-switch", { attrs: { "color": "success", "disabled": !_vm.options.autoRefreshUserData, "label": _vm.$t("settings.base.autoBackupDataTip1") }, model: { value: _vm.options.autoBackupData, callback: function($$v) {
    _vm.$set(_vm.options, "autoBackupData", $$v);
  }, expression: "options.autoBackupData" } }), _vm.options.autoRefreshUserData && _vm.options.autoBackupData ? _c("v-flex", { attrs: { "xs12": "" } }, [_c("div", { staticStyle: { "margin": "-20px 0 10px 45px" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("settings.base.autoBackupDataTip4")))]), _c("v-select", { staticClass: "mx-2 d-inline-flex", attrs: { "items": _vm.getBackupServers }, model: { value: _vm.options.autoBackupDataServerId, callback: function($$v) {
    _vm.$set(_vm.options, "autoBackupDataServerId", $$v);
  }, expression: "options.autoBackupDataServerId" } })], 1)]) : _vm._e(), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.showToolbarOnContentPage") }, model: { value: _vm.options.showToolbarOnContentPage, callback: function($$v) {
    _vm.$set(_vm.options, "showToolbarOnContentPage", $$v);
  }, expression: "options.showToolbarOnContentPage" } }), _vm.options.showToolbarOnContentPage ? _c("v-radio-group", { staticClass: "ml-5", attrs: { "row": "" }, model: { value: _vm.options.position, callback: function($$v) {
    _vm.$set(_vm.options, "position", $$v);
  }, expression: "options.position" } }, [_c("span", { staticClass: "mr-1" }, [_vm._v(_vm._s(_vm.$t("settings.base.position.label")))]), _c("v-radio", { attrs: { "label": _vm.$t("settings.base.position.left"), "color": "success", "value": "left" } }), _c("v-radio", { attrs: { "label": _vm.$t("settings.base.position.right"), "color": "success", "value": "right" } })], 1) : _vm._e(), _vm.options.showToolbarOnContentPage ? _c("v-switch", { staticClass: "ml-5", attrs: { "color": "success", "label": _vm.$t("settings.base.allowDropToSend") }, model: { value: _vm.options.allowDropToSend, callback: function($$v) {
    _vm.$set(_vm.options, "allowDropToSend", $$v);
  }, expression: "options.allowDropToSend" } }) : _vm._e(), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.searchResultOrderBySitePriority") }, model: { value: _vm.options.searchResultOrderBySitePriority, callback: function($$v) {
    _vm.$set(_vm.options, "searchResultOrderBySitePriority", $$v);
  }, expression: "options.searchResultOrderBySitePriority" } }), _vm.checkOptionalPermission("cookies") ? _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.allowBackupCookies") }, model: { value: _vm.options.allowBackupCookies, callback: function($$v) {
    _vm.$set(_vm.options, "allowBackupCookies", $$v);
  }, expression: "options.allowBackupCookies" } }) : _vm._e(), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.encryptBackupData") }, model: { value: _vm.options.encryptBackupData, callback: function($$v) {
    _vm.$set(_vm.options, "encryptBackupData", $$v);
  }, expression: "options.encryptBackupData" } }), _vm.options.encryptBackupData ? _c("v-flex", { attrs: { "xs12": "" } }, [_c("div", { staticStyle: { "margin": "-20px 0 10px 45px" } }, [_c("v-text-field", { staticClass: "d-inline-flex", staticStyle: { "min-width": "800px" }, attrs: { "label": _vm.$t("settings.base.encryptSecretKey"), "placeholder": _vm.$t("settings.base.encryptTip"), "type": _vm.showEncryptSecretKey ? "text" : "password" }, scopedSlots: _vm._u([{ key: "append", fn: function() {
    return [_c("v-icon", { on: { "click": function($event) {
      _vm.showEncryptSecretKey = !_vm.showEncryptSecretKey;
    } } }, [_vm._v(_vm._s(_vm.showEncryptSecretKey ? "visibility_off" : "visibility"))]), _c("v-btn", { staticStyle: { "min-width": "unset" }, attrs: { "flat": "", "small": "", "color": "primary" }, on: { "click": _vm.createSecretKey } }, [_vm._v(_vm._s(_vm.$t("settings.base.createSecretKey")))]), _c("v-btn", { staticStyle: { "min-width": "unset" }, attrs: { "flat": "", "small": "", "color": "success" }, on: { "click": _vm.copySecretKeyToClipboard } }, [_vm._v(_vm._s(_vm.$t("common.copy")))])];
  }, proxy: true }], null, false, 911864529), model: { value: _vm.options.encryptSecretKey, callback: function($$v) {
    _vm.$set(_vm.options, "encryptSecretKey", $$v);
  }, expression: "options.encryptSecretKey" } }), _c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("settings.base.encryptTip")))])], 1)]) : _vm._e()], 1)], 1)], 1)], 1), _c("v-tab-item", { key: "search" }, [_c("v-container", { attrs: { "fluid": "", "grid-list-xs": "" } }, [_c("v-layout", { attrs: { "row": "", "wrap": "" } }, [_c("v-flex", { attrs: { "xs6": "" } }, [_c("v-text-field", { attrs: { "type": "number", "label": _vm.$t("settings.base.searchResultRows"), "placeholder": _vm.$t("settings.base.searchResultRows") }, model: { value: _vm.options.search.rows, callback: function($$v) {
    _vm.$set(_vm.options.search, "rows", $$v);
  }, expression: "options.search.rows" } })], 1), _c("v-flex", { attrs: { "xs6": "" } }, [_c("v-slider", { staticStyle: { "display": "none" }, attrs: { "max": 200, "min": 1 }, model: { value: _vm.options.search.rows, callback: function($$v) {
    _vm.$set(_vm.options.search, "rows", $$v);
  }, expression: "options.search.rows" } })], 1), _c("v-flex", { attrs: { "xs12": "" } }, [_c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.allowSelectionTextSearch") }, model: { value: _vm.options.allowSelectionTextSearch, callback: function($$v) {
    _vm.$set(_vm.options, "allowSelectionTextSearch", $$v);
  }, expression: "options.allowSelectionTextSearch" } }), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.saveSearchKey") }, model: { value: _vm.options.search.saveKey, callback: function($$v) {
    _vm.$set(_vm.options.search, "saveKey", $$v);
  }, expression: "options.search.saveKey" } }), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.allowSaveSnapshot") }, model: { value: _vm.options.allowSaveSnapshot, callback: function($$v) {
    _vm.$set(_vm.options, "allowSaveSnapshot", $$v);
  }, expression: "options.allowSaveSnapshot" } }), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.showMovieInfoCardOnSearch") }, model: { value: _vm.options.showMovieInfoCardOnSearch, callback: function($$v) {
    _vm.$set(_vm.options, "showMovieInfoCardOnSearch", $$v);
  }, expression: "options.showMovieInfoCardOnSearch" } }), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.autoSearchWhenSwitchSolution") }, model: { value: _vm.options.autoSearchWhenSwitchSolution, callback: function($$v) {
    _vm.$set(_vm.options, "autoSearchWhenSwitchSolution", $$v);
  }, expression: "options.autoSearchWhenSwitchSolution" } }), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.getMovieInformationBeforeSearching") }, model: { value: _vm.options.beforeSearchingOptions.getMovieInformation, callback: function($$v) {
    _vm.$set(_vm.options.beforeSearchingOptions, "getMovieInformation", $$v);
  }, expression: "options.beforeSearchingOptions.getMovieInformation" } }), _vm.options.beforeSearchingOptions.getMovieInformation ? _c("v-flex", { attrs: { "xs12": "" } }, [_c("div", { staticStyle: { "margin": "-40px 0 10px 45px" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("settings.base.maxMovieInformationCount")))]), _c("v-text-field", { staticClass: "ml-2 d-inline-flex", staticStyle: { "max-width": "100px", "max-height": "30px" }, attrs: { "type": "number" }, model: { value: _vm.options.beforeSearchingOptions.maxMovieInformationCount, callback: function($$v) {
    _vm.$set(_vm.options.beforeSearchingOptions, "maxMovieInformationCount", $$v);
  }, expression: "options.beforeSearchingOptions.maxMovieInformationCount" } }), _c("v-slider", { staticStyle: { "display": "none" }, attrs: { "max": 20, "min": 1 }, model: { value: _vm.options.beforeSearchingOptions.maxMovieInformationCount, callback: function($$v) {
    _vm.$set(_vm.options.beforeSearchingOptions, "maxMovieInformationCount", $$v);
  }, expression: "options.beforeSearchingOptions.maxMovieInformationCount" } })], 1)]) : _vm._e(), _vm.options.beforeSearchingOptions.getMovieInformation ? _c("v-flex", { attrs: { "xs12": "" } }, [_c("div", { staticStyle: { "margin": "-20px 0 10px 45px" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("settings.base.searchModeForItem")))]), _c("v-select", { staticClass: "mx-2 d-inline-flex", staticStyle: { "max-height": "30px" }, attrs: { "items": _vm.searchModes }, model: { value: _vm.options.beforeSearchingOptions.searchModeForItem, callback: function($$v) {
    _vm.$set(_vm.options.beforeSearchingOptions, "searchModeForItem", $$v);
  }, expression: "options.beforeSearchingOptions.searchModeForItem" } })], 1)]) : _vm._e()], 1)], 1)], 1)], 1), _c("v-tab-item", { key: "download" }, [_c("v-container", { attrs: { "fluid": "", "grid-list-xs": "" } }, [_c("v-layout", { attrs: { "row": "", "wrap": "" } }, [_c("v-flex", { attrs: { "xs12": "" } }, [_c("v-flex", { attrs: { "xs12": "" } }, [_c("v-text-field", { attrs: { "label": _vm.$t("settings.base.batchDownloadInterval"), "placeholder": _vm.$t("settings.base.batchDownloadInterval"), "type": "number" }, model: { value: _vm.options.batchDownloadInterval, callback: function($$v) {
    _vm.$set(_vm.options, "batchDownloadInterval", $$v);
  }, expression: "options.batchDownloadInterval" } })], 1), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.saveDownloadHistory") }, model: { value: _vm.options.saveDownloadHistory, callback: function($$v) {
    _vm.$set(_vm.options, "saveDownloadHistory", $$v);
  }, expression: "options.saveDownloadHistory" } }), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.downloadFailedRetry") }, model: { value: _vm.options.downloadFailedRetry, callback: function($$v) {
    _vm.$set(_vm.options, "downloadFailedRetry", $$v);
  }, expression: "options.downloadFailedRetry" } }), _vm.options.downloadFailedRetry ? _c("v-flex", { attrs: { "xs12": "" } }, [_c("div", { staticStyle: { "margin": "-35px 0 10px 45px" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("settings.base.downloadFailedRetryTip1")))]), _c("v-select", { staticClass: "mx-2 d-inline-flex", staticStyle: { "max-width": "50px", "max-height": "20px" }, attrs: { "items": [1, 2, 3, 4, 5] }, model: { value: _vm.options.downloadFailedFailedRetryCount, callback: function($$v) {
    _vm.$set(_vm.options, "downloadFailedFailedRetryCount", $$v);
  }, expression: "options.downloadFailedFailedRetryCount" } }), _c("span", [_vm._v(_vm._s(_vm.$t("settings.base.downloadFailedRetryTip2")))]), _c("v-text-field", { staticClass: "ml-2 d-inline-flex", staticStyle: { "max-width": "50px", "max-height": "20px" }, attrs: { "type": "number" }, model: { value: _vm.options.downloadFailedFailedRetryInterval, callback: function($$v) {
    _vm.$set(_vm.options, "downloadFailedFailedRetryInterval", $$v);
  }, expression: "options.downloadFailedFailedRetryInterval" } }), _c("span", [_vm._v(_vm._s(_vm.$t("settings.base.downloadFailedRetryTip3")))])], 1)]) : _vm._e(), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.enableBackgroundDownload") }, model: { value: _vm.options.enableBackgroundDownload, callback: function($$v) {
    _vm.$set(_vm.options, "enableBackgroundDownload", $$v);
  }, expression: "options.enableBackgroundDownload" } }), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.needConfirmWhenExceedSize") }, model: { value: _vm.options.needConfirmWhenExceedSize, callback: function($$v) {
    _vm.$set(_vm.options, "needConfirmWhenExceedSize", $$v);
  }, expression: "options.needConfirmWhenExceedSize" } }), _vm.options.needConfirmWhenExceedSize ? _c("v-flex", { attrs: { "xs12": "" } }, [_c("div", { staticStyle: { "margin": "-40px 0 10px 40px" } }, [_c("v-text-field", { staticClass: "ml-2 d-inline-flex", staticStyle: { "max-width": "100px", "max-height": "30px" }, attrs: { "placeholder": _vm.$t("settings.base.exceedSize") }, model: { value: _vm.options.exceedSize, callback: function($$v) {
    _vm.$set(_vm.options, "exceedSize", $$v);
  }, expression: "options.exceedSize" } }), _c("v-select", { staticClass: "mx-2 d-inline-flex", staticStyle: { "max-width": "50px", "max-height": "30px" }, attrs: { "items": _vm.units }, model: { value: _vm.options.exceedSizeUnit, callback: function($$v) {
    _vm.$set(_vm.options, "exceedSizeUnit", $$v);
  }, expression: "options.exceedSizeUnit" } })], 1)]) : _vm._e()], 1)], 1)], 1)], 1), _c("v-tab-item", { key: "advanced" }, [_c("v-container", { attrs: { "fluid": "", "grid-list-xs": "" } }, [_c("v-layout", { attrs: { "row": "", "wrap": "" } }, [_c("v-flex", { attrs: { "xs12": "" } }, [_c("v-textarea", { attrs: { "label": _vm.$t("settings.base.apiKey.omdb"), "auto-grow": "", "box": "" }, model: { value: _vm.apiKey.omdb, callback: function($$v) {
    _vm.$set(_vm.apiKey, "omdb", $$v);
  }, expression: "apiKey.omdb" } }), _c("v-textarea", { attrs: { "label": _vm.$t("settings.base.apiKey.douban"), "auto-grow": "", "box": "" }, model: { value: _vm.apiKey.douban, callback: function($$v) {
    _vm.$set(_vm.apiKey, "douban", $$v);
  }, expression: "apiKey.douban" } }), _c("div", { staticClass: "mb-4 text-xs-right" }, [_c("v-btn", { attrs: { "loading": _vm.apiKeyVerifying }, on: { "click": _vm.verifyApiKey } }, [_vm._v(_vm._s(_vm.$t("settings.base.verifyApiKey")))])], 1), _c("v-alert", { attrs: { "value": _vm.showVerifyingStatus, "color": "info", "icon": "info", "outline": "" } }, [_c("div", [_vm._v("OMDb:")]), _c("div", { domProps: { "innerHTML": _vm._s(_vm.apiKeyVerifyResults.omdb.join("<br>")) } }), _c("v-divider"), _c("div", [_vm._v("Douban:")]), _c("div", { domProps: { "innerHTML": _vm._s(_vm.apiKeyVerifyResults.douban.join("<br>")) } })], 1), _c("v-alert", { attrs: { "value": true, "color": "info", "icon": "info", "outline": "" } }, [_c("div", { domProps: { "innerHTML": _vm._s(_vm.$t("settings.base.apiKeyTip").toString().replace(/\n/g, "<br>")) } })])], 1)], 1)], 1)], 1)], 1)], 1)], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-btn", { attrs: { "color": "success" }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.base.save")))])], 1), _c("v-spacer")], 1)], 1), _c("v-snackbar", { attrs: { "absolute": "", "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
    _vm.haveError = $$v;
  }, expression: "haveError" } }, [_vm._v(_vm._s(_vm.errorMsg))]), _c("v-snackbar", { attrs: { "absolute": "", "bottom": "", "timeout": 3e3, "color": "success" }, model: { value: _vm.haveSuccess, callback: function($$v) {
    _vm.haveSuccess = $$v;
  }, expression: "haveSuccess" } }, [_vm._v(_vm._s(_vm.successMsg))])], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "844a422c",
  null,
  null
);
const Index = __component__.exports;
export {
  Index as default
};
