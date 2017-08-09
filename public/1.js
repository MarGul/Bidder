webpackJsonp([1],{

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(331),
  /* template */
  __webpack_require__(370),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/Project.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Project.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ec874e0", Component.options)
  } else {
    hotAPI.reload("data-v-2ec874e0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(247)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(249),
  /* template */
  __webpack_require__(250),
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

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(248);
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

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(401)(undefined);
// imports


// module
exports.push([module.i, "\n.critical[data-v-2a250a49] {\n  color: #cc0000;\n}\n", ""]);

// exports


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(131);
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

/***/ 250:
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

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProjectTitle__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProjectTitle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ProjectTitle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Messages_MessageBoard__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Messages_MessageBoard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Messages_MessageBoard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProjectAccept__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProjectAccept___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ProjectAccept__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ProjectStarted__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ProjectStarted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ProjectStarted__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ProjectCompleted__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ProjectCompleted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ProjectCompleted__);
//
//
//
//
//
//
//
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
		messageBoard: __WEBPACK_IMPORTED_MODULE_1__Messages_MessageBoard___default.a,
		projectTitle: __WEBPACK_IMPORTED_MODULE_0__ProjectTitle___default.a,
		projectAccept: __WEBPACK_IMPORTED_MODULE_2__ProjectAccept___default.a,
		projectStarted: __WEBPACK_IMPORTED_MODULE_3__ProjectStarted___default.a,
		projectCompleted: __WEBPACK_IMPORTED_MODULE_4__ProjectCompleted___default.a
	},
	computed: {
		fetched: function fetched() {
			return this.$store.getters.userProjectsFetched;
		},
		project: function project() {
			return this.$store.getters.userProjectFocus;
		},
		panel: function panel() {
			if (this.project.completed) {
				return 'projectCompleted';
			}

			return this.project.started ? 'projectStarted' : 'projectAccept';
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserProjects', { focusId: this.$route.params.id });
		}
	},
	destroyed: function destroyed() {
		this.$store.commit('SET_PROJECT_FOCUS', { project: null });
	}
});

/***/ }),

/***/ 332:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(333),
  /* template */
  __webpack_require__(334),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/ProjectTitle.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ProjectTitle.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0dc7de50", Component.options)
  } else {
    hotAPI.reload("data-v-0dc7de50", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 333:
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



/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['title', 'default'],
	data: function data() {
		return {
			edit: false,
			newTitle: ''
		};
	},

	computed: {
		titleText: function titleText() {
			return this.title || this.default;
		}
	},
	methods: {
		change: function change() {
			this.edit = false;
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('projects/{id}/title').setId(this.$route.params.id).put({ title: this.newTitle }).catch(function (error) {
				console.log(error);
			});
			// Update the title in store for project in focus
			var project = this.$store.getters.userProjectFocus;
			project.title = this.newTitle;
			this.$store.commit('SET_PROJECT_FOCUS', { project: project });
			// Update the title in store for the projects
			var projects = this.$store.getters.userProjects;
			for (var i = 0; i < projects.length; i++) {
				if (projects[i].id === project.id) {
					projects[i] = project;
					break;
				}
			}
			this.$store.commit('SET_PROJECTS', { projects: projects });
		}
	},
	created: function created() {
		this.newTitle = this.titleText;
	}
});

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "project_title-component"
  }, [_c('h1', {
    staticClass: "user-component-title project-title",
    class: {
      clickable: !_vm.edit
    },
    on: {
      "click": function($event) {
        _vm.edit = true
      }
    }
  }, [_c('div', {
    staticClass: "left"
  }, [(!_vm.edit) ? [_vm._v(_vm._s(_vm.titleText))] : _c('div', {
    staticClass: "input-container"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newTitle),
      expression: "newTitle"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "autofocus": ""
    },
    domProps: {
      "value": (_vm.newTitle)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newTitle = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "input-icon",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.edit = false
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-times clickable",
    attrs: {
      "aria-hidden": "true"
    }
  })])])], 2), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [(!_vm.edit) ? _c('i', {
    staticClass: "fa fa-pencil",
    attrs: {
      "aria-hidden": "true",
      "title": "Redigera Titel"
    }
  }) : _c('button', {
    staticClass: "btn btn-primary full-width",
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.change($event)
      }
    }
  }, [_vm._v("Ändra")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0dc7de50", module.exports)
  }
}

/***/ }),

/***/ 335:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(336)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(338),
  /* template */
  __webpack_require__(345),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Messages/MessageBoard.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MessageBoard.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4550cb6a", Component.options)
  } else {
    hotAPI.reload("data-v-4550cb6a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(337);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("2533e1c8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4550cb6a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MessageBoard.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4550cb6a\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MessageBoard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 337:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(401)(undefined);
// imports


// module
exports.push([module.i, "\n.message_board-component .alert {\n  padding: 40px 15px;\n  margin: 0;\n  border: 1px solid #d7d7d7;\n  border-bottom: none;\n}\n", ""]);

// exports


/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SendMessage__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SendMessage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__SendMessage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Message__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Message___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Message__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_Model__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		sendMessage: __WEBPACK_IMPORTED_MODULE_0__SendMessage___default.a,
		message: __WEBPACK_IMPORTED_MODULE_1__Message___default.a
	},
	data: function data() {
		return {
			messages: [],
			fetched: false
		};
	},

	methods: {
		add: function add(msg) {
			var message = {
				project_id: this.$route.params.id,
				user: this.$store.getters.authUser,
				message: msg.message,
				created_at: moment().format('YYYY-MM-DD HH:mm:ss')
			};
			this.messages.push(message);
		}
	},
	created: function created() {
		var _this = this;

		new __WEBPACK_IMPORTED_MODULE_2__includes_Model__["a" /* default */]('projects/{id}/messages').setId(this.$route.params.id).get().then(function (response) {
			_this.messages = response.messages;
			_this.fetched = true;
		});

		Echo.private('project.' + this.$route.params.id + '.messages').listen('NewMessage', function (e) {
			_this.messages.push(e.message);
		});
	}
});

/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(340),
  /* template */
  __webpack_require__(341),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Messages/SendMessage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SendMessage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0501e2e4", Component.options)
  } else {
    hotAPI.reload("data-v-0501e2e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 340:
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



/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			message: ''
		};
	},

	methods: {
		send: function send() {
			// Instantly add the new message to the messages array
			var message = this.message;
			this.$emit('added', { message: message });
			this.message = '';

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('projects/{id}/messages').setId(this.$route.params.id).post({ message: message }).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),

/***/ 341:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "send_message-component clearfix"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.message),
      expression: "message"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "4",
      "placeholder": "Skriv ditt meddelande här..."
    },
    domProps: {
      "value": (_vm.message)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.message = $event.target.value
      }
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary",
    attrs: {
      "disabled": !_vm.message
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.send($event)
      }
    }
  }, [_vm._v("\n\t\tSkicka\n\t")])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0501e2e4", module.exports)
  }
}

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(343),
  /* template */
  __webpack_require__(344),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Messages/Message.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Message.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b41663e8", Component.options)
  } else {
    hotAPI.reload("data-v-b41663e8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(131);
//
//
//
//
//
//
//
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
	props: ['message'],
	data: function data() {
		return {
			time: null
		};
	},

	computed: {
		me: function me() {
			return this.message.user.id === this.$store.getters.authUser.id ? true : false;
		},
		image: function image() {
			var image = this.me ? this.$store.getters.authUser.avatar : this.message.user.avatar;
			return { backgroundImage: 'url(' + image + ')' };
		}
	},
	created: function created() {
		var _this = this;

		this.time = moment(this.message.created_at).fromNow();
		__WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__["a" /* HeartBeat */].$on('beat', function () {
			_this.time = moment(_this.message.created_at).fromNow();
		});
	}
});

/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "message-component",
    class: {
      me: _vm.me, theirs: !_vm.me
    }
  }, [_c('div', {
    staticClass: "left"
  }, [_c('div', {
    staticClass: "user-image",
    style: (_vm.image)
  })]), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "user-name"
  }, [(_vm.me) ? _c('div', {
    staticClass: "name"
  }, [_vm._v("Jag")]) : _c('router-link', {
    attrs: {
      "to": ("/profile/" + (_vm.message.user.username))
    },
    domProps: {
      "textContent": _vm._s(_vm.message.user.username)
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "user-message",
    domProps: {
      "textContent": _vm._s(_vm.message.message)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "message-time",
    domProps: {
      "textContent": _vm._s(_vm.time)
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b41663e8", module.exports)
  }
}

/***/ }),

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "message_board-component"
  }, [(_vm.fetched) ? [_vm._m(0), _vm._v(" "), (_vm.messages.length > 0) ? _c('div', {
    staticClass: "messages-container"
  }, _vm._l((_vm.messages), function(message) {
    return _c('message', {
      key: message.id,
      attrs: {
        "message": message
      }
    })
  })) : _c('div', {
    staticClass: "alert alert-warning"
  }, [_vm._v("\n\t\t\tDet finns inga meddelanden än. Bli den första att säga hej genom att skicka ett meddelande nedan.\n\t\t")]), _vm._v(" "), _c('send-message', {
    on: {
      "added": _vm.add
    }
  })] : _c('div', {
    staticClass: "load-spinner text-center margin-40"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-pulse fa-3x fa-fw"
  }), _vm._v(" "), _c('span', {
    staticClass: "sr-only"
  }, [_vm._v("Loading...")])])], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "message-board-top"
  }, [_c('i', {
    staticClass: "fa fa-envelope-o",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Meddelanden\n\t\t")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4550cb6a", module.exports)
  }
}

/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(347),
  /* template */
  __webpack_require__(353),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/ProjectAccept.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ProjectAccept.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d9778b8", Component.options)
  } else {
    hotAPI.reload("data-v-4d9778b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Timer__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Includes_Timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChangeProjectDetails__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChangeProjectDetails___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ChangeProjectDetails__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	props: ['project'],
	components: {
		appTimer: __WEBPACK_IMPORTED_MODULE_1__Includes_Timer___default.a,
		appChangeProjectDetails: __WEBPACK_IMPORTED_MODULE_2__ChangeProjectDetails___default.a
	},
	data: function data() {
		return {
			change: false,
			accepting: false,
			canceling: false
		};
	},

	computed: {
		myAvatar: function myAvatar() {
			return { backgroundImage: "url('" + this.project.me.avatar + "')" };
		},
		otherAvatar: function otherAvatar() {
			return { backgroundImage: "url('" + this.project.other.avatar + "')" };
		}
	},
	methods: {
		accept: function accept() {
			var _this = this;

			this.accepting = true;
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]("projects/" + this.project.id + "/accept").post().then(function (response) {
				// Update the acceptance in store for project in focus
				var project = _this.$store.getters.userProjectFocus;
				project.started = response.start;
				project.me.accepted = true;
				_this.$store.commit('SET_PROJECT_FOCUS', { project: project });
				// Update the acceptance in store for the projects
				var projects = _this.$store.getters.userProjects;
				for (var i = 0; i < projects.length; i++) {
					if (projects[i].id === project.id) {
						projects[i] = project;
						break;
					}
				}
				_this.$store.commit('SET_PROJECTS', { projects: projects });
				_this.accepting = false;
			}).catch(function (error) {
				console.log(error);
			});
		},
		cancel: function cancel() {
			var _this2 = this;

			this.canceling = true;
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]("projects/" + this.project.id + "/cancel").post().then(function (response) {
				// Update the acceptance in store for the projects
				var projects = _this2.$store.getters.userProjects;
				for (var i = 0; i < projects.length; i++) {
					if (projects[i].id === _this2.project.id) {
						projects.splice(i, 1);
						break;
					}
				}
				_this2.$store.commit('SET_PROJECTS', { projects: projects });
				// Remove the project focus
				_this2.$store.commit('SET_PROJECT_FOCUS', { project: null });
				_this2.$router.push('/user/my-projects');
				// Show a notification and redirect back to project listings.
				_this2.$store.dispatch('showNotification', { type: 'success', msg: 'Projektet blev avbrutet.' });
				_this2.canceling = false;
			}).catch(function (error) {
				console.log(error);
			});
		},
		start: function start() {
			var _this3 = this;

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]("projects/" + this.project.id + "/start").put().then(function (response) {
				// Update the acceptance in store for project in focus
				var project = _this3.$store.getters.userProjectFocus;
				project.started = true;
				_this3.$store.commit('SET_PROJECT_FOCUS', { project: project });
				// Update the acceptance in store for the projects
				var projects = _this3.$store.getters.userProjects;
				for (var i = 0; i < projects.length; i++) {
					if (projects[i].id === project.id) {
						projects[i] = project;
						break;
					}
				}
				_this3.$store.commit('SET_PROJECTS', { projects: projects });
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(349)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(351),
  /* template */
  __webpack_require__(352),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4f3a1e5c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/ChangeProjectDetails.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ChangeProjectDetails.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f3a1e5c", Component.options)
  } else {
    hotAPI.reload("data-v-4f3a1e5c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 349:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(350);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("b3030b1e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4f3a1e5c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ChangeProjectDetails.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4f3a1e5c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ChangeProjectDetails.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 350:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(401)(undefined);
// imports


// module
exports.push([module.i, "\n.change_project_details-component[data-v-4f3a1e5c] {\n  position: relative;\n}\n.change_project_details-component .close[data-v-4f3a1e5c] {\n    position: absolute;\n    top: -10px;\n    right: 0;\n}\nlabel[data-v-4f3a1e5c] {\n  margin-bottom: 2px;\n}\n.form-group[data-v-4f3a1e5c] {\n  margin-bottom: 5px;\n}\n.btn[data-v-4f3a1e5c] {\n  margin-bottom: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		datepicker: __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default.a
	},
	data: function data() {
		return {
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				finish: null,
				price: null
			}),
			processing: false
		};
	},

	computed: {
		project: function project() {
			return this.$store.getters.userProjectFocus;
		}
	},
	methods: {
		isNumber: function isNumber(event) {
			var code = event.keyCode || event.which;
			if (code >= 48 && code <= 57 || code == 44) {
				return true;
			} else {
				event.preventDefault();
			}
		},
		stripTime: function stripTime(date) {
			return date instanceof Date ? date.getFullYear() + '-' + this.pad(date.getMonth() + 1) + '-' + this.pad(date.getDate()) : date;
		},
		pad: function pad(number) {
			return number < 10 ? "0" + number : number;
		},
		change: function change() {
			var _this = this;

			this.processing = true;
			var data = this.form.data();
			data.finish = this.stripTime(data.finish);

			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('projects/' + this.project.id).patch(data).then(function (response) {
				// Update the information in store for project in focus
				var project = _this.$store.getters.userProjectFocus;
				project.finish = data.finish;
				project.price = data.price;
				project.me.accepted = false;
				project.other.accepted = false;
				_this.$store.commit('SET_PROJECT_FOCUS', { project: project });
				// Update the information in store for the projects
				var projects = _this.$store.getters.userProjects;
				for (var i = 0; i < projects.length; i++) {
					if (projects[i].id === project.id) {
						projects[i] = project;
						break;
					}
				}
				_this.$store.commit('SET_PROJECTS', { projects: projects });
				_this.$emit('updated');
				_this.processing = false;
				_this.$store.dispatch('showNotification', {
					type: 'success',
					msg: 'Nice! Vi har ändrat uppgifterna för projektet. Nu måste båda parter bara godkänna projektet igen.'
				});
			}).catch(function (error) {
				_this.form.errors.record(error);
			});
		}
	},
	created: function created() {
		this.form.finish = this.$store.getters.userProjectFocus.finish;
		this.form.price = this.$store.getters.userProjectFocus.price;
	}
});

/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "change_project_details-component"
  }, [_c('div', {
    staticClass: "close",
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-times",
    attrs: {
      "aria-hidden": "true"
    }
  })]), _vm._v(" "), _c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('finish')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Projektet avslutas")]), _vm._v(" "), _c('datepicker', {
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    model: {
      value: (_vm.form.finish),
      callback: function($$v) {
        _vm.form.finish = $$v
      },
      expression: "form.finish"
    }
  }), _vm._v(" "), (_vm.form.errors.has('finish')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('finish'))
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('price')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Projektets pris")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.price),
      expression: "form.price"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.form.price)
    },
    on: {
      "keypress": function($event) {
        _vm.isNumber($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.price = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('price')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('price'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('button', {
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
        _vm.change($event)
      }
    }
  }, [_vm._v("\n\t\t\tÄndra uppgifterna\n\t\t")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4f3a1e5c", module.exports)
  }
}

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "project_accept-component"
  }, [_c('div', {
    staticClass: "panel panel-success"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('p', [_vm._v("Efter att ett projekt har skapats så är det sista du behöver göra att godkänna att vi ska starta projektet.\n\t\t\tDetta görs för er bådas säkerhet och ni får chansen att disskutera lite mer genom meddelanden som du finner här nere innan projektet räknas som godkänt.")]), _vm._v(" "), _c('p', [_vm._v("Ifall där är något som du inte gillar med detta projektet så kan du välja att inte godkänna projektet. Du som la ut tjänsten kan snabbt och enkelt starta budgivningen för tjänsten igen\n\t\t\toch du som la det accepterade budet kommer inte att behöva betala.")]), _vm._v(" "), _c('p', [_vm._v("Direkt när båda parterna har godkänt projektet så kan ni starta och kommer inte att höra av er ifrån oss förän projektet är klart och det är dags att lämna omdömmen om varandra.")]), _vm._v(" "), _c('div', {
    staticClass: "project-users"
  }, [_c('div', {
    staticClass: "me"
  }, [_c('div', {
    staticClass: "user-name",
    domProps: {
      "textContent": _vm._s(_vm.project.me.username)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "avatar-container"
  }, [_c('div', {
    staticClass: "avatar",
    style: (_vm.myAvatar)
  })]), _vm._v(" "), _c('div', {
    staticClass: "user-actions text-center"
  }, [(_vm.project.me.accepted) ? [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "disabled": ""
    }
  }, [_vm._v("Du är redo!")])] : [_c('div', {
    staticClass: "action-text mt10 pb5"
  }, [_vm._v("Starta projektet?")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary",
    class: {
      'processing': _vm.accepting
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.accept($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-check mr5",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Ja\n\t\t\t\t\t\t\t")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-danger",
    class: {
      'processing': _vm.canceling
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.cancel($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-exclamation-triangle mr5",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Nej\n\t\t\t\t\t\t\t")])]], 2)]), _vm._v(" "), _c('div', {
    staticClass: "details"
  }, [(!_vm.change) ? [_c('div', {
    staticClass: "timer"
  }, [_c('app-timer', {
    attrs: {
      "ends": _vm.project.accept_end
    },
    on: {
      "ended": _vm.start
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "timer-text"
  }, [_vm._v("Till automatisk start av projektet")])], 1), _vm._v(" "), _c('div', {
    staticClass: "project-details"
  }, [_c('div', {
    staticClass: "finish"
  }, [_vm._m(1), _vm._v(" "), _c('span', {
    staticClass: "value",
    domProps: {
      "textContent": _vm._s(_vm.project.finish)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "price"
  }, [_vm._m(2), _vm._v(" "), _c('span', {
    staticClass: "value",
    domProps: {
      "textContent": _vm._s(_vm.filters.currency(_vm.project.price))
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "change"
  }, [_c('span', {
    staticClass: "is-link ptb5",
    on: {
      "click": function($event) {
        _vm.change = !_vm.change
      }
    }
  }, [_vm._v("Ändra uppgifterna")])])])] : _c('app-change-project-details', {
    on: {
      "updated": function($event) {
        _vm.change = false
      },
      "close": function($event) {
        _vm.change = false
      }
    }
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "other"
  }, [_c('div', {
    staticClass: "user-name",
    domProps: {
      "textContent": _vm._s(_vm.project.other.username)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "avatar-container"
  }, [_c('div', {
    staticClass: "avatar",
    style: (_vm.otherAvatar)
  })]), _vm._v(" "), _c('div', {
    staticClass: "user-actions text-center"
  }, [_c('div', {
    staticClass: "action-text mt10 pb5"
  }, [_vm._v("Har godkänt?")]), _vm._v(" "), (_vm.project.other.accepted) ? _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "disabled": ""
    }
  }, [_vm._v("Godkänt")]) : _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "disabled": ""
    }
  }, [_vm._v("Ej godkänt")])])])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-heading"
  }, [_c('i', {
    staticClass: "fa fa-thumbs-o-up",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Är du redo att starta projektet?\n\t\t")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "heading"
  }, [_c('i', {
    staticClass: "fa fa-clock-o"
  }), _vm._v(" Ska avslutas:")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "heading"
  }, [_c('i', {
    staticClass: "fa fa-money"
  }), _vm._v(" Pris: ")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4d9778b8", module.exports)
  }
}

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(355)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(357),
  /* template */
  __webpack_require__(358),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1de8cefe",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/ProjectStarted.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ProjectStarted.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1de8cefe", Component.options)
  } else {
    hotAPI.reload("data-v-1de8cefe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(356);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("4d64bc3d", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1de8cefe\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProjectStarted.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js!../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-1de8cefe\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProjectStarted.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(401)(undefined);
// imports


// module
exports.push([module.i, "\n.finish-text[data-v-1de8cefe] {\n  font-size: 16px;\n}\n.timer-component[data-v-1de8cefe] {\n  font-size: 20px;\n  font-weight: bold;\n  margin: 5px 0;\n}\n.finish-date[data-v-1de8cefe] {\n  font-style: italic;\n  font-size: 13px;\n}\n", ""]);

// exports


/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Timer__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Includes_Timer__);
//
//
//
//
//
//
//
//
//
//
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
		appTimer: __WEBPACK_IMPORTED_MODULE_1__Includes_Timer___default.a
	},
	computed: {
		project: function project() {
			return this.$store.getters.userProjectFocus;
		}
	},
	methods: {
		complete: function complete() {
			var _this = this;

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]("projects/" + this.project.id + "/complete").put().then(function (response) {
				// Update the acceptance in store for project in focus
				var project = _this.$store.getters.userProjectFocus;
				project.completed = true;
				_this.$store.commit('SET_PROJECT_FOCUS', { project: project });
				// Update the acceptance in store for the projects
				var projects = _this.$store.getters.userProjects;
				for (var i = 0; i < projects.length; i++) {
					if (projects[i].id === project.id) {
						projects[i] = project;
						break;
					}
				}
				_this.$store.commit('SET_PROJECTS', { projects: projects });
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "project_started-component"
  }, [_c('div', {
    staticClass: "panel panel-success"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "time-finish-container text-center"
  }, [_c('div', {
    staticClass: "finish-text"
  }, [_vm._v("Projektet avslutas om:")]), _vm._v(" "), _c('app-timer', {
    attrs: {
      "ends": _vm.project.finish
    },
    on: {
      "ended": _vm.complete
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "finish-date",
    domProps: {
      "textContent": _vm._s(_vm.project.finish)
    }
  })], 1)])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-heading"
  }, [_c('i', {
    staticClass: "fa fa-refresh",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Projektet är i full gång!\n\t\t")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1de8cefe", module.exports)
  }
}

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(360),
  /* template */
  __webpack_require__(369),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/ProjectCompleted.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ProjectCompleted.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2dfd016a", Component.options)
  } else {
    hotAPI.reload("data-v-2dfd016a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Reviews_LeaveReview__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Reviews_LeaveReview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Reviews_LeaveReview__);
//
//
//
//
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
		appLeaveReview: __WEBPACK_IMPORTED_MODULE_0__Reviews_LeaveReview___default.a
	},
	computed: {
		other: function other() {
			return this.$store.getters.userProjectFocus.other.id;
		},
		submitted: function submitted() {
			return this.$store.getters.userProjectFocus.me.reviewed;
		}
	}
});

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(362),
  /* template */
  __webpack_require__(368),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Reviews/LeaveReview.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] LeaveReview.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2255fca3", Component.options)
  } else {
    hotAPI.reload("data-v-2255fca3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PickStars__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PickStars___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__PickStars__);
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




/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['forUser', 'submitted'],
	components: {
		appPickStars: __WEBPACK_IMPORTED_MODULE_0__PickStars___default.a
	},
	data: function data() {
		return {
			communication: null,
			as_described: null,
			would_recommend: null,
			review: '',
			processing: false,
			error: false
		};
	},

	methods: {
		send: function send() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]("users/" + this.forUser + "/review").post({
				project_id: this.$store.getters.userProjectFocus.id,
				communication: this.communication,
				as_described: this.as_described,
				would_recommend: this.would_recommend,
				review: this.review
			}).then(function (response) {
				console.log(response);
			}).catch(function (error) {
				_this.error = true;
			});
		}
	}
});

/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(364)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(366),
  /* template */
  __webpack_require__(367),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Reviews/PickStars.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PickStars.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2da456f4", Component.options)
  } else {
    hotAPI.reload("data-v-2da456f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(365);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("a4de9b82", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2da456f4\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PickStars.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-2da456f4\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PickStars.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(401)(undefined);
// imports


// module
exports.push([module.i, "\n.pick_stars-component {\n  font-size: 18px;\n}\n.pick_stars-component i {\n    color: #FFC100;\n    cursor: pointer;\n}\n", ""]);

// exports


/***/ }),

/***/ 366:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			stars: 0,
			hover: false,
			hoverStars: 0
		};
	},

	computed: {
		full: function full() {
			return this.hover ? this.hoverStars : this.stars;
		},
		blank: function blank() {
			return this.hover ? 5 - this.hoverStars : 5 - this.full;
		},
		types: function types() {
			var types = [];
			for (var i = 0; i < this.full; i++) {
				types.push(1);
			}
			for (var j = 0; j < this.blank; j++) {
				types.push(0);
			}

			return types;
		}
	},
	methods: {
		update: function update(stars) {
			this.stars = stars;
			this.$emit('changed', { stars: stars });
		},
		highlight: function highlight(stars) {
			this.hover = true;
			this.hoverStars = stars;
		},
		normal: function normal() {
			this.hover = false;
			this.hoverStars = 0;
		}
	}
});

/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pick_stars-component"
  }, [_vm._l((_vm.types), function(type, n) {
    return [(type === 1) ? _c('i', {
      staticClass: "fa fa-star plr3",
      attrs: {
        "aria-hidden": "true"
      },
      on: {
        "click": function($event) {
          _vm.update(n + 1)
        },
        "mouseover": function($event) {
          _vm.highlight(n + 1)
        },
        "mouseout": _vm.normal
      }
    }) : _vm._e(), (type === 0) ? _c('i', {
      staticClass: "fa fa-star-o plr3",
      attrs: {
        "aria-hidden": "true"
      },
      on: {
        "click": function($event) {
          _vm.update(n + 1)
        },
        "mouseover": function($event) {
          _vm.highlight(n + 1)
        },
        "mouseout": _vm.normal
      }
    }) : _vm._e()]
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2da456f4", module.exports)
  }
}

/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "leave_review-component"
  }, [_c('div', {
    staticClass: "stars-container"
  }, [_c('div', {
    staticClass: "communication"
  }, [_c('div', {
    staticClass: "review-heading"
  }, [_vm._v("Kommunikation")]), _vm._v(" "), _c('app-pick-stars', {
    on: {
      "changed": function($event) {
        _vm.communication = $event.stars
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "as-described"
  }, [_c('div', {
    staticClass: "review-heading"
  }, [_vm._v("Som avtalat")]), _vm._v(" "), _c('app-pick-stars', {
    on: {
      "changed": function($event) {
        _vm.as_described = $event.stars
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "would-recommend"
  }, [_c('div', {
    staticClass: "review-heading"
  }, [_vm._v("Skulle rekommendera")]), _vm._v(" "), _c('app-pick-stars', {
    on: {
      "changed": function($event) {
        _vm.would_recommend = $event.stars
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "comment-container"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.review),
      expression: "review"
    }],
    staticClass: "form-control mtb20",
    attrs: {
      "rows": "3"
    },
    domProps: {
      "value": (_vm.review)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.review = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "action-container text-center"
  }, [(_vm.submitted) ? _c('small', {
    staticClass: "action-text mb10 alert alert-info"
  }, [_vm._v("\n\t\t\tDu har redan lämnat omdömme för detta projektet.\n\t\t")]) : [_c('small', {
    staticClass: "action-text mb10",
    class: {
      'alert alert-danger': _vm.error
    }
  }, [_vm._v("Klicka i stjärnorna och skriv en liten text för att beskriva din upplevelse")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary",
    class: {
      'processing': _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.send($event)
      }
    }
  }, [_vm._v("Lämna omdömme")])]], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2255fca3", module.exports)
  }
}

/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "project_completed-component"
  }, [_c('div', {
    staticClass: "panel panel-success"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('app-leave-review', {
    attrs: {
      "forUser": _vm.other,
      "submitted": _vm.submitted
    }
  })], 1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "panel-heading"
  }, [_c('i', {
    staticClass: "fa fa-star",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Projektet är avslutat. Dags att lämna omdömme.\n\t\t")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2dfd016a", module.exports)
  }
}

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "project-component"
  }, [(_vm.fetched) ? [_c('project-title', {
    attrs: {
      "title": _vm.project.title,
      "default": ("# " + (_vm.project.id))
    }
  }), _vm._v(" "), _c(_vm.panel, {
    tag: "component",
    attrs: {
      "project": _vm.project
    }
  }), _vm._v(" "), _c('message-board')] : _c('app-loading')], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2ec874e0", module.exports)
  }
}

/***/ })

});