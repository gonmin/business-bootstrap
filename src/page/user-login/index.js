import './index.css';

import _mm from 'utils/util';

import userService from 'service/user-service.js';

$(() => {
    var login = {
        init () {
            this.bindEvent();
        },
        bindEvent () {

            $('.submit-btn').click(() => {
                let username = $('#userName').val();
                let password = $('#password').val();

                if (!username) {
                    $('.err-tips').show().text('用户名不能为空');
                    return;
                }

                if (!password) {
                    $('.err-tips').show().text('密码不能为空');
                    return;
                }

                userService.login(username, password, data => {
                    window.location.href = _mm.getUrlParam('redirect') || './index.html';
                }, errMsg => {
                    $('.err-tips').show().text(errMsg);

                })
            })

            // 表单获得焦掉时隐藏错误信息
            $('input').focus(() => {
                $('.err-tips').hide()
            })


        }
    }

    login.init();
})



