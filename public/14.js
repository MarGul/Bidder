webpackJsonp([14],{

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(324),
  /* template */
  __webpack_require__(325),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/MyServices.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MyServices.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57e11a9f", Component.options)
  } else {
    hotAPI.reload("data-v-57e11a9f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	computed: {
		fetched: function fetched() {
			return this.$store.getters.userServicesFetched;
		},
		services: function services() {
			return this.$store.getters.userServices;
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserServices');
		}
	}
});

/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_services-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Mina Tjänster")]), _vm._v(" "), (_vm.fetched) ? _c('ul', {
    staticClass: "user-items-list"
  }, _vm._l((_vm.services), function(service) {
    return _c('li', [_c('div', {
      staticClass: "item-content"
    }, [_vm._v("\n\t\t\t\t" + _vm._s(service.title) + "\n\t\t\t\t"), (service.active) ? _c('span', {
      staticClass: "item-link"
    }, [_vm._v("\n\t\t\t\t\t — "), _c('router-link', {
      attrs: {
        "to": ("/services/" + (service.id))
      }
    }, [_vm._v("visa tjänst")])], 1) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "item-actions"
    }, [_c('router-link', {
      staticClass: "btn-flat btn-default show-bids",
      attrs: {
        "to": ("/user/service/" + (service.id) + "/bids")
      }
    }, [_c('i', {
      staticClass: "fa fa-gavel",
      attrs: {
        "aria-hidden": "true",
        "title": "Visa bud"
      }
    }), _vm._v(" Visa bud\n\t\t\t\t")]), _vm._v(" "), _c('router-link', {
      staticClass: "btn-flat btn-default edit",
      attrs: {
        "to": ("/user/service/" + (service.id) + "/edit")
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil",
      attrs: {
        "aria-hidden": "true",
        "title": "Redigera"
      }
    }), _vm._v(" Redigera\n\t\t\t\t")])], 1)])
  })) : _c('app-loading')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-57e11a9f", module.exports)
  }
}

/***/ })

});