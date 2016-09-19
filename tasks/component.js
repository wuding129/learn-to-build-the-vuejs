/**
 * Created by chuck on 2016/9/19.
 */

module.exports = function (grunt) {
    grunt.registerTask('component', function () {
        //grunt.file是node中文件操作的封装，readJSON读取文件并按JSON格式解析
        var component = grunt.file.readJSON('component.json');
        component.scripts = [];
        //对src进行递归操作
        grunt.file.recurse('src', function (file) {
            component.scripts.push(file)
        });
        console.log(JSON.stringify(component, null, 2));
        grunt.file.write('component.json', JSON.stringify(component, null, 2))
    })
};