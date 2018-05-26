/*
 * @Author: Administrator
 * @Date:   2018-05-21 17:42:58
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-05-26 15:45:40
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
    init: function() {
        thid.bindEvent();
    },
    bindEvent: function() {
        var _this = this;
        //登录按钮的点击
        $('#submit').click(function() {
            _this.submit();
        });
        //如果按下回车，也进行提交
        $('user-content').keyup(function(e) {
            //keyCode为13表示回车键
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    //提交表单
    submit: function() {
        var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val())
            },
            //表单验证结果
            validateResult = this.formValidate(formData);
        //验证成功
        if (validateResult.status) {
            _user.login(formData, function(res) {
                window.location.href = _ubaby.getUrlParam('redirect') || './index.html';
            }, function(errorMsg) {
                formError.show(errorMsg);
            });
        } else { //验证失败，错误提示
            formError.show(validateResult.msg);
        }
    },
    //表单字段验证
    formValidate: function(formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_ubaby.validate(fromData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_ubaby.validate(fromData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function() {
    page.init();
});