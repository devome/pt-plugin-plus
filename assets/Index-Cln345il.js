import { E as Extension, V as Vue, a as EAction, n as normalizeComponent, c as EMediaServerType } from "./index-DzMzv318.js";
const extension = new Extension();
const _sfc_main$2 = Vue.extend({
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
          ) || this.$t("settings.mediaServers.editor.addressTip");
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
    },
    successMsg() {
      this.haveSuccess = this.successMsg != "";
    },
    errorMsg() {
      this.haveError = this.errorMsg != "";
    }
  },
  methods: {
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
      extension.sendRequest(EAction.testMediaServerConnectivity, null, options).then((result) => {
        console.log(result);
        if (result) {
          this.successMsg = this.$t(
            "settings.downloadClients.editor.testSuccess"
          ).toString();
          this.setTestButtonStatus(this.testButtonStatus.success);
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
var _sfc_render$2 = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-card", { staticClass: "mb-5", attrs: { "color": _vm.$vuetify.dark ? "" : "grey lighten-4" } }, [_c("v-card-text", [_c("v-form", { model: { value: _vm.option.valid, callback: function($$v) {
    _vm.$set(_vm.option, "valid", $$v);
  }, expression: "option.valid" } }, [_c("v-text-field", { attrs: { "label": _vm.$t("settings.mediaServers.editor.type"), "placeholder": _vm.$t("settings.mediaServers.editor.type"), "disabled": "", "value": _vm.option.type } }), _c("v-text-field", { ref: "name", attrs: { "label": _vm.$t("settings.mediaServers.editor.name"), "placeholder": _vm.$t("settings.mediaServers.editor.name"), "required": "", "rules": _vm.rules.require }, model: { value: _vm.option.name, callback: function($$v) {
    _vm.$set(_vm.option, "name", $$v);
  }, expression: "option.name" } }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.mediaServers.editor.address"), "placeholder": _vm.$t("settings.mediaServers.editor.address"), "required": "", "rules": [_vm.rules.url] }, model: { value: _vm.option.address, callback: function($$v) {
    _vm.$set(_vm.option, "address", $$v);
  }, expression: "option.address" } }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.mediaServers.editor.apiKey"), "placeholder": _vm.$t("settings.mediaServers.editor.apiKey"), "required": "", "rules": _vm.rules.require }, model: { value: _vm.option.apiKey, callback: function($$v) {
    _vm.$set(_vm.option, "apiKey", $$v);
  }, expression: "option.apiKey" } })], 1), _c("v-btn", { attrs: { "flat": "", "block": "", "color": _vm.testButtonColor, "loading": _vm.testing, "disabled": _vm.testing || !_vm.option.valid }, on: { "click": _vm.testServerConnectivity } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v(_vm._s(_vm.testButtonIcon))]), _vm._v(" " + _vm._s(_vm.successMsg || _vm.errorMsg || _vm.$t("settings.mediaServers.editor.test")) + " ")], 1), _vm.option.description ? _c("v-alert", { attrs: { "value": true, "color": "info" } }, [_vm._v(_vm._s(_vm.option.description))]) : _vm._e(), _vm.option.warning ? _c("v-alert", { attrs: { "value": true, "color": "warning" } }, [_vm._v(_vm._s(_vm.option.warning))]) : _vm._e()], 1)], 1), _c("v-snackbar", { attrs: { "absolute": "", "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
    _vm.haveError = $$v;
  }, expression: "haveError" } }, [_vm._v(_vm._s(_vm.errorMsg))]), _c("v-snackbar", { attrs: { "absolute": "", "bottom": "", "timeout": 3e3, "color": "success" }, model: { value: _vm.haveSuccess, callback: function($$v) {
    _vm.haveSuccess = $$v;
  }, expression: "haveSuccess" } }, [_vm._v(_vm._s(_vm.successMsg))])], 1);
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
const Editor = __component__$2.exports;
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
var _sfc_render$1 = function render2() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-dialog", { attrs: { "max-width": "800" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline blue-grey darken-2", staticStyle: { "color": "white" } }, [_vm._v(_vm._s(_vm.option.id ? _vm.$t("common.edit") : _vm.$t("common.add")) + " " + _vm._s(_vm.$t("settings.mediaServers.index.title")))]), _c("v-card-text", [_c("Editor", { attrs: { "option": _vm.defaultItem } })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.defaultItem.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1);
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
const Emby = __component__$1.exports;
const _sfc_main = Vue.extend({
  components: {
    Emby
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
      currentServerType: EMediaServerType.Emby,
      mediaServerTypes: [
        EMediaServerType.Emby
      ],
      dialogRemoveConfirm: false
    };
  },
  created() {
    this.items = this.$store.state.options.system.mediaServers;
    this.$store.state.options.mediaServers.forEach((c) => {
      if (c.enabled === void 0) {
        c.enabled = true;
        this.updateItem(c);
      }
    });
  },
  methods: {
    add(type) {
      this.currentServerType = type;
      this.selectedItem = {
        type: this.currentServerType
      };
      this.showEditDialog = true;
    },
    addItem(item) {
      let index = this.$store.state.options.mediaServers.findIndex((data) => {
        return data.name === item.name;
      });
      if (index === -1) {
        this.$store.commit("addMediaServer", item);
      } else {
        this.itemDuplicate = true;
      }
    },
    edit(item) {
      let index = this.$store.state.options.mediaServers.findIndex((data) => {
        return item.id === data.id;
      });
      if (index !== -1) {
        this.selectedItem = this.$store.state.options.mediaServers[index];
        this.showEditDialog = true;
      }
    },
    updateItem(item) {
      console.debug("updateMediaServer", item);
      this.$store.commit("updateMediaServer", item);
      this.pagination.rowsPerPage = 0;
      this.pagination.rowsPerPage = -1;
    },
    remove() {
      this.dialogRemoveConfirm = false;
      this.$store.commit("removeMediaServer", this.selectedItem);
      this.selectedItem = {};
    },
    removeConfirm(item) {
      this.selectedItem = item;
      this.dialogRemoveConfirm = true;
    },
    clear() {
      if (confirm(
        this.$t("settings.mediaServers.index.clearConfirm").toString()
      )) {
        this.$store.commit("clearMediaServer");
      }
    },
    removeSelected() {
      if (confirm(
        this.$t(
          "settings.mediaServers.index.removeSelectedConfirm"
        ).toString()
      )) {
        console.log(this.selected);
        this.selected.forEach((item) => {
          this.$store.commit("removeMediaServer", item);
        });
        this.selected = [];
      }
    },
    updateEnabled(item) {
      item.enabled = !item.enabled;
      this.updateItem(item);
    }
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("settings.mediaServers.index.headers.name"),
          align: "left",
          value: "name"
        },
        {
          text: this.$t("settings.mediaServers.index.headers.enabled"),
          align: "left",
          value: "enabled"
        },
        {
          text: this.$t("settings.mediaServers.index.headers.type"),
          align: "left",
          value: "type"
        },
        {
          text: this.$t("settings.mediaServers.index.headers.address"),
          align: "left",
          value: "address"
        },
        {
          text: this.$t("settings.mediaServers.index.headers.action"),
          value: "name",
          sortable: false
        }
      ];
    }
  }
});
var _sfc_render = function render3() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "cus-page" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("settings.mediaServers.index.title")))]), _c("v-card", [_c("v-card-title", [_c("v-menu", { attrs: { "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on }) {
    return [_c("v-btn", _vm._g({ attrs: { "color": "blue-grey", "dark": "" } }, on), [_c("v-icon", [_vm._v("add")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.add")))])], 1)];
  } }]) }, [_c("v-list", _vm._l(_vm.mediaServerTypes, function(item, index) {
    return _c("v-list-tile", { key: index, on: { "click": function($event) {
      return _vm.add(item);
    } } }, [_c("v-list-tile-title", [_vm._v(_vm._s(item))])], 1);
  }), 1)], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.removeSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("common.remove")) + " ")], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": this.$store.state.options.mediaServers, "pagination": _vm.pagination, "item-key": "id", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", [_c("a", { on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v(_vm._s(props.item.name))])]), _c("td", [_c("v-switch", { attrs: { "true-value": "true", "false-value": "false", "input-value": props.item.enabled ? "true" : "false", "hide-details": "" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.updateEnabled(props.item);
    } } })], 1), _c("td", [_vm._v(_vm._s(props.item.type))]), _c("td", [_c("a", { attrs: { "href": props.item.address, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_vm._v(_vm._s(props.item.address))])]), _c("td", [_c("v-icon", { staticClass: "mr-2", attrs: { "small": "" }, on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v("edit")]), _c("v-icon", { attrs: { "small": "", "color": "error" }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_vm._v("delete")])], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c(_vm.currentServerType, { tag: "component", attrs: { "option": _vm.selectedItem }, on: { "save": _vm.updateItem }, model: { value: _vm.showEditDialog, callback: function($$v) {
    _vm.showEditDialog = $$v;
  }, expression: "showEditDialog" } }), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("settings.mediaServers.index.removeConfirmTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("settings.mediaServers.index.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
    _vm.dialogRemoveConfirm = false;
  } } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "color": "error", "flat": "" }, on: { "click": _vm.remove } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1), _c("v-alert", { attrs: { "value": true, "color": "grey" } }, [_c("div", { domProps: { "innerHTML": _vm._s(_vm.$t("settings.mediaServers.index.subTitle")) } })]), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.itemDuplicate, callback: function($$v) {
    _vm.itemDuplicate = $$v;
  }, expression: "itemDuplicate" } }, [_vm._v(_vm._s(_vm.$t("settings.mediaServers.index.itemDuplicate")))])], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "5a16d74e",
  null,
  null
);
const Index = __component__.exports;
export {
  Index as default
};
