webpackJsonp([15],{

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(329),
  /* template */
  __webpack_require__(330),
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

/***/ 329:
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
		},
		projectCreated: function projectCreated(project) {
			return moment(project.created_at).format('LLL');
		},
		projectFinish: function projectFinish(project) {
			return moment(project.finish).format('LL');
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserProjects');
		}
	}
});

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_projects-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Mina projekt")]), _vm._v(" "), (_vm.fetched) ? [(_vm.projects.length > 0) ? _c('ul', {
    staticClass: "user-items-list"
  }, _vm._l((_vm.projects), function(project) {
    return _c('li', [_c('span', {
      staticClass: "item-content"
    }, [_c('h5', {
      domProps: {
        "textContent": _vm._s(project.title || ("# " + (project.id)))
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "item-content-details"
    }, [_c('span', {
      staticClass: "mr5"
    }, [_vm._v("Skapades den " + _vm._s(_vm.projectCreated(project)))]), _vm._v("•\n\t\t\t\t\t\t"), _c('span', {
      staticClass: "ml5 mr5"
    }, [_vm._v("Projektet " + _vm._s(project.completed ? 'är avslutad' : 'pågår'))]), _vm._v("•\n\t\t\t\t\t\t"), _c('span', {
      staticClass: "ml5"
    }, [_vm._v(_vm._s(project.completed ? 'Avslutades' : 'Avslutas') + " den " + _vm._s(_vm.projectFinish(project)))])])]), _vm._v(" "), _c('span', {
      staticClass: "item-actions"
    }, [_c('div', {
      staticClass: "status"
    }, [_c('button', {
      staticClass: "btn btn-primary",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.show(project)
        }
      }
    }, [_vm._v("Visa projekt")])])])])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("\n\t\t\tDu har ännu inga skapade projekt.\n\t\t")])] : _c('app-loading')], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1aea1dc2", module.exports)
  }
}

/***/ })

});