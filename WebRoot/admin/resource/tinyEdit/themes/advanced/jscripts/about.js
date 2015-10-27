function init() {
	var inst;

	tinyMCEPopup.resizeToInnerSize();
	inst = tinyMCE.selectedInstance;

	var tcont = document.getElementById('plugintablecontainer');
	var plugins = tinyMCE.getParam('plugins', '', true, ',');
	if (plugins.length == 0)
		document.getElementById('plugins_tab').style.display = 'none';

	var html = "";
	html += '<table id="plugintable">';
	html += '<thead>';
	html += '<tr>';
	html += '<td>' + tinyMCE.getLang('lang_plugin') + '</td>';
	html += '<td>' + tinyMCE.getLang('lang_author') + '</td>';
	html += '<td>' + tinyMCE.getLang('lang_version') + '</td>';
	html += '</tr>';
	html += '</thead>';
	html += '<tbody>';

	for (var i=0; i<inst.plugins.length; i++) {
		var info = getPluginInfo(inst.plugins[i]);

		html += '<tr>';

		if (info.infourl != null && info.infourl != '')
			html += '<td width="50%" title="' + plugins[i] + '"><a href="' + info.infourl + '" target="mceplugin">' + info.longname + '</a></td>';
		else
			html += '<td width="50%" title="' + plugins[i] + '">' + info.longname + '</td>';

		if (info.authorurl != null && info.authorurl != '')
			html += '<td width="35%"><a href="' + info.authorurl + '" target="mceplugin">' + info.author + '</a></td>';
		else
			html += '<td width="35%">' + info.author + '</td>';

		html += '<td width="15%">' + info.version + '</td>';
		html += '</tr>';
	}

	html += '</tbody>';
	html += '</table>';

	tcont.innerHTML = html;
}

function getPluginInfo(name) {
	if (tinyMCE.plugins[name].getInfo)
		return tinyMCE.plugins[name].getInfo();

	return {
		longname : name,
		authorurl : '',
		infourl : '',
		author : '--',
		version : '--'
	};
}
