import { E as Extension, V as Vue, a as EAction, n as normalizeComponent } from "./index-a-kPTsLM.js";
const extension = new Extension();
const _sfc_main$3 = Vue.extend({
  data() {
    return {
      showPassword: false,
      categoryText: "",
      customTagText: "",
      rules: {
        require: [(v) => !!v || "!"],
        url: (v) => {
          return /^(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;\[\]]+[-A-Za-z0-9+&@#/%=~_|]$/.test(
            v
          ) || this.$t("settings.downloadClients.editor.addressTip");
        }
      },
      testing: false,
      haveError: false,
      haveSuccess: false,
      successMsg: "",
      errorMsg: "",
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
    option: Object
  },
  watch: {
    option() {
      console.log(`watch option`, this.option);
      let qbCategories = this.option.qbCategories || [];
      let customTags = this.option.customTags || [];
      this.categoryText = qbCategories.map((c) => `${c.name},${c.path}`).join("\n");
      this.customTagText = customTags.join(",");
    },
    categoryText() {
      this.option.qbCategories = this.categoryText.split(/\n/).filter((_) => !!_).map((_) => _.split(/\s*[,，]\s*/)).filter(([name, path]) => !!name && !!path).map(([name, path]) => ({ name, path }));
    },
    customTagText() {
      this.option.customTags = this.customTagText.split(/\s*[,，]\s*/).filter((_) => !!_);
    },
    successMsg() {
      this.haveSuccess = this.successMsg != "";
    },
    errorMsg() {
      this.haveError = this.errorMsg != "";
    }
  },
  methods: {
    testClientConnectivity() {
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
      extension.sendRequest(EAction.testClientConnectivity, null, options).then((result) => {
        console.log(result);
        if (result.success) {
          this.successMsg = this.$t(
            "settings.downloadClients.editor.testSuccess"
          ).toString();
          this.setTestButtonStatus(this.testButtonStatus.success);
        } else if (result && result.data) {
          if (result.data.msg) {
            this.errorMsg = result.data.msg;
          } else if (result.data.code === 0) {
            this.errorMsg = this.$t(
              "settings.downloadClients.editor.testConnectionError"
            ).toString();
          } else {
            this.errorMsg = this.$t(
              "settings.downloadClients.editor.testOtherError",
              {
                code: result.data.code
              }
            ).toString();
          }
        } else {
          this.errorMsg = this.$t(
            "settings.downloadClients.editor.testUnknownError"
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
var _sfc_render$3 = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-card", { staticClass: "mb-5", attrs: { "color": _vm.$vuetify.dark ? "" : "grey lighten-4" } }, [_c("v-card-text", [_c("v-form", { model: { value: _vm.option.valid, callback: function($$v) {
    _vm.$set(_vm.option, "valid", $$v);
  }, expression: "option.valid" } }, [_c("v-text-field", { attrs: { "label": _vm.$t("settings.downloadClients.editor.name"), "placeholder": _vm.$t("settings.downloadClients.editor.name"), "required": "", "rules": _vm.rules.require }, model: { value: _vm.option.name, callback: function($$v) {
    _vm.$set(_vm.option, "name", $$v);
  }, expression: "option.name" } }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.downloadClients.editor.address"), "placeholder": _vm.$t("settings.downloadClients.editor.addressTip"), "required": "", "rules": [_vm.rules.url] }, model: { value: _vm.option.address, callback: function($$v) {
    _vm.$set(_vm.option, "address", $$v);
  }, expression: "option.address" } }), !_vm.option.passwordOnly ? _c("v-text-field", { attrs: { "label": _vm.$t("settings.downloadClients.editor.loginName"), "placeholder": _vm.$t("settings.downloadClients.editor.loginName") }, model: { value: _vm.option.loginName, callback: function($$v) {
    _vm.$set(_vm.option, "loginName", $$v);
  }, expression: "option.loginName" } }) : _vm._e(), _c("v-text-field", { attrs: { "label": _vm.$t("settings.downloadClients.editor.loginPwd"), "placeholder": _vm.$t("settings.downloadClients.editor.loginPwd"), "type": _vm.showPassword ? "text" : "password", "append-icon": _vm.showPassword ? "visibility_off" : "visibility" }, on: { "click:append": function($event) {
    _vm.showPassword = !_vm.showPassword;
  } }, model: { value: _vm.option.loginPwd, callback: function($$v) {
    _vm.$set(_vm.option, "loginPwd", $$v);
  }, expression: "option.loginPwd" } }), _c("v-switch", { attrs: { "label": _vm.$t("settings.downloadClients.editor.enabled") }, model: { value: _vm.option.enabled, callback: function($$v) {
    _vm.$set(_vm.option, "enabled", $$v);
  }, expression: "option.enabled" } }), ["transmission", "qbittorrent"].includes(_vm.option.type) ? _c("v-switch", { attrs: { "label": _vm.$t("settings.downloadClients.editor.autoStart") }, model: { value: _vm.option.autoStart, callback: function($$v) {
    _vm.$set(_vm.option, "autoStart", $$v);
  }, expression: "option.autoStart" } }) : _vm._e(), ["qbittorrent"].includes(_vm.option.type) ? _c("v-switch", { attrs: { "label": _vm.$t("settings.downloadClients.editor.tagIMDb") }, model: { value: _vm.option.tagIMDb, callback: function($$v) {
    _vm.$set(_vm.option, "tagIMDb", $$v);
  }, expression: "option.tagIMDb" } }) : _vm._e(), _c("v-switch", { attrs: { "label": _vm.$t("settings.downloadClients.editor.hostnameAsTag") }, model: { value: _vm.option.hostnameAsTag, callback: function($$v) {
    _vm.$set(_vm.option, "hostnameAsTag", $$v);
  }, expression: "option.hostnameAsTag" } }), _c("v-switch", { attrs: { "label": _vm.$t("settings.downloadClients.editor.siteNameAsTag") }, model: { value: _vm.option.siteNameAsTag, callback: function($$v) {
    _vm.$set(_vm.option, "siteNameAsTag", $$v);
  }, expression: "option.siteNameAsTag" } }), _c("v-switch", { attrs: { "label": _vm.$t("settings.downloadClients.editor.enableCategory") }, model: { value: _vm.option.enableCategory, callback: function($$v) {
    _vm.$set(_vm.option, "enableCategory", $$v);
  }, expression: "option.enableCategory" } }), _vm.option.enableCategory ? _c("v-textarea", { attrs: { "label": _vm.$t("settings.downloadClients.editor.enableCategoryText"), "hint": _vm.$t("settings.downloadClients.editor.enableCategoryTextTip") }, model: { value: _vm.categoryText, callback: function($$v) {
    _vm.categoryText = $$v;
  }, expression: "categoryText" } }) : _vm._e(), _c("v-text-field", { attrs: { "label": _vm.$t("settings.downloadClients.editor.customTagText"), "hint": _vm.$t("settings.downloadClients.editor.customTagTextTip") }, model: { value: _vm.customTagText, callback: function($$v) {
    _vm.customTagText = $$v;
  }, expression: "customTagText" } }), _c("v-text-field", { attrs: { "value": _vm.option.type, "label": _vm.$t("settings.downloadClients.editor.type"), "disabled": "" } }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.downloadClients.editor.id"), "disabled": "", "value": _vm.option.id, "placeholder": _vm.$t("settings.downloadClients.editor.autoCreate") } })], 1), _c("v-btn", { attrs: { "flat": "", "block": "", "color": _vm.testButtonColor, "loading": _vm.testing, "disabled": _vm.testing || !_vm.option.valid }, on: { "click": _vm.testClientConnectivity } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v(_vm._s(_vm.testButtonIcon))]), _vm._v(" " + _vm._s(_vm.successMsg || _vm.errorMsg || _vm.$t("settings.downloadClients.editor.test")) + " ")], 1), _vm.option.description ? _c("v-alert", { attrs: { "value": true, "color": "info" } }, [_vm._v(_vm._s(_vm.option.description))]) : _vm._e(), _vm.option.warning ? _c("v-alert", { attrs: { "value": true, "color": "warning" } }, [_vm._v(_vm._s(_vm.option.warning))]) : _vm._e()], 1)], 1), _c("v-snackbar", { attrs: { "absolute": "", "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
    _vm.haveError = $$v;
  }, expression: "haveError" } }, [_vm._v(_vm._s(_vm.errorMsg))]), _c("v-snackbar", { attrs: { "absolute": "", "bottom": "", "timeout": 3e3, "color": "success" }, model: { value: _vm.haveSuccess, callback: function($$v) {
    _vm.haveSuccess = $$v;
  }, expression: "haveSuccess" } }, [_vm._v(_vm._s(_vm.successMsg))])], 1);
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
const Editor = __component__$3.exports;
const _sfc_main$2 = Vue.extend({
  components: {
    Editor
  },
  data() {
    return {
      step: 1,
      show: false,
      stepCount: 2,
      selectedData: {},
      selectedItem: {},
      valid: false,
      items: this.$store.state.options.system.clients,
      options: this.$store.state.options
    };
  },
  props: {
    value: Boolean
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    show() {
      this.$emit("change", this.show);
      if (!this.show) {
        this.step = 1;
        this.selectedItem = { name: "" };
      }
    },
    value() {
      this.show = this.value;
    }
  },
  methods: {
    save() {
      this.$emit("save", this.selectedData);
      this.show = false;
    },
    next(step) {
      if (this.selectedItem && this.selectedItem.name) {
        this.selectedData = Object.assign({}, this.selectedItem);
        if (this.selectedData.enabled === void 0) {
          this.selectedData.enabled = true;
        }
        this.valid = false;
        this.step++;
      } else {
        this.valid = true;
      }
    },
    cancel() {
      this.show = false;
    }
  },
  created() {
  }
});
var _sfc_render$2 = function render2() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.valid, callback: function($$v) {
    _vm.valid = $$v;
  }, expression: "valid" } }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.add.validMsg")))]), _c("v-dialog", { attrs: { "max-width": "800" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-toolbar", { attrs: { "dark": "", "color": "blue-grey darken-2" } }, [_c("v-toolbar-title", [_vm._v(_vm._s(_vm.$t("settings.downloadClients.add.title")))]), _c("v-spacer"), _c("v-btn", { attrs: { "icon": "", "flat": "", "color": "success", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/config-download-client", "target": "_blank", "rel": "noopener noreferrer nofollow", "title": _vm.$t("common.help") } }, [_c("v-icon", [_vm._v("help")])], 1)], 1), _c("v-card-text", [_c("v-stepper", { model: { value: _vm.step, callback: function($$v) {
    _vm.step = $$v;
  }, expression: "step" } }, [_c("v-stepper-header", [_c("v-stepper-step", { attrs: { "complete": _vm.step > 1, "step": "1" } }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.add.titleStep1")))]), _c("v-divider"), _c("v-stepper-step", { attrs: { "step": "2" } }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.add.titleStep2")))])], 1), _c("v-stepper-items", [_c("v-stepper-content", { attrs: { "step": "1" } }, [_c("v-autocomplete", { attrs: { "items": _vm.items, "label": _vm.$t("settings.downloadClients.add.validMsg"), "menu-props": { maxHeight: "auto" }, "hint": _vm.selectedItem.description, "persistent-hint": "", "return-object": "", "single-line": "", "item-text": "name", "item-value": "name" }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
    return [_c("v-list-tile-avatar", [_c("img", { attrs: { "src": item.icon } })]), _c("span", { domProps: { "textContent": _vm._s(item.name) } })];
  } }, { key: "item", fn: function(data) {
    return [_c("v-list-tile-avatar", [_c("img", { attrs: { "src": data.item.icon } })]), _c("v-list-tile-content", [_c("v-list-tile-title", { domProps: { "innerHTML": _vm._s(data.item.name) } })], 1), _c("v-list-tile-action", [_c("v-list-tile-action-text", [_vm._v(_vm._s(data.item.ver))])], 1)];
  } }]), model: { value: _vm.selectedItem, callback: function($$v) {
    _vm.selectedItem = $$v;
  }, expression: "selectedItem" } })], 1), _c("v-stepper-content", { attrs: { "step": "2" } }, [_c("Editor", { attrs: { "option": _vm.selectedData } })], 1)], 1)], 1)], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == 1, expression: "step == 1" }], attrs: { "flat": "", "color": "grey darken-1", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/tree/master/resource/clients", "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-icon", [_vm._v("help")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.add.helpMsg")))])], 1), _c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.add.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "grey darken-1", "disabled": _vm.step === 1 }, on: { "click": function($event) {
    _vm.step--;
  } } }, [_c("v-icon", [_vm._v("navigate_before")]), _c("span", [_vm._v(_vm._s(_vm.$t("settings.downloadClients.add.prevStep")))])], 1), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _vm.step < _vm.stepCount, expression: "step < stepCount" }], attrs: { "flat": "", "color": "blue" }, on: { "click": function($event) {
    return _vm.next(_vm.step);
  } } }, [_c("span", [_vm._v(_vm._s(_vm.$t("settings.downloadClients.add.nextStep")))]), _c("v-icon", [_vm._v("navigate_next")])], 1), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _vm.step === _vm.stepCount, expression: "step === stepCount" }], attrs: { "flat": "", "color": "success", "disabled": !_vm.selectedData.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")])], 1)], 1)], 1)], 1)], 1);
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
const AddItem = __component__$2.exports;
const _sfc_main$1 = Vue.extend({
  components: {
    Editor
  },
  data() {
    return {
      show: false,
      defaultItem: {
        name: ""
      }
    };
  },
  props: {
    value: Boolean,
    option: Object
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
        this.defaultItem = Object.assign({}, this.option);
      }
    }
  },
  methods: {
    save() {
      this.$emit("save", this.defaultItem);
      this.show = false;
    },
    cancel() {
      this.show = false;
    }
  }
});
var _sfc_render$1 = function render3() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-dialog", { attrs: { "max-width": "800" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline blue-grey darken-2", staticStyle: { "color": "white" } }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.edit.title")))]), _c("v-card-text", [_c("Editor", { attrs: { "option": _vm.defaultItem } })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.edit.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.defaultItem.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.edit.ok")))])], 1)], 1)], 1)], 1);
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
const EditItem = __component__$1.exports;
const _sfc_main = Vue.extend({
  components: {
    AddItem,
    EditItem
  },
  data() {
    return {
      showAddDialog: false,
      showEditDialog: false,
      itemDuplicate: false,
      selected: [],
      selectedItem: {},
      pagination: {
        rowsPerPage: -1
      },
      items: [],
      dialogRemoveConfirm: false
    };
  },
  created() {
    this.items = this.$store.state.options.system.clients;
    this.$store.state.options.clients.forEach((c) => {
      if (c.enabled === void 0) {
        c.enabled = true;
        this.updateItem(c);
      }
    });
  },
  methods: {
    add() {
      this.showAddDialog = true;
    },
    addItem(item) {
      let index = this.$store.state.options.clients.findIndex((data) => {
        return data.name === item.name;
      });
      if (index === -1) {
        this.$store.commit("addClient", item);
      } else {
        this.itemDuplicate = true;
      }
    },
    edit(item) {
      let index = this.$store.state.options.clients.findIndex((data) => {
        return item.id === data.id;
      });
      if (index !== -1) {
        this.selectedItem = this.$store.state.options.clients[index];
        this.showEditDialog = true;
      }
    },
    updateItem(item) {
      console.debug("updateClient", item);
      this.$store.commit("updateClient", item);
    },
    remove() {
      this.dialogRemoveConfirm = false;
      this.$store.commit("removeClient", this.selectedItem);
      this.selectedItem = {};
    },
    removeConfirm(item) {
      this.selectedItem = item;
      this.dialogRemoveConfirm = true;
    },
    clear() {
      if (confirm(
        this.$t("settings.downloadClients.index.clearConfirm").toString()
      )) {
        this.$store.commit("clearClients");
      }
    },
    removeSelected() {
      if (confirm(
        this.$t(
          "settings.downloadClients.index.removeSelectedConfirm"
        ).toString()
      )) {
        console.log(this.selected);
        this.selected.forEach((item) => {
          this.$store.commit("removeClient", item);
        });
        this.selected = [];
      }
    }
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("settings.downloadClients.index.headers.name"),
          align: "left",
          value: "name"
        },
        {
          text: this.$t("settings.downloadClients.index.headers.enabled"),
          align: "left",
          value: "enabled"
        },
        {
          text: this.$t("settings.downloadClients.index.headers.type"),
          align: "left",
          value: "type"
        },
        {
          text: this.$t("settings.downloadClients.index.headers.address"),
          align: "left",
          value: "address"
        },
        {
          text: this.$t("settings.downloadClients.index.headers.action"),
          value: "name",
          sortable: false
        }
      ];
    }
  }
});
var _sfc_render = function render4() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "set-download-clients" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.index.title")))]), _c("v-card", [_c("v-card-title", [_c("v-btn", { attrs: { "color": "success" }, on: { "click": _vm.add } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("add")]), _vm._v(" " + _vm._s(_vm.$t("settings.downloadClients.index.add")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.removeSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("settings.downloadClients.index.remove")) + " ")], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": this.$store.state.options.clients, "pagination": _vm.pagination, "item-key": "id", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", [_c("a", { on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v(_vm._s(props.item.name))])]), _c("td", [_vm._v(_vm._s(props.item.enabled === false ? _vm.$t("settings.downloadClients.index.no") : _vm.$t("settings.downloadClients.index.yes")))]), _c("td", [_vm._v(_vm._s(props.item.type))]), _c("td", [_c("a", { attrs: { "href": props.item.address, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_vm._v(_vm._s(props.item.address))])]), _c("td", [_c("v-icon", { staticClass: "mr-2", attrs: { "small": "" }, on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v("edit")]), _c("v-icon", { attrs: { "small": "", "color": "error" }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_vm._v("delete")])], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("AddItem", { on: { "save": _vm.addItem }, model: { value: _vm.showAddDialog, callback: function($$v) {
    _vm.showAddDialog = $$v;
  }, expression: "showAddDialog" } }), _c("EditItem", { attrs: { "option": _vm.selectedItem }, on: { "save": _vm.updateItem }, model: { value: _vm.showEditDialog, callback: function($$v) {
    _vm.showEditDialog = $$v;
  }, expression: "showEditDialog" } }), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.index.removeConfirmTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("settings.downloadClients.index.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
    _vm.dialogRemoveConfirm = false;
  } } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.index.cancel")))])], 1), _c("v-btn", { attrs: { "color": "error", "flat": "" }, on: { "click": _vm.remove } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.index.ok")))])], 1)], 1)], 1)], 1), _c("v-alert", { attrs: { "value": true, "color": "grey" } }, [_c("div", { domProps: { "innerHTML": _vm._s(_vm.$t("settings.downloadClients.index.subTitle")) } })]), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.itemDuplicate, callback: function($$v) {
    _vm.itemDuplicate = $$v;
  }, expression: "itemDuplicate" } }, [_vm._v(_vm._s(_vm.$t("settings.downloadClients.index.itemDuplicate")))])], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "64e18ce3",
  null,
  null
);
const Index = __component__.exports;
export {
  Index as default
};
