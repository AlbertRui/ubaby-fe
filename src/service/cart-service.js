/*
 * @Author: Administrator
 * @Date:   2018-05-26 15:21:51
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-07-23 22:13:46
 */

'use strict';

var _ubaby = require('util/ubaby.js');

var _cart = {
    // 获取购物车数量
    getCartCount: function(resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        });
    },
    // 添加到购物车
    addToCart: function(productInfo, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    // 获取购物车列表
    getCartList: function(resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    // 选择购物车商品
    selectProduct: function(productId, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/cart/select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 取消选择购物车商品
    unselectProduct: function(productId, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/cart/un_select.do'),
            data: {
                productId: productId
            },
            success: resolve,
            error: reject
        });
    },
    // 选中全部商品
    selectAllProduct: function(resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 取消选中全部商品
    unselectAllProduct: function(resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 更新购物车商品数量
    updateProduct: function(productInfo, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    // 删除指定商品
    deleteCartProduct: function(productIds, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/cart/delete.do'),
            data: {
                productIds: productIds
            },
            success: resolve,
            error: reject
        });
    },
}
module.exports = _cart;