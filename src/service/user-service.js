import _mm from 'utils/util.js';

var userService = {
    checkLogin: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    register: function (userInfo, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/register.do'),
            data: userInfo,
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 检查用户名是否存在
    checkUserName: function (username, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/check_valid.do'),
            data: {
                str: username,
                type: 'username'
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 登录
    login: function (username, password, resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/login.do'),
            data: {
                username: username,
                password: password
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    // 退出
    logout: function (resolve, reject) {
        _mm.request({
            url: _mm.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }

}

export default userService;
