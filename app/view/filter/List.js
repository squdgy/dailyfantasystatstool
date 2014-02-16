/*global Ext: false, DFST:false*/
Ext.define('DFST.view.filter.List', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.filterlist',
    id: 'filterlist',
    requires: ['Ext.toolbar.Toolbar'],

	title: 'Narrow Down the List of Players',
	collapsible: true,
	collapsed: true,
	animCollapse: true,
    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },

	initComponent: function() {
		Ext.apply(this, {
			items: [{
                xtype: 'panel',
                collapsible: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'Roster Position Filters',
                items: [
                {
                    xtype: 'checkbox',
                    boxLabel: DFST.AppSettings.sport === 'mlb' ? 'Exclude Pitchers Not Expected To Start' : 'Include only Confirmed &amp; Probable Goalies',
                    id: 'probables',
                    name: 'probables',
                    hidden: DFST.AppSettings.sport !== 'mlb' && DFST.AppSettings.sport !== 'nhl',
                    checked: true
                },{
                    xtype: 'splitbutton',
                    text: 'Position Subset',
                    hidden: DFST.AppSettings.sport !== 'mlb',                    
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
                    fieldLabel: 'Include:',
                    defaultType: 'checkboxfield',
                    width: '100%',
                    layout: {
                        type: 'table',
                        columns: 6
                    }
                }]
            },
            {
                xtype: 'panel',
                hidden: DFST.AppSettings.sport !== 'mlb',                    
                collapsible: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'Starting Lineup Filters',
                items: [
                    {
                        width: '100%',
                        html: 'Starting lineups are updated periodically.<br/>To see which teams\' lineups are in, look at the Games Filters.<br/>Teams with known lineups are marked with a *.'
                    },{
                        xtype: 'checkbox',
                        id: 'notinlineup',
                        boxLabel: 'Hide players not known to be playing',
                        checked: false
                    },
                    {
                        xtype: 'fieldcontainer',
                        id: 'battingorderFilter',
                        fieldLabel: 'Include players batting in these positions',
                        defaultType: 'checkboxfield',
                        layout: {
                            type: 'table',
                            columns: 5
                        },
                        defaults: {
                            checked: true
                        },
                        items: [
                            { name: 'boFilter', boxLabel: '1', inputValue: '1' },
                            { name: 'boFilter', boxLabel: '2', inputValue: '2' },
                            { name: 'boFilter', boxLabel: '3', inputValue: '3' },
                            { name: 'boFilter', boxLabel: '4', inputValue: '4' },
                            { name: 'boFilter', boxLabel: '5', inputValue: '5' },
                            { name: 'boFilter', boxLabel: '6', inputValue: '6' },
                            { name: 'boFilter', boxLabel: '7', inputValue: '7' },
                            { name: 'boFilter', boxLabel: '8', inputValue: '8' },
                            { name: 'boFilter', boxLabel: '9', inputValue: '9' }
                        ]                
                    }            
                    ]
            },
            {
                xtype: 'panel',
                collapsible: true,
                animCollapse: true,
                layout: 'fit',
                title: 'Game Filters',
                items: [{
                    xtype: 'fieldcontainer',
                    id: 'games',
/*                    fieldLabel: 'Games to Include', */
                    defaultType: 'checkboxfield',
                    layout: {
                        type: 'table',
                        columns: 2
                    }
                }]
            },
            {
                xtype: 'panel',
                collapsible: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'Value Filters',
                items: [{
                    fieldLabel: '$',
                    xtype: 'multislider',
                    id: 'salRange',
                    width: 350,
                    values: [0, 10000],
                    increment: 500,
                    minValue: 0,
                    maxValue: 10000
                },{
                    fieldLabel: 'Avg FP',
                    xtype: 'multislider',
                    id: 'afpRange',
                    width: 350,
                    values: [0, 20],
                    increment: 1,
                    minValue: 0,
                    maxValue: 20
                },{
                    fieldLabel: 'Avg FP-5',
                    xtype: 'multislider',
                    id: 'afp5Range',
                    width: 350,
                    values: [0, 70],
                    increment: 2,
                    minValue: 0,
                    maxValue: 70
                },{
                    fieldLabel: 'Proj',
                    xtype: 'multislider',
                    id: 'projpRange',
                    width: 350,
                    values: [0, 30],
                    increment: 1,
                    minValue: 0,
                    maxValue: 30,
                    hidden: DFST.AppSettings.sport !== 'nhl'
                },{
                    fieldLabel: '$/FP',
                    xtype: 'multislider',
                    id: 'cppRange',
                    width: 350,
                    values: [0, 800],
                    increment: 0,
                    minValue: 0,
                    maxValue: 800
                },{
                    fieldLabel: '$/FP-5',
                    xtype: 'multislider',
                    id: 'cpp5Range',
                    width: 350,
                    values: [0, 800],
                    increment: 0,
                    minValue: 0,
                    maxValue: 800
                },{
                    fieldLabel: '$/Proj',
                    xtype: 'multislider',
                    id: 'cpprojpRange',
                    width: 350,
                    values: [0, 75000],
                    increment: 1000,
                    minValue: 0,
                    maxValue: 75000,
                    hidden: DFST.AppSettings.sport !== 'nhl'
                }]
            },
            {
                xtype: 'panel',
                collapsible: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'Miscellaneous',
                items: [{
                    fieldLabel: '# Games',
                    xtype: 'multislider',
                    id: 'ngRange',
                    width: 350,
                    values: [0, DFST.AppSettings[DFST.AppSettings.sport].gameCnt],
                    increment: 1,
                    minValue: 0,
                    maxValue: DFST.AppSettings[DFST.AppSettings.sport].gameCnt
                },
                {   //mlb specific
                    fieldLabel: 'MR Value',
                    xtype: 'multislider',
                    id: 'mr1Range',
                    width: 350,
                    values: [0, 5],
                    increment: 1,
                    minValue: 0,
                    maxValue: 5,
                    hidden: DFST.AppSettings.sport !== 'mlb'
                }, {
                    fieldLabel: 'ODR-5',
                    xtype: 'multislider',
                    id: 'odrRange',
                    width: 350,
                    values: [0, 30],
                    increment: 1,
                    minValue: 0,
                    maxValue: 30,
                    hidden: DFST.AppSettings.sport !== 'nba'
                }, {
                    xtype: 'checkbox',
                    id: 'injured',
                    boxLabel: 'Hide Injured Players',
                    checked: false
                }, {
                    text: 'Export Player List',
                    xtype: 'button',
                    id: 'export'
                }]
            }]
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

