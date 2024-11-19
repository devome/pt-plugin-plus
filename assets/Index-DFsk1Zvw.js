import { V as Vue, n as normalizeComponent, H as ERequestResultType, P as PPF } from "./index-FN6Cy8H5.js";
const _sfc_main$3 = Vue.extend({
  data() {
    return {
      rules: {
        require: [(v) => !!v || "!"]
      },
      checked: [],
      categoryConfig: {}
    };
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        valid: false
      })
    },
    site: Object
  },
  watch: {
    "data.categories"() {
      let result = [];
      if (this.data && this.data.categories && this.data.categories.length > 0) {
        this.data.categories.forEach((id) => {
          let cat = this.category.find((c) => {
            return c.id == id;
          });
          if (cat) {
            result.push(cat.key);
          }
        });
      }
      if (this.categoryConfig.appendToSearchKey) {
        this.data.appendToSearchKeyString = result.join("");
      } else {
        this.data.queryString = result.join("");
      }
    }
  },
  methods: {
    remove(category) {
      let index = this.data.categories.findIndex((item) => {
        return category.id === item.id;
      });
      if (index != -1) {
        this.data.categories.splice(index, 1);
      }
    }
  },
  computed: {
    /**
     * 获取当前可用类别
     */
    category() {
      let site = this.site;
      let result = [];
      if (site.categories) {
        site.categories.find((item) => {
          if (item.category && (item.entry == "*" || this.data.entry && this.data.entry.indexOf(item.entry) > -1)) {
            this.categoryConfig = item;
            let key = item.result + "";
            item.category.forEach((category) => {
              result.push(
                Object.assign(
                  {
                    key: key.replace(/\$id\$/gi, category.id + "")
                  },
                  category
                )
              );
            });
            return true;
          }
          return false;
        });
      }
      return result;
    }
  }
});
var _sfc_render$3 = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-card", { attrs: { "color": _vm.$vuetify.dark ? "" : "grey lighten-4" } }, [_c("v-card-text", [_c("v-form", { model: { value: _vm.data.valid, callback: function($$v) {
    _vm.$set(_vm.data, "valid", $$v);
  }, expression: "data.valid" } }, [_c("v-text-field", { ref: "name", attrs: { "label": _vm.$t("settings.siteSearchEntry.editor.name"), "placeholder": _vm.$t("settings.siteSearchEntry.editor.name"), "required": "", "rules": _vm.rules.require, "disabled": !_vm.data.isCustom }, model: { value: _vm.data.name, callback: function($$v) {
    _vm.$set(_vm.data, "name", $$v);
  }, expression: "data.name" } }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.siteSearchEntry.editor.entry"), "placeholder": _vm.$t("settings.siteSearchEntry.editor.entry"), "disabled": !_vm.data.isCustom }, model: { value: _vm.data.entry, callback: function($$v) {
    _vm.$set(_vm.data, "entry", $$v);
  }, expression: "data.entry" } }), _vm.category && _vm.category.length ? _c("v-autocomplete", { attrs: { "items": _vm.category, "label": _vm.$t("settings.siteSearchEntry.editor.category"), "item-text": "name", "item-value": "id", "chips": "", "clearable": "", "multiple": "", "disabled": !_vm.data.isCustom }, scopedSlots: _vm._u([{ key: "selection", fn: function(data) {
    return [_c("v-chip", { attrs: { "small": "", "selected": data.selected, "close": "" }, on: { "input": function($event) {
      return _vm.remove(data.item);
    } } }, [_vm._v(_vm._s(data.item.name))])];
  } }], null, false, 560667869), model: { value: _vm.data.categories, callback: function($$v) {
    _vm.$set(_vm.data, "categories", $$v);
  }, expression: "data.categories" } }) : _vm._e(), _c("v-text-field", { attrs: { "label": _vm.$t("settings.siteSearchEntry.editor.queryString"), "placeholder": _vm.$t("settings.siteSearchEntry.editor.queryString"), "disabled": !_vm.data.isCustom }, model: { value: _vm.data.queryString, callback: function($$v) {
    _vm.$set(_vm.data, "queryString", $$v);
  }, expression: "data.queryString" } }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.siteSearchEntry.editor.parseScriptFile"), "placeholder": _vm.$t("settings.siteSearchEntry.editor.parseScriptFile"), "disabled": !_vm.data.isCustom }, model: { value: _vm.data.parseScriptFile, callback: function($$v) {
    _vm.$set(_vm.data, "parseScriptFile", $$v);
  }, expression: "data.parseScriptFile" } }), _c("v-textarea", { attrs: { "label": _vm.$t("settings.siteSearchEntry.editor.parseScript"), "height": "200", "disabled": !_vm.data.isCustom }, model: { value: _vm.data.parseScript, callback: function($$v) {
    _vm.$set(_vm.data, "parseScript", $$v);
  }, expression: "data.parseScript" } }), _c("v-textarea", { attrs: { "label": _vm.$t("settings.siteSearchEntry.editor.resultSelector"), "height": "80", "disabled": !_vm.data.isCustom }, model: { value: _vm.data.resultSelector, callback: function($$v) {
    _vm.$set(_vm.data, "resultSelector", $$v);
  }, expression: "data.resultSelector" } })], 1)], 1)], 1);
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
      selected: { isCustom: true },
      valid: false
    };
  },
  props: {
    value: Boolean,
    site: Object
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    show() {
      this.$emit("change", this.show);
      if (!this.show) {
        this.selected = { isCustom: true };
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
        Object.assign(
          { isCustom: true, resultType: ERequestResultType.HTML },
          this.selected
        )
      );
      this.show = false;
    },
    cancel() {
      this.show = false;
    }
  }
});
var _sfc_render$2 = function render2() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-dialog", { attrs: { "max-width": "900" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline blue-grey darken-2", staticStyle: { "color": "white" } }, [_vm._v(_vm._s(_vm.$t("settings.siteSearchEntry.add.title")))]), _c("v-card-text", [_c("Editor", { attrs: { "data": _vm.selected, "site": _vm.site } })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.selected.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1)], 1);
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
      defaultItem: {}
    };
  },
  props: {
    value: Boolean,
    data: Object,
    site: Object
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
        this.defaultItem = Object.assign({}, this.data);
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
  return _c("v-dialog", { attrs: { "max-width": "900" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline blue-grey darken-2", staticStyle: { "color": "white" } }, [_vm._v(_vm._s(_vm.$t("settings.siteSearchEntry.edit.title")))]), _c("v-card-text", [_c("Editor", { attrs: { "data": _vm.defaultItem, "site": _vm.site } })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.defaultItem.valid && !_vm.defaultItem.isCustom }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1);
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
      selected: [],
      pagination: {
        rowsPerPage: -1
      },
      showAddDialog: false,
      showEditDialog: false,
      site: {},
      selectedItem: {},
      dialogRemoveConfirm: false,
      searchEntry: [],
      options: this.$store.state.options
    };
  },
  methods: {
    add() {
      this.showAddDialog = true;
    },
    copy(item) {
      let newItem = Object.assign({}, item);
      newItem.name += " Copy";
      newItem.isCustom = true;
      this.addItem(newItem);
    },
    edit(item) {
      if (item) {
        this.selectedItem = item;
        this.showEditDialog = true;
      }
    },
    removeConfirm(item) {
      this.selectedItem = item;
      this.dialogRemoveConfirm = true;
    },
    remove() {
      this.dialogRemoveConfirm = false;
      this.$store.dispatch("removeSiteSearchEntry", {
        host: this.site.host,
        item: this.selectedItem
      });
      this.selectedItem = {};
      this.reloadEntry(this.site.host);
    },
    removeSelected() {
      if (confirm(
        this.$t(
          "settings.siteSearchEntry.index.removeSelectedConfirm"
        ).toString()
      )) {
        this.selected.forEach((item) => {
          this.$store.dispatch("removeSiteSearchEntry", {
            host: this.site.host,
            item
          });
        });
        this.selected = [];
        this.reloadEntry(this.site.host);
      }
    },
    updateItem(item) {
      console.log(item);
      this.selectedItem = item;
      this.$store.dispatch("updateSiteSearchEntry", {
        host: this.site.host,
        item
      });
      this.reloadEntry(this.site.host);
    },
    addItem(item) {
      console.log(item);
      this.$store.dispatch("addSiteSearchEntry", {
        host: this.site.host,
        item
      });
      this.reloadEntry(this.site.host);
    },
    reloadEntry(host) {
      let site = this.$store.state.options.sites.find((item) => {
        return item.host == host;
      });
      if (site) {
        this.site = PPF.clone(site);
        let systemSite = this.options.system.sites.find((item) => {
          return item.host == host;
        });
        if (systemSite && systemSite.categories) {
          this.site.categories = PPF.clone(systemSite.categories);
        }
        let searchEntry = [];
        if (this.site.searchEntry && this.site.searchEntry.length > 0) {
          searchEntry.push(...this.site.searchEntry);
        } else {
          let schema = this.site.schema;
          if (typeof schema === "string") {
            let _schema = this.$store.state.options.system.schemas.find(
              (item) => {
                return item.name == schema;
              }
            );
            if (_schema) {
              searchEntry.push(..._schema.searchEntry);
            }
          }
        }
        this.searchEntry = PPF.clone(searchEntry);
      }
    },
    getCategory(entry) {
      let site = this.site;
      let result = [];
      if (site.categories && entry.categories) {
        site.categories.forEach((item) => {
          if (item.category && (item.entry == "*" || entry.entry.indexOf(item.entry))) {
            item.category.forEach((c) => {
              if (entry.categories && entry.categories.includes(c.id)) {
                result.push(c.name);
              }
            });
          }
        });
      }
      return result;
    }
  },
  created() {
    let host = this.$route.params["host"];
    console.log("create", this.$route.params);
    if (host) {
      this.reloadEntry(host);
    }
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("settings.siteSearchEntry.index.headers.name"),
          align: "left",
          value: "name"
        },
        {
          text: this.$t("settings.siteSearchEntry.index.headers.categories"),
          align: "left",
          value: "categories"
        },
        {
          text: this.$t("settings.siteSearchEntry.index.headers.enable"),
          align: "left",
          value: "enable"
        },
        {
          text: this.$t("settings.siteSearchEntry.index.headers.action"),
          value: "name",
          sortable: false
        }
      ];
    }
  }
});
var _sfc_render = function render4() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "site-search-entry" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("settings.siteSearchEntry.index.title")) + " [" + _vm._s(_vm.site.name) + "]")]), _c("v-card", [_c("v-card-title", [_c("v-btn", { attrs: { "color": "success" }, on: { "click": _vm.add } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("add")]), _vm._v(" " + _vm._s(_vm.$t("common.add")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.removeSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("common.remove")) + " ")], 1), _c("v-btn", { attrs: { "color": "info", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/search-entry-definition", "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("help")]), _vm._v(" " + _vm._s(_vm.$t("settings.siteSearchEntry.index.help")) + " ")], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": _vm.searchEntry, "pagination": _vm.pagination, "item-key": "name", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "20px" } }, [props.item.isCustom ? _c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } }) : _vm._e()], 1), _c("td", [_c("a", { on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_c("span", { staticClass: "ml-2" }, [_vm._v(_vm._s(props.item.name))])])]), _c("td", { staticClass: "cat" }, [_vm._l(_vm.getCategory(props.item), function(item, index) {
      return [_c("v-chip", { key: index, staticClass: "mr-2 pl-0", attrs: { "label": "", "color": "blue-grey", "text-color": "white", "small": "", "disabled": "" } }, [_vm._v(_vm._s(item))])];
    })], 2), _c("td", [_c("v-switch", { attrs: { "true-value": "true", "false-value": "false", "input-value": props.item.enabled ? "true" : "false", "hide-details": "" } })], 1), _c("td", [_c("v-icon", { staticClass: "mr-2", attrs: { "small": "", "title": _vm.$t("common.copy") }, on: { "click": function($event) {
      return _vm.copy(props.item);
    } } }, [_vm._v("file_copy")]), props.item.isCustom ? _c("v-icon", { staticClass: "mr-2", attrs: { "small": "", "title": _vm.$t("common.edit") }, on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v("edit")]) : _vm._e(), props.item.isCustom ? _c("v-icon", { attrs: { "small": "", "color": "error", "title": _vm.$t("common.remove") }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_vm._v("delete")]) : _vm._e()], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("AddItem", { attrs: { "site": _vm.site }, on: { "save": _vm.addItem }, model: { value: _vm.showAddDialog, callback: function($$v) {
    _vm.showAddDialog = $$v;
  }, expression: "showAddDialog" } }), _c("EditItem", { attrs: { "site": _vm.site, "data": _vm.selectedItem }, on: { "save": _vm.updateItem }, model: { value: _vm.showEditDialog, callback: function($$v) {
    _vm.showEditDialog = $$v;
  }, expression: "showEditDialog" } }), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("settings.siteSearchEntry.index.removeTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("settings.siteSearchEntry.index.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
    _vm.dialogRemoveConfirm = false;
  } } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "color": "error", "flat": "" }, on: { "click": _vm.remove } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1)], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "c04d91ad",
  null,
  null
);
const Index = __component__.exports;
export {
  Index as default
};
