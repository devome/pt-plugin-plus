import { V as Vue, n as normalizeComponent } from "./index-FN6Cy8H5.js";
const name = "pt-plugin-plus";
const version = "1.6.1";
const packageManager = "yarn@1.22.22";
const type = "module";
const author = {
  name: "ronggang",
  url: "https://github.com/ronggang"
};
const archiverName = "PT-Plugin-Plus";
const displayName = "PT 助手 Plus";
const homepage = "https://github.com/pt-plugins/PT-Plugin-Plus";
const scripts = {
  lint: "eslint ./src/ --ext ts,vue,js",
  build: "yarn build:index && yarn build:content && yarn build:background",
  "dev:index": "vite build --watch",
  "dev:background": "yarn build:background -- --mode development",
  "dev:content": "yarn build:content -- --mode development",
  "build:index": "vite build",
  "build:background": "vite build --config vite.config.background.ts",
  "build:content": "vite build --config vite.config.content.ts"
};
const dependencies$1 = {
  basiccontext: "^3.5.1",
  "caniuse-lite": "^1.0.30001612",
  "crypto-js": "^4.2.0",
  dayjs: "^1.11.5",
  "dom-to-image": "^2.6.0",
  dotenv: "^8.2.0",
  extend: "^3.0.2",
  "file-saver": "^2.0.5",
  highcharts: "^10.2.1",
  "highcharts-vue": "^1.4.0",
  i18next: "^21.9.1",
  jszip: "^3.10.1",
  "parse-torrent": "^11.0.16",
  "ua-parser-js": "^1.0.2",
  "url-parse": "^1.5.10",
  "simple-mind-map": "^0.12.1",
  "simple-mind-map-plugin-themes": "^1.0.0",
  roughjs: "^4.6.6",
  vue: "~2.7.0",
  "vue-class-component": "^6.3.2",
  "vue-i18n": "^8.11.2",
  "vue-property-decorator": "^7.0.0",
  "vue-router": "~3.5.4",
  vuetify: "^1.3.0",
  vuex: "^3.0.1",
  webdav: "^5.6.0"
};
const devDependencies = {
  "@types/blueimp-md5": "^2.18.0",
  "@types/chrome": "^0.0.75",
  "@types/crypto-js": "^3.1.43",
  "@types/dom-to-image": "^2.6.4",
  "@types/extend": "^3.0.1",
  "@types/file-saver": "^2.0.5",
  "@types/jquery": "^3.5.14",
  "@types/node": "20",
  "@types/parse-torrent": "^5.8.7",
  "@types/ua-parser-js": "^0.7.36",
  "@types/url-parse": "^1.4.8",
  "@typescript-eslint/eslint-plugin": "^7.7.1",
  "@typescript-eslint/parser": "^7.7.1",
  "@vitejs/plugin-vue2": "^2.3.1",
  "@vue/eslint-config-typescript": "^13.0.0",
  eslint: "^8.57.0",
  "eslint-plugin-vue": "^9.25.0",
  "git-rev-sync": "^3.0.2",
  sass: "^1.75.0",
  "sass-loader": "^14.2.1",
  typescript: "^5.4.5",
  vite: "^5.2.10",
  "vite-plugin-node-polyfills": "^0.21.0",
  "vue-template-compiler": "~2.7.0"
};
const browserslist = [
  "> 1%",
  "last 2 versions",
  "not ie <= 8"
];
const _package = {
  name,
  version,
  packageManager,
  type,
  author,
  archiverName,
  displayName,
  homepage,
  scripts,
  dependencies: dependencies$1,
  devDependencies,
  browserslist
};
const dependencies = Object.entries(dependencies$1).map((value) => {
  const [name2, version2] = value;
  return {
    name: name2,
    ver: version2,
    url: `https://www.npmjs.com/package/${name2}`
  };
});
const _sfc_main = Vue.extend({
  data() {
    return {
      pagination: {
        rowsPerPage: -1
      },
      items: [
        ...dependencies,
        // 其他一些不属于NPM依赖的参考项目
        {
          name: "PT-Plugin Rhilip修改版",
          ver: "0.0.9",
          url: "https://github.com/Rhilip/PT-Plugin"
        },
        {
          name: "Jackett",
          ver: "latest",
          url: "https://github.com/Jackett/Jackett"
        }
      ]
    };
  },
  created() {
    const cacheDependMetaData = JSON.parse(localStorage.getItem("depend-metadata") || "{}");
    setTimeout(async () => {
      for (let i = 0; i < this.items.length; i++) {
        let { name: name2, url } = this.items[i];
        if (url.match(/npmjs/)) {
          if (cacheDependMetaData[name2]) {
            url = cacheDependMetaData[name2];
          } else {
            try {
              const req = await fetch(`https://registry.npmmirror.com/${name2}`);
              const data = await req.json();
              if (data == null ? void 0 : data.homepage) {
                url = cacheDependMetaData[name2] = data == null ? void 0 : data.homepage;
              }
            } catch (e) {
            }
          }
          this.items[i].url = url;
        }
      }
      localStorage.setItem("depend-metadata", JSON.stringify(cacheDependMetaData));
    }, 1e3);
  },
  computed: {
    headers() {
      return [
        { text: this.$t("reference.headers.name"), align: "left", value: "name" },
        { text: this.$t("reference.headers.ver"), align: "left", value: "ver" },
        { text: this.$t("reference.headers.url"), align: "left", value: "url" }
      ];
    }
  }
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("reference.title")))]), _c("v-card", [_c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": _vm.items, "pagination": _vm.pagination, "hide-actions": "", "item-key": "name" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", [_vm._v(_vm._s(props.item.name))]), _c("td", [_vm._v(_vm._s(props.item.ver))]), _c("td", [_c("a", { attrs: { "href": props.item.url, "rel": "noopener noreferrer nofollow", "target": "_blank" } }, [_vm._v(_vm._s(props.item.url))])])];
  } }]) })], 1), _c("v-alert", { attrs: { "value": true, "color": "grey" } }, [_vm._v(_vm._s(_vm.$t("reference.thanks")))])], 1);
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
const TechnologyStack = __component__.exports;
export {
  TechnologyStack as default
};
