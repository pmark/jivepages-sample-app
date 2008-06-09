/**
 * Javascript controls for a general busy signal spinner
 * to indicate processing that would otherwise be invisible.
 *
 * @author P. Mark Anderson pmark@bordertownlabs.com
 *

JAVASCRIPT USAGE:
function general_use() {
    // show busy signal immediately
	BusySignal.be_busy();

    // ...

	// finish up after a pause
	BusySignal.be_done_in(1500);
}
	
function delayed_start() {
	// wait 1000 milliseconds first
	BusySignal.be_busy_in(1000);

    // ...

	// finish up after a pause
	BusySignal.be_done_in(1500);
}

function delayed_start() {
	// wait 1000 milliseconds first
	BusySignal.be_busy_in(1000, some_other_function);

	// finish up after a pause
	BusySignal.be_done_in(1500);
}

function some_other_function() {
    // you can run a function after a delay:  be_busy_in(2500, other_function)
    // ...
}


CSS:
#busy_signal {
    position: absolute;
    top: 0;
    left: 200px;
    padding: 4px 12px;
    background: pink;
    border: 1px solid #999;
}
	
HTML:
<div id="busy_signal" style="display:none">
    <img src="/images/spinner.gif" id="busy_signal_img"/>
    <img src="/images/spinner-anim.gif" id="busy_signal_anim" style="display:none"/>
</div>
	
 *
 *
 */

var BusySignal = {
	
	requests: new Array(),
	is_busy: false,
	visible: false,

	//
	// eval snippet after ms milliseconds
	//
	be_busy_in: function(ms, snippet, no_show) {
		this.stop_spinner();
	
	    // wait a bit after the last request
	    this.add_request();
	    setTimeout(function() {
			BusySignal.run_if_last(snippet, no_show)
		}, ms)
	},

	//
	// Show the spinner and optionally run the snippet
	//
	be_busy: function(snippet, no_show) {
		if (no_show == null || no_show != true) {
		    this.run_spinner();
		}

	    if (snippet != null) {
	        snippet();
	    }
	},

	be_busy_local: function(elem, snippet, no_show) {
		if (no_show == null || no_show != true) {
		    this.run_spinner(elem);
		}

	    if (snippet != null) {
	        snippet();
	    }
	},
	
	run_if_last: function(snippet, no_show) {
	    this.drop_request();
	    if (!this.has_requests()) {
	        this.be_busy(eval(snippet), no_show);
	    }
	},

	be_done_in: function(ms) {
		setTimeout("BusySignal.be_done()", ms);
	},

	be_done: function() {
	    if (!this.has_requests()) {
	        this.hide_bs();
	    	this.stop_spinner();
	        this.is_busy = false;
	    }
	},

	be_done_local: function(elem) {
	    if (!this.has_requests()) {
	        this.hide_bs();
	    	this.stop_spinner(elem);
	        this.is_busy = false;
	    }
	},

	add_request: function() {
	    this.requests.push(true);
	},

	drop_request: function() {
	    if (this.has_requests()) {
	        this.requests.shift();
	    }
	},

	is_busy: function() {
	    return this.is_busy;
	},

	has_requests: function() {
	    return this.requests.length > 0;
	},

	num_requests: function() {
	    return this.requests.length;
	},

	show_bs: function() {
	    if (this.visible == false) {
	        // you can use this effect if you use script.aculo.us
	        new Effect.Appear('busy', {duration:0.1});
	        //Element.show('busy_signal');

	        this.visible = true;
	    }

	},

	hide_bs: function() {
	    if (this.visible == true) {
	        // you can use this effect if you use script.aculo.us
	        new Effect.BlindUp('busy', {duration:0.1});
	        //Element.hide('busy_signal');

	    	this.stop_spinner();
	        this.visible = false;
	    }
	},

	run_spinner: function(elem) {
		if (Util.blank(elem)) {
		    Element.show('busy');
		} else {
			if ($(elem)) { Element.hide(elem); }
		    Element.show(elem + "-busy");
		}
	},

	stop_spinner: function(elem) {
		if (Util.blank(elem)) {
		    Element.hide('busy');
		} else {
		    Element.hide(elem + "-busy");
			if ($(elem)) { Element.show(elem); }
		}
	}

}
