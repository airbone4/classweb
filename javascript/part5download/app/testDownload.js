function domulti()
{
    
function getNext(i) {
    if (i >= lks.length) {
      return;
    }
    console.log("I am (" +i+") [" + lks[i].download+"]")
    lks[i].target="_blank";
    lks[i].click();
    setTimeout(function() {
      getNext(i+1);
    }, 500);

  // Initiate the first download.
  //getNext(i+1);
}
getNext(0);
}

    lks = document.links;
    domulti();
