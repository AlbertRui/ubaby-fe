/*
 * @Author: Administrator
 * @Date:   2018-05-25 23:05:28
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-05-25 23:53:18
 */
'use strict';
require('./index.css');
var _ubaby = require('util/ubaby.js');
var templateIndex = require('./index.string');
//侧边导航
var navSide = {
    option: {
        name: '',
        navList: [{
            name: 'user-center',
            desc: '个人中心',
            href: './user-center.html'
        }, {
            name: 'order-list',
            desc: '我的订单',
            href: './order-list.html'
        }, {
            name: 'pass-update',
            desc: '修改密码',
            href: './pass-update.html'
        }, {
            name: 'about',
            desc: '关于ubaby',
            href: './about.html'
        }]
    },
    init: function(option) {
        // 合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
    //渲染导航菜单
    renderNav: function() {
        // 计算Active数据
         for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
         };
         //渲染HTML参数
         var navHTML = _ubaby.renderHtml(templateIndex, {
            navList : this.option.navList
         });
         //把HTML放入容器
         $('.nav-side').html(navHTML);
    }
};
module.exports = navSide;