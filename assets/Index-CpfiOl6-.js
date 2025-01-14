import { E as Extension, V as Vue, j as EBackupServerType, a as EAction, n as normalizeComponent, k as ERestoreContent, P as PPF, l as EWorkingStatus, A as APP, m as EInstallType, F as FileSaver, b as EModule, o as EBrowserType } from "./index-7t3YJu3Z.js";
import { B as BackupFileParser } from "./backupFileParser-CM6Jekoi.js";
const extension$1 = new Extension();
const _sfc_main$5 = Vue.extend({
  data() {
    return {
      showLoginPwd: false,
      showAuthCode: false,
      rules: {
        require: [(v) => !!v || "!"],
        url: (v) => {
          return /^(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;\[\]]+[-A-Za-z0-9+&@#/%=~_|]$/.test(
            v
          ) || this.$t("settings.backup.server.owss.addressTip");
        }
      },
      haveError: false,
      haveSuccess: false,
      successMsg: "",
      errorMsg: "",
      valid: false,
      option: {
        authCode: "",
        address: "",
        name: "",
        loginName: "",
        loginPwd: "",
        type: EBackupServerType.OWSS,
        digest: false
      },
      testing: false,
      testButtonIcon: "compass_calibration",
      testButtonColor: "info",
      testButtonStatus: {
        success: "success",
        error: "error"
      },
      buttonColor: {
        default: "info",
        success: "success",
        error: "error"
      },
      buttonIcon: {
        default: "compass_calibration",
        success: "done",
        error: "close"
      }
    };
  },
  props: {
    initData: Object,
    isNew: Boolean,
    type: {
      type: String,
      default: EBackupServerType.OWSS
    },
    show: Boolean
  },
  watch: {
    show() {
      if (this.show && this.$refs.name) {
        this.$refs.name.focus();
      }
    },
    successMsg() {
      this.haveSuccess = this.successMsg != "";
    },
    errorMsg() {
      this.haveError = this.errorMsg != "";
    },
    option: {
      handler() {
        setTimeout(() => {
          this.$emit("change", {
            data: this.option,
            valid: this.valid
          });
        }, 100);
      },
      deep: true
    },
    type() {
      this.option = Object.assign({}, this.initData);
      this.option.type = this.type;
    },
    initData() {
      if (this.initData) {
        if (this.initData.digest === void 0) {
          this.initData.digest = false;
        }
        this.option = Object.assign({
          authCode: "",
          address: "",
          name: "",
          loginName: "",
          loginPwd: "",
          type: EBackupServerType.OWSS,
          digest: false
        }, this.initData);
        this.option.type = this.type;
      }
    }
  },
  methods: {
    applyAuthCode() {
      this.successMsg = "";
      this.errorMsg = "";
      if (this.option.address) {
        $.ajax({
          url: `${this.option.address}/create`
        }).done((result) => {
          console.log(result);
          if (result && result.data) {
            this.option.authCode = result.data;
            this.successMsg = result.data;
          } else if (result.code && result.msg) {
            this.errorMsg = result.msg + " (" + result.code + ")";
          }
        }).fail((jqXHR, status, text) => {
          if (jqXHR.responseJSON && jqXHR.responseJSON.code && jqXHR.responseJSON.msg) {
            this.errorMsg = jqXHR.responseJSON.msg + " (" + jqXHR.responseJSON.code + ")";
          } else {
            this.errorMsg = status + ", " + text;
          }
        });
      }
    },
    /**
     * 测试服务器是否可用
     */
    testServerConnectivity() {
      this.successMsg = "";
      this.errorMsg = "";
      let options = Object.assign({}, this.option);
      if (!options.address) {
        this.errorMsg = this.$t(
          "settings.downloadClients.editor.testAddressError"
        ).toString();
        return;
      }
      this.testing = true;
      extension$1.sendRequest(EAction.testBackupServerConnectivity, null, options).then((result) => {
        console.log(result);
        if (result) {
          this.successMsg = this.$t(
            "settings.downloadClients.editor.testSuccess"
          ).toString();
          this.setTestButtonStatus(this.testButtonStatus.success);
        } else {
          this.errorMsg = this.$t(
            "settings.downloadClients.editor.testError"
          ).toString();
        }
        this.errorMsg && this.setTestButtonStatus(this.testButtonStatus.error);
        this.testing = false;
      }).catch((result) => {
        console.log(result);
        if (result && result.data && result.data.msg) {
          this.errorMsg = result.data.msg;
        } else {
          this.errorMsg = this.$t(
            "settings.downloadClients.editor.testError"
          ).toString();
        }
        this.setTestButtonStatus(this.testButtonStatus.error);
        this.testing = false;
      });
    },
    setTestButtonStatus(status) {
      this.testButtonIcon = this.buttonIcon[status];
      this.testButtonColor = this.buttonColor[status];
      window.setTimeout(() => {
        this.testButtonIcon = this.buttonIcon.default;
        this.testButtonColor = this.buttonColor.default;
        this.successMsg = "";
        this.errorMsg = "";
      }, 3e3);
    }
  }
});
var _sfc_render$5 = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-card", { staticClass: "mb-5", attrs: { "color": _vm.$vuetify.dark ? "" : "grey lighten-4" } }, [_c("v-card-text", [_c("v-form", { model: { value: _vm.valid, callback: function($$v) {
    _vm.valid = $$v;
  }, expression: "valid" } }, [_c("v-text-field", { attrs: { "label": _vm.$t("settings.backup.server.editor.type"), "placeholder": _vm.$t("settings.backup.server.editor.type"), "disabled": "", "value": _vm.type } }), _c("v-text-field", { ref: "name", attrs: { "label": _vm.$t("settings.backup.server.editor.name"), "placeholder": _vm.$t("settings.backup.server.editor.name"), "required": "", "rules": _vm.rules.require }, model: { value: _vm.option.name, callback: function($$v) {
    _vm.$set(_vm.option, "name", $$v);
  }, expression: "option.name" } }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.backup.server.editor.address"), "placeholder": _vm.$t("settings.backup.server.editor.address"), "required": "", "rules": [_vm.rules.url] }, model: { value: _vm.option.address, callback: function($$v) {
    _vm.$set(_vm.option, "address", $$v);
  }, expression: "option.address" } }), _vm.type === "OWSS" ? [_c("v-text-field", { attrs: { "label": _vm.$t("settings.backup.server.editor.authCode"), "placeholder": _vm.$t("settings.backup.server.editor.authCode"), "required": "", "rules": _vm.rules.require, "type": _vm.showAuthCode ? "text" : "password" }, scopedSlots: _vm._u([{ key: "append", fn: function() {
    return [_c("v-icon", { on: { "click": function($event) {
      _vm.showAuthCode = !_vm.showAuthCode;
    } } }, [_vm._v(_vm._s(_vm.showAuthCode ? "visibility_off" : "visibility"))]), _c("v-btn", { attrs: { "flat": "", "small": "", "color": "primary" }, on: { "click": _vm.applyAuthCode } }, [_vm._v(_vm._s(_vm.$t("settings.backup.server.editor.applyAuthCode")))])];
  }, proxy: true }], null, false, 1616167299), model: { value: _vm.option.authCode, callback: function($$v) {
    _vm.$set(_vm.option, "authCode", $$v);
  }, expression: "option.authCode" } })] : [_c("v-text-field", { attrs: { "label": _vm.$t("settings.backup.server.editor.loginName"), "placeholder": _vm.$t("settings.backup.server.editor.loginName"), "required": "", "rules": _vm.rules.require }, model: { value: _vm.option.loginName, callback: function($$v) {
    _vm.$set(_vm.option, "loginName", $$v);
  }, expression: "option.loginName" } }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.backup.server.editor.loginPwd"), "placeholder": _vm.$t("settings.backup.server.editor.loginPwd"), "required": "", "rules": _vm.rules.require, "type": _vm.showLoginPwd ? "text" : "password" }, scopedSlots: _vm._u([{ key: "append", fn: function() {
    return [_c("v-icon", { on: { "click": function($event) {
      _vm.showLoginPwd = !_vm.showLoginPwd;
    } } }, [_vm._v(_vm._s(_vm.showLoginPwd ? "visibility_off" : "visibility"))])];
  }, proxy: true }]), model: { value: _vm.option.loginPwd, callback: function($$v) {
    _vm.$set(_vm.option, "loginPwd", $$v);
  }, expression: "option.loginPwd" } }), _c("v-switch", { attrs: { "label": _vm.$t("settings.backup.server.editor.digest") }, model: { value: _vm.option.digest, callback: function($$v) {
    _vm.$set(_vm.option, "digest", $$v);
  }, expression: "option.digest" } })]], 2), _c("v-btn", { attrs: { "flat": "", "block": "", "color": _vm.testButtonColor, "loading": _vm.testing, "disabled": _vm.testing || !_vm.valid }, on: { "click": _vm.testServerConnectivity } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v(_vm._s(_vm.testButtonIcon))]), _vm._v(" " + _vm._s(_vm.successMsg || _vm.errorMsg || _vm.$t("settings.downloadClients.editor.test")) + " ")], 1)], 1)], 1), _c("v-snackbar", { attrs: { "absolute": "", "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
    _vm.haveError = $$v;
  }, expression: "haveError" } }, [_vm._v(_vm._s(_vm.errorMsg))]), _c("v-snackbar", { attrs: { "absolute": "", "bottom": "", "timeout": 3e3, "color": "success" }, model: { value: _vm.haveSuccess, callback: function($$v) {
    _vm.haveSuccess = $$v;
  }, expression: "haveSuccess" } }, [_vm._v(_vm._s(_vm.successMsg))])], 1);
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false,
  null,
  null,
  null,
  null
);
const Editor = __component__$5.exports;
const _sfc_main$4 = Vue.extend({
  components: {
    Editor
  },
  data() {
    return {
      show: false,
      selected: {},
      valid: false,
      newData: {}
    };
  },
  props: {
    value: Boolean,
    type: {
      type: String,
      default: EBackupServerType.OWSS
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    show() {
      this.$emit("change", this.show);
      if (!this.show) {
        this.selected = {};
      }
    },
    value() {
      this.show = this.value;
    }
  },
  methods: {
    save() {
      this.$emit(
        "save",
        Object.assign({ type: EBackupServerType.WebDAV }, this.newData)
      );
      this.show = false;
    },
    cancel() {
      this.show = false;
    },
    change(options) {
      console.log(options);
      this.newData = options.data;
      this.valid = options.valid;
    }
  }
});
var _sfc_render$4 = function render2() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-dialog", { attrs: { "max-width": "800" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-toolbar", { attrs: { "dark": "", "color": "blue-grey darken-2" } }, [_c("v-toolbar-title", [_vm._v(_vm._s(_vm.$t("settings.backup.server.add.title")))]), _c("v-spacer"), _c("v-btn", { attrs: { "icon": "", "flat": "", "color": "success", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/config-backup-server", "target": "_blank", "rel": "noopener noreferrer nofollow", "title": _vm.$t("common.help") } }, [_c("v-icon", [_vm._v("help")])], 1)], 1), _c("v-card-text", { staticClass: "body" }, [_c("Editor", { attrs: { "type": _vm.type, "initData": _vm.selected, "show": _vm.show }, on: { "change": _vm.change } })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3 toolbar" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1)], 1);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  "3eeff9b6",
  null,
  null
);
const ServerAdd = __component__$4.exports;
const _sfc_main$3 = Vue.extend({
  components: {
    Editor
  },
  data() {
    return {
      show: false,
      valid: false,
      newData: {},
      defaultItem: {}
    };
  },
  props: {
    value: Boolean,
    initData: Object,
    type: {
      type: String,
      default: EBackupServerType.OWSS
    }
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    show() {
      this.$emit("change", this.show);
    },
    value() {
      this.show = this.value;
      if (this.show) {
        this.defaultItem = Object.assign({}, this.initData);
      }
    }
  },
  methods: {
    save() {
      this.$emit("save", this.newData);
      this.show = false;
    },
    cancel() {
      this.show = false;
    },
    change(options) {
      console.log(options);
      this.newData = options.data;
      this.valid = options.valid;
    }
  }
});
var _sfc_render$3 = function render3() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-dialog", { attrs: { "max-width": "800" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-toolbar", { attrs: { "dark": "", "color": "blue-grey darken-2" } }, [_c("v-toolbar-title", [_vm._v(_vm._s(_vm.$t("settings.backup.server.edit.title")))]), _c("v-spacer"), _c("v-btn", { attrs: { "icon": "", "flat": "", "color": "success", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/config-backup-server", "target": "_blank", "rel": "noopener noreferrer nofollow", "title": _vm.$t("common.help") } }, [_c("v-icon", [_vm._v("help")])], 1)], 1), _c("v-card-text", { staticClass: "body" }, [_c("Editor", { attrs: { "type": _vm.type, "initData": _vm.defaultItem, "show": _vm.show }, on: { "change": _vm.change } })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3 toolbar" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1)], 1);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  null,
  null,
  null
);
const ServerEdit = __component__$3.exports;
const _sfc_main$2 = Vue.extend({
  data() {
    return {
      downloadingIndex: 0
    };
  },
  props: {
    items: Array,
    loading: Boolean,
    downloading: Boolean,
    server: Object
  },
  methods: {
    onDelete(item, index) {
      this.$emit("delete", this.server, item, index);
    },
    selectRestoreType(item, index, event) {
      this.downloadingIndex = index;
      let menus = [];
      menus.push({
        title: this.$t("settings.backup.restoreAll"),
        fn: () => {
          console.log(this.server);
          this.$emit("download", this.server, item, ERestoreContent.all);
        }
      });
      menus.push({});
      menus.push({
        title: this.$t("settings.backup.restoreCollection"),
        fn: () => {
          this.$emit("download", this.server, item, ERestoreContent.collection);
        }
      });
      if (PPF.checkOptionalPermission("cookies")) {
        menus.push({});
        menus.push({
          title: this.$t("settings.backup.restoreCookies"),
          fn: () => {
            this.$emit("download", this.server, item, ERestoreContent.cookies);
          }
        });
      }
      menus.push({});
      menus.push({
        title: this.$t("settings.backup.restoreSearchResultSnapshot"),
        fn: () => {
          this.$emit(
            "download",
            this.server,
            item,
            ERestoreContent.searchResultSnapshot
          );
        }
      });
      menus.push({});
      menus.push({
        title: this.$t("settings.backup.restoreKeepUploadTask"),
        fn: () => {
          this.$emit(
            "download",
            this.server,
            item,
            ERestoreContent.keepUploadTask
          );
        }
      });
      menus.push({});
      menus.push({
        title: this.$t("settings.backup.restoreDownloadHistory"),
        fn: () => {
          this.$emit(
            "download",
            this.server,
            item,
            ERestoreContent.downloadHistory
          );
        }
      });
      PPF.showContextMenu(menus, event);
    }
  }
});
var _sfc_render$2 = function render4() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_vm.loading ? _c("v-progress-circular", { staticClass: "ma-2", attrs: { "indeterminate": "", "color": "primary", "width": 3 } }) : _vm._e(), _vm.items && _vm.items.length > 0 ? _c("v-list", { attrs: { "two-line": "", "dense": "" } }, [_vm._l(_vm.items, function(item, index) {
    return [item.type == "file" ? _c("v-list-tile", { key: item.name }, [_c("v-list-tile-avatar", [_c("v-icon", { staticClass: "grey lighten-1 white--text" }, [_vm._v("bookmark")])], 1), _c("v-list-tile-content", [_c("v-list-tile-title", [_vm._v(_vm._s(item.name))]), _c("v-list-tile-sub-title", [_c("div", [_c("span", { staticClass: "caption mr-2" }, [_c("span", [_vm._v(_vm._s(_vm._f("formatDate")(item.time)))]), _c("span", { staticClass: "mx-2" }, [_vm._v(_vm._s(_vm._f("formatSize")(item.size)))])]), _c("v-btn", { staticClass: "mx-0", attrs: { "icon": "", "small": "", "loading": _vm.downloading && _vm.downloadingIndex == index, "title": _vm.$t("settings.backup.restore") }, on: { "click": function($event) {
      return _vm.selectRestoreType(item, index, $event);
    } } }, [_c("v-icon", { attrs: { "color": "info", "small": "" } }, [_vm._v("cloud_download")])], 1), _c("v-btn", { staticClass: "mx-0", attrs: { "icon": "", "ripple": "", "small": "", "title": _vm.$t("common.remove") }, on: { "click": function($event) {
      return _vm.onDelete(item, index);
    } } }, [_c("v-icon", { attrs: { "color": "red", "small": "" } }, [_vm._v("delete")])], 1)], 1)])], 1), _c("v-list-tile-action")], 1) : _vm._e(), _c("v-divider", { key: index })];
  })], 2) : !_vm.loading ? _c("v-list", { attrs: { "two-line": "", "dense": "" } }, [_c("v-list-tile", [_c("v-list-tile-content", [_vm._v(_vm._s(_vm.$t("settings.backup.server.list.noData")))])], 1)], 1) : _vm._e()], 1);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  null,
  null,
  null
);
const ServerList = __component__$2.exports;
const _sfc_main$1 = Vue.extend({
  props: {
    timeout: {
      type: Number,
      default: 5e3
    }
  },
  data() {
    return {
      items: [],
      working: true
    };
  },
  watch: {
    items: {
      handler() {
        this.change();
      },
      deep: true
    }
  },
  methods: {
    add(item) {
      item.status = EWorkingStatus.loading;
      this.items.push(item);
    },
    update(key, status) {
      let index = this.items.findIndex((_) => {
        return _.key === key;
      });
      if (index != -1) {
        this.items[index].status = status;
      }
    },
    clear() {
      this.items = [];
    },
    change() {
      if (!this.items) {
        this.working = false;
        return;
      }
      if (this.items.length == 0) {
        this.working = false;
        return;
      }
      let workingCount = 0;
      this.items.forEach((item) => {
        if (item.status === EWorkingStatus.loading) {
          workingCount++;
        }
      });
      if (workingCount > 0) {
        this.working = true;
      } else {
        setTimeout(() => {
          this.working = false;
        }, this.timeout);
      }
    },
    getColor(item) {
      switch (item.status) {
        case EWorkingStatus.success:
        case EWorkingStatus.error:
          return item.status;
        default:
          return "info";
      }
    },
    getIcon(item) {
      switch (item.status) {
        case EWorkingStatus.success:
          return "check";
        case EWorkingStatus.error:
          return "close";
        default:
          return "refresh";
      }
    }
  }
});
var _sfc_render$1 = function render5() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _vm.working ? _c("div", [_c("v-list", _vm._l(_vm.items, function(item, index) {
    return _c("v-list-tile", { key: index }, [_c("v-list-tile-action", [_c("v-btn", { attrs: { "flat": "", "icon": "", "loading": item.status == "loading" } }, [_c("v-icon", { attrs: { "color": _vm.getColor(item) } }, [_vm._v(_vm._s(_vm.getIcon(item)))])], 1)], 1), _c("v-list-tile-content", [_c("v-list-tile-title", { domProps: { "textContent": _vm._s(item.title) } })], 1)], 1);
  }), 1)], 1) : _vm._e();
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  null,
  null,
  null
);
const WorkingStatus = __component__$1.exports;
const extension = new Extension();
const backupFileParser = new BackupFileParser();
const _sfc_main = Vue.extend({
  components: {
    WorkingStatus,
    ServerAdd,
    ServerEdit,
    ServerList
  },
  data() {
    return {
      fileName: "PT-plugin-plus-config.json",
      fileInput: null,
      zipFileName: "PT-Plugin-Plus-Config.zip",
      errorMsg: "",
      haveError: false,
      haveSuccess: false,
      successMsg: "",
      status: {
        backupToGoogle: false,
        restoreFromGoogle: false,
        clearFromGoogle: false
      },
      isDevelopmentMode: true,
      pagination: {
        rowsPerPage: -1
      },
      selected: [],
      showServerAdd: false,
      showServerEdit: false,
      currentServerType: EBackupServerType.OWSS,
      servers: [],
      selectedItem: {},
      backupServerTypes: [
        {
          type: EBackupServerType.OWSS
        },
        {
          type: EBackupServerType.WebDAV
        }
      ],
      workingStatus: null
    };
  },
  mounted() {
    this.fileInput = this.$refs.fileRestore;
    this.fileInput.addEventListener("change", this.restoreFile);
    this.workingStatus = this.$refs.workingStatus;
  },
  beforeDestroy() {
    this.fileInput.removeEventListener("change", this.restoreFile);
  },
  created() {
    APP.getInstallType().then((result) => {
      this.isDevelopmentMode = [
        EInstallType.development,
        EInstallType.crx
      ].includes(result);
    }).catch(() => {
      console.log("获取安装方式失败");
    });
    this.initBackupServers();
  },
  methods: {
    t(key) {
      return this.$t(key).toString();
    },
    /**
     * 初始化备份服务器列表
     */
    initBackupServers() {
      if (this.$store.state.options.backupServers && this.$store.state.options.backupServers.length > 0) {
        this.servers = [];
        this.$store.state.options.backupServers.forEach(
          (item) => {
            this.servers.push(
              Object.assign(
                {
                  loading: false,
                  backingup: false,
                  deleting: false,
                  restoring: false,
                  dataList: []
                },
                JSON.parse(JSON.stringify(item))
              )
            );
          }
        );
      }
    },
    backup() {
      this.clearMessage();
      extension.sendRequest(EAction.getClearedOptions).then((options) => {
        const Blob = window.Blob;
        delete options.system;
        const data = new Blob([JSON.stringify(options)], {
          type: "text/plain"
        });
        FileSaver.saveAs(data, this.fileName);
        this.successMsg = this.$t("settings.backup.backupDone").toString();
      }).catch(() => {
        this.errorMsg = this.$t("settings.backup.backupError").toString();
      });
    },
    restore() {
      this.fileInput.click();
    },
    restoreFile(event) {
      this.clearMessage();
      let restoreFile = event.srcElement;
      if (restoreFile.files.length > 0 && restoreFile.files[0].name.length > 0) {
        let file = restoreFile.files[0];
        if (file.name.substr(-4) === ".zip") {
          this.restoreFromZipFile(file);
          restoreFile.value = "";
          return;
        }
        var r = new FileReader();
        r.onload = (e) => {
          let result = JSON.parse(e.target.result);
          this.restoreConfirm({
            options: result
          });
        };
        r.onerror = () => {
          this.errorMsg = this.$t("settings.backup.loadError").toString();
        };
        r.readAsText(file);
        restoreFile.value = "";
      }
    },
    backupToGoogle() {
      this.clearMessage();
      this.status.backupToGoogle = true;
      extension.sendRequest(EAction.backupToGoogle).then(() => {
        this.successMsg = this.$t("settings.backup.backupDone").toString();
      }).catch((error) => {
        console.log(error.msg);
        if (error.msg && error.msg.message) {
          switch (true) {
            case error.msg.message.indexOf("QUOTA_BYTES_PER_ITEM") != -1:
              this.errorMsg = this.$t(
                "settings.backup.errorMessage.QUOTA_BYTES_PER_ITEM"
              ).toString();
              break;
            default:
              this.errorMsg = this.$t(
                "settings.backup.backupError"
              ).toString();
              break;
          }
        } else {
          this.errorMsg = this.$t("settings.backup.backupError").toString();
        }
        extension.sendRequest(EAction.writeLog, null, {
          module: EModule.options,
          event: "backupToGoogle",
          msg: this.$t("settings.backup.backupError").toString(),
          data: error
        });
      }).finally(() => {
        this.status.backupToGoogle = false;
      });
    },
    restoreFromGoogle() {
      if (!confirm(this.$t("settings.backup.restoreConfirm").toString())) {
        return;
      }
      this.clearMessage();
      this.status.restoreFromGoogle = true;
      extension.sendRequest(EAction.restoreFromGoogle).then((options) => {
        this.successMsg = this.$t(
          "settings.backup.restoreSuccess"
        ).toString();
        this.$store.commit("updateOptions", options);
      }).catch((error) => {
        this.errorMsg = this.$t("settings.backup.restoreError").toString();
        extension.sendRequest(EAction.writeLog, null, {
          module: EModule.options,
          event: "restoreFromGoogle",
          msg: this.$t("settings.backup.restoreError").toString(),
          data: error
        });
      }).finally(() => {
        this.status.restoreFromGoogle = false;
      });
    },
    clearMessage() {
      this.successMsg = "";
      this.errorMsg = "";
    },
    clearFromGoogle() {
      if (!confirm(this.$t("settings.backup.clearFromGoogleConfirm").toString())) {
        return;
      }
      this.clearMessage();
      this.status.clearFromGoogle = true;
      extension.sendRequest(EAction.clearFromGoogle).then((options) => {
        this.successMsg = this.$t(
          "settings.backup.clearFromGoogleSuccess"
        ).toString();
      }).catch((error) => {
        this.errorMsg = this.$t(
          "settings.backup.clearFromGoogleError"
        ).toString();
        extension.sendRequest(EAction.writeLog, null, {
          module: EModule.options,
          event: "clearFromGoogle",
          msg: this.$t("settings.backup.clearFromGoogleError").toString(),
          data: error
        });
      }).finally(() => {
        this.status.clearFromGoogle = false;
      });
    },
    /**
     * 创建备份文件
     */
    createBackupFile() {
      switch (PPF.browserName) {
        case EBrowserType.Chrome:
          extension.sendRequest(EAction.createBackupFile).then((result) => {
            console.log(result);
          }).catch((error) => {
            console.log(error);
            this.errorMsg = this.$t("settings.backup.backupError").toString();
          });
          break;
        default:
          extension.sendRequest(EAction.getBackupRawData).then((result) => {
            backupFileParser.createBackupFileBlob(result).then((blob) => {
              FileSaver.saveAs(blob, PPF.getNewBackupFileName());
            });
            console.log(result);
          }).catch((error) => {
            console.log(error);
            this.errorMsg = this.$t("settings.backup.backupError").toString();
          });
          break;
      }
    },
    /**
     * 从 zip 文件中恢复配置信息
     */
    restoreFromZipFile(file) {
      backupFileParser.loadZipData(
        file,
        this.$t("settings.backup.enterSecretKey").toString(),
        this.$store.state.options.encryptSecretKey
      ).then((result) => {
        console.log(result);
        this.restoreConfirm(result);
      }).catch((error) => {
        console.log(error);
        if (typeof error === "string") {
          if (this.$te(`settings.backup.restoreErrorType.${error}`)) {
            this.errorMsg = this.$t(
              `settings.backup.restoreErrorType.${error}`
            ).toString();
            return;
          }
        }
        this.errorMsg = this.$t("settings.backup.restoreError").toString();
      });
    },
    /**
     * 恢复配置确认
     */
    restoreConfirm(infos, restoreContent = ERestoreContent.all) {
      switch (restoreContent) {
        case ERestoreContent.collection:
          if (!infos.collection) {
            this.errorMsg = this.$t(
              "settings.backup.contentNotExist.collection"
            ).toString();
            return;
          }
          break;
        case ERestoreContent.cookies:
          if (!infos.cookies) {
            this.errorMsg = this.$t(
              "settings.backup.contentNotExist.cookies"
            ).toString();
            return;
          }
          break;
        case ERestoreContent.keepUploadTask:
          if (!infos.keepUploadTask) {
            this.errorMsg = this.$t(
              "settings.backup.contentNotExist.keepUploadTask"
            ).toString();
            return;
          }
          break;
        case ERestoreContent.searchResultSnapshot:
          if (!infos.searchResultSnapshot) {
            this.errorMsg = this.$t(
              "settings.backup.contentNotExist.searchResultSnapshot"
            ).toString();
            return;
          }
          break;
        case ERestoreContent.downloadHistory:
          if (!infos.downloadHistory) {
            this.errorMsg = this.$t(
              "settings.backup.contentNotExist.downloadHistory"
            ).toString();
            return;
          }
          break;
      }
      if (confirm(this.$t("settings.backup.restoreConfirm").toString())) {
        try {
          this.workingStatus.clear();
          if (infos.options && (restoreContent == ERestoreContent.all || restoreContent == ERestoreContent.options)) {
            this.workingStatus.add({
              key: "options",
              title: this.t("settings.backup.backupItem.base")
            });
            let sites = [];
            infos.options.sites.forEach((site) => {
              if (site.host) {
                sites.push(site);
              }
            });
            infos.options.sites = sites;
            infos.options.encryptSecretKey = this.$store.state.options.encryptSecretKey;
            this.$store.dispatch("resetRunTimeOptions", infos.options);
            this.workingStatus.update("options", EWorkingStatus.success);
          }
          if (infos.datas && (restoreContent == ERestoreContent.all || restoreContent == ERestoreContent.userDatas)) {
            this.workingStatus.add({
              key: "userDatas",
              title: this.t("settings.backup.backupItem.userDatas")
            });
            extension.sendRequest(EAction.resetUserDatas, null, infos.datas).then(() => {
              this.workingStatus.update("userDatas", EWorkingStatus.success);
            }).catch(() => {
              this.workingStatus.update("userDatas", EWorkingStatus.error);
            });
          }
          if (infos.collection && (restoreContent == ERestoreContent.all || restoreContent == ERestoreContent.collection)) {
            this.workingStatus.add({
              key: "collection",
              title: this.t("settings.backup.backupItem.collection")
            });
            extension.sendRequest(
              EAction.resetTorrentCollections,
              null,
              infos.collection
            ).then(() => {
              this.$store.dispatch("saveConfig", {
                defaultCollectionGroupId: ""
              });
              this.workingStatus.update("collection", EWorkingStatus.success);
            }).catch(() => {
              this.workingStatus.update("collection", EWorkingStatus.error);
            });
          }
          if (infos.searchResultSnapshot && (restoreContent == ERestoreContent.all || restoreContent == ERestoreContent.searchResultSnapshot)) {
            this.workingStatus.add({
              key: "searchResultSnapshot",
              title: this.t("settings.backup.backupItem.searchResultSnapshot")
            });
            extension.sendRequest(
              EAction.resetSearchResultSnapshot,
              null,
              infos.searchResultSnapshot
            ).then(() => {
              this.workingStatus.update(
                "searchResultSnapshot",
                EWorkingStatus.success
              );
            }).catch(() => {
              this.workingStatus.update(
                "searchResultSnapshot",
                EWorkingStatus.error
              );
            });
          }
          if (infos.keepUploadTask && (restoreContent == ERestoreContent.all || restoreContent == ERestoreContent.keepUploadTask)) {
            this.workingStatus.add({
              key: "keepUploadTask",
              title: this.t("settings.backup.backupItem.keepUploadTask")
            });
            extension.sendRequest(
              EAction.resetKeepUploadTask,
              null,
              infos.keepUploadTask
            ).then(() => {
              this.workingStatus.update(
                "keepUploadTask",
                EWorkingStatus.success
              );
            }).catch(() => {
              this.workingStatus.update(
                "keepUploadTask",
                EWorkingStatus.error
              );
            });
          }
          if (infos.downloadHistory && (restoreContent == ERestoreContent.all || restoreContent == ERestoreContent.downloadHistory)) {
            this.workingStatus.add({
              key: "downloadHistory",
              title: this.t("settings.backup.backupItem.downloadHistory")
            });
            extension.sendRequest(
              EAction.resetDownloadHistory,
              null,
              infos.downloadHistory
            ).then(() => {
              this.workingStatus.update(
                "downloadHistory",
                EWorkingStatus.success
              );
            }).catch(() => {
              this.workingStatus.update(
                "downloadHistory",
                EWorkingStatus.error
              );
            });
          }
          if (infos.cookies && (restoreContent == ERestoreContent.all || restoreContent == ERestoreContent.cookies) && PPF.checkOptionalPermission("cookies")) {
            if (restoreContent == ERestoreContent.all && !confirm(
              this.$t("settings.backup.restoreCookiesConfirm").toString()
            )) {
              this.successMsg = this.$t(
                "settings.backup.restoreSuccess"
              ).toString();
              return;
            }
            this.workingStatus.add({
              key: "cookies",
              title: this.t("settings.backup.backupItem.cookies")
            });
            PPF.usePermissions(
              ["cookies"],
              true,
              this.$t("permissions.request.cookies").toString()
            ).then(() => {
              return extension.sendRequest(
                EAction.restoreCookies,
                null,
                infos.cookies
              );
            }).then(() => {
              this.successMsg = this.$t(
                "settings.backup.restoreSuccess"
              ).toString();
              this.workingStatus.update("cookies", EWorkingStatus.success);
            }).catch(() => {
              this.errorMsg = this.$t(
                "settings.backup.restoreError"
              ).toString();
              this.workingStatus.update("cookies", EWorkingStatus.error);
            });
            return;
          }
          this.successMsg = this.$t(
            "settings.backup.restoreSuccess"
          ).toString();
        } catch (error) {
          this.errorMsg = this.$t("settings.backup.restoreError").toString();
        }
      }
    },
    /**
     * 添加备份服务器
     */
    addBackupServer(server) {
      this.$store.dispatch("addBackupServer", server).then(() => {
        this.initBackupServers();
      });
    },
    /**
     * 修改备份服务器
     */
    editBackupServer(server) {
      this.selectedItem = server;
      this.currentServerType = server.type;
      this.showServerEdit = true;
    },
    /**
     * 更新备份服务器
     */
    updateBackupServer(server) {
      this.$store.dispatch("updateBackupServer", server).then(() => {
        this.initBackupServers();
      });
    },
    /**
     * 删除备份服务器
     */
    removeBackupServer(server) {
      if (confirm(this.$t("common.removeConfirm").toString())) {
        let index = this.servers.findIndex((item) => {
          return item.id === server.id;
        });
        this.$store.dispatch("removeBackupServer", server);
        this.servers.splice(index, 1);
      }
    },
    /**
     * 备份到服务器
     */
    backupToServer(server) {
      server.backingup = true;
      extension.sendRequest(EAction.backupToServer, null, server).then((result) => {
        server.lastBackupTime = result.time;
        console.log(result);
      }).catch(() => {
        this.errorMsg = this.$t("settings.backup.backupError").toString();
      }).finally(() => {
        server.backingup = false;
      });
    },
    /**
     * 从服务器恢复指定的内容
     */
    restoreFromServer(server, options, restoreContent = ERestoreContent.all) {
      server.restoring = true;
      extension.sendRequest(EAction.restoreFromServer, null, {
        server,
        path: options.name
      }).then((result) => {
        this.restoreConfirm(result, restoreContent);
      }).catch((error) => {
        console.log(error);
        this.errorMsg = this.$t("settings.backup.restoreError").toString();
      }).finally(() => {
        server.restoring = false;
      });
    },
    /**
     * 获取已备份的文件列表
     */
    getBackupServerFileList(prop) {
      let server = prop.item;
      prop.expanded = true;
      server.loading = true;
      extension.sendRequest(EAction.getBackupListFromServer, null, {
        server,
        pageSize: 5,
        search: "PT-Plugin-Plus"
      }).then((result) => {
        prop.item.dataList = result;
        console.log(result);
      }).catch(() => {
        this.errorMsg = this.$t(
          "settings.backup.server.getFileListError"
        ).toString();
      }).finally(() => {
        server.loading = false;
      });
    },
    showAddServer(type) {
      this.currentServerType = type;
      this.showServerAdd = true;
    },
    deleteFileFromBackupServer(server, options, index) {
      if (!confirm(this.$t("common.removeConfirm").toString())) {
        return;
      }
      extension.sendRequest(EAction.deleteFileFromBackupServer, null, {
        server,
        path: options.name
      }).then((result) => {
        if (server.dataList && server.dataList[index]) {
          server.dataList.splice(index, 1);
        }
        console.log(result);
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        server.loading = false;
      });
    }
  },
  watch: {
    successMsg() {
      this.haveSuccess = this.successMsg != "";
    },
    errorMsg() {
      this.haveError = this.errorMsg != "";
    }
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("settings.backup.index.headers.name"),
          align: "left",
          width: 280,
          value: "name"
        },
        {
          text: this.$t("settings.backup.index.headers.action"),
          value: "name",
          sortable: false
        },
        {
          text: this.$t("settings.backup.index.headers.type"),
          align: "left",
          value: "type"
        },
        {
          text: this.$t("settings.backup.index.headers.lastBackupTime"),
          align: "left",
          value: "lastBackupTime"
        }
      ];
    }
  }
});
var _sfc_render = function render6() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("settings.backup.title")))]), _c("v-card", [_c("v-card-actions", { staticClass: "pa-3" }, [_c("input", { ref: "fileRestore", staticStyle: { "display": "none" }, attrs: { "type": "file" } }), _c("v-btn", { attrs: { "color": "success" }, on: { "click": _vm.createBackupFile } }, [_c("v-icon", [_vm._v("save")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.backup.backup")))])], 1), _c("v-btn", { attrs: { "color": "info" }, on: { "click": _vm.restore } }, [_c("v-icon", [_vm._v("restore")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.backup.restore")))])], 1), _c("v-divider", { staticClass: "mx-3 mt-0", attrs: { "vertical": "" } }), _c("v-menu", { attrs: { "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on }) {
    return [_c("v-btn", _vm._g({ attrs: { "color": "blue-grey", "dark": "" } }, on), [_c("v-icon", [_vm._v("add")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.backup.server.add.title")))])], 1)];
  } }]) }, [_c("v-list", _vm._l(_vm.backupServerTypes, function(item, index) {
    return _c("v-list-tile", { key: index, on: { "click": function($event) {
      return _vm.showAddServer(item.type);
    } } }, [_c("v-list-tile-title", [_vm._v(_vm._s(item.type))])], 1);
  }), 1)], 1), _c("v-spacer"), !_vm.isDevelopmentMode ? _c("div", [_c("v-btn", { attrs: { "color": "success", "loading": _vm.status.backupToGoogle, "disabled": _vm.status.backupToGoogle, "title": _vm.$t("settings.backup.backupToGoogle") }, on: { "click": _vm.backupToGoogle } }, [_c("v-icon", [_vm._v("backup")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.backup.backupToGoogle")))])], 1), _c("v-btn", { attrs: { "color": "info", "loading": _vm.status.restoreFromGoogle, "disabled": _vm.status.restoreFromGoogle, "title": _vm.$t("settings.backup.restoreFromGoogle") }, on: { "click": _vm.restoreFromGoogle } }, [_c("v-icon", [_vm._v("cloud_download")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.backup.restoreFromGoogle")))])], 1), _c("v-btn", { attrs: { "color": "error", "loading": _vm.status.clearFromGoogle, "disabled": _vm.status.clearFromGoogle, "title": _vm.$t("settings.backup.clearFromGoogleTip") }, on: { "click": _vm.clearFromGoogle } }, [_c("v-icon", [_vm._v("delete_sweep")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.backup.clearFromGoogle")))])], 1)], 1) : _vm._e()], 1), _c("WorkingStatus", { ref: "workingStatus" }), _c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": _vm.servers, "pagination": _vm.pagination, "item-key": "id", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", [_c("a", { on: { "click": function($event) {
      return _vm.editBackupServer(props.item);
    } } }, [_vm._v(_vm._s(props.item.name))])]), _c("td", [_c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "loading": props.item.backingup, "color": "success", "title": _vm.$t("settings.backup.server.list.backupToServer") }, on: { "click": function($event) {
      return _vm.backupToServer(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("backup")])], 1), _c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "loading": props.item.loading, "color": "info", "title": _vm.$t("settings.backup.server.list.loadBackupList") }, on: { "click": function($event) {
      return _vm.getBackupServerFileList(props);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("restore")])], 1), _c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "color": "grey", "title": _vm.$t("common.edit") }, on: { "click": function($event) {
      return _vm.editBackupServer(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("edit")])], 1), _c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "loading": props.item.deleting, "color": "error", "title": _vm.$t("common.remove") }, on: { "click": function($event) {
      return _vm.removeBackupServer(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("delete")])], 1)], 1), _c("td", [_vm._v(_vm._s(props.item.type))]), _c("td", [_vm._v(_vm._s(_vm._f("formatDate")(props.item.lastBackupTime)))])];
  } }, { key: "expand", fn: function(props) {
    return [_c("div", { staticClass: "px-5", staticStyle: { "padding-left": "80px !important" } }, [_c("ServerList", { attrs: { "items": props.item.dataList, "server": props.item, "loading": props.item.loading, "downloading": props.item.restoring }, on: { "download": _vm.restoreFromServer, "delete": _vm.deleteFileFromBackupServer } })], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("v-alert", { attrs: { "value": true, "color": "grey" } }, [_vm._v(_vm._s(_vm.$t("settings.backup.subTitle")))]), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
    _vm.haveError = $$v;
  }, expression: "haveError" } }, [_vm._v(_vm._s(_vm.errorMsg))]), _c("v-snackbar", { attrs: { "bottom": "", "timeout": 3e3, "color": "success" }, model: { value: _vm.haveSuccess, callback: function($$v) {
    _vm.haveSuccess = $$v;
  }, expression: "haveSuccess" } }, [_vm._v(_vm._s(_vm.successMsg))]), _c("ServerAdd", { attrs: { "type": _vm.currentServerType }, on: { "save": _vm.addBackupServer }, model: { value: _vm.showServerAdd, callback: function($$v) {
    _vm.showServerAdd = $$v;
  }, expression: "showServerAdd" } }), _c("ServerEdit", { attrs: { "type": _vm.currentServerType, "initData": _vm.selectedItem }, on: { "save": _vm.updateBackupServer }, model: { value: _vm.showServerEdit, callback: function($$v) {
    _vm.showServerEdit = $$v;
  }, expression: "showServerEdit" } })], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null,
  null,
  null
);
const Index = __component__.exports;
export {
  Index as default
};
