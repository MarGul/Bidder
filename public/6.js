webpackJsonp([6],{

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(254),
  /* template */
  __webpack_require__(261),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Home_HomeHero__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Home_HomeHero___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Home_HomeHero__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Home_HomeFeatures__ = __webpack_require__(258);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Home_HomeFeatures___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Home_HomeFeatures__);
//
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
		appHomeHero: __WEBPACK_IMPORTED_MODULE_0__components_Home_HomeHero___default.a,
		appHomeFeatures: __WEBPACK_IMPORTED_MODULE_1__components_Home_HomeFeatures___default.a
	}
});

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(256),
  /* template */
  __webpack_require__(257),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Home/HomeHero.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] HomeHero.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c5041cde", Component.options)
  } else {
    hotAPI.reload("data-v-c5041cde", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 256:
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home_hero-component"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "hh-container"
  }, [_c('transition', {
    attrs: {
      "name": "slide-in-left",
      "appear": ""
    }
  }, [_c('div', {
    staticClass: "hh-left"
  }, [_c('h1', {
    staticClass: "hh-title"
  }, [_vm._v("\n\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit!\n\t\t\t\t\t")]), _vm._v(" "), _c('p', {
    staticClass: "hh-content"
  }, [_vm._v("\n\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptatibus adipisci nemo labore? Non quidem modi vel harum corporis enim est unde quibusdam, vitae animi, perferendis consectetur impedit dicta labore!\n\t\t\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "hh-action"
  }, [_c('button', {
    staticClass: "btn btn-orange"
  }, [_vm._v("\n\t\t\t\t\t\t\tSkapa en tjänst idag\n\t\t\t\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "action-desc"
  }, [_vm._v("\n\t\t\t\t\t\t\tIngen kostnad och inga obligationer.\n\t\t\t\t\t\t")])])])]), _vm._v(" "), _c('transition', {
    attrs: {
      "name": "slide-in-right",
      "appear": ""
    }
  }, [_c('div', {
    staticClass: "hh-right"
  }, [_c('img', {
    staticClass: "img-responsive",
    attrs: {
      "src": "/screen.png",
      "alt": ""
    }
  })])])], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c5041cde", module.exports)
  }
}

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(259),
  /* template */
  __webpack_require__(260),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Home/HomeFeatures.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] HomeFeatures.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-619414d4", Component.options)
  } else {
    hotAPI.reload("data-v-619414d4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 259:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home_features-component"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "features-container"
  }, [_c('div', {
    staticClass: "feature"
  }, [_c('svg', {
    staticStyle: {
      "enable-background": "new 0 0 56 56"
    },
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "version": "1.1",
      "id": "Capa_1",
      "x": "0px",
      "y": "0px",
      "viewBox": "0 0 56 56",
      "xml:space": "preserve",
      "width": "100px",
      "height": "100px"
    }
  }, [_c('g', [_c('path', {
    attrs: {
      "d": "M29,12c3.309,0,6-2.691,6-6s-2.691-6-6-6s-6,2.691-6,6S25.691,12,29,12z M29,2c2.206,0,4,1.794,4,4s-1.794,4-4,4    s-4-1.794-4-4S26.794,2,29,2z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M24,45c0,2.757,2.243,5,5,5s5-2.243,5-5s-2.243-5-5-5S24,42.243,24,45z M32,45c0,1.654-1.346,3-3,3s-3-1.346-3-3    s1.346-3,3-3S32,43.346,32,45z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M14.042,14.287c0.062,0.205,0.187,0.385,0.358,0.513l7.6,5.7V27h-5.82l0.753-4.52l1.773-1.773l-1.414-1.414l-2,2    c-0.147,0.147-0.245,0.337-0.279,0.543L14.153,27H12v2h2v8h2v-8h26v8h2v-8h2v-2h-6v-8c0-2.757-2.243-5-5-5h-9.697l-5.479-3.653    l-2.887-7.698c-0.179-0.477-0.688-0.745-1.179-0.618l-4,1c-0.265,0.065-0.491,0.237-0.626,0.476    c-0.135,0.237-0.167,0.52-0.089,0.781L14.042,14.287z M15.377,4.187l2.687,7.165c0.074,0.196,0.208,0.364,0.382,0.48l6,4    C24.609,15.941,24.803,16,25,16h10c1.654,0,3,1.346,3,3v8h-2v-7h-2v7h-4v-7h1v-2h-4v2h1v7h-4v-7c0-0.314-0.148-0.611-0.4-0.8    l-7.737-5.803l-2.604-8.682L15.377,4.187z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M53,0H40c-1.654,0-3,1.346-3,3v4c0,1.654,1.346,3,3,3v3c0,0.404,0.244,0.77,0.617,0.924C40.741,13.976,40.871,14,41,14    c0.26,0,0.516-0.102,0.707-0.293L45.414,10H53c1.654,0,3-1.346,3-3V3C56,1.346,54.654,0,53,0z M54,7c0,0.552-0.449,1-1,1h-8    c-0.265,0-0.52,0.105-0.707,0.293L42,10.586V9c0-0.553-0.448-1-1-1h-1c-0.551,0-1-0.448-1-1V3c0-0.552,0.449-1,1-1h13    c0.551,0,1,0.448,1,1V7z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M10,24c1.654,0,3-1.346,3-3v-2c0-1.654-1.346-3-3-3v-3c0-0.404-0.244-0.77-0.617-0.924    c-0.375-0.156-0.805-0.069-1.09,0.217L4.586,16H3c-1.654,0-3,1.346-3,3v2c0,1.654,1.346,3,3,3H10z M2,21v-2c0-0.552,0.449-1,1-1h2    c0.265,0,0.52-0.105,0.707-0.293L8,15.414V17c0,0.553,0.448,1,1,1h1c0.551,0,1,0.448,1,1v2c0,0.552-0.449,1-1,1H3    C2.449,22,2,21.552,2,21z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "41",
      "y": "4",
      "width": "11",
      "height": "2",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M34,52H24c-1.654,0-3,1.346-3,3v1h2v-1c0-0.552,0.449-1,1-1h10c0.551,0,1,0.448,1,1v1h2v-1C37,53.346,35.654,52,34,52z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M42,45c0,2.757,2.243,5,5,5s5-2.243,5-5s-2.243-5-5-5S42,42.243,42,45z M47,42c1.654,0,3,1.346,3,3s-1.346,3-3,3    s-3-1.346-3-3S45.346,42,47,42z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M52,52H42c-1.654,0-3,1.346-3,3v1h2v-1c0-0.552,0.449-1,1-1h10c0.551,0,1,0.448,1,1v1h2v-1C55,53.346,53.654,52,52,52z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M6,45c0,2.757,2.243,5,5,5s5-2.243,5-5s-2.243-5-5-5S6,42.243,6,45z M14,45c0,1.654-1.346,3-3,3s-3-1.346-3-3s1.346-3,3-3    S14,43.346,14,45z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M16,52H6c-1.654,0-3,1.346-3,3v1h2v-1c0-0.552,0.449-1,1-1h10c0.551,0,1,0.448,1,1v1h2v-1C19,53.346,17.654,52,16,52z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "38",
      "y": "31",
      "width": "2",
      "height": "2",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "34",
      "y": "31",
      "width": "2",
      "height": "2",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "30",
      "y": "31",
      "width": "2",
      "height": "2",
      "fill": "#009999"
    }
  })])]), _vm._v(" "), _c('h3', [_vm._v("Du har kontroll")]), _vm._v(" "), _c('p', [_vm._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor numquam praesentium ratione tempora error ipsa voluptas ducimus. Cupiditate voluptate voluptatum ipsa aliquam, unde atque reiciendis voluptates dolores, mollitia sunt similique.")])]), _vm._v(" "), _c('div', {
    staticClass: "feature"
  }, [_c('svg', {
    staticStyle: {
      "enable-background": "new 0 0 56 56"
    },
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "version": "1.1",
      "id": "Capa_1",
      "x": "0px",
      "y": "0px",
      "viewBox": "0 0 56 56",
      "xml:space": "preserve",
      "width": "100px",
      "height": "100px"
    }
  }, [_c('g', [_c('path', {
    attrs: {
      "d": "M12,24c3.309,0,6-2.691,6-6s-2.691-6-6-6s-6,2.691-6,6S8.691,24,12,24z M12,14c2.206,0,4,1.794,4,4s-1.794,4-4,4    s-4-1.794-4-4S9.794,14,12,14z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M44,24c3.309,0,6-2.691,6-6s-2.691-6-6-6s-6,2.691-6,6S40.691,24,44,24z M44,14c2.206,0,4,1.794,4,4s-1.794,4-4,4    s-4-1.794-4-4S41.794,14,44,14z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M54,26v13c0,1.654-1.346,3-3,3V31c0-2.757-2.243-5-5-5h-5c-0.552,0-1,0.448-1,1v4v1v1h-8c-0.552,0-1,0.448-1,1v3h-6v-3    c0-0.552-0.448-1-1-1h-8v-1v-1v-4c0-0.552-0.448-1-1-1h-5c-2.757,0-5,2.243-5,5v11c-1.654,0-3-1.346-3-3V26H0v13    c0,2.045,1.237,3.802,3,4.576V56h2V44h1h1h8v11c0,0.552,0.448,1,1,1h3h1h1v-1V40v-1h3h8h3v1v15v1h1h1h3c0.552,0,1-0.448,1-1V44h8    h1h1v12h2V43.576c1.763-0.774,3-2.531,3-4.576V26H54z M20,37h-2h-6v-6h-2v7c0,0.552,0.448,1,1,1h7c0.551,0,1,0.449,1,1v14h-2V43    c0-0.552-0.448-1-1-1H7V31c0-1.654,1.346-3,3-3h4v3v1v2c0,0.552,0.448,1,1,1h8v2H20z M40,42c-0.552,0-1,0.448-1,1v11h-2V40    c0-0.551,0.449-1,1-1h7c0.552,0,1-0.448,1-1v-7h-2v6h-6h-2h-3v-2h8c0.552,0,1-0.448,1-1v-2v-1v-3h4c1.654,0,3,1.346,3,3v11H40z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M19,10v3c0,0.431,0.275,0.812,0.684,0.949C19.788,13.983,19.895,14,20,14c0.309,0,0.607-0.144,0.8-0.4l2.7-3.6H31    c1.654,0,3-1.346,3-3V3c0-1.654-1.346-3-3-3H19c-1.654,0-3,1.346-3,3v4C16,8.654,17.346,10,19,10z M18,3c0-0.551,0.449-1,1-1h12    c0.551,0,1,0.449,1,1v4c0,0.551-0.449,1-1,1h-8c-0.315,0-0.611,0.148-0.8,0.4L21,10V9c0-0.552-0.448-1-1-1h-1    c-0.551,0-1-0.449-1-1V3z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "20",
      "y": "4",
      "width": "10",
      "height": "2",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "27",
      "y": "25",
      "width": "6",
      "height": "2",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M26,21c-1.654,0-3,1.346-3,3v4c0,1.654,1.346,3,3,3h8c1.654,0,3-1.346,3-3v-0.697l1.832-2.748    c0.205-0.307,0.224-0.701,0.05-1.026C38.708,23.203,38.369,23,38,23h-1.171c-0.413-1.164-1.525-2-2.829-2H26z M35,24    c0,0.552,0.448,1,1,1h0.131l-0.963,1.445C35.059,26.609,35,26.803,35,27v1c0,0.551-0.449,1-1,1h-8c-0.551,0-1-0.449-1-1v-4    c0-0.551,0.449-1,1-1h8C34.551,23,35,23.449,35,24z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "23",
      "y": "16",
      "width": "2",
      "height": "2",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "27",
      "y": "16",
      "width": "2",
      "height": "2",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "31",
      "y": "16",
      "width": "2",
      "height": "2",
      "fill": "#009999"
    }
  })])]), _vm._v(" "), _c('h3', [_vm._v("Extra trygghet")]), _vm._v(" "), _c('p', [_vm._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor numquam praesentium ratione tempora error ipsa voluptas ducimus. Cupiditate voluptate voluptatum ipsa aliquam, unde atque reiciendis voluptates dolores, mollitia sunt similique.")])]), _vm._v(" "), _c('div', {
    staticClass: "feature"
  }, [_c('svg', {
    staticStyle: {
      "enable-background": "new 0 0 64 64"
    },
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns:xlink": "http://www.w3.org/1999/xlink",
      "version": "1.1",
      "id": "Layer_1_1_",
      "x": "0px",
      "y": "0px",
      "viewBox": "0 0 64 64",
      "xml:space": "preserve",
      "width": "100px",
      "height": "100px"
    }
  }, [_c('g', [_c('path', {
    attrs: {
      "d": "M47,32.051V30h2v-2h-6v2h2v2.051C37.747,32.567,32,38.618,32,46c0,2.551,0.697,4.938,1.894,7H16V16h31v10h2V15   c0-0.552-0.447-1-1-1H15c-0.553,0-1,0.448-1,1v1h-3c-3.859,0-7,3.14-7,7v23c0,3.86,3.141,7,7,7h3v1c0,0.552,0.447,1,1,1h20.292   c2.57,3.053,6.414,5,10.708,5c7.72,0,14-6.28,14-14C60,38.618,54.253,32.567,47,32.051z M11,51c-2.757,0-5-2.243-5-5V23   c0-2.757,2.243-5,5-5h3v3h-2c-1.654,0-3,1.346-3,3v21c0,1.654,1.346,3,3,3h2v3H11z M14,23v23h-2c-0.552,0-1-0.449-1-1V24   c0-0.551,0.448-1,1-1H14z M46,58c-6.617,0-12-5.383-12-12s5.383-12,12-12s12,5.383,12,12S52.617,58,46,58z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M24.344,8c0,0.645,0.251,1.251,0.707,1.707c0.161,0.162,0.161,0.424,0,0.586l1.414,1.414c0.94-0.941,0.94-2.473,0-3.415   C26.359,8.187,26.344,8.064,26.344,8s0.016-0.187,0.121-0.293c0.94-0.941,0.94-2.473,0-3.415C26.359,4.187,26.344,4.064,26.344,4   s0.016-0.187,0.121-0.292l-1.414-1.415C24.595,2.749,24.344,3.355,24.344,4s0.251,1.251,0.707,1.707   c0.161,0.162,0.161,0.424,0,0.585C24.595,6.749,24.344,7.355,24.344,8z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M29.758,8c0,0.645,0.251,1.251,0.707,1.707c0.161,0.162,0.161,0.424,0,0.586l1.414,1.414c0.94-0.941,0.94-2.473,0-3.415   C31.773,8.187,31.758,8.064,31.758,8s0.016-0.187,0.121-0.293c0.94-0.941,0.94-2.473,0-3.415C31.773,4.187,31.758,4.064,31.758,4   s0.016-0.187,0.121-0.292l-1.414-1.415C30.009,2.749,29.758,3.355,29.758,4s0.251,1.251,0.707,1.707   c0.161,0.162,0.161,0.424,0,0.585C30.009,6.749,29.758,7.355,29.758,8z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M35.172,8c0,0.645,0.251,1.251,0.707,1.707c0.161,0.162,0.161,0.424,0,0.586l1.414,1.414c0.94-0.941,0.94-2.473,0-3.415   C37.188,8.187,37.172,8.064,37.172,8s0.016-0.187,0.121-0.293c0.94-0.941,0.94-2.473,0-3.415C37.188,4.187,37.172,4.064,37.172,4   s0.016-0.187,0.121-0.292l-1.414-1.415C35.423,2.749,35.172,3.355,35.172,4s0.251,1.251,0.707,1.707   c0.161,0.162,0.161,0.424,0,0.585C35.423,6.749,35.172,7.355,35.172,8z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M45.803,44.783l-3.355-1.678l-0.895,1.789l4,2C45.695,46.965,45.848,47,46,47c0.259,0,0.515-0.101,0.707-0.293l4-4   l-1.414-1.414L45.803,44.783z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('path', {
    attrs: {
      "d": "M46,36c-5.514,0-10,4.486-10,10s4.486,10,10,10s10-4.486,10-10S51.514,36,46,36z M46,54c-4.411,0-8-3.589-8-8s3.589-8,8-8   s8,3.589,8,8S50.411,54,46,54z",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "56.5",
      "y": "31.379",
      "transform": "matrix(0.7071 -0.7071 0.7071 0.7071 -6.8467 50.4706)",
      "width": "2",
      "height": "4.243",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "33",
      "y": "32",
      "width": "2",
      "height": "2",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "29",
      "y": "32",
      "width": "2",
      "height": "2",
      "fill": "#009999"
    }
  }), _vm._v(" "), _c('rect', {
    attrs: {
      "x": "25",
      "y": "32",
      "width": "2",
      "height": "2",
      "fill": "#009999"
    }
  })])]), _vm._v(" "), _c('h3', [_vm._v("Spara tid")]), _vm._v(" "), _c('p', [_vm._v("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor numquam praesentium ratione tempora error ipsa voluptas ducimus. Cupiditate voluptate voluptatum ipsa aliquam, unde atque reiciendis voluptates dolores, mollitia sunt similique.")])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-619414d4", module.exports)
  }
}

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "home-view"
  }, [_c('app-home-hero'), _vm._v(" "), _c('app-home-features')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-afdb283e", module.exports)
  }
}

/***/ })

});