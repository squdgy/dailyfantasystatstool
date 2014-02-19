/*global Ext: false*/
Ext.define('Ext.ux.PageSizePicker', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.pagesizepicker',

  options: [20, 50, 100, 500, 1000],
  
  displayText: 'Players per Page',

  constructor: function(config) {
	
    Ext.apply(this, config);
    
    this.callParent(arguments);
  },

  init : function(pagingToolbar) {
	
	var optionsStore = this.options;
	
	var store = pagingToolbar.store;
	
    var comboBox = Ext.create('Ext.form.field.ComboBox',{
      store: optionsStore,
      width:50,
      typeAhead: false,
      triggerAction: 'all',
      forceSelection: true,
      lazyRender:true,
      mode: 'remote',
      value: store.pageSize,
      listeners: {
        select: function(combo, value, i){
            store.pageSize = value[0].data.field1;
            store.loadPage(1);
        }
      }
    });

    var index = pagingToolbar.items.indexOf(pagingToolbar.items.map.refresh);
    pagingToolbar.insert(++index,'-');
    pagingToolbar.insert(++index, this.displayText);
    pagingToolbar.insert(++index, comboBox);
    
    //destroy combobox before destroying the paging toolbar
    pagingToolbar.on({
      beforedestroy: function(){
        comboBox.destroy();
      }
    });

  }
});