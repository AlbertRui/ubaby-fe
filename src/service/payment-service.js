/*
* @Author: Administrator
* @Date:   2018-06-04 21:38:33
* @Last Modified by:   Administrator
* @Last Modified time: 2018-06-04 21:48:02
*/
'use strict';
var _ubaby = require('util/ubaby.js');

var _payment = {
    // 获取支付信息
    getPaymentInfo: function(orderNumber, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/order/pay.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
    //获取订单状态
    getPaymentStatus: function(orderNumber, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/order/query_order_pay_status.do'),
            data: {
                orderNo: orderNumber
            },
            success: resolve,
            error: reject
        });
    },
}
module.exports = _payment;