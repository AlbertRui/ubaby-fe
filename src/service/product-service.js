/*
 * @Author: Administrator
 * @Date:   2018-05-27 15:56:56
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-05-27 22:06:45
 */
'use strict';

var _ubaby = require('util/ubaby.js');

var _product = {
    // 获取商品列表
    getProductList: function(listParam, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 获取商品详细信息
    getProductDetail: function(productId, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/product/detail.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    }
}
module.exports = _product;