(function () {
  'use strict';

  // From http://stackoverflow.com/questions/14967647/ (continues on next line)
  // encode-decode-image-with-base64-breaks-image (2013-04-21)
  function fixBinary(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
  }

  var display = document.getElementById('display');
  display.innerHTML = (display.innerHTML || '');

  function log(text) {
    display.innerHTML += "\n" + text;
  }
  var base64 =
    "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB1klEQVR42n2TzytEURTHv3e8N1joRhZG" +
    "zJsoCjsLhcw0jClKWbHwY2GnLGUlIfIP2IjyY2djZTHSMJNQSilFNkz24z0/Ms2MrnvfvMu8mcfZvPvu" +
    "Pfdzz/mecwgKLNYKb0cFEgXbRvwV2s2HuWazCbzKA5LvNecDXayBjv9NL7tEpSNgbYzQ5kZmAlSXgsGG" +
    "XmS+MjhKxDHgC+quyaPKQtoPYMQPOh5U9H6tBxF+Icy/aolqAqLP5wjWd5r/Ip3YXVILrF4ZRYAxDhCO" +
    "J/yCwiMI+/xgjOEzmzIhAio04GeGayIXjQ0wGoAuQ5cmIjh8jNo0GF78QwNhpyvV1O9tdxSSR6PLl51F" +
    "nIK3uQ4JJQME4sCxCIRxQbMwPNSjqaobsfskm9l4Ky6jvCzWEnDKU1ayQPe5BbN64vYJ2vwO7CIeLIi3" +
    "ciYAoby0M4oNYBrXgdgAbC/MhGCRhyhCZwrcEz1Ib3KKO7f+2I4iFvoVmIxHigGiZHhPIb0bL1bQApFS" +
    "9U/AC0ulSXrrhMotka/lQy0Ic08FDeIiAmDvA2HX01W05TopS2j2/H4T6FBVbj4YgV5+AecyLk+Ctvms" +
    "QWK8WZZ+Hdf7QGu7fobMuZHyq1DoJLvUqQrfM966EU/qYGwAAAAASUVORK5CYII=";

  var binary = fixBinary(atob(base64));
  var blob = new Blob([binary], {
    type: 'image/png'
  });
  var url = URL.createObjectURL(blob);
  log('Created a png blob of size: ' + blob.size);
  log('Inserting an img...');
  var img = document.createElement('img');
  img.src = url;
  document.body.appendChild(img);
  log('Blob URL is: ' + url);
  log('Fetching with ajax...');

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'arraybuffer';
  xhr.onreadystatechange = function () {
	  //xhr.send() 以後,如果狀態改變,就執行這個函數
    if (xhr.readyState !== 4) {
      return;
    }
    log('xhr.status is: ' + xhr.status);
    log('returned content-type is: ' + xhr.getResponseHeader('Content-Type'));
    log('returned content-length is: ' + xhr.getResponseHeader('Content-Length'));

    var returnedBlob = new Blob([xhr.response], {
      type: 'image/png'
    });
    var reader = new FileReader();
    reader.onload = function (e) {
      var returnedURL = e.target.result;
      //e.g.: returnedURL = "data:image/png;base64,iVBORw0KGgoA....
      var returnedBase64 = returnedURL.replace(/^[^,]+,/, ''); 
      log('xhr.response (in base64) is: ' + returnedBase64);
      log('is this the expected base64? ' + (returnedBase64 === base64));
    };
    //reader.readAsDataURL(blob); // 原來是這行,但是應該不對。改成下面
	reader.readAsDataURL(returnedBlob); //Convert the blob from clipboard to base64
  };
  xhr.send(); //送出request=> line 47, xhr.open('GET',url)
})();