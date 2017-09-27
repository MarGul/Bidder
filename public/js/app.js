webpackJsonp([0],[
/* 0 */,
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
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

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
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

/* harmony default export */ __webpack_exports__["a"] = (Model);

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapGetters; });
/* unused harmony export mapActions */
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v2.4.0
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
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
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

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
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: {} };

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
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
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
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

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

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

function assertRawModule (path, rawModule) {
  ['getters', 'actions', 'mutations'].forEach(function (key) {
    if (!rawModule[key]) { return }

    forEachValue(rawModule[key], function (value, type) {
      assert(
        typeof value === 'function',
        makeAssertionMessage(path, key, type, value)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value) {
  var buf = key + " should be function but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";

  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state();
  }

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
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: {} };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
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
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    "development" !== 'production' &&
    options && options.silent
  ) {
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
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
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

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule) {
  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path));
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

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
    data: {
      $$state: state
    },
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
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
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
        if ("development" !== 'production' && !store._actions[type]) {
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
        if ("development" !== 'production' && !store._mutations[type]) {
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
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
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
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
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
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
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

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

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
    // mark vuex getter for devtools
    res[key].vuex = true;
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
      if ("development" !== 'production' && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
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

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

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
  if ("development" !== 'production' && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '2.4.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Errors__ = __webpack_require__(192);
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
        this.dateFields = [];

        for (var field in data) {
            this[field] = data[field];
        }

        this.errors = new __WEBPACK_IMPORTED_MODULE_0__Errors__["a" /* default */]();
    }

    /**
     * Fields that we want to parse as a date (working with the vuejs datetime picker)
     * 
     * @param  array fields
     */


    _createClass(Form, [{
        key: 'asDate',
        value: function asDate(fields) {
            this.dateFields = fields;
            return this;
        }

        /**
         * Fetch all relevant data for the form.
         */

    }, {
        key: 'data',
        value: function data() {
            var data = {};

            for (var property in this.originalData) {
                data[property] = this.dateFields.includes(property) && this[property] ? this.parseAsDate(property) : this[property];
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

        /**
         * Parse a property of the form as a date.
         */

    }, {
        key: 'parseAsDate',
        value: function parseAsDate(property) {
            var date = new Date(this[property]);
            return date.getFullYear() + '-' + this.pad(date.getMonth() + 1) + '-' + date.getDate();
        }
    }, {
        key: 'pad',
        value: function pad(number) {
            return number < 10 ? "0" + number : number;
        }
    }]);

    return Form;
}();

/* harmony default export */ __webpack_exports__["a"] = (Form);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
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

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 7 */
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

var listToStyles = __webpack_require__(185)

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

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return SET_USER_NOTIFICATION_SETTINGS_FETCHED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return SET_USER_NOTIFICATION_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SET_USER_BIDS_FETCHED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return SET_USER_BIDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SET_USER_BID_DETAILS_FETCHED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return SET_USER_BID_DETAILS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return SET_USER_SERVICES_FETCHED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return SET_USER_SERVICES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SET_SERVICE_DETAILS_FETCHED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SET_SERVICE_DETAILS_SERVICE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_SERVICE_DETAILS_BIDS_FETCHED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SET_SERVICE_DETAILS_BIDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_SERVICE_DETAILS_BID_ACCEPTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SET_SUBSCRIPTIONS_FETCHED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SET_SUBSCRIPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return SET_USER_INVOICES_FETCHED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return SET_USER_INVOICES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return SET_USER_INVOICES_FOCUS; });
// User notification settings
var SET_USER_NOTIFICATION_SETTINGS_FETCHED = 'SET_USER_NOTIFICATION_SETTINGS_FETCHED';
var SET_USER_NOTIFICATION_SETTINGS = 'SET_USER_NOTIFICATION_SETTINGS';

// User bids
var SET_USER_BIDS_FETCHED = 'SET_USER_BIDS_FETCHED';
var SET_USER_BIDS = 'SET_USER_BIDS';

// State for when user is viewing a bid's details
var SET_USER_BID_DETAILS_FETCHED = 'SET_USER_BID_DETAILS_FETCHED';
var SET_USER_BID_DETAILS = 'SET_USER_BID_DETAILS';

// User services
var SET_USER_SERVICES_FETCHED = 'SET_USER_SERVICES_FETCHED';
var SET_USER_SERVICES = 'SET_USER_SERVICES';

// State for when user is viewing a service's details.
var SET_SERVICE_DETAILS_FETCHED = 'SET_SERVICE_DETAILS_FETCHED';
var SET_SERVICE_DETAILS_SERVICE = 'SET_SERVICE_DETAILS_SERVICE';
var SET_SERVICE_DETAILS_BIDS_FETCHED = 'SET_SERVICE_DETAILS_BIDS_FETCHED';
var SET_SERVICE_DETAILS_BIDS = 'SET_SERVICE_DETAILS_BIDS';
var SET_SERVICE_DETAILS_BID_ACCEPTED = 'SET_SERVICE_DETAILS_BID_ACCEPTED';

// User subscriptions
var SET_SUBSCRIPTIONS_FETCHED = 'SET_SUBSCRIPTIONS_FETCHED';
var SET_SUBSCRIPTIONS = 'SET_SUBSCRIPTIONS';

// User invoices
var SET_USER_INVOICES_FETCHED = 'SET_USER_INVOICES_FETCHED';
var SET_USER_INVOICES = 'SET_USER_INVOICES';
var SET_USER_INVOICES_FOCUS = 'SET_USER_INVOICES_FOCUS';

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(205)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(207),
  /* template */
  __webpack_require__(208),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-b8890c0c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Ratings.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeartBeat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);

var HeartBeat = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a();

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports) {

module.exports=function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="/dist/",t(0)}([function(e,t,n){"use strict";e.exports=n(75)},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var r=n(51),i=n(15);e.exports=function(e){return r(i(e))}},function(e,t,n){e.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t,n){var r=n(6),i=n(12);e.exports=n(4)?function(e,t,n){return r.f(e,t,i(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){var r=n(8),i=n(31),a=n(24),o=Object.defineProperty;t.f=n(4)?Object.defineProperty:function(e,t,n){if(r(e),t=a(t,!0),r(n),i)try{return o(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t,n){var r=n(22)("wks"),i=n(13),a=n(1).Symbol,o="function"==typeof a,s=e.exports=function(e){return r[e]||(r[e]=o&&a[e]||(o?a:i)("Symbol."+e))};s.store=r},function(e,t,n){var r=n(10);e.exports=function(e){if(!r(e))throw TypeError(e+" is not an object!");return e}},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){var r=n(36),i=n(16);e.exports=Object.keys||function(e){return r(e,i)}},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t){var n=0,r=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+r).toString(36))}},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t){e.exports={}},function(e,t){e.exports=!0},function(e,t){t.f={}.propertyIsEnumerable},function(e,t,n){var r=n(6).f,i=n(2),a=n(7)("toStringTag");e.exports=function(e,t,n){e&&!i(e=n?e:e.prototype,a)&&r(e,a,{configurable:!0,value:t})}},function(e,t,n){var r=n(22)("keys"),i=n(13);e.exports=function(e){return r[e]||(r[e]=i(e))}},function(e,t,n){var r=n(1),i="__core-js_shared__",a=r[i]||(r[i]={});e.exports=function(e){return a[e]||(a[e]={})}},function(e,t){var n=Math.ceil,r=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?r:n)(e)}},function(e,t,n){var r=n(10);e.exports=function(e,t){if(!r(e))return e;var n,i;if(t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;if("function"==typeof(n=e.valueOf)&&!r(i=n.call(e)))return i;if(!t&&"function"==typeof(n=e.toString)&&!r(i=n.call(e)))return i;throw TypeError("Can't convert object to primitive value")}},function(e,t,n){var r=n(1),i=n(14),a=n(18),o=n(26),s=n(6).f;e.exports=function(e){var t=i.Symbol||(i.Symbol=a?{}:r.Symbol||{});"_"==e.charAt(0)||e in t||s(t,e,{value:o.f(e)})}},function(e,t,n){t.f=n(7)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={translations:{ar:{months:{original:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوڤمبر","ديسمبر"],abbr:["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوڤمبر","ديسمبر"]},days:["أحد","إثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"]},da:{months:{original:["Januar","Februar","Marts","April","Maj","Juni","Juli","August","September","Oktober","November","December"],abbr:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"]},days:["Sø","Ma","Ti","On","To","Fr","Lø"]},en:{months:{original:["January","February","March","April","May","June","July","August","September","October","November","December"],abbr:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]},es:{months:{original:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],abbr:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"]},days:["Dom","Lun","Mar","Mié","Jue","Vie","Sab"]},fi:{months:{original:["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],abbr:["tammi","helmi","maalis","huhti","touko","kesä","heinä","elo","syys","loka","marras","joulu"]},days:["su","ma","ti","ke","to","pe","la"]},fr:{months:{original:["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"],abbr:["Jan","Fév","Mar","Avr","Mai","Juin","Juil","Août","Sep","Oct","Nov","Déc"]},days:["Dim","Lun","Mar","Mer","Jeu","Ven","Sam"]},hr:{months:{original:["Siječanj","Veljača","Ožujak","Travanj","Svibanj","Lipanj","Srpanj","Kolovoz","Rujan","Listopad","Studeni","Prosinac"],abbr:["Sij","Velj","Ožu","Tra","Svi","Lip","Srp","Kol","Ruj","Lis","Stu","Pro"]},days:["Ned","Pon","Uto","Sri","Čet","Pet","Sub"]},it:{months:{original:["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],abbr:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"]},days:["Dom","Lun","Mar","Mer","Gio","Ven","Sab"]},lt:{months:{original:["Sausis","Vasaris","Kovas","Balandis","Gegužė","Birželis","Liepa","Rugpjūtis","Rugsėjis","Spalis","Lapkritis","Gruodis"],abbr:["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rugp","Rugs","Spa","Lap","Gru"]},days:["Sek","Pir","Ant","Tre","Ket","Pen","Šeš"]},nl:{months:{original:["januari","februari","maart","april","mei","juni","juli","augustus","september","oktober","november","december"],abbr:["jan","feb","maa","apr","mei","jun","jul","aug","sep","okt","nov","dec"]},days:["zo","ma","di","wo","do","vr","za"]},de:{months:{original:["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"],abbr:["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]},days:["So.","Mo.","Di.","Mi.","Do.","Fr.","Sa."]},"pt-br":{months:{original:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],abbr:["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"]},days:["Dom","Seg","Ter","Qua","Qui","Sex","Sab"]},vi:{months:{original:["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],abbr:["T 01","T 02","T 03","T 04","T 05","T 06","T 07","T 08","T 09","T 10","T 11","T 12"]},days:["CN","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"]},zh:{months:{original:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],abbr:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]},days:["日","一","二","三","四","五","六"]},ja:{months:{original:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],abbr:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]},days:["日","月","火","水","木","金","土"]},he:{months:{original:["ינואר","פברואר","מרץ","אפריל","מאי","יוני","יולי","אוגוסט","ספטמבר","אוקטובר","נובמבר","דצמבר"],abbr:["ינו","פבר","מרץ","אפר","מאי","יונ","יול","אוג","ספט","אוק","נוב","דצמ"]},days:["א","ב","ג","ד","ה","ו","ש"]},cs:{months:{original:["leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad","prosinec"],abbr:["led","úno","bře","dub","kvě","čer","čec","srp","zář","říj","lis","pro"]},days:["ne","po","út","st","čt","pá","so"]},ru:{months:{original:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],abbr:["Янв","Февр","Март","Апр","Май","Июнь","Июль","Авг","Сент","Окт","Нояб","Дек"]},days:["Вс","Пн","Вт","Ср","Чт","Пт","Сб"]},bg:{months:{original:["Януари","Февруари","Март","Април","Май","Юни","Юли","Август","Септември","Октомври","Ноември","Декември"],abbr:["Ян","Фев","Мар","Апр","Май","Юни","Юли","Авг","Сеп","Окт","Ное","Дек"]},days:["Нд","Пн","Вт","Ср","Чт","Пт","Сб"]},sv:{months:{original:["Januari","Februari","Mars","April","Maj","Juni","Juli","Augusti","September","Oktober","November","December"],abbr:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},days:["Sön","Mån","Tis","Ons","Tor","Fre","Lör"]},th:{months:{original:["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],abbr:["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."]},days:["อา","จ","อ","พ","พฤ","ศ","ส"]},ro:{months:{original:["Ianuarie","Februarie","Martie","Aprilie","Mai","Iunie","Iulie","August","Septembrie","Octombrie","Noiembrie","Decembrie"],abbr:["Ian","Feb","Mar","Apr","Mai","Iun","Iul","Aug","Sep","Oct","Noi","Dec"]},days:["D","L","Ma","Mi","J","V","S"]},"sl-si":{months:{original:["Januar","Februar","Marec","April","Maj","Junij","Julij","Avgust","September","Oktober","November","December"],abbr:["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Avg","Sep","Okt","Nov","Dec"]},days:["Ned","Pon","Tor","Sre","Čet","Pet","Sob"]},pl:{months:{original:["Styczeń","Luty","Marzec","Kwiecień","Maj","Czerwiec","Lipiec","Sierpień","Wrzesień","Październik","Listopad","Grudzień"],abbr:["Sty","Lut","Mar","Kwi","Maj","Cze","Lip","Sie","Wrz","Paź","Lis","Gru"]},days:["Nd","Pn","Wt","Śr","Czw","Pt","Sob"]},"nb-no":{months:{original:["Januar","Februar","Mars","April","Mai","Juni","Juli","August","September","Oktober","November","Desember"],abbr:["Jan","Feb","Mar","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Des"]},days:["Sø","Ma","Ti","On","To","Fr","Lø"]},ee:{months:{original:["Jaanuar","Veebruar","Märts","Aprill","Mai","Juuni","Juuli","August","September","Oktoober","November","Detsember"],abbr:["Jaan","Veebr","Märts","Apr","Mai","Juuni","Juuli","Aug","Sept","Okt","Nov","Dets"]},days:["P","E","T","K","N","R","L"]},ko:{months:{original:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],abbr:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"]},days:["일","월","화","수","목","금","토"]}}}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var r=n(10),i=n(1).document,a=r(i)&&r(i.createElement);e.exports=function(e){return a?i.createElement(e):{}}},function(e,t,n){var r=n(1),i=n(14),a=n(48),o=n(5),s="prototype",u=function(e,t,n){var l,c,d,f=e&u.F,h=e&u.G,p=e&u.S,b=e&u.P,g=e&u.B,y=e&u.W,v=h?i:i[t]||(i[t]={}),m=v[s],D=h?r:p?r[t]:(r[t]||{})[s];h&&(n=t);for(l in n)c=!f&&D&&void 0!==D[l],c&&l in v||(d=c?D[l]:n[l],v[l]=h&&"function"!=typeof D[l]?n[l]:g&&c?a(d,r):y&&D[l]==d?function(e){var t=function(t,n,r){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,r)}return e.apply(this,arguments)};return t[s]=e[s],t}(d):b&&"function"==typeof d?a(Function.call,d):d,b&&((v.virtual||(v.virtual={}))[l]=d,e&u.R&&m&&!m[l]&&o(m,l,d)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,e.exports=u},function(e,t,n){e.exports=!n(4)&&!n(9)(function(){return 7!=Object.defineProperty(n(29)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){"use strict";var r=n(18),i=n(30),a=n(37),o=n(5),s=n(2),u=n(17),l=n(53),c=n(20),d=n(60),f=n(7)("iterator"),h=!([].keys&&"next"in[].keys()),p="@@iterator",b="keys",g="values",y=function(){return this};e.exports=function(e,t,n,v,m,D,M){l(n,t,v);var w,S,x,k=function(e){if(!h&&e in Y)return Y[e];switch(e){case b:return function(){return new n(this,e)};case g:return function(){return new n(this,e)}}return function(){return new n(this,e)}},O=t+" Iterator",F=m==g,T=!1,Y=e.prototype,j=Y[f]||Y[p]||m&&Y[m],A=j||k(m),J=m?F?k("entries"):A:void 0,N="Array"==t?Y.entries||j:j;if(N&&(x=d(N.call(new e)),x!==Object.prototype&&(c(x,O,!0),r||s(x,f)||o(x,f,y))),F&&j&&j.name!==g&&(T=!0,A=function(){return j.call(this)}),r&&!M||!h&&!T&&Y[f]||o(Y,f,A),u[t]=A,u[O]=y,m)if(w={values:F?A:k(g),keys:D?A:k(b),entries:J},M)for(S in w)S in Y||a(Y,S,w[S]);else i(i.P+i.F*(h||T),t,w);return w}},function(e,t,n){var r=n(8),i=n(57),a=n(16),o=n(21)("IE_PROTO"),s=function(){},u="prototype",l=function(){var e,t=n(29)("iframe"),r=a.length,i="<",o=">";for(t.style.display="none",n(50).appendChild(t),t.src="javascript:",e=t.contentWindow.document,e.open(),e.write(i+"script"+o+"document.F=Object"+i+"/script"+o),e.close(),l=e.F;r--;)delete l[u][a[r]];return l()};e.exports=Object.create||function(e,t){var n;return null!==e?(s[u]=r(e),n=new s,s[u]=null,n[o]=e):n=l(),void 0===t?n:i(n,t)}},function(e,t,n){var r=n(36),i=n(16).concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return r(e,i)}},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){var r=n(2),i=n(3),a=n(47)(!1),o=n(21)("IE_PROTO");e.exports=function(e,t){var n,s=i(e),u=0,l=[];for(n in s)n!=o&&r(s,n)&&l.push(n);for(;t.length>u;)r(s,n=t[u++])&&(~a(l,n)||l.push(n));return l}},function(e,t,n){e.exports=n(5)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(42),a=r(i),o=n(27),s=r(o);t.default={isValidDate:function(e){return"[object Date]"===Object.prototype.toString.call(e)&&!isNaN(e.getTime())},getDayNameAbbr:function(e,t){if("object"!==("undefined"==typeof e?"undefined":(0,a.default)(e)))throw TypeError("Invalid Type");return t[e.getDay()]},getMonthName:function(e,t){if(!t)throw Error("missing 2nd parameter Months array");if("object"===("undefined"==typeof e?"undefined":(0,a.default)(e)))return t[e.getMonth()];if("number"==typeof e)return t[e];throw TypeError("Invalid type")},getMonthNameAbbr:function(e,t){if(!t)throw Error("missing 2nd paramter Months array");if("object"===("undefined"==typeof e?"undefined":(0,a.default)(e)))return t[e.getMonth()];if("number"==typeof e)return t[e];throw TypeError("Invalid type")},convertToUTC:function(e){return new Date(e.getTime()+6e4*e.getTimezoneOffset())},daysInMonth:function(e,t){return new Date(Date.UTC(e,t+1,0)).getUTCDate()},dayDiff:function(e,t){var n=864e5,r=Date.UTC(e.getFullYear(),e.getMonth(),e.getDate()),i=Date.UTC(t.getFullYear(),t.getMonth(),t.getDate());return Math.floor((i-r)/n)},getNthSuffix:function(e){switch(e){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th"}},formatDate:function(e,t,n){n=n?n:s.default.translations.en;var r=e.getFullYear(),i=e.getMonth()+1,a=e.getDate(),o=t.replace(/dd/,("0"+a).slice(-2)).replace(/d/,a).replace(/yyyy/,r).replace(/yy/,String(r).slice(2)).replace(/MMMM/,this.getMonthName(e.getMonth(),n.months.original)).replace(/MMM/,this.getMonthNameAbbr(e.getMonth(),n.months.abbr)).replace(/MM/,("0"+i).slice(-2)).replace(/M(?!a|ä)/,i).replace(/su/,this.getNthSuffix(e.getDate())).replace(/D(?!e|é|i)/,this.getDayNameAbbr(e,n.days));return o},createDateArray:function(e,t){for(var n=[];e<=t;)n.push(new Date(e)),e=new Date(e).setDate(new Date(e).getDate()+1);return n}}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(38),a=r(i),o=n(27),s=r(o);t.default={props:{value:{validator:function(e){return null===e||e instanceof Date||"string"==typeof e}},name:{value:String},id:{value:String},format:{value:String,default:"dd MMM yyyy"},language:{value:String,default:"en"},disabled:{type:Object},highlighted:{type:Object},placeholder:{type:String},inline:{type:Boolean},inputClass:{type:String},wrapperClass:{type:String},mondayFirst:{type:Boolean,default:!1},clearButton:{type:Boolean,default:!1}},data:function(){return{currDate:new Date((new Date).getFullYear(),(new Date).getMonth(),1).getTime(),selectedDate:null,showDayView:!1,showMonthView:!1,showYearView:!1,calendarHeight:0}},watch:{value:function(e){this.setValue(e)}},computed:{formattedValue:function(){return this.selectedDate?a.default.formatDate(new Date(this.selectedDate),this.format,this.translation):null},translation:function(){return s.default.translations[this.language]},currMonthName:function(){var e=new Date(this.currDate);return a.default.getMonthNameAbbr(e.getMonth(),this.translation.months.abbr)},currYear:function(){var e=new Date(this.currDate);return e.getFullYear()},blankDays:function(){var e=new Date(this.currDate),t=new Date(e.getFullYear(),e.getMonth(),1,e.getHours(),e.getMinutes());return this.mondayFirst?t.getDay()>0?t.getDay()-1:6:t.getDay()},daysOfWeek:function(){if(this.mondayFirst){var e=this.translation.days.slice();return e.push(e.shift()),e}return this.translation.days},days:function e(){for(var t=new Date(this.currDate),e=[],n=new Date(t.getFullYear(),t.getMonth(),1,t.getHours(),t.getMinutes()),r=a.default.daysInMonth(n.getFullYear(),n.getMonth()),i=0;i<r;i++)e.push({date:n.getDate(),timestamp:n.getTime(),isSelected:this.isSelectedDate(n),isDisabled:this.isDisabledDate(n),isHighlighted:this.isHighlightedDate(n)}),n.setDate(n.getDate()+1);return e},months:function e(){for(var t=new Date(this.currDate),e=[],n=new Date(t.getFullYear(),0,t.getDate(),t.getHours(),t.getMinutes()),r=0;r<12;r++)e.push({month:a.default.getMonthName(r,this.translation.months.original),timestamp:n.getTime(),isSelected:this.isSelectedMonth(n),isDisabled:this.isDisabledMonth(n)}),n.setMonth(n.getMonth()+1);return e},years:function e(){for(var t=new Date(this.currDate),e=[],n=new Date(10*Math.floor(t.getFullYear()/10),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),r=0;r<10;r++)e.push({year:n.getFullYear(),timestamp:n.getTime(),isSelected:this.isSelectedYear(n),isDisabled:this.isDisabledYear(n)}),n.setFullYear(n.getFullYear()+1);return e},calendarStyle:function(){var e={top:0,height:0};this.$el&&(e=this.$el.getBoundingClientRect());var t=e.top+e.height+this.calendarHeight||0,n={};return t>window.innerHeight&&(n={bottom:e.height+"px"}),this.isInline()&&(n.position="static"),n},calendarStyleSecondary:function(){return this.isInline()?{position:"static"}:{}}},methods:{close:function(){this.showDayView=this.showMonthView=this.showYearView=!1},getDefaultDate:function(){return new Date((new Date).getFullYear(),(new Date).getMonth(),1).getTime()},resetDefaultDate:function(){this.currDate=null===this.selectedDate?this.getDefaultDate():this.selectedDate.getTime()},isOpen:function(){return this.showDayView||this.showMonthView||this.showYearView},isInline:function(){return"undefined"!=typeof this.inline&&this.inline},showCalendar:function(){return!this.isInline()&&(this.isOpen()?this.close():void this.showDayCalendar())},showDayCalendar:function(){this.close(),this.showDayView=!0,this.$emit("opened")},showMonthCalendar:function(){this.close(),this.showMonthView=!0},showYearCalendar:function(){this.close(),this.showYearView=!0},setDate:function(e){this.selectedDate=new Date(e),this.currDate=new Date(this.selectedDate.getFullYear(),this.selectedDate.getMonth(),1).getTime(),this.$emit("selected",new Date(e)),this.$emit("input",new Date(e))},clearDate:function(){this.selectedDate=null,this.$emit("selected",this.selectedDate),this.$emit("cleared")},selectDate:function(e){return!e.isDisabled&&(this.setDate(e.timestamp),this.isInline()?this.showDayCalendar():void this.close())},selectMonth:function(e){return!e.isDisabled&&(this.currDate=e.timestamp,void this.showDayCalendar())},selectYear:function(e){return!e.isDisabled&&(this.currDate=e.timestamp,void this.showMonthCalendar())},getMonth:function(){var e=new Date(this.currDate);return e.getMonth()},getYear:function(){var e=new Date(this.currDate);return e.getFullYear()},getDecade:function(){var e=new Date(this.currDate),t=10*Math.floor(e.getFullYear()/10);return t+"'s"},previousMonth:function(){if(this.previousMonthDisabled())return!1;var e=new Date(this.currDate);e.setMonth(e.getMonth()-1),this.currDate=e.getTime(),this.$emit("changedMonth",e)},previousMonthDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.to||!this.disabled.to)return!1;var e=new Date(this.currDate);return this.disabled.to.getMonth()>=e.getMonth()&&this.disabled.to.getFullYear()>=e.getFullYear()},nextMonth:function(){if(this.nextMonthDisabled())return!1;var e=new Date(this.currDate),t=a.default.daysInMonth(e.getFullYear(),e.getMonth());e.setDate(e.getDate()+t),this.currDate=e.getTime(),this.$emit("changedMonth",e)},nextMonthDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.from||!this.disabled.from)return!1;var e=new Date(this.currDate);return this.disabled.from.getMonth()<=e.getMonth()&&this.disabled.from.getFullYear()<=e.getFullYear()},previousYear:function(){if(this.previousYearDisabled())return!1;var e=new Date(this.currDate);e.setYear(e.getFullYear()-1),this.currDate=e.getTime(),this.$emit("changedYear")},previousYearDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.to||!this.disabled.to)return!1;var e=new Date(this.currDate);return this.disabled.to.getFullYear()>=e.getFullYear()},nextYear:function(){if(this.nextYearDisabled())return!1;var e=new Date(this.currDate);e.setYear(e.getFullYear()+1),this.currDate=e.getTime(),this.$emit("changedYear")},nextYearDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.from||!this.disabled.from)return!1;var e=new Date(this.currDate);return this.disabled.from.getFullYear()<=e.getFullYear()},previousDecade:function(){if(this.previousDecadeDisabled())return!1;var e=new Date(this.currDate);e.setYear(e.getFullYear()-10),this.currDate=e.getTime(),this.$emit("changedDecade")},previousDecadeDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.to||!this.disabled.to)return!1;var e=new Date(this.currDate);return 10*Math.floor(this.disabled.to.getFullYear()/10)>=10*Math.floor(e.getFullYear()/10)},nextDecade:function(){if(this.nextDecadeDisabled())return!1;var e=new Date(this.currDate);e.setYear(e.getFullYear()+10),this.currDate=e.getTime(),this.$emit("changedDecade")},nextDecadeDisabled:function(){if("undefined"==typeof this.disabled||"undefined"==typeof this.disabled.from||!this.disabled.from)return!1;var e=new Date(this.currDate);return 10*Math.ceil(this.disabled.from.getFullYear()/10)<=10*Math.ceil(e.getFullYear()/10)},isSelectedDate:function(e){return this.selectedDate&&this.selectedDate.toDateString()===e.toDateString()},isDisabledDate:function(e){var t=!1;return"undefined"!=typeof this.disabled&&("undefined"!=typeof this.disabled.dates&&this.disabled.dates.forEach(function(n){if(e.toDateString()===n.toDateString())return t=!0,!0}),"undefined"!=typeof this.disabled.to&&this.disabled.to&&e<this.disabled.to&&(t=!0),"undefined"!=typeof this.disabled.from&&this.disabled.from&&e>this.disabled.from&&(t=!0),"undefined"!=typeof this.disabled.days&&this.disabled.days.indexOf(e.getDay())!==-1&&(t=!0),t)},isHighlightedDate:function(e){if(this.isDisabledDate(e))return!1;var t=!1;return"undefined"!=typeof this.highlighted&&("undefined"!=typeof this.highlighted.dates&&this.highlighted.dates.forEach(function(n){if(e.toDateString()===n.toDateString())return t=!0,!0}),this.isDefined(this.highlighted.from)&&this.isDefined(this.highlighted.to)&&(t=e>=this.highlighted.from&&e<=this.highlighted.to),"undefined"!=typeof this.highlighted.days&&this.highlighted.days.indexOf(e.getDay())!==-1&&(t=!0),t)},isDefined:function(e){return"undefined"!=typeof e&&e},isSelectedMonth:function(e){return this.selectedDate&&this.selectedDate.getFullYear()===e.getFullYear()&&this.selectedDate.getMonth()===e.getMonth()},isDisabledMonth:function(e){var t=!1;return"undefined"!=typeof this.disabled&&("undefined"!=typeof this.disabled.to&&this.disabled.to&&(e.getMonth()<this.disabled.to.getMonth()&&e.getFullYear()<=this.disabled.to.getFullYear()||e.getFullYear()<this.disabled.to.getFullYear())&&(t=!0),"undefined"!=typeof this.disabled.from&&this.disabled.from&&(this.disabled.from&&e.getMonth()>this.disabled.from.getMonth()&&e.getFullYear()>=this.disabled.from.getFullYear()||e.getFullYear()>this.disabled.from.getFullYear())&&(t=!0),t)},isSelectedYear:function(e){return this.selectedDate&&this.selectedDate.getFullYear()===e.getFullYear()},isDisabledYear:function(e){var t=!1;return!("undefined"==typeof this.disabled||!this.disabled)&&("undefined"!=typeof this.disabled.to&&this.disabled.to&&e.getFullYear()<this.disabled.to.getFullYear()&&(t=!0),"undefined"!=typeof this.disabled.from&&this.disabled.from&&e.getFullYear()>this.disabled.from.getFullYear()&&(t=!0),t)},setValue:function(e){if("string"==typeof e){var t=new Date(e);e=isNaN(t.valueOf())?null:t}if(!e){var n=new Date;return this.currDate=new Date(n.getFullYear(),n.getMonth(),1).getTime(),void(this.selectedDate=null)}this.selectedDate=e,this.currDate=new Date(e.getFullYear(),e.getMonth(),1).getTime()},init:function(){var e=this;this.value&&this.setValue(this.value),this.isInline()&&this.showDayCalendar(),this.$nextTick(function(){e.calendarHeight=e.$el.querySelector(".calendar").getBoundingClientRect().height}),document.addEventListener("click",function(t){if(e.$el&&!e.$el.contains(t.target)){if(e.isInline())return e.showDayCalendar();e.resetDefaultDate(),e.close()}},!1)}},ready:function(){this.init()},mounted:function(){this.init()}}},function(e,t,n){e.exports={default:n(43),__esModule:!0}},function(e,t,n){e.exports={default:n(44),__esModule:!0}},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var i=n(41),a=r(i),o=n(40),s=r(o),u="function"==typeof s.default&&"symbol"==typeof a.default?function(e){return typeof e}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":typeof e};t.default="function"==typeof s.default&&"symbol"===u(a.default)?function(e){return"undefined"==typeof e?"undefined":u(e)}:function(e){return e&&"function"==typeof s.default&&e.constructor===s.default&&e!==s.default.prototype?"symbol":"undefined"==typeof e?"undefined":u(e)}},function(e,t,n){n(68),n(66),n(69),n(70),e.exports=n(14).Symbol},function(e,t,n){n(67),n(71),e.exports=n(26).f("iterator")},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t){e.exports=function(){}},function(e,t,n){var r=n(3),i=n(63),a=n(62);e.exports=function(e){return function(t,n,o){var s,u=r(t),l=i(u.length),c=a(o,l);if(e&&n!=n){for(;l>c;)if(s=u[c++],s!=s)return!0}else for(;l>c;c++)if((e||c in u)&&u[c]===n)return e||c||0;return!e&&-1}}},function(e,t,n){var r=n(45);e.exports=function(e,t,n){if(r(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,r){return e.call(t,n,r)};case 3:return function(n,r,i){return e.call(t,n,r,i)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var r=n(11),i=n(35),a=n(19);e.exports=function(e){var t=r(e),n=i.f;if(n)for(var o,s=n(e),u=a.f,l=0;s.length>l;)u.call(e,o=s[l++])&&t.push(o);return t}},function(e,t,n){e.exports=n(1).document&&document.documentElement},function(e,t,n){var r=n(28);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==r(e)?e.split(""):Object(e)}},function(e,t,n){var r=n(28);e.exports=Array.isArray||function(e){return"Array"==r(e)}},function(e,t,n){"use strict";var r=n(33),i=n(12),a=n(20),o={};n(5)(o,n(7)("iterator"),function(){return this}),e.exports=function(e,t,n){e.prototype=r(o,{next:i(1,n)}),a(e,t+" Iterator")}},function(e,t){e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t,n){var r=n(11),i=n(3);e.exports=function(e,t){for(var n,a=i(e),o=r(a),s=o.length,u=0;s>u;)if(a[n=o[u++]]===t)return n}},function(e,t,n){var r=n(13)("meta"),i=n(10),a=n(2),o=n(6).f,s=0,u=Object.isExtensible||function(){return!0},l=!n(9)(function(){return u(Object.preventExtensions({}))}),c=function(e){o(e,r,{value:{i:"O"+ ++s,w:{}}})},d=function(e,t){if(!i(e))return"symbol"==typeof e?e:("string"==typeof e?"S":"P")+e;if(!a(e,r)){if(!u(e))return"F";if(!t)return"E";c(e)}return e[r].i},f=function(e,t){if(!a(e,r)){if(!u(e))return!0;if(!t)return!1;c(e)}return e[r].w},h=function(e){return l&&p.NEED&&u(e)&&!a(e,r)&&c(e),e},p=e.exports={KEY:r,NEED:!1,fastKey:d,getWeak:f,onFreeze:h}},function(e,t,n){var r=n(6),i=n(8),a=n(11);e.exports=n(4)?Object.defineProperties:function(e,t){i(e);for(var n,o=a(t),s=o.length,u=0;s>u;)r.f(e,n=o[u++],t[n]);return e}},function(e,t,n){var r=n(19),i=n(12),a=n(3),o=n(24),s=n(2),u=n(31),l=Object.getOwnPropertyDescriptor;t.f=n(4)?l:function(e,t){if(e=a(e),t=o(t,!0),u)try{return l(e,t)}catch(e){}if(s(e,t))return i(!r.f.call(e,t),e[t])}},function(e,t,n){var r=n(3),i=n(34).f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return i(e)}catch(e){return o.slice()}};e.exports.f=function(e){return o&&"[object Window]"==a.call(e)?s(e):i(r(e))}},function(e,t,n){var r=n(2),i=n(64),a=n(21)("IE_PROTO"),o=Object.prototype;e.exports=Object.getPrototypeOf||function(e){return e=i(e),r(e,a)?e[a]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?o:null}},function(e,t,n){var r=n(23),i=n(15);e.exports=function(e){return function(t,n){var a,o,s=String(i(t)),u=r(n),l=s.length;return u<0||u>=l?e?"":void 0:(a=s.charCodeAt(u),a<55296||a>56319||u+1===l||(o=s.charCodeAt(u+1))<56320||o>57343?e?s.charAt(u):a:e?s.slice(u,u+2):(a-55296<<10)+(o-56320)+65536)}}},function(e,t,n){var r=n(23),i=Math.max,a=Math.min;e.exports=function(e,t){return e=r(e),e<0?i(e+t,0):a(e,t)}},function(e,t,n){var r=n(23),i=Math.min;e.exports=function(e){return e>0?i(r(e),9007199254740991):0}},function(e,t,n){var r=n(15);e.exports=function(e){return Object(r(e))}},function(e,t,n){"use strict";var r=n(46),i=n(54),a=n(17),o=n(3);e.exports=n(32)(Array,"Array",function(e,t){this._t=o(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,n=this._i++;return!e||n>=e.length?(this._t=void 0,i(1)):"keys"==t?i(0,n):"values"==t?i(0,e[n]):i(0,[n,e[n]])},"values"),a.Arguments=a.Array,r("keys"),r("values"),r("entries")},function(e,t){},function(e,t,n){"use strict";var r=n(61)(!0);n(32)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,n=this._i;return n>=t.length?{value:void 0,done:!0}:(e=r(t,n),this._i+=e.length,{value:e,done:!1})})},function(e,t,n){"use strict";var r=n(1),i=n(2),a=n(4),o=n(30),s=n(37),u=n(56).KEY,l=n(9),c=n(22),d=n(20),f=n(13),h=n(7),p=n(26),b=n(25),g=n(55),y=n(49),v=n(52),m=n(8),D=n(3),M=n(24),w=n(12),S=n(33),x=n(59),k=n(58),O=n(6),F=n(11),T=k.f,Y=O.f,j=x.f,A=r.Symbol,J=r.JSON,N=J&&J.stringify,_="prototype",C=h("_hidden"),P=h("toPrimitive"),E={}.propertyIsEnumerable,L=c("symbol-registry"),I=c("symbols"),V=c("op-symbols"),z=Object[_],B="function"==typeof A,R=r.QObject,$=!R||!R[_]||!R[_].findChild,G=a&&l(function(){return 7!=S(Y({},"a",{get:function(){return Y(this,"a",{value:7}).a}})).a})?function(e,t,n){var r=T(z,t);r&&delete z[t],Y(e,t,n),r&&e!==z&&Y(z,t,r)}:Y,H=function(e){var t=I[e]=S(A[_]);return t._k=e,t},W=B&&"symbol"==typeof A.iterator?function(e){return"symbol"==typeof e}:function(e){return e instanceof A},K=function(e,t,n){return e===z&&K(V,t,n),m(e),t=M(t,!0),m(n),i(I,t)?(n.enumerable?(i(e,C)&&e[C][t]&&(e[C][t]=!1),n=S(n,{enumerable:w(0,!1)})):(i(e,C)||Y(e,C,w(1,{})),e[C][t]=!0),G(e,t,n)):Y(e,t,n)},U=function(e,t){m(e);for(var n,r=y(t=D(t)),i=0,a=r.length;a>i;)K(e,n=r[i++],t[n]);return e},Q=function(e,t){return void 0===t?S(e):U(S(e),t)},X=function(e){var t=E.call(this,e=M(e,!0));return!(this===z&&i(I,e)&&!i(V,e))&&(!(t||!i(this,e)||!i(I,e)||i(this,C)&&this[C][e])||t)},q=function(e,t){if(e=D(e),t=M(t,!0),e!==z||!i(I,t)||i(V,t)){var n=T(e,t);return!n||!i(I,t)||i(e,C)&&e[C][t]||(n.enumerable=!0),n}},Z=function(e){for(var t,n=j(D(e)),r=[],a=0;n.length>a;)i(I,t=n[a++])||t==C||t==u||r.push(t);
return r},ee=function(e){for(var t,n=e===z,r=j(n?V:D(e)),a=[],o=0;r.length>o;)!i(I,t=r[o++])||n&&!i(z,t)||a.push(I[t]);return a};B||(A=function(){if(this instanceof A)throw TypeError("Symbol is not a constructor!");var e=f(arguments.length>0?arguments[0]:void 0),t=function(n){this===z&&t.call(V,n),i(this,C)&&i(this[C],e)&&(this[C][e]=!1),G(this,e,w(1,n))};return a&&$&&G(z,e,{configurable:!0,set:t}),H(e)},s(A[_],"toString",function(){return this._k}),k.f=q,O.f=K,n(34).f=x.f=Z,n(19).f=X,n(35).f=ee,a&&!n(18)&&s(z,"propertyIsEnumerable",X,!0),p.f=function(e){return H(h(e))}),o(o.G+o.W+o.F*!B,{Symbol:A});for(var te="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ne=0;te.length>ne;)h(te[ne++]);for(var te=F(h.store),ne=0;te.length>ne;)b(te[ne++]);o(o.S+o.F*!B,"Symbol",{for:function(e){return i(L,e+="")?L[e]:L[e]=A(e)},keyFor:function(e){if(W(e))return g(L,e);throw TypeError(e+" is not a symbol!")},useSetter:function(){$=!0},useSimple:function(){$=!1}}),o(o.S+o.F*!B,"Object",{create:Q,defineProperty:K,defineProperties:U,getOwnPropertyDescriptor:q,getOwnPropertyNames:Z,getOwnPropertySymbols:ee}),J&&o(o.S+o.F*(!B||l(function(){var e=A();return"[null]"!=N([e])||"{}"!=N({a:e})||"{}"!=N(Object(e))})),"JSON",{stringify:function(e){if(void 0!==e&&!W(e)){for(var t,n,r=[e],i=1;arguments.length>i;)r.push(arguments[i++]);return t=r[1],"function"==typeof t&&(n=t),!n&&v(t)||(t=function(e,t){if(n&&(t=n.call(this,e,t)),!W(t))return t}),r[1]=t,N.apply(J,r)}}}),A[_][P]||n(5)(A[_],P,A[_].valueOf),d(A,"Symbol"),d(Math,"Math",!0),d(r.JSON,"JSON",!0)},function(e,t,n){n(25)("asyncIterator")},function(e,t,n){n(25)("observable")},function(e,t,n){n(65);for(var r=n(1),i=n(5),a=n(17),o=n(7)("toStringTag"),s=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],u=0;u<5;u++){var l=s[u],c=r[l],d=c&&c.prototype;d&&!d[o]&&i(d,o,l),a[l]=a.Array}},function(e,t,n){t=e.exports=n(73)(),t.push([e.id,'.datepicker{position:relative}.datepicker *{box-sizing:border-box}.calendar{position:absolute;z-index:100;background:#fff;width:300px;border:1px solid #ccc}.calendar header{display:block;line-height:40px}.calendar header span{display:inline-block;text-align:center;width:71.42857142857143%;float:left}.calendar header .next,.calendar header .prev{width:14.285714285714286%;float:left;text-indent:-10000px;position:relative}.calendar header .next:after,.calendar header .prev:after{content:"";position:absolute;left:50%;top:50%;-webkit-transform:translateX(-50%) translateY(-50%);transform:translateX(-50%) translateY(-50%);border:6px solid transparent}.calendar header .prev:after{border-right:10px solid #000;margin-left:-5px}.calendar header .prev.disabled:after{border-right:10px solid #ddd}.calendar header .next:after{border-left:10px solid #000;margin-left:5px}.calendar header .next.disabled:after{border-left:10px solid #ddd}.calendar header .next:not(.disabled),.calendar header .prev:not(.disabled),.calendar header .up:not(.disabled){cursor:pointer}.calendar header .next:not(.disabled):hover,.calendar header .prev:not(.disabled):hover,.calendar header .up:not(.disabled):hover{background:#eee}.calendar .disabled{color:#ddd;cursor:default}.calendar .cell{display:inline-block;padding:0 5px;width:14.285714285714286%;height:40px;line-height:40px;text-align:center;vertical-align:middle;border:1px solid transparent}.calendar .cell:not(.blank):not(.disabled).day,.calendar .cell:not(.blank):not(.disabled).month,.calendar .cell:not(.blank):not(.disabled).year{cursor:pointer}.calendar .cell:not(.blank):not(.disabled).day:hover,.calendar .cell:not(.blank):not(.disabled).month:hover,.calendar .cell:not(.blank):not(.disabled).year:hover{border:1px solid #4bd}.calendar .cell.selected,.calendar .cell.selected.highlighted,.calendar .cell.selected:hover{background:#4bd}.calendar .cell.highlighted{background:#cae5ed}.calendar .cell.grey{color:#888}.calendar .cell.grey:hover{background:inherit}.calendar .cell.day-header{font-size:75%;white-space:no-wrap;cursor:inherit}.calendar .cell.day-header:hover{background:inherit}.calendar .month,.calendar .year{width:33.333%}.datepicker-clear-button{cursor:pointer;font-style:normal}',""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var a=this[i][0];"number"==typeof a&&(r[a]=!0)}for(i=0;i<t.length;i++){var o=t[i];"number"==typeof o[0]&&r[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(e,t){e.exports=' <div class=datepicker :class=wrapperClass> <input :type="inline ? \'hidden\' : \'text\'" :class=inputClass :name=name :id=id @click=showCalendar() :value=formattedValue :placeholder=placeholder :clear-button=clearButton readonly=readonly> <i class=datepicker-clear-button v-if=clearButton @click=clearDate()>&times;</i> <div class=calendar v-show=showDayView v-bind:style=calendarStyle> <header> <span @click=previousMonth class=prev v-bind:class="{ \'disabled\' : previousMonthDisabled(currDate) }">&lt;</span> <span @click=showMonthCalendar class=up>{{ currMonthName }} {{ currYear }}</span> <span @click=nextMonth class=next v-bind:class="{ \'disabled\' : nextMonthDisabled(currDate) }">&gt;</span> </header> <span class="cell day-header" v-for="d in daysOfWeek">{{ d }}</span> <span class="cell day blank" v-for="d in blankDays"></span><span class="cell day" v-for="day in days" track-by=timestamp v-bind:class="{ \'selected\':day.isSelected, \'disabled\':day.isDisabled, \'highlighted\': day.isHighlighted}" @click=selectDate(day)>{{ day.date }}</span> </div> <div class=calendar v-show=showMonthView v-bind:style=calendarStyleSecondary> <header> <span @click=previousYear class=prev v-bind:class="{ \'disabled\' : previousYearDisabled(currDate) }">&lt;</span> <span @click=showYearCalendar class=up>{{ getYear() }}</span> <span @click=nextYear class=next v-bind:class="{ \'disabled\' : nextYearDisabled(currDate) }">&gt;</span> </header> <span class="cell month" v-for="month in months" track-by=timestamp v-bind:class="{ \'selected\': month.isSelected, \'disabled\': month.isDisabled }" @click.stop=selectMonth(month)>{{ month.month }}</span> </div> <div class=calendar v-show=showYearView v-bind:style=calendarStyleSecondary> <header> <span @click=previousDecade class=prev v-bind:class="{ \'disabled\' : previousDecadeDisabled(currDate) }">&lt;</span> <span>{{ getDecade() }}</span> <span @click=nextDecade class=next v-bind:class="{ \'disabled\' : nextMonthDisabled(currDate) }">&gt;</span> </header> <span class="cell year" v-for="year in years" track-by=timestamp v-bind:class="{ \'selected\': year.isSelected, \'disabled\': year.isDisabled }" @click.stop=selectYear(year)>{{ year.year }}</span> </div> </div> '},function(e,t,n){var r,i,a={};n(77),r=n(39),i=n(74),e.exports=r||{},e.exports.__esModule&&(e.exports=e.exports.default);var o="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;i&&(o.template=i),o.computed||(o.computed={}),Object.keys(a).forEach(function(e){var t=a[e];o.computed[e]=function(){return t}})},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=d[r.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](r.parts[a]);for(;a<r.parts.length;a++)i.parts.push(u(r.parts[a],t))}else{for(var o=[],a=0;a<r.parts.length;a++)o.push(u(r.parts[a],t));d[r.id]={id:r.id,refs:1,parts:o}}}}function i(e){for(var t=[],n={},r=0;r<e.length;r++){var i=e[r],a=i[0],o=i[1],s=i[2],u=i[3],l={css:o,media:s,sourceMap:u};n[a]?n[a].parts.push(l):t.push(n[a]={id:a,parts:[l]})}return t}function a(e,t){var n=p(),r=y[y.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),y.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function o(e){e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",a(e,t),t}function u(e,t){var n,r,i;if(t.singleton){var a=g++;n=b||(b=s(t)),r=l.bind(null,n,a,!1),i=l.bind(null,n,a,!0)}else n=s(t),r=c.bind(null,n),i=function(){o(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}function l(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=v(t,i);else{var a=document.createTextNode(i),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(a,o[t]):e.appendChild(a)}}function c(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var d={},f=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},h=f(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),p=f(function(){return document.head||document.getElementsByTagName("head")[0]}),b=null,g=0,y=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=h()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=i(e);return r(n,t),function(e){for(var a=[],o=0;o<n.length;o++){var s=n[o],u=d[s.id];u.refs--,a.push(u)}if(e){var l=i(e);r(l,t)}for(var o=0;o<a.length;o++){var u=a[o];if(0===u.refs){for(var c=0;c<u.parts.length;c++)u.parts[c]();delete d[u.id]}}}};var v=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){var r=n(72);"string"==typeof r&&(r=[[e.id,r,""]]);n(76)(r,{});r.locals&&(e.exports=r.locals)}]);
//# sourceMappingURL=build.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(275)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(277),
  /* template */
  __webpack_require__(278),
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
/* 14 */,
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
  * vue-router v2.7.0
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
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
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
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
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

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also regiseter instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
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
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var val = extraQuery[key];
    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
  }
  return parsedQuery
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
      val.forEach(function (val2) {
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
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
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

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
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
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
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
    exactActiveClass: String,
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
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
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
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
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

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
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
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
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

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

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

      if (index$1(value)) {
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
  if (!index$1(keys)) {
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
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (index$1(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

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
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var normalizedPath = normalizePath(path, parent);
  var pathToRegexpOptions = route.pathToRegexpOptions || {};

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
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
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
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
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = index(path, [], pathToRegexpOptions);
  if (true) {
    var keys = {};
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
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
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

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


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
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
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
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
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
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
      if (true) {
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
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
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
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
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

  if (true) {
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
        var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
        offset = normalizeOffset(offset);
        position = getElementPosition(el, offset);
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

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
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

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
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

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (resolvedDef.__esModule && resolvedDef.default) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
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
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
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
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
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
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
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
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
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
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
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
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
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
      var current = this$1.current;
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
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

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
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
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  window.location.replace((base + "#" + path));
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
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
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
      if (true) {
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

  "development" !== 'production' && assert(
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
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
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
    ? to.matched
      ? to
      : this.resolve(to).route
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
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
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

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.7.0';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);


/***/ }),
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
/* 136 */,
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(212),
  /* template */
  __webpack_require__(216),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/OneBid.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] OneBid.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-185ee12c", Component.options)
  } else {
    hotAPI.reload("data-v-185ee12c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(257),
  /* template */
  __webpack_require__(258),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/ItemsBlock.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(314),
  /* template */
  __webpack_require__(324),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/Profile.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(141);
module.exports = __webpack_require__(423);


/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App_vue__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__App_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_store__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes__ = __webpack_require__(245);

/**
 * Bootstrap the application
 */
__webpack_require__(142);
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
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_filters__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_classes_BootstrapBreakpoints__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pusher_js__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_pusher_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_pusher_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_laravel_echo__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_laravel_echo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_laravel_echo__);
/**
 * Load in vue
 */
window.Vue = __webpack_require__(11);

/**
 * Tell vue to use the first-package vue-router
 */

Vue.use(__WEBPACK_IMPORTED_MODULE_0_vue_router__["a" /* default */]);

/**
 * Global Vue components and Prototypes
 */
Vue.component('app-hero', __webpack_require__(144));
Vue.component('app-loading', __webpack_require__(147));


Vue.prototype.filters = __WEBPACK_IMPORTED_MODULE_1__includes_filters__["a" /* default */];

/**
 *  Load in Moment.js
 */
window.moment = __webpack_require__(0);
window.moment.locale('sv');

/**
 * Load in Axios HTTP framework.
 */
window.axios = __webpack_require__(131);

window.axios.defaults.baseURL = 'http://bidder.dev/api/v1/';
window.axios.defaults.headers.common = {
  'X-CSRF-TOKEN': window.Laravel.csrfToken,
  'X-Requested-With': 'XMLHttpRequest'
};

/**
 * Object to handle Twitter bootstrap breakpoints
 */

window.breakpoints = new __WEBPACK_IMPORTED_MODULE_2__includes_classes_BootstrapBreakpoints__["a" /* default */]();

/**
 * Instanciate Laravel Echo for realtime
 */


window.Echo = new __WEBPACK_IMPORTED_MODULE_4_laravel_echo___default.a({
  broadcaster: 'pusher',
  key: 'c747553af39377b20bf7',
  cluster: 'eu',
  ecrypted: true,
  namespace: 'App.Events'
});

/***/ }),
/* 143 */,
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(145),
  /* template */
  __webpack_require__(146),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Hero.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 145 */
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 146 */
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
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(148),
  /* template */
  __webpack_require__(149),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Loading.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 148 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		bg: {
			type: String,
			default: "white"
		}
	}
});

/***/ }),
/* 149 */
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
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var filters = {
	currency: function currency(value) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ").replace('.', ',') + ' kr';
	},
	commaSeparator: function commaSeparator(value) {
		return value.toString().replace('.', ',');
	},
	date: function date(value) {
		return moment(value).format('D MMM YYYY');
	},
	time: function time(value) {
		return moment(value).format('D MMM YYYY HH:mm');
	}
};

/* harmony default export */ __webpack_exports__["a"] = (filters);

/***/ }),
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BootstrapBreakpoints = function () {
	function BootstrapBreakpoints() {
		_classCallCheck(this, BootstrapBreakpoints);

		this._update();

		window.onresize = function () {
			this._update();
		}.bind(this);
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
			var breakpoints = document.querySelectorAll('#detect-breakpoints span');
			for (var i = 0; i < breakpoints.length; i++) {
				if (breakpoints[i].offsetParent !== null) {
					return breakpoints[i].classList[0].replace('device-', '');
				}
			}
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

/* harmony default export */ __webpack_exports__["a"] = (BootstrapBreakpoints);

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Pusher JavaScript Library v4.1.0
 * https://pusher.com/
 *
 * Copyright 2017, Pusher
 * Released under the MIT licence.
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Pusher"] = factory();
	else
		root["Pusher"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var pusher_1 = __webpack_require__(1);
	module.exports = pusher_1["default"];


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var runtime_1 = __webpack_require__(2);
	var Collections = __webpack_require__(9);
	var dispatcher_1 = __webpack_require__(23);
	var timeline_1 = __webpack_require__(38);
	var level_1 = __webpack_require__(39);
	var StrategyBuilder = __webpack_require__(40);
	var timers_1 = __webpack_require__(12);
	var defaults_1 = __webpack_require__(5);
	var DefaultConfig = __webpack_require__(62);
	var logger_1 = __webpack_require__(8);
	var factory_1 = __webpack_require__(42);
	var Pusher = (function () {
	    function Pusher(app_key, options) {
	        var _this = this;
	        checkAppKey(app_key);
	        options = options || {};
	        this.key = app_key;
	        this.config = Collections.extend(DefaultConfig.getGlobalConfig(), options.cluster ? DefaultConfig.getClusterConfig(options.cluster) : {}, options);
	        this.channels = factory_1["default"].createChannels();
	        this.global_emitter = new dispatcher_1["default"]();
	        this.sessionID = Math.floor(Math.random() * 1000000000);
	        this.timeline = new timeline_1["default"](this.key, this.sessionID, {
	            cluster: this.config.cluster,
	            features: Pusher.getClientFeatures(),
	            params: this.config.timelineParams || {},
	            limit: 50,
	            level: level_1["default"].INFO,
	            version: defaults_1["default"].VERSION
	        });
	        if (!this.config.disableStats) {
	            this.timelineSender = factory_1["default"].createTimelineSender(this.timeline, {
	                host: this.config.statsHost,
	                path: "/timeline/v2/" + runtime_1["default"].TimelineTransport.name
	            });
	        }
	        var getStrategy = function (options) {
	            var config = Collections.extend({}, _this.config, options);
	            return StrategyBuilder.build(runtime_1["default"].getDefaultStrategy(config), config);
	        };
	        this.connection = factory_1["default"].createConnectionManager(this.key, Collections.extend({ getStrategy: getStrategy,
	            timeline: this.timeline,
	            activityTimeout: this.config.activity_timeout,
	            pongTimeout: this.config.pong_timeout,
	            unavailableTimeout: this.config.unavailable_timeout
	        }, this.config, { encrypted: this.isEncrypted() }));
	        this.connection.bind('connected', function () {
	            _this.subscribeAll();
	            if (_this.timelineSender) {
	                _this.timelineSender.send(_this.connection.isEncrypted());
	            }
	        });
	        this.connection.bind('message', function (params) {
	            var internal = (params.event.indexOf('pusher_internal:') === 0);
	            if (params.channel) {
	                var channel = _this.channel(params.channel);
	                if (channel) {
	                    channel.handleEvent(params.event, params.data);
	                }
	            }
	            if (!internal) {
	                _this.global_emitter.emit(params.event, params.data);
	            }
	        });
	        this.connection.bind('connecting', function () {
	            _this.channels.disconnect();
	        });
	        this.connection.bind('disconnected', function () {
	            _this.channels.disconnect();
	        });
	        this.connection.bind('error', function (err) {
	            logger_1["default"].warn('Error', err);
	        });
	        Pusher.instances.push(this);
	        this.timeline.info({ instances: Pusher.instances.length });
	        if (Pusher.isReady) {
	            this.connect();
	        }
	    }
	    Pusher.ready = function () {
	        Pusher.isReady = true;
	        for (var i = 0, l = Pusher.instances.length; i < l; i++) {
	            Pusher.instances[i].connect();
	        }
	    };
	    Pusher.log = function (message) {
	        if (Pusher.logToConsole && (window).console && (window).console.log) {
	            (window).console.log(message);
	        }
	    };
	    Pusher.getClientFeatures = function () {
	        return Collections.keys(Collections.filterObject({ "ws": runtime_1["default"].Transports.ws }, function (t) { return t.isSupported({}); }));
	    };
	    Pusher.prototype.channel = function (name) {
	        return this.channels.find(name);
	    };
	    Pusher.prototype.allChannels = function () {
	        return this.channels.all();
	    };
	    Pusher.prototype.connect = function () {
	        this.connection.connect();
	        if (this.timelineSender) {
	            if (!this.timelineSenderTimer) {
	                var encrypted = this.connection.isEncrypted();
	                var timelineSender = this.timelineSender;
	                this.timelineSenderTimer = new timers_1.PeriodicTimer(60000, function () {
	                    timelineSender.send(encrypted);
	                });
	            }
	        }
	    };
	    Pusher.prototype.disconnect = function () {
	        this.connection.disconnect();
	        if (this.timelineSenderTimer) {
	            this.timelineSenderTimer.ensureAborted();
	            this.timelineSenderTimer = null;
	        }
	    };
	    Pusher.prototype.bind = function (event_name, callback, context) {
	        this.global_emitter.bind(event_name, callback, context);
	        return this;
	    };
	    Pusher.prototype.unbind = function (event_name, callback, context) {
	        this.global_emitter.unbind(event_name, callback, context);
	        return this;
	    };
	    Pusher.prototype.bind_global = function (callback) {
	        this.global_emitter.bind_global(callback);
	        return this;
	    };
	    Pusher.prototype.unbind_global = function (callback) {
	        this.global_emitter.unbind_global(callback);
	        return this;
	    };
	    Pusher.prototype.unbind_all = function (callback) {
	        this.global_emitter.unbind_all();
	        return this;
	    };
	    Pusher.prototype.subscribeAll = function () {
	        var channelName;
	        for (channelName in this.channels.channels) {
	            if (this.channels.channels.hasOwnProperty(channelName)) {
	                this.subscribe(channelName);
	            }
	        }
	    };
	    Pusher.prototype.subscribe = function (channel_name) {
	        var channel = this.channels.add(channel_name, this);
	        if (channel.subscriptionPending && channel.subscriptionCancelled) {
	            channel.reinstateSubscription();
	        }
	        else if (!channel.subscriptionPending && this.connection.state === "connected") {
	            channel.subscribe();
	        }
	        return channel;
	    };
	    Pusher.prototype.unsubscribe = function (channel_name) {
	        var channel = this.channels.find(channel_name);
	        if (channel && channel.subscriptionPending) {
	            channel.cancelSubscription();
	        }
	        else {
	            channel = this.channels.remove(channel_name);
	            if (channel && this.connection.state === "connected") {
	                channel.unsubscribe();
	            }
	        }
	    };
	    Pusher.prototype.send_event = function (event_name, data, channel) {
	        return this.connection.send_event(event_name, data, channel);
	    };
	    Pusher.prototype.isEncrypted = function () {
	        if (runtime_1["default"].getProtocol() === "https:") {
	            return true;
	        }
	        else {
	            return Boolean(this.config.encrypted);
	        }
	    };
	    Pusher.instances = [];
	    Pusher.isReady = false;
	    Pusher.logToConsole = false;
	    Pusher.Runtime = runtime_1["default"];
	    Pusher.ScriptReceivers = runtime_1["default"].ScriptReceivers;
	    Pusher.DependenciesReceivers = runtime_1["default"].DependenciesReceivers;
	    Pusher.auth_callbacks = runtime_1["default"].auth_callbacks;
	    return Pusher;
	}());
	exports.__esModule = true;
	exports["default"] = Pusher;
	function checkAppKey(key) {
	    if (key === null || key === undefined) {
	        throw "You must pass your app key when you instantiate Pusher.";
	    }
	}
	runtime_1["default"].setup(Pusher);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var dependencies_1 = __webpack_require__(3);
	var xhr_auth_1 = __webpack_require__(7);
	var jsonp_auth_1 = __webpack_require__(14);
	var script_request_1 = __webpack_require__(15);
	var jsonp_request_1 = __webpack_require__(16);
	var script_receiver_factory_1 = __webpack_require__(4);
	var jsonp_timeline_1 = __webpack_require__(17);
	var transports_1 = __webpack_require__(18);
	var net_info_1 = __webpack_require__(25);
	var default_strategy_1 = __webpack_require__(26);
	var transport_connection_initializer_1 = __webpack_require__(27);
	var http_1 = __webpack_require__(28);
	var Runtime = {
	    nextAuthCallbackID: 1,
	    auth_callbacks: {},
	    ScriptReceivers: script_receiver_factory_1.ScriptReceivers,
	    DependenciesReceivers: dependencies_1.DependenciesReceivers,
	    getDefaultStrategy: default_strategy_1["default"],
	    Transports: transports_1["default"],
	    transportConnectionInitializer: transport_connection_initializer_1["default"],
	    HTTPFactory: http_1["default"],
	    TimelineTransport: jsonp_timeline_1["default"],
	    getXHRAPI: function () {
	        return window.XMLHttpRequest;
	    },
	    getWebSocketAPI: function () {
	        return window.WebSocket || window.MozWebSocket;
	    },
	    setup: function (PusherClass) {
	        var _this = this;
	        window.Pusher = PusherClass;
	        var initializeOnDocumentBody = function () {
	            _this.onDocumentBody(PusherClass.ready);
	        };
	        if (!window.JSON) {
	            dependencies_1.Dependencies.load("json2", {}, initializeOnDocumentBody);
	        }
	        else {
	            initializeOnDocumentBody();
	        }
	    },
	    getDocument: function () {
	        return document;
	    },
	    getProtocol: function () {
	        return this.getDocument().location.protocol;
	    },
	    getAuthorizers: function () {
	        return { ajax: xhr_auth_1["default"], jsonp: jsonp_auth_1["default"] };
	    },
	    onDocumentBody: function (callback) {
	        var _this = this;
	        if (document.body) {
	            callback();
	        }
	        else {
	            setTimeout(function () {
	                _this.onDocumentBody(callback);
	            }, 0);
	        }
	    },
	    createJSONPRequest: function (url, data) {
	        return new jsonp_request_1["default"](url, data);
	    },
	    createScriptRequest: function (src) {
	        return new script_request_1["default"](src);
	    },
	    getLocalStorage: function () {
	        try {
	            return window.localStorage;
	        }
	        catch (e) {
	            return undefined;
	        }
	    },
	    createXHR: function () {
	        if (this.getXHRAPI()) {
	            return this.createXMLHttpRequest();
	        }
	        else {
	            return this.createMicrosoftXHR();
	        }
	    },
	    createXMLHttpRequest: function () {
	        var Constructor = this.getXHRAPI();
	        return new Constructor();
	    },
	    createMicrosoftXHR: function () {
	        return new ActiveXObject("Microsoft.XMLHTTP");
	    },
	    getNetwork: function () {
	        return net_info_1.Network;
	    },
	    createWebSocket: function (url) {
	        var Constructor = this.getWebSocketAPI();
	        return new Constructor(url);
	    },
	    createSocketRequest: function (method, url) {
	        if (this.isXHRSupported()) {
	            return this.HTTPFactory.createXHR(method, url);
	        }
	        else if (this.isXDRSupported(url.indexOf("https:") === 0)) {
	            return this.HTTPFactory.createXDR(method, url);
	        }
	        else {
	            throw "Cross-origin HTTP requests are not supported";
	        }
	    },
	    isXHRSupported: function () {
	        var Constructor = this.getXHRAPI();
	        return Boolean(Constructor) && (new Constructor()).withCredentials !== undefined;
	    },
	    isXDRSupported: function (encrypted) {
	        var protocol = encrypted ? "https:" : "http:";
	        var documentProtocol = this.getProtocol();
	        return Boolean((window['XDomainRequest'])) && documentProtocol === protocol;
	    },
	    addUnloadListener: function (listener) {
	        if (window.addEventListener !== undefined) {
	            window.addEventListener("unload", listener, false);
	        }
	        else if (window.attachEvent !== undefined) {
	            window.attachEvent("onunload", listener);
	        }
	    },
	    removeUnloadListener: function (listener) {
	        if (window.addEventListener !== undefined) {
	            window.removeEventListener("unload", listener, false);
	        }
	        else if (window.detachEvent !== undefined) {
	            window.detachEvent("onunload", listener);
	        }
	    }
	};
	exports.__esModule = true;
	exports["default"] = Runtime;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var script_receiver_factory_1 = __webpack_require__(4);
	var defaults_1 = __webpack_require__(5);
	var dependency_loader_1 = __webpack_require__(6);
	exports.DependenciesReceivers = new script_receiver_factory_1.ScriptReceiverFactory("_pusher_dependencies", "Pusher.DependenciesReceivers");
	exports.Dependencies = new dependency_loader_1["default"]({
	    cdn_http: defaults_1["default"].cdn_http,
	    cdn_https: defaults_1["default"].cdn_https,
	    version: defaults_1["default"].VERSION,
	    suffix: defaults_1["default"].dependency_suffix,
	    receivers: exports.DependenciesReceivers
	});


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	var ScriptReceiverFactory = (function () {
	    function ScriptReceiverFactory(prefix, name) {
	        this.lastId = 0;
	        this.prefix = prefix;
	        this.name = name;
	    }
	    ScriptReceiverFactory.prototype.create = function (callback) {
	        this.lastId++;
	        var number = this.lastId;
	        var id = this.prefix + number;
	        var name = this.name + "[" + number + "]";
	        var called = false;
	        var callbackWrapper = function () {
	            if (!called) {
	                callback.apply(null, arguments);
	                called = true;
	            }
	        };
	        this[number] = callbackWrapper;
	        return { number: number, id: id, name: name, callback: callbackWrapper };
	    };
	    ScriptReceiverFactory.prototype.remove = function (receiver) {
	        delete this[receiver.number];
	    };
	    return ScriptReceiverFactory;
	}());
	exports.ScriptReceiverFactory = ScriptReceiverFactory;
	exports.ScriptReceivers = new ScriptReceiverFactory("_pusher_script_", "Pusher.ScriptReceivers");


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	var Defaults = {
	    VERSION: "4.1.0",
	    PROTOCOL: 7,
	    host: 'ws.pusherapp.com',
	    ws_port: 80,
	    wss_port: 443,
	    sockjs_host: 'sockjs.pusher.com',
	    sockjs_http_port: 80,
	    sockjs_https_port: 443,
	    sockjs_path: "/pusher",
	    stats_host: 'stats.pusher.com',
	    channel_auth_endpoint: '/pusher/auth',
	    channel_auth_transport: 'ajax',
	    activity_timeout: 120000,
	    pong_timeout: 30000,
	    unavailable_timeout: 10000,
	    cdn_http: 'http://js.pusher.com',
	    cdn_https: 'https://js.pusher.com',
	    dependency_suffix: ''
	};
	exports.__esModule = true;
	exports["default"] = Defaults;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var script_receiver_factory_1 = __webpack_require__(4);
	var runtime_1 = __webpack_require__(2);
	var DependencyLoader = (function () {
	    function DependencyLoader(options) {
	        this.options = options;
	        this.receivers = options.receivers || script_receiver_factory_1.ScriptReceivers;
	        this.loading = {};
	    }
	    DependencyLoader.prototype.load = function (name, options, callback) {
	        var self = this;
	        if (self.loading[name] && self.loading[name].length > 0) {
	            self.loading[name].push(callback);
	        }
	        else {
	            self.loading[name] = [callback];
	            var request = runtime_1["default"].createScriptRequest(self.getPath(name, options));
	            var receiver = self.receivers.create(function (error) {
	                self.receivers.remove(receiver);
	                if (self.loading[name]) {
	                    var callbacks = self.loading[name];
	                    delete self.loading[name];
	                    var successCallback = function (wasSuccessful) {
	                        if (!wasSuccessful) {
	                            request.cleanup();
	                        }
	                    };
	                    for (var i = 0; i < callbacks.length; i++) {
	                        callbacks[i](error, successCallback);
	                    }
	                }
	            });
	            request.send(receiver);
	        }
	    };
	    DependencyLoader.prototype.getRoot = function (options) {
	        var cdn;
	        var protocol = runtime_1["default"].getDocument().location.protocol;
	        if ((options && options.encrypted) || protocol === "https:") {
	            cdn = this.options.cdn_https;
	        }
	        else {
	            cdn = this.options.cdn_http;
	        }
	        return cdn.replace(/\/*$/, "") + "/" + this.options.version;
	    };
	    DependencyLoader.prototype.getPath = function (name, options) {
	        return this.getRoot(options) + '/' + name + this.options.suffix + '.js';
	    };
	    ;
	    return DependencyLoader;
	}());
	exports.__esModule = true;
	exports["default"] = DependencyLoader;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var logger_1 = __webpack_require__(8);
	var runtime_1 = __webpack_require__(2);
	var ajax = function (context, socketId, callback) {
	    var self = this, xhr;
	    xhr = runtime_1["default"].createXHR();
	    xhr.open("POST", self.options.authEndpoint, true);
	    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    for (var headerName in this.authOptions.headers) {
	        xhr.setRequestHeader(headerName, this.authOptions.headers[headerName]);
	    }
	    xhr.onreadystatechange = function () {
	        if (xhr.readyState === 4) {
	            if (xhr.status === 200) {
	                var data, parsed = false;
	                try {
	                    data = JSON.parse(xhr.responseText);
	                    parsed = true;
	                }
	                catch (e) {
	                    callback(true, 'JSON returned from webapp was invalid, yet status code was 200. Data was: ' + xhr.responseText);
	                }
	                if (parsed) {
	                    callback(false, data);
	                }
	            }
	            else {
	                logger_1["default"].warn("Couldn't get auth info from your webapp", xhr.status);
	                callback(true, xhr.status);
	            }
	        }
	    };
	    xhr.send(this.composeQuery(socketId));
	    return xhr;
	};
	exports.__esModule = true;
	exports["default"] = ajax;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var collections_1 = __webpack_require__(9);
	var pusher_1 = __webpack_require__(1);
	var Logger = {
	    debug: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        if (!pusher_1["default"].log) {
	            return;
	        }
	        pusher_1["default"].log(collections_1.stringify.apply(this, arguments));
	    },
	    warn: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i - 0] = arguments[_i];
	        }
	        var message = collections_1.stringify.apply(this, arguments);
	        if ((window).console) {
	            if ((window).console.warn) {
	                (window).console.warn(message);
	            }
	            else if ((window).console.log) {
	                (window).console.log(message);
	            }
	        }
	        if (pusher_1["default"].log) {
	            pusher_1["default"].log(message);
	        }
	    }
	};
	exports.__esModule = true;
	exports["default"] = Logger;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var base64_1 = __webpack_require__(10);
	var util_1 = __webpack_require__(11);
	function extend(target) {
	    var sources = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        sources[_i - 1] = arguments[_i];
	    }
	    for (var i = 0; i < sources.length; i++) {
	        var extensions = sources[i];
	        for (var property in extensions) {
	            if (extensions[property] && extensions[property].constructor &&
	                extensions[property].constructor === Object) {
	                target[property] = extend(target[property] || {}, extensions[property]);
	            }
	            else {
	                target[property] = extensions[property];
	            }
	        }
	    }
	    return target;
	}
	exports.extend = extend;
	function stringify() {
	    var m = ["Pusher"];
	    for (var i = 0; i < arguments.length; i++) {
	        if (typeof arguments[i] === "string") {
	            m.push(arguments[i]);
	        }
	        else {
	            m.push(safeJSONStringify(arguments[i]));
	        }
	    }
	    return m.join(" : ");
	}
	exports.stringify = stringify;
	function arrayIndexOf(array, item) {
	    var nativeIndexOf = Array.prototype.indexOf;
	    if (array === null) {
	        return -1;
	    }
	    if (nativeIndexOf && array.indexOf === nativeIndexOf) {
	        return array.indexOf(item);
	    }
	    for (var i = 0, l = array.length; i < l; i++) {
	        if (array[i] === item) {
	            return i;
	        }
	    }
	    return -1;
	}
	exports.arrayIndexOf = arrayIndexOf;
	function objectApply(object, f) {
	    for (var key in object) {
	        if (Object.prototype.hasOwnProperty.call(object, key)) {
	            f(object[key], key, object);
	        }
	    }
	}
	exports.objectApply = objectApply;
	function keys(object) {
	    var keys = [];
	    objectApply(object, function (_, key) {
	        keys.push(key);
	    });
	    return keys;
	}
	exports.keys = keys;
	function values(object) {
	    var values = [];
	    objectApply(object, function (value) {
	        values.push(value);
	    });
	    return values;
	}
	exports.values = values;
	function apply(array, f, context) {
	    for (var i = 0; i < array.length; i++) {
	        f.call(context || (window), array[i], i, array);
	    }
	}
	exports.apply = apply;
	function map(array, f) {
	    var result = [];
	    for (var i = 0; i < array.length; i++) {
	        result.push(f(array[i], i, array, result));
	    }
	    return result;
	}
	exports.map = map;
	function mapObject(object, f) {
	    var result = {};
	    objectApply(object, function (value, key) {
	        result[key] = f(value);
	    });
	    return result;
	}
	exports.mapObject = mapObject;
	function filter(array, test) {
	    test = test || function (value) { return !!value; };
	    var result = [];
	    for (var i = 0; i < array.length; i++) {
	        if (test(array[i], i, array, result)) {
	            result.push(array[i]);
	        }
	    }
	    return result;
	}
	exports.filter = filter;
	function filterObject(object, test) {
	    var result = {};
	    objectApply(object, function (value, key) {
	        if ((test && test(value, key, object, result)) || Boolean(value)) {
	            result[key] = value;
	        }
	    });
	    return result;
	}
	exports.filterObject = filterObject;
	function flatten(object) {
	    var result = [];
	    objectApply(object, function (value, key) {
	        result.push([key, value]);
	    });
	    return result;
	}
	exports.flatten = flatten;
	function any(array, test) {
	    for (var i = 0; i < array.length; i++) {
	        if (test(array[i], i, array)) {
	            return true;
	        }
	    }
	    return false;
	}
	exports.any = any;
	function all(array, test) {
	    for (var i = 0; i < array.length; i++) {
	        if (!test(array[i], i, array)) {
	            return false;
	        }
	    }
	    return true;
	}
	exports.all = all;
	function encodeParamsObject(data) {
	    return mapObject(data, function (value) {
	        if (typeof value === "object") {
	            value = safeJSONStringify(value);
	        }
	        return encodeURIComponent(base64_1["default"](value.toString()));
	    });
	}
	exports.encodeParamsObject = encodeParamsObject;
	function buildQueryString(data) {
	    var params = filterObject(data, function (value) {
	        return value !== undefined;
	    });
	    var query = map(flatten(encodeParamsObject(params)), util_1["default"].method("join", "=")).join("&");
	    return query;
	}
	exports.buildQueryString = buildQueryString;
	function decycleObject(object) {
	    var objects = [], paths = [];
	    return (function derez(value, path) {
	        var i, name, nu;
	        switch (typeof value) {
	            case 'object':
	                if (!value) {
	                    return null;
	                }
	                for (i = 0; i < objects.length; i += 1) {
	                    if (objects[i] === value) {
	                        return { $ref: paths[i] };
	                    }
	                }
	                objects.push(value);
	                paths.push(path);
	                if (Object.prototype.toString.apply(value) === '[object Array]') {
	                    nu = [];
	                    for (i = 0; i < value.length; i += 1) {
	                        nu[i] = derez(value[i], path + '[' + i + ']');
	                    }
	                }
	                else {
	                    nu = {};
	                    for (name in value) {
	                        if (Object.prototype.hasOwnProperty.call(value, name)) {
	                            nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
	                        }
	                    }
	                }
	                return nu;
	            case 'number':
	            case 'string':
	            case 'boolean':
	                return value;
	        }
	    }(object, '$'));
	}
	exports.decycleObject = decycleObject;
	function safeJSONStringify(source) {
	    try {
	        return JSON.stringify(source);
	    }
	    catch (e) {
	        return JSON.stringify(decycleObject(source));
	    }
	}
	exports.safeJSONStringify = safeJSONStringify;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	function encode(s) {
	    return btoa(utob(s));
	}
	exports.__esModule = true;
	exports["default"] = encode;
	var fromCharCode = String.fromCharCode;
	var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	var b64tab = {};
	for (var i = 0, l = b64chars.length; i < l; i++) {
	    b64tab[b64chars.charAt(i)] = i;
	}
	var cb_utob = function (c) {
	    var cc = c.charCodeAt(0);
	    return cc < 0x80 ? c
	        : cc < 0x800 ? fromCharCode(0xc0 | (cc >>> 6)) +
	            fromCharCode(0x80 | (cc & 0x3f))
	            : fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) +
	                fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) +
	                fromCharCode(0x80 | (cc & 0x3f));
	};
	var utob = function (u) {
	    return u.replace(/[^\x00-\x7F]/g, cb_utob);
	};
	var cb_encode = function (ccc) {
	    var padlen = [0, 2, 1][ccc.length % 3];
	    var ord = ccc.charCodeAt(0) << 16
	        | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
	        | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0));
	    var chars = [
	        b64chars.charAt(ord >>> 18),
	        b64chars.charAt((ord >>> 12) & 63),
	        padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
	        padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
	    ];
	    return chars.join('');
	};
	var btoa = (window).btoa || function (b) {
	    return b.replace(/[\s\S]{1,3}/g, cb_encode);
	};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var timers_1 = __webpack_require__(12);
	var Util = {
	    now: function () {
	        if (Date.now) {
	            return Date.now();
	        }
	        else {
	            return new Date().valueOf();
	        }
	    },
	    defer: function (callback) {
	        return new timers_1.OneOffTimer(0, callback);
	    },
	    method: function (name) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var boundArguments = Array.prototype.slice.call(arguments, 1);
	        return function (object) {
	            return object[name].apply(object, boundArguments.concat(arguments));
	        };
	    }
	};
	exports.__esModule = true;
	exports["default"] = Util;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var abstract_timer_1 = __webpack_require__(13);
	function clearTimeout(timer) {
	    (window).clearTimeout(timer);
	}
	function clearInterval(timer) {
	    (window).clearInterval(timer);
	}
	var OneOffTimer = (function (_super) {
	    __extends(OneOffTimer, _super);
	    function OneOffTimer(delay, callback) {
	        _super.call(this, setTimeout, clearTimeout, delay, function (timer) {
	            callback();
	            return null;
	        });
	    }
	    return OneOffTimer;
	}(abstract_timer_1["default"]));
	exports.OneOffTimer = OneOffTimer;
	var PeriodicTimer = (function (_super) {
	    __extends(PeriodicTimer, _super);
	    function PeriodicTimer(delay, callback) {
	        _super.call(this, setInterval, clearInterval, delay, function (timer) {
	            callback();
	            return timer;
	        });
	    }
	    return PeriodicTimer;
	}(abstract_timer_1["default"]));
	exports.PeriodicTimer = PeriodicTimer;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	"use strict";
	var Timer = (function () {
	    function Timer(set, clear, delay, callback) {
	        var _this = this;
	        this.clear = clear;
	        this.timer = set(function () {
	            if (_this.timer) {
	                _this.timer = callback(_this.timer);
	            }
	        }, delay);
	    }
	    Timer.prototype.isRunning = function () {
	        return this.timer !== null;
	    };
	    Timer.prototype.ensureAborted = function () {
	        if (this.timer) {
	            this.clear(this.timer);
	            this.timer = null;
	        }
	    };
	    return Timer;
	}());
	exports.__esModule = true;
	exports["default"] = Timer;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var logger_1 = __webpack_require__(8);
	var jsonp = function (context, socketId, callback) {
	    if (this.authOptions.headers !== undefined) {
	        logger_1["default"].warn("Warn", "To send headers with the auth request, you must use AJAX, rather than JSONP.");
	    }
	    var callbackName = context.nextAuthCallbackID.toString();
	    context.nextAuthCallbackID++;
	    var document = context.getDocument();
	    var script = document.createElement("script");
	    context.auth_callbacks[callbackName] = function (data) {
	        callback(false, data);
	    };
	    var callback_name = "Pusher.auth_callbacks['" + callbackName + "']";
	    script.src = this.options.authEndpoint +
	        '?callback=' +
	        encodeURIComponent(callback_name) +
	        '&' +
	        this.composeQuery(socketId);
	    var head = document.getElementsByTagName("head")[0] || document.documentElement;
	    head.insertBefore(script, head.firstChild);
	};
	exports.__esModule = true;
	exports["default"] = jsonp;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	"use strict";
	var ScriptRequest = (function () {
	    function ScriptRequest(src) {
	        this.src = src;
	    }
	    ScriptRequest.prototype.send = function (receiver) {
	        var self = this;
	        var errorString = "Error loading " + self.src;
	        self.script = document.createElement("script");
	        self.script.id = receiver.id;
	        self.script.src = self.src;
	        self.script.type = "text/javascript";
	        self.script.charset = "UTF-8";
	        if (self.script.addEventListener) {
	            self.script.onerror = function () {
	                receiver.callback(errorString);
	            };
	            self.script.onload = function () {
	                receiver.callback(null);
	            };
	        }
	        else {
	            self.script.onreadystatechange = function () {
	                if (self.script.readyState === 'loaded' ||
	                    self.script.readyState === 'complete') {
	                    receiver.callback(null);
	                }
	            };
	        }
	        if (self.script.async === undefined && document.attachEvent &&
	            /opera/i.test(navigator.userAgent)) {
	            self.errorScript = document.createElement("script");
	            self.errorScript.id = receiver.id + "_error";
	            self.errorScript.text = receiver.name + "('" + errorString + "');";
	            self.script.async = self.errorScript.async = false;
	        }
	        else {
	            self.script.async = true;
	        }
	        var head = document.getElementsByTagName('head')[0];
	        head.insertBefore(self.script, head.firstChild);
	        if (self.errorScript) {
	            head.insertBefore(self.errorScript, self.script.nextSibling);
	        }
	    };
	    ScriptRequest.prototype.cleanup = function () {
	        if (this.script) {
	            this.script.onload = this.script.onerror = null;
	            this.script.onreadystatechange = null;
	        }
	        if (this.script && this.script.parentNode) {
	            this.script.parentNode.removeChild(this.script);
	        }
	        if (this.errorScript && this.errorScript.parentNode) {
	            this.errorScript.parentNode.removeChild(this.errorScript);
	        }
	        this.script = null;
	        this.errorScript = null;
	    };
	    return ScriptRequest;
	}());
	exports.__esModule = true;
	exports["default"] = ScriptRequest;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(9);
	var runtime_1 = __webpack_require__(2);
	var JSONPRequest = (function () {
	    function JSONPRequest(url, data) {
	        this.url = url;
	        this.data = data;
	    }
	    JSONPRequest.prototype.send = function (receiver) {
	        if (this.request) {
	            return;
	        }
	        var query = Collections.buildQueryString(this.data);
	        var url = this.url + "/" + receiver.number + "?" + query;
	        this.request = runtime_1["default"].createScriptRequest(url);
	        this.request.send(receiver);
	    };
	    JSONPRequest.prototype.cleanup = function () {
	        if (this.request) {
	            this.request.cleanup();
	        }
	    };
	    return JSONPRequest;
	}());
	exports.__esModule = true;
	exports["default"] = JSONPRequest;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var runtime_1 = __webpack_require__(2);
	var script_receiver_factory_1 = __webpack_require__(4);
	var getAgent = function (sender, encrypted) {
	    return function (data, callback) {
	        var scheme = "http" + (encrypted ? "s" : "") + "://";
	        var url = scheme + (sender.host || sender.options.host) + sender.options.path;
	        var request = runtime_1["default"].createJSONPRequest(url, data);
	        var receiver = runtime_1["default"].ScriptReceivers.create(function (error, result) {
	            script_receiver_factory_1.ScriptReceivers.remove(receiver);
	            request.cleanup();
	            if (result && result.host) {
	                sender.host = result.host;
	            }
	            if (callback) {
	                callback(error, result);
	            }
	        });
	        request.send(receiver);
	    };
	};
	var jsonp = {
	    name: 'jsonp',
	    getAgent: getAgent
	};
	exports.__esModule = true;
	exports["default"] = jsonp;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var transports_1 = __webpack_require__(19);
	var transport_1 = __webpack_require__(21);
	var URLSchemes = __webpack_require__(20);
	var runtime_1 = __webpack_require__(2);
	var dependencies_1 = __webpack_require__(3);
	var Collections = __webpack_require__(9);
	var SockJSTransport = new transport_1["default"]({
	    file: "sockjs",
	    urls: URLSchemes.sockjs,
	    handlesActivityChecks: true,
	    supportsPing: false,
	    isSupported: function () {
	        return true;
	    },
	    isInitialized: function () {
	        return window.SockJS !== undefined;
	    },
	    getSocket: function (url, options) {
	        return new window.SockJS(url, null, {
	            js_path: dependencies_1.Dependencies.getPath("sockjs", {
	                encrypted: options.encrypted
	            }),
	            ignore_null_origin: options.ignoreNullOrigin
	        });
	    },
	    beforeOpen: function (socket, path) {
	        socket.send(JSON.stringify({
	            path: path
	        }));
	    }
	});
	var xdrConfiguration = {
	    isSupported: function (environment) {
	        var yes = runtime_1["default"].isXDRSupported(environment.encrypted);
	        return yes;
	    }
	};
	var XDRStreamingTransport = new transport_1["default"](Collections.extend({}, transports_1.streamingConfiguration, xdrConfiguration));
	var XDRPollingTransport = new transport_1["default"](Collections.extend({}, transports_1.pollingConfiguration, xdrConfiguration));
	transports_1["default"].xdr_streaming = XDRStreamingTransport;
	transports_1["default"].xdr_polling = XDRPollingTransport;
	transports_1["default"].sockjs = SockJSTransport;
	exports.__esModule = true;
	exports["default"] = transports_1["default"];


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var URLSchemes = __webpack_require__(20);
	var transport_1 = __webpack_require__(21);
	var Collections = __webpack_require__(9);
	var runtime_1 = __webpack_require__(2);
	var WSTransport = new transport_1["default"]({
	    urls: URLSchemes.ws,
	    handlesActivityChecks: false,
	    supportsPing: false,
	    isInitialized: function () {
	        return Boolean(runtime_1["default"].getWebSocketAPI());
	    },
	    isSupported: function () {
	        return Boolean(runtime_1["default"].getWebSocketAPI());
	    },
	    getSocket: function (url) {
	        return runtime_1["default"].createWebSocket(url);
	    }
	});
	var httpConfiguration = {
	    urls: URLSchemes.http,
	    handlesActivityChecks: false,
	    supportsPing: true,
	    isInitialized: function () {
	        return true;
	    }
	};
	exports.streamingConfiguration = Collections.extend({ getSocket: function (url) {
	        return runtime_1["default"].HTTPFactory.createStreamingSocket(url);
	    }
	}, httpConfiguration);
	exports.pollingConfiguration = Collections.extend({ getSocket: function (url) {
	        return runtime_1["default"].HTTPFactory.createPollingSocket(url);
	    }
	}, httpConfiguration);
	var xhrConfiguration = {
	    isSupported: function () {
	        return runtime_1["default"].isXHRSupported();
	    }
	};
	var XHRStreamingTransport = new transport_1["default"](Collections.extend({}, exports.streamingConfiguration, xhrConfiguration));
	var XHRPollingTransport = new transport_1["default"](Collections.extend({}, exports.pollingConfiguration, xhrConfiguration));
	var Transports = {
	    ws: WSTransport,
	    xhr_streaming: XHRStreamingTransport,
	    xhr_polling: XHRPollingTransport
	};
	exports.__esModule = true;
	exports["default"] = Transports;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var defaults_1 = __webpack_require__(5);
	function getGenericURL(baseScheme, params, path) {
	    var scheme = baseScheme + (params.encrypted ? "s" : "");
	    var host = params.encrypted ? params.hostEncrypted : params.hostUnencrypted;
	    return scheme + "://" + host + path;
	}
	function getGenericPath(key, queryString) {
	    var path = "/app/" + key;
	    var query = "?protocol=" + defaults_1["default"].PROTOCOL +
	        "&client=js" +
	        "&version=" + defaults_1["default"].VERSION +
	        (queryString ? ("&" + queryString) : "");
	    return path + query;
	}
	exports.ws = {
	    getInitial: function (key, params) {
	        return getGenericURL("ws", params, getGenericPath(key, "flash=false"));
	    }
	};
	exports.http = {
	    getInitial: function (key, params) {
	        var path = (params.httpPath || "/pusher") + getGenericPath(key);
	        return getGenericURL("http", params, path);
	    }
	};
	exports.sockjs = {
	    getInitial: function (key, params) {
	        return getGenericURL("http", params, params.httpPath || "/pusher");
	    },
	    getPath: function (key, params) {
	        return getGenericPath(key);
	    }
	};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var transport_connection_1 = __webpack_require__(22);
	var Transport = (function () {
	    function Transport(hooks) {
	        this.hooks = hooks;
	    }
	    Transport.prototype.isSupported = function (environment) {
	        return this.hooks.isSupported(environment);
	    };
	    Transport.prototype.createConnection = function (name, priority, key, options) {
	        return new transport_connection_1["default"](this.hooks, name, priority, key, options);
	    };
	    return Transport;
	}());
	exports.__esModule = true;
	exports["default"] = Transport;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var util_1 = __webpack_require__(11);
	var Collections = __webpack_require__(9);
	var dispatcher_1 = __webpack_require__(23);
	var logger_1 = __webpack_require__(8);
	var runtime_1 = __webpack_require__(2);
	var TransportConnection = (function (_super) {
	    __extends(TransportConnection, _super);
	    function TransportConnection(hooks, name, priority, key, options) {
	        _super.call(this);
	        this.initialize = runtime_1["default"].transportConnectionInitializer;
	        this.hooks = hooks;
	        this.name = name;
	        this.priority = priority;
	        this.key = key;
	        this.options = options;
	        this.state = "new";
	        this.timeline = options.timeline;
	        this.activityTimeout = options.activityTimeout;
	        this.id = this.timeline.generateUniqueID();
	    }
	    TransportConnection.prototype.handlesActivityChecks = function () {
	        return Boolean(this.hooks.handlesActivityChecks);
	    };
	    TransportConnection.prototype.supportsPing = function () {
	        return Boolean(this.hooks.supportsPing);
	    };
	    TransportConnection.prototype.connect = function () {
	        var _this = this;
	        if (this.socket || this.state !== "initialized") {
	            return false;
	        }
	        var url = this.hooks.urls.getInitial(this.key, this.options);
	        try {
	            this.socket = this.hooks.getSocket(url, this.options);
	        }
	        catch (e) {
	            util_1["default"].defer(function () {
	                _this.onError(e);
	                _this.changeState("closed");
	            });
	            return false;
	        }
	        this.bindListeners();
	        logger_1["default"].debug("Connecting", { transport: this.name, url: url });
	        this.changeState("connecting");
	        return true;
	    };
	    TransportConnection.prototype.close = function () {
	        if (this.socket) {
	            this.socket.close();
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	    TransportConnection.prototype.send = function (data) {
	        var _this = this;
	        if (this.state === "open") {
	            util_1["default"].defer(function () {
	                if (_this.socket) {
	                    _this.socket.send(data);
	                }
	            });
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	    TransportConnection.prototype.ping = function () {
	        if (this.state === "open" && this.supportsPing()) {
	            this.socket.ping();
	        }
	    };
	    TransportConnection.prototype.onOpen = function () {
	        if (this.hooks.beforeOpen) {
	            this.hooks.beforeOpen(this.socket, this.hooks.urls.getPath(this.key, this.options));
	        }
	        this.changeState("open");
	        this.socket.onopen = undefined;
	    };
	    TransportConnection.prototype.onError = function (error) {
	        this.emit("error", { type: 'WebSocketError', error: error });
	        this.timeline.error(this.buildTimelineMessage({ error: error.toString() }));
	    };
	    TransportConnection.prototype.onClose = function (closeEvent) {
	        if (closeEvent) {
	            this.changeState("closed", {
	                code: closeEvent.code,
	                reason: closeEvent.reason,
	                wasClean: closeEvent.wasClean
	            });
	        }
	        else {
	            this.changeState("closed");
	        }
	        this.unbindListeners();
	        this.socket = undefined;
	    };
	    TransportConnection.prototype.onMessage = function (message) {
	        this.emit("message", message);
	    };
	    TransportConnection.prototype.onActivity = function () {
	        this.emit("activity");
	    };
	    TransportConnection.prototype.bindListeners = function () {
	        var _this = this;
	        this.socket.onopen = function () {
	            _this.onOpen();
	        };
	        this.socket.onerror = function (error) {
	            _this.onError(error);
	        };
	        this.socket.onclose = function (closeEvent) {
	            _this.onClose(closeEvent);
	        };
	        this.socket.onmessage = function (message) {
	            _this.onMessage(message);
	        };
	        if (this.supportsPing()) {
	            this.socket.onactivity = function () { _this.onActivity(); };
	        }
	    };
	    TransportConnection.prototype.unbindListeners = function () {
	        if (this.socket) {
	            this.socket.onopen = undefined;
	            this.socket.onerror = undefined;
	            this.socket.onclose = undefined;
	            this.socket.onmessage = undefined;
	            if (this.supportsPing()) {
	                this.socket.onactivity = undefined;
	            }
	        }
	    };
	    TransportConnection.prototype.changeState = function (state, params) {
	        this.state = state;
	        this.timeline.info(this.buildTimelineMessage({
	            state: state,
	            params: params
	        }));
	        this.emit(state, params);
	    };
	    TransportConnection.prototype.buildTimelineMessage = function (message) {
	        return Collections.extend({ cid: this.id }, message);
	    };
	    return TransportConnection;
	}(dispatcher_1["default"]));
	exports.__esModule = true;
	exports["default"] = TransportConnection;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(9);
	var callback_registry_1 = __webpack_require__(24);
	var Dispatcher = (function () {
	    function Dispatcher(failThrough) {
	        this.callbacks = new callback_registry_1["default"]();
	        this.global_callbacks = [];
	        this.failThrough = failThrough;
	    }
	    Dispatcher.prototype.bind = function (eventName, callback, context) {
	        this.callbacks.add(eventName, callback, context);
	        return this;
	    };
	    Dispatcher.prototype.bind_global = function (callback) {
	        this.global_callbacks.push(callback);
	        return this;
	    };
	    Dispatcher.prototype.unbind = function (eventName, callback, context) {
	        this.callbacks.remove(eventName, callback, context);
	        return this;
	    };
	    Dispatcher.prototype.unbind_global = function (callback) {
	        if (!callback) {
	            this.global_callbacks = [];
	            return this;
	        }
	        this.global_callbacks = Collections.filter(this.global_callbacks || [], function (c) { return c !== callback; });
	        return this;
	    };
	    Dispatcher.prototype.unbind_all = function () {
	        this.unbind();
	        this.unbind_global();
	        return this;
	    };
	    Dispatcher.prototype.emit = function (eventName, data) {
	        var i;
	        for (i = 0; i < this.global_callbacks.length; i++) {
	            this.global_callbacks[i](eventName, data);
	        }
	        var callbacks = this.callbacks.get(eventName);
	        if (callbacks && callbacks.length > 0) {
	            for (i = 0; i < callbacks.length; i++) {
	                callbacks[i].fn.call(callbacks[i].context || (window), data);
	            }
	        }
	        else if (this.failThrough) {
	            this.failThrough(eventName, data);
	        }
	        return this;
	    };
	    return Dispatcher;
	}());
	exports.__esModule = true;
	exports["default"] = Dispatcher;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(9);
	var CallbackRegistry = (function () {
	    function CallbackRegistry() {
	        this._callbacks = {};
	    }
	    CallbackRegistry.prototype.get = function (name) {
	        return this._callbacks[prefix(name)];
	    };
	    CallbackRegistry.prototype.add = function (name, callback, context) {
	        var prefixedEventName = prefix(name);
	        this._callbacks[prefixedEventName] = this._callbacks[prefixedEventName] || [];
	        this._callbacks[prefixedEventName].push({
	            fn: callback,
	            context: context
	        });
	    };
	    CallbackRegistry.prototype.remove = function (name, callback, context) {
	        if (!name && !callback && !context) {
	            this._callbacks = {};
	            return;
	        }
	        var names = name ? [prefix(name)] : Collections.keys(this._callbacks);
	        if (callback || context) {
	            this.removeCallback(names, callback, context);
	        }
	        else {
	            this.removeAllCallbacks(names);
	        }
	    };
	    CallbackRegistry.prototype.removeCallback = function (names, callback, context) {
	        Collections.apply(names, function (name) {
	            this._callbacks[name] = Collections.filter(this._callbacks[name] || [], function (binding) {
	                return (callback && callback !== binding.fn) ||
	                    (context && context !== binding.context);
	            });
	            if (this._callbacks[name].length === 0) {
	                delete this._callbacks[name];
	            }
	        }, this);
	    };
	    CallbackRegistry.prototype.removeAllCallbacks = function (names) {
	        Collections.apply(names, function (name) {
	            delete this._callbacks[name];
	        }, this);
	    };
	    return CallbackRegistry;
	}());
	exports.__esModule = true;
	exports["default"] = CallbackRegistry;
	function prefix(name) {
	    return "_" + name;
	}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var dispatcher_1 = __webpack_require__(23);
	var NetInfo = (function (_super) {
	    __extends(NetInfo, _super);
	    function NetInfo() {
	        _super.call(this);
	        var self = this;
	        if (window.addEventListener !== undefined) {
	            window.addEventListener("online", function () {
	                self.emit('online');
	            }, false);
	            window.addEventListener("offline", function () {
	                self.emit('offline');
	            }, false);
	        }
	    }
	    NetInfo.prototype.isOnline = function () {
	        if (window.navigator.onLine === undefined) {
	            return true;
	        }
	        else {
	            return window.navigator.onLine;
	        }
	    };
	    return NetInfo;
	}(dispatcher_1["default"]));
	exports.NetInfo = NetInfo;
	exports.Network = new NetInfo();


/***/ }),
/* 26 */
/***/ (function(module, exports) {

	"use strict";
	var getDefaultStrategy = function (config) {
	    var wsStrategy;
	    if (config.encrypted) {
	        wsStrategy = [
	            ":best_connected_ever",
	            ":ws_loop",
	            [":delayed", 2000, [":http_fallback_loop"]]
	        ];
	    }
	    else {
	        wsStrategy = [
	            ":best_connected_ever",
	            ":ws_loop",
	            [":delayed", 2000, [":wss_loop"]],
	            [":delayed", 5000, [":http_fallback_loop"]]
	        ];
	    }
	    return [
	        [":def", "ws_options", {
	                hostUnencrypted: config.wsHost + ":" + config.wsPort,
	                hostEncrypted: config.wsHost + ":" + config.wssPort
	            }],
	        [":def", "wss_options", [":extend", ":ws_options", {
	                    encrypted: true
	                }]],
	        [":def", "sockjs_options", {
	                hostUnencrypted: config.httpHost + ":" + config.httpPort,
	                hostEncrypted: config.httpHost + ":" + config.httpsPort,
	                httpPath: config.httpPath
	            }],
	        [":def", "timeouts", {
	                loop: true,
	                timeout: 15000,
	                timeoutLimit: 60000
	            }],
	        [":def", "ws_manager", [":transport_manager", {
	                    lives: 2,
	                    minPingDelay: 10000,
	                    maxPingDelay: config.activity_timeout
	                }]],
	        [":def", "streaming_manager", [":transport_manager", {
	                    lives: 2,
	                    minPingDelay: 10000,
	                    maxPingDelay: config.activity_timeout
	                }]],
	        [":def_transport", "ws", "ws", 3, ":ws_options", ":ws_manager"],
	        [":def_transport", "wss", "ws", 3, ":wss_options", ":ws_manager"],
	        [":def_transport", "sockjs", "sockjs", 1, ":sockjs_options"],
	        [":def_transport", "xhr_streaming", "xhr_streaming", 1, ":sockjs_options", ":streaming_manager"],
	        [":def_transport", "xdr_streaming", "xdr_streaming", 1, ":sockjs_options", ":streaming_manager"],
	        [":def_transport", "xhr_polling", "xhr_polling", 1, ":sockjs_options"],
	        [":def_transport", "xdr_polling", "xdr_polling", 1, ":sockjs_options"],
	        [":def", "ws_loop", [":sequential", ":timeouts", ":ws"]],
	        [":def", "wss_loop", [":sequential", ":timeouts", ":wss"]],
	        [":def", "sockjs_loop", [":sequential", ":timeouts", ":sockjs"]],
	        [":def", "streaming_loop", [":sequential", ":timeouts",
	                [":if", [":is_supported", ":xhr_streaming"],
	                    ":xhr_streaming",
	                    ":xdr_streaming"
	                ]
	            ]],
	        [":def", "polling_loop", [":sequential", ":timeouts",
	                [":if", [":is_supported", ":xhr_polling"],
	                    ":xhr_polling",
	                    ":xdr_polling"
	                ]
	            ]],
	        [":def", "http_loop", [":if", [":is_supported", ":streaming_loop"], [
	                    ":best_connected_ever",
	                    ":streaming_loop",
	                    [":delayed", 4000, [":polling_loop"]]
	                ], [
	                    ":polling_loop"
	                ]]],
	        [":def", "http_fallback_loop",
	            [":if", [":is_supported", ":http_loop"], [
	                    ":http_loop"
	                ], [
	                    ":sockjs_loop"
	                ]]
	        ],
	        [":def", "strategy",
	            [":cached", 1800000,
	                [":first_connected",
	                    [":if", [":is_supported", ":ws"],
	                        wsStrategy,
	                        ":http_fallback_loop"
	                    ]
	                ]
	            ]
	        ]
	    ];
	};
	exports.__esModule = true;
	exports["default"] = getDefaultStrategy;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var dependencies_1 = __webpack_require__(3);
	function default_1() {
	    var self = this;
	    self.timeline.info(self.buildTimelineMessage({
	        transport: self.name + (self.options.encrypted ? "s" : "")
	    }));
	    if (self.hooks.isInitialized()) {
	        self.changeState("initialized");
	    }
	    else if (self.hooks.file) {
	        self.changeState("initializing");
	        dependencies_1.Dependencies.load(self.hooks.file, { encrypted: self.options.encrypted }, function (error, callback) {
	            if (self.hooks.isInitialized()) {
	                self.changeState("initialized");
	                callback(true);
	            }
	            else {
	                if (error) {
	                    self.onError(error);
	                }
	                self.onClose();
	                callback(false);
	            }
	        });
	    }
	    else {
	        self.onClose();
	    }
	}
	exports.__esModule = true;
	exports["default"] = default_1;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var http_xdomain_request_1 = __webpack_require__(29);
	var http_1 = __webpack_require__(31);
	http_1["default"].createXDR = function (method, url) {
	    return this.createRequest(http_xdomain_request_1["default"], method, url);
	};
	exports.__esModule = true;
	exports["default"] = http_1["default"];


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Errors = __webpack_require__(30);
	var hooks = {
	    getRequest: function (socket) {
	        var xdr = new window.XDomainRequest();
	        xdr.ontimeout = function () {
	            socket.emit("error", new Errors.RequestTimedOut());
	            socket.close();
	        };
	        xdr.onerror = function (e) {
	            socket.emit("error", e);
	            socket.close();
	        };
	        xdr.onprogress = function () {
	            if (xdr.responseText && xdr.responseText.length > 0) {
	                socket.onChunk(200, xdr.responseText);
	            }
	        };
	        xdr.onload = function () {
	            if (xdr.responseText && xdr.responseText.length > 0) {
	                socket.onChunk(200, xdr.responseText);
	            }
	            socket.emit("finished", 200);
	            socket.close();
	        };
	        return xdr;
	    },
	    abortRequest: function (xdr) {
	        xdr.ontimeout = xdr.onerror = xdr.onprogress = xdr.onload = null;
	        xdr.abort();
	    }
	};
	exports.__esModule = true;
	exports["default"] = hooks;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var BadEventName = (function (_super) {
	    __extends(BadEventName, _super);
	    function BadEventName() {
	        _super.apply(this, arguments);
	    }
	    return BadEventName;
	}(Error));
	exports.BadEventName = BadEventName;
	var RequestTimedOut = (function (_super) {
	    __extends(RequestTimedOut, _super);
	    function RequestTimedOut() {
	        _super.apply(this, arguments);
	    }
	    return RequestTimedOut;
	}(Error));
	exports.RequestTimedOut = RequestTimedOut;
	var TransportPriorityTooLow = (function (_super) {
	    __extends(TransportPriorityTooLow, _super);
	    function TransportPriorityTooLow() {
	        _super.apply(this, arguments);
	    }
	    return TransportPriorityTooLow;
	}(Error));
	exports.TransportPriorityTooLow = TransportPriorityTooLow;
	var TransportClosed = (function (_super) {
	    __extends(TransportClosed, _super);
	    function TransportClosed() {
	        _super.apply(this, arguments);
	    }
	    return TransportClosed;
	}(Error));
	exports.TransportClosed = TransportClosed;
	var UnsupportedTransport = (function (_super) {
	    __extends(UnsupportedTransport, _super);
	    function UnsupportedTransport() {
	        _super.apply(this, arguments);
	    }
	    return UnsupportedTransport;
	}(Error));
	exports.UnsupportedTransport = UnsupportedTransport;
	var UnsupportedStrategy = (function (_super) {
	    __extends(UnsupportedStrategy, _super);
	    function UnsupportedStrategy() {
	        _super.apply(this, arguments);
	    }
	    return UnsupportedStrategy;
	}(Error));
	exports.UnsupportedStrategy = UnsupportedStrategy;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var http_request_1 = __webpack_require__(32);
	var http_socket_1 = __webpack_require__(33);
	var http_streaming_socket_1 = __webpack_require__(35);
	var http_polling_socket_1 = __webpack_require__(36);
	var http_xhr_request_1 = __webpack_require__(37);
	var HTTP = {
	    createStreamingSocket: function (url) {
	        return this.createSocket(http_streaming_socket_1["default"], url);
	    },
	    createPollingSocket: function (url) {
	        return this.createSocket(http_polling_socket_1["default"], url);
	    },
	    createSocket: function (hooks, url) {
	        return new http_socket_1["default"](hooks, url);
	    },
	    createXHR: function (method, url) {
	        return this.createRequest(http_xhr_request_1["default"], method, url);
	    },
	    createRequest: function (hooks, method, url) {
	        return new http_request_1["default"](hooks, method, url);
	    }
	};
	exports.__esModule = true;
	exports["default"] = HTTP;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var runtime_1 = __webpack_require__(2);
	var dispatcher_1 = __webpack_require__(23);
	var MAX_BUFFER_LENGTH = 256 * 1024;
	var HTTPRequest = (function (_super) {
	    __extends(HTTPRequest, _super);
	    function HTTPRequest(hooks, method, url) {
	        _super.call(this);
	        this.hooks = hooks;
	        this.method = method;
	        this.url = url;
	    }
	    HTTPRequest.prototype.start = function (payload) {
	        var _this = this;
	        this.position = 0;
	        this.xhr = this.hooks.getRequest(this);
	        this.unloader = function () {
	            _this.close();
	        };
	        runtime_1["default"].addUnloadListener(this.unloader);
	        this.xhr.open(this.method, this.url, true);
	        if (this.xhr.setRequestHeader) {
	            this.xhr.setRequestHeader("Content-Type", "application/json");
	        }
	        this.xhr.send(payload);
	    };
	    HTTPRequest.prototype.close = function () {
	        if (this.unloader) {
	            runtime_1["default"].removeUnloadListener(this.unloader);
	            this.unloader = null;
	        }
	        if (this.xhr) {
	            this.hooks.abortRequest(this.xhr);
	            this.xhr = null;
	        }
	    };
	    HTTPRequest.prototype.onChunk = function (status, data) {
	        while (true) {
	            var chunk = this.advanceBuffer(data);
	            if (chunk) {
	                this.emit("chunk", { status: status, data: chunk });
	            }
	            else {
	                break;
	            }
	        }
	        if (this.isBufferTooLong(data)) {
	            this.emit("buffer_too_long");
	        }
	    };
	    HTTPRequest.prototype.advanceBuffer = function (buffer) {
	        var unreadData = buffer.slice(this.position);
	        var endOfLinePosition = unreadData.indexOf("\n");
	        if (endOfLinePosition !== -1) {
	            this.position += endOfLinePosition + 1;
	            return unreadData.slice(0, endOfLinePosition);
	        }
	        else {
	            return null;
	        }
	    };
	    HTTPRequest.prototype.isBufferTooLong = function (buffer) {
	        return this.position === buffer.length && buffer.length > MAX_BUFFER_LENGTH;
	    };
	    return HTTPRequest;
	}(dispatcher_1["default"]));
	exports.__esModule = true;
	exports["default"] = HTTPRequest;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var state_1 = __webpack_require__(34);
	var util_1 = __webpack_require__(11);
	var runtime_1 = __webpack_require__(2);
	var autoIncrement = 1;
	var HTTPSocket = (function () {
	    function HTTPSocket(hooks, url) {
	        this.hooks = hooks;
	        this.session = randomNumber(1000) + "/" + randomString(8);
	        this.location = getLocation(url);
	        this.readyState = state_1["default"].CONNECTING;
	        this.openStream();
	    }
	    HTTPSocket.prototype.send = function (payload) {
	        return this.sendRaw(JSON.stringify([payload]));
	    };
	    HTTPSocket.prototype.ping = function () {
	        this.hooks.sendHeartbeat(this);
	    };
	    HTTPSocket.prototype.close = function (code, reason) {
	        this.onClose(code, reason, true);
	    };
	    HTTPSocket.prototype.sendRaw = function (payload) {
	        if (this.readyState === state_1["default"].OPEN) {
	            try {
	                runtime_1["default"].createSocketRequest("POST", getUniqueURL(getSendURL(this.location, this.session))).start(payload);
	                return true;
	            }
	            catch (e) {
	                return false;
	            }
	        }
	        else {
	            return false;
	        }
	    };
	    HTTPSocket.prototype.reconnect = function () {
	        this.closeStream();
	        this.openStream();
	    };
	    ;
	    HTTPSocket.prototype.onClose = function (code, reason, wasClean) {
	        this.closeStream();
	        this.readyState = state_1["default"].CLOSED;
	        if (this.onclose) {
	            this.onclose({
	                code: code,
	                reason: reason,
	                wasClean: wasClean
	            });
	        }
	    };
	    HTTPSocket.prototype.onChunk = function (chunk) {
	        if (chunk.status !== 200) {
	            return;
	        }
	        if (this.readyState === state_1["default"].OPEN) {
	            this.onActivity();
	        }
	        var payload;
	        var type = chunk.data.slice(0, 1);
	        switch (type) {
	            case 'o':
	                payload = JSON.parse(chunk.data.slice(1) || '{}');
	                this.onOpen(payload);
	                break;
	            case 'a':
	                payload = JSON.parse(chunk.data.slice(1) || '[]');
	                for (var i = 0; i < payload.length; i++) {
	                    this.onEvent(payload[i]);
	                }
	                break;
	            case 'm':
	                payload = JSON.parse(chunk.data.slice(1) || 'null');
	                this.onEvent(payload);
	                break;
	            case 'h':
	                this.hooks.onHeartbeat(this);
	                break;
	            case 'c':
	                payload = JSON.parse(chunk.data.slice(1) || '[]');
	                this.onClose(payload[0], payload[1], true);
	                break;
	        }
	    };
	    HTTPSocket.prototype.onOpen = function (options) {
	        if (this.readyState === state_1["default"].CONNECTING) {
	            if (options && options.hostname) {
	                this.location.base = replaceHost(this.location.base, options.hostname);
	            }
	            this.readyState = state_1["default"].OPEN;
	            if (this.onopen) {
	                this.onopen();
	            }
	        }
	        else {
	            this.onClose(1006, "Server lost session", true);
	        }
	    };
	    HTTPSocket.prototype.onEvent = function (event) {
	        if (this.readyState === state_1["default"].OPEN && this.onmessage) {
	            this.onmessage({ data: event });
	        }
	    };
	    HTTPSocket.prototype.onActivity = function () {
	        if (this.onactivity) {
	            this.onactivity();
	        }
	    };
	    HTTPSocket.prototype.onError = function (error) {
	        if (this.onerror) {
	            this.onerror(error);
	        }
	    };
	    HTTPSocket.prototype.openStream = function () {
	        var _this = this;
	        this.stream = runtime_1["default"].createSocketRequest("POST", getUniqueURL(this.hooks.getReceiveURL(this.location, this.session)));
	        this.stream.bind("chunk", function (chunk) {
	            _this.onChunk(chunk);
	        });
	        this.stream.bind("finished", function (status) {
	            _this.hooks.onFinished(_this, status);
	        });
	        this.stream.bind("buffer_too_long", function () {
	            _this.reconnect();
	        });
	        try {
	            this.stream.start();
	        }
	        catch (error) {
	            util_1["default"].defer(function () {
	                _this.onError(error);
	                _this.onClose(1006, "Could not start streaming", false);
	            });
	        }
	    };
	    HTTPSocket.prototype.closeStream = function () {
	        if (this.stream) {
	            this.stream.unbind_all();
	            this.stream.close();
	            this.stream = null;
	        }
	    };
	    return HTTPSocket;
	}());
	function getLocation(url) {
	    var parts = /([^\?]*)\/*(\??.*)/.exec(url);
	    return {
	        base: parts[1],
	        queryString: parts[2]
	    };
	}
	function getSendURL(url, session) {
	    return url.base + "/" + session + "/xhr_send";
	}
	function getUniqueURL(url) {
	    var separator = (url.indexOf('?') === -1) ? "?" : "&";
	    return url + separator + "t=" + (+new Date()) + "&n=" + autoIncrement++;
	}
	function replaceHost(url, hostname) {
	    var urlParts = /(https?:\/\/)([^\/:]+)((\/|:)?.*)/.exec(url);
	    return urlParts[1] + hostname + urlParts[3];
	}
	function randomNumber(max) {
	    return Math.floor(Math.random() * max);
	}
	function randomString(length) {
	    var result = [];
	    for (var i = 0; i < length; i++) {
	        result.push(randomNumber(32).toString(32));
	    }
	    return result.join('');
	}
	exports.__esModule = true;
	exports["default"] = HTTPSocket;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

	"use strict";
	var State;
	(function (State) {
	    State[State["CONNECTING"] = 0] = "CONNECTING";
	    State[State["OPEN"] = 1] = "OPEN";
	    State[State["CLOSED"] = 3] = "CLOSED";
	})(State || (State = {}));
	exports.__esModule = true;
	exports["default"] = State;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

	"use strict";
	var hooks = {
	    getReceiveURL: function (url, session) {
	        return url.base + "/" + session + "/xhr_streaming" + url.queryString;
	    },
	    onHeartbeat: function (socket) {
	        socket.sendRaw("[]");
	    },
	    sendHeartbeat: function (socket) {
	        socket.sendRaw("[]");
	    },
	    onFinished: function (socket, status) {
	        socket.onClose(1006, "Connection interrupted (" + status + ")", false);
	    }
	};
	exports.__esModule = true;
	exports["default"] = hooks;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	"use strict";
	var hooks = {
	    getReceiveURL: function (url, session) {
	        return url.base + "/" + session + "/xhr" + url.queryString;
	    },
	    onHeartbeat: function () {
	    },
	    sendHeartbeat: function (socket) {
	        socket.sendRaw("[]");
	    },
	    onFinished: function (socket, status) {
	        if (status === 200) {
	            socket.reconnect();
	        }
	        else {
	            socket.onClose(1006, "Connection interrupted (" + status + ")", false);
	        }
	    }
	};
	exports.__esModule = true;
	exports["default"] = hooks;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var runtime_1 = __webpack_require__(2);
	var hooks = {
	    getRequest: function (socket) {
	        var Constructor = runtime_1["default"].getXHRAPI();
	        var xhr = new Constructor();
	        xhr.onreadystatechange = xhr.onprogress = function () {
	            switch (xhr.readyState) {
	                case 3:
	                    if (xhr.responseText && xhr.responseText.length > 0) {
	                        socket.onChunk(xhr.status, xhr.responseText);
	                    }
	                    break;
	                case 4:
	                    if (xhr.responseText && xhr.responseText.length > 0) {
	                        socket.onChunk(xhr.status, xhr.responseText);
	                    }
	                    socket.emit("finished", xhr.status);
	                    socket.close();
	                    break;
	            }
	        };
	        return xhr;
	    },
	    abortRequest: function (xhr) {
	        xhr.onreadystatechange = null;
	        xhr.abort();
	    }
	};
	exports.__esModule = true;
	exports["default"] = hooks;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(9);
	var util_1 = __webpack_require__(11);
	var level_1 = __webpack_require__(39);
	var Timeline = (function () {
	    function Timeline(key, session, options) {
	        this.key = key;
	        this.session = session;
	        this.events = [];
	        this.options = options || {};
	        this.sent = 0;
	        this.uniqueID = 0;
	    }
	    Timeline.prototype.log = function (level, event) {
	        if (level <= this.options.level) {
	            this.events.push(Collections.extend({}, event, { timestamp: util_1["default"].now() }));
	            if (this.options.limit && this.events.length > this.options.limit) {
	                this.events.shift();
	            }
	        }
	    };
	    Timeline.prototype.error = function (event) {
	        this.log(level_1["default"].ERROR, event);
	    };
	    Timeline.prototype.info = function (event) {
	        this.log(level_1["default"].INFO, event);
	    };
	    Timeline.prototype.debug = function (event) {
	        this.log(level_1["default"].DEBUG, event);
	    };
	    Timeline.prototype.isEmpty = function () {
	        return this.events.length === 0;
	    };
	    Timeline.prototype.send = function (sendfn, callback) {
	        var _this = this;
	        var data = Collections.extend({
	            session: this.session,
	            bundle: this.sent + 1,
	            key: this.key,
	            lib: "js",
	            version: this.options.version,
	            cluster: this.options.cluster,
	            features: this.options.features,
	            timeline: this.events
	        }, this.options.params);
	        this.events = [];
	        sendfn(data, function (error, result) {
	            if (!error) {
	                _this.sent++;
	            }
	            if (callback) {
	                callback(error, result);
	            }
	        });
	        return true;
	    };
	    Timeline.prototype.generateUniqueID = function () {
	        this.uniqueID++;
	        return this.uniqueID;
	    };
	    return Timeline;
	}());
	exports.__esModule = true;
	exports["default"] = Timeline;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

	"use strict";
	var TimelineLevel;
	(function (TimelineLevel) {
	    TimelineLevel[TimelineLevel["ERROR"] = 3] = "ERROR";
	    TimelineLevel[TimelineLevel["INFO"] = 6] = "INFO";
	    TimelineLevel[TimelineLevel["DEBUG"] = 7] = "DEBUG";
	})(TimelineLevel || (TimelineLevel = {}));
	exports.__esModule = true;
	exports["default"] = TimelineLevel;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(9);
	var util_1 = __webpack_require__(11);
	var transport_manager_1 = __webpack_require__(41);
	var Errors = __webpack_require__(30);
	var transport_strategy_1 = __webpack_require__(55);
	var sequential_strategy_1 = __webpack_require__(56);
	var best_connected_ever_strategy_1 = __webpack_require__(57);
	var cached_strategy_1 = __webpack_require__(58);
	var delayed_strategy_1 = __webpack_require__(59);
	var if_strategy_1 = __webpack_require__(60);
	var first_connected_strategy_1 = __webpack_require__(61);
	var runtime_1 = __webpack_require__(2);
	var Transports = runtime_1["default"].Transports;
	exports.build = function (scheme, options) {
	    var context = Collections.extend({}, globalContext, options);
	    return evaluate(scheme, context)[1].strategy;
	};
	var UnsupportedStrategy = {
	    isSupported: function () {
	        return false;
	    },
	    connect: function (_, callback) {
	        var deferred = util_1["default"].defer(function () {
	            callback(new Errors.UnsupportedStrategy());
	        });
	        return {
	            abort: function () {
	                deferred.ensureAborted();
	            },
	            forceMinPriority: function () { }
	        };
	    }
	};
	function returnWithOriginalContext(f) {
	    return function (context) {
	        return [f.apply(this, arguments), context];
	    };
	}
	var globalContext = {
	    extend: function (context, first, second) {
	        return [Collections.extend({}, first, second), context];
	    },
	    def: function (context, name, value) {
	        if (context[name] !== undefined) {
	            throw "Redefining symbol " + name;
	        }
	        context[name] = value;
	        return [undefined, context];
	    },
	    def_transport: function (context, name, type, priority, options, manager) {
	        var transportClass = Transports[type];
	        if (!transportClass) {
	            throw new Errors.UnsupportedTransport(type);
	        }
	        var enabled = (!context.enabledTransports ||
	            Collections.arrayIndexOf(context.enabledTransports, name) !== -1) &&
	            (!context.disabledTransports ||
	                Collections.arrayIndexOf(context.disabledTransports, name) === -1);
	        var transport;
	        if (enabled) {
	            transport = new transport_strategy_1["default"](name, priority, manager ? manager.getAssistant(transportClass) : transportClass, Collections.extend({
	                key: context.key,
	                encrypted: context.encrypted,
	                timeline: context.timeline,
	                ignoreNullOrigin: context.ignoreNullOrigin
	            }, options));
	        }
	        else {
	            transport = UnsupportedStrategy;
	        }
	        var newContext = context.def(context, name, transport)[1];
	        newContext.Transports = context.Transports || {};
	        newContext.Transports[name] = transport;
	        return [undefined, newContext];
	    },
	    transport_manager: returnWithOriginalContext(function (_, options) {
	        return new transport_manager_1["default"](options);
	    }),
	    sequential: returnWithOriginalContext(function (_, options) {
	        var strategies = Array.prototype.slice.call(arguments, 2);
	        return new sequential_strategy_1["default"](strategies, options);
	    }),
	    cached: returnWithOriginalContext(function (context, ttl, strategy) {
	        return new cached_strategy_1["default"](strategy, context.Transports, {
	            ttl: ttl,
	            timeline: context.timeline,
	            encrypted: context.encrypted
	        });
	    }),
	    first_connected: returnWithOriginalContext(function (_, strategy) {
	        return new first_connected_strategy_1["default"](strategy);
	    }),
	    best_connected_ever: returnWithOriginalContext(function () {
	        var strategies = Array.prototype.slice.call(arguments, 1);
	        return new best_connected_ever_strategy_1["default"](strategies);
	    }),
	    delayed: returnWithOriginalContext(function (_, delay, strategy) {
	        return new delayed_strategy_1["default"](strategy, { delay: delay });
	    }),
	    "if": returnWithOriginalContext(function (_, test, trueBranch, falseBranch) {
	        return new if_strategy_1["default"](test, trueBranch, falseBranch);
	    }),
	    is_supported: returnWithOriginalContext(function (_, strategy) {
	        return function () {
	            return strategy.isSupported();
	        };
	    })
	};
	function isSymbol(expression) {
	    return (typeof expression === "string") && expression.charAt(0) === ":";
	}
	function getSymbolValue(expression, context) {
	    return context[expression.slice(1)];
	}
	function evaluateListOfExpressions(expressions, context) {
	    if (expressions.length === 0) {
	        return [[], context];
	    }
	    var head = evaluate(expressions[0], context);
	    var tail = evaluateListOfExpressions(expressions.slice(1), head[1]);
	    return [[head[0]].concat(tail[0]), tail[1]];
	}
	function evaluateString(expression, context) {
	    if (!isSymbol(expression)) {
	        return [expression, context];
	    }
	    var value = getSymbolValue(expression, context);
	    if (value === undefined) {
	        throw "Undefined symbol " + expression;
	    }
	    return [value, context];
	}
	function evaluateArray(expression, context) {
	    if (isSymbol(expression[0])) {
	        var f = getSymbolValue(expression[0], context);
	        if (expression.length > 1) {
	            if (typeof f !== "function") {
	                throw "Calling non-function " + expression[0];
	            }
	            var args = [Collections.extend({}, context)].concat(Collections.map(expression.slice(1), function (arg) {
	                return evaluate(arg, Collections.extend({}, context))[0];
	            }));
	            return f.apply(this, args);
	        }
	        else {
	            return [f, context];
	        }
	    }
	    else {
	        return evaluateListOfExpressions(expression, context);
	    }
	}
	function evaluate(expression, context) {
	    if (typeof expression === "string") {
	        return evaluateString(expression, context);
	    }
	    else if (typeof expression === "object") {
	        if (expression instanceof Array && expression.length > 0) {
	            return evaluateArray(expression, context);
	        }
	    }
	    return [expression, context];
	}


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var factory_1 = __webpack_require__(42);
	var TransportManager = (function () {
	    function TransportManager(options) {
	        this.options = options || {};
	        this.livesLeft = this.options.lives || Infinity;
	    }
	    TransportManager.prototype.getAssistant = function (transport) {
	        return factory_1["default"].createAssistantToTheTransportManager(this, transport, {
	            minPingDelay: this.options.minPingDelay,
	            maxPingDelay: this.options.maxPingDelay
	        });
	    };
	    TransportManager.prototype.isAlive = function () {
	        return this.livesLeft > 0;
	    };
	    TransportManager.prototype.reportDeath = function () {
	        this.livesLeft -= 1;
	    };
	    return TransportManager;
	}());
	exports.__esModule = true;
	exports["default"] = TransportManager;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var assistant_to_the_transport_manager_1 = __webpack_require__(43);
	var handshake_1 = __webpack_require__(44);
	var pusher_authorizer_1 = __webpack_require__(47);
	var timeline_sender_1 = __webpack_require__(48);
	var presence_channel_1 = __webpack_require__(49);
	var private_channel_1 = __webpack_require__(50);
	var channel_1 = __webpack_require__(51);
	var connection_manager_1 = __webpack_require__(53);
	var channels_1 = __webpack_require__(54);
	var Factory = {
	    createChannels: function () {
	        return new channels_1["default"]();
	    },
	    createConnectionManager: function (key, options) {
	        return new connection_manager_1["default"](key, options);
	    },
	    createChannel: function (name, pusher) {
	        return new channel_1["default"](name, pusher);
	    },
	    createPrivateChannel: function (name, pusher) {
	        return new private_channel_1["default"](name, pusher);
	    },
	    createPresenceChannel: function (name, pusher) {
	        return new presence_channel_1["default"](name, pusher);
	    },
	    createTimelineSender: function (timeline, options) {
	        return new timeline_sender_1["default"](timeline, options);
	    },
	    createAuthorizer: function (channel, options) {
	        if (options.authorizer) {
	            return options.authorizer(channel, options);
	        }
	        return new pusher_authorizer_1["default"](channel, options);
	    },
	    createHandshake: function (transport, callback) {
	        return new handshake_1["default"](transport, callback);
	    },
	    createAssistantToTheTransportManager: function (manager, transport, options) {
	        return new assistant_to_the_transport_manager_1["default"](manager, transport, options);
	    }
	};
	exports.__esModule = true;
	exports["default"] = Factory;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(11);
	var Collections = __webpack_require__(9);
	var AssistantToTheTransportManager = (function () {
	    function AssistantToTheTransportManager(manager, transport, options) {
	        this.manager = manager;
	        this.transport = transport;
	        this.minPingDelay = options.minPingDelay;
	        this.maxPingDelay = options.maxPingDelay;
	        this.pingDelay = undefined;
	    }
	    AssistantToTheTransportManager.prototype.createConnection = function (name, priority, key, options) {
	        var _this = this;
	        options = Collections.extend({}, options, {
	            activityTimeout: this.pingDelay
	        });
	        var connection = this.transport.createConnection(name, priority, key, options);
	        var openTimestamp = null;
	        var onOpen = function () {
	            connection.unbind("open", onOpen);
	            connection.bind("closed", onClosed);
	            openTimestamp = util_1["default"].now();
	        };
	        var onClosed = function (closeEvent) {
	            connection.unbind("closed", onClosed);
	            if (closeEvent.code === 1002 || closeEvent.code === 1003) {
	                _this.manager.reportDeath();
	            }
	            else if (!closeEvent.wasClean && openTimestamp) {
	                var lifespan = util_1["default"].now() - openTimestamp;
	                if (lifespan < 2 * _this.maxPingDelay) {
	                    _this.manager.reportDeath();
	                    _this.pingDelay = Math.max(lifespan / 2, _this.minPingDelay);
	                }
	            }
	        };
	        connection.bind("open", onOpen);
	        return connection;
	    };
	    AssistantToTheTransportManager.prototype.isSupported = function (environment) {
	        return this.manager.isAlive() && this.transport.isSupported(environment);
	    };
	    return AssistantToTheTransportManager;
	}());
	exports.__esModule = true;
	exports["default"] = AssistantToTheTransportManager;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(9);
	var Protocol = __webpack_require__(45);
	var connection_1 = __webpack_require__(46);
	var Handshake = (function () {
	    function Handshake(transport, callback) {
	        this.transport = transport;
	        this.callback = callback;
	        this.bindListeners();
	    }
	    Handshake.prototype.close = function () {
	        this.unbindListeners();
	        this.transport.close();
	    };
	    Handshake.prototype.bindListeners = function () {
	        var _this = this;
	        this.onMessage = function (m) {
	            _this.unbindListeners();
	            var result;
	            try {
	                result = Protocol.processHandshake(m);
	            }
	            catch (e) {
	                _this.finish("error", { error: e });
	                _this.transport.close();
	                return;
	            }
	            if (result.action === "connected") {
	                _this.finish("connected", {
	                    connection: new connection_1["default"](result.id, _this.transport),
	                    activityTimeout: result.activityTimeout
	                });
	            }
	            else {
	                _this.finish(result.action, { error: result.error });
	                _this.transport.close();
	            }
	        };
	        this.onClosed = function (closeEvent) {
	            _this.unbindListeners();
	            var action = Protocol.getCloseAction(closeEvent) || "backoff";
	            var error = Protocol.getCloseError(closeEvent);
	            _this.finish(action, { error: error });
	        };
	        this.transport.bind("message", this.onMessage);
	        this.transport.bind("closed", this.onClosed);
	    };
	    Handshake.prototype.unbindListeners = function () {
	        this.transport.unbind("message", this.onMessage);
	        this.transport.unbind("closed", this.onClosed);
	    };
	    Handshake.prototype.finish = function (action, params) {
	        this.callback(Collections.extend({ transport: this.transport, action: action }, params));
	    };
	    return Handshake;
	}());
	exports.__esModule = true;
	exports["default"] = Handshake;


/***/ }),
/* 45 */
/***/ (function(module, exports) {

	"use strict";
	exports.decodeMessage = function (message) {
	    try {
	        var params = JSON.parse(message.data);
	        if (typeof params.data === 'string') {
	            try {
	                params.data = JSON.parse(params.data);
	            }
	            catch (e) {
	                if (!(e instanceof SyntaxError)) {
	                    throw e;
	                }
	            }
	        }
	        return params;
	    }
	    catch (e) {
	        throw { type: 'MessageParseError', error: e, data: message.data };
	    }
	};
	exports.encodeMessage = function (message) {
	    return JSON.stringify(message);
	};
	exports.processHandshake = function (message) {
	    message = exports.decodeMessage(message);
	    if (message.event === "pusher:connection_established") {
	        if (!message.data.activity_timeout) {
	            throw "No activity timeout specified in handshake";
	        }
	        return {
	            action: "connected",
	            id: message.data.socket_id,
	            activityTimeout: message.data.activity_timeout * 1000
	        };
	    }
	    else if (message.event === "pusher:error") {
	        return {
	            action: this.getCloseAction(message.data),
	            error: this.getCloseError(message.data)
	        };
	    }
	    else {
	        throw "Invalid handshake";
	    }
	};
	exports.getCloseAction = function (closeEvent) {
	    if (closeEvent.code < 4000) {
	        if (closeEvent.code >= 1002 && closeEvent.code <= 1004) {
	            return "backoff";
	        }
	        else {
	            return null;
	        }
	    }
	    else if (closeEvent.code === 4000) {
	        return "ssl_only";
	    }
	    else if (closeEvent.code < 4100) {
	        return "refused";
	    }
	    else if (closeEvent.code < 4200) {
	        return "backoff";
	    }
	    else if (closeEvent.code < 4300) {
	        return "retry";
	    }
	    else {
	        return "refused";
	    }
	};
	exports.getCloseError = function (closeEvent) {
	    if (closeEvent.code !== 1000 && closeEvent.code !== 1001) {
	        return {
	            type: 'PusherError',
	            data: {
	                code: closeEvent.code,
	                message: closeEvent.reason || closeEvent.message
	            }
	        };
	    }
	    else {
	        return null;
	    }
	};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Collections = __webpack_require__(9);
	var dispatcher_1 = __webpack_require__(23);
	var Protocol = __webpack_require__(45);
	var logger_1 = __webpack_require__(8);
	var Connection = (function (_super) {
	    __extends(Connection, _super);
	    function Connection(id, transport) {
	        _super.call(this);
	        this.id = id;
	        this.transport = transport;
	        this.activityTimeout = transport.activityTimeout;
	        this.bindListeners();
	    }
	    Connection.prototype.handlesActivityChecks = function () {
	        return this.transport.handlesActivityChecks();
	    };
	    Connection.prototype.send = function (data) {
	        return this.transport.send(data);
	    };
	    Connection.prototype.send_event = function (name, data, channel) {
	        var message = { event: name, data: data };
	        if (channel) {
	            message.channel = channel;
	        }
	        logger_1["default"].debug('Event sent', message);
	        return this.send(Protocol.encodeMessage(message));
	    };
	    Connection.prototype.ping = function () {
	        if (this.transport.supportsPing()) {
	            this.transport.ping();
	        }
	        else {
	            this.send_event('pusher:ping', {});
	        }
	    };
	    Connection.prototype.close = function () {
	        this.transport.close();
	    };
	    Connection.prototype.bindListeners = function () {
	        var _this = this;
	        var listeners = {
	            message: function (m) {
	                var message;
	                try {
	                    message = Protocol.decodeMessage(m);
	                }
	                catch (e) {
	                    _this.emit('error', {
	                        type: 'MessageParseError',
	                        error: e,
	                        data: m.data
	                    });
	                }
	                if (message !== undefined) {
	                    logger_1["default"].debug('Event recd', message);
	                    switch (message.event) {
	                        case 'pusher:error':
	                            _this.emit('error', { type: 'PusherError', data: message.data });
	                            break;
	                        case 'pusher:ping':
	                            _this.emit("ping");
	                            break;
	                        case 'pusher:pong':
	                            _this.emit("pong");
	                            break;
	                    }
	                    _this.emit('message', message);
	                }
	            },
	            activity: function () {
	                _this.emit("activity");
	            },
	            error: function (error) {
	                _this.emit("error", { type: "WebSocketError", error: error });
	            },
	            closed: function (closeEvent) {
	                unbindListeners();
	                if (closeEvent && closeEvent.code) {
	                    _this.handleCloseEvent(closeEvent);
	                }
	                _this.transport = null;
	                _this.emit("closed");
	            }
	        };
	        var unbindListeners = function () {
	            Collections.objectApply(listeners, function (listener, event) {
	                _this.transport.unbind(event, listener);
	            });
	        };
	        Collections.objectApply(listeners, function (listener, event) {
	            _this.transport.bind(event, listener);
	        });
	    };
	    Connection.prototype.handleCloseEvent = function (closeEvent) {
	        var action = Protocol.getCloseAction(closeEvent);
	        var error = Protocol.getCloseError(closeEvent);
	        if (error) {
	            this.emit('error', error);
	        }
	        if (action) {
	            this.emit(action);
	        }
	    };
	    return Connection;
	}(dispatcher_1["default"]));
	exports.__esModule = true;
	exports["default"] = Connection;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var runtime_1 = __webpack_require__(2);
	var PusherAuthorizer = (function () {
	    function PusherAuthorizer(channel, options) {
	        this.channel = channel;
	        var authTransport = options.authTransport;
	        if (typeof runtime_1["default"].getAuthorizers()[authTransport] === "undefined") {
	            throw "'" + authTransport + "' is not a recognized auth transport";
	        }
	        this.type = authTransport;
	        this.options = options;
	        this.authOptions = (options || {}).auth || {};
	    }
	    PusherAuthorizer.prototype.composeQuery = function (socketId) {
	        var query = 'socket_id=' + encodeURIComponent(socketId) +
	            '&channel_name=' + encodeURIComponent(this.channel.name);
	        for (var i in this.authOptions.params) {
	            query += "&" + encodeURIComponent(i) + "=" + encodeURIComponent(this.authOptions.params[i]);
	        }
	        return query;
	    };
	    PusherAuthorizer.prototype.authorize = function (socketId, callback) {
	        PusherAuthorizer.authorizers = PusherAuthorizer.authorizers || runtime_1["default"].getAuthorizers();
	        return PusherAuthorizer.authorizers[this.type].call(this, runtime_1["default"], socketId, callback);
	    };
	    return PusherAuthorizer;
	}());
	exports.__esModule = true;
	exports["default"] = PusherAuthorizer;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var runtime_1 = __webpack_require__(2);
	var TimelineSender = (function () {
	    function TimelineSender(timeline, options) {
	        this.timeline = timeline;
	        this.options = options || {};
	    }
	    TimelineSender.prototype.send = function (encrypted, callback) {
	        if (this.timeline.isEmpty()) {
	            return;
	        }
	        this.timeline.send(runtime_1["default"].TimelineTransport.getAgent(this, encrypted), callback);
	    };
	    return TimelineSender;
	}());
	exports.__esModule = true;
	exports["default"] = TimelineSender;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var private_channel_1 = __webpack_require__(50);
	var logger_1 = __webpack_require__(8);
	var members_1 = __webpack_require__(52);
	var PresenceChannel = (function (_super) {
	    __extends(PresenceChannel, _super);
	    function PresenceChannel(name, pusher) {
	        _super.call(this, name, pusher);
	        this.members = new members_1["default"]();
	    }
	    PresenceChannel.prototype.authorize = function (socketId, callback) {
	        var _this = this;
	        _super.prototype.authorize.call(this, socketId, function (error, authData) {
	            if (!error) {
	                if (authData.channel_data === undefined) {
	                    logger_1["default"].warn("Invalid auth response for channel '" +
	                        _this.name +
	                        "', expected 'channel_data' field");
	                    callback("Invalid auth response");
	                    return;
	                }
	                var channelData = JSON.parse(authData.channel_data);
	                _this.members.setMyID(channelData.user_id);
	            }
	            callback(error, authData);
	        });
	    };
	    PresenceChannel.prototype.handleEvent = function (event, data) {
	        switch (event) {
	            case "pusher_internal:subscription_succeeded":
	                this.subscriptionPending = false;
	                this.subscribed = true;
	                if (this.subscriptionCancelled) {
	                    this.pusher.unsubscribe(this.name);
	                }
	                else {
	                    this.members.onSubscription(data);
	                    this.emit("pusher:subscription_succeeded", this.members);
	                }
	                break;
	            case "pusher_internal:member_added":
	                var addedMember = this.members.addMember(data);
	                this.emit('pusher:member_added', addedMember);
	                break;
	            case "pusher_internal:member_removed":
	                var removedMember = this.members.removeMember(data);
	                if (removedMember) {
	                    this.emit('pusher:member_removed', removedMember);
	                }
	                break;
	            default:
	                private_channel_1["default"].prototype.handleEvent.call(this, event, data);
	        }
	    };
	    PresenceChannel.prototype.disconnect = function () {
	        this.members.reset();
	        _super.prototype.disconnect.call(this);
	    };
	    return PresenceChannel;
	}(private_channel_1["default"]));
	exports.__esModule = true;
	exports["default"] = PresenceChannel;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var factory_1 = __webpack_require__(42);
	var channel_1 = __webpack_require__(51);
	var PrivateChannel = (function (_super) {
	    __extends(PrivateChannel, _super);
	    function PrivateChannel() {
	        _super.apply(this, arguments);
	    }
	    PrivateChannel.prototype.authorize = function (socketId, callback) {
	        var authorizer = factory_1["default"].createAuthorizer(this, this.pusher.config);
	        return authorizer.authorize(socketId, callback);
	    };
	    return PrivateChannel;
	}(channel_1["default"]));
	exports.__esModule = true;
	exports["default"] = PrivateChannel;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var dispatcher_1 = __webpack_require__(23);
	var Errors = __webpack_require__(30);
	var logger_1 = __webpack_require__(8);
	var Channel = (function (_super) {
	    __extends(Channel, _super);
	    function Channel(name, pusher) {
	        _super.call(this, function (event, data) {
	            logger_1["default"].debug('No callbacks on ' + name + ' for ' + event);
	        });
	        this.name = name;
	        this.pusher = pusher;
	        this.subscribed = false;
	        this.subscriptionPending = false;
	        this.subscriptionCancelled = false;
	    }
	    Channel.prototype.authorize = function (socketId, callback) {
	        return callback(false, {});
	    };
	    Channel.prototype.trigger = function (event, data) {
	        if (event.indexOf("client-") !== 0) {
	            throw new Errors.BadEventName("Event '" + event + "' does not start with 'client-'");
	        }
	        return this.pusher.send_event(event, data, this.name);
	    };
	    Channel.prototype.disconnect = function () {
	        this.subscribed = false;
	    };
	    Channel.prototype.handleEvent = function (event, data) {
	        if (event.indexOf("pusher_internal:") === 0) {
	            if (event === "pusher_internal:subscription_succeeded") {
	                this.subscriptionPending = false;
	                this.subscribed = true;
	                if (this.subscriptionCancelled) {
	                    this.pusher.unsubscribe(this.name);
	                }
	                else {
	                    this.emit("pusher:subscription_succeeded", data);
	                }
	            }
	        }
	        else {
	            this.emit(event, data);
	        }
	    };
	    Channel.prototype.subscribe = function () {
	        var _this = this;
	        if (this.subscribed) {
	            return;
	        }
	        this.subscriptionPending = true;
	        this.subscriptionCancelled = false;
	        this.authorize(this.pusher.connection.socket_id, function (error, data) {
	            if (error) {
	                _this.handleEvent('pusher:subscription_error', data);
	            }
	            else {
	                _this.pusher.send_event('pusher:subscribe', {
	                    auth: data.auth,
	                    channel_data: data.channel_data,
	                    channel: _this.name
	                });
	            }
	        });
	    };
	    Channel.prototype.unsubscribe = function () {
	        this.subscribed = false;
	        this.pusher.send_event('pusher:unsubscribe', {
	            channel: this.name
	        });
	    };
	    Channel.prototype.cancelSubscription = function () {
	        this.subscriptionCancelled = true;
	    };
	    Channel.prototype.reinstateSubscription = function () {
	        this.subscriptionCancelled = false;
	    };
	    return Channel;
	}(dispatcher_1["default"]));
	exports.__esModule = true;
	exports["default"] = Channel;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(9);
	var Members = (function () {
	    function Members() {
	        this.reset();
	    }
	    Members.prototype.get = function (id) {
	        if (Object.prototype.hasOwnProperty.call(this.members, id)) {
	            return {
	                id: id,
	                info: this.members[id]
	            };
	        }
	        else {
	            return null;
	        }
	    };
	    Members.prototype.each = function (callback) {
	        var _this = this;
	        Collections.objectApply(this.members, function (member, id) {
	            callback(_this.get(id));
	        });
	    };
	    Members.prototype.setMyID = function (id) {
	        this.myID = id;
	    };
	    Members.prototype.onSubscription = function (subscriptionData) {
	        this.members = subscriptionData.presence.hash;
	        this.count = subscriptionData.presence.count;
	        this.me = this.get(this.myID);
	    };
	    Members.prototype.addMember = function (memberData) {
	        if (this.get(memberData.user_id) === null) {
	            this.count++;
	        }
	        this.members[memberData.user_id] = memberData.user_info;
	        return this.get(memberData.user_id);
	    };
	    Members.prototype.removeMember = function (memberData) {
	        var member = this.get(memberData.user_id);
	        if (member) {
	            delete this.members[memberData.user_id];
	            this.count--;
	        }
	        return member;
	    };
	    Members.prototype.reset = function () {
	        this.members = {};
	        this.count = 0;
	        this.myID = null;
	        this.me = null;
	    };
	    return Members;
	}());
	exports.__esModule = true;
	exports["default"] = Members;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var dispatcher_1 = __webpack_require__(23);
	var timers_1 = __webpack_require__(12);
	var logger_1 = __webpack_require__(8);
	var Collections = __webpack_require__(9);
	var runtime_1 = __webpack_require__(2);
	var ConnectionManager = (function (_super) {
	    __extends(ConnectionManager, _super);
	    function ConnectionManager(key, options) {
	        var _this = this;
	        _super.call(this);
	        this.key = key;
	        this.options = options || {};
	        this.state = "initialized";
	        this.connection = null;
	        this.encrypted = !!options.encrypted;
	        this.timeline = this.options.timeline;
	        this.connectionCallbacks = this.buildConnectionCallbacks();
	        this.errorCallbacks = this.buildErrorCallbacks();
	        this.handshakeCallbacks = this.buildHandshakeCallbacks(this.errorCallbacks);
	        var Network = runtime_1["default"].getNetwork();
	        Network.bind("online", function () {
	            _this.timeline.info({ netinfo: "online" });
	            if (_this.state === "connecting" || _this.state === "unavailable") {
	                _this.retryIn(0);
	            }
	        });
	        Network.bind("offline", function () {
	            _this.timeline.info({ netinfo: "offline" });
	            if (_this.connection) {
	                _this.sendActivityCheck();
	            }
	        });
	        this.updateStrategy();
	    }
	    ConnectionManager.prototype.connect = function () {
	        if (this.connection || this.runner) {
	            return;
	        }
	        if (!this.strategy.isSupported()) {
	            this.updateState("failed");
	            return;
	        }
	        this.updateState("connecting");
	        this.startConnecting();
	        this.setUnavailableTimer();
	    };
	    ;
	    ConnectionManager.prototype.send = function (data) {
	        if (this.connection) {
	            return this.connection.send(data);
	        }
	        else {
	            return false;
	        }
	    };
	    ;
	    ConnectionManager.prototype.send_event = function (name, data, channel) {
	        if (this.connection) {
	            return this.connection.send_event(name, data, channel);
	        }
	        else {
	            return false;
	        }
	    };
	    ;
	    ConnectionManager.prototype.disconnect = function () {
	        this.disconnectInternally();
	        this.updateState("disconnected");
	    };
	    ;
	    ConnectionManager.prototype.isEncrypted = function () {
	        return this.encrypted;
	    };
	    ;
	    ConnectionManager.prototype.startConnecting = function () {
	        var _this = this;
	        var callback = function (error, handshake) {
	            if (error) {
	                _this.runner = _this.strategy.connect(0, callback);
	            }
	            else {
	                if (handshake.action === "error") {
	                    _this.emit("error", { type: "HandshakeError", error: handshake.error });
	                    _this.timeline.error({ handshakeError: handshake.error });
	                }
	                else {
	                    _this.abortConnecting();
	                    _this.handshakeCallbacks[handshake.action](handshake);
	                }
	            }
	        };
	        this.runner = this.strategy.connect(0, callback);
	    };
	    ;
	    ConnectionManager.prototype.abortConnecting = function () {
	        if (this.runner) {
	            this.runner.abort();
	            this.runner = null;
	        }
	    };
	    ;
	    ConnectionManager.prototype.disconnectInternally = function () {
	        this.abortConnecting();
	        this.clearRetryTimer();
	        this.clearUnavailableTimer();
	        if (this.connection) {
	            var connection = this.abandonConnection();
	            connection.close();
	        }
	    };
	    ;
	    ConnectionManager.prototype.updateStrategy = function () {
	        this.strategy = this.options.getStrategy({
	            key: this.key,
	            timeline: this.timeline,
	            encrypted: this.encrypted
	        });
	    };
	    ;
	    ConnectionManager.prototype.retryIn = function (delay) {
	        var _this = this;
	        this.timeline.info({ action: "retry", delay: delay });
	        if (delay > 0) {
	            this.emit("connecting_in", Math.round(delay / 1000));
	        }
	        this.retryTimer = new timers_1.OneOffTimer(delay || 0, function () {
	            _this.disconnectInternally();
	            _this.connect();
	        });
	    };
	    ;
	    ConnectionManager.prototype.clearRetryTimer = function () {
	        if (this.retryTimer) {
	            this.retryTimer.ensureAborted();
	            this.retryTimer = null;
	        }
	    };
	    ;
	    ConnectionManager.prototype.setUnavailableTimer = function () {
	        var _this = this;
	        this.unavailableTimer = new timers_1.OneOffTimer(this.options.unavailableTimeout, function () {
	            _this.updateState("unavailable");
	        });
	    };
	    ;
	    ConnectionManager.prototype.clearUnavailableTimer = function () {
	        if (this.unavailableTimer) {
	            this.unavailableTimer.ensureAborted();
	        }
	    };
	    ;
	    ConnectionManager.prototype.sendActivityCheck = function () {
	        var _this = this;
	        this.stopActivityCheck();
	        this.connection.ping();
	        this.activityTimer = new timers_1.OneOffTimer(this.options.pongTimeout, function () {
	            _this.timeline.error({ pong_timed_out: _this.options.pongTimeout });
	            _this.retryIn(0);
	        });
	    };
	    ;
	    ConnectionManager.prototype.resetActivityCheck = function () {
	        var _this = this;
	        this.stopActivityCheck();
	        if (!this.connection.handlesActivityChecks()) {
	            this.activityTimer = new timers_1.OneOffTimer(this.activityTimeout, function () {
	                _this.sendActivityCheck();
	            });
	        }
	    };
	    ;
	    ConnectionManager.prototype.stopActivityCheck = function () {
	        if (this.activityTimer) {
	            this.activityTimer.ensureAborted();
	        }
	    };
	    ;
	    ConnectionManager.prototype.buildConnectionCallbacks = function () {
	        var _this = this;
	        return {
	            message: function (message) {
	                _this.resetActivityCheck();
	                _this.emit('message', message);
	            },
	            ping: function () {
	                _this.send_event('pusher:pong', {});
	            },
	            activity: function () {
	                _this.resetActivityCheck();
	            },
	            error: function (error) {
	                _this.emit("error", { type: "WebSocketError", error: error });
	            },
	            closed: function () {
	                _this.abandonConnection();
	                if (_this.shouldRetry()) {
	                    _this.retryIn(1000);
	                }
	            }
	        };
	    };
	    ;
	    ConnectionManager.prototype.buildHandshakeCallbacks = function (errorCallbacks) {
	        var _this = this;
	        return Collections.extend({}, errorCallbacks, {
	            connected: function (handshake) {
	                _this.activityTimeout = Math.min(_this.options.activityTimeout, handshake.activityTimeout, handshake.connection.activityTimeout || Infinity);
	                _this.clearUnavailableTimer();
	                _this.setConnection(handshake.connection);
	                _this.socket_id = _this.connection.id;
	                _this.updateState("connected", { socket_id: _this.socket_id });
	            }
	        });
	    };
	    ;
	    ConnectionManager.prototype.buildErrorCallbacks = function () {
	        var _this = this;
	        var withErrorEmitted = function (callback) {
	            return function (result) {
	                if (result.error) {
	                    _this.emit("error", { type: "WebSocketError", error: result.error });
	                }
	                callback(result);
	            };
	        };
	        return {
	            ssl_only: withErrorEmitted(function () {
	                _this.encrypted = true;
	                _this.updateStrategy();
	                _this.retryIn(0);
	            }),
	            refused: withErrorEmitted(function () {
	                _this.disconnect();
	            }),
	            backoff: withErrorEmitted(function () {
	                _this.retryIn(1000);
	            }),
	            retry: withErrorEmitted(function () {
	                _this.retryIn(0);
	            })
	        };
	    };
	    ;
	    ConnectionManager.prototype.setConnection = function (connection) {
	        this.connection = connection;
	        for (var event in this.connectionCallbacks) {
	            this.connection.bind(event, this.connectionCallbacks[event]);
	        }
	        this.resetActivityCheck();
	    };
	    ;
	    ConnectionManager.prototype.abandonConnection = function () {
	        if (!this.connection) {
	            return;
	        }
	        this.stopActivityCheck();
	        for (var event in this.connectionCallbacks) {
	            this.connection.unbind(event, this.connectionCallbacks[event]);
	        }
	        var connection = this.connection;
	        this.connection = null;
	        return connection;
	    };
	    ConnectionManager.prototype.updateState = function (newState, data) {
	        var previousState = this.state;
	        this.state = newState;
	        if (previousState !== newState) {
	            var newStateDescription = newState;
	            if (newStateDescription === "connected") {
	                newStateDescription += " with new socket ID " + data.socket_id;
	            }
	            logger_1["default"].debug('State changed', previousState + ' -> ' + newStateDescription);
	            this.timeline.info({ state: newState, params: data });
	            this.emit('state_change', { previous: previousState, current: newState });
	            this.emit(newState, data);
	        }
	    };
	    ConnectionManager.prototype.shouldRetry = function () {
	        return this.state === "connecting" || this.state === "connected";
	    };
	    return ConnectionManager;
	}(dispatcher_1["default"]));
	exports.__esModule = true;
	exports["default"] = ConnectionManager;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(9);
	var factory_1 = __webpack_require__(42);
	var Channels = (function () {
	    function Channels() {
	        this.channels = {};
	    }
	    Channels.prototype.add = function (name, pusher) {
	        if (!this.channels[name]) {
	            this.channels[name] = createChannel(name, pusher);
	        }
	        return this.channels[name];
	    };
	    Channels.prototype.all = function () {
	        return Collections.values(this.channels);
	    };
	    Channels.prototype.find = function (name) {
	        return this.channels[name];
	    };
	    Channels.prototype.remove = function (name) {
	        var channel = this.channels[name];
	        delete this.channels[name];
	        return channel;
	    };
	    Channels.prototype.disconnect = function () {
	        Collections.objectApply(this.channels, function (channel) {
	            channel.disconnect();
	        });
	    };
	    return Channels;
	}());
	exports.__esModule = true;
	exports["default"] = Channels;
	function createChannel(name, pusher) {
	    if (name.indexOf('private-') === 0) {
	        return factory_1["default"].createPrivateChannel(name, pusher);
	    }
	    else if (name.indexOf('presence-') === 0) {
	        return factory_1["default"].createPresenceChannel(name, pusher);
	    }
	    else {
	        return factory_1["default"].createChannel(name, pusher);
	    }
	}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var factory_1 = __webpack_require__(42);
	var util_1 = __webpack_require__(11);
	var Errors = __webpack_require__(30);
	var Collections = __webpack_require__(9);
	var TransportStrategy = (function () {
	    function TransportStrategy(name, priority, transport, options) {
	        this.name = name;
	        this.priority = priority;
	        this.transport = transport;
	        this.options = options || {};
	    }
	    TransportStrategy.prototype.isSupported = function () {
	        return this.transport.isSupported({
	            encrypted: this.options.encrypted
	        });
	    };
	    TransportStrategy.prototype.connect = function (minPriority, callback) {
	        var _this = this;
	        if (!this.isSupported()) {
	            return failAttempt(new Errors.UnsupportedStrategy(), callback);
	        }
	        else if (this.priority < minPriority) {
	            return failAttempt(new Errors.TransportPriorityTooLow(), callback);
	        }
	        var connected = false;
	        var transport = this.transport.createConnection(this.name, this.priority, this.options.key, this.options);
	        var handshake = null;
	        var onInitialized = function () {
	            transport.unbind("initialized", onInitialized);
	            transport.connect();
	        };
	        var onOpen = function () {
	            handshake = factory_1["default"].createHandshake(transport, function (result) {
	                connected = true;
	                unbindListeners();
	                callback(null, result);
	            });
	        };
	        var onError = function (error) {
	            unbindListeners();
	            callback(error);
	        };
	        var onClosed = function () {
	            unbindListeners();
	            var serializedTransport;
	            serializedTransport = Collections.safeJSONStringify(transport);
	            callback(new Errors.TransportClosed(serializedTransport));
	        };
	        var unbindListeners = function () {
	            transport.unbind("initialized", onInitialized);
	            transport.unbind("open", onOpen);
	            transport.unbind("error", onError);
	            transport.unbind("closed", onClosed);
	        };
	        transport.bind("initialized", onInitialized);
	        transport.bind("open", onOpen);
	        transport.bind("error", onError);
	        transport.bind("closed", onClosed);
	        transport.initialize();
	        return {
	            abort: function () {
	                if (connected) {
	                    return;
	                }
	                unbindListeners();
	                if (handshake) {
	                    handshake.close();
	                }
	                else {
	                    transport.close();
	                }
	            },
	            forceMinPriority: function (p) {
	                if (connected) {
	                    return;
	                }
	                if (_this.priority < p) {
	                    if (handshake) {
	                        handshake.close();
	                    }
	                    else {
	                        transport.close();
	                    }
	                }
	            }
	        };
	    };
	    return TransportStrategy;
	}());
	exports.__esModule = true;
	exports["default"] = TransportStrategy;
	function failAttempt(error, callback) {
	    util_1["default"].defer(function () {
	        callback(error);
	    });
	    return {
	        abort: function () { },
	        forceMinPriority: function () { }
	    };
	}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(9);
	var util_1 = __webpack_require__(11);
	var timers_1 = __webpack_require__(12);
	var SequentialStrategy = (function () {
	    function SequentialStrategy(strategies, options) {
	        this.strategies = strategies;
	        this.loop = Boolean(options.loop);
	        this.failFast = Boolean(options.failFast);
	        this.timeout = options.timeout;
	        this.timeoutLimit = options.timeoutLimit;
	    }
	    SequentialStrategy.prototype.isSupported = function () {
	        return Collections.any(this.strategies, util_1["default"].method("isSupported"));
	    };
	    SequentialStrategy.prototype.connect = function (minPriority, callback) {
	        var _this = this;
	        var strategies = this.strategies;
	        var current = 0;
	        var timeout = this.timeout;
	        var runner = null;
	        var tryNextStrategy = function (error, handshake) {
	            if (handshake) {
	                callback(null, handshake);
	            }
	            else {
	                current = current + 1;
	                if (_this.loop) {
	                    current = current % strategies.length;
	                }
	                if (current < strategies.length) {
	                    if (timeout) {
	                        timeout = timeout * 2;
	                        if (_this.timeoutLimit) {
	                            timeout = Math.min(timeout, _this.timeoutLimit);
	                        }
	                    }
	                    runner = _this.tryStrategy(strategies[current], minPriority, { timeout: timeout, failFast: _this.failFast }, tryNextStrategy);
	                }
	                else {
	                    callback(true);
	                }
	            }
	        };
	        runner = this.tryStrategy(strategies[current], minPriority, { timeout: timeout, failFast: this.failFast }, tryNextStrategy);
	        return {
	            abort: function () {
	                runner.abort();
	            },
	            forceMinPriority: function (p) {
	                minPriority = p;
	                if (runner) {
	                    runner.forceMinPriority(p);
	                }
	            }
	        };
	    };
	    SequentialStrategy.prototype.tryStrategy = function (strategy, minPriority, options, callback) {
	        var timer = null;
	        var runner = null;
	        if (options.timeout > 0) {
	            timer = new timers_1.OneOffTimer(options.timeout, function () {
	                runner.abort();
	                callback(true);
	            });
	        }
	        runner = strategy.connect(minPriority, function (error, handshake) {
	            if (error && timer && timer.isRunning() && !options.failFast) {
	                return;
	            }
	            if (timer) {
	                timer.ensureAborted();
	            }
	            callback(error, handshake);
	        });
	        return {
	            abort: function () {
	                if (timer) {
	                    timer.ensureAborted();
	                }
	                runner.abort();
	            },
	            forceMinPriority: function (p) {
	                runner.forceMinPriority(p);
	            }
	        };
	    };
	    return SequentialStrategy;
	}());
	exports.__esModule = true;
	exports["default"] = SequentialStrategy;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var Collections = __webpack_require__(9);
	var util_1 = __webpack_require__(11);
	var BestConnectedEverStrategy = (function () {
	    function BestConnectedEverStrategy(strategies) {
	        this.strategies = strategies;
	    }
	    BestConnectedEverStrategy.prototype.isSupported = function () {
	        return Collections.any(this.strategies, util_1["default"].method("isSupported"));
	    };
	    BestConnectedEverStrategy.prototype.connect = function (minPriority, callback) {
	        return connect(this.strategies, minPriority, function (i, runners) {
	            return function (error, handshake) {
	                runners[i].error = error;
	                if (error) {
	                    if (allRunnersFailed(runners)) {
	                        callback(true);
	                    }
	                    return;
	                }
	                Collections.apply(runners, function (runner) {
	                    runner.forceMinPriority(handshake.transport.priority);
	                });
	                callback(null, handshake);
	            };
	        });
	    };
	    return BestConnectedEverStrategy;
	}());
	exports.__esModule = true;
	exports["default"] = BestConnectedEverStrategy;
	function connect(strategies, minPriority, callbackBuilder) {
	    var runners = Collections.map(strategies, function (strategy, i, _, rs) {
	        return strategy.connect(minPriority, callbackBuilder(i, rs));
	    });
	    return {
	        abort: function () {
	            Collections.apply(runners, abortRunner);
	        },
	        forceMinPriority: function (p) {
	            Collections.apply(runners, function (runner) {
	                runner.forceMinPriority(p);
	            });
	        }
	    };
	}
	function allRunnersFailed(runners) {
	    return Collections.all(runners, function (runner) {
	        return Boolean(runner.error);
	    });
	}
	function abortRunner(runner) {
	    if (!runner.error && !runner.aborted) {
	        runner.abort();
	        runner.aborted = true;
	    }
	}


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var util_1 = __webpack_require__(11);
	var runtime_1 = __webpack_require__(2);
	var sequential_strategy_1 = __webpack_require__(56);
	var Collections = __webpack_require__(9);
	var CachedStrategy = (function () {
	    function CachedStrategy(strategy, transports, options) {
	        this.strategy = strategy;
	        this.transports = transports;
	        this.ttl = options.ttl || 1800 * 1000;
	        this.encrypted = options.encrypted;
	        this.timeline = options.timeline;
	    }
	    CachedStrategy.prototype.isSupported = function () {
	        return this.strategy.isSupported();
	    };
	    CachedStrategy.prototype.connect = function (minPriority, callback) {
	        var encrypted = this.encrypted;
	        var info = fetchTransportCache(encrypted);
	        var strategies = [this.strategy];
	        if (info && info.timestamp + this.ttl >= util_1["default"].now()) {
	            var transport = this.transports[info.transport];
	            if (transport) {
	                this.timeline.info({
	                    cached: true,
	                    transport: info.transport,
	                    latency: info.latency
	                });
	                strategies.push(new sequential_strategy_1["default"]([transport], {
	                    timeout: info.latency * 2 + 1000,
	                    failFast: true
	                }));
	            }
	        }
	        var startTimestamp = util_1["default"].now();
	        var runner = strategies.pop().connect(minPriority, function cb(error, handshake) {
	            if (error) {
	                flushTransportCache(encrypted);
	                if (strategies.length > 0) {
	                    startTimestamp = util_1["default"].now();
	                    runner = strategies.pop().connect(minPriority, cb);
	                }
	                else {
	                    callback(error);
	                }
	            }
	            else {
	                storeTransportCache(encrypted, handshake.transport.name, util_1["default"].now() - startTimestamp);
	                callback(null, handshake);
	            }
	        });
	        return {
	            abort: function () {
	                runner.abort();
	            },
	            forceMinPriority: function (p) {
	                minPriority = p;
	                if (runner) {
	                    runner.forceMinPriority(p);
	                }
	            }
	        };
	    };
	    return CachedStrategy;
	}());
	exports.__esModule = true;
	exports["default"] = CachedStrategy;
	function getTransportCacheKey(encrypted) {
	    return "pusherTransport" + (encrypted ? "Encrypted" : "Unencrypted");
	}
	function fetchTransportCache(encrypted) {
	    var storage = runtime_1["default"].getLocalStorage();
	    if (storage) {
	        try {
	            var serializedCache = storage[getTransportCacheKey(encrypted)];
	            if (serializedCache) {
	                return JSON.parse(serializedCache);
	            }
	        }
	        catch (e) {
	            flushTransportCache(encrypted);
	        }
	    }
	    return null;
	}
	function storeTransportCache(encrypted, transport, latency) {
	    var storage = runtime_1["default"].getLocalStorage();
	    if (storage) {
	        try {
	            storage[getTransportCacheKey(encrypted)] = Collections.safeJSONStringify({
	                timestamp: util_1["default"].now(),
	                transport: transport,
	                latency: latency
	            });
	        }
	        catch (e) {
	        }
	    }
	}
	function flushTransportCache(encrypted) {
	    var storage = runtime_1["default"].getLocalStorage();
	    if (storage) {
	        try {
	            delete storage[getTransportCacheKey(encrypted)];
	        }
	        catch (e) {
	        }
	    }
	}


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var timers_1 = __webpack_require__(12);
	var DelayedStrategy = (function () {
	    function DelayedStrategy(strategy, _a) {
	        var number = _a.delay;
	        this.strategy = strategy;
	        this.options = { delay: number };
	    }
	    DelayedStrategy.prototype.isSupported = function () {
	        return this.strategy.isSupported();
	    };
	    DelayedStrategy.prototype.connect = function (minPriority, callback) {
	        var strategy = this.strategy;
	        var runner;
	        var timer = new timers_1.OneOffTimer(this.options.delay, function () {
	            runner = strategy.connect(minPriority, callback);
	        });
	        return {
	            abort: function () {
	                timer.ensureAborted();
	                if (runner) {
	                    runner.abort();
	                }
	            },
	            forceMinPriority: function (p) {
	                minPriority = p;
	                if (runner) {
	                    runner.forceMinPriority(p);
	                }
	            }
	        };
	    };
	    return DelayedStrategy;
	}());
	exports.__esModule = true;
	exports["default"] = DelayedStrategy;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

	"use strict";
	var IfStrategy = (function () {
	    function IfStrategy(test, trueBranch, falseBranch) {
	        this.test = test;
	        this.trueBranch = trueBranch;
	        this.falseBranch = falseBranch;
	    }
	    IfStrategy.prototype.isSupported = function () {
	        var branch = this.test() ? this.trueBranch : this.falseBranch;
	        return branch.isSupported();
	    };
	    IfStrategy.prototype.connect = function (minPriority, callback) {
	        var branch = this.test() ? this.trueBranch : this.falseBranch;
	        return branch.connect(minPriority, callback);
	    };
	    return IfStrategy;
	}());
	exports.__esModule = true;
	exports["default"] = IfStrategy;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

	"use strict";
	var FirstConnectedStrategy = (function () {
	    function FirstConnectedStrategy(strategy) {
	        this.strategy = strategy;
	    }
	    FirstConnectedStrategy.prototype.isSupported = function () {
	        return this.strategy.isSupported();
	    };
	    FirstConnectedStrategy.prototype.connect = function (minPriority, callback) {
	        var runner = this.strategy.connect(minPriority, function (error, handshake) {
	            if (handshake) {
	                runner.abort();
	            }
	            callback(error, handshake);
	        });
	        return runner;
	    };
	    return FirstConnectedStrategy;
	}());
	exports.__esModule = true;
	exports["default"] = FirstConnectedStrategy;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var defaults_1 = __webpack_require__(5);
	exports.getGlobalConfig = function () {
	    return {
	        wsHost: defaults_1["default"].host,
	        wsPort: defaults_1["default"].ws_port,
	        wssPort: defaults_1["default"].wss_port,
	        httpHost: defaults_1["default"].sockjs_host,
	        httpPort: defaults_1["default"].sockjs_http_port,
	        httpsPort: defaults_1["default"].sockjs_https_port,
	        httpPath: defaults_1["default"].sockjs_path,
	        statsHost: defaults_1["default"].stats_host,
	        authEndpoint: defaults_1["default"].channel_auth_endpoint,
	        authTransport: defaults_1["default"].channel_auth_transport,
	        activity_timeout: defaults_1["default"].activity_timeout,
	        pong_timeout: defaults_1["default"].pong_timeout,
	        unavailable_timeout: defaults_1["default"].unavailable_timeout
	    };
	};
	exports.getClusterConfig = function (clusterName) {
	    return {
	        wsHost: "ws-" + clusterName + ".pusher.com",
	        httpHost: "sockjs-" + clusterName + ".pusher.com"
	    };
	};


/***/ })
/******/ ])
});
;

/***/ }),
/* 173 */
/***/ (function(module, exports) {

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Connector = function () {
    function Connector(options) {
        classCallCheck(this, Connector);

        this._defaultOptions = {
            auth: {
                headers: {}
            },
            authEndpoint: '/broadcasting/auth',
            broadcaster: 'pusher',
            csrfToken: null,
            host: null,
            key: null,
            namespace: 'App.Events'
        };
        this.setOptions(options);
        this.connect();
    }

    createClass(Connector, [{
        key: 'setOptions',
        value: function setOptions(options) {
            this.options = _extends(this._defaultOptions, options);
            if (this.csrfToken()) {
                this.options.auth.headers['X-CSRF-TOKEN'] = this.csrfToken();
            }
            return options;
        }
    }, {
        key: 'csrfToken',
        value: function csrfToken() {
            var selector = void 0;
            if (window && window['Laravel'] && window['Laravel'].csrfToken) {
                return window['Laravel'].csrfToken;
            } else if (this.options.csrfToken) {
                return this.options.csrfToken;
            } else if (typeof document !== 'undefined' && (selector = document.querySelector('meta[name="csrf-token"]'))) {
                return selector.getAttribute('content');
            }
            return null;
        }
    }]);
    return Connector;
}();

var Channel = function () {
    function Channel() {
        classCallCheck(this, Channel);
    }

    createClass(Channel, [{
        key: 'notification',
        value: function notification(callback) {
            return this.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', callback);
        }
    }, {
        key: 'listenForWhisper',
        value: function listenForWhisper(event, callback) {
            return this.listen('.client-' + event, callback);
        }
    }]);
    return Channel;
}();

var EventFormatter = function () {
    function EventFormatter(namespace) {
        classCallCheck(this, EventFormatter);

        this.setNamespace(namespace);
    }

    createClass(EventFormatter, [{
        key: 'format',
        value: function format(event) {
            if (event.charAt(0) === '.' || event.charAt(0) === '\\') {
                return event.substr(1);
            } else if (this.namespace) {
                event = this.namespace + '.' + event;
            }
            return event.replace(/\./g, '\\');
        }
    }, {
        key: 'setNamespace',
        value: function setNamespace(value) {
            this.namespace = value;
        }
    }]);
    return EventFormatter;
}();

var PusherChannel = function (_Channel) {
    inherits(PusherChannel, _Channel);

    function PusherChannel(pusher, name, options) {
        classCallCheck(this, PusherChannel);

        var _this = possibleConstructorReturn(this, (PusherChannel.__proto__ || Object.getPrototypeOf(PusherChannel)).call(this));

        _this.name = name;
        _this.pusher = pusher;
        _this.options = options;
        _this.eventFormatter = new EventFormatter(_this.options.namespace);
        _this.subscribe();
        return _this;
    }

    createClass(PusherChannel, [{
        key: 'subscribe',
        value: function subscribe() {
            this.subscription = this.pusher.subscribe(this.name);
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            this.pusher.unsubscribe(this.name);
        }
    }, {
        key: 'listen',
        value: function listen(event, callback) {
            this.on(this.eventFormatter.format(event), callback);
            return this;
        }
    }, {
        key: 'stopListening',
        value: function stopListening(event) {
            this.subscription.unbind(this.eventFormatter.format(event));
            return this;
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            this.subscription.bind(event, callback);
            return this;
        }
    }]);
    return PusherChannel;
}(Channel);

var PusherPrivateChannel = function (_PusherChannel) {
    inherits(PusherPrivateChannel, _PusherChannel);

    function PusherPrivateChannel() {
        classCallCheck(this, PusherPrivateChannel);
        return possibleConstructorReturn(this, (PusherPrivateChannel.__proto__ || Object.getPrototypeOf(PusherPrivateChannel)).apply(this, arguments));
    }

    createClass(PusherPrivateChannel, [{
        key: 'whisper',
        value: function whisper(eventName, data) {
            this.pusher.channels.channels[this.name].trigger('client-' + eventName, data);
            return this;
        }
    }]);
    return PusherPrivateChannel;
}(PusherChannel);

var PusherPresenceChannel = function (_PusherChannel) {
    inherits(PusherPresenceChannel, _PusherChannel);

    function PusherPresenceChannel() {
        classCallCheck(this, PusherPresenceChannel);
        return possibleConstructorReturn(this, (PusherPresenceChannel.__proto__ || Object.getPrototypeOf(PusherPresenceChannel)).apply(this, arguments));
    }

    createClass(PusherPresenceChannel, [{
        key: 'here',
        value: function here(callback) {
            this.on('pusher:subscription_succeeded', function (data) {
                callback(Object.keys(data.members).map(function (k) {
                    return data.members[k];
                }));
            });
            return this;
        }
    }, {
        key: 'joining',
        value: function joining(callback) {
            this.on('pusher:member_added', function (member) {
                callback(member.info);
            });
            return this;
        }
    }, {
        key: 'leaving',
        value: function leaving(callback) {
            this.on('pusher:member_removed', function (member) {
                callback(member.info);
            });
            return this;
        }
    }, {
        key: 'whisper',
        value: function whisper(eventName, data) {
            this.pusher.channels.channels[this.name].trigger('client-' + eventName, data);
            return this;
        }
    }]);
    return PusherPresenceChannel;
}(PusherChannel);

var SocketIoChannel = function (_Channel) {
    inherits(SocketIoChannel, _Channel);

    function SocketIoChannel(socket, name, options) {
        classCallCheck(this, SocketIoChannel);

        var _this = possibleConstructorReturn(this, (SocketIoChannel.__proto__ || Object.getPrototypeOf(SocketIoChannel)).call(this));

        _this.events = {};
        _this.name = name;
        _this.socket = socket;
        _this.options = options;
        _this.eventFormatter = new EventFormatter(_this.options.namespace);
        _this.subscribe();
        _this.configureReconnector();
        return _this;
    }

    createClass(SocketIoChannel, [{
        key: 'subscribe',
        value: function subscribe() {
            this.socket.emit('subscribe', {
                channel: this.name,
                auth: this.options.auth || {}
            });
        }
    }, {
        key: 'unsubscribe',
        value: function unsubscribe() {
            this.unbind();
            this.socket.emit('unsubscribe', {
                channel: this.name,
                auth: this.options.auth || {}
            });
        }
    }, {
        key: 'listen',
        value: function listen(event, callback) {
            this.on(this.eventFormatter.format(event), callback);
            return this;
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            var _this2 = this;

            var listener = function listener(channel, data) {
                if (_this2.name == channel) {
                    callback(data);
                }
            };
            this.socket.on(event, listener);
            this.bind(event, listener);
        }
    }, {
        key: 'configureReconnector',
        value: function configureReconnector() {
            var _this3 = this;

            var listener = function listener() {
                _this3.subscribe();
            };
            this.socket.on('reconnect', listener);
            this.bind('reconnect', listener);
        }
    }, {
        key: 'bind',
        value: function bind(event, callback) {
            this.events[event] = this.events[event] || [];
            this.events[event].push(callback);
        }
    }, {
        key: 'unbind',
        value: function unbind() {
            var _this4 = this;

            Object.keys(this.events).forEach(function (event) {
                _this4.events[event].forEach(function (callback) {
                    _this4.socket.removeListener(event, callback);
                });
                delete _this4.events[event];
            });
        }
    }]);
    return SocketIoChannel;
}(Channel);

var SocketIoPrivateChannel = function (_SocketIoChannel) {
    inherits(SocketIoPrivateChannel, _SocketIoChannel);

    function SocketIoPrivateChannel() {
        classCallCheck(this, SocketIoPrivateChannel);
        return possibleConstructorReturn(this, (SocketIoPrivateChannel.__proto__ || Object.getPrototypeOf(SocketIoPrivateChannel)).apply(this, arguments));
    }

    createClass(SocketIoPrivateChannel, [{
        key: 'whisper',
        value: function whisper(eventName, data) {
            this.socket.emit('client event', {
                channel: this.name,
                event: 'client-' + eventName,
                data: data
            });
            return this;
        }
    }]);
    return SocketIoPrivateChannel;
}(SocketIoChannel);

var SocketIoPresenceChannel = function (_SocketIoPrivateChann) {
    inherits(SocketIoPresenceChannel, _SocketIoPrivateChann);

    function SocketIoPresenceChannel() {
        classCallCheck(this, SocketIoPresenceChannel);
        return possibleConstructorReturn(this, (SocketIoPresenceChannel.__proto__ || Object.getPrototypeOf(SocketIoPresenceChannel)).apply(this, arguments));
    }

    createClass(SocketIoPresenceChannel, [{
        key: 'here',
        value: function here(callback) {
            this.on('presence:subscribed', function (members) {
                callback(members.map(function (m) {
                    return m.user_info;
                }));
            });
            return this;
        }
    }, {
        key: 'joining',
        value: function joining(callback) {
            this.on('presence:joining', function (member) {
                return callback(member.user_info);
            });
            return this;
        }
    }, {
        key: 'leaving',
        value: function leaving(callback) {
            this.on('presence:leaving', function (member) {
                return callback(member.user_info);
            });
            return this;
        }
    }]);
    return SocketIoPresenceChannel;
}(SocketIoPrivateChannel);

var PusherConnector = function (_Connector) {
    inherits(PusherConnector, _Connector);

    function PusherConnector() {
        var _ref;

        classCallCheck(this, PusherConnector);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = possibleConstructorReturn(this, (_ref = PusherConnector.__proto__ || Object.getPrototypeOf(PusherConnector)).call.apply(_ref, [this].concat(args)));

        _this.channels = {};
        return _this;
    }

    createClass(PusherConnector, [{
        key: 'connect',
        value: function connect() {
            this.pusher = new Pusher(this.options.key, this.options);
        }
    }, {
        key: 'listen',
        value: function listen(name, event, callback) {
            return this.channel(name).listen(event, callback);
        }
    }, {
        key: 'channel',
        value: function channel(name) {
            if (!this.channels[name]) {
                this.channels[name] = new PusherChannel(this.pusher, name, this.options);
            }
            return this.channels[name];
        }
    }, {
        key: 'privateChannel',
        value: function privateChannel(name) {
            if (!this.channels['private-' + name]) {
                this.channels['private-' + name] = new PusherPrivateChannel(this.pusher, 'private-' + name, this.options);
            }
            return this.channels['private-' + name];
        }
    }, {
        key: 'presenceChannel',
        value: function presenceChannel(name) {
            if (!this.channels['presence-' + name]) {
                this.channels['presence-' + name] = new PusherPresenceChannel(this.pusher, 'presence-' + name, this.options);
            }
            return this.channels['presence-' + name];
        }
    }, {
        key: 'leave',
        value: function leave(name) {
            var _this2 = this;

            var channels = [name, 'private-' + name, 'presence-' + name];
            channels.forEach(function (name, index) {
                if (_this2.channels[name]) {
                    _this2.channels[name].unsubscribe();
                    delete _this2.channels[name];
                }
            });
        }
    }, {
        key: 'socketId',
        value: function socketId() {
            return this.pusher.connection.socket_id;
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this.pusher.disconnect();
        }
    }]);
    return PusherConnector;
}(Connector);

var SocketIoConnector = function (_Connector) {
    inherits(SocketIoConnector, _Connector);

    function SocketIoConnector() {
        var _ref;

        classCallCheck(this, SocketIoConnector);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = possibleConstructorReturn(this, (_ref = SocketIoConnector.__proto__ || Object.getPrototypeOf(SocketIoConnector)).call.apply(_ref, [this].concat(args)));

        _this.channels = {};
        return _this;
    }

    createClass(SocketIoConnector, [{
        key: 'connect',
        value: function connect() {
            this.socket = io(this.options.host, this.options);
            return this.socket;
        }
    }, {
        key: 'listen',
        value: function listen(name, event, callback) {
            return this.channel(name).listen(event, callback);
        }
    }, {
        key: 'channel',
        value: function channel(name) {
            if (!this.channels[name]) {
                this.channels[name] = new SocketIoChannel(this.socket, name, this.options);
            }
            return this.channels[name];
        }
    }, {
        key: 'privateChannel',
        value: function privateChannel(name) {
            if (!this.channels['private-' + name]) {
                this.channels['private-' + name] = new SocketIoPrivateChannel(this.socket, 'private-' + name, this.options);
            }
            return this.channels['private-' + name];
        }
    }, {
        key: 'presenceChannel',
        value: function presenceChannel(name) {
            if (!this.channels['presence-' + name]) {
                this.channels['presence-' + name] = new SocketIoPresenceChannel(this.socket, 'presence-' + name, this.options);
            }
            return this.channels['presence-' + name];
        }
    }, {
        key: 'leave',
        value: function leave(name) {
            var _this2 = this;

            var channels = [name, 'private-' + name, 'presence-' + name];
            channels.forEach(function (name) {
                if (_this2.channels[name]) {
                    _this2.channels[name].unsubscribe();
                    delete _this2.channels[name];
                }
            });
        }
    }, {
        key: 'socketId',
        value: function socketId() {
            return this.socket.id;
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this.socket.disconnect();
        }
    }]);
    return SocketIoConnector;
}(Connector);

var Echo = function () {
    function Echo(options) {
        classCallCheck(this, Echo);

        this.options = options;
        if (typeof Vue === 'function' && Vue.http) {
            this.registerVueRequestInterceptor();
        }
        if (typeof axios === 'function') {
            this.registerAxiosRequestInterceptor();
        }
        if (typeof jQuery === 'function') {
            this.registerjQueryAjaxSetup();
        }
        if (this.options.broadcaster == 'pusher') {
            this.connector = new PusherConnector(this.options);
        } else if (this.options.broadcaster == 'socket.io') {
            this.connector = new SocketIoConnector(this.options);
        }
    }

    createClass(Echo, [{
        key: 'registerVueRequestInterceptor',
        value: function registerVueRequestInterceptor() {
            var _this = this;

            Vue.http.interceptors.push(function (request, next) {
                if (_this.socketId()) {
                    request.headers.set('X-Socket-ID', _this.socketId());
                }
                next();
            });
        }
    }, {
        key: 'registerAxiosRequestInterceptor',
        value: function registerAxiosRequestInterceptor() {
            var _this2 = this;

            axios.interceptors.request.use(function (config) {
                if (_this2.socketId()) {
                    config.headers['X-Socket-Id'] = _this2.socketId();
                }
                return config;
            });
        }
    }, {
        key: 'registerjQueryAjaxSetup',
        value: function registerjQueryAjaxSetup() {
            var _this3 = this;

            if (typeof jQuery.ajax != 'undefined') {
                jQuery.ajaxSetup({
                    beforeSend: function beforeSend(xhr) {
                        if (_this3.socketId()) {
                            xhr.setRequestHeader('X-Socket-Id', _this3.socketId());
                        }
                    }
                });
            }
        }
    }, {
        key: 'listen',
        value: function listen(channel, event, callback) {
            return this.connector.listen(channel, event, callback);
        }
    }, {
        key: 'channel',
        value: function channel(_channel) {
            return this.connector.channel(_channel);
        }
    }, {
        key: 'private',
        value: function _private(channel) {
            return this.connector.privateChannel(channel);
        }
    }, {
        key: 'join',
        value: function join(channel) {
            return this.connector.presenceChannel(channel);
        }
    }, {
        key: 'leave',
        value: function leave(channel) {
            this.connector.leave(channel);
        }
    }, {
        key: 'socketId',
        value: function socketId() {
            return this.connector.socketId();
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this.connector.disconnect();
        }
    }]);
    return Echo;
}();

module.exports = Echo;

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(175),
  /* template */
  __webpack_require__(228),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Layout_MobileHeader__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Layout_MobileHeader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Layout_MobileHeader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout_DesktopHeader__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Layout_DesktopHeader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Layout_DesktopHeader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Includes_Notifications__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Includes_Notifications___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Includes_Notifications__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Includes_Modal__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Includes_Modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Includes_Modal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Includes_Search__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Includes_Search___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Includes_Search__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Layout_Footer__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Layout_Footer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_Layout_Footer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__includes_heartbeat__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        appMobileHeader: __WEBPACK_IMPORTED_MODULE_0__components_Layout_MobileHeader___default.a,
        appDesktopHeader: __WEBPACK_IMPORTED_MODULE_1__components_Layout_DesktopHeader___default.a,
        appNotifications: __WEBPACK_IMPORTED_MODULE_2__components_Includes_Notifications___default.a,
        appModal: __WEBPACK_IMPORTED_MODULE_3__components_Includes_Modal___default.a,
        appSearch: __WEBPACK_IMPORTED_MODULE_4__components_Includes_Search___default.a,
        appFooter: __WEBPACK_IMPORTED_MODULE_5__components_Layout_Footer___default.a
    },
    data: function data() {
        return {
            breakpoints: window.breakpoints
        };
    },

    methods: {
        hideMobileNav: function hideMobileNav() {
            document.body.classList.remove('mobile-nav-open');
        }
    },
    created: function created() {
        var _this = this;

        // Initialize Data
        this.$store.dispatch('fetchCategories');
        this.$store.dispatch('fetchRegions');
        // Listen to global broadcasts
        Echo.channel('services').listen('NewService', function (e) {
            _this.$store.dispatch('addService', { service: e.service });
        }).listen('RemoveService', function (e) {
            _this.$store.dispatch('removeService', { id: e.id });
        });

        // Start the applications heartbeat
        setInterval(function () {
            __WEBPACK_IMPORTED_MODULE_6__includes_heartbeat__["a" /* HeartBeat */].$emit('beat');
        }, 1000);
    }
});

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(177),
  /* template */
  __webpack_require__(178),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Layout/MobileHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 177 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
	computed: {
		avatar: function avatar() {
			return { backgroundImage: 'url(' + this.$store.getters.authUser.avatar };
		}
	},
	methods: {
		navToggle: function navToggle() {
			if (document.body.classList.contains('mobile-nav-open')) {
				document.body.classList.remove('mobile-nav-open');
			} else {
				document.body.classList.add('mobile-nav-open');
			}
		},
		hideMenu: function hideMenu() {
			document.body.classList.remove('mobile-nav-open');
		}
	}
});

/***/ }),
/* 178 */
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
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(180),
  /* template */
  __webpack_require__(181),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Layout/DesktopHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 180 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
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
});

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "desktop-header"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "desktop-nav"
  }, [_c('div', {
    staticClass: "logo"
  }, [_c('router-link', {
    attrs: {
      "to": "/"
    }
  }, [_c('img', {
    staticClass: "logo-img",
    attrs: {
      "src": "http://bidder.dev/logo_mock.png"
    }
  })])], 1), _vm._v(" "), _c('nav', {
    staticClass: "desktop-navigation-container"
  }, [_c('ul', {
    staticClass: "desktop-navigation"
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
  }), _vm._v(" Tjänster")])], 1), _vm._v(" "), _c('li', {
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
  }), _vm._v(" Information")])], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "desktop-user-container"
  }, [(!_vm.$store.getters.isAuthenticated) ? _c('div', {
    staticClass: "guest-actions"
  }, [_c('a', {
    staticClass: "btn btn-transparent",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'login'
        })
      }
    }
  }, [_vm._v("Logga In")]), _vm._v(" "), _c('a', {
    staticClass: "btn btn-primary",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'register'
        })
      }
    }
  }, [_vm._v("Registrera")])]) : _c('div', {
    staticClass: "auth-user",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleDropdown($event)
      }
    }
  }, [_c('div', {
    staticClass: "auth-avatar",
    style: (_vm.avatar)
  }), _vm._v(" "), _c('div', {
    staticClass: "auth-name"
  }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.$store.getters.authUser.username) + "\n\t\t\t\t\t\t"), _c('i', {
    staticClass: "fa fa-angle-down auth-arrow",
    class: {
      up: _vm.dropdown
    },
    attrs: {
      "aria-hidden": "true"
    }
  })])]), _vm._v(" "), (_vm.dropdown) ? _c('ul', {
    staticClass: "auth-dropdown"
  }, [_c('li', [_c('router-link', {
    attrs: {
      "to": "/profile/margul"
    }
  }, [_c('i', {
    staticClass: "fa fa-user-circle",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("Min profil")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/create-service"
    }
  }, [_c('i', {
    staticClass: "fa fa-users",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("Skapa tjänst")])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/profile"
    }
  }, [_c('i', {
    staticClass: "fa fa-cogs",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("Inställningar")])], 1), _vm._v(" "), _c('li', [_c('a', {
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
    staticClass: "fa fa-power-off",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v("Logga Ut")])])]) : _vm._e()])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-01c7636c", module.exports)
  }
}

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(183)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(186),
  /* template */
  __webpack_require__(187),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-05633b28",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Notifications.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(184);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("240d09a3", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-05633b28\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Notifications.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-05633b28\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Notifications.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "\n.notifications-component[data-v-05633b28] {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1000;\n  padding: 16px;\n  border: 1px solid rgba(27, 31, 35, 0.15);\n  text-align: center;\n}\n.notifications-component.success[data-v-05633b28] {\n    background-color: rgba(81, 163, 81, 0.95);\n    color: #fff;\n}\n.notifications-component.success a[data-v-05633b28] {\n      color: #008B00;\n}\n.notifications-component.info[data-v-05633b28] {\n    background-color: rgba(219, 237, 255, 0.95);\n    color: #032f62;\n}\n.notifications-component .notification-area[data-v-05633b28] {\n    display: flex;\n}\n.notifications-component .notification-area .notification-message[data-v-05633b28] {\n      flex: 10;\n}\n.notifications-component .notification-area .close-notification[data-v-05633b28] {\n      flex: 1;\n      text-align: right;\n}\n.notifications-component .notification-area .close-notification i[data-v-05633b28] {\n        cursor: pointer;\n}\n", ""]);

// exports


/***/ }),
/* 185 */
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
/* 186 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
	created: function created() {
		var _this = this;

		setTimeout(function () {
			_this.$store.dispatch('closeNotification');
		}, 4000);
	}
});

/***/ }),
/* 187 */
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
  }, [_vm._v(_vm._s(_vm.$store.getters.notificationLinkText))])] : _vm._e()], 2)])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-05633b28", module.exports)
  }
}

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(221),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Modal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Auth_Register__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Auth_Register___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Auth_Register__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Auth_Login__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Auth_Login___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Auth_Login__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Auth_PasswordReset__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Auth_PasswordReset___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Auth_PasswordReset__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Bids_CreateBid__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Bids_CreateBid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Bids_CreateBid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Bids_ShowBids__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Bids_ShowBids___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__Bids_ShowBids__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__User_Services_ShowBidModal__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__User_Services_ShowBidModal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__User_Services_ShowBidModal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ConfirmModal__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ConfirmModal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__ConfirmModal__);
//
//
//
//
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
		register: __WEBPACK_IMPORTED_MODULE_0__Auth_Register___default.a,
		login: __WEBPACK_IMPORTED_MODULE_1__Auth_Login___default.a,
		passwordReset: __WEBPACK_IMPORTED_MODULE_2__Auth_PasswordReset___default.a,
		createBid: __WEBPACK_IMPORTED_MODULE_3__Bids_CreateBid___default.a,
		showBids: __WEBPACK_IMPORTED_MODULE_4__Bids_ShowBids___default.a,
		confirm: __WEBPACK_IMPORTED_MODULE_6__ConfirmModal___default.a,
		showUserBid: __WEBPACK_IMPORTED_MODULE_5__User_Services_ShowBidModal___default.a
	}
});

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(191),
  /* template */
  __webpack_require__(193),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Auth/Register.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_classes_Form__ = __webpack_require__(5);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			processing: false,
			form: new __WEBPACK_IMPORTED_MODULE_1__includes_classes_Form__["a" /* default */]({
				username: '',
				email: '',
				password: ''
			})
		};
	},

	methods: {
		register: function register() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('register').new().post(this.form.data()).then(function (response) {
				_this.$store.commit('SET_AUTHENTICATED', { authenticated: true });
				_this.$store.commit('SET_USER', { user: response.user });
				_this.$store.dispatch('closeModal');
				_this.$router.push('/welcome');
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
});

/***/ }),
/* 192 */
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

/* harmony default export */ __webpack_exports__["a"] = (Errors);

/***/ }),
/* 193 */
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
    staticClass: "form-group has-feedback",
    class: {
      'has-error': _vm.form.errors.has('username')
    }
  }, [_c('label', {
    staticClass: "control-label",
    attrs: {
      "for": "name"
    }
  }, [_vm._v("Användarnamn")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.username),
      expression: "form.username"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "username",
      "placeholder": "Välj användarnamn"
    },
    domProps: {
      "value": (_vm.form.username)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.username = $event.target.value
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "fa fa-user-circle form-control-feedback"
  }), _vm._v(" "), (_vm.form.errors.has('username')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('username'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group has-feedback",
    class: {
      'has-error': _vm.form.errors.has('email')
    }
  }, [_c('label', {
    staticClass: "control-label",
    attrs: {
      "for": "email"
    }
  }, [_vm._v("Email")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.email),
      expression: "form.email"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "email",
      "name": "email",
      "placeholder": "Din emailadress"
    },
    domProps: {
      "value": (_vm.form.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.email = $event.target.value
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "fa fa-envelope form-control-feedback"
  }), _vm._v(" "), (_vm.form.errors.has('email')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('email'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group has-feedback",
    class: {
      'has-error': _vm.form.errors.has('password')
    }
  }, [_c('label', {
    staticClass: "control-label",
    attrs: {
      "for": "password"
    }
  }, [_vm._v("Lösenord")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.password),
      expression: "form.password"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password",
      "name": "password",
      "placeholder": "Skapa lösenord"
    },
    domProps: {
      "value": (_vm.form.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.password = $event.target.value
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "fa fa-key form-control-feedback"
  }), _vm._v(" "), (_vm.form.errors.has('password')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('password'))
    }
  }) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "help-block"
  }, [_vm._v("Minst en bokstav, ett nummer, och 7 tecken.")])]), _vm._v(" "), _c('div', {
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
  }, [_c('h3', [_vm._v("Registrera")]), _vm._v(" "), _c('div', {
    staticClass: "header-text"
  }, [_vm._v("Tar 60 sekunder och är helt gratis!")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-56832f92", module.exports)
  }
}

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(195),
  /* template */
  __webpack_require__(196),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Auth/Login.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(5);
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




/* harmony default export */ __webpack_exports__["default"] = ({
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
});

/***/ }),
/* 196 */
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
    staticClass: "form-group has-feedback",
    class: {
      'has-error': _vm.form.errors.has('email')
    }
  }, [_c('label', {
    staticClass: "control-label",
    attrs: {
      "for": "email"
    }
  }, [_vm._v("Email")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.email),
      expression: "form.email"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "email",
      "name": "email"
    },
    domProps: {
      "value": (_vm.form.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.email = $event.target.value
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "fa fa-envelope form-control-feedback"
  }), _vm._v(" "), (_vm.form.errors.has('email')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('email'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group has-feedback",
    class: {
      'has-error': _vm.form.errors.has('password')
    }
  }, [_c('label', {
    staticClass: "control-label",
    attrs: {
      "for": "password"
    }
  }, [_vm._v("Lösenord")]), _vm._v(" "), _c('a', {
    staticClass: "link is-weight-500 pull-right",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'passwordReset'
        })
      }
    }
  }, [_vm._v("Glömt lösenordet?")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.password),
      expression: "form.password"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "password",
      "name": "password"
    },
    domProps: {
      "value": (_vm.form.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.form.password = $event.target.value
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "fa fa-key form-control-feedback"
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
      "__c": function($event) {
        var $$a = _vm.form.remember,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.form.remember = $$a.concat([$$v]))
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
  }, [_c('h3', [_vm._v("Logga In")]), _vm._v(" "), _c('div', {
    staticClass: "header-text"
  }, [_vm._v("Välkommen in i värmen.")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0ab6550a", module.exports)
  }
}

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(198),
  /* template */
  __webpack_require__(199),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Auth/PasswordReset.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PasswordReset.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-adbaaad6", Component.options)
  } else {
    hotAPI.reload("data-v-adbaaad6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(5);
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




/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			processing: false,
			success: false,
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				email: ''
			})
		};
	},

	methods: {
		send: function send() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('password/email').new().post(this.form.data()).then(function (response) {
				_this.form.email = '';
				_this.success = true;
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "login-component"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [(_vm.success) ? _c('div', {
    staticClass: "alert alert-success"
  }, [_vm._v("\n\t\t\tVi har skickat ett email till dig med en länk för att återställa ditt lösenord.\n\t\t")]) : _c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('email')
    }
  }, [_c('label', {
    staticClass: "control-label",
    attrs: {
      "for": "email"
    }
  }, [_vm._v("\n\t\t\t\t\tAnge din emailadress så skickar vi en länk där du kan återställa ditt lösenord.\n\t\t\t\t")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.email),
      expression: "form.email"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "email",
      "name": "email",
      "placeholder": "Din emailadress"
    },
    domProps: {
      "value": (_vm.form.email)
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
        _vm.send($event)
      }
    }
  }, [_vm._v("Skicka lösenordsåterställning")])])])]), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'login'
        })
      }
    }
  }, [_vm._v("Logga In")]), _vm._v(" eller "), _c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('openModal', {
          component: 'register'
        })
      }
    }
  }, [_vm._v("Registrera")])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "modal-header"
  }, [_c('h3', [_vm._v("Återställ ditt lösenord")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-adbaaad6", module.exports)
  }
}

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(201),
  /* template */
  __webpack_require__(202),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Bids/CreateBid.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_classes_Form__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__ = __webpack_require__(12);
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





/* harmony default export */ __webpack_exports__["default"] = ({
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
				// Add the new bid to the store.
				_this.$store.dispatch('addBid', { bid: response.bid });
				_this.form.reset();
				_this.processing = false;
				// Show a success notification for bid created
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Snyggt! Vi skapade ditt bud.' });
				// Close the modal
				_this.$store.dispatch('closeModal');
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		},
		openShowBids: function openShowBids() {
			this.$store.dispatch('openModal', { component: 'showBids', size: 'size-large' });
		}
	}
});

/***/ }),
/* 202 */
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
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Starta utförandet")]), _vm._v(" "), _c('datepicker', {
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    model: {
      value: (_vm.form.start),
      callback: function($$v) {
        _vm.form.start = $$v
      },
      expression: "form.start"
    }
  }), _vm._v(" "), (_vm.form.errors.has('start')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('start'))
    }
  }) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "help-block"
  }, [_vm._v("När kan du påbörja utförandet av tjänsten?")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('end')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Avsluta utförandet")]), _vm._v(" "), _c('datepicker', {
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    model: {
      value: (_vm.form.end),
      callback: function($$v) {
        _vm.form.end = $$v
      },
      expression: "form.end"
    }
  }), _vm._v(" "), (_vm.form.errors.has('end')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('end'))
    }
  }) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "help-block"
  }, [_vm._v("När är du klar med tjänsten?")])], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12 col-md-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('hours')
    }
  }, [_c('label', {
    staticClass: "control-label",
    attrs: {
      "for": "hours"
    }
  }, [_vm._v("Antal timmar")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.hours),
      expression: "form.hours"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "hours"
    },
    domProps: {
      "value": (_vm.form.hours)
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
  }) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "help-block"
  }, [_vm._v("Hur många timmar kommer det att ta dig?")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-6"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('price')
    }
  }, [_c('label', {
    staticClass: "control-label",
    attrs: {
      "for": "price"
    }
  }, [_vm._v("Ditt pris")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.price),
      expression: "form.price"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "name": "price"
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
  }) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "help-block"
  }, [_vm._v("Hur mycket tar du för att utföra tjänsten?")])])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-error': _vm.form.errors.has('description')
    }
  }, [_c('label', {
    staticClass: "control-label",
    attrs: {
      "for": "description"
    }
  }, [_vm._v("Beskrivning av utförandet")]), _vm._v(" "), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.description),
      expression: "form.description"
    }],
    staticClass: "form-control",
    attrs: {
      "name": "description",
      "rows": "5"
    },
    domProps: {
      "value": (_vm.form.description)
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
  }) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "help-block"
  }, [_vm._v("Vad skiljer dig åt från dem andra?")])])])]), _vm._v(" "), _c('div', {
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
  }, [_c('h3', [_vm._v("Lägg ett bud")]), _vm._v(" "), _c('div', {
    staticClass: "header-text"
  }, [_vm._v("Berätta varför just du ska få utföra tjänsten.")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0e265c70", module.exports)
  }
}

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(204),
  /* template */
  __webpack_require__(209),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Bids/ShowBids.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__ = __webpack_require__(9);
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
		appRatings: __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default.a
	},
	computed: {
		loaded: function loaded() {
			return this.$store.getters.getBidsLoaded;
		},
		bids: function bids() {
			return this.$store.getters.getBids;
		}
	},
	methods: {
		rating: function rating(bid) {
			return bid.user.rating ? bid.user.rating.avg : 0;
		},
		ratingCount: function ratingCount(bid) {
			return bid.user.rating ? bid.user.rating.count : 0;
		},
		openCreateBid: function openCreateBid() {
			this.$store.dispatch('openModal', { component: 'createBid', size: 'size-large' });
		},
		time: function time(t) {
			return moment(t).format("LLL");
		}
	},
	created: function created() {
		if (!this.loaded) {
			this.$store.dispatch('getBids');
		}
	}
});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(206);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("2a93728a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b8890c0c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Ratings.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-b8890c0c\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Ratings.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "\n.ratings-component.large[data-v-b8890c0c] {\n  font-size: 18px;\n}\n.ratings-component i[data-v-b8890c0c] {\n  color: #FFC100;\n  margin: 0 1.5px;\n}\n", ""]);

// exports


/***/ }),
/* 207 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		rating: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			default: 5
		},
		total: {
			type: Number,
			default: 0
		},
		size: {
			type: String,
			default: ''
		},
		showAvg: {
			type: Boolean,
			default: false
		},
		showCount: {
			type: Boolean,
			default: true
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
});

/***/ }),
/* 208 */
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
  }), _vm._v(" "), (_vm.showAvg) ? _c('span', {
    staticClass: "rating-avg"
  }, [_vm._v(_vm._s(_vm.rating.toFixed(1)) + " ")]) : _vm._e(), (_vm.showCount) ? _c('span', {
    staticClass: "rating-count"
  }, [_vm._v("(" + _vm._s(_vm.total) + ")")]) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b8890c0c", module.exports)
  }
}

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "show_bids-component"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [(_vm.loaded) ? [(_vm.bids.length > 0) ? _c('ul', {
    staticClass: "list-unstyled list-bids"
  }, [_c('transition-group', {
    attrs: {
      "name": "fade-in"
    }
  }, _vm._l((_vm.bids), function(bid) {
    return _c('li', {
      key: bid.id
    }, [_c('div', {
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
        "rating": _vm.rating(bid),
        "total": _vm.ratingCount(bid)
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
  }))], 1) : _c('div', {
    staticClass: "alert alert-info text-center"
  }, [_vm._v("\n\t\t\t\tDenna tjänsten har ännu inga lagda bud. Vill du bli den första? \n\t\t\t\t"), _c('a', {
    staticClass: "link",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.openCreateBid($event)
      }
    }
  }, [_vm._v("Lägg ett bud nu")])])] : _c('app-loading')], 2), _vm._v(" "), _c('div', {
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
  }, [_c('h3', [_vm._v("Visar budhistorik")]), _vm._v(" "), _c('div', {
    staticClass: "header-text"
  }, [_vm._v("Det senaste budet kommer först i listan. Kan du slå det?")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f427bc18", module.exports)
  }
}

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(211),
  /* template */
  __webpack_require__(217),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/ShowBidModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ShowBidModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-76c24d82", Component.options)
  } else {
    hotAPI.reload("data-v-76c24d82", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OneBid__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OneBid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__OneBid__);
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
		appOneBid: __WEBPACK_IMPORTED_MODULE_0__OneBid___default.a
	},
	computed: {
		bid: function bid() {
			return this.$store.getters.modalData.bid;
		}
	}
});

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BidAcceptStatus__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BidAcceptStatus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__BidAcceptStatus__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	props: ['bid'],
	components: {
		appRatings: __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default.a,
		appBidAcceptStatus: __WEBPACK_IMPORTED_MODULE_1__BidAcceptStatus___default.a
	},
	methods: {
		time: function time(date) {
			return moment(date).format('D MMM YYYY HH:mm');
		}
	}
});

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(214),
  /* template */
  __webpack_require__(215),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/BidAcceptStatus.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BidAcceptStatus.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22569312", Component.options)
  } else {
    hotAPI.reload("data-v-22569312", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 214 */
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



/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['bid'],
	computed: {
		bidAccepted: function bidAccepted() {
			return this.$store.getters.serviceDetailsBidAccepted;
		}
	},
	methods: {
		openAcceptBidModal: function openAcceptBidModal() {
			var _this = this;

			this.$store.dispatch('openModal', {
				component: 'confirm',
				data: {
					confirmText: 'Är du säker på att du vill acceptera budet?',
					onConfirm: function onConfirm() {
						new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('services/' + _this.bid.service_id + '/bids/' + _this.bid.id + '/accept').post().then(function (response) {
							_this.$store.dispatch('showNotification', {
								type: 'success',
								msg: 'Woohoo! Budet var accepterat. Vi har skapat ett nytt projekt åt dig som du hittar under "Mina projekt".'
							});
							// Set the projects fetched to false so we break the cache.
							_this.$store.commit('SET_PROJECTS_FETCHED', { fetched: false });
							_this.$store.dispatch('bidAccepted', { id: _this.bid.id });
							_this.$store.dispatch('closeModal');
						}).catch(function (error) {
							console.log(error);
						});
					}
				}
			});
		}
	}
});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bid_accept_status-component"
  }, [(!_vm.bidAccepted) ? [_c('button', {
    staticClass: "btn btn-primary",
    on: {
      "click": _vm.openAcceptBidModal
    }
  }, [_vm._v("\n\t\t\tAcceptera budet\n\t\t")])] : _vm._e(), _vm._v(" "), (_vm.bidAccepted && _vm.bid.accepted) ? _c('div', {
    staticClass: "accepted-bid-container"
  }, [_c('i', {
    staticClass: "confirm-icon"
  }), _c('span', {
    staticClass: "bid-accepted"
  }, [_vm._v("Accepterat bud")])]) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-22569312", module.exports)
  }
}

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "one_bid-component"
  }, [_c('section', {
    staticClass: "white-contentSection mb30"
  }, [_c('header', {
    staticClass: "white-contentSection-header has-actions"
  }, [_c('div', {
    staticClass: "header-content"
  }, [_c('router-link', {
    staticClass: "is-link",
    attrs: {
      "to": ("/profile/" + (_vm.bid.user.username))
    },
    domProps: {
      "textContent": _vm._s(_vm.bid.user.username)
    }
  }), _vm._v(" "), _c('app-ratings', {
    attrs: {
      "rating": _vm.bid.user.rating || 0,
      "showAvg": true
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "gray-sub-text",
    domProps: {
      "textContent": _vm._s(_vm.time(_vm.bid.created_at))
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "header-actions"
  }, [_c('app-bid-accept-status', {
    attrs: {
      "bid": _vm.bid
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "gray-contentSection-content"
  }, [_c('ul', {
    staticClass: "bid-details-list"
  }, [_c('li', [_c('div', {
    staticClass: "detail-item"
  }, [_vm._v("Kan börja")]), _vm._v(" "), _c('div', {
    staticClass: "detail-value",
    domProps: {
      "textContent": _vm._s(_vm.filters.date(_vm.bid.start))
    }
  })]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "detail-item"
  }, [_vm._v("Är klart")]), _vm._v(" "), _c('div', {
    staticClass: "detail-value",
    domProps: {
      "textContent": _vm._s(_vm.filters.date(_vm.bid.end))
    }
  })]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "detail-item"
  }, [_vm._v("Antal timmar")]), _vm._v(" "), _c('div', {
    staticClass: "detail-value",
    domProps: {
      "textContent": _vm._s(_vm.filters.commaSeparator(_vm.bid.hours))
    }
  })]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "detail-item"
  }, [_vm._v("Pris")]), _vm._v(" "), _c('div', {
    staticClass: "detail-value",
    domProps: {
      "textContent": _vm._s(_vm.filters.currency(_vm.bid.price))
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content",
    domProps: {
      "textContent": _vm._s(_vm.bid.description)
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-185ee12c", module.exports)
  }
}

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "show_user_bid-component pt30"
  }, [_c('app-one-bid', {
    attrs: {
      "bid": _vm.bid
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-76c24d82", module.exports)
  }
}

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(219),
  /* template */
  __webpack_require__(220),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/ConfirmModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ConfirmModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-588b0379", Component.options)
  } else {
    hotAPI.reload("data-v-588b0379", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 219 */
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "confirm_modal-component"
  }, [_c('div', {
    staticClass: "modal-body mt15"
  }, [_c('div', {
    staticClass: "confirm-icon big-icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "confirm-text",
    domProps: {
      "textContent": _vm._s(_vm.$store.getters.modalData.confirmText)
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_c('button', {
    staticClass: "btn btn-success",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.getters.modalData.onConfirm($event)
      }
    }
  }, [_vm._v("Ja")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-danger",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$store.dispatch('closeModal')
      }
    }
  }, [_vm._v("Avbryt")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-588b0379", module.exports)
  }
}

/***/ }),
/* 221 */
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
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(223),
  /* template */
  __webpack_require__(224),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/Search.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 223 */
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 224 */
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
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(226),
  /* template */
  __webpack_require__(227),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Layout/Footer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 226 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 227 */
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
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "site"
    }
  }, [_c('transition', {
    attrs: {
      "name": "notification-slide-down-up"
    }
  }, [(_vm.$store.getters.showingNotification) ? _c('app-notifications') : _vm._e()], 1), _vm._v(" "), (_vm.breakpoints.mobile) ? _c('app-mobile-header') : _c('app-desktop-header'), _vm._v(" "), _c('transition', {
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
  }) : _vm._e(), _vm._v(" "), _c('router-view'), _vm._v(" "), _c('app-footer')], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c4676f0", module.exports)
  }
}

/***/ }),
/* 229 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_categories__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_regions__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_modal__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_auth__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_user__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_servicesFilter__ = __webpack_require__(235);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_services__ = __webpack_require__(236);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_service__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_notifications__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modules_userBids__ = __webpack_require__(239);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modules_userBidDetails__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modules_userNotifications__ = __webpack_require__(443);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modules_userServices__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modules_userSubscriptions__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__modules_userServiceDetails__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__modules_userInvoices__ = __webpack_require__(244);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

// Import modules

















/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
	modules: {
		categories: __WEBPACK_IMPORTED_MODULE_2__modules_categories__["a" /* default */],
		regions: __WEBPACK_IMPORTED_MODULE_3__modules_regions__["a" /* default */],
		modal: __WEBPACK_IMPORTED_MODULE_4__modules_modal__["a" /* default */],
		auth: __WEBPACK_IMPORTED_MODULE_5__modules_auth__["a" /* default */],
		user: __WEBPACK_IMPORTED_MODULE_6__modules_user__["a" /* default */],
		servicesFilter: __WEBPACK_IMPORTED_MODULE_7__modules_servicesFilter__["a" /* default */],
		services: __WEBPACK_IMPORTED_MODULE_8__modules_services__["a" /* default */],
		service: __WEBPACK_IMPORTED_MODULE_9__modules_service__["a" /* default */],
		notifications: __WEBPACK_IMPORTED_MODULE_10__modules_notifications__["a" /* default */],
		userBids: __WEBPACK_IMPORTED_MODULE_11__modules_userBids__["a" /* default */],
		userBidDetails: __WEBPACK_IMPORTED_MODULE_12__modules_userBidDetails__["a" /* default */],
		userNotifications: __WEBPACK_IMPORTED_MODULE_13__modules_userNotifications__["a" /* default */],
		userServices: __WEBPACK_IMPORTED_MODULE_14__modules_userServices__["a" /* default */],
		userServiceDetails: __WEBPACK_IMPORTED_MODULE_16__modules_userServiceDetails__["a" /* default */],
		userSubscriptions: __WEBPACK_IMPORTED_MODULE_15__modules_userSubscriptions__["a" /* default */],
		userInvoices: __WEBPACK_IMPORTED_MODULE_17__modules_userInvoices__["a" /* default */]
	}
}));

/***/ }),
/* 230 */
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

/* harmony default export */ __webpack_exports__["a"] = (categories);

/***/ }),
/* 231 */
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
				return id ? state.regions.filter(function (r) {
					return r.id === id;
				})[0] : [];
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

/* harmony default export */ __webpack_exports__["a"] = (regions);

/***/ }),
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var modal = {
	state: {
		open: false,
		component: '',
		data: {},
		size: 'size-small',
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
			    size = _ref2$size === undefined ? "size-small" : _ref2$size,
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

/* harmony default export */ __webpack_exports__["a"] = (modal);

/***/ }),
/* 233 */
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

/* harmony default export */ __webpack_exports__["a"] = (auth);

/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);


var user = {
	state: {
		projects: [],
		projectsFetched: false,
		projectFocus: null
	},
	mutations: {
		'SET_PROJECTS': function SET_PROJECTS(state, payload) {
			state.projects = payload.projects;
		},
		'SET_PROJECTS_FETCHED': function SET_PROJECTS_FETCHED(state, payload) {
			state.projectsFetched = payload.fetched;
		},
		'SET_PROJECT_FOCUS': function SET_PROJECT_FOCUS(state, payload) {
			state.projectFocus = payload.project;
		}
	},
	actions: {
		clearUserState: function clearUserState(_ref) {
			var commit = _ref.commit;

			commit('SET_BIDS', { bids: [] });
			commit('SET_BIDS_FETCHED', { fetched: false });
			commit('SET_PROJECTS', { projects: [] });
			commit('SET_PROJECTS_FETCHED', { fetched: false });
			commit('SET_PROJECT_FOCUS', { project: null });
		},
		fetchUserProjects: function fetchUserProjects(_ref2) {
			var commit = _ref2.commit,
			    rootState = _ref2.rootState;
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
		}
	},
	getters: {
		userProjects: function userProjects(state) {
			return state.projects;
		},
		userProjectsFetched: function userProjectsFetched(state) {
			return state.projectsFetched;
		},
		userProjectFocus: function userProjectFocus(state) {
			return state.projectFocus;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = (user);

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);


var servicesFilter = {
	state: {
		text: '',
		categories: [],
		regions: [],
		cities: [],
		locations: []
	},
	mutations: {
		'SET_FILTER_TEXT': function SET_FILTER_TEXT(state, payload) {
			state.text = payload.text;
		},
		'SET_FILTER_CATEGORIES': function SET_FILTER_CATEGORIES(state, payload) {
			state.categories = payload.categories;
		},
		'SET_FILTER_REGIONS': function SET_FILTER_REGIONS(state, payload) {
			state.regions = payload.regions;
		},
		'SET_FILTER_CITIES': function SET_FILTER_CITIES(state, payload) {
			state.cities = payload.cities;
		},
		'SET_FILTER_LOCATIONS': function SET_FILTER_LOCATIONS(state, payload) {
			state.locations = payload.locations;
		}
	},
	actions: {
		addFilterCategory: function addFilterCategory(_ref, payload) {
			var commit = _ref.commit,
			    state = _ref.state;

			var categories = state.categories;
			categories.push(payload.category);
			commit('SET_FILTER_CATEGORIES', { categories: categories });
		},
		removeFilterCategory: function removeFilterCategory(_ref2, payload) {
			var commit = _ref2.commit,
			    state = _ref2.state;

			var categories = state.categories;
			categories.splice(payload.index, 1);
			commit('SET_FILTER_CATEGORIES', { categories: categories });
		},
		addFilterLocation: function addFilterLocation(_ref3, payload) {
			var commit = _ref3.commit,
			    state = _ref3.state;

			var locations = state.locations;
			locations.push(payload.location);
			commit('SET_FILTER_LOCATIONS', { locations: locations });
			// Also add the location to either region or city.
			if (payload.location.type === 'region') {
				var regions = state.regions;
				regions.push(payload.location);
				commit('SET_FILTER_REGIONS', { regions: regions });
			} else {
				var cities = state.cities;
				cities.push(payload.location);
				commit('SET_FILTER_CITIES', { cities: cities });
			}
		},
		removeFilterLocation: function removeFilterLocation(_ref4, payload) {
			var commit = _ref4.commit,
			    state = _ref4.state;

			// Remove it from locations array.
			var locations = state.locations;
			locations.forEach(function (location, index) {
				if (location.value === payload.location.value && location.type == payload.location.type) {
					locations.splice(index, 1);
					return;
				}
			});
			commit('SET_FILTER_LOCATIONS', { locations: locations });
			// Remove it from either regions or cities
			if (payload.location.type === 'region') {
				var regions = state.regions;
				regions.forEach(function (region, index) {
					if (region.value === payload.location.value) {
						regions.splice(index, 1);
					}
				});
				commit('SET_FILTER_REGIONS', { regions: regions });
			} else {
				var cities = state.cities;
				cities.forEach(function (city, index) {
					if (city.value === payload.location.value) {
						cities.splice(index, 1);
					}
				});
				commit('SET_FILTER_CITIES', { cities: cities });
			}
		}
	},
	getters: {
		getFilterText: function getFilterText(state) {
			return state.text;
		},
		getFilterCategories: function getFilterCategories(state) {
			return state.categories;
		},
		getFilterRegions: function getFilterRegions(state) {
			return state.regions;
		},
		getFilterCities: function getFilterCities(state) {
			return state.cities;
		},
		getFilterLocations: function getFilterLocations(state) {
			return state.locations;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = (servicesFilter);

/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);


var services = {
	state: {
		loaded: false,
		page: 1,
		isLoadingMore: false,
		canLoadMore: false,
		services: []
	},
	mutations: {
		'SET_SERVICES_FETCHED': function SET_SERVICES_FETCHED(state, loaded) {
			state.loaded = loaded;
		},
		'SET_PAGE': function SET_PAGE(state, page) {
			state.page = page;
		},
		'SET_IS_LOADING_MORE': function SET_IS_LOADING_MORE(state, loading) {
			state.loading = loading;
		},
		'SET_CAN_LOAD_MORE': function SET_CAN_LOAD_MORE(state, canLoadMore) {
			state.canLoadMore = canLoadMore;
		},
		'SET_SERVICES': function SET_SERVICES(state, services) {
			state.services = services;
		}
	},
	actions: {
		getServices: function getServices(_ref, payload) {
			var commit = _ref.commit,
			    state = _ref.state,
			    rootState = _ref.rootState;

			return new Promise(function (resolve, reject) {
				if (payload.appending) {
					commit('SET_PAGE', state.page + 1);
					commit('SET_IS_LOADING_MORE', true);
				}

				var data = { page: rootState.services.page };
				if (rootState.servicesFilter.text) data.text = rootState.servicesFilter.text;
				if (rootState.servicesFilter.categories.length > 0) data.categories = rootState.servicesFilter.categories.map(function (cat) {
					return cat.value;
				}).join();
				if (rootState.servicesFilter.regions.length > 0) data.regions = rootState.servicesFilter.regions.map(function (reg) {
					return reg.value;
				}).join();
				if (rootState.servicesFilter.cities.length > 0) data.cities = rootState.servicesFilter.cities.map(function (cit) {
					return cit.value;
				}).join();

				new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('services').get(data).then(function (_ref2) {
					var services = _ref2.services;

					commit('SET_CAN_LOAD_MORE', services.next_page_url ? true : false);
					commit('SET_IS_LOADING_MORE', false);
					commit('SET_SERVICES', payload.appending ? state.services.concat(services.data) : services.data);
					commit('SET_SERVICES_FETCHED', true);

					resolve(true);
				}).catch(function (error) {
					console.log(error);
				});
			});
		},
		addService: function addService(_ref3, payload) {
			var commit = _ref3.commit,
			    state = _ref3.state,
			    rootState = _ref3.rootState;

			if (rootState.servicesFilter.text && !payload.service.title.includes(rootState.servicesFilter.text)) {
				return;
			}
			if (rootState.servicesFilter.categories.length && !rootState.servicesFilter.categories.find(function (e) {
				return e.value === payload.service.category_id;
			})) {
				return;
			}
			if (rootState.servicesFilter.regions.length && !rootState.servicesFilter.regions.find(function (e) {
				return e.value === payload.service.region_id;
			})) {
				return;
			}
			if (rootState.servicesFilter.cities.length && !rootState.servicesFilter.cities.find(function (e) {
				return e.value === payload.service.city_id;
			})) {
				return;
			}

			var services = state.services;
			services.push(payload.service);
			services = services.sort(function (a, b) {
				return a.bid_stop.localeCompare(b.bid_stop);
			});
			commit('SET_SERVICES', services);
		},
		removeService: function removeService(_ref4, payload) {
			var commit = _ref4.commit,
			    state = _ref4.state;

			var serviceIndex = state.services.findIndex(function (e) {
				return e.id === payload.id;
			});
			if (serviceIndex !== -1) {
				state.services.splice(state.services.findIndex(function (e) {
					return e.id == payload.id;
				}), 1);
			}
		}
	},
	getters: {
		servicesLoaded: function servicesLoaded(state) {
			return state.loaded;
		},
		servicesLoadingMore: function servicesLoadingMore(state) {
			return state.isLoadingMore;
		},
		servicesCanLoadMore: function servicesCanLoadMore(state) {
			return state.canLoadMore;
		},
		services: function services(state) {
			return state.services;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = (services);

/***/ }),
/* 237 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);


var service = {
	state: {
		loaded: false,
		service: { comments: [], user: {} },
		bids_loaded: false,
		bids: []
	},
	mutations: {
		'SET_LOADED': function SET_LOADED(state, loaded) {
			state.loaded = loaded;
		},
		'SET_SERVICE': function SET_SERVICE(state, service) {
			state.service = service;
		},
		'SET_BIDS_LOADED': function SET_BIDS_LOADED(state, loaded) {
			state.bids_loaded = loaded;
		},
		'SET_BIDS': function SET_BIDS(state, bids) {
			state.bids = bids;
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
			commit('SET_SERVICE', { comments: [], user: {} });
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('services').find(payload.id).then(function (response) {
				commit('SET_SERVICE', response.service);
				commit('SET_LOADED', true);
			}).catch(function (error) {});
		},
		getBids: function getBids(_ref2, payload) {
			var commit = _ref2.commit,
			    state = _ref2.state;

			// Set the base state first.
			commit('SET_BIDS_LOADED', false);
			commit('SET_BIDS', { bids: [] });
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('services/{id}/bids').setId(state.service.id).get().then(function (response) {
				commit('SET_BIDS', response.bids);
				commit('SET_BIDS_LOADED', true);
			}).catch(function (error) {});
		},
		addBid: function addBid(_ref3, payload) {
			var commit = _ref3.commit,
			    state = _ref3.state;

			var service = state.service;
			service.bid_count = { count: service.bid_count ? service.bid_count.count + 1 : 1 };
			commit('SET_SERVICE', service);
			// If we have fetched bids we should just add this new one to the list.
			if (state.bids_loaded) {
				var bids = state.bids;
				bids.unshift(payload.bid);
			}
		}
	},
	getters: {
		getServiceLoaded: function getServiceLoaded(state) {
			return state.loaded;
		},
		getService: function getService(state) {
			return state.service;
		},
		getBidsLoaded: function getBidsLoaded(state) {
			return state.bids_loaded;
		},
		getBids: function getBids(state) {
			return state.bids;
		}
	}
};

/* harmony default export */ __webpack_exports__["a"] = (service);

/***/ }),
/* 238 */
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

/* harmony default export */ __webpack_exports__["a"] = (notifications);

/***/ }),
/* 239 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(8);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
	fetched: false,
	bids: []
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["i" /* SET_USER_BIDS_FETCHED */], function (state, fetched) {
	state.fetched = fetched;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["h" /* SET_USER_BIDS */], function (state, bids) {
	state.bids = bids;
}), _mutations);

var actions = {};

var getters = {
	userBidsFetched: function userBidsFetched(state) {
		return state.fetched;
	},
	userBids: function userBids(state) {
		return state.bids;
	}
};

/* harmony default export */ __webpack_exports__["a"] = ({
	state: state,
	mutations: mutations,
	actions: actions,
	getters: getters
});

/***/ }),
/* 240 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(8);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
	fetched: false,
	bid: {}
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["k" /* SET_USER_BID_DETAILS_FETCHED */], function (state, fetched) {
	state.fetched = fetched;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["j" /* SET_USER_BID_DETAILS */], function (state, bid) {
	state.bid = bid;
}), _mutations);

var actions = {};

var getters = {
	userBidDetailsFetched: function userBidDetailsFetched(state) {
		return state.fetched;
	},
	userBidDetails: function userBidDetails(state) {
		return state.bid;
	}
};

/* harmony default export */ __webpack_exports__["a"] = ({
	state: state,
	mutations: mutations,
	actions: actions,
	getters: getters
});

/***/ }),
/* 241 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(8);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
	fetched: false,
	services: []
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["r" /* SET_USER_SERVICES_FETCHED */], function (state, fetched) {
	state.fetched = fetched;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["q" /* SET_USER_SERVICES */], function (state, services) {
	state.services = services;
}), _mutations);

var actions = {};

var getters = {
	userServicesFetched: function userServicesFetched(state) {
		return state.fetched;
	},
	userServices: function userServices(state) {
		return state.services;
	}
};

/* harmony default export */ __webpack_exports__["a"] = ({
	state: state,
	mutations: mutations,
	actions: actions,
	getters: getters
});

/***/ }),
/* 242 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(8);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
	fetched: false,
	subscriptions: []
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["g" /* SET_SUBSCRIPTIONS_FETCHED */], function (state, fetched) {
	state.fetched = fetched;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["f" /* SET_SUBSCRIPTIONS */], function (state, subscriptions) {
	state.subscriptions = subscriptions;
}), _mutations);

var actions = {};

var getters = {
	subscriptionsFetched: function subscriptionsFetched(state) {
		return state.fetched;
	},
	subscriptions: function subscriptions(state) {
		return state.subscriptions;
	}
};

/* harmony default export */ __webpack_exports__["a"] = ({
	state: state,
	mutations: mutations,
	actions: actions,
	getters: getters
});

/***/ }),
/* 243 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(8);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
	serviceFetched: false,
	service: {},
	bidsFetched: false,
	bids: [],
	bidAccepted: null
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["d" /* SET_SERVICE_DETAILS_FETCHED */], function (state, fetched) {
	state.serviceFetched = fetched;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["e" /* SET_SERVICE_DETAILS_SERVICE */], function (state, service) {
	state.service = service;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["b" /* SET_SERVICE_DETAILS_BIDS_FETCHED */], function (state, fetched) {
	state.bidsFetched = fetched;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["a" /* SET_SERVICE_DETAILS_BIDS */], function (state, bids) {
	state.bids = bids;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["c" /* SET_SERVICE_DETAILS_BID_ACCEPTED */], function (state, accepted) {
	state.bidAccepted = accepted;
}), _mutations);

var actions = {
	bidAccepted: function bidAccepted(_ref, payload) {
		var commit = _ref.commit,
		    state = _ref.state;

		commit('SET_SERVICE_DETAILS_BID_ACCEPTED', true);
		var bids = state.bids;
		bids.forEach(function (bid) {
			if (bid.id === payload.id) {
				bid.accepted = true;
			}
		});
		commit('SET_SERVICE_DETAILS_BIDS', bids);
	},
	clearServiceDetailsState: function clearServiceDetailsState(_ref2) {
		var commit = _ref2.commit;

		commit('SET_SERVICE_DETAILS_FETCHED', false);
		commit('SET_SERVICE_DETAILS_SERVICE', {});
		commit('SET_SERVICE_DETAILS_BIDS_FETCHED', false);
		commit('SET_SERVICE_DETAILS_BIDS', []);
		commit('SET_SERVICE_DETAILS_BID_ACCEPTED', null);
	}
};

var getters = {
	serviceDetailsFetched: function serviceDetailsFetched(state) {
		return state.serviceFetched;
	},
	serviceDetailsService: function serviceDetailsService(state) {
		return state.service;
	},
	serviceDetailsBidsFetched: function serviceDetailsBidsFetched(state) {
		return state.bidsFetched;
	},
	serviceDetailsBids: function serviceDetailsBids(state) {
		return state.bids;
	},
	serviceDetailsBidAccepted: function serviceDetailsBidAccepted(state) {
		return state.bidAccepted;
	}
};

/* harmony default export */ __webpack_exports__["a"] = ({
	state: state,
	mutations: mutations,
	actions: actions,
	getters: getters
});

/***/ }),
/* 244 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(8);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
	fetched: false,
	invoices: [],
	focusId: null
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["m" /* SET_USER_INVOICES_FETCHED */], function (state, fetched) {
	state.fetched = fetched;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["l" /* SET_USER_INVOICES */], function (state, invoices) {
	state.invoices = invoices;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["n" /* SET_USER_INVOICES_FOCUS */], function (state, focusId) {
	state.focusId = parseInt(focusId);
}), _mutations);

var actions = {};

var getters = {
	userInvoicesFetched: function userInvoicesFetched(state) {
		return state.fetched;
	},
	userInvoices: function userInvoices(state) {
		return state.invoices;
	},
	userInvoicesFocus: function userInvoicesFocus(state) {
		return state.invoices.find(function (invoice) {
			return invoice.id === state.focusId;
		});
	}
};

/* harmony default export */ __webpack_exports__["a"] = ({
	state: state,
	mutations: mutations,
	actions: actions,
	getters: getters
});

/***/ }),
/* 245 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router__ = __webpack_require__(15);


/**
 * All of the applications routes
 */

/*
 Later on in production for code splitting
let routes = [
	{ path: "/", name: 'home', component: resolve => require(['./views/Home'], resolve) },
	{ path: "/categories", name: 'categories', component: resolve => require(['./views/Categories'], resolve) },
	{ path: "/locations", name: 'locations', component: resolve => require(['./views/Locations'], resolve) },
	{ path: "/services", name: 'services', component: resolve => require(['./views/Services'], resolve) },
	{ path: "/services/:id", name: 'serviceDetails', component: resolve => require(['./views/ServiceDetails'], resolve) },
	{ path: "/information", name: 'information', component: resolve => require(['./views/Information'], resolve) },
	{ path: "/profile/:username", name: 'profile', component: resolve => require(['./views/Profile'], resolve)},
	{ path: "/user", name: 'user', component: resolve => require(['./views/User'], resolve),
		children: [
			{ path: '', component: resolve => require(['./components/User/Profile/Profile'], resolve), meta: { requiresAuth: true } },
			{ path: 'profile', component: resolve => require(['./components/User/Profile/Profile'], resolve), meta: { requiresAuth: true } },
			{ path: 'notifications', component: resolve => require(['./components/User/Notifications/Notifications'], resolve), meta: { requiresAuth: true } },
			{ path: 'create-service', component: resolve => require(['./components/User/Services/CreateService'], resolve), meta: { requiresAuth: true } },
			{ path: 'services', component: resolve => require(['./components/User/Services/MyServices'], resolve), meta: { requiresAuth: true } },
			{ path: 'services/:id', component: resolve => require(['./components/User/Services/EditService'], resolve), meta: { requiresAuth: true } },
			{ path: 'bids', component: resolve => require(['./components/User/Bids/MyBids'], resolve), meta: { requiresAuth: true } },
			{ path: 'projects', component: resolve => require(['./components/User/Projects/MyProjects'], resolve), meta: { requiresAuth: true } },
			{ path: 'project/:id', component: resolve => require(['./components/User/Projects/Project'], resolve), meta: { requiresAuth: true } },
			{ path: 'invoices', component: resolve => require(['./components/User/Invoices/MyInvoices'], resolve), meta: { requiresAuth: true } },
			{ path: 'invoices/:id', component: resolve => require(['./components/User/Invoices/InvoiceDetails'], resolve), meta: { requiresAuth: true } },
			{ path: 'service/:id/bids', component: resolve => require(['./components/User/Bids/BidHistory'], resolve), meta: { requiresAuth: true } },
			{ path: 'subscriptions', component: resolve => require(['./components/User/Subscriptions/MySubscriptions'], resolve), meta: { requiresAuth: true } },
		],
		meta: { requiresAuth: true }
	},
	
	// 404 is handled by the vue application
	{ path: "*", component: resolve => require(['./views/404.vue'], resolve) }
];
*/

var routes = [{ path: "/", name: 'home', component: __webpack_require__(246) }, { path: "/categories", name: 'categories', component: __webpack_require__(255) }, { path: "/locations", name: 'locations', component: __webpack_require__(260) }, { path: "/services", name: 'services', component: __webpack_require__(263) }, { path: "/services/:id", name: 'serviceDetails', component: __webpack_require__(282) }, { path: "/information", name: 'information', component: __webpack_require__(299) }, { path: "/profile/:username", name: 'profile', component: __webpack_require__(302) }, { path: "/user", name: 'user', component: __webpack_require__(311),
	children: [{ path: '', component: __webpack_require__(139), meta: { requiresAuth: true } }, { path: 'profile', component: __webpack_require__(139), meta: { requiresAuth: true } }, { path: 'notifications', component: __webpack_require__(325), meta: { requiresAuth: true } }, { path: 'create-service', component: __webpack_require__(334), meta: { requiresAuth: true } }, { path: 'services', component: __webpack_require__(340), meta: { requiresAuth: true } }, { path: 'services/:id', component: __webpack_require__(343), meta: { requiresAuth: true } }, { path: 'bids', component: __webpack_require__(355), meta: { requiresAuth: true } }, { path: 'bids/:id', component: __webpack_require__(358), meta: { requiresAuth: true } }, { path: 'projects', component: __webpack_require__(364), meta: { requiresAuth: true } }, { path: 'project/:id', component: __webpack_require__(367), meta: { requiresAuth: true } }, { path: 'invoices', component: __webpack_require__(408), meta: { requiresAuth: true } }, { path: 'invoices/:id', component: __webpack_require__(411), meta: { requiresAuth: true } }, { path: 'subscriptions', component: __webpack_require__(414), meta: { requiresAuth: true } }],
	meta: { requiresAuth: true }
},

// 404 is handled by the vue application
{ path: "*", component: __webpack_require__(420) }];

var router = new __WEBPACK_IMPORTED_MODULE_0_vue_router__["a" /* default */]({
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
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(247),
  /* template */
  __webpack_require__(254),
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
/* 247 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Home_HomeHero__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Home_HomeHero___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Home_HomeHero__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Home_HomeFeatures__ = __webpack_require__(251);
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
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(249),
  /* template */
  __webpack_require__(250),
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
/* 249 */
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
/* 250 */
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
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(252),
  /* template */
  __webpack_require__(253),
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
/* 252 */
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
/* 253 */
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
/* 254 */
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

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(256),
  /* template */
  __webpack_require__(259),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Categories.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock__ = __webpack_require__(138);
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



/* harmony default export */ __webpack_exports__["default"] = ({
	components: {
		appItemsBlock: __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock___default.a
	},
	computed: {
		categories: function categories() {
			return this.$store.getters.getCategories;
		}
	}
});

/***/ }),
/* 257 */
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
});

/***/ }),
/* 258 */
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
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "categories-view"
  }, [_c('app-hero', [_c('h1', {
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("Kategorier")]), _vm._v(" "), _c('p', {
    attrs: {
      "slot": "left"
    },
    slot: "left"
  }, [_vm._v("\n\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.\n\t\t")]), _vm._v(" "), _c('img', {
    attrs: {
      "slot": "right",
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
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(261),
  /* template */
  __webpack_require__(262),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Locations.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 261 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock__ = __webpack_require__(138);
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



/* harmony default export */ __webpack_exports__["default"] = ({
	components: {
		appItemsBlock: __WEBPACK_IMPORTED_MODULE_0__components_Includes_ItemsBlock___default.a
	},
	computed: {
		regions: function regions() {
			return this.$store.getters.getRegions;
		}
	}
});

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "regions-view"
  }, [_c('app-hero', [_c('h1', {
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("Platser")]), _vm._v(" "), _c('p', {
    attrs: {
      "slot": "left"
    },
    slot: "left"
  }, [_vm._v("\n\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.\n\t\t")]), _vm._v(" "), _c('img', {
    attrs: {
      "slot": "right",
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
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(264),
  /* template */
  __webpack_require__(281),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Services.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 264 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Services_Services__ = __webpack_require__(265);
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



/* harmony default export */ __webpack_exports__["default"] = ({
	components: {
		appServices: __WEBPACK_IMPORTED_MODULE_0__components_Services_Services___default.a
	}
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(266),
  /* template */
  __webpack_require__(280),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/Services.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 266 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServiceFilter__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ServiceFilter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ServiceFilter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ServiceMulti_vue__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ServiceMulti_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ServiceMulti_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appServiceFilter: __WEBPACK_IMPORTED_MODULE_0__ServiceFilter___default.a,
		appServiceMulti: __WEBPACK_IMPORTED_MODULE_1__ServiceMulti_vue___default.a
	},
	data: function data() {
		return {
			processing: false
		};
	},

	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapGetters */])(['servicesLoaded', 'servicesLoadingMore', 'servicesCanLoadMore', 'services'])),
	methods: {
		fetchServices: function fetchServices() {
			var _this = this;

			var appending = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
			var processing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

			this.processing = processing ? true : false;

			this.$store.dispatch('getServices', { appending: appending }).then(function (success) {
				_this.processing = false;
			});
		},
		removeService: function removeService(_ref) {
			var id = _ref.id;

			this.$store.dispatch('removeService', { id: id });
		}
	},
	created: function created() {
		if (!this.servicesLoaded) {
			this.fetchServices();
		}
	}
});

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(268),
  /* template */
  __webpack_require__(272),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/ServiceFilter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ServiceFilter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-169f8664", Component.options)
  } else {
    hotAPI.reload("data-v-169f8664", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 268 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appTagsInput: __WEBPACK_IMPORTED_MODULE_0__Includes_TagsInput___default.a
	},
	computed: {
		filterText: {
			get: function get() {
				return this.$store.getters.getFilterText;
			},
			set: function set(value) {
				this.$store.commit('SET_FILTER_TEXT', { text: value });
			}
		},
		categories: function categories() {
			return this.$store.getters.getFilterCategories;
		},
		allCategories: function allCategories() {
			return this.$store.getters.getCategoriesFlatten;
		},
		locations: function locations() {
			return this.$store.getters.getFilterLocations;
		},
		allLocations: function allLocations() {
			return this.$store.getters.getRegionsFlatten;
		}
	},
	methods: {
		addCategory: function addCategory(item) {
			this.$store.dispatch('addFilterCategory', { category: item });
		},
		removeCategory: function removeCategory(_ref) {
			var index = _ref.index;

			this.$store.dispatch('removeFilterCategory', { index: index });
		},
		addLocation: function addLocation(item) {
			this.$store.dispatch('addFilterLocation', { location: item });
		},
		removeLocation: function removeLocation(_ref2) {
			var item = _ref2.item;

			this.$store.dispatch('removeFilterLocation', { location: item });
		}
	}
});

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(270),
  /* template */
  __webpack_require__(271),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Includes/TagsInput.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 270 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
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
		addItem: function addItem(item) {
			var current = this.options.find(function (opt) {
				return opt.name.toLowerCase() == item.toLowerCase();
			});

			if (current) {
				this.$emit('add', {
					text: current.name,
					value: current.id,
					type: current.type
				});
				this.error = false;
				return this.input = '';
			}

			return !(this.error = true);
		}
	}
});

/***/ }),
/* 271 */
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
      "value": (_vm.input)
    },
    on: {
      "keydown": [function($event) {
        _vm.error = false
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
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
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "service_filter-component"
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
      "value": (_vm.filterText)
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
      "add": _vm.addCategory,
      "remove": _vm.removeCategory
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-xs-12 col-md-4 column"
  }, [_c('label', [_vm._v("Platser")]), _vm._v(" "), _c('app-tags-input', {
    attrs: {
      "items": _vm.locations,
      "options": _vm.allLocations
    },
    on: {
      "add": _vm.addLocation,
      "remove": _vm.removeLocation
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-169f8664", module.exports)
  }
}

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(274),
  /* template */
  __webpack_require__(279),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/Services/ServiceMulti.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ServiceMulti.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ba203706", Component.options)
  } else {
    hotAPI.reload("data-v-ba203706", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 274 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Timer__ = __webpack_require__(13);
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
//



/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['service'],
	components: {
		appTimer: __WEBPACK_IMPORTED_MODULE_0__Includes_Timer___default.a
	},
	computed: {
		category: function category() {
			return this.$store.getters.getCategoryById(this.service.category_id).name;
		},
		location: function location() {
			var city = this.$store.getters.getCityById(this.service.city_id).name;
			var region = this.$store.getters.getRegionById(this.service.region_id).name;
			return city + ', ' + region;
		},
		commentCount: function commentCount() {
			return this.service.comment_count ? this.service.comment_count.count : 0;
		},
		bidCount: function bidCount() {
			return this.service.bid_count ? this.service.bid_count.count : 0;
		}
	},
	methods: {
		bidStop: function bidStop() {
			// Emit an event to bidStop so that the Services component can remove the service from the list.
			this.$emit('bidStop', { id: this.service.id });
		}
	}
});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(276);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("30b827f7", content, false);
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
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "\n.critical[data-v-2a250a49] {\n  color: #cc0000;\n}\n", ""]);

// exports


/***/ }),
/* 277 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(10);
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
/* 278 */
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
/* 279 */
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
  }), _vm._v(" " + _vm._s(_vm.category) + "\n\t\t\t\t")]), _vm._v(" "), _c('li', {
    staticClass: "location"
  }, [_c('i', {
    staticClass: "fa fa-map-marker",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.location) + "\n\t\t\t\t")])]), _vm._v(" "), _c('ul', {
    staticClass: "list-unstyled bottom-meta"
  }, [_c('li', {
    staticClass: "bid"
  }, [_c('i', {
    staticClass: "fa fa-gavel",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.bidCount) + " bud\n\t\t\t\t")]), _vm._v(" "), _c('li', {
    staticClass: "comments"
  }, [_c('i', {
    staticClass: "fa fa-commenting",
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" " + _vm._s(_vm.commentCount) + "\n\t\t\t\t")]), _vm._v(" "), _c('li', {
    staticClass: "time"
  }, [_c('app-timer', {
    attrs: {
      "ends": _vm.service.bid_stop
    },
    on: {
      "ended": _vm.bidStop
    }
  }), _vm._v("\n\t\t\t\t\tkvar\n\t\t\t\t")], 1)])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ba203706", module.exports)
  }
}

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "services-component"
  }, [_c('div', {
    staticClass: "service-filter-container"
  }, [_c('app-service-filter'), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('button', {
    staticClass: "btn btn-primary full-width",
    class: {
      processing: _vm.processing
    },
    attrs: {
      "type": "button",
      "disabled": _vm.processing
    },
    on: {
      "click": function($event) {
        _vm.fetchServices(false, true)
      }
    }
  }, [_vm._v("\n\t\t\t\t\tHitta Tjänster\n\t\t\t\t")])])])], 1), _vm._v(" "), _c('div', {
    staticClass: "services mtb20"
  }, [(_vm.servicesLoaded) ? [(_vm.services.length) ? [_c('div', {
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
    }, [_c('app-service-multi', {
      attrs: {
        "service": service
      },
      on: {
        "bidStop": _vm.removeService
      }
    })], 1)], 1)
  }))], 1), _vm._v(" "), (_vm.servicesCanLoadMore) ? _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-xs-12"
  }, [_c('div', {
    staticClass: "load-more text-center mt10"
  }, [_c('button', {
    staticClass: "btn btn-default btn-transparent is-bold-italic",
    class: {
      'processing': _vm.servicesLoadingMore
    },
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.fetchServices(true)
      }
    }
  }, [_vm._v("\n\t\t\t\t\t\t\t\t\tHämta fler\n\t\t\t\t\t\t\t\t")])])])]) : _vm._e()] : _c('div', {
    staticClass: "alert alert-info mt20"
  }, [_vm._v("\n\t\t\t\tTyvärr finns det inga tjänster att visa just nu.\n\t\t\t")])] : _c('app-loading', {
    attrs: {
      "bg": "gray"
    }
  })], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-491748d7", module.exports)
  }
}

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "services-view"
  }, [_c('app-hero', [_c('h1', {
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("Tjänster")]), _vm._v(" "), _c('p', {
    attrs: {
      "slot": "left"
    },
    slot: "left"
  }, [_vm._v("\n\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Odio, nesciunt aspernatur fugiat! Sequi impedit reiciendis, ratione, id aperiam iusto, nulla, provident pariatur qui earum magnam nobis eligendi optio dolores debitis.\n\t\t")]), _vm._v(" "), _c('img', {
    attrs: {
      "slot": "right",
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
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(283)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(285),
  /* template */
  __webpack_require__(298),
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
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(284);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("5b223502", content, false);
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
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "\n.waiting[data-v-6398b14f] {\n  text-align: center;\n  margin: 40px 0;\n}\n", ""]);

// exports


/***/ }),
/* 285 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Comments_AddComment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Comments_Comment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Services_ServiceDescription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Services_ServiceMedia__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Services_ServiceMedia___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Services_ServiceMedia__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Includes_Ratings__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Includes_Ratings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_Includes_Ratings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Includes_Timer__ = __webpack_require__(13);
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
		var _this = this;

		this.$store.dispatch('getService', { id: this.$route.params.id });

		Echo.channel('service.' + this.$route.params.id).listen('CommentCreated', function (e) {
			_this.$store.commit('ADD_COMMENT', { comment: e.comment });
		}).listen('NewBid', function (e) {
			_this.$store.dispatch('addBid', { bid: e.bid });
			_this.$store.dispatch('showNotification', { type: 'info', msg: 'Det kom precis in ett bud för denna tjänsten!' });
		});
	}
});

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(287),
  /* template */
  __webpack_require__(288),
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
/* 287 */
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
/* 288 */
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
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(290),
  /* template */
  __webpack_require__(291),
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
/* 290 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(10);
//
//
//
//
//
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
});

/***/ }),
/* 291 */
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
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(293),
  /* template */
  __webpack_require__(294),
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
/* 293 */
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
/* 294 */
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
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(296),
  /* template */
  __webpack_require__(297),
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
/* 296 */
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
/* 297 */
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
/* 298 */
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

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(300),
  /* template */
  __webpack_require__(301),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/Information.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 300 */
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "information-view"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content"
  }, [_c('h2', [_vm._v("Information Page")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-16b10a9a", module.exports)
  }
}

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(303),
  /* template */
  __webpack_require__(310),
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
/* 303 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Reviews_ShowReviews__ = __webpack_require__(304);
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
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(305),
  /* template */
  __webpack_require__(309),
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
/* 305 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Review__ = __webpack_require__(306);
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
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(307),
  /* template */
  __webpack_require__(308),
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
/* 307 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Includes_Ratings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Includes_Ratings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_heartbeat__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
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
/* 308 */
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
/* 309 */
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
/* 310 */
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

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(312),
  /* template */
  __webpack_require__(313),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/User.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 312 */
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
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            breakpoints: window.breakpoints
        };
    },

    methods: {
        toggleMenu: function toggleMenu() {
            var userNav = document.querySelector('.user-nav');

            if (userNav.classList.contains('must-show')) {
                document.querySelector('.user-nav').classList.remove('must-show');
            } else {
                document.querySelector('.user-nav').classList.add('must-show');
            }
        }
    }
});

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "user-view"
  }, [_c('nav', {
    staticClass: "user-navigation"
  }, [_c('div', {
    staticClass: "small-device-actions clearfix"
  }, [(_vm.breakpoints.isSmallDevices()) ? _c('button', {
    staticClass: "btn btn-primary-bordered user-nav-button mb10",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleMenu($event)
      }
    }
  }, [_vm._v("\n\t\t\t\t\t\tAndra inställningar\n\t\t\t\t\t")]) : _vm._e()]), _vm._v(" "), _c('ul', {
    staticClass: "user-nav"
  }, [_c('li', [_c('router-link', {
    attrs: {
      "to": "/user/profile"
    }
  }, [_c('i', {
    staticClass: "icon icon_user wh15 mr15"
  }), _vm._v(" "), _c('span', {
    staticClass: "link-text"
  }, [_vm._v("Profil")])])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/notifications"
    }
  }, [_c('i', {
    staticClass: "icon icon_bell wh15 mr15"
  }), _vm._v(" "), _c('span', {
    staticClass: "link-text"
  }, [_vm._v("Notifikationer")])])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/create-service"
    }
  }, [_c('i', {
    staticClass: "icon icon_document_check wh15 mr15"
  }), _vm._v(" "), _c('span', {
    staticClass: "link-text"
  }, [_vm._v("Skapa tjänst")])])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/services"
    }
  }, [_c('i', {
    staticClass: "icon icon_monitor wh15 mr15"
  }), _vm._v(" "), _c('span', {
    staticClass: "link-text"
  }, [_vm._v("Mina tjänster")])])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/bids"
    }
  }, [_c('i', {
    staticClass: "icon icon_bid wh15 mr15"
  }), _vm._v(" "), _c('span', {
    staticClass: "link-text"
  }, [_vm._v("Mina bud")])])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/projects"
    }
  }, [_c('i', {
    staticClass: "icon icon_two_users wh15 mr15"
  }), _vm._v(" "), _c('span', {
    staticClass: "link-text"
  }, [_vm._v("Mina projekt")])])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/subscriptions"
    }
  }, [_c('i', {
    staticClass: "icon icon_retweet wh15 mr15"
  }), _vm._v(" "), _c('span', {
    staticClass: "link-text"
  }, [_vm._v("Prenumerationer")])])], 1), _vm._v(" "), _c('li', [_c('router-link', {
    attrs: {
      "to": "/user/invoices"
    }
  }, [_c('i', {
    staticClass: "icon icon_credit_card wh15 mr15"
  }), _vm._v("\n\t\t\t\t\t\t\tBetalningar\n\t\t\t\t\t\t")])], 1)])]), _vm._v(" "), _c('section', {
    staticClass: "user-content"
  }, [_c('router-view')], 1)])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-95a9e666", module.exports)
  }
}

/***/ }),
/* 314 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Account__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Account___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Account__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ChangePassword__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ChangePassword___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ChangePassword__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProfilePicture__ = __webpack_require__(321);
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





/* harmony default export */ __webpack_exports__["default"] = ({
	components: {
		appAccount: __WEBPACK_IMPORTED_MODULE_0__Account___default.a,
		appChangePassword: __WEBPACK_IMPORTED_MODULE_1__ChangePassword___default.a,
		appProfilePicture: __WEBPACK_IMPORTED_MODULE_2__ProfilePicture___default.a
	}
});

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(316),
  /* template */
  __webpack_require__(317),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/Account.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 316 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(5);
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




/* harmony default export */ __webpack_exports__["default"] = ({
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
				_this.$store.commit('SET_USER', { user: response.user });
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
});

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "account-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "white-contentSection-content"
  }, [_c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container full-width",
    class: {
      'has-errors': _vm.form.errors.has('name')
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
      "value": (_vm.form.name)
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
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container full-width",
    class: {
      'has-errors': _vm.form.errors.has('username')
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
      "value": (_vm.form.username)
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
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container full-width",
    class: {
      'has-errors': _vm.form.errors.has('bio')
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
      "value": (_vm.form.bio)
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
  }) : _vm._e(), _vm._v(" "), _c('small', [_vm._v("En beskrivning av dig själv eller ditt företag. Detta kommer att visas på din publika profil.")])])])]), _vm._v(" "), _c('footer', {
    staticClass: "white-contentSection-footer"
  }, [_c('button', {
    staticClass: "btn btn-primary",
    class: {
      processing: _vm.processing
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
  }, [_vm._v("\n\t\t\t\t\tUppdatera\n\t\t\t\t")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Min profil")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-563ccdab", module.exports)
  }
}

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(319),
  /* template */
  __webpack_require__(320),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/ChangePassword.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 319 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(5);
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




/* harmony default export */ __webpack_exports__["default"] = ({
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
				_this.form.reset();
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
});

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "change_password-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('form', {
    on: {
      "keydown": function($event) {
        _vm.form.errors.clear()
      }
    }
  }, [_c('div', {
    staticClass: "white-contentSection-content"
  }, [_c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container full-width",
    class: {
      'has-errors': _vm.form.errors.has('old')
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
      "value": (_vm.form.old)
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
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container full-width",
    class: {
      'has-errors': _vm.form.errors.has('new')
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
      "value": (_vm.form.new)
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
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container full-width",
    class: {
      'has-errors': _vm.form.errors.has('again')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Ditt gamla lösenord")]), _vm._v(" "), _c('input', {
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
      "value": (_vm.form.again)
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
  }) : _vm._e()])])]), _vm._v(" "), _c('footer', {
    staticClass: "white-contentSection-footer"
  }, [_c('button', {
    staticClass: "btn btn-primary",
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
  }, [_vm._v("Ändra")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Ändra ditt lösenord")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0b64cd46", module.exports)
  }
}

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(322),
  /* template */
  __webpack_require__(323),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Profile/ProfilePicture.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 322 */
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



/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			breakpoints: window.breakpoints,
			processing: false,
			hover: false
		};
	},

	computed: {
		image: function image() {
			return this.$store.getters.authUser.avatar;
		}
	},
	methods: {
		upload: function upload(files) {
			var _this = this;

			if (files.length) {
				this.processing = true;

				var formData = new FormData();
				formData.append('avatar', files[0], files[0].name);

				new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('users/' + this.$store.getters.authUser.id + '/avatar').post(formData).then(function (response) {
					_this.$store.commit('SET_USER', { user: response.user });
					_this.$store.dispatch('showNotification', { type: 'success', msg: 'Nice! Du uppdaterade din avatar.' });
					_this.processing = false;
				}).catch(function (error) {
					_this.$store.dispatch('showNotification', { type: 'error', msg: 'Vi kunde inte uppdatera din avatar. Var god försök igen.' });
				});
			}
		}
	}
});

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "profile_picture-component"
  }, [_c('section', {
    staticClass: "transparent-contentSection"
  }, [(_vm.breakpoints.isSmallDevices()) ? _c('header', {
    staticClass: "transparent-contentSection-header mb15"
  }, [_c('h3', {
    staticClass: "text-left"
  }, [_vm._v("Profilbild")])]) : _vm._e(), _vm._v(" "), _c('form', {
    attrs: {
      "enctype": "multipart/form-data"
    }
  }, [_c('label', {
    staticClass: "profile-picture-label clickable",
    on: {
      "mouseenter": function($event) {
        _vm.hover = true
      },
      "mouseleave": function($event) {
        _vm.hover = false
      }
    }
  }, [_c('img', {
    staticClass: "img-responsive",
    class: {
      opacity: _vm.hover || _vm.processing
    },
    attrs: {
      "src": _vm.image
    }
  }), _vm._v(" "), (_vm.hover || _vm.processing || _vm.breakpoints.isSmallDevices()) ? _c('span', {
    staticClass: "btn btn-primary is-flex c_c",
    class: {
      processing: _vm.processing
    }
  }, [_c('i', {
    staticClass: "icon icon_image wh15 cursor-default mr10"
  }), _vm._v(" Ladda upp ny bild\n\t\t\t\t")]) : _vm._e(), _vm._v(" "), _c('input', {
    staticClass: "hidden",
    attrs: {
      "type": "file",
      "accept": "image/*",
      "disabled": _vm.processing
    },
    on: {
      "change": function($event) {
        _vm.upload($event.target.files)
      }
    }
  })])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c54c5f2", module.exports)
  }
}

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "profile-component"
  }, [_c('div', {
    staticClass: "main-area-with-sidebar"
  }, [_c('div', {
    staticClass: "main-area"
  }, [_c('app-account')], 1), _vm._v(" "), _c('div', {
    staticClass: "main-area-sidebar"
  }, [_c('app-profile-picture')], 1)]), _vm._v(" "), _c('div', {
    staticClass: "main-area-with-sidebar mt30"
  }, [_c('div', {
    staticClass: "main-area"
  }, [_c('app-change-password')], 1), _vm._v(" "), _c('div', {
    staticClass: "main-area-sidebar"
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d33af27", module.exports)
  }
}

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(326),
  /* template */
  __webpack_require__(333),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Notifications/Notifications.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Notifications.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a8e96e5", Component.options)
  } else {
    hotAPI.reload("data-v-6a8e96e5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 326 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NotificationSettings__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__NotificationSettings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__NotificationSettings__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	components: {
		appNotificationSettings: __WEBPACK_IMPORTED_MODULE_0__NotificationSettings___default.a
	}
});

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(328),
  /* template */
  __webpack_require__(332),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Notifications/NotificationSettings.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] NotificationSettings.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9dbe6a7e", Component.options)
  } else {
    hotAPI.reload("data-v-9dbe6a7e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 328 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NotificationSettingsItem__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__NotificationSettingsItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__NotificationSettingsItem__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__includes_Model__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appNotificationSettingsItem: __WEBPACK_IMPORTED_MODULE_1__NotificationSettingsItem___default.a
	},
	data: function data() {
		return {
			processing: false
		};
	},

	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])({
		fetched: 'userNotificationSettingsFetched',
		settings: 'userNotificationSettings'
	})),
	methods: {
		settingChanged: function settingChanged(event) {
			this.settings[event.setting] = Boolean(!this.settings[event.setting]);
		},
		update: function update() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_2__includes_Model__["a" /* default */]("users/" + this.$store.getters.authUser.id + "/notification-settings").patch(this.settings).then(function (response) {
				_this.$store.commit('SET_NOTIFICATIONSETTINGS', { notificationSettings: _this.settings });
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Vi har uppdaterat dina inställningar för när du ska få notifikationer.' });
				_this.processing = false;
			}).catch(function (error) {
				return console.log(error);
			});
		}
	},
	created: function created() {
		var _this2 = this;

		if (!this.fetched) {
			new __WEBPACK_IMPORTED_MODULE_2__includes_Model__["a" /* default */]('user/notification-settings').get().then(function (response) {
				_this2.$store.commit('SET_USER_NOTIFICATION_SETTINGS', response.settings);
				_this2.$store.commit('SET_USER_NOTIFICATION_SETTINGS_FETCHED', true);
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(330),
  /* template */
  __webpack_require__(331),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Notifications/NotificationSettingsItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] NotificationSettingsItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8b0ea818", Component.options)
  } else {
    hotAPI.reload("data-v-8b0ea818", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 330 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['setting', 'value'],
	data: function data() {
		return {
			settingTexts: {
				bid_on_service: 'När någon lägger ett bud på en av mina tjänster.',
				comment_on_service: 'När någon lägger en kommentar på en av mina tjänster.',
				comment_reply: 'När någon lägger en kommentar på en tjänst som jag också har kommenterat på.',
				competing_bid: 'När någon lägger ett bud på en tjänst som jag också har lagt ett bud på.',
				leave_review: 'När ett av dina projekt är avslutat och det är dags att lägga omdöme på den andra parten.',
				message_in_project: 'När jag får ett nytt meddelande i ett av mina projekt.',
				other_party_accepted: 'När den andra parten har accepterat ett projekt och är redo att starta.',
				project_details_changed: 'När specifikationerna för ett projekt blir ändrat.',
				project_started: 'När ett projekt startar.'
			}
		};
	},

	computed: {
		settingText: function settingText() {
			return this.settingTexts[this.setting];
		},
		toggle: function toggle() {
			return this.value ? ['icon_on'] : ['icon_off'];
		}
	}
});

/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "notification_settings_item-component"
  }, [_c('div', {
    staticClass: "setting-text"
  }, [_vm._v("\n\t\t" + _vm._s(_vm.settingText) + "\n\t")]), _vm._v(" "), _c('div', {
    staticClass: "setting-value"
  }, [_c('i', {
    staticClass: "icon wh40",
    class: _vm.toggle,
    attrs: {
      "aria-hidden": "true"
    },
    on: {
      "click": function($event) {
        _vm.$emit('updated', {
          setting: _vm.setting
        })
      }
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8b0ea818", module.exports)
  }
}

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "notification_settings-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [(_vm.fetched) ? _vm._l((_vm.settings), function(value, setting) {
    return _c('app-notification-settings-item', {
      key: setting,
      attrs: {
        "setting": setting,
        "value": value
      },
      on: {
        "updated": _vm.settingChanged
      }
    })
  }) : _c('app-loading')], 2), _vm._v(" "), _c('footer', {
    staticClass: "white-contentSection-footer"
  }, [_c('button', {
    staticClass: "btn btn-primary",
    class: {
      processing: _vm.processing
    },
    attrs: {
      "type": "button",
      "disabled": _vm.processing
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.update($event)
      }
    }
  }, [_vm._v("\n\t\t\t\tUppdatera\n\t\t\t")])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Inställningar för notifikationer")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9dbe6a7e", module.exports)
  }
}

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "notifications-component"
  }, [_c('app-notification-settings')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6a8e96e5", module.exports)
  }
}

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(335),
  /* template */
  __webpack_require__(339),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/CreateService.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 335 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UploadMedia__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__UploadMedia___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__UploadMedia__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		datepicker: __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default.a,
		appUploadMedia: __WEBPACK_IMPORTED_MODULE_3__UploadMedia___default.a
	},
	data: function data() {
		return {
			form: new __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__["a" /* default */]({
				title: '',
				description: '',
				category_id: '',
				region_id: '',
				city_id: '',
				start: '',
				end: '',
				bidding: ''
			}),
			media: [],
			mediaErrors: [],
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
		cities: function cities() {
			var region = this.$store.getters.getRegionById(this.form.region_id);
			return region ? region.cities : [];
		},
		finalData: function finalData() {
			var formData = new FormData();
			var data = this.form.asDate(['start', 'end']).data();

			for (var key in data) {
				formData.append(key, data[key]);
			}

			// Append the media if there is any.
			for (var i = 0; i < this.media.length; i++) {
				formData.append('media[]', this.media[i]);
			}

			return formData;
		}
	},
	methods: {
		mediaAdded: function mediaAdded(_ref) {
			var files = _ref.files;

			for (var i = 0; i < files.length; i++) {
				this.media.push(files[i]);
			}
		},
		mediaRemoved: function mediaRemoved(_ref2) {
			var index = _ref2.index;

			this.media.splice(index, 1);
			if (this.mediaErrors[index]) {
				this.mediaErrors.splice(index, 1);
			}
		},
		create: function create() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('user/services').create(this.finalData).then(function (response) {
				_this.form.reset();
				_this.media = [];
				_this.mediaErrors = [];
				// Break the cache
				_this.$store.commit('SET_USER_SERVICES_FETCHED', false);
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Woohoo! Vi skapade din tjänst.' });
				window.scrollTo(0, 0);
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.mediaErrors = [];
				// Log the media errors seperatly.
				for (var key in error) {
					if (key.includes('media')) {
						var index = key.split('.')[1];
						_this.mediaErrors[index] = error[key];
					}
				}
				window.scrollTo(0, 0);
				_this.processing = false;
			});
		}
	}
});

/***/ }),
/* 336 */
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
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/UploadMedia.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] UploadMedia.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5eb1383e", Component.options)
  } else {
    hotAPI.reload("data-v-5eb1383e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 337 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['media', 'errors', 'disabled'],
	methods: {
		add: function add(files) {
			if (files.length) {
				this.$emit('added', { files: files });
			}
			this.$refs.input.value = '';
		},
		remove: function remove(index) {
			this.$emit('removed', { index: index });
		},
		type: function type(_type) {
			return _type.includes('image/') ? 'fa-file-image-o' : 'fa-file-text-o';
		},
		size: function size(_size) {
			if (_size < 1000) {
				return _size + ' b';
			} else if (_size > 1000000) {
				var s = _size / 1000000;
				return s.toFixed(1) + ' mb';
			} else {
				var _s = _size / 1000;
				return _s.toFixed(1) + ' kb';
			}
		}
	}
});

/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "upload_media-component"
  }, [_c('h4', [_vm._v("Ladda upp media")]), _vm._v(" "), _c('div', {
    staticClass: "help-text mb15"
  }, [_vm._v("Har du bilder, ritningar eller annan media som du vill lägga till?")]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-6 col-sm-push-3"
  }, [_c('ul', {
    staticClass: "media"
  }, _vm._l((_vm.media), function(file, index) {
    return _c('li', [_c('i', {
      staticClass: "fa icon",
      class: [_vm.type(file.type)],
      attrs: {
        "aria-hidden": "true"
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "file-name",
      class: {
        'has-error': _vm.errors[index]
      }
    }, [_vm._v(_vm._s(file.name))]), _vm._v(" "), _c('span', {
      staticClass: "file-size"
    }, [_vm._v(_vm._s(_vm.size(file.size)))]), _vm._v(" "), _c('i', {
      staticClass: "icon icon_delete wh12 ml10",
      on: {
        "click": function($event) {
          _vm.remove(index)
        }
      }
    }), _vm._v(" "), (_vm.errors[index]) ? _c('div', {
      staticClass: "error-block",
      domProps: {
        "textContent": _vm._s(_vm.errors[index][0])
      }
    }) : _vm._e()])
  }))])]), _vm._v(" "), _c('label', {
    staticClass: "btn btn-default"
  }, [_c('i', {
    staticClass: "icon icon_image wh15 mr10"
  }), _vm._v(" Välj media\n\t\t"), _c('input', {
    ref: "input",
    staticClass: "hidden",
    attrs: {
      "type": "file",
      "multiple": "",
      "disabled": _vm.disabled
    },
    on: {
      "change": function($event) {
        _vm.add($event.target.files)
      }
    }
  })])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5eb1383e", module.exports)
  }
}

/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "create_service-component"
  }, [_c('form', {
    staticClass: "form-with-sections",
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.create($event)
      }
    }
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [_c('div', {
    staticClass: "form-section"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container full-width",
    class: {
      'has-errors': _vm.form.errors.has('title')
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
      "value": (_vm.form.title)
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
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "control-container full-width",
    class: {
      'has-errors': _vm.form.errors.has('description')
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
      "value": (_vm.form.description)
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
    staticClass: "form-section"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container half-width",
    class: {
      'has-errors': _vm.form.errors.has('category_id')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Kategori")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.category_id),
      expression: "form.category_id"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.category_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj kategori")]), _vm._v(" "), _vm._l((_vm.categories), function(rootCat) {
    return _c('optgroup', {
      attrs: {
        "label": rootCat.name
      }
    }, _vm._l((rootCat.sub_categories), function(category) {
      return _c('option', {
        domProps: {
          "value": category.id,
          "textContent": _vm._s(category.name)
        }
      })
    }))
  })], 2), _vm._v(" "), (_vm.form.errors.has('category_id')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('category_id'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "control-container half-width",
    class: {
      'has-errors': _vm.form.errors.has('region_id')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Region")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.region_id),
      expression: "form.region_id"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.region_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
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
  })], 2), _vm._v(" "), (_vm.form.errors.has('region_id')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('region_id'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "control-container half-width",
    class: {
      'has-errors': _vm.form.errors.has('city_id')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Stad")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.city_id),
      expression: "form.city_id"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": !_vm.form.region_id
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.city_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
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
  })], 2), _vm._v(" "), (_vm.form.errors.has('city_id')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('city_id'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "form-section"
  }, [_vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container half-width",
    class: {
      'has-errors': _vm.form.errors.has('start')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Påbörja tjänsten")]), _vm._v(" "), _c('datepicker', {
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    model: {
      value: (_vm.form.start),
      callback: function($$v) {
        _vm.form.start = $$v
      },
      expression: "form.start"
    }
  }), _vm._v(" "), (_vm.form.errors.has('start')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('start'))
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "control-container half-width",
    class: {
      'has-errors': _vm.form.errors.has('end')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Avsluta tjänsten")]), _vm._v(" "), _c('datepicker', {
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    model: {
      value: (_vm.form.end),
      callback: function($$v) {
        _vm.form.end = $$v
      },
      expression: "form.end"
    }
  }), _vm._v(" "), (_vm.form.errors.has('end')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('end'))
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "control-container half-width",
    class: {
      'has-errors': _vm.form.errors.has('bidding')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Dagar för budgivning")]), _vm._v(" "), _c('select', {
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
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return _vm._n(val)
        });
        _vm.form.bidding = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
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
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "form-section no-border"
  }, [_vm._m(4), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('app-upload-media', {
    attrs: {
      "media": _vm.media,
      "errors": _vm.mediaErrors,
      "disabled": _vm.processing
    },
    on: {
      "added": _vm.mediaAdded,
      "removed": _vm.mediaRemoved
    }
  })], 1)])]), _vm._v(" "), _c('footer', {
    staticClass: "white-contentSection-footer"
  }, [_c('button', {
    staticClass: "btn btn-primary",
    class: {
      processing: _vm.processing
    },
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("\n\t\t\t\t\tSkapa tjänst\n\t\t\t\t")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Skapa en ny tjänst")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-section-description"
  }, [_c('div', {
    staticClass: "description-header"
  }, [_vm._v("Tjänstens innehåll")]), _vm._v(" "), _c('div', {
    staticClass: "description-details"
  }, [_vm._v("\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit\n\t\t\t\t\t\t")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-section-description"
  }, [_c('div', {
    staticClass: "description-header"
  }, [_vm._v("Tjänstens detaljer")]), _vm._v(" "), _c('div', {
    staticClass: "description-details"
  }, [_vm._v("\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit\n\t\t\t\t\t\t")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-section-description"
  }, [_c('div', {
    staticClass: "description-header"
  }, [_vm._v("Tjänstens datum")]), _vm._v(" "), _c('div', {
    staticClass: "description-details"
  }, [_vm._v("\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit\n\t\t\t\t\t\t")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-section-description"
  }, [_c('div', {
    staticClass: "description-header"
  }, [_vm._v("Tjänstens media")]), _vm._v(" "), _c('div', {
    staticClass: "description-details"
  }, [_vm._v("\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit\n\t\t\t\t\t\t")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5add2834", module.exports)
  }
}

/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(341),
  /* template */
  __webpack_require__(342),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/MyServices.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 341 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapGetters */])({
		fetched: 'userServicesFetched',
		services: 'userServices'
	})),
	methods: {
		goTo: function goTo(service) {
			this.$router.push('services/' + service.id);
		}
	},
	created: function created() {
		var _this = this;

		if (!this.fetched) {
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('user/services').get().then(function (response) {
				_this.$store.commit('SET_USER_SERVICES_FETCHED', true);
				_this.$store.commit('SET_USER_SERVICES', response.services);
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_services-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [(_vm.fetched) ? _c('ul', {
    staticClass: "items-list"
  }, _vm._l((_vm.services), function(service) {
    return _c('li', {
      staticClass: "gray-item clickable",
      on: {
        "click": function($event) {
          _vm.goTo(service)
        }
      }
    }, [_c('div', {
      staticClass: "item-content"
    }, [_c('div', {
      staticClass: "item-header",
      domProps: {
        "textContent": _vm._s(service.title)
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "item-sub-data"
    }, [_c('span', {
      staticClass: "mr5"
    }, [_vm._v(_vm._s(_vm.$store.getters.getCategoryById(service.category_id).name))]), _vm._v("•\n\t\t\t\t\t\t\t"), _c('span', {
      staticClass: "ml5"
    }, [_vm._v(_vm._s(service.active ? 'Budgivning pågår' : 'Avslutad'))])])]), _vm._v(" "), _vm._m(1, true)])
  })) : _c('app-loading')], 1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Mina tjänster")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-go-to"
  }, [_c('i', {
    staticClass: "icon icon_arrow_right wh12"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-57e11a9f", module.exports)
  }
}

/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(344),
  /* template */
  __webpack_require__(354),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/EditService.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] EditService.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b0c329b4", Component.options)
  } else {
    hotAPI.reload("data-v-b0c329b4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 344 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EditServiceForm__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EditServiceForm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__EditServiceForm__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ViewAllBids__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ViewAllBids___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ViewAllBids__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ServiceBids__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ServiceBids___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ServiceBids__);
//
//
//
//
//
//
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
		appEditServiceForm: __WEBPACK_IMPORTED_MODULE_0__EditServiceForm___default.a,
		appViewAllBids: __WEBPACK_IMPORTED_MODULE_1__ViewAllBids___default.a,
		appServiceBids: __WEBPACK_IMPORTED_MODULE_2__ServiceBids___default.a
	},
	data: function data() {
		return {
			currentView: 'appEditServiceForm'
		};
	},

	methods: {
		changeView: function changeView(_ref) {
			var view = _ref.view;

			this.currentView = view;
		}
	},
	destroyed: function destroyed() {
		this.$store.dispatch('clearServiceDetailsState');
	}
});

/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(346),
  /* template */
  __webpack_require__(347),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/EditServiceForm.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] EditServiceForm.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-567c39ec", Component.options)
  } else {
    hotAPI.reload("data-v-567c39ec", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 346 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
				title: '',
				category_id: '',
				region_id: '',
				city_id: '',
				start: '',
				end: '',
				description: ''
			}),
			media: [],
			mediaErrors: [],
			processing: false
		};
	},

	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapGetters */])({
		fetched: 'serviceDetailsFetched',
		service: 'serviceDetailsService'
	}), {
		categories: function categories() {
			return this.$store.getters.getCategories;
		},
		regions: function regions() {
			return this.$store.getters.getRegions;
		},
		cities: function cities() {
			var region = this.$store.getters.getRegionById(this.form.region_id);
			return region ? region.cities : [];
		},
		finalData: function finalData() {
			var formData = new FormData();
			var data = this.form.asDate(['start', 'end']).data();

			formData.append('_method', 'patch');
			for (var key in data) {
				formData.append(key, data[key]);
			}

			// Append the media if there is any.
			for (var i = 0; i < this.media.length; i++) {
				formData.append('media[]', this.media[i]);
			}

			return formData;
		}
	}),
	methods: {
		update: function update() {
			var _this = this;

			this.processing = true;
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('user/services/' + this.$route.params.id).post(this.finalData).then(function (response) {
				_this.form.errors.clear();
				// Break the services cache so it reloads with the updated info.
				_this.$store.commit('SET_USER_SERVICES_FETCHED', false);
				_this.$store.commit('SET_SERVICE_DETAILS_SERVICE', response.service);
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Vi uppdaterade din tjänst!' });
				window.scrollTo(0, 0);
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				window.scrollTo(0, 0);
				_this.processing = false;
			});
		}
	},
	created: function created() {
		var _this2 = this;

		if (!this.fetched) {
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('user/services/' + this.$route.params.id).get().then(function (response) {
				_this2.form.title = response.service.title;
				_this2.form.category_id = response.service.category_id;
				_this2.form.region_id = response.service.region_id;
				_this2.form.city_id = response.service.city_id;
				_this2.form.start = response.service.start;
				_this2.form.end = response.service.end;
				_this2.form.description = response.service.description;
				_this2.$store.commit('SET_SERVICE_DETAILS_FETCHED', true);
				_this2.$store.commit('SET_SERVICE_DETAILS_SERVICE', response.service);
			}).catch(function (error) {
				console.log(error);
			});
		} else {
			this.form.title = this.service.title;
			this.form.category_id = this.service.category_id;
			this.form.region_id = this.service.region_id;
			this.form.city_id = this.service.city_id;
			this.form.start = this.service.start;
			this.form.end = this.service.end;
			this.form.description = this.service.description;
		}
	}
});

/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "edit_service_form-component"
  }, [_c('form', {
    staticClass: "form-with-sections",
    class: {
      loading: !_vm.fetched
    },
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.update($event)
      }
    }
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [_c('div', {
    staticClass: "form-section"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container full-width",
    class: {
      'has-errors': _vm.form.errors.has('title')
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
      "value": (_vm.form.title)
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
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "control-container full-width",
    class: {
      'has-errors': _vm.form.errors.has('description')
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
      "value": (_vm.form.description)
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
    staticClass: "form-section"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container",
    class: {
      'has-errors': _vm.form.errors.has('category_id')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Kategori")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.category_id),
      expression: "form.category_id"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.category_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Välj kategori")]), _vm._v(" "), _vm._l((_vm.categories), function(rootCat) {
    return _c('optgroup', {
      attrs: {
        "label": rootCat.name
      }
    }, _vm._l((rootCat.sub_categories), function(category) {
      return _c('option', {
        domProps: {
          "value": category.id,
          "textContent": _vm._s(category.name)
        }
      })
    }))
  })], 2), _vm._v(" "), (_vm.form.errors.has('category_id')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('category_id'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "control-container",
    class: {
      'has-errors': _vm.form.errors.has('region_id')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Region")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.region_id),
      expression: "form.region_id"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.region_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
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
  })], 2), _vm._v(" "), (_vm.form.errors.has('region_id')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('region_id'))
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "control-container",
    class: {
      'has-errors': _vm.form.errors.has('city_id')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Stad")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.form.city_id),
      expression: "form.city_id"
    }],
    staticClass: "form-control",
    attrs: {
      "disabled": !_vm.form.region_id
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.city_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
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
  })], 2), _vm._v(" "), (_vm.form.errors.has('city_id')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('city_id'))
    }
  }) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "form-section"
  }, [_vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  }, [_c('div', {
    staticClass: "control-container",
    class: {
      'has-errors': _vm.form.errors.has('start')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Påbörja tjänsten")]), _vm._v(" "), _c('datepicker', {
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    model: {
      value: (_vm.form.start),
      callback: function($$v) {
        _vm.form.start = $$v
      },
      expression: "form.start"
    }
  }), _vm._v(" "), (_vm.form.errors.has('start')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('start'))
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "control-container",
    class: {
      'has-errors': _vm.form.errors.has('end')
    }
  }, [_c('label', {
    staticClass: "control-label"
  }, [_vm._v("Avsluta tjänsten")]), _vm._v(" "), _c('datepicker', {
    attrs: {
      "input-class": "form-control",
      "language": "sv",
      "monday-first": true,
      "disabled": {
        to: new Date()
      }
    },
    model: {
      value: (_vm.form.end),
      callback: function($$v) {
        _vm.form.end = $$v
      },
      expression: "form.end"
    }
  }), _vm._v(" "), (_vm.form.errors.has('end')) ? _c('span', {
    staticClass: "help-block",
    domProps: {
      "textContent": _vm._s(_vm.form.errors.get('end'))
    }
  }) : _vm._e()], 1)])]), _vm._v(" "), _vm._m(4)]), _vm._v(" "), _c('footer', {
    staticClass: "white-contentSection-footer"
  }, [_c('button', {
    staticClass: "btn btn-primary",
    class: {
      processing: _vm.processing
    },
    attrs: {
      "type": "submit"
    }
  }, [_vm._v("\n\t\t\t\t\tUppdatera tjänsten\n\t\t\t\t")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Redigera tjänst")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-section-description"
  }, [_c('div', {
    staticClass: "description-header"
  }, [_vm._v("Tjänstens innehåll")]), _vm._v(" "), _c('div', {
    staticClass: "description-details"
  }, [_vm._v("\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit\n\t\t\t\t\t\t")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-section-description"
  }, [_c('div', {
    staticClass: "description-header"
  }, [_vm._v("Tjänstens detaljer")]), _vm._v(" "), _c('div', {
    staticClass: "description-details"
  }, [_vm._v("\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit\n\t\t\t\t\t\t")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-section-description"
  }, [_c('div', {
    staticClass: "description-header"
  }, [_vm._v("Tjänstens datum")]), _vm._v(" "), _c('div', {
    staticClass: "description-details"
  }, [_vm._v("\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit\n\t\t\t\t\t\t")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-section no-border"
  }, [_c('div', {
    staticClass: "form-section-description"
  }, [_c('div', {
    staticClass: "description-header"
  }, [_vm._v("Tjänstens media")]), _vm._v(" "), _c('div', {
    staticClass: "description-details"
  }, [_vm._v("\n\t\t\t\t\t\t\tLorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias itaque dignissimos odit\n\t\t\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "form-section-controls"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-567c39ec", module.exports)
  }
}

/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(349),
  /* template */
  __webpack_require__(350),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/ViewAllBids.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ViewAllBids.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a9e304d", Component.options)
  } else {
    hotAPI.reload("data-v-0a9e304d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 349 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OneBid__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OneBid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__OneBid__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
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
		appOneBid: __WEBPACK_IMPORTED_MODULE_1__OneBid___default.a
	},
	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])({
		bids: 'serviceDetailsBids',
		bidAccepted: 'serviceDetailsBidAccepted'
	}))
});

/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "view_all_bids-component"
  }, [_c('div', {
    staticClass: "content-link-section mb15"
  }, [_c('a', {
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.$emit('changeView', {
          view: 'appEditServiceForm'
        })
      }
    }
  }, [_c('i', {
    staticClass: "icon_go_back mr5"
  }), _vm._v("Redigera\n\t\t")])]), _vm._v(" "), _vm._l((_vm.bids), function(bid) {
    return _c('app-one-bid', {
      key: bid.id,
      attrs: {
        "bid": bid
      }
    })
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0a9e304d", module.exports)
  }
}

/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(352),
  /* template */
  __webpack_require__(353),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Services/ServiceBids.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ServiceBids.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-29d26546", Component.options)
  } else {
    hotAPI.reload("data-v-29d26546", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 352 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapGetters */])({
		fetched: 'serviceDetailsBidsFetched',
		bids: 'serviceDetailsBids'
	})),
	methods: {
		time: function time(date) {
			return moment(date).format('D MMM YYYY HH:mm');
		},
		showAll: function showAll() {
			if (this.fetched) {
				this.$emit('changeView', { view: 'appViewAllBids' });
			}
		},
		showBid: function showBid(bid) {
			this.$store.dispatch('openModal', {
				component: 'showUserBid',
				size: 'size-large',
				data: { bid: bid }
			});
		}
	},
	created: function created() {
		var _this = this;

		new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('services/' + this.$route.params.id + '/bids').get().then(function (response) {
			_this.$store.commit('SET_SERVICE_DETAILS_BIDS_FETCHED', true);
			_this.$store.commit('SET_SERVICE_DETAILS_BIDS', response.bids);
			_this.$store.commit('SET_SERVICE_DETAILS_BID_ACCEPTED', response.meta.bid_accepted);
		}).catch(function (error) {
			console.log(error);
		});
	}
});

/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "service_bids-component"
  }, [_c('section', {
    staticClass: "transparent-contentSection"
  }, [_c('header', {
    staticClass: "transparent-contentSection-header"
  }, [_c('h3', [_vm._v("Budhistorik")]), _vm._v(" "), _c('a', {
    staticClass: "is-link",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.showAll($event)
      }
    }
  }, [_vm._v("Visa alla")])]), _vm._v(" "), _c('div', {
    staticClass: "transparent-contentSection-content"
  }, [_c('ul', {
    staticClass: "items-list-icon"
  }, _vm._l((_vm.bids), function(bid) {
    return _c('li', {
      staticClass: "clickable has-go-to",
      on: {
        "click": function($event) {
          _vm.showBid(bid)
        }
      }
    }, [_c('div', {
      staticClass: "item-list-icon"
    }, [_c('div', {
      staticClass: "bid-user-avatar",
      style: ({
        backgroundImage: ("url(" + (bid.user.avatar) + ")")
      })
    })]), _vm._v(" "), _c('div', {
      staticClass: "item-list-icon-content"
    }, [_c('div', {
      staticClass: "bid-user"
    }, [_vm._v("\n\t\t\t\t\t\t\t " + _vm._s(bid.user.username) + "\n\t\t\t\t\t\t\t "), (bid.accepted) ? _c('span', {
      staticClass: "bid-accepted"
    }) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "bid-created-at",
      domProps: {
        "textContent": _vm._s(_vm.time(bid.created_at))
      }
    })])])
  }))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-29d26546", module.exports)
  }
}

/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "edit_service-component"
  }, [_c('div', {
    staticClass: "main-area-with-sidebar"
  }, [_c('div', {
    staticClass: "main-area"
  }, [_c(_vm.currentView, {
    tag: "component",
    on: {
      "changeView": _vm.changeView
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "main-area-sidebar"
  }, [_c('app-service-bids', {
    on: {
      "changeView": _vm.changeView
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b0c329b4", module.exports)
  }
}

/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(356),
  /* template */
  __webpack_require__(357),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Bids/MyBids.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 356 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapGetters */])({
		fetched: 'userBidsFetched',
		bids: 'userBids'
	})),
	methods: {
		description: function description(desc) {
			return desc.length > 75 ? desc.substr(0, 75) + '...' : desc;
		},
		bidDate: function bidDate(bid) {
			return moment(bid.created_at).format('LLL');
		},
		goTo: function goTo(bid) {
			this.$store.commit('SET_USER_BID_DETAILS_FETCHED', true);
			this.$store.commit('SET_USER_BID_DETAILS', bid);
			this.$router.push('/user/bids/' + bid.id);
		}
	},
	created: function created() {
		var _this = this;

		if (!this.fetched) {
			new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('user/bids').get().then(function (response) {
				_this.$store.commit('SET_USER_BIDS_FETCHED', true);
				_this.$store.commit('SET_USER_BIDS', response.bids);
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_bids-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [(_vm.fetched) ? [(_vm.bids.length > 0) ? _c('ul', {
    staticClass: "items-list"
  }, _vm._l((_vm.bids), function(bid) {
    return _c('li', {
      staticClass: "gray-item clickable",
      on: {
        "click": function($event) {
          _vm.goTo(bid)
        }
      }
    }, [_c('div', {
      staticClass: "item-content"
    }, [_c('div', {
      staticClass: "item-header",
      domProps: {
        "textContent": _vm._s(_vm.description(bid.description))
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "item-sub-data"
    }, [_c('span', {
      staticClass: "mr5"
    }, [_vm._v("Bud lagt den " + _vm._s(_vm.bidDate(bid)))]), _vm._v("•\n\t\t\t\t\t\t\t\t"), _c('span', {
      staticClass: "ml5"
    }, [_vm._v("Budet är " + _vm._s(bid.accepted ? 'accepterat' : 'ej accepterat'))])])]), _vm._v(" "), _vm._m(1, true)])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("Du inte lagt några bud än. Lägg ditt första bud på en tjänst som passar dig.")])] : _c('app-loading')], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Mina bud")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-go-to"
  }, [_c('i', {
    staticClass: "icon icon_arrow_right wh12"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ffbea3c2", module.exports)
  }
}

/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(359),
  /* template */
  __webpack_require__(363),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Bids/BidDetails.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BidDetails.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-65d9c1c2", Component.options)
  } else {
    hotAPI.reload("data-v-65d9c1c2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 359 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BidService__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BidService___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__BidService__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appBidService: __WEBPACK_IMPORTED_MODULE_2__BidService___default.a
	},
	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])({
		fetched: 'userBidDetailsFetched',
		bid: 'userBidDetails'
	})),
	created: function created() {
		var _this = this;

		if (!this.fetched) {
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('user/bids/' + this.$route.params.id).get().then(function (response) {
				_this.$store.commit('SET_USER_BID_DETAILS_FETCHED', true);
				_this.$store.commit('SET_USER_BID_DETAILS', response.bid);
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(361),
  /* template */
  __webpack_require__(362),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Bids/BidService.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BidService.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c0f24b5", Component.options)
  } else {
    hotAPI.reload("data-v-6c0f24b5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 361 */
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
//
//
//
//
//
//
//
//
//
//
//
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
	props: ['service'],
	computed: {
		fetched: function fetched() {
			return this.$store.getters.userBidDetailsFetched;
		},
		statusText: function statusText() {
			return this.service.bid_accepted ? ' är avslutad' : 'pågår';
		},
		finishText: function finishText() {
			return this.service.bid_accepted ? 'Avslutades' : 'Avslutas';
		}
	},
	methods: {
		remove: function remove() {
			var _this = this;

			this.$store.dispatch('openModal', {
				component: 'confirm',
				data: {
					confirmText: 'Är du säker på att du vill ta bort budet?',
					onConfirm: function onConfirm() {
						new __WEBPACK_IMPORTED_MODULE_0__includes_Model__["a" /* default */]('user/bids/' + _this.$route.params.id).delete().then(function (response) {
							_this.$store.dispatch('showNotification', {
								type: 'success',
								msg: 'Ditt bud är nu borttaget!'
							});
							// Set the projects fetched to false so we break the cache.
							_this.$store.commit('SET_USER_BIDS_FETCHED', false);
							_this.$router.push('/user/bids');
							_this.$store.dispatch('closeModal');
						}).catch(function (error) {
							console.log(error);
						});
					}
				}
			});
		}
	}
});

/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bid_service-component"
  }, [_c('section', {
    staticClass: "transparent-contentSection"
  }, [_c('header', {
    staticClass: "transparent-contentSection-header"
  }, [_c('h3', [_vm._v("Tjänsten")]), _vm._v(" "), (_vm.fetched) ? [(_vm.service.active) ? _c('router-link', {
    staticClass: "is-link",
    attrs: {
      "to": ("/services/" + (_vm.service.id))
    }
  }, [_vm._v("\n\t\t\t\t\tVisa tjänsten\n\t\t\t\t")]) : _vm._e()] : _vm._e()], 2), _vm._v(" "), (_vm.fetched) ? [_c('div', {
    staticClass: "transparent-contentSection-content"
  }, [_c('ul', {
    staticClass: "items-list-icon"
  }, [_c('li', {}, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "item-list-icon-content"
  }, [_c('div', [_vm._v("Titel")]), _vm._v(" "), _c('div', {
    staticClass: "gray-sub-text",
    domProps: {
      "textContent": _vm._s(_vm.service.title)
    }
  })])]), _vm._v(" "), _c('li', {}, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "item-list-icon-content"
  }, [_c('div', [_vm._v("Budgivningen " + _vm._s(_vm.statusText))]), _vm._v(" "), _c('div', {
    staticClass: "gray-sub-text"
  }, [_vm._v(_vm._s(_vm.finishText) + " " + _vm._s(_vm.filters.time(_vm.service.bid_stop)))])])])]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-danger full-width is-flex c_c",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.remove($event)
      }
    }
  }, [_c('i', {
    staticClass: "icon icon_danger wh20 mr10"
  }), _vm._v(" Ta bort budet\n\t\t\t\t")])])] : _vm._e()], 2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-list-icon pt3"
  }, [_c('i', {
    staticClass: "icon icon_document_check wh15 cursor-default"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-list-icon"
  }, [_c('i', {
    staticClass: "icon icon_bid wh20 cursor-default"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c0f24b5", module.exports)
  }
}

/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "bid_details-component"
  }, [_c('div', {
    staticClass: "main-area-with-sidebar"
  }, [_c('div', {
    staticClass: "main-area"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [(_vm.fetched) ? [_c('header', {
    staticClass: "white-contentSection-header has-actions"
  }, [_c('div', {
    staticClass: "gray-text"
  }, [_vm._v("Budet skapades den " + _vm._s(_vm.filters.time(_vm.bid.created_at)))]), _vm._v(" "), (_vm.bid.accepted) ? _c('div', {
    staticClass: "header-actions"
  }, [_c('i', {
    staticClass: "icon icon_confirmed wh20 mr5"
  }), _c('span', {
    staticClass: "bid-accepted"
  }, [_vm._v("Accepterat bud")])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "gray-contentSection-content"
  }, [_c('ul', {
    staticClass: "bid-details-list"
  }, [_c('li', [_c('div', {
    staticClass: "detail-item"
  }, [_vm._v("Kan börja")]), _vm._v(" "), _c('div', {
    staticClass: "detail-value",
    domProps: {
      "textContent": _vm._s(_vm.filters.date(_vm.bid.start))
    }
  })]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "detail-item"
  }, [_vm._v("Är klart")]), _vm._v(" "), _c('div', {
    staticClass: "detail-value",
    domProps: {
      "textContent": _vm._s(_vm.filters.date(_vm.bid.end))
    }
  })]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "detail-item"
  }, [_vm._v("Antal timmar")]), _vm._v(" "), _c('div', {
    staticClass: "detail-value",
    domProps: {
      "textContent": _vm._s(_vm.filters.commaSeparator(_vm.bid.hours))
    }
  })]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "detail-item"
  }, [_vm._v("Pris")]), _vm._v(" "), _c('div', {
    staticClass: "detail-value",
    domProps: {
      "textContent": _vm._s(_vm.filters.currency(_vm.bid.price))
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content",
    domProps: {
      "textContent": _vm._s(_vm.bid.description)
    }
  })] : _c('app-loading')], 2)]), _vm._v(" "), _c('div', {
    staticClass: "main-area-sidebar"
  }, [_c('app-bid-service', {
    attrs: {
      "service": _vm.bid.service
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-65d9c1c2", module.exports)
  }
}

/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(365),
  /* template */
  __webpack_require__(366),
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
/* 365 */
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
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_projects-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [(_vm.fetched) ? [(_vm.projects.length > 0) ? _c('ul', {
    staticClass: "items-list"
  }, _vm._l((_vm.projects), function(project) {
    return _c('li', {
      staticClass: "gray-item clickable",
      on: {
        "click": function($event) {
          _vm.show(project)
        }
      }
    }, [_c('div', {
      staticClass: "item-content"
    }, [_c('div', {
      staticClass: "item-header",
      domProps: {
        "textContent": _vm._s(project.title || ("#" + (project.id)))
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "item-sub-data"
    }, [_c('span', {
      staticClass: "mr5"
    }, [_vm._v("Projektet skapades den " + _vm._s(_vm.projectCreated(project)))]), _vm._v("•\n\t\t\t\t\t\t\t\t"), _c('span', {
      staticClass: "ml5 is-weight-500"
    }, [_vm._v(_vm._s(project.completed ? 'Avslutat' : 'Pågår'))])])]), _vm._v(" "), _vm._m(1, true)])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("\n\t\t\t\t\tDu har ännu inga skapade projekt.\n\t\t\t\t")])] : _c('app-loading')], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Mina projekt")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-go-to"
  }, [_c('i', {
    staticClass: "icon icon_arrow_right wh12"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1aea1dc2", module.exports)
  }
}

/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(368),
  /* template */
  __webpack_require__(407),
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
/* 368 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProjectTitle__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProjectTitle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ProjectTitle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Messages_MessageBoard__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Messages_MessageBoard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Messages_MessageBoard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProjectAccept__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ProjectAccept___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ProjectAccept__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ProjectStarted__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ProjectStarted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ProjectStarted__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ProjectCompleted__ = __webpack_require__(396);
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
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(370),
  /* template */
  __webpack_require__(371),
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
/* 370 */
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
/* 371 */
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
/* 372 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(373)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(375),
  /* template */
  __webpack_require__(382),
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
/* 373 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(374);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("2533e1c8", content, false);
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
/* 374 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "\n.message_board-component .alert {\n  padding: 40px 15px;\n  margin: 0;\n  border: 1px solid #d7d7d7;\n  border-bottom: none;\n}\n", ""]);

// exports


/***/ }),
/* 375 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SendMessage__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SendMessage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__SendMessage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Message__ = __webpack_require__(379);
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
/* 376 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(377),
  /* template */
  __webpack_require__(378),
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
/* 377 */
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
/* 378 */
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
/* 379 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(380),
  /* template */
  __webpack_require__(381),
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
/* 380 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_heartbeat__ = __webpack_require__(10);
//
//
//
//
//
//
//
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
/* 381 */
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
/* 382 */
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
/* 383 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(384),
  /* template */
  __webpack_require__(390),
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
/* 384 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Timer__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Includes_Timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChangeProjectDetails__ = __webpack_require__(385);
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
/* 385 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(386)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(388),
  /* template */
  __webpack_require__(389),
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
/* 386 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(387);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("b3030b1e", content, false);
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
/* 387 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "\n.change_project_details-component[data-v-4f3a1e5c] {\n  position: relative;\n}\n.change_project_details-component .close[data-v-4f3a1e5c] {\n    position: absolute;\n    top: -10px;\n    right: 0;\n}\nlabel[data-v-4f3a1e5c] {\n  margin-bottom: 2px;\n}\n.form-group[data-v-4f3a1e5c] {\n  margin-bottom: 5px;\n}\n.btn[data-v-4f3a1e5c] {\n  margin-bottom: 0;\n}\n", ""]);

// exports


/***/ }),
/* 388 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuejs_datepicker__ = __webpack_require__(12);
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
/* 389 */
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
/* 390 */
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
/* 391 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(392)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(394),
  /* template */
  __webpack_require__(395),
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
/* 392 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(393);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("4d64bc3d", content, false);
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
/* 393 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "\n.finish-text[data-v-1de8cefe] {\n  font-size: 16px;\n}\n.timer-component[data-v-1de8cefe] {\n  font-size: 20px;\n  font-weight: bold;\n  margin: 5px 0;\n}\n.finish-date[data-v-1de8cefe] {\n  font-style: italic;\n  font-size: 13px;\n}\n", ""]);

// exports


/***/ }),
/* 394 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Includes_Timer__ = __webpack_require__(13);
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
/* 395 */
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
/* 396 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(397),
  /* template */
  __webpack_require__(406),
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
/* 397 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Reviews_LeaveReview__ = __webpack_require__(398);
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
/* 398 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(399),
  /* template */
  __webpack_require__(405),
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
/* 399 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PickStars__ = __webpack_require__(400);
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
/* 400 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(401)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(403),
  /* template */
  __webpack_require__(404),
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
/* 401 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(402);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("a4de9b82", content, false);
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
/* 402 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(undefined);
// imports


// module
exports.push([module.i, "\n.pick_stars-component {\n  font-size: 18px;\n}\n.pick_stars-component i {\n    color: #FFC100;\n    cursor: pointer;\n}\n", ""]);

// exports


/***/ }),
/* 403 */
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
/* 404 */
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
/* 405 */
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
/* 406 */
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
/* 407 */
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
/* 408 */
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
/* 409 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])({
		fetched: 'userInvoicesFetched',
		invoices: 'userInvoices'
	}), {
		paymentStatus: function paymentStatus(invoice) {
			var paymentText = invoice.payment ? 'Betalad' : 'Förfaller';
			var paymentDate = invoice.payment ? '' : moment(invoice.due).format('LL');
			return paymentText + ' den ' + paymentDate;
		}
	}),
	methods: {
		goTo: function goTo(invoice) {
			this.$store.commit('SET_USER_INVOICES_FOCUS', invoice.id);
			this.$router.push('/user/invoices/' + invoice.id);
		}
	},
	created: function created() {
		var _this = this;

		if (!this.fetched) {
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('invoices').get().then(function (response) {
				_this.$store.commit('SET_USER_INVOICES', response.invoices);
				_this.$store.commit('SET_USER_INVOICES_FETCHED', true);
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),
/* 410 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_invoices-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [(_vm.fetched) ? [(_vm.invoices.length > 0) ? _c('ul', {
    staticClass: "items-list"
  }, _vm._l((_vm.invoices), function(invoice) {
    return _c('li', {
      staticClass: "gray-item clickable",
      on: {
        "click": function($event) {
          _vm.goTo(invoice)
        }
      }
    }, [_c('div', {
      staticClass: "item-content"
    }, [_c('div', {
      staticClass: "item-header"
    }, [_vm._v("Faktura #" + _vm._s(invoice.id))]), _vm._v(" "), _c('div', {
      staticClass: "item-sub-data"
    }, [_c('span', {
      staticClass: "mr5"
    }, [_vm._v("Totalsumma: " + _vm._s(_vm.filters.currency(invoice.total)))]), _vm._v("•\n\t\t\t\t\t\t\t\t"), _c('span', {
      staticClass: "ml5",
      domProps: {
        "textContent": _vm._s(_vm.paymentStatus)
      }
    })])]), _vm._v(" "), _vm._m(1, true)])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("Där finns inga betalningar registrerade på dig ännu.")])] : _c('app-loading')], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Betalningar")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-go-to"
  }, [_c('i', {
    staticClass: "icon icon_arrow_right wh12"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-880794c2", module.exports)
  }
}

/***/ }),
/* 411 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(412),
  /* template */
  __webpack_require__(413),
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
/* 412 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapGetters */])({
		fetched: 'userInvoicesFetched',
		invoice: 'userInvoicesFocus'
	}), {
		paymentTitle: function paymentTitle() {
			return this.invoice.payment ? 'Betalad' : 'Förfallodag';
		},
		paymentDate: function paymentDate() {
			return this.invoice.payment ? '' : moment(this.invoice.due).format('LL');
		}
	}),
	created: function created() {
		var _this = this;

		if (!this.fetched) {
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('invoices').get().then(function (response) {
				_this.$store.commit('SET_USER_INVOICES', response.invoices);
				_this.$store.commit('SET_USER_INVOICES_FOCUS', _this.$route.params.id);
				_this.$store.commit('SET_USER_INVOICES_FETCHED', true);
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),
/* 413 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "invoice_details-component"
  }, [(_vm.fetched) ? [_c('div', {
    staticClass: "main-area-with-sidebar"
  }, [_c('div', {
    staticClass: "main-area"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Faktura #" + _vm._s(_vm.invoice.id))])]), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [_vm._v("\n\t\t\t\t\t\tbla\n\t\t\t\t\t")]), _vm._v(" "), _c('footer', {
    staticClass: "white-contentSection-footer"
  }, [_c('div', {
    staticClass: "invoice-totals-container"
  }, [_c('div', {
    staticClass: "totals-section"
  }, [_c('div', {
    staticClass: "totals-header"
  }, [_vm._v("Totalsumma")]), _vm._v(" "), _c('div', {
    staticClass: "totals-value",
    domProps: {
      "textContent": _vm._s(_vm.filters.currency(_vm.invoice.total))
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "invoice-totals-container"
  }, [_c('div', {
    staticClass: "totals-section"
  }, [_c('div', {
    staticClass: "totals-header"
  }, [_vm._v("Varav moms")]), _vm._v(" "), _c('div', {
    staticClass: "totals-value",
    domProps: {
      "textContent": _vm._s(_vm.filters.currency(_vm.invoice.vat))
    }
  })])])])])]), _vm._v(" "), _c('div', {
    staticClass: "main-area-sidebar"
  }, [_c('section', {
    staticClass: "transparent-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "transparent-contentSection-content"
  }, [_c('ul', {
    staticClass: "items-list-icon"
  }, [_c('li', {}, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "item-list-icon-content"
  }, [_c('div', [_vm._v("För projektet")]), _vm._v(" "), _c('div', {
    staticClass: "gray-sub-text",
    domProps: {
      "textContent": _vm._s(_vm.invoice.project.title)
    }
  })])]), _vm._v(" "), _c('li', {}, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "item-list-icon-content"
  }, [_c('div', [_vm._v("Skapad")]), _vm._v(" "), _c('div', {
    staticClass: "gray-sub-text",
    domProps: {
      "textContent": _vm._s(_vm.filters.time(_vm.invoice.created_at))
    }
  })])]), _vm._v(" "), _c('li', {}, [_vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "item-list-icon-content"
  }, [_c('div', [_vm._v(_vm._s(_vm.paymentTitle))]), _vm._v(" "), _c('div', {
    staticClass: "gray-sub-text"
  }, [_vm._v(_vm._s(_vm.paymentDate))])])])]), _vm._v(" "), _c('a', {
    staticClass: "btn btn-success full-width is-flex c_c",
    attrs: {
      "href": ("/download-invoice/" + (_vm.invoice.hash)),
      "target": "_blank"
    }
  }, [_c('i', {
    staticClass: "icon icon_download wh20 mr10"
  }), _vm._v(" Ladda ner fakturan\n\t\t\t\t\t\t")])])])])]), _vm._v(" "), _c('div', {
    staticClass: "alert alert-warning mt30"
  }, [_vm._v("\n\t\t\tHär ska payment iFrame finnas\n\t\t")])] : _c('app-loading')], 2)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "transparent-contentSection-header"
  }, [_c('h3', [_vm._v("Detaljer")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-list-icon pt3"
  }, [_c('i', {
    staticClass: "icon icon_two_users wh15 cursor-default"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-list-icon pt3"
  }, [_c('i', {
    staticClass: "icon icon_clock wh15 cursor-default"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "item-list-icon"
  }, [_c('i', {
    staticClass: "icon icon_credit_card wh15 cursor-default"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f8d4c97c", module.exports)
  }
}

/***/ }),
/* 414 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(415),
  /* template */
  __webpack_require__(419),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Subscriptions/MySubscriptions.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 415 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AddSubscription__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AddSubscription___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__AddSubscription__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__includes_Model__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		appAddSubscription: __WEBPACK_IMPORTED_MODULE_0__AddSubscription___default.a
	},
	computed: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_2_vuex__["b" /* mapGetters */])({
		fetched: 'subscriptionsFetched',
		subscriptions: 'subscriptions'
	})),
	methods: {
		remove: function remove(id) {
			var _this = this;

			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]("subscriptions/" + id).delete().then(function (response) {
				var subscriptions = _this.subscriptions;
				subscriptions.forEach(function (sub, key) {
					if (id == sub.id) {
						subscriptions.splice(key, 1);
						return;
					}
				});
				_this.$store.commit('SET_SUBSCRIPTIONS', subscriptions);
				_this.$store.dispatch('showNotification', { type: 'success', msg: 'Prenumerationen är borttagen.' });
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
		var _this2 = this;

		if (!this.fetched) {
			new __WEBPACK_IMPORTED_MODULE_1__includes_Model__["a" /* default */]('subscriptions').get().then(function (response) {
				_this2.$store.commit('SET_SUBSCRIPTIONS_FETCHED', true);
				_this2.$store.commit('SET_SUBSCRIPTIONS', response.subscriptions);
			}).catch(function (error) {
				console.log(error);
			});
		}
	}
});

/***/ }),
/* 416 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(417),
  /* template */
  __webpack_require__(418),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/components/User/Subscriptions/AddSubscription.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 417 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__includes_classes_Form__ = __webpack_require__(5);
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




/* harmony default export */ __webpack_exports__["default"] = ({
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
				var subscriptions = _this.$store.getters.subscriptions;
				subscriptions.push(response.subscription);
				_this.$store.commit('SET_SUBSCRIPTIONS', subscriptions);
				_this.$store.dispatch('showNotification', {
					type: 'success',
					msg: 'Vi har lagt till din prenumeration. När en ny tjänst skapas som du prenumererar på kommer du att få ett email om tjänsten.'
				});
				_this.form.reset();
				_this.processing = false;
			}).catch(function (error) {
				_this.form.errors.record(error);
				_this.processing = false;
			});
		}
	}
});

/***/ }),
/* 418 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "add_subscription-component"
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
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.category_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
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
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.region_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
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
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.form.city_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
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
/* 419 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "my_subscriptions-component"
  }, [_c('section', {
    staticClass: "white-contentSection"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "gray-contentSection-content"
  }, [_c('app-add-subscription')], 1), _vm._v(" "), _c('div', {
    staticClass: "white-contentSection-content"
  }, [(_vm.fetched) ? [(_vm.subscriptions.length > 0) ? _c('ul', {
    staticClass: "items-list mtb20"
  }, _vm._l((_vm.subscriptions), function(subscription) {
    return _c('li', {
      staticClass: "white-item ptb10lr15"
    }, [_c('div', {
      staticClass: "item-content"
    }, [_c('div', {
      staticClass: "item-header",
      domProps: {
        "textContent": _vm._s(_vm.title(subscription))
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "item-go-to"
    }, [_c('i', {
      staticClass: "icon icon_delete wh15",
      on: {
        "click": function($event) {
          _vm.remove(subscription.id)
        }
      }
    })])])
  })) : _c('div', {
    staticClass: "alert alert-info"
  }, [_vm._v("Du har ännu inga prenumerationer. Skapa din första ovan.")])] : _c('app-loading')], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "white-contentSection-header"
  }, [_c('h3', [_vm._v("Prenumerationer")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5f7c3375", module.exports)
  }
}

/***/ }),
/* 420 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(421),
  /* template */
  __webpack_require__(422),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/margul/Code/Bidder/resources/assets/js/views/404.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 421 */
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

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 422 */
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
/* 423 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutation_types__ = __webpack_require__(8);
var _mutations;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = {
	settingsFetched: false,
	settings: []
};

var mutations = (_mutations = {}, _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["p" /* SET_USER_NOTIFICATION_SETTINGS_FETCHED */], function (state, fetched) {
	state.settingsFetched = fetched;
}), _defineProperty(_mutations, __WEBPACK_IMPORTED_MODULE_0__mutation_types__["o" /* SET_USER_NOTIFICATION_SETTINGS */], function (state, settings) {
	state.settings = settings;
}), _mutations);

var actions = {};

var getters = {
	userNotificationSettingsFetched: function userNotificationSettingsFetched(state) {
		return state.settingsFetched;
	},
	userNotificationSettings: function userNotificationSettings(state) {
		return state.settings;
	}
};

/* harmony default export */ __webpack_exports__["a"] = ({
	state: state,
	mutations: mutations,
	actions: actions,
	getters: getters
});

/***/ })
],[140]);