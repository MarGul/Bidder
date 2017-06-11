webpackJsonp([0,2],[
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
	function Model(resource) {
		_classCallCheck(this, Model);

		this.resource = resource;
		this.instance = null;
		this.url = null;
	}

	_createClass(Model, [{
		key: 'new',
		value: function _new() {
			var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { baseURL: 'http://bidder.dev' };

			this.instance = axios.create(config);
			return this;
		}
	}, {
		key: 'setId',
		value: function setId(id) {
			var match = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '{id}';

			this.resource = this.resource.replace(match, id);
			return this;
		}
	}, {
		key: 'setResource',
		value: function setResource(resource) {
			this.resource = resource;
			return this;
		}
	}, {
		key: 'setUrl',
		value: function setUrl(url) {
			this.url = url;
			return this;
		}
	}, {
		key: 'get',
		value: function get() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			return this.send('get', this.resource, { params: params });
		}
	}, {
		key: 'post',
		value: function post() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			return this.send('post', this.resource, data);
		}
	}, {
		key: 'patch',
		value: function patch() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			return this.send('patch', this.resource, data);
		}
	}, {
		key: 'put',
		value: function put() {
			var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			return this.send('put', this.resource, data);
		}
	}, {
		key: 'delete',
		value: function _delete() {
			return this.send('delete', this.resource);
		}
	}, {
		key: 'find',
		value: function find(identifier) {
			return this.send('get', this.resource + '/' + identifier);
		}
	}, {
		key: 'create',
		value: function create(data) {
			return this.send('post', this.resource, data);
		}
	}, {
		key: 'update',
		value: function update(identifier, data) {
			var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'patch';

			this.setId(identifier);
			return this.send(type, this.resource, data);
		}
	}, {
		key: 'send',
		value: function send(requestType, url) {
			var _this = this;

			var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			return new Promise(function (resolve, reject) {
				var instance = _this.instance || axios;
				var path = _this.url || url;

				instance[requestType](path, config).then(function (response) {
					resolve(response.data);
				}).catch(function (error) {
					reject(error.response.data);
				});
				// If a new instance or a custom URL has been used, reset that.
				_this.instance = null;
				_this.url = null;
			});
		}
	}]);

	return Model;
}();

/* harmony default export */ __webpack_exports__["a"] = Model;

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(344)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = { css: css, media: media, sourceMap: sourceMap }
    if (!newStyles[id]) {
      part.id = parentId + ':0'
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      part.id = parentId + ':' + newStyles[id].parts.length
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
  var hasSSR = styleElement != null

  // if in production mode and style is already provided by SSR,
  // simply do nothing.
  if (hasSSR && isProduction) {
    return noop
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = styleElement || createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (!hasSSR) {
    update(obj)
  }

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Errors__ = __webpack_require__(213);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Form = function () {
    /**
     * Create a new Form instance.
     *
     * @param {object} data
     */
    function Form(data) {
        _classCallCheck(this, Form);

        this.originalData = data;

        for (var field in data) {
            this[field] = data[field];
        }

        this.errors = new __WEBPACK_IMPORTED_MODULE_0__Errors__["a" /* default */]();
    }

    /**
     * Fetch all relevant data for the form.
     */


    _createClass(Form, [{
        key: 'data',
        value: function data() {
            var data = {};

            for (var property in this.originalData) {
                data[property] = this[property];
            }

            return data;
        }

        /**
         * Reset the form fields.
         */

    }, {
        key: 'reset',
        value: function reset() {
            for (var field in this.originalData) {
                this[field] = '';
            }

            this.errors.clear();
        }
    }]);

    return Form;
}();

/* harmony default export */ __webpack_exports__["a"] = Form;

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeartBeat; });

var HeartBeat = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a();

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(337)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(174),
  /* template */
  __webpack_require__(300),
  /* scopeId */
  "data-v-2a250a49",
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Timer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(343)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(171),
  /* template */
  __webpack_require__(329),
  /* scopeId */
  "data-v-b8890c0c",
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Ratings.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Ratings.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b8890c0c", Component.options)
  } else {
    hotAPI.reload("data-v-b8890c0c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports=function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="/dist/",t(0)}([function(e,t,n){"use strict";e.exports=n(75)},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var r=n(51),i=n(15);e.exports=function(e){return r(i(e))}},function(e,t,n){e.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(6),i=n(12);e.exports=n(4)?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(8),i=n(31),a=n(24),o=Object.defineProperty;t.f=n(4)?Object.defineProperty:function(e,t,n){if(r(e),t=a(t,!0),r(n),i)try{return o(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var r=n(22)("wks"),i=n(13),a=n(1).Symbol,o="function"==typeof a,s=e.exports=function(e){return r[e]||(r[e]=o&&a[e]||(o?a:i)("Symbol."+e))};s.store=r},function(e,t,n){var r=n(10);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){var r=n(36),i=n(16);e.exports=Object.keys||function(e){return r(e,i)}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t){e.exports={}},function(e,t){e.exports=!0},function(e,t){t.f={}.propertyIsEnumerable},function(e,t,n){var r=n(6).f,i=n(2),a=n(7)("toStringTag");e.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,a)&&r(e,a,{configurable:!0,value:t})}},function(e,t,n){var r=n(22)("keys"),i=n(13);e.exports=function(e){return r[e]||(r[e]=i(e))}},function(e,t,n){var r=n(1),i="__core-js_shared__",a=r[i]||(r[i]={});e.exports=function(e){return a[e]||(a[e]={})}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){var r=n(10);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},function(e,t,n){var r=n(1),i=n(14),a=n(18),o=n(26),s=n(6).f;e.exports=function(e){var t=i.Symbol||(i.Symbol=a?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:o.f(e)})}},function(e,t,n){t.f=n(7)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={translations:{ar:{months:{original:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوڤمبر","ديسمبر"],abbr:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوڤمبر","ديسمبر"]},days:["أحد","إثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"]},da:{months:{original:["Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","Oktober","November","December"],abbr:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]},days:["Sø","Ma","Ti","On","To","Fr","Lø"]},en:{months:{original:["January","February","March","April","May","June","July","August","September","October","November","December"],abbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},es:{months:{original:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],abbr:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]},days:["Dom","Lun","Mar","Mié","Jue","Vie","Sab"]},fi:{months:{original:["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],abbr:["tammi","helmi","maalis","huhti","touko","kesä","heinä","elo","syys","loka","marras","joulu"]},days:["su","ma","ti","ke","to","pe","la"]},fr:{months:{original:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],abbr:["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"]},days:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"]},hr:{months:{original:["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"],abbr:["Sij","Velj","Ožu","Tra","Svi","Lip","Srp","Kol","Ruj","Lis","Stu","Pro"]},days:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"]},it:{months:{original:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],abbr:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"]},days:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"]},lt:{months:{original:["Sausis","Vasaris","Kovas","Balandis","Gegužė","Birželis","Liepa","Rugpjūtis","Rugsėjis","Spalis","Lapkritis","Gruodis"],abbr:["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rugp","Rugs","Spa","Lap","Gru"]},days:["Sek","Pir","Ant","Tre","Ket","Pen","Šeš"]},nl:{months:{original:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],abbr:["jan","feb","maa","apr","mei","jun","jul","aug","sep","okt","nov","dec"]},days:["zo","ma","di","wo","do","vr","za"]},de:{months:{original:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],abbr:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]},days:["So.","Mo.","Di.","Mi.","Do.","Fr.","Sa."]},"pt-br":{months:{original:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],abbr:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]},days:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"]},vi:{months:{original:["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],abbr:["T 01","T 02","T 03","T 04","T 05","T 06","T 07","T 08","T 09","T 10","T 11","T 12"]},days:["CN","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"]},zh:{months:{original:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],abbr:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},days:["日","一","二","三","四","五","六"]},ja:{months:{original:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],abbr:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]},days:["日","月","火","水","木","金","土"]},he:{months:{original:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],abbr:["ינו","פבר","מרץ","אפר","מאי","יונ","יול","אוג","ספט","אוק","נוב","דצמ"]},days:["א","ב","ג","ד","ה","ו","ש"]},cs:{months:{original:["leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad","prosinec"],abbr:["led","úno","bře","dub","kvě","čer","čec","srp","zář","říj","lis","pro"]},days:["ne","po","út","st","čt","pá","so"]},ru:{months:{original:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],abbr:["Янв","Февр","Март","Апр","Май","Июнь","Июль","Авг","Сент","Окт","Нояб","Дек"]},days:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]},bg:{months:{original:["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"],abbr:["Ян","Фев","Мар","Апр","Май","Юни","Юли","Авг","Сеп","Окт","Ное","Дек"]},days:["Нд","Пн","Вт","Ср","Чт","Пт","Сб"]},sv:{months:{original:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],abbr:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},days:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"]},th:{months:{original:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],abbr:["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."]},days:["อา","จ","อ","พ","พฤ","ศ","ส"]},ro:{months:{original:["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"],abbr:["Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sep","Oct","Noi","Dec"]},days:["D","L","Ma","Mi","J","V","S"]},"sl-si":{months:{original:["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"],abbr:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Avg","Sep","Okt","Nov","Dec"]},days:["Ned","Pon","Tor","Sre","Čet","Pet","Sob"]},pl:{months:{original:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],abbr:["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"]},days:["Nd","Pn","Wt","Śr","Czw","Pt","Sob"]},"nb-no":{months:{original:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],abbr:["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Des"]},days:["Sø","Ma","Ti","On","To","Fr","Lø"]},ee:{months:{original:["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"],abbr:["Jaan","Veebr","Märts","Apr","Mai","Juuni","Juuli","Aug","Sept","Okt","Nov","Dets"]},days:["P","E","T","K","N","R","L"]},ko:{months:{original:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],abbr:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]},days:["일","월","화","수","목","금","토"]}}}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(10),i=n(1).document,a=r(i)&&r(i.createElement);e.exports=function(e){return a?i.createElement(e):{}}},function(e,t,n){var r=n(1),i=n(14),a=n(48),o=n(5),s="prototype",u=function(e,t,n){var l,c,d,f=e&u.F,h=e&u.G,p=e&u.S,b=e&u.P,g=e&u.B,y=e&u.W,v=h?i:i[t]||(i[t]={}),m=v[s],D=h?r:p?r[t]:(r[t]||{})[s];h&&(n=t);for(l in n)c=!f&&D&&void 0!==D[l],c&&l in v||(d=c?D[l]:n[l],v[l]=h&&"function"!=typeof D[l]?n[l]:g&&c?a(d,r):y&&D[l]==d?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[s]=e[s],t}(d):b&&"function"==typeof d?a(Function.call,d):d,b&&((v.virtual||(v.virtual={}))[l]=d,e&u.R&&m&&!m[l]&&o(m,l,d)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,e.exports=u},function(e,t,n){e.exports=!n(4)&&!n(9)(function(){return 7!=Object.defineProperty(n(29)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){"use strict";var r=n(18),i=n(30),a=n(37),o=n(5),s=n(2),u=n(17),l=n(53),c=n(20),d=n(60),f=n(7)("iterator"),h=!([].keys&&"next"in[].keys()),p="@@iterator",b="keys",g="values",y=function(){return this};e.exports=function(e,t,n,v,m,D,M){l(n,t,v);var w,S,x,k=function(e){if(!h&&e in Y)return Y[e];switch(e){case b:return function(){return new n(this,e)};case g:return function(){return new n(this,e)}}return function(){return new n(this,e)}},O=t+" Iterator",F=m==g,T=!1,Y=e.prototype,j=Y[f]||Y[p]||m&&Y[m],A=j||k(m),J=m?F?k("entries"):A:void 0,N="Array"==t?Y.entries||j:j;if(N&&(x=d(N.call(new e)),x!==Object.prototype&&(c(x,O,!0),r||s(x,f)||o(x,f,y))),F&&j&&j.name!==g&&(T=!0,A=function(){return j.call(this)}),r&&!M||!h&&!T&&Y[f]||o(Y,f,A),u[t]=A,u[O]=y,m)if(w={values:F?A:k(g),keys:D?A:k(b),entries:J},M)for(S in w)S in Y||a(Y,S,w[S]);else i(i.P+i.F*(h||T),t,w);return w}},function(e,t,n){var r=n(8),i=n(57),a=n(16),o=n(21)("IE_PROTO"),s=function(){},u="prototype",l=function(){var e,t=n(29)("iframe"),r=a.length,i="<",o=">";for(t.style.display="none",n(50).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(i+"script"+o+"document.F=Object"+i+"/script"+o),e.close(),l=e.F;r--;)delete l[u][a[r]];return l()};e.exports=Object.create||function(e,t){var n;return null!==e?(s[u]=r(e),n=new s,s[u]=null,n[o]=e):n=l(),void 0===t?n:i(n,t)}},function(e,t,n){var r=n(36),i=n(16).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){var r=n(2),i=n(3),a=n(47)(!1),o=n(21)("IE_PROTO");e.exports=function(e,t){var n,s=i(e),u=0,l=[];for(n in s)n!=o&&r(s,n)&&l.push(n);for(;t.length>u;)r(s,n=t[u++])&&(~a(l,n)||l.push(n));return l}},function(e,t,n){e.exports=n(5)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(42),a=r(i),o=n(27),s=r(o);t.default={isValidDate:function(e){return"[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e.getTime())},getDayNameAbbr:function(e,t){if("object"!==("undefined"==typeof e?"undefined":(0,a.default)(e)))throw TypeError("Invalid Type");return t[e.getDay()]},getMonthName:function(e,t){if(!t)throw Error("missing 2nd parameter Months array");if("object"===("undefined"==typeof e?"undefined":(0,a.default)(e)))return t[e.getMonth()];if("number"==typeof e)return t[e];throw TypeError("Invalid type")},getMonthNameAbbr:function(e,t){if(!t)throw Error("missing 2nd paramter Months array");if("object"===("undefined"==typeof e?"undefined":(0,a.default)(e)))return t[e.getMonth()];if("number"==typeof e)return t[e];throw TypeError("Invalid type")},convertToUTC:function(e){return new Date(e.getTime()+6e4*e.getTimezoneOffset())},daysInMonth:function(e,t){return new Date(Date.UTC(e,t+1,0)).getUTCDate()},dayDiff:function(e,t){var n=864e5,r=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()),i=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.floor((i-r)/n)},getNthSuffix:function(e){switch(e){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th"}},formatDate:function(e,t,n){n=n?n:s.default.translations.en;var r=e.getFullYear(),i=e.getMonth()+1,a=e.getDate(),o=t.replace(/dd/,("0"+a).slice(-2)).replace(/d/,a).replace(/yyyy/,r).replace(/yy/,String(r).slice(2)).replace(/MMMM/,this.getMonthName(e.getMonth(),n.months.original)).replace(/MMM/,this.getMonthNameAbbr(e.getMonth(),n.months.abbr)).replace(/MM/,("0"+i).slice(-2)).replace(/M(?!a|ä)/,i).replace(/su/,this.getNthSuffix(e.getDate())).replace(/D(?!e|é|i)/,this.getDayNameAbbr(e,n.days));return o},createDateArray:function(e,t){for(var n=[];e<=t;)n.push(new Date(e)),e=new Date(e).setDate(new Date(e).getDate()+1);return n}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(38),a=r(i),o=n(27),s=r(o);t.default={props:{value:{validator:function(e){return null===e||e instanceof Date||"string"==typeof e}},name:{value:String},id:{value:String},format:{value:String,default:"dd MMM yyyy"},language:{value:String,default:"en"},disabled:{type:Object},highlighted:{type:Object},placeholder:{type:String},inline:{type:Boolean},inputClass:{type:String},wrapperClass:{type:String},mondayFirst:{type:Boolean,default:!1},clearButton:{type:Boolean,default:!1}},data:function(){return{currDate:new Date((new Date).getFullYear(),(new Date).getMonth(),1).getTime(),selectedDate:null,showDayView:!1,showMonthView:!1,showYearView:!1,calendarHeight:0}},watch:{value:function(e){this.setValue(e)}},computed:{formattedValue:function(){return this.selectedDate?a.default.formatDate(new Date(this.selectedDate),this.format,this.translation):null},translation:function(){return s.default.translations[this.language]},currMonthName:function(){var e=new Date(this.currDate);return a.default.getMonthNameAbbr(e.getMonth(),this.translation.months.abbr)},currYear:function(){var e=new Date(this.currDate);return e.getFullYear()},blankDays:function(){var e=new Date(this.currDate),t=new Date(e.getFullYear(),e.getMonth(),1,e.getHours(),e.getMinutes());return this.mondayFirst?t.getDay()>0?t.getDay()-1:6:t.getDay()},daysOfWeek:function(){if(this.mondayFirst){var e=this.translation.days.slice();return e.push(e.shift()),e}return this.translation.days},days:function e(){for(var t=new Date(this.currDate),e=[],n=new Date(t.getFullYear(),t.getMonth(),1,t.getHours(),t.getMinutes()),r=a.default.daysInMonth(n.getFullYear(),n.getMonth()),i=0;i<r;i++)e.push({date:n.getDate(),timestamp:n.getTime(),isSelected:this.isSelectedDate(n),isDisabled:this.isDisabledDate(n),isHighlighted:this.isHighlightedDate(n)}),n.setDate(n.getDate()+1);return e},months:function e(){for(var t=new Date(this.currDate),e=[],n=new Date(t.getFullYear(),0,t.getDate(),t.getHours(),t.getMinutes()),r=0;r<12;r++)e.push({month:a.default.getMonthName(r,this.translation.months.original),timestamp:n.getTime(),isSelected:this.isSelectedMonth(n),isDisabled:this.isDisabledMonth(n)}),n.setMonth(n.getMonth()+1);return e},years:function e(){for(var t=new Date(this.currDate),e=[],n=new Date(10*Math.floor(t.getFullYear()/10),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),r=0;r<10;r++)e.push({year:n.getFullYear(),timestamp:n.getTime(),isSelected:this.isSelectedYear(n),isDisabled:this.isDisabledYear(n)}),n.setFullYear(n.getFullYear()+1);return e},calendarStyle:function(){var e={top:0,height:0};this.$el&&(e=this.$el.getBoundingClientRect());var t=e.top+e.height+this.calendarHeight||0,n={};return t>window.innerHeight&&(n={bottom:e.height+"px"}),this.isInline()&&(n.position="static"),n},calendarStyleSecondary:function(){return this.isInline()?{position:"static"}:{}}},methods:{close:function(){this.showDayView=this.showMonthView=this.showYearView=!1},getDefaultDate:function(){return new Date((new Date).getFullYear(),(new Date).getMonth(),1).getTime()},resetDefaultDate:function(){this.currDate=null===this.selectedDate?this.getDefaultDate():this.selectedDate.getTime()},isOpen:function(){return this.showDayView||this.showMonthView||this.showYearView},isInline:function(){return"undefined"!=typeof this.inline&&this.inline},showCalendar:function(){return!this.isInline()&&(this.isOpen()?this.close():void this.showDayCalendar())},showDayCalendar:function(){this.close(),this.showDayView=!0,this.$emit("opened")},showMonthCalendar:function(){this.close(),this.showMonthView=!0},showYearCalendar:function(){this.close(),this.showYearView=!0},setDate:function(e){this.selectedDate=new Date(e),this.currDate=new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth(),1).getTime(),this.$emit("selected",new Date(e)),this.$emit("input",new Date(e))},clearDate:function(){this.selectedDate=null,this.$emit("selected",this.selectedDate),this.$emit("cleared")},selectDate:function(e){return!e.isDisabled&&(this.setDate(e.timestamp),this.isInline()?this.showDayCalendar():void this.close())},selectMonth:function(e){return!e.isDisabled&&(this.currDate=e.timestamp,void this.showDayCalendar())},selectYear:function(e){return!e.isDisabled&&(this.currDate=e.timestamp,void this.showMonthCalendar())},getMonth:function(){var e=new Date(this.currDate);return e.getMonth()},getYear:function(){var e=new Date(this.currDate);return e.getFullYear()},getDecade:function(){var e=new Date(this.currDate),t=10*Math.floor(e.getFullYear()/10);return t+"'s"},previousMonth:function(){if(this.previousMonthDisabled())return!1;var e=new Date(this.currDate);e.setMonth(e.getMonth()-1),this.currDate=e.getTime(),this.$emit("changedMonth",e)},previousMonthDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.to||!this.disabled.to)return!1;var e=new Date(this.currDate);return this.disabled.to.getMonth()>=e.getMonth()&&this.disabled.to.getFullYear()>=e.getFullYear()},nextMonth:function(){if(this.nextMonthDisabled())return!1;var e=new Date(this.currDate),t=a.default.daysInMonth(e.getFullYear(),e.getMonth());e.setDate(e.getDate()+t),this.currDate=e.getTime(),this.$emit("changedMonth",e)},nextMonthDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.from||!this.disabled.from)return!1;var e=new Date(this.currDate);return this.disabled.from.getMonth()<=e.getMonth()&&this.disabled.from.getFullYear()<=e.getFullYear()},previousYear:function(){if(this.previousYearDisabled())return!1;var e=new Date(this.currDate);e.setYear(e.getFullYear()-1),this.currDate=e.getTime(),this.$emit("changedYear")},previousYearDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.to||!this.disabled.to)return!1;var e=new Date(this.currDate);return this.disabled.to.getFullYear()>=e.getFullYear()},nextYear:function(){if(this.nextYearDisabled())return!1;var e=new Date(this.currDate);e.setYear(e.getFullYear()+1),this.currDate=e.getTime(),this.$emit("changedYear")},nextYearDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.from||!this.disabled.from)return!1;var e=new Date(this.currDate);return this.disabled.from.getFullYear()<=e.getFullYear()},previousDecade:function(){if(this.previousDecadeDisabled())return!1;var e=new Date(this.currDate);e.setYear(e.getFullYear()-10),this.currDate=e.getTime(),this.$emit("changedDecade")},previousDecadeDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.to||!this.disabled.to)return!1;var e=new Date(this.currDate);return 10*Math.floor(this.disabled.to.getFullYear()/10)>=10*Math.floor(e.getFullYear()/10)},nextDecade:function(){if(this.nextDecadeDisabled())return!1;var e=new Date(this.currDate);e.setYear(e.getFullYear()+10),this.currDate=e.getTime(),this.$emit("changedDecade")},nextDecadeDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.from||!this.disabled.from)return!1;var e=new Date(this.currDate);return 10*Math.ceil(this.disabled.from.getFullYear()/10)<=10*Math.ceil(e.getFullYear()/10)},isSelectedDate:function(e){return this.selectedDate&&this.selectedDate.toDateString()===e.toDateString()},isDisabledDate:function(e){var t=!1;return"undefined"!=typeof this.disabled&&("undefined"!=typeof this.disabled.dates&&this.disabled.dates.forEach(function(n){if(e.toDateString()===n.toDateString())return t=!0,!0}),"undefined"!=typeof this.disabled.to&&this.disabled.to&&e<this.disabled.to&&(t=!0),"undefined"!=typeof this.disabled.from&&this.disabled.from&&e>this.disabled.from&&(t=!0),"undefined"!=typeof this.disabled.days&&this.disabled.days.indexOf(e.getDay())!==-1&&(t=!0),t)},isHighlightedDate:function(e){if(this.isDisabledDate(e))return!1;var t=!1;return"undefined"!=typeof this.highlighted&&("undefined"!=typeof this.highlighted.dates&&this.highlighted.dates.forEach(function(n){if(e.toDateString()===n.toDateString())return t=!0,!0}),this.isDefined(this.highlighted.from)&&this.isDefined(this.highlighted.to)&&(t=e>=this.highlighted.from&&e<=this.highlighted.to),"undefined"!=typeof this.highlighted.days&&this.highlighted.days.indexOf(e.getDay())!==-1&&(t=!0),t)},isDefined:function(e){return"undefined"!=typeof e&&e},isSelectedMonth:function(e){return this.selectedDate&&this.selectedDate.getFullYear()===e.getFullYear()&&this.selectedDate.getMonth()===e.getMonth()},isDisabledMonth:function(e){var t=!1;return"undefined"!=typeof this.disabled&&("undefined"!=typeof this.disabled.to&&this.disabled.to&&(e.getMonth()<this.disabled.to.getMonth()&&e.getFullYear()<=this.disabled.to.getFullYear()||e.getFullYear()<this.disabled.to.getFullYear())&&(t=!0),"undefined"!=typeof this.disabled.from&&this.disabled.from&&(this.disabled.from&&e.getMonth()>this.disabled.from.getMonth()&&e.getFullYear()>=this.disabled.from.getFullYear()||e.getFullYear()>this.disabled.from.getFullYear())&&(t=!0),t)},isSelectedYear:function(e){return this.selectedDate&&this.selectedDate.getFullYear()===e.getFullYear()},isDisabledYear:function(e){var t=!1;return!("undefined"==typeof this.disabled||!this.disabled)&&("undefined"!=typeof this.disabled.to&&this.disabled.to&&e.getFullYear()<this.disabled.to.getFullYear()&&(t=!0),"undefined"!=typeof this.disabled.from&&this.disabled.from&&e.getFullYear()>this.disabled.from.getFullYear()&&(t=!0),t)},setValue:function(e){if("string"==typeof e){var t=new Date(e);e=isNaN(t.valueOf())?null:t}if(!e){var n=new Date;return this.currDate=new Date(n.getFullYear(),n.getMonth(),1).getTime(),void(this.selectedDate=null)}this.selectedDate=e,this.currDate=new Date(e.getFullYear(),e.getMonth(),1).getTime()},init:function(){var e=this;this.value&&this.setValue(this.value),this.isInline()&&this.showDayCalendar(),this.$nextTick(function(){e.calendarHeight=e.$el.querySelector(".calendar").getBoundingClientRect().height}),document.addEventListener("click",function(t){if(e.$el&&!e.$el.contains(t.target)){if(e.isInline())return e.showDayCalendar();e.resetDefaultDate(),e.close()}},!1)}},ready:function(){this.init()},mounted:function(){this.init()}}},function(e,t,n){e.exports={default:n(43),__esModule:!0}},function(e,t,n){e.exports={default:n(44),__esModule:!0}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var i=n(41),a=r(i),o=n(40),s=r(o),u="function"==typeof s.default&&"symbol"==typeof a.default?function(e){return typeof e}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":typeof e};t.default="function"==typeof s.default&&"symbol"===u(a.default)?function(e){return"undefined"==typeof e?"undefined":u(e)}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":"undefined"==typeof e?"undefined":u(e)}},function(e,t,n){n(68),n(66),n(69),n(70),e.exports=n(14).Symbol},function(e,t,n){n(67),n(71),e.exports=n(26).f("iterator")},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){e.exports=function(){}},function(e,t,n){var r=n(3),i=n(63),a=n(62);e.exports=function(e){return function(t,n,o){var s,u=r(t),l=i(u.length),c=a(o,l);if(e&&n!=n){for(;l>c;)if(s=u[c++],s!=s)return!0}else for(;l>c;c++)if((e||c in u)&&u[c]===n)return e||c||0;return!e&&-1}}},function(e,t,n){var r=n(45);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var r=n(11),i=n(35),a=n(19);e.exports=function(e){var t=r(e),n=i.f;if(n)for(var o,s=n(e),u=a.f,l=0;s.length>l;)u.call(e,o=s[l++])&&t.push(o);return t}},function(e,t,n){e.exports=n(1).document&&document.documentElement},function(e,t,n){var r=n(28);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t,n){var r=n(28);e.exports=Array.isArray||function(e){return"Array"==r(e)}},function(e,t,n){"use strict";var r=n(33),i=n(12),a=n(20),o={};n(5)(o,n(7)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=r(o,{next:i(1,n)}),a(e,t+" Iterator")}},function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t,n){var r=n(11),i=n(3);e.exports=function(e,t){for(var n,a=i(e),o=r(a),s=o.length,u=0;s>u;)if(a[n=o[u++]]===t)return n}},function(e,t,n){var r=n(13)("meta"),i=n(10),a=n(2),o=n(6).f,s=0,u=Object.isExtensible||function(){return!0},l=!n(9)(function(){return u(Object.preventExtensions({}))}),c=function(e){o(e,r,{value:{i:"O"+ ++s,w:{}}})},d=function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!a(e,r)){if(!u(e))return"F";if(!t)return"E";c(e)}return e[r].i},f=function(e,t){if(!a(e,r)){if(!u(e))return!0;if(!t)return!1;c(e)}return e[r].w},h=function(e){return l&&p.NEED&&u(e)&&!a(e,r)&&c(e),e},p=e.exports={KEY:r,NEED:!1,fastKey:d,getWeak:f,onFreeze:h}},function(e,t,n){var r=n(6),i=n(8),a=n(11);e.exports=n(4)?Object.defineProperties:function(e,t){i(e);for(var n,o=a(t),s=o.length,u=0;s>u;)r.f(e,n=o[u++],t[n]);return e}},function(e,t,n){var r=n(19),i=n(12),a=n(3),o=n(24),s=n(2),u=n(31),l=Object.getOwnPropertyDescriptor;t.f=n(4)?l:function(e,t){if(e=a(e),t=o(t,!0),u)try{return l(e,t)}catch(e){}if(s(e,t))return i(!r.f.call(e,t),e[t])}},function(e,t,n){var r=n(3),i=n(34).f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return i(e)}catch(e){return o.slice()}};e.exports.f=function(e){return o&&"[object Window]"==a.call(e)?s(e):i(r(e))}},function(e,t,n){var r=n(2),i=n(64),a=n(21)("IE_PROTO"),o=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=i(e),r(e,a)?e[a]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?o:null}},function(e,t,n){var r=n(23),i=n(15);e.exports=function(e){return function(t,n){var a,o,s=String(i(t)),u=r(n),l=s.length;return u<0||u>=l?e?"":void 0:(a=s.charCodeAt(u),a<55296||a>56319||u+1===l||(o=s.charCodeAt(u+1))<56320||o>57343?e?s.charAt(u):a:e?s.slice(u,u+2):(a-55296<<10)+(o-56320)+65536)}}},function(e,t,n){var r=n(23),i=Math.max,a=Math.min;e.exports=function(e,t){return e=r(e),e<0?i(e+t,0):a(e,t)}},function(e,t,n){var r=n(23),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},function(e,t,n){var r=n(15);e.exports=function(e){return Object(r(e))}},function(e,t,n){"use strict";var r=n(46),i=n(54),a=n(17),o=n(3);e.exports=n(32)(Array,"Array",function(e,t){this._t=o(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,i(1)):"keys"==t?i(0,n):"values"==t?i(0,e[n]):i(0,[n,e[n]])},"values"),a.Arguments=a.Array,r("keys"),r("values"),r("entries")},function(e,t){},function(e,t,n){"use strict";var r=n(61)(!0);n(32)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},function(e,t,n){"use strict";var r=n(1),i=n(2),a=n(4),o=n(30),s=n(37),u=n(56).KEY,l=n(9),c=n(22),d=n(20),f=n(13),h=n(7),p=n(26),b=n(25),g=n(55),y=n(49),v=n(52),m=n(8),D=n(3),M=n(24),w=n(12),S=n(33),x=n(59),k=n(58),O=n(6),F=n(11),T=k.f,Y=O.f,j=x.f,A=r.Symbol,J=r.JSON,N=J&&J.stringify,_="prototype",C=h("_hidden"),P=h("toPrimitive"),E={}.propertyIsEnumerable,L=c("symbol-registry"),I=c("symbols"),V=c("op-symbols"),z=Object[_],B="function"==typeof A,R=r.QObject,$=!R||!R[_]||!R[_].findChild,G=a&&l(function(){return 7!=S(Y({},"a",{get:function(){return Y(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=T(z,t);r&&delete z[t],Y(e,t,n),r&&e!==z&&Y(z,t,r)}:Y,H=function(e){var t=I[e]=S(A[_]);return t._k=e,t},W=B&&"symbol"==typeof A.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof A},K=function(e,t,n){return e===z&&K(V,t,n),m(e),t=M(t,!0),m(n),i(I,t)?(n.enumerable?(i(e,C)&&e[C][t]&&(e[C][t]=!1),n=S(n,{enumerable:w(0,!1)})):(i(e,C)||Y(e,C,w(1,{})),e[C][t]=!0),G(e,t,n)):Y(e,t,n)},U=function(e,t){m(e);for(var n,r=y(t=D(t)),i=0,a=r.length;a>i;)K(e,n=r[i++],t[n]);return e},Q=function(e,t){return void 0===t?S(e):U(S(e),t)},X=function(e){var t=E.call(this,e=M(e,!0));return!(this===z&&i(I,e)&&!i(V,e))&&(!(t||!i(this,e)||!i(I,e)||i(this,C)&&this[C][e])||t)},q=function(e,t){if(e=D(e),t=M(t,!0),e!==z||!i(I,t)||i(V,t)){var n=T(e,t);return!n||!i(I,t)||i(e,C)&&e[C][t]||(n.enumerable=!0),n}},Z=function(e){for(var t,n=j(D(e)),r=[],a=0;n.length>a;)i(I,t=n[a++])||t==C||t==u||r.push(t);
return r},ee=function(e){for(var t,n=e===z,r=j(n?V:D(e)),a=[],o=0;r.length>o;)!i(I,t=r[o++])||n&&!i(z,t)||a.push(I[t]);return a};B||(A=function(){if(this instanceof A)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(n){this===z&&t.call(V,n),i(this,C)&&i(this[C],e)&&(this[C][e]=!1),G(this,e,w(1,n))};return a&&$&&G(z,e,{configurable:!0,set:t}),H(e)},s(A[_],"toString",function(){return this._k}),k.f=q,O.f=K,n(34).f=x.f=Z,n(19).f=X,n(35).f=ee,a&&!n(18)&&s(z,"propertyIsEnumerable",X,!0),p.f=function(e){return H(h(e))}),o(o.G+o.W+o.F*!B,{Symbol:A});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;)h(te[ne++]);for(var te=F(h.store),ne=0;te.length>ne;)b(te[ne++]);o(o.S+o.F*!B,"Symbol",{for:function(e){return i(L,e+="")?L[e]:L[e]=A(e)},keyFor:function(e){if(W(e))return g(L,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){$=!0},useSimple:function(){$=!1}}),o(o.S+o.F*!B,"Object",{create:Q,defineProperty:K,defineProperties:U,getOwnPropertyDescriptor:q,getOwnPropertyNames:Z,getOwnPropertySymbols:ee}),J&&o(o.S+o.F*(!B||l(function(){var e=A();return"[null]"!=N([e])||"{}"!=N({a:e})||"{}"!=N(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!W(e)){for(var t,n,r=[e],i=1;arguments.length>i;)r.push(arguments[i++]);return t=r[1],"function"==typeof t&&(n=t),!n&&v(t)||(t=function(e,t){if(n&&(t=n.call(this,e,t)),!W(t))return t}),r[1]=t,N.apply(J,r)}}}),A[_][P]||n(5)(A[_],P,A[_].valueOf),d(A,"Symbol"),d(Math,"Math",!0),d(r.JSON,"JSON",!0)},function(e,t,n){n(25)("asyncIterator")},function(e,t,n){n(25)("observable")},function(e,t,n){n(65);for(var r=n(1),i=n(5),a=n(17),o=n(7)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],u=0;u<5;u++){var l=s[u],c=r[l],d=c&&c.prototype;d&&!d[o]&&i(d,o,l),a[l]=a.Array}},function(e,t,n){t=e.exports=n(73)(),t.push([e.id,'.datepicker{position:relative}.datepicker *{box-sizing:border-box}.calendar{position:absolute;z-index:100;background:#fff;width:300px;border:1px solid #ccc}.calendar header{display:block;line-height:40px}.calendar header span{display:inline-block;text-align:center;width:71.42857142857143%;float:left}.calendar header .next,.calendar header .prev{width:14.285714285714286%;float:left;text-indent:-10000px;position:relative}.calendar header .next:after,.calendar header .prev:after{content:"";position:absolute;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);border:6px solid transparent}.calendar header .prev:after{border-right:10px solid #000;margin-left:-5px}.calendar header .prev.disabled:after{border-right:10px solid #ddd}.calendar header .next:after{border-left:10px solid #000;margin-left:5px}.calendar header .next.disabled:after{border-left:10px solid #ddd}.calendar header .next:not(.disabled),.calendar header .prev:not(.disabled),.calendar header .up:not(.disabled){cursor:pointer}.calendar header .next:not(.disabled):hover,.calendar header .prev:not(.disabled):hover,.calendar header .up:not(.disabled):hover{background:#eee}.calendar .disabled{color:#ddd;cursor:default}.calendar .cell{display:inline-block;padding:0 5px;width:14.285714285714286%;height:40px;line-height:40px;text-align:center;vertical-align:middle;border:1px solid transparent}.calendar .cell:not(.blank):not(.disabled).day,.calendar .cell:not(.blank):not(.disabled).month,.calendar .cell:not(.blank):not(.disabled).year{cursor:pointer}.calendar .cell:not(.blank):not(.disabled).day:hover,.calendar .cell:not(.blank):not(.disabled).month:hover,.calendar .cell:not(.blank):not(.disabled).year:hover{border:1px solid #4bd}.calendar .cell.selected,.calendar .cell.selected.highlighted,.calendar .cell.selected:hover{background:#4bd}.calendar .cell.highlighted{background:#cae5ed}.calendar .cell.grey{color:#888}.calendar .cell.grey:hover{background:inherit}.calendar .cell.day-header{font-size:75%;white-space:no-wrap;cursor:inherit}.calendar .cell.day-header:hover{background:inherit}.calendar .month,.calendar .year{width:33.333%}.datepicker-clear-button{cursor:pointer;font-style:normal}',""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var a=this[i][0];"number"==typeof a&&(r[a]=!0)}for(i=0;i<t.length;i++){var o=t[i];"number"==typeof o[0]&&r[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(e,t){e.exports=' <div class=datepicker :class=wrapperClass> <input :type="inline ? \'hidden\' : \'text\'" :class=inputClass :name=name :id=id @click=showCalendar() :value=formattedValue :placeholder=placeholder :clear-button=clearButton readonly=readonly> <i class=datepicker-clear-button v-if=clearButton @click=clearDate()>&times;</i> <div class=calendar v-show=showDayView v-bind:style=calendarStyle> <header> <span @click=previousMonth class=prev v-bind:class="{ \'disabled\' : previousMonthDisabled(currDate) }">&lt;</span> <span @click=showMonthCalendar class=up>{{ currMonthName }} {{ currYear }}</span> <span @click=nextMonth class=next v-bind:class="{ \'disabled\' : nextMonthDisabled(currDate) }">&gt;</span> </header> <span class="cell day-header" v-for="d in daysOfWeek">{{ d }}</span> <span class="cell day blank" v-for="d in blankDays"></span><span class="cell day" v-for="day in days" track-by=timestamp v-bind:class="{ \'selected\':day.isSelected, \'disabled\':day.isDisabled, \'highlighted\': day.isHighlighted}" @click=selectDate(day)>{{ day.date }}</span> </div> <div class=calendar v-show=showMonthView v-bind:style=calendarStyleSecondary> <header> <span @click=previousYear class=prev v-bind:class="{ \'disabled\' : previousYearDisabled(currDate) }">&lt;</span> <span @click=showYearCalendar class=up>{{ getYear() }}</span> <span @click=nextYear class=next v-bind:class="{ \'disabled\' : nextYearDisabled(currDate) }">&gt;</span> </header> <span class="cell month" v-for="month in months" track-by=timestamp v-bind:class="{ \'selected\': month.isSelected, \'disabled\': month.isDisabled }" @click.stop=selectMonth(month)>{{ month.month }}</span> </div> <div class=calendar v-show=showYearView v-bind:style=calendarStyleSecondary> <header> <span @click=previousDecade class=prev v-bind:class="{ \'disabled\' : previousDecadeDisabled(currDate) }">&lt;</span> <span>{{ getDecade() }}</span> <span @click=nextDecade class=next v-bind:class="{ \'disabled\' : nextMonthDisabled(currDate) }">&gt;</span> </header> <span class="cell year" v-for="year in years" track-by=timestamp v-bind:class="{ \'selected\': year.isSelected, \'disabled\': year.isDisabled }" @click.stop=selectYear(year)>{{ year.year }}</span> </div> </div> '},function(e,t,n){var r,i,a={};n(77),r=n(39),i=n(74),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports.default);var o="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(o.template=i),o.computed||(o.computed={}),Object.keys(a).forEach(function(e){var t=a[e];o.computed[e]=function(){return t}})},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=d[r.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](r.parts[a]);for(;a<r.parts.length;a++)i.parts.push(u(r.parts[a],t))}else{for(var o=[],a=0;a<r.parts.length;a++)o.push(u(r.parts[a],t));d[r.id]={id:r.id,refs:1,parts:o}}}}function i(e){for(var t=[],n={},r=0;r<e.length;r++){var i=e[r],a=i[0],o=i[1],s=i[2],u=i[3],l={css:o,media:s,sourceMap:u};n[a]?n[a].parts.push(l):t.push(n[a]={id:a,parts:[l]})}return t}function a(e,t){var n=p(),r=y[y.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),y.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function o(e){e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",a(e,t),t}function u(e,t){var n,r,i;if(t.singleton){var a=g++;n=b||(b=s(t)),r=l.bind(null,n,a,!1),i=l.bind(null,n,a,!0)}else n=s(t),r=c.bind(null,n),i=function(){o(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}function l(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=v(t,i);else{var a=document.createTextNode(i),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(a,o[t]):e.appendChild(a)}}function c(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var d={},f=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},h=f(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),p=f(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,g=0,y=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=h()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=i(e);return r(n,t),function(e){for(var a=[],o=0;o<n.length;o++){var s=n[o],u=d[s.id];u.refs--,a.push(u)}if(e){var l=i(e);r(l,t)}for(var o=0;o<a.length;o++){var u=a[o];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete d[u.id]}}}};var v=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){var r=n(72);"string"==typeof r&&(r=[[e.id,r,""]]);n(76)(r,{});r.locals&&(e.exports=r.locals)}]);
//# sourceMappingURL=build.js.map

/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(167),
  /* template */
  __webpack_require__(299),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/ItemsBlock.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ItemsBlock.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26b6d159", Component.options)
  } else {
    hotAPI.reload("data-v-26b6d159", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(172),
  /* template */
  __webpack_require__(332),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Search.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e0883258", Component.options)
  } else {
    hotAPI.reload("data-v-e0883258", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(190),
  /* template */
  __webpack_require__(302),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/Profile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.2.1
  * (c) 2017 Evan You
  * @license MIT
  */


/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (!condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // inject instance registration hooks
    var hooks = data.hook || (data.hook = {});
    hooks.init = function (vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.prepatch = function (oldVnode, vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.destroy = function (vnode) {
      if (matched.instances[name] === vnode.child) {
        matched.instances[name] = undefined;
      }
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      warn(false, ("props in \"" + (route.path) + "\" is a " + (typeof config) + ", expecting an object, function or boolean."));
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more comformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  if (query) {
    var parsedQuery;
    try {
      parsedQuery = parseQuery(query);
    } catch (e) {
      process.env.NODE_ENV !== 'production' && warn(false, e.message);
      parsedQuery = {};
    }
    for (var key in extraQuery) {
      parsedQuery[key] = extraQuery[key];
    }
    return parsedQuery
  } else {
    return extraQuery
  }
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom
) {
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (ref) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  return (path || '/') + stringifyQuery(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active';
    var compareTarget = location.path ? createRoute(null, location) : route;
    classes[activeClass] = this.exact
      ? isSameRoute(current, compareTarget)
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.target && e.target.getAttribute) {
    var target = e.target.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this.$root._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this.$root._route }
  });

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (this.$options.router) {
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      }
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  if (relative.charAt(0) === '/') {
    return relative
  }

  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '.') {
      continue
    } else if (segment === '..') {
      stack.pop();
    } else {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

/*  */

function createRouteMap (
  routes,
  oldPathMap,
  oldNameMap
) {
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathMap, nameMap, route);
  });

  return {
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var record = {
    path: normalizePath(path, parent),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    if (Array.isArray(route.alias)) {
      route.alias.forEach(function (alias) {
        var aliasRoute = {
          path: alias,
          children: route.children
        };
        addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
      });
    } else {
      var aliasRoute = {
        path: route.alias,
        children: route.children
      };
      addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
    }
  }

  if (!pathMap[record.path]) {
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isarray = index$1;

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCache = Object.create(null);

function getRouteRegex (path) {
  var hit = regexpCache[path];
  var keys, regexp;

  if (hit) {
    keys = hit.keys;
    regexp = hit.regexp;
  } else {
    keys = [];
    regexp = index(path, keys);
    regexpCache[path] = { keys: keys, regexp: regexp };
  }

  return { keys: keys, regexp: regexp }
}

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : (current && current.path) || '/';
  var query = resolveQuery(parsedPath.query, next.query);
  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */

function createMatcher (routes) {
  var ref = createRouteMap(routes);
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      var paramNames = getRouteRegex(record.path).keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var path in pathMap) {
        if (matchRoute(path, location.params, location.path)) {
          return _createRoute(pathMap[path], location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      process.env.NODE_ENV !== 'production' && warn(
        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
      );
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  path,
  params,
  pathname
) {
  var ref = getRouteRegex(path);
  var regexp = ref.regexp;
  var keys = ref.keys;
  var m = pathname.match(regexp);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) { params[key.name] = val; }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        position = getElementPosition(el);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el) {
  var docRect = document.documentElement.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */


var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
  }
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, onAbort);
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function () { onAbort && onAbort(); };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    hook(route, current, function (to) {
      if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this$1.ensureURL(true);
        abort();
      } else if (typeof to === 'string' || typeof to === 'object') {
        // next('/') or next({ path: '/' }) -> redirect
        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to);
        abort();
      } else {
        // confirm transition and pass on the value
        next(to);
      }
    });
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    // wait until async components are resolved before
    // extracting in-component enter guards
    runQueue(enterGuards, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { return cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl ? baseEl.getAttribute('href') : '/';
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  return function boundRouteGuard () {
    return guard.apply(instance, arguments)
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

function resolveAsyncComponents (matched) {
  return flatMapComponents(matched, function (def, _, match, key) {
    // if it's a function and doesn't have Vue options attached,
    // assume it's an async component resolve function.
    // we are not using Vue's default async resolving mechanism because
    // we want to halt the navigation until the incoming component has been
    // resolved.
    if (typeof def === 'function' && !def.options) {
      return function (to, from, next) {
        var resolve = once(function (resolvedDef) {
          match.components[key] = resolvedDef;
          next();
        });

        var reject = once(function (reason) {
          warn(false, ("Failed to resolve async component " + key + ": " + reason));
          next(false);
        });

        var res = def(resolve, reject);
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject);
        }
      }
    }
  })
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    if (called) { return }
    called = true;
    return fn.apply(this, arguments)
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, this$1.current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var i = window.location.href.indexOf('#');
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  );
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || []);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  this.beforeHooks.push(fn);
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  this.afterHooks.push(fn);
};

VueRouter.prototype.onReady = function onReady (cb) {
  this.history.onReady(cb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(to, current || this.history.current, append);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.2.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

module.exports = VueRouter;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App_vue__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_store__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes__ = __webpack_require__(215);

/**
 * Bootstrap the application
 */
__webpack_require__(211);
/**
 * Import the Application. This is the starting point for the App.
 */

/**
 * Import the Vuex store.
 */


/**
 * All of the applications routes. Great starting point for overview of app.
 */


var app = new Vue({
  el: '#app',
  store: __WEBPACK_IMPORTED_MODULE_1__store_store__["a" /* default */],
  router: __WEBPACK_IMPORTED_MODULE_2__routes__["a" /* default */],
  render: function render(h) {
    return h(__WEBPACK_IMPORTED_MODULE_0__App_vue___default.a);
  }
});

/***/ }),
/* 141 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Layout_MobileHeader__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Layout_MobileHeader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Layout_MobileHeader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout_DesktopHeader__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout_DesktopHeader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Layout_DesktopHeader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Includes_Modal__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Includes_Modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Includes_Modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Includes_Search__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Includes_Search___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Includes_Search__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Layout_Footer__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Layout_Footer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Layout_Footer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__includes_heartbeat__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = {
    components: {
        appMobileHeader: __WEBPACK_IMPORTED_MODULE_0__components_Layout_MobileHeader___default.a,
        appDesktopHeader: __WEBPACK_IMPORTED_MODULE_1__components_Layout_DesktopHeader___default.a,
        appModal: __WEBPACK_IMPORTED_MODULE_2__components_Includes_Modal___default.a,
        appSearch: __WEBPACK_IMPORTED_MODULE_3__components_Includes_Search___default.a,
        appFooter: __WEBPACK_IMPORTED_MODULE_4__components_Layout_Footer___default.a
    },
    data: function data() {
        return {
            breakpoints: window.breakpoints
        };
    },

    methods: {
        hideMobileNav: function hideMobileNav() {
            $('body').removeClass('mobile-nav-open');
        }
    },
    created: function created() {
        // Initialize Data
        this.$store.dispatch('fetchCategories');
        this.$store.dispatch('fetchRegions');
        // Start the applications heartbeat
        setInterval(function () {
            __WEBPACK_IMPORTED_MODULE_5__includes_heartbeat__["a" /* HeartBeat */].$emit('beat');
        }, 1000);
    }
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 160 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
	data: function data() {
		return {
			processing: false,
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				email: '',
				password: '',
				remember: false
			})
		};
	},

	computed: {
		alertType: function alertType() {
			return 'alert-' + this.$store.getters.modalAlert;
		},
		alertMessage: function alertMessage() {
			return this.$store.getters.modalMessage;
		}
	},
	methods: {
		authenticate: function authenticate() {
			var _this = this;

			this.processing = true;

			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]().new().setUrl('login').post(this.form.data()).then(function (response) {
				_this.$store.commit('SET_AUTHENTICATED', { authenticated: response.authenticated });
				_this.$store.commit('SET_USER', { user: response.user });

				if (_this.$store.getters.authIntended) {
					_this.$router.push(_this.$store.getters.authIntended);
					_this.$store.commit('SET_INTENDED', { intended: null });
				}

				_this.processing = false;
				_this.$store.dispatch('closeModal');
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
};

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_classes_Form__ = __webpack_require__(7);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
	data: function data() {
		return {
			processing: false,
			form: new __WEBPACK_IMPORTED_MODULE_1__includes_classes_Form__["a" /* default */]({
				name: '',
				email: '',
				password: ''
			})
		};
	},

	methods: {
		register: function register() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('users').create(this.form.data()).then(function (response) {
				console.log('Registered, now authenticate the user with the available data.');
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
};

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_classes_Form__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__ = __webpack_require__(14);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		datepicker: __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default.a
	},
	data: function data() {
		return {
			processing: false,
			form: new __WEBPACK_IMPORTED_MODULE_1__includes_classes_Form__["a" /* default */]({
				start: '',
				end: '',
				hours: '',
				price: '',
				description: ''
			})
		};
	},

	computed: {
		id: function id() {
			return this.$store.getters.getService.id;
		},
		finalData: function finalData() {
			var data = this.form.data();
			data.start = this.stripTime(data.start);
			data.end = this.stripTime(data.end);
			data.hours = parseFloat(data.hours.replace(',', '.'));
			data.price = parseFloat(data.price.replace(',', '.'));

			return data;
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
		create: function create() {
			var _this = this;

			this.processing = true;

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('services/{id}/bids').setId(this.id).create(this.finalData).then(function (response) {
				_this.$store.commit('ADD_BID', { bid: response.bid });
				_this.form.reset();
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		},
		openShowBids: function openShowBids() {
			this.$store.dispatch('openModal', { component: 'showBids', size: 'large' });
		}
	}
};

/***/ }),
/* 163 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		appRatings: __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default.a
	},
	computed: {
		bids: function bids() {
			return this.$store.getters.getBids;
		}
	},
	methods: {
		openCreateBid: function openCreateBid() {
			this.$store.dispatch('openModal', { component: 'createBid', size: 'large' });
		},
		time: function time(t) {
			return moment(t).format("LLL");
		}
	}
};

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
	props: ['comment'],
	data: function data() {
		return {
			time: moment(this.comment.updated_at).fromNow()
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
			_this.time = moment(_this.comment.updated_at).fromNow();
		});
	}
};

/***/ }),
/* 166 */
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

/* harmony default export */ __webpack_exports__["default"] = {};

/***/ }),
/* 167 */
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

/* harmony default export */ __webpack_exports__["default"] = {
	props: ['items', 'subItemsKey', 'link', 'allLink'],
	data: function data() {
		return {
			active: 0,
			breakpoints: window.breakpoints
		};
	},

	computed: {
		subCats: function subCats() {
			return this.items.length > 0 ? this.items[this.active][this.subItemsKey] : [];
		},
		activeItem: function activeItem() {
			return this.items.length > 0 ? this.items[this.active] : null;
		}
	},
	methods: {
		changeActive: function changeActive(index) {
			this.active = index;
		},
		generateLink: function generateLink(item) {
			var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			var link = all && this.allLink ? this.allLink : this.link;
			return link.replace('{slug}', item.slug);
		}
	}
};

/***/ }),
/* 168 */
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

/* harmony default export */ __webpack_exports__["default"] = {
	props: {
		bg: {
			type: String,
			default: "white"
		}
	}
};

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Auth_Register__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Auth_Register___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Auth_Register__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Auth_Login__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Auth_Login___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Auth_Login__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bids_CreateBid__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bids_CreateBid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Bids_CreateBid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Bids_ShowBids__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Bids_ShowBids___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Bids_ShowBids__);
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		register: __WEBPACK_IMPORTED_MODULE_0__Auth_Register___default.a,
		login: __WEBPACK_IMPORTED_MODULE_1__Auth_Login___default.a,
		createBid: __WEBPACK_IMPORTED_MODULE_2__Bids_CreateBid___default.a,
		showBids: __WEBPACK_IMPORTED_MODULE_3__Bids_ShowBids___default.a
	}
};

/***/ }),
/* 170 */
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

/* harmony default export */ __webpack_exports__["default"] = {};

/***/ }),
/* 171 */
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

/* harmony default export */ __webpack_exports__["default"] = {
	props: {
		rating: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			default: 5
		},
		size: {
			type: String,
			default: ''
		},
		total: {
			type: Number,
			default: 0
		}
	},
	computed: {
		fullStars: function fullStars() {
			return Math.floor(this.rating);
		},
		halfStar: function halfStar() {
			return this.rating % 1 >= 0.5 ? true : false;
		},
		emptyStars: function emptyStars() {
			var empty = this.max - this.fullStars;
			return this.halfStar ? empty - 1 : empty;
		}
	}
};

/***/ }),
/* 172 */
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

/* harmony default export */ __webpack_exports__["default"] = {};

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
	props: ['items', 'options'],
	data: function data() {
		return {
			input: '',
			error: false
		};
	},

	computed: {
		matched: function matched() {
			var _this = this;

			if (!this.input) return [];

			return this.options.filter(function (opt) {
				return opt.name.toLowerCase().indexOf(_this.input.toLowerCase()) !== -1;
			});
		},
		inputWidth: function inputWidth() {
			return { width: 20 + this.input.length * 8 + 'px' };
		}
	},
	methods: {
		addItem: function addItem(text) {
			var current = $.grep(this.options, function (e) {
				return e.name.toLowerCase() == text.toLowerCase();
			})[0];

			if (current) {
				this.$emit('add', {
					text: current.name,
					value: current.id,
					type: current.type
				});
				return this.input = '';
			}

			return !(this.error = true);
		}
	}
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(9);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Search__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Search___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_Search__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		appSearch: __WEBPACK_IMPORTED_MODULE_0__Includes_Search___default.a
	},
	computed: {
		avatar: function avatar() {
			return { backgroundImage: 'url(' + this.$store.getters.authUser.avatar + ')' };
		},
		dropdown: function dropdown() {
			return this.$store.getters.authDropdown;
		}
	},
	methods: {
		toggleDropdown: function toggleDropdown() {
			this.$store.commit('SET_DROPDOWN', { dropdown: !this.$store.getters.authDropdown });
		},
		logout: function logout() {
			this.$store.dispatch('logout');
			this.$router.push('/');
		}
	}
};

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {};

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
	computed: {
		avatar: function avatar() {
			return { backgroundImage: 'url(' + this.$store.getters.authUser.avatar };
		}
	},
	methods: {
		navToggle: function navToggle() {
			if ($('body').hasClass('mobile-nav-open')) {
				$('body').removeClass('mobile-nav-open');
			} else {
				$('body').addClass('mobile-nav-open');
			}
		},
		hideMenu: function hideMenu() {
			$('body').removeClass('mobile-nav-open');
		}
	}
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(9);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SendMessage__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SendMessage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__SendMessage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Message__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Message___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Message__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = {
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
	}
};

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PickStars__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PickStars___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__PickStars__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 182 */
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

/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Timer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_Timer__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
	props: ['service'],
	components: {
		appTimer: __WEBPACK_IMPORTED_MODULE_0__Includes_Timer___default.a
	},
	methods: {
		bidStop: function bidStop() {
			// Emit an event to bidStop so that the Services component can remove the service from the list.
			this.$emit('bidStop', { id: this.service.id });
		}
	}
};

/***/ }),
/* 184 */
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

/* harmony default export */ __webpack_exports__["default"] = {
	computed: {
		title: function title() {
			return this.$store.getters.getServiceTitle;
		},
		description: function description() {
			return this.$store.getters.getServiceDescription;
		},
		category: function category() {
			return this.$store.getters.getServiceCategoryName;
		},
		location: function location() {
			return this.$store.getters.getServiceCityName + ", " + this.$store.getters.getServiceRegionName;
		}
	}
};

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Service_vue__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Service_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Service_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = {
	props: {
		categories: { type: Array, default: function _default() {
				return [];
			} },
		regions: { type: Array, default: function _default() {
				return [];
			} },
		cities: { type: Array, default: function _default() {
				return [];
			} }
	},
	components: {
		appTagsInput: __WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput___default.a,
		appService: __WEBPACK_IMPORTED_MODULE_1__Service_vue___default.a
	},
	data: function data() {
		return {
			filterText: '',
			fetched: false,
			services: [],
			page: 1
		};
	},

	computed: {
		locations: function locations() {
			return this.regions.concat(this.cities);
		},
		allCategories: function allCategories() {
			return this.$store.getters.getCategoriesFlatten;
		},
		allLocations: function allLocations() {
			return this.$store.getters.getRegionsFlatten;
		}
	},
	methods: {
		categoryAdd: function categoryAdd(item) {
			this.categories.push(item);
		},
		categoryRemove: function categoryRemove(_ref) {
			var index = _ref.index;

			this.categories.splice(index, 1);
		},
		locationAdd: function locationAdd(item) {
			item.type == 'region' ? this.regions.push(item) : this.cities.push(item);
		},
		locationRemove: function locationRemove(_ref2) {
			var item = _ref2.item;

			var target = item.type == 'region' ? this.regions : this.cities;
			var index = target.findIndex(function (el) {
				return el.value == item.value;
			});
			if (index != -1) target.splice(index, 1);
		},
		getServices: function getServices(append) {
			var _this = this;

			this.services = append ? this.services : [];
			new __WEBPACK_IMPORTED_MODULE_2__includes_Model__["a" /* default */]('services').get({
				page: this.page,
				text: this.filterText,
				categories: this.categories.map(function (el) {
					return el.value;
				}),
				regions: this.regions.map(function (el) {
					return el.value;
				}),
				cities: this.cities.map(function (el) {
					return el.value;
				})
			}).then(function (_ref3) {
				var services = _ref3.services;

				_this.services = _this.services.concat(services);
				_this.fetched = true;
			}).catch(function (error) {
				console.log(error);
			});
		},
		removeService: function removeService(_ref4) {
			var _this2 = this;

			var id = _ref4.id;

			var sleep = function sleep(ms) {
				return new Promise(function (resolve) {
					return setTimeout(resolve, ms);
				});
			};
			sleep(Math.random() * 10).then(function () {
				_this2.services.splice(_this2.services.findIndex(function (e) {
					return e.id == id;
				}), 1);
			});
		}
	},
	mounted: function mounted() {
		this.getServices();
	}
};

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Ratings__ = __webpack_require__(13);
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




/* harmony default export */ __webpack_exports__["default"] = {
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
				$("html, body").animate({ scrollTop: 0 }, "fast");
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
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 187 */
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

/* harmony default export */ __webpack_exports__["default"] = {
	computed: {
		fetched: function fetched() {
			return this.$store.getters.userBidsFetched;
		},
		bids: function bids() {
			return this.$store.getters.userBids;
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserBids');
		}
	}
};

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
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
				$("html, body").animate({ scrollTop: 0 }, "fast");
				_this.$store.commit('SET_USER', { user: response.user });
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
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
				$("html, body").animate({ scrollTop: 0 }, "fast");
				_this.form.reset();
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Account__ = __webpack_require__(261);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Account___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Account__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ChangePassword__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ChangePassword___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ChangePassword__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProfilePicture__ = __webpack_require__(263);
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





/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		appAccount: __WEBPACK_IMPORTED_MODULE_0__Account___default.a,
		appChangePassword: __WEBPACK_IMPORTED_MODULE_1__ChangePassword___default.a,
		appProfilePicture: __WEBPACK_IMPORTED_MODULE_2__ProfilePicture___default.a
	}
};

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {};

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__ = __webpack_require__(14);
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





/* harmony default export */ __webpack_exports__["default"] = {
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
				$("html, body").animate({ scrollTop: 0 }, "fast");
			}).catch(function (error) {
				_this.form.errors.record(error);
			});
		}
	},
	created: function created() {
		this.form.finish = this.$store.getters.userProjectFocus.finish;
		this.form.price = this.$store.getters.userProjectFocus.price;
	}
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 193 */
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

/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProjectTitle__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProjectTitle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ProjectTitle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Messages_MessageBoard__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Messages_MessageBoard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Messages_MessageBoard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProjectAccept__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProjectAccept___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ProjectAccept__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ProjectStarted__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ProjectStarted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ProjectStarted__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ProjectCompleted__ = __webpack_require__(268);
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







/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Timer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Includes_Timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChangeProjectDetails__ = __webpack_require__(264);
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





/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Reviews_LeaveReview__ = __webpack_require__(252);
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



/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Timer__ = __webpack_require__(11);
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




/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__ = __webpack_require__(14);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		datepicker: __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default.a
	},
	data: function data() {
		return {
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				title: '',
				rootCategory: '',
				category: '',
				region: '',
				city: '',
				start: '',
				end: '',
				bidding: '',
				description: ''
			}),
			processing: false
		};
	},

	computed: {
		categories: function categories() {
			return this.$store.getters.getCategories;
		},
		regions: function regions() {
			return this.$store.getters.getRegions;
		},
		finalData: function finalData() {
			var data = this.form.data();
			data.category = this.form.category;
			data.region = this.form.region.id || '';
			data.city = this.form.city;
			data.start = this.stripTime(data.start);
			data.end = this.stripTime(data.end);
			// Only needed rootCategory to know what categories to show
			delete data.rootCategory;

			return data;
		}
	},
	methods: {
		stripTime: function stripTime(date) {
			return date instanceof Date ? date.getFullYear() + '-' + this.pad(date.getMonth() + 1) + '-' + this.pad(date.getDate()) : date;
		},
		pad: function pad(number) {
			return number < 10 ? "0" + number : number;
		},
		create: function create() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('services').create(this.finalData).then(function (response) {
				_this.form.reset();
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Woohoo! Vi skapade din tjänst.' });
				$("html, body").animate({ scrollTop: 0 }, "fast");
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 200 */
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

/* harmony default export */ __webpack_exports__["default"] = {
	computed: {
		fetched: function fetched() {
			return this.$store.getters.userServicesFetched;
		},
		services: function services() {
			return this.$store.getters.userServices;
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserServices');
		}
	}
};

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
	data: function data() {
		return {
			processing: false,
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				category_id: '',
				region_id: '',
				city_id: ''
			})
		};
	},

	computed: {
		categories: function categories() {
			return this.$store.getters.getCategoriesFlatten;
		},
		regions: function regions() {
			return this.$store.getters.getRegions;
		},
		regionDisabled: function regionDisabled() {
			return this.form.city_id ? true : false;
		},
		cities: function cities() {
			return this.$store.getters.getCities;
		},
		citiesDisabled: function citiesDisabled() {
			return this.form.region_id ? true : false;
		}
	},
	methods: {
		add: function add() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('subscriptions').post(this.form.data()).then(function (response) {
				var subscriptions = _this.$store.getters.userSubscriptions;
				subscriptions.push(response.subscription);
				_this.$store.commit('SET_SUBSCRIPTIONS', { subscriptions: subscriptions });
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Vi har lagt till din prenumeration. När en ny tjänst skapas som du prenumererar på kommer du att få ett email om tjänsten.' });
				$("html, body").animate({ scrollTop: 0 }, "fast");
				_this.form.reset();
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AddSubscription__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AddSubscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AddSubscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		appAddSubscription: __WEBPACK_IMPORTED_MODULE_0__AddSubscription___default.a
	},
	computed: {
		fetched: function fetched() {
			return this.$store.getters.userSubscriptionsFetched;
		},
		subscriptions: function subscriptions() {
			return this.$store.getters.userSubscriptions;
		}
	},
	methods: {
		remove: function remove(id) {
			var _this = this;

			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]("subscriptions/" + id).delete().then(function (response) {
				var subscriptions = _this.subscriptions;
				subscriptions.forEach(function (sub, key) {
					if (id == sub.id) {
						subscriptions.splice(key, 1);
					}
				});
				_this.$store.commit('SET_SUBSCRIPTIONS', { subscriptions: subscriptions });
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Prenumerationen är borttagen.' });
				$("html, body").animate({ scrollTop: 0 }, "fast");
			}).catch(function (error) {
				console.log(error);
			});
		},
		title: function title(sub) {
			var isRegion = sub.region_id ? true : false;
			var locationId = isRegion ? sub.region_id : sub.city_id;
			var location = isRegion ? this.$store.getters.getRegionById(locationId) : this.$store.getters.getCityById(locationId);
			var category = this.$store.getters.getCategoryById(sub.category_id);

			return category.name + " i " + location.name;
		}
	},
	created: function created() {
		if (!this.fetched) {
			this.$store.dispatch('fetchUserSubscriptions');
		}
	}
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 203 */
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

/* harmony default export */ __webpack_exports__["default"] = {};

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		appItemsBlock: __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock___default.a
	},
	computed: {
		categories: function categories() {
			return this.$store.getters.getCategories;
		}
	}
};

/***/ }),
/* 205 */
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

/* harmony default export */ __webpack_exports__["default"] = {};

/***/ }),
/* 206 */
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

/* harmony default export */ __webpack_exports__["default"] = {};

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		appItemsBlock: __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock___default.a
	},
	computed: {
		regions: function regions() {
			return this.$store.getters.getRegions;
		}
	}
};

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Includes_Ratings__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Includes_Ratings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Includes_Ratings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Includes_Timer__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Includes_Timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Includes_Timer__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		appComment: __WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment___default.a,
		appAddComment: __WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment___default.a,
		appServiceDescription: __WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription___default.a,
		appRatings: __WEBPACK_IMPORTED_MODULE_3__components_Includes_Ratings___default.a,
		appTimer: __WEBPACK_IMPORTED_MODULE_4__components_Includes_Timer___default.a
	},
	computed: {
		service: function service() {
			return this.$store.getters.getService;
		},
		bids: function bids() {
			return this.service.bids.length;
		},
		breakpoints: function breakpoints() {
			return window.breakpoints;
		},
		ends: function ends() {
			return moment(this.service.bid_stop).format("LLL");
		},
		avatarAlt: function avatarAlt() {
			return 'Avatar bild f\xF6r anv\xE4ndare ' + this.service.user.username;
		}
	},
	methods: {
		createBid: function createBid() {
			this.$store.dispatch('openModal', { component: 'createBid', size: 'large' });
		},
		showBids: function showBids() {
			this.$store.dispatch('openModal', { component: 'showBids', size: 'large' });
		}
	},
	created: function created() {
		this.$store.dispatch('getService', { id: this.$route.params.id });
	}
};

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Services_Services__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Services_Services___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Services_Services__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
	components: {
		appServices: __WEBPACK_IMPORTED_MODULE_0__components_Services_Services___default.a
	}
};

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_Notifications__ = __webpack_require__(244);
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
//



/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_filters__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_classes_BootstrapBreakpoints__ = __webpack_require__(212);
/**
 * Load in jQuery
 */
window.$ = __webpack_provided_window_dot_jQuery = __webpack_require__(3);

/**
 *  Load in Moment.js
 */
window.moment = __webpack_require__(0);
window.moment.locale('sv');

/**
 * Load in vue
 */
window.Vue = __webpack_require__(8);

/**
 * Tell vue to use the first-package vue-router
 */

Vue.use(__WEBPACK_IMPORTED_MODULE_0_vue_router___default.a);

/**
 * Global Vue components and Prototypes
 */
Vue.component('app-hero', __webpack_require__(241));
Vue.component('app-loading', __webpack_require__(242));


Vue.prototype.filters = __WEBPACK_IMPORTED_MODULE_1__includes_filters__["a" /* default */];

/**
 * Load in Axios HTTP framework.
 */
window.axios = __webpack_require__(15);

window.axios.defaults.baseURL = 'http://bidder.dev/api/v1/';
window.axios.defaults.headers.common = {
  'X-CSRF-TOKEN': window.Laravel.csrfToken,
  'X-Requested-With': 'XMLHttpRequest'
};

/**
 * Object to handle Twitter bootstrap breakpoints
 */

window.breakpoints = new __WEBPACK_IMPORTED_MODULE_2__includes_classes_BootstrapBreakpoints__["a" /* default */]();
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BootstrapBreakpoints = function () {
	function BootstrapBreakpoints() {
		_classCallCheck(this, BootstrapBreakpoints);

		this._update();

		$(window).resize(function () {
			this._update();
		}.bind(this));
	}

	_createClass(BootstrapBreakpoints, [{
		key: '_update',
		value: function _update(bb) {
			this.current = this._getCurrentBreakpoint();
			this.mobile = this.isMobile();
			this.small = this.isSmallDevices();
		}
	}, {
		key: '_getCurrentBreakpoint',
		value: function _getCurrentBreakpoint() {
			return $('#detect-breakpoints').find('span:visible:first')[0].className.split(/\s+/)[0].replace('device-', '');
		}
	}, {
		key: 'is',
		value: function is(breakpoint) {
			return this.current == breakpoint;
		}
	}, {
		key: 'isMobile',
		value: function isMobile() {
			return this.current == 'xs';
		}
	}, {
		key: 'isSmallDevices',
		value: function isSmallDevices() {
			return this.current == 'xs' || this.current == 'sm';
		}
	}]);

	return BootstrapBreakpoints;
}();

/* harmony default export */ __webpack_exports__["a"] = BootstrapBreakpoints;
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Errors = function () {
    /**
     * Create a new Errors instance.
     */
    function Errors() {
        _classCallCheck(this, Errors);

        this.errors = {};
    }

    /**
     * Determine if an errors exists for the given field.
     *
     * @param {string} field
     */


    _createClass(Errors, [{
        key: "has",
        value: function has(field) {
            return this.errors.hasOwnProperty(field);
        }

        /**
         * Determine if we have any errors.
         */

    }, {
        key: "any",
        value: function any() {
            return Object.keys(this.errors).length > 0;
        }

        /**
         * Retrieve the error message for a field.
         *
         * @param {string} field
         */

    }, {
        key: "get",
        value: function get(field) {
            if (this.errors[field]) {
                return this.errors[field][0];
            }
        }

        /**
         * Retrieve a value based on a key in the error object
         * 
         * @param  {String} key [The key to grab the value from]
         * @return {Mixed}      [The value from the key]
         */

    }, {
        key: "getValue",
        value: function getValue(key) {
            return this.errors[key];
        }

        /**
         * Record the new errors.
         *
         * @param {object} errors
         */

    }, {
        key: "record",
        value: function record(errors) {
            this.errors = errors;
        }

        /**
         * Clear one or all error fields.
         *
         * @param {string|null} field
         */

    }, {
        key: "clear",
        value: function clear(field) {
            if (field) {
                delete this.errors[field];

                return;
            }

            this.errors = {};
        }
    }]);

    return Errors;
}();

/* harmony default export */ __webpack_exports__["a"] = Errors;

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var filters = {
	currency: function currency(value) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('.', ',') + ' kr';
	},
	commaSeparator: function commaSeparator(value) {
		return value.toString().replace('.', ',');
	}
};

/* harmony default export */ __webpack_exports__["a"] = filters;

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_router__);


/**
 * All of the applications routes
 */
var routes = [{ path: "/", name: 'home', component: __webpack_require__(277) }, { path: "/categories", name: 'categories', component: __webpack_require__(276) }, { path: "/locations", name: 'locations', component: __webpack_require__(279) }, { path: "/services", name: 'services', component: __webpack_require__(281) }, { path: "/services/:id", name: 'serviceDetails', component: __webpack_require__(280) }, { path: "/information", name: 'information', component: __webpack_require__(278) }, { path: "/user", name: 'user', component: __webpack_require__(282),
	children: [{ path: '', component: __webpack_require__(138), meta: { requiresAuth: true } }, { path: 'profile', component: __webpack_require__(138), meta: { requiresAuth: true } }, { path: 'notifications', component: __webpack_require__(259), meta: { requiresAuth: true } }, { path: 'create-service', component: __webpack_require__(271), meta: { requiresAuth: true } }, { path: 'services', component: __webpack_require__(272), meta: { requiresAuth: true } }, { path: 'bids', component: __webpack_require__(258), meta: { requiresAuth: true } }, { path: 'projects', component: __webpack_require__(265), meta: { requiresAuth: true } }, { path: 'project/:id', component: __webpack_require__(266), meta: { requiresAuth: true } }, { path: 'payments', component: __webpack_require__(260), meta: { requiresAuth: true } }, { path: 'service/:id/bids', component: __webpack_require__(257), meta: { requiresAuth: true } }, { path: 'subscriptions', component: __webpack_require__(274), meta: { requiresAuth: true } }],
	meta: { requiresAuth: true }
},

/* 404 is handled by the vue application */
{ path: "*", component: __webpack_require__(275) }];

var router = new __WEBPACK_IMPORTED_MODULE_0_vue_router___default.a({
	routes: routes,
	linkActiveClass: 'active',
	mode: 'history'
});

/*
	The router authentication guard.
 */
router.beforeEach(function (to, from, next) {
	if (to.meta.requiresAuth) {
		if (!router.app.$store.getters.isAuthenticated) {
			next('/');
			router.app.$store.commit('SET_INTENDED', { intended: to.path });
			router.app.$store.dispatch('openModal', {
				component: 'login',
				alert: {
					type: 'warning',
					message: 'Oops! Du måste vara inloggad för att komma in där.'
				}
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

/*
	Run to reset state after each new route.
 */
router.afterEach(function (to, from) {
	// Close the userNav dropdown.
	router.app.$store.commit('SET_DROPDOWN', { dropdown: false });
	// Close the mobile user navigation dropdown.
	router.app.$store.commit('SET_MOBILE_DROPDOWN', { mobileDropdown: false });
	// Close notifications
	router.app.$store.dispatch('closeNotification');
});

/* harmony default export */ __webpack_exports__["a"] = router;

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);


var auth = {
	state: {
		authenticated: window.Laravel.authenticated,
		user: window.Laravel.user || {},
		intended: null,
		dropdown: false,
		mobileDropdown: false
	},
	mutations: {
		'SET_AUTHENTICATED': function SET_AUTHENTICATED(state, payload) {
			state.authenticated = payload.authenticated;
		},
		'SET_USER': function SET_USER(state, payload) {
			state.user = payload.user;
		},
		'SET_INTENDED': function SET_INTENDED(state, payload) {
			state.intended = payload.intended;
		},
		'SET_DROPDOWN': function SET_DROPDOWN(state, payload) {
			state.dropdown = payload.dropdown;
		},
		'SET_MOBILE_DROPDOWN': function SET_MOBILE_DROPDOWN(state, payload) {
			state.mobileDropdown = payload.mobileDropdown;
		}
	},
	actions: {
		logout: function logout(_ref) {
			var commit = _ref.commit,
			    dispatch = _ref.dispatch;

			commit('SET_DROPDOWN', { dropdown: false });
			commit('SET_MOBILE_DROPDOWN', { dropdown: false });
			commit('SET_AUTHENTICATED', { authenticated: false });
			commit('SET_USER', { user: {} });
			// Clear user cached state
			dispatch('clearUserState');
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]().new().setUrl('logout').post().then(function (response) {
				// Set the new csrf token
				window.Laravel.csrfToken = response.csrfToken;
				window.axios.defaults.headers.common['X-CSRF-TOKEN'] = window.Laravel.csrfToken;
			}).catch(function (error) {});
		}
	},
	getters: {
		isAuthenticated: function isAuthenticated(state) {
			return state.authenticated;
		},
		authUser: function authUser(state) {
			return state.user;
		},
		authIntended: function authIntended(state) {
			return state.intended;
		},
		authDropdown: function authDropdown(state) {
			return state.dropdown;
		},
		mobileAuthDropdown: function mobileAuthDropdown(state) {
			return state.mobileDropdown;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = auth;

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);


var categories = {
	state: {
		categories: []
	},
	mutations: {
		'SET_CATEGORIES': function SET_CATEGORIES(state, categories) {
			state.categories = categories;
		}
	},
	actions: {
		fetchCategories: function fetchCategories(_ref) {
			var commit = _ref.commit;

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('categories').get().then(function (_ref2) {
				var categories = _ref2.categories;

				commit('SET_CATEGORIES', categories);
			});
		}
	},
	getters: {
		getCategoryById: function getCategoryById(state) {
			return function (id) {
				var c = null;
				state.categories.forEach(function (category, index) {
					if (category.id === id) {
						c = category;
						return;
					}

					category.sub_categories.forEach(function (sub, index) {
						if (sub.id === id) {
							c = sub;
							return;
						}
					});
				});
				return c;
			};
		},
		getCategories: function getCategories(state) {
			return state.categories;
		},
		getCategoriesFlatten: function getCategoriesFlatten(state) {
			var flattenCategories = [];
			var flatten = function flatten(categories) {
				categories.forEach(function (category, index) {
					if (category.sub_categories) {
						flatten(category.sub_categories);
					}
					// The TagsInput needs a type.
					category.type = 'category';
					return flattenCategories.push(category);
				});
			};
			flatten(state.categories);

			return flattenCategories;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = categories;

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var modal = {
	state: {
		open: false,
		component: '',
		data: {},
		size: 'small',
		alert: '',
		message: ''
	},
	mutations: {
		'OPEN_MODAL': function OPEN_MODAL(state) {
			state.open = true;
		},
		'CLOSE_MODAL': function CLOSE_MODAL(state) {
			state.open = false;
		},
		'SET_MODAL_COMPONENT': function SET_MODAL_COMPONENT(state, component) {
			state.component = component;
		},
		'SET_MODAL_SIZE': function SET_MODAL_SIZE(state, size) {
			state.size = size;
		},
		'SET_MODAL_DATA': function SET_MODAL_DATA(state, data) {
			state.data = data;
		},
		'SET_MODAL_ALERT': function SET_MODAL_ALERT(state, alert) {
			state.alert = alert;
		},
		'SET_MODAL_MESSAGE': function SET_MODAL_MESSAGE(state, message) {
			state.message = message;
		}
	},
	actions: {
		openModal: function openModal(_ref, _ref2) {
			var commit = _ref.commit;
			var component = _ref2.component,
			    _ref2$size = _ref2.size,
			    size = _ref2$size === undefined ? "small" : _ref2$size,
			    _ref2$data = _ref2.data,
			    data = _ref2$data === undefined ? {} : _ref2$data,
			    _ref2$alert = _ref2.alert,
			    alert = _ref2$alert === undefined ? {} : _ref2$alert;

			commit('SET_MODAL_COMPONENT', component);
			commit('SET_MODAL_SIZE', size);
			commit('SET_MODAL_DATA', data);
			if (alert.type) commit('SET_MODAL_ALERT', alert.type);
			if (alert.message) commit('SET_MODAL_MESSAGE', alert.message);
			commit('OPEN_MODAL');
		},
		closeModal: function closeModal(_ref3) {
			var commit = _ref3.commit;

			commit('CLOSE_MODAL');
			commit('SET_MODAL_COMPONENT', '');
			commit('SET_MODAL_DATA', {});
			commit('SET_MODAL_SIZE', 'small');
			commit('SET_MODAL_ALERT', '');
			commit('SET_MODAL_MESSAGE', '');
		}
	},
	getters: {
		modalOpen: function modalOpen(state) {
			return state.open;
		},
		modalComponent: function modalComponent(state) {
			return state.component;
		},
		modalData: function modalData(state) {
			return state.data;
		},
		modalSize: function modalSize(state) {
			return state.size;
		},
		modalAlert: function modalAlert(state) {
			return state.alert;
		},
		modalMessage: function modalMessage(state) {
			return state.message;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = modal;

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var notifications = {
	state: {
		showing: false,
		type: '',
		notification: '',
		link: '',
		linkText: ''
	},
	mutations: {
		'SET_SHOWING': function SET_SHOWING(state, showing) {
			state.showing = showing;
		},
		'SET_TYPE': function SET_TYPE(state, type) {
			state.type = type;
		},
		'SET_NOTIFICATION': function SET_NOTIFICATION(state, notification) {
			state.notification = notification;
		},
		'SET_LINK': function SET_LINK(state, link) {
			state.link = link;
		},
		'SET_LINK_TEXT': function SET_LINK_TEXT(state, linkText) {
			state.linkText = linkText;
		}
	},
	actions: {
		showNotification: function showNotification(_ref, payload) {
			var commit = _ref.commit;

			commit('SET_SHOWING', true);
			commit('SET_TYPE', payload.type);
			commit('SET_NOTIFICATION', payload.msg);
			if (payload.link) commit('SET_LINK', payload.link);
			if (payload.linkText) commit('SET_LINK_TEXT', payload.linkText);
		},
		closeNotification: function closeNotification(_ref2) {
			var commit = _ref2.commit;

			commit('SET_SHOWING', false);
			commit('SET_TYPE', '');
			commit('SET_NOTIFICATION', '');
			commit('SET_LINK', '');
			commit('SET_LINK_TEXT', '');
		}
	},
	getters: {
		showingNotification: function showingNotification(state) {
			return state.showing;
		},
		notificationType: function notificationType(state) {
			return state.type;
		},
		notificationMessage: function notificationMessage(state) {
			return state.notification;
		},
		notificationLink: function notificationLink(state) {
			return state.link;
		},
		notificationLinkText: function notificationLinkText(state) {
			return state.linkText;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = notifications;

/***/ }),
/* 220 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);


var regions = {
	state: {
		regions: []
	},
	mutations: {
		'SET_REGIONS': function SET_REGIONS(state, regions) {
			state.regions = regions;
		}
	},
	actions: {
		fetchRegions: function fetchRegions(_ref) {
			var commit = _ref.commit;

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('regions').get().then(function (_ref2) {
				var regions = _ref2.regions;

				commit('SET_REGIONS', regions);
			});
		}
	},
	getters: {
		getRegions: function getRegions(state) {
			return state.regions;
		},
		getRegionById: function getRegionById(state) {
			return function (id) {
				return state.regions.filter(function (r) {
					return r.id === id;
				})[0];
			};
		},
		getRegionsFlatten: function getRegionsFlatten(state) {
			var flattenedRegions = [];
			var flatten = function flatten(regions) {
				regions.forEach(function (region, index) {
					if (region.cities) {
						region.type = 'region';
						flatten(region.cities);
					} else {
						region.type = 'city';
					}

					return flattenedRegions.push(region);
				});
			};
			flatten(state.regions);

			return flattenedRegions;
		},

		getCityById: function getCityById(state) {
			return function (id) {
				var c = null;
				state.regions.forEach(function (region, index) {
					region.cities.forEach(function (city, index) {
						if (city.id === id) {
							c = city;
							return;
						}
					});
					if (c) return;
				});
				return c;
			};
		},
		getCities: function getCities(state) {
			var cities = [];
			state.regions.forEach(function (region, index) {
				cities = cities.concat(region.cities);
			});
			return cities.sort(function (a, b) {
				return a.name < b.name ? -1 : 1;
			});
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = regions;

/***/ }),
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);


var service = {
	state: {
		loaded: false,
		service: { comments: [], bids: [], user: {} }
	},
	mutations: {
		'SET_LOADED': function SET_LOADED(state, loaded) {
			state.loaded = loaded;
		},
		'SET_SERVICE': function SET_SERVICE(state, service) {
			state.service = service;
		},
		'ADD_BID': function ADD_BID(state, payload) {
			state.service.bids.unshift(payload.bid);
		},
		'ADD_COMMENT': function ADD_COMMENT(state, payload) {
			state.service.comments.unshift(payload.comment);
		}
	},
	actions: {
		getService: function getService(_ref, payload) {
			var commit = _ref.commit;

			// Set the base state first.
			commit('SET_LOADED', false);
			commit('SET_SERVICE', { comments: [], bids: [], user: {} });
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('services').find(payload.id).then(function (response) {
				commit('SET_SERVICE', response.service);
				commit('SET_LOADED', true);
			}).catch(function (error) {});
		}
	},
	getters: {
		getServiceLoaded: function getServiceLoaded(state) {
			return state.loaded;
		},
		getService: function getService(state) {
			return state.service;
		},
		getServiceTitle: function getServiceTitle(state) {
			return state.service.title ? state.service.title : '';
		},
		getServiceDescription: function getServiceDescription(state) {
			return state.service.description ? state.service.description : '';
		},
		getServiceCategory: function getServiceCategory(state) {
			return state.service.category ? state.service.category : {};
		},
		getServiceCategoryName: function getServiceCategoryName(state) {
			return state.service.category ? state.service.category.name : '';
		},
		getServiceRegion: function getServiceRegion(state) {
			return state.service.region ? state.service.region : {};
		},
		getServiceRegionName: function getServiceRegionName(state) {
			return state.service.region ? state.service.region.name : '';
		},
		getServiceCity: function getServiceCity(state) {
			return state.service.city ? state.service.city : {};
		},
		getServiceCityName: function getServiceCityName(state) {
			return state.service.city ? state.service.city.name : '';
		},
		getBids: function getBids(state) {
			return state.service.bids;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = service;

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);


var user = {
	state: {
		services: [],
		servicesFetched: false,
		bids: [],
		bidsFetched: false,
		projects: [],
		projectsFetched: false,
		projectFocus: null,
		subscriptions: [],
		subscriptionsFetched: false
	},
	mutations: {
		'SET_SERVICES': function SET_SERVICES(state, payload) {
			state.services = payload.services;
		},
		'SET_SERVICES_FETCHED': function SET_SERVICES_FETCHED(state, payload) {
			state.servicesFetched = payload.fetched;
		},
		'SET_BIDS': function SET_BIDS(state, payload) {
			state.bids = payload.bids;
		},
		'SET_BIDS_FETCHED': function SET_BIDS_FETCHED(state, payload) {
			state.bidsFetched = payload.fetched;
		},
		'SET_PROJECTS': function SET_PROJECTS(state, payload) {
			state.projects = payload.projects;
		},
		'SET_PROJECTS_FETCHED': function SET_PROJECTS_FETCHED(state, payload) {
			state.projectsFetched = payload.fetched;
		},
		'SET_PROJECT_FOCUS': function SET_PROJECT_FOCUS(state, payload) {
			state.projectFocus = payload.project;
		},
		'SET_SUBSCRIPTIONS': function SET_SUBSCRIPTIONS(state, payload) {
			state.subscriptions = payload.subscriptions;
		},
		'SET_SUBSCRIPTIONS_FETCHED': function SET_SUBSCRIPTIONS_FETCHED(state, payload) {
			state.subscriptionsFetched = payload.fetched;
		}
	},
	actions: {
		clearUserState: function clearUserState(_ref) {
			var commit = _ref.commit;

			commit('SET_SERVICES', { services: [] });
			commit('SET_SERVICES_FETCHED', { fetched: false });
			commit('SET_BIDS', { bids: [] });
			commit('SET_BIDS_FETCHED', { fetched: false });
			commit('SET_PROJECTS', { projects: [] });
			commit('SET_PROJECTS_FETCHED', { fetched: false });
			commit('SET_PROJECT_FOCUS', { project: null });
		},
		fetchUserServices: function fetchUserServices(_ref2) {
			var commit = _ref2.commit;

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('user/services').get().then(function (response) {
				commit('SET_SERVICES', { services: response.services });
				commit('SET_SERVICES_FETCHED', { fetched: true });
			});
		},
		fetchUserBids: function fetchUserBids(_ref3) {
			var commit = _ref3.commit;

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('user/bids').get().then(function (response) {
				commit('SET_BIDS', { bids: response.bids });
				commit('SET_BIDS_FETCHED', { fetched: true });
			});
		},
		fetchUserProjects: function fetchUserProjects(_ref4) {
			var commit = _ref4.commit,
			    rootState = _ref4.rootState;
			var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('user/{id}/projects').setId(rootState.auth.user.id).get().then(function (response) {
				commit('SET_PROJECTS', { projects: response.projects });
				commit('SET_PROJECTS_FETCHED', { fetched: true });
				// If we have passed in a focusId then set the project with that Id as focus.
				if (payload.focusId) {
					var focus = response.projects.find(function (project) {
						return project.id == payload.focusId;
					});
					commit('SET_PROJECT_FOCUS', { project: focus });
				}
			});
		},
		fetchUserSubscriptions: function fetchUserSubscriptions(_ref5) {
			var commit = _ref5.commit;

			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('subscriptions').get().then(function (response) {
				commit('SET_SUBSCRIPTIONS', { subscriptions: response.subscriptions });
				commit('SET_SUBSCRIPTIONS_FETCHED', { fetched: true });
			});
		}
	},
	getters: {
		userServices: function userServices(state) {
			return state.services;
		},
		userServicesFetched: function userServicesFetched(state) {
			return state.servicesFetched;
		},
		userBids: function userBids(state) {
			return state.bids;
		},
		userBidsFetched: function userBidsFetched(state) {
			return state.bidsFetched;
		},
		userProjects: function userProjects(state) {
			return state.projects;
		},
		userProjectsFetched: function userProjectsFetched(state) {
			return state.projectsFetched;
		},
		userProjectFocus: function userProjectFocus(state) {
			return state.projectFocus;
		},
		userSubscriptions: function userSubscriptions(state) {
			return state.subscriptions;
		},
		userSubscriptionsFetched: function userSubscriptionsFetched(state) {
			return state.subscriptionsFetched;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = user;

/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vuex__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_categories__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_regions__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_modal__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_auth__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_user__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_service__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_notifications__ = __webpack_require__(219);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex___default.a);

// Import modules








/* harmony default export */ __webpack_exports__["a"] = new __WEBPACK_IMPORTED_MODULE_1_vuex___default.a.Store({
	modules: {
		categories: __WEBPACK_IMPORTED_MODULE_2__modules_categories__["a" /* default */],
		regions: __WEBPACK_IMPORTED_MODULE_3__modules_regions__["a" /* default */],
		modal: __WEBPACK_IMPORTED_MODULE_4__modules_modal__["a" /* default */],
		auth: __WEBPACK_IMPORTED_MODULE_5__modules_auth__["a" /* default */],
		user: __WEBPACK_IMPORTED_MODULE_6__modules_user__["a" /* default */],
		service: __WEBPACK_IMPORTED_MODULE_7__modules_service__["a" /* default */],
		notifications: __WEBPACK_IMPORTED_MODULE_8__modules_notifications__["a" /* default */]
	}
});

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "\n.notifications-component[data-v-05633b28] {\n  padding: 16px;\n  border: 1px solid rgba(27, 31, 35, 0.15);\n  margin: -35px 0 35px 0;\n}\n.notifications-component.success[data-v-05633b28] {\n    background-color: #A6D785;\n    color: #444;\n}\n.notifications-component.success a[data-v-05633b28] {\n      color: #008B00;\n}\n.notifications-component .notification-area[data-v-05633b28] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.notifications-component .notification-area .notification-message[data-v-05633b28] {\n      -webkit-box-flex: 10;\n          -ms-flex: 10;\n              flex: 10;\n}\n.notifications-component .notification-area .close-notification[data-v-05633b28] {\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      text-align: right;\n}\n.notifications-component .notification-area .close-notification i[data-v-05633b28] {\n        cursor: pointer;\n}\n", ""]);

// exports


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "\n.finish-text[data-v-1de8cefe] {\n  font-size: 16px;\n}\n.timer-component[data-v-1de8cefe] {\n  font-size: 20px;\n  font-weight: bold;\n  margin: 5px 0;\n}\n.finish-date[data-v-1de8cefe] {\n  font-style: italic;\n  font-size: 13px;\n}\n", ""]);

// exports


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "\n.critical[data-v-2a250a49] {\n  color: #cc0000;\n}\n", ""]);

// exports


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "\n.pick_stars-component {\n  font-size: 18px;\n}\n.pick_stars-component i {\n    color: #FFC100;\n    cursor: pointer;\n}\n", ""]);

// exports


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "\n.message_board-component .alert {\n  padding: 40px 15px;\n  margin: 0;\n  border: 1px solid #d7d7d7;\n  border-bottom: none;\n}\n", ""]);

// exports


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "\n.change_project_details-component[data-v-4f3a1e5c] {\n  position: relative;\n}\n.change_project_details-component .close[data-v-4f3a1e5c] {\n    position: absolute;\n    top: -10px;\n    right: 0;\n}\nlabel[data-v-4f3a1e5c] {\n  margin-bottom: 2px;\n}\n.form-group[data-v-4f3a1e5c] {\n  margin-bottom: 5px;\n}\n.btn[data-v-4f3a1e5c] {\n  margin-bottom: 0;\n}\n", ""]);

// exports


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "\n.item-actions[data-v-5f7c3375] {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n", ""]);

// exports


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "\n.waiting[data-v-6398b14f] {\n  text-align: center;\n  margin: 40px 0;\n}\n", ""]);

// exports


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)();
// imports


// module
exports.push([module.i, "\n.ratings-component.large[data-v-b8890c0c] {\n  font-size: 18px;\n}\n.ratings-component i[data-v-b8890c0c] {\n  color: #FFC100;\n  margin: 0 1.5px;\n}\n", ""]);

// exports


/***/ }),
/* 233 */,
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(159),
  /* template */
  __webpack_require__(301),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c4676f0", Component.options)
  } else {
    hotAPI.reload("data-v-2c4676f0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(160),
  /* template */
  __webpack_require__(286),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Auth/Login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Login.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0ab6550a", Component.options)
  } else {
    hotAPI.reload("data-v-0ab6550a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(161),
  /* template */
  __webpack_require__(316),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Auth/Register.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Register.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56832f92", Component.options)
  } else {
    hotAPI.reload("data-v-56832f92", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(162),
  /* template */
  __webpack_require__(290),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Bids/CreateBid.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CreateBid.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0e265c70", Component.options)
  } else {
    hotAPI.reload("data-v-0e265c70", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(163),
  /* template */
  __webpack_require__(333),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Bids/ShowBids.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ShowBids.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f427bc18", Component.options)
  } else {
    hotAPI.reload("data-v-f427bc18", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(164),
  /* template */
  __webpack_require__(291),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Comments/AddComment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(165),
  /* template */
  __webpack_require__(288),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Comments/Comment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(166),
  /* template */
  __webpack_require__(321),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Hero.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Hero.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68b06d26", Component.options)
  } else {
    hotAPI.reload("data-v-68b06d26", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(168),
  /* template */
  __webpack_require__(322),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Loading.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Loading.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7cb305c0", Component.options)
  } else {
    hotAPI.reload("data-v-7cb305c0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(169),
  /* template */
  __webpack_require__(325),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Modal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Modal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-af65ec9e", Component.options)
  } else {
    hotAPI.reload("data-v-af65ec9e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(335)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(170),
  /* template */
  __webpack_require__(285),
  /* scopeId */
  "data-v-05633b28",
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Notifications.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Notifications.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05633b28", Component.options)
  } else {
    hotAPI.reload("data-v-05633b28", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(173),
  /* template */
  __webpack_require__(323),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/TagsInput.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TagsInput.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-82ec9b96", Component.options)
  } else {
    hotAPI.reload("data-v-82ec9b96", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(175),
  /* template */
  __webpack_require__(283),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Layout/DesktopHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DesktopHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-01c7636c", Component.options)
  } else {
    hotAPI.reload("data-v-01c7636c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(176),
  /* template */
  __webpack_require__(312),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Layout/Footer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Footer.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4e905588", Component.options)
  } else {
    hotAPI.reload("data-v-4e905588", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(177),
  /* template */
  __webpack_require__(297),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Layout/MobileHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MobileHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f060ffc", Component.options)
  } else {
    hotAPI.reload("data-v-1f060ffc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(178),
  /* template */
  __webpack_require__(328),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Messages/Message.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(339)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(179),
  /* template */
  __webpack_require__(308),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Messages/MessageBoard.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(180),
  /* template */
  __webpack_require__(284),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Messages/SendMessage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(181),
  /* template */
  __webpack_require__(298),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Reviews/LeaveReview.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(338)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(182),
  /* template */
  __webpack_require__(303),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Reviews/PickStars.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(183),
  /* template */
  __webpack_require__(327),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/Service.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Service.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b132dc68", Component.options)
  } else {
    hotAPI.reload("data-v-b132dc68", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(184),
  /* template */
  __webpack_require__(314),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/ServiceDescription.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(185),
  /* template */
  __webpack_require__(309),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/Services.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Services.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-491748d7", Component.options)
  } else {
    hotAPI.reload("data-v-491748d7", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(186),
  /* template */
  __webpack_require__(293),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Bids/BidHistory.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(187),
  /* template */
  __webpack_require__(334),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Bids/MyBids.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MyBids.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ffbea3c2", Component.options)
  } else {
    hotAPI.reload("data-v-ffbea3c2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  null,
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Notifications.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

module.exports = Component.exports


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  null,
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Payments.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

module.exports = Component.exports


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(188),
  /* template */
  __webpack_require__(315),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/Account.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(287),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/ChangePassword.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(191),
  /* template */
  __webpack_require__(306),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/ProfilePicture.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(340)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(192),
  /* template */
  __webpack_require__(313),
  /* scopeId */
  "data-v-4f3a1e5c",
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/ChangeProjectDetails.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(193),
  /* template */
  __webpack_require__(294),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/MyProjects.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(194),
  /* template */
  __webpack_require__(305),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/Project.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(195),
  /* template */
  __webpack_require__(311),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/ProjectAccept.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(196),
  /* template */
  __webpack_require__(304),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/ProjectCompleted.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(336)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(197),
  /* template */
  __webpack_require__(296),
  /* scopeId */
  "data-v-1de8cefe",
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/ProjectStarted.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(198),
  /* template */
  __webpack_require__(289),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Projects/ProjectTitle.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(199),
  /* template */
  __webpack_require__(318),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/CreateService.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CreateService.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5add2834", Component.options)
  } else {
    hotAPI.reload("data-v-5add2834", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(200),
  /* template */
  __webpack_require__(317),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/MyServices.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MyServices.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-57e11a9f", Component.options)
  } else {
    hotAPI.reload("data-v-57e11a9f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(201),
  /* template */
  __webpack_require__(330),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Subscriptions/AddSubscription.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AddSubscription.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cd1a1dae", Component.options)
  } else {
    hotAPI.reload("data-v-cd1a1dae", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(341)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(202),
  /* template */
  __webpack_require__(319),
  /* scopeId */
  "data-v-5f7c3375",
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Subscriptions/MySubscriptions.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MySubscriptions.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f7c3375", Component.options)
  } else {
    hotAPI.reload("data-v-5f7c3375", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(203),
  /* template */
  __webpack_require__(331),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/404.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] 404.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d489d274", Component.options)
  } else {
    hotAPI.reload("data-v-d489d274", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(204),
  /* template */
  __webpack_require__(295),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Categories.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Categories.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1b7c81c4", Component.options)
  } else {
    hotAPI.reload("data-v-1b7c81c4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(205),
  /* template */
  __webpack_require__(326),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-afdb283e", Component.options)
  } else {
    hotAPI.reload("data-v-afdb283e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(206),
  /* template */
  __webpack_require__(292),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Information.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Information.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16b10a9a", Component.options)
  } else {
    hotAPI.reload("data-v-16b10a9a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(207),
  /* template */
  __webpack_require__(307),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Locations.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Locations.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-436a7d68", Component.options)
  } else {
    hotAPI.reload("data-v-436a7d68", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(342)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(208),
  /* template */
  __webpack_require__(320),
  /* scopeId */
  "data-v-6398b14f",
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/ServiceDetails.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(209),
  /* template */
  __webpack_require__(310),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Services.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Services.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a52aae0", Component.options)
  } else {
    hotAPI.reload("data-v-4a52aae0", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(210),
  /* template */
  __webpack_require__(324),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/User.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "site-head"
  }, [_c('header', {
    staticClass: "desktop-header"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "hidden-xs hidden-sm col-md-3 col-lg-3 desktop-header-left"
  }, [_c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_c('img', {
    staticClass: "logo",
    attrs: {
      "src": "http://bidder.dev/logo_mock.png"
    }
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-6 col-lg-6 desktop-header-mid"
  }, [_c('app-search')], 1), _vm._v(" "), _c('div', {
    staticClass: "hidden-xs hidden-sm col-md-3 col-lg-3 desktop-header-right"
  }, [(_vm.$store.getters.isAuthenticated) ? _c('div', {
    staticClass: "auth-user",
    on: {
      "click": _vm.toggleDropdown
    }
  }, [_c('div', {
    staticClass: "auth-avatar",
    style: (_vm.avatar)
  }), _vm._v(" "), _c('div', {
    staticClass: "auth-name"
  }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s(_vm.$store.getters.authUser.username) + "\n\t\t\t\t\t\t\t"), _c('i', {
    staticClass: "fa fa-angle-down auth-arrow",
    class: {
      up: _vm.dropdown
    },
    attrs: {
      "aria-hidden": "true"
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.dropdown) ? _c('ul', {
    staticClass: "auth-dropdown"
  }, [_c('li', [_c('router-link', {
    attrs: {
      "to": "/user/profile"
    }
  }, [_c('i', {
    staticClass: "fa fa-user-circle",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("Profil")])], 1), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "/logout"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.logout($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-sign-out",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("Logga Ut\n\t\t\t\t\t\t\t")])])]) : _vm._e(), _vm._v(" "), (!_vm.$store.getters.isAuthenticated) ? _c('ul', {
    staticClass: "desktop-header-nav"
  }, [_c('li', [_c('a', {
    staticClass: "register",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'register'
        })
      }
    }
  }, [_vm._v("Registrera")])]), _vm._v(" "), _c('li', [_c('a', {
    staticClass: "login",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'login'
        })
      }
    }
  }, [_vm._v("Logga In")])])]) : _vm._e()])])])]), _vm._v(" "), _c('nav', {
    staticClass: "desktop-navigation"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('ul', {
    staticClass: "desktop-nav"
  }, [_c('li', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    attrs: {
      "to": "/categories"
    }
  }, [_c('i', {
    staticClass: "fa fa-list-ul",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Kategorier")])], 1), _vm._v(" "), _c('li', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    attrs: {
      "to": "/locations"
    }
  }, [_c('i', {
    staticClass: "fa fa-map-marker",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Platser")])], 1), _vm._v(" "), _c('li', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    attrs: {
      "to": "/services"
    }
  }, [_c('i', {
    staticClass: "fa fa-users",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Tjänster")])], 1), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('li', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    attrs: {
      "to": "/information"
    }
  }, [_c('i', {
    staticClass: "fa fa-question",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Information")])], 1)])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "nav-item"
  }, [_c('a', {
    attrs: {
      "href": "#"
    }
  }, [_c('i', {
    staticClass: "fa fa-globe",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Link")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-01c7636c", module.exports)
  }
}

/***/ }),
/* 284 */
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
      "value": _vm._s(_vm.message)
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
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "notifications-component",
    class: [_vm.$store.getters.notificationType]
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "notification-area"
  }, [_c('div', {
    staticClass: "notification-message"
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.$store.getters.notificationMessage) + "\n\t\t\t\t"), (_vm.$store.getters.notificationLink) ? [_vm._v("\n\t\t\t\t\t — \n\t\t\t\t\t"), _c('router-link', {
    attrs: {
      "to": _vm.$store.getters.notificationLink
    }
  }, [_vm._v(_vm._s(_vm.$store.getters.notificationLinkText))])] : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "close-notification"
  }, [_c('i', {
    staticClass: "fa fa-times",
    attrs: {
      "aria-hidden": "true"
    },
    on: {
      "click": function($event) {
        _vm.$store.dispatch('closeNotification')
      }
    }
  })])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-05633b28", module.exports)
  }
}

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-component"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [(_vm.alertMessage) ? _c('div', {
    staticClass: "alert",
    class: [_vm.alertType],
    domProps: {
      "textContent": _vm._s(_vm.alertMessage)
    }
  }) : _vm._e(), _vm._v(" "), _c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [(_vm.form.errors.has('invalid_login')) ? _c('div', {
    staticClass: "alert alert-danger",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.getValue('invalid_login'))
    }
  }) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('email')
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.email),
      expression: "form.email"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "email",
      "id": "email",
      "placeholder": "Email"
    },
    domProps: {
      "value": _vm._s(_vm.form.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.email = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('email')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('email'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('password')
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.password),
      expression: "form.password"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password",
      "id": "password",
      "placeholder": "Lösenord"
    },
    domProps: {
      "value": _vm._s(_vm.form.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.password = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('password')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('password'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "checkbox"
  }, [_c('label', [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.remember),
      expression: "form.remember"
    }],
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": Array.isArray(_vm.form.remember) ? _vm._i(_vm.form.remember, null) > -1 : (_vm.form.remember)
    },
    on: {
      "click": function($event) {
        var $$a = _vm.form.remember,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$c) {
            $$i < 0 && (_vm.form.remember = $$a.concat($$v))
          } else {
            $$i > -1 && (_vm.form.remember = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
          }
        } else {
          _vm.form.remember = $$c
        }
      }
    }
  }), _vm._v(" Kom ihåg mig\n\t\t\t\t")])]), _vm._v(" "), _c('div', {
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
        _vm.authenticate($event)
      }
    }
  }, [_vm._v("Logga In")])])])]), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_vm._v("\n\t\tHar du inte ett konto än? "), _c('a', {
    on: {
      "click": function($event) {
        _vm.$store.dispatch('openModal', {
          component: 'register'
        })
      }
    }
  }, [_vm._v("Registrera")])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal-header"
  }, [_c('h3', {
    staticClass: "text-center"
  }, [_vm._v("Logga In")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0ab6550a", module.exports)
  }
}

/***/ }),
/* 287 */
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
      "value": _vm._s(_vm.form.old)
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
      "value": _vm._s(_vm.form.new)
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
      "value": _vm._s(_vm.form.again)
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
/* 288 */
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
/* 289 */
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
      "value": _vm._s(_vm.newTitle)
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
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "create_bid-component"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [(_vm.$store.getters.isAuthenticated) ? [_c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('start')
    }
  }, [_c('datepicker', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.start),
      expression: "form.start"
    }],
    attrs: {
      "input-class": "form-control",
      "placeholder": "Starta utförandet*",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    domProps: {
      "value": (_vm.form.start)
    },
    on: {
      "input": function($event) {
        _vm.form.start = $event
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('start')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('start'))
    }
  }) : _vm._e()], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('end')
    }
  }, [_c('datepicker', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.end),
      expression: "form.end"
    }],
    attrs: {
      "input-class": "form-control",
      "placeholder": "Avsluta utförandet*",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    domProps: {
      "value": (_vm.form.end)
    },
    on: {
      "input": function($event) {
        _vm.form.end = $event
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('end')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('end'))
    }
  }) : _vm._e()], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('hours')
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.hours),
      expression: "form.hours"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "hours",
      "placeholder": "Antal timmar"
    },
    domProps: {
      "value": _vm._s(_vm.form.hours)
    },
    on: {
      "keypress": function($event) {
        _vm.isNumber($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.hours = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('hours')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('hours'))
    }
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('price')
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.price),
      expression: "form.price"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "price",
      "placeholder": "Ditt pris*"
    },
    domProps: {
      "value": _vm._s(_vm.form.price)
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
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('description')
    }
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.description),
      expression: "form.description"
    }],
    staticClass: "form-control",
    attrs: {
      "id": "description",
      "rows": "5",
      "placeholder": "Beskrivning av utförandet*"
    },
    domProps: {
      "value": _vm._s(_vm.form.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.description = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('description')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('description'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
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
        _vm.create($event)
      }
    }
  }, [_vm._v("Lägg ditt bud")])])])] : _c('div', {
    staticClass: "alert alert-warning text-center"
  }, [_vm._v("\n\t\t\tDu måste vara inloggad för att lägga ett bud. \n\t\t\t"), _c('a', {
    staticClass: "link",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'login'
        })
      }
    }
  }, [_vm._v("Logga In")]), _vm._v(" \n\t\t\teller "), _c('a', {
    staticClass: "link",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'register'
        })
      }
    }
  }, [_vm._v("Registrera")]), _vm._v(".\n\t\t")])], 2), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_c('a', {
    staticClass: "link",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.openShowBids($event)
      }
    }
  }, [_vm._v("Se alla bud för denna tjänsten")])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal-header"
  }, [_c('h3', {
    staticClass: "text-center"
  }, [_vm._v("Lägg ett bud")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0e265c70", module.exports)
  }
}

/***/ }),
/* 291 */
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
      "value": _vm._s(_vm.comment)
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
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "information-view"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('h2', [_vm._v("Information Page")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-16b10a9a", module.exports)
  }
}

/***/ }),
/* 293 */
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

/***/ }),
/* 294 */
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
    }), _vm._v(" Visa projekt\n\t\t\t\t\t")]), _vm._v(" "), _c('div', {
      staticClass: "status"
    }, [(project.completed) ? [_vm._v("\n\t\t\t\t\t\t\tAvslutad\n\t\t\t\t\t\t")] : [_vm._v("\n\t\t\t\t\t\t\tPågående\n\t\t\t\t\t\t")]], 2)])])
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

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "categories-view"
  }, [_c('app-hero', [_c('h1', {
    slot: "title"
  }, [_vm._v("Kategorier")]), _vm._v(" "), _c('p', {
    slot: "left"
  }, [_vm._v("\n\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.\n\t\t")]), _vm._v(" "), _c('img', {
    attrs: {
      "src": "mechanic.png",
      "alt": ""
    },
    slot: "right"
  })]), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content"
  }, [_c('app-items-block', {
    attrs: {
      "items": _vm.categories,
      "subItemsKey": "sub_categories",
      "link": "category/{slug}"
    }
  })], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1b7c81c4", module.exports)
  }
}

/***/ }),
/* 296 */
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
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "site-head"
  }, [_c('nav', {
    staticClass: "mobile-navigation"
  }, [_c('ul', {
    staticClass: "mobile-nav",
    on: {
      "click": _vm.hideMenu
    }
  }, [_c('li', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    attrs: {
      "to": "/categories"
    }
  }, [_c('i', {
    staticClass: "fa fa-list-ul",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Kategorier")])], 1), _vm._v(" "), _c('li', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    attrs: {
      "to": "/locations"
    }
  }, [_c('i', {
    staticClass: "fa fa-map-marker",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Platser")])], 1), _vm._v(" "), _c('li', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    attrs: {
      "to": "/services"
    }
  }, [_c('i', {
    staticClass: "fa fa-users",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Tjänster")])], 1), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('li', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    attrs: {
      "to": "/information"
    }
  }, [_c('i', {
    staticClass: "fa fa-question",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Information")])], 1), _vm._v(" "), _c('li', {
    staticClass: "spacer"
  }), _vm._v(" "), (_vm.$store.getters.isAuthenticated) ? _c('li', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    attrs: {
      "to": "/user/profile"
    }
  }, [_c('div', {
    staticClass: "auth-user"
  }, [_c('div', {
    staticClass: "auth-avatar",
    style: (_vm.avatar)
  }), _vm._v(" "), _c('div', {
    staticClass: "auth-name"
  }, [_vm._v(_vm._s(_vm.$store.getters.authUser.username))])])])], 1) : [_c('li', {
    staticClass: "nav-item"
  }, [_c('a', {
    staticClass: "register",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'register'
        })
      }
    }
  }, [_vm._v("Registrera")])]), _vm._v(" "), _c('li', {
    staticClass: "nav-item"
  }, [_c('a', {
    staticClass: "login",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'login'
        })
      }
    }
  }, [_vm._v("Logga In")])])]], 2)]), _vm._v(" "), _c('div', {
    staticClass: "mobile-nav-header"
  }, [_c('a', {
    attrs: {
      "id": "mobile-nav-toggle",
      "href": ""
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.navToggle($event)
      }
    }
  }, [_c('span')])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "nav-item"
  }, [_c('a', {
    attrs: {
      "href": "#"
    }
  }, [_c('i', {
    staticClass: "fa fa-globe",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" Link")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1f060ffc", module.exports)
  }
}

/***/ }),
/* 298 */
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
      "value": _vm._s(_vm.review)
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
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.items.length > 0) ? _c('div', {
    staticClass: "items-block"
  }, [_c('div', {
    staticClass: "root-container"
  }, [_c('nav', {
    staticClass: "root-nav"
  }, [_vm._l((_vm.items), function(item, index) {
    return [_c('div', {
      staticClass: "nav-head",
      class: {
        active: index == _vm.active
      },
      on: {
        "click": function($event) {
          _vm.changeActive(index)
        }
      }
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(item.name) + "\n\t\t\t\t")]), _vm._v(" "), (_vm.breakpoints.mobile && (index == _vm.active)) ? _c('div', {
      staticClass: "sub-container"
    }, [_c('router-link', {
      staticClass: "btn btn-primary",
      attrs: {
        "to": _vm.generateLink(_vm.activeItem, true)
      }
    }, [_vm._v("Visa Alla")]), _vm._v(" "), _c('ul', {
      staticClass: "sub-nav list-unstyled"
    }, _vm._l((_vm.subCats), function(subItem) {
      return _c('li', [_c('router-link', {
        attrs: {
          "to": _vm.generateLink(subItem)
        }
      }, [_c('span', [_vm._v("»")]), _vm._v(_vm._s(subItem.name))])], 1)
    }))], 1) : _vm._e()]
  })], 2)]), _vm._v(" "), (!_vm.breakpoints.mobile) ? _c('div', {
    staticClass: "sub-container"
  }, [_c('h1', [_vm._v(_vm._s(_vm.activeItem.name))]), _vm._v(" "), _c('router-link', {
    staticClass: "btn btn-primary",
    attrs: {
      "to": _vm.generateLink(_vm.activeItem, true)
    }
  }, [_vm._v("Visa Alla")]), _vm._v(" "), _c('ul', {
    staticClass: "sub-nav list-unstyled"
  }, _vm._l((_vm.subCats), function(subItem) {
    return _c('li', [_c('router-link', {
      attrs: {
        "to": _vm.generateLink(subItem)
      }
    }, [_c('span', [_vm._v("»")]), _vm._v(_vm._s(subItem.name))])], 1)
  }))], 1) : _vm._e()]) : _vm._e()
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-26b6d159", module.exports)
  }
}

/***/ }),
/* 300 */
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
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "site"
    }
  }, [(_vm.breakpoints.mobile) ? _c('app-mobile-header') : _c('app-desktop-header'), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide-down-up"
    }
  }, [(_vm.$store.getters.modalOpen) ? _c('app-modal') : _vm._e()], 1), _vm._v(" "), _c('div', {
    attrs: {
      "id": "site-wrap"
    }
  }, [(_vm.breakpoints.mobile) ? _c('div', {
    staticClass: "overlay",
    on: {
      "click": _vm.hideMobileNav
    }
  }) : _vm._e(), _vm._v(" "), (_vm.breakpoints.mobile) ? _c('div', {
    staticClass: "mobile-search-header"
  }, [_c('app-search')], 1) : _vm._e(), _vm._v(" "), _c('router-view'), _vm._v(" "), _c('app-footer')], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c4676f0", module.exports)
  }
}

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "profile-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Min Profil")]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-7"
  }, [_c('app-account')], 1), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-5"
  }, [_c('app-profile-picture')], 1)]), _vm._v(" "), _c('h2', {
    staticClass: "user-component-title subsection"
  }, [_vm._v("Uppdatera ditt lösenord")]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-7"
  }, [_c('app-change-password')], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d33af27", module.exports)
  }
}

/***/ }),
/* 303 */
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
/* 304 */
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
/* 305 */
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

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "profile_picture-component"
  }, [_vm._v("\n\tProfile Picture\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c54c5f2", module.exports)
  }
}

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "regions-view"
  }, [_c('app-hero', [_c('h1', {
    slot: "title"
  }, [_vm._v("Platser")]), _vm._v(" "), _c('p', {
    slot: "left"
  }, [_vm._v("\n\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.\n\t\t")]), _vm._v(" "), _c('img', {
    attrs: {
      "src": "mechanic.png",
      "alt": ""
    },
    slot: "right"
  })]), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content"
  }, [_c('app-items-block', {
    attrs: {
      "items": _vm.regions,
      "subItemsKey": "cities",
      "link": "city/{slug}",
      "allLink": "region/{slug}"
    }
  })], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-436a7d68", module.exports)
  }
}

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "message_board-component"
  }, [(_vm.fetched) ? [_vm._m(0), _vm._v(" "), (_vm.messages.length > 0) ? _vm._l((_vm.messages), function(message) {
    return _c('message', {
      key: message.id,
      attrs: {
        "message": message
      }
    })
  }) : _c('div', {
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
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "services-component"
  }, [_c('div', {
    staticClass: "service-filter-container"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-4 column"
  }, [_c('label', [_vm._v("Fritext")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.filterText),
      expression: "filterText"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "filter_text"
    },
    domProps: {
      "value": _vm._s(_vm.filterText)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.filterText = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4 column"
  }, [_c('label', [_vm._v("Kategorier")]), _vm._v(" "), _c('app-tags-input', {
    attrs: {
      "items": _vm.categories,
      "options": _vm.allCategories
    },
    on: {
      "add": _vm.categoryAdd,
      "remove": _vm.categoryRemove
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4 column"
  }, [_c('label', [_vm._v("Platser")]), _vm._v(" "), _c('app-tags-input', {
    attrs: {
      "items": _vm.locations,
      "options": _vm.allLocations
    },
    on: {
      "add": _vm.locationAdd,
      "remove": _vm.locationRemove
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('button', {
    staticClass: "btn btn-primary full-width",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.getServices(false)
      }
    }
  }, [_vm._v("Hitta Tjänster")])])])]), _vm._v(" "), _c('div', {
    staticClass: "services margin-25"
  }, [(_vm.fetched) ? _c('div', {
    staticClass: "row"
  }, [_c('transition-group', {
    attrs: {
      "name": "slide-out",
      "mode": "out-in"
    }
  }, _vm._l((_vm.services), function(service) {
    return _c('div', {
      key: service.id,
      staticClass: "col-xs-12 col-sm-6"
    }, [_c('router-link', {
      staticClass: "no-underline",
      attrs: {
        "to": {
          name: 'serviceDetails',
          params: {
            id: service.id
          }
        }
      }
    }, [_c('app-service', {
      attrs: {
        "service": service
      },
      on: {
        "bidStop": _vm.removeService
      }
    })], 1)], 1)
  }))], 1) : _c('app-loading', {
    attrs: {
      "bg": "gray"
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-491748d7", module.exports)
  }
}

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "services-view"
  }, [_c('app-hero', [_c('h1', {
    slot: "title"
  }, [_vm._v("Tjänster")]), _vm._v(" "), _c('p', {
    slot: "left"
  }, [_vm._v("\n\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.\n\t\t")]), _vm._v(" "), _c('img', {
    attrs: {
      "src": "mechanic.png",
      "alt": ""
    },
    slot: "right"
  })]), _vm._v(" "), _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content"
  }, [_c('app-services')], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4a52aae0", module.exports)
  }
}

/***/ }),
/* 311 */
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
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c("div")
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4e905588", module.exports)
  }
}

/***/ }),
/* 313 */
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
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.finish),
      expression: "form.finish"
    }],
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    domProps: {
      "value": (_vm.form.finish)
    },
    on: {
      "input": function($event) {
        _vm.form.finish = $event
      }
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
      "value": _vm._s(_vm.form.price)
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
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "service_description-component"
  }, [_c('div', {
    staticClass: "title",
    domProps: {
      "textContent": _vm._s(_vm.title)
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
      "textContent": _vm._s(_vm.description)
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
/* 315 */
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
      "value": _vm._s(_vm.form.name)
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
      "value": _vm._s(_vm.form.username)
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
      "value": _vm._s(_vm.form.bio)
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
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "register-component"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
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
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.name),
      expression: "form.name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "id": "name",
      "placeholder": "Namn"
    },
    domProps: {
      "value": _vm._s(_vm.form.name)
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
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('email')
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.email),
      expression: "form.email"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "email",
      "id": "email",
      "placeholder": "Email"
    },
    domProps: {
      "value": _vm._s(_vm.form.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.email = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('email')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('email'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('password')
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.password),
      expression: "form.password"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password",
      "id": "password",
      "placeholder": "Lösenord"
    },
    domProps: {
      "value": _vm._s(_vm.form.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.password = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('password')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('password'))
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
        _vm.register($event)
      }
    }
  }, [_vm._v("Registrera")])])])]), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_vm._v("\n\t\tÄr du redan registrad? "), _c('a', {
    on: {
      "click": function($event) {
        _vm.$store.dispatch('openModal', {
          component: 'login'
        })
      }
    }
  }, [_vm._v("Logga In")])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal-header"
  }, [_c('h3', {
    staticClass: "text-center"
  }, [_vm._v("Registrera. Det är helt gratis")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-56832f92", module.exports)
  }
}

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_services-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Mina Tjänster")]), _vm._v(" "), (_vm.fetched) ? _c('ul', {
    staticClass: "user-items-list"
  }, _vm._l((_vm.services), function(service) {
    return _c('li', [_c('div', {
      staticClass: "item-content"
    }, [_vm._v("\n\t\t\t\t" + _vm._s(service.title) + "\n\t\t\t\t"), (service.active) ? _c('span', {
      staticClass: "item-link"
    }, [_vm._v("\n\t\t\t\t\t — "), _c('router-link', {
      attrs: {
        "to": ("/services/" + (service.id))
      }
    }, [_vm._v("visa tjänst")])], 1) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "item-actions"
    }, [_c('router-link', {
      staticClass: "btn-flat btn-default show-bids",
      attrs: {
        "to": ("/user/service/" + (service.id) + "/bids")
      }
    }, [_c('i', {
      staticClass: "fa fa-gavel",
      attrs: {
        "aria-hidden": "true",
        "title": "Visa bud"
      }
    }), _vm._v(" Visa bud\n\t\t\t\t")]), _vm._v(" "), _c('router-link', {
      staticClass: "btn-flat btn-default edit",
      attrs: {
        "to": ("/user/service/" + (service.id) + "/edit")
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil",
      attrs: {
        "aria-hidden": "true",
        "title": "Redigera"
      }
    }), _vm._v(" Redigera\n\t\t\t\t")])], 1)])
  })) : _c('app-loading')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-57e11a9f", module.exports)
  }
}

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "create_service-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Skapa Tjänst")]), _vm._v(" "), _c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('title')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Titel")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.title),
      expression: "form.title"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm._s(_vm.form.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.title = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('title')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('title'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('category')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Huvudkategori")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.rootCategory),
      expression: "form.rootCategory"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        _vm.form.rootCategory = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj huvudkategori")]), _vm._v(" "), _vm._l((_vm.categories), function(category) {
    return _c('option', {
      domProps: {
        "value": category,
        "textContent": _vm._s(category.name)
      }
    })
  })], 2), _vm._v(" "), (_vm.form.errors.has('category')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('category'))
    }
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('category')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Kategori")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.category),
      expression: "form.category"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": !_vm.form.rootCategory
    },
    on: {
      "change": function($event) {
        _vm.form.category = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj kategori")]), _vm._v(" "), _vm._l((_vm.form.rootCategory.sub_categories), function(sub) {
    return _c('option', {
      domProps: {
        "value": sub.id,
        "textContent": _vm._s(sub.name)
      }
    })
  })], 2), _vm._v(" "), (_vm.form.errors.has('category')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('category'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('region')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Region")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.region),
      expression: "form.region"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        _vm.form.region = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj region")]), _vm._v(" "), _vm._l((_vm.regions), function(region) {
    return _c('option', {
      domProps: {
        "value": region,
        "textContent": _vm._s(region.name)
      }
    })
  })], 2), _vm._v(" "), (_vm.form.errors.has('region')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('region'))
    }
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('city')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Stad")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.city),
      expression: "form.city"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": !_vm.form.region
    },
    on: {
      "change": function($event) {
        _vm.form.city = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj stad")]), _vm._v(" "), _vm._l((_vm.form.region.cities), function(city) {
    return _c('option', {
      domProps: {
        "value": city.id,
        "textContent": _vm._s(city.name)
      }
    })
  })], 2), _vm._v(" "), (_vm.form.errors.has('city')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('city'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('start')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Påbörja utförandet")]), _vm._v(" "), _c('datepicker', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.start),
      expression: "form.start"
    }],
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    domProps: {
      "value": (_vm.form.start)
    },
    on: {
      "input": function($event) {
        _vm.form.start = $event
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('start')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('start'))
    }
  }) : _vm._e(), _vm._v(" "), _c('small', [_vm._v("När vill du att tjänsten ska påbörjas?")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('end')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Avsluta utförandet")]), _vm._v(" "), _c('datepicker', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.end),
      expression: "form.end"
    }],
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    domProps: {
      "value": (_vm.form.end)
    },
    on: {
      "input": function($event) {
        _vm.form.end = $event
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('end')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('end'))
    }
  }) : _vm._e(), _vm._v(" "), _c('small', [_vm._v("När vill du att tjänsten ska avslutas?")])], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('bidding')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Budgivning")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model.number",
      value: (_vm.form.bidding),
      expression: "form.bidding",
      modifiers: {
        "number": true
      }
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        _vm.form.bidding = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return _vm._n(val)
        })[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj antal dagar för budgivning")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "7"
    }
  }, [_vm._v("7")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "14"
    }
  }, [_vm._v("14")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "30"
    }
  }, [_vm._v("30")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "60"
    }
  }, [_vm._v("60")])]), _vm._v(" "), (_vm.form.errors.has('bidding')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('bidding'))
    }
  }) : _vm._e(), _vm._v(" "), _c('small', [_vm._v("Hur många dagar ska budgivningen pågå?")])])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('description')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Beskrivning")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.description),
      expression: "form.description"
    }],
    staticClass: "form-control",
    attrs: {
      "rows": "10"
    },
    domProps: {
      "value": _vm._s(_vm.form.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.description = $event.target.value
      }
    }
  }), _vm._v(" "), (_vm.form.errors.has('description')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('description'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('button', {
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
        _vm.create($event)
      }
    }
  }, [_vm._v("Skapa din tjänst")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5add2834", module.exports)
  }
}

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_subscriptions-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Prenumerationer")]), _vm._v(" "), _c('app-add-subscription'), _vm._v(" "), (_vm.fetched) ? [(_vm.subscriptions.length > 0) ? _c('ul', {
    staticClass: "user-items-list"
  }, _vm._l((_vm.subscriptions), function(subscription) {
    return _c('li', [_c('div', {
      staticClass: "item-content"
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.title(subscription)) + "\n\t\t\t\t")]), _vm._v(" "), _c('div', {
      staticClass: "item-actions"
    }, [_c('button', {
      staticClass: "btn btn-default",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.remove(subscription.id)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-times",
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v(" Ta bort\n\t\t\t\t\t")])])])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("Du har ännu inga prenumerationer. Skapa din första ovan.")])] : _c('app-loading')], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5f7c3375", module.exports)
  }
}

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "service-details-view no-hero-view"
  }, [_c('div', {
    staticClass: "container"
  }, [(!_vm.$store.getters.getServiceLoaded) ? _c('div', {
    staticClass: "waiting"
  }, [_vm._m(0)]) : [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-8"
  }, [(!_vm.breakpoints.small) ? _c('div', {
    staticClass: "service-description white-container"
  }, [_c('app-service-description')], 1) : _vm._e()]), _vm._v(" "), _c('div', {
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
  }, [_c('app-service-description')], 1) : _vm._e(), _vm._v(" "), _c('div', {
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
      "rating": 3.7,
      "total": 7,
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
    }), _vm._v(" "), (comment.replies.length > 0) ? _c('ul', {
      staticClass: "comment-replies"
    }, [_c('transition-group', {
      attrs: {
        "name": "slide-in-left"
      }
    }, _vm._l((comment.replies), function(reply) {
      return _c('li', {
        key: reply.id
      }, [_c('app-comment', {
        attrs: {
          "comment": reply
        }
      })], 1)
    }))], 1) : _vm._e()], 1)
  }))], 1)])], 1)])]], 2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "processing"
  }, [_c('i', {
    staticClass: "fa fa-spinner fa-pulse fa-fw fa-4x"
  }), _vm._v(" "), _c('span', {
    staticClass: "sr-only"
  }, [_vm._v("Loading...")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6398b14f", module.exports)
  }
}

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hero"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "hero-container"
  }, [_c('div', {
    staticClass: "hero-left"
  }, [_c('transition', {
    attrs: {
      "name": "fade-in",
      "appear": ""
    }
  }, [_vm._t("title")], 2), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "fade-in-slow",
      "appear": ""
    }
  }, [_vm._t("left")], 2)], 1), _vm._v(" "), _c('div', {
    staticClass: "hidden-xs hero-right"
  }, [_c('transition', {
    attrs: {
      "name": "slide-in",
      "mode": "out-in",
      "appear": ""
    }
  }, [_c('div', {
    staticClass: "hero-right"
  }, [_vm._t("right")], 2)])], 1)])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-68b06d26", module.exports)
  }
}

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "loading-component text-center"
  }, [(_vm.bg === 'white') ? [_c('svg', {
    staticClass: "uil-facebook",
    attrs: {
      "width": "78px",
      "height": "78px",
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 100 100",
      "preserveAspectRatio": "xMidYMid"
    }
  }, [_c('rect', {
    staticClass: "bk",
    attrs: {
      "x": "0",
      "y": "0",
      "width": "100",
      "height": "100",
      "fill": "#ffffff"
    }
  }), _c('g', {
    attrs: {
      "transform": "translate(20 50)"
    }
  }, [_c('rect', {
    attrs: {
      "x": "-10",
      "y": "-30",
      "width": "20",
      "height": "60",
      "fill": "#55ae3a",
      "opacity": "0.6"
    }
  }, [_c('animateTransform', {
    attrs: {
      "attributeName": "transform",
      "type": "scale",
      "from": "2",
      "to": "1",
      "begin": "0s",
      "repeatCount": "indefinite",
      "dur": "1s",
      "calcMode": "spline",
      "keySplines": "0.1 0.9 0.4 1",
      "keyTimes": "0;1",
      "values": "2;1"
    }
  })], 1)]), _c('g', {
    attrs: {
      "transform": "translate(50 50)"
    }
  }, [_c('rect', {
    attrs: {
      "x": "-10",
      "y": "-30",
      "width": "20",
      "height": "60",
      "fill": "#55ae3a",
      "opacity": "0.8"
    }
  }, [_c('animateTransform', {
    attrs: {
      "attributeName": "transform",
      "type": "scale",
      "from": "2",
      "to": "1",
      "begin": "0.1s",
      "repeatCount": "indefinite",
      "dur": "1s",
      "calcMode": "spline",
      "keySplines": "0.1 0.9 0.4 1",
      "keyTimes": "0;1",
      "values": "2;1"
    }
  })], 1)]), _c('g', {
    attrs: {
      "transform": "translate(80 50)"
    }
  }, [_c('rect', {
    attrs: {
      "x": "-10",
      "y": "-30",
      "width": "20",
      "height": "60",
      "fill": "#55ae3a",
      "opacity": "0.9"
    }
  }, [_c('animateTransform', {
    attrs: {
      "attributeName": "transform",
      "type": "scale",
      "from": "2",
      "to": "1",
      "begin": "0.2s",
      "repeatCount": "indefinite",
      "dur": "1s",
      "calcMode": "spline",
      "keySplines": "0.1 0.9 0.4 1",
      "keyTimes": "0;1",
      "values": "2;1"
    }
  })], 1)])])] : _vm._e(), _vm._v(" "), (_vm.bg === 'gray') ? [_c('svg', {
    staticClass: "uil-facebook",
    attrs: {
      "width": "78px",
      "height": "78px",
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 100 100",
      "preserveAspectRatio": "xMidYMid"
    }
  }, [_c('rect', {
    staticClass: "bk",
    attrs: {
      "x": "0",
      "y": "0",
      "width": "100",
      "height": "100",
      "fill": "#f6f6f6"
    }
  }), _c('g', {
    attrs: {
      "transform": "translate(20 50)"
    }
  }, [_c('rect', {
    attrs: {
      "x": "-10",
      "y": "-30",
      "width": "20",
      "height": "60",
      "fill": "#55ae3a",
      "opacity": "0.6"
    }
  }, [_c('animateTransform', {
    attrs: {
      "attributeName": "transform",
      "type": "scale",
      "from": "2",
      "to": "1",
      "begin": "0s",
      "repeatCount": "indefinite",
      "dur": "1s",
      "calcMode": "spline",
      "keySplines": "0.1 0.9 0.4 1",
      "keyTimes": "0;1",
      "values": "2;1"
    }
  })], 1)]), _c('g', {
    attrs: {
      "transform": "translate(50 50)"
    }
  }, [_c('rect', {
    attrs: {
      "x": "-10",
      "y": "-30",
      "width": "20",
      "height": "60",
      "fill": "#55ae3a",
      "opacity": "0.8"
    }
  }, [_c('animateTransform', {
    attrs: {
      "attributeName": "transform",
      "type": "scale",
      "from": "2",
      "to": "1",
      "begin": "0.1s",
      "repeatCount": "indefinite",
      "dur": "1s",
      "calcMode": "spline",
      "keySplines": "0.1 0.9 0.4 1",
      "keyTimes": "0;1",
      "values": "2;1"
    }
  })], 1)]), _c('g', {
    attrs: {
      "transform": "translate(80 50)"
    }
  }, [_c('rect', {
    attrs: {
      "x": "-10",
      "y": "-30",
      "width": "20",
      "height": "60",
      "fill": "#55ae3a",
      "opacity": "0.9"
    }
  }, [_c('animateTransform', {
    attrs: {
      "attributeName": "transform",
      "type": "scale",
      "from": "2",
      "to": "1",
      "begin": "0.2s",
      "repeatCount": "indefinite",
      "dur": "1s",
      "calcMode": "spline",
      "keySplines": "0.1 0.9 0.4 1",
      "keyTimes": "0;1",
      "values": "2;1"
    }
  })], 1)])])] : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7cb305c0", module.exports)
  }
}

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tags-input-container"
  }, [(_vm.error) ? _c('div', {
    staticClass: "tooltip-error"
  }, [_vm._v("Ej giltigt val")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "tags-input",
    class: {
      hasError: _vm.error
    },
    on: {
      "click": function($event) {
        _vm.$refs.input.focus()
      }
    }
  }, [_vm._l((_vm.items), function(item, index) {
    return _c('div', {
      staticClass: "tag"
    }, [_vm._v("\n\t\t\t" + _vm._s(item.text)), _c('i', {
      staticClass: "fa fa-times",
      attrs: {
        "aria-hidden": "true"
      },
      on: {
        "click": function($event) {
          _vm.$emit('remove', {
            item: item,
            index: index
          })
        }
      }
    })])
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.input),
      expression: "input",
      modifiers: {
        "trim": true
      }
    }],
    ref: "input",
    style: (_vm.inputWidth),
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm._s(_vm.input)
    },
    on: {
      "keydown": [function($event) {
        _vm.error = false
      }, function($event) {
        if (_vm._k($event.keyCode, "enter", 13)) { return; }
        _vm.addItem(_vm.input)
      }],
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.input = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })], 2), _vm._v(" "), (_vm.matched.length > 0) ? _c('div', {
    staticClass: "tags-help"
  }, [_c('ul', {
    staticClass: "list-unstyled"
  }, _vm._l((_vm.matched), function(match) {
    return _c('li', {
      on: {
        "click": function($event) {
          _vm.addItem(match.name)
        }
      }
    }, [_vm._v("\n\t\t\t\t" + _vm._s(match.name) + "\n\t\t\t")])
  }))]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-82ec9b96", module.exports)
  }
}

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-component no-hero-view"
  }, [(_vm.$store.getters.showingNotification) ? _c('app-notifications') : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "container"
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
  }, [_vm._v("\n\t\t\t\t\tLogga Ut "), _c('i', {
    staticClass: "fa fa-sign-out",
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
  }, [_vm._v("\n\t\t\t\t\tMeny "), _c('i', {
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
      "to": "/user/payments"
    }
  }, [_vm._v("Betalningar")])], 1)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "user-ui-content"
  }, [_c('router-view')], 1)])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-95a9e666", module.exports)
  }
}

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal-mask"
  }, [_c('div', {
    staticClass: "modal-container",
    class: [_vm.$store.getters.modalSize]
  }, [_c('span', {
    staticClass: "close",
    on: {
      "click": function($event) {
        _vm.$store.dispatch('closeModal')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-times fa-lg",
    attrs: {
      "aria-hidden": "true"
    }
  })]), _vm._v(" "), _c(_vm.$store.getters.modalComponent, {
    tag: "component"
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-af65ec9e", module.exports)
  }
}

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home-view"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('h2', [_vm._v("Home Page")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-primary processing"
  }, [_vm._v("Skapa bud")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-afdb283e", module.exports)
  }
}

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "service-container"
  }, [_c('div', {
    staticClass: "service-img"
  }), _vm._v(" "), _c('div', {
    staticClass: "service-content"
  }, [_c('div', {
    staticClass: "service-title"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.service.title) + "\n\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "service-bottom"
  }, [_c('ul', {
    staticClass: "list-unstyled bottom-info"
  }, [_c('li', {
    staticClass: "category"
  }, [_c('i', {
    staticClass: "fa fa-list-ul",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.service.category.name) + "\n\t\t\t\t")]), _vm._v(" "), _c('li', {
    staticClass: "location"
  }, [_c('i', {
    staticClass: "fa fa-map-marker",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.service.city.name) + ", " + _vm._s(_vm.service.region.name) + "\n\t\t\t\t")])]), _vm._v(" "), _c('ul', {
    staticClass: "list-unstyled bottom-meta"
  }, [_c('li', {
    staticClass: "bid"
  }, [_c('i', {
    staticClass: "fa fa-gavel",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.service.bids.length) + " bud\n\t\t\t\t")]), _vm._v(" "), _c('li', {
    staticClass: "comments"
  }, [_c('i', {
    staticClass: "fa fa-commenting",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.service.comments.length) + "\n\t\t\t\t")]), _vm._v(" "), _c('li', {
    staticClass: "time"
  }, [_c('app-timer', {
    attrs: {
      "ends": _vm.service.bid_stop
    },
    on: {
      "ended": _vm.bidStop
    }
  })], 1)])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b132dc68", module.exports)
  }
}

/***/ }),
/* 328 */
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
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "ratings-component",
    class: [_vm.size]
  }, [_vm._l((_vm.fullStars), function(n) {
    return _c('i', {
      staticClass: "fa fa-star",
      attrs: {
        "aria-hidden": "true"
      }
    })
  }), (_vm.halfStar) ? _c('i', {
    staticClass: "fa fa-star-half-o",
    attrs: {
      "aria-hidden": "true"
    }
  }) : _vm._e(), _vm._l((_vm.emptyStars), function(n) {
    return _c('i', {
      staticClass: "fa fa-star-o",
      attrs: {
        "aria-hidden": "true"
      }
    })
  }), _vm._v("\n (" + _vm._s(_vm.total) + ")\n")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b8890c0c", module.exports)
  }
}

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "add_subscription-component mb40"
  }, [_c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("För kategori:")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.category_id),
      expression: "form.category_id"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        _vm.form.category_id = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj kategori")]), _vm._v(" "), _vm._l((_vm.categories), function(category) {
    return _c('option', {
      domProps: {
        "value": category.id,
        "textContent": _vm._s(category.name)
      }
    })
  })], 2), _vm._v(" "), (_vm.form.errors.has('category_id')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('category_id'))
    }
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("För region:")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.region_id),
      expression: "form.region_id"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": _vm.regionDisabled
    },
    on: {
      "change": function($event) {
        _vm.form.region_id = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj region")]), _vm._v(" "), _vm._l((_vm.regions), function(region) {
    return _c('option', {
      domProps: {
        "value": region.id,
        "textContent": _vm._s(region.name)
      }
    })
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Eller för stad:")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.city_id),
      expression: "form.city_id"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": _vm.citiesDisabled
    },
    on: {
      "change": function($event) {
        _vm.form.city_id = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj stad")]), _vm._v(" "), _vm._l((_vm.cities), function(city) {
    return _c('option', {
      domProps: {
        "value": city.id,
        "textContent": _vm._s(city.name)
      }
    })
  })], 2)])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('button', {
    staticClass: "btn btn-primary full-width",
    class: {
      'processing': _vm.processing
    },
    attrs: {
      "type": "button",
      "disabled": _vm.processing || !_vm.form.category_id
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.add($event)
      }
    }
  }, [_vm._v("\n\t\t\t\t\tLägg till prenumeration\n\t\t\t\t")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cd1a1dae", module.exports)
  }
}

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "404-view"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('h2', {
    staticClass: "text-center"
  }, [_vm._v("The page does not exists")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d489d274", module.exports)
  }
}

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "nav-search-form"
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-search"
  }), _vm._v(" "), _c('span', {
    staticClass: "search-input"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "",
      "placeholder": "VAD LETAR DU EFTER?"
    }
  })]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-search",
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("Sök")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e0883258", module.exports)
  }
}

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "show_bids-component"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [(_vm.bids.length > 0) ? _c('ul', {
    staticClass: "list-unstyled list-bids"
  }, _vm._l((_vm.bids), function(bid) {
    return _c('li', [_c('div', {
      staticClass: "bid-header"
    }, [_c('div', {
      staticClass: "row"
    }, [_c('div', {
      staticClass: "col-xs-12 col-sm-6 col-md-7"
    }, [_c('div', {
      staticClass: "bid-user"
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
      staticClass: "col-xs-12 col-sm-6 col-md-5"
    }, [_c('div', {
      staticClass: "bid-time",
      domProps: {
        "textContent": _vm._s(_vm.time(bid.created_at))
      }
    })])])]), _vm._v(" "), _c('div', {
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
  }, [_vm._v("\n\t\t\tDenna tjänsten har ännu inga lagda bud. Vill du bli den första? \n\t\t\t"), _c('a', {
    staticClass: "link",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.openCreateBid($event)
      }
    }
  }, [_vm._v("Lägg ett bud nu")])])]), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_c('a', {
    staticClass: "link",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.openCreateBid($event)
      }
    }
  }, [_vm._v("Lägg ett bud för denna tjänsten")])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal-header"
  }, [_c('h3', {
    staticClass: "text-center"
  }, [_vm._v("Visar budhistorik")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f427bc18", module.exports)
  }
}

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_bids-component"
  }, [_c('h1', {
    staticClass: "user-component-title"
  }, [_vm._v("Mina Bud")]), _vm._v(" "), (_vm.fetched) ? [(_vm.bids.length > 0) ? _c('ul', {
    staticClass: "user-items-list"
  }, _vm._l((_vm.bids), function(bid) {
    return _c('li', [_c('span', {
      staticClass: "item-content"
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(bid.description) + "\n\t\t\t\t")]), _vm._v(" "), _c('span', {
      staticClass: "item-actions"
    })])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("\n\t\t\tDu har ännu inte lagt några bud.\n\t\t")])] : _c('app-loading')], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ffbea3c2", module.exports)
  }
}

/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(224);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("a3f91a02", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-05633b28&scoped=true!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Notifications.vue", function() {
     var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-05633b28&scoped=true!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Notifications.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(225);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("4d72ebfe", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1de8cefe&scoped=true!./../../../../../../node_modules/sass-loader/index.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProjectStarted.vue", function() {
     var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-1de8cefe&scoped=true!./../../../../../../node_modules/sass-loader/index.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProjectStarted.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(226);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("157e1811", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2a250a49&scoped=true!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Timer.vue", function() {
     var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2a250a49&scoped=true!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Timer.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(227);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("2f0c9dbf", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2da456f4!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PickStars.vue", function() {
     var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2da456f4!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./PickStars.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(228);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("69cad5c8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4550cb6a!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MessageBoard.vue", function() {
     var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4550cb6a!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MessageBoard.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(229);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("2a5a9dcb", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4f3a1e5c&scoped=true!./../../../../../../node_modules/sass-loader/index.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ChangeProjectDetails.vue", function() {
     var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4f3a1e5c&scoped=true!./../../../../../../node_modules/sass-loader/index.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ChangeProjectDetails.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(230);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("eeacafa6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5f7c3375&scoped=true!./../../../../../../node_modules/sass-loader/index.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MySubscriptions.vue", function() {
     var newContent = require("!!./../../../../../../node_modules/css-loader/index.js!./../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5f7c3375&scoped=true!./../../../../../../node_modules/sass-loader/index.js!./../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MySubscriptions.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(231);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("82ef2b1c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6398b14f&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ServiceDetails.vue", function() {
     var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6398b14f&scoped=true!./../../../../node_modules/sass-loader/index.js!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ServiceDetails.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(232);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(6)("397c13ea", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-b8890c0c&scoped=true!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Ratings.vue", function() {
     var newContent = require("!!./../../../../../node_modules/css-loader/index.js!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-b8890c0c&scoped=true!./../../../../../node_modules/sass-loader/index.js!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Ratings.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 344 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * vuex v2.1.2
 * (c) 2017 Evan You
 * @license MIT
 */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vuex = factory());
}(this, (function () { 'use strict';

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
        return
      }
      return this.$store.commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (!(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
        return
      }
      return this.$store.dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
};

var prototypeAccessors$1 = { state: {},namespaced: {} };

prototypeAccessors$1.state.get = function () {
  return this._rawModule.state || {}
};

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  var this$1 = this;

  // register root module (Vuex.Store options)
  this.root = new Module(rawRootModule, false);

  // register all nested modules
  if (rawRootModule.modules) {
    forEachValue(rawRootModule.modules, function (rawModule, key) {
      this$1.register([key], rawModule, false);
    });
  }
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update(this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  var parent = this.get(path.slice(0, -1));
  var newModule = new Module(rawModule, runtime);
  parent.addChild(path[path.length - 1], newModule);

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
          'manual reload is needed'
        );
        return
      }
      update(targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");

  var state = options.state; if ( state === void 0 ) state = {};
  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm.$data.state
};

prototypeAccessors.state.set = function (v) {
  assert(false, "Use store.replaceState() to explicit replace store state.");
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    console.error(("[vuex] unknown mutation type: " + type));
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var entry = this._actions[type];
  if (!entry) {
    console.error(("[vuex] unknown action type: " + type));
    return
  }
  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  var subs = this._subscribers;
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  assert(typeof getter === 'function', "store.watch only accepts a function.");
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm.state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }
  assert(Array.isArray(path), "module path must be a string or an Array.");
  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: { state: state },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm.state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (namespace) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var namespacedType = namespace + key;
    registerAction(store, namespacedType, action, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    console.error(("[vuex] duplicate getter key: " + type));
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch('state', function () {
    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    console.error(
      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
    );
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

var index = {
  Store: Store,
  install: install,
  version: '2.1.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions
};

return index;

})));


/***/ }),
/* 346 */,
/* 347 */,
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(140);
module.exports = __webpack_require__(141);


/***/ })
],[348]);