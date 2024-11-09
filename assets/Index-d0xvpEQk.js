import { E as Extension, V as Vue, n as normalizeComponent, P as PPF } from "./index-BHV5JGMd.js";
const extension = new Extension();
const _sfc_main$2 = Vue.extend({
  data() {
    return {
      rules: {
        require: [(v) => !!v || "!"]
      },
      pagination: {
        rowsPerPage: -1
      },
      haveError: false,
      haveSuccess: false,
      successMsg: "",
      errorMsg: "",
      isValid: false,
      checked: [],
      sites: [],
      selected: [],
      loading: false
    };
  },
  props: {
    option: Object,
    initSites: {
      type: Array
    }
  },
  watch: {
    successMsg() {
      this.haveSuccess = this.successMsg != "";
    },
    errorMsg() {
      this.haveError = this.errorMsg != "";
    },
    initSites() {
      this.loading = true;
      this.selected = [];
      this.sites = this.initSites;
      this.sites.forEach((item) => {
        if (item.enabled) {
          this.selected.push(item);
        }
      });
      this.loading = false;
      this.change(false);
    },
    selected() {
      this.sites.forEach((item) => {
        item.enabled = false;
      });
      this.selected.forEach((item) => {
        item.enabled = true;
      });
      this.change();
    }
  },
  methods: {
    change(update = true) {
      if (this.loading)
        return;
      let checked = [];
      this.sites.forEach((item) => {
        if (item.enabled) {
          let entry = [];
          if (item.searchEntry) {
            item.searchEntry.forEach((e) => {
              if (e.enabled) {
                entry.push(e.id || e.name);
              }
            });
          }
          checked.push({
            host: item.host,
            siteName: item.name,
            entry
          });
        }
      });
      if (update) {
        this.$emit("change", {
          id: this.option.id,
          name: this.option.name,
          range: checked
        });
      }
      this.checked = checked;
    },
    selectAll(selected) {
      this.sites.forEach((item) => {
        item.enabled = selected;
        if (item.searchEntry) {
          item.searchEntry.forEach((e) => {
            e.enabled = selected;
          });
        }
      });
      this.change();
    },
    getSiteEntry(host, entry) {
      let site = this.sites.find((item) => {
        return item.host === host;
      });
      if (site && site.searchEntry) {
        let results = [];
        let siteEntry = site.searchEntry;
        entry.forEach((key) => {
          let index = siteEntry.findIndex((entry2) => {
            return entry2.id == key || entry2.name == key;
          });
          if (siteEntry[index] && siteEntry[index].name) {
            results.push(siteEntry[index].name);
          }
        });
        if (results.length > 0) {
          return " -> " + results.join(";");
        }
      }
      return "";
    }
  },
  created() {
  },
  computed: {
    selectedAll() {
      return this.checked.length === this.sites.length;
    },
    selectedSome() {
      return this.checked.length > 0 && !this.selectedAll;
    },
    selectAllIcon() {
      if (this.selectedAll)
        return "check_box";
      if (this.selectedSome)
        return "indeterminate_check_box";
      return "check_box_outline_blank";
    },
    headers() {
      return [
        {
          text: this.$t("settings.searchSolution.editor.headers.name"),
          align: "left",
          value: "name"
        }
      ];
    }
  }
});
var _sfc_render$2 = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "search-solution-editor" }, [_c("v-card", { staticClass: "body", attrs: { "color": _vm.$vuetify.dark ? "" : "grey lighten-4" } }, [_c("v-card-text", [_c("v-form", { staticClass: "content", model: { value: _vm.isValid, callback: function($$v) {
    _vm.isValid = $$v;
  }, expression: "isValid" } }, [_c("v-layout", { attrs: { "row": "" } }, [_c("v-flex", { attrs: { "xs3": "" } }, [_c("v-subheader", [_vm._v(_vm._s(_vm.$t("settings.searchSolution.editor.name")))])], 1), _c("v-flex", { attrs: { "xs9": "" } }, [_c("v-text-field", { attrs: { "label": _vm.$t("settings.searchSolution.editor.name"), "placeholder": _vm.$t("settings.searchSolution.editor.name"), "required": "", "rules": _vm.rules.require }, on: { "change": function($event) {
    return _vm.change(true);
  } }, model: { value: _vm.option.name, callback: function($$v) {
    _vm.$set(_vm.option, "name", $$v);
  }, expression: "option.name" } })], 1)], 1), _c("v-layout", { attrs: { "row": "" } }, [_c("v-flex", { attrs: { "xs3": "" } }, [_c("v-subheader", [_vm._v(_vm._s(_vm.$t("settings.searchSolution.editor.range")))])], 1), _c("v-flex", { attrs: { "xs9": "" } }, [_c("div", { staticClass: "list" }, [_c("v-list", { attrs: { "dense": "" } }, [_c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": _vm.sites, "pagination": _vm.pagination, "item-key": "host", "select-all": "", "hide-actions": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("tr", [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", [_c("div", [_vm._v(_vm._s(props.item.name))]), props.item.enabled ? _c("v-container", { staticClass: "ma-0 pa-0 ml-4", attrs: { "fluid": "" } }, [_c("v-layout", { staticClass: "ma-0 pa-0", attrs: { "row": "", "wrap": "" } }, _vm._l(props.item.searchEntry, function(item, key, index) {
      return _c("v-flex", { key: index, staticClass: "ma-0 pa-0", attrs: { "xs3": "" } }, [_c("v-checkbox", { staticClass: "ma-0 pa-0 caption", attrs: { "label": item.name }, on: { "change": function($event) {
        return _vm.change(true);
      } }, model: { value: item.enabled, callback: function($$v) {
        _vm.$set(item, "enabled", $$v);
      }, expression: "item.enabled" } })], 1);
    }), 1)], 1) : _vm._e()], 1)])];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1)], 1)])], 1)], 1), _c("v-divider", { staticClass: "mb-2" }), _c("div", { staticClass: "bottom" }, [_vm._l(_vm.checked, function(item, index) {
    return [_c("v-chip", { key: index, staticClass: "mr-2 pl-0", attrs: { "label": "", "color": "blue-grey", "text-color": "white", "small": "", "disabled": "" } }, [_vm._v(_vm._s(item.siteName) + _vm._s(_vm.getSiteEntry(item.host, item.entry)))])];
  })], 2)], 1)], 1), _c("v-snackbar", { attrs: { "absolute": "", "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
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
      valid: false,
      sites: [],
      defaultItem: {
        id: "",
        name: "",
        range: []
      },
      newValue: {}
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
      if (this.show && this.option) {
        this.defaultItem = Object.assign({}, this.option);
      }
    },
    option() {
      console.log("option change", this.option);
      this.resetSites();
    }
  },
  methods: {
    save() {
      if (this.newValue) {
        this.$emit("save", this.newValue);
        this.resetSites();
      }
      this.show = false;
    },
    cancel() {
      this.show = false;
    },
    change(value) {
      console.log(value);
      this.newValue = value;
      this.valid = !!value.name;
    },
    resetSites() {
      let sites = PPF.clone(this.$store.state.options.sites);
      this.sites = [];
      sites.forEach((item) => {
        this.sites.push(Object.assign({}, item));
      });
      console.log("resetSites", this.option, this.sites);
      if (this.option && this.option.id) {
        this.option.range.forEach((range) => {
          let index = this.sites.findIndex((item) => {
            return item.host === range.host;
          });
          if (index > -1) {
            let site = this.sites[index];
            site.enabled = true;
            let results = [];
            let siteEntry = site.searchEntry;
            if (siteEntry) {
              siteEntry.forEach((v, index2) => {
                siteEntry[index2].enabled = false;
              });
              range.entry && range.entry.forEach((key) => {
                let index2 = siteEntry.findIndex(
                  (entry) => {
                    return entry.id == key || entry.name == key;
                  }
                );
                if (siteEntry[index2] && siteEntry[index2].name) {
                  siteEntry[index2].enabled = true;
                }
              });
            }
          }
        });
      }
    }
  },
  created() {
    this.resetSites();
  }
});
var _sfc_render$1 = function render2() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-dialog", { attrs: { "fullscreen": "" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline blue-grey darken-2", staticStyle: { "color": "white" } }, [_vm._v(_vm._s(_vm.$t("settings.searchSolution.edit.title")))]), _c("v-card-text", { staticClass: "body" }, [_c("Editor", { attrs: { "option": _vm.defaultItem, "initSites": _vm.sites }, on: { "change": _vm.change } })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3 toolber" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "350c6803",
  null,
  null
);
const EditItem = __component__$1.exports;
const _sfc_main = Vue.extend({
  components: {
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
      dialogRemoveConfirm: false,
      options: {}
    };
  },
  methods: {
    add() {
      this.selectedItem = {};
      this.showEditDialog = true;
    },
    updateItem(item) {
      this.$store.dispatch("updateSearchSolution", item);
      this.pagination.rowsPerPage = 0;
      this.pagination.rowsPerPage = -1;
    },
    edit(item) {
      if (!this.options.searchSolutions) {
        return;
      }
      let index = this.options.searchSolutions.findIndex((data) => {
        return item.id === data.id;
      });
      if (index !== -1) {
        this.selectedItem = PPF.clone(this.options.searchSolutions[index]);
        this.showEditDialog = true;
      }
    },
    remove() {
      this.dialogRemoveConfirm = false;
      this.$store.dispatch("removeSearchSolution", this.selectedItem);
      this.selectedItem = {};
    },
    removeConfirm(item) {
      this.selectedItem = item;
      this.dialogRemoveConfirm = true;
    },
    removeSelected() {
      if (confirm(
        this.$t(
          "settings.searchSolution.index.removeSelectedConfirm"
        ).toString()
      )) {
        console.log(this.selected);
        this.selected.forEach((item) => {
          this.$store.dispatch("removeSearchSolution", item);
        });
        this.selected = [];
      }
    },
    getSiteEntry(host, entry) {
      let site = this.options.sites.find((item) => {
        return item.host === host;
      });
      if (site && site.searchEntry) {
        let results = [];
        let siteEntry = site.searchEntry;
        entry.forEach((key) => {
          let index = siteEntry.findIndex((entry2) => {
            return entry2.id == key || entry2.name == key;
          });
          if (siteEntry[index] && siteEntry[index].name) {
            results.push(siteEntry[index].name);
          }
        });
        if (results.length > 0) {
          return " -> " + results.join(";");
        }
      }
      return "";
    },
    editSearchEntry(host) {
      this.$router.push({
        name: "set-site-search-entry",
        params: {
          host
        }
      });
    }
  },
  created() {
    this.options = this.$store.state.options;
    this.items = this.$store.state.options.searchSolutions;
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("settings.searchSolution.index.headers.name"),
          align: "left",
          value: "name"
        },
        {
          text: this.$t("settings.searchSolution.index.headers.range"),
          align: "left",
          value: "range"
        },
        {
          text: this.$t("settings.searchSolution.index.headers.action"),
          value: "name",
          sortable: false
        }
      ];
    }
  }
});
var _sfc_render = function render3() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "set-download-clients" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("settings.searchSolution.index.title")))]), _c("v-card", [_c("v-card-title", [_c("v-btn", { attrs: { "color": "success" }, on: { "click": _vm.add } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("add")]), _vm._v(" " + _vm._s(_vm.$t("common.add")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.removeSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("common.remove")) + " ")], 1), _c("v-btn", { attrs: { "color": "info", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/search-solution-definition", "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("help")]), _vm._v(" " + _vm._s(_vm.$t("settings.searchSolution.index.help")) + " ")], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": _vm.items, "pagination": _vm.pagination, "item-key": "name", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", [_c("a", { on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v(_vm._s(props.item.name))])]), _c("td", [_vm._l(props.item.range, function(item, index) {
      return [_c("v-chip", { key: index, staticClass: "mr-2 pl-0", attrs: { "label": "", "color": "blue-grey", "text-color": "white", "small": "" }, on: { "click": function($event) {
        return _vm.editSearchEntry(item.host);
      } } }, [_vm._v(_vm._s(item.siteName) + _vm._s(_vm.getSiteEntry(item.host, item.entry)))])];
    })], 2), _c("td", [_c("v-icon", { staticClass: "mr-2", attrs: { "small": "" }, on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v("edit")]), _c("v-icon", { attrs: { "small": "", "color": "error" }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_vm._v("delete")])], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("EditItem", { on: { "save": _vm.updateItem }, model: { value: _vm.showAddDialog, callback: function($$v) {
    _vm.showAddDialog = $$v;
  }, expression: "showAddDialog" } }), _c("EditItem", { attrs: { "option": _vm.selectedItem }, on: { "save": _vm.updateItem }, model: { value: _vm.showEditDialog, callback: function($$v) {
    _vm.showEditDialog = $$v;
  }, expression: "showEditDialog" } }), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("settings.searchSolution.index.removeConfirmTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("settings.searchSolution.index.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
    _vm.dialogRemoveConfirm = false;
  } } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "color": "error", "flat": "" }, on: { "click": _vm.remove } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.itemDuplicate, callback: function($$v) {
    _vm.itemDuplicate = $$v;
  }, expression: "itemDuplicate" } }, [_vm._v(_vm._s(_vm.$t("settings.searchSolution.index.itemDuplicate")))])], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "661ad192",
  null,
  null
);
const Index = __component__.exports;
export {
  Index as default
};
