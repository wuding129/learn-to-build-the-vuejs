
1. travis持续集成工具:添加.travis.yml配置文件
- 参考：
http://www.2cto.com/kf/201411/356826.html

2. grunt文件修改
- 参考：
  - JSON.stringify()详细解读：
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
  - grunt.file操作：
  http://www.gruntjs.net/api/grunt.file
  - grunt.file.recurse 递归读写
  
3. 读取component.json，执行grunt component将src下的所有文件写入component.json文件

4. 添加.npmignore,添加不需要打包的文件列表

5. 其他就是原作者添加的各种文档如CONTRIBUTION.md、LICENSE、readme.md、
bower.json、component.json列表，并且更新了版本由0.10.5到0.11.0