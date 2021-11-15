var editor,
    $window = window,
    $document=document;
//$window = $(window);

 


function initEnv() {


    editor = {
        // markdown: "",
        markdownSource: document.getElementById("markdown"),  
        markdownHtml: document.getElementById("html"),
        markdownPreview: $window.preview,
        markdownTargets: [document.html, $window.preview],
        
		init: function() {
            this.worker = new showdown.Converter();            
			//this.onloadEffect(0);
			//this.initBindings();
			//this.fitHeight();
			// this.restoreState(function() {
			// 	editor.onInput();
			// 	editor.onloadEffect(1);
			// });
            //settings.initBindings();
            this.initBindings();
			this.restoreState(function(e) {
                //這裡的this 是window物件
                markdown.value=e.markdown;//回存
				this.editor.onInput(false);//回存
				//editor.onloadEffect(1);
			});


            
		},    
        initBindings: function () {
            $window.addEventListener("resize", function () {
                //editor.fitHeight();
                console.log("resize");
            });
            this.markdownSource.addEventListener("keydown", function(e) {
                            //xnode:
                            //在main.html中有一個textarea id= "markdown"在這裡打入MD，前面第18行設定
                            //editor 就是this
                            if (!e.ctrlKey && e.keyCode == keyCode.TAB) editor.handleTabKeyPress(e);
                        });
            this.markdownSource.addEventListener("input",function() {
                editor.onInput(true);
            });
            this.markdownPreview.addEventListener("xxx",function(e){
                //hljs.highlightBlock(this);//send from preview, so this="preview"
                document.querySelectorAll("div pre code").forEach(function(block){
                    hljs.highlightBlock(block);//send from preview, so this="preview"
                });
                //hljs.initLineNumbersOnLoad({ singleLine: true}); 
    
            });            
        },
        convertMarkdown:function(isAfterUserInput){
            var text = this.worker.makeHtml(this.markdown);
            html.value = text;
            //preview.src = "data:text/html," + text;
            preview.innerHTML= text;
            preview.dispatchEvent(new Event("xxx"));
        },
 

		// Save a key/value pair in localStorage (either Markdown text or enabled features)
		save: function(key, value) {

			try {
				localStorage.setItem(key, value);
			} catch (e) {}
        },

		// Restore the editor's state from localStorage (saved Markdown and enabled features)
		restoreState: function(c) {
			var restoredItems = {};


				// Even if localStorage is supported, using it can still throw an exception if disabled
				try {
					restoredItems.markdown = localStorage.getItem("markdown");
					//restoredItems.isSyncScrollDisabled = localStorage.getItem("isSyncScrollDisabled");
					//restoredItems.isFullscreen = localStorage.getItem("isFullscreen");
					//restoredItems.activePanel = localStorage.getItem("activePanel");
					//restoredItems.fontSizeFactor = localStorage.getItem("fontSizeFactor");
					//restoredItems.theme = localStorage.getItem("theme");
				} catch (e) {}


			c(restoredItems);
		},
        //使用者改變#markdown(var=markdownSource) textarea 內容的時候,觸發這裡
        onInput: function (isUserInput) {
            var updatedMarkdown = this.markdownSource.value;
    
            if (updatedMarkdown != this.markdown) { //內容不相等的時候,才updatemarkdown
                this.markdown = updatedMarkdown;
                this.onChange(isUserInput);
            }
        },
    
        onChange: function (isAfterUserInput) {
            this.save("markdown", this.markdown);
            this.convertMarkdown(isAfterUserInput);
        },
    }; //end of editor
    editor.init();
}
window.addEventListener("load", initEnv);//為甚麼document.addEventListener("load",initEnv)不行s
/*
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        initEnv();
    }
};
*/