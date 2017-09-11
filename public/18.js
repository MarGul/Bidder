webpackJsonp([18],{

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(335),
  /* template */
  __webpack_require__(336),
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

/***/ 335:
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
	methods: {
		description: function description(desc) {
			return desc.length > 75 ? desc.substr(0, 75) + '...' : desc;
		},
		bidDate: function bidDate(bid) {
			return moment(bid.created_at).format('LLL');
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserBids');
		}
	}
});

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_bids-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [(_vm.fetched) ? [_c('ul', {
    staticClass: "items-list"
  }, _vm._l((_vm.bids), function(bid) {
    return _c('li', {
      staticClass: "gray-item clickable"
    }, [_c('div', {
      staticClass: "item-content"
    }, [_c('div', {
      staticClass: "item-header",
      domProps: {
        "textContent": _vm._s(_vm.description(bid.description))
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "item-sub-data"
    }, [_c('span', {
      staticClass: "mr5"
    }, [_vm._v("Bud lagt den " + _vm._s(_vm.bidDate(bid)))]), _vm._v("•\n\t\t\t\t\t\t\t\t"), _c('span', {
      staticClass: "ml5"
    }, [_vm._v("Budet är " + _vm._s(bid.accepted ? 'accepterat' : 'ej accepterat'))])])]), _vm._v(" "), _c('div', {
      staticClass: "item-go-to"
    }, [_c('svg', {
      staticStyle: {
        "enable-background": "new 0 0 306 306"
      },
      attrs: {
        "version": "1.1",
        "id": "Capa_1",
        "xmlns": "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "x": "0px",
        "y": "0px",
        "width": "12px",
        "height": "12px",
        "viewBox": "0 0 306 306",
        "xml:space": "preserve"
      }
    }, [_c('g', {
      attrs: {
        "id": "chevron-right"
      }
    }, [_c('polygon', {
      attrs: {
        "points": "94.35,0 58.65,35.7 175.95,153 58.65,270.3 94.35,306 247.35,153",
        "fill": "#97A9B5"
      }
    })])])])])
  }))] : _c('app-loading')], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Mina bud")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ffbea3c2", module.exports)
  }
}

/***/ })

});