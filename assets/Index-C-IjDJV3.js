import { V as Vue, n as normalizeComponent, E as Extension, f as filters, a as EAction, b as EModule, F as FileSaver, P as PPF } from "./index-DeSL2t4p.js";
const _sfc_main$4 = Vue.extend({
  data() {
    return {
      showPasskey: false,
      rules: {
        require: [(v) => !!v || "!"],
        url: (v) => {
          return /^(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(
            v
          ) || this.$t("settings.sites.editor.urlTip");
        }
      },
      cdn: "",
      quickLinkText: "",
      valid: false,
      site: {},
      timezone: [
        {
          value: "-1200",
          text: "(UTC -12:00) Enitwetok, Kwajalien"
        },
        {
          value: "-1100",
          text: "(UTC -11:00) Midway Island, Samoa"
        },
        {
          value: "-1000",
          text: "(UTC -10:00) Hawaii"
        },
        {
          value: "-0900",
          text: "(UTC -09:00) Alaska"
        },
        {
          value: "-0800",
          text: "(UTC -08:00) Pacific Time (US & Canada)"
        },
        {
          value: "-0700",
          text: "(UTC -07:00) Mountain Time (US & Canada)"
        },
        {
          value: "-0600",
          text: "(UTC -06:00) Central Time (US & Canada), Mexico City"
        },
        {
          value: "-0500",
          text: "(UTC -05:00) Eastern Time (US & Canada), Bogota, Lima"
        },
        {
          value: "-0400",
          text: "(UTC -04:00) Atlantic Time (Canada), Caracas, La Paz"
        },
        {
          value: "-0330",
          text: "(UTC -03:30) Newfoundland"
        },
        {
          value: "-0300",
          text: "(UTC -03:00) Brazil, Buenos Aires, Falkland Is."
        },
        {
          value: "-0200",
          text: "(UTC -02:00) Mid-Atlantic, Ascention Is., St Helena"
        },
        {
          value: "-0100",
          text: "(UTC -01:00) Azores, Cape Verde Islands"
        },
        {
          value: "+0000",
          text: "(UTC ±00:00) Casablanca, Dublin, London, Lisbon, Monrovia"
        },
        {
          value: "+0100",
          text: "(UTC +01:00) Brussels, Copenhagen, Madrid, Paris"
        },
        {
          value: "+0200",
          text: "(UTC +02:00) Sofia, Izrael, South Africa,"
        },
        {
          value: "+0300",
          text: "(UTC +03:00) Baghdad, Riyadh, Moscow, Nairobi"
        },
        {
          value: "+0330",
          text: "(UTC +03:30) Tehran"
        },
        {
          value: "+0400",
          text: "(UTC +04:00) Abu Dhabi, Baku, Muscat, Tbilisi"
        },
        {
          value: "+0430",
          text: "(UTC +04:30) Kabul"
        },
        {
          value: "+0500",
          text: "(UTC +05:00) Ekaterinburg, Karachi, Tashkent"
        },
        {
          value: "+0530",
          text: "(UTC +05:30) Bombay, Calcutta, Madras, New Delhi"
        },
        {
          value: "+0600",
          text: "(UTC +06:00) Almaty, Colomba, Dhakra"
        },
        {
          value: "+0700",
          text: "(UTC +07:00) Bangkok, Hanoi, Jakarta"
        },
        {
          value: "+0800",
          text: "(UTC +08:00) ShangHai, HongKong, Perth, Singapore, Taipei"
        },
        {
          value: "+0900",
          text: "(UTC +09:00) Osaka, Sapporo, Seoul, Tokyo, Yakutsk"
        },
        {
          value: "+0930",
          text: "(UTC +09:30) Adelaide, Darwin"
        },
        {
          value: "+1000",
          text: "(UTC +10:00) Melbourne, Papua New Guinea, Sydney"
        },
        {
          value: "+1100",
          text: "(UTC +11:00) Magadan, New Caledonia, Solomon Is."
        },
        {
          value: "+1200",
          text: "(UTC +12:00) Auckland, Fiji, Marshall Island"
        }
      ]
    };
  },
  props: {
    custom: Boolean,
    initData: {
      type: Object,
      default: () => ({
        valid: false
      })
    }
  },
  watch: {
    site: {
      handler() {
        if (this.site.cdn) {
          this.cdn = this.site.cdn.join("\n");
        } else {
          this.cdn = "";
        }
        if (this.site.userQuickLinks) {
          this.quickLinkText = this.site.userQuickLinks.map((u) => `${u.desc},${u.href},${u.color ? u.color : ""}`).join("\n");
        } else {
          this.quickLinkText = "";
        }
        this.$emit("change", {
          data: this.site,
          valid: this.valid
        });
      },
      deep: true
    },
    cdn() {
      let items = this.cdn.split("\n");
      let result = [];
      items.forEach((cdn) => {
        if (/(https?):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/.test(
          cdn
        )) {
          result.push(cdn);
        }
      });
      if (result.length > 0) {
        this.site.activeURL = result[0];
      } else {
        this.site.activeURL = this.site.url;
      }
      this.site.cdn = result;
    },
    quickLinkText() {
      this.site.userQuickLinks = this.quickLinkText.split(/\n/).filter((_) => !!_).map((_) => _.split(/\s*[,，]\s*/)).filter(([desc, href, color]) => {
        let b1 = !!desc && !!href;
        let b2 = true;
        try {
          new URL(href);
        } catch (e) {
          b2 = false;
        }
        return b1 && b2;
      }).map(([desc, href, color]) => ({ desc, href, color }));
    },
    initData() {
      if (this.initData) {
        this.site = Object.assign({}, this.initData);
        this.valid = this.site.name && this.site.host ? true : false;
      }
    }
  },
  computed: {
    getSchema() {
      let result = "";
      if (typeof this.site.schema === "string") {
        result = this.site.schema;
      } else if (this.site.schema && this.site.schema.name) {
        result = this.site.schema.name;
      }
      return result;
    }
  }
});
var _sfc_render$4 = function render() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-card", { staticClass: "mb-5", attrs: { "color": _vm.$vuetify.dark ? "" : "grey lighten-4" } }, [_c("v-card-text", [_c("v-form", { model: { value: _vm.valid, callback: function($$v) {
    _vm.valid = $$v;
  }, expression: "valid" } }, [_c("v-text-field", { ref: "name", attrs: { "label": _vm.$t("settings.sites.editor.name"), "placeholder": _vm.$t("settings.sites.editor.name"), "required": "", "rules": _vm.rules.require }, model: { value: _vm.site.name, callback: function($$v) {
    _vm.$set(_vm.site, "name", $$v);
  }, expression: "site.name" } }), _c("v-combobox", { attrs: { "hide-selected": "", "hint": _vm.$t("settings.sites.editor.inputTags"), "label": _vm.$t("settings.sites.editor.tags"), "multiple": "", "persistent-hint": "", "small-chips": "" }, model: { value: _vm.site.tags, callback: function($$v) {
    _vm.$set(_vm.site, "tags", $$v);
  }, expression: "site.tags" } }), !_vm.site.isCustom ? _c("v-text-field", { attrs: { "value": _vm.getSchema, "label": _vm.$t("settings.sites.editor.schema"), "disabled": "" } }) : _vm._e(), _vm.site.isCustom ? _c("v-autocomplete", { attrs: { "items": _vm.$store.state.options.system.schemas, "label": _vm.$t("settings.sites.editor.schema"), "menu-props": { maxHeight: "auto" }, "persistent-hint": "", "single-line": "", "item-text": "name", "item-value": "name" }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
    return [_c("span", { domProps: { "textContent": _vm._s(item.name) } })];
  } }, { key: "item", fn: function(data) {
    return [_c("v-list-tile-content", [_c("v-list-tile-title", { domProps: { "innerHTML": _vm._s(data.item.name) } })], 1), _c("v-list-tile-action", [_c("v-list-tile-action-text", [_vm._v(_vm._s(data.item.ver))])], 1)];
  } }], null, false, 2935589017), model: { value: _vm.site.schema, callback: function($$v) {
    _vm.$set(_vm.site, "schema", $$v);
  }, expression: "site.schema" } }) : _vm._e(), !_vm.site.securityKeys ? _c("v-text-field", { attrs: { "label": _vm.$t("settings.sites.editor.passkey"), "placeholder": _vm.$t("settings.sites.editor.passkeyTip"), "type": _vm.showPasskey ? "text" : "password", "append-icon": _vm.showPasskey ? "visibility_off" : "visibility" }, on: { "click:append": function($event) {
    _vm.showPasskey = !_vm.showPasskey;
  } }, model: { value: _vm.site.passkey, callback: function($$v) {
    _vm.$set(_vm.site, "passkey", $$v);
  }, expression: "site.passkey" } }) : _vm._l(_vm.site.securityKeys, function(value, key, index) {
    return _c("v-text-field", { key: index, attrs: { "label": key, "type": _vm.showPasskey ? "text" : "password", "append-icon": _vm.showPasskey ? "visibility_off" : "visibility" }, on: { "click:append": function($event) {
      _vm.showPasskey = !_vm.showPasskey;
    } }, model: { value: _vm.site.securityKeys[key], callback: function($$v) {
      _vm.$set(_vm.site.securityKeys, key, $$v);
    }, expression: "site.securityKeys[key]" } });
  }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.sites.editor.url"), "placeholder": _vm.$t("settings.sites.editor.urlTip"), "required": "", "rules": [_vm.rules.url], "disabled": !_vm.custom }, model: { value: _vm.site.url, callback: function($$v) {
    _vm.$set(_vm.site, "url", $$v);
  }, expression: "site.url" } }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.sites.editor.priority"), "placeholder": _vm.$t("settings.sites.editor.priorityTip"), "type": "number" }, model: { value: _vm.site.priority, callback: function($$v) {
    _vm.$set(_vm.site, "priority", $$v);
  }, expression: "site.priority" } }), _c("v-textarea", { attrs: { "label": _vm.$t("settings.sites.editor.cdn"), "value": "", "hint": _vm.$t("settings.sites.editor.cdnTip") }, model: { value: _vm.cdn, callback: function($$v) {
    _vm.cdn = $$v;
  }, expression: "cdn" } }), _c("v-autocomplete", { attrs: { "items": _vm.timezone, "label": _vm.$t("settings.sites.editor.timezone"), "persistent-hint": "", "item-text": "text", "item-value": "value" }, model: { value: _vm.site.timezoneOffset, callback: function($$v) {
    _vm.$set(_vm.site, "timezoneOffset", $$v);
  }, expression: "site.timezoneOffset" } }), _c("v-text-field", { attrs: { "label": _vm.$t("settings.sites.editor.description") }, model: { value: _vm.site.description, callback: function($$v) {
    _vm.$set(_vm.site, "description", $$v);
  }, expression: "site.description" } }), _c("v-autocomplete", { attrs: { "items": this.$store.state.options.clients, "label": _vm.$t("settings.sites.editor.defaultClient"), "menu-props": { maxHeight: "auto" }, "persistent-hint": "", "item-text": "name", "item-value": "id" }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
    return [_c("span", { domProps: { "textContent": _vm._s(item.name) } })];
  } }, { key: "item", fn: function(data) {
    return [_c("v-list-tile-content", [_c("v-list-tile-title", { domProps: { "innerHTML": _vm._s(data.item.name) } }), _c("v-list-tile-sub-title", { domProps: { "innerHTML": _vm._s(data.item.address) } })], 1), _c("v-list-tile-action", [_c("v-list-tile-action-text", [_vm._v(_vm._s(data.item.type))])], 1)];
  } }]), model: { value: _vm.site.defaultClientId, callback: function($$v) {
    _vm.$set(_vm.site, "defaultClientId", $$v);
  }, expression: "site.defaultClientId" } }), _c("v-text-field", { attrs: { "type": "number", "label": _vm.$t("settings.sites.editor.upLoadLimit"), "placeholder": _vm.$t("settings.sites.editor.upLoadLimitTip") }, model: { value: _vm.site.upLoadLimit, callback: function($$v) {
    _vm.$set(_vm.site, "upLoadLimit", $$v);
  }, expression: "site.upLoadLimit" } }), _c("v-text-field", { attrs: { "disabled": !_vm.site.tokenRequired, "rules": _vm.site.tokenRequired ? _vm.rules.require : [], "label": _vm.$t("settings.sites.editor.authToken"), "placeholder": _vm.$t("settings.sites.editor.authTokenTip") }, model: { value: _vm.site.authToken, callback: function($$v) {
    _vm.$set(_vm.site, "authToken", $$v);
  }, expression: "site.authToken" } }), _c("v-switch", { attrs: { "label": _vm.$t("settings.sites.editor.offline") }, model: { value: _vm.site.offline, callback: function($$v) {
    _vm.$set(_vm.site, "offline", $$v);
  }, expression: "site.offline" } }), _c("v-switch", { attrs: { "label": _vm.$t("settings.sites.editor.allowGetUserInfo"), "disabled": _vm.site.offline }, model: { value: _vm.site.allowGetUserInfo, callback: function($$v) {
    _vm.$set(_vm.site, "allowGetUserInfo", $$v);
  }, expression: "site.allowGetUserInfo" } }), _c("v-switch", { attrs: { "disabled": _vm.site.offline, "label": _vm.$t("settings.sites.editor.allowSearch") }, model: { value: _vm.site.allowSearch, callback: function($$v) {
    _vm.$set(_vm.site, "allowSearch", $$v);
  }, expression: "site.allowSearch" } }), _vm.site.allowSearch ? [_c("v-container", { staticClass: "ma-0 pa-0 ml-4", attrs: { "fluid": "" } }, [_c("v-layout", { staticClass: "ma-0 pa-0", attrs: { "row": "", "wrap": "" } }, _vm._l(_vm.site.searchEntry, function(item, key, index) {
    return _c("v-flex", { key: index, staticClass: "ma-0 pa-0", attrs: { "xs3": "" } }, [_c("v-checkbox", { staticClass: "ma-0 pa-0", attrs: { "disabled": !_vm.site.allowSearch || _vm.site.offline, "label": item.name }, model: { value: item.enabled, callback: function($$v) {
      _vm.$set(item, "enabled", $$v);
    }, expression: "item.enabled" } })], 1);
  }), 1)], 1)] : _vm._e(), _c("v-switch", { attrs: { "disabled": !_vm.site.allowSearch || _vm.site.offline, "label": _vm.$t("settings.sites.editor.disableSearchTransform") }, model: { value: _vm.site.disableSearchTransform, callback: function($$v) {
    _vm.$set(_vm.site, "disableSearchTransform", $$v);
  }, expression: "site.disableSearchTransform" } }), _c("v-switch", { attrs: { "label": _vm.$t("settings.sites.editor.disableMessageCount") }, model: { value: _vm.site.disableMessageCount, callback: function($$v) {
    _vm.$set(_vm.site, "disableMessageCount", $$v);
  }, expression: "site.disableMessageCount" } }), _c("v-switch", { attrs: { "label": _vm.$t("settings.sites.editor.enableQuickLink") }, model: { value: _vm.site.enableQuickLink, callback: function($$v) {
    _vm.$set(_vm.site, "enableQuickLink", $$v);
  }, expression: "site.enableQuickLink" } }), _c("v-switch", { attrs: { "label": _vm.$t("settings.sites.editor.enableDefaultQuickLink"), "disabled": !_vm.site.enableQuickLink }, model: { value: _vm.site.enableDefaultQuickLink, callback: function($$v) {
    _vm.$set(_vm.site, "enableDefaultQuickLink", $$v);
  }, expression: "site.enableDefaultQuickLink" } }), _c("v-textarea", { attrs: { "disabled": !_vm.site.enableQuickLink, "label": _vm.$t("settings.sites.editor.quickLinkText"), "hint": _vm.$t("settings.sites.editor.quickLinkTextTip") }, model: { value: _vm.quickLinkText, callback: function($$v) {
    _vm.quickLinkText = $$v;
  }, expression: "quickLinkText" } })], 2)], 1)], 1);
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
const SiteEditor = __component__$4.exports;
const _sfc_main$3 = Vue.extend({
  components: {
    SiteEditor
  },
  data() {
    return {
      step: 1,
      show: false,
      stepCount: 2,
      selectedSite: {},
      valid: false,
      isCustom: false,
      newData: {},
      haveError: false
    };
  },
  props: {
    value: Boolean
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    show() {
      this.$emit("change", this.show);
      if (!this.show) {
        this.step = 1;
        this.selectedSite = { name: "" };
      }
    },
    value() {
      this.show = this.value;
    }
  },
  methods: {
    change(options) {
      console.log(options);
      this.newData = options.data;
      this.valid = options.valid;
    },
    save() {
      this.$emit(
        "save",
        Object.assign(
          {
            isCustom: this.isCustom
          },
          this.newData
        )
      );
      this.show = false;
    },
    next(step) {
      if (this.selectedSite && this.selectedSite.name) {
        this.valid = true;
        this.haveError = false;
        this.step++;
      } else {
        this.haveError = true;
        this.valid = false;
      }
      this.isCustom = false;
    },
    custom() {
      this.selectedSite = {
        name: "",
        isCustom: true
      };
      this.isCustom = true;
      this.valid = false;
      this.step = 2;
    },
    joinTags(tags) {
      if (tags && tags.join) {
        return tags.join(", ");
      }
      return "";
    },
    filterSite(item, queryText, itemText) {
      function hasValue(val) {
        return val != null ? val : "";
      }
      const text = hasValue(item.host) + hasValue(item.name) + hasValue(item.url);
      const query = hasValue(queryText);
      return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
    },
    cancel() {
      this.show = false;
    }
  },
  computed: {
    selectedSiteDescription() {
      if (!this.selectedSite) {
        return "";
      }
      let site = this.selectedSite;
      let description = "";
      if (site.description !== void 0) {
        description = "; " + site.description;
      }
      return (site.url ? site.url : "") + description;
    }
  },
  created() {
  }
});
var _sfc_render$3 = function render2() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", [_c("v-snackbar", { attrs: { "value": _vm.haveError, "top": "", "timeout": 3e3, "color": "error" } }, [_vm._v(_vm._s(_vm.$t("settings.sites.add.validMsg")))]), _c("v-dialog", { attrs: { "max-width": "800" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-toolbar", { attrs: { "dark": "", "color": "blue-grey darken-2" } }, [_c("v-toolbar-title", [_vm._v(_vm._s(_vm.$t("settings.sites.add.title")))]), _c("v-spacer"), _c("v-btn", { attrs: { "icon": "", "flat": "", "color": "success", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/wiki/config-site", "target": "_blank", "rel": "noopener noreferrer nofollow", "title": _vm.$t("common.help") } }, [_c("v-icon", [_vm._v("help")])], 1)], 1), _c("v-card-text", [_c("v-stepper", { model: { value: _vm.step, callback: function($$v) {
    _vm.step = $$v;
  }, expression: "step" } }, [_c("v-stepper-header", [_c("v-stepper-step", { attrs: { "complete": _vm.step > 1, "step": "1" } }, [_vm._v(_vm._s(_vm.$t("settings.sites.add.step1")))]), _c("v-divider"), _c("v-stepper-step", { attrs: { "step": "2" } }, [_vm._v(_vm._s(_vm.$t("settings.sites.add.step2")))])], 1), _c("v-stepper-items", [_c("v-stepper-content", { attrs: { "step": "1" } }, [_c("v-autocomplete", { attrs: { "items": _vm.$store.getters.sites, "label": _vm.$t("settings.sites.add.validMsg"), "hint": _vm.selectedSiteDescription, "filter": _vm.filterSite, "persistent-hint": "", "return-object": "", "single-line": "", "item-text": "name", "item-value": "name" }, scopedSlots: _vm._u([{ key: "selection", fn: function({ item }) {
    return [_c("v-list-tile-avatar", [_c("img", { attrs: { "src": item.icon } })]), _c("span", { domProps: { "textContent": _vm._s(item.name) } })];
  } }, { key: "item", fn: function(data) {
    return [_c("v-list-tile-avatar", [_c("img", { attrs: { "src": data.item.icon } })]), _c("v-list-tile-content", [_c("v-list-tile-title", { domProps: { "innerHTML": _vm._s(data.item.name) } }), _c("v-list-tile-sub-title", { domProps: { "innerHTML": _vm._s(data.item.url) } })], 1), _c("v-list-tile-action", [_c("v-list-tile-action-text", [_vm._v(_vm._s(_vm.joinTags(data.item.tags)))])], 1)];
  } }]), model: { value: _vm.selectedSite, callback: function($$v) {
    _vm.selectedSite = $$v;
  }, expression: "selectedSite" } })], 1), _c("v-stepper-content", { attrs: { "step": "2" } }, [_c("SiteEditor", { attrs: { "initData": _vm.selectedSite, "custom": _vm.isCustom }, on: { "change": _vm.change } })], 1)], 1)], 1)], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _vm.step == 1, expression: "step == 1" }], attrs: { "flat": "", "color": "grey darken-1", "href": "https://github.com/pt-plugins/PT-Plugin-Plus/tree/master/resource/sites", "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_c("v-icon", [_vm._v("help")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.sites.add.help")))])], 1), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _vm.step < _vm.stepCount, expression: "step < stepCount" }], attrs: { "flat": "" }, on: { "click": _vm.custom } }, [_c("v-icon", [_vm._v("add_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("settings.sites.add.custom")))])], 1), _c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "grey darken-1", "disabled": _vm.step === 1 }, on: { "click": function($event) {
    _vm.step--;
  } } }, [_c("v-icon", [_vm._v("navigate_before")]), _c("span", [_vm._v(_vm._s(_vm.$t("settings.sites.add.prev")))])], 1), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _vm.step < _vm.stepCount, expression: "step < stepCount" }], attrs: { "flat": "", "color": "blue" }, on: { "click": function($event) {
    return _vm.next(_vm.step);
  } } }, [_c("span", [_vm._v(_vm._s(_vm.$t("settings.sites.add.next")))]), _c("v-icon", [_vm._v("navigate_next")])], 1), _c("v-btn", { directives: [{ name: "show", rawName: "v-show", value: _vm.step === _vm.stepCount, expression: "step === stepCount" }], attrs: { "flat": "", "color": "success", "disabled": !_vm.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")])], 1)], 1)], 1)], 1)], 1);
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
const AddSite = __component__$3.exports;
const _sfc_main$2 = Vue.extend({
  components: {
    SiteEditor
  },
  data() {
    return {
      show: false,
      defaultSite: {},
      valid: true,
      newData: {}
    };
  },
  props: {
    value: Boolean,
    site: Object
  },
  model: {
    prop: "value",
    event: "change"
  },
  watch: {
    show() {
      this.$emit("change", this.show);
    },
    value() {
      this.show = this.value;
      if (this.show) {
        this.defaultSite = Object.assign({}, this.site);
      }
    }
  },
  methods: {
    change(options) {
      console.log(options);
      this.newData = options.data;
      this.valid = options.valid;
    },
    save() {
      this.$emit("save", this.newData);
      this.show = false;
    },
    cancel() {
      this.show = false;
    }
  }
});
var _sfc_render$2 = function render3() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-dialog", { attrs: { "max-width": "800" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline blue-grey darken-2", staticStyle: { "color": "white" } }, [_vm._v(_vm._s(_vm.$t("settings.sites.edit.title")))]), _c("v-card-text", [_c("SiteEditor", { attrs: { "initData": _vm.defaultSite }, on: { "change": _vm.change } })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "error" }, on: { "click": _vm.cancel } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "flat": "", "color": "success", "disabled": !_vm.valid }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1);
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
const EditSite = __component__$2.exports;
const _sfc_main$1 = Vue.extend({
  name: "UserInfo",
  data() {
    return {
      dataKey: "PT-Plugin-Plus-User-Datas",
      show: false,
      rawUserData: [],
      pagination: {
        descending: true,
        sortBy: "date",
        rowsPerPage: 25
      },
      headers: [
        {
          text: this.$t("home.headers.date"),
          align: "left",
          value: "date",
          width: "130px"
        },
        {
          text: this.$t("home.headers.userName"),
          align: "left",
          value: "name"
        },
        {
          text: this.$t("home.headers.levelName"),
          align: "left",
          value: "levelName"
        },
        {
          text: this.$t("home.headers.activitiyData"),
          align: "right",
          value: "uploaded",
          width: "160px"
        },
        {
          text: this.$t("home.headers.ratio"),
          align: "right",
          value: "ratio"
        },
        {
          text: this.$t("home.headers.seeding"),
          align: "right",
          value: "seeding"
        },
        {
          text: this.$t("home.headers.seedingSize"),
          align: "right",
          value: "seedingSize"
        },
        {
          text: this.$t("home.headers.bonus"),
          align: "right",
          value: "bonus"
        },
        {
          text: this.$t("settings.sites.index.headers.action"),
          value: "name",
          sortable: false,
          width: "50px"
        }
      ]
    };
  },
  props: {
    value: Boolean,
    site: Object
  },
  model: {
    prop: "value",
    event: "change"
  },
  filters: {
    formatRatio(v) {
      if (v > 1e4 || v == -1) {
        return "∞";
      }
      let number = parseFloat(v);
      if (isNaN(number)) {
        return "";
      }
      return number.toFixed(2);
    }
  },
  watch: {
    show() {
      this.$emit("change", this.show);
    },
    value() {
      if (this.value) {
        chrome.storage.local.get(this.dataKey, (result) => {
          this.rawUserData = result[this.dataKey][this.site.host];
          this.show = this.value;
        });
      }
    }
  },
  computed: {
    userData() {
      return Object.entries(this.rawUserData).map((v) => {
        const user = v[1];
        const { downloaded, uploaded } = user;
        if (downloaded == 0 && uploaded > 0) {
          user.ratio = -1;
        } else if (downloaded > 0) {
          user.ratio = uploaded / downloaded;
        }
        user["date"] = v[0];
        return user;
      });
    }
  },
  methods: {
    save() {
      this.show = false;
    },
    removeConfirm(item) {
      if (confirm(this.$t("settings.sites.userinfo.deleteConfirm"))) {
        this.$delete(this.rawUserData, item.date);
        chrome.storage.local.get(this.dataKey, (result) => {
          delete result[this.dataKey][this.site.host][item.date];
          chrome.storage.local.set(result, () => {
          });
        });
      }
    }
  }
});
var _sfc_render$1 = function render4() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("v-dialog", { attrs: { "max-width": "1200" }, model: { value: _vm.show, callback: function($$v) {
    _vm.show = $$v;
  }, expression: "show" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline blue-grey darken-2", staticStyle: { "color": "white" } }, [_vm._v(_vm._s(_vm.$t("settings.sites.userinfo.title")) + "@" + _vm._s(this.site.name))]), _c("v-card-text", [_c("v-data-table", { attrs: { "headers": _vm.headers, "items": _vm.userData, "pagination": _vm.pagination }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", [_vm._v(_vm._s(props.item.date))]), _c("td", [_vm._v(_vm._s(props.item.name))]), _c("td", [_vm._v(_vm._s(props.item.levelName))]), _c("td", { staticClass: "number" }, [_c("div", [_vm._v(" " + _vm._s(_vm._f("formatSize")(props.item.uploaded)) + " "), _c("v-icon", { attrs: { "small": "", "color": "green darken-4" } }, [_vm._v("expand_less")])], 1), _c("div", [_vm._v(" " + _vm._s(_vm._f("formatSize")(props.item.downloaded)) + " "), _c("v-icon", { attrs: { "small": "", "color": "red darken-4" } }, [_vm._v("expand_more")])], 1)]), _c("td", { staticClass: "number" }, [_vm._v(_vm._s(_vm._f("formatRatio")(props.item.ratio)))]), _c("td", { staticClass: "number" }, [_vm._v(_vm._s(props.item.seeding))]), _c("td", { staticClass: "number" }, [_vm._v(_vm._s(_vm._f("formatSize")(props.item.seedingSize)))]), _c("td", { staticClass: "number" }, [_vm._v(_vm._s(_vm._f("formatNumber")(props.item.bonus)))]), _c("td", [_c("v-icon", { staticClass: "ml-2", attrs: { "small": "", "color": "error", "title": _vm.$t("common.remove"), "disabled": props.item.date === "latest" }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_vm._v("delete")])], 1)];
  } }]) })], 1), _c("v-divider"), _c("v-card-actions", { staticClass: "pa-3" }, [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "success" }, on: { "click": _vm.save } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "66c83107",
  null,
  null
);
const UserInfo = __component__$1.exports;
const extension = new Extension();
const _sfc_main = Vue.extend({
  components: {
    AddSite,
    EditSite,
    UserInfo
  },
  data() {
    return {
      selected: [],
      pagination: {
        rowsPerPage: -1
      },
      showAddDialog: false,
      showEditDialog: false,
      showUserInfo: false,
      siteDuplicate: false,
      sites: [],
      selectedSite: {},
      dialogRemoveConfirm: false,
      options: this.$store.state.options,
      importing: false,
      importingCount: 0,
      importedCount: 0,
      fileImport: null,
      errorMsg: "",
      haveError: false,
      haveSuccess: false,
      successMsg: "",
      faviconReseting: false,
      loadingIconSites: []
    };
  },
  methods: {
    add() {
      this.showAddDialog = true;
    },
    edit(item) {
      let index = this.$store.state.options.sites.findIndex((site) => {
        return item.name === site.name;
      });
      if (index !== -1) {
        this.selectedSite = this.$store.state.options.sites[index];
        this.showEditDialog = true;
      }
    },
    editUserInfo(item) {
      let index = this.$store.state.options.sites.findIndex((site) => {
        return item.name === site.name;
      });
      if (index !== -1) {
        this.selectedSite = this.$store.state.options.sites[index];
        this.showUserInfo = true;
      }
    },
    removeConfirm(item) {
      this.selectedSite = item;
      this.dialogRemoveConfirm = true;
    },
    remove() {
      this.dialogRemoveConfirm = false;
      this.$store.commit("removeSite", this.selectedSite);
      this.selectedSite = {};
    },
    removeSelected() {
      if (confirm(
        this.$t("settings.sites.index.removeSelectedConfirm").toString()
      )) {
        this.selected.forEach((item) => {
          this.$store.commit("removeSite", item);
        });
        this.selected = [];
      }
    },
    updateSearchStatus(item) {
      item.allowSearch = !item.allowSearch;
      this.$store.commit("updateSite", item);
      this.pagination.rowsPerPage = 0;
      this.pagination.rowsPerPage = -1;
    },
    updateAllowGetUserInfo(item) {
      item.allowGetUserInfo = !item.allowGetUserInfo;
      this.$store.commit("updateSite", item);
      this.pagination.rowsPerPage = 0;
      this.pagination.rowsPerPage = -1;
    },
    updateOfflineStatus(item) {
      item.offline = !item.offline;
      this.$store.commit("updateSite", item);
      this.pagination.rowsPerPage = 0;
      this.pagination.rowsPerPage = -1;
    },
    updateSite(item) {
      this.$store.commit("updateSite", item);
      this.pagination.rowsPerPage = 0;
      this.pagination.rowsPerPage = -1;
    },
    addSite(item) {
      if (!item.host) {
        let url = filters.parseURL(item.url);
        item.host = url.host;
      }
      if (!item.icon) {
        let url = filters.parseURL(item.url);
        item.icon = `${url.protocol}://${item.host}/favicon.ico`;
      }
      let index = this.$store.state.options.sites.findIndex((site) => {
        return site.host === item.host;
      });
      if (index === -1) {
        if (!item.activeURL) {
          item.activeURL = item.url;
        }
        this.$store.commit("addSite", item);
      } else {
        this.siteDuplicate = true;
      }
    },
    importAll() {
      if (!confirm(this.$t("settings.sites.index.importAllConfirm").toString())) {
        return;
      }
      if (this.importing) {
        return;
      }
      this.importing = true;
      this.importedCount = 0;
      this.$store.state.options.system.sites.forEach((site) => {
        let index = this.$store.state.options.sites ? this.$store.state.options.sites.findIndex((item) => {
          return item.host === site.host;
        }) : -1;
        if (index === -1) {
          this.checkAndAddSite(site);
        }
      });
    },
    editPlugins(item) {
      this.$router.push({
        name: "set-site-plugins",
        params: {
          host: item.host
        }
      });
    },
    writeLog(options) {
      extension.sendRequest(EAction.writeLog, null, {
        module: EModule.options,
        event: options.event,
        msg: options.msg,
        data: options.data
      });
    },
    editSearchEntry(item) {
      this.$router.push({
        name: "set-site-search-entry",
        params: {
          host: item.host
        }
      });
    },
    /**
     * 验证并添加站点
     */
    checkAndAddSite(site) {
      this.importingCount++;
      extension.sendRequest(EAction.getUserInfo, null, site).then((result) => {
        console.log(result);
        if (result && result.name) {
          this.$store.commit(
            "addSite",
            Object.assign(
              {
                valid: true,
                activeURL: site.url,
                allowSearch: true,
                allowGetUserInfo: true
              },
              site
            )
          );
          this.importedCount++;
        }
      }).catch((result) => {
        console.log("error", result);
      }).finally(() => {
        this.importingCount--;
        if (this.importingCount == 0) {
          this.importing = false;
        }
      });
    },
    clearMessage() {
      this.successMsg = "";
      this.errorMsg = "";
    },
    /**
     * 导出站点配置
     */
    shareSiteConfig(site) {
      let fileName = (site.host || site.name) + ".json";
      let data = JSON.parse(JSON.stringify(site));
      ["id", "user", "passkey", "defaultClientId"].forEach((field) => {
        if (data[field]) {
          delete data[field];
        }
      });
      if (!data.isCustom) {
        [
          "categories",
          "selectors",
          "searchEntryConfig",
          "description",
          "icon",
          "url",
          "schema",
          "tags",
          "formerHosts"
        ].forEach((field) => {
          if (data[field]) {
            delete data[field];
          }
        });
      }
      if (data.plugins && data.plugins.length > 0) {
        const keepItems = [];
        data.plugins.forEach((item) => {
          if (item.isCustom) {
            keepItems.push(item);
          }
        });
        data.plugins = keepItems;
      }
      if (data.searchEntry && data.searchEntry.length > 0) {
        const keepItems = [];
        data.searchEntry.forEach((item) => {
          if (item.isCustom) {
            keepItems.push(item);
          }
        });
        data.searchEntry = keepItems;
      }
      const blob = new Blob([JSON.stringify(data)], {
        type: "text/plain"
      });
      FileSaver.saveAs(blob, fileName);
    },
    /**
     * 导入配置文件
     */
    importConfig() {
      this.fileImport.click();
    },
    importConfigFile(event) {
      this.clearMessage();
      let restoreFile = event.srcElement;
      if (restoreFile.files.length > 0 && restoreFile.files[0].name.length > 0) {
        console.log(restoreFile.files);
        for (let index = 0; index < restoreFile.files.length; index++) {
          const file = restoreFile.files[index];
          const r = new FileReader();
          r.onload = (e) => {
            try {
              const result = JSON.parse(e.target.result);
              this.importSite(result);
            } catch (error) {
              console.log(error);
              this.errorMsg = this.$t("common.importFailed").toString();
            }
          };
          r.onerror = () => {
            this.errorMsg = this.$t("settings.backup.loadError").toString();
          };
          r.readAsText(file);
        }
        restoreFile.value = "";
      }
    },
    /**
     * 导入站点信息
     */
    importSite(sourceSite) {
      const options = JSON.parse(JSON.stringify(this.options));
      let site = null;
      let systemSite = null;
      if (options.sites && options.sites.length > 0) {
        site = options.sites.find((item) => {
          return item.host === sourceSite.host;
        });
      }
      if (options.system && options.system.sites && options.system.sites.length > 0) {
        systemSite = options.system.sites.find((item) => {
          return item.host === sourceSite.host;
        });
      }
      if (site) {
        if (!confirm(
          this.$t("settings.sites.index.importDuplicateConfirm", {
            name: site.name || site.host
          }).toString()
        )) {
          return;
        }
        if (sourceSite.plugins && sourceSite.plugins.length > 0) {
          if (!site.plugins) {
            site.plugins = [];
          }
          let items = site.plugins;
          let keepItems = [];
          items.forEach((item) => {
            if (item.isCustom) {
              keepItems.push(item);
            }
          });
          sourceSite.plugins.forEach((item) => {
            let index = items.findIndex((_item) => {
              return _item.name === item.name;
            });
            if (index === -1) {
              item.id = PPF.getNewId();
              keepItems.push(item);
            }
          });
          site.plugins = keepItems;
        }
        if (sourceSite.searchEntry && sourceSite.searchEntry.length > 0) {
          if (!site.searchEntry) {
            site.searchEntry = [];
          }
          let items = site.searchEntry;
          sourceSite.searchEntry.forEach((item) => {
            let index = items.findIndex((_item) => {
              return _item.name === item.name;
            });
            if (index === -1) {
              item.id = PPF.getNewId();
              items.push(item);
            }
          });
        }
        this.updateSite(site);
      } else {
        if (!confirm(
          this.$t("settings.sites.index.importConfirm", {
            name: sourceSite.name || sourceSite.host
          }).toString()
        )) {
          return;
        }
        if (systemSite) {
          this.addSite(Object.assign(systemSite, sourceSite));
        } else {
          this.addSite(sourceSite);
        }
      }
      this.successMsg = this.$t("settings.sites.index.importedText").toString();
    },
    resetFavicons() {
      this.faviconReseting = true;
      extension.sendRequest(EAction.resetFavicons).then((options) => {
        if (options) {
          this.$store.commit("updateOptions", options);
        } else {
          console.error(`重置站点图标缓存失败, options: ${options}`);
        }
      }).finally(() => {
        this.faviconReseting = false;
      });
    },
    resetFavicon(site) {
      if (!site.host) {
        return;
      }
      const host = site.host;
      if (!this.loadingIconSites.includes(host)) {
        this.loadingIconSites.push(host);
      }
      extension.sendRequest(EAction.resetFavicon, null, site.activeURL || site.url).then((options) => {
        this.$store.commit("readConfig");
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        let index = this.loadingIconSites.indexOf(host);
        console.log("host: %s, index: %s", host, index);
        if (index != -1) {
          this.loadingIconSites.splice(index, 1);
        }
      });
    }
  },
  created() {
    if (!this.options.system) {
      this.writeLog({
        event: "Sites.init.error",
        msg: "系统配置信息丢失"
      });
    }
    if (this.options.system && !this.options.system.sites) {
      this.writeLog({
        event: "Sites.init.error",
        msg: "系统配置网站信息丢失"
      });
    }
  },
  mounted() {
    this.fileImport = this.$refs.fileImport;
    this.fileImport.addEventListener("change", this.importConfigFile);
  },
  beforeDestroy() {
    this.fileImport.removeEventListener("change", this.importConfigFile);
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("settings.sites.index.headers.name"),
          align: "center",
          value: "name",
          width: "110px"
        },
        {
          text: this.$t("settings.sites.index.headers.tags"),
          align: "left",
          value: "tags"
        },
        {
          text: this.$t("settings.sites.index.headers.allowSearch"),
          align: "left",
          value: "allowSearch"
        },
        {
          text: this.$t("settings.sites.index.headers.allowGetUserInfo"),
          align: "left",
          value: "allowGetUserInfo"
        },
        {
          text: this.$t("settings.sites.index.headers.offline"),
          align: "left",
          value: "offline"
        },
        {
          text: this.$t("settings.sites.index.headers.activeURL"),
          align: "left",
          value: "activeURL"
        },
        {
          text: this.$t("settings.sites.index.headers.action"),
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
var _sfc_render = function render5() {
  var _vm = this, _c = _vm._self._c, _setup = _vm._self._setupProxy;
  return _c("div", { staticClass: "set-sites" }, [_c("v-alert", { attrs: { "value": true, "type": "info" } }, [_c("div", [_vm._v(_vm._s(_vm.$t("settings.sites.index.title")))])]), _c("v-card", [_c("v-card-title", [_c("v-btn", { attrs: { "color": "success" }, on: { "click": _vm.add } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("add")]), _vm._v(" " + _vm._s(_vm.$t("common.add")) + " ")], 1), _c("v-btn", { attrs: { "color": "error", "disabled": _vm.selected.length == 0 }, on: { "click": _vm.removeSelected } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("remove")]), _vm._v(" " + _vm._s(_vm.$t("common.remove")) + " ")], 1), _c("v-divider", { staticClass: "mx-3 mt-0", attrs: { "inset": "", "vertical": "" } }), _c("input", { ref: "fileImport", staticStyle: { "display": "none" }, attrs: { "type": "file", "multiple": "", "accept": "application/json" } }), _c("v-btn", { attrs: { "color": "info" }, on: { "click": _vm.importConfig } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("folder_open")]), _vm._v(" " + _vm._s(_vm.$t("settings.sites.index.importConfig")) + " ")], 1), _c("v-divider", { staticClass: "mx-3 mt-0", attrs: { "inset": "", "vertical": "" } }), _c("v-btn", { attrs: { "color": "info", "loading": _vm.importing }, on: { "click": _vm.importAll } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("gps_fixed")]), _vm._v(" " + _vm._s(_vm.$t("settings.sites.index.importAll")) + " ")], 1), _vm.importing ? _c("span", [_vm._v(_vm._s(_vm.$t("settings.sites.index.importedText")) + " " + _vm._s(_vm.importedCount))]) : _vm._e(), _c("v-divider", { staticClass: "mx-3 mt-0", attrs: { "inset": "", "vertical": "" } }), _c("v-btn", { attrs: { "color": "purple", "dark": "", "loading": _vm.faviconReseting }, on: { "click": _vm.resetFavicons } }, [_c("v-icon", { staticClass: "mr-2" }, [_vm._v("cached")]), _vm._v(" " + _vm._s(_vm.$t("settings.sites.index.resetFavicons")) + " ")], 1), _c("v-spacer"), _c("v-text-field", { staticClass: "search", attrs: { "append-icon": "search", "label": "Search", "single-line": "", "hide-details": "" } })], 1), _c("v-data-table", { staticClass: "elevation-1", attrs: { "headers": _vm.headers, "items": this.$store.state.options.sites, "pagination": _vm.pagination, "item-key": "host", "select-all": "" }, on: { "update:pagination": function($event) {
    _vm.pagination = $event;
  } }, scopedSlots: _vm._u([{ key: "items", fn: function(props) {
    return [_c("td", { staticStyle: { "width": "20px" } }, [_c("v-checkbox", { attrs: { "primary": "", "hide-details": "" }, model: { value: props.selected, callback: function($$v) {
      _vm.$set(props, "selected", $$v);
    }, expression: "props.selected" } })], 1), _c("td", { staticClass: "text-xs-center pb-1" }, [_c("v-btn", { staticClass: "siteIcon", attrs: { "flat": "", "icon": "", "title": _vm.$t("settings.sites.index.resetFavicons"), "loading": _vm.loadingIconSites.includes(props.item.host) }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.resetFavicon(props.item);
    } } }, [!_vm.loadingIconSites.includes(props.item.host) ? _c("v-avatar", { attrs: { "size": 18 } }, [_c("img", { attrs: { "src": props.item.icon } })]) : _vm._e()], 1), _c("br"), _c("a", { on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_c("span", [_vm._v(_vm._s(props.item.name))])])], 1), _c("td", [_vm._v(_vm._s(props.item.tags && props.item.tags.join(", ")))]), _c("td", [_c("v-switch", { attrs: { "true-value": "true", "false-value": "false", "input-value": props.item.allowSearch ? "true" : "false", "hide-details": "", "disabled": props.item.offline }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.updateSearchStatus(props.item);
    } } })], 1), _c("td", [_c("v-switch", { attrs: { "true-value": "true", "false-value": "false", "input-value": props.item.allowGetUserInfo ? "true" : "false", "hide-details": "", "disabled": props.item.offline }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.updateAllowGetUserInfo(props.item);
    } } })], 1), _c("td", [_c("v-switch", { attrs: { "true-value": "true", "false-value": "false", "input-value": props.item.offline ? "true" : "false", "hide-details": "" }, on: { "click": function($event) {
      $event.stopPropagation();
      return _vm.updateOfflineStatus(props.item);
    } } })], 1), _c("td", [_c("a", { attrs: { "href": props.item.activeURL, "target": "_blank", "rel": "noopener noreferrer nofollow" } }, [_vm._v(_vm._s(props.item.activeURL))])]), _c("td", [_c("v-icon", { attrs: { "small": "", "title": _vm.$t("common.edit") }, on: { "click": function($event) {
      return _vm.edit(props.item);
    } } }, [_vm._v("edit")]), _c("v-icon", { staticClass: "ml-2", attrs: { "small": "", "title": _vm.$t("settings.sites.index.plugins") }, on: { "click": function($event) {
      return _vm.editPlugins(props.item);
    } } }, [_vm._v("assistant")]), props.item.allowGetUserInfo ? _c("v-icon", { staticClass: "ml-2", attrs: { "small": "", "title": _vm.$t("settings.sites.index.showUserInfo") }, on: { "click": function($event) {
      return _vm.editUserInfo(props.item);
    } } }, [_vm._v("view_list")]) : _vm._e(), _c("v-icon", { staticClass: "ml-2", attrs: { "small": "", "title": _vm.$t("settings.sites.index.searchEntry") }, on: { "click": function($event) {
      return _vm.editSearchEntry(props.item);
    } } }, [_vm._v("search")]), _c("v-icon", { staticClass: "ml-2", attrs: { "small": "", "color": "error", "title": _vm.$t("common.remove") }, on: { "click": function($event) {
      return _vm.removeConfirm(props.item);
    } } }, [_vm._v("delete")]), _c("v-icon", { staticClass: "ml-2", attrs: { "small": "", "color": "info", "title": _vm.$t("common.share") }, on: { "click": function($event) {
      return _vm.shareSiteConfig(props.item);
    } } }, [_vm._v("share")])], 1)];
  } }]), model: { value: _vm.selected, callback: function($$v) {
    _vm.selected = $$v;
  }, expression: "selected" } })], 1), _c("AddSite", { on: { "save": _vm.addSite }, model: { value: _vm.showAddDialog, callback: function($$v) {
    _vm.showAddDialog = $$v;
  }, expression: "showAddDialog" } }), _c("EditSite", { attrs: { "site": _vm.selectedSite }, on: { "save": _vm.updateSite }, model: { value: _vm.showEditDialog, callback: function($$v) {
    _vm.showEditDialog = $$v;
  }, expression: "showEditDialog" } }), _c("UserInfo", { attrs: { "site": _vm.selectedSite }, model: { value: _vm.showUserInfo, callback: function($$v) {
    _vm.showUserInfo = $$v;
  }, expression: "showUserInfo" } }), _c("v-dialog", { attrs: { "width": "300" }, model: { value: _vm.dialogRemoveConfirm, callback: function($$v) {
    _vm.dialogRemoveConfirm = $$v;
  }, expression: "dialogRemoveConfirm" } }, [_c("v-card", [_c("v-card-title", { staticClass: "headline red lighten-2" }, [_vm._v(_vm._s(_vm.$t("settings.sites.index.removeTitle")))]), _c("v-card-text", [_vm._v(_vm._s(_vm.$t("settings.sites.index.removeConfirm")))]), _c("v-divider"), _c("v-card-actions", [_c("v-spacer"), _c("v-btn", { attrs: { "flat": "", "color": "info" }, on: { "click": function($event) {
    _vm.dialogRemoveConfirm = false;
  } } }, [_c("v-icon", [_vm._v("cancel")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.cancel")))])], 1), _c("v-btn", { attrs: { "color": "error", "flat": "" }, on: { "click": _vm.remove } }, [_c("v-icon", [_vm._v("check_circle_outline")]), _c("span", { staticClass: "ml-1" }, [_vm._v(_vm._s(_vm.$t("common.ok")))])], 1)], 1)], 1)], 1), _c("v-alert", { attrs: { "value": true, "color": "grey" } }, [_c("div", { domProps: { "innerHTML": _vm._s(_vm.$t("settings.sites.index.subTitle")) } })]), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.siteDuplicate, callback: function($$v) {
    _vm.siteDuplicate = $$v;
  }, expression: "siteDuplicate" } }, [_vm._v(_vm._s(_vm.$t("settings.sites.index.siteDuplicateText")))]), _c("v-snackbar", { attrs: { "top": "", "timeout": 3e3, "color": "error" }, model: { value: _vm.haveError, callback: function($$v) {
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
  "ef65d3be",
  null,
  null
);
const Index = __component__.exports;
export {
  Index as default
};
