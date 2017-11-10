var _mm = {
    fastclick : function(){
        FastClick.attach(document.body);
    },
    validate  : function(value, type){
        var value = $.trim(value);
        if('require' === type){
            return !!value;
        };
        if('phone' === type){
            return /^1[3|4|5|8][0-9]\d{4,8}$/.test(value);
        };
        if('id-cart' === type){
            var result = false;
            if(!(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(value))){
                result = true
            }
            if(!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(value))){
                result = true
            }
            return result;
        };
    }
}
_mm.fastclick();
