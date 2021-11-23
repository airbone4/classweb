var app, adoc;
async function getlink()
//將目前網頁中的PDF連結,抽出來成為另一個文件
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
           ele.target="_blank";//★
           adoc.body.appendChild(ele);
           //adoc.body.appendChild(adoc.CreateElement("br"));
        }
      
    }
}

function dogetfile()
{
    var lks = adoc.links;
    console.log("total:  "+ adoc.length)
    for(i=0;i<lks.length;i++)
    {
     lks[i].click()  ;
    }
}
app=window.open(); //open 裡面如果有東西,會跟目前文件的伺服器要求,當然會拿不到。
adoc=app.document;
getlink(adoc).then(dogetfile)
