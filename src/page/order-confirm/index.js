/*
 * @Author: Administrator
 * @Date:   2018-05-28 20:44:45
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-07-24 21:18:05
 */
'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _ubaby = require('util/ubaby.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');
var addressModal = require('./address-modal.js');

var page = {
    data: {
        selectedAddressId: null
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent: function () {
        var _this = this;
        //选择收货地址
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            // 复制选中地址id
            _this.data.selectedAddressId = $(this).data('id');
        });

        //提交订单
        $(document).on('click', '.order-submit', function () {
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId: shippingId
                }, function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function (errMsg) {
                    _ubaby.errorTips(errMsg);
                });
            } else {
                _ubaby.errorTips('请选择一个收货地址');
            }
        });

        // 添加地址
        $(document).on('click', '.address-add', function () {
            addressModal.show({
                isUpdate: false,
                onSuccess: function () {
                    _this.loadAddressList();
                }
            });
        });
        //编辑收货地址
        $(document).on('click', '.address-update', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function (res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function () {
                        _this.loadAddressList();
                    }
                });
            }, function (errMsg) {
                _ubaby.errorTips('打开失败咯~~>_<~~，刷新试试？');
            });
        });
        // 删除地址
        $(document).on('click', '.address-delete', function (e) {
            e.stopPropagation();
            var id = $(this).parents('.address-item').data('id');
            _ubaby.confirmTips('确认要删除该地址？', function () {
                _address.deleteAddress(id, function (res) {
                    _this.loadAddressList();
                }, function (errMsg) {
                    _ubaby.errorTips(errMsg);
                });
            });
        });

    },
    loadAddressList: function () {
        var _this = this;
        _ubaby.showLoading('.address-con');
        _address.getAddressList(function (res) {
            _this.filterAddress(res);
            var addressHtml = _ubaby.renderHtml(templateAddress, res);
            $('.address-con').html(addressHtml);
        }, function (errMsg) {
            _ubaby.showErrorMessage('.address-con','地址加载失败，请刷新后重试~~~>_<~~');
        });
    },
    loadProductList: function () {
        var _this = this;
        _ubaby.showLoading('.product-con');
        _order.getProductList(function (res) {
            var productHtml = _ubaby.renderHtml(templateProduct, res);
            $('.product-con').html(productHtml);
        }, function (errMsg) {
            _ubaby.showErrorMessage('.product-con','商品清单加载失败，请刷新后重试~~~>_<~~');
        })
    },
    //处理地址列表选中状态
    filterAddress: function (data) {
        if (this.data.selectedAddressId) {
            var selectedAddressIdFlag = false;
            for (var i = 0, iLength = data.list.length; i < iLength; i++) {
                if (data.list[i].id === this.data.selectedAddressId) {
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            // 如果以前选中的地址不在列表里，将其删除
            if (!selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    }
};

$(function () {
    page.init();
});