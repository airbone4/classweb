function getPicPath(idx)
{
 var s =(("0000")+idx.toString()).slice(-4);
 s=s+".jpg";
 return(s);
}
function rndIdx(maxIdx){
 return (Math.floor(Math.random()*maxIdx)+1);
}
function changePic(e)
{
    var aPath=getPicPath(rndIdx(10));
    imgPlay.src=aPath;
}
var mtask;

window.onload=function(e){
    mtask = setInterval(changePic,1000);
    
}

