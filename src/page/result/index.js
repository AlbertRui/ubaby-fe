/*
 * @Author: Administrator
 * @Date:   2018-05-25 23:59:33
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-05-26 00:25:48
 */
'user strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _ubaby = require('util/ubaby.js');

$(function() {
    var type = _ubaby.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    //显示对应的提示元素
    $element.show();
})