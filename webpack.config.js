/*eslint-env node */
/*https://github.com/chemdemo/chemdemo.github.io/issues/13*/
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var options = require('./webpack.base.js');
options.entry = './src';
// output项告诉webpack怎样存储输出结果以及存储到哪里
options.output = {
  library: 'VueInfiniteScroll',
  libraryTarget: 'umd',
  filename: 'vue-infinite-scroll.js',
  path: './dist'
};
options.externals = {
  vue: 'Vue'
};

module.exports = options;
