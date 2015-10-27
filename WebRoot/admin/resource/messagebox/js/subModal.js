/**
 * SUBMODAL v1.4
 * Used for displaying DHTML only popups instead of using buggy modal windows.
 *
 * By Seth Banks (webmaster at subimage dot com)
 * http://www.subimage.com/
 *
 * Contributions by:
 * 	Eric Angel - tab index code
 * 	Scott - hiding/showing selects for IE users
 *	Todd Huss - inserting modal dynamically and anchor classes
 *
 * Up to date code can be found at http://www.subimage.com/dhtml/subModal
 * 
 *
 * This code is free for you to use anywhere, just keep this comment block.
 */

// Popup code
var gPopupMask = null;
var gPopupContainer = null;
var gPopFrame = null;
var gShadowBox = null;
var gReturnFunc;
var gPopupIsShown = false;

var gHideSelects = false;

var gpopBodyBox = null;

var gTitleName = "&nbsp;";
var gDefaultLogin = "loading.html";


var gTabIndexes = new Array();
// Pre-defined list of tags we want to disable/enable tabbing into
var gTabbableTags = new Array("A","BUTTON","TEXTAREA","INPUT","IFRAME");	

// If using Mozilla or Firefox, use Tab-key trap.
if (!document.all) {
	document.onkeypress = keyDownHandler;
}
/**
 * Initializes popup code on load.	
 */
function initPopUp() {
	// lixy ���ζ�ε��ñ�jsʱ ҳ����Զ�����һ�����ڵĴ���
	if(document.getElementById('popupContainer')){
		return;
	}
	// Add the HTML to the body
	theBody = document.getElementsByTagName('BODY')[0];
	popmask = document.createElement('div');
	popmask.id = 'popupMask';
	var ifrm = document.createElement("iframe");
	ifrm.src="javascript:false";
	ifrm.scrolling = "no";
	ifrm.style.position = "absolute";
	ifrm.style.visibility = "inherit";
	ifrm.style.top = "0px";
	ifrm.style.left = "0px";
	ifrm.style.width = "100%";
	ifrm.style.height = "100%";
	ifrm.style.zIndex = "-1";
	ifrm.style.filter = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)";
	popmask.appendChild(ifrm);
	popcont = document.createElement('div');
	popcont.id = 'popupContainer';
	popcont.innerHTML = '' +
        '<DIV class="x-window x-window-plain x-window-dlg" id="ext-comp-1001" style="DISPLAY: block; Z-INDEX: 9003;  VISIBILITY: visible;WIDTH: 300px; POSITION: absolute; TOP: 116px;LEFT: 354px;">'+
            '<DIV class="x-window-tl" onmousedown="startDrag(this);" onmouseup="stopDrag(this);" onmousemove="drag(this);">'+
                '<DIV class="x-window-tr">'+
                    '<DIV class="x-window-tc">'+
                        '<DIV class="x-window-header x-unselectable x-window-draggable" id="ext-gen15" style="MozUserSelect: none; KhtmlUserSelect: none" unselectable="on">'+
                            '<DIV class="x-tool x-tool-close " id="ext-gen59" onclick="hidePopWin(false);" style="DISPLAY: block">'+
                                '&nbsp;'+
                            '</DIV>'+
                            '<SPAN class="x-window-header-text" id="popupTitle">'+
                                'Address'+
                            '</SPAN>'+
                        '</DIV>'+
                    '</DIV>'+
                '</DIV>'+
            '</DIV>'+
            '<DIV class="x-window-bwrap" id="ext-gen16">'+
                '<DIV class="x-window-ml">'+
                    '<DIV class="x-window-mr">'+
                        '<DIV class="x-window-mc">'+
'<!-- Start-->'+
		'<div id="popBodyBox">'+
		'</div>'+
'<!-- End-->'+
                        '</DIV>'+
                    '</DIV>'+
                '</DIV>'+
                '<DIV class="x-window-bl">'+
                    '<DIV class="x-window-br">'+
                        '<DIV class="x-window-bc">'+
                            '<DIV class="x-window-footer" id="ext-gen18"></DIV>'+
                        '</DIV>'+
                    '</DIV>'+
                '</DIV>'+
            '</DIV>'+
        '</DIV>'

	theBody.appendChild(popmask);
	theBody.appendChild(popcont);

	gPopupMask = document.getElementById("popupMask");
	gPopupContainer = document.getElementById("ext-comp-1001");
	gShadowBox = document.getElementById("ShadowBox");

	gpopBodyBox= document.getElementById("popBodyBox");

	// check to see if this is IE version 6 or lower. hide select boxes if so
	// maybe they'll fix this in version 7?
	var brsVersion = parseInt(window.navigator.appVersion.charAt(0), 10);
	if (brsVersion <= 6 && window.navigator.userAgent.indexOf("MSIE") > -1) {
		gHideSelects = true;
	}
	gPopupContainer.style.display = "none";
	// Add onclick handlers to 'a' elements of class submodal or submodal-width-heigh
}
addEvent(window, "load", initPopUp);
 /**
	* @argument width - int in pixels
	* @argument height - int in pixels
	* @argument url - url to display
	* @argument returnFunc - function to call when returning true from the window.
	* @argument showCloseBox - show the close box - default true
	*/

function showPopWin(Title,url, width, height, returnFunc, showCloseBox,showScrolling) {
    
	//��̬����iframe
	var scrolling = "no";
	if (showScrolling!=null&&showScrolling)
	  scrolling = "auto";
	var iframestring = '<iframe src="'+url+'" style="width:100%;height:100%;background-color:transparent;" scrolling="'+scrolling+'" frameborder="0" allowtransparency="true" id="popupFrame" name="popupFrame" width="100%" height="100%"></iframe>';
	gpopBodyBox.innerHTML = iframestring;
	gPopFrame = document.getElementById("popupFrame");

    if (width >= document.body.clientWidth) {
        width = document.body.clientWidth * 0.95
    } else {
        width = width + 30;
    }

    if (height >= document.body.clientHeight) {
        height = document.body.clientHeight * 0.95
    } else {
        height = height;
    }

    document.getElementById("popupTitle").innerHTML = Title;
	
	// show or hide the window close widget

	if (showCloseBox == null || showCloseBox == true) {
		document.getElementById("ext-gen59").style.display = "block";
	} else {
		document.getElementById("ext-gen59").style.display = "none";
	}

	gPopupIsShown = true;
	disableTabIndexes();
	gPopupMask.style.display = "block";
	gPopupContainer.style.display = "block";

	centerPopWin(width, height);


	gPopupContainer.style.width = width + "px";
	gPopFrame.style.height = height+"px";

	setMaskSize();

	gPopFrame.src = url;
	
	
	gReturnFunc = returnFunc;
	// for IE
	if (gHideSelects == true) {
		hideSelectBoxes();
	}
	
	window.setTimeout("setPopTitle();", 600);
}

//
var gi = 0;
function centerPopWin(width, height) {
	if (gPopupIsShown == true) {
		if (width == null || isNaN(width)) {
			width = gPopupContainer.offsetWidth;
		}
		if (height == null) {
			height = gPopupContainer.offsetHeight;
		}
		
		//var theBody = document.documentElement;
		var theBody = document.getElementsByTagName("BODY")[0];
		theBody.style.overflow = "hidden";
		
		var scTop = parseInt(theBody.scrollTop,10);
		var scLeft = parseInt(theBody.scrollLeft,10);
		
		gPopupMask.style.top = scTop + "px";
		gPopupMask.style.left = scLeft + "px";
		
	
		setMaskSize();
		

		var fullHeight = getViewportHeight();
		var fullWidth = getViewportWidth();
		
		gPopupContainer.style.top = (scTop + ((fullHeight - (height)) / 2)) + "px";
		gPopupContainer.style.left =  (scLeft + ((fullWidth - width) / 2)) + "px";
		
		//alert(fullWidth + " " + width + " " + gPopupContainer.style.left);
	}
}
addEvent(window, "resize", centerPopWin);

window.onscroll = centerPopWin;

/**
 * Sets the size of the popup mask.
 *
 */
function setMaskSize() {
	var theBody = document.getElementsByTagName("BODY")[0];
			
	var fullHeight = getViewportHeight();
	var fullWidth = getViewportWidth();
	
	// Determine what's bigger, scrollHeight or fullHeight / width
	if (fullHeight > theBody.scrollHeight) {
		popHeight = fullHeight;
	} else {
		popHeight = theBody.scrollHeight;
	}
	
	if (fullWidth > theBody.scrollWidth) {
		popWidth = fullWidth;
	} else {
		popWidth = theBody.scrollWidth;
	}
	
	gPopupMask.style.height = popHeight + "px";
	gPopupMask.style.width = popWidth + "px";
	
}

/**
 * @argument callReturnFunc - bool - determines if we call the return function specified
 * @argument returnVal - anything - return value 
 */
function hidePopWin(callReturnFunc) {
	gPopupIsShown = false;
	var theBody = document.getElementsByTagName("BODY")[0];
	theBody.style.overflow = "";
	restoreTabIndexes();
	if (gPopupMask == null) {
		return;
	}
	gPopupMask.style.display = "none";
	gPopupContainer.style.display = "none";
	if (callReturnFunc == true && gReturnFunc != null) {
		gReturnFunc(window.frames["popupFrame"].returnVal);
	}
	gPopFrame.src = gDefaultLogin;
	// display all select boxes
	if (gHideSelects == true) {
		displaySelectBoxes();
	}
}

/**
 * Sets the popup title based on the title of the html document it contains.
 * Uses a timeout to keep checking until the title is valid.
 */
function setPopTitle() {
	return;
	if (window.frames["popupFrame"].document.title == null) {
		window.setTimeout("setPopTitle();", 10);
	} else {
		document.getElementById("popupTitle").innerHTML = window.frames["popupFrame"].document.title;
	}
}

// Tab key trap. iff popup is shown and key was [TAB], suppress it.
// @argument e - event - keyboard event that caused this function to be called.
function keyDownHandler(e) {
    if (gPopupIsShown && e.keyCode == 9)  return false;
}

// For IE.  Go through predefined tags and disable tabbing into them.
function disableTabIndexes() {
	if (document.all) {
		var i = 0;
		for (var j = 0; j < gTabbableTags.length; j++) {
			var tagElements = document.getElementsByTagName(gTabbableTags[j]);
			for (var k = 0 ; k < tagElements.length; k++) {
				gTabIndexes[i] = tagElements[k].tabIndex;
				tagElements[k].tabIndex="-1";
				i++;
			}
		}
	}
}

// For IE. Restore tab-indexes.
function restoreTabIndexes() {
	if (document.all) {
		var i = 0;
		for (var j = 0; j < gTabbableTags.length; j++) {
			var tagElements = document.getElementsByTagName(gTabbableTags[j]);
			for (var k = 0 ; k < tagElements.length; k++) {
				tagElements[k].tabIndex = gTabIndexes[i];
				tagElements[k].tabEnabled = true;
				i++;
			}
		}
	}
}


/**
* Hides all drop down form select boxes on the screen so they do not appear above the mask layer.
* IE has a problem with wanted select form tags to always be the topmost z-index or layer
*
* Thanks for the code Scott!
*/
function hideSelectBoxes() {
	for(var i = 0; i < document.forms.length; i++) {
		for(var e = 0; e < document.forms[i].length; e++){
			if(document.forms[i].elements[e].tagName == "SELECT") {
				document.forms[i].elements[e].style.visibility="hidden";
			}
		}
	}
}

/**
* Makes all drop down form select boxes on the screen visible so they do not reappear after the dialog is closed.
* IE has a problem with wanted select form tags to always be the topmost z-index or layer
*/
function displaySelectBoxes() {
	for(var i = 0; i < document.forms.length; i++) {
		for(var e = 0; e < document.forms[i].length; e++){
			if(document.forms[i].elements[e].tagName == "SELECT") {
			document.forms[i].elements[e].style.visibility="visible";
			}
		}
	}
}


//showPopWin�϶���ʼ��
     var x0 = 0,y0 = 0,x1 = 0,y1 = 0;
     var moveable = false;
//������ץȡ
     function startDrag(obj) {
         if (event.button == 1) {
             obj.setCapture();
             var win = obj.parentNode;
             x0 = event.clientX - obj.parentNode.offsetLeft;
             y0 = event.clientY - obj.parentNode.offsetTop;
             x1 = parseInt(win.offsetLeft);
             y1 = parseInt(win.offsetTop);
             moveable = true;
         }
     }
//�϶�;
     function drag(obj) {
         var win = obj.parentNode;
         var diff_x = event.clientX - x0;
         var diff_y = event.clientY - y0;
         if (diff_x < 0)diff_x = 0;
         if (diff_y < 0)diff_y = 0;
         if (diff_x > document.body.clientWidth - obj.parentNode.offsetWidth)
             diff_x = document.body.clientWidth - obj.parentNode.offsetWidth;
         if (diff_y > document.body.clientHeight-25)
             diff_y = document.body.clientHeight - 25
         if (moveable) {
                 win.style.left = diff_x+'px';
                 win.style.top = diff_y+'px';
             }
     }
//ֹͣ�϶�;
     function stopDrag(obj) {
         if (moveable) {
             obj.releaseCapture();
             moveable = false;
         }
     }