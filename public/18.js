webpackJsonp([18],{

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(338),
  /* template */
  __webpack_require__(339),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/EditService.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] EditService.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b0c329b4", Component.options)
  } else {
    hotAPI.reload("data-v-b0c329b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EditServiceForm__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EditServiceForm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__EditServiceForm__);
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appEditServiceForm: __WEBPACK_IMPORTED_MODULE_0__EditServiceForm___default.a
	}
});

/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "edit_service-component"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-8 col-lg-9"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [_c('app-edit-service-form', {
    attrs: {
      "service": _vm.$route.params.id
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4 col-lg-3"
  }, [_vm._v("\n\t\t\tSidebar\n\t\t")])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Redigera tjänst")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b0c329b4", module.exports)
  }
}

/***/ }),

/***/ 409:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(411),
  /* template */
  __webpack_require__(410),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/EditServiceForm.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] EditServiceForm.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-567c39ec", Component.options)
  } else {
    hotAPI.reload("data-v-567c39ec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "edit_service_form-component"
  }, [_c('form', {
    class: {
      loading: !_vm.fetched
    },
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('title')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Titel")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.title),
      expression: "form.title"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.form.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.title = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('title')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('title'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('category_id')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Kategori")]), _vm._v(" "), _c('select', {
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
  }, [_vm._v("Välj kategori")]), _vm._v(" "), _vm._l((_vm.categories), function(rootCat) {
    return _c('optgroup', {
      attrs: {
        "label": rootCat.name
      }
    }, _vm._l((rootCat.sub_categories), function(category) {
      return _c('option', {
        domProps: {
          "value": category.id,
          "textContent": _vm._s(category.name)
        }
      })
    }))
  })], 2), _vm._v(" "), (_vm.form.errors.has('category_id')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('category_id'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('region_id')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Region")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.region_id),
      expression: "form.region_id"
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
  })], 2), _vm._v(" "), (_vm.form.errors.has('region_id')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('region_id'))
    }
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('city')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Stad")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.city_id),
      expression: "form.city_id"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": !_vm.form.region_id
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
  })], 2), _vm._v(" "), (_vm.form.errors.has('city')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('city'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('start')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Påbörja utförandet")]), _vm._v(" "), _c('datepicker', {
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    model: {
      value: (_vm.form.start),
      callback: function($$v) {
        _vm.form.start = $$v
      },
      expression: "form.start"
    }
  }), _vm._v(" "), (_vm.form.errors.has('start')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('start'))
    }
  }) : _vm._e(), _vm._v(" "), _c('small', [_vm._v("När vill du att tjänsten ska påbörjas?")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('end')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Avsluta utförandet")]), _vm._v(" "), _c('datepicker', {
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    model: {
      value: (_vm.form.end),
      callback: function($$v) {
        _vm.form.end = $$v
      },
      expression: "form.end"
    }
  }), _vm._v(" "), (_vm.form.errors.has('end')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('end'))
    }
  }) : _vm._e(), _vm._v(" "), _c('small', [_vm._v("När vill du att tjänsten ska avslutas?")])], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('description')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Beskrivning")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.description),
      expression: "form.description"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "10"
    },
    domProps: {
      "value": (_vm.form.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.description = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('description')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('description'))
    }
  }) : _vm._e()])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-567c39ec", module.exports)
  }
}

/***/ }),

/***/ 411:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		datepicker: __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default.a
	},
	data: function data() {
		return {
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				title: '',
				rootCategory: '',
				category_id: '',
				region_id: '',
				city_id: '',
				start: '',
				end: '',
				description: ''
			}),
			fetched: false
		};
	},

	computed: {
		categories: function categories() {
			return this.$store.getters.getCategories;
		},
		regions: function regions() {
			return this.$store.getters.getRegions;
		},
		cities: function cities() {
			return this.$store.getters.getRegionById(this.form.region_id).cities;
		}
	},
	created: function created() {
		var _this = this;

		new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('user/services/' + this.$route.params.id).get().then(function (response) {
			_this.form.title = response.service.title;
			_this.form.category_id = response.service.category_id;
			_this.form.region_id = response.service.region_id;
			_this.form.city_id = response.service.city_id;
			_this.form.description = response.service.description;
			_this.fetched = true;
		}).catch(function (error) {
			console.log(error);
		});
	}
});

/***/ })

});