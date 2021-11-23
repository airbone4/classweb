
## apply, call
 ### 兩個函數的差別:
 參數
 * `apply` 的參數,最多兩個,第二個是陣列。
`apply(this, [...])`
* `call`的參數,有多個
.call(this, param1, param2, param3, param4...)


```js
function myObject(name){
    this.name="empty";
}
function helloX(msg){
    if (arguments.length) >1 {
        console.log("hello ", +this.name + "  " + msg )
    }
}
```

[實驗用的HTML`apply_test1.html](apply_test1.html) 

``` js
   function myObject(name) {
            this.name = name;
        }

        function helloX(msg) {
            console.log(arguments.length);
            console.log("hello " + this.name + "  " + msg)

        }
        var x1= new myObject("lee4"); 
        var x2= new myObject("chung3");
        helloX.apply(x1,["ko"]);
        helloX.apply(x2,["ko"]);
```
這裡的`arguments.length=1` 也就是使用apply的時候,this是藏在語法中。(:fearful:)



#### 不用new
```js
   function myObject(name) {
            this.name = name;
            return this; //沒有這行會出錯
        }

        function helloX(msg) {
            console.log(arguments.length);
            console.log("hello " + this.name + "  " + msg)

        }
        var x1= myObject("lee4"); 
        var x2=  myObject("chung3");
        helloX.apply(x1,["ko"]);
```

# 甚麼時候用?
可以通用於不同的物件,看起來就好像是某個物件的behavior。

## 另一個範例
[[JS] 06 prototype.pptx]([JS]%2006%20prototype.pptx)

如果Array 沒有提供求最大,最小的函數,則必須自己寫一個函數,但是我們知道Math library有提供函數:`Math.max()`,`Math.min()`:

解釋下面的用法:
在Array的prototype上加入函數`max()`,`min()` 。
第一個參數不用,因為`Math.max()`不是我們寫的函數,是別人寫的,傳進去說不好會有問題。第2個才是我們要傳進的參數,因為是apply(),所以第2個參數也剛好是Array, 因此用this。



```js
    var p = [35, 2, 65, 7, 8, 9, 12, 121, 33, 99];
    Array.prototype.max = function() {
        return Math.max.apply(null, this);
    };

    Array.prototype.min = function() {
        return Math.min.apply(null, this);
    };

    var p1 = new Array(35, 2, 65, 7, 8, 9, 12, 121, 33, 99);

    //alert("Max value is: "+p.max()+"\nMin value is: "+ p.min());
    alert("p1's max is " + p1.max());
```

那為甚麼不寫成

```js
    var p = [35, 2, 65, 7, 8, 9, 12, 121, 33, 99];
    Array.prototype.max = function() {
        return Math.max( this);
    };

    Array.prototype.min = function() {
        return Math.min( this);
    };

    var p1 = new Array(35, 2, 65, 7, 8, 9, 12, 121, 33, 99);

    //alert("Max value is: "+p.max()+"\nMin value is: "+ p.min());
    alert("p1's max is " + p1.max());
```

>hint:
Math.max([2,3,4])
NaN
Math.max(2,3,4)
4


