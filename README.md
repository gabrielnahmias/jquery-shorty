Shorty
=============

**Shorty** is a **jQuery _plugin_** that allows for painless shortcut key binding.

What can it do?
-----------

* Bind *meaningful* routines to key combinations (familiar phrases like `Ctrl+N` and `Alt+E`).
* Help create seamless web applications.
* Make people go, **"WHOA."**

How to use it
-----------

Include **jQuery** and **jquery.shorty.js** (or the minified version, **jquery.shorty.min.js**) on your page like so

```javascript
<script language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
<script language="javascript" src="jquery.shorty.js" type="text/javascript"></script>
```

Come on; we ain't got all day, *son*.  Here we go.

Examples
-----------

The structure of using Shorty goes like this:

```javascript
$(window).shorty( {
	
	action: function(event) {
		
		alert('Trying to leave, eh?');
		
		console.log(event);
		
		return false;
		
	},
	
	event: "keypress",
	
	shortcut: "Ctrl+Q Ctrl+W"
	
} );
```

**NOTE:** `shortcut` is the only required property.  That makes `action` and `event` not so, although modifying `action` is
conventional.  Also, by having `return false` in your `action` function, the default browser action will be prevented (Chrome/Safari
may cause issues).

The previous code logs the event object passed to the `action` function to the console after employing a flashy alert window ;).
You could virtually achieve the same thing shorthandedly by doing this:

```javascript
$(window).shorty("Ctrl+Q Ctrl+W", function(event) { alert('Please stay!!'); return false; } );
```

Well, well.  Looks like we don't need objects after all!

Browser support
-----------

* All that jQuery supports.

License
-----------

Public domain

Acknowledgements
------------

Shorty is a project by [Gabriel Nahmias](http://github.com/terrasoftlabs "Terrasoft's GitHub"), co-founder of Terrasoft.