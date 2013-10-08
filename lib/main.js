var data = require("sdk/self").data;
var widgets = require("sdk/widget");
var tabs = require('sdk/tabs');
var selection = require("sdk/selection");
var note = "";

selection.on("select", function() {
	note = selection.text ? selection.text : "";
});

var panel = require("sdk/panel").Panel({
	width: 500,
	height: 600,
	contentURL: data.url("bookmarklet.html"),
	contentScriptFile: data.url("bookmarklet.js"),
	onShow: function() {
		panel.port.emit("show", { url: tabs.activeTab.url, title: tabs.activeTab.title, note: note });
	}
});

panel.port.on("close-me", function() {
	panel.hide();
});

var widget = widgets.Widget({
	id: "delicious-bookmarklet-link",
	label: "Delicious Bookmarklet",
	contentURL: "http://delicious.com/favicon.ico",
	panel: panel
});

