import { V as Vue, n as normalizeComponent, g as EViewKey, h as ECommonKey } from "./index-BHV5JGMd.js";
const _sfc_main$3 = Vue.extend({});
var _sfc_render$3 = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "keyDescription" }, [_c("span", [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.keyDescription.allowKeys")))]), _c("table", [_c("tr", [_c("td", [_vm._v("$site.name$")]), _c("td", [_vm._v(" " + _vm._s(_vm.$t("settings.downloadPaths.keyDescription.siteName")) + " "), _c("br"), _vm._v(" " + _vm._s(_vm.$t("settings.downloadPaths.keyDescription.example")) + "/volume1/$site.name$/music -> /volume1/OpenCD/music ")])]), _c("tr", [_c("td", [_vm._v("$site.host$")]), _c("td", [_vm._v(" " + _vm._s(_vm.$t("settings.downloadPaths.keyDescription.siteHost")) + " "), _c("br"), _vm._v(" " + _vm._s(_vm.$t("settings.downloadPaths.keyDescription.example")) + "/volume1/$site.host$/music -> /volume1/open.cd/music ")])]), _c("tr", [_c("td", [_vm._v("$YYYY$")]), _c("td", [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.keyDescription.example")) + "/volume1/$YYYY$/music -> /volume1/2019/music")])]), _c("tr", [_c("td", [_vm._v("$MM$")]), _c("td", [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.keyDescription.example")) + "/volume1/$MM$/music -> /volume1/10/music")])]), _c("tr", [_c("td", [_vm._v("$DD$")]), _c("td", [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.keyDescription.example")) + "/volume1/$DD$/music -> /volume1/01/music")])]), _c("tr", [_c("td", [_vm._v("<...>")]), _c("td", [_vm._v(" " + _vm._s(_vm.$t("settings.downloadPaths.keyDescription.dynamic", { key: "<...>" })) + " "), _c("br"), _vm._v(" " + _vm._s(_vm.$t("settings.downloadPaths.keyDescription.dynamicExample")) + " ")])])])]);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  "5f0a65dd",
  null,
  null
);
const KeyDescription = __component__$3.exports;
const _sfc_main$2 = Vue.extend({
  components: {
    KeyDescription
  },
  data() {
    return {
      rules: {
        require: [(v) => !!v || "!"]
      },
      show: false,
      valid: false,
      paths: "",
      selectedSite: {}
    };
  },
  props: {
    value: Boolean,
    client: Object
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    show() {
      this.$emit("change", this.show);
      if (!this.show) {
        this.paths = "";
        this.selectedSite = {};
      }
    },
    value() {
      this.show = this.value;
    }
  },
  methods: {
    save() {
      this.$emit("save", {
        site: this.selectedSite,
        paths: this.paths.split("\n")
      });
      this.show = false;
    },
    cancel() {
      this.show = false;
    },
    joinTags(tags) {
      if (tags && tags.join) {
        return tags.join(", ");
      }
      return "";
    },
    getSites() {
      let clients = this.$store.state.options.clients;
      let sites = this.$store.state.options.sites;
      let result = [];
      if (clients && clients.length) {
        let client = clients.find((item) => {
          return item.id === this.client.id;
        });
        if (client && client.paths) {
          sites.forEach((site) => {
            if (!client.paths.hasOwnProperty(site.host)) {
              result.push(site);
            }
          });
        } else {
          result = sites;
        }
        return result;
      }
      return sites;
    }
  },
  computed: {},
  created() {
  }
});
var _sfc_render$2 = function render2() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-dialog", { attrs: { "max-width": "800" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline blue-grey darken-2", staticStyle: { "color": "white" } }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.add.title")))]), _c("v-card-text", [_c("v-form", { model: { value: _vm.valid, callback: function($$v) {
    _vm.valid = $$v;
  }, expression: "valid" } }, [_c("v-autocomplete", { attrs: { "items": _vm.getSites(), "label": _vm.$t("settings.downloadPaths.add.selectSite"), "persistent-hint": "", "single-line": "", "item-text": "name", "item-value": "host", "return-object": "", "rules": _vm.rules.require }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
    return [_c("v-list-tile-avatar", [_c("img", { attrs: { "src": item.icon } })]), _c("span", { domProps: { "textContent": _vm._s(item.name) } })];
  } }, { key: "item", fn: function(data) {
    return [_c("v-list-tile-avatar", [_c("img", { attrs: { "src": data.item.icon } })]), _c("v-list-tile-content", [_c("v-list-tile-title", { domProps: { "innerHTML": _vm._s(data.item.name) } }), _c("v-list-tile-sub-title", { domProps: { "innerHTML": _vm._s(data.item.url) } })], 1), _c("v-list-tile-action", [_c("v-list-tile-action-text", [_vm._v(_vm._s(_vm.joinTags(data.item.tags)))])], 1)];
  } }]), model: { value: _vm.selectedSite, callback: function($$v) {
    _vm.selectedSite = $$v;
  }, expression: "selectedSite" } }), _c("v-textarea", { attrs: { "label": _vm.$t("settings.downloadPaths.add.path"), "value": "", "hint": _vm.$t("settings.downloadPaths.add.pathTip"), "rules": _vm.rules.require }, model: { value: _vm.paths, callback: function($$v) {
    _vm.paths = $$v;
  }, expression: "paths" } }), _vm.client.pathDescription ? _c("v-alert", { attrs: { "value": true, "color": "info", "icon": "info", "outline": "" } }, [_c("div", { domProps: { "innerHTML": _vm._s(_vm.client.pathDescription) } }), _c("KeyDescription")], 1) : _vm._e()], 1)], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.add.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.add.ok")))])], 1)], 1)], 1)], 1)], 1);
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
    KeyDescription
  },
  data() {
    return {
      show: false,
      valid: false,
      rules: {
        require: [(v) => !!v || "!"]
      },
      defaultItem: {
        name: "",
        site: {},
        paths: ""
      }
    };
  },
  props: {
    value: Boolean,
    option: Object,
    client: Object
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
        this.defaultItem.paths = this.option.paths.join("\n");
      }
    }
  },
  methods: {
    save() {
      this.$emit("save", {
        site: this.defaultItem.site,
        paths: this.defaultItem.paths.split("\n")
      });
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
  }, expression: "show" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline blue-grey darken-2", staticStyle: { "color": "white" } }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.edit.title")))]), _c("v-card-text", [_c("v-form", { model: { value: _vm.valid, callback: function($$v) {
    _vm.valid = $$v;
  }, expression: "valid" } }, [_c("v-text-field", { attrs: { "label": _vm.$t("settings.downloadPaths.edit.site"), "disabled": "", "value": _vm.defaultItem.name } }), _c("v-textarea", { attrs: { "label": _vm.$t("settings.downloadPaths.add.path"), "value": "", "hint": _vm.$t("settings.downloadPaths.add.pathTip"), "rules": _vm.rules.require }, model: { value: _vm.defaultItem.paths, callback: function($$v) {
    _vm.$set(_vm.defaultItem, "paths", $$v);
  }, expression: "defaultItem.paths" } }), _vm.client.pathDescription ? _c("v-alert", { attrs: { "value": true, "color": "info", "icon": "info", "outline": "" } }, [_c("div", { domProps: { "innerHTML": _vm._s(_vm.client.pathDescription) } }), _c("KeyDescription")], 1) : _vm._e()], 1)], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.add.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.add.ok")))])], 1)], 1)], 1)], 1);
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
      dialogRemoveConfirm: false,
      selectedClient: {
        address: ""
      },
      lastClientId: ""
    };
  },
  created() {
    if (this.$store.state.options.clients && this.$store.state.options.clients.length > 0) {
      this.items = this.$store.state.options.clients;
      this.initView();
    }
  },
  watch: {
    selectedClient() {
      if (this.selectedClient && this.selectedClient.id) {
        this.lastClientId = this.selectedClient.id;
        this.updateViewOptions();
      }
    }
  },
  methods: {
    getPaths(paths) {
      return paths.join("<br>");
    },
    add() {
      this.showAddDialog = true;
    },
    addItem(item) {
      this.$store.commit("updatePathsOfClient", {
        clientId: this.selectedClient.id,
        site: item.site,
        paths: item.paths
      });
      this.reload();
    },
    edit(item) {
      this.selectedItem = item;
      this.showEditDialog = true;
    },
    updateItem(item) {
      console.log(item);
      this.$store.commit("updatePathsOfClient", {
        clientId: this.selectedClient.id,
        site: item.site,
        paths: item.paths
      });
      this.reload();
    },
    remove() {
      this.dialogRemoveConfirm = false;
      this.$store.commit("removePathsOfClient", {
        clientId: this.selectedClient.id,
        site: this.selectedItem.site
      });
      this.reload();
    },
    removeConfirm(item) {
      this.selectedItem = item;
      this.dialogRemoveConfirm = true;
    },
    reload() {
      let item = Object.assign({}, this.selectedClient);
      this.selectedClient = null;
      this.selectedClient = item;
    },
    removeSelected() {
      if (confirm(
        this.$t(
          "settings.downloadPaths.index.removeSelectedConfirm"
        ).toString()
      )) {
        console.log(this.selected);
        this.selected.forEach((item) => {
          this.$store.commit("removePathsOfClient", {
            clientId: this.selectedClient.id,
            site: item.site
          });
        });
        this.selected = [];
        this.reload();
      }
    },
    /**
     * 初始当前界面
     */
    initView() {
      let options = this.$store.getters.viewsOptions(EViewKey.downloadPaths, {
        lastClientId: ""
      });
      this.lastClientId = options.lastClientId;
      if (this.lastClientId && this.items.length > 0) {
        let selectedClient = this.items.find((item) => {
          return item.id == this.lastClientId;
        });
        if (selectedClient) {
          this.selectedClient = selectedClient;
        }
      }
    },
    /**
     * 更新当前界面配置
     */
    updateViewOptions() {
      this.$store.dispatch("updateViewOptions", {
        key: EViewKey.downloadPaths,
        options: {
          lastClientId: this.lastClientId
        }
      });
    }
  },
  computed: {
    getClientPaths() {
      if (!this.selectedClient) {
        return [];
      }
      if (!this.selectedClient.paths) {
        return [];
      }
      let result = [];
      let allSite = this.selectedClient.paths[ECommonKey.allSite];
      if (allSite) {
        result.push({
          name: this.$t("settings.downloadPaths.index.allSite").toString(),
          site: null,
          paths: allSite
        });
      }
      for (const host in this.selectedClient.paths) {
        let site = this.$store.state.options.sites.find((item) => {
          return item.host == host;
        });
        if (site) {
          result.push({
            name: site.name,
            site,
            paths: this.selectedClient.paths[host]
          });
        }
      }
      return result;
    },
    headers() {
      return [
        {
          text: this.$t("settings.downloadPaths.index.headers.name"),
          align: "left",
          value: "name"
        },
        {
          text: this.$t("settings.downloadPaths.index.headers.path"),
          align: "left",
          sortable: false
        },
        {
          text: this.$t("settings.downloadPaths.index.headers.action"),
          value: "name",
          sortable: false
        }
      ];
    }
  }
});
var _sfc_render = function render4() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "set-download-clients" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.index.title")))]), _c("v-card", [_c("v-card-title", [_c("v-autocomplete", { staticStyle: { "max-width": "500px" }, attrs: { "items": _vm.items, "label": _vm.$t("settings.downloadPaths.index.selectedClient"), "menu-props": { maxHeight: "auto" }, "hint": _vm.selectedClient.address, "return-object": "", "persistent-hint": "", "item-text": "name", "item-value": "id" }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
    return [_c("span", [_vm._v(_vm._s(item.name))])];
  } }, { key: "item", fn: function(data) {
    return [_c("v-list-tile-content", [_c("v-list-tile-title", { domProps: { "innerHTML": _vm._s(data.item.name) } }), _c("v-list-tile-sub-title", { domProps: { "innerHTML": _vm._s(data.item.address) } })], 1), _c("v-list-tile-action", [_c("v-list-tile-action-text", [_vm._v(_vm._s(data.item.allowCustomPath ? data.item.type : _vm.$t("settings.downloadPaths.index.notSupport")))])], 1)];
  } }]), model: { value: _vm.selectedClient, callback: function($$v) {
    _vm.selectedClient = $$v;
  }, expression: "selectedClient" } }), _c("v-spacer"), _c("v-btn", { attrs: { "color": "success", "disabled": !_vm.selectedClient.id || !_vm.selectedClient.allowCustomPath }, on: { "click": _vm.add } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("add")]), _vm._v(" " + _vm._s(_vm.$t("settings.downloadPaths.index.add")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.removeSelected.apply(null, arguments);
  } } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("settings.downloadPaths.index.remove")) + " ")], 1)], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": _vm.getClientPaths, "pagination": _vm.pagination, "item-key": "name", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", [_c("a", { on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v(_vm._s(props.item.name))])]), _c("td", _vm._l(props.item.paths, function(path, index) {
      return _c("div", { key: index }, [_vm._v(_vm._s(path))]);
    }), 0), _c("td", [_c("v-icon", { staticClass: "mr-2", attrs: { "small": "" }, on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v("edit")]), _c("v-icon", { attrs: { "small": "", "color": "error" }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_vm._v("delete")])], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("AddItem", { attrs: { "client": _vm.selectedClient }, on: { "save": _vm.addItem }, model: { value: _vm.showAddDialog, callback: function($$v) {
    _vm.showAddDialog = $$v;
  }, expression: "showAddDialog" } }), _c("EditItem", { attrs: { "option": _vm.selectedItem, "client": _vm.selectedClient }, on: { "save": _vm.updateItem }, model: { value: _vm.showEditDialog, callback: function($$v) {
    _vm.showEditDialog = $$v;
  }, expression: "showEditDialog" } }), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.index.removeConfirmTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.index.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
    _vm.dialogRemoveConfirm = false;
  } } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.index.cancel")))])], 1), _c("v-btn", { attrs: { "color": "error", "flat": "" }, on: { "click": _vm.remove } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.index.ok")))])], 1)], 1)], 1)], 1), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.itemDuplicate, callback: function($$v) {
    _vm.itemDuplicate = $$v;
  }, expression: "itemDuplicate" } }, [_vm._v(_vm._s(_vm.$t("settings.downloadPaths.index.itemDuplicate")))])], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "69617754",
  null,
  null
);
const Index = __component__.exports;
export {
  Index as default
};
