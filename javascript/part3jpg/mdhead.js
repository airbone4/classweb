
  function resizeIframe(obj) {
	  obj.style.height=0;
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }

function loadHtml(url) //<X>
{
    var scripts = document.getElementsByTagName('script');
    var me = scripts[scripts.length - 1];
    var aframe = document.createElement("iframe");
    aframe.src = url;
    aframe.width = "100%";
    //aframe.style = "height: 730px;";
    aframe.onload =  resizeIframe;//"this.style.height=this.contentDocument.body.scrollHeight +'px';"
    me.parentNode.insertBefore(aframe, me.nextSibling);
    //我的上層,調用insertBefore(),插到我的下一個同輩(me.nextSibling)	
}

function loadScript(url, callback) 
{
    // adding the script tag to the head as suggested before
    var head = document.head; //document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true; //<1>
    script.src = url;

    //script.onreadystatechange = callback; //需不需要這行?
    script.onload = callback;

    // fire the loading
    head.appendChild(script);
}

function loadCss() //<X>
{

    var n1 = document.createElement("link")
    n1.rel = "stylesheet"
    n1.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/atelier-seaside-light.min.css"
    document.head.appendChild(n1);
}

function loadCommon() 
{
    loadCss();
}
highlightIt = function(e) //<3>
{
    //var all = document.querySelectorAll(".code") //應該是只有"code"?
    var all = document.getElementsByTagName("code");
    for (var i = 0; i < all.length; i++) {
        hljs.highlightBlock(all[i])
    }

}

NumberIt = function(e) //<3>
{
    
    var all = document.getElementsByTagName("code");
    for (var i = 0; i < all.length; i++) {
        hljs.lineNumbersBlock(all[i])
    }

}

function mdEnd(){
	
loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js", highlightIt)	

loadScript("https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.5.0/highlightjs-line-numbers.min.js", NumberIt)	
}