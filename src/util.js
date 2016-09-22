/*
* common utils
* */

//类似于prototype.js中的做法：
/*Object.extend = function(destination, source) {
    for (property in source) {
        destination[property] = source[property];
    }
    return destination;
}*/
/**
 * Mix properties into target object.
 *
 * @param {Object} target
 * @param {Object} mixin
 */
exports.mixin = function (target, mixin) {
    for (var key in mixin){
        if(mixin.hasOwnProperty(key)){
            if(target[key] !== mixin[key]) {
                target[key] = mixin[key]
            }
        }
    }
};

/**
* Object type check. Only returns true
* for plain JavaScript objects.
* @param {*} obj
* @return {Boolean}
*/

exports.isObject = function (obj) {
    //判断类型用Object.prototype.toString,此法能区别数组和对象
    return Object.prototype.toString.call(obj) === "[object Object]"
};

/*或者
function isObject(arg) {
    return arg !== null && typeof arg === 'object';
}
exports.isObject = isObject;
*/



// vue原来代码为
/*
exports.isArray = function (obj) {
    return Array.isArray(obj);
};*/

/**
* Array type check.
* ES5新增的数组方法Array.isArray，可以判断是否为数组，原来都是用Object.prototype.toString(obj) === "[object Array]"的真假来判断
* @param {*} obj
* @erturn {Boolean}
*
*/
exports.isArray = Array.isArray;

//如果isArray要做兼容ie9以下
/*
exports.isArray = function (obj) {
    if(!!Array.isArray){
        return Array.isArray(obj);
    } else {
        return Object.toString.call(obj) === "[object Array]"
    }
};
*/
