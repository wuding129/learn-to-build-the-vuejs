/**
 * Created by chuck on 2016/9/18.
 */
var _        = require('./util'),
    Compiler = require('./compiler/compiler');

/**
 * 暴露的vue构造函数
 * The exposed Vue constructor.
 *
 * @constructor
 * @public
 */
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

