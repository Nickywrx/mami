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
        var _this = this,
            flag  = true,
            sign = true,
            timer = null;
        // 点击提交个人注册信息
        $('#submit').click(function(){
            _this.submit();
        });
        // 发送验证码
        $('.identify-btn').click(function(){
            var _this          = this;
                time           = 5,
                identifyText   = $('.identify-text'),
                randomNum      = Math.floor(Math.random()*1000+9000),
                timer          = null;
            clearInterval(timer);
            $(this).attr('disabled','disabled')
            timer = setInterval(function(){
                time--;
                $(_this).text(time+"秒后重新发送");
                if(time<=0){
                    clearInterval(timer);
                    $(_this).text("重新发送");
                    identifyText.text(randomNum);
                    $(_this).removeAttr('disabled');s
                }
            },1000)
        });
        // 同意协议
        $('.agree-check').click(function(){
             if(flag){
                    $('.checked-icon').show().prev('.ck').hide();
                    $('#agree-status').val('12');
                }else{
                    $('.ck').show().siblings('.checked-icon').hide();
                    $('#agree-status').val('');
                }
                flag = !flag;
            });
    },
    submit : function(){
        var formData = {
            username    : $.trim($('#username').val()),
            idCart      : $.trim($('#id-cart').val()),
            phone       : $.trim($('#phone').val()),
            identify    : $.trim($('#identify').text()),
            agreeStatus : $.trim($('#agree-status').val())
        };
        validateResult = this.formValidate(formData);
        if(validateResult.status){
            window.location.href = './mami-info.html';
        }else{
            $.toast(validateResult.msg);
        }
    },
    formValidate : function(formData){
        var result = {
            status : false,
            msg    : ''
        };
        if(!_mm.validate(formData.username, 'require')){
            result.msg = '用户名不能为空';
            return result;
        };
        if(!_mm.validate(formData.idCart, 'id-cart')){
            result.msg = '身份证格式不正确';
            return result;
        };
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        };
        if(!_mm.validate(formData.identify, 'require')){
            result.msg = '验证码为空';
            return result;
        };
        if(!_mm.validate(formData.agreeStatus, 'require')){
            result.msg = '请勾选协议';
            return result;
        };
        result.status = true;
        result.msg = '验证成功';
        return result;
    }
}
register.init();