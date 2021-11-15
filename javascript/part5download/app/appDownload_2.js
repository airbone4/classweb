var app, adoc,lks;
async function getlink()
{
    var allLinks = document.links;
    for (var i=0; i<allLinks.length; i++) {
        if(/\.pdf$/g.test(allLinks[i].href)){
           var ele = adoc.createElement("a")
           var s=allLinks[i].href;
           ele.href=s;
           var fname = s.substr(s.lastIndexOf("/")+1)
           ele.innerHTML=fname;
           ele.download=fname;
           ele.taget="_blank";
           adoc.body.appendChild(ele);
           //adoc.body.appendChild(adoc.CreateElement("br"));
        }
      
    }
}

function getNext(i) {
    if (i >= lks.length) {
      return;
    }
    lks[i].click();
    setTimeout(function() {
      getNext(i + 1);
    }, 500);

  // Initiate the first download.
  getNext(i+1);
}
function dogetfile()
{
    lks = adoc.links;
    getNext(0);
}
app=window.open(); //open 裡面如果有URL,會跟目前文件的伺服器要求,當然會拿不到。
adoc=app.document;
getlink(adoc).then(dogetfile)
