(function () {
    window.nkutil = window.nkutil || {};

    /**
     * # datetimeselect 日期时间选择器（日历模式）
     * 
     * > 说明 直接显示一个日期选择器
     * 
     * ### 配置参数
     * 
     * - ##### type {string} 控件选择类型
     *  默认值为 date
     * 
     * | 可选参数 | 说明 |
     * | :-: | :-: |
     * | year | 只提供年列表选择 | 
     * | month | 只提供年、月选择 | 
     * | date | 可选择：年、月、日。type默认值，一般可不填 | 
     * | time | 只提供时、分、秒选择 | 
     * | datetime | 可选择：年、月、日、时、分、秒 | 
     * 
     * - ##### format {string} 自定义格式
     * 默认格式为 yyyy-MM-dd
     * 完整格式为 yyyy-MM-dd HH:mm:ss
     * 
     * - ##### value {string | object} 初始值
     * 支持传入符合format参数设定的日期格式字符，或者 new Date()
     * 
     * - ##### min {string} 最小范围内的日期时间值
     * 
     * - ##### max {string} 最大范围内的日期时间值
     * 
     * - ##### lang {string} 语言
     * 支持 cn（中文版）、en（国际版，即英文版）
     * 
     * - ##### calendar {boolean} 是否显示公历节日
     * 默认为false
     * 
     * - ##### mark {object} 标注重要日子
     * 参考layDate的官方说明
     * 例如：{'0-0-15': '中旬'}
     * 
     * - ##### ready {function} 控件初始打开的回调
     * 控件在打开时触发，回调返回一个参数：初始的日期时间对象
     * ```text
     * {
     * ready: function(date){}
     * }
     * ```
     * 
     * 
     * - ##### change {function} 日期时间被切换后的回调
     * 年月日时间被切换时都会触发。回调返回三个参数，分别代表：生成的值、日期时间对象、结束的日期时间对象
     * ```
     * {
     * change: function(value, date, endDate){}
     * }
     * ```
     * 
     * - ##### done {function} 控件选择完毕后的回调
     * 点击日期、清空、现在、确定均会触发。回调返回三个参数，分别代表：生成的值、日期时间对象、结束的日期时间对象
     * ```
     * {
     * done: function(value, date, endDate){}
     * }
     * ```
     * 
     */
    var datetimeselect = function (cfg) {
        cfg = cfg || {};

        var id = 'datetime' + new Date().getTime();
        var index = layer.open({
            type: 1,
            content: '<div id="' + id + '" class="nk-pulgin-datetime"></div>',
            anim: 'up',
            style: 'position:fixed; bottom:0; left:0; width: 100%; border:none;',
            success: function () {
                cfg.elem = '#' + id;
                cfg.position = 'static';
                var done = cfg.done;
                cfg.done = function (value, date, endDate) {
                    typeof done == 'function' && done(value, date, endDate);
                    layer.close(index); // 关闭
                }
                laydate.render(cfg);
            }
        })
    }

    window.nkutil.datetimeselect = datetimeselect;
})();