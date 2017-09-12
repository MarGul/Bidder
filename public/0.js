webpackJsonp([0],{

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(309),
  /* template */
  __webpack_require__(319),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/Profile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Profile.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d33af27", Component.options)
  } else {
    hotAPI.reload("data-v-2d33af27", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Account__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Account___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Account__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ChangePassword__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ChangePassword___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ChangePassword__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProfilePicture__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProfilePicture___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ProfilePicture__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appAccount: __WEBPACK_IMPORTED_MODULE_0__Account___default.a,
		appChangePassword: __WEBPACK_IMPORTED_MODULE_1__ChangePassword___default.a,
		appProfilePicture: __WEBPACK_IMPORTED_MODULE_2__ProfilePicture___default.a
	}
});

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(311),
  /* template */
  __webpack_require__(312),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/Account.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Account.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-563ccdab", Component.options)
  } else {
    hotAPI.reload("data-v-563ccdab", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 311:
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




/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				name: this.$store.getters.authUser.name,
				username: this.$store.getters.authUser.username,
				bio: this.$store.getters.authUser.bio
			}),
			processing: false
		};
	},

	methods: {
		update: function update() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('users/{id}/profile').update(this.$store.getters.authUser.id, this.form.data()).then(function (response) {
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Nice! Du uppdaterade din profil.' });
				_this.$store.commit('SET_USER', { user: response.user });
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
});

/***/ }),

/***/ 312:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "account-component"
  }, [_c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('name')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Namn")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.name),
      expression: "form.name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.form.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.name = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('name')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('name'))
    }
  }) : _vm._e(), _vm._v(" "), _c('small', [_vm._v("Namnet som visas på din publika profil.")])]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('username')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Användarnamn")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.username),
      expression: "form.username"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.form.username)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.username = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('username')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('username'))
    }
  }) : _vm._e(), _vm._v(" "), _c('small', [_vm._v("Ditt unika namn")])]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('bio')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Profiltext")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.bio),
      expression: "form.bio"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "4"
    },
    domProps: {
      "value": (_vm.form.bio)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.bio = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('bio')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('bio'))
    }
  }) : _vm._e(), _vm._v(" "), _c('small', [_vm._v("En beskrivning av dig själv eller ditt företag. Detta kommer att visas på din publika profil.")])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('button', {
    staticClass: "btn btn-primary full-width",
    class: {
      'processing': _vm.processing
    },
    attrs: {
      "type": "submit",
      "disabled": _vm.processing || this.form.errors.any()
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.update($event)
      }
    }
  }, [_vm._v("Uppdatera din profil")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-563ccdab", module.exports)
  }
}

/***/ }),

/***/ 313:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(314),
  /* template */
  __webpack_require__(315),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/ChangePassword.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ChangePassword.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b64cd46", Component.options)
  } else {
    hotAPI.reload("data-v-0b64cd46", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 314:
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




/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				old: '',
				new: '',
				again: ''
			}),
			processing: false
		};
	},

	methods: {
		update: function update() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('users/{id}/password').update(this.$store.getters.authUser.id, this.form.data(), 'put').then(function (response) {
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Nice! Du uppdaterade ditt lösenord.' });
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

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "change_password-component"
  }, [_c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('old')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Ditt gamla lösenord")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.old),
      expression: "form.old"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password"
    },
    domProps: {
      "value": (_vm.form.old)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.old = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('old')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('old'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('new')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Nytt lösenord")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.new),
      expression: "form.new"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password"
    },
    domProps: {
      "value": (_vm.form.new)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.new = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('new')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('new'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('again')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Repetera nytt lösenord")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.again),
      expression: "form.again"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password"
    },
    domProps: {
      "value": (_vm.form.again)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.again = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('again')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('again'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('button', {
    staticClass: "btn btn-primary full-width",
    class: {
      'processing': _vm.processing
    },
    attrs: {
      "type": "submit",
      "disabled": _vm.processing || this.form.errors.any()
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.update($event)
      }
    }
  }, [_vm._v("Uppdatera ditt lösenord")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0b64cd46", module.exports)
  }
}

/***/ }),

/***/ 316:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(317),
  /* template */
  __webpack_require__(318),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/ProfilePicture.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ProfilePicture.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c54c5f2", Component.options)
  } else {
    hotAPI.reload("data-v-3c54c5f2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(3);
//
//
//
//
//
//
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
			breakpoints: window.breakpoints,
			processing: false,
			hover: false
		};
	},

	computed: {
		image: function image() {
			return this.$store.getters.authUser.avatar;
		}
	},
	methods: {
		upload: function upload(files) {
			var _this = this;

			if (files.length) {
				this.processing = true;

				var formData = new FormData();
				formData.append('avatar', files[0], files[0].name);

				new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('users/' + this.$store.getters.authUser.id + '/avatar').post(formData).then(function (response) {
					_this.$store.commit('SET_USER', { user: response.user });
					_this.$store.dispatch('showNotification', { type: 'success', msg: 'Nice! Du uppdaterade din avatar.' });
					_this.processing = false;
				}).catch(function (error) {
					_this.$store.dispatch('showNotification', { type: 'error', msg: 'Vi kunde inte uppdatera din avatar. Var god försök igen.' });
				});
			}
		}
	}
});

/***/ }),

/***/ 318:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "profile_picture-component"
  }, [(_vm.breakpoints.isSmallDevices()) ? _c('h2', {
    staticClass: "user-component-title subsection text-left"
  }, [_vm._v("Uppdatera din avatar")]) : _vm._e(), _vm._v(" "), _c('form', {
    attrs: {
      "enctype": "multipart/form-data"
    }
  }, [_c('label', {
    staticClass: "profile-picture-label clickable",
    on: {
      "mouseenter": function($event) {
        _vm.hover = true
      },
      "mouseleave": function($event) {
        _vm.hover = false
      }
    }
  }, [_c('img', {
    staticClass: "img-responsive",
    class: {
      opacity: _vm.hover || _vm.processing
    },
    attrs: {
      "src": _vm.image
    }
  }), _vm._v(" "), (_vm.hover || _vm.processing || _vm.breakpoints.isSmallDevices()) ? _c('span', {
    staticClass: "btn btn-default",
    class: {
      processing: _vm.processing
    }
  }, [_c('i', {
    staticClass: "fa fa-picture-o mr5",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Ladda upp ny bild\n\t\t\t")]) : _vm._e(), _vm._v(" "), _c('input', {
    staticClass: "hidden",
    attrs: {
      "type": "file",
      "accept": "image/*",
      "disabled": _vm.processing
    },
    on: {
      "change": function($event) {
        _vm.upload($event.target.files)
      }
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c54c5f2", module.exports)
  }
}

/***/ }),

/***/ 319:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "profile-component"
  }, [_c('section', {
    staticClass: "white-contentSection mb30"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-8"
  }, [_c('app-account')], 1), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4"
  }, [_c('app-profile-picture')], 1)])])]), _vm._v(" "), _c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [_c('app-change-password')], 1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Min profil")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Uppdatera ditt lösenord")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d33af27", module.exports)
  }
}

/***/ })

});