Ext.define('DFST.view.filter.List', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.filterlist',

    requires: ['Ext.toolbar.Toolbar'],

	title: 'Filters',
	collapsible: true,
	animCollapse: true,
	margins: '5 0 5 5',
	layout: 'vbox',

	initComponent: function() {
		Ext.apply(this, {
			items: [
/*                
                {
				xtype: 'dataview',
				trackOver: true,
				store: this.store,
				cls: 'filter-list',
				itemSelector: '.filter-list-item',
				overItemCls: 'filter-list-item-hover',
				tpl: '<tpl for="."><div class="filter-list-item">{name}</div></tpl>',s
				listeners: {
				    selectionchange: this.onSelectionChange,
				    scope: this
				}
			},
*/            
            {   
                xtype: 'slider',
                width: 200,
                value: 50,
                increment: 10,
                minValue: 0,
                maxValue: 100
            },
            {
                xtype: 'numberfield',
                anchor: '100%',
                name: 'x',
                fieldLabel: 'Some filter',
                value: 99,
                maxValue: 99,
                minValue: 0
            },            
            {
                xtype      : 'fieldcontainer',
                fieldLabel : 'Radio',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [
                    {
                        boxLabel  : 'M',
                        name      : 'size',
                        inputValue: 'm',
                        id        : 'radio1'
                    }, {
                        boxLabel  : 'L',
                        name      : 'size',
                        inputValue: 'l',
                        id        : 'radio2'
                    }, {
                        boxLabel  : 'XL',
                        name      : 'size',
                        inputValue: 'xl',
                        id        : 'radio3'
                    }
                ]
            }            
            ]/*,

			dockedItems: [{
				xtype: 'toolbar',
				items: [{
					text: 'Add Filter',
					action: 'add'
				}, {
					text: 'Remove Filter',
					disabled: true,
					action: 'remove'
				}]
			}]*/
		});

		this.callParent(arguments);
	},
	
	onSelectionChange: function(selmodel, selection) {
        var selected = selection[0],
            button = this.down('button[action=remove]');
        if (selected) {
            button.enable();
        }
        else {
            button.disable();
        }
	}
});

