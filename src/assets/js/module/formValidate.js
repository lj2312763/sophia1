/**
 * 表单校验方法工具类
 */
class TFormValidate{
    constructor(){
        
    }
    /**
     * 邮箱
     * @param {*} value 
     */
    static isEmail(value){
        let rege = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return rege.test(value);
    }

    /**
     * 手机号
     * @param {*} value 
     */
    static isMobile(value){
        // let rege = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        let rege = /^1(3|4|5|6|7|8)\d{9}$/;
        return rege.test(value);
    }
    
    /**
     * 电话
     * @param {*} value 
     */
    static isTelephone(value){
        let rege = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
        return rege.test(value);
    }

    /**
     * ip地址
     * @param {*} value 
     */
    static isIP(value){
        // let rege = /\d+\.\d+\.\d+\.\d+/;
        let rege = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
        return rege.test(value);
    }
    /**
     * 域名
     * @param {*} value 
     */
    static domain(value){
        let rege = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
        return rege.test(value);
    }


    /**
     * 身份证
     * @param {*} value 1 第一代
     * @param {*} value 2 第二代
     */
    static idCard(value,type=2){
        let rege = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if(type == 1){
            rege = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        }
        return rege.test(value);
    }

    /**
     * 密码
     * type=1 格式： 字母、数字、下划线
     * type=2 格式：强密码正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
     * @param {*} value 
     */
    static password(value,type=1){
        let rege = /^[a-zA-Z]\w{5,17}$/;
        if(type == 2){
            rege =  /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
        }
        return rege.test(value);
    }

    /**
     * qq号码
     * @param {} value 
     */
    static qq(value){
        let rege = /^[1-9][0-9]{4,10}$/;
        return rege.test(value);
    }
    /**
     * 特殊字符
     * @param {*} value 
     */
    static specialCharacter(value){
        let rege = /["'<>%;)(&+]+-!！@#$~/;
        return rege.test(value);
    }

}
export default TFormValidate;