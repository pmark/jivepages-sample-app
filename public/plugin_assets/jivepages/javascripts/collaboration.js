//
// Wraps the current changing buffer of text to send 
//
var MarkerBufferObserver = Class.create(Abstract.TimedObserver, {
  initialize: function($super) {
    element = MarkerBuffer.get_buffer()
    frequency = 3
    //callback = MarkerBuffer.
    
    $super(callback, frequency);
    this.element   = $(element);
    this.lastValue = this.getValue();
  }
});

var MarkerBuffer = Class.create({
  buffer: null,
  content: null,

  initialize: function() {
    this.get_buffer()
  },
  
  watch_changes: function() {
    new MarkerBufferObserver()
  }, 
  
  update: function() {
    if (unchanged()) { return }    
    this.content = buffer.inner_html
    this.move_to_cursor()
    this.send_content()
  },
  
  get_buffer: function() {
    return this.buffer = $('marker_buffer')
  },
  
  unchanged: function () {
    this.get_buffer
    return marker_buffer.length == 0
  },
  
  send_content: function() {
    form = $("marker_buffer_form") 
    url = form.action
    params = Form.serialize(form)
    loading = BusySignal.be_busy
    complete = BusySignal.be_done_in(500)
    alert("sending changes")
    ajax_post(url, loading, complete, params)
  },
  
  sent: function() {
    $("status_bar").innerHTML += "."
  }
});

