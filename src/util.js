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