# first markdown 
目的:撰寫簡單的markdown
大綱:如何利用現有的 javascript library
## 介紹
markdown 也是一種語言,目的是簡化html文件的編寫。也就是把一般的文字檔案,轉譯為html。
githut 上面的README.MD,也是markdown規格。

## html example
根據人名,動態的改變打招呼提示串:
### 方法1:
``` html
<html>
<body>
<script>
var s1 = prompt("your name")
var helloStr = `hello, ${s1}. how is totay?`;
alert(helloStr)
// var x=prompt("your name")
// alert("hello  " + x)

</script>

</body>
</html>
```
### 方法2

 ``` html
<html>
<body>

<script>
 var x=prompt("your name")
 alert("hello  " + x)
</script>

</body>
</html>
```   


## javascript example

``` js
var x=5
x=x+1

```

## JavaScript for  loop

``` js

for (i=0;i<5;i++){
 console.log(i)
}

for (i=5;i>0;i--){
 console.log(i)
}

```

---
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/atelier-seaside-light.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.5.0/highlightjs-line-numbers.min.js"></script>
<script>
hljs.initLineNumbersOnLoad({ singleLine: true});
</script>