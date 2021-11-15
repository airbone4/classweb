"use strict";

var $window = window;
$window.addEventListener("load", function () {
	"use strict";

	var wasLastHtmlUpdateAfterUserInput = null,
	   

	// Post messages to the parent window
	messageParent = function messageParent(data) {
		parent.postMessage(data, "*");
	},
	   

	// Receive messages sent to this iframe (from the parent window)
	receiveMessage = function receiveMessage(e) {
		//var data = e.originalEvent.data;
		var data = e.data;

		if (data.hasOwnProperty("html")) updateHtml(data.html, data.isAfterUserInput);
		if (data.hasOwnProperty("scrollLineIntoView")) scrollLineIntoView(data.scrollLineIntoView, data.lineCount);
		if (data.hasOwnProperty("fontSizeCssIncrement")) updateFontSize(data.fontSizeCssIncrement);
		if (data.hasOwnProperty("themeStylesheet")) useTheme(data.themeStylesheet);
	},
	   

	// Send the iframe's height to the parent window
	postHeight = function postHeight() {
		messageParent({
			height: $body.height(),
			isAfterUserInput: wasLastHtmlUpdateAfterUserInput
		});
	},
	   

	// Send the iframe's height and text to the parent window
	postAll = function postAll() {
		messageParent({
			height: $body.height(),
			text: $body.text(),
			isAfterUserInput: wasLastHtmlUpdateAfterUserInput
		});
	},
	    updateHtml = function updateHtml(html, isAfterUserInput) {
		//body.html(html);
		//this.ipreview.body.innerHTML=html;//有沒有其他方法可以在preview.js 找到preview.html ?
		preview.innerHTML=html;
		wasLastHtmlUpdateAfterUserInput = isAfterUserInput;
        preview.dispatchEvent(new Event("xxx")); 
		//postAll();

		// If there are images, the height of the iframe has to be manually updated to reflect the height of the images
		// Thus, wait for all images to load, then send the actual height to the parent window
		//preview.onImagesLoad(postHeight);
	},
	   

	// When scrolling a line into view, the parent window is the one doing the job.
	// The iframe is only sollicited to run the numbers and post back the top and
	// bottom offsets of the element(s) surrounding the given source line, since
	// it requires access to the preview's DOM for that.
	scrollLineIntoView = function scrollLineIntoView(line, lineCount) {
		var offsets = preview.getSourceLineOffset(line, lineCount);
		messageParent({ scrollMarkdownPreviewIntoViewAtOffset: offsets });
	},
	    updateFontSize = function updateFontSize(cssIncrement) {
		updateElFontSize($body, cssIncrement);
		postHeight();
	},
	    useTheme = function useTheme(stylesheet) {
		document.getElementById("theme").setAttribute("href", stylesheet);
	};
    this.window.addEventListener('message',receiveMessage)
	this.preview.addEventListener("xxx",function(e){
		//hljs.highlightBlock(this);//send from preview, so this="preview"

		this.querySelectorAll("pre code").forEach(function(block){
			hljs.highlightBlock(block);//send from preview, so this="preview"
		});
		//hljs.initLineNumbersOnLoad({ singleLine: true}); 

	});     

});