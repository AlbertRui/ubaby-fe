/*
 * @Author: Administrator
 * @Date:   2018-06-02 22:15:03
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-06-04 23:19:11
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _ubaby = require('util/ubaby.js');
var _payment = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
    data: {
        orderNumber: _ubaby.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
    },
    onLoad: function() {
        this.loadPaymentInfo();
    },
    // 加载订单 数据
    loadPaymentInfo: function() {
        var _this = this,
            paymentHtml = '',
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(res) {
            //渲染html
            paymentHtml = _ubaby.renderHtml(templateIndex, res);
            $pageWrap.html(paymentHtml);
            //监听订单状态
            _this.listenOrderStatus();
        }, function(errMsg) {
            $pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    listenOrderStatus: function() {
        var _this = this;
        this.paymentTimer = window.setInterval(function() {
            _payment.getPaymentStatus(_this.orderNumber, function(res) {
                if (res == true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            }, function(errMsg) {

            });
        });
    }
};
$(function() {
    page.init();
});