import { V as Vue, B as BASE_COLORS, n as normalizeComponent, E as Extension, a as EAction, P as PPF, h as ECommonKey, z as ERequestMethod, C as FileDownloader } from "./index-CkDrmPxA.js";
import { D as DownloadTo } from "./DownloadTo-B2kTAHNd.js";
const _sfc_main$3 = Vue.extend({
  props: {
    dark: Boolean,
    title: String,
    mini: Boolean,
    small: Boolean
  },
  data() {
    return {
      colors: BASE_COLORS,
      show: false
    };
  },
  methods: {
    changeColor(color) {
      this.$emit("change", color);
    }
  },
  watch: {
    show() {
      if (this.show) {
        this.$emit("show");
      } else {
        this.$emit("hide");
      }
    }
  }
});
var _sfc_render$3 = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-menu", { attrs: { "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on }) {
    return [_c("v-btn", _vm._g({ class: ["ma-0", _vm.mini ? "btn-mini" : ""], attrs: { "icon": "", "small": _vm.small, "dark": _vm.dark, "title": _vm.title } }, on), [_c("v-icon", { attrs: { "small": _vm.small } }, [_vm._v("color_lens")])], 1)];
  } }]), model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, _vm._l(_vm.colors, function(color, index) {
    return _c("div", { key: index }, [color != "black" ? [_vm._l([4, 3, 2, 1], function(value, n) {
      return _c("v-btn", { key: `${index}.darken-${n}`, staticClass: "white--text pa-0 ma-0", staticStyle: { "border-radius": "0", "min-width": "30px" }, attrs: { "color": `${color} darken-${value}`, "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _vm.changeColor(`${color} darken-${value}`);
      } } });
    }), _c("v-btn", { staticClass: "white--text pa-0 ma-0", staticStyle: { "border-radius": "0", "min-width": "30px" }, attrs: { "color": color, "small": "" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.changeColor(color);
    } } }), _vm._l([1, 2, 3, 4, 5], function(value, n) {
      return _c("v-btn", { key: `${index}.${n}`, staticClass: "white--text pa-0 ma-0", staticStyle: { "border-radius": "0", "min-width": "30px" }, attrs: { "color": `${color} lighten-${value}`, "small": "" }, on: { "click": function($event) {
        $event.stopPropagation();
        return _vm.changeColor(`${color} lighten-${value}`);
      } } });
    })] : _vm._e()], 2);
  }), 0);
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
const ColorSelector = __component__$3.exports;
const extension$1 = new Extension();
const _sfc_main$2 = Vue.extend({
  components: {
    ColorSelector,
    DownloadTo
  },
  props: {
    width: {
      type: [String, Number],
      default: "205px"
    },
    height: {
      type: [String, Number],
      default: "90px"
    },
    name: String,
    description: String,
    count: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: "grey"
    },
    group: {
      type: Object
    },
    active: Boolean,
    readOnly: Boolean,
    isDefault: Boolean,
    items: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      dark: true,
      colorBoxIsOpen: false
    };
  },
  watch: {
    color() {
      if (this.color.indexOf("lighten") > 0) {
        this.dark = false;
      } else {
        this.dark = true;
      }
    }
  },
  methods: {
    remove() {
      this.$emit("remove", this.group);
    },
    changeColor(color) {
      this.$emit("changeColor", color, this.group);
    },
    click() {
      this.$emit("click", this.group);
    },
    rename() {
      let newValue = window.prompt(
        this.$t("collection.changeGroupName").toString(),
        this.name
      );
      if (newValue && newValue !== this.name) {
        this.$emit("rename", newValue, this.group);
      }
    },
    setDefault() {
      this.$emit("setDefault", this.group);
    },
    cancelDefault() {
      this.$emit("cancelDefault", this.group);
    },
    onDownloadSuccess(msg) {
      console.log("onDownloadSuccess");
      this.$emit("downloadSuccess", msg);
    },
    onDownloadError(msg) {
      this.$emit("downloadError", msg);
    },
    copyLinksToClipboard() {
      let urls = [];
      this.items.forEach((item) => {
        urls.push(item.url);
      });
      extension$1.sendRequest(EAction.copyTextToClipboard, null, urls.join("\n")).then((result) => {
        let msg = this.$t("searchTorrent.copySelectedToClipboardSuccess", {
          count: urls.length
        }).toString();
        this.$emit("downloadSuccess", msg);
      }).catch(() => {
        let msg = this.$t(
          "searchTorrent.copyLinkToClipboardError"
        ).toString();
        this.$emit("downloadError", msg);
      });
    }
  },
  computed: {
    styles() {
      let result = {
        width: this.width,
        height: this.height
      };
      if (typeof this.width === "number") {
        result.width = this.width.toString() + "px";
      } else {
        result.width = this.width;
      }
      if (typeof this.height === "number") {
        result.height = this.height.toString() + "px";
      } else {
        result.height = this.height;
      }
      return result;
    },
    size() {
      let size = 0;
      if (this.items && this.items.length > 0) {
        this.items.forEach((item) => {
          if (item.size && item.size > 0) {
            size += item.size;
          }
        });
      }
      return size;
    }
  }
});
var _sfc_render$2 = function render2() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-hover", { scopedSlots: _vm._u([{ key: "default", fn: function({ hover }) {
    return _c("v-card", { class: `elevation-${hover || _vm.active ? 5 : 1} mr-2`, style: _vm.styles, attrs: { "color": _vm.color, "dark": _vm.dark }, on: { "click": _vm.click } }, [_c("v-card-title", { staticClass: "ma-0 pa-2" }, [_c("div", [_c("span", { staticClass: "subheading" }, [_vm._v(_vm._s(_vm.name))]), _c("span", { staticClass: "ml-2 caption" }, [_vm._v("(" + _vm._s(_vm.count) + ")")])]), _c("div", [_vm._v(_vm._s(_vm.description))])]), _c("v-card-actions", { staticClass: "toolbar" }, [_vm.count > 0 ? _c("span", { staticClass: "ma-1 caption" }, [_vm._v(_vm._s(_vm._f("formatSize")(_vm.size)))]) : _vm._e(), _c("v-spacer"), hover && _vm.count > 0 ? [_c("DownloadTo", { staticClass: "mx-0 btn-mini", attrs: { "downloadOptions": _vm.items, "flat": "", "icon": "" }, on: { "error": _vm.onDownloadError, "success": _vm.onDownloadSuccess } }), _c("v-btn", { staticClass: "mx-0 btn-mini", attrs: { "icon": "", "flat": "", "title": _vm.$t("searchTorrent.copyToClipboardTip") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.copyLinksToClipboard.apply(null, arguments);
    } } }, [_c("v-icon", [_vm._v("file_copy")])], 1)] : _vm._e(), !_vm.readOnly ? [hover || _vm.colorBoxIsOpen ? [_c("v-btn", { staticClass: "ma-0 btn-mini", attrs: { "icon": "", "title": _vm.$t("common.edit") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.rename.apply(null, arguments);
    } } }, [_c("v-icon", [_vm._v("edit")])], 1), _c("v-btn", { staticClass: "ma-0 btn-mini", attrs: { "icon": "", "title": _vm.$t("common.remove") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.remove.apply(null, arguments);
    } } }, [_c("v-icon", [_vm._v("delete")])], 1), _c("ColorSelector", { staticClass: "ma-0", attrs: { "dark": _vm.dark, "mini": "", "title": _vm.$t("common.color") }, on: { "change": _vm.changeColor, "show": function($event) {
      _vm.colorBoxIsOpen = true;
    }, "hide": function($event) {
      _vm.colorBoxIsOpen = false;
    } } }), !_vm.isDefault ? _c("v-btn", { staticClass: "ma-0 btn-mini", attrs: { "icon": "", "title": _vm.$t("common.setDefault") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.setDefault.apply(null, arguments);
    } } }, [_c("v-icon", [_vm._v("favorite_border")])], 1) : _vm._e()] : _vm._e(), _vm.isDefault ? _c("v-btn", { staticClass: "ma-0 btn-mini", attrs: { "icon": "", "title": _vm.$t("common.cancelDefault") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.cancelDefault.apply(null, arguments);
    } } }, [_c("v-icon", [_vm._v("favorite")])], 1) : _vm._e()] : _vm._e()], 2)], 1);
  } }]) });
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  "7c7461cc",
  null,
  null
);
const GroupCard = __component__$2.exports;
const _sfc_main$1 = Vue.extend({
  props: {
    flat: Boolean,
    icon: Boolean,
    small: Boolean,
    iconText: {
      type: String,
      default: "add"
    },
    item: {
      type: Object,
      default: () => {
        return {};
      }
    },
    groups: Array,
    color: {
      type: String,
      default: "success"
    },
    label: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      options: this.$store.state.options,
      contentMenus: [],
      loading: false,
      haveSuccess: false,
      haveError: false
    };
  },
  methods: {
    /**
     * 显示上下文菜单
     * @param options
     * @param event
     */
    showContentMenus(event) {
      let menus = [];
      let groups = PPF.clone(this.item.groups || []);
      groups.push(ECommonKey.all);
      groups.push(ECommonKey.noGroup);
      this.groups.forEach((group) => {
        if (group.id && group.name && !groups.includes(group.id)) {
          menus.push({
            title: group.name,
            fn: () => {
              this.$emit("add", this.item, group);
            }
          });
        }
      });
      if (menus.length == 0) {
        return;
      }
      PPF.showContextMenu(menus, event);
    },
    clearStatus() {
      this.haveSuccess = false;
      this.haveError = false;
    }
  }
});
var _sfc_render$1 = function render3() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-btn", { attrs: { "flat": _vm.flat, "icon": _vm.icon, "small": _vm.small, "loading": _vm.loading, "color": _vm.color }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.showContentMenus.apply(null, arguments);
  } } }, [_vm.haveSuccess ? _c("v-icon", { attrs: { "color": "success", "small": "" } }, [_vm._v("done")]) : _vm.haveError ? _c("v-icon", { attrs: { "color": "red", "small": "" } }, [_vm._v("close")]) : _c("v-icon", { attrs: { "small": "", "title": _vm.$t("collection.addToGroup") } }, [_vm._v(_vm._s(_vm.iconText))]), _vm._v(" " + _vm._s(_vm.label) + " ")], 1);
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
const AddToGroup = __component__$1.exports;
const extension = new Extension();
const _sfc_main = Vue.extend({
  components: {
    DownloadTo,
    GroupCard,
    AddToGroup
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
      allItems: [],
      groups: [],
      options: this.$store.state.options,
      errorMsg: "",
      haveError: false,
      haveSuccess: false,
      successMsg: "",
      siteCache: {},
      activeGroupId: ECommonKey.all,
      defaultGroupId: "",
      filterKey: "",
      loading: false
    };
  },
  /**
   * 当前组件激活时触发
   * 因为启用了搜索结果缓存，所以需要在这里处理关键字
   */
  activated() {
    this.getTorrentCollections();
  },
  methods: {
    clearMessage() {
      this.successMsg = "";
      this.errorMsg = "";
    },
    clear() {
      if (confirm(this.$t("common.clearConfirm").toString())) {
        extension.sendRequest(EAction.clearTorrentCollention).then((result) => {
          this.allItems = [];
          this.items = [];
          this.groups = [];
        });
      }
    },
    remove(item) {
      extension.sendRequest(EAction.deleteTorrentFromCollention, null, item).then((result) => {
        this.getTorrentCollections();
      });
    },
    removeConfirm(item) {
      if (confirm(this.$t("common.removeConfirm").toString())) {
        this.remove(item);
      }
    },
    getTorrentCollections() {
      if (this.loading) {
        return;
      }
      const requests = [];
      requests.push(extension.sendRequest(EAction.getTorrentCollectionGroups));
      requests.push(extension.sendRequest(EAction.getTorrentCollections));
      this.loading = true;
      return Promise.all(requests).then((results) => {
        console.log("getTorrentCollections", results);
        this.items = [];
        this.groups = [];
        let noGroup = {
          id: ECommonKey.noGroup,
          name: this.$t("collection.noGroup").toString(),
          count: 0,
          readOnly: true,
          width: 120
        };
        results[1].forEach((item) => {
          let site = this.siteCache[item.host];
          if (!site) {
            site = PPF.getSiteFromHost(item.host, this.options);
            this.siteCache[item.host] = site;
          }
          item.site = site;
          if (!item.groups || item.groups.length == 0) {
            noGroup.count++;
          }
          this.items.push(item);
        });
        this.allItems = PPF.clone(this.items);
        let allGroup = {
          name: this.$t("common.all").toString(),
          id: ECommonKey.all,
          count: this.allItems.length,
          color: "grey darken-2",
          readOnly: true,
          width: 120
        };
        this.groups.push(allGroup);
        if (noGroup.count !== allGroup.count && noGroup.count > 0) {
          this.groups.push(noGroup);
        }
        this.groups.push(...results[0]);
        if (this.activeGroupId !== ECommonKey.all) {
          this.filterCollections();
        }
        this.loading = false;
      });
    },
    removeSelected() {
      if (this.selected && this.selected.length > 0) {
        if (confirm(this.$t("common.actionConfirm").toString())) {
          this.remove(this.selected);
        }
      }
    },
    onError(msg) {
      this.errorMsg = msg;
    },
    onSuccess(msg) {
      this.successMsg = msg;
    },
    addGroup() {
      let name = window.prompt(this.$t("collection.inputGroupName").toString());
      if (name) {
        extension.sendRequest(EAction.addTorrentCollectionGroup, null, {
          name,
          color: BASE_COLORS[Math.floor(Math.random() * BASE_COLORS.length)]
        }).then(() => {
          this.getTorrentCollections();
        });
      }
    },
    getGroupList(item) {
      let result = [];
      if (item.groups) {
        item.groups.forEach((id) => {
          this.groups.forEach((group) => {
            if (group.id === id) {
              result.push(group);
            }
          });
        });
      }
      if (result.length == 0) {
        result.push({
          name: this.$t("collection.noGroup").toString()
        });
      }
      return result;
    },
    removeGroup(group) {
      if (group.count && group.count > 0) {
        if (!confirm(
          this.$t("collection.removeGroupConfirm", {
            count: group.count
          }).toString()
        )) {
          return;
        }
      }
      extension.sendRequest(EAction.removeTorrentCollectionGroup, null, group).then(() => {
        this.getTorrentCollections();
      });
      this.cancelDefaultGroup(group);
    },
    changeGroupColor(color, group) {
      group.color = color;
      console.log(color, group);
      extension.sendRequest(EAction.updateTorrentCollectionGroup, null, group).then(() => {
        this.getTorrentCollections();
      });
    },
    addToGroup(item, group) {
      console.log(item, group);
      extension.sendRequest(EAction.addTorrentCollectionToGroup, null, {
        item,
        groupId: group.id
      }).then(() => {
        this.getTorrentCollections();
      });
    },
    changeGroupName(name, group) {
      group.name = name;
      extension.sendRequest(EAction.updateTorrentCollectionGroup, null, group).then(() => {
        this.getTorrentCollections();
      });
    },
    removeFromGroup(item, group) {
      extension.sendRequest(EAction.removeTorrentCollectionFromGroup, null, {
        item,
        groupId: group.id
      }).then(() => {
        this.getTorrentCollections();
      });
    },
    setGroupActive(group) {
      this.activeGroupId = group.id;
      if (this.activeGroupId === ECommonKey.all) {
        this.getTorrentCollections();
        return;
      }
      this.filterCollections();
    },
    filterCollections() {
      let groupId = this.activeGroupId;
      this.items = this.getItemsFromGroup(groupId);
    },
    getItemsFromGroup(groupId) {
      if (groupId === ECommonKey.all) {
        return this.allItems;
      }
      let result = [];
      for (let index = 0; index < this.allItems.length; index++) {
        const item = this.allItems[index];
        if (item.groups && item.groups.includes(groupId)) {
          result.push(item);
        } else if (groupId === ECommonKey.noGroup && (!item.groups || item.groups.length === 0)) {
          result.push(item);
        }
      }
      return result;
    },
    setDefaultGroup(group) {
      this.defaultGroupId = group.id;
      this.$store.dispatch("saveConfig", {
        defaultCollectionGroupId: group.id
      });
    },
    cancelDefaultGroup(group) {
      if (this.defaultGroupId === group.id) {
        this.defaultGroupId = "";
        this.$store.dispatch("saveConfig", {
          defaultCollectionGroupId: ""
        });
      }
    },
    setMovieId(item) {
      let id = prompt(this.$t("collection.setMovieId").toString());
      if (!id) {
        return;
      }
      let doubanId = "";
      let imdbId = "";
      if (/^(tt\d+)$/.test(id)) {
        imdbId = id;
      } else if (/^(\d+)$/.test(id)) {
        doubanId = id;
      }
      if (imdbId || doubanId) {
        let data = PPF.clone(item);
        delete data.site;
        data.movieInfo = {
          imdbId,
          doubanId
        };
        extension.sendRequest(EAction.updateTorrentCollention, null, data).then(() => {
          this.getTorrentCollections();
        });
      }
    },
    /**
     * 搜索结果过滤器，用于用户二次过滤
     * @param items
     * @param search
     */
    searchResultFilter(items, search) {
      search = search.toString().toLowerCase();
      if (search.trim() === "")
        return items;
      let searchs = search.split(" ");
      return items.filter((item) => {
        let texts = [];
        texts.push(item.title);
        item.subTitle && texts.push(item.title);
        if (item.movieInfo) {
          item.movieInfo.title && texts.push(item.movieInfo.title);
          item.movieInfo.alt_title && texts.push(item.movieInfo.alt_title);
        }
        let source = texts.join("").toLowerCase();
        let result = true;
        searchs.forEach((key) => {
          if (key.trim() != "") {
            result = result && source.indexOf(key) > -1;
          }
        });
        return result;
      });
    },
    /**
     * 保存种子文件
     * @param item
     */
    saveTorrentFile(item) {
      let requestMethod = ERequestMethod.GET;
      if (item.site) {
        requestMethod = item.site.downloadMethod || ERequestMethod.GET;
      }
      let url = item.url + "";
      let file = new FileDownloader({
        url,
        timeout: this.options.connectClientTimeout,
        fileName: `[${item.site.name}][${item.title}].torrent`
      });
      file.requestMethod = requestMethod;
      file.onError = (error) => {
      };
      file.start();
    }
  },
  created() {
    this.getTorrentCollections();
    this.defaultGroupId = this.options.defaultCollectionGroupId;
  },
  watch: {
    successMsg() {
      this.haveSuccess = this.successMsg != "";
    },
    errorMsg() {
      this.haveError = this.errorMsg != "";
    }
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
          text: this.$t("collection.headers.title"),
          align: "left",
          value: "title"
        },
        {
          text: this.$t("collection.headers.site"),
          align: "left",
          value: "site.host",
          width: 150
        },
        {
          text: this.$t("collection.headers.size"),
          align: "right",
          value: "size",
          width: 100
        },
        {
          text: this.$t("collection.headers.time"),
          align: "right",
          value: "time",
          width: 130
        },
        {
          text: this.$t("collection.headers.action"),
          value: "title",
          align: "center",
          sortable: false,
          width: 150
        }
      ];
    }
  }
});
var _sfc_render = function render4() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "collection" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("collection.title")))]), _c("v-card", [_vm.groups.length > 1 ? _c("div", { staticClass: "ma-2 pt-2", staticStyle: { "height": "120px", "overflow-x": "auto", "display": "-webkit-box" } }, _vm._l(_vm.groups, function(group, index) {
    return _c("GroupCard", { key: index, attrs: { "color": group.color, "name": group.name, "description": group.description, "count": group.count, "group": group, "active": group.id === _vm.activeGroupId, "readOnly": group.readOnly, "width": group.width, "isDefault": group.id === _vm.defaultGroupId, "items": _vm.getItemsFromGroup(group.id) }, on: { "changeColor": _vm.changeGroupColor, "remove": _vm.removeGroup, "rename": _vm.changeGroupName, "click": _vm.setGroupActive, "setDefault": _vm.setDefaultGroup, "cancelDefault": _vm.cancelDefaultGroup, "downloadSuccess": _vm.onSuccess, "downloadError": _vm.onError } });
  }), 1) : _vm._e(), _c("v-divider"), _c("v-card-title", [_c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.removeSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("common.remove")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.items.length == 0 }, on: { "click": _vm.clear } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("clear")]), _vm._v(" " + _vm._s(_vm.$t("common.clear")) + " ")], 1), _c("v-divider", { staticClass: "mx-3 mt-0", attrs: { "vertical": "" } }), _c("v-btn", { attrs: { "color": "success" }, on: { "click": _vm.addGroup } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("add")]), _vm._v(" " + _vm._s(_vm.$t("collection.addGroup")) + " ")], 1), _c("v-btn", { attrs: { "color": "info", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/my-collection", "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("help")]), _vm._v(" " + _vm._s(_vm.$t("settings.searchSolution.index.help")) + " ")], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "", "clearable": "" }, model: { value: _vm.filterKey, callback: function($$v) {
    _vm.filterKey = $$v;
  }, expression: "filterKey" } })], 1), _c("v-data-table", { staticClass: "dataList", attrs: { "search": _vm.filterKey, "custom-filter": _vm.searchResultFilter, "headers": _vm.headers, "items": _vm.items, "pagination": _vm.pagination, "item-key": "link", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "50px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", [_vm._v(_vm._s(props.index + 1))]), _c("td", [_c("v-img", { staticClass: "mx-0 my-2", attrs: { "src": props.item.movieInfo && props.item.movieInfo.image ? props.item.movieInfo.image : "./assets/movie.png", "contain": "", "max-height": props.item.movieInfo && props.item.movieInfo.image ? 100 : 80, "position": "left center" } }, [_c("v-layout", { staticStyle: { "margin-left": "90px" }, attrs: { "row": "", "wrap": "" } }, [props.item.movieInfo && props.item.movieInfo.title ? [_c("v-flex", { attrs: { "xs12": "" } }, [_c("a", { attrs: { "href": props.item.movieInfo.link, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("img", { staticClass: "mr-2 mt-0", attrs: { "src": "https://img3.doubanio.com/favicon.ico", "width": "16" } })]), _c("span", { staticClass: "title" }, [_vm._v(_vm._s(props.item.movieInfo.title))]), _c("span", { staticClass: "caption ml-2" }, [_vm._v("(" + _vm._s(props.item.movieInfo.year) + ")")])]), _c("v-flex", { staticClass: "mb-1", attrs: { "xs12": "" } }, [_c("span", { staticClass: "sub-title" }, [_vm._v(_vm._s(props.item.movieInfo.alt_title))])])] : _vm._e(), [_c("v-flex", { attrs: { "xs12": "" } }, [_c("a", { attrs: { "href": props.item.link, "target": "_blank", "title": props.item.title, "rel": "noopener noreferrer nofollow" } }, [_c("span", [_vm._v(_vm._s(props.item.title))])])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", { staticClass: "sub-title" }, [_vm._v(_vm._s(props.item.subTitle))])])]], 2)], 1), [_c("div", { staticStyle: { "margin-left": "90px" } }, [_vm._l(_vm.getGroupList(props.item), function(group, index) {
      return _c("v-hover", { key: index, scopedSlots: _vm._u([{ key: "default", fn: function({ hover }) {
        return _c("v-chip", { attrs: { "close": hover && group.id != null, "label": "", "color": group.color || "grey", "dark": group.color && group.color.indexOf("lighten") > 0 ? false : true, "small": "" }, on: { "input": function($event) {
          return _vm.removeFromGroup(props.item, group);
        } } }, [_vm._v(_vm._s(group.name))]);
      } }], null, true) });
    }), _vm.groups && _vm.groups.length > 1 ? _c("AddToGroup", { attrs: { "icon": "", "small": "", "flat": "", "item": props.item, "groups": _vm.groups }, on: { "add": _vm.addToGroup } }) : _vm._e()], 2)]], 2), _c("td", [!!props.item.site ? _c("v-layout", { attrs: { "row": "", "wrap": "" } }, [_c("a", { staticClass: "nodecoration", attrs: { "href": props.item.site.activeURL, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-avatar", { attrs: { "size": 15 } }, [_c("img", { attrs: { "src": props.item.site.icon } })]), _c("span", { staticClass: "caption ml-1 site-name" }, [_vm._v(_vm._s(props.item.site.name))])], 1)]) : _vm._e()], 1), _c("td", { staticClass: "text-xs-right" }, [_vm._v(_vm._s(_vm._f("formatSize")(props.item.size)))]), _c("td", { staticClass: "text-xs-right" }, [_vm._v(_vm._s(_vm._f("formatDate")(props.item.time)))]), _c("td", { staticClass: "text-xs-center" }, [props.item.movieInfo ? [!!props.item.movieInfo.imdbId ? _c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "title": _vm.$t("common.search"), "to": `/search-torrent/${props.item.movieInfo.imdbId}` } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("search")])], 1) : !!props.item.movieInfo.doubanId ? _c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "title": _vm.$t("common.search"), "to": `/search-torrent/douban${props.item.movieInfo.doubanId}|${props.item.movieInfo.title}|${props.item.movieInfo.alt_title}` } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("search")])], 1) : _c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "title": _vm.$t("collection.setMovieId") }, on: { "click": function($event) {
      return _vm.setMovieId(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("edit")])], 1)] : _vm._e(), _c("DownloadTo", { staticClass: "mx-0", attrs: { "downloadOptions": props.item, "flat": "", "icon": "", "small": "" }, on: { "error": _vm.onError, "success": _vm.onSuccess } }), props.item.site.downloadMethod == "POST" ? _c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.saveTorrentFile(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "", "title": _vm.$t("searchTorrent.saveTip") } }, [_vm._v("save")])], 1) : _c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "href": props.item.url, "target": "_blank", "rel": "noopener noreferrer nofollow", "title": _vm.$t("searchTorrent.saveTip") } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("save")])], 1), _c("v-btn", { staticClass: "mx-0", attrs: { "flat": "", "icon": "", "small": "", "color": "error", "title": _vm.$t("common.remove") }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("delete")])], 1)], 2)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error", "multi-line": "" }, model: { value: _vm.haveError, callback: function($$v) {
    _vm.haveError = $$v;
  }, expression: "haveError" } }, [_c("span", { domProps: { "innerHTML": _vm._s(_vm.errorMsg) } })]), _c("v-snackbar", { attrs: { "bottom": "", "timeout": 3e3, "color": "success", "multi-line": "" }, model: { value: _vm.haveSuccess, callback: function($$v) {
    _vm.haveSuccess = $$v;
  }, expression: "haveSuccess" } }, [_c("span", { domProps: { "innerHTML": _vm._s(_vm.successMsg) } })])], 1);
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
const Index = __component__.exports;
export {
  Index as default
};
