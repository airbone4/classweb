 

function stopPlay()
{
    clearInterval(mtask);
    alert("stop!");
}
var oldload=window.onload;
window.onload = function(e){
    oldload && oldload();  
    setTimeout(stopPlay,1000*10);
}
