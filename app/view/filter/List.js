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
            }, 
            {
                xtype: 'radiogroup',
                fieldLabel: 'Scoring',
                layout: {
                    type: 'table',
                    columns: 2
                },
                items: [
                    { boxLabel: 'FanDuel', name: 'rb', inputValue: 'fd', checked: true }/*,
                    { boxLabel: 'DraftDay', name: 'rb', inputValue: 'dd'}*/
                ]
            },            
            {
                xtype: 'checkbox',
                boxLabel: 'Include Probable Pitchers Only',
                id: 'probables',
                name: 'probables',
                checked: false
            },
            {
                xtype: 'splitbutton',
                text: 'Position Subset',
                menu: {
                    xtype: 'menu',
                    items: [
                        {text: 'all'},
                        {text: 'none'},
                        {text: 'pitchers'},
                        {text: 'outfielders'},
                        {text: 'infielders'}
                    ]
                }
            },
            {
                xtype: 'fieldcontainer',
                id: 'positions',
                fieldLabel: 'Positions to Include',
                defaultType: 'checkboxfield',
                layout: {
                    type: 'table',
                    columns: 3
                },
                items: [
                    {
                        boxLabel: 'P',
                        name: 'pos',
                        checked: true,
                        inputValue: 'P'
                    },
                    {
                        boxLabel: 'C',
                        name: 'pos',
                        checked: true,
                        inputValue: 'C'
                    },
                    {
                        boxLabel: '1B',
                        name: 'pos',
                        checked: true,
                        inputValue: '1B'
                    },
                    {
                        boxLabel: '2B',
                        name: 'pos',
                        checked: true,
                        inputValue: '2B'
                    },
                    {
                        boxLabel: '3B',
                        name: 'pos',
                        checked: true,
                        inputValue: '3B'
                    },
                    {
                        boxLabel: 'SS',
                        name: 'pos',
                        checked: true,
                        inputValue: 'SS'
                    },
                    {
                        boxLabel: 'RF',
                        name: 'pos',
                        checked: true,
                        inputValue: 'RF'
                    },
                    {
                        boxLabel: 'CF',
                        name: 'pos',
                        checked: true,
                        inputValue: 'CF'
                    },
                    {
                        boxLabel: 'LF',
                        name: 'pos',
                        checked: true,
                        inputValue: 'LF'
                    },
                    {
                        boxLabel: 'OF',
                        name: 'pos',
                        checked: true,
                        inputValue: 'OF',
                        hidden: true
                    },
                    {
                        boxLabel: 'DH',
                        name: 'pos',
                        checked: true,
                        inputValue: 'DH'
                    }                    
                ]
            },
            {
                html: '<hr height=10px; width=250px;/>'
            }/*,
            {
                html: '<p>Default Scoring based on Fanduel<ul>Hitters<li>1B = 1pt<li>2B = 2pts<li>3B = 3pts<li>HR = 4pts<li>RBI = 1pt<li>R = 1pt<li>BB = 1pt<li>SB = 2pts<li>HBP = 1<li>Out (calculated as at bats - hits) = -.25pt</ul><ul>Pitchers<li>W = 5pts<li>ER = -1pt<li>SO = 1pt<li>IP = 1pt*<li>* Fractional scoring per out.</ul</p>'
            },{
                html: '<article>This is DFST version 0.1. Other scoring options will be available in version 0.2</article>'
            },
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
            },*/
            ]
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

