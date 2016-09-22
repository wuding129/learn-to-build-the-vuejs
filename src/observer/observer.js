var _ = require('../util');
var Emitter = require('../emitter');

/**
 * Observer class that are attached to each observed
 * object. They are essentially event emitters, but can
 * connect to each other and relay the events up the nested
 * object chain.
 * 观察者类连接到每个观察到的对象。
 * 它们本质上是事件发射器，但可以连接到彼此，并将事件转发到嵌套的对象链中。
 *
 * 摘自mdn：
 *
 * 创建一个原型为null的空对象
 * o = Object.create(null);
 * o = {};
 * 以字面量方式创建的空对象就相当于:
 * o = Object.create(Object.prototype);
 *
 * o = Object.create(Object.prototype, {
 * foo会成为所创建对象的数据属性
 * foo: { writable:true, configurable:true, value: "hello" },
 * bar会成为所创建对象的访问器属性
 * bar: {
 *  configurable: false,
 *  get: function() { return 10 },
 *  set: function(value) { console.log("Setting `o.bar` to", value) }
 * }})
 *
 *
 * function Constructor(){}
 * o = new Constructor();
 * 上面的一句就相当于:
 * o = Object.create(Constructor.prototype);
 * 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码
 *
 *
 * 创建一个以另一个空对象为原型,且拥有一个属性p的对象
 * o = Object.create({}, { p: { value: 42 } })
 *
 * 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
 * o.p = 24
 * o.p
 * 42
 *
 * o.q = 12
 * for (var prop in o) {
 *   console.log(prop)
 * }
 * "q"
 *
 * delete o.p
 * false
 *
 * 创建一个可写的,可枚举的,可配置的属性p
 * o2 = Object.create({}, { p: { value: 42, writable: true, enumerable: true, configurable: true } });
 *
 *
 *
 * Object.create(null)可以创建纯粹的空白对象,不继承Object的属性，通常{}创建的对象如同Object.create(Object.prototype)创建的对象
 *
 * @constructor
 * @extends Emitter
 * @private
 * */
function Observer () {

    // 继承父类的基本属性和引用属性
    Emitter.call(this);


    this.connections = Object.create(null)
}
/**
 *
 * 继承EventEmiter  ES5

    var EventEmitter = require("events").EventEmitter;

    function MyClass() {
        EventEmitter.call(this);
    }

     MyClass.prototype = Object.create(EventEmitter.prototype);

     MyClass.prototype.doSomething = function(data) {
        this.emit("doSomething", data);
    }
 *  ES6

     var EventEmitter = require("events").EventEmitter;
     class MyClass extends EventEmitter
     {
         constructor(){
             super();
         }

         doSomething(data){
             this.emit("doSomething", data);
         }
     }
 *
 * 继承这里现在比较晕，后面慢慢补，
 * 待补知识：
 * 1、new和Object.create的异同
 * 2、各种继承方式的实现及优缺点
 *
 */
var p = Observer.prototype = Object.create(Emitter.prototype);

/**
 *
 * @param obj
 * @return {boolean} 观察成功返回true
 */
p.observe = function (obj) {
    if (obj && obj.$observer) {
        // already observed
        return
    }
    if (_.isArray(obj)) {
        this.observeArray(obj);
        return true
    }
    if (_.isObject(obj)) {
        this.observeObject(obj);
        return true
    }
};

/**
 * Connect to another Observer instance,
 * capture its get/set/mutate(变化、变异) events and relay(传递) the events
 * while prepending(前面加上) a key segment(字段) to the path.
 *
 * @param target {Observer}
 * @param key {string}
 */
p.connect = function (target, key) {

};

/**
 * 断开连接的观察者
 * @param target {Observer}
 * @param key {string}
 */
p.disconnect = function (target, key) {

};

/**
 * 合并数组、对象的观察方法
 */
_.mixin(p, require('./array'));
_.mixin(p, require('./object'));

module.exports = Observer;