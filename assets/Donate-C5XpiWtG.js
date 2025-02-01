import { V as Vue, n as normalizeComponent } from "./index-DzMzv318.js";
const _sfc_main = Vue.extend({
  data() {
    return {
      words: {
        title: "感谢您的关注和支持"
      }
    };
  }
});
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_vm._v(_vm._s(_vm.words.title))]), _c("v-card", [_c("v-card-title", { attrs: { "primary-title": "" } }, [_c("div", [_c("div", [_vm._v("本项目由作者在业余时间完成，如果您喜欢本项目，可以通过捐助来支持作者继续开发。")]), _c("div", { staticClass: "mt-3" }, [_vm._v("支付宝和微信")]), _c("v-img", { attrs: { "src": "./assets/donate.png", "max-width": "300" } }), _c("div", { staticClass: "mt-3" }, [_vm._v("This project is completed by the author in his spare time. You can support the author's continued development through donations.")])], 1)]), _c("v-card-actions", [_c("v-btn", { attrs: { "flat": "", "color": "orange", "href": "https://www.paypal.me/ronggang", "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-icon", [_vm._v("attach_money")]), _vm._v("Paypal ")], 1)], 1)], 1)], 1);
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
const Donate = __component__.exports;
export {
  Donate as default
};
