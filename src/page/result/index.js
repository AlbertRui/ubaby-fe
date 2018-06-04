/*
 * @Author: Administrator
 * @Date:   2018-05-25 23:59:33
 * @Last Modified by:   Administrator
 * @Last Modified time: 2018-06-04 23:20:21
 */
'user strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _ubaby = require('util/ubaby.js');

$(function() {
    var type = _ubaby.getUrlParam('type') || 'default',
        $element = $('.' + type + '-success');
    if (type === 'payment') {
        var orderNumber = _ubaby.getUrlParam('orderNumber'),
            $orderNumber = $element.find('.order-number');
        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
    }
    //显示对应的提示元素
    $element.show();
});