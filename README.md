Shorty
=============

**Shorty** is a **jQuery _plugin_** that allows for painless shortcut key binding.

What does it do?
-----------

* Lets you bind *meaningful* routines to common shortcut combinations.
* Permits familiar shortcut phrases like "Ctrl+N" and "Alt+E"
* Possesses a framework that could make all sorts of categories of things to load possible.
* Unwaveringly forces massive crowds to idolize you.

How to use it
-----------

Before doing anything, you must include **jQuery** and **jquery.Shorty.js** (or the minified version, **jquery.Shorty.min.js**) on your page like so

```javascript
<script language="javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
<script language="javascript" src="jquery.Shorty.js" type="text/javascript"></script>
```

Finally, _that's_ over; we can move right on to the other stuff.

Examples
-----------

The structure of using Shorty goes like this:

```javascript
$.yql( {
	
	format: "json",
	
	key: KEY,
	
	query: "select * from yahoo.finance.quotes where symbol in ('AAPL', 'GOOG', 'MSFT')",
	
	secret: SECRET,
	
	success: function(data) {
		
		console.debug(data);
		
	}
	
} );
```

**NOTE:** `query` is the only required property.  That makes `key`, `format` (assumed `"json"`), and `secret` not so (neither is `success` but... _wtf_).

The previous code loads some stock information and logs it to the console. ```query``` is, of course, the query to run,
```success``` is the callback function, ```format``` is the type in which the data should be returned (`"json"`, `"text"`, `"xml"`, ...), ```key``` and
```secret``` have to do with if you register an official application, and success is as mentioned before.  The argument
passed to the success function is the data which has been loaded.  There's also a built-in function called ```getHTML```
which goes a little something like this:

```javascript
$.yql( "getHTML" , {
	
	format: "text",
	
	success: function(data) {
		
		$("body").html(data);
		
	},
	
	url: "http://www.google.com"
	
} );
```

Wuddyaknow?  You just loaded Google's homepage into your body tag.  Check out the repository for an example of this in action!

You can perfrom really fun requests in a snap with _zero_ filler by doing something like this:

```javascript
var a;$.yql({async: false,query:"select * from yahoo.finance.quotes where symbol in ('MSFT')",success:function(data){a=data;}})
```

**Bam**.  You just got the most recent stock information for **Microsoft** and stored it in `a`.  _<span style="font-variant: small-caps;">How do you feel now</span>?_

```javascript

if ( parseFloat(a.query.results.quote.LastTradePriceOnly) < 5 )
	alert("OMG, buy some Microsoft stock.  It's cheap as hell right now.");

```

Fun, right?

Browser support
-----------

* All that jQuery supports.

License
-----------

Public domain

Acknowledgements
------------

Shorty is a project by [Gabriel Nahmias](http://github.com/terrasoftlabs "Terrasoft's GitHub"), co-founder of Terrasoft.