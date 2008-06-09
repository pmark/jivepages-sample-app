try {
  document.execCommand('BackgroundImageCache', false, true);
} catch(e) {}

/*
function extend(dest, src){
	if(!src) return dest
	for(var k in src) dest[k] = src[k]
	return dest
}
*/

Object.extend( String.prototype, {
	include: function(t) { return this.indexOf(t) >= 0 ? true : false },
	trim: function(){ return this.replace(/^\s+|\s+$/g,'') },
	splitrim: function(t){ return this.trim().split(new RegExp('\\s*'+t+'\\s*')) },
	encodeTag: function() { return encodeURIComponent(this).replace(/%2F/g, '/') },
	unescHtml: function(){ var i,e={'&lt;':'<','&gt;':'>','&amp;':'&','&quot;':'"'},t=this; for(i in e) t=t.replace(new RegExp(i,'g'),e[i]); return t },
	escHtml: function(){ var i,e={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'},t=this; for(i in e) t=t.replace(new RegExp(i,'g'),e[i]); return t },
	escRegExp: function(){ return this.replace(/[\\$*+?()=!|,{}\[\]\.^]/g,'\\$&') },
	capitalize: function() { return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase(); },
    quote: function () {
        var c, i, l = this.length, o = '"';
        for (i = 0; i < l; i += 1) {
            c = this.charAt(i);
            if (c >= ' ') {
                if (c == '\\' || c == '"') {
                    o += '\\';
                }
                o += c;
            } else {
                switch (c) {
                case '\b':
                    o += '\\b';
                    break;
                case '\f':
                    o += '\\f';
                    break;
                case '\n':
                    o += '\\n';
                    break;
                case '\r':
                    o += '\\r';
                    break;
                case '\t':
                    o += '\\t';
                    break;
                default:
                    c = c.charCodeAt();
                    o += '\\u00' + Math.floor(c / 16).toString(16) +
                        (c % 16).toString(16);
                }
            }
        }
        return o + '"';
    }
})

var Util = {
	isArray: function(o) { if(o && typeof o == 'object' && o.constructor == Array) return true; return false },

	previousElement: function(o) {
		do o = o.previousSibling; while(o && o.nodeType != 1)
		return o
	},

	nextElement: function(o) {
		do o = o.nextSibling; while(o && o.nodeType != 1)
		return o
	},

	// get mouse pointer position
	pointerX: function(e) { return e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft)) },
	pointerY: function(e) { return e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop)) },

	// get window size
	windowHeight: function() { return self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0 },
	windowWidth: function() { return self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0 },

	pageScrollY: function() { return self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0 },
	pageScrollX: function() { return self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0 },

	// get pixel position of an object
	getY: function(o){ var y = 0
		if (o.offsetParent) while (o.offsetParent) { y += o.offsetTop; o = o.offsetParent }
		return y
	},
	getX: function(o){ var x = 0
		if (o.offsetParent) while (o.offsetParent) { x += o.offsetLeft; o = o.offsetParent }
		return x
	},
	setX: function(o, n){ o.style.left = n + 'px' },
	setY: function(o, n){ o.style.top = n + 'px' },

	getStyle: function(o,s) {
		if (document.defaultView && document.defaultView.getComputedStyle) return document.defaultView.getComputedStyle(o,null).getPropertyValue(s)
		else if (o.currentStyle) { return o.currentStyle[s.replace(/-([^-])/g, function(a,b){return b.toUpperCase()})] }
	},

	getTextStyle: function(o){
		return { fontSize: getStyle(o, 'font-size'), fontFamily: getStyle(o, 'font-family'), fontWeight: getStyle(o, 'font-weight') }
	},
	makeTextSize: function(style, appendTo){
		style = extend({zborder: '1px solid red', visibility: 'hidden', position: 'absolute', top: 0, left: 0}, style)
		var div = create('div', {style: style})
		appendTo.appendChild(div)
		return div
	},
	getTextSize: function(text, o){
		o.innerHTML = text.escHtml().replace(/ /g, '&nbsp;')
		return o.offsetWidth
	},
	getTextWidth: function(text, style, appendTo){
		style = extend({border: '1px solid red', zvisibility: 'hidden', position: 'absolute', top: 0, left: 0}, style)
		var div = create('div', {style: style, html: text.escHtml().replace(/ /g, '&nbsp;')})
		appendTo.appendChild(div)
		var w = div.offsetWidth
		remove(div)
		return w
	},
	stripStyleUnits: function(value) {
		return value.replace(/(\d+).*$/, '$1')
	},
	debug: function(msg) {
		Element.show('debug');
		$('debug').innerHTML = msg;
	},
	debug_sticky: function(msg) {
		Element.show('debug');
		$('debug').innerHTML += "<p>" + msg + "</p>";
	},
	
	tag_is_missing: function(tag, tags) {
		return tags != tag &&
			tags.search(RegExp('^' + tag + ',')) == -1 &&
			tags.search(RegExp(',' + tag + ',')) == -1 &&
			tags.search(RegExp(',' + tag + '$')) == -1;
	},
	
	blank: function(v) {
		return (v == null || v == undefined || v == '' || v == 'null')
	},
	
	//
	// Add '_css' to link_id and load .css file in /stylesheets/{link_id}.css
	//
	add_css: function(css_name, link_href) {
		var link_id = css_name
		if (!Util.ends_with(css_name, '_css')) { link_id = css_name + '_css' }
		
		var link = $(link_id)
		if (link_href == null) {
			link_href = "/stylesheets/" + css_name + ".css"
		}
		
		if (link != null) {
			link.disabled = false;
		} else {
			link = document.createElement("link");
			link.id = link_id;
			link.href = link_href;
			link.media = "all";
			link.rel = "stylesheet";
			link.type = "text/css";
			link.disabled = false;
			document.getElementsByTagName('head')[0].appendChild(link);
		}
	},
	
	disable_css: function(css_name) {
		var link_id = css_name
		if (!Util.ends_with(css_name, '_css')) { link_id = css_name + '_css' }
		//Element.remove(link_id);
		var link = $(link_id)
		if (link != null) {
			link.disabled = true;
		}
	},
	
	enable_css: function(css_name) {
		var link_id = css_name
		if (!Util.ends_with(css_name, '_css')) { link_id = css_name + '_css' }
		var link = $(link_id)
		if (link == null) {
			this.add_css(css_name)
		} else {
			link.disabled = false;
		}
	},
	
	move_element_to_element: function(mover, target, duration) {
		if (duration == null) {
			duration == 0.75
		}
		Element.makePositioned(target)
		new Effect.Move(mover, {x:target.left, y:target.top, mode:'absolute', duration:duration})
		Element.undoPositioned(target)
	},
	
	user_agent_contains: function(target) {
		// browser detection
		return navigator.userAgent.toLowerCase().indexOf(target) + 1;
	},
	
	close_video: function() {
		Element.hide('overlay');
		Element.hide('lightbox');

		// stopping the video works in safari
		Try.these(
			function() {
				$('lightbox').getElementsByTagName('object')[0].Stop();
			}
		);

		$('lightbox').innerHTML=null;
	},
	
	// true if str starts with start.
	starts_with: function(str, start) {
		return str.toString().match(new RegExp('^' + start)) != null;
	},

	// true if str ends with end.
	ends_with: function(str, end) {
		return str.toString().match(new RegExp(end + '$')) != null;
	},
	
	// elem: target element to which event is added
	// evnt: click, blur, mouseover, etc.
	// fn: the name of the function to add
	add_event: function(elem, evnt, fn) {
		elem = $(elem);
		
		if (elem == null) return;

		evnt = evnt.toLowerCase();
		if (evnt.substring(0,2) == "on") {
			evnt = evnt.substring(2);
		}

	 	if (document.addEventListener) {
			//alert('addin event' + fn)
			elem.addEventListener(evnt, fn, false);
		} else if(window.attachEvent) {
			// IE needs "on" as a prefix
			evnt = 'on' + evnt;
			elem.attachEvent(evnt, fn);
		}
	},
	
	be_busy: function() {
		var elem = $('busy');
		if (elem != null) {	Element.show(elem);	}
	},
	
	be_done: function() {
		var elem = $('busy');
		if (elem != null) {	Element.hide(elem);	}
	},
	
	is_multiple_of: function(mult, number) {
		return number % mult == 0
	},
	
	is_even: function(number) {
		return this.is_multiple_of(2, number)
	},
	
	is_odd: function(number) {
		return !this.is_even(number)
	},
	
	ajax_get: function(url, loading, complete, params) {
		this.ajax_request('get', url, loading, complete, params)
	},
	
	ajax_post: function(url, loading, complete, params) {
		this.ajax_request('post', url, loading, complete, params)
	},
	
	ajax_put: function(url, loading, complete, params) {
		this.ajax_request('put', url, loading, complete, params)
	},
	
	ajax_delete: function(url, loading, complete, params) {
		this.ajax_request('delete', url, loading, complete, params)
	},
	
	ajax_request: function(meth, url, loading, complete, params) {
		new Ajax.Request(url, 
			{asynchronous:true, evalScripts:true, method:meth, 
				onLoading:loading, onComplete:complete, parameters:params})
	},
	
	validate: function(field, msg) {
		if (Util.blank($F(field))) {
			alert(msg)
			return false
		} else {
			return true
		}
	},
	
	stop_event_bubble: function(e) {
	  if (!e) {var e = window.event;}      
  	e.cancelBubble = true;
    if (e.stopPropagation) {e.stopPropagation();}    
	},
	
	// makes HTML <option>
	// set value='' for blank value, else value=name
	option_for: function(name, value, sel_value) {
		if (value == null) {
			value = name
		}
		html = '<option value="' + value + '"'
		if (sel_value == value) {
			html += ' selected="selected"'
		}
		html += '>' + name + '</option>'
		return html
	},
	
	set_value_from_inner_html: function(targ, src) {
		if (src == null) {
			$(targ).value = '';
		} else {
			$(targ).value = $(src).innerHTML;
		}
	}

}

//
// Make array from string
//
/*
	$w('div p span ul').each(function(tag){
	  alert(tag);
	});
*/
function $w(string){
  string = string.strip();
  return string ? string.split(/\s+/) : [];
}

