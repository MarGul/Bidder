webpackJsonp([17],{

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(379),
  /* template */
  __webpack_require__(380),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Invoices/InvoiceDetails.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] InvoiceDetails.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f8d4c97c", Component.options)
  } else {
    hotAPI.reload("data-v-f8d4c97c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 379:
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
		invoice: function invoice() {
			return this.$store.getters.userInvoiceFocus;
		},
		paid: function paid() {
			return this.invoice.payments.length > 0;
		},
		invoiceCreated: function invoiceCreated() {
			return moment(this.invoice.created_at).format('LLL');
		},
		invoiceDue: function invoiceDue() {
			return moment(this.invoice.due).format('D MMMM YYYY');
		}
	},
	methods: {},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserInvoices', { focusId: this.$route.params.id - 1000000 });
		}
	}
});

/***/ }),

/***/ 380:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "invoice_details-component"
  }, [(_vm.fetched) ? [_c('div', {
    staticClass: "panel panel-success"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('i', {
    staticClass: "fa fa-balance-scale",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Faktura #" + _vm._s(1000000 + _vm.invoice.id) + "\n\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "invoice-text"
  }, [_vm._v("Bla")]), _vm._v(" "), _c('div', {
    staticClass: "invoice-details"
  }, [_c('ul', {
    staticClass: "list-unstyled"
  }, [_c('li', [_c('strong', [_vm._v("Betald:")]), _vm._v(" " + _vm._s(_vm.paid ? 'Ja' : 'Nej'))]), _vm._v(" "), _c('li', [_c('strong', [_vm._v("Skapad:")]), _vm._v(" " + _vm._s(_vm.invoiceCreated))]), _vm._v(" "), _c('li', [_c('strong', [_vm._v("Förfallodag:")]), _vm._v(" " + _vm._s(_vm.invoiceDue))]), _vm._v(" "), _c('li', [_c('strong', [_vm._v("Totalpris:")]), _vm._v(" " + _vm._s(_vm.filters.currency(_vm.invoice.total)))]), _vm._v(" "), _c('li', [_c('strong', [_vm._v("Varav moms:")]), _vm._v(" " + _vm._s(_vm.filters.currency(_vm.invoice.vat)))]), _vm._v(" "), _c('li', {
    staticClass: "invoice-download"
  }, [_c('a', {
    staticClass: "btn btn-primary",
    attrs: {
      "href": ("/download-invoice/" + (_vm.invoice.hash)),
      "target": "_blank"
    }
  }, [_vm._v("Ladda ner faktura")])])])])])]), _vm._v(" "), (!_vm.paid) ? _c('div', {
    staticClass: "alert alert-warning"
  }, [_vm._v("\n\t\t\tHär ska payment iFrame finnas\n\t\t")]) : _vm._e()] : _c('app-loading')], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f8d4c97c", module.exports)
  }
}

/***/ })

});