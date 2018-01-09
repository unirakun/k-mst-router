(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('mobx'), require('mobx-state-tree'), require('k-mst-purifier'), require('path-to-regexp')) :
	typeof define === 'function' && define.amd ? define(['mobx', 'mobx-state-tree', 'k-mst-purifier', 'path-to-regexp'], factory) :
	(global['k-mst-router'] = factory(null,global.mobxStateTree,global.decorate,global.pathToRegexp));
}(this, (function (mobx,mobxStateTree,decorate,pathToRegexp) { 'use strict';

decorate = decorate && decorate.hasOwnProperty('default') ? decorate['default'] : decorate;
pathToRegexp = pathToRegexp && pathToRegexp.hasOwnProperty('default') ? pathToRegexp['default'] : pathToRegexp;

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

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

/* eslint-disable no-param-reassign */
var afterCreate = function afterCreate(self) {
  return function () {
    self.init();
  };
};

var go = function go(self) {
  return function (screenName) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    // get screen reference from name
    var screen = self.screens.find(function (sc) {
      return sc.name === screenName;
    });

    // save to the store
    self.current = screen;
    self.params = params;

    // save to the navigator
    var toPath = pathToRegexp.compile(screen.path);
    window.history.pushState(null, screen.name, toPath(params));
  };
};

var init = function init(self) {
  return function () {
    var pathname = window.location.pathname;


    var found = false;

    var _loop = function _loop(i) {
      var screen = self.screens[i];
      var params = [];
      var match = pathToRegexp(screen.path, params, { sensitive: true }).exec(pathname);

      found = !!match;
      if (found) {
        self.go(screen.name, params.map(function (_ref, index) {
          var name = _ref.name;
          return defineProperty({}, name, match[index + 1]);
        }).reduce(function (acc, curr) {
          return _extends({}, acc, curr);
        }, {}));
      }
    };

    for (var i = 0; i < self.screens.length && !found; i += 1) {
      _loop(i);
    }
  };
};

var actions = decorate({
  afterCreate: afterCreate,
  go: go,
  init: init
});

var ScreenDefinition = mobxStateTree.types.model({
  name: mobxStateTree.types.identifier(mobxStateTree.types.string),
  path: mobxStateTree.types.string
}).named('ScreenDefinition');

var model = mobxStateTree.types.model({
  screens: mobxStateTree.types.array(ScreenDefinition),
  params: mobxStateTree.types.maybe(mobxStateTree.types.map(mobxStateTree.types.union(mobxStateTree.types.string, mobxStateTree.types.number))),
  current: mobxStateTree.types.maybe(mobxStateTree.types.reference(ScreenDefinition))
}).named('Router').actions(actions);
// Views:
//  get current (Screen)
// get params (current.params)

return model;

})));
//# sourceMappingURL=index.js.map
