import './index.css';

import _mm from 'utils/util';

import userService from 'service/user-service.js';

var register = {
    init () {
        this.bindEvent();
    },
    bindEvent () {
        $('.submit-btn').click(() => {
            let result = this.checkForm();
            if (result.status) {
                let userInfo = {
                    username: $('#userName').val(),
                    password: $('#password').val(),
                    email: $('#email').val(),
                    phone: $('#password').val(),
                    question: $('#question').val(),
                    answer: $('#answer').val()
                }
                userService.register(userInfo, data => {
                    window.location.href = './result.html?type=register';
                }, errMsg => {
                   $('.form-err-tips').css('visibility', 'visible').text(errMsg);
                })
            } else {
               $('.form-err-tips').css('visibility', 'visible').text(result.msg);
           }
        })

        $('input').focus(() => {
            $('.form-err-tips').css('visibility', 'hidden');
        })

        // 用户名的输入框
        $('#userName').blur(() => {
            let username = $('#userName').val();
            if (username) {
                userService.checkUserName(username, data => {

                }, errMsg => {
                   $('.form-err-tips').css('visibility', 'visible').text('用户名已存在，请前去登录');

                })
            }
        })

    },
    checkForm () {
        var result = {
            status: false
        }

        console.log(_mm.validate($('#userName').val()));
        console.log(_mm.validate('kkk'));

        if (!_mm.validate($('#userName').val())) {
            result.msg = '请输入用户名再进行提交';
            return result;
        }

        if (!_mm.validate($('#password').val())) {
            result.msg = '请输入密码再进行提交';
            return result;
        }

        if ($('#password').val().length < 6) {
            result.msg = '密码长度过于简单';
            return result;
        }

        if ($('#password').val().trim() !== $('#comfirmPassword').val().trim()) {
            result.msg = '两次输入的长度不相等';
            return result;
        }

        if (!_mm.validate($('#phone').val(), 'phone')) {
            result.msg = '手机号码格式不对';
            return result;
        }
        if (!_mm.validate($('#email').val(), 'email')) {
            result.msg = '邮箱格式不对';
            return result;
        }
        if (!_mm.validate($('#question').val())) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_mm.validate($('#answer').val())) {
            result.msg = '密码提示问题的答案不能为空';
            return result;
        }
        result.status = true;


        return result;
    }
}
register.init();
