import './index.css';

import _mm from 'utils/util.js';

import userService from 'service/user-service.js';

var page = {
  init () {
    this.loadUser();
    this.bindEvent();
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
