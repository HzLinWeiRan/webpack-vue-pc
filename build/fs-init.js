var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');
var beautify = require('js-beautify').js_beautify;
//fs.readFileSync('../src/')

var remain = process.argv.slice(2);

// 文件删除方法
deleteFolderRecursive = function (path) {
  var files = [];
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function (file, index) {
      var curPath = path + "/" + file;
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);

  }

};

// 字符串正则替换
/* function replaceStr(str, data) {
  Object.keys(data).forEach(function (item) {
    var reg = new RegExp("\\$\\{\\s*" + item + "\\s*\\}", "g");
    str = str.replace(reg, data[item]);
  });
  return str;
} */

// 名字转化方法
function parseName(fileName) {
  var names = fileName.split('-');
  var resultName = "";
  names.forEach(function (item, i) {
    if (i != 0) {
      item = item.charAt(0).toUpperCase() + item.substr(1);
    }
    resultName += item;
  });
  return resultName;
}

// 初始化类型校验
if (remain[0] === "page" || remain[0] === "component") {
  // 参数校验
  if (!remain[1]) {
    console.error("传入参数不正确!");
    return;
  }

  // 参数转化
  var data = {
    name: remain[1],
    fileName: parseName(remain[1])
  }

  var pagePath = path.resolve(__dirname, remain[0] === "page" ? "../src/pages" : "../src/components");
  var pageDir = path.resolve(pagePath, data.fileName);

  // 文件校验
  if (fs.existsSync(pageDir)) {
    console.warn("该文件已存在!");
    // deleteFolderRecursive(pageDir); //方便测试
    return;
  }
  var result = fs.mkdirSync(pageDir);
  // 创建vue文件
  var vueFile = fs.readFileSync(path.resolve(__dirname, './tempJs/index.vue'));
  var vueTemplate = handlebars.compile(vueFile.toString());
  fs.writeFileSync(path.resolve(pageDir, remain[1] + ".vue"), vueTemplate(data), { encoding: 'utf-8', mode: 438, flag: 'w' });

  // 创建js文件
  var jsFile = fs.readFileSync(path.resolve(__dirname, './tempJs/index.js'));
  var jsTemplate = handlebars.compile(jsFile.toString());
  fs.writeFileSync(path.resolve(pageDir, "index.js"), jsTemplate(data), { encoding: 'utf-8', mode: 438, flag: 'w' });

  // 创建less文件
  var lessFile = fs.readFileSync(path.resolve(__dirname, './tempJs/index.less'));
  var lessTemplate = handlebars.compile(lessFile.toString());
  fs.writeFileSync(path.resolve(pageDir, remain[1] + ".less"), lessTemplate(data), { encoding: 'utf-8', mode: 438, flag: 'w' });

  // 新建模块为页面时，在路由文件中添加配置
  if (remain[0] === "page") {
    var routePath = path.resolve(__dirname, '../src/routes.js');
    var routes = require(routePath);
    routes.push({
      path: data.fileName ,
      name: data.fileName,
      component: eval('(resolve => \
          require([\'./pages/' + data.fileName + '\'], resolve)\
      )')
    });

    var routeWriteStr = "module.exports=";

    // 改变文件路由
    function parseRoutes(item) {
      var isArray = item instanceof Array;
      !isArray && (routeWriteStr += "{");
      isArray && (routeWriteStr += "[");
      const keys = Object.keys(item)
      keys.forEach(function (it, j) {
        !isArray && (routeWriteStr += it + ":")
        if (typeof item[it] === "object") {
          parseRoutes(item[it]);
        } else if (typeof item[it] === "function") {
          routeWriteStr += item[it];
        } else {
          routeWriteStr += "'" + item[it] + "'";
        }
        if (j !== keys.length - 1) {
          routeWriteStr += ","
        }
      });

      
      !isArray && (routeWriteStr += "}")
      isArray && (routeWriteStr += "]")

    }
    parseRoutes(routes);
    routeWriteStr = beautify(routeWriteStr, { indent_size: 4 })
    //fs.rmdirSync(routePath);
    fs.writeFileSync(routePath, routeWriteStr);
  }
}