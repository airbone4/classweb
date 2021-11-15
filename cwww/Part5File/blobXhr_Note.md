
先看[blob介紹](whatIsBlob.html)

@import "blobXhr_1.html" {code_block=true,"class=line-numbers"}

`<pre id=display>`顯示訊息用

## blobXhr_1.js
@import "blobXhr_1.js" {code_block=true,"class=line-numbers"}

想要測試讀取URL時的影像轉換。看看能不能拿到一樣的base64

> L33: 利用`binary = fixBinary(atob(base64))` 將base64轉成矩陣(raw data)。

> L34: 從binary建立一個blob。

>L37: url  <-  createObjectURL()建立blob url。將二進位陣列轉為 blob 型態的url(`url=URL.createObjectURL(blob)`)

L46-L72的流程:  
1. 利用XMLHttpRequest()要求從L37建立的 url 要求ArrayBuffer(L48),
1. 然後利用xhr.reponse建立 returnedBlob
1. L63-67 從 returnedBlob 建立base64

最後比較 returnBlob的base64 和原始base64 一不一樣。

> line 48 : 因為指定`reponseType='arraybuffer'所以line 57 的debug結果是ArrayBuffer
在 XMLHttpRequest Level 1 規範中，responseType，用來指定回應的類型(預設值為空字串)，可設定的數值有 'arraybuffer'、'blob'、'document'、'json' 與 'text'。

> line 57:  xhr.response 的內容如下(F12),是陣列,直接拿來建立Blob
```js

ArrayBuffer(527) {}
[[Int8Array]]: Int8Array(527) [-119, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 16, 0, 0, 0, 16, 8, 6, 0, 0, 0, 31, -13, -1, 97, 0, 0, 1, -42, 73, 68, 65, 84, 120, -38, 125, -109, -49, 43, 68, 81, 20, -57, -65, 119, -68, 55, 88, -24, 70, 22, 70, -52, -101, 40, 10, 59, 11, -123, -52, 52, -116, 41, 74, 89, -79, -16, 99, 97, -89, 44, 101, 37, 33, -14, 15, -40, -120, -14, 99, 103, 99, 101, 49, -46, 48, -109, 80, 74, 41, 69, 54, …]
[[Uint8Array]]: Uint8Array(527) [137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 16, 0, 0, 0, 16, 8, 6, 0, 0, 0, 31, 243, 255, 97, 0, 0, 1, 214, 73, 68, 65, 84, 120, 218, 125, 147, 207, 43, 68, 81, 20, 199, 191, 119, 188, 55, 88, 232, 70, 22, 70, 204, 155, 40, 10, 59, 11, 133, 204, 52, 140, 41, 74, 89, 177, 240, 99, 97, 167, 44, 101, 37, 33, 242, 15, 216, 136, 242, 99, 103, 99, 101, 49, 210, 48, 147, 80, 74, 41, 69, 54, …]
byteLength: (...)__proto__: ArrayBuffer
```
L63: `returnedURL = "data:image/png;base64,iVBORw0KGgoA....`

`var returnedBase64 = returnedURL.replace(/^[^,]+,/, ''); `
從字串頭開始(第1個`^`)
`[^,]+,`:除了`,`這個字元以外,至少一個以上,一直到`,` 結束,都殺掉。


## 分部解說

### atob(),btoa() 
兩個函數分別是 base64 的編碼、解碼,都是字串。
### charCodeAt
charCodeAt() 方法可返回指定位置的字符的 Unicode 編碼。

範例
```js
var sentence = 'The quick brown fox jumped over the lazy dog.';
var index = 4;
console.log('The character code ' + sentence.charCodeAt(index) + ' is equal to ' + sentence.charAt(index));
// expected output: "The character code 113 is equal to q"
```
範例: Convert a base64 string into a binary Uint8 Array
``` js
var BASE64_MARKER = ';base64,';

function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}
```

主程式碼中的fixBinary

``` js
function fixBinary(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
  }
```
bin 雖然是二進位,但是typeof(bin)=string;
charCodeAt()將裡面的每一元素以code 方式讀取。

更進一步的說明,參見[base64編碼問題](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding)或[這裡](https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings)。
### ArrayBuffer
語意上 ArrayBuffer 就只是一個陣列。但是要存取內容,必須經由unit8array 或 unit16array 。 這也是為甚麼後綴buffer的原因。

例如,如果ArrayBuffer 是一個16位元的unsigned 整數,那麼我們可以利用 Uint16Array 來解釋裡面的數字,並且利用[]存取：

假定 buf 的內容以如下的 bytes [0x02, 0x01, 0x03, 0x07](注意,　multibyte 的值會根據CPU而不同,例如在X86中為little-endian )
``` js
var bufView = new Uint16Array(buf);
if (bufView[0]===258) {   // 258 === 0x0102
  console.log("ok");
}
bufView[0] = 255;    // buf now contains the bytes [0xFF, 0x00, 0x03, 0x07]
bufView[0] = 0xff05; // buf now contains the bytes [0x05, 0xFF, 0x03, 0x07]
bufView[1] = 0x0210; // buf now contains the bytes [0x05, 0xFF, 0x10, 0x02]
```