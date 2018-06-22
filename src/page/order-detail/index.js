/*
 * @Author: Administrator
 * @Date:   2018-06-01 18:30:47
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-06-22 23:55:04
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _order = require('service/order-service.js');
var _ubaby = require('util/ubaby.js');
var templateIndex = require('./index.string');

//page逻辑部分
var page = {
    data: {
        orderNumber: _ubaby.getUrlParam('orderNumber')
    },
    init: function() {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        //初始化左侧菜单栏
        navSide.init({
            name: 'order-list'
        });
        this.loadDetail();
    },
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.order-cancel', function() {
            if (window.confirm('确定要删除该订单嘛')) {
                _order.cancelOrder(_this.data.orderNumber, function(res) {
                    _ubaby.successTips('该订单取消成功');
                    _this.loadDetail();
                }, function(errMsg) {
                    _ubaby.errorTips(errMsg);
                });
            }
        });
    },
    //家在订单列表
    loadDetail: function() {
        var _this = this,
            orderDetailHtml = '',
            $content = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function(res) {
            _this.dataFilter(res);
            //渲染HTML
            orderDetailHtml = _ubaby.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function(errMsg) {
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    //数据的适配
    dataFilter: function(data) {
        data.needPay = data.status == 10;
        data.isCancelable = data.status == 10;
    }
};
$(function() {
    page.init();
});