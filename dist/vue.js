(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Vue = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],3:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],4:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],5:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],6:[function(require,module,exports){
function Compiler() {

}

module.exports = Compiler;
},{}],7:[function(require,module,exports){
exports.$get = function () {

};

exports.$set = function () {

};

exports.$watch = function () {

};

exports.$unwatch = function () {

};
},{}],8:[function(require,module,exports){
exports.$appendTo = function () {

};

exports.$prependTo = function () {

};

exports.$before = function () {

};

exports.$after = function () {

};

exports.$remove = function () {

};
},{}],9:[function(require,module,exports){
;['emit', 'on', 'off', 'once'].forEach(function (method) {
    exports[method] = function () {

    }
});

exports.$broadcast = function () {

};

exports.$dispatch = function () {

};
},{}],10:[function(require,module,exports){
exports.$mount = function () {

};

exports.$destroy = function () {

};
},{}],11:[function(require,module,exports){
/*
* common utils
* */

exports.mixin = function (target, mixin) {
    for (var key in mixin){
        if(mixin.hasOwnProperty(key)){
            if(target[key] !== mixin[key]) {
                target[key] = mixin[key]
            }
        }
    }
};

exports.nextTick = function () {

};
},{}],12:[function(require,module,exports){
/**
 * Created by chuck on 2016/9/18.
 */
var _        = require('./util'),
    Compiler = require('./compiler/compiler');

/*
* 暴露的vue构造函数
* The exposed Vue constructor.
* */
function Vue(options) {
    this._compiler = new Compiler(this, options);
}

// 合并实例方法
// mixin instance methods
var p = Vue.prototype;
_.mixin(p, require('./instance/lifecycle'));
_.mixin(p, require('./instance/data'));
_.mixin(p, require('./instance/dom'));
_.mixin(p, require('./instance/events'));

// 合并资产登记
// mixin asset registers
_.mixin(Vue, require('./api/asset-register'));

// 静态方法
// static methods
Vue.config   = require('./api/config');
Vue.use      = require('./api/use');
Vue.require  = require('./api/require');
Vue.extend   = require('./api/extend');
Vue.nextTick = require('./util').nextTick;

module.exports = Vue;


},{"./api/asset-register":1,"./api/config":2,"./api/extend":3,"./api/require":4,"./api/use":5,"./compiler/compiler":6,"./instance/data":7,"./instance/dom":8,"./instance/events":9,"./instance/lifecycle":10,"./util":11}]},{},[12])(12)
});