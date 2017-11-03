import './index.css';

import _mm from 'utils/util.js';

import userService from 'service/user-service.js';

var page = {
  init () {
    this.loadUser();
    this.getKeyword();
    this.bindEvent();
  },
  // 把关键字回填到输入框中
  getKeyword () {
    let keyword = _mm.getUrlParam('keyword');
    if (keyword) {
        $('.search-input').val(keyword);
    }
  },

  loadUser () {
    userService.checkLogin(function (data) {
        $('.js-login').hide().siblings('.js-register').hide()
        .siblings('.username-item')
        .find('.username').text(data.username);
    }, function(err) {
        $('.js-login').show().siblings('.js-register').show()
        .siblings('.username-item').hide();
    })
  },
  bindEvent () {
    // 点击退出登录
    $('.js-logout').click(() => {
        console.log('biepai');
        userService.logout(data => {
            $('.js-login').show().siblings('.js-register').show()
            .siblings('.username-item').hide();
        }, errMsg => {
            alert(errMsg);
        })
    })

    // 点击登陆
    $('.js-login').click(() => {
        _mm.doLogin();
    })
    // 点击搜索
    $('.search-btn').click(() => {
        this.search();
    })

    // 按下回车搜索
    $('.search-input').keyup(e => {
        if (e.keyCode === 13) {
            this.search();
        }
    })
  },
  search () {
    let keyword = $('.search-input').val().trim();
    if (keyword) {
        window.location.href = './list.html?keyword=' + keyword;
    }
  }
}

$(function () {
  page.init();

})
