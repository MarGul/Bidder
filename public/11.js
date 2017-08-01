webpackJsonp([11],{

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(306),
  /* template */
  __webpack_require__(307),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/User.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] User.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-95a9e666", Component.options)
  } else {
    hotAPI.reload("data-v-95a9e666", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_Notifications__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_Notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Includes_Notifications__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appNotifications: __WEBPACK_IMPORTED_MODULE_0__components_Includes_Notifications___default.a
	},
	data: function data() {
		return {
			breakpoints: window.breakpoints
		};
	},

	methods: {
		toggleDropdown: function toggleDropdown() {
			this.$store.commit('SET_MOBILE_DROPDOWN', {
				mobileDropdown: !this.$store.getters.mobileAuthDropdown
			});
		},
		logout: function logout() {
			this.$store.dispatch('logout');
			this.$router.push('/');
		}
	}
});

/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-component"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content"
  }, [(_vm.breakpoints.isSmallDevices()) ? _c('div', {
    staticClass: "mobile-user-nav clearfix"
  }, [_c('div', {
    staticClass: "mobile-user-buttons"
  }, [_c('button', {
    staticClass: "btn btn-transparent logout-btn",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.logout($event)
      }
    }
  }, [_vm._v("\n\t\t\t\t\t\tLogga Ut "), _c('i', {
    staticClass: "fa fa-power-off",
    attrs: {
      "aria-hidden": "true"
    }
  })]), _vm._v(" "), (_vm.breakpoints.isSmallDevices()) ? _c('button', {
    staticClass: "btn btn-primary nav-btn",
    class: {
      open: _vm.$store.getters.mobileAuthDropdown
    },
    on: {
      "click": _vm.toggleDropdown
    }
  }, [_vm._v("\n\t\t\t\t\t\tMeny "), _c('i', {
    staticClass: "fa fa-chevron-down",
    attrs: {
      "aria-hidden": "true"
    }
  })]) : _vm._e()])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "user-ui-container"
  }, [_c('div', {
    staticClass: "user-ui-nav"
  }, [(_vm.$store.getters.mobileAuthDropdown || !_vm.breakpoints.isSmallDevices()) ? _c('ul', {
    staticClass: "user-nav"
  }, [_c('li', [_c('router-link', {
    attrs: {
      "to": "/user/profile"
    }
  }, [_vm._v("Profil")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/notifications"
    }
  }, [_vm._v("Notifikationer")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/create-service"
    }
  }, [_vm._v("Skapa tjänst")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/services"
    }
  }, [_vm._v("Mina tjänster")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/bids"
    }
  }, [_vm._v("Mina bud")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/projects"
    }
  }, [_vm._v("Mina projekt")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/subscriptions"
    }
  }, [_vm._v("Prenumerationer")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/invoices"
    }
  }, [_vm._v("Betalningar")])], 1)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "user-ui-content"
  }, [_c('router-view')], 1)])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-95a9e666", module.exports)
  }
}

/***/ })

});