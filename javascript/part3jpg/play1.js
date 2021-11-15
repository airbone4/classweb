function getPath(idx)
{
    return (("00000"+String(idx)).slice(-4)+".jpg");
}
var idx=0;
function mPlay()
{
    imgPlay.src=getPath(idx);
    idx=(idx+1) % 20 ;

}
setInterval(mPlay,200);