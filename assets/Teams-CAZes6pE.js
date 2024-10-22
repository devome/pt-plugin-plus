import { V as Vue, n as normalizeComponent } from "./index-PaG3smOx.js";
const _sfc_main = Vue.extend({
  data() {
    return {
      items: [
        "Rhilip (R酱)",
        "bimzcy (白鸽男孩)",
        "DXV5 (贝壳)",
        "An",
        "Abel袁",
        "Мало",
        "tongyifan (杯杯杯杯具)",
        "the chosen one (三哥)",
        "橙子",
        "frank777777777 (杀死那个异教徒)"
      ]
    };
  },
  computed: {
    peoples() {
      return this.items.sort();
    }
  }
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.$t("team.title")))]), _c("v-card", _vm._l(_vm.peoples, function(item, index) {
    return _c("div", { key: index }, [_c("v-avatar", [_c("v-icon", [_vm._v("account_circle")])], 1), _vm._v(" " + _vm._s(item) + " "), _c("v-divider", { key: index })], 1);
  }), 0), _c("v-alert", { attrs: { "value": true, "color": "grey" } }, [_vm._v(" 在项目的开发和测试中，他们给予了很多帮助和支持（或开发，或测试，或发💊，或建议，或鼓励，或鞭策），在此表示感谢。 "), _c("br"), _vm._v("列表中未能一一列出所有给予帮助的同学，也对他们表示感谢，如有遗漏敬请谅解。 "), _c("br"), _vm._v("同时一并感谢这些 "), _c("br"), _vm._v(" " + _vm._s(_vm.$t("team.contributors")) + " "), _c("a", { attrs: { "target": "_blank", "rel": "noopener noreferrer nofollow", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/graphs/contributors" } }, [_vm._v("https://github.com/pt-plugins/PT-Plugin-Plus/graphs/contributors")]), _c("br"), _vm._v(" " + _vm._s(_vm.$t("team.issues")) + " "), _c("a", { attrs: { "target": "_blank", "rel": "noopener noreferrer nofollow", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/issues" } }, [_vm._v("https://github.com/pt-plugins/PT-Plugin-Plus/issues")])])], 1);
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
const Teams = __component__.exports;
export {
  Teams as default
};
