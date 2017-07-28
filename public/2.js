webpackJsonp([2],{

/***/ 229:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(278)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(280),
  /* template */
  __webpack_require__(293),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6398b14f",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/ServiceDetails.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ServiceDetails.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6398b14f", Component.options)
  } else {
    hotAPI.reload("data-v-6398b14f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(245)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(247),
  /* template */
  __webpack_require__(248),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2a250a49",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Timer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Timer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2a250a49", Component.options)
  } else {
    hotAPI.reload("data-v-2a250a49", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(246);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("30b827f7", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a250a49\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Timer.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2a250a49\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Timer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "\n.critical[data-v-2a250a49] {\n  color: #cc0000;\n}\n", ""]);

// exports


/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(132);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['ends'],
	data: function data() {
		return {
			timer: null,
			now: Math.trunc(new Date().getTime() / 1000),
			critical: false
		};
	},

	computed: {
		seconds: function seconds() {
			return (this.ending - this.now) % 60;
		},
		minutes: function minutes() {
			return Math.trunc((this.ending - this.now) / 60) % 60;
		},
		hours: function hours() {
			return Math.trunc((this.ending - this.now) / 60 / 60) % 24;
		},
		days: function days() {
			return Math.trunc((this.ending - this.now) / 60 / 60 / 24);
		},
		ending: function ending() {
			return Math.trunc(Date.parse(this.ends) / 1000);
		},
		left: function left() {
			this.critical = false;

			if (this.days > 5) return this.days + ' dagar';
			if (this.days >= 1) return this.days + ' d ' + this.hours + ' tim';

			this.critical = true;

			if (this.hours > 0) return this.hours + ' tim ' + this.minutes + ' min';
			if (this.minutes > 0) return this.minutes + ' min ' + this.seconds + ' s';
			return this.seconds + ' s';
		}
	},
	mounted: function mounted() {
		var _this = this;

		__WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__["a" /* HeartBeat */].$on('beat', function () {
			_this.now = Math.trunc(new Date().getTime() / 1000);

			if (_this.now == _this.ending) {
				_this.$emit('ended');
			}
		});
	}
});

/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "timer-component",
    class: {
      critical: _vm.critical
    }
  }, [_vm._v("\n\t" + _vm._s(_vm.left) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2a250a49", module.exports)
  }
}

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(279);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("5b223502", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6398b14f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ServiceDetails.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-6398b14f\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/sass-loader/lib/loader.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ServiceDetails.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(undefined);
// imports


// module
exports.push([module.i, "\n.waiting[data-v-6398b14f] {\n  text-align: center;\n  margin: 40px 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Services_ServiceMedia__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Services_ServiceMedia___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Services_ServiceMedia__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Includes_Ratings__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Includes_Ratings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Includes_Ratings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Includes_Timer__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Includes_Timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_Includes_Timer__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appComment: __WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment___default.a,
		appAddComment: __WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment___default.a,
		appServiceDescription: __WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription___default.a,
		appServiceMedia: __WEBPACK_IMPORTED_MODULE_3__components_Services_ServiceMedia___default.a,
		appRatings: __WEBPACK_IMPORTED_MODULE_4__components_Includes_Ratings___default.a,
		appTimer: __WEBPACK_IMPORTED_MODULE_5__components_Includes_Timer___default.a
	},
	computed: {
		service: function service() {
			return this.$store.getters.getService;
		},
		bids: function bids() {
			return this.service.bid_count ? this.service.bid_count.count : 0;
		},
		breakpoints: function breakpoints() {
			return window.breakpoints;
		},
		ends: function ends() {
			return moment(this.service.bid_stop).format("LLL");
		},
		avatarAlt: function avatarAlt() {
			return 'Avatar bild f\xF6r anv\xE4ndare ' + this.service.user.username;
		},
		ratingCount: function ratingCount() {
			return this.service.user.rating ? this.service.user.rating.count : 0;
		},
		ratingAvg: function ratingAvg() {
			return this.service.user.rating ? this.service.user.rating.avg : 0;
		}
	},
	methods: {
		createBid: function createBid() {
			this.$store.dispatch('openModal', { component: 'createBid', size: 'size-large' });
		},
		showBids: function showBids() {
			this.$store.dispatch('openModal', { component: 'showBids', size: 'size-large' });
		}
	},
	created: function created() {
		this.$store.dispatch('getService', { id: this.$route.params.id });
	}
});

/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(282),
  /* template */
  __webpack_require__(283),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Comments/AddComment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AddComment.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-124d633e", Component.options)
  } else {
    hotAPI.reload("data-v-124d633e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 282:
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
			comment: '',
			parent: null,
			processing: false
		};
	},

	computed: {
		serviceId: function serviceId() {
			return this.$store.getters.getService.id;
		},
		disabled: function disabled() {
			return !this.comment;
		}
	},
	methods: {
		add: function add() {
			var _this = this;

			this.processing = true;

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('services/{id}/comments').setId(this.serviceId).create({
				body: this.comment,
				parent: this.parent
			}).then(function (response) {
				_this.$store.commit('ADD_COMMENT', { comment: response.comment });

				// Clear input and stop processing
				_this.comment = '';
				_this.parent = null;
				_this.processing = false;
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "add-comment-component"
  }, [_c('h4', [_vm._v("Lägg till en kommentar")]), _vm._v(" "), _c('div', {
    staticClass: "form-group mb7"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.comment),
      expression: "comment"
    }],
    staticClass: "form-control",
    domProps: {
      "value": (_vm.comment)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.comment = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-group text-right"
  }, [(_vm.$store.getters.isAuthenticated) ? _c('span', {
    staticClass: "comments-as"
  }, [_vm._v("\n\t\t\tDu kommenterar som "), _c('a', {
    staticClass: "link"
  }, [_vm._v("@" + _vm._s(_vm.$store.getters.authUser.username))])]) : _c('span', {
    staticClass: "comments-as"
  }, [_vm._v("Du måste "), _c('a', {
    staticClass: "link",
    on: {
      "click": function($event) {
        _vm.$store.dispatch('openModal', {
          component: 'login'
        })
      }
    }
  }, [_vm._v("logga in")]), _vm._v(" innan du kan kommentera")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary",
    class: {
      'processing': _vm.processing
    },
    attrs: {
      "disabled": _vm.disabled || !_vm.$store.getters.isAuthenticated || _vm.processing
    },
    on: {
      "click": _vm.add
    }
  }, [_vm._v("Kommentera")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-124d633e", module.exports)
  }
}

/***/ }),

/***/ 284:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(285),
  /* template */
  __webpack_require__(286),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Comments/Comment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Comment.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b95f10c", Component.options)
  } else {
    hotAPI.reload("data-v-0b95f10c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(132);
//
//
//
//
//
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
	props: ['comment'],
	data: function data() {
		return {
			time: this.moment(this.comment.updated_at).fromNow()
		};
	},

	computed: {
		avatar: function avatar() {
			return 'url(\'' + this.comment.user.avatar + '\')';
		}
	},
	created: function created() {
		var _this = this;

		__WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__["a" /* HeartBeat */].$on('beat', function () {
			_this.time = _this.moment(_this.comment.updated_at).fromNow();
		});
	}
});

/***/ }),

/***/ 286:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "comment-component"
  }, [_c('div', {
    staticClass: "comment-avatar",
    style: ({
      'background-image': _vm.avatar
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "comment-content"
  }, [_c('div', {
    staticClass: "comment-head"
  }, [_c('span', {
    staticClass: "comment-author",
    domProps: {
      "textContent": _vm._s(_vm.comment.user.username)
    }
  }), _vm._v(" "), _c('small', {
    staticClass: "comment-time",
    domProps: {
      "textContent": _vm._s(_vm.time)
    }
  }), _vm._v(" "), (_vm.comment.canReply) ? _c('i', {
    staticClass: "fa fa-reply",
    attrs: {
      "aria-hidden": "true"
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "comment-body",
    domProps: {
      "textContent": _vm._s(_vm.comment.body)
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0b95f10c", module.exports)
  }
}

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(288),
  /* template */
  __webpack_require__(289),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/ServiceDescription.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ServiceDescription.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fb8e8c0", Component.options)
  } else {
    hotAPI.reload("data-v-4fb8e8c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 288:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	computed: {
		service: function service() {
			return this.$store.getters.getService;
		},
		category: function category() {
			var category = this.$store.getters.getCategoryById(this.service.category_id);
			return category.name;
		},
		location: function location() {
			var city = this.$store.getters.getCityById(this.service.city_id);
			var region = this.$store.getters.getRegionById(this.service.region_id);
			return city.name + ", " + region.name;
		}
	}
});

/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "service_description-component"
  }, [_c('h4', {
    staticClass: "title",
    domProps: {
      "textContent": _vm._s(_vm.service.title)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "info"
  }, [_c('div', {
    staticClass: "info-item info-category"
  }, [_c('i', {
    staticClass: "fa fa-list-ul",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" \n\t\t\tKategori: "), _c('span', {
    staticClass: "info-item-value",
    domProps: {
      "textContent": _vm._s(_vm.category)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "info-item info-location"
  }, [_c('i', {
    staticClass: "fa fa-map-marker",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" \n\t\t\tPlats: "), _c('span', {
    staticClass: "info-item-value",
    domProps: {
      "textContent": _vm._s(_vm.location)
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "description",
    domProps: {
      "textContent": _vm._s(_vm.service.description)
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4fb8e8c0", module.exports)
  }
}

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(291),
  /* template */
  __webpack_require__(292),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/ServiceMedia.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ServiceMedia.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a7531a8", Component.options)
  } else {
    hotAPI.reload("data-v-6a7531a8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 291:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['media'],
	data: function data() {
		return {
			showingAllImages: false,
			hasMoreImages: false
		};
	},

	computed: {
		images: function images() {
			return this.media.filter(function (media) {
				return media.mime_type.includes('image/');
			});
		},
		files: function files() {
			return this.media.filter(function (media) {
				return !media.mime_type.includes('image/');
			});
		}
	},
	methods: {
		hasImagesOverflow: function hasImagesOverflow() {
			this.hasMoreImages = this.$refs.imagesList.offsetHeight < this.$refs.imagesList.scrollHeight;
		},
		toggleOverflowImages: function toggleOverflowImages() {
			if (this.showingAllImages) {
				this.showingAllImages = false;
				this.$refs.imagesList.classList.add('hide-overflow-images');
			} else {
				this.showingAllImages = true;
				this.$refs.imagesList.classList.remove('hide-overflow-images');
			}
		}
	},
	mounted: function mounted() {
		if (this.images.length > 0) {
			this.hasImagesOverflow();
			window.onresize = this.hasImagesOverflow;
		}
	}
});

/***/ }),

/***/ 292:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "service_media-component"
  }, [(_vm.images.length > 0) ? [_c('ul', {
    ref: "imagesList",
    staticClass: "images-list hide-overflow-images clearfix"
  }, _vm._l((_vm.images), function(image) {
    return _c('li', [_c('a', {
      attrs: {
        "href": image.media_url,
        "target": "_blank"
      }
    }, [_c('div', {
      staticClass: "image-container",
      style: ({
        backgroundImage: ("url('" + (image.thumb_url) + "')")
      })
    })])])
  })), _vm._v(" "), (_vm.hasMoreImages) ? _c('div', {
    staticClass: "show-more-container mt15 text-center"
  }, [_c('button', {
    staticClass: "btn btn-default show-all",
    on: {
      "click": _vm.toggleOverflowImages
    }
  }, [_vm._v("\n\t\t\t\tVisa alla bilder "), _c('i', {
    staticClass: "fa",
    class: {
      'fa-chevron-down': !_vm.showingAllImages, 'fa-chevron-up': _vm.showingAllImages
    },
    attrs: {
      "aria-hidden": "true"
    }
  })])]) : _vm._e()] : _vm._e(), _vm._v(" "), (!_vm.hasMoreImages) ? _c('div', {
    staticClass: "media-spacer"
  }) : _vm._e(), _vm._v(" "), (_vm.files.length > 0) ? [_c('ul', {
    staticClass: "files-list",
    class: {
      mt30: _vm.images.length > 0 && _vm.hasMoreImages, mt15: _vm.images.length > 0 && !_vm.hasMoreImages
    }
  }, _vm._l((_vm.files), function(file) {
    return _c('li', [_c('i', {
      staticClass: "fa fa-file-text-o",
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v(" "), _c('a', {
      attrs: {
        "href": file.media_url,
        "target": "_blank"
      }
    }, [_vm._v(_vm._s(file.original_filename))])])
  }))] : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6a7531a8", module.exports)
  }
}

/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "service-details-view"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content"
  }, [(_vm.$store.getters.getServiceLoaded) ? [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-8"
  }, [(!_vm.breakpoints.small) ? _c('div', {
    staticClass: "service-description white-container mb20"
  }, [_c('app-service-description'), _vm._v(" "), (_vm.service.media.length > 0) ? _c('app-service-media', {
    attrs: {
      "media": _vm.service.media
    }
  }) : _vm._e()], 1) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4"
  }, [_c('div', {
    staticClass: "service-bids white-container"
  }, [_c('div', {
    staticClass: "time-left text-center"
  }, [_c('app-timer', {
    attrs: {
      "ends": _vm.service.bid_stop
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "ends"
  }, [_vm._v(_vm._s(_vm.ends))])], 1), _vm._v(" "), _c('div', {
    staticClass: "active-bids text-center"
  }, [_c('i', {
    staticClass: "fa fa-gavel",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.bids))]), _vm._v(" bud. "), _c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showBids($event)
      }
    }
  }, [_vm._v("Visa alla bud")])]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary full-width",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.createBid($event)
      }
    }
  }, [_vm._v("Lägg ett bud")])]), _vm._v(" "), (_vm.breakpoints.small) ? _c('div', {
    staticClass: "service-description white-container"
  }, [_c('app-service-description'), _vm._v(" "), (_vm.service.media.length > 0) ? _c('app-service-media', {
    attrs: {
      "media": _vm.service.media
    }
  }) : _vm._e()], 1) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "service-user white-container"
  }, [(_vm.$store.getters.getServiceLoaded) ? [_c('div', {
    staticClass: "user-avatar"
  }, [_c('img', {
    attrs: {
      "src": _vm.service.user.avatar,
      "alt": _vm.avatarAlt
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "user-displayname",
    domProps: {
      "textContent": _vm._s(_vm.service.user.username)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "user-ratings"
  }, [_c('app-ratings', {
    attrs: {
      "rating": _vm.ratingAvg,
      "total": _vm.ratingCount,
      "size": "large"
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "link"
  }, [_vm._v("Visa omdömmen")])], 1)] : _vm._e()], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-8"
  }, [_c('app-add-comment'), _vm._v(" "), _c('div', {
    staticClass: "margin-50"
  }, [_c('ul', {
    staticClass: "top-comments"
  }, [_c('transition-group', {
    attrs: {
      "name": "slide-in-left"
    }
  }, _vm._l((_vm.service.comments), function(comment) {
    return _c('li', {
      key: comment.id
    }, [_c('app-comment', {
      attrs: {
        "comment": comment
      }
    })], 1)
  }))], 1)])], 1)])] : _c('app-loading', {
    attrs: {
      "bg": "gray"
    }
  })], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6398b14f", module.exports)
  }
}

/***/ })

});