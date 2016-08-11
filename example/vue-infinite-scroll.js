var app = document.querySelector('.app');
import infiniteScroll from '../src';

if (window.Vue) {
  window.infiniteScroll = infiniteScroll;
  Vue.use(install);
}

function install(Vue) {
  Vue.directive('infiniteScroll', infiniteScroll);
}

new Vue({
  el: 'body',
  data: function () {
    return {
      busy: false
    }
  },
  methods: {
    loadMore: function () {
      var self = this;
      self.busy = true;
      console.log('loading... ' + new Date());
      setTimeout(function () {
        var height = app.clientHeight;

        app.style.height = height + 30 + 'px';
        app.innerHTML="ZHENG";
        console.log('end... ' + new Date());
        self.busy = false
      }, 1000)
    }
  },
  ready() {
    this.loadMore();
  }
})
