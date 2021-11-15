

#利用範例解釋var 的問題
[var_problem_demo.html](var_problem_demo.html)

@import "var_problem_demo.html"
利用上面三個按鈕,解釋var 的問題.

## 程式碼大綱
按下按鈕以後,要顯示按鈕Tag 的innerHTML(e.g. `<button>innerHTML</button>)
```js
        var buttons = document.getElementsByTagName('button')

        for (var i = 0; i < buttons.length; i++) {
            var buttonName = buttons[i].innerHTML
            buttons[i].addEventListener('click', function () {
                console.log(buttonName)
            })
        }

```
## 全部的程式碼
[var_problem.html](var_problem.html)
@import "var_problem.html" {code_block=true class="line-numbers"}

### why
``` hint
+--------------------+
|  buttonName        |
|  +------------+    |
|  |            |    |
|  | handler()  |    |
|  +------------+    |
+--------------------+
```
javascript 是一個non-block, single-thread 語言,系統呼叫會等到目前執行緒停止的時候執行,此時迴圈已經執行完畢,都是third.

## 是否有其他的寫法呢?這樣寫對不對?(sol1)

``` js
var buttons = document.getElementsByTagName('button')
for (var i=0;i<buttons.length;i++){
   buttons[i].click=function(e){
       console.log(e.innerHTML)
   }
}
```



## closure sol2
@import "var_problem_sol2.html" {code_block=true class="line-numbers"}


## let sol3
@import "var_problem_sol3.html" {code_block=true class="line-numbers"}

