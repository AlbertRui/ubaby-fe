/*
 * @Author: Administrator
 * @Date:   2018-05-26 19:35:03
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-05-27 17:06:30
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _user = require('service/user-service.js');
var _ubaby = require('util/ubaby.js');
var templateIndex = require('./index.string');
//page逻辑部分
var page = {
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        //加载用户信息
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function() {
        var userHtml = '';
        _user.getUserInfo(function(res) {
            userHtml = _ubaby.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errorMsg) {
            _ubaby.errorTips(errorMsg);
        });
    }
};
$(function() {
    page.init();
});