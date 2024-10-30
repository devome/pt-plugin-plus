import { E as Extension, V as Vue, a as EAction, F as FileSaver, v as EPaginationKey, n as normalizeComponent } from "./index--b0EwcwT.js";
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
      filterKey: ""
    };
  },
  methods: {
    clear() {
      if (confirm(this.$t("common.clearConfirm").toString())) {
        extension.sendRequest(EAction.clearSystemLogs).then((result) => {
          this.items = result;
        });
      }
    },
    remove() {
      extension.sendRequest(EAction.removeSystemLogs, null, [this.selectedItem]).then((result) => {
        console.log("removeSystemLogs", result);
        this.items = result;
      });
      this.dialogRemoveConfirm = false;
    },
    removeConfirm(item) {
      this.selectedItem = item;
      this.dialogRemoveConfirm = true;
    },
    getSystemLogs() {
      extension.sendRequest(EAction.getSystemLogs).then((result) => {
        this.items = result;
      });
    },
    save() {
      const Blob = window.Blob;
      const data = new Blob([JSON.stringify(this.items)], {
        type: "text/plain"
      });
      FileSaver.saveAs(data, "PT-Plugin-Plus-System-Logs.json");
    },
    updatePagination(value) {
      console.log(value);
      this.$store.dispatch("updatePagination", {
        key: EPaginationKey.systemLogs,
        options: value
      });
    },
    getErrorDetail(data) {
      let result = "";
      if (data) {
        try {
          result = JSON.stringify(data);
        } catch (error) {
          result = "";
        }
      }
      return result;
    }
  },
  created() {
    this.getSystemLogs();
    this.pagination = this.$store.getters.pagination(
      EPaginationKey.systemLogs,
      {
        rowsPerPage: 10,
        sortBy: "time",
        descending: true
      }
    );
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("systemLog.headers.module"),
          align: "left",
          value: "module"
        },
        {
          text: this.$t("systemLog.headers.event"),
          align: "left",
          value: "event"
        },
        {
          text: this.$t("systemLog.headers.time"),
          align: "left",
          value: "time"
        },
        { text: this.$t("systemLog.headers.msg"), align: "left", value: "msg" },
        {
          text: this.$t("systemLog.headers.action"),
          value: "name",
          sortable: false
        }
      ];
    }
  }
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "system-logs" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("systemLog.title")))]), _c("v-card", [_c("v-card-title", [_c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("common.remove")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.items.length == 0 }, on: { "click": _vm.clear } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("clear")]), _vm._v(" " + _vm._s(_vm.$t("common.clear")) + " ")], 1), _c("v-btn", { attrs: { "color": "success" }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("save")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("systemLog.save")))])], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "" }, model: { value: _vm.filterKey, callback: function($$v) {
    _vm.filterKey = $$v;
  }, expression: "filterKey" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "search": _vm.filterKey, "headers": _vm.headers, "items": _vm.items, "pagination": _vm.pagination, "item-key": "time", "select-all": "", "rows-per-page-items": _vm.options.rowsPerPageItems }, on: { "update:pagination": [function($event) {
    _vm.pagination = $event;
  }, _vm.updatePagination] }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("tr", { on: { "click": function($event) {
      props.expanded = !props.expanded;
    } } }, [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", [_vm._v(_vm._s(props.item.module))]), _c("td", [_vm._v(_vm._s(props.item.event))]), _c("td", [_vm._v(_vm._s(_vm._f("formatDate")(props.item.time, "YYYY-MM-DD HH:mm:ss")))]), _c("td", [_vm._v(_vm._s(props.item.msg))]), _c("td", [_c("v-icon", { attrs: { "small": "", "color": "error" }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_vm._v("delete")])], 1)])];
  } }, { key: "expand", fn: function(props) {
    return [_c("v-card", { attrs: { "flat": "" } }, [_c("v-card-text", [_vm._v(_vm._s(_vm.getErrorDetail(props.item.data)))])], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("common.removeConfirmTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("common.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
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
  "48fd2e2d",
  null,
  null
);
const SystemLogs = __component__.exports;
export {
  SystemLogs as default
};
