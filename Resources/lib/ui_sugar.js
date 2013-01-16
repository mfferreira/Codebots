var i, j, event_,
  _ = require('lib/underscore-min');

function TiUber() {

  this.defaultConfig = {};

  var object_ids = {};
  this.getById = function(id){
    return object_ids[data.id];
  };

  this._ = _;
  
  this.NO_SELECTION_ROW = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
  this.FLEXSPACE = Ti.UI.createButton({ systemButton:Ti.UI.iPhone.SystemButton.FLEXIBLE_SPACE });

  this.genericBuilder = function(uiElement, data) {
    data = data || {};
    if (data.config && this.defaultConfig[data.config]) {
      data.properties = _.extend(_.clone(this.defaultConfig[data.config]), data.properties);
    }
    var obj = uiElement(data.properties || {});
    if (data.content) {
      for (i=0,j=data.content.length; i<j; i++){ obj.add(data.content[i]); }
    }
    if (data.events) {
      for (i=data.events.length; i--;){
        var event_ = data.events[i];
        obj.addEventListener(event_[0], event_[1]);
      }
    }
    if (data.id) object_ids[data.id] = obj;
    return obj;
  };

  this.currentWindow = function() { return Ti.UI.currentWindow; };
    
  this.win = function(data) {
    return this.genericBuilder(Ti.UI.createWindow, data);
  };
  
  this.view = function(data) {
    return this.genericBuilder(Ti.UI.createView, data);
  };
  
  this.scrollView = function(data) {
    return this.genericBuilder(Ti.UI.createScrollView, data);
  };
  
  this.textField = function(data) {
    return this.genericBuilder(Ti.UI.createTextField, data);
  };
  
  this.textArea = function(data) {
    return this.genericBuilder(Ti.UI.createTextArea, data);
  };
  
  this.button = function(data) {
    return this.genericBuilder(Ti.UI.createButton, data);
  };

  this.buttonBar = function(data) {
    return this.genericBuilder(Ti.UI.createButtonBar, data);
  };
  
  this.table = function(data) {
    return this.genericBuilder(Ti.UI.createTableView, data);
  };

  this.row = function(data) {
    return this.genericBuilder(Ti.UI.createTableViewRow, data);
  };

  this.section = function(data) {
    return this.genericBuilder(Ti.UI.createTableViewSection, data);
  };

  this.tabbedBar = function(data) {
    return this.genericBuilder(Ti.UI.iOS.createTabbedBar, data);
  };
  
  this.buttonBar = function(data) {
    return this.genericBuilder(Ti.UI.createButtonBar, data);
  };
  
  this.image = function(data) {
    return this.genericBuilder(Ti.UI.createImageView, data);
  };

  this.Switch = function(data) {
    return this.genericBuilder(Ti.UI.createSwitch, data);
  };

  this.popover = function(properties, content) {
    var popover = Ti.UI.iPad.createPopover(properties);
    for (i=content.length;i--;) {
      popover.add(content[i]);
    }
    return popover;
  };
  
  this.picker = function(properties, events) {
    var picker = Ti.UI.createPicker(properties);
    if (events) {
      for (i=events.length; i--;){
        var event_ = events[i];
        picker.addEventListener(event_[0], event_[1]);
      }
    }
    return picker;
  };
  
  this.label = function(properties, events) {
    var label = (properties.config?
                this.genericBuilder(Ti.UI.createLabel, properties):
                Ti.UI.createLabel(properties) );
    if (events) {
      for (i=events.length; i--;){
        var event_ = events[i];
        label.addEventListener(event_[0], event_[1]);
      }
    }
    return label;
  };
  
  this.popover = function(context, properties, events) {
    var popover;
  };
  
  this.optionDialog = function(data) {
    return this.genericBuilder(Ti.UI.createOptionDialog, data);
  };
  
  this.addEvents = function(obj, data) {
    if (data) {
      for (i=data.length; i--;){
        var event_ = data[i];
        obj.addEventListener(event_[0], event_[1]);
      }
    }
    return obj;
  };
  
  this.alert = function(data) {
    return this.genericBuilder(Ti.UI.createAlertDialog, data);
  };
  
  this.resetChecks = function(tableData){
    // removes check from all rows
    for (i=tableData.length; i--;) {
      var section = tableData[i];
      for (var k=section.rowCount; k--;) {
        // Ti.API.debug(section.rows[k]);
        var row = section.rows[k];
        row.hasCheck = false;
        row.children[0].color = '#000000';
      }
    }
    return tableData;
  };

  var indWin, actInd, indicatorActive = false;
  this.showIndicator = function(message) {
    Ti.API.debug('Opening activity indicator');
    if(!indicatorActive) {
      actInd = Ti.UI.createActivityIndicator({ height:30, width:30 });
      actInd.style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
      indWin = Ti.UI.createWindow();
      var indView = Ti.UI.createView({ height:100, width:100, backgroundColor:'#000', borderRadius:10, opacity:0.7 });
      indWin.add(indView);
      indWin.add(actInd);
      indWin.open();
      actInd.show();
      indicatorActive = true;
    }

  };

  this.hideIndicator = function() {
    Ti.API.debug('Hiding activity indicator');
    if(indicatorActive) {
      actInd.hide();
      indWin.close();
      indicatorActive = false;
    }
  };

}

var ui = new TiUber();
// ui.defaultConfig = require('lib/ui_config');

module.exports = ui;

Ti.App.addEventListener('ui:hideActivityIndicator', ui.hideIndicator );