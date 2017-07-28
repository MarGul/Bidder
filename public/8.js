webpackJsonp([8],{

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(262),
  /* template */
  __webpack_require__(263),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Locations.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Locations.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-436a7d68", Component.options)
  } else {
    hotAPI.reload("data-v-436a7d68", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(250),
  /* template */
  __webpack_require__(251),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/ItemsBlock.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ItemsBlock.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26b6d159", Component.options)
  } else {
    hotAPI.reload("data-v-26b6d159", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 250:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['items', 'subItemsKey', 'link', 'allLink'],
	data: function data() {
		return {
			active: 0,
			breakpoints: window.breakpoints
		};
	},

	computed: {
		subCats: function subCats() {
			return this.items.length > 0 ? this.items[this.active][this.subItemsKey] : [];
		},
		activeItem: function activeItem() {
			return this.items.length > 0 ? this.items[this.active] : null;
		}
	},
	methods: {
		changeActive: function changeActive(index) {
			this.active = index;
		},
		generateLink: function generateLink(item) {
			var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var link = all && this.allLink ? this.allLink : this.link;
			return link.replace('{slug}', item.slug);
		}
	}
});

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.items.length > 0) ? _c('div', {
    staticClass: "items-block"
  }, [_c('div', {
    staticClass: "root-container"
  }, [_c('nav', {
    staticClass: "root-nav"
  }, [_vm._l((_vm.items), function(item, index) {
    return [_c('div', {
      staticClass: "nav-head",
      class: {
        active: index == _vm.active
      },
      on: {
        "click": function($event) {
          _vm.changeActive(index)
        }
      }
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(item.name) + "\n\t\t\t\t")]), _vm._v(" "), (_vm.breakpoints.mobile && (index == _vm.active)) ? _c('div', {
      staticClass: "sub-container"
    }, [_c('router-link', {
      staticClass: "btn btn-primary",
      attrs: {
        "to": _vm.generateLink(_vm.activeItem, true)
      }
    }, [_vm._v("Visa Alla")]), _vm._v(" "), _c('ul', {
      staticClass: "sub-nav list-unstyled"
    }, _vm._l((_vm.subCats), function(subItem) {
      return _c('li', [_c('router-link', {
        attrs: {
          "to": _vm.generateLink(subItem)
        }
      }, [_c('span', [_vm._v("»")]), _vm._v(_vm._s(subItem.name))])], 1)
    }))], 1) : _vm._e()]
  })], 2)]), _vm._v(" "), (!_vm.breakpoints.mobile) ? _c('div', {
    staticClass: "sub-container"
  }, [_c('h1', [_vm._v(_vm._s(_vm.activeItem.name))]), _vm._v(" "), _c('router-link', {
    staticClass: "btn btn-primary",
    attrs: {
      "to": _vm.generateLink(_vm.activeItem, true)
    }
  }, [_vm._v("Visa Alla")]), _vm._v(" "), _c('ul', {
    staticClass: "sub-nav list-unstyled"
  }, _vm._l((_vm.subCats), function(subItem) {
    return _c('li', [_c('router-link', {
      attrs: {
        "to": _vm.generateLink(subItem)
      }
    }, [_c('span', [_vm._v("»")]), _vm._v(_vm._s(subItem.name))])], 1)
  }))], 1) : _vm._e()]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-26b6d159", module.exports)
  }
}

/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock__);
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
	components: {
		appItemsBlock: __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock___default.a
	},
	computed: {
		regions: function regions() {
			return this.$store.getters.getRegions;
		}
	}
});

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "regions-view"
  }, [_c('app-hero', [_c('h1', {
    slot: "title"
  }, [_vm._v("Platser")]), _vm._v(" "), _c('p', {
    slot: "left"
  }, [_vm._v("\n\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.\n\t\t")]), _vm._v(" "), _c('img', {
    attrs: {
      "src": "mechanic.png",
      "alt": ""
    },
    slot: "right"
  })]), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content"
  }, [_c('app-items-block', {
    attrs: {
      "items": _vm.regions,
      "subItemsKey": "cities",
      "link": "city/{slug}",
      "allLink": "region/{slug}"
    }
  })], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-436a7d68", module.exports)
  }
}

/***/ })

});