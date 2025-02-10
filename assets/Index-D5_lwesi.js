import { E as Extension, V as Vue, d as EBeforeSearchingItemSearchMode, e as EEncryptMode, P as PPF, A as APP, a as EAction, g as ESizeUnit, n as normalizeComponent } from "./index-COZ_5UUZ.js";
import { M as MovieInfoService } from "./movieInfoService-MDtwuiAN.js";
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
          saveKey: true,
          threads: 0
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
  }, expression: "options.search.rows" } })], 1), _c("v-flex", { attrs: { "xs12": "" } }, [_c("v-text-field", { attrs: { "type": "number", "label": _vm.$t("settings.base.searchThreads"), "placeholder": _vm.$t("settings.base.searchThreads"), "min": 0 }, model: { value: _vm.options.search.threads, callback: function($$v) {
    _vm.$set(_vm.options.search, "threads", $$v);
  }, expression: "options.search.threads" } })], 1), _c("v-flex", { attrs: { "xs12": "" } }, [_c("v-switch", { attrs: { "color": "success", "label": _vm.$t("settings.base.allowSelectionTextSearch") }, model: { value: _vm.options.allowSelectionTextSearch, callback: function($$v) {
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
  "d643515d",
  null,
  null
);
const Index = __component__.exports;
export {
  Index as default
};
