Object.create(null)

var o;

// 创建一个原型为null的空对象
o = Object.create(null);


o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);


o = Object.create(Object.prototype, {
  // foo会成为所创建对象的数据属性
  foo: { writable:true, configurable:true, value: "hello" },
  // bar会成为所创建对象的访问器属性
  bar: {
    configurable: false,
    get: function() { return 10 },
    set: function(value) { console.log("Setting `o.bar` to", value) }
}})


function Constructor(){}
o = new Constructor();
// 上面的一句就相当于:
o = Object.create(Constructor.prototype);
// 当然,如果在Constructor函数中有一些初始化代码,Object.create不能执行那些代码


// 创建一个以另一个空对象为原型,且拥有一个属性p的对象
o = Object.create({}, { p: { value: 42 } })

// 省略了的属性特性默认为false,所以属性p是不可写,不可枚举,不可配置的:
o.p = 24
o.p
//42

o.q = 12
for (var prop in o) {
   console.log(prop)
}
//"q"

delete o.p
//false

//创建一个可写的,可枚举的,可配置的属性p
o2 = Object.create({}, { p: { value: 42, writable: true, enumerable: true, configurable: true } });

对于不支持es5的浏览器做的兼容方法：

if (typeof Object.create != 'function') {
  // Production steps of ECMA-262, Edition 5, 15.2.3.5
  // Reference: http://es5.github.io/#x15.2.3.5
  Object.create = (function() {
    //为了节省内存，使用一个共享的构造器
    function Temp() {}
    // 使用 Object.prototype.hasOwnProperty 更安全的引用 
    var hasOwn = Object.prototype.hasOwnProperty;
    return function (O) {
      // 1. 如果 O 不是 Object 或 null，抛出一个 TypeError 异常。
      if (typeof O != 'object') {
        throw TypeError('Object prototype may only be an Object or null');
      }
      // 2. 使创建的一个新的对象为 obj ，就和通过
      //    new Object() 表达式创建一个新对象一样，
      //    Object是标准内置的构造器名
      // 3. 设置 obj 的内部属性 [[Prototype]] 为 O。
      Temp.prototype = O;
      var obj = new Temp();
      Temp.prototype = null; // 不要保持一个 O 的杂散引用（a stray reference）...
      // 4. 如果存在参数 Properties ，而不是 undefined ，
      //    那么就把参数的自身属性添加到 obj 上，就像调用
      //    携带obj ，Properties两个参数的标准内置函数
      //    Object.defineProperties() 一样。
      if (arguments.length > 1) {
        // Object.defineProperties does ToObject on its first argument.
        var Properties = Object(arguments[1]);
        for (var prop in Properties) {
          if (hasOwn.call(Properties, prop)) {
            obj[prop] = Properties[prop];
          }
        }
      }
      // 5. 返回 obj
      return obj;
    };
  })();
}

参考：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create

遗留待补充知识：
1. js各种继承方式，es3/es5/es6