webpackJsonp([17],{

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(325),
  /* template */
  __webpack_require__(326),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Bids/MyBids.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MyBids.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ffbea3c2", Component.options)
  } else {
    hotAPI.reload("data-v-ffbea3c2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 325:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	computed: {
		fetched: function fetched() {
			return this.$store.getters.userBidsFetched;
		},
		bids: function bids() {
			return this.$store.getters.userBids;
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserBids');
		}
	}
});

/***/ }),

/***/ 326:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_bids-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Mina Bud")]), _vm._v(" "), (_vm.fetched) ? [(_vm.bids.length > 0) ? _c('ul', {
    staticClass: "user-items-list"
  }, _vm._l((_vm.bids), function(bid) {
    return _c('li', [_c('span', {
      staticClass: "item-content"
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(bid.description) + "\n\t\t\t\t")]), _vm._v(" "), _c('span', {
      staticClass: "item-actions"
    })])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("\n\t\t\tDu har ännu inte lagt några bud.\n\t\t")])] : _c('app-loading')], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ffbea3c2", module.exports)
  }
}

/***/ })

});