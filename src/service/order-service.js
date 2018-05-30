/*
 * @Author: Administrator
 * @Date:   2018-05-28 20:54:57
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-05-29 20:55:44
 */
'use strict';

var _ubaby = require('util/ubaby.js');

var _order = {
    // 获取商品列表
    getProductList: function(resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        });
    },
    //提交订单
    createOrder: function(orderInfo, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/order/create.do'),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    }
}
module.exports = _order;