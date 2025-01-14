import { E as Extension, V as Vue, a as EAction, n as normalizeComponent } from "./index-7t3YJu3Z.js";
import { D as DownloadTo } from "./DownloadTo-DtyDcGX6.js";
import "./pathHandler-yIpW4LsR.js";
const extension = new Extension();
const _sfc_main = Vue.extend({
  components: {
    DownloadTo
  },
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
      siteCache: {},
      filterKey: "",
      filteredItems: [],
      filterStatus: "all",
      selectedClient: {
        address: ""
      },
      clientItems: []
    };
  },
  watch: {
    selectedClient() {
      this.resetItems();
    },
    filterStatus() {
      this.resetItems();
    }
  },
  methods: {
    clear() {
      if (confirm(this.$t("history.clearConfirm").toString())) {
        extension.sendRequest(EAction.clearDownloadHistory).then((result) => {
          this.getDownloadHistory();
        });
      }
    },
    resetItems() {
      let clientId = "";
      if (this.selectedClient && this.selectedClient.id) {
        clientId = this.selectedClient.id;
      }
      if (clientId == "" && this.filterStatus == "all") {
        this.getDownloadHistory();
      } else {
        this.filteredItems = [];
        this.items.forEach((item) => {
          let _clientId = item.clientId || item.data.clientId;
          if ((this.filterStatus == "fail" && item.success === false || this.filterStatus == "success" && item.success !== false || this.filterStatus == "all") && (_clientId == clientId || clientId == "")) {
            let site = this.siteCache[item.host];
            if (!site) {
              site = this.options.sites.find((site2) => {
                return site2.host === item.host;
              });
              this.siteCache[item.host] = site;
            }
            item.site = site;
            this.filteredItems.push(item);
          }
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
      extension.sendRequest(EAction.removeDownloadHistory, null, items).then((result) => {
        this.getDownloadHistory();
      });
      this.dialogRemoveConfirm = false;
    },
    removeConfirm(item) {
      this.selectedItem = item;
      this.dialogRemoveConfirm = true;
    },
    getDownloadHistory() {
      extension.sendRequest(EAction.getDownloadHistory).then((result) => {
        console.log("downloadHistory", result);
        this.items = [];
        this.filteredItems = [];
        result.forEach((item) => {
          let site = this.siteCache[item.host];
          if (!site) {
            site = this.options.sites.find((site2) => {
              return site2.host === item.host;
            });
            this.siteCache[item.host] = site;
          }
          item.site = site;
          this.filteredItems.push(item);
          this.items.push(item);
        });
      });
    },
    getClientName(clientId) {
      let client = this.options.clients.find((item) => {
        return item.id === clientId;
      });
      if (client) {
        return client.name;
      }
      return "";
    },
    download(datas) {
      let options = null;
      let remainder = 0;
      if (Array.isArray(datas)) {
        options = datas.pop();
        remainder = datas.length;
      } else {
        options = datas;
      }
      console.log(options);
      this.haveSuccess = true;
      this.successMsg = this.$t("history.seedingTorrent").toString();
      let data = Object.assign({}, options.data);
      if (!data.clientId) {
        data.clientId = options.clientId;
      }
      extension.sendRequest(EAction.sendTorrentToClient, null, data).then((result) => {
        console.log("命令执行完成", result);
        if (result.success) {
          this.haveSuccess = true;
          this.successMsg = result.msg;
        } else {
          this.haveError = true;
          this.errorMsg = result.msg;
        }
        if (remainder > 0) {
          setTimeout(() => {
            this.download(datas);
          }, 500);
        }
      }).catch((result) => {
        if (result.success) {
          this.haveSuccess = true;
          this.successMsg = result.msg;
        } else {
          this.haveError = true;
          this.errorMsg = result.msg;
        }
        if (remainder > 0) {
          setTimeout(() => {
            this.download(datas);
          }, 500);
        }
      });
    },
    downloadSelected() {
      if (this.selected && this.selected.length > 0) {
        if (confirm(
          this.$t("history.downloadSelectedConfirm", {
            count: this.selected.length
          }).toString()
        )) {
          this.download(this.selected);
        }
      }
    },
    onError(msg) {
      this.errorMsg = msg;
    },
    onSuccess(msg) {
      this.successMsg = msg;
    }
  },
  created() {
    if (this.$store.state.options.clients && this.$store.state.options.clients.length > 0) {
      this.clientItems = this.$store.state.options.clients;
    }
    this.getDownloadHistory();
  },
  computed: {
    headers() {
      return [
        {
          text: "№",
          align: "left",
          sortable: false,
          value: "title",
          width: 30
        },
        {
          text: this.$t("history.headers.site"),
          align: "center",
          value: "data.host",
          width: "140px"
        },
        {
          text: this.$t("history.headers.title"),
          align: "left",
          value: "data.title"
        },
        {
          text: this.$t("history.headers.status"),
          align: "left",
          value: "data.success"
        },
        { text: this.$t("history.headers.time"), align: "left", value: "time" },
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
  return _c("div", { staticClass: "history" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("history.title")))]), _c("v-card", [_c("v-card-title", [_c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.removeSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("history.remove")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.items.length == 0 }, on: { "click": _vm.clear } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("clear")]), _vm._v(" " + _vm._s(_vm.$t("history.clear")) + " ")], 1), _c("v-divider", { staticClass: "mx-3 mt-0", attrs: { "vertical": "" } }), _c("v-btn", { attrs: { "color": "success", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.downloadSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("save_alt")]), _vm._v(" " + _vm._s(_vm.$t("history.download")) + " ")], 1), _c("v-divider", { staticClass: "mx-3 mt-0", attrs: { "vertical": "" } }), _c("v-autocomplete", { staticStyle: { "max-width": "500px" }, attrs: { "items": _vm.clientItems, "label": _vm.$t("history.filterServer"), "menu-props": { maxHeight: "auto" }, "hint": _vm.selectedClient.address, "return-object": "", "persistent-hint": "", "item-text": "name", "item-value": "id" }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
    return [_c("span", [_vm._v(_vm._s(item.name))])];
  } }, { key: "item", fn: function(data) {
    return [_c("v-list-tile-content", [_c("v-list-tile-title", { domProps: { "innerHTML": _vm._s(data.item.name) } }), _c("v-list-tile-sub-title", { domProps: { "innerHTML": _vm._s(data.item.address) } })], 1), _c("v-list-tile-action-text", [_vm._v(_vm._s(data.item.type))])];
  } }]), model: { value: _vm.selectedClient, callback: function($$v) {
    _vm.selectedClient = $$v;
  }, expression: "selectedClient" } }), _c("v-radio-group", { staticClass: "ml-5", attrs: { "row": "" }, model: { value: _vm.filterStatus, callback: function($$v) {
    _vm.filterStatus = $$v;
  }, expression: "filterStatus" } }, [_c("v-radio", { attrs: { "label": _vm.$t("history.success"), "color": "success", "value": "success" } }), _c("v-radio", { attrs: { "label": _vm.$t("history.fail"), "color": "fail", "value": "fail" } }), _c("v-radio", { attrs: { "label": _vm.$t("history.all"), "color": "info", "value": "all" } })], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "" }, model: { value: _vm.filterKey, callback: function($$v) {
    _vm.filterKey = $$v;
  }, expression: "filterKey" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "search": _vm.filterKey, "headers": _vm.headers, "items": _vm.filteredItems, "pagination": _vm.pagination, "item-key": "data.url", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", [_vm._v(_vm._s(props.index + 1))]), _c("td", { staticStyle: { "text-align": "center" } }, [!!props.item.site ? _c("div", [_c("v-avatar", { attrs: { "size": "18" } }, [_c("img", { attrs: { "src": props.item.site.icon } })]), _c("br"), _c("span", { staticClass: "captionText" }, [_vm._v(_vm._s(props.item.site.name))])], 1) : _vm._e()]), _c("td", [props.item.data.link ? _c("a", { attrs: { "href": props.item.data.link, "target": "_blank", "title": props.item.data.title, "rel": "noopener noreferrer nofollow" } }, [_vm._v(_vm._s(props.item.data.title || props.item.data.link))]) : _c("span", { attrs: { "title": props.item.data.url } }, [_vm._v(_vm._s(props.item.data.title || props.item.data.url))]), _c("br"), _c("span", { staticClass: "sub-title" }, [_vm._v("[ " + _vm._s(_vm.getClientName(props.item.data.clientId || props.item.clientId)) + " ] -> " + _vm._s(props.item.data.savePath || _vm.$t("history.defaultPath")))])]), _c("td", [props.item.success === false ? _c("v-icon", { attrs: { "color": "error", "title": _vm.$t("history.fail") } }, [_vm._v("close")]) : _c("v-icon", { attrs: { "color": "success", "title": _vm.$t("history.success") } }, [_vm._v("done")])], 1), _c("td", [_vm._v(_vm._s(_vm._f("formatDate")(props.item.time)))]), _c("td", [_c("v-btn", { attrs: { "icon": "", "flat": "", "small": "", "title": _vm.$t("history.download") }, on: { "click": function($event) {
      return _vm.download(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("save_alt")])], 1), _c("DownloadTo", { staticClass: "mx-0", attrs: { "downloadOptions": {
      host: props.item.host,
      url: props.item.data.url
    }, "flat": "", "icon": "", "small": "" }, on: { "error": _vm.onError, "success": _vm.onSuccess } }), _c("v-btn", { attrs: { "icon": "", "flat": "", "small": "", "color": "error", "title": _vm.$t("common.remove") }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("delete")])], 1)], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("history.removeConfirmTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("history.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
    _vm.dialogRemoveConfirm = false;
  } } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("history.cancel")))])], 1), _c("v-btn", { attrs: { "color": "error", "flat": "" }, on: { "click": function($event) {
    return _vm.remove(null);
  } } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("history.ok")))])], 1)], 1)], 1)], 1), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
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
  "ac42268f",
  null,
  null
);
const History = __component__.exports;
export {
  History as default
};
