
[modern](https://javascript.info/dispatch-events)


``` html
<html><body>
function dome(e)
{
 console.log(e.target.tagName)
}
<button onclick="dome(this);">click</button>

</body></html>
```

```js
<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  let event = new Event("click");
  elem.dispatchEvent(event);
</script>
```

```html
<!DOCTYPE HTML>
<html>
<head>
  <meta charset="utf-8">
</head><body>

<button id="elem" onclick="alert('Click!');">Autoclick</button>

<script>
  function xx(){
  let event = new Event("click");
  elem.dispatchEvent(event);
  }
  setTimeout(xx,1000)
</script>

</body>
</html>
```

where you click?
```html
<!DOCTYPE html>
<html>

<body>
  <script>
    document.onclick=function(e){
      console.log(e.clientX)
    }
    
  </script>
</body>

</html>
```