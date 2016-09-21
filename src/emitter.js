/**
 * @constructor
 * @param {Object} ctx - the context to call listners with.
 * (对象上下文)
 * */
function Emitter (ctx) {
    this._ctx = ctx || this;
}

var p = Emitter.prototype;

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 */
p.on = function (event, fn) {
    this._cbs = this._cbs || {}
    ;(this._cbs[event] = this._cbs[event] || []).push(fn)

};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 */
p.once = function (event, fn) {
    var self = this;
    this._cbs = this._cbs || {};

    function on() {
        self.off(event, on);
        fn.apply(this, arguments);
    }

    on.fn = fn;
    this.on(event, on);
    return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 */
p.off = function (event, fn) {
    // _cbs：callbacks,事件对象，其属性为事件名称及所拥有的回调方法
    this._cbs = this._cbs || {};

    // all
    if (!arguments.length) {
        this._cbs = {};
        return this;
    }

    // specific event 指定事件
    // 如果某个事件不存在，返回
    var callbacks = this._cbs[event];
    if (!callbacks) return this;

    // remove all handlers
    // 移除某事件的所有fn，（移除其方法数组）
    if (arguments.length === 1) {
        //删除事件，即移除事件其对应的方法数组
        delete this._cbs[event]
    }

    // remove specific handlers
    // 如果参数有event、fn，移除指定的fn
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        //???cb.fn === fn不解
        if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
        }
    }
    return this;

};


/**
 * 直接内部传递除event外的参数a、b、c，call()方法接受的是若干个参数的列表，有参数列表用call
 * The internal, faster emit with fixed amount of arguments
 * using Function.call
 *
 * @param event {object}
 * @param a
 * @param b
 * @param c
 * @return {Emitter}
 */
p.emit = function (event, a, b, c) {
    this._cbs = this._cbs || {};
    var callbacks = this._cbs[event];

    if (callbacks) {
        // Array.prototype.slice(),不会修改原数组，而是返回一个修改后的新数组，故此处相当于新建一个数组实例，而不是原数组的引用，两个数组并不相等。注：字符串String.prototype.slice()，也有同样用法;slice与splice的区别是前者不修改原数组，会返回新数组，后者会修改原数组，返回删除元素的数组
        /*
        var a=[1,2,3];var b=a;a==b
        ===> true
        b
        ===> [1, 2, 3]
        a
        ===> [1, 2, 3]
        a=[1,2,3];b=a.slice(0);a==b
        ===> false
        a
        ===> [1, 2, 3]
        b
        ===> [1, 2, 3]
        a==b
        ===> false
        */
        callbacks = callbacks.slice(0);
        for (var i = 0, len = callbacks.length; i < len; i++){
            callbacks[i].call(this._cbs, a, b, c);
        }
    }

    return this
};

/**
  *  不向上面那个方法指定参数a、b、c,可任意，apply()方法接受的是一个包含多个参数的数组，无参数列表用apply
  * The external emit using Function.apply, used
  * by Vue instance event methods.
  *
  * @param {Object} event
  *
  */
p.applyEmit = function (event) {
    this._cbs = this._cbs || {};
    var callbacks = this._cbs[event], args;

    if (callbacks) {
        callbacks = callbacks.slice(0);
        // event以外的所有参数处理成数组args
        args = callbacks.slice.call(arguments, 1);
        for (var i = 0, len = callbacks.length; i < len; i++){
            callbacks[i].apply(this._cbs, args)
        }
    }

    return this;
};

module.exports = Emitter;