/*
 * <p>Title: EAP企业应用开发平台</p>
 *
 * <p>Description: 旨在为各位同仁提供统一的基础开发平台，提高开发效率，改进工作质量！</p>
 *
 * <p>Copyright: Copyright (C) Surekam 2008</p>
 *
 * <p>Company: www.surekam.com</p>
 */

//不支持同一页面存在相同name的元素，即使在不同的form

var ValidationFailCssStyle = "border:1px solid red;";

//Validation function. The call point of the framework.
//@param formRef form对象或者其名称
//@param page 可选的page名称，用于多个页面相同的form名
function doValidate(formRef) {

	trimAll();//todo 有问题回来
    try {
        var formId = formRef;
        if (typeof (formRef) == "string") {
            formId = formRef;
        } else if (typeof (formRef) == "object") {
            formId = formRef.getAttribute("name");
        }
		
        var form = FormFactory.getFormFromId(formId);

        if (form != null) {
            return jsvalidate.validateForm(form);
        } else {
            return false;
        }
    } catch (e) {
        jsvalidate.exception(e.name + ":" + e.description);
        return false;
    }

}
/**===================================================================**/

// The Xml document. To process cross-browser. Thanks Eric.
function XmlDocument() {
}
XmlDocument.create = function () {
    if (document.implementation && document.implementation.createDocument) {
        return document.implementation.createDocument("", "", null);
    } else if (window.ActiveXObject) {
        try {
            var prefix = ["MSXML2", "MSXML", "Microsoft", "MSXML3"];
            for (var i = 0; i < prefix.length; i++) {
                //return new ActiveXObject(prefix[i] + ".DomDocument");
                var obj = new ActiveXObject(prefix[i] + ".DomDocument");
                if (obj == null || typeof(obj) == 'undefined') {
                    continue;
                } else {
                    return obj;
                }
            }
        } catch (e) {
            //^_^
            throw new Error("My God, What version of IE are you using? IE5&+ is requiered.");
        }
    } else
        throw new Error("Cannot create DOM Document!");
}

/**===================================================================**/

Function.prototype.getMultiLine = function() {

		var lines = new String(this);

		lines = lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));//todo 不兼容ff
		return lines;
	}

/**===================================================================**/

function jsvalidate() {
}

jsvalidate._validationCache = null;
jsvalidate._currentForm = null;
jsvalidate._userLanguage = "auto";
/**
 * Validate a form.
 * NOTE: the form is Framework virture form, not the HTML Form.
 * Html Form can be transform to Virture form by
 *     FormFactory.getFormFromId(htmlFormId);
 * See the doc for more information.
 * @param form the virtual form.
 */
jsvalidate.validateForm = function(fform) {
    jsvalidate._currentForm = fform;
    var failFields = [];
    var showError = fform.getShowError();
    var showType = fform.getShowType();

    var br = null;
    if (showError != "alert") {
        br = "<br />";
    } else {
        br = "\n";
    }
    var errorStrArray = [];
    var ret = false;

    var fields = fform.getFields();
    var rightnum = 0;
    for (var i = 0; i < fields.length; i++) {

        var retVal = jsvalidate.validateField(fields[i]);

        var fo = $(fields[i].getName());

        if (typeof (fo) != 'undefined' &&
            fo != null &&
            typeof(fo.type) != "undefined") {
//            fo.style.cssText = "";
			fo.style.cssText ="width:"+fo.style.width;//todo 有问题回来
        }

        if (retVal != "OK") {
            errorStrArray[errorStrArray.length] = retVal;
            var  F= $(fields[i].getName());
            if(F.length&&F.length>1){
                for(var _k=0;_k<F.length;_k++){
                 if(F[_k].type =="text"){F=F[_k]}
                }
            }
            failFields[failFields.length] = F;
        } else {
            rightnum ++;
        }
    }

    if (rightnum == fields.length) {
        ret = true;
    }

    if (errorStrArray.length > 0) {
        if (showError == "alert") {
            if (showType == "first") {
                alert(errorStrArray[0]);
            } else {
                alert(errorStrArray.join(br));
            }

        } else {
            var errObj = $(showError);
            if (showType == "first") {
                errObj.innerHTML = errorStrArray[0];
            } else {
                errObj.innerHTML = errorStrArray.join(br);
            }

        }

        if (typeof (failFields[0]) != 'undefined' &&
            failFields[0] != null &&
            typeof(failFields[0].type) != "undefined") {
            failFields[0].focus();
        }

        for (var i = 0; i < failFields.length; i++) {

            var o = failFields[i];
            if (typeof (o) != 'undefined' &&
                o != null && typeof(o.type) != "undefined") {
                o.style.cssText = ValidationFailCssStyle+"width:"+o.style.width;//todo 有问题回来
            }
        }
    }

    return ret;
}

/**
 * Validation the field
 * @param filed the field you want to validate.
 */
jsvalidate.validateField = function(field) {
    var depends = field.getDepends();
    var retStr = "OK";
    for (var i = 0; i < depends.length; i++) {
        if (!jsvalidate.validateDepend(field, depends[i])) {
            retStr = jsvalidate.getErrorString(field, depends[i]);
            return retStr; //Break;
        }
    }
    return retStr;
}

/**
 * Validate the field depend.
 * This function dispatch the various depends into ValidateMethodFactory.validateXXX
 */
jsvalidate.validateDepend = function(field, depend) {
    if (depend.getName() == "required") {
        return ValidateMethodFactory.validateRequired(field, depend.getParams());
    } else if (depend.getName() == "integer") {
        return ValidateMethodFactory.validateInteger(field, depend.getParams());
    } else if (depend.getName() == "double") {
        return ValidateMethodFactory.validateDouble(field, depend.getParams());
    } else if (depend.getName() == "commonChar") {
        return ValidateMethodFactory.validateCommonChar(field, depend.getParams());
    } else if (depend.getName() == "chineseChar") {
        return ValidateMethodFactory.validateChineseChar(field, depend.getParams());
    } else if (depend.getName() == "minLength") {
        return ValidateMethodFactory.validateMinLength(field, depend.getParams());
    } else if (depend.getName() == "maxLength") {
        return ValidateMethodFactory.validateMaxLength(field, depend.getParams());
    } else if (depend.getName() == "email") {
        return ValidateMethodFactory.validateEmail(field, depend.getParams());
    } else if (depend.getName() == "date") {
        return ValidateMethodFactory.validateDate(field, depend.getParams());
    } else if (depend.getName() == "time") {
        return ValidateMethodFactory.validateTime(field, depend.getParams());
    } else if (depend.getName() == "mask") {
        return ValidateMethodFactory.validateMask(field, depend.getParams());
    } else if (depend.getName() == "integerRange") {
        return ValidateMethodFactory.validateIntegerRange(field, depend.getParams());
    } else if (depend.getName() == "doubleRange") {
        return ValidateMethodFactory.validateDoubleRange(field, depend.getParams());
    } else if (depend.getName() == "equalsField") {
        return ValidateMethodFactory.validateEqualsField(field, depend.getParams());
    } else if (depend.getName() == "lessthan") {
        return ValidateMethodFactory.validateLessThan(field, depend.getParams());
    } else if (depend.getName() == "uppercase") {
        return ValidateMethodFactory.validateUppercase(field, depend.getParams());
    } else if (depend.getName() == "upperuined") {
        return ValidateMethodFactory.validateUpperUined(field, depend.getParams());
    } /* else if (depend.getName() == "select") {
        return ValidateMethodFactory.validateSelect(field, depend.getParams());
    }*/ else {
        jsvalidate.exception("还未实现该依赖： " + depend.getName());
        return false;
    }
}


jsvalidate.getDocumentElement = function() {
    if (jsvalidate._validationCache != null) {
        return jsvalidate._validationCache;
    }

    var xmlDoc = XmlDocument.create();
    xmlDoc.async = false;

    xmlDoc.loadXML(validxml.getMultiLine());//todo
    if (xmlDoc.documentElement == null) {
        jsvalidate.exception("配置文件读取错误，请检查。");
        return null;
    }

    jsvalidate._validationCache = xmlDoc.documentElement;

    return jsvalidate._validationCache;
}

jsvalidate.getAllForms = function() {
    var vforms = [];
    var root = jsvalidate.getDocumentElement();
    if (root != null) {
        var fs = root.childNodes;
        for (var i = 0; i < fs.length; i++) {
            vforms[i] = new ValidationForm(fs.item(i));
        }
    }
    return vforms;
}
jsvalidate.getErrorString = function(field, depend) {
    var stringResource = null;
    var lang = jsvalidate._userLanguage.toLowerCase();
    //if lang == auto, get the user's browser language.
    if (lang == "auto") {
        // different browser has the different method the get the
        // user's language. so this is a stupid way to detect the
        // most common browser IE and Mozilla.
        if (typeof navigator.userLanguage == 'undefined')
            lang = navigator.language.toLowerCase();
        else
            lang = navigator.userLanguage.toLowerCase();
    }
    // get the language
    if (typeof ValidationErrorString[lang] != 'object') {
        stringResource = ValidationErrorString['zh-cn'];
    } else {
        stringResource = ValidationErrorString[lang];
    }
    var dep = depend.getName().toLowerCase();
    var retStr = stringResource[dep];
    //If the specified depend not defined, use the default error string.
    if (typeof retStr != 'string') {
        retStr = stringResource["default"];
        retStr = retStr.replace("{0}", field.getDisplayName());
        return retStr;
    }
    retStr = retStr.replace("{0}", field.getDisplayName());
    if (dep == "minlength" || dep == "maxlength" || dep == "date") {
        retStr = retStr.replace("{1}", depend.getParams()[0]);
    } else if (dep == "equalsfield"||dep=="lessthan") {
        var eqField = field.getForm().findField(depend.getParams()[0]);
        if (eqField == null) {
            jsvalidate.exception("找不到名称为[" + depend.getParams()[0] + "]的域，请检查xml配置文件。");
            retStr = "<<配置错误>>";
        } else {
            retStr = retStr.replace("{1}", field.getForm().findField(depend.getParams()[0]).getDisplayName());
        }
    } else if (dep == "integerrange" || dep == "doublerange") {
        retStr = retStr.replace("{1}", depend.getParams()[0]);
        retStr = retStr.replace("{2}", depend.getParams()[1]);
    }

    return retStr;
}

jsvalidate.getWebFormFieldObj = function(field) {
    var obj = $(field.getName());
    if(obj.length&&obj.length>1){
     for(var ii=0;ii<obj.length;ii++)   if(obj[ii].type =="text"){obj=obj[ii]}
    }
    if (obj == null) {
        jsvalidate.exception("在配置文件中有需要验证的域，但在实际网页表单中不存在：[name=" + field.getName() + "]。");
    }
    return obj;
}

jsvalidate.exception = function(str) {
    var ex = "JavaScript Validation Framework 运行时错误:\n\n";
    ex += str;
    ex += "\n\n\n任何运行错误都会导致该域验证失败。";
    alert(ex);
}
jsvalidate.getIntegerValue = function(val) {
    var intvalue = parseInt(val);
    if (isNaN(intvalue)) {
        jsvalidate.exception("期待一个整型参数。");
    }
    return intvalue;
}
jsvalidate.getFloatValue = function(val) {
    var floatvalue = parseFloat(val);
    if (isNaN(floatvalue)) {
        jsvalidate.exception("期待一个浮点型参数。");
    }
    return floatvalue;
}
/**
 * FormFactory
 * Build virture form from Html Form.
 */
function FormFactory() {
}
FormFactory.getFormFromDOM = function(dom) {
    var form = new ValidationForm();
    form.setId(dom.getAttribute("id"));
    form.setShowError(dom.getAttribute("show-error"));
    form.setOnFail(dom.getAttribute("onfail"));
    form.setShowType(dom.getAttribute("show-type"));

    if (dom.hasChildNodes()) {
        var f = dom.childNodes;
        for (var i = 0; i < f.length; i++) {
            if (f.item(i) == null || typeof(f.item(i).tagName) == 'undefined' || f.item(i).tagName != 'field') {
                continue;
            }
            var field = FieldFactory.getFieldFromDOM(f.item(i));
            if (field != null) {
                form.addField(field);
            }
        }
    }
    return form;
}
/// Get the Form from ID
FormFactory.getFormFromId = function(id) {
    var root = jsvalidate.getDocumentElement();

    if (root == null || (!root.hasChildNodes())) return null;
    var vforms = root.childNodes;

    if(vforms.length==1)
       return FormFactory.getFormFromDOM(vforms.item(0));

    for (var i = 0; i < vforms.length; i++) {
        var f = vforms.item(i);

        if (typeof(f.tagName) != 'undefined' && f.tagName == 'form' && f.getAttribute("id") == id) {//todo id类型不是字符串
            return FormFactory.getFormFromDOM(f);
        }
    }
    return null;
}


/**
 * A validation form object.
 */
function ValidationForm() {
    this._fields = [];
    this._id = null;
    this._showError = null;
    this._onFail = null;
    this._showType = null;

    this.getFields = function() {
        return this._fields;
    }
    this.setFields = function(p0) {
        this._fields = p0;
    }

    this.getId = function() {
        return this._id;
    }
    this.setId = function(p0) {
        this._id = p0;
    }

    this.getShowError = function() {
        return this._showError;
    }
    this.setShowError = function(p0) {
        this._showError = p0;
    }

    this.getShowType = function() {
        return this._showType;
    }
    this.setShowType = function(p0) {
        this._showType = p0;
    }

    this.getOnFail = function() {
        return this._onFail;
    }
    this.setOnFail = function(p0) {
        this._onFail = p0;
    }

    // find field by it's name
    this.findField = function(p0) {
        for (var i = 0; i < this._fields.length; i++) {
            if (this._fields[i].getName() == p0) {
                return this._fields[i];
            }
        }
        return null;
    }

    this.addField = function(p0) {
        this._fields[this._fields.length] = p0;
        p0.setForm(this);
    }
}

/**
 * A form filed. virtual.
 */
function ValidationField() {
    this._name = null;
    this._depends = [];
    this._displayName = null;
    this._onFail = null;
    this._form = null;

    this.getName = function() {
        return this._name;
    }
    this.setName = function(p0) {
        this._name = p0;
    }

    this.getDepends = function() {
        return this._depends;
    }
    this.setDepends = function(p0) {
        this._depends = p0;
    }

    this.getDisplayName = function() {
        return this._displayName;
    }
    this.setDisplayName = function(p0) {
        this._displayName = p0;
    }

    this.getOnFail = function() {
        return this._onFail;
    }
    this.setOnFail = function(p0) {
        this._onFail = p0;
    }

    this.getForm = function() {
        return this._form;
    }
    this.setForm = function(p0) {
        this._form = p0;
    }

    this.addDepend = function(p0) {
        this._depends[this._depends.length] = p0;
    }
}

///Factory methods for create Field
function FieldFactory() {
}
FieldFactory.getFieldFromDOM = function(dom) {
    var field = new ValidationField();
    field.setName(dom.getAttribute("name"));
    field.setDisplayName(dom.getAttribute("display-name"));
    field.setOnFail(dom.getAttribute("onfail"));
    if (dom.hasChildNodes()) {
        var depends = dom.childNodes;
        for (var i = 0; i < depends.length; i++) {
            var item = depends.item(i);
            if (typeof(item.tagName) == 'undefined' || item.tagName != 'depend') {
                continue;
            }
            var dp = new ValidationDepend();
            dp.setName(item.getAttribute("name"));
            dp.addParam(item.getAttribute("param0"));
            dp.addParam(item.getAttribute("param1"));
            dp.addParam(item.getAttribute("param2"));
            dp.addParam(item.getAttribute("param3"));
            dp.addParam(item.getAttribute("param4"));
            field.addDepend(dp);
        }
    }
    return field;
}


function FormFieldUtils() {
}

FormFieldUtils.findField = function(formName, fieldName) {

    var formArr = jsvalidate.getAllForms();
    var theForm = null;
    for (var i = 0; i < formArr.length; i++) {
        if (formArr[i].getName() == formName) {
            theForm = formArr[i];
        }
    }

    if (theForm != null) {
        return theForm.findField(fieldName);
    } else {
        return null;
    }
}

/**
 * A validaton depend.
 */
function ValidationDepend() {
    this._name = null;
    this._params = [];

    this.getName = function() {
        return this._name;
    }
    this.setName = function(p0) {
        this._name = p0;
    }

    this.getParams = function() {
        return this._params;
    }
    this.setParams = function(p0) {
        this.params = p0;
    }

    this.addParam = function(p0) {
        this._params[this._params.length] = p0;
    }
}

function ValidateMethodFactory() {
}
ValidateMethodFactory._methods = [];
ValidateMethodFactory.validateRequired = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);

    if (obj == null) return false;
    if (typeof(obj.type) == "undefined") {
        var tmp = 0;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].checked) {
                return true;
            }
        }
        return false;
    }

    if (obj.type == "checkbox" || obj.type == "radio") {
        return (obj.checked);
    } else {
        return !(obj.value == "");
    }
}

ValidateMethodFactory.validateInteger = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return true;
    var exp = new RegExp("^-?\\d+$");
    return exp.test(obj.value);
}

ValidateMethodFactory.validateDouble = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return true;
    var exp = new RegExp("^-?\\d+\.\\d+$");
    return exp.test(obj.value);
}
ValidateMethodFactory.validateCommonChar = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return true;
    var exp = new RegExp("^[A-Za-z0-9_]*$");
    return exp.test(obj.value);
}
ValidateMethodFactory.validateChineseChar = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return true;
    var exp = new RegExp("^[\u4E00-\u9FA5\uF900-\uFA2D]*$");
    return exp.test(obj.value);
}
ValidateMethodFactory.validateMinLength = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    var v = jsvalidate.getIntegerValue(params[0]);
    return (obj.value.length >= v);
}
ValidateMethodFactory.validateMaxLength = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    var v = jsvalidate.getIntegerValue(params[0]);
    return (obj.value.length <= v);
}
ValidateMethodFactory.validateEmail = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    return ValidateMethodFactory.__checkEmail(obj.value);
}
ValidateMethodFactory.validateDate = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return true;

    var value = obj.value;
    var datePattern = params[0];
    var MONTH = "mm";
    var DAY = "dd";
    var YEAR = "yyyy";
    var orderMonth = datePattern.indexOf(MONTH);
    var orderDay = datePattern.indexOf(DAY);
    var orderYear = datePattern.indexOf(YEAR);
    var bValid = true;
    var dateRegexp = null;

    if ((orderDay < orderYear && orderDay > orderMonth)) {
        var iDelim1 = orderMonth + MONTH.length;
        var iDelim2 = orderDay + DAY.length;
        var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
        var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
        if (iDelim1 == orderDay && iDelim2 == orderYear) {
            dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
        } else if (iDelim1 == orderDay) {
            dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
        } else if (iDelim2 == orderYear) {
            dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
        } else {
            dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
        }

        var matched = dateRegexp.exec(value);
        if (matched != null) {
            if (!ValidateMethodFactory.__isValidDate(matched[2], matched[1], matched[3])) {
                bValid = false;
            }
        } else {
            bValid = false;
        }
    } else if ((orderMonth < orderYear && orderMonth > orderDay)) {
        var iDelim1 = orderDay + DAY.length;
        var iDelim2 = orderMonth + MONTH.length;
        var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);
        var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
        if (iDelim1 == orderMonth && iDelim2 == orderYear) {
            dateRegexp = new RegExp("^(\\d{2})(\\d{2})(\\d{4})$");
        } else if (iDelim1 == orderMonth) {
            dateRegexp = new RegExp("^(\\d{2})(\\d{2})[" + delim2 + "](\\d{4})$");
        } else if (iDelim2 == orderYear) {
            dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})(\\d{4})$");
        } else {
            dateRegexp = new RegExp("^(\\d{2})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{4})$");
        }
        var matched = dateRegexp.exec(value);
        if (matched != null) {
            if (!ValidateMethodFactory.__isValidDate(matched[1], matched[2], matched[3])) {
                bValid = false;
            }
        } else {
            bValid = false;
        }
    } else if ((orderMonth > orderYear && orderMonth < orderDay)) {
        var iDelim1 = orderYear + YEAR.length;
        var iDelim2 = orderMonth + MONTH.length;
        var delim1 = datePattern.substring(iDelim1, iDelim1 + 1);

        var delim2 = datePattern.substring(iDelim2, iDelim2 + 1);
        if (iDelim1 == orderMonth && iDelim2 == orderDay) {
            dateRegexp = new RegExp("^(\\d{4})(\\d{2})(\\d{2})$");
        } else if (iDelim1 == orderMonth) {
            dateRegexp = new RegExp("^(\\d{4})(\\d{2})[" + delim2 + "](\\d{2})$");
        } else if (iDelim2 == orderDay) {
            dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})(\\d{2})$");
        } else {
            dateRegexp = new RegExp("^(\\d{4})[" + delim1 + "](\\d{2})[" + delim2 + "](\\d{2})$");
        }
        var matched = dateRegexp.exec(value);
        if (matched != null) {
            if (!ValidateMethodFactory.__isValidDate(matched[3], matched[2], matched[1])) {
                bValid = false;
            }
        } else {
            bValid = false;
        }
    } else {
        bValid = false;
    }
    return bValid;
}
ValidateMethodFactory.validateTime = function(field, params) {
    ////NOT IMPLEMENT YET SINCE IT'S NOT USEFUL.
    return true;
}
ValidateMethodFactory.validateMask = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return true;
    var exp = new RegExp(params[0]);
    //FIXME: this method may be buggy, need more test.
    return exp.test(obj.value);
}
ValidateMethodFactory.validateIntegerRange = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return true;
    var p0 = jsvalidate.getIntegerValue(params[0]);
    var p1 = jsvalidate.getIntegerValue(params[1]);
    if (ValidateMethodFactory.validateInteger(field)) {
        var v = parseInt(obj.value);
        return (v >= p0 && v <= p1);
    } else {
        return false;
    }
    return true;
}
ValidateMethodFactory.validateDoubleRange = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return true;
    var p0 = jsvalidate.getFloatValue(params[0]);
    var p1 = jsvalidate.getFloatValue(params[1]);
    if (ValidateMethodFactory.validateInteger(field) || ValidateMethodFactory.validateDouble(field)) {
        var v = parseFloat(obj.value);
        return (v >= p0 && v <= p1);
    } else {
        return false;
    }
    return true;
}
ValidateMethodFactory.validateEqualsField = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    var eqField = $(params[0]);
    if (eqField != null) {
        return (obj.value == eqField.value)
    } else {
        return false;
    }
}

ValidateMethodFactory.validateLessThan = function(field, params) {

    var strStart = jsvalidate.getWebFormFieldObj(field).value;

    var strEnd = $(params[0]).value;
    if(strEnd=="")
        return false;

    var arr1 = strStart.split("-");
    var arr2 = strEnd.split("-");
    var date1 = new Date(arr1[0], parseInt(arr1[1].replace(/^0/, ""), 10) - 1, arr1[2]);
    var date2 = new Date(arr2[0], parseInt(arr2[1].replace(/^0/, ""), 10) - 1, arr2[2]);
    if (arr1[1].length == 1)
        arr1[1] = "0" + arr1[1];
    if (arr1[2].length == 1)
        arr1[2] = "0" + arr1[2];
    if (arr2[1].length == 1)
        arr2[1] = "0" + arr2[1];
    if (arr2[2].length == 1)
        arr2[2] = "0" + arr2[2];
    var d1 = arr1[0] + arr1[1] + arr1[2];
    var d2 = arr2[0] + arr2[1] + arr2[2];
    if (parseInt(d1, 10) > parseInt(d2, 10)) {
        return false;
    }
    else
        return true;

}

ValidateMethodFactory.__isValidDate = function(day, month, year) {
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    if ((month == 4 || month == 6 || month == 9 || month == 11) && (day == 31))
        return false;

    if (month == 2) {
        var leap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
        if (day > 29 || (day == 29 && !leap)) return false;
    }

    return true;
}

/**
 * Reference: Sandeep V. Tamhankar (stamhankar@hotmail.com),
 * http://javascript.internet.com
 */
ValidateMethodFactory.__checkEmail = function(emailStr) {
    if (emailStr.length == 0) {
        return true;
    }
    var emailPat = /^(.+)@(.+)$/;
    var specialChars = "\\(\\)<>@,;:\\\\\\\"\\.\\[\\]";
    var validChars = "\[^\\s" + specialChars + "\]";
    var quotedUser = "(\"[^\"]*\")";
    var ipDomainPat = /^(\d{1,3})[.](\d{1,3})[.](\d{1,3})[.](\d{1,3})$/;
    var atom = validChars + '+';
    var word = "(" + atom + "|" + quotedUser + ")";
    var userPat = new RegExp("^" + word + "(\\." + word + ")*$");
    var domainPat = new RegExp("^" + atom + "(\\." + atom + ")*$");
    var matchArray = emailStr.match(emailPat);
    if (matchArray == null) {
        return false;
    }
    var user = matchArray[1];
    var domain = matchArray[2];
    if (user.match(userPat) == null) {
        return false;
    }
    var IPArray = domain.match(ipDomainPat);
    if (IPArray != null) {
        for (var i = 1; i <= 4; i++) {
            if (IPArray[i] > 255) {
                return false;
            }
        }
        return true;
    }
    var domainArray = domain.match(domainPat);
    if (domainArray == null) {
        return false;
    }
    var atomPat = new RegExp(atom, "g");
    var domArr = domain.match(atomPat);
    var len = domArr.length;
    if ((domArr[domArr.length - 1].length < 2) ||
        (domArr[domArr.length - 1].length > 3)) {
        return false;
    }
    if (len < 2) {
        return false;
    }
    return true;

}
//zouwd add
ValidateMethodFactory.validateUppercase = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return true;
    var exp = new RegExp("^[A-Z0-9]+$");
    return exp.test(obj.value);
}
//zouwd add
/*ValidateMethodFactory.validateSelect = function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return false;
    if (obj.value =="-1") return false;
    return true;
}  */
//zhaidr append
ValidateMethodFactory.validateUpperUined=function(field, params) {
    var obj = jsvalidate.getWebFormFieldObj(field);
    if (obj == null) return false;
    if (obj.value == "") return true;
    var exp = new RegExp("^[A-Z0-9_]*$");
    return exp.test(obj.value);
}
////Language Definitions
var ValidationErrorString = new Object();
////Simplified Chinese(zh-ch)
ValidationErrorString["zh-cn"] = new Object();
ValidationErrorString["zh-cn"]["default"] = "域{0}校验失败。";
ValidationErrorString["zh-cn"]["required"] = "{0}不能为空。";
ValidationErrorString["zh-cn"]["integer"] = "{0}必须是一个整数。";
ValidationErrorString["zh-cn"]["double"] = "{0}必须是一个浮点数（带小数点）。";
ValidationErrorString["zh-cn"]["commonchar"] = "{0}必须是普通英文字符：字母，数字和下划线。";
ValidationErrorString["zh-cn"]["chinesechar"] = "{0}必须是中文字符。";
ValidationErrorString["zh-cn"]["minlength"] = "{0}长度不能小于{1}个字符。";
ValidationErrorString["zh-cn"]["maxlength"] = "{0}长度不能大于{1}个字符。";
ValidationErrorString["zh-cn"]["invalid"] = "{0}无效。";
ValidationErrorString["zh-cn"]["date"] = "{0}不是一个有效日期，期待格式：{1}。";
ValidationErrorString["zh-cn"]["integerrange"] = "{0}必须在整数{1}和{2}之间。";
ValidationErrorString["zh-cn"]["doublerange"] = "{0}必须在浮点数{1}和{2}之间。";
ValidationErrorString["zh-cn"]["pid"] = "{0}不是一个有效身份证号。";
ValidationErrorString["zh-cn"]["email"] = "{0}不是一个有效的Email。";
ValidationErrorString["zh-cn"]["equalsfield"] = "{0}必须和{1}一致。";
ValidationErrorString["zh-cn"]["lessthan"] = "{0}必须小于{1}。";
//zouwd add
ValidationErrorString["zh-cn"]["uppercase"] = "{0}必须是大写英文字符：字母，数字。";
//ValidationErrorString["zh-cn"]["select"] = "{0}必须选择一个。";
//zhaidr append
ValidationErrorString["zh-cn"]["upperuined"] = "{0}必须是大写英文字符：字母，数字和下划线。";

////English(en-us)
ValidationErrorString["en-us"] = new Object();
ValidationErrorString["en-us"]["default"] = "Failed when validating filed {0}.";
ValidationErrorString["en-us"]["required"] = "{0} is required.";
ValidationErrorString["en-us"]["integer"] = "{0} must be a integer.";
ValidationErrorString["en-us"]["double"] = "{0} must be a double value. ";
ValidationErrorString["en-us"]["commonchar"] = "{0} should be common ascii characters, A-Z,a-z and undercore. ";
ValidationErrorString["en-us"]["chinesechar"] = "{0} must be chinese characters. ";
ValidationErrorString["en-us"]["minlength"] = "{0} cannot be less then {1}. ";
ValidationErrorString["en-us"]["maxlength"] = "{0} cannot be more then {1}. ";
ValidationErrorString["en-us"]["invalid"] = "{0} in invalid. ";
ValidationErrorString["en-us"]["date"] = "{0} is not an invalid date format: {1}. ";
ValidationErrorString["en-us"]["integerrange"] = "{0} should be between number {1} and {2}. ";
ValidationErrorString["en-us"]["doublerange"] = "{0} should be between double {1} and {2}. ";
ValidationErrorString["en-us"]["pid"] = "{0} is not an valid pid. ";
ValidationErrorString["en-us"]["email"] = "{0} is not an valid email address. ";
ValidationErrorString["en-us"]["equalsfield"] = "{0} should be agree with field {1}. ";

//zouwd add
ValidationErrorString["en-us"]["uppercase"] = "{0} should be common ascii characters, A-Z and undercore. ";
//zhaidr append
ValidationErrorString["en-us"]["upperuined"] = "{0} should be common ascii characters, A-Z and undercore. ";
//ValidationErrorString["en-us"]["select"] = "{0} should be select one. ";