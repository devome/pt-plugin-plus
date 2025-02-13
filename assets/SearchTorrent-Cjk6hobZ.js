import { p as commonjsGlobal, q as getDefaultExportFromCjs, r as dayjs, E as Extension, V as Vue, a as EAction, f as filters, n as normalizeComponent, s as ETorrentStatus, P as PPF, B as BASE_COLORS, t as EResourceOrderMode, u as EPaginationKey, h as EViewKey, v as eventBus, b as EModule, w as EDataResultType, D as Downloader, x as ERequestMethod, y as FileDownloader, i as ECommonKey, z as basicContext_minExports } from "./index-COZ_5UUZ.js";
import { P as PathHandler } from "./pathHandler-yIpW4LsR.js";
import { D as DownloadTo } from "./DownloadTo-Do8-lFVW.js";
var duration$2 = { exports: {} };
var duration = duration$2.exports;
(function(module, exports) {
  !function(t, s) {
    true ? module.exports = s() : false ? (void 0)(s) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_duration = s();
  }(commonjsGlobal, function() {
    "use strict";
    var t, s, n = 1e3, i = 6e4, e = 36e5, r = 864e5, o = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, u = 31536e6, h = 2592e6, a = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, d = { years: u, months: h, days: r, hours: e, minutes: i, seconds: n, milliseconds: 1, weeks: 6048e5 }, c = function(t2) {
      return t2 instanceof p;
    }, f = function(t2, s2, n2) {
      return new p(t2, n2, s2.$l);
    }, m = function(t2) {
      return s.p(t2) + "s";
    }, l = function(t2) {
      return t2 < 0;
    }, $2 = function(t2) {
      return l(t2) ? Math.ceil(t2) : Math.floor(t2);
    }, y = function(t2) {
      return Math.abs(t2);
    }, g = function(t2, s2) {
      return t2 ? l(t2) ? { negative: true, format: "" + y(t2) + s2 } : { negative: false, format: "" + t2 + s2 } : { negative: false, format: "" };
    }, p = function() {
      function l2(t2, s2, n2) {
        var i2 = this;
        if (this.$d = {}, this.$l = n2, void 0 === t2 && (this.$ms = 0, this.parseFromMilliseconds()), s2)
          return f(t2 * d[m(s2)], this);
        if ("number" == typeof t2)
          return this.$ms = t2, this.parseFromMilliseconds(), this;
        if ("object" == typeof t2)
          return Object.keys(t2).forEach(function(s3) {
            i2.$d[m(s3)] = t2[s3];
          }), this.calMilliseconds(), this;
        if ("string" == typeof t2) {
          var e2 = t2.match(a);
          if (e2) {
            var r2 = e2.slice(2).map(function(t3) {
              return null != t3 ? Number(t3) : 0;
            });
            return this.$d.years = r2[0], this.$d.months = r2[1], this.$d.weeks = r2[2], this.$d.days = r2[3], this.$d.hours = r2[4], this.$d.minutes = r2[5], this.$d.seconds = r2[6], this.calMilliseconds(), this;
          }
        }
        return this;
      }
      var y2 = l2.prototype;
      return y2.calMilliseconds = function() {
        var t2 = this;
        this.$ms = Object.keys(this.$d).reduce(function(s2, n2) {
          return s2 + (t2.$d[n2] || 0) * d[n2];
        }, 0);
      }, y2.parseFromMilliseconds = function() {
        var t2 = this.$ms;
        this.$d.years = $2(t2 / u), t2 %= u, this.$d.months = $2(t2 / h), t2 %= h, this.$d.days = $2(t2 / r), t2 %= r, this.$d.hours = $2(t2 / e), t2 %= e, this.$d.minutes = $2(t2 / i), t2 %= i, this.$d.seconds = $2(t2 / n), t2 %= n, this.$d.milliseconds = t2;
      }, y2.toISOString = function() {
        var t2 = g(this.$d.years, "Y"), s2 = g(this.$d.months, "M"), n2 = +this.$d.days || 0;
        this.$d.weeks && (n2 += 7 * this.$d.weeks);
        var i2 = g(n2, "D"), e2 = g(this.$d.hours, "H"), r2 = g(this.$d.minutes, "M"), o2 = this.$d.seconds || 0;
        this.$d.milliseconds && (o2 += this.$d.milliseconds / 1e3);
        var u2 = g(o2, "S"), h2 = t2.negative || s2.negative || i2.negative || e2.negative || r2.negative || u2.negative, a2 = e2.format || r2.format || u2.format ? "T" : "", d2 = (h2 ? "-" : "") + "P" + t2.format + s2.format + i2.format + a2 + e2.format + r2.format + u2.format;
        return "P" === d2 || "-P" === d2 ? "P0D" : d2;
      }, y2.toJSON = function() {
        return this.toISOString();
      }, y2.format = function(t2) {
        var n2 = t2 || "YYYY-MM-DDTHH:mm:ss", i2 = { Y: this.$d.years, YY: s.s(this.$d.years, 2, "0"), YYYY: s.s(this.$d.years, 4, "0"), M: this.$d.months, MM: s.s(this.$d.months, 2, "0"), D: this.$d.days, DD: s.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: s.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: s.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: s.s(this.$d.seconds, 2, "0"), SSS: s.s(this.$d.milliseconds, 3, "0") };
        return n2.replace(o, function(t3, s2) {
          return s2 || String(i2[t3]);
        });
      }, y2.as = function(t2) {
        return this.$ms / d[m(t2)];
      }, y2.get = function(t2) {
        var s2 = this.$ms, n2 = m(t2);
        return "milliseconds" === n2 ? s2 %= 1e3 : s2 = "weeks" === n2 ? $2(s2 / d[n2]) : this.$d[n2], 0 === s2 ? 0 : s2;
      }, y2.add = function(t2, s2, n2) {
        var i2;
        return i2 = s2 ? t2 * d[m(s2)] : c(t2) ? t2.$ms : f(t2, this).$ms, f(this.$ms + i2 * (n2 ? -1 : 1), this);
      }, y2.subtract = function(t2, s2) {
        return this.add(t2, s2, true);
      }, y2.locale = function(t2) {
        var s2 = this.clone();
        return s2.$l = t2, s2;
      }, y2.clone = function() {
        return f(this.$ms, this);
      }, y2.humanize = function(s2) {
        return t().add(this.$ms, "ms").locale(this.$l).fromNow(!s2);
      }, y2.milliseconds = function() {
        return this.get("milliseconds");
      }, y2.asMilliseconds = function() {
        return this.as("milliseconds");
      }, y2.seconds = function() {
        return this.get("seconds");
      }, y2.asSeconds = function() {
        return this.as("seconds");
      }, y2.minutes = function() {
        return this.get("minutes");
      }, y2.asMinutes = function() {
        return this.as("minutes");
      }, y2.hours = function() {
        return this.get("hours");
      }, y2.asHours = function() {
        return this.as("hours");
      }, y2.days = function() {
        return this.get("days");
      }, y2.asDays = function() {
        return this.as("days");
      }, y2.weeks = function() {
        return this.get("weeks");
      }, y2.asWeeks = function() {
        return this.as("weeks");
      }, y2.months = function() {
        return this.get("months");
      }, y2.asMonths = function() {
        return this.as("months");
      }, y2.years = function() {
        return this.get("years");
      }, y2.asYears = function() {
        return this.as("years");
      }, l2;
    }();
    return function(n2, i2, e2) {
      t = e2, s = e2().$utils(), e2.duration = function(t2, s2) {
        var n3 = e2.locale();
        return f(t2, { $l: n3 }, s2);
      }, e2.isDuration = c;
      var r2 = i2.prototype.add, o2 = i2.prototype.subtract;
      i2.prototype.add = function(t2, s2) {
        return c(t2) && (t2 = t2.asMilliseconds()), r2.bind(this)(t2, s2);
      }, i2.prototype.subtract = function(t2, s2) {
        return c(t2) && (t2 = t2.asMilliseconds()), o2.bind(this)(t2, s2);
      };
    };
  });
})(duration$2, duration$2.exports);
var durationExports = duration$2.exports;
const duration$1 = /* @__PURE__ */ getDefaultExportFromCjs(durationExports);
dayjs.extend(duration$1);
const extension$4 = new Extension();
const _sfc_main$6 = Vue.extend({
  props: {
    IMDbId: String
  },
  data() {
    return {
      visible: false,
      items: []
    };
  },
  watch: {
    IMDbId() {
      this.reset();
    }
  },
  created() {
    this.reset();
  },
  methods: {
    reset() {
      this.visible = false;
      console.log(this.IMDbId);
      if (this.IMDbId) {
        this.visible = true;
        this.getMediaFromMediaServers();
      }
    },
    /**
     * 从已定义的媒体服务器获取信息
     */
    getMediaFromMediaServers() {
      var _a;
      this.items = [];
      try {
        (_a = this.$store.state.options.mediaServers) == null ? void 0 : _a.forEach(async (server) => {
          if (!server.enabled) {
            return;
          }
          const result = await extension$4.sendRequest(EAction.getMediaFromMediaServer, null, {
            server,
            imdbId: this.IMDbId
          });
          console.debug("result", result);
          if (result && result.Items) {
            let address = server.address;
            if (address.slice(-1) != "/") {
              address += "/";
            }
            result.Items.forEach((item) => {
              let texts = [];
              texts.push(item.Name);
              texts.push(filters.formatSize(item.Size).replace("iB", ""));
              let media = {
                video: "",
                audio: 0,
                audios: [],
                subtitle: 0,
                subtitles: []
              };
              if (item.MediaSources) {
                item.MediaSources.forEach((MediaSource) => {
                  var _a2;
                  (_a2 = MediaSource.MediaStreams) == null ? void 0 : _a2.forEach((MediaStream) => {
                    if (MediaStream.Type == "Video" && !media.video) {
                      media.video = MediaStream.DisplayTitle;
                    }
                    if (MediaStream.Type == "Audio") {
                      media.audio++;
                      media.audios.push(MediaStream.DisplayTitle + " " + (MediaStream.Title || ""));
                    }
                    if (MediaStream.Type == "Subtitle") {
                      media.subtitle++;
                      media.subtitles.push(MediaStream.DisplayTitle + " " + (MediaStream.Title || ""));
                    }
                  });
                });
              }
              this.items.push({
                url: `${address}web/index.html#!/item?id=${item.Id}&serverId=${item.ServerId}`,
                text: texts.join(" "),
                media,
                path: item.Path,
                container: item.Container,
                runTime: this.formatRunTimeTicks(item.RunTimeTicks),
                icon: server.type.toLowerCase()
              });
            });
          }
        });
      } catch (error) {
      }
    },
    formatRunTimeTicks(runTimeTicks) {
      const totalSeconds = runTimeTicks / 1e7;
      return dayjs.duration(totalSeconds, "seconds").format("H[h] m[m]");
    }
  },
  computed: {}
});
var _sfc_render$6 = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _vm.visible ? _c("div", _vm._l(_vm.items, function(item, index) {
    return _c("v-btn", { key: index, staticClass: "mr-1 py-3 pr-1 pl-2", attrs: { "color": "green lighten-3", "small": "", "depressed": "", "href": item.link || item.url, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [[_c("img", { staticStyle: { "width": "16px", "height": "16px" }, attrs: { "src": `./assets/media-server/${item.icon}.svg` } }), _c("span", { staticClass: "mx-1" }, [_vm._v(_vm._s(index + 1))]), _c("v-chip", { staticClass: "ml-0 py-2 px-1 pr-2 chip-compact", staticStyle: { "margin-right": "-1px" }, attrs: { "label": "", "color": "blue-grey darken-2", "small": "", "text-color": "white", "disabled": "" } }, [_c("v-icon", { staticClass: "mr-1", attrs: { "small": "", "left": "" } }, [_vm._v("dvr")]), _c("span", [_vm._v(" " + _vm._s(item.text))])], 1), _c("v-chip", { staticClass: "py-2 px-1 pr-2 chip-compact", staticStyle: { "margin-right": "-1px" }, attrs: { "label": "", "color": "blue-grey", "small": "", "text-color": "white", "disabled": "" } }, [_c("v-icon", { staticClass: "mr-1", attrs: { "small": "", "left": "" } }, [_vm._v("schedule")]), _c("span", { staticStyle: { "text-transform": "none" } }, [_vm._v(_vm._s(item.runTime))])], 1), _c("v-chip", { staticClass: "py-2 px-1 pr-2 chip-compact", staticStyle: { "margin-right": "-1px" }, attrs: { "label": "", "color": "blue-grey", "small": "", "text-color": "white", "disabled": "", "title": item.path } }, [_c("v-icon", { staticClass: "mr-1", attrs: { "small": "", "left": "" } }, [_vm._v("aspect_ratio")]), _c("span", [_vm._v(_vm._s(item.container))])], 1), _c("v-chip", { staticClass: "py-2 px-1 pr-2 chip-compact", staticStyle: { "margin-right": "-1px" }, attrs: { "label": "", "color": "blue-grey", "small": "", "text-color": "white", "disabled": "" } }, [_c("v-icon", { staticClass: "mr-1", attrs: { "small": "", "left": "" } }, [_vm._v("movie")]), _c("span", [_vm._v(_vm._s(item.media.video))])], 1), _c("v-chip", { staticClass: "py-2 px-1 pr-2 chip-compact", staticStyle: { "margin-right": "-1px" }, attrs: { "label": "", "color": "blue-grey", "small": "", "text-color": "white", "disabled": "", "title": item.media.audios.join("\n") } }, [_c("v-icon", { staticClass: "mr-1", attrs: { "small": "", "left": "" } }, [_vm._v("graphic_eq")]), _c("span", [_vm._v(_vm._s(item.media.audio))])], 1), _c("v-chip", { staticClass: "py-2 px-1 pr-2 mr-0 chip-compact", attrs: { "label": "", "color": "blue-grey", "small": "", "text-color": "white", "disabled": "", "title": item.media.subtitles.join("\n") } }, [_c("v-icon", { staticClass: "mr-1", attrs: { "small": "", "left": "" } }, [_vm._v("closed_caption_off")]), _c("span", [_vm._v(_vm._s(item.media.subtitle))])], 1)]], 2);
  }), 1) : _vm._e();
};
var _sfc_staticRenderFns$6 = [];
var __component__$6 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$6,
  _sfc_render$6,
  _sfc_staticRenderFns$6,
  false,
  null,
  "8c3e9c9b",
  null,
  null
);
const MediaServerInfoCard = __component__$6.exports;
const extension$3 = new Extension();
const _sfc_main$5 = Vue.extend({
  components: {
    MediaServerInfoCard
  },
  props: {
    IMDbId: String,
    doubanId: String
  },
  data() {
    return {
      info: {
        title: "",
        summary: "",
        image: "",
        rating: {
          average: "",
          numRaters: 0,
          value: ""
        },
        attrs: {
          year: [],
          director: [],
          writer: [],
          cast: [],
          movie_type: [],
          pubdate: [],
          movie_duration: []
        },
        tmdbAverage: 0,
        tmdbURL: ""
      },
      ratings: {
        Ratings: [],
        imdbRating: "",
        imdbVotes: ""
      },
      rottenTomatoes: {
        fresh: "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-fresh.587bf3a5e47.png",
        rotten: "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-rotten.efc30acb29c.png"
      },
      visible: false
    };
  },
  watch: {
    IMDbId() {
      this.reset();
    }
  },
  created() {
    this.reset();
  },
  methods: {
    reset() {
      this.visible = false;
      this.ratings = {
        Ratings: [],
        imdbRating: ""
      };
      console.log(this.doubanId, this.IMDbId);
      if (this.IMDbId) {
        extension$3.sendRequest(EAction.getMovieInfos, null, this.doubanId ? `douban${this.doubanId}` : this.IMDbId).then((result) => {
          console.log(result);
          this.visible = true;
          let r = null;
          if (Array.isArray(result)) {
            r = result[0];
          } else {
            r = result;
          }
          if (!r.average && !r.rating) {
            r.rating = {
              average: "",
              numRaters: 0,
              value: ""
            };
          }
          const tmdb = r.tmdb;
          if (tmdb) {
            r.tmdbAverage = Math.round(tmdb.vote_average * 10);
            r.tmdbURL = tmdb.tmdbURL;
          }
          this.info = r;
        }).catch((error) => {
          console.log(error);
        });
        extension$3.sendRequest(EAction.getMovieRatings, null, this.IMDbId).then((result) => {
          console.log(result);
          this.ratings = result;
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    formatArray(array, splitChar = " / ", maxLength = 10) {
      if (array && array.length > 0) {
        if (maxLength > 0 && array.length > maxLength) {
          return array.slice(0, maxLength - 1).join(splitChar) + " ...";
        }
        return array.join(splitChar);
      }
      return "";
    },
    // 获取数组中指定的字段
    getArrayValues(array, field = "name", splitChar = " / ") {
      if (array && array.length > 0) {
        const result = [];
        array.forEach((item) => {
          result.push(item[field]);
        });
        return result.join(splitChar);
      }
      return "";
    },
    /**
     * 从已定义的媒体服务器获取信息
     */
    getMediaFromMediaServers() {
    }
  },
  computed: {
    rating() {
      if (this.info && (this.info.rating || this.info.average)) {
        return parseFloat(this.info.average || this.info.rating.value || this.info.rating.average) / 2;
      }
      return 0;
    },
    imdbRating() {
      if (this.ratings && this.ratings.imdbRating) {
        return parseFloat(this.ratings.imdbRating) / 2;
      }
      return 0;
    },
    tmdbRating() {
      if (this.info && this.info.tmdb && this.info.tmdb.vote_average) {
        return parseFloat(this.info.tmdb.vote_average) / 2;
      }
      return 0;
    },
    tomatoRating() {
      if (this.ratings && this.ratings.Ratings) {
        let ratings = 0;
        this.ratings.Ratings.some((item) => {
          if (item.Source == "Rotten Tomatoes") {
            ratings = parseInt(item.Value);
            return true;
          }
        });
        return ratings;
      }
      return 0;
    },
    metascore() {
      if (this.ratings && this.ratings.Ratings) {
        let ratings = 0;
        this.ratings.Ratings.some((item) => {
          if (item.Source == "Metacritic") {
            ratings = parseInt(item.Value.split("/")[0]);
            return true;
          }
        });
        return ratings;
      }
      return 0;
    },
    maxHeight() {
      return this.$vuetify.breakpoint.smAndDown ? 120 : 300;
    }
  }
});
var _sfc_render$5 = function render2() {
  var _a;
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _vm.visible ? _c("div", { staticClass: "movieInfoCard" }, [_c("v-card", { staticClass: "white--text", attrs: { "color": "blue-grey darken-2" } }, [_c("v-card-title", { staticClass: "pb-2" }, [_c("div", { class: _vm.$vuetify.breakpoint.mdAndUp ? "headline" : "title" }, [_c("span", [_vm._v(_vm._s(_vm.info.title))]), _c("span", { class: [
    "ml-1",
    "grey--text",
    _vm.$vuetify.breakpoint.mdAndUp ? "title" : "caption"
  ] }, [_vm._v("(" + _vm._s(_vm.info.year || _vm.info.attrs.year[0]) + ")")]), _vm.info.tmdb && _vm.info.tmdb.tmdbContentRating ? _c("v-chip", { staticClass: "pl-0 ml-3", attrs: { "label": "", "outline": "", "small": "", "title": _vm.$t("movieInfoCard.rated") } }, [_vm._v(_vm._s(_vm.info.tmdb.tmdbContentRating))]) : _vm._e()], 1)]), _c("v-img", { staticClass: "ml-3 mb-3", attrs: { "src": _vm.info.image || _vm.info.pic.normal, "contain": "", "max-height": _vm.maxHeight, "position": "left center" } }, [_vm.$vuetify.breakpoint.mdAndUp ? _c("v-layout", { staticStyle: { "margin-left": "220px" } }, [_vm.info.updateTime ? _c("v-card-title", { staticClass: "pt-0" }, [_c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.alias")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.info.aka))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.director")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.info.director))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.writer")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.info.scenarist))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.cast")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.info.cast))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.type")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.info.genre))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.pubdate")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.info.releaseDate))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.duration")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.info.runtime))])]), _c("v-flex", { staticClass: "my-2", attrs: { "xs12": "" } }, [_c("v-divider", { attrs: { "light": "" } })], 1), _c("div", { staticClass: "caption", domProps: { "innerHTML": _vm._s(`　　${_vm.info.summary.replace(/\n/g, "<br>")} @豆瓣`) } })], 1) : _vm.info.attrs ? _c("v-card-title", { staticClass: "pt-0" }, [_c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.alias")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.info.alt_title))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.director")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.attrs.director)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.writer")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.attrs.writer)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.cast")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.attrs.cast)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.type")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.attrs.movie_type)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.pubdate")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.attrs.pubdate)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.duration")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.attrs.movie_duration)))])]), _c("v-flex", { staticClass: "my-2", attrs: { "xs12": "" } }, [_c("v-divider", { attrs: { "light": "" } })], 1), _c("div", { staticClass: "caption", domProps: { "innerHTML": _vm._s(`${_vm.info.summary} @豆瓣`) } })], 1) : _c("v-card-title", { staticClass: "pt-0" }, [_c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.alias")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.info.original_title))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.director")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.getArrayValues(_vm.info.directors)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.cast")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.getArrayValues(_vm.info.actors)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.type")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.genres)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.pubdate")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.pubdate)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", [_vm._v(_vm._s(_vm.$t("movieInfoCard.duration")))]), _c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.durations)))])]), _c("v-flex", { staticClass: "my-2", attrs: { "xs12": "" } }, [_c("v-divider", { attrs: { "light": "" } })], 1), _c("div", { staticClass: "caption", domProps: { "innerHTML": _vm._s(`${_vm.info.intro} @豆瓣`) } })], 1)], 1) : _c("v-layout", { staticStyle: { "margin-left": "75px" } }, [_c("v-card-text", { staticClass: "pt-0" }, [_c("v-flex", { attrs: { "xs12": "" } }, [_c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.info.original_title || _vm.info.alt_title))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.genres || _vm.info.attrs.movie_type)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.pubdate || _vm.info.attrs.pubdate)))])]), _c("v-flex", { attrs: { "xs12": "" } }, [_c("span", { staticClass: "caption" }, [_vm._v(_vm._s(_vm.formatArray(_vm.info.durations || _vm.info.attrs.movie_duration)))])])], 1)], 1)], 1), _c("v-divider", { attrs: { "light": "" } }), _c("v-card-actions", { staticClass: "px-3" }, [_c("v-btn", { attrs: { "color": "success", "href": _vm.info.link || _vm.info.url || _vm.info.mobile_link, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_vm._v("豆瓣 " + _vm._s(_vm.info.average || _vm.info.rating.value || _vm.info.rating.average))]), _c("v-btn", { attrs: { "color": "amber", "href": `https://www.imdb.com/title/${_vm.IMDbId}/`, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_vm._v("IMDb " + _vm._s(_vm.ratings.imdbRating))]), _vm.info.tmdb && _vm.info.tmdb.vote_average ? _c("v-btn", { staticClass: "tmdbStyle", attrs: { "href": _vm.info.tmdbURL, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_vm._v("TMDB " + _vm._s(_vm.info.tmdbAverage) + "%")]) : _vm._e(), _vm.tomatoRating > 0 ? _c("v-btn", { attrs: { "color": "red lighten-3", "href": _vm.ratings.tomatoURL, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-avatar", { staticClass: "mr-1", attrs: { "size": "20" } }, [_vm.tomatoRating >= 60 ? _c("img", { attrs: { "src": _vm.rottenTomatoes.fresh } }) : _c("img", { attrs: { "src": _vm.rottenTomatoes.rotten } })]), _vm._v(" " + _vm._s(_vm.tomatoRating) + "% ")], 1) : _vm._e(), _vm.metascore > 0 ? _c("v-btn", { staticStyle: { "min-width": "unset" }, attrs: { "color": _vm.metascore > 60 ? "success" : _vm.metascore > 40 ? "warning" : "error", "href": `https://www.metacritic.com/search/${_vm.info.originalTitle || _vm.info.title}`, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-avatar", { staticClass: "mr-2", attrs: { "size": "20" } }, [_c("img", { attrs: { "src": "https://upload.wikimedia.org/wikipedia/commons/f/f2/Metacritic_M.png" } })]), _vm._v(" " + _vm._s(_vm.metascore) + " ")], 1) : _vm._e(), _c("v-spacer"), _vm.$vuetify.breakpoint.mdAndUp ? _c("v-layout", [_vm.rating > 0 ? _c("v-flex", { attrs: { "xs4": "" } }, [_c("v-rating", { attrs: { "background-color": "white", "color": "yellow accent-4", "dense": "", "readonly": "", "half-increments": "", "size": "30" }, model: { value: _vm.rating, callback: function($$v) {
    _vm.rating = $$v;
  }, expression: "rating" } }), _c("span", { staticClass: "ma-2" }, [_vm._v(_vm._s(_vm.$t("movieInfoCard.ratings.douban", { average: _vm.info.average || _vm.info.rating.value || _vm.info.rating.average, numRaters: _vm.info.votes || _vm.info.rating.count || _vm.info.rating.numRaters })))])], 1) : _vm._e(), _vm.imdbRating > 0 ? _c("v-flex", { attrs: { "xs4": "" } }, [_c("v-rating", { attrs: { "background-color": "white", "color": "yellow accent-4", "dense": "", "readonly": "", "half-increments": "", "size": "30" }, model: { value: _vm.imdbRating, callback: function($$v) {
    _vm.imdbRating = $$v;
  }, expression: "imdbRating" } }), _c("span", { staticClass: "ma-2" }, [_vm._v(_vm._s(_vm.$t("movieInfoCard.ratings.imdb", { average: _vm.ratings.imdbRating, numRaters: _vm.ratings.imdbVotes.replace(/,/g, "") })))])], 1) : _vm._e(), _vm.tmdbRating > 0 ? _c("v-flex", { attrs: { "xs4": "" } }, [_c("v-rating", { attrs: { "background-color": "white", "color": "yellow accent-4", "dense": "", "readonly": "", "half-increments": "", "size": "30" }, model: { value: _vm.tmdbRating, callback: function($$v) {
    _vm.tmdbRating = $$v;
  }, expression: "tmdbRating" } }), _c("span", { staticClass: "ma-2" }, [_vm._v(_vm._s(_vm.$t("movieInfoCard.ratings.tmdb", { average: _vm.info.tmdbAverage, numRaters: _vm.info.tmdb.vote_count })))])], 1) : _vm._e()], 1) : _vm._e()], 1), ((_a = _vm.$store.state.options.mediaServers) == null ? void 0 : _a.length) > 0 ? [_c("v-divider", { attrs: { "light": "" } }), _c("MediaServerInfoCard", { staticClass: "pa-2", attrs: { "IMDbId": _vm.IMDbId } })] : _vm._e()], 2)], 1) : _vm._e();
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false,
  null,
  "6a466144",
  null,
  null
);
const MovieInfoCard = __component__$5.exports;
const _sfc_main$4 = Vue.extend({
  props: {
    progress: Number,
    status: Number
  },
  mounted() {
  },
  computed: {
    color() {
      let result = "success";
      switch (this.status) {
        case ETorrentStatus.downloading:
          result = "info";
          break;
        case ETorrentStatus.completed:
        case ETorrentStatus.inactive:
          result = "grey";
          break;
        case ETorrentStatus.sending:
        default:
          break;
      }
      return result;
    },
    icon() {
      let result = "arrow_upward";
      switch (this.status) {
        case ETorrentStatus.downloading:
          result = "arrow_downward";
          break;
        case ETorrentStatus.completed:
          result = "done";
          break;
        case ETorrentStatus.inactive:
          result = "wifi_off";
          break;
        case ETorrentStatus.sending:
        default:
          break;
      }
      return result;
    },
    statusTip() {
      let result = this.$t("searchTorrent.torrentStatus.sending").toString();
      switch (this.status) {
        case ETorrentStatus.downloading:
          result = this.$t(
            "searchTorrent.torrentStatus.downloading"
          ).toString();
          break;
        case ETorrentStatus.completed:
          result = this.$t("searchTorrent.torrentStatus.completed").toString();
          break;
        case ETorrentStatus.inactive:
          result = this.$t("searchTorrent.torrentStatus.inactive").toString();
          break;
        case ETorrentStatus.sending:
        default:
          break;
      }
      return result;
    }
  }
});
var _sfc_render$4 = function render3() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-layout", { attrs: { "row": "", "wrap": "" } }, [_c("v-flex", { staticClass: "mt-1", attrs: { "xs2": "" } }, [_c("v-icon", { attrs: { "size": 10, "color": _vm.color, "title": _vm.statusTip } }, [_vm._v(_vm._s(_vm.icon))])], 1), _c("v-flex", { attrs: { "xs10": "" } }, [_c("v-progress-linear", { staticStyle: { "margin-left": "1px" }, attrs: { "color": _vm.color, "height": "4", "value": _vm.progress, "title": `${_vm.progress}%` } })], 1)], 1);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  null,
  null,
  null
);
const TorrentProgress = __component__$4.exports;
const extension$2 = new Extension();
const _sfc_main$3 = Vue.extend({
  props: {
    flat: Boolean,
    icon: Boolean,
    small: Boolean,
    dark: Boolean,
    iconText: {
      type: String,
      default: "favorite_border"
    },
    color: {
      type: String,
      default: "success"
    },
    label: {
      type: String,
      default: ""
    },
    disabled: Boolean
  },
  data() {
    return {
      options: this.$store.state.options,
      contentMenus: [],
      loading: false,
      haveSuccess: false,
      haveError: false,
      groups: []
    };
  },
  methods: {
    /**
     * 显示上下文菜单
     * @param options
     * @param event
     */
    showContentMenus(event) {
      extension$2.sendRequest(EAction.getTorrentCollectionGroups).then((result) => {
        this.groups = result;
        let menus = [];
        this.groups.forEach((group) => {
          menus.push({
            title: group.name,
            fn: () => {
              this.$emit("add", group);
            }
          });
        });
        menus.push({});
        menus.push({
          title: this.$t("collection.addGroup"),
          fn: () => {
            this.createGroup();
          }
        });
        PPF.showContextMenu(menus, event);
      });
    },
    createGroup() {
      let name = window.prompt(this.$t("collection.inputGroupName").toString());
      if (name) {
        extension$2.sendRequest(EAction.addTorrentCollectionGroup, null, {
          name,
          color: BASE_COLORS[Math.floor(Math.random() * BASE_COLORS.length)]
        }).then((result) => {
          if (result) {
            this.$emit("add", result[result.length - 1]);
          }
        });
      }
    },
    clearStatus() {
      this.haveSuccess = false;
      this.haveError = false;
    }
  }
});
var _sfc_render$3 = function render4() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-btn", { class: _vm.$vuetify.breakpoint.smAndUp ? "" : "mini", attrs: { "flat": _vm.flat, "icon": _vm.icon, "small": _vm.small, "loading": _vm.loading, "color": _vm.color, "disabled": _vm.disabled, "title": _vm.$t("collection.add"), "dark": _vm.dark }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.showContentMenus.apply(null, arguments);
  } } }, [_vm.haveSuccess ? _c("v-icon", { attrs: { "color": "success", "small": "" } }, [_vm._v("done")]) : _vm.haveError ? _c("v-icon", { attrs: { "color": "red", "small": "" } }, [_vm._v("close")]) : _c("v-icon", { attrs: { "small": "" } }, [_vm._v(_vm._s(_vm.iconText))]), _c("span", { staticClass: "ml-2" }, [_vm._v(_vm._s(_vm.label))])], 1);
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
const AddToCollectionGroup = __component__$3.exports;
const _sfc_main$2 = Vue.extend({
  components: {
    DownloadTo
  },
  props: {
    url: String,
    downloadMethod: String,
    isCollectioned: Boolean,
    item: Object
  },
  methods: {
    copyLinkToClipboard() {
      this.$emit("copyLinkToClipboard");
    },
    showSiteContentMenus(event) {
      this.$emit("showSiteContentMenus", this.item, event);
    },
    saveTorrentFile() {
      this.$emit("saveTorrentFile", this.item);
    },
    addToCollection() {
      this.$emit("addToCollection", this.item);
    },
    deleteCollection() {
      this.$emit("deleteCollection", this.item);
    },
    downloadSuccess(msg) {
      this.$emit("downloadSuccess", msg);
    },
    downloadError(msg) {
      this.$emit("downloadError", msg);
    }
  }
});
var _sfc_render$2 = function render5() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "torrent-actions" }, [_c("DownloadTo", { staticClass: "mx-0", attrs: { "downloadOptions": _vm.item, "flat": "", "icon": "", "small": "", "mini": _vm.$vuetify.breakpoint.smAndDown, "color": "grey darken-1" }, on: { "error": _vm.downloadError, "success": _vm.downloadSuccess } }), _c("v-btn", { class: _vm.$vuetify.breakpoint.mdAndUp ? "mx-0" : "mx-0 btn-mini", attrs: { "flat": "", "icon": "", "small": "", "color": "grey darken-1" } }, [_c("v-icon", { attrs: { "small": "", "title": _vm.$t("searchTorrent.copyToClipboardTip") }, on: { "click": _vm.copyLinkToClipboard } }, [_vm._v("file_copy")])], 1), _c("v-btn", { class: _vm.$vuetify.breakpoint.mdAndUp ? "mx-0" : "mx-0 btn-mini", attrs: { "flat": "", "icon": "", "small": "", "color": "grey darken-1" } }, [_c("v-icon", { attrs: { "small": "", "title": _vm.$t("searchTorrent.saveTip") }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.saveTorrentFile.apply(null, arguments);
  } } }, [_vm._v("save")])], 1), !_vm.isCollectioned ? _c("v-btn", { class: _vm.$vuetify.breakpoint.mdAndUp ? "mx-0" : "mx-0 btn-mini", attrs: { "flat": "", "icon": "", "small": "", "color": "grey darken-1", "title": _vm.$t("collection.add") }, on: { "click": _vm.addToCollection } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("favorite_border")])], 1) : _c("v-btn", { class: _vm.$vuetify.breakpoint.mdAndUp ? "mx-0" : "mx-0 btn-mini", attrs: { "flat": "", "icon": "", "small": "", "color": "pink", "title": _vm.$t("collection.remove") }, on: { "click": _vm.deleteCollection } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("favorite")])], 1)], 1);
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
const Actions = __component__$2.exports;
const extension$1 = new Extension();
const _sfc_main$1 = Vue.extend({
  components: {
    DownloadTo
  },
  data() {
    return {
      dialog: false,
      verified: false,
      baseTorrent: null,
      loading: false,
      verifiedItems: [],
      downloadOptions: null,
      creating: false,
      errorMsg: "",
      haveError: false,
      haveSuccess: false,
      successMsg: "",
      verifiedCount: 0
    };
  },
  props: {
    label: String,
    color: String,
    items: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.start();
      }
    },
    successMsg() {
      this.haveSuccess = this.successMsg != "";
    },
    errorMsg() {
      this.haveError = this.errorMsg != "";
    }
  },
  methods: {
    deleteVerifiedItem(index) {
      this.$delete(this.verifiedItems, index);
    },
    setDownloadOptions(options) {
      console.log(options);
      this.downloadOptions = options.downloadOptions;
    },
    /**
     * 生成辅种任务
     */
    create() {
      if (this.verifiedItems.length == 0 || !this.downloadOptions) {
        return;
      }
      this.creating = true;
      let task = {
        title: this.verifiedItems[0].data.title,
        size: this.verifiedItems[0].data.size,
        downloadOptions: this.downloadOptions,
        items: []
      };
      let items = [];
      this.verifiedItems.forEach((item) => {
        if (item.verified) {
          let _item = PPF.clone(item);
          if (_item.data.site) {
            _item.data.host = _item.data.site.host;
            delete _item.data.site;
          }
          [
            "author",
            "category",
            "comments",
            "completed",
            "entryName",
            "status",
            "tags",
            "titleHTML",
            "progress",
            "seeders",
            "leechers"
          ].forEach((key) => {
            if (_item.data.hasOwnProperty(key)) {
              delete _item.data[key];
            }
          });
          items.push(_item.data);
        }
      });
      if (items.length == 0) {
        this.errorMsg = this.$t("keepUploadTask.noItem").toString();
        this.creating = false;
        return;
      }
      task.items = items;
      console.log(task);
      extension$1.sendRequest(EAction.createKeepUploadTask, null, task).then((result) => {
        this.successMsg = this.$t("keepUploadTask.createSuccess").toString();
        setTimeout(() => {
          this.creating = false;
          this.dialog = false;
        }, 3e3);
        console.log("createKeepUploadTask", result);
        this.$root.$emit("KeepUploadTaskCreateSuccess");
      }).catch(() => {
        this.creating = false;
        this.errorMsg = this.$t("keepUploadTask.createError").toString();
      });
    },
    start() {
      this.baseTorrent = null;
      this.verifiedItems = [];
      this.verifiedCount = 0;
      this.downloadOptions = null;
      this.clearMessage();
      this.items.forEach((item, index) => {
        if (item.url) {
          this.verifiedItems.push({
            data: item,
            torrent: null,
            loading: true,
            verified: false,
            status: this.$t("keepUploadTask.status.downloading").toString()
          });
          this.getTorrent(item, index).then((result) => {
            this.verification(result, index);
          }).catch(() => {
            this.verification(null, index);
          });
        }
      });
    },
    reDownload(index) {
      this.verifiedItems[index].loading = true;
      this.verifiedItems[index].status = this.$t("keepUploadTask.status.downloading").toString();
      this.getTorrent(this.verifiedItems[index].data, index).then((result) => {
        this.verification(result, index);
      }).catch(() => {
        this.verification(null, index);
      });
    },
    /**
     * 验证
     */
    verification(item, index) {
      if (index == 0) {
        if (!this.baseTorrent) {
          this.baseTorrent = item;
          this.verifiedItems[0].loading = false;
          if (item) {
            this.verifiedItems[0].torrent = this.baseTorrent.torrent;
            this.verifiedItems[0].verified = true;
            this.verifiedItems[0].status = this.$t(
              "keepUploadTask.status.downloaded"
            ).toString();
            this.verifiedCount++;
          } else {
            this.verifiedItems[0].verified = false;
          }
        }
      } else {
        if (this.verifiedItems[0].loading) {
          setTimeout(() => {
            this.verification(item, index);
          }, 200);
          return;
        }
        let result = {
          verified: false,
          torrent: null,
          loading: false
        };
        if (!this.verifiedItems[0].verified) {
          result.status = this.$t("keepUploadTask.status.failed").toString();
        }
        if (!item || !this.verifiedItems[0].verified) {
          this.$set(this.verifiedItems, index, { ...this.verifiedItems[index], ...result });
          return;
        }
        const torrent = item.torrent;
        const baseTorrent = this.baseTorrent.torrent;
        if (torrent.name == baseTorrent.name && torrent.length == baseTorrent.length && torrent.files.length == baseTorrent.files.length) {
          result.verified = baseTorrent.files.every(
            (sourceFile, index2) => {
              const file = torrent.files[index2];
              return file.path == sourceFile.path && file.length == sourceFile.length;
            }
          );
        }
        result.torrent = {
          filesLength: torrent.files.length
        };
        if (result.verified) {
          this.verifiedCount++;
        }
        result.status = result.verified ? this.$t("keepUploadTask.status.success").toString() : this.$t("keepUploadTask.status.failed").toString();
        if (!result.verified && torrent.name == baseTorrent.name && torrent.length <= baseTorrent.length && torrent.files.length <= baseTorrent.files.length) {
          if (torrent.files.every((file) => {
            return baseTorrent.files.find(
              (sourceFile) => file.path == sourceFile.path && file.length == sourceFile.length
            );
          })) {
            if (torrent.files.length == baseTorrent.files.length)
              result.status = this.$t("keepUploadTask.status.incorrectOrder").toString();
            else
              result.status = this.$t("keepUploadTask.status.missingFiles").toString();
          }
        }
        this.$set(this.verifiedItems, index, { ...this.verifiedItems[index], ...result });
      }
    },
    /**
     * 获取种子文件内容
     */
    getTorrent(item, index) {
      if (item.url) {
        switch (item.site.name) {
          case "M-Team":
            let id = item.url.replace(/^\D+/g, "");
            console.log(`getTorrentDataFromURL.M-Team ${item.url} -> ${id}`);
            if (id) {
              if (parseInt(id)) {
                let torrentURL = PPF.resolveMTDownloadURL(id, item.site);
                console.log(`getTorrentDataFromURL.M-Team1 ${item.url} -> ${torrentURL}`);
                item.url = torrentURL;
              } else {
                console.log(`getTorrentDataFromURL.M-Team2 ${item.url}, id 链接可能已是直链, 不进行转换...`);
              }
            }
            break;
          default:
            break;
        }
      }
      return new Promise((resolve, reject) => {
        extension$1.sendRequest(EAction.getTorrentDataFromURL, null, {
          url: item.url,
          parseTorrent: true
        }).then((result) => {
          console.log(result);
          this.verifiedItems[index].status = this.$t(
            "keepUploadTask.status.waiting"
          ).toString();
          resolve(result);
        }).catch((result) => {
          this.verifiedItems[index].status = this.$t(
            "keepUploadTask.status.downloadFailed"
          ).toString();
          this.verifiedItems[index].error = true;
          reject(result);
        });
      });
    },
    clearMessage() {
      this.successMsg = "";
      this.errorMsg = "";
    },
    addToVerified(item) {
      if (window.confirm(
        this.$t("keepUploadTask.addToKeepUploadConfirm").toString()
      )) {
        item.verified = true;
        this.verifiedCount++;
      }
    }
  }
});
var _sfc_render$1 = function render6() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-dialog", { attrs: { "persistent": "", "scrollable": "", "max-width": "1024", "fullscreen": _vm.$vuetify.breakpoint.smAndDown }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on }) {
    return [_c("v-btn", _vm._g({ class: _vm.$vuetify.breakpoint.smAndUp ? "" : "mini", attrs: { "dark": "", "small": "", "title": _vm.$t("keepUploadTask.keepUpload"), "color": _vm.color } }, on), [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("merge_type")]), _c("span", { staticClass: "ml-2" }, [_vm._v(_vm._s(_vm.label || _vm.$t("keepUploadTask.keepUpload")))])], 1)];
  } }]), model: { value: _vm.dialog, callback: function($$v) {
    _vm.dialog = $$v;
  }, expression: "dialog" } }, [_c("v-card", [_c("v-toolbar", { attrs: { "dark": "", "color": "blue-grey darken-2" } }, [_c("v-toolbar-title", [_vm._v(_vm._s(_vm.$t("keepUploadTask.verification")))]), _c("v-spacer"), _c("v-btn", { attrs: { "icon": "", "flat": "", "color": "success", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/keep-upload-task", "target": "_blank", "rel": "noopener noreferrer nofollow", "title": _vm.$t("common.help") } }, [_c("v-icon", [_vm._v("help")])], 1)], 1), _c("v-card-text", { staticStyle: { "max-height": "80vh" } }, [_c("v-list", { attrs: { "two-line": "", "subheader": "", "dense": "" } }, [_vm._l(_vm.verifiedItems, function(item, index) {
    return [index == 0 ? _c("v-subheader", { key: index }, [_vm._v(_vm._s(_vm.$t("keepUploadTask.baseTorrent")))]) : _vm._e(), index == 1 ? _c("v-subheader", { key: index }, [_vm._v(_vm._s(_vm.$t("keepUploadTask.otherTorrent")))]) : _vm._e(), _c("v-list-tile", { key: item.title }, [_c("v-list-tile-avatar", [_c("v-avatar", { attrs: { "size": "18" } }, [_c("img", { attrs: { "src": item.data.site.icon } })])], 1), _c("v-list-tile-content", [_c("v-list-tile-title", { staticClass: "list-item" }, [_c("a", { attrs: { "href": item.data.link, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_vm._v(_vm._s(item.data.title))])]), _c("v-list-tile-sub-title", [_vm._v(_vm._s(_vm.$t("keepUploadTask.size")) + _vm._s(_vm._f("formatSize")(item.data.size)) + ", " + _vm._s(_vm.$t("keepUploadTask.fileCount")) + _vm._s(item.torrent ? item.torrent.filesLength : "N/A") + ", " + _vm._s(_vm.$t("keepUploadTask.status.label")) + _vm._s(item.status))])], 1), _c("v-list-tile-action", [_c("div", [_vm.verifiedItems[0].verified && !item.loading && !item.verified && index > 0 ? _c("v-btn", { staticClass: "mr-1", attrs: { "icon": "", "title": _vm.$t("keepUploadTask.addToKeepUpload") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.addToVerified(item);
    } } }, [_c("v-icon", { attrs: { "color": "info" } }, [_vm._v("add")])], 1) : _vm._e(), _vm.verifiedItems[0].verified && !item.loading && !item.torrent && index > 0 ? _c("v-btn", { staticClass: "mr-1", attrs: { "icon": "", "title": _vm.$t("keepUploadTask.redownload") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.reDownload(index);
    } } }, [_c("v-icon", { attrs: { "color": "green" } }, [_vm._v("sync")])], 1) : _vm._e(), _c("v-btn", { attrs: { "icon": "", "loading": item.loading, "title": item.status } }, [item.verified ? _c("v-icon", { attrs: { "color": "success" } }, [_vm._v("done_all")]) : _c("v-icon", { attrs: { "color": "error", "title": _vm.$t("keepUploadTask.removeFromKeepUpload") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.deleteVerifiedItem(index);
    } } }, [_vm._v("clear")])], 1)], 1)])], 1), index > 0 ? _c("v-divider", { key: "d" + index, attrs: { "inset": "" } }) : _vm._e()];
  })], 2)], 1), _vm.$vuetify.breakpoint.smAndDown ? _c("v-divider") : _vm._e(), _vm.$vuetify.breakpoint.smAndDown && _vm.downloadOptions ? _c("div", { staticClass: "caption ml-1 py-2" }, [_vm._v(" " + _vm._s(_vm.$t("keepUploadTask.savePath")) + _vm._s(_vm.downloadOptions ? `${_vm.downloadOptions.clientName} -> ${_vm.downloadOptions.savePath}` : "") + " ")]) : _vm._e(), _c("v-divider"), _c("v-card-actions", [_vm.verifiedCount > 1 ? [_c("DownloadTo", { attrs: { "flat": "", "get-options-only": "", "small": "", "label": _vm.$vuetify.breakpoint.smAndDown ? _vm.$t("keepUploadTask.setSavePath") : _vm.downloadOptions ? `${_vm.downloadOptions.clientName} -> ${_vm.downloadOptions.savePath}` : _vm.$t("keepUploadTask.setSavePath"), "downloadOptions": _vm.items[0] }, on: { "itemClick": _vm.setDownloadOptions } }), _vm.downloadOptions && _vm.verifiedItems.length > 0 ? _c("v-btn", { attrs: { "flat": "", "small": "", "loading": _vm.creating, "color": "info" }, on: { "click": _vm.create } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("date_range")]), _c("span", { staticClass: "ml-2" }, [_vm._v(_vm._s(_vm.$t("keepUploadTask.create")))])], 1) : _vm._e()] : _vm._e(), _c("v-spacer"), _c("v-btn", { attrs: { "color": "error", "flat": "" }, on: { "click": function($event) {
    _vm.dialog = false;
  } } }, [_vm._v(_vm._s(_vm.$t("common.close")))])], 2)], 1), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
    _vm.haveError = $$v;
  }, expression: "haveError" } }, [_vm._v(_vm._s(_vm.errorMsg))]), _c("v-snackbar", { attrs: { "bottom": "", "timeout": 3e3, "color": "success" }, model: { value: _vm.haveSuccess, callback: function($$v) {
    _vm.haveSuccess = $$v;
  }, expression: "haveSuccess" } }, [_vm._v(_vm._s(_vm.successMsg))])], 1);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "b823b27b",
  null,
  null
);
const KeepUpload = __component__$1.exports;
const extension = new Extension();
const _sfc_main = Vue.extend({
  components: {
    MovieInfoCard,
    TorrentProgress,
    Actions,
    AddToCollectionGroup,
    KeepUpload
  },
  data() {
    return {
      allSitesKey: "allSites",
      key: "",
      // 指定站点搜索
      host: "",
      options: this.$store.state.options,
      getters: this.$store.getters,
      searchMsg: "",
      datas: [],
      getLinks: [],
      selected: [],
      pagination: {
        page: 1,
        rowsPerPage: 100,
        descending: false,
        sortBy: ""
      },
      loading: false,
      errorMsg: "",
      haveError: false,
      haveSuccess: false,
      successMsg: "",
      currentSite: {},
      skipSites: "",
      beginTime: null,
      reloadCount: 0,
      searchQueue: [],
      searchTimer: 0,
      // 正在等待的队列
      waitingQueue: [],
      // 当前正在进行的队列
      currentQueues: 0,
      // 搜索结果
      searchResult: {
        sites: {},
        tags: {},
        categories: {},
        failedSites: [],
        noResultsSites: []
      },
      checkBox: true,
      // 正在下载的种子文件进度信息
      downloading: {
        count: 0,
        completed: 0,
        speed: 0,
        progress: 0
      },
      latestTorrentsKey: "__LatestTorrents__",
      latestTorrentsOnly: false,
      searchSiteCount: 0,
      sending: {
        count: 0,
        completed: 0,
        speed: 0,
        progress: 0
      },
      showCategory: false,
      titleMiddleEllipsis: false,
      fixedTable: false,
      siteContentMenus: {},
      clientContentMenus: [],
      filterKey: "",
      filterKeyExclude: "",
      // 已过滤的数据
      filteredDatas: [],
      showFailedSites: false,
      showNoResultsSites: false,
      pathHandler: new PathHandler(),
      IMDbId: "",
      // 下载失败的种子列表
      downloadFailedTorrents: [],
      // 最后操作的checkbox索引
      lastCheckedIndex: -1,
      shiftKey: false,
      searchPayload: {},
      torrentCollectionLinks: [],
      headerOrderClickCount: 0,
      currentOrderMode: EResourceOrderMode.asc,
      rawDatas: [],
      toolbarClass: "mt-3",
      toolbarIsFixed: false
    };
  },
  created() {
    if (!this.options.system) {
      this.writeLog({
        event: `SearchTorrent.init`,
        msg: this.$t("searchTorrent.optionsIsMissing").toString()
      });
    }
    this.pagination = this.$store.getters.pagination(
      EPaginationKey.searchTorrent,
      {
        rowsPerPage: 100
      }
    );
    let viewOptions = this.$store.getters.viewsOptions(EViewKey.searchTorrent, {
      checkBox: true,
      showCategory: false,
      titleMiddleEllipsis: false
    });
    Object.assign(this, viewOptions);
    this.loadTorrentCollections();
  },
  mounted() {
    eventBus.$on("searchTorrent", this.eventSearchTorrent);
    const downEvent = "mousedown.torrentSearch";
    const upEvent = "mouseUp.torrentSearch";
    $(".search-torrent").off(downEvent);
    $(".search-torrent").off(upEvent);
    $(".search-torrent").on(downEvent, (e) => {
      this.shiftKey = e.shiftKey || false;
    });
    $(".search-torrent").on(upEvent, (e) => {
      this.shiftKey = false;
    });
    window.addEventListener("scroll", this.handleScroll);
    this.$root.$on("KeepUploadTaskCreateSuccess", () => {
      this.toggleAll();
    });
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
    eventBus.$off("searchTorrent", this.eventSearchTorrent);
  },
  beforeRouteUpdate(to, from, next) {
    if (!to.params.key) {
      return;
    }
    this.key = to.params.key;
    this.host = to.params.host;
    next();
  },
  /**
   * 当前组件激活时触发
   * 因为启用了搜索结果缓存，所以需要在这里处理关键字
   */
  activated() {
    if (this.$route.params["key"]) {
      this.key = this.$route.params["key"];
    }
    this.host = this.$route.params["host"];
    this.loadTorrentCollections();
    this.handleScroll();
  },
  watch: {
    key(newValue, oldValue) {
      if (newValue && newValue != oldValue) {
        console.log("watch search key", newValue, oldValue);
        this.doSearch();
      }
    },
    host(newValue, oldValue) {
      if (newValue && newValue != oldValue) {
        console.log("watch search host", newValue, oldValue);
        this.doSearch();
      }
    },
    successMsg() {
      this.haveSuccess = this.successMsg != "";
    },
    errorMsg() {
      this.haveError = this.errorMsg != "";
    },
    "$store.state.options.defaultSearchSolutionId"(newValue, oldValue) {
      console.log("watch search defaultSearchSolutionId", newValue, oldValue);
      if (newValue != oldValue) {
        if (this.$store.state.options.autoSearchWhenSwitchSolution) {
          this.doSearch();
        } else {
          console.log(`切换搜索方案 - 跳过搜索, 可在 常规设置 - 搜索 中开启自动搜索`);
        }
      }
    },
    loading() {
      this.$store.commit("updateSearchStatus", this.loading);
    },
    pagination: {
      handler() {
        if (this.pagination.descending) {
          this.currentOrderMode = EResourceOrderMode.desc;
        } else {
          this.currentOrderMode = EResourceOrderMode.asc;
        }
        this.updatePagination(this.pagination);
      },
      deep: true
    },
    currentOrderMode() {
      this.pagination.descending = this.currentOrderMode === EResourceOrderMode.desc;
    },
    checkBox() {
      if (this.checkBox === false) {
        this.selected = [];
      }
    }
  },
  methods: {
    eventSearchTorrent(args) {
      console.log(`Event: searchTorrent`, args);
      this.doSearch();
    },
    /**
     * 记录日志
     * @param options
     */
    writeLog(options) {
      extension.sendRequest(EAction.writeLog, null, {
        module: EModule.options,
        event: options.event,
        msg: options.msg,
        data: options.data
      });
    },
    /**
     * 延迟执行搜索
     */
    doSearch(searchPayload) {
      clearTimeout(this.searchTimer);
      let _searchPayload;
      if (searchPayload) {
        _searchPayload = this.clone(searchPayload);
      }
      this.searchTimer = window.setTimeout(() => {
        this.search(_searchPayload);
      }, 220);
    },
    reset() {
      this.selected = [];
      this.clearMessage();
      this.datas = [];
      this.rawDatas = [];
      this.getLinks = [];
      this.searchResult = {
        sites: {},
        tags: {},
        categories: {},
        failedSites: [],
        noResultsSites: []
      };
      this.filterKey = "";
      this.searchPayload = {};
    },
    /**
     * 开始搜索
     */
    search(searchPayload) {
      if (this.loading || !this.key)
        return;
      this.reset();
      if (!this.options.system) {
        if (this.reloadCount >= 10) {
          this.errorMsg = this.$t(
            "searchTorrent.optionsIsMissingErrorMsg"
          ).toString();
          this.writeLog({
            event: `SearchTorrent.init`,
            msg: this.errorMsg
          });
          return;
        }
        setTimeout(() => {
          this.search();
        }, 200);
        this.reloadCount++;
        return;
      }
      if (!this.options.sites) {
        this.errorMsg = this.$t("searchTorrent.sitesIsMissing").toString();
        return;
      }
      if (/(show-snapshot)-([a-z0-9]{32})/.test(this.key)) {
        const match = this.key.match(/(show-snapshot)-([a-z0-9]{32})/);
        if (match) {
          this.loadSearchResultSnapshot(match[2]);
          return;
        }
      }
      if (searchPayload) {
        this.searchPayload = searchPayload;
      }
      let searchKeys = {
        id: "",
        cn: "",
        en: "",
        key: this.key
      };
      if (this.key.indexOf("|") !== -1) {
        let tmp = (this.key + "||").split("|");
        searchKeys.id = tmp[0];
        searchKeys.cn = tmp[1];
        searchKeys.en = tmp[2];
        searchKeys.key = tmp[3];
        if (/(douban\d+)/.test(searchKeys.id)) {
          this.searchPayload.doubanId = searchKeys.id.match(
            /douban(\d+)/
          )[1];
        } else {
          this.searchPayload.imdbId = searchKeys.id;
        }
        this.searchPayload.cn = searchKeys.cn;
        this.searchPayload.en = searchKeys.en;
        this.searchPayload.key = searchKeys.key;
      }
      if (/(douban\d+)/.test(this.key)) {
        this.searchPayload.doubanId = this.key.match(
          /douban(\d+)/
        )[1];
        this.getIMDbIdFromDouban(this.key).then((result) => {
          if (typeof result == "string") {
            this.searchPayload.imdbId = result;
            this.key = result;
            this.search(this.searchPayload);
          } else {
            if (searchKeys.cn) {
              this.key = searchKeys.cn;
              this.search(this.searchPayload);
            } else {
              this.errorMsg = this.$t(
                "searchTorrent.doubanIdConversionFailed"
              ).toString();
              this.searchMsg = this.errorMsg;
              this.loading = false;
            }
          }
        }).catch((error) => {
          if (searchKeys.cn) {
            this.key = searchKeys.cn;
            this.search(this.searchPayload);
          } else {
            this.errorMsg = error || this.$t("searchTorrent.doubanIdConversionFailed").toString();
            this.searchMsg = this.errorMsg;
            this.loading = false;
          }
        });
        return;
      }
      let sites = [];
      let skipSites = [];
      this.skipSites = "";
      if (this.key === this.latestTorrentsKey) {
        this.latestTorrentsOnly = true;
      } else {
        this.latestTorrentsOnly = false;
      }
      this.options = this.$store.state.options;
      let searchSolutionId = this.options.defaultSearchSolutionId;
      if (/^[a-z0-9]{32}$/.test(this.host)) {
        searchSolutionId = this.host;
        this.host = "";
      } else if (this.host === "all") {
        searchSolutionId = "all";
        this.host = "";
      }
      if (this.host) {
        let site = this.options.sites.find((item) => {
          return item.host === this.host && !item.offline;
        });
        if (site) {
          sites.push(this.clone(site));
        }
      } else if (
        // 指定了搜索方案
        searchSolutionId && this.options.searchSolutions && searchSolutionId != "all"
      ) {
        let _sites = [];
        this.options.sites.forEach((item) => {
          if (item.offline)
            return false;
          _sites.push(this.clone(item));
        });
        let searchSolution = this.options.searchSolutions.find(
          (solution) => {
            return solution.id === searchSolutionId;
          }
        );
        if (searchSolution) {
          searchSolution.range.forEach((range) => {
            let index = _sites.findIndex((item) => {
              return item.host === range.host;
            });
            if (index > -1) {
              let site = _sites[index];
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
              sites.push(site);
            }
          });
        }
      } else {
        this.options.sites.forEach((item) => {
          if (item.offline)
            return false;
          if (item.allowSearch || searchSolutionId == "all") {
            let siteSchema = this.getSiteSchema(item);
            if (siteSchema && siteSchema.searchEntry && siteSchema.searchEntry.length > 0) {
              sites.push(this.clone(item));
            } else if (item.searchEntry && item.searchEntry.length > 0) {
              sites.push(this.clone(item));
            } else {
              skipSites.push(item.name);
            }
          }
        });
      }
      if (skipSites.length > 0) {
        this.skipSites = this.$t("searchTorrent.skipSites").toString() + skipSites.join(",");
      }
      if (sites.length === 0) {
        this.errorMsg = this.$t("searchTorrent.noAllowSearchSites").toString();
        return;
      }
      this.searchSiteCount = sites.length;
      this.beginTime = dayjs();
      this.writeLog({
        event: `SearchTorrent.Search.Start`,
        msg: this.$t("searchTorrent.searchStartMsg", {
          count: sites.length
        }).toString(),
        data: {
          key: this.key
        }
      });
      this.$store.dispatch("saveConfig", {
        lastSearchKey: this.searchPayload.key || this.key
      });
      this.pagination.page = 1;
      if (/(tt\d+)/.test(this.key)) {
        let imdb = this.key.match(/(tt\d+)/);
        if (imdb && imdb.length >= 2) {
          this.key = imdb[1];
        }
        this.IMDbId = this.key;
      } else {
        this.IMDbId = "";
      }
      this.doSearchTorrentWithQueue(sites);
    },
    /**
     * 执行搜索队列
     */
    doSearchTorrentWithQueue(sites) {
      this.loading = true;
      this.searchMsg = this.$t("searchTorrent.searching").toString();
      const searchSites = sites.filter((site) => {
        if (site.searchEntryConfig && site.searchEntryConfig.skipNonLatinCharacters) {
          if (!this.key.match(/^[\p{Script_Extensions=Latin}\p{Script_Extensions=Common}]+$/gu)) {
            return false;
          }
        }
        if (this.IMDbId && site.searchEntryConfig && site.searchEntryConfig.skipIMDbId) {
          return false;
        }
        return true;
      });
      if (searchSites.length === 0) {
        this.loading = false;
        this.searchMsg = this.$t("searchTorrent.searchFinished", {
          count: this.datas.length,
          second: dayjs().diff(this.beginTime, "second", true)
        }).toString();
        this.loading = false;
        this.writeLog({
          event: `SearchTorrent.Search.Finished`,
          msg: this.searchMsg,
          data: {
            key: this.key
          }
        });
        return;
      }
      searchSites.forEach((site, index) => {
        this.searchQueue.push({
          site,
          key: this.key
        });
        this.writeLog({
          event: `SearchTorrent.Search.Processing`,
          msg: this.$t("searchTorrent.siteIsSearching", {
            siteName: site.name
          }).toString(),
          data: {
            host: site.host,
            name: site.name,
            key: this.key
          }
        });
        this.sendSearchRequest(PPF.clone(site));
      });
    },
    /**
     * 执行等待队列
     */
    searchWaitingQueue() {
      if (this.waitingQueue.length > 0) {
        let site = this.waitingQueue.pop();
        if (site) {
          let index = this.searchQueue.findIndex((item) => {
            return item.site.host === site.host;
          });
          if (index !== -1) {
            this.searchQueue[index].site.isWaiting = false;
          }
          this.sendSearchRequest(site);
        }
      }
    },
    /**
     * 发送搜索请求
     * @param site
     */
    sendSearchRequest(site) {
      var _a;
      let threads = (_a = this.options.search) == null ? void 0 : _a.threads;
      if (!threads || threads < 0) {
        threads = 1e3;
      }
      if (this.currentQueues >= threads) {
        this.waitingQueue.push(site);
        let index = this.searchQueue.findIndex((item) => {
          return item.site.host === site.host;
        });
        if (index !== -1) {
          this.searchQueue[index].site.isWaiting = true;
        }
        return;
      }
      this.currentQueues++;
      extension.sendRequest(EAction.getSearchResult, null, {
        key: this.latestTorrentsOnly ? "" : this.key,
        site,
        payload: this.searchPayload
      }).then((result) => {
        if (result && result.length) {
          this.writeLog({
            event: `SearchTorrent.Search.Done[${site.name}]`,
            msg: this.$t("searchTorrent.siteIsSearchDone", {
              siteName: site.name,
              count: result.length
            }).toString(),
            data: {
              host: site.host,
              name: site.name,
              key: this.key
            }
          });
          this.addSearchResult(result);
          return;
        } else if (result && result.msg) {
          this.writeLog({
            event: `SearchTorrent.Search.Error1`,
            msg: result.msg,
            data: {
              host: site.host,
              name: site.name,
              key: this.key
            }
          });
          this.errorMsg = result.msg;
        } else {
          if (result && result.statusText == "abort") {
            this.errorMsg = this.$t("searchTorrent.siteSearchAbort", {
              host: site.host
            }).toString();
          } else {
            if (result && result.statusText == "timeout") {
              this.errorMsg = this.$t("searchTorrent.siteSearchTimeout", {
                host: site.host
              }).toString();
            } else {
              this.errorMsg = this.$t("searchTorrent.siteSearchError", {
                host: site.host
              }).toString();
            }
            this.writeLog({
              event: `SearchTorrent.Search.Error2`,
              msg: this.errorMsg,
              data: {
                host: site.host,
                name: site.name,
                key: this.key,
                result
              }
            });
          }
        }
        this.searchResult.failedSites.push({
          site,
          msg: this.errorMsg,
          color: "orange darken-1"
        });
      }).catch((result) => {
        console.log(result);
        if (result.msg) {
          this.errorMsg = result.msg;
        }
        this.writeLog({
          event: `SearchTorrent.Search.Error3`,
          msg: result.msg,
          data: result
        });
        if (result.data && result.data.isLogged == false) {
          this.searchResult.failedSites.push({
            site,
            url: site.url,
            msg: this.$t("searchTorrent.notLogged").toString(),
            color: "grey"
          });
        } else {
          if (result.type === EDataResultType.error) {
            this.searchResult.failedSites.push({
              site,
              url: site.url,
              msg: result.msg || result.data || result,
              color: "grey"
            });
          } else {
            this.searchResult.noResultsSites.push({
              site,
              msg: result.msg || result.data || result,
              color: "light-blue darken-2"
            });
          }
        }
      }).finally(() => {
        this.currentQueues--;
        this.removeQueue(site);
      });
    },
    /**
     * 取消一个搜索队列
     */
    abortSearch(site) {
      extension.sendRequest(EAction.abortSearch, null, {
        key: this.key,
        site
      }).then(() => {
        this.writeLog({
          event: `SearchTorrent.Search.Abort`,
          msg: this.$t("searchTorrent.siteSearchAbort", {
            host: site.name
          }).toString()
        });
      }).catch(() => {
        this.writeLog({
          event: `SearchTorrent.Search.Abort.Error`,
          msg: this.$t("searchTorrent.siteSearchAbortError", {
            host: site.name
          }).toString()
        });
        this.removeQueue(site);
      });
    },
    /**
     * 移除搜索队列
     */
    removeQueue(site) {
      this.searchWaitingQueue();
      let index = this.searchQueue.findIndex((item) => {
        return item.site.host === site.host;
      });
      if (index !== -1) {
        this.searchQueue.splice(index, 1);
        if (this.searchQueue.length == 0) {
          this.searchMsg = this.$t("searchTorrent.searchFinished", {
            count: this.datas.length,
            second: dayjs().diff(this.beginTime, "second", true)
          }).toString();
          this.loading = false;
          this.writeLog({
            event: `SearchTorrent.Search.Finished`,
            msg: this.searchMsg,
            data: {
              key: this.key
            }
          });
        }
      }
    },
    /**
     * 创建搜索结果快照
     */
    createSearchResultSnapshot() {
      extension.sendRequest(EAction.createSearchResultSnapshot, null, {
        key: this.key,
        searchPayload: this.searchPayload,
        result: this.rawDatas
      }).then((result) => {
        this.successMsg = this.$t(
          "searchResultSnapshot.createSuccess"
        ).toString();
        console.log("createSearchResultSnapshot", result);
      }).catch(() => {
        this.errorMsg = this.$t(
          "searchResultSnapshot.createError"
        ).toString();
      });
    },
    /**
     * 加载搜索结果快照
     * @param id 快照ID
     */
    loadSearchResultSnapshot(id) {
      this.loading = true;
      extension.sendRequest(EAction.getSearchResultSnapshot, null, id).then((data) => {
        console.log("loadSearchResultSnapshot", data);
        this.key = data.key;
        this.searchPayload = data.searchPayload;
        if (this.searchPayload && this.searchPayload.imdbId) {
          this.IMDbId = this.searchPayload.imdbId;
        } else if (/^(tt\d+)$/.test(this.key)) {
          this.IMDbId = this.key;
        } else {
          this.IMDbId = "";
        }
        this.addSearchResult(PPF.clone(data.result));
        this.searchMsg = this.$t("searchResultSnapshot.snapshotTime", {
          time: dayjs(data.time).format("YYYY-MM-DD hh:mm:ss")
        }).toString();
        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
    },
    /**
     * 添加搜索结果，并组织字段格式
     */
    addSearchResult(result) {
      let allSites = this.allSitesKey;
      if (!this.searchResult.sites[allSites]) {
        this.searchResult.sites[allSites] = [];
      }
      result.forEach((item) => {
        let _item = PPF.clone(item);
        if (_item.site) {
          _item.host = _item.site.host;
          delete _item.site;
        }
        this.rawDatas.push(_item);
        item.link = item.link.replace("://", "****").replace(/\/\//g, "/").replace("****", "://");
        if (this.getLinks.includes(item.link)) {
          return;
        }
        if (!item.site) {
          let host = item.host || "";
          item.site = PPF.getSiteFromHost(host, this.options);
          if (!item.site) {
            return;
          }
        }
        if (!item.progress && !item.status) {
          if (item.site && item.site.user && item.site.user.seedingList) {
            let seedingList = item.site.user.seedingList;
            let seeding = seedingList.some((id) => item.id && item.id == id);
            if (seeding) {
              item.progress = 100;
              item.status = 2;
            }
          }
        }
        if (dayjs(item.time).isValid()) {
          let val = item.time + "";
          if (/^(\d){10}$/.test(val + "")) {
            item.time = parseInt(val) * 1e3;
          } else {
            item.time = dayjs(val).valueOf();
          }
          item.time = PPF.transformTime(item.time, item.site.timezoneOffset);
        } else if (typeof item.time == "string") {
          let time = filters.timeAgoToNumber(item.time);
          if (time > 0) {
            item.time = time;
          }
        }
        if (!item.titleHTML) {
          item.titleHTML = item.title;
        }
        item.title = $("<span/>").html(item.titleHTML).text().trim();
        if (item.size) {
          item.size = this.fileSizetoLength(item.size);
        }
        if (item.seeders && typeof item.seeders == "string") {
          item.seeders = parseInt(item.seeders.replace(",", ""));
          if (isNaN(item.seeders)) {
            item.seeders = 0;
          }
        }
        if (item.leechers && typeof item.leechers == "string") {
          item.leechers = parseInt(item.leechers.replace(",", ""));
          if (isNaN(item.leechers)) {
            item.leechers = 0;
          }
        }
        if (item.completed && typeof item.completed == "string") {
          item.completed = parseInt(
            item.completed.replace(",", "")
          );
          if (isNaN(item.completed)) {
            item.completed = 0;
          }
        }
        if (item.url) {
          item.url = item.url.replace("://", "****").replace(/\/\//g, "/").replace("****", "://");
        }
        this.datas.push(item);
        this.getLinks.push(item.link);
        this.searchMsg = this.$t("searchTorrent.searchProgress", {
          count: this.datas.length
        }).toString();
        let siteName = item.site.name;
        if (!this.searchResult.sites[siteName]) {
          this.searchResult.sites[siteName] = [];
        }
        this.searchResult.sites[siteName].push(item);
        this.addTagResult(item);
        this.addCategoryResult(item);
      });
      this.searchResult.sites[allSites] = this.datas.sort((a, b) => a.title.localeCompare(b.title, void 0, { sensitivity: "base" }));
    },
    /**
     * 添加搜索结果标签
     * @param item
     */
    addTagResult(item) {
      let noTag = this.$t("searchTorrent.noTag").toString();
      if (!this.searchResult.tags[noTag]) {
        this.searchResult.tags[noTag] = {
          tag: {
            name: noTag,
            color: "blue-grey darken-2"
          },
          items: []
        };
      }
      if (item.tags == void 0 || item.tags == null || !item.tags.length) {
        this.searchResult.tags[noTag].items.push(item);
        return;
      }
      item.tags.forEach((tag) => {
        let name = tag.name;
        if (!name)
          return;
        if (!this.searchResult.tags[name]) {
          this.searchResult.tags[name] = {
            tag,
            items: []
          };
        }
        this.searchResult.tags[name].items.push(item);
      });
    },
    /**
     * 添加搜索结果分类
     * @param item
     */
    addCategoryResult(item) {
      if (!item.category) {
        return;
      }
      let name = "";
      if (typeof item.category == "string") {
        name = item.category;
        item.category = {
          name
        };
      } else {
        name = item.category.name;
      }
      if (!name)
        return;
      if (!this.searchResult.categories[name]) {
        this.searchResult.categories[name] = {
          name,
          items: []
        };
      }
      this.searchResult.categories[name].items.push(item);
    },
    /**
     * @return {number}
     */
    fileSizetoLength(size) {
      if (typeof size == "number") {
        return size;
      }
      let _size_raw_match = size.replace(/,/g, "").trim().match(/^(\d*\.?\d+)(.*[^ZEPTGMK])?([ZEPTGMK](B|iB))$/i);
      if (_size_raw_match) {
        let _size_num = parseFloat(_size_raw_match[1]);
        let _size_type = _size_raw_match[3];
        switch (true) {
          case /Zi?B/i.test(_size_type):
            return _size_num * Math.pow(2, 70);
          case /Ei?B/i.test(_size_type):
            return _size_num * Math.pow(2, 60);
          case /Pi?B/i.test(_size_type):
            return _size_num * Math.pow(2, 50);
          case /Ti?B/i.test(_size_type):
            return _size_num * Math.pow(2, 40);
          case /Gi?B/i.test(_size_type):
            return _size_num * Math.pow(2, 30);
          case /Mi?B/i.test(_size_type):
            return _size_num * Math.pow(2, 20);
          case /Ki?B/i.test(_size_type):
            return _size_num * Math.pow(2, 10);
          default:
            return _size_num;
        }
      }
      return 0;
    },
    /**
     * 根据指定的站点获取站点的架构信息
     * @param site 站点信息
     */
    getSiteSchema(site) {
      let schema = {};
      if (typeof site.schema === "string") {
        schema = this.options.system && this.options.system.schemas && this.options.system.schemas.find((item) => {
          return item.name == site.schema;
        });
      }
      return schema;
    },
    /**
     * 发送下载链接到服务器
     * @param url
     * @param title
     */
    sendToClient(url, title, options, callback, link = "", imdbId) {
      console.log(url);
      this.clearMessage();
      let host = filters.parseURL(url).host;
      let site = this.options.sites.find((site2) => {
        if (site2.cdn) {
          let index = site2.cdn.findIndex((cdn) => {
            return cdn.indexOf(host) > -1;
          });
          if (index > -1) {
            return true;
          }
        }
        return site2.host === host;
      });
      let defaultClientOptions = {};
      let defaultPath = "";
      if (options) {
        defaultClientOptions = options.client;
        defaultPath = options.path;
      } else {
        defaultClientOptions = this.getters.clientOptions(site);
        defaultPath = this.getters.siteDefaultPath(site);
      }
      let savePath = this.pathHandler.getSavePath(defaultPath, site);
      if (savePath === false) {
        this.errorMsg = this.$t("searchTorrent.userCanceled").toString();
        return;
      }
      this.haveSuccess = true;
      this.successMsg = this.$t("searchTorrent.seedingTorrent").toString();
      let data = {
        url,
        title,
        savePath,
        autoStart: defaultClientOptions.autoStart,
        tagIMDb: defaultClientOptions.tagIMDb,
        clientId: defaultClientOptions.id,
        link,
        imdbId
      };
      this.writeLog({
        event: "SearchTorrent.sendTorrentToClient",
        msg: this.$t("searchTorrent.sendTorrentToClient").toString(),
        data
      });
      extension.sendRequest(EAction.sendTorrentToClient, null, data).then((result) => {
        console.log("命令执行完成", result);
        if (result.type == "success") {
          this.successMsg = result.msg;
          this.writeLog({
            event: "SearchTorrent.sendTorrentToClient.Success",
            msg: this.$t(
              "searchTorrent.sendTorrentToClientSuccess"
            ).toString(),
            data: result
          });
        } else {
          this.errorMsg = result.msg;
          this.writeLog({
            event: "SearchTorrent.sendTorrentToClient.Error",
            msg: this.$t("searchTorrent.sendTorrentToClientError").toString(),
            data: result
          });
        }
        callback && callback();
      }).catch((result) => {
        this.writeLog({
          event: "SearchTorrent.sendTorrentToClient.Error",
          msg: this.$t("searchTorrent.sendTorrentToClientError").toString(),
          data: result
        });
        this.errorMsg = result.msg;
        callback && callback();
      });
    },
    /**
     * 更新分页信息
     * @param value
     */
    updatePagination(value) {
      console.log(value);
      this.$store.dispatch("updatePagination", {
        key: EPaginationKey.searchTorrent,
        options: value
      });
    },
    /**
     * 获取随机字符串
     * @param  {number} length    [长度，默认为16]
     * @param  {boolean} noSimilar [是否包含容易混淆的字符，默认为包含]
     * @return {string}           [返回的内容]
     */
    getRandomString(length = 16, noSimilar = true) {
      let chars = noSimilar ? "abcdefhijkmnprstwxyz2345678ABCDEFGHJKMNPQRSTWXYZ" : "abcdefghijkmnopqrstuvwxyz0123456789ABCDEFGHIJKMNOPQRSTUVWXYZ";
      let maxLength = chars.length;
      let result = [];
      for (let i = 0; i < length; i++) {
        result.push(chars.charAt(Math.floor(Math.random() * maxLength)));
      }
      return result.join("");
    },
    /**
     * 重设当前列表数据
     * @param datas
     */
    resetDatas(datas) {
      if (this.loading)
        return;
      if (datas.length) {
        this.pagination.page = 1;
        this.datas = datas;
        this.selected = [];
      }
    },
    /**
     * 下载已选中的种子文件
     */
    async downloadSelected() {
      let files = [];
      for (let i = 0; i < this.selected.length; i++) {
        const item = this.selected[i];
        console.log(`[${i}]解析 ${item.title} 的 url: ${item.url}`);
        const url = this.processURLWithPrefix("m-teamdetail", item.site, item.url);
        url && files.push({
          url,
          fileName: `[${item.site.name}][${item.title}].torrent`,
          method: item.site.downloadMethod,
          timeout: this.options.connectClientTimeout
        });
      }
      console.log(files);
      if (files.length) {
        if (files.length > 1) {
          if (!confirm(this.$t("searchTorrent.multiDownloadConfirm").toString())) {
            return;
          }
        }
        this.downloadTorrentFiles(files);
      }
    },
    /**
     * 批量下载指定的种子文件
     * @param files 需要下载的文件列表
     */
    downloadTorrentFiles(files) {
      this.downloading.count = files.length;
      this.downloading.completed = 0;
      this.downloading.speed = 0;
      this.downloading.progress = 0;
      new Downloader({
        files,
        autoStart: true,
        tagIMDb: true,
        onCompleted: (file) => {
          this.downloadTorrentFilesCompleted(file);
        },
        onError: (file, e) => {
          this.downloadTorrentFilesCompleted();
          this.writeLog({
            event: "SearchTorrent.downloadSelected.Error",
            msg: this.$t("searchTorrent.downloadSelectedError", {
              name: file.fileName
            }).toString(),
            data: e
          });
          let index = this.downloadFailedTorrents.findIndex(
            (item) => {
              return item.url == file.url;
            }
          );
          if (index == -1) {
            this.downloadFailedTorrents.push(file);
          }
        }
      });
    },
    /**
     * 批量下载指定的种子文件完成
     * @param file
     */
    downloadTorrentFilesCompleted(file) {
      this.downloading.completed++;
      this.downloading.progress = this.downloading.completed / this.downloading.count * 100;
      if (this.downloading.completed >= this.downloading.count) {
        this.downloading.count = 0;
        this.selected = [];
      }
      if (file) {
        for (let index = 0; index < this.downloadFailedTorrents.length; index++) {
          const element = this.downloadFailedTorrents[index];
          if (element.url == file.url) {
            this.downloadFailedTorrents.splice(index, 1);
            break;
          }
        }
      }
    },
    /**
     * 保存当前行的种子文件
     * @param item
     */
    saveTorrentFile(item) {
      let requestMethod = ERequestMethod.GET;
      if (item.site) {
        requestMethod = item.site.downloadMethod || ERequestMethod.GET;
      }
      let url = this.processURLWithPrefix("m-teamdetail", item.site, item.url + "");
      let file = new FileDownloader({
        url,
        timeout: this.options.connectClientTimeout,
        fileName: `[${item.site.name}][${item.title}].torrent`
      });
      file.requestMethod = requestMethod;
      file.onError = (error) => {
      };
      file.start();
    },
    /**
     * 发送已选择的种子到下载服务器
     * @param datas
     * @param count
     */
    sendSelectedToClient(datas, count = 0, downloadOptions) {
      if (datas === void 0) {
        datas = [...this.selected];
        count = datas.length;
        this.sending.count = count;
        this.sending.completed = 0;
        this.sending.speed = 0;
        this.sending.progress = 0;
      }
      if (datas.length === 0) {
        this.sending.count = 0;
        return;
      }
      let data = datas.shift();
      console.log(data.imdbId);
      let url = this.processURLWithPrefix("m-teamdetail", data.site, data.url);
      this.sendToClient(
        url,
        data.title,
        downloadOptions,
        () => {
          this.sending.completed++;
          this.sending.progress = this.sending.completed / this.sending.count * 100;
          if (this.sending.completed >= this.sending.count) {
            this.sending.count = 0;
            this.selected = [];
            return;
          }
          this.sendSelectedToClient(datas, count, downloadOptions);
        },
        data.link,
        data.imdbId
      );
    },
    /**
     * 复制当前链接到剪切板
     * @param url
     */
    copyLinkToClipboard(item) {
      this.successMsg = "";
      this.errorMsg = "";
      var url = item.url;
      url = this.processURLWithPrefix("m-teamdetail", item.site, url);
      extension.sendRequest(EAction.copyTextToClipboard, null, url).then((result) => {
        this.successMsg = this.$t(
          "searchTorrent.copyLinkToClipboardSuccess"
        ).toString();
      }).catch(() => {
        this.errorMsg = this.$t(
          "searchTorrent.copyLinkToClipboardError"
        ).toString();
      });
    },
    getSelectedURLs() {
      let urls = [];
      const prefix = "m-teamdetail";
      this.selected.forEach((item) => {
        var url = item.url;
        url = this.processURLWithPrefix(prefix, item.site, url);
        url && urls.push(url);
      });
      return urls;
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
     * 复制下载链接到剪切板
     */
    copySelectedToClipboard() {
      let urls = this.getSelectedURLs();
      this.clearMessage();
      extension.sendRequest(EAction.copyTextToClipboard, null, urls.join("\n")).then((result) => {
        this.successMsg = this.$t(
          "searchTorrent.copySelectedToClipboardSuccess",
          {
            count: urls.length
          }
        ).toString();
        this.selected = [];
      }).catch(() => {
        this.errorMsg = this.$t(
          "searchTorrent.copyLinkToClipboardError"
        ).toString();
      });
    },
    clearMessage() {
      this.successMsg = "";
      this.errorMsg = "";
      this.haveSuccess = false;
      this.haveError = false;
    },
    /**
     * 根据指定的站点获取可用的下载目录及客户端信息
     * @param site
     */
    getSiteContentMenus(site) {
      let results = [];
      let clients = [];
      let host = site.host;
      if (!host) {
        return [];
      }
      if (this.siteContentMenus[host]) {
        return this.siteContentMenus[host];
      }
      function pushPath(paths, client) {
        paths.forEach((path) => {
          results.push({
            client,
            path,
            host: site.host
          });
        });
      }
      this.options.clients.forEach((client) => {
        clients.push({
          client,
          path: "",
          host: site.host
        });
        if (client.paths) {
          for (const host2 in client.paths) {
            let paths = client.paths[host2];
            if (host2 !== site.host) {
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
      this.siteContentMenus[host] = results;
      return results;
    },
    /**
     * 显示指定链接的下载服务器及目录菜单
     * @param options
     * @param event
     */
    showSiteContentMenus(options, event) {
      let items = this.getSiteContentMenus(options.site);
      let menus = [];
      items.forEach((item) => {
        if (item.client && item.client.name) {
          menus.push({
            title: this.$t("searchTorrent.downloadTo", {
              path: `${item.client.name} -> ${item.client.address}` + (item.path ? ` -> ${this.pathHandler.replacePathKey(
                item.path,
                options.site
              )}` : "")
            }).toString(),
            fn: () => {
              if (options.url) {
                let url = this.processURLWithPrefix("m-teamdetail", options.site, options.url);
                this.sendToClient(
                  url,
                  options.title,
                  item,
                  null,
                  options.link,
                  options.imdbId
                );
              }
            }
          });
        } else {
          menus.push({});
        }
      });
      console.log(items, menus);
      basicContext_minExports.show(menus, event);
      $(".basicContext").css({
        left: "-=20px",
        top: "+=10px"
      });
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
        let title = _this.$vuetify.breakpoint.xs ? item.client.name : _this.$t("searchTorrent.downloadTo", {
          path: `${item.client.name} -> ${item.client.address}`
        }).toString();
        if (item.path) {
          title += ` -> ${item.path}`;
        }
        menus.push({
          title,
          fn: () => {
            _this.sendSelectedToClient(void 0, 0, item);
          }
        });
      }
      if (this.clientContentMenus.length == 0) {
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
                    let _item = this.clone(item);
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
        this.clientContentMenus = menus;
      } else {
        menus = this.clientContentMenus;
      }
      basicContext_minExports.show(menus, event);
      $(".basicContext").css({
        left: "-=20px",
        top: "+=10px"
      });
    },
    /**
     * 重新搜索指定的站点
     * @param host
     */
    reSearchWithSite(host) {
      const site = this.options.sites.find((item) => {
        return item.host === host;
      });
      if (!site) {
        return;
      }
      let index = this.searchResult.failedSites.findIndex((item) => {
        return item.site.host === host;
      });
      if (index !== -1) {
        this.searchResult.failedSites.splice(index, 1);
      }
      index = this.searchResult.noResultsSites.findIndex((item) => {
        return item.site.host === host;
      });
      if (index !== -1) {
        this.searchResult.noResultsSites.splice(index, 1);
      }
      this.doSearchTorrentWithQueue([site]);
    },
    /**
     * 重新搜索失败的站点
     */
    reSearchFailedSites() {
      if (this.searchResult.failedSites.length == 0) {
        return false;
      }
      let sites = [];
      this.searchResult.failedSites.forEach((item) => {
        sites.push(item.site);
      });
      if (sites.length === 0) {
        this.errorMsg = this.$t("searchTorrent.noReSearchSites").toString();
        return;
      }
      this.searchResult.failedSites = [];
      this.beginTime = dayjs();
      this.writeLog({
        event: `SearchTorrent.Search.Start`,
        msg: this.$t("searchTorrent.searchStartMsg", {
          count: sites.length
        }).toString(),
        data: {
          key: this.key
        }
      });
      this.doSearchTorrentWithQueue(sites);
    },
    /**
     * 用JSON对象模拟对象克隆
     * @param source
     */
    clone(source) {
      return JSON.parse(JSON.stringify(source));
    },
    /**
     * 搜索结果过滤器，用于用户二次过滤
     * @param items
     * @param search
     */
    searchResultFilter(items, search) {
      const [include, exclude] = search.split("<@>");
      const includes = include.toLowerCase().trim().split(" ").filter((key) => key !== "");
      const excludes = exclude.toLowerCase().trim().split(" ").filter((key) => key !== "");
      this.filteredDatas = items.filter((item) => {
        const source = (item.title + (item.subTitle || "")).toLowerCase();
        const includeResult = includes.length === 0 || includes.every((key) => source.includes(key));
        const excludeResult = excludes.length === 0 || !excludes.some((key) => source.includes(key));
        return includeResult && excludeResult;
      });
      return this.filteredDatas;
    },
    getIMDbIdFromDouban(doubanId) {
      let match = doubanId.match(/douban(\d+)/);
      if (match && match.length >= 2) {
        this.searchMsg = this.$t("searchTorrent.doubanIdConverting").toString();
        return extension.sendRequest(
          EAction.getIMDbIdFromDouban,
          null,
          match[1]
        );
      } else {
        return new Promise((resolve, reject) => {
          reject(this.$t("searchTorrent.invalidDoubanId").toString());
        });
      }
    },
    /**
     * 重新下载失败的种子文件
     */
    reDownloadFailedTorrents() {
      this.downloadTorrentFiles(this.downloadFailedTorrents);
    },
    /**
     * shift键多选操作
     * @param selected 是否被选中
     * @param index 当前索引
     */
    shiftCheck(selected, index) {
      if (this.lastCheckedIndex === -1) {
        this.lastCheckedIndex = index;
        return;
      }
      if (this.shiftKey) {
        let start = index;
        let end = this.lastCheckedIndex;
        let startIndex = Math.min(start, end);
        let endIndex = Math.max(start, end) + 1;
        let datas = this.clone(this.filteredDatas.length > 0 ? this.filteredDatas : this.datas);
        datas = datas.sort(
          this.arrayObjectSort(
            this.pagination.sortBy,
            this.pagination.descending ? EResourceOrderMode.desc : EResourceOrderMode.asc
          )
        );
        for (let i = startIndex; i < endIndex; i++) {
          let data = datas[i];
          let _index = this.selected.findIndex((_item) => {
            return _item.link === data.link;
          });
          if (selected) {
            if (_index === -1) {
              this.selected.push(data);
            }
          } else {
            if (_index !== -1) {
              this.selected.splice(_index, 1);
            }
          }
        }
      }
      this.lastCheckedIndex = index;
    },
    /**
     * 对指定的对象进行排序
     * @param field 字段
     * @param sortOrder 排序方式
     */
    arrayObjectSort(field, sortOrder = EResourceOrderMode.asc) {
      function getObjectValue(obj, path) {
        return new Function("o", "return o." + path)(obj);
      }
      return function(object1, object2) {
        var value1 = getObjectValue(object1, field);
        var value2 = getObjectValue(object2, field);
        if (value1 < value2) {
          if (sortOrder == EResourceOrderMode.desc) {
            return 1;
          } else
            return -1;
        } else if (value1 > value2) {
          if (sortOrder == EResourceOrderMode.desc) {
            return -1;
          } else
            return 1;
        } else {
          return 0;
        }
      };
    },
    addSelectedToCollection(group) {
      this.selected.forEach((item) => {
        if (item.url) {
          this.addToCollection(item, group);
        }
      });
    },
    /**
     * 添加到收藏
     * @param item 当前种子相关信息
     * @param group 收藏分组信息
     */
    addToCollection(item, group) {
      let options = {
        title: item.title,
        url: item.url,
        link: item.link,
        host: item.site.host,
        size: item.size,
        subTitle: item.subTitle,
        movieInfo: {
          imdbId: this.IMDbId || this.searchPayload.imdbId,
          doubanId: this.searchPayload.doubanId
        }
      };
      if (group && group.id) {
        options.groups = [group.id];
      }
      extension.sendRequest(EAction.addTorrentToCollection, null, options).then((result) => {
        this.loadTorrentCollections();
        console.log(result);
      });
    },
    deleteCollection(item) {
      extension.sendRequest(EAction.deleteTorrentFromCollention, null, {
        link: PPF.getCleaningURL(item.link)
      }).then((result) => {
        this.loadTorrentCollections();
      });
    },
    loadTorrentCollections() {
      extension.sendRequest(EAction.getAllTorrentCollectionLinks).then((result) => {
        this.torrentCollectionLinks = result;
      });
    },
    isCollectioned(link) {
      return this.torrentCollectionLinks.includes(PPF.getCleaningURL(link));
    },
    /**
     * 全选/反选
     */
    toggleAll() {
      if (this.selected.length > 0) {
        this.selected = [];
      } else if (this.filteredDatas.length > 0) {
        this.selected = this.filteredDatas.slice();
      } else {
        this.selected = this.datas.slice();
      }
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
        this.headerOrderClickCount++;
        if (this.headerOrderClickCount == 2) {
          this.pagination.sortBy = "";
        }
      } else {
        this.headerOrderClickCount = 0;
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    getHeaderClass(header) {
      let result = [];
      result.push("column");
      if (header.sortable !== false) {
        result.push("sortable");
        result.push(this.pagination.descending ? "desc" : "asc");
        if (header.value === this.pagination.sortBy) {
          result.push("active");
        }
      }
      if (header.align) {
        result.push(`text-xs-${header.align}`);
      }
      return result;
    },
    downloadSuccess(msg) {
      this.successMsg = msg;
    },
    downloadError(msg) {
      this.errorMsg = msg;
    },
    updateViewOptions() {
      this.$store.dispatch("updateViewOptions", {
        key: EViewKey.searchTorrent,
        options: {
          checkBox: this.checkBox,
          showCategory: this.showCategory,
          titleMiddleEllipsis: this.titleMiddleEllipsis
        }
      });
    },
    handleScroll() {
      const divToolbar = $("#divToolbar");
      if (!divToolbar || !divToolbar.offset()) {
        return;
      }
      const sysTopBar = $("#system-topbar");
      const top = sysTopBar.height();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const offsetTop = divToolbar.offset().top;
      if (scrollTop + top > offsetTop) {
        this.toolbarClass = "isFixedToolbar";
        this.toolbarIsFixed = true;
        const height = $("#divToobarInner").height() || 0;
        $("#divToobarHeight").height(height);
        $("#divToobarInner").css({
          top
        });
      } else {
        this.toolbarIsFixed = false;
        this.toolbarClass = "mt-3";
      }
    }
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("searchTorrent.headers.site"),
          align: "center",
          value: this.$store.state.options.searchResultOrderBySitePriority ? "site.priority" : "site.host",
          visible: this.$vuetify.breakpoint.mdAndUp
        },
        {
          text: this.$t("searchTorrent.headers.title"),
          align: "left",
          value: "title",
          visible: true
        },
        {
          text: this.$t("searchTorrent.headers.category"),
          align: "center",
          value: "category.name",
          width: "150px",
          visible: this.$vuetify.breakpoint.width > 1200
        },
        {
          text: this.$t("searchTorrent.headers.size"),
          align: "right",
          value: "size",
          width: "100px",
          visible: this.$vuetify.breakpoint.smAndUp
        },
        {
          text: this.$t("searchTorrent.headers.seeders"),
          align: "right",
          value: "seeders",
          width: "60px",
          visible: this.$vuetify.breakpoint.smAndUp
        },
        {
          text: this.$t("searchTorrent.headers.leechers"),
          align: "right",
          value: "leechers",
          width: "60px",
          visible: this.$vuetify.breakpoint.mdAndUp
        },
        {
          text: this.$t("searchTorrent.headers.completed"),
          align: "right",
          value: "completed",
          width: "60px",
          visible: this.$vuetify.breakpoint.mdAndUp
        },
        {
          text: this.$t("searchTorrent.headers.comments"),
          align: "right",
          value: "comments",
          width: "60px",
          visible: this.$vuetify.breakpoint.smAndUp
        },
        {
          text: this.$t("searchTorrent.headers.time"),
          align: "left",
          value: "time",
          width: "130px",
          visible: this.$vuetify.breakpoint.mdAndUp
        },
        {
          text: this.$t("searchTorrent.headers.action"),
          sortable: false,
          width: this.$vuetify.breakpoint.mdAndUp ? "130px" : "80px",
          align: "center",
          visible: this.$vuetify.breakpoint.smAndUp
        }
      ];
    },
    orderHeaders() {
      return this.headers.filter((item) => {
        return item.sortable !== false;
      });
    },
    orderMode() {
      return [
        {
          text: this.$t("common.orderMode.asc"),
          value: EResourceOrderMode.asc
        },
        {
          text: this.$t("common.orderMode.desc"),
          value: EResourceOrderMode.desc
        }
      ];
    },
    indeterminate() {
      if (this.selected.length > 0 && this.selected.length < this.datas.length) {
        return true;
      }
      return false;
    },
    // 已选中的种子大小
    selectedSize() {
      if (this.selected.length > 0) {
        let totalSize = 0;
        this.selected.forEach((item) => {
          const size = item.size;
          if (size > 0) {
            totalSize += size;
          }
        });
        return totalSize;
      }
      return 0;
    }
  }
});
var _sfc_render = function render7() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "search-torrent" }, [!!_vm.options.showMovieInfoCardOnSearch ? _c("MovieInfoCard", { attrs: { "IMDbId": _vm.IMDbId, "doubanId": _vm.searchPayload.doubanId } }) : _vm._e(), _c("v-alert", { staticStyle: { "padding": "8px 16px" }, attrs: { "value": true, "type": "info" } }, [_vm._v(" " + _vm._s(_vm.$t("searchTorrent.title")) + " [" + _vm._s(_vm.key) + "], " + _vm._s(_vm.searchMsg) + " " + _vm._s(_vm.skipSites) + " "), !_vm.loading && _vm.key != "" ? _c("v-btn", { attrs: { "flat": "", "icon": "", "small": "", "color": "white", "title": _vm.$t("searchTorrent.reSearch") }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.doSearch(_vm.searchPayload);
  } } }, [_c("v-icon", [_vm._v("cached")])], 1) : _vm._e(), _vm.searchResult.noResultsSites.length > 0 ? _c("v-btn", { staticClass: "mt-1", attrs: { "flat": "", "small": "", "color": "white" }, on: { "click": function($event) {
    $event.stopPropagation();
    _vm.showNoResultsSites = !_vm.showNoResultsSites;
  } } }, [_c("v-icon", { staticClass: "mr-1", attrs: { "small": "", "color": "grey darken-2" } }, [_vm._v("face")]), _vm._v(" " + _vm._s(_vm.$t("searchTorrent.noResultsSites")) + " " + _vm._s(_vm.searchResult.noResultsSites.length) + " ")], 1) : _vm._e(), _vm.searchResult.failedSites.length > 0 ? _c("v-btn", { staticClass: "mt-1", attrs: { "flat": "", "small": "", "color": "white" }, on: { "click": function($event) {
    $event.stopPropagation();
    _vm.showFailedSites = !_vm.showFailedSites;
  } } }, [_c("v-icon", { staticClass: "mr-1", attrs: { "small": "", "color": "orange" } }, [_vm._v("warning")]), _vm._v(" " + _vm._s(_vm.$t("searchTorrent.failedSites")) + " " + _vm._s(_vm.searchResult.failedSites.length) + " ")], 1) : _vm._e(), _vm.searchResult.failedSites.length > 0 && _vm.showFailedSites ? _c("v-btn", { staticClass: "mt-1", attrs: { "flat": "", "small": "", "color": "white" }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.reSearchFailedSites.apply(null, arguments);
  } } }, [_c("v-icon", { staticClass: "mr-1", attrs: { "small": "" } }, [_vm._v("autorenew")]), _vm._v(" " + _vm._s(_vm.$t("searchTorrent.reSearchFailedSites")) + " ")], 1) : _vm._e()], 1), _vm.searchQueue && _vm.searchQueue.length ? _c("v-list", { attrs: { "small": "" } }, [_vm._l(_vm.searchQueue, function(item, index) {
    return [_c("v-list-tile", { key: item.site.host }, [_c("v-list-tile-action", [_c("v-progress-circular", { attrs: { "size": 18, "width": 2, "indeterminate": "", "color": item.site.isWaiting ? "amber" : "primary" } })], 1), _c("v-list-tile-content", [_c("v-list-tile-title", [_c("v-avatar", { staticClass: "mr-2", attrs: { "size": "18" } }, [_c("img", { attrs: { "src": item.site.icon } })]), _vm._v(" " + _vm._s(item.site.name) + " " + _vm._s(item.site.isWaiting ? _vm.$t("searchTorrent.waiting") : _vm.$t("searchTorrent.searching")) + " ")], 1)], 1), _c("v-list-tile-action", { staticClass: "mr-5" }, [_c("v-icon", { attrs: { "color": "red", "title": _vm.$t("searchTorrent.cancelSearch") }, on: { "click": function($event) {
      return _vm.abortSearch(item.site);
    } } }, [_vm._v("cancel")])], 1)], 1), index + 1 < _vm.searchQueue.length ? _c("v-divider", { key: "line" + item.site.host + index }) : _vm._e()];
  })], 2) : _vm._e(), _c("v-card", [_c("v-card-title", { staticStyle: { "padding": "0 5px 0 3px" } }, [_c("v-flex", { attrs: { "xs12": "" } }, [_vm.searchSiteCount > 1 ? _c("div", [_vm._l(_vm.searchResult.sites, function(item, key) {
    return [_c("v-chip", { key, staticClass: "mr-1 py-3 pl-1", attrs: { "label": "", "color": item.length ? "blue-grey darken-2" : "grey", "text-color": "white", "small": "", "disabled": !item.length }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.resetDatas(item);
    } } }, [key === _vm.allSitesKey ? _c("v-icon", { staticClass: "mr-1", attrs: { "left": "" } }, [_vm._v("public")]) : [item.length > 0 ? _c("v-avatar", { staticClass: "mr-1" }, [_c("img", { staticStyle: { "width": "60%", "height": "60%" }, attrs: { "src": item[0].site.icon } })]) : _c("v-avatar", { staticClass: "mr-1" }, [_c("img", { staticStyle: { "width": "60%", "height": "60%" }, attrs: { "src": item.site.icon } })])], _c("span", [_vm._v(" " + _vm._s(key === _vm.allSitesKey ? _vm.$t("searchTorrent.allSites") : key) + " ")]), _c("v-chip", { staticClass: "ml-2 py-3", staticStyle: { "margin-right": "-13px" }, attrs: { "label": "", "color": item.length ? "blue-grey" : "grey", "small": "", "text-color": "white", "disabled": "" } }, [_c("span", [_vm._v(_vm._s(item.length || item.msg))])])], 2)];
  })], 2) : _vm._e(), _vm.searchResult.noResultsSites.length > 0 && _vm.showNoResultsSites ? _c("div", [_vm._l(_vm.searchResult.noResultsSites, function(item, index) {
    return [_c("v-chip", { key: index, staticClass: "mr-1 py-3 pl-1", attrs: { "label": "", "color": "grey darken-1", "text-color": "white", "small": "", "disabled": "" } }, [[_c("v-avatar", { staticClass: "mr-1" }, [_c("img", { staticStyle: { "width": "60%", "height": "60%" }, attrs: { "src": item.site.icon } })])], item.site.activeURL || item.site.url ? _c("a", { attrs: { "href": item.site.activeURL || item.site.url, "rel": "noopener noreferrer nofollow", "target": "_blank" } }, [_vm._v(_vm._s(item.site.name))]) : _c("span", [_vm._v(_vm._s(item.site.name))]), _c("v-chip", { staticClass: "ml-2 py-3 chip-compact", staticStyle: { "margin-right": "-13px" }, attrs: { "label": "", "color": "grey", "small": "", "text-color": "white", "disabled": "" } }, [_c("span", [_vm._v(_vm._s(item.msg))]), _c("v-btn", { attrs: { "flat": "", "icon": "", "small": "", "color": "grey lighten-2", "title": _vm.$t("searchTorrent.reSearch") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.reSearchWithSite(item.site.host);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("refresh")])], 1)], 1)], 2)];
  })], 2) : _vm._e(), _vm.searchResult.failedSites.length > 0 && _vm.showFailedSites ? _c("div", [_vm._l(_vm.searchResult.failedSites, function(item, index) {
    return [_c("v-chip", { key: index, staticClass: "mr-1 py-3 pl-1", attrs: { "label": "", "color": "orange darken-3", "text-color": "white", "small": "", "disabled": "" } }, [[_c("v-avatar", { staticClass: "mr-1" }, [_c("img", { staticStyle: { "width": "60%", "height": "60%" }, attrs: { "src": item.site.icon } })])], _c("span", [_vm._v(_vm._s(item.site.name))]), _c("v-chip", { staticClass: "ml-2 py-3", staticStyle: { "margin-right": "-13px" }, attrs: { "label": "", "color": item.color, "small": "", "text-color": "white", "disabled": "" } }, [item.url ? _c("a", { attrs: { "href": item.url, "rel": "noopener noreferrer nofollow", "target": "_blank" } }, [_vm._v(_vm._s(item.msg))]) : _vm._e(), !item.url ? _c("span", [_vm._v(_vm._s(item.msg))]) : _vm._e(), _c("v-btn", { attrs: { "flat": "", "icon": "", "small": "", "color": "grey lighten-2", "title": _vm.$t("searchTorrent.reSearch") }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.reSearchWithSite(item.site.host);
    } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("refresh")])], 1)], 1)], 2)];
  })], 2) : _vm._e()]), _c("v-flex", { attrs: { "xs6": "" } }, [_c("div", { staticClass: "mt-1" }, [_vm._l(_vm.searchResult.tags, function(item, key) {
    return [_c("v-chip", { key, staticClass: "mr-1 pl-0", attrs: { "label": "", "color": item.tag.color, "text-color": "white", "small": "" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.resetDatas(item.items);
    } } }, [_c("span", [_vm._v(_vm._s(key))]), _c("v-chip", { staticClass: "ml-2", staticStyle: { "margin-right": "-13px" }, attrs: { "label": "", "color": "blue-grey", "small": "", "text-color": "white", "disabled": "" } }, [_c("span", [_vm._v(_vm._s(item.items.length))])])], 1)];
  })], 2), _vm.showCategory ? _c("div", { staticClass: "mt-1" }, [_vm._l(_vm.searchResult.categories, function(item, key) {
    return [_c("v-chip", { key, staticClass: "mr-1 pl-0", attrs: { "label": "", "color": "grey darken-1", "text-color": "white", "small": "" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.resetDatas(item.items);
    } } }, [_c("span", [_vm._v(_vm._s(key))]), _c("v-chip", { staticClass: "ml-2", staticStyle: { "margin-right": "-13px" }, attrs: { "label": "", "color": "grey", "small": "", "text-color": "white", "disabled": "" } }, [_c("span", [_vm._v(_vm._s(item.items.length))])])], 1)];
  })], 2) : _vm._e()]), _c("v-flex", { attrs: { "xs6": "" } }, [_c("div", [_c("v-text-field", { attrs: { "append-icon": "search", "label": _vm.$t("searchTorrent.filterSearchResults"), "single-line": "", "hide-details": "", "enterkeyhint": "search" }, model: { value: _vm.filterKey, callback: function($$v) {
    _vm.filterKey = $$v;
  }, expression: "filterKey" } }), _c("v-text-field", { attrs: { "append-icon": "block", "label": _vm.$t("searchTorrent.filterSearchResultsExclude"), "single-line": "", "hide-details": "", "enterkeyhint": "search" }, model: { value: _vm.filterKeyExclude, callback: function($$v) {
    _vm.filterKeyExclude = $$v;
  }, expression: "filterKeyExclude" } })], 1)])], 1), _c("div", { ref: "divToolbar", attrs: { "id": "divToolbar" } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.toolbarIsFixed, expression: "toolbarIsFixed" }], attrs: { "id": "divToobarHeight" } }), _c("div", { class: _vm.toolbarClass, attrs: { "id": "divToobarInner" } }, [_vm.$vuetify.breakpoint.smAndDown ? _c("div", { staticStyle: { "display": "inline-flex" } }, [_c("v-flex", { staticClass: "px-2", staticStyle: { "height": "50px" }, attrs: { "xs6": "" } }, [_c("v-select", { attrs: { "items": _vm.orderHeaders, "label": _vm.$t("common.orderBy") }, model: { value: _vm.pagination.sortBy, callback: function($$v) {
    _vm.$set(_vm.pagination, "sortBy", $$v);
  }, expression: "pagination.sortBy" } })], 1), _c("v-flex", { staticClass: "px-0", staticStyle: { "height": "50px" }, attrs: { "xs6": "" } }, [_c("v-radio-group", { attrs: { "row": "" }, model: { value: _vm.currentOrderMode, callback: function($$v) {
    _vm.currentOrderMode = $$v;
  }, expression: "currentOrderMode" } }, _vm._l(_vm.orderMode, function(item, index) {
    return _c("v-radio", { key: index, staticClass: "mr-2", attrs: { "label": item.text, "value": item.value } });
  }), 1)], 1)], 1) : _vm._e(), _c("div", { staticStyle: { "display": "inline-flex", "overflow-x": "auto", "width": "100%", "overflow-y": "hidden" } }, [_c("v-checkbox", { directives: [{ name: "show", rawName: "v-show", value: _vm.checkBox && _vm.toolbarIsFixed, expression: "checkBox && toolbarIsFixed" }], staticStyle: { "margin": "8px 0 0 3px", "padding": "0", "height": "32px", "flex": "unset" }, attrs: { "indeterminate": _vm.indeterminate, "value": _vm.selected.length > 0 && _vm.selected.length == _vm.datas.length }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.toggleAll.apply(null, arguments);
  } } }), _vm.selected.length > 0 ? [_c("v-btn", { class: _vm.$vuetify.breakpoint.smAndUp ? "" : "mini", attrs: { "disabled": _vm.selected.length == 0, "color": "success", "small": "", "title": _vm.$t("searchTorrent.sendToClientTip") }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.showAllContentMenus($event);
  } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("cloud_download")]), _vm.$vuetify.breakpoint.smAndUp ? _c("span", { staticClass: "ml-2" }, [_vm._v(" " + _vm._s(_vm.$t("searchTorrent.sendToClient")) + " (" + _vm._s(_vm.selected.length) + ") ")]) : _c("span", { staticClass: "ml-2" }, [_vm._v(_vm._s(_vm.selected.length))]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm._f("formatSize")(_vm.selectedSize)))])], 1), _vm.sending.count > 0 ? _c("v-progress-circular", { attrs: { "rotate": -90, "size": 60, "width": 10, "value": _vm.sending.progress, "color": "primary" } }, [_vm._v(_vm._s(_vm.sending.progress.toFixed(0)) + "%")]) : _vm._e(), _c("v-btn", { class: _vm.$vuetify.breakpoint.smAndUp ? "" : "mini", attrs: { "disabled": _vm.selected.length == 0, "color": "success", "small": "", "title": _vm.$t("searchTorrent.copyToClipboardTip") }, on: { "click": function($event) {
    return _vm.copySelectedToClipboard();
  } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("file_copy")]), _vm.$vuetify.breakpoint.smAndUp ? _c("span", { staticClass: "ml-2" }, [_vm._v(" " + _vm._s(_vm.$t("searchTorrent.copyToClipboard")) + " (" + _vm._s(_vm.selected.length) + ") ")]) : _c("span", { staticClass: "ml-2" }, [_vm._v(_vm._s(_vm.selected.length))])], 1), _vm.$vuetify.breakpoint.mdAndUp ? _c("v-btn", { attrs: { "disabled": _vm.selected.length == 0, "color": "success", "small": "", "title": _vm.$t("searchTorrent.saveTip") }, on: { "click": _vm.downloadSelected } }, [_c("v-icon", { staticClass: "mr-2", attrs: { "small": "" } }, [_vm._v("save")]), _vm._v(" " + _vm._s(_vm.$t("searchTorrent.save")) + " (" + _vm._s(_vm.selected.length) + ") ")], 1) : _vm._e(), _vm.downloading.count > 0 ? _c("v-progress-circular", { attrs: { "rotate": -90, "size": 60, "width": 10, "value": _vm.downloading.progress, "color": "primary" } }, [_vm._v(_vm._s(_vm.downloading.progress.toFixed(0)) + "%")]) : _vm._e(), _vm.downloadFailedTorrents.length > 0 ? _c("v-btn", { staticClass: "error", attrs: { "small": "", "title": _vm.$t("searchTorrent.downloadFailed"), "loading": _vm.downloading.count > 0 }, on: { "click": _vm.reDownloadFailedTorrents } }, [_c("v-icon", { staticClass: "mr-2", attrs: { "small": "" } }, [_vm._v("get_app")]), _vm._v(" " + _vm._s(_vm.$t("searchTorrent.downloadFailed")) + " (" + _vm._s(_vm.downloadFailedTorrents.length) + ") ")], 1) : _vm._e(), _c("AddToCollectionGroup", { attrs: { "disabled": _vm.selected.length == 0, "label": _vm.$vuetify.breakpoint.smAndUp ? _vm.$t("searchTorrent.collection") + ` (${_vm.selected.length})` : _vm.selected.length, "small": "" }, on: { "add": _vm.addSelectedToCollection } }), _c("KeepUpload", { attrs: { "items": _vm.selected, "label": _vm.$vuetify.breakpoint.smAndUp ? `${_vm.$t("keepUploadTask.keepUpload")} (${_vm.selected.length})` : _vm.selected.length, "color": "success" } })] : _vm._e(), _vm.$store.state.options.allowSaveSnapshot ? _c("v-btn", { class: _vm.$vuetify.breakpoint.smAndUp ? "" : "mini", attrs: { "loading": _vm.loading, "color": "cyan", "small": "", "dark": "", "title": _vm.$t("searchResultSnapshot.create") }, on: { "click": function($event) {
    $event.stopPropagation();
    return _vm.createSearchResultSnapshot();
  } } }, [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("add_a_photo")]), _vm.$vuetify.breakpoint.smAndUp ? _c("span", { staticClass: "ml-2" }, [_vm._v(" " + _vm._s(_vm.$t("searchResultSnapshot.create")) + " ")]) : _vm._e()], 1) : _vm._e(), _c("v-menu", { staticClass: "ml-2", attrs: { "close-on-content-click": false, "offset-y": "" }, scopedSlots: _vm._u([{ key: "activator", fn: function({ on }) {
    return [_c("v-btn", _vm._g({ class: _vm.$vuetify.breakpoint.smAndUp ? "" : "mini", attrs: { "color": "blue", "dark": "", "title": _vm.$t("home.settings"), "small": "" } }, on), [_c("v-icon", { attrs: { "small": "" } }, [_vm._v("settings")])], 1)];
  } }]) }, [_c("v-card", [_c("v-container", { attrs: { "grid-list-xs": "" } }, [_c("v-switch", { attrs: { "color": "success", "label": _vm.$t("searchTorrent.showCheckbox") }, on: { "change": _vm.updateViewOptions }, model: { value: _vm.checkBox, callback: function($$v) {
    _vm.checkBox = $$v;
  }, expression: "checkBox" } }), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("searchTorrent.showCategory") }, on: { "change": _vm.updateViewOptions }, model: { value: _vm.showCategory, callback: function($$v) {
    _vm.showCategory = $$v;
  }, expression: "showCategory" } }), _c("v-switch", { attrs: { "color": "success", "label": _vm.$t("searchTorrent.titleMiddleEllipsis") }, on: { "change": _vm.updateViewOptions }, model: { value: _vm.titleMiddleEllipsis, callback: function($$v) {
    _vm.titleMiddleEllipsis = $$v;
  }, expression: "titleMiddleEllipsis" } })], 1)], 1)], 1)], 2)])]), _c("v-data-table", { class: "torrent" + (_vm.fixedTable ? " fixed-table fixed-header v-table__overflow" : ""), attrs: { "search": _vm.filterKey + "<@>" + _vm.filterKeyExclude, "custom-filter": _vm.searchResultFilter, "headers": _vm.headers, "items": _vm.datas, "pagination": _vm.pagination, "loading": _vm.loading, "item-key": "link", "select-all": _vm.checkBox, "rows-per-page-items": _vm.options.rowsPerPageItems }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "headers", fn: function(props) {
    return [_c("tr", [_vm.checkBox ? _c("th", [_c("v-checkbox", { attrs: { "input-value": props.all, "indeterminate": props.indeterminate, "primary": "", "hide-details": "" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.toggleAll.apply(null, arguments);
    } } })], 1) : _vm._e(), _vm._l(props.headers, function(header) {
      return [header.visible ? _c("th", { key: header.text, class: _vm.getHeaderClass(header), style: header.width ? `width:${header.width};` : "", on: { "click": function($event) {
        header.sortable !== false && _vm.changeSort(header.value);
      } } }, [header.sortable !== false ? _c("v-icon", { attrs: { "small": "" } }, [_vm._v("arrow_upward")]) : _vm._e(), _vm._v(" " + _vm._s(header.text) + " ")], 1) : _vm._e()];
    })], 2)];
  } }, { key: "items", fn: function(props) {
    return [_vm.checkBox ? _c("td", [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, on: { "change": function($event) {
      return _vm.shiftCheck($event, props.index);
    } }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1) : _vm._e(), _vm.$vuetify.breakpoint.mdAndUp ? _c("td", { staticClass: "center" }, [_c("v-avatar", { attrs: { "size": "18" } }, [_c("img", { attrs: { "src": props.item.site.icon } })]), _vm.$vuetify.breakpoint.width > 1200 ? [_c("br"), _c("a", { staticClass: "captionText", attrs: { "href": props.item.site.activeURL || props.item.site.url, "target": "_blank", "rel": "noopener noreferrer nofollow" }, domProps: { "innerHTML": _vm._s(props.item.site.name) } })] : _vm._e()], 2) : _vm._e(), _c("td", { class: _vm.$vuetify.breakpoint.xs ? "titleCell-mobile" : "titleCell" }, [_vm.$vuetify.breakpoint.smAndDown ? _c("v-avatar", { staticClass: "mr-1", staticStyle: { "vertical-align": "unset" }, attrs: { "size": "14" } }, [_c("img", { attrs: { "src": props.item.site.icon } })]) : _vm._e(), _vm.titleMiddleEllipsis && !_vm.$vuetify.breakpoint.xs ? _c("div", { staticClass: "titleWrap" }, [_c("a", { class: [
      _vm.$vuetify.breakpoint.xs ? "body-2" : "subheading titleFull",
      "font-weight-medium"
    ], attrs: { "href": props.item.link, "target": "_blank", "title": props.item.title, "rel": "noopener noreferrer nofollow" }, domProps: { "innerHTML": _vm._s(props.item.titleHTML) } }), _c("a", { class: [
      _vm.$vuetify.breakpoint.xs ? "body-2" : "subheading titleEllipsisMiddle",
      "font-weight-medium"
    ], attrs: { "href": props.item.link, "target": "_blank", "title": "·title:" + props.item.title, "rel": "noopener noreferrer nofollow" }, domProps: { "innerHTML": _vm._s(props.item.titleHTML) } })]) : _c("a", { class: [
      _vm.$vuetify.breakpoint.xs ? "body-2" : "subheading",
      "font-weight-medium"
    ], attrs: { "href": props.item.link, "target": "_blank", "title": props.item.title, "rel": "noopener noreferrer nofollow" }, domProps: { "innerHTML": _vm._s(props.item.titleHTML) } }), props.item.tags && props.item.tags.length || props.item.subTitle ? _c("div", { staticClass: "sub-title captionText" }, [props.item.tags && props.item.tags.length ? _c("span", { staticClass: "mr-1" }, _vm._l(props.item.tags, function(tag, index) {
      return _c("span", { key: index, class: ["tag", `${tag.color}`], style: { "background-color": `${tag.color}`, "border-color": `${tag.color}` }, attrs: { "title": tag.title } }, [_vm._v(_vm._s(tag.name))]);
    }), 0) : _vm._e(), props.item.subTitle ? _c("span", { attrs: { "title": props.item.subTitle } }, [_vm._v(_vm._s(props.item.subTitle))]) : _vm._e()]) : _vm._e(), _vm.$vuetify.breakpoint.xs ? _c("v-layout", [_c("v-flex", { staticClass: "pt-2 captionText", attrs: { "xs3": "" } }, [_vm._v(" " + _vm._s(_vm._f("formatSize")(props.item.size)) + " ")]), _c("v-flex", { staticClass: "pt-2 captionText", attrs: { "xs3": "" } }, [_c("v-icon", { staticStyle: { "font-size": "12px", "margin-bottom": "2px" } }, [_vm._v("arrow_upward")]), _vm._v(" " + _vm._s(props.item.seeders) + " "), _c("v-icon", { staticStyle: { "font-size": "12px", "margin-bottom": "2px" } }, [_vm._v("arrow_downward")]), _vm._v(" " + _vm._s(props.item.leechers) + " ")], 1), _c("v-flex", { attrs: { "xs3": "" } }, [props.item.progress != null ? _c("TorrentProgress", { staticClass: "progress", staticStyle: { "position": "unset", "padding-top": "2px" }, attrs: { "progress": parseInt(props.item.progress), "status": props.item.status } }) : _vm._e()], 1), _c("v-flex", { attrs: { "xs3": "" } }, [_vm.$vuetify.breakpoint.xs ? _c("Actions", { attrs: { "url": props.item.url, "downloadMethod": props.item.site.downloadMethod, "isCollectioned": _vm.isCollectioned(props.item.link), "item": props.item }, on: { "copyLinkToClipboard": function($event) {
      return _vm.copyLinkToClipboard(props.item);
    }, "saveTorrentFile": function($event) {
      return _vm.saveTorrentFile(props.item);
    }, "addToCollection": function($event) {
      return _vm.addToCollection(props.item);
    }, "deleteCollection": function($event) {
      return _vm.deleteCollection(props.item);
    }, "downloadSuccess": _vm.downloadSuccess, "downloadError": _vm.downloadError } }) : _vm._e()], 1)], 1) : _vm._e()], 1), _vm.$vuetify.breakpoint.width > 1200 ? _c("td", { staticClass: "category center" }, [props.item.category && !!props.item.category.name ? _c("span", { staticClass: "captionText", attrs: { "title": props.item.category.name } }, [_vm._v(_vm._s(props.item.category.name))]) : _vm._e(), _c("br"), _c("span", { staticClass: "captionText" }, [_vm._v("<" + _vm._s(props.item.entryName) + ">")])]) : _vm._e(), _vm.$vuetify.breakpoint.smAndUp ? _c("td", { staticClass: "size" }, [_vm._v(" " + _vm._s(_vm._f("formatSize")(props.item.size)) + " "), props.item.progress != null ? _c("TorrentProgress", { staticClass: "progress", attrs: { "progress": parseInt(props.item.progress), "status": props.item.status } }) : _vm._e()], 1) : _vm._e(), _vm.$vuetify.breakpoint.smAndUp ? _c("td", { staticClass: "size" }, [_vm._v(_vm._s(props.item.seeders))]) : _vm._e(), _vm.$vuetify.breakpoint.mdAndUp ? _c("td", { staticClass: "size" }, [_vm._v(_vm._s(props.item.leechers))]) : _vm._e(), _vm.$vuetify.breakpoint.mdAndUp ? _c("td", { staticClass: "size" }, [_vm._v(_vm._s(props.item.completed))]) : _vm._e(), _vm.$vuetify.breakpoint.smAndUp ? _c("td", { staticClass: "size" }, [_vm._v(_vm._s(props.item.comments))]) : _vm._e(), _vm.$vuetify.breakpoint.mdAndUp ? _c("td", [_vm._v(_vm._s(_vm._f("formatDate")(props.item.time)))]) : _vm._e(), _vm.$vuetify.breakpoint.smAndUp ? _c("td", { staticClass: "text-xs-center" }, [!!props.item.url ? [_c("Actions", { attrs: { "url": props.item.url, "downloadMethod": props.item.site.downloadMethod, "isCollectioned": _vm.isCollectioned(props.item.link), "item": props.item }, on: { "copyLinkToClipboard": function($event) {
      return _vm.copyLinkToClipboard(props.item);
    }, "saveTorrentFile": function($event) {
      return _vm.saveTorrentFile(props.item);
    }, "addToCollection": function($event) {
      return _vm.addToCollection(props.item);
    }, "deleteCollection": function($event) {
      return _vm.deleteCollection(props.item);
    }, "downloadSuccess": _vm.downloadSuccess, "downloadError": _vm.downloadError } })] : _c("span", [_vm._v(_vm._s(_vm.$t("searchTorrent.failUrl")))])], 2) : _vm._e()];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "multi-line": "", "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
    _vm.haveError = $$v;
  }, expression: "haveError" } }, [_c("div", { domProps: { "innerHTML": _vm._s(_vm.errorMsg) } })]), _c("v-snackbar", { attrs: { "bottom": "", "timeout": 3e3, "multi-line": "", "color": "success" }, model: { value: _vm.haveSuccess, callback: function($$v) {
    _vm.haveSuccess = $$v;
  }, expression: "haveSuccess" } }, [_c("div", { domProps: { "innerHTML": _vm._s(_vm.successMsg) } })])], 1);
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
const SearchTorrent = __component__.exports;
export {
  SearchTorrent as default
};
