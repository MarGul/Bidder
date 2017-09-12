webpackJsonp([11],{

/***/ 241:
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
  __webpack_require__(382),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Invoices/MyInvoices.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MyInvoices.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-880794c2", Component.options)
  } else {
    hotAPI.reload("data-v-880794c2", Component.options)
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
var update = __webpack_require__(8)("e559c668", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-880794c2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MyInvoices.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-880794c2\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MyInvoices.vue");
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

exports = module.exports = __webpack_require__(424)(undefined);
// imports


// module
exports.push([module.i, "\n.payment-status {\n  margin-right: 10px;\n  font-size: 12px;\n}\n.payment-status i {\n    margin-right: 3px;\n}\n.payment-status.paid {\n    color: #5cb85c;\n}\n.payment-status.not-paid {\n    color: #d9534f;\n}\n", ""]);

// exports


/***/ }),

/***/ 381:
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
	computed: {
		fetched: function fetched() {
			return this.$store.getters.userInvoicesFetched;
		},
		invoices: function invoices() {
			return this.$store.getters.userInvoices;
		}
	},
	methods: {
		paidText: function paidText(invoice) {
			return invoice.payments.length ? 'Betalad' : 'Ej betald';
		},
		dueDate: function dueDate(invoice) {
			return moment(invoice.due).format('LL');
		},
		show: function show(invoice) {
			this.$store.commit('SET_INVOICE_FOCUS', { invoice: invoice });
			this.$router.push('/user/invoices/' + (1000000 + invoice.id));
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserInvoices');
		}
	}
});

/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_invoices-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [(_vm.fetched) ? [(_vm.invoices.length > 0) ? _c('ul', {
    staticClass: "user-items-list"
  }, _vm._l((_vm.invoices), function(invoice) {
    return _c('li', [_c('span', {
      staticClass: "item-content"
    }, [_vm._v("\n\t\t\t\t\t\t\tFaktura #" + _vm._s(1000000 + invoice.id) + "\n\t\t\t\t\t\t")]), _vm._v(" "), _c('span', {
      staticClass: "item-actions"
    }, [_c('span', {
      staticClass: "payment-status",
      class: _vm.paidClass(invoice)
    }, [_c('i', {
      staticClass: "fa",
      class: _vm.paidIcon(invoice),
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v("\n\t\t\t\t\t\t\t\t" + _vm._s(_vm.paidText(invoice)) + "\n\t\t\t\t\t\t\t")]), _vm._v(" "), _c('button', {
      staticClass: "btn btn-primary",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.show(invoice)
        }
      }
    }, [_vm._v("Visa detaljer")])])])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("\n\t\t\t\t\tDär finns inga betalningar registrerade på dig.\n\t\t\t\t")])] : _c('app-loading')], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Betalningar")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-880794c2", module.exports)
  }
}

/***/ })

});