import { E as Extension, V as Vue, a as EAction, P as PPF, n as normalizeComponent } from "./index-Bu19POTM.js";
import { D as DownloadTo } from "./DownloadTo-DCU4vKQk.js";
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
      // 已过滤的数据
      filteredDatas: []
    };
  },
  methods: {
    setDownloadOptions(options) {
      console.log(options);
      options.payload.downloadOptions = options.downloadOptions;
      extension.sendRequest(
        EAction.updateKeepUploadTask,
        null,
        options.payload
      );
    },
    clear() {
      if (confirm(this.$t("keepUploadTask.clearConfirm").toString())) {
        extension.sendRequest(EAction.clearKeepUploadTask).then((result) => {
          console.log("clearKeepUploadTask", result);
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
      extension.sendRequest(EAction.removeKeepUploadTask, null, items).then((result) => {
        console.log("removeKeepUploadTask", result);
        this.resetItems(result);
      });
      this.dialogRemoveConfirm = false;
    },
    removeConfirm(item) {
      this.selectedItem = item;
      this.dialogRemoveConfirm = true;
    },
    resetItems(result) {
      this.items = [];
      result.forEach((data) => {
        data.items.forEach((item) => {
          item.site = PPF.getSiteFromHost(item.host, this.options);
        });
        data.site = PPF.getSiteFromHost(data.items[0].host, this.options);
        this.items.push(data);
      });
    },
    loadKeepUploadTask() {
      extension.sendRequest(EAction.loadKeepUploadTask).then((result) => {
        console.log(result);
        this.resetItems(result);
      });
    },
    getInfos(item) {
      let result = "";
      return result;
    },
    clearMessage() {
      this.successMsg = "";
      this.errorMsg = "";
    },
    sendBaseTorrent(source) {
      this.sendTorrentsInBackground(source.downloadOptions);
    },
    sendOtherTorrents(source) {
      let items = [];
      source.items.slice(1).forEach((item) => {
        let downloadOptions = PPF.clone(source.downloadOptions);
        downloadOptions = Object.assign(downloadOptions, {
          title: item.title,
          url: item.url,
          link: item.link,
          imdbId: item.imdbId
        });
        items.push(downloadOptions);
      });
      this.sendTorrentsInBackground(items);
    },
    sendAllTorrents(source) {
      let items = [];
      source.items.forEach((item) => {
        let downloadOptions = PPF.clone(source.downloadOptions);
        downloadOptions = Object.assign(downloadOptions, {
          title: item.title,
          url: item.url,
          link: item.link,
          imdbId: item.imdbId
        });
        items.push(downloadOptions);
      });
      this.sendTorrentsInBackground(items);
    },
    /**
     * 发送下载任务到后台
     */
    sendTorrentsInBackground(items) {
      console.log(items);
      if (items.length > 1) {
        if (!confirm(
          this.$t("keepUploadTask.sendConfirm", {
            count: items.length
          }).toString()
        )) {
          return;
        }
      }
      extension.sendRequest(EAction.sendTorrentsInBackground, null, items).then((result) => {
        this.successMsg = this.$t("keepUploadTask.sendSuccess").toString();
        console.log("命令执行完成", result);
        this.$emit("success", result);
      }).catch((result) => {
        console.log(result);
        this.errorMsg = this.$t("keepUploadTask.sendError").toString();
      }).finally(() => {
      });
    },
    copyLinksToClipboard(source) {
      let urls = [];
      source.items.forEach((item) => {
        urls.push(item.url);
      });
      this.clearMessage();
      extension.sendRequest(EAction.copyTextToClipboard, null, urls.join("\n")).then((result) => {
        this.successMsg = this.$t(
          "searchTorrent.copySelectedToClipboardSuccess",
          {
            count: urls.length
          }
        ).toString();
      }).catch(() => {
        this.errorMsg = this.$t(
          "searchTorrent.copyLinkToClipboardError"
        ).toString();
      });
    },
    /**
     * 搜索结果过滤器，用于用户二次过滤
     * @param items
     * @param search
     */
    searchResultFilter(items, search) {
      search = search.toString().toLowerCase();
      this.filteredDatas = [];
      if (search.trim() === "")
        return items;
      let searchs = search.split(" ");
      this.filteredDatas = items.filter((item) => {
        let source = (item.title + (item.items[0].subTitle || "")).toLowerCase();
        let result = true;
        searchs.forEach((key) => {
          if (key.trim() != "") {
            result = result && source.indexOf(key) > -1;
          }
        });
        return result;
      });
      return this.filteredDatas;
    }
  },
  created() {
    this.loadKeepUploadTask();
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("keepUploadTask.headers.site"),
          align: "center",
          width: "60px",
          value: "site.name"
        },
        {
          text: this.$t("keepUploadTask.headers.title"),
          align: "left",
          value: "title"
        },
        {
          text: this.$t("keepUploadTask.headers.size"),
          align: "right",
          value: "size"
        },
        {
          text: this.$t("keepUploadTask.headers.time"),
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
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("keepUploadTask.title")))]), _c("v-card", [_c("v-card-title", [_c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.removeSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("common.remove")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.items.length == 0 }, on: { "click": _vm.clear } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("clear")]), _vm._v(" " + _vm._s(_vm.$t("common.clear")) + " ")], 1), _c("v-btn", { attrs: { "color": "info", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/keep-upload-task", "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("help")]), _vm._v(" " + _vm._s(_vm.$t("settings.searchSolution.index.help")) + " ")], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": _vm.$t("keepUploadTask.filterSearchResults"), "single-line": "", "hide-details": "", "enterkeyhint": "search" }, model: { value: _vm.filterKey, callback: function($$v) {
    _vm.filterKey = $$v;
  }, expression: "filterKey" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "search": _vm.filterKey, "custom-filter": _vm.searchResultFilter, "headers": _vm.headers, "items": _vm.items, "pagination": _vm.pagination, "item-key": "id", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("tr", { on: { "click": function($event) {
      props.expanded = !props.expanded;
    } } }, [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", { staticClass: "text-xs-center" }, [_c("v-avatar", { attrs: { "size": "18" } }, [_c("img", { attrs: { "src": props.item.site.icon } })]), _c("br"), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(props.item.site.name))])], 1), _c("td", { staticClass: "py-2" }, [_c("a", { staticClass: "subheading", attrs: { "href": props.item.items[0].link, "target": "_blank", "title": props.item.title, "rel": "noopener noreferrer nofollow" }, domProps: { "innerHTML": _vm._s(props.item.title) } }), _c("div", { staticClass: "body-1" }, [props.item.items[0].subTitle ? _c("span", [_vm._v(_vm._s(props.item.items[0].subTitle))]) : _vm._e()]), _c("div", { staticClass: "caption" }, [_vm._v(" " + _vm._s(_vm.$t("keepUploadTask.savePath")) + _vm._s(props.item.downloadOptions.clientName) + " -> " + _vm._s(props.item.downloadOptions.savePath || _vm.$t("keepUploadTask.defaultPath")) + " "), _c("DownloadTo", { attrs: { "flat": "", "icon": "", "small": "", "title": _vm.$t("keepUploadTask.setSavePath"), "iconText": "edit", "get-options-only": "", "payload": props.item, "downloadOptions": props.item.items[0] }, on: { "itemClick": _vm.setDownloadOptions } })], 1), _c("div", { staticClass: "caption" }, [_vm._v(" " + _vm._s(_vm.$t("keepUploadTask.torrentCount")) + _vm._s(props.item.items.length) + " ")])]), _c("td", { staticClass: "text-xs-right" }, [_vm._v(_vm._s(_vm._f("formatSize")(props.item.size)))]), _c("td", [_vm._v(_vm._s(_vm._f("formatDate")(props.item.time)))]), _c("td", [_c("v-btn", { staticClass: "mx-0", attrs: { "small": "", "color": "success", "icon": "", "flat": "", "title": _vm.$t("keepUploadTask.sendBaseTorrent") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.sendBaseTorrent(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("filter_1")])], 1), _c("v-btn", { staticClass: "mx-0", attrs: { "small": "", "color": "info", "icon": "", "flat": "", "title": _vm.$t("keepUploadTask.sendOtherTorrents") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.sendOtherTorrents(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("filter_2")])], 1), _c("v-btn", { staticClass: "mx-0", attrs: { "small": "", "color": "primary", "icon": "", "flat": "", "title": _vm.$t("keepUploadTask.sendAllTorrents") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.sendAllTorrents(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("save_alt")])], 1), _c("v-btn", { staticClass: "mx-0", attrs: { "color": "info", "small": "", "icon": "", "flat": "", "title": _vm.$t("searchTorrent.copyToClipboardTip") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.copyLinksToClipboard(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("file_copy")])], 1), _c("v-btn", { staticClass: "mx-0", attrs: { "small": "", "color": "error", "icon": "", "flat": "", "title": _vm.$t("common.remove") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.removeConfirm(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("delete")])], 1)], 1)])];
  } }, { key: "expand", fn: function(props) {
    return [_c("v-list", { staticClass: "ml-5", attrs: { "subheader": "", "dense": "" } }, [_vm._l(props.item.items, function(item) {
      return [_c("v-list-tile", { key: item.link, staticClass: "ml-5" }, [_c("v-list-tile-avatar", [_c("v-avatar", { attrs: { "size": "18" } }, [_c("img", { attrs: { "src": item.site.icon } })])], 1), _c("v-list-tile-content", [_c("v-list-tile-title", [_c("a", { attrs: { "href": item.link, "target": "_blank", "title": item.title, "rel": "noopener noreferrer nofollow" }, domProps: { "innerHTML": _vm._s(item.title) } })]), _c("v-list-tile-sub-title", [_vm._v(_vm._s(item.subTitle))])], 1)], 1)];
    })], 2)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("v-alert", { attrs: { "value": true, "color": "warning" } }, [_c("div", [_vm._v(" 警告： "), _c("ul", [_c("li", [_vm._v(" 辅种前请确认下载服务器已关闭类似于 “自动开始下载” 的选项（如果有）。 ")]), _c("li", [_vm._v(" 助手仅对种子文件做简单验证，不保证辅种成功，请自行斟酌是否要使用辅种功能！ ")]), _c("li", [_vm._v(" 如出现因辅种失败造成的爆仓，由用户自行负责！别找我，别找我，别找我。 ")])])])]), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("keepUploadTask.removeConfirmTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("keepUploadTask.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
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
const KeepUploadTasks = __component__.exports;
export {
  KeepUploadTasks as default
};
