/*
 * @Author: Administrator
 * @Date:   2018-05-29 20:04:50
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-05-30 23:23:11
 */
'use strict';

var _ubaby = require('util/ubaby.js');

var _address = {
    //获取地址列表
    getAddressList: function(resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/shipping/list.do'),
            data: {
                pageSize: 50
            },
            success: resolve,
            error: reject
        });
    },
    //新建收件人
    save: function(addressInfo, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //更新收件人
    update: function(addressInfo, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    //删除地址
    deleteAddress: function(shippingId, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/shipping/delete.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    },
    //获取单条地址信息
    getAddress: function(shippingId, resolve, reject) {
        _ubaby.request({
            url: _ubaby.getServerUrl('/shipping/select.do'),
            data: {
                shippingId: shippingId
            },
            success: resolve,
            error: reject
        });
    }
};
module.exports = _address;