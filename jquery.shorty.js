/*!
 *	Shorty v1.0.2a
 *	UNDER HEAVY DEVELOPMENT WITH LOTS OF EXPERIMENTAL DEVELOPMENTS INSIDE COMMENTS.
 *	
 *	A shortcut key binding assistant.
 *	
 *	Copyright © 2012 Gabriel Nahmias.
 *	Free to use under the MIT license.
 *	http://www.opensource.org/licenses/mit-license.php
 *	
 */

/*
 *	TODO:	Make $().shorty() have case-insensitivity option.
 *			Make a shortcut to Shorty where you just go $.shorty().
 *			Make a list of shortucts possible like shift+t,shift+o,alt+i.
 *			Make Macs work with the alt key.
 *
 *	KNOWN ISSUES:	Escape key tends to fudge up with the keypress event.  Use keydown for now.
 *			
 */

( function(jQuery) {
	
	var methods = {
		
		keyHandler: function(oHandle) {
			
			// Only care when a possible input has been specified.
			
			if ( typeof oHandle.data !== "string" ) {
				
				return;
				
			}
			
			var origHandler = oHandle.handler,
				keys = oHandle.data.toLowerCase().split(" ");
		
			oHandle.handler = function(event) {
				
				var iKey = event.keyCode ? event.keyCode : event.which;
				
				// Don't fire in text-accepting inputs to which we didn't directly bind.
				
				if ( this !== event.target && (/textarea|select/i.test( event.target.nodeName ) || event.target.type === "text") )
					return;
					
				// Keypress represents characters, not special keys.
				
				var special = event.type !== "keypress" && jQuery.shorty.keyMap[iKey],
					character = String.fromCharCode(iKey).toLowerCase(),
					key, modif = "", possible = {};
	
				// Check combinations (alt/ctrl/shift + anything).
				
				if ( event.altKey && special !== "alt" )	
					modif += "alt+";
				
				if ( event.ctrlKey && special !== "ctrl" )	
					modif += "ctrl+";
				
				// TODO:	Need to make sure this works consistently across platforms
				
				if ( event.metaKey && !event.ctrlKey && special !== "meta" )	
					modif += "meta+";
				
				if ( event.shiftKey && special !== "shift" )
					modif += "shift+";
	
				if ( special ) {
					
					possible[ modif + special ] = true;
	
				} else {
					
					// This equivelates all "Shift+" combinations.
					// Example: "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
					
					possible[modif + character] = true;
					possible[ modif + jQuery.shorty.shiftNums[ character ] ] = true;
					
					if (modif === "shift+")
						possible[ jQuery.shorty.shiftNums[ character ] ] = true;
					
				}
	
				for (var i = 0, l = keys.length; i < l; i++) {
					
					if ( possible[ keys[i] ] ) {
						return origHandler.apply( this, arguments );
					}
					
				}
				
			};
			
		}
		
	};
	
	// Let 'er rip.
	
	jQuery.each( ["keydown", "keyup", "keypress"] , function() {
		
		jQuery.event.special[this] = { add: methods.keyHandler };
		
	} );
	
	// TODO:	Try and make this some kind of configuration thing then make $.shorty AND $(...).shorty possible.
	
	var iAlt;
	
	if ( navigator.appVersion.indexOf("Mac")!=-1 )
		iAlt = 1;
	else
		iAlt = 18;
	
	jQuery.shorty = {
		
		version: "1.0.1",
		
		// Giant array mapping of keycodes to their string representations.
		
		keyMap: {
			
			8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
			20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
			37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
			96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
			104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
			112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
			120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
			
		},
		
		name: "Shorty",
		
		shiftNums: {
			
			"`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", 
			"8": "*", "9": "(", "0": ")", "-": "_", "=": "+", ";": ": ", "'": "\"", ",": "<", 
			".": ">",  "/": "?",  "\\": "|"
			
		}
		
	};
	
	jQuery.fn.shorty = function(oParams) {
		
		this.oSettings = $.extend( {
			
			action: function(event) {
				
				// To access the individual key pressed when working with the keypress event (default), you must adjust to using
				// event.originalEvent.charCode inside your action instead of merely event.keyCode. To make this value uniform, use
				// something like String.fromCharCode(event.originalEvent.charCode).toUpperCase() (case-sensitivity has not yet been
				// facilitated).  event.keyCode is pretty straightforward.
				
				// When using keydown or keyup, the key is in event.keyCode.
				
				console.log(event);		// By default, just log the event object when they press the key.
				
			},
			
			event: "keypress",			// If for some reason necessary, changes the event to which this shortcut is bound.
			//preventDefault: true,		// NEEDS WORK: Makes the default action for the browser not occur.
			//sensitive: false,			// NEEDS WORK: Makes shortcut strings case-sensitive or not.
			shortcut: ""				// Shortcut string (like "ctrl+n").  IMPORTANT: Specify modifiers in alphabetical order (alt+shift+p).
			
		}, oParams);
		
		var self = this;
		
		/*
		if (this.oSettings.preventDefault) {
			
			// Sort of a haphazard technique to append default prevention: copy, change, reassign.
			
			var f = this.oSettings.shortcut;
			
			function fNew() {
				
				f();
				
				return false;
				
			}
			
			this.oSettings.shortcut = fNew;
			
		}
		*/
		
		// This is where the shortcut is bound or otherwise handled.
		
		//if ( methods[oParams] )
		//	return methods[method].apply( this, Array.prototype.slice.call(arguments, 1) );
		//else if ( typeof method === 'string' && typeof arguments[1] == 'function' )
		//	$(window).bind(this.oSettings.event, this.oSettings.shortcut, this.oSettings.action);
		/*else */if (typeof oParams === 'object')
			return jQuery(this).bind(this.oSettings.event, this.oSettings.shortcut, this.oSettings.action);
		else if (typeof oParams === 'string') {
			
			if ( typeof arguments[1] == 'function' )
				this.oSettings.action = arguments[1];
			
			return jQuery(this).bind(this.oSettings.event, oParams, this.oSettings.action);
			
		} else if (!oParams || oSettings.shortcut == "")
			$.error(jQuery.shorty.name + ' requires at least a shortcut to be passed to it (inside an object or as its first argument).');
		
	};

} )(jQuery);

