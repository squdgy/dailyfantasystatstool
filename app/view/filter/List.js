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
                xtype: 'datefield',
                fieldLabel: 'Date of Game', //this is the day we want to do estimates for
                name: 'game_date',
                value: new Date(),   // defaults to today
                minDate: new Date() // min date is today
            }, {
                html: '<p>Default Scoring based on Fanduel<ul>Hitters<li>1B = 1pt<li>2B = 2pts<li>3B = 3pts<li>HR = 4pts<li>RBI = 1pt<li>R = 1pt<li>BB = 1pt<li>SB = 2pts<li>HBP = 1<li>Out (calculated as at bats - hits) = -.25pt</ul><ul>Pitchers<li>W = 5pts<li>ER = -1pt<li>SO = 1pt<li>IP = 1pt*<li>* Fractional scoring per out.</ul</p>'
            },{
                html: '<article>This is DFST version 0.1. Other scoring options will be available in version 0.2</article>'
            }/*,
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
            }*/            
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

