
tinyMCE.importPluginLanguagePack("paste", "en,tr,sv,cs,zh_cn,zh_cn_utf8,fr_ca,da,he,nb,de,hu,ru,ru_KOI8-R,ru_UTF-8,nn,fi,es,cy,is,pl,nl,fr,pt_br");
var TinyMCE_PastePlugin = {getInfo:function () {
	return {longname:"Paste text/word", author:"Moxiecode Systems", authorurl:"http://tinymce.moxiecode.com", infourl:"http://tinymce.moxiecode.com/tinymce/docs/plugin_paste.html", version:tinyMCE.majorVersion + "." + tinyMCE.minorVersion};
}, initInstance:function (inst) {
	//if (tinyMCE.isMSIE && tinyMCE.getParam("paste_auto_cleanup_on_paste", false)) {
	//	tinyMCE.addEvent(inst.getBody(), "paste", TinyMCE_PastePlugin._handlePasteEvent);
	//}
}, getControlHTML:function (cn) {
	switch (cn) {
	  case "pastetext":
		return tinyMCE.getButtonHTML(cn, "lang_paste_text_desc", "{$pluginurl}/images/pastetext.gif", "mcePasteText", true);
	  case "pasteword":
		return tinyMCE.getButtonHTML(cn, "lang_paste_word_desc", "{$pluginurl}/images/pasteword.gif", "mcePasteWord", true);
	  case "selectall":
		return tinyMCE.getButtonHTML(cn, "lang_selectall_desc", "{$pluginurl}/images/selectall.gif", "mceSelectAll", true);
	}
	return "";
}, execCommand:function (editor_id, element, command, user_interface, value) {
	switch (command) {
	  case "mcePasteText":
		if (user_interface) {
			if ((tinyMCE.isMSIE && !tinyMCE.isOpera) && !tinyMCE.getParam("paste_use_dialog", false)) {
				TinyMCE_PastePlugin._insertText(clipboardData.getData("Text"), true);
			} else {
				var template = new Array();
				template["file"] = "../../plugins/paste/pastetext.htm";
				template["width"] = 450;
				template["height"] = 400;
				var plain_text = "";
				tinyMCE.openWindow(template, {editor_id:editor_id, plain_text:plain_text, resizable:"yes", scrollbars:"no", inline:"yes", mceDo:"insert"});
			}
		} else {
			TinyMCE_PastePlugin._insertText(value["html"], value["linebreaks"]);
		}
		return true;
	  case "mcePasteWord":
		if (user_interface) {
			if ((tinyMCE.isMSIE && !tinyMCE.isOpera) && !tinyMCE.getParam("paste_use_dialog", false)) {
				var html = TinyMCE_PastePlugin._clipboardHTML();
				if (html && html.length > 0) {
					html = cleanWordString(html);
					TinyMCE_PastePlugin._insertWordContent(html);
					//tinyMCE.execCommand("mceInsertContent", false, html)
				}
			} else {
				var template = new Array();
				template["file"] = "../../plugins/paste/pasteword.htm";
				template["width"] = 450;
				template["height"] = 400;
				var plain_text = "";
				tinyMCE.openWindow(template, {editor_id:editor_id, plain_text:plain_text, resizable:"yes", scrollbars:"no", inline:"yes", mceDo:"insert"});
			}
		} else {
			TinyMCE_PastePlugin._insertWordContent(value);
		}
		return true;
	  case "mceSelectAll":
		tinyMCE.execInstanceCommand(editor_id, "selectall");
		return true;
	}
	return false;
}, _handlePasteEvent:function (e) {
	switch (e.type) {
	  case "paste":
		var html = TinyMCE_PastePlugin._clipboardHTML();
		tinyMCE.execCommand("delete");
		if (html && html.length > 0) {
			tinyMCE.execCommand("mcePasteWord", false, html);
		}
		tinyMCE.cancelEvent(e);
		return false;
	}
	return true;
}, _insertText:function (content, bLinebreaks) {
	if (content && content.length > 0) {
		if (bLinebreaks) {
			if (tinyMCE.getParam("paste_create_paragraphs", true)) {
				var rl = tinyMCE.getParam("paste_replace_list", "\u2122,<sup>TM</sup>,\u2026,...,\u201c|\u201d,\",\u2019,',\u2013|\u2014|\u2015|\u2212,-").split(",");
				for (var i = 0; i < rl.length; i += 2) {
					content = content.replace(new RegExp(rl[i], "gi"), rl[i + 1]);
				}
				content = tinyMCE.regexpReplace(content, "\r\n\r\n", "</p><p>", "gi");
				content = tinyMCE.regexpReplace(content, "\r\r", "</p><p>", "gi");
				content = tinyMCE.regexpReplace(content, "\n\n", "</p><p>", "gi");
				if ((pos = content.indexOf("</p><p>")) != -1) {
					tinyMCE.execCommand("Delete");
					var node = tinyMCE.selectedInstance.getFocusElement();
					var breakElms = new Array();
					do {
						if (node.nodeType == 1) {
							if (node.nodeName == "TD" || node.nodeName == "BODY") {
								break;
							}
							breakElms[breakElms.length] = node;
						}
					} while (node = node.parentNode);
					var before = "", after = "</p>";
					before += content.substring(0, pos);
					for (var i = 0; i < breakElms.length; i++) {
						before += "</" + breakElms[i].nodeName + ">";
						after += "<" + breakElms[(breakElms.length - 1) - i].nodeName + ">";
					}
					before += "<p>";
					content = before + content.substring(pos + 7) + after;
				}
			}
			if (tinyMCE.getParam("paste_create_linebreaks", true)) {
				content = tinyMCE.regexpReplace(content, "\r\n", "<br />", "gi");
				content = tinyMCE.regexpReplace(content, "\r", "<br />", "gi");
				content = tinyMCE.regexpReplace(content, "\n", "<br />", "gi");
			}
		}
		tinyMCE.execCommand("mceInsertRawHTML", false, content);
	}
}, _insertWordContent:function (content) {
	if (content && content.length > 0) {
		var bull = String.fromCharCode(8226);
		var middot = String.fromCharCode(183);
		var cb;
		if ((cb = tinyMCE.getParam("paste_insert_word_content_callback", "")) != "") {
			content = eval(cb + "('before', content)");
		}
		var rl = tinyMCE.getParam("paste_replace_list", "\u2122,<sup>TM</sup>,\u2026,...,\u201c|\u201d,\",\u2019,',\u2013|\u2014|\u2015|\u2212,-").split(",");
		for (var i = 0; i < rl.length; i += 2) {
			content = content.replace(new RegExp(rl[i], "gi"), rl[i + 1]);
		}
		if (tinyMCE.getParam("paste_convert_headers_to_strong", false)) {
			content = content.replace(new RegExp("<p class=MsoHeading.*?>(.*?)</p>", "gi"), "<p><b>$1</b></p>");
		}
		content = content.replace(new RegExp("tab-stops: list [0-9]+.0pt\">", "gi"), "\">" + "--list--");
		content = content.replace(new RegExp(bull + "(.*?)<BR>", "gi"), "<p>" + middot + "$1</p>");
		content = content.replace(new RegExp("<SPAN style=\"mso-list: Ignore\">", "gi"), "<span>" + bull);
		content = content.replace(/<o:p><\/o:p>/gi, "");
		content = content.replace(new RegExp("<br style=\"page-break-before: always;.*>", "gi"), "-- page break --");
		content = content.replace(new RegExp("<(!--)([^>]*)(--)>", "g"), "");
		//content = content.replace(/<\/?span[^>]*>/gi, "");
		//content = content.replace(new RegExp("<(\\w[^>]*) style=\"([^\"]*)\"([^>]*)", "gi"), "<$1$3");
		content = content.replace(/<\/?font[^>]*>/gi, "");
		switch (tinyMCE.getParam("paste_strip_class_attributes", "all")) {
		  case "all":
			content = content.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3");
			break;
		  case "mso":
			content = content.replace(new RegExp("<(\\w[^>]*) class=\"?mso([^ |>]*)([^>]*)", "gi"), "<$1$3");
			break;
		}
		content = content.replace(new RegExp("href=\"?" + TinyMCE_PastePlugin._reEscape("" + document.location) + "", "gi"), "href=\"" + tinyMCE.settings["document_base_url"]);
		content = content.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
		content = content.replace(/<\\?\?xml[^>]*>/gi, "");
		content = content.replace(/<\/?\w+:[^>]*>/gi, "");
		content = content.replace(/-- page break --\s*<p>&nbsp;<\/p>/gi, "");
		content = content.replace(/-- page break --/gi, "");
		if (!tinyMCE.settings["force_p_newlines"]) {
			content = content.replace("", "", "gi");
			content = content.replace("</p>", "<br /><br />", "gi");
		}
		if (!tinyMCE.isMSIE && !tinyMCE.settings["force_p_newlines"]) {
			content = content.replace(/<\/?p[^>]*>/gi, "");
		}
		content = content.replace(/<\/?div[^>]*>/gi, "");
		if (tinyMCE.getParam("paste_convert_middot_lists", true)) {
			var div = document.createElement("div");
			div.innerHTML = content;
			var className = tinyMCE.getParam("paste_unindented_list_class", "unIndentedList");
			while (TinyMCE_PastePlugin._convertMiddots(div, "--list--")) {
			}
			while (TinyMCE_PastePlugin._convertMiddots(div, middot, className)) {
			}
			while (TinyMCE_PastePlugin._convertMiddots(div, bull)) {
			}
			content = div.innerHTML;
		}
		if (tinyMCE.getParam("paste_convert_headers_to_strong", false)) {
			content = content.replace(/<h[1-6]>&nbsp;<\/h[1-6]>/gi, "<p>&nbsp;&nbsp;</p>");
			content = content.replace(/<h[1-6]>/gi, "<p><b>");
			content = content.replace(/<\/h[1-6]>/gi, "</b></p>");
			content = content.replace(/<b>&nbsp;<\/b>/gi, "<b>&nbsp;&nbsp;</b>");
			content = content.replace(/^(&nbsp;)*/gi, "");
		}
		content = content.replace(/--list--/gi, "");
		if ((cb = tinyMCE.getParam("paste_insert_word_content_callback", "")) != "") {
			content = eval(cb + "('after', content)");
		}
		tinyMCE.execCommand("mceInsertContent", false, content);
		window.setTimeout("tinyMCE.execCommand(\"mceCleanup\");", 1);
	}
}, _reEscape:function (s) {
	var l = "?.\\*[](){}+^$:";
	var o = "";
	for (var i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (l.indexOf(c) != -1) {
			o += "\\" + c;
		} else {
			o += c;
		}
	}
	return o;
}, _convertMiddots:function (div, search, class_name) {
	var mdot = String.fromCharCode(183);
	var bull = String.fromCharCode(8226);
	var nodes = div.getElementsByTagName("p");
	for (var i = 0; i < nodes.length; i++) {
		var p = nodes[i];
		if (p.innerHTML.indexOf(search) != -1) {
			var ul = document.createElement("ul");
			if (class_name) {
				ul.className = class_name;
			}
			var li = document.createElement("li");
			li.innerHTML = p.innerHTML.replace(new RegExp("" + mdot + "|" + bull + "|--list--|&nbsp;", "gi"), "");
			ul.appendChild(li);
			var np = p.nextSibling;
			while (np) {
				if (np.nodeType != 1 || np.innerHTML.indexOf(search) == -1) {
					break;
				}
				var cp = np.nextSibling;
				var li = document.createElement("li");
				li.innerHTML = np.innerHTML.replace(new RegExp("" + mdot + "|" + bull + "|--list--|&nbsp;", "gi"), "");
				np.parentNode.removeChild(np);
				ul.appendChild(li);
				np = cp;
			}
			p.parentNode.replaceChild(ul, p);
			return true;
		}
	}
	return false;
}, _clipboardHTML:function () {
	var div = document.getElementById("_TinyMCE_clipboardHTML");
	if (!div) {
		var div = document.createElement("DIV");
		div.id = "_TinyMCE_clipboardHTML";
		with (div.style) {
			visibility = "hidden";
			overflow = "hidden";
			position = "absolute";
			width = 1;
			height = 1;
		}
		document.body.appendChild(div);
	}
	div.innerHTML = "";
	var rng = document.body.createTextRange();
	rng.moveToElementText(div);
	rng.execCommand("Paste");
	var html = div.innerHTML;
	div.innerHTML = "";
	return html;
}};
tinyMCE.addPlugin("paste", TinyMCE_PastePlugin);

