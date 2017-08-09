webpackJsonp([6],{

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(379)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(381),
  /* template */
  __webpack_require__(385),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5f7c3375",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Subscriptions/MySubscriptions.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MySubscriptions.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f7c3375", Component.options)
  } else {
    hotAPI.reload("data-v-5f7c3375", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 379:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(380);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("ad4ea94e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5f7c3375\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MySubscriptions.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5f7c3375\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MySubscriptions.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(402)(undefined);
// imports


// module
exports.push([module.i, "\n.item-actions[data-v-5f7c3375] {\n  justify-content: flex-end;\n}\n", ""]);

// exports


/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AddSubscription__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AddSubscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AddSubscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(3);
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
		appAddSubscription: __WEBPACK_IMPORTED_MODULE_0__AddSubscription___default.a
	},
	computed: {
		fetched: function fetched() {
			return this.$store.getters.userSubscriptionsFetched;
		},
		subscriptions: function subscriptions() {
			return this.$store.getters.userSubscriptions;
		}
	},
	methods: {
		remove: function remove(id) {
			var _this = this;

			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]("subscriptions/" + id).delete().then(function (response) {
				var subscriptions = _this.subscriptions;
				subscriptions.forEach(function (sub, key) {
					if (id == sub.id) {
						subscriptions.splice(key, 1);
					}
				});
				_this.$store.commit('SET_SUBSCRIPTIONS', { subscriptions: subscriptions });
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Prenumerationen är borttagen.' });
			}).catch(function (error) {
				console.log(error);
			});
		},
		title: function title(sub) {
			var isRegion = sub.region_id ? true : false;
			var locationId = isRegion ? sub.region_id : sub.city_id;
			var location = isRegion ? this.$store.getters.getRegionById(locationId) : this.$store.getters.getCityById(locationId);
			var category = this.$store.getters.getCategoryById(sub.category_id);

			return category.name + " i " + location.name;
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserSubscriptions');
		}
	}
});

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(383),
  /* template */
  __webpack_require__(384),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Subscriptions/AddSubscription.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AddSubscription.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cd1a1dae", Component.options)
  } else {
    hotAPI.reload("data-v-cd1a1dae", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(3);
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
	data: function data() {
		return {
			processing: false,
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				category_id: '',
				region_id: '',
				city_id: ''
			})
		};
	},

	computed: {
		categories: function categories() {
			return this.$store.getters.getCategoriesFlatten;
		},
		regions: function regions() {
			return this.$store.getters.getRegions;
		},
		regionDisabled: function regionDisabled() {
			return this.form.city_id ? true : false;
		},
		cities: function cities() {
			return this.$store.getters.getCities;
		},
		citiesDisabled: function citiesDisabled() {
			return this.form.region_id ? true : false;
		}
	},
	methods: {
		add: function add() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('subscriptions').post(this.form.data()).then(function (response) {
				var subscriptions = _this.$store.getters.userSubscriptions;
				subscriptions.push(response.subscription);
				_this.$store.commit('SET_SUBSCRIPTIONS', { subscriptions: subscriptions });
				_this.$store.dispatch('showNotification', {
					type: 'success',
					msg: 'Vi har lagt till din prenumeration. När en ny tjänst skapas som du prenumererar på kommer du att få ett email om tjänsten.'
				});
				_this.form.reset();
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
});

/***/ }),

/***/ 384:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "add_subscription-component mb40"
  }, [_c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("För kategori:")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.category_id),
      expression: "form.category_id"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.category_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj kategori")]), _vm._v(" "), _vm._l((_vm.categories), function(category) {
    return _c('option', {
      domProps: {
        "value": category.id,
        "textContent": _vm._s(category.name)
      }
    })
  })], 2), _vm._v(" "), (_vm.form.errors.has('category_id')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('category_id'))
    }
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("För region:")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.region_id),
      expression: "form.region_id"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": _vm.regionDisabled
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.region_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj region")]), _vm._v(" "), _vm._l((_vm.regions), function(region) {
    return _c('option', {
      domProps: {
        "value": region.id,
        "textContent": _vm._s(region.name)
      }
    })
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Eller för stad:")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.city_id),
      expression: "form.city_id"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": _vm.citiesDisabled
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.city_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj stad")]), _vm._v(" "), _vm._l((_vm.cities), function(city) {
    return _c('option', {
      domProps: {
        "value": city.id,
        "textContent": _vm._s(city.name)
      }
    })
  })], 2)])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('button', {
    staticClass: "btn btn-primary full-width",
    class: {
      'processing': _vm.processing
    },
    attrs: {
      "type": "button",
      "disabled": _vm.processing || !_vm.form.category_id
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.add($event)
      }
    }
  }, [_vm._v("\n\t\t\t\t\tLägg till prenumeration\n\t\t\t\t")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cd1a1dae", module.exports)
  }
}

/***/ }),

/***/ 385:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_subscriptions-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Prenumerationer")]), _vm._v(" "), _c('app-add-subscription'), _vm._v(" "), (_vm.fetched) ? [(_vm.subscriptions.length > 0) ? _c('ul', {
    staticClass: "user-items-list"
  }, _vm._l((_vm.subscriptions), function(subscription) {
    return _c('li', [_c('div', {
      staticClass: "item-content"
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.title(subscription)) + "\n\t\t\t\t")]), _vm._v(" "), _c('div', {
      staticClass: "item-actions"
    }, [_c('button', {
      staticClass: "btn btn-danger",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.remove(subscription.id)
        }
      }
    }, [_vm._v("Ta bort")])])])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("Du har ännu inga prenumerationer. Skapa din första ovan.")])] : _c('app-loading')], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5f7c3375", module.exports)
  }
}

/***/ })

});