import { V as Vue, n as normalizeComponent } from "./index-Ca5-5hzk.js";
const _sfc_main = Vue.extend({
  data() {
    return {
      headers: [
        { text: "名称", align: "left", value: "name" },
        { text: "版本", align: "left", value: "ver" },
        { text: "插件", align: "left", value: "plugins" }
      ],
      items: []
    };
  },
  created() {
    this.items = this.$store.state.options.system.schemas;
  },
  methods: {
    showPlugins(plugins) {
      let items = [];
      plugins.forEach((item) => {
        items.push(item.name);
      });
      return items.join(", ");
    },
    update() {
    }
  },
  computed: {}
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "set-support-schema" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v("已支持的网站架构")]), _c("v-card", [_c("v-card-title", [_c("v-btn", { attrs: { "color": "success" }, on: { "click": _vm.update } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("autorenew")]), _vm._v("更新 ")], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": _vm.items, "item-key": "name" }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", [_vm._v(_vm._s(props.item.name))]), _c("td", [_vm._v(_vm._s(props.item.ver))]), _c("td", [_vm._v(_vm._s(_vm.showPlugins(props.item.plugins)))])];
  } }]) })], 1)], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "a0f27c12",
  null,
  null
);
const SupportSchema = __component__.exports;
export {
  SupportSchema as default
};
