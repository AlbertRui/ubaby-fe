/*
* @Author: Administrator
* @Date:   2018-07-23 21:52:12
* @Last Modified by:   Administrator
* @Last Modified time: 2018-07-23 21:53:34
*/
'use strict';
require('./index.css');
var Hogan = require('hogan.js');
var templateDialog = require('./index.string');

var _dialog = {
    option: {
        isConfirm: false,
        message: ''
    },
    show: function (options) {
        this.option.isConfirm = options.isConfirm;
        this.option.message = options.message;
        this.$dialog = $(options.target);
        this.onConfirm = options.onConfirm;
        this.onCancel = options.onCancel;
        this.loadDialog();
        this.bindEvent();
    },
    loadDialog: function () {
        var _this = this;
        var dialogHtml = this.renderHtml(templateDialog, {
            isConfirm: this.option.isConfirm,
            message: _this.option.message
        });
        this.$dialog.append(dialogHtml);
        $('.ray-dialog-container').animate({
            width: '600px',
            margin: '150px auto',
            opacity: '1'
        }, 250, 'swing');
    },
    bindEvent: function () {
        var _this = this;
        //点击取消
        this.$dialog.find('.ray-dialog-cancel').click(function () {
            if (_this.onCancel) {
                typeof  _this.onCancel === 'function'
                && _this.onCancel();
            }
        });
        //点击确定
        this.$dialog.find('.ray-dialog-confirm').click(function () {
            if (_this.onConfirm) {
                typeof  _this.onConfirm === 'function'
                && _this.onConfirm();
            }
        });
        this.$dialog.find('.ray-dialog-container').click(function (e) {
            e.stopPropagation();
        });
        this.$dialog.find('.ray-close').click(function () {
            _this.hide();
        });
    },
    hide: function () {
        $('.ray-dialog-container').animate({
            width: '750px',
            margin: '100px auto',
            opacity: '0'
        }, 250, 'swing', function () {
            $('.ray-dialog').fadeOut(200, function () {
                $('div').remove('.ray-dialog');
            });
        });
    },
    //渲染HTML模板
    //使用Hogan，可以去细看
    renderHtml: function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result = template.render(data);
        return result;
    }
};
module.exports = _dialog;