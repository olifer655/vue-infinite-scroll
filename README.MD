# vue-infinite-scroll

vue-infinite-scroll is an infinite scroll directive for vue.js.

# Install

```Bash
npm install vue-infinite-scroll --save
```

### CommonJS

You can use any build tool which supports `commonjs`:

```JavaScript
// register globally
var infiniteScroll =  require('vue-infinite-scroll');
Vue.use(infiniteScroll)

// or for a single instance
var infiniteScroll = require('vue-infinite-scroll').infiniteScroll;
new Vue({
  directives: {infiniteScroll}
})

```

### Direct include

You can use the CDN: https://npmcdn.com/vue-infinite-scroll, `infiniteScroll` is exposed to `window` and will automatically install itself. Also you can use your local copy:

```HTML
<script src="../node_modules/vue-infinite-scroll/vue-infinite-scroll.js"></script>
```

## Usage

为 HTML 元素添加 v-infinite-scroll 指令即可使用无限滚动。滚动该元素，当其底部与被滚动元素底部的距离小于给定的阈值（通过 infinite-scroll-distance 设置）时，绑定到 v-infinite-scroll 指令的方法就会被触发。

```HTML
<div v-infinite-scroll="loadMore()" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
  ...
</div>
```

```JavaScript
var count = 0;

new Vue({
  el: '#app',
  data: {
    data: [],
    busy: false
  },
  methods: {
    loadMore: function() {
      this.busy = true;

      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({ name: count++ });
        }
        this.busy = false;
      }, 1000);
    }
  }
});
```

# Options

| Option | Description |
| ----- | ----- |
| infinite-scroll-disabled | 若为真，则无限滚动不会被触发. |
| infinite-scroll-distance | 触发加载方法的滚动距离阈值（像素） |
| infinite-scroll-immediate-check | 若为真，则指令被绑定到元素上后会立即检查是否需要执行加载方法。在初始状态下内容有可能撑不满容器时十分有用。|
| infinite-scroll-listen-for-event | 一个 event，被执行时会立即检查是否需要执行加载方法 |

## Development

|Command|Description|
|---|---|
|npm run build|Build in umd format|
|npm test|Lint code|

# License

MIT
