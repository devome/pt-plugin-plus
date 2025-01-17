import { E as Extension, V as Vue, h as EViewKey, G as ETagType, H as EUserDataRequestStatus, a as EAction, P as PPF, r as dayjs, F as FileSaver, n as normalizeComponent } from "./index-a-kPTsLM.js";
import { d as domtoimage } from "./dom-to-image-tglxW4Rh.js";
const extension = new Extension();
const _sfc_main = Vue.extend({
  data() {
    return {
      shareMessage: this.$t("timeline.shareMessage").toString(),
      displayUserName: "",
      sites: [],
      showSites: [],
      infos: {
        nameInfo: { name: "test", maxCount: 0 },
        joinTimeInfo: {
          site: {},
          time: (/* @__PURE__ */ new Date()).getTime(),
          years: 0
        },
        maxUploadsInfo: {
          site: {},
          maxValue: 0,
          subSite: {},
          submaxValue: 0
        },
        maxUploadedInfo: {
          site: {},
          maxValue: 0,
          subSite: {},
          submaxValue: 0
        },
        maxDownloadedInfo: {
          site: {},
          maxValue: 0,
          subSite: {},
          submaxValue: 0
        },
        maxSeedingInfo: {
          site: {},
          maxValue: 0,
          subSite: {},
          submaxValue: 0
        },
        maxSeedingSizeInfo: {
          site: {},
          maxValue: 0,
          subSite: {},
          submaxValue: 0
        },
        total: {
          uploads: 0,
          uploaded: 0,
          downloaded: 0,
          seedingSize: 0,
          ratio: -1,
          seeding: 0
        }
      },
      options: this.$store.state.options,
      version: "",
      datas: [],
      shareTime: /* @__PURE__ */ new Date(),
      shareing: false,
      showUserName: true,
      showSiteName: false,
      showUserLevel: true,
      showUserUploads: true,
      showUid: true,
      blurSiteIcon: true,
      iconCache: {}
    };
  },
  created() {
    if (chrome && chrome.runtime) {
      let manifest = chrome.runtime.getManifest();
      this.version = "v" + (manifest.version_name || manifest.version);
    }
    this.init();
  },
  mounted() {
  },
  computed: {
    selectedTagValues() {
      let { selectedTags } = this.$store.getters.viewsOptions(EViewKey.home, {});
      if (selectedTags && Array.isArray(selectedTags) && selectedTags.length > 0) {
        return selectedTags.map((_) => _.value);
      } else {
        return [];
      }
    }
  },
  methods: {
    filteredSitesByTags(sites) {
      var _a;
      if (this.selectedTagValues.length === 0)
        return sites;
      if (this.selectedTagValues.includes(ETagType.all))
        return sites;
      let tags = this.clone(this.selectedTagValues);
      let res = [];
      if (tags.includes(ETagType.unTagged)) {
        let allUnTaggedSites = sites.filter((s) => !s.tags || s.tags.length === 0);
        res = res.concat(allUnTaggedSites);
      }
      if (tags.includes(ETagType.unReadMsg)) {
        let allUnReadMsgSites = sites.filter((site) => {
          var _a2;
          return (((_a2 = site.user) == null ? void 0 : _a2.messageCount) || 0) > 0;
        });
        res = res.concat(allUnReadMsgSites);
      }
      if (tags.includes(ETagType.statusError)) {
        let allStatusErrSites = sites.filter((site) => {
          var _a2, _b;
          return ((_a2 = site.user) == null ? void 0 : _a2.lastErrorMsg) || ((_b = site.user) == null ? void 0 : _b.lastUpdateStatus) !== EUserDataRequestStatus.success;
        });
        res = res.concat(allStatusErrSites);
      }
      let allTaggedSites = sites.filter((s) => Array.isArray(s.tags) && s.tags.length > 0);
      for (let site of allTaggedSites) {
        if ((_a = site.tags) == null ? void 0 : _a.some((s) => tags.includes(s))) {
          res.push(site);
        }
      }
      return res;
    },
    init() {
      extension.sendRequest(EAction.readConfig).then((options) => {
        this.options = this.clone(options);
        this.sites = this.options.sites;
        if (this.options.shareMessage) {
          this.shareMessage = this.options.shareMessage;
        }
        if (this.options.displayUserName) {
          this.displayUserName = this.options.displayUserName;
        }
        let showSites = this.sites.filter((site) => {
          return site.allowGetUserInfo;
        });
        showSites = this.filteredSitesByTags(showSites);
        this.showSites = [...new Set(showSites.map((site) => site.name))];
        this.formatData();
      }).catch();
    },
    formatData() {
      let userNames = {};
      let result = this.infos;
      result = {
        nameInfo: { name: "test", maxCount: 0 },
        joinTimeInfo: {
          site: {},
          time: (/* @__PURE__ */ new Date()).getTime(),
          years: 0
        },
        maxUploadsInfo: {
          site: {},
          maxValue: 0,
          subSite: {},
          submaxValue: 0
        },
        maxUploadedInfo: {
          site: {},
          maxValue: 0,
          subSite: {},
          submaxValue: 0
        },
        maxDownloadedInfo: {
          site: {},
          maxValue: 0,
          subSite: {},
          submaxValue: 0
        },
        maxSeedingInfo: {
          site: {},
          maxValue: 0,
          subSite: {},
          submaxValue: 0
        },
        maxSeedingSizeInfo: {
          site: {},
          maxValue: 0,
          subSite: {},
          submaxValue: 0
        },
        total: {
          uploads: 0,
          uploaded: 0,
          downloaded: 0,
          seedingSize: 0,
          ratio: -1,
          seeding: 0
        }
      };
      let sites = [];
      this.sites.forEach((site) => {
        if (!site.allowGetUserInfo) {
          return;
        }
        if (!this.showSites.includes(site.name)) {
          return;
        }
        let user = site.user;
        if (user && user.name && user.joinTime) {
          user.joinTime = PPF.transformTime(user.joinTime, site.timezoneOffset);
          sites.push(site);
          if (!userNames[user.name]) {
            userNames[user.name] = 0;
          }
          userNames[user.name]++;
          if (userNames[user.name] > result.nameInfo.maxCount) {
            result.nameInfo.name = user.name;
            result.nameInfo.maxCount = userNames[user.name];
          }
          if (user.joinTime && user.joinTime < result.joinTimeInfo.time) {
            result.joinTimeInfo.time = Math.round(user.joinTime);
            result.joinTimeInfo.site = site;
          }
          if (user.uploads && user.uploads > 0) {
            if (typeof user.uploads !== "number") {
              console.log(`${site.url}: 当前站点 uploads 类型为 ${typeof user.uploads}，强制转换为 number 类型`);
              user.uploads = parseInt(user.uploads) || 0;
            }
            result.total.uploads += user.uploads;
            if (user.uploads > result.maxUploadsInfo.maxValue) {
              result.maxUploadsInfo.submaxValue = result.maxUploadsInfo.maxValue;
              result.maxUploadsInfo.subSite = result.maxUploadsInfo.site;
              result.maxUploadsInfo.maxValue = user.uploads;
              result.maxUploadsInfo.site = site;
            } else if (user.uploads > result.maxUploadsInfo.submaxValue) {
              result.maxUploadsInfo.submaxValue = user.uploads;
              result.maxUploadsInfo.subSite = site;
            }
          }
          if (user.uploaded && user.uploaded > 0) {
            result.total.uploaded += user.uploaded;
            if (user.uploaded > result.maxUploadedInfo.maxValue) {
              result.maxUploadedInfo.submaxValue = result.maxUploadedInfo.maxValue;
              result.maxUploadedInfo.subSite = result.maxUploadedInfo.site;
              result.maxUploadedInfo.maxValue = user.uploaded;
              result.maxUploadedInfo.site = site;
            } else if (user.uploaded > result.maxUploadedInfo.submaxValue) {
              result.maxUploadedInfo.submaxValue = user.uploaded;
              result.maxUploadedInfo.subSite = site;
            }
          }
          if (user.downloaded && user.downloaded > 0) {
            result.total.downloaded += user.downloaded;
            if (user.downloaded > result.maxDownloadedInfo.maxValue) {
              result.maxDownloadedInfo.submaxValue = result.maxDownloadedInfo.maxValue;
              result.maxDownloadedInfo.subSite = result.maxDownloadedInfo.site;
              result.maxDownloadedInfo.maxValue = user.downloaded;
              result.maxDownloadedInfo.site = site;
            } else if (user.downloaded > result.maxDownloadedInfo.submaxValue) {
              result.maxDownloadedInfo.submaxValue = user.downloaded;
              result.maxDownloadedInfo.subSite = site;
            }
          }
          if (user.seeding && user.seeding > 0) {
            result.total.seeding += Math.round(user.seeding);
            if (user.seeding > result.maxSeedingInfo.maxValue) {
              result.maxSeedingInfo.submaxValue = result.maxSeedingInfo.maxValue;
              result.maxSeedingInfo.subSite = result.maxSeedingInfo.site;
              result.maxSeedingInfo.maxValue = Math.round(user.seeding);
              result.maxSeedingInfo.site = site;
            } else if (user.seeding > result.maxSeedingInfo.submaxValue) {
              result.maxSeedingInfo.submaxValue = Math.round(user.seeding);
              result.maxSeedingInfo.subSite = site;
            }
          }
          if (user.seedingSize && user.seedingSize > 0) {
            result.total.seedingSize += user.seedingSize;
            if (user.seedingSize > result.maxSeedingSizeInfo.maxValue) {
              result.maxSeedingSizeInfo.submaxValue = result.maxSeedingSizeInfo.maxValue;
              result.maxSeedingSizeInfo.subSite = result.maxSeedingSizeInfo.site;
              result.maxSeedingSizeInfo.maxValue = user.seedingSize;
              result.maxSeedingSizeInfo.site = site;
            } else if (user.seedingSize > result.maxSeedingSizeInfo.submaxValue) {
              result.maxSeedingSizeInfo.submaxValue = user.seedingSize;
              result.maxSeedingSizeInfo.subSite = site;
            }
          }
          user.ratio = this.getRatio(user);
        }
      });
      if (result.joinTimeInfo.time > 0) {
        result.joinTimeInfo.years = dayjs(/* @__PURE__ */ new Date()).diff(result.joinTimeInfo.time, "year", true).toFixed(2);
      }
      this.infos = result;
      this.datas = sites.sort((a, b) => {
        if (!a.user || !b.user) {
          return 0;
        }
        const sortA = a.user.joinTime || 0;
        const sortB = b.user.joinTime || 0;
        if (sortA < sortB)
          return -1;
        if (sortA > sortB)
          return 1;
        return 0;
      });
      this.infos.total.ratio = this.getRatio(this.infos.total);
    },
    getRatio(info) {
      let downloaded = info.downloaded;
      let uploaded = info.uploaded;
      if (downloaded == 0 && uploaded > 0) {
        return -1;
      } else if (downloaded > 0) {
        return uploaded / downloaded;
      }
      return -1;
    },
    /**
     * 用JSON对象模拟对象克隆
     * @param source
     */
    clone(source) {
      return JSON.parse(JSON.stringify(source));
    },
    share() {
      this.shareing = true;
      this.shareTime = /* @__PURE__ */ new Date();
      this.formatData();
      setTimeout(() => {
        let div = this.$refs.userDataCard;
        domtoimage.toBlob(div, {
          imagePlaceholder: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          filter: (node) => {
            if (node.nodeType === 1) {
              return !node.classList.contains("by_pass_canvas");
            }
            return true;
          }
        }).then((blob) => {
          if (blob) {
            FileSaver.saveAs(blob, "PT-Plugin-Plus-UserData.png");
          }
          this.shareing = false;
        }).catch((error) => {
          console.log("error:", error);
          this.shareing = false;
        });
      }, 500);
    },
    /**
     * 替换网络图片，用于生成图片
     * 因为网络图片会存在跨域问题，无法正常生成图片
     */
    replaceImageToBase64() {
      let div = this.$refs.userDataCard;
      let imgs = $("img", div);
      imgs.each((index, el) => {
        let src = $(el).attr("src") + "";
        if (src.indexOf("http") > -1) {
          if (this.iconCache[src]) {
            $(el).attr("src", this.iconCache[src]);
            return;
          }
          extension.sendRequest(EAction.getBase64FromImageUrl, null, src).then((result) => {
            this.iconCache[src] = result;
            $(el).attr("src", result);
          }).catch((e) => {
            console.log(e);
          });
        }
      });
    },
    /**
     * 修改需要显示的用户名
     */
    changeDisplayUserName() {
      let result = prompt(
        this.$t("timeline.inputDisplayName").toString(),
        this.displayUserName
      );
      if (result != null) {
        this.displayUserName = result;
        this.$store.dispatch("saveConfig", {
          displayUserName: result
        });
      }
    },
    /**
     * 修复需要分享的寄语
     */
    changeShareMessage() {
      let result = prompt(
        this.$t("timeline.inputShareMessage").toString(),
        this.shareMessage
      );
      if (result != null) {
        this.shareMessage = result;
        this.$store.dispatch("saveConfig", {
          shareMessage: result
        });
      }
    }
  },
  filters: {
    formatRatio(v) {
      if (v > 1e4 || v == -1) {
        return "∞";
      }
      let number = parseFloat(v);
      if (isNaN(number)) {
        return "-";
      }
      return number.toFixed(2);
    }
  }
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "userDataTimeline" }, [_c("div", { ref: "userDataCard", staticClass: "card" }, [_c("v-card", { staticClass: "white--text", attrs: { "color": "blue-grey darken-2" } }, [_c("v-card-actions", [_c("v-chip", { attrs: { "color": "blue-grey darken-2", "text-color": "white", "label": "", "outline": "" }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.changeDisplayUserName.apply(null, arguments);
  } } }, [_c("v-avatar", [_c("v-icon", [_vm._v("account_circle")])], 1), _c("div", { staticClass: "title" }, [_vm._v(_vm._s(_vm.displayUserName || _vm.infos.nameInfo.name))])], 1), _c("v-spacer"), !_vm.shareing ? _c("v-btn", { staticClass: "white--text", attrs: { "flat": "", "icon": "", "title": _vm.$t("timeline.share") }, on: { "click": _vm.share } }, [_c("v-icon", [_vm._v("share")])], 1) : _vm._e(), !_vm.shareing ? _c("v-btn", { staticClass: "white--text", attrs: { "flat": "", "icon": "", "to": "/home", "title": _vm.$t("timeline.close") } }, [_c("v-icon", [_vm._v("close")])], 1) : _vm._e(), _vm.shareing ? _c("v-progress-circular", { staticClass: "by_pass_canvas", attrs: { "indeterminate": "", "width": 3, "size": "30", "color": "green" } }) : _vm._e()], 1), _c("v-layout", { attrs: { "row": "", "wrap": "" } }, [_c("v-card-title", { attrs: { "primary-title": "" } }, [_c("div", { staticClass: "headline font-weight-bold" }, [_c("div", [_vm._v(_vm._s(_vm.$t("timeline.total.sites")) + _vm._s(_vm.datas.length))]), _vm.showUserUploads && _vm.infos.total.uploads && _vm.infos.total.uploads > 0 ? _c("div", [_vm._v(_vm._s(_vm.$t("timeline.total.uploads")) + _vm._s(_vm.infos.total.uploads))]) : _vm._e(), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.total.uploaded")) + _vm._s(_vm._f("formatSizetoPrecision")(_vm.infos.total.uploaded)))]), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.total.downloaded")) + _vm._s(_vm._f("formatSizetoPrecision")(_vm.infos.total.downloaded)))]), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.total.seedingSize")) + _vm._s(_vm._f("formatSizetoPrecision")(_vm.infos.total.seedingSize)))]), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.total.seeding")) + _vm._s(_vm.infos.total.seeding))]), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.total.ratio")) + _vm._s(_vm._f("formatRatio")(_vm.infos.total.ratio)))]), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.total.years", { year: _vm.infos.joinTimeInfo.years })))])])]), _c("v-divider", { attrs: { "vertical": "" } }), _c("v-card-title", { attrs: { "primary-title": "" } }, [_c("div", { staticClass: "headline font-weight-bold" }, [_c("div", [_c("v-icon", { attrs: { "color": "#C9B037" } }, [_vm._v("emoji_events")])], 1), _vm.showUserUploads && _vm.infos.total.uploads && _vm.infos.total.uploads > 0 ? _c("div", [_c("div", [_c("v-avatar", { attrs: { "size": "20" } }, [_vm.infos.maxUploadsInfo.site.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": _vm.infos.maxUploadsInfo.site.icon } }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm.infos.maxUploadsInfo.maxValue))])], 1)]) : _vm._e(), _c("div", [_c("v-avatar", { attrs: { "size": "20" } }, [_vm.infos.maxUploadedInfo.site.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": _vm.infos.maxUploadedInfo.site.icon } }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm._f("formatSizetoPrecision")(_vm.infos.maxUploadedInfo.maxValue)))])], 1), _c("div", [_c("v-avatar", { attrs: { "size": "20" } }, [_vm.infos.maxDownloadedInfo.site.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": _vm.infos.maxDownloadedInfo.site.icon } }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm._f("formatSizetoPrecision")(_vm.infos.maxDownloadedInfo.maxValue)))])], 1), _c("div", [_c("v-avatar", { attrs: { "size": "20" } }, [_vm.infos.maxSeedingSizeInfo.site.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": _vm.infos.maxSeedingSizeInfo.site.icon } }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm._f("formatSizetoPrecision")(_vm.infos.maxSeedingSizeInfo.maxValue)))])], 1), _c("div", [_c("v-avatar", { attrs: { "size": "20" } }, [_vm.infos.maxSeedingInfo.site.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": _vm.infos.maxSeedingInfo.site.icon } }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm.infos.maxSeedingInfo.maxValue))])], 1), _c("div", [_c("v-icon")], 1), _c("div", [_c("v-icon")], 1)])]), _vm.infos.maxUploadsInfo.subSite ? _c("v-card-title", { attrs: { "primary-title": "" } }, [_c("div", { staticClass: "headline font-weight-bold" }, [_c("div", [_c("v-icon", { attrs: { "color": "#B4B4B4" } }, [_vm._v("emoji_events")])], 1), _vm.showUserUploads && _vm.infos.total.uploads && _vm.infos.total.uploads > 0 ? _c("div", [_c("div", [_c("v-avatar", { attrs: { "size": "20" } }, [_vm.infos.maxUploadsInfo.subSite.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": _vm.infos.maxUploadsInfo.subSite.icon } }) : _vm._e()]), _vm.infos.maxUploadsInfo.submaxValue && _vm.infos.maxUploadsInfo.submaxValue > 0 ? _c("span", [_vm._v(_vm._s(_vm.infos.maxUploadsInfo.submaxValue))]) : _vm._e()], 1)]) : _vm._e(), _c("div", [_c("v-avatar", { attrs: { "size": "20" } }, [_vm.infos.maxUploadedInfo.subSite.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": _vm.infos.maxUploadedInfo.subSite.icon } }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm._f("formatSizetoPrecision")(_vm.infos.maxUploadedInfo.submaxValue)))])], 1), _c("div", [_c("v-avatar", { attrs: { "size": "20" } }, [_vm.infos.maxDownloadedInfo.subSite.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": _vm.infos.maxDownloadedInfo.subSite.icon } }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm._f("formatSizetoPrecision")(_vm.infos.maxDownloadedInfo.submaxValue)))])], 1), _c("div", [_c("v-avatar", { attrs: { "size": "20" } }, [_vm.infos.maxSeedingSizeInfo.subSite.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": _vm.infos.maxSeedingSizeInfo.subSite.icon } }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm._f("formatSizetoPrecision")(_vm.infos.maxSeedingSizeInfo.submaxValue)))])], 1), _c("div", [_c("v-avatar", { attrs: { "size": "20" } }, [_vm.infos.maxSeedingInfo.subSite.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": _vm.infos.maxSeedingInfo.subSite.icon } }) : _vm._e()]), _c("span", [_vm._v(_vm._s(_vm.infos.maxSeedingInfo.submaxValue))])], 1), _c("div", [_c("v-icon")], 1), _c("div", [_c("v-icon")], 1)])]) : _vm._e()], 1), _c("v-card-text", [_c("v-divider"), _c("div", { staticStyle: { "text-align": "center" } }, [_c("div", { staticClass: "headline font-weight-bold mt-2", on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.changeShareMessage.apply(null, arguments);
  } } }, [_vm._v("... " + _vm._s(_vm.shareMessage) + " ...")]), _c("div", { staticStyle: { "color": "#b5b5b5" } }, [_vm._v("(" + _vm._s(_vm.$t("timeline.updateat")) + _vm._s(_vm._f("formatDate")(_vm.options.autoRefreshUserDataLastTime, "YYYY-MM-DD HH:mm:ss")) + ")")])]), _c("v-timeline", { staticClass: "my-2" }, _vm._l(_vm.datas, function(site, i) {
    return _c("v-timeline-item", { key: i, attrs: { "color": "transparent", "large": "" }, scopedSlots: _vm._u([{ key: "icon", fn: function() {
      return [_c("v-avatar", { attrs: { "size": "38" } }, [site.icon ? _c("img", { class: { "icon-blur": _vm.blurSiteIcon }, attrs: { "src": site.icon } }) : _vm._e()])];
    }, proxy: true }, { key: "opposite", fn: function() {
      return [_c("div", { staticClass: "headline font-weight-bold" }, [_vm._v(_vm._s(_vm._f("timeAgo")(site.user.joinTime)))]), _c("div", { staticClass: "caption" }, [_vm.showUserName ? _c("span", { staticClass: "mr-2" }, [_vm._v(_vm._s(site.user.name))]) : _vm._e(), _vm.showUserLevel ? _c("span", [_vm._v("<" + _vm._s(site.user.levelName) + ">")]) : _vm._e(), site.user.id && site.user.id.length > 0 && _vm.showUid ? _c("span", [_vm._v("<" + _vm._s(site.user.id) + ">")]) : _vm._e()])];
    }, proxy: true }], null, true) }, [_c("div", [i > 0 ? _c("v-divider", { staticClass: "mb-2" }) : _vm._e(), _vm.showSiteName ? _c("div", { staticClass: "headline font-weight-light mb-2" }, [_vm._v(_vm._s(site.name))]) : _vm._e(), _vm.showUserUploads && site.user.uploads && site.user.uploads > 0 ? _c("div", [_vm._v(_vm._s(_vm.$t("timeline.user.uploads")) + _vm._s(site.user.uploads))]) : _vm._e(), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.user.uploaded")) + _vm._s(_vm._f("formatSize")(site.user.uploaded)))]), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.user.downloaded")) + _vm._s(_vm._f("formatSize")(site.user.downloaded)))]), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.user.ratio")) + _vm._s(_vm._f("formatRatio")(site.user.ratio)))]), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.user.seedingSize")) + _vm._s(_vm._f("formatSize")(site.user.seedingSize)) + " (" + _vm._s(site.user.seeding) + ")")]), site.user.averageSeedtime && site.user.averageSeedtime > 0 ? _c("div", [_vm._v(_vm._s(_vm.$t("timeline.user.averageSeedtime", { day: site.user.averageSeedtime | _vm.formatInteger })))]) : _vm._e(), _c("div", [_vm._v(_vm._s(_vm.$t("timeline.user.bonus")) + _vm._s(_vm._f("formatNumber")(site.user.bonus)))]), site.user.bonusPerHour && site.user.bonusPerHour != "N/A" ? _c("div", [_vm._v(_vm._s(_vm.$t("timeline.user.bonusPerHour")) + _vm._s(_vm._f("formatNumber")(site.user.bonusPerHour)))]) : _vm._e()], 1)]);
  }), 1)], 1), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("span", [_vm._v(_vm._s(_vm._f("formatDate")(_vm.shareTime, "YYYY-MM-DD HH:mm:ss")))]), _c("span", { staticClass: "ml-1" }, [_vm._v("Created By " + _vm._s(_vm.$t("app.name")) + " " + _vm._s(_vm.version))])], 1)], 1)], 1), _c("div", { staticClass: "toolbar" }, [_c("v-switch", { staticClass: "my-0", attrs: { "color": "success", "label": _vm.$t("timeline.siteName") }, model: { value: _vm.showSiteName, callback: function($$v) {
    _vm.showSiteName = $$v;
  }, expression: "showSiteName" } }), _c("v-switch", { staticClass: "my-0", attrs: { "color": "success", "label": _vm.$t("timeline.blurSiteIcon") }, model: { value: _vm.blurSiteIcon, callback: function($$v) {
    _vm.blurSiteIcon = $$v;
  }, expression: "blurSiteIcon" } }), _c("v-switch", { staticClass: "my-0", attrs: { "color": "success", "label": _vm.$t("timeline.userName") }, model: { value: _vm.showUserName, callback: function($$v) {
    _vm.showUserName = $$v;
  }, expression: "showUserName" } }), _c("v-switch", { staticClass: "my-0", attrs: { "color": "success", "label": _vm.$t("timeline.userLevel") }, model: { value: _vm.showUserLevel, callback: function($$v) {
    _vm.showUserLevel = $$v;
  }, expression: "showUserLevel" } }), _c("v-switch", { staticClass: "my-0", attrs: { "color": "success", "label": _vm.$t("timeline.userUploads") }, model: { value: _vm.showUserUploads, callback: function($$v) {
    _vm.showUserUploads = $$v;
  }, expression: "showUserUploads" } }), _c("v-switch", { staticClass: "my-0", attrs: { "color": "success", "label": _vm.$t("timeline.userId") }, model: { value: _vm.showUid, callback: function($$v) {
    _vm.showUid = $$v;
  }, expression: "showUid" } }), _c("v-divider"), _c("h1", { staticStyle: { "padding": "5px" } }, [_vm._v(_vm._s(_vm.$t("timeline.showSites")))]), _c("v-layout", { attrs: { "justify-start": "", "row": "", "wrap": "" } }, _vm._l(_vm.sites, function(site, i) {
    return _c("v-flex", { key: i, attrs: { "xs3": "" } }, [_c("v-switch", { staticClass: "my-0", attrs: { "color": "success", "label": site.name, "value": site.name, "disabled": !site.allowGetUserInfo }, on: { "change": _vm.formatData }, model: { value: _vm.showSites, callback: function($$v) {
      _vm.showSites = $$v;
    }, expression: "showSites" } })], 1);
  }), 1)], 1)]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "d329dd94",
  null,
  null
);
const UserDataTimeline = __component__.exports;
export {
  UserDataTimeline as default
};
