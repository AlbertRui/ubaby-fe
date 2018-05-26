/*
 * @Author: Administrator
 * @Date:   2018-05-26 16:42:26
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-05-26 19:33:00
 */
'user strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _ubaby = require('util/ubaby.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
    show: function(errorMsg) {
        $('.error-item').show().find('error-msg').text(errorMsg);
    },
    hide: function() {
        $('.error-item').hide().find('error-msg').text('');
    }
};

//page逻辑部分
var page = {
    data: {
        username: '',
        question: '',
        answer: '',
        token: ''
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadStepUsername();
    },
    bindEvent: function() {
        var _this = this;
        //下一步按钮的点击
        $('#submit-username').click(function() {
            var username = $.trim($('#username').val());
            if (username) { //用户名存在
                _user.getQuestion(username, function(res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errorMsg) {
                    formError.show(errorMsg);
                });
            } else { //用户名不存在
                formError.show('请输入用户名');
            }
        });
        //输入密码提示问题答案按钮的点击
        $('#submit-question').click(function() {
            var answer = $.trim($('#answer').val());
            //如果密码提示问题答案存在
            if (answer) { //检查密码提示问题答案
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res) {
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errorMsg) {
                    formError.show(errorMsg);
                });
            } else { //如果密码提示问题答案不存在
                formError.show('请输入密码提示问题的答案');
            }
        });
        //输入新密码按钮的点击
        $('#submit-password').click(function() {
            var password = $.trim($('#password').val());
            //如果密码不为空
            if (password && password.length >= 6) { //重置密码
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.token
                }, function(res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function(errorMsg) {
                    formError.show(errorMsg);
                });
            } else { //密码为空
                formError.show('请输入长度不小于6位的新密码');
            }
        });
    },
    //加载输入用户名的一步
    loadStepUsername: function() {
        $('.step-username').show();
    },
    //加载输入密码提示答案的一步
    loadStepQuestion: function() {
        //清除错误提示
        formError.hide();
        //做容器的切换
        $('.step-username').hide().siblings('.step-question').show().find('.question').text(this.data.question);
    },
    //加载输入password的一步
    loadStepPassword: function() {
        //清除错误提示
        formError.hide();
        //做容器的切换
        $('.step-question').hide().siblings('.step-password').show();
    }
};
$(function() {
    page.init();
});