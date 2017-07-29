webpackJsonp([4],{

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(297),
  /* template */
  __webpack_require__(304),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Profile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Profile.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-29ab18d2", Component.options)
  } else {
    hotAPI.reload("data-v-29ab18d2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Reviews_ShowReviews__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Reviews_ShowReviews___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Reviews_ShowReviews__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appShowReviews: __WEBPACK_IMPORTED_MODULE_1__components_Reviews_ShowReviews___default.a
	},
	data: function data() {
		return {
			fetched: false,
			user: {},
			breakpoints: window.breakpoints
		};
	},

	computed: {
		avatar: function avatar() {
			return { backgroundImage: 'url("' + this.user.avatar + '")' };
		},
		member_since: function member_since() {
			return moment(this.user.created_at).format('D MMM, YYYY');
		}
	},
	watch: {
		'$route': function $route() {
			this.fetchUser();
		}
	},
	methods: {
		fetchUser: function fetchUser() {
			var _this = this;

			this.fetched = false;
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('users/' + this.$route.params.username).get().then(function (response) {
				_this.user = response.user;
				_this.fetched = true;
			}).catch(function (error) {
				console.log(error);
			});
		}
	},
	created: function created() {
		this.fetchUser();
	}
});

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(299),
  /* template */
  __webpack_require__(303),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Reviews/ShowReviews.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ShowReviews.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-41476a92", Component.options)
  } else {
    hotAPI.reload("data-v-41476a92", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Review__ = __webpack_require__(300);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Review___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Review__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	props: ['username', 'rating', 'reviews'],
	components: {
		appRatings: __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default.a,
		appReview: __WEBPACK_IMPORTED_MODULE_1__Review___default.a
	},
	computed: {
		avg: function avg() {
			return this.rating ? this.rating.avg : 0.0;
		},
		count: function count() {
			return this.rating ? this.rating.count : 0;
		},
		communication: function communication() {
			return this.rating ? this.rating.communication : 0.0;
		},
		as_described: function as_described() {
			return this.rating ? this.rating.as_described : 0.0;
		}
	}
});

/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(301),
  /* template */
  __webpack_require__(302),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Reviews/Review.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Review.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-14157fd4", Component.options)
  } else {
    hotAPI.reload("data-v-14157fd4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_heartbeat__ = __webpack_require__(131);
//
//
//
//
//
//
//
//
//
//
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
	props: ['review'],
	components: {
		appRatings: __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default.a
	},
	data: function data() {
		return {
			reviewedAt: null
		};
	},

	methods: {
		avatar: function avatar(_avatar) {
			return { backgroundImage: 'url(' + _avatar + ')' };
		}
	},
	created: function created() {
		var _this = this;

		this.reviewedAt = moment(this.review.created_at).fromNow();
		__WEBPACK_IMPORTED_MODULE_1__includes_heartbeat__["a" /* HeartBeat */].$on('beat', function () {
			_this.reviewedAt = moment(_this.review.created_at).fromNow();
		});
	}
});

/***/ }),

/***/ 302:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "review"
  }, [(_vm.review.reviewer) ? _c('div', {
    staticClass: "reviewer text-center"
  }, [_c('div', {
    staticClass: "reviewer-avatar",
    style: (_vm.avatar(_vm.review.reviewer.avatar))
  }), _vm._v(" "), _c('div', {
    staticClass: "reviewed-by mt5"
  }, [_vm._v("Omdömme av")]), _vm._v(" "), _c('div', {
    staticClass: "reviewer-username is-weight-500"
  }, [_c('router-link', {
    attrs: {
      "to": ("/profile/" + (_vm.review.reviewer.username.toLowerCase()))
    },
    domProps: {
      "textContent": _vm._s(_vm.review.reviewer.username)
    }
  })], 1)]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "review-text"
  }, [_c('div', {
    staticClass: "review-text-header"
  }, [_c('app-ratings', {
    attrs: {
      "rating": _vm.review.would_recommend,
      "showCount": false
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "reviewed-at",
    domProps: {
      "textContent": _vm._s(_vm.reviewedAt)
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "review-text-body",
    domProps: {
      "textContent": _vm._s(_vm.review.review)
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-14157fd4", module.exports)
  }
}

/***/ }),

/***/ 303:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "show_reviews-component"
  }, [_c('div', {
    staticClass: "rating-container"
  }, [_c('h4', {
    staticClass: "review-username"
  }, [_vm._v(_vm._s(_vm.username) + "'s omdömmen")]), _vm._v(" "), _c('div', {
    staticClass: "review-ratings"
  }, [_c('app-ratings', {
    attrs: {
      "rating": _vm.avg,
      "total": _vm.count,
      "showAvg": true,
      "size": "large"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "ratings-details-container"
  }, [_c('div', {
    staticClass: "detail-container text-center"
  }, [_c('div', {
    staticClass: "detail-heading"
  }, [_vm._v("Kommunikation")]), _vm._v(" "), _c('app-ratings', {
    attrs: {
      "rating": _vm.communication,
      "showCount": false
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "detail-container text-center"
  }, [_c('div', {
    staticClass: "detail-heading"
  }, [_vm._v("Som avtalat")]), _vm._v(" "), _c('app-ratings', {
    attrs: {
      "rating": _vm.as_described,
      "showCount": false
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "detail-container text-center"
  }, [_c('div', {
    staticClass: "detail-heading"
  }, [_vm._v("Skulle rekommendera")]), _vm._v(" "), _c('app-ratings', {
    attrs: {
      "rating": _vm.avg,
      "showCount": false
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "reviewes-container"
  }, _vm._l((_vm.reviews), function(review) {
    return _c('app-review', {
      key: review.id,
      attrs: {
        "review": review
      }
    })
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-41476a92", module.exports)
  }
}

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "profile-component"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content"
  }, [(_vm.fetched) ? [_c('div', {
    staticClass: "row"
  }, [(!_vm.breakpoints.isMobile()) ? _c('div', {
    staticClass: "col-sm-3"
  }, [_c('img', {
    staticClass: "profile-picture-desktop",
    attrs: {
      "src": _vm.user.avatar,
      "alt": ("Profilbild för " + (_vm.user.name))
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "profile-info"
  }, [_c('h3', {
    staticClass: "profile-username",
    domProps: {
      "textContent": _vm._s(_vm.user.username)
    }
  }), _vm._v(" "), _c('ul', {
    staticClass: "list-unstyled"
  }, [_c('li', [_c('i', {
    staticClass: "fa fa-user"
  }), _vm._v("Medlem sedan " + _vm._s(_vm.member_since))])])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "col-sm-9"
  }, [_c('div', {
    staticClass: "white-container mb30"
  }, [_c('div', {
    staticClass: "user-header"
  }, [(_vm.breakpoints.isMobile()) ? _c('div', {
    staticClass: "profile-picture",
    style: (_vm.avatar)
  }) : _vm._e(), _vm._v(" "), _c('h4', {
    staticClass: "user-name",
    domProps: {
      "textContent": _vm._s(_vm.user.name)
    }
  })]), _vm._v(" "), (_vm.user.bio) ? _c('div', {
    staticClass: "user-bio"
  }, [_c('pre', {
    staticClass: "no-pre-style",
    domProps: {
      "textContent": _vm._s(_vm.user.bio)
    }
  })]) : _c('div', {
    staticClass: "alert alert-warning text-center"
  }, [_vm._v("\n\t\t\t\t\t\t\t\t" + _vm._s(_vm.user.name) + " har ingen beskrivning än.\n\t\t\t\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "white-container"
  }, [_c('app-show-reviews', {
    attrs: {
      "username": _vm.user.username,
      "rating": _vm.user.rating,
      "reviews": _vm.user.reviews
    }
  })], 1)])])] : _c('app-loading', {
    attrs: {
      "bg": "gray"
    }
  })], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-29ab18d2", module.exports)
  }
}

/***/ })

});