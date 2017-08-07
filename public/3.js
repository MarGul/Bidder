webpackJsonp([3],{

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(266),
  /* template */
  __webpack_require__(279),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Services.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Services.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a52aae0", Component.options)
  } else {
    hotAPI.reload("data-v-4a52aae0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(247)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(249),
  /* template */
  __webpack_require__(250),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2a250a49",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Timer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Timer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a250a49", Component.options)
  } else {
    hotAPI.reload("data-v-2a250a49", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(248);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("30b827f7", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a250a49\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Timer.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a250a49\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Timer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "\n.critical[data-v-2a250a49] {\n  color: #cc0000;\n}\n", ""]);

// exports


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(131);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['ends'],
	data: function data() {
		return {
			timer: null,
			now: Math.trunc(new Date().getTime() / 1000),
			critical: false
		};
	},

	computed: {
		seconds: function seconds() {
			return (this.ending - this.now) % 60;
		},
		minutes: function minutes() {
			return Math.trunc((this.ending - this.now) / 60) % 60;
		},
		hours: function hours() {
			return Math.trunc((this.ending - this.now) / 60 / 60) % 24;
		},
		days: function days() {
			return Math.trunc((this.ending - this.now) / 60 / 60 / 24);
		},
		ending: function ending() {
			return Math.trunc(Date.parse(this.ends) / 1000);
		},
		left: function left() {
			this.critical = false;

			if (this.days > 5) return this.days + ' dagar';
			if (this.days >= 1) return this.days + ' d ' + this.hours + ' tim';

			this.critical = true;

			if (this.hours > 0) return this.hours + ' tim ' + this.minutes + ' min';
			if (this.minutes > 0) return this.minutes + ' min ' + this.seconds + ' s';
			return this.seconds + ' s';
		}
	},
	mounted: function mounted() {
		var _this = this;

		__WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__["a" /* HeartBeat */].$on('beat', function () {
			_this.now = Math.trunc(new Date().getTime() / 1000);

			if (_this.now == _this.ending) {
				_this.$emit('ended');
			}
		});
	}
});

/***/ }),

/***/ 250:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "timer-component",
    class: {
      critical: _vm.critical
    }
  }, [_vm._v("\n\t" + _vm._s(_vm.left) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2a250a49", module.exports)
  }
}

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Services_Services__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Services_Services___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Services_Services__);
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
		appServices: __WEBPACK_IMPORTED_MODULE_0__components_Services_Services___default.a
	}
});

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(268),
  /* template */
  __webpack_require__(278),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/Services.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Services.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-491748d7", Component.options)
  } else {
    hotAPI.reload("data-v-491748d7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServiceFilter__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServiceFilter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ServiceFilter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ServiceMulti_vue__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ServiceMulti_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ServiceMulti_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(134);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
		appServiceFilter: __WEBPACK_IMPORTED_MODULE_0__ServiceFilter___default.a,
		appServiceMulti: __WEBPACK_IMPORTED_MODULE_1__ServiceMulti_vue___default.a
	},
	data: function data() {
		return {
			processing: false
		};
	},

	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapGetters */])(['servicesLoaded', 'servicesLoadingMore', 'servicesCanLoadMore', 'services'])),
	methods: {
		fetchServices: function fetchServices() {
			var _this = this;

			var appending = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var processing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			this.processing = processing ? true : false;

			this.$store.dispatch('getServices', { appending: appending }).then(function (success) {
				_this.processing = false;
			});
		},
		removeService: function removeService(_ref) {
			var id = _ref.id;

			this.$store.dispatch('removeService', { id: id });
		}
	},
	created: function created() {
		if (!this.servicesLoaded) {
			this.fetchServices();
		}
	}
});

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(270),
  /* template */
  __webpack_require__(274),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/ServiceFilter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ServiceFilter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-169f8664", Component.options)
  } else {
    hotAPI.reload("data-v-169f8664", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput__);
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
	components: {
		appTagsInput: __WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput___default.a
	},
	computed: {
		filterText: {
			get: function get() {
				return this.$store.getters.getFilterText;
			},
			set: function set(value) {
				this.$store.commit('SET_FILTER_TEXT', { text: value });
			}
		},
		categories: function categories() {
			return this.$store.getters.getFilterCategories;
		},
		allCategories: function allCategories() {
			return this.$store.getters.getCategoriesFlatten;
		},
		locations: function locations() {
			return this.$store.getters.getFilterLocations;
		},
		allLocations: function allLocations() {
			return this.$store.getters.getRegionsFlatten;
		}
	},
	methods: {
		addCategory: function addCategory(item) {
			this.$store.dispatch('addFilterCategory', { category: item });
		},
		removeCategory: function removeCategory(_ref) {
			var index = _ref.index;

			this.$store.dispatch('removeFilterCategory', { index: index });
		},
		addLocation: function addLocation(item) {
			this.$store.dispatch('addFilterLocation', { location: item });
		},
		removeLocation: function removeLocation(_ref2) {
			var item = _ref2.item;

			this.$store.dispatch('removeFilterLocation', { location: item });
		}
	}
});

/***/ }),

/***/ 271:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(272),
  /* template */
  __webpack_require__(273),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/TagsInput.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TagsInput.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-82ec9b96", Component.options)
  } else {
    hotAPI.reload("data-v-82ec9b96", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 272:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['items', 'options'],
	data: function data() {
		return {
			input: '',
			error: false
		};
	},

	computed: {
		matched: function matched() {
			var _this = this;

			if (!this.input) return [];

			return this.options.filter(function (opt) {
				return opt.name.toLowerCase().indexOf(_this.input.toLowerCase()) !== -1;
			});
		},
		inputWidth: function inputWidth() {
			return { width: 20 + this.input.length * 8 + 'px' };
		}
	},
	methods: {
		addItem: function addItem(item) {
			var current = this.options.find(function (opt) {
				return opt.name.toLowerCase() == item.toLowerCase();
			});

			if (current) {
				this.$emit('add', {
					text: current.name,
					value: current.id,
					type: current.type
				});
				this.error = false;
				return this.input = '';
			}

			return !(this.error = true);
		}
	}
});

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tags-input-container"
  }, [(_vm.error) ? _c('div', {
    staticClass: "tooltip-error"
  }, [_vm._v("Ej giltigt val")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "tags-input",
    class: {
      hasError: _vm.error
    },
    on: {
      "click": function($event) {
        _vm.$refs.input.focus()
      }
    }
  }, [_vm._l((_vm.items), function(item, index) {
    return _c('div', {
      staticClass: "tag"
    }, [_vm._v("\n\t\t\t" + _vm._s(item.text)), _c('i', {
      staticClass: "fa fa-times",
      attrs: {
        "aria-hidden": "true"
      },
      on: {
        "click": function($event) {
          _vm.$emit('remove', {
            item: item,
            index: index
          })
        }
      }
    })])
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.input),
      expression: "input",
      modifiers: {
        "trim": true
      }
    }],
    ref: "input",
    style: (_vm.inputWidth),
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.input)
    },
    on: {
      "keydown": [function($event) {
        _vm.error = false
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.addItem(_vm.input)
      }],
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.input = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })], 2), _vm._v(" "), (_vm.matched.length > 0) ? _c('div', {
    staticClass: "tags-help"
  }, [_c('ul', {
    staticClass: "list-unstyled"
  }, _vm._l((_vm.matched), function(match) {
    return _c('li', {
      on: {
        "click": function($event) {
          _vm.addItem(match.name)
        }
      }
    }, [_vm._v("\n\t\t\t\t" + _vm._s(match.name) + "\n\t\t\t")])
  }))]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-82ec9b96", module.exports)
  }
}

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "service_filter-component"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-4 column"
  }, [_c('label', [_vm._v("Fritext")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.filterText),
      expression: "filterText"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "filter_text"
    },
    domProps: {
      "value": (_vm.filterText)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.filterText = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4 column"
  }, [_c('label', [_vm._v("Kategorier")]), _vm._v(" "), _c('app-tags-input', {
    attrs: {
      "items": _vm.categories,
      "options": _vm.allCategories
    },
    on: {
      "add": _vm.addCategory,
      "remove": _vm.removeCategory
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4 column"
  }, [_c('label', [_vm._v("Platser")]), _vm._v(" "), _c('app-tags-input', {
    attrs: {
      "items": _vm.locations,
      "options": _vm.allLocations
    },
    on: {
      "add": _vm.addLocation,
      "remove": _vm.removeLocation
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-169f8664", module.exports)
  }
}

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(276),
  /* template */
  __webpack_require__(277),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/ServiceMulti.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ServiceMulti.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ba203706", Component.options)
  } else {
    hotAPI.reload("data-v-ba203706", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Timer__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_Timer__);
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
	props: ['service'],
	components: {
		appTimer: __WEBPACK_IMPORTED_MODULE_0__Includes_Timer___default.a
	},
	computed: {
		category: function category() {
			return this.$store.getters.getCategoryById(this.service.category_id).name;
		},
		location: function location() {
			var city = this.$store.getters.getCityById(this.service.city_id).name;
			var region = this.$store.getters.getRegionById(this.service.region_id).name;
			return city + ', ' + region;
		},
		commentCount: function commentCount() {
			return this.service.comment_count ? this.service.comment_count.count : 0;
		},
		bidCount: function bidCount() {
			return this.service.bid_count ? this.service.bid_count.count : 0;
		}
	},
	methods: {
		bidStop: function bidStop() {
			// Emit an event to bidStop so that the Services component can remove the service from the list.
			this.$emit('bidStop', { id: this.service.id });
		}
	}
});

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "service-container"
  }, [_c('div', {
    staticClass: "service-img"
  }), _vm._v(" "), _c('div', {
    staticClass: "service-content"
  }, [_c('div', {
    staticClass: "service-title"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.service.title) + "\n\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "service-bottom"
  }, [_c('ul', {
    staticClass: "list-unstyled bottom-info"
  }, [_c('li', {
    staticClass: "category"
  }, [_c('i', {
    staticClass: "fa fa-list-ul",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.category) + "\n\t\t\t\t")]), _vm._v(" "), _c('li', {
    staticClass: "location"
  }, [_c('i', {
    staticClass: "fa fa-map-marker",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.location) + "\n\t\t\t\t")])]), _vm._v(" "), _c('ul', {
    staticClass: "list-unstyled bottom-meta"
  }, [_c('li', {
    staticClass: "bid"
  }, [_c('i', {
    staticClass: "fa fa-gavel",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.bidCount) + " bud\n\t\t\t\t")]), _vm._v(" "), _c('li', {
    staticClass: "comments"
  }, [_c('i', {
    staticClass: "fa fa-commenting",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.commentCount) + "\n\t\t\t\t")]), _vm._v(" "), _c('li', {
    staticClass: "time"
  }, [_c('app-timer', {
    attrs: {
      "ends": _vm.service.bid_stop
    },
    on: {
      "ended": _vm.bidStop
    }
  }), _vm._v("\n\t\t\t\t\tkvar\n\t\t\t\t")], 1)])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ba203706", module.exports)
  }
}

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "services-component"
  }, [_c('div', {
    staticClass: "service-filter-container"
  }, [_c('app-service-filter'), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('button', {
    staticClass: "btn btn-primary full-width",
    class: {
      processing: _vm.processing
    },
    attrs: {
      "type": "button",
      "disabled": _vm.processing
    },
    on: {
      "click": function($event) {
        _vm.fetchServices(false, true)
      }
    }
  }, [_vm._v("\n\t\t\t\t\tHitta Tjänster\n\t\t\t\t")])])])], 1), _vm._v(" "), _c('div', {
    staticClass: "services mtb20"
  }, [(_vm.servicesLoaded) ? [(_vm.services.length) ? [_c('div', {
    staticClass: "row"
  }, [_c('transition-group', {
    attrs: {
      "name": "slide-out",
      "mode": "out-in"
    }
  }, _vm._l((_vm.services), function(service) {
    return _c('div', {
      key: service.id,
      staticClass: "col-xs-12 col-sm-6"
    }, [_c('router-link', {
      staticClass: "no-underline",
      attrs: {
        "to": {
          name: 'serviceDetails',
          params: {
            id: service.id
          }
        }
      }
    }, [_c('app-service-multi', {
      attrs: {
        "service": service
      },
      on: {
        "bidStop": _vm.removeService
      }
    })], 1)], 1)
  }))], 1), _vm._v(" "), (_vm.servicesCanLoadMore) ? _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "load-more text-center mt10"
  }, [_c('button', {
    staticClass: "btn btn-default btn-transparent is-bold-italic",
    class: {
      'processing': _vm.servicesLoadingMore
    },
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.fetchServices(true)
      }
    }
  }, [_vm._v("\n\t\t\t\t\t\t\t\t\tHämta fler\n\t\t\t\t\t\t\t\t")])])])]) : _vm._e()] : _c('div', {
    staticClass: "alert alert-info mt20"
  }, [_vm._v("\n\t\t\t\tTyvärr finns det inga tjänster att visa just nu.\n\t\t\t")])] : _c('app-loading', {
    attrs: {
      "bg": "gray"
    }
  })], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-491748d7", module.exports)
  }
}

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "services-view"
  }, [_c('app-hero', [_c('h1', {
    slot: "title"
  }, [_vm._v("Tjänster")]), _vm._v(" "), _c('p', {
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
  }, [_c('app-services')], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4a52aae0", module.exports)
  }
}

/***/ })

});