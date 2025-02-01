import { E as Extension, V as Vue, a as EAction, n as normalizeComponent } from "./index-DzMzv318.js";
const extension = new Extension();
const _sfc_main = Vue.extend({
  data() {
    return {
      selected: [],
      selectedItem: {},
      pagination: {
        rowsPerPage: 10,
        sortBy: "time",
        descending: true
      },
      items: [],
      dialogRemoveConfirm: false,
      options: this.$store.state.options,
      errorMsg: "",
      haveError: false,
      haveSuccess: false,
      successMsg: "",
      siteCache: {}
    };
  },
  methods: {
    clear() {
      if (confirm(this.$t("searchResultSnapshot.clearConfirm").toString())) {
        extension.sendRequest(EAction.clearSearchResultSnapshot).then((result) => {
          console.log("clearSearchResultSnapshot", result);
          this.items = [];
        });
      }
    },
    removeSelected() {
      if (this.selected && this.selected.length > 0) {
        if (confirm(
          this.$t("common.removeSelectedConfirm", {
            count: this.selected.length
          }).toString()
        )) {
          this.remove(this.selected);
        }
      }
    },
    remove(items) {
      if (!items) {
        items = [this.selectedItem];
      }
      extension.sendRequest(EAction.removeSearchResultSnapshot, null, items).then((result) => {
        console.log("removeSearchResultSnapshot", result);
        this.items = result;
      });
      this.dialogRemoveConfirm = false;
    },
    removeConfirm(item) {
      this.selectedItem = item;
      this.dialogRemoveConfirm = true;
    },
    loadSearchResultSnapshot() {
      extension.sendRequest(EAction.loadSearchResultSnapshot).then((result) => {
        console.log("loadSearchResultSnapshot", result);
        this.items = result;
      });
    },
    getInfos(item) {
      let result = "";
      if (item.searchPayload) {
        if (item.searchPayload.cn) {
          result = item.searchPayload.cn;
        } else if (item.searchPayload.en) {
          result = item.searchPayload.en;
        }
      }
      return result;
    }
  },
  created() {
    this.loadSearchResultSnapshot();
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("searchResultSnapshot.headers.key"),
          align: "left",
          value: "data.key"
        },
        {
          text: this.$t("searchResultSnapshot.headers.time"),
          align: "left",
          value: "time"
        },
        {
          text: this.$t("history.headers.action"),
          value: "name",
          sortable: false
        }
      ];
    }
  }
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("searchResultSnapshot.title")))]), _c("v-card", [_c("v-card-title", [_c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.removeSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("common.remove")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.items.length == 0 }, on: { "click": _vm.clear } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("clear")]), _vm._v(" " + _vm._s(_vm.$t("common.clear")) + " ")], 1), _c("v-btn", { attrs: { "color": "info", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/search-result-snapshot", "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("help")]), _vm._v(" " + _vm._s(_vm.$t("settings.searchSolution.index.help")) + " ")], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": _vm.items, "pagination": _vm.pagination, "item-key": "id", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", [_vm._v(_vm._s(props.item.key) + " " + _vm._s(_vm.getInfos(props.item)))]), _c("td", [_vm._v(_vm._s(_vm._f("formatDate")(props.item.time)))]), _c("td", [_c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "title": _vm.$t("searchResultSnapshot.show"), "to": `/search-torrent/show-snapshot-${props.item.id}` } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("image_search")])], 1), _c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "color": "error", "title": _vm.$t("common.remove") }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("delete")])], 1)], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("searchResultSnapshot.removeConfirmTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("searchResultSnapshot.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
    _vm.dialogRemoveConfirm = false;
  } } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "color": "error", "flat": "" }, on: { "click": function($event) {
    return _vm.remove();
  } } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
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
  null,
  null,
  null
);
const SearchResultSnapshot = __component__.exports;
export {
  SearchResultSnapshot as default
};
