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
/*三级联动初始化*/
var area1 = new LArea();
area1.init({
    'trigger': '.home-address',
    'valueTo': '#provinceId',
    'keys': {
        id: 'id',
        name: 'name'
    },
    'type': 1,
    'data': LAreaData
});
var area2 = new LArea();
area2.init({
    'trigger': '.work-address',
    'valueTo': '#provinceId',
    'keys': {
        id: 'id',
        name: 'name'
    },
    'type': 1,
    'data': LAreaData
});
// 页面逻辑
var register = {
    // 初始化
    init : function(){
        this.bindEvent();
    },
    // 绑定事件
    bindEvent : function(){
        var _this           = this,
            educationVal    = $('#education-val'),
            linkmanFirstVal = $('#linkman-first-val'),
            linkmanSecondVal= $('#linkman-second-val');
        // 点击提交个人注册信息
        $('#submit').click(function(){
            _this.submit();
        });
        $('#education').change(function(){
            educationVal.val($(this).val());
        });
        $('#linkman-first').change(function(){
            linkmanFirstVal.val($(this).val());
        });
        $('#linkman-second').change(function(){
            linkmanSecondVal.val($(this).val());
        });
    },
    // 提交操作
    submit : function(){
        var formData = {
            username         : $.trim($('#username').val()),
            idCart           : $.trim($('#id-cart').val()),
            phone            : $.trim($('#phone').val()),
            educationVal     : $.trim($('#education-val').val()),
            school           : $.trim($('#school').val()),
            homeAddress      : $.trim($('#home-address').val()),
            homeDetailAddr   : $.trim($('.home-detail-addr').val()),
            workAddress      : $.trim($('#work-address').val()),
            workDetailAddr   : $.trim($('.work-detail-addr').val()),
            linkmanFirstVal  : $.trim($('#linkman-first-val').val()),
            linknameFitst    : $.trim($('#linkname-fitst').val()),
            linknumFirst     : $.trim($('#linknum-first').val()),
            linkmanSecondVal : $.trim($('#linkman-second-val').val()),
            linknameSecond   : $.trim($('#linkname-second').val()),
            linknumSecond    : $.trim($('#linknum-second').val())
        };
        validateResult = this.formValidate(formData);
        if(validateResult.status){
           window.location.href = './mami-identify.html';
        }else{
            $.toast(validateResult.msg);
        }
    },
    // 提交表单的验证
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
        if(!_mm.validate(formData.educationVal, 'require')){
            result.msg = '兄弟，学历漏选了';
            return result;
        };
        if(!_mm.validate(formData.school, 'require')){
            result.msg = '啦啦啦，你的大学~~忘写了';
            return result;
        };
        if(!_mm.validate(formData.homeAddress, 'require')){
            result.msg = 'where are you from, pro? write down it';
            return result;
        };
        if(formData.homeDetailAddr.length<5){
            result.msg = '大佬，你噶家庭住址噶详细地址至少写五只字啦~~';
            return result;
        };
        if(!_mm.validate(formData.workAddress, 'require')){
            result.msg = 'where are you work, pro? write down it';
            return result;
        };
        if(formData.workDetailAddr.length<5){
            result.msg = '大佬，你噶工作住址噶详细地址至少写五只字啦~~';
            return result;
        };
        if(!_mm.validate(formData.linkmanFirstVal, 'require')){
            result.msg = '紧急联系人一不能不选';
            return result;
        };
        if(!_mm.validate(formData.linknameFitst, 'require')){
            result.msg = '紧急联系人一姓名不能为空';
            return result;
        };
        if(!_mm.validate(formData.linknumFirst, 'phone')){
            result.msg = '紧急联系人一手机号格式不正确';
            return result;
        };
        if(!_mm.validate(formData.linkmanSecondVal, 'require')){
            result.msg = '紧急联系人二不能不选';
            return result;
        };
        if(!_mm.validate(formData.linknameSecond, 'require')){
            result.msg = '紧急联系人二姓名不能为空';
            return result;
        };
        if(!_mm.validate(formData.linknumSecond, 'phone')){
            result.msg = '紧急联系人二手机号格式不正确';
            return result;
        };
        result.status = true;
        result.msg = '验证成功';
        return result;
    }
}
register.init();