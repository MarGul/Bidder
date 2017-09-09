webpackJsonp([16],{

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(337),
  /* template */
  __webpack_require__(338),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/MyProjects.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MyProjects.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1aea1dc2", Component.options)
  } else {
    hotAPI.reload("data-v-1aea1dc2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 337:
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
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	computed: {
		fetched: function fetched() {
			return this.$store.getters.userProjectsFetched;
		},
		projects: function projects() {
			return this.$store.getters.userProjects;
		}
	},
	methods: {
		show: function show(project) {
			this.$store.commit('SET_PROJECT_FOCUS', { project: project });
			this.$router.push('/user/project/' + project.id);
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserProjects');
		}
	}
});

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_projects-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [(_vm.fetched) ? [(_vm.projects.length > 0) ? _c('ul', {
    staticClass: "user-items-list"
  }, _vm._l((_vm.projects), function(project) {
    return _c('li', [_c('span', {
      staticClass: "item-content",
      domProps: {
        "textContent": _vm._s(project.title || ("# " + (project.id)))
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "item-actions"
    }, [_c('button', {
      staticClass: "btn btn-default",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.show(project)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-briefcase",
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v(" Visa projekt\n\t\t\t\t\t\t\t")]), _vm._v(" "), _c('div', {
      staticClass: "status"
    }, [(project.completed) ? [_vm._v("\n\t\t\t\t\t\t\t\t\tAvslutad\n\t\t\t\t\t\t\t\t")] : [_vm._v("\n\t\t\t\t\t\t\t\t\tPågående\n\t\t\t\t\t\t\t\t")]], 2)])])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("\n\t\t\t\t\tDu har ännu inga skapade projekt.\n\t\t\t\t")])] : _c('app-loading')], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Mina projekt")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1aea1dc2", module.exports)
  }
}

/***/ })

});