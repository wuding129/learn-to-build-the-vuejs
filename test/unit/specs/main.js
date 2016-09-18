/**
 * Created by chuck on 2016/9/18.
 */
var vue = require('../../../src/vue');
console.log(vue.test());
describe('test', function () {
    it('should work', function () {
        expect(vue.test()).toEqual(123)
    })
});
