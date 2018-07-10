/*
 * @Author: Administrator
 * @Date:   2018-05-21 16:47:19
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-07-10 22:56:28
 */
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('util/slider/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _ubaby = require('util/ubaby.js');

$(function() {
    // 渲染banner的html
    var bannerHtml = _ubaby.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    // 前一张和后一张操作的事件绑定
    $('.banner-con .banner-arrow').click(function() {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
$(function () {
    $('.banner').unslider();
});