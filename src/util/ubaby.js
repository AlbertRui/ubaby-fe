/*
 * @Author: Administrator
 * @Date:   2018-05-22 22:56:44
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-07-20 21:19:21
 */
'use strict';
var Hogan = require('hogan.js');
var conf = {
    serverHost: ''
};
var _ubaby = {
    //网络请求
    request: function(param) {
        var _this = this;
        $.ajax({
            type: param.method || 'get',
            url: param.url || '',
            dataType: param.type || 'json',
            data: param.data || '',
            success: function(res) {
                //请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                } else if (10 === res.status) {
                    //需要强制登录
                    _this.doLogin();
                } else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器url
    getServerUrl: function(path) {
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染html模板
    renderHtml: function(htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    },
    //loading动画
    showLoading: function(target) {
        if (target instanceof jQuery) {
            target.html('<div class="loading"></div>');
        } else {
            $(target).html('<div class="loading"></div>');
        }
    },
    //显示错误提示信息
    showErrorMessage: function(target, errMsg) {
        if (target instanceof jQuery) {
            target.html('<p class="err-tip">' + errMsg + '</p>');
        } else {
            $(target).html('<p class="err-tip">' + errMsg + '</p>');
        }
    },
    //成功提示
    successTips: function(msg) {
        alert(msg || '操作成功！');
    },
    //错误提示
    errorTips: function(msg) {
        alert(msg || '哪里不对了');
    },
    //字段的验证,支持是否为空，支持非空判断，手机邮箱
    validate: function(value, type) {
        var value = $.trim(value);
        //非空验证
        if ('require' === type) {
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        if ('email' === type) {
            return  /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin: function() {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    //返回主页
    goHome: function() {
        window.location.href = './index.html';
    }
};
module.exports = _ubaby;