/* eslint-disable */
// 不蒜子统计脚本注入器
//
// 历史：原默认端点为 //busuanzi.ibruce.info/busuanzi，但该官方服务自 2024 年起
// 频繁出现 502/不可达，影响大量 fork 站点的 PV/UV 显示。
// 社区维护的兼容实现 Vercount(https://github.com/EvanNotFound/vercount) 提供
// 自包含脚本 https://vercount.one/js，能够直接回填 busuanzi_value_* /
// vercount_value_* 两种 span，与现有 Footer / AnalyticsCard / ArticleInfo 等
// 渲染保持完全兼容，因此作为默认端点。
//
// 行为说明：
//   - URL 包含 "jsonpCallback=" 时，沿用原 JSONP 流程（兼容自托管不蒜子）
//   - 其他 URL（vercount.one/js 等自包含脚本），按普通 script 标签注入即可
//   - 可通过 NEXT_PUBLIC_BUSUANZI_SCRIPT_URL 自定义为任意端点
let bszCaller, bszTag, scriptTag, ready

let intervalId;
let executeCallbacks;
let onReady;
let isReady = false;
let callbacks = [];

const DEFAULT_BUSUANZI_URL = 'https://vercount.one/js'
const BUSUANZI_URL =
  (typeof process !== 'undefined' && process?.env?.NEXT_PUBLIC_BUSUANZI_SCRIPT_URL) ||
  DEFAULT_BUSUANZI_URL
const isJsonpStyle = /jsonpCallback=/.test(BUSUANZI_URL)

// 修复Node同构代码的问题
if (typeof document !== 'undefined') {
  ready = function (callback) {
    if (isReady || document.readyState === 'interactive' || document.readyState === 'complete') {
      callback.call(document);
    } else {
      callbacks.push(function () {
        return callback.call(this);
      });
    }
    return this;
  };

  executeCallbacks = function () {
    for (let i = 0, len = callbacks.length; i < len; i++) {
      callbacks[i].apply(document);
    }
    callbacks = [];
  };

  onReady = function () {
    if (!isReady) {
      isReady = true;
      executeCallbacks.call(window);
      if (document.removeEventListener) {
        document.removeEventListener('DOMContentLoaded', onReady, false);
      } else if (document.attachEvent) {
        document.detachEvent('onreadystatechange', onReady);
        if (window == window.top) {
          clearInterval(intervalId);
          intervalId = null;
        }
      }
    }
  };

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', onReady, false);
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function () {
      if (/loaded|complete/.test(document.readyState)) {
        onReady();
      }
    });
    if (window == window.top) {
      intervalId = setInterval(function () {
        try {
          if (!isReady) {
            document.documentElement.doScroll('left');
          }
        } catch (e) {
          return;
        }
        onReady();
      }, 5);
    }
  }
}

bszCaller = {
  fetch: function (url, callback) {
    const callbackName = 'BusuanziCallback_' + Math.floor(1099511627776 * Math.random())
    url = url.replace('=BusuanziCallback', '=' + callbackName)
    scriptTag = document.createElement('SCRIPT');
    scriptTag.type = 'text/javascript';
    scriptTag.defer = true;
    scriptTag.src = url;
    scriptTag.referrerPolicy = 'no-referrer-when-downgrade';
    document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
    window[callbackName] = this.evalCall(callback)
  },
  evalCall: function (callback) {
    return function (data) {
      ready(function () {
        try {
          callback(data);
          if (scriptTag && scriptTag.parentElement && scriptTag.parentElement.contains(scriptTag)) {
            scriptTag.parentElement.removeChild(scriptTag);
          }
        } catch (e) {
          // console.log(e);
          // bszTag.hides();
        }
      })
    }
  }
}

const removeCurrentScript = () => {
  if (scriptTag && scriptTag.parentElement && scriptTag.parentElement.contains(scriptTag)) {
    scriptTag.parentElement.removeChild(scriptTag);
  }
  scriptTag = null;
}

const fetch = () => {
  // 路由切换/主题切换时清掉旧脚本，避免同一 URL 被并发请求导致计数翻倍
  removeCurrentScript();

  if (isJsonpStyle) {
    // 官方不蒜子 JSONP 协议：脚本回填后由回调更新 DOM
    bszCaller.fetch(BUSUANZI_URL, function (data) {
      // console.log('不蒜子', data)
      bszTag.texts(data);
      bszTag.shows();
    });
    return;
  }

  // 自包含脚本（如 vercount.one/js）：自己回填 busuanzi_value_* span
  scriptTag = document.createElement('SCRIPT');
  scriptTag.type = 'text/javascript';
  scriptTag.async = true;
  scriptTag.referrerPolicy = 'no-referrer-when-downgrade';
  const sep = BUSUANZI_URL.includes('?') ? '&' : '?';
  // 防止浏览器/中间层缓存命中导致计数增量漏算
  scriptTag.src = `${BUSUANZI_URL}${sep}t=${Date.now()}`;
  document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
  // 自包含脚本通常只回填 value 数字，不负责显示容器；这里统一让容器可见
  bszTag.shows();
}

bszTag = {
  bszs: ['site_pv', 'page_pv', 'site_uv'],
  texts: function (data) {
    this.bszs.map(function (key) {
      const elements = document.getElementsByClassName('busuanzi_value_' + key)
      if (elements) {
        for (var element of elements) {
          element.innerHTML = data[key];
        }
      }
    })
  },
  hides: function () {
    this.bszs.map(function (key) {
      const elements = document.getElementsByClassName('busuanzi_container_' + key)
      if (elements) {
        for (var element of elements) {
          element.style.display = 'none';
        }
      }
    })
  },
  shows: function () {
    this.bszs.map(function (key) {
      const elements = document.getElementsByClassName('busuanzi_container_' + key)
      if (elements) {
        for (var element of elements) {
          element.style.display = 'inline';
        }
      }
    })
  }
}

module.exports = {
  fetch
}
