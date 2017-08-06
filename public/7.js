webpackJsonp([7],{

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(324),
  /* template */
  __webpack_require__(328),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/CreateService.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CreateService.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5add2834", Component.options)
  } else {
    hotAPI.reload("data-v-5add2834", Component.options)
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UploadMedia__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UploadMedia___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__UploadMedia__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		datepicker: __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default.a,
		appUploadMedia: __WEBPACK_IMPORTED_MODULE_3__UploadMedia___default.a
	},
	data: function data() {
		return {
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				title: '',
				rootCategory: '',
				category: '',
				region: '',
				city: '',
				start: '',
				end: '',
				bidding: '',
				description: ''
			}),
			media: [],
			mediaErrors: [],
			processing: false
		};
	},

	computed: {
		categories: function categories() {
			return this.$store.getters.getCategories;
		},
		regions: function regions() {
			return this.$store.getters.getRegions;
		},
		finalData: function finalData() {
			var formData = new FormData();

			formData.append('title', this.form.title);
			formData.append('category', this.form.category);
			formData.append('region', this.form.region || '');
			formData.append('city', this.form.city);
			formData.append('start', this.stripTime(this.form.start));
			formData.append('end', this.stripTime(this.form.start));
			formData.append('bidding', this.form.bidding);
			formData.append('description', this.form.description);

			// Append the media if there is any.
			for (var i = 0; i < this.media.length; i++) {
				formData.append('media[]', this.media[i]);
			}

			return formData;
		}
	},
	methods: {
		stripTime: function stripTime(date) {
			return date instanceof Date ? date.getFullYear() + '-' + this.pad(date.getMonth() + 1) + '-' + this.pad(date.getDate()) : date;
		},
		pad: function pad(number) {
			return number < 10 ? "0" + number : number;
		},
		mediaAdded: function mediaAdded(_ref) {
			var files = _ref.files;

			for (var i = 0; i < files.length; i++) {
				this.media.push(files[i]);
			}
		},
		mediaRemoved: function mediaRemoved(_ref2) {
			var index = _ref2.index;

			this.media.splice(index, 1);
			if (this.mediaErrors[index]) {
				this.mediaErrors.splice(index, 1);
			}
		},
		create: function create() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('services').create(this.finalData).then(function (response) {
				_this.form.reset();
				_this.media = [];
				_this.mediaErrors = [];
				// Break the cache
				_this.$store.commit('SET_SERVICES_FETCHED', { fetched: false });
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Woohoo! Vi skapade din tjänst.' });
				$("html, body").animate({ scrollTop: 0 }, "fast");
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.mediaErrors = [];
				// Log the media errors seperatly.
				for (var key in error) {
					if (key.includes('media')) {
						var index = key.split('.')[1];
						_this.mediaErrors[index] = error[key];
					}
				}
				_this.processing = false;
			});
		}
	}
});

/***/ }),

/***/ 325:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(326),
  /* template */
  __webpack_require__(327),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/UploadMedia.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] UploadMedia.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5eb1383e", Component.options)
  } else {
    hotAPI.reload("data-v-5eb1383e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 326:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['media', 'errors', 'disabled'],
	methods: {
		add: function add(files) {
			if (files.length) {
				this.$emit('added', { files: files });
			}
		},
		remove: function remove(index) {
			this.$emit('removed', { index: index });
		},
		type: function type(_type) {
			return _type.includes('image/') ? 'fa-file-image-o' : 'fa-file-text-o';
		},
		size: function size(_size) {
			if (_size < 1000) {
				return _size + ' b';
			} else if (_size > 1000000) {
				var s = _size / 1000000;
				return s.toFixed(1) + ' mb';
			} else {
				var _s = _size / 1000;
				return _s.toFixed(1) + ' kb';
			}
		}
	}
});

/***/ }),

/***/ 327:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "upload_media-component"
  }, [_c('h4', [_vm._v("Ladda upp media")]), _vm._v(" "), _c('div', {
    staticClass: "help-text mb15"
  }, [_vm._v("Har du bilder, ritningar eller annan media som du vill lägga till?")]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-6 col-sm-push-3"
  }, [_c('ul', {
    staticClass: "media"
  }, _vm._l((_vm.media), function(file, index) {
    return _c('li', [_c('i', {
      staticClass: "fa icon",
      class: [_vm.type(file.type)],
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "file-name",
      class: {
        'has-error': _vm.errors[index]
      }
    }, [_vm._v(_vm._s(file.name))]), _vm._v(" "), _c('span', {
      staticClass: "file-size"
    }, [_vm._v(_vm._s(_vm.size(file.size)))]), _vm._v(" "), _c('i', {
      staticClass: "fa fa-times clickable remove",
      attrs: {
        "aria-hidden": "true"
      },
      on: {
        "click": function($event) {
          _vm.remove(index)
        }
      }
    }), _vm._v(" "), (_vm.errors[index]) ? _c('div', {
      staticClass: "error-block",
      domProps: {
        "textContent": _vm._s(_vm.errors[index][0])
      }
    }) : _vm._e()])
  }))])]), _vm._v(" "), _c('label', {
    staticClass: "btn btn-primary"
  }, [_c('i', {
    staticClass: "fa fa-picture-o",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Välj media\n\t\t"), _c('input', {
    staticClass: "hidden",
    attrs: {
      "type": "file",
      "multiple": "",
      "disabled": _vm.disabled
    },
    on: {
      "change": function($event) {
        _vm.add($event.target.files)
      }
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5eb1383e", module.exports)
  }
}

/***/ }),

/***/ 328:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "create_service-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Skapa Tjänst")]), _vm._v(" "), _c('form', {
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
      'has-error': _vm.form.errors.has('category')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Huvudkategori")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.rootCategory),
      expression: "form.rootCategory"
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
        _vm.form.rootCategory = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj huvudkategori")]), _vm._v(" "), _vm._l((_vm.categories), function(category) {
    return _c('option', {
      domProps: {
        "value": category,
        "textContent": _vm._s(category.name)
      }
    })
  })], 2), _vm._v(" "), (_vm.form.errors.has('category')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('category'))
    }
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('category')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Kategori")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.category),
      expression: "form.category"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": !_vm.form.rootCategory
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.category = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj kategori")]), _vm._v(" "), _vm._l((_vm.form.rootCategory.sub_categories), function(sub) {
    return _c('option', {
      domProps: {
        "value": sub.id,
        "textContent": _vm._s(sub.name)
      }
    })
  })], 2), _vm._v(" "), (_vm.form.errors.has('category')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('category'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('region')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Region")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.region),
      expression: "form.region"
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
        _vm.form.region = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj region")]), _vm._v(" "), _vm._l((_vm.regions), function(region) {
    return _c('option', {
      domProps: {
        "value": region,
        "textContent": _vm._s(region.name)
      }
    })
  })], 2), _vm._v(" "), (_vm.form.errors.has('region')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('region'))
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
      value: (_vm.form.city),
      expression: "form.city"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": !_vm.form.region
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.city = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj stad")]), _vm._v(" "), _vm._l((_vm.form.region.cities), function(city) {
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
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('bidding')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Budgivning")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.form.bidding),
      expression: "form.bidding",
      modifiers: {
        "number": true
      }
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return _vm._n(val)
        });
        _vm.form.bidding = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj antal dagar för budgivning")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "7"
    }
  }, [_vm._v("7")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "14"
    }
  }, [_vm._v("14")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "30"
    }
  }, [_vm._v("30")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "60"
    }
  }, [_vm._v("60")])]), _vm._v(" "), (_vm.form.errors.has('bidding')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('bidding'))
    }
  }) : _vm._e(), _vm._v(" "), _c('small', [_vm._v("Hur många dagar ska budgivningen pågå?")])])])]), _vm._v(" "), _c('div', {
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
  }) : _vm._e()])])]), _vm._v(" "), _c('app-upload-media', {
    attrs: {
      "media": _vm.media,
      "errors": _vm.mediaErrors,
      "disabled": _vm.processing
    },
    on: {
      "added": _vm.mediaAdded,
      "removed": _vm.mediaRemoved
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('button', {
    staticClass: "btn btn-primary full-width",
    class: {
      'processing': _vm.processing
    },
    attrs: {
      "disabled": _vm.processing || this.form.errors.any()
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.create($event)
      }
    }
  }, [_vm._v("Skapa din tjänst")])])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5add2834", module.exports)
  }
}

/***/ })

});