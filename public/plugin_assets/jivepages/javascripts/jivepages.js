Event.observe(window, 'load', function() { 
  Row.setup()
  Column.setup()
  Jivepage.row_tool = new RowTool()
  Jivepage.column_tool = new ColumnTool()  
});

var Jivepage = {
  jivepage_id:null,
  atts:{},
  row_tool:null,
  column_tool:null,  
  setup: function(json, edit_mode) {
    this.atts = eval('(' + json + ')')
    root = $$(".jivepage")[0]
    root.id = this.atts["layout"]
    root.className = "jivepage " + this.atts["skin"]
    if (edit_mode) {Element.addClassName(root, "edit")}
    if (this.atts["sidebar"] == "none") {
      Element.hide("sidebar_section")      
    } else {
      Element.show("sidebar_section")
    }
  },
  strip_id: function(elem) {
    if (typeof elem == 'object') { elem = elem.id }
    return elem.replace(/.*-/, '')          
  },
  get_token: function(form_id) {
    if (form_id == null) { form_id = "structure_form"}
    return Form.getInputs(form_id, "hidden", "authenticity_token")[0].value    
  },
  get_jivepage_id: function() {
    if (Jivepage.jivepage_id == null) { 
      Jivepage.jivepage_id = $F("jivepage_id")
    }
    return Jivepage.jivepage_id
  },
  add_token_to_form: function(editor, form) {
    token_field = Form.getInputs("structure_form", "hidden", "authenticity_token")[0]
    hidden = '<input type="hidden" name="authenticity_token" value="' + 
        token_field.value + '"/>'
    new Insertion.Bottom(form, hidden)
  }   
}

var Tool = Class.create({
  home_shed:"home",
  setup: function() {
    alert('No default Tool setup')
  },
  recall_tool: function() {
    this.relocate_to(this.home_shed)
  },
  relocate_and_setup: function(row) {
    this.relocate_to(row)
    this.setup()
  },
  relocate_to: function(new_row) {
    if (this.active == false) { return }
    if (new_row == null) {alert("ERROR: can't move tool there"); return}
    if (new_row == this.home_shed) {
      row_tool_shed_name = new_row + this.shed_suffix 
    } else {
      row_tool_shed_name = new_row.id + this.shed_suffix      
    }
    row_tool_shed = $(row_tool_shed_name)
    if (row_tool_shed == null) {
      alert("ERROR: local tool shed is missing: " + row_tool_shed_name); 
      return
    }
    tool = $(this.tool_id)    
    if (tool == null) {alert("ERROR: tool went away (" + this.tool_id + ")"); return}
    if (tool.parentNode != row_tool_shed || new_row == Tool.home_shed) {
      tool = Element.remove(tool)
      Element.insert(row_tool_shed, tool)
    }
  },
  disable: function() {
    this.active = false
  },
  enable: function() {
    this.active = true
  }
})

var ColumnTool = Class.create(Tool, {
  initialize: function($super) {
    $super()
    this.shed_suffix = "-column_tool_shed"
    this.tool_id = "all_column_tools"
    this.active = true
  },
  close_all: function() {    
    $A($$("#" + this.tool_id + " table tr")).each(function(o) {
      o.addClassName("off")
    })        
    tool = $(this.tool_id).parentNode
    if (Element.visible(tool)) {
      new Effect.Fade(tool, {duration:0.2})
    }
  }
})

var RowTool = Class.create(Tool, {
  initialize: function($super) {
    $super()
    this.shed_suffix = "-row_tool_shed"
    this.tool_id = "all_row_tools"
    this.active = true
    this.setup()
  },
  setup: function() {    
    // this controls the row menu
    $$(".row_menu_stub").each(function(menu_stub) {
      Event.observe(menu_stub, "mouseover", function(e) { 
        Element.addClassName($("all_row_tools"), "hovered")
      })
    })    
  },  
  close_all: function() {    
    $A($$("#" + this.tool_id + " table tr")).each(function(o) {
      o.addClassName("off")
    })        
  }  
})

var Column = {
  current: null,
  tool_suffix: "-column_tool",
  setup: function(parent_column_id) {
    if (parent_column_id == null) {
      selection = $$('.edit .column')
    } else {
      selection = $(parent_column_id)      
    }
    // add column click handler
    selection.each(function(column) {
      Event.observe(column, "click", function(e) { 
        /// TODO: make the menu appear
        return
        ///
        Util.stop_event_bubble(e)      
        Column.current = column

        if (column == null) { alert("bad column")}
        shed = column.getElementsByClassName("column_tool")[0]
        Jivepage.column_tool.relocate_tool_to(shed)
        Element.show(shed)
      })
      
      Event.observe(column, "mouseover", function(e) { 
/*        Util.stop_event_bubble(e)      */
        Element.addClassName(column, "hovered")
        Element.addClassName(column.parentNode, "hovered")
      })
      
      Event.observe(column, "mouseout", function(e) { 
/*        Util.stop_event_bubble(e)      */
        if (column != null) {
          Element.removeClassName(column, "hovered")
          Element.removeClassName(column.parentNode, "hovered")
        }
      })
    });
  },
  
  insert_text: function() {
    Util.ajax_post("/boxes/create/", Jivepage.column_tool.close_all, null, {
        "box[column_id]":Jivepage.strip_id(Column.current.id), 
        "box[kind]":"Textblock",
        authenticity_token:Jivepage.get_token()
    })
  }
}

var Box = {
  setup: function() {
    $$('.edit .box').each(function(box) {
      Event.observe(box, "click", function(e) { 
        //Util.stop_event_bubble(e)      
      })
    })
  }  
}

var Row = {
  current_row: null,
  
  // Move top, left, bottom tools into the row's tool_shed
  setup: function(row_id) {
    if (row_id == null) {
      selection = $$('.edit .row')
    } else {
      selection = [$(row_id)]
    }
    selection.each(function(row) {
      // hover row: add 'hovered' class then move row tool
      Event.observe(row, "mouseover", function(e) { 
        Util.stop_event_bubble(e)      
        Row.current_row = row
        Element.addClassName(row, "hovered")
        Jivepage.row_tool.relocate_to(row)
      })
      // leave row: remove 'hovered' class
      Event.observe(row, "mouseout", function(e) { 
        Row.current_row = null
        Util.stop_event_bubble(e)      
        if (row != null) {
          Element.removeClassName(row, "hovered")
          Element.removeClassName($("all_row_tools"), "hovered")
        }
      })
      $$("#" + row.id + " .row_menu_stub").each(function(menu_stub) {
        Event.observe(menu_stub, "mouseover", function(e) { 
          Element.addClassName($("all_row_tools"), "hovered")
        })
      })  
    })
  },  
  format: function(anchor) {
    new_type = anchor.parentNode.className
    this.format_row(Row.current_row, new_type)
  },
  format_row: function(row_id, grid_type) {
    //Jivepage.row_tool.recall_tool()
    token = Jivepage.get_token()    
    id = Jivepage.strip_id(row_id)
    Util.ajax_put("/rows/" + id, 
        function() {Jivepage.row_tool.disable()}, 
        function() {Row.setup(row_id); Jivepage.row_tool.enable()},
        {"row[grid_type]":grid_type, authenticity_token:token})    
  },
  insert: function(above) {
    if (above == null) {above = false}
    id = Jivepage.strip_id(Row.current_row)
    Util.ajax_post("/rows/", null, null, {
        anchor_row_id:id, jivepage_id:Jivepage.get_jivepage_id(),
        authenticity_token:Jivepage.get_token()})    
  },  
  drop: function() {
    row = $(Row.current_row)
    if (row == null) {return}
    if (Element.previous(row) == null && Element.next(row) == null) {
      alert("This is the only row.  Leave it alone.")
      return
    }
    if (confirm("Really delete this row?") == false) {return}

    Jivepage.row_tool.recall_tool()
    Jivepage.row_tool.disable();
    Element.remove(row)    
    
    token = Jivepage.get_token()    
    id = Jivepage.strip_id(Row.current_row)
    Util.ajax_delete("/rows/" + id, null, function(){Jivepage.row_tool.enable();},
        {authenticity_token:token})        
  },
  up: function() {
    this.move("up")
  },
  down: function() {
    this.move("down")
  },
  move: function(dir) {
    row = $(Row.current_row)
    if (row == null) {return}
    
    // find sibling
    if (dir == "up") {
      sibling_row = Element.previous(row)
      insert_fn = Insertion.Before
    } else {
      sibling_row = Element.next(row)
      insert_fn = Insertion.After
    }
    
    // move row
    if (sibling_row == null) {return}    
    moved_row = Element.remove(row)    
    new insert_fn(sibling_row, moved_row)

    token = Jivepage.get_token()    
    id = Jivepage.strip_id(Row.current_row)
    Util.ajax_put("/rows/" + id + "/" + dir, null, null,
        {authenticity_token:token})            
  },
  fix_first: function(section) {
    first_row = null
    $$("#" + section + "_section .row").each(function(elem) {
      if (first_row == null) {first_row = elem}
      Element.removeClassName(elem, "first")
    })
    Element.addClassName(first_row.id, "first")
  },
  unhover_all: function() {
    $$(".hovered").each(function(elem) {
      Element.removeClassName(elem, "hovered")
    })
  },
  change_grid_type: function(row_id, grid_type) {
    element = $(row_id)
    new_classes = "row " + grid_type
    if (Element.hasClassName(element, "first")) {
      new_classes += " first"
    }
    element.className = new_classes    
  }
}
                                           
var JpMenu = {
  set_cname_state: function() {
    if ($('enable_cname').checked) {
      $('site_cname').disabled = '';
      $('site_cname').value = '';
      $('site_cname').focus();
    } else {
      $('site_cname').disabled = 'disabled';
      $('site_cname').value = 'example.com';
    }
  }
}