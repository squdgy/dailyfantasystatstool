Ext.define('DFST.view.filter.List', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.filterlist',

    requires: ['Ext.toolbar.Toolbar'],

	title: 'Reduce the # of Players to Choose From',
	collapsible: true,
	animCollapse: true,
	margins: '5 0 5 5',
    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },

	initComponent: function() {
		Ext.apply(this, {
			items: [
            {
                xtype: 'datefield',
                fieldLabel: 'Date of Game', //this is the day we want to do estimates for
                name: 'game_date',
                width: 230,
                value: new Date(),   // defaults to today
                minDate: new Date() // min date is today
            }, 
            {
                xtype: 'radiogroup',
                fieldLabel: 'Scoring (resets position and value filters)',
                layout: {
                    type: 'table',
                    columns: 2
                },
                items: [
                    { boxLabel: 'FanDuel', name: 'rb', inputValue: 'fd', checked: true },
                    { boxLabel: 'DailyJoust', name: 'rb', inputValue: 'dj'},
                    { boxLabel: 'DraftDay', name: 'rb', inputValue: 'dd'}/*,
                    { boxLabel: 'BuzzDraft', name: 'rb', inputValue: 'bd'}*/
                ]
            },            
            {
                xtype: 'panel',
                collapsible: true,
                collapsed: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'Position Filters',
                items: [{
                    xtype: 'checkbox',
                    boxLabel: 'Exclude Pitchers Not Expected To Start',
                    id: 'probables',
                    name: 'probables',
                    checked: true
                },{
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
                        columns: 4
                    }
                }]
            },
            {
                xtype: 'panel',
                collapsible: true,
                collapsed: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'Value Filters',
                items: [
                {
                    fieldLabel: 'Filter $',
                    xtype: 'multislider',
                    id: 'salRange',
                    width: 350,
                    values: [0, 10000],
                    increment: 500,
                    minValue: 0,
                    maxValue: 10000
                },
                {
                    fieldLabel: 'Filter $/Pt',
                    xtype: 'multislider',
                    id: 'cppRange',
                    width: 350,
                    values: [0, 1500],
                    increment: 50,
                    minValue: 0,
                    maxValue: 1500
                },
                {
                    fieldLabel: 'Filter Avg Pts',
                    xtype: 'multislider',
                    id: 'afpRange',
                    width: 350,
                    values: [0, 20],
                    increment: 1,
                    minValue: 0,
                    maxValue: 20
                }]
            },
            {
                xtype: 'panel',
                collapsible: true,
                collapsed: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'Starting Lineup Filters',
                items: [
                    {
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
                    },            
                    {
                        width: '100%',
                        html: 'Notes: Starting lineups are updated periodically.<br/>To see which teams\' lineups are in, look at the Games Filters.<br/>Teams with lineups are marked with a *.'
                }]
            },
            {
                xtype: 'panel',
                collapsible: true,
                collapsed: true,
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
                collapsed: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'Other Filters',
                items: [
                    {
                        xtype: 'checkbox',
                        id: 'injured',
                        boxLabel: 'Exclude Injured',
                        checked: false
                    },
                    {
                        fieldLabel: 'Filter # Games',
                        xtype: 'multislider',
                        id: 'ngRange',
                        width: 350,
                        values: [0, 50],
                        increment: 5,
                        minValue: 0,
                        maxValue: 50
                    }
                ]
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

