/*
* @constructor
* @param {Object} ctx - the context to call listners with.
* (对象上下文)
* */

function Emitter (ctx) {
    this._ctx = ctx || this;
}

var p = Emitter.prototype;

/*
* Listen on the given `event` with `fn`.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* */

p.on = function (event, fn) {
    this._cbs = this._cbs || {}
    ;(this._cbs[event] = this._cbs[event] || []).push(fn)

};

/*
* Adds an `event` listener that will be invoked a single
* time then automatically removed.
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* */

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

/*
* Remove the given callback for `event` or all
* registered callbacks.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* */
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
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
        cb = callbacks[i];
        if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
        }
    }
    return this;

};