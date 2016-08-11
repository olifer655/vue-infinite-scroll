/*eslint-env node */
module.exports = {
  // 你可以使用babel-loader来将使用ES6语法写成的文件转换成ES5
  module: {
    loaders: [
      { test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/, //  匹配.js文件，如果通过则使用下面的loader
        loader: 'babel', // 使用babel（babel-loader的简写）作为loader
        exclude: /node_modules/  //一定记得要写上哦，否则会编译其中的内容的啊 
      }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  }
};
