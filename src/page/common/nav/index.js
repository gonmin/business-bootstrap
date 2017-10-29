import './index.css';

import _mm from 'utils/util.js';

import userService from 'service/user-service.js';

var page = {
  init () {
    this.loadUser();
  },
  loadUser () {
    userService.checkLogin(function (data) {

    }, function(err) {

    })
  }
}

$(function () {
  page.init();

})
