
物件導向程式設計
====
# 介紹
物件導向程式設計 (Object-oriented programming, OOP) 是一種使用抽象概念表達現實世界的程式設計方式。 例如，一個類別可以對應一個名詞。

JavaScript 是一個以Prototype-based OOP)幾個特徵是函數來當做類別 (Class) 的建構子 (Constructor)。即使,現在的javascript也有關鍵字class 但是,仍然只是`翻譯`成函數建構子的一個包裝而已。



## 用語
Namespace
可讓開發人員包裝所有功能到一個獨一無二、特定應用程式名稱的容器。
Class 類別 
Object  類別 (Class) 的實際案例。
Property 類別的feature (對照欄位)。例如：顏色rectangle.color=red。
Method 類別的行為(對照函數)  例如：rectangle.draw() 。
Encapsulation：看的見／看不見的函數和欄位。
Constructor
Inheritance
Abstraction: 通常用來作為最上層的規格。(類似的觀念有interface)
Polymorphism


# javascript

## 參考
* [Object.create(): the New Way to Create Objects in JavaScript](http://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html) 
* [Basic Inheritance with Object.create](http://adripofjavascript.com/blog/drips/basic-inheritance-with-object-create.html) 
* [貓不會叫](http://javascript.wekeepcoding.com/article/15779199/Can%27t+access+methods+on+object%27s+prototype)

* Data Structures: Objects and Arrays :[chapter 4](https://eloquentjavascript.net/04_data.html) 
* [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)
* [modern javascript](https://javascript.info/class)

[本文:[JS] 06 Object.docx]([JS]%2006%20Object.docx)
[本文:[JS] 06 Object tree.docx]([JS]%2006%20Object%20tree.docx)
[本文:[JS] 06 prototype.pptx]([JS]%2006%20prototype.pptx)



# 測驗
## 問題：
``` js
function xx(){
    d: true;
}
function x1(){
    this.d=true;
}
var o1=new x1;
```
問：
typeof xx 
typeof x1
typeof o1
分別給出什麼答案？
答案：
typeof xx  ==>  "function"
typeof x1 ==>   "function"
typeof o1  ==>  "object"

## 問題
```js
class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}
```
hint: 
typeof(User) ==> 'function'