/*
 * <p>Title: EAP企业应用开发平台</p>
 *
 * <p>Description: 旨在为各位同仁提供统一的基础开发平台，提高开发效率，改进工作质量！</p>
 *
 * <p>Copyright: Copyright (C) Surekam 2008</p>
 *
 * <p>Company: www.surekam.com</p>
 */

var selectedObj;
var offsetX, offsetY;

function setSelectedElem(evt) {
    var target = (evt.target) ? evt.target : evt.srcElement;
    if (target.id == "drag_layer") {
        selectedObj = target;
        return;
    }
}

function engage(evt) {
    evt = (evt) ? evt : event;
    setSelectedElem(evt);
    if (selectedObj) {
        if (document.body && document.body.setCapture) {
            // engage event capture in IE/Win
            document.body.setCapture();
        }
        if (evt.pageX) {
            offsetX = evt.pageX - ((typeof selectedObj.offsetLeft != "undefined") ?
                                   selectedObj.offsetLeft : selectedObj.left);
            offsetY = evt.pageY - ((selectedObj.offsetTop) ?
                                   selectedObj.offsetTop : selectedObj.top);
        } else if (typeof evt.clientX != "undefined") {
            offsetX = evt.clientX - ((selectedObj.offsetLeft) ?
                                     selectedObj.offsetLeft : 0);
            offsetY = evt.clientY - ((selectedObj.offsetTop) ?
                                     selectedObj.offsetTop : 0);
        } else if (evt.offsetX || evt / offsetY) {
            offsetX = evt.offsetX - ((evt.offsetX < -2) ?
                                     0 : document.body.scrollLeft);
            offsetX -= (document.body.parentElement &&
                        document.body.parentElement.scrollLeft) ?
                       document.body.parentElement.scrollLeft : 0
            offsetY = evt.offsetY - ((evt.offsetY < -2) ?
                                     0 : document.body.scrollTop);
            offsetY -= (document.body.parentElement &&
                        document.body.parentElement.scrollTop) ?
                       document.body.parentElement.scrollTop : 0
        }
        evt.cancelBubble = true;
        return false;
    }
}
// Drag an element
function dragIt(evt) {
    evt = (evt) ? evt : event;
    if (selectedObj && selectedObj.id == "drag_layer") {
        moveFrameSet(evt.clientY);
    }
}

function moveFrameSet(move) {
    var h = window.parent.frames[0].offsetHeight;
    var r = (h + move) + ",5,*";
    window.parent.rows = r;
}
// Turn selected element off
function release(evt) {

    if (selectedObj) {
        selectedObj.zIndex = 0;
        if (document.body && document.body.releaseCapture) {
            // stop event capture in IE/Win
            document.body.releaseCapture();
        }
        selectedObj = null;

    }
}
function blockEvents(evt) {
    evt = (evt) ? evt : event;
    evt.cancelBubble = true;
    return false;
}

// Assign event handlers used by both Navigator and IE
function initDrag() {

    if (document.body & document.body.addEventListener) {
        // turn on event capture for these events in W3C DOM event model
        document.addEventListener("mousedown", engage, true);
        document.addEventListener("mousemove", dragIt, true);
        document.addEventListener("mouseup", release, true);
        return;
    }
    document.onmousedown = engage;
    document.onmousemove = dragIt;
    document.onmouseup = release;
    return;
}

var rem ;//位置记忆

function dkek2(arrow) {
    alert(window.parent.parent.childNodes)
    if (arrow == 0) {//向上
        if (window.parent.frames[2].offsetHeight != 0) {
            if (window.parent.frames[0].offsetHeight != 0) {
                rem = window.parent.frames[0].offsetHeight + ",5,*";
                window.parent.rows = "0,5,*";
            }
        }
        else
            window.parent.rows = rem;
    } else {//向下
        if (window.parent.frames[0].offsetHeight == 0) {
            window.parent.rows = rem;
        }
        else {
            if (window.parent.frames[2].offsetHeight != 0) {
                rem = window.parent.frames[0].offsetHeight + ",5,*";
                window.parent.rows = "*,5,0";
            }
        }
    }
}