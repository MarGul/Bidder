webpackJsonp([22],{

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(409),
  /* template */
  __webpack_require__(410),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Bids/BidHistory.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BidHistory.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-180989d8", Component.options)
  } else {
    hotAPI.reload("data-v-180989d8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Ratings__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Ratings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Includes_Ratings__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appRatings: __WEBPACK_IMPORTED_MODULE_1__Includes_Ratings___default.a
	},
	data: function data() {
		return {
			bids: [],
			fetched: false,
			accepted: false,
			focus: '',
			processing: false
		};
	},

	methods: {
		time: function time(t) {
			return moment(t).format("LLL");
		},
		accept: function accept(bid) {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]("services/" + bid.service_id + "/bids/" + bid.id + "/accept").post().then(function (response) {
				_this.accepted = true;
				_this.$store.dispatch('showNotification', {
					type: 'success',
					msg: 'Woohoo! Budet var accepterat. Vi har skapat ett nytt projekt åt dig som du hittar under "Mina projekt".'
				});
				bid.accepted = true;
				// Set the projects fetched to false so we break the cache.
				_this.$store.commit('SET_PROJECTS_FETCHED', { fetched: false });
				_this.processing = false;
			}).catch(function (error) {
				console.log(error);
			});
		}
	},
	created: function created() {
		var _this2 = this;

		// Fetch bids for the service.
		new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('services/{id}/bids').setId(this.$route.params.id).get().then(function (response) {
			_this2.bids = response.bids;
			_this2.accepted = !!response.meta.bid_accepted;
			_this2.fetched = true;
		}).catch(function (error) {});
	}
});

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bid_history-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Budhistorik")]), _vm._v(" "), (_vm.fetched) ? [(_vm.bids.length > 0) ? _c('ul', {
    staticClass: "list-unstyled list-bids"
  }, _vm._l((_vm.bids), function(bid) {
    return _c('li', [_c('div', {
      staticClass: "bid-header"
    }, [_c('div', {
      staticClass: "row"
    }, [_c('div', {
      staticClass: "col-xs-12 col-sm-6 col-md-7"
    }, [_c('div', {
      staticClass: "bid-user history-padding"
    }, [_c('a', {
      staticClass: "link"
    }, [_vm._v(_vm._s(bid.user.username))]), _vm._v(" "), _c('span', {
      staticClass: "user-reviews"
    }, [_c('app-ratings', {
      attrs: {
        "rating": 4.5,
        "total": 8
      }
    })], 1)])]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-12 col-sm-6 col-md-5 bid-head-right"
    }, [(!_vm.accepted) ? _c('button', {
      staticClass: "btn btn-info",
      attrs: {
        "disabled": _vm.processing
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.focus = bid.id
        }
      }
    }, [_vm._v("\n\t\t\t\t\t\t\t\tAcceptera budet\n\t\t\t\t\t\t\t")]) : _vm._e(), _vm._v(" "), (_vm.accepted && bid.accepted) ? _c('div', {
      staticClass: "accepted-bid"
    }, [_c('i', {
      staticClass: "fa fa-check",
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v(" Accepterat bud\n\t\t\t\t\t\t\t")]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "bid-time",
      domProps: {
        "textContent": _vm._s(_vm.time(bid.created_at))
      }
    })]), _vm._v(" "), (!_vm.accepted && _vm.focus == bid.id) ? _c('div', {
      staticClass: "col-xs-12"
    }, [_c('div', {
      staticClass: "alert alert-warning bid-accept-confirm"
    }, [_vm._v("\n\t\t\t\t\t\t\t\tNär du accepterar ett bud kommer budgivningen för tjänsten att stoppas.\n\t\t\t\t\t\t\t\t"), _c('div', {
      staticClass: "confirm-buttons text-center"
    }, [_c('button', {
      staticClass: "btn btn-success",
      class: {
        'processing': _vm.processing
      },
      attrs: {
        "disabled": _vm.processing
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.accept(bid)
        }
      }
    }, [_vm._v("\n\t\t\t\t\t\t\t\t\t\tAcceptera\n\t\t\t\t\t\t\t\t\t")]), _vm._v(" "), _c('button', {
      staticClass: "btn btn-danger",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.focus = ''
        }
      }
    }, [_vm._v("Avbryt")])])])]) : _vm._e()])]), _vm._v(" "), _c('div', {
      staticClass: "bid-info"
    }, [_c('div', {
      staticClass: "row"
    }, [_c('div', {
      staticClass: "col-xs-6 col-md-3 text-center info-section"
    }, [_c('div', {
      staticClass: "info-head"
    }, [_vm._v("Starta utförandet")]), _vm._v(" "), _c('div', {
      staticClass: "info-value",
      domProps: {
        "textContent": _vm._s(bid.start)
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-6 col-md-3 text-center info-section"
    }, [_c('div', {
      staticClass: "info-head"
    }, [_vm._v("Avsluta utförandet")]), _vm._v(" "), _c('div', {
      staticClass: "info-value",
      domProps: {
        "textContent": _vm._s(bid.end)
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-6 col-md-3 text-center info-section"
    }, [_c('div', {
      staticClass: "info-head"
    }, [_vm._v("Antal timmar")]), _vm._v(" "), _c('div', {
      staticClass: "info-value",
      domProps: {
        "textContent": _vm._s(_vm.filters.commaSeparator(bid.hours))
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "col-xs-6 col-md-3 text-center info-section"
    }, [_c('div', {
      staticClass: "info-head"
    }, [_vm._v("Pris")]), _vm._v(" "), _c('div', {
      staticClass: "info-value",
      domProps: {
        "textContent": _vm._s(_vm.filters.currency(bid.price))
      }
    })])])]), _vm._v(" "), _c('div', {
      staticClass: "bid-description",
      domProps: {
        "textContent": _vm._s(bid.description)
      }
    })])
  })) : _c('div', {
    staticClass: "alert alert-info text-center"
  }, [_vm._v("\n\t\t\tDär finns inga bud för denna tjänsten.\n\t\t")])] : _c('app-loading')], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-180989d8", module.exports)
  }
}

/***/ })

});