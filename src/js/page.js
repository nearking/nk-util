/**
 * # code2doc
 * 
 * # page 页面相关的工具方法
 */
;
(function () {
    window.nkutil = window.nkutil || {};

    /**
     * # code2doc
     * 
     * ### toTop - 返回顶部
     *
     * **[method]**
     * 返回顶部工具方法，可以顺滑的返回顶部
     * 
     * ##### 参数说明
     * 
     * | 参数 | 类型 | 描述 |
     * | :-: | :-: | :-: |
     * | speed | number | 速度，数值越大滚动的速度越快；默认速度为**1.2**，最小速度为**1.1** |
     * 
     * ##### 示例
     * ```javascript
     * nkutil.page.toTop();
     * ```
     */
    var toTop = function (speed) {
        speed = speed || 1.2;
        speed = speed < 1 ? 1.1 : speed; // 最小速度不能小于1

        var x1 = (document.documentElement && document.documentElement.scrollLeft) || 0;
        var y1 = (document.documentElement && document.documentElement.scrollTop) || 0;
        var x2 = (document.body && document.body.scrollLeft) || 0;
        var y2 = (document.body && document.body.scrollTop) || 0;
        var x3 = window.scrollX || 0;
        var y3 = window.scrollY || 0;

        // 获取需要滚动的距离
        var x = Math.max(x1, x2, x3);
        var y = Math.max(y1, y2, y3);

        // 重新定位
        window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));

        if (x > 0 || y > 0) {
            setTimeout(function () {
                toTop(speed);
            }, 18)
        }

    }

    /**
     * # code2doc
     * 
     * ### toBottom - 返回底部
     * **[method]**
     * 页面返回底部的工具方法
     * 
     * ##### 参数说明
     * - speed {number} 速度，数值越大滚动的速度越快；默认速度为**1.2**，最小速度为**1.1**
     * 
     * ##### 示例
     * ```javascript
     * nkutil.page.toBottom();
     * ```
     */
    var toBottom = function (speed) {
        speed = speed || 1.2;
        speed = speed < 1 ? 1.1 : speed; // 最小速度不能小于1

        var cH = window.scrollY || 0; // 当前滚动高度
        var maxScrollH = document.body.clientHeight - window.screen.height; // 滚动范围

        var toH = cH + Math.floor(maxScrollH / speed);
        toH = toH > maxScrollH ? maxScrollH : toH;

        window.scrollTo(window.scrollX, toH);

        if (toH < maxScrollH) {
            setTimeout(function () {
                console.log('toBottom ... ');
                toBottom(speed);
            }, 18)
        }

    }

    window.nkutil.page = {
        'toTop': toTop,
        'toBottom': toBottom
    }
})();