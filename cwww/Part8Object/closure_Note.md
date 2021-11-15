

# 立即函數
Immediately Invoked Functions Expressions (IIFEs)


打招呼程式,一般的寫法:

方法1
```js {class="line-numbers"}
function hello(name){
  console.log("hello "+ name)
}
hello("lee3")
```
方法2

```js {class="line-numbers"}
var hello=function (name){
  console.log("hello "+ name)
}
hello("lee4")
```


對照立即函數:
``` js {class="line-numbers"}
(function (name){
  console.log('hello '+name)
})("lee4")
```
立即函數也可以想成是匿名函數,用過即丟。

問:可不可以這樣寫?為甚麼
```js
var hello=function (name){
  console.log("hello "+ name)
}('lee4')
hello("chung3")
```
hint: 立即函數,也是一個函數。也就是執行結果,指派給hello 因此,hello這個變數本身不是函數,而是未定義,因為函數BODY沒有return任何值。所以,hello = `undefined`。




#closure 
## 計數器

利用總體變數,寫計數器:
``` js {class="line-numbers"}
var counter=0;
function count(){
  counter=counter+1;
}
```

syntax:
`()()`
`(匿名函數定義) (參數)`

但是上面的程式碼只能執行一次。可以改寫成

```js
var hello=(function (name){
  console.log('hello '+name)
})("lee3")

```

### 利用closure:


```js {class="line-numbers"}
function count(){
  var counter = 0;

  return function(){
    return ++counter;
  }
}
```

但是如果我們需要的計數器不是從0開始?
[closure_test1.html](clusure_test1.html)

```js {class="line-numbers"}
function count(init){
    var counter = init;
  
    return function(){
      return ++counter;
    }
  }
 
  
  var countFrom2 = count(2);
  var countFrom1 = count(1);
  
  console.log( countFrom2() );   // 3
  console.log( countFrom2() );   // 4
    
  console.log( countFrom1() );   // 2
  console.log( countFrom1() );   // 3    
```

上面的寫法,看起來像是一個物件寫法。但是,
`typeof(count)` 跟我們說,這是一個"function"。
`typeof(countFrom2)` 也是一個"function"
同時，下面的例子可以讓我們再仔細想想到底closure 是甚麼。
```js {class="line-numbers"}

function count(init){
  
    return function(){
      return ++init;
    }
  }
  
  
  var countFrom2 = count(2);
  var countFrom1 = count(1);
  
  console.log( countFrom2() );   // 3
  console.log( countFrom2() );   // 4
    
  console.log( countFrom1() );   // 2
  console.log( countFrom1() );   // 3    
```
> 非正式講法:
網路上的講法有的解釋是說類似macro,例如
``` js
var name='lee4';
var y= `i am ${name}`
y
```
>意思是說init被初值代換。?
但是以semantic的眼光來看,我的解釋是這是一個非顯物件(**非正式講法**)。(物件只是一個概念,每種語言都可以建立物件的概念,只是javascript的物件是建立在一些特殊結構上,網路上有很多探討)
count(init) 傳回 一個匿名函數定義。這個匿名函數定義因為被包在函數count(init)中,此時,記憶體回收系統,在匿名函數的生命期中,都不會被回收。也因此,這個參數`init`也將一直存在於匿名函數的環境中。

 
 
``` hint
  +--------+ 
  |  init  | 
  |  f()   | 
  |        | 
  +---+----+ 

  ```
