(function($){
    $.fn.validationEngineLanguage = function(){
    };
    $.validationEngineLanguage = {
        newLang: function(){
            $.validationEngineLanguage.allRules = {
                "required": { // Add your regex rules here, you can take telephone as an example
                    "regex": "none",
                    "alertText": "�˴�����Ϊ��",
                    "alertTextCheckboxMultiple": "��ѡ��һ����Ŀ",
                    "alertTextCheckboxe": "�����빳ѡ����",
                    "alertTextDateRange": "���ڷ�Χ���ɿհ�"
                },
                "requiredInFunction": { 
                    "func": function(field, rules, i, options){
                        return (field.val() == "test") ? true : false;
                    },
                    "alertText": "Field must equal test"
                },
                "dateRange": {
                    "regex": "none",
                    "alertText": "��Ч�� ",
                    "alertText2": " ���ڷ�Χ"
                },
                "dateTimeRange": {
                    "regex": "none",
                    "alertText": "��Ч�� ",
                    "alertText2": " ʱ�䷶Χ"
                },
                "minSize": {
                    "regex": "none",
                    "alertText": "����",
                    "alertText2": " ���ַ�"
                },
                "maxSize": {
                    "regex": "none",
                    "alertText": "���",
                    "alertText2": " ���ַ�"
                },
				"groupRequired": {
                    "regex": "none",
                    "alertText": "�����ѡ������һ����λ"
                },
                "min": {
                    "regex": "none",
                    "alertText": "��Сֵ�� "
                },
                "max": {
                    "regex": "none",
                    "alertText": "���ֵΪ "
                },
                "past": {
                    "regex": "none",
                    "alertText": "���ڱ������� "
                },
                "future": {
                    "regex": "none",
                    "alertText": "���ڱ������� "
                },	
                "maxCheckbox": {
                    "regex": "none",
                    "alertText": "���ѡȡ ",
                    "alertText2": " ����Ŀ"
                },
                "minCheckbox": {
                    "regex": "none",
                    "alertText": "��ѡ�� ",
                    "alertText2": " ����Ŀ"
                },
                "equals": {
                    "regex": "none",
                    "alertText": "��������������ͬ������"
                },
                "creditCard": {
                    "regex": "none",
                    "alertText": "��Ч�����ÿ�����"
                },
                "phone": {
                    // credit: jquery.h5validate.js / orefalo
                    // "regex": /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
//                	"regex": /^1\d{10}$/,
                	"regex": /^1[3|4|5|8][0-9]\d{8}$/,
                    "alertText": "��Ч���ֻ�����,ֻ֧��13��14��15��18��ͷ���ֻ�����"
                },
                "email": {
                    // Shamelessly lifted from Scott Gonzalez via the Bassistance Validation plugin http://projects.scottsplayground.com/email_address_validation/
//                	"regex": /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
                	"regex": /^(\w+[_|\-|\.]?)*\w+@\w+([_|\-]?)*\w+[\.](cn|com([\.]cn)?)$/,
//                	"regex": /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "alertText": "�ʼ���ַ��Ч"
                },
                "customInteger": {
                    "regex": /^[1-9]\d{0,4}$/,
                    "alertText": "ֻ����1��99999������"
                },
                "integer": {
                    "regex": /^[\-\+]?\d+$/,
                    "alertText": "������Ч������"
                },
                "onlyInteger": {
                    "regex": /^\d{1,4}$/,
                    "alertText": "ֻ�����������Ҳ��ܳ���4λ"
                },
                "number": {
                    // Number, including positive, negative, and floating decimal. credit: orefalo
                    "regex": /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
                    "alertText": "��Ч������"
                },
                "date": {
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
                    "alertText": "��Ч�����ڣ���ʽ����Ϊ YYYY-MM-DD"
                },
                "ipv4": {
//                	"regex": /^((([01]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))[.]){3}(([0-1]?[0-9]{1,2})|(2[0-4][0-9])|(25[0-5]))$/,
//                    "regex": /^((0|([1-9]0[1-9])|([1-9]{1,2}0)|([1-9]{1,3})|(2[0-4][0-9])|(25[0-5]))[.]){3}(0|([1-9]{1,3})|(2[0-4][0-9])|(25[0-5]))$/,
                    "regex": /^(([0-9]|([1-9][0-9]{1,2}))[.]){3}([0-9]|([1-9][0-9]{1,2}))$/,
                    "alertText": "��Ч�� IP ��ַ"
                },
                "url": {
                    "regex": /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
                    "alertText": "��Ч��  URL"
                },
                "port": {
                    "regex": /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                    "alertText": "�˿ںű���Ϊ������Ӧ��0��65535֮��"
                },
                "ipv4:port": {
                    "regex": /^(([0-9]|([1-9][0-9]{1,2}))[.]){3}([0-9]|([1-9][0-9]{1,2}))[:]([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
                    "alertText": "��Ч��IP��˿ں�"
                },
                "onlyNumberSp": {
                    "regex": /^[0-9\ ]+$/,
                    "alertText": "ֻ��������"
                },
                "onlyLetterSp": {
                    "regex": /^[a-zA-Z\ \']+$/,
                    "alertText": "ֻ����Ӣ����ĸ��Сд"
                },
                "onlyLetterNumber": {
                    "regex": /^[0-9a-zA-Z]+$/,
                    "alertText": "�����������ַ�"
                },
                // --- CUSTOM RULES -- Those are specific to the demos, they can be removed or changed to your likings
                "ajaxUserCall": {
                    "url": "ajaxValidateFieldUser",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    "alertText": "�������ѱ�������ʹ��",
                    "alertTextLoad": "����ȷ�������Ƿ���������ʹ�ã����Եȡ�"
                },
				"ajaxUserCallPhp": {
                    "url": "phpajax/ajaxValidateFieldUser.php",
                    // you may want to pass extra data on the ajax call
                    "extraData": "name=eric",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "���ʺ����ƿ���ʹ��",
                    "alertText": "�������ѱ�������ʹ��",
                    "alertTextLoad": "����ȷ���ʺ������Ƿ���������ʹ�ã����Եȡ�"
                },
                "ajaxNameCall": {
                    // remote json service location
                    "url": "ajaxValidateFieldName",
                    // error
                    "alertText": "�����ƿ���ʹ��",
                    // if you provide an "alertTextOk", it will show as a green prompt when the field validates
                    "alertTextOk": "�������ѱ�������ʹ��",
                    // speaks by itself
                    "alertTextLoad": "����ȷ�������Ƿ���������ʹ�ã����Եȡ�"
                },
				 "ajaxNameCallPhp": {
	                    // remote json service location
	                    "url": "phpajax/ajaxValidateFieldName.php",
	                    // error
	                    "alertText": "�������ѱ�������ʹ��",
	                    // speaks by itself
	                    "alertTextLoad": "����ȷ�������Ƿ���������ʹ�ã����Եȡ�"
	                },
                "validate2fields": {
                    "alertText": "������ HELLO"
                },
	            //tls warning:homegrown not fielded 
                "dateFormat":{
                    "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(?:(?:0?[1-9]|1[0-2])(\/|-)(?:0?[1-9]|1\d|2[0-8]))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^(0?2(\/|-)29)(\/|-)(?:(?:0[48]00|[13579][26]00|[2468][048]00)|(?:\d\d)?(?:0[48]|[2468][048]|[13579][26]))$/,
                    "alertText": "��Ч�����ڸ�ʽ"
                },
                //tls warning:homegrown not fielded 
				"dateTimeFormat": {
	                "regex": /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1}$|^(?:(?:(?:0?[13578]|1[02])(\/|-)31)|(?:(?:0?[1,3-9]|1[0-2])(\/|-)(?:29|30)))(\/|-)(?:[1-9]\d\d\d|\d[1-9]\d\d|\d\d[1-9]\d|\d\d\d[1-9])$|^((1[012]|0?[1-9]){1}\/(0?[1-9]|[12][0-9]|3[01]){1}\/\d{2,4}\s+(1[012]|0?[1-9]){1}:(0?[1-5]|[0-6][0-9]){1}:(0?[0-6]|[0-6][0-9]){1}\s+(am|pm|AM|PM){1})$/,
                    "alertText": "��Ч�����ڻ�ʱ���ʽ",
                    "alertText2": "�ɽ��ܵĸ�ʽ�� ",
                    "alertText3": "mm/dd/yyyy hh:mm:ss AM|PM �� ", 
                    "alertText4": "yyyy-mm-dd hh:mm:ss AM|PM"
	            },
	            
	            
	            //************************   �Զ�����֤����		************************/
	            
	            //custom validate �����������֡���ĸ�����֡�"-"��"_",2-20���ַ�
	            "checkSpecialChar":{
	            	"regex": /^[a-zA-Z\d\u4e00-\u9fa5\-\_]{2,20}$/,
                    "alertText": "���벻�Ϸ����밴��ʾ��������"
	            },
	            "ajaxCheckDeveloperName": {
                    "url": "checkDeveloperNameIsExist.do",
                    "extraDataDynamic" : "#loginID",//ҳ��Ҫ���ݵ���̨�Ĳ���
                    "alertText": "�������ѱ�ʹ��",
                    "alertTextOk": "�����ƿ���ʹ��",
                    "alertTextLoad": "����ȷ�ϴ������Ƿ���ã����Ե�..."
                },
	            //ajax��֤ע���¼��ͼƬ��֤��
	            "ajaxCheckValidate": {
                    "url": "validateImgCodeValidate.do",
                    "extraData": "validatePage=register",
                    "alertText": "��֤������",
                    "alertTextOk": "��֤����ȷ",
                    "alertTextLoad": "����ȷ����֤���Ƿ���Ч�����Ե�..."
                },
                //�汾��Ϣ������֤
                "versionInfo": {
                    "regex": /^[a-zA-Z0-9]{1}[a-zA-Z0-9\/\._-]{1,13}[a-zA-Z0-9]{1}$/,
                    "alertText": "����������ĸ�����֡���_������-������.������������ĸ�����ֿ�ͷ�ͽ�β��3~15λ�ַ�"
                },   
                //��֤�ı�������ֵ����������������
                "textValue": {
                	"regex": /^[a-zA-Z\d\u4e00-\u9fa5\-\_]{3,50}$/,
                    "alertText": "�����������֡���ĸ�����֡���_������-����3~50λ�ַ�"
                },
                "textValue2": {
                	"regex": /^[a-zA-Z0-9-_]{3,50}$/,
                    "alertText": "�����������֡���ĸ����_������-����3~50λ�ַ�"
                },
                "apiFuncName": {
                	"regex": /^[a-zA-Z0-9-_*\/\/\.(){}]{3,50}$/,
                	"alertText": "�ɰ������֡���ĸ����_������-������*������.����3~50λ�ַ�"
                },
                //���·����Ϣ������ǰ׺У��
                "routingPrefix": {
                	"regex": /^[a-zA-Z0-9-_]{2,10}$/,
                	"alertText": "�����������֡���ĸ����_������-����2~10λ�ַ�"
                }
            };
            
        }
    };
    $.validationEngineLanguage.newLang();
})(jQuery);
