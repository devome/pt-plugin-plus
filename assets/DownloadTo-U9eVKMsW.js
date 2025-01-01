import { E as Extension, V as Vue, i as ECommonKey, P as PPF, a as EAction, n as normalizeComponent } from "./index-Ca5-5hzk.js";
import { P as PathHandler } from "./pathHandler-yIpW4LsR.js";
const extension = new Extension();
const _sfc_main = Vue.extend({
  props: {
    flat: Boolean,
    icon: Boolean,
    small: Boolean,
    mini: Boolean,
    color: String,
    iconText: {
      type: String,
      default: "cloud_download"
    },
    downloadOptions: {
      type: [Object, Array],
      default: () => {
        return {
          host: String,
          url: String
        };
      }
    },
    getOptionsOnly: Boolean,
    label: String,
    title: String,
    payload: [Object, Array, String, Number]
  },
  data() {
    return {
      options: this.$store.state.options,
      contentMenus: [],
      pathHandler: new PathHandler(),
      loading: false,
      site: {},
      haveSuccess: false,
      haveError: false,
      allContentMenus: []
    };
  },
  methods: {
    /**
     * 根据指定的站点获取可用的下载目录及客户端信息
     * @param site
     */
    getSiteContentMenus(host) {
      let results = [];
      let clients = [];
      if (this.contentMenus && this.contentMenus.length > 0) {
        return this.contentMenus;
      }
      function pushPath(paths, client) {
        paths.forEach((path) => {
          results.push({
            client,
            path,
            host
          });
        });
      }
      this.options.clients.forEach((client) => {
        clients.push({
          client,
          path: "",
          host
        });
        if (client.paths) {
          for (const _host in client.paths) {
            let paths = client.paths[_host];
            if (host !== _host) {
              continue;
            }
            pushPath(paths, client);
          }
          let publicPaths = client.paths[ECommonKey.allSite];
          if (publicPaths) {
            if (results.length > 0) {
              results.push({});
            }
            pushPath(publicPaths, client);
          }
        }
      });
      if (results.length > 0) {
        clients.splice(0, 0, {});
      }
      results = results.concat(clients);
      this.contentMenus = results;
      return results;
    },
    /**
     * 根据指定的域名获取站点配置信息
     * @param host 域名
     */
    getSiteFromHost(host) {
      return this.options.sites.find((item) => {
        let cdn = item.cdn || [];
        item.url && cdn.push(item.url);
        return item.host == host || cdn.join("").indexOf(host) > -1;
      });
    },
    /**
     * 显示指定链接的下载服务器及目录菜单
     * @param options
     * @param event
     */
    showSiteContentMenus(event) {
      if (Array.isArray(this.downloadOptions)) {
        this.showAllContentMenus(event);
        return;
      }
      let options = this.downloadOptions;
      let host = options.host;
      if (!host && options.site) {
        host = options.site.host;
      }
      if (!host) {
        return;
      }
      this.site = options.site || this.getSiteFromHost(host);
      let items = this.getSiteContentMenus(host);
      let menus = [];
      items.forEach((item) => {
        if (item.client && item.client.name) {
          let title = this.$vuetify.breakpoint.xs ? item.client.name : this.$t("searchTorrent.downloadTo", {
            path: `${item.client.name} -> ${item.client.address}`
          });
          if (item.path) {
            title += ` ->${this.pathHandler.replacePathKey(
              item.path,
              this.site
            )}`;
          }
          menus.push({
            title,
            fn: () => {
              if (options.url) {
                console.log(options, item);
                let url = this.processURLWithPrefix("m-teamdetail", options.site, options.url);
                const downloadOptions = {
                  url,
                  title: options.title,
                  savePath: item.path,
                  autoStart: item.client.autoStart,
                  tagIMDb: item.client.tagIMDb,
                  link: options.link,
                  clientId: item.client.id,
                  imdbId: options.imdbId
                };
                if (this.getOptionsOnly) {
                  downloadOptions.savePath = this.pathHandler.getSavePath(
                    downloadOptions.savePath,
                    this.site
                  );
                  this.$emit("itemClick", {
                    payload: this.payload,
                    downloadOptions: Object.assign(
                      {
                        clientName: item.client.name
                      },
                      downloadOptions
                    )
                  });
                  return;
                }
                this.sendToClient(downloadOptions);
              }
            }
          });
        } else {
          menus.push({});
        }
      });
      PPF.showContextMenu(menus, event);
    },
    processURLWithPrefix(prefix, site, url) {
      if (url && url.startsWith(prefix)) {
        const id = url.substring(prefix.length);
        return PPF.resolveMTDownloadURL(id, site);
      } else {
        return url;
      }
    },
    /**
     * 显示批量下载时可用下载服务器菜单
     * @param event
     */
    showAllContentMenus(event) {
      let clients = [];
      let menus = [];
      let _this = this;
      function addMenu(item) {
        let title = _this.$t("searchTorrent.downloadTo", {
          path: `${item.client.name} -> ${item.client.address}`
        }).toString();
        if (item.path) {
          title += ` -> ${item.path}`;
        }
        menus.push({
          title,
          fn: () => {
            _this.sendTorrentsInBackground(item);
          }
        });
      }
      if (this.allContentMenus.length == 0) {
        this.options.clients.forEach((client) => {
          clients.push({
            client,
            path: ""
          });
        });
        clients.forEach((item) => {
          if (item.client && item.client.name) {
            addMenu(item);
            if (item.client.paths) {
              let publicPaths = item.client.paths[ECommonKey.allSite];
              if (publicPaths) {
                publicPaths.forEach((path) => {
                  if (path.indexOf("$site.name$") == -1 && path.indexOf("$site.host$") == -1 && path.indexOf("<...>") == -1) {
                    let _item = PPF.clone(item);
                    _item.path = path;
                    addMenu(_item);
                  }
                });
              }
            }
          } else {
            menus.push({});
          }
        });
        this.allContentMenus = menus;
      } else {
        menus = this.allContentMenus;
      }
      PPF.showContextMenu(menus, event);
    },
    /**
     * 发送下载任务到后台
     */
    sendTorrentsInBackground(options) {
      let items = [];
      this.downloadOptions.forEach((item) => {
        items.push({
          title: item.title,
          url: item.url,
          clientId: options.client.id,
          savePath: options.path,
          autoStart: options.client.autoStart,
          tagIMDb: options.client.tagIMDb,
          link: item.link,
          imdbId: item.imdbId
        });
      });
      this.loading = true;
      extension.sendRequest(EAction.sendTorrentsInBackground, null, items).then((result) => {
        console.log("命令执行完成", result);
        this.haveSuccess = true;
        this.$emit("success", result);
      }).catch((result) => {
        console.log(result);
        this.haveError = true;
        this.$emit("error", result.msg || result);
      }).finally(() => {
        this.loading = false;
        setTimeout(() => {
          this.clearStatus();
        }, 5e3);
      });
    },
    sendToClient(downloadOptions) {
      this.clearStatus();
      let savePath = this.pathHandler.getSavePath(
        downloadOptions.savePath,
        this.site
      );
      if (savePath === false) {
        return;
      }
      this.loading = true;
      downloadOptions.savePath = savePath;
      extension.sendRequest(EAction.sendTorrentToClient, null, downloadOptions).then((result) => {
        console.log("命令执行完成", result);
        if (result.type == "success") {
          this.haveSuccess = true;
          this.$emit("success", result.msg);
        } else {
          this.haveError = true;
          this.$emit("error", result.msg);
        }
      }).catch((result) => {
        console.log(result);
        this.haveError = true;
        this.$emit("error", result.msg || result);
      }).finally(() => {
        this.loading = false;
        setTimeout(() => {
          this.clearStatus();
        }, 5e3);
      });
    },
    clearStatus() {
      this.haveSuccess = false;
      this.haveError = false;
    }
  }
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-btn", { class: [_vm.mini ? "btn-mini" : ""], attrs: { "flat": _vm.flat, "icon": _vm.icon, "small": _vm.small, "loading": _vm.loading, "title": _vm.title || _vm.$t("searchTorrent.sendToClientTip"), "color": _vm.color }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.showSiteContentMenus.apply(null, arguments);
  } } }, [_vm.haveSuccess ? _c("v-icon", { attrs: { "color": "success", "small": "" } }, [_vm._v("done")]) : _vm.haveError ? _c("v-icon", { attrs: { "color": "red", "small": "" } }, [_vm._v("close")]) : _c("v-icon", { attrs: { "small": "" } }, [_vm._v(_vm._s(_vm.iconText))]), !!_vm.label ? _c("span", { staticClass: "ml-2" }, [_vm._v(_vm._s(_vm.label))]) : _vm._e()], 1);
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
const DownloadTo = __component__.exports;
export {
  DownloadTo as D
};
