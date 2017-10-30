var conf = {
  serverHost: ''
}

// var hogan = require('hogan');

var _mm = {
  request: function (param) {
    var _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || ''

    }).done(function (res) {
      if (res.status === 0) {
        typeof param.success === 'function' && param.success(res.data, res.msg)
      } else if (res.status === 10) {
        // 没有登陆状态，需要强制登录
        _this.doLogin();
      }
      else if (res.status === 1) {
        typeof param.error === 'function' && param.error(res.msg)

      }
    }).fail(function (err) {
      typeof param.error === 'function' && param.error(err.statusText)
    })
  },
  // 渲染HTML模板
  renderHtml: function (htmlTemplate, data) {
    var template = hogan.compile(htmlTemplate);
      result = template.render(data);
    return result;

  },
  // 成功提示
  successTips: function (msg) {
    alert(msg || '操作成功');
  },
  // 错误提示
  errorTips: function (msg) {
    alert(msg || '哪里不对了');
  },
  // 字段的验证。支持非空，手机，邮箱判断
  validate: function (value, type) {
    value = $.trim(value);
    // 非空验证。
    if (type === 'require') {
      return value;
    }

    // 手机号验证
    if (type === 'phone') {
      return /1\d{10}$/.test(value);
    }
    // 邮箱验证
    if (type === 'email') {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }

  },
  // 获取服务器地址
  getServerUrl: function (path) {
    return conf.serverHost + path
  },
  getUrlParam: function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  // 统一登录处理
  doLogin: function () {
    window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
  },

  // 回到主页
  goHome: function () {
    window.location.href = './index.html';
  }
}

export default _mm;
