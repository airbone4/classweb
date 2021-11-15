var app;


function initApp()
{
	app = {

		// Web app variables
		supportsLocalStorage: ("localStorage" in window && window.localStorage !== null),

		init: function() {
			editor.init();
		},

		// Save a key/value pair in localStorage (either Markdown text or enabled features)
		save: function(key, value) {
			if (!this.supportsLocalStorage) return false;

			// Even if localStorage is supported, using it can still throw an exception if disabled or the quota is exceeded
			try {
				localStorage.setItem(key, value);
			} catch (e) {}
		},

		// Restore the editor's state from localStorage (saved Markdown and enabled features)
		restoreState: function(c) {
			var restoredItems = {};

			if (this.supportsLocalStorage) {
				// Even if localStorage is supported, using it can still throw an exception if disabled
				try {
					restoredItems.markdown = localStorage.getItem("markdown");
					restoredItems.isSyncScrollDisabled = localStorage.getItem("isSyncScrollDisabled");
					restoredItems.isFullscreen = localStorage.getItem("isFullscreen");
					restoredItems.activePanel = localStorage.getItem("activePanel");
					restoredItems.fontSizeFactor = localStorage.getItem("fontSizeFactor");
					restoredItems.theme = localStorage.getItem("theme");
				} catch (e) {}
			}

			c(restoredItems);
		},

 

	 
 

	};

	app.init();

}

window.addEventListener("load", initApp);//為甚麼document.addEventListener("load",initEnv)不行s