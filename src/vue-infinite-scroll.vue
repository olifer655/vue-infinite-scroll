<script type="text/ecmascript-6">
  var throttle = function (fn, delay) {
    var now, lastExec, timer, context, args; //eslint-disable-line
    var execute = function () {
      fn.apply(context, args);
      lastExec = now;
    };

    return function () {
      context = this;
      args = arguments;

      now = Date.now();

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      if (lastExec) {
        var diff = delay - (now - lastExec);
        if (diff < 0) {
          execute();
        } else {
          timer = setTimeout(function () {
            execute();
          }, diff);
        }
      } else {
        execute();
      }
    };
  };

  var getScrollTop = function (element) {
    if (element === window) {
      return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
    }

    return element.scrollTop;
  };

  var getComputedStyle = document.defaultView.getComputedStyle;

  var getScrollEventTarget = function (element) {
    var currentNode = element;
    while (currentNode && currentNode.tagName !== 'HTML' && currentNode.nodeType === 1) {
      var overflowY = getComputedStyle(currentNode).overflowY;
      if (overflowY === 'scroll' || overflowY === 'auto') {
        return currentNode;
      }
      currentNode = currentNode.parentNode;
    }
    return window;
  };

  var getVisibleHeight = function (element) {
    if (element === window) {
      return document.documentElement.clientHeight;
    }

    return element.clientHeight;
  };

  var getElementTop = function (element) {
    if (element === window) {
      return getScrollTop(window);
    }
    return element.getBoundingClientRect().top + getScrollTop(window);
  };

  var isAttached = function (element) {
    var currentNode = element.parentNode;
    while (currentNode) {
      if (currentNode.tagName === 'HTML') {
        return true;
      }
      if (currentNode.nodeType === 11) {
        return false;
      }
      currentNode = currentNode.parentNode;
    }
    return false;
  };

  export default {

    data() {
      return {
        // 若为真，则无限滚动不会被触发
        disabled: this.el.getAttribute('infinite-scroll-disabled') || false,

        // 若为真，则指令被绑定到元素上后会立即检查是否需要执行加载方法。在初始状态下内容有可能撑不满容器时十分有用。
        immediateCheck: this.el.getAttribute('infinite-scroll-immediate-check') || true,

        // 一个 event，被执行时会立即检查是否需要执行加载方法。
        eventName: this.el.getAttribute('infinite-scroll-listen-for-event'),

        // 触发加载方法的滚动距离阈值（像素）
        distance: this.el.getAttribute('infinite-scroll-distance') || 0
      };
    },

    methods: {
      doBind: function () {
        if (this.binded) return; // eslint-disable-line
        this.binded = true;

        var directive = this;
        var element = directive.el;

        directive.scrollEventTarget = getScrollEventTarget(element);
        directive.scrollListener = throttle(directive.doCheck.bind(directive), 200);
        directive.scrollEventTarget.addEventListener('scroll', directive.scrollListener);

      },

      doCheck: function (force) {
        var scrollEventTarget = this.scrollEventTarget;
        var element = this.el;
        var distance = this.distance;

        if (force !== true && this.disabled) return; //eslint-disable-line
        var viewportScrollTop = getScrollTop(scrollEventTarget);
        var viewportBottom = viewportScrollTop + getVisibleHeight(scrollEventTarget);

        var shouldTrigger = false;

        if (scrollEventTarget === element) {
          shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
        } else {
          var elementBottom = getElementTop(element) - getElementTop(scrollEventTarget) + element.offsetHeight + viewportScrollTop;

          shouldTrigger = viewportBottom + distance >= elementBottom;
        }

        if (shouldTrigger && this.expression) {
          this.vm.$get(this.expression);
        }
      },

      bind: function () {
        var directive = this;
        var element = this.el;

        directive.vm.$on('hook:ready', function () {
          if (isAttached(element)) {
            directive.doBind();
          }
        });

        this.bindTryCount = 0;

        var tryBind = function () {
          if (directive.bindTryCount > 10) return; //eslint-disable-line
          directive.bindTryCount++;
          if (isAttached(element)) {
            directive.doBind();
          } else {
            setTimeout(tryBind, 50);
          }
        };

        tryBind();
      },

      unbind: function () {
        this.scrollEventTarget.removeEventListener('scroll', this.scrollListener);
      }
    },

    watch: {
      disabled(newValue) {

        this.disabled = newValue;
        if (!newValue && this.immediateCheck) {
          this.doCheck();
        }
      },
      eventName() {
        this.doCheck();
      },
      immediateCheck() {
        this.doCheck();
      },
      distance() {
        if (isNaN(this.distance)) {
          this.distance = 0;
        }
      }
    }

  };

</script>
