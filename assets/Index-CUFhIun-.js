import { V as Vue, n as normalizeComponent, P as PPF, F as FileSaver } from "./index-CmTMbFC9.js";
const _sfc_main$3 = Vue.extend({
  data() {
    return {
      rules: {
        require: [(v) => !!v || "!"]
      },
      valid: false,
      option: {
        name: "",
        id: null,
        pages: [],
        scripts: [],
        styles: [],
        script: "",
        style: "",
        readonly: false
      }
    };
  },
  props: {
    initData: {
      type: Object,
      default: () => ({
        valid: false,
        readonly: false
      })
    }
  },
  watch: {
    option: {
      handler() {
        this.$emit("change", {
          data: this.option,
          valid: this.valid
        });
      },
      deep: true
    },
    initData() {
      if (this.initData) {
        this.option = Object.assign({}, this.initData);
      }
    }
  }
});
var _sfc_render$3 = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-card", { staticClass: "mb-5", attrs: { "color": _vm.$vuetify.dark ? "" : "grey lighten-4" } }, [_c("v-card-text", [_c("v-form", { model: { value: _vm.valid, callback: function($$v) {
    _vm.valid = $$v;
  }, expression: "valid" } }, [_c("v-text-field", { ref: "name", attrs: { "label": _vm.$t("settings.sitePlugins.editor.name"), "placeholder": _vm.$t("settings.sitePlugins.editor.name"), "required": "", "rules": _vm.rules.require, "disabled": _vm.option.readonly }, model: { value: _vm.option.name, callback: function($$v) {
    _vm.$set(_vm.option, "name", $$v);
  }, expression: "option.name" } }), _c("v-combobox", { attrs: { "hide-selected": "", "hint": _vm.$t("settings.sitePlugins.editor.pagesTip"), "label": _vm.$t("settings.sitePlugins.editor.pages"), "multiple": "", "persistent-hint": "", "small-chips": "", "disabled": _vm.option.readonly }, model: { value: _vm.option.pages, callback: function($$v) {
    _vm.$set(_vm.option, "pages", $$v);
  }, expression: "option.pages" } }), _c("v-combobox", { attrs: { "hide-selected": "", "hint": _vm.$t("settings.sitePlugins.editor.scriptsTip"), "label": _vm.$t("settings.sitePlugins.editor.scripts"), "multiple": "", "persistent-hint": "", "small-chips": "", "disabled": _vm.option.readonly }, model: { value: _vm.option.scripts, callback: function($$v) {
    _vm.$set(_vm.option, "scripts", $$v);
  }, expression: "option.scripts" } }), _c("v-combobox", { attrs: { "hide-selected": "", "hint": _vm.$t("settings.sitePlugins.editor.stylesTip"), "label": _vm.$t("settings.sitePlugins.editor.styles"), "multiple": "", "persistent-hint": "", "small-chips": "", "disabled": _vm.option.readonly }, model: { value: _vm.option.styles, callback: function($$v) {
    _vm.$set(_vm.option, "styles", $$v);
  }, expression: "option.styles" } }), _c("v-textarea", { attrs: { "label": _vm.$t("settings.sitePlugins.editor.script"), "height": "200", "disabled": _vm.option.readonly }, model: { value: _vm.option.script, callback: function($$v) {
    _vm.$set(_vm.option, "script", $$v);
  }, expression: "option.script" } }), _c("v-textarea", { attrs: { "label": _vm.$t("settings.sitePlugins.editor.style"), "height": "200", "disabled": _vm.option.readonly }, model: { value: _vm.option.style, callback: function($$v) {
    _vm.$set(_vm.option, "style", $$v);
  }, expression: "option.style" } })], 1)], 1)], 1);
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
      show: false,
      selected: {
        script: `(function() {
  console.log("I'm a plugin.");
})();`
      },
      valid: false,
      newData: {}
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
        this.selected = {};
      }
    },
    value() {
      this.show = this.value;
    }
  },
  methods: {
    save() {
      this.$emit("save", Object.assign({ isCustom: true }, this.newData));
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
var _sfc_render$2 = function render2() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-dialog", { attrs: { "fullscreen": "" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-toolbar", { attrs: { "dark": "", "color": "blue-grey darken-2" } }, [_c("v-toolbar-title", [_vm._v(_vm._s(_vm.$t("settings.sitePlugins.add.title")))]), _c("v-spacer"), _c("v-btn", { attrs: { "icon": "", "flat": "", "color": "success", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/config-custom-plugin", "target": "_blank", "rel": "noopener noreferrer nofollow", "title": _vm.$t("common.help") } }, [_c("v-icon", [_vm._v("help")])], 1)], 1), _c("v-card-text", { staticClass: "body" }, [_c("Editor", { attrs: { "initData": _vm.selected }, on: { "change": _vm.change } })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3 toolbar" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1)], 1);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  "efedd329",
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
      defaultItem: {},
      newData: {},
      valid: false
    };
  },
  props: {
    value: Boolean,
    initData: Object
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
var _sfc_render$1 = function render3() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-dialog", { attrs: { "fullscreen": "" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-toolbar", { attrs: { "dark": "", "color": "blue-grey darken-2" } }, [_c("v-toolbar-title", [_vm._v(_vm._s(_vm.$t("settings.sitePlugins.edit.title")))]), _c("v-spacer"), _c("v-btn", { attrs: { "icon": "", "flat": "", "color": "success", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/config-custom-plugin", "target": "_blank", "rel": "noopener noreferrer nofollow", "title": _vm.$t("common.help") } }, [_c("v-icon", [_vm._v("help")])], 1)], 1), _c("v-card-text", { staticClass: "body" }, [_c("Editor", { attrs: { "initData": _vm.defaultItem }, on: { "change": _vm.change } })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3 toolbar" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.valid || _vm.defaultItem.readonly }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "e92e93b4",
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
      selected: [],
      pagination: {
        rowsPerPage: -1
      },
      showAddDialog: false,
      showEditDialog: false,
      site: {},
      selectedItem: {
        name: "",
        id: null,
        pages: [],
        scripts: [],
        styles: [],
        script: "",
        style: "",
        readonly: false
      },
      dialogRemoveConfirm: false,
      plugins: [],
      fileImport: null,
      errorMsg: "",
      haveError: false,
      haveSuccess: false,
      successMsg: ""
    };
  },
  methods: {
    add() {
      this.showAddDialog = true;
    },
    edit(source) {
      this.selectedItem = PPF.clone(source);
      if (!source.id) {
        this.selectedItem.readonly = true;
      }
      this.showEditDialog = true;
    },
    removeConfirm(item) {
      this.selectedItem = item;
      this.dialogRemoveConfirm = true;
    },
    remove() {
      this.dialogRemoveConfirm = false;
      this.$store.commit("removePlugin", {
        host: this.site.host,
        plugin: this.selectedItem
      });
      this.selectedItem = {};
      this.reloadPlugins(this.site.host);
    },
    removeSelected() {
      if (confirm(
        this.$t("settings.sitePlugins.index.removeSelectedConfirm").toString()
      )) {
        this.selected.forEach((item) => {
          if (item.isCustom) {
            this.$store.commit("removePlugin", {
              host: this.site.host,
              plugin: item
            });
          }
        });
        this.selected = [];
        this.reloadPlugins(this.site.host);
      }
    },
    updateItem(item) {
      console.log(item);
      this.selectedItem = item;
      this.$store.commit("updatePlugin", {
        host: this.site.host,
        plugin: item
      });
      this.reloadPlugins(this.site.host);
    },
    addItem(item) {
      console.log(item);
      this.$store.commit("addPlugin", {
        host: this.site.host,
        plugin: item
      });
      this.reloadPlugins(this.site.host);
    },
    reloadPlugins(host) {
      this.site = this.$store.state.options.sites.find((item) => {
        return item.host == host;
      });
      if (this.site) {
        let plugins = [];
        let schema = this.site.schema;
        if (typeof schema === "string") {
          let _schema = this.$store.state.options.system.schemas.find(
            (item) => {
              return item.name == schema;
            }
          );
          if (_schema) {
            plugins.push(..._schema.plugins);
          }
        } else if (schema && schema.plugins) {
          let site = this.$store.state.options.system.sites.find(
            (item) => {
              return item.host == host;
            }
          );
          if (site && site.schema && site.schema.plugins) {
            plugins.push(...site.schema.plugins);
          }
        }
        if (this.site.plugins) {
          plugins.push(...this.site.plugins);
        }
        this.plugins = plugins;
      }
    },
    clearMessage() {
      this.successMsg = "";
      this.errorMsg = "";
    },
    /**
     * 导出插件
     */
    share(item) {
      let fileName = (this.site.host || this.site.name) + "-plugin-" + item.name + ".json";
      const blob = new Blob([JSON.stringify(item)], {
        type: "text/plain"
      });
      FileSaver.saveAs(blob, fileName);
    },
    /**
     * 导入配置文件
     */
    importConfig() {
      this.fileImport.click();
    },
    importConfigFile(event) {
      this.clearMessage();
      let inputDOM = event.srcElement;
      if (inputDOM.files.length > 0 && inputDOM.files[0].name.length > 0) {
        for (let index = 0; index < inputDOM.files.length; index++) {
          const file = inputDOM.files[index];
          const r = new FileReader();
          r.onload = (e) => {
            try {
              const result = JSON.parse(e.target.result);
              this.importPlugin(result);
            } catch (error) {
              console.log(error);
              this.errorMsg = this.$t("common.importFailed").toString();
            }
          };
          r.onerror = () => {
            this.errorMsg = this.$t("settings.backup.loadError").toString();
          };
          r.readAsText(file);
        }
        inputDOM.value = "";
      }
    },
    /**
     * 导入插件信息
     */
    importPlugin(source) {
      if (!(source.name && source.id && source.isCustom && source.pages && source.pages.length > 0)) {
        this.errorMsg = this.$t(
          "settings.sitePlugins.index.invalidPlugin"
        ).toString();
        return;
      }
      const plugin = this.getPlugin(source);
      if (plugin) {
        const newName = window.prompt(
          this.$t("settings.sitePlugins.index.importNameDuplicate", {
            name: plugin.name
          }).toString()
        );
        if (newName) {
          source.name = newName;
          this.importPlugin(source);
          return;
        } else {
          return;
        }
      }
      this.addItem(source);
      this.successMsg = this.$t("common.importSuccess").toString();
    },
    getPlugin(source) {
      const plugins = this.site.plugins;
      if (plugins && plugins.length > 0) {
        return plugins.find((item) => {
          return item.name === source.name;
        });
      }
      return null;
    }
  },
  created() {
    let host = this.$route.params["host"];
    console.log("create", this.$route.params);
    if (host) {
      this.reloadPlugins(host);
    }
  },
  mounted() {
    this.fileImport = this.$refs.fileImport;
    this.fileImport.addEventListener("change", this.importConfigFile);
  },
  beforeDestroy() {
    this.fileImport.removeEventListener("change", this.importConfigFile);
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("settings.sitePlugins.index.headers.name"),
          align: "left",
          value: "name"
        },
        {
          text: this.$t("settings.sitePlugins.index.headers.pages"),
          align: "left",
          value: "pages"
        },
        {
          text: this.$t("settings.sitePlugins.index.headers.enable"),
          align: "left",
          value: "enable"
        },
        {
          text: this.$t("settings.sitePlugins.index.headers.action"),
          value: "name",
          sortable: false
        }
      ];
    }
  },
  watch: {
    successMsg() {
      this.haveSuccess = this.successMsg != "";
    },
    errorMsg() {
      this.haveError = this.errorMsg != "";
    }
  }
});
var _sfc_render = function render4() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "site-plugins" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("settings.sitePlugins.index.title")) + " [" + _vm._s(_vm.site.name) + "]")]), _c("v-card", [_c("v-card-title", [_c("v-btn", { attrs: { "color": "success" }, on: { "click": _vm.add } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("add")]), _vm._v(" " + _vm._s(_vm.$t("common.add")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.removeSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("common.remove")) + " ")], 1), _c("v-divider", { staticClass: "mx-3 mt-0", attrs: { "inset": "", "vertical": "" } }), _c("input", { ref: "fileImport", staticStyle: { "display": "none" }, attrs: { "type": "file", "multiple": "", "accept": "application/json" } }), _c("v-btn", { attrs: { "color": "info" }, on: { "click": _vm.importConfig } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("folder_open")]), _vm._v(" " + _vm._s(_vm.$t("settings.sites.index.importConfig")) + " ")], 1), _c("v-divider", { staticClass: "mx-3 mt-0", attrs: { "inset": "", "vertical": "" } }), _c("v-btn", { attrs: { "color": "info", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/config-custom-plugin", "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("help")]), _vm._v(" " + _vm._s(_vm.$t("settings.siteSearchEntry.index.help")) + " ")], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": _vm.plugins, "pagination": _vm.pagination, "item-key": "name", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "20px" } }, [props.item.isCustom ? _c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } }) : _vm._e()], 1), _c("td", [_c("a", { on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_c("span", { staticClass: "ml-2" }, [_vm._v(_vm._s(props.item.name))])])]), _c("td", _vm._l(props.item.pages, function(page, index) {
      return _c("v-chip", { key: index, attrs: { "label": "", "color": "light-blue", "text-color": "white", "small": "" } }, [_vm._v(" " + _vm._s(page) + " ")]);
    }), 1), _c("td", [_vm._v(_vm._s(props.item.url))]), _c("td", [props.item.isCustom ? _c("v-icon", { staticClass: "mr-2", attrs: { "small": "", "title": _vm.$t("common.edit") }, on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v("edit")]) : _vm._e(), props.item.isCustom ? _c("v-icon", { attrs: { "small": "", "color": "error", "title": _vm.$t("common.remove") }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_vm._v("delete")]) : _vm._e(), props.item.isCustom ? _c("v-icon", { staticClass: "ml-2", attrs: { "small": "", "color": "info", "title": _vm.$t("common.share") }, on: { "click": function($event) {
      return _vm.share(props.item);
    } } }, [_vm._v("share")]) : _vm._e()], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("AddItem", { on: { "save": _vm.addItem }, model: { value: _vm.showAddDialog, callback: function($$v) {
    _vm.showAddDialog = $$v;
  }, expression: "showAddDialog" } }), _c("EditItem", { attrs: { "initData": _vm.selectedItem }, on: { "save": _vm.updateItem }, model: { value: _vm.showEditDialog, callback: function($$v) {
    _vm.showEditDialog = $$v;
  }, expression: "showEditDialog" } }), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("settings.sitePlugins.index.removeTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("settings.sitePlugins.index.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
    _vm.dialogRemoveConfirm = false;
  } } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "color": "error", "flat": "" }, on: { "click": _vm.remove } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
    _vm.haveError = $$v;
  }, expression: "haveError" } }, [_vm._v(_vm._s(_vm.errorMsg))]), _c("v-snackbar", { attrs: { "bottom": "", "timeout": 3e3, "color": "success" }, model: { value: _vm.haveSuccess, callback: function($$v) {
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
  "f7fccac8",
  null,
  null
);
const Index = __component__.exports;
export {
  Index as default
};
