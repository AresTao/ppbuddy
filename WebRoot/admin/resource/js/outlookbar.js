/*
 * <p>Title: EAP企业应用开发平台</p>
 *
 * <p>Description: 旨在为各位同仁提供统一的基础开发平台，提高开发效率，改进工作质量！</p>
 *
 * <p>Copyright: Copyright (C) Surekam 2008</p>
 *
 * <p>Company: www.surekam.com</p>
 */

//注册修饰键
var shift = false;
function MyKeyDown() {
    if (event.ctrlKey) shift = true;
    if (event.shiftKey) shift = true;
    return true;
}
document.onkeydown = MyKeyDown;

var tempinnertext1,tempinnertext2,outlooksmoothstat
outlooksmoothstat = 0;//todo


//outlook菜单对象==============================================
function OutlookPanel(name) {
    this.name = name;
    this.debug = false;

    this.titlelist = new Array();
    this.itemlist = new Array();

    this.tableStyle = "border=0 id=" + name + " cellspacing='0' cellpadding='0' style='height:100%;width:100%'";

    this.barAlign = "left";
    this.barStyle = "";//面板样式定义 todo

    this.startBar = -1;

    this.curBar = this.startBar;


    this.prevBar = this.startBar;

    this.timedelay = 200;
    this.inc = 40;

    this.target = "";
    this.useCookie = true;

    this.show = show;

    this.selectBar = selectBar;
    this.addBar = addBar;
    this.addItem = addItem;
}

//菜单项对象
function Item(_label, _icon, _action, _flexConfig) {
    this.action = _action;
    this.label = _label;
    this.flexConfig = _flexConfig;//扩展属性

    if (_icon == null) {
        this.icon = getServiceName() + "/resource/style/xtheme/blue/images/leftmenu/submenu01.gif";
    }
    else {
        this.icon = _icon;
    }
}

//菜单项对象
function Bar(_label, _icon) {
    this.label = _label;
    if (_icon != null) {
        this.icon = _icon;
    }
    else {
        this.icon = getServiceName() + "/resource/style/global/images/expand.gif";
    }
}

//初始化
function getInstance(name) {
    var panel = new OutlookPanel(name);
    return panel;
}
//==============================================================


//添加面板,返回index
function addBar(label, icon) {
    this.itemlist[this.titlelist.length] = new Array();
    this.titlelist[this.titlelist.length] = new Bar(label, icon);
    return(this.titlelist.length - 1);
}

//添加菜单项,返回Index
function addItem(parentid, label, icon, action, flexConfig) {

    if (parentid >= 0 && parentid <= this.titlelist.length) {
        this.itemlist[parentid][this.itemlist[parentid].length] = new Item(label, icon, action, flexConfig);
        return(this.itemlist[parentid].length - 1);
    }
    else {
        alert("添加项目失败，非法的父ID");
        addItem = -1;
        return null;
    }
}

//生成菜单项的显示内容
function createItemView(item) {
    if (item.action == "tree") {//tree
        return "<table width=100%><tr><td>" +
                "<script>" +
                "var " + item.flexConfig + "=" + item.label +
                "new tree(" + item.flexConfig + ");" +
                "</script>" +
                "</td></tr></table>";
    }
    else {
        if (item.action == "other") {//自定义类型
            return item.label;
        }
        else {
            if (item.flexConfig == "ifame_page") {//iframe
                return "<div><iframe frameborder='0' scrolling='Auto' style='width:100%;height:100%' src='" + item.action + "'></iframe></div>";
            }
            else {
                if (item.action == null) {//无连接的button
                    return ("<p><div  style='margin-left:50px;margin-right:5px;'><img src='" + item.icon + "'>" + item.label + "</div>");
                }
                else {//button
                    if (item.action.indexOf("javascript:") != -1) {
                        return ("<p><a onclick='" + item.action + "'><div id='id" + item.flexConfig + "' class='outlook_buttonStyle' onMouseDown='ItemClicked(this)' onMouseOver='OverItems(this)' onMouseOut='OutItems(this)'><img border=0 src='" + item.icon + "'>" + item.label + "</div></a>")
                    }
                    return ("<p><a onclick='dispatchAction(\"" + item.action + "\",\"" + item.label + "\")'><div id='id" + item.flexConfig + "' class='outlook_buttonStyle' onMouseDown='ItemClicked(this)' onMouseOver='OverItems(this)' onMouseOut='OutItems(this)'><img border=0 src='" + item.icon + "'>" + item.label + "</div></a>")
                }
            }
        }
    }

}

function dispatchAction(action, label) {

    var newwin = action.indexOf("window:");
    if (shift || newwin != -1) {//按shift或者用window:指定打开新窗口
        if (newwin != -1) {
            action = action.substring(newwin + 7);
        }

        window.open(action, label, 'height=' + (screen.height - 160) + ', width=' + (screen.width - 100) + ', top=50, left=50, toolbar=no, menubar=no');
    }
    else {
        window.parent.loadDoc(action, label);
    }//todo 采用通用的item.action代替loadDoc

    shift = false;
}

var last_btn = -1;
function ItemClicked(item) {
    if (outlooksmoothstat > 1) {
        return;
    }
    item.className = 'outlook_buttonStyle_current';

    if (last_btn != -1 && last_btn != item.id) {//恢复前一个点击
        $(last_btn).className = 'outlook_buttonStyle';
    }
    last_btn = item.id;
}

function OverItems(item) {
    if (outlooksmoothstat > 1) {
        return;
    }
    if (last_btn != item.id) {//不是当前
        item.className = 'outlook_buttonStyle';
    }
}

function OutItems(item) {
    if (outlooksmoothstat > 1) {
        return;
    }
    if (last_btn != item.id) {//不是当前
        item.className = 'outlook_buttonStyle';
    }
}

//切换面板
function switchBar(outlookPanel, number) {
    if (outlookPanel.titlelist.length == 1) {
        return;
    }

    var i = outlookPanel.curBar;
    var id1,id2,id1b,id2b
    if (number == i) {
        number = outlookPanel.prevBar;
        //点击打开的bar，会切换到前一个显示过的bar
    }
    if (outlooksmoothstat == 0) {
        outlookPanel.prevBar = i;
        outlookPanel.curBar = number;
        if (number != -1) {
            if (i == -1) {
                id2 = "blankdiv" + outlookPanel.name;
                id2b = "blankdiv" + outlookPanel.name;
            }
            else {
                id2 = "outlookdiv" + outlookPanel.name + i;
                id2b = "outlookdivin" + outlookPanel.name + i;
            }
            id1 = "outlookdiv" + outlookPanel.name + number
            id1b = "outlookdivin" + outlookPanel.name + number
            smoothOut(outlookPanel.name, id1, id2, id1b, id2b, 0);
        }
        else {
            $("blankdiv" + outlookPanel.name).style.display = "";
            $("blankdiv" + outlookPanel.name).sryle.height = "100%";
            $("outlookdiv" + outlookPanel.name + i).style.display = "none";
            $("outlookdiv" + outlookPanel.name + i).style.height = "0%";
        }
        if (outlookPanel.useCookie) {
            setCookie("outlookPanel_open_" + outlookPanel.name, number, 365);
        }
    }
}

//淡入淡出显示
function smoothOut(outlookPanelName, id1, id2, id1b, id2b, stat) {
    var outlookPanel = eval(outlookPanelName);

    if (stat == 0) {
        tempinnertext1 = $(id1b).innerHTML;
        tempinnertext2 = $(id2b).innerHTML;
        $(id1b).innerHTML = "";
        $(id2b).innerHTML = "";
        outlooksmoothstat = 1;
        $(id1b).style.overflow = "hidden";
        $(id2b).style.overflow = "hidden";
        $(id1).style.height = "0%";
        $(id1).style.display = "";
        setTimeout("smoothOut(" + outlookPanel.name + ",'" + id1 + "','" + id2 + "','" + id1b + "','" + id2b + "'," + outlookPanel.inc + ")", outlookPanel.timedalay);
    }
    else {
        stat += outlookPanel.inc;
        if (stat > 100) {
            stat = 100;
        }
        $(id1).style.height = stat + "%";
        $(id2).style.height = (100 - stat) + "%";
        if (stat < 100) {
            setTimeout("smoothOut(" + outlookPanel.name + ",'" + id1 + "','" + id2 + "','" + id1b + "','" + id2b + "'," + stat + ")", outlookPanel.timedalay);
        }
        else {
            $(id1b).innerHTML = tempinnertext1;
            $(id2b).innerHTML = tempinnertext2;
            outlooksmoothstat = 0;
            $(id1b).style.overflow = "auto";
            $(id2).style.display = "none";
        }
    }
}

//生成html
function createView(outlookPanel) {
    outline = "";
    outline += "<table " + "cclass='leftmenu_bg'" + outlookPanel.tableStyle + ">";

    for (i = 0; i < (outlookPanel.titlelist.length); i++) {
        outline += "<tr><td id=outlooktitle" + outlookPanel.name + i + " ";

        outline += " nowrap align=" + outlookPanel.titleAlign + " class='outlook_barStyle' ";
        outline += " onclick='switchBar(" + outlookPanel.name + "," + i + ")'>";
        if (outlookPanel.titlelist[i].icon != null) {
            outline += "&nbsp;<img src='" + outlookPanel.titlelist[i].icon + "'>&nbsp;";
        }
        outline += outlookPanel.titlelist[i].label + "</td></tr>";


        outline += "<tr><td name=outlookdiv" + outlookPanel.name + i + " valign=top align=center id=outlookdiv" + outlookPanel.name + i + " style='width:100%;"
        if (i != outlookPanel.curBar) {
            outline += ";display:none;";
        }
        else {
            outline += ";display:yes;height:100%;";
        }
        outline += "'><div name=outlookdivin" + outlookPanel.name + i + " id=outlookdivin" + outlookPanel.name + i + " class='leftmenu_bg'>";
        for (j = 0; j < outlookPanel.itemlist[i].length; j++) {
            outline += createItemView(outlookPanel.itemlist[i][j]);
        }
        outline += "</div></td></tr>"
    }
    outline += "</table>"

    return outline
}

//显示菜单
function show() {
    if (this.startBar == -1 && this.useCookie) {

        var selected = Number(getCookie("outlookPanel_open_" + this.name));

        this.startBar = selected;
        this.curBar = selected;
        if (selected == 0) {
            this.prevBar = 1;
        }
        else {
            this.prevBar = selected - 1;
        }
    }

    document.write(createView(this));

    if (this.debug) {
        document.write("<p><div><textarea name=debug style='width:100%;height=200px'></textarea></div>");
        //todo 定义绝对位置
        debug.value = createView();
    }

}

//选中指定的面板,必须在show()之前调用
function selectBar(barName) {//打开某个面板，如果为“”则打开第一个
    if (barName == "") {
        barName = this.titlelist[0].title
    }
    for (var i = 0; i < this.titlelist.length; i++) {

        if (barName == this.titlelist[i].title) {
            this.startBar = i;
            this.curBar = i;
            break;
        }
    }
}

// Cookie handling如果nDays为空，则为session范围内有效
function setCookie(sName, sValue, nDays) {
    var expires = "";
    if (nDays) {
        var d = new Date();
        d.setTime(d.getTime() + nDays * 24 * 60 * 60 * 1000);
        expires = "; expires=" + d.toGMTString();
    }

    document.cookie = sName + "=" + sValue + expires + "; path=/";
}

function getCookie(sName) {
    var re = new RegExp("(\;|^)[^;]*(" + sName + ")\=([^;]*)(;|$)");
    var res = re.exec(document.cookie);
    return res != null ? res[3] : 0;
}

function getServiceName() {

    var pathname = document.location.pathname;
    var regArr = (/\/.*?\//gi).exec(pathname)
    return "../../" + ((regArr != null) ? regArr[0].replace(/\//gi, "") : "");
}





