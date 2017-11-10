// 吐司提示
$.toast = (function() {
    var temp = {
        message: '提示',
        state: 'default',
        time: 2000
    };
    return function() {
        var cur,modal,param;
        if(arguments.length > 1) {
            param = {
                message: arguments[0],
                state: arguments[1]
            }
        } else {
            param = arguments[0];
            if(typeof  param == 'string') {
                param = {message: param};
            }
        }
        cur = $.extend({},temp,param);
        modal = $('<div class="toast ' + cur.state + '">' + cur.message + '</div>').appendTo(document.body);
        modal.css({
            marginTop: - Math.round(modal.outerHeight() / 2) + 'px',
            marginLeft: - Math.round(modal.outerWidth()/2) + 'px',//1.185 是初始化时候的放大效果
            display: 'block'
        }).addClass('in');
        setTimeout(function() {
            modal.remove();
        },cur.time)
    };
})();
var register = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交信息
        $('#submit').click(function(){
            _this.submit();
        });
    },
    submit : function(){
        window.location.href = './mami-register.html';
    }
}
register.init();