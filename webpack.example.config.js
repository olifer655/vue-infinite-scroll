var options = require('./webpack.base.js');

// entry 引入的是一个入口文件，值可以是字符串、数组和对象 或者混合类型，编译后的 build 文件就是这个文件的版本
options.entry = './example/vue-infinite-scroll.js';
options.output = {
  filename: 'build.js',
  publicPath: '/',      // npm run dev 后会在开发环境下，会自动生成一个 build.js 文件， publicPath表示其路径
};

console.log(JSON.stringify(options));

module.exports = options;
