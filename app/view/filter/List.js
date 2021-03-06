/*global Ext: false, DFST:false*/
Ext.define('DFST.view.filter.List', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.filterlist',
    id: 'filterlist',
    requires: ['Ext.toolbar.Toolbar', 'DFST.view.game.Picker'],

    stateful: false,
    stateId: 'filterlist',
    stateEvents: ['expand', 'collapse'],
    
	title: 'Apply Filters',
	collapsible: true,
	collapsed: true,
	animCollapse: true,
	padding: 0,
	defaults: {
	    margin: '1 -1 0 0',
	    border: false
	},

    layout: {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },

	initComponent: function() {
	    var numGamesText = '# ' + Ext.String.capitalize(DFST.AppSettings[DFST.AppSettings.sport].gameText) + 's';
		Ext.apply(this, {
			items: [{
                xtype: 'panel',
                id: 'positionsPanel',
                collapsible: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'By Position(s)',
                items: [{
                    xtype: 'panel',
                    border: false,
                    layout : {
                        type : 'hbox',
                        pack : 'end'
                    },
                    width: '100%',
                    items: [{
                        xtype: 'checkbox',
                        boxLabel: DFST.AppSettings.sport === 'mlb' ? 'Starting Pitchers Only' : 'Include only Confirmed &amp; Probable Goalies',
                        id: 'probables',
                        name: 'probables',
                        hidden: (DFST.AppSettings.sport !== 'mlb' && DFST.AppSettings.sport !== 'nhl'),
                        checked: !(DFST.AppSettings.siteId === 7 && DFST.AppSettings.sport === 'nhl')
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
                    }
                ]},
                {
                    xtype: 'fieldcontainer',
                    id: 'positions',
                    fieldLabel: '',
                    labelWidth: 60,
                    defaultType: 'checkboxfield',
                    layout: {
                        type: 'table',
                        columns: 7
                    }
                }]
            },
            {
                xtype: 'gamepicker'
            },
            {
                xtype: 'panel',
                border: false,
                hidden: DFST.AppSettings.sport !== 'mlb' && DFST.AppSettings.sport !== 'nhl',                    
                collapsible: true,
                animCollapse: true,
                collapsed: true,
                layout: 'vbox',
                title: DFST.AppSettings.sport === 'mlb' ? 'By Starting Lineup' : 'By Line',
                items: [
                    {
                        width: '100%',
                        border: false,
                        bodyCls: 'featured',
                        html: DFST.AppSettings.sport === 'mlb' ? 'Teams with posted lineups have a * in the games list' : ''
                    },{
                        xtype: 'fieldcontainer',
                        id: 'battingorderFilter',
                        fieldLabel: DFST.AppSettings.sport === 'mlb' ? 'Include players batting in these positions' : 'lines',
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
                            { name: 'boFilter', boxLabel: '5', inputValue: '5', hidden: DFST.AppSettings.sport !== 'mlb' },
                            { name: 'boFilter', boxLabel: '6', inputValue: '6', hidden: DFST.AppSettings.sport !== 'mlb' },
                            { name: 'boFilter', boxLabel: '7', inputValue: '7', hidden: DFST.AppSettings.sport !== 'mlb' },
                            { name: 'boFilter', boxLabel: '8', inputValue: '8', hidden: DFST.AppSettings.sport !== 'mlb' },
                            { name: 'boFilter', boxLabel: '9', inputValue: '9', hidden: DFST.AppSettings.sport !== 'mlb' }
                        ]                
                    },{
                        xtype: 'fieldcontainer',
                        id: 'powerPlayFilter',
                        fieldLabel: 'powerplay lines',
                        defaultType: 'checkboxfield',
                        layout: {
                            type: 'table',
                            columns: 4
                        },
                        defaults: {
                            checked: false
                        },
                        items: [
                            { name: 'ppFilter', boxLabel: '1', inputValue: '1' },
                            { name: 'ppFilter', boxLabel: '2', inputValue: '2' }
                        ]                
                    },{
                        xtype: 'checkbox',
                        id: 'notinlineup',
                        boxLabel: 'Hide Benchwarmers',
                        tooltip: 'Until starting lineups are posted, this will have no effect',
                        checked: false
                    }            
                    ]
            },
            {
                xtype: 'panel',
                collapsible: DFST.AppSettings[DFST.AppSettings.sport].hasTeams,
                animCollapse: true,
                collapsed: DFST.AppSettings[DFST.AppSettings.sport].hasTeams,
                layout: 'vbox',
                title: 'By Value',
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
                    hidden: DFST.AppSettings.sport !== 'nba'
                },{
                    fieldLabel: '$/FP',
                    xtype: 'multislider',
                    id: 'cppRange',
                    width: 350,
                    values: [0, 800],
                    increment: 40,
                    minValue: 0,
                    maxValue: 800
                },{
                    fieldLabel: '$/FP-5',
                    xtype: 'multislider',
                    id: 'cpp5Range',
                    width: 350,
                    values: [0, 800],
                    increment: 40,
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
                    hidden: DFST.AppSettings.sport !== 'nba'
                }]
            },
            {
                xtype: 'panel',
                collapsible: DFST.AppSettings[DFST.AppSettings.sport].hasTeams,
                animCollapse: true,
                collapsed: DFST.AppSettings[DFST.AppSettings.sport].hasTeams,
                layout: 'vbox',
                title: 'Miscellaneous',
                items: [{
                    fieldLabel: numGamesText,
                    xtype: 'multislider',
                    id: 'ngRange',
                    width: 350,
                    values: [0, DFST.AppSettings[DFST.AppSettings.sport].gameCnt],
                    increment: 1,
                    minValue: 0,
                    maxValue: DFST.AppSettings[DFST.AppSettings.sport].gameCnt
                },
                {   //nfl
                    fieldLabel: 'Depth',
                    xtype: 'multislider',
                    id: 'depRange',
                    width: 350,
                    values: [0, 5],
                    increment: 1,
                    minValue: 0,
                    maxValue: 5,
                    hidden: true //DFST.AppSettings.sport !== 'nfl'
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
                    xtype: 'fieldcontainer',
                    id: 'bats',
                    fieldLabel: 'Bats',
                    hidden: DFST.AppSettings.sport !== 'mlb',
                    labelWidth: 60,
                    defaultType: 'checkboxfield',
                    layout: {
                        type: 'table',
                        columns: 3
                    },
                    items: [
                    {
                        boxLabel  : 'Left',
                        name      : 'bats',
                        inputValue: '1',
                        checked   : true,
                        id        : 'batsLeft'
                    }, {
                        boxLabel  : 'Right',
                        name      : 'bats',
                        inputValue: '2',
                        checked   : true,
                        id        : 'batsRight'
                    }, {
                        boxLabel  : 'Switch',
                        name      : 'bats',
                        inputValue: '3',
                        checked   : true,
                        id        : 'batsSwitch'
                    }]
                }, {
                    xtype: 'checkbox',
                    id: 'injured',
                    boxLabel: 'Hide Injured Players',
                    hidden: !DFST.AppSettings[DFST.AppSettings.sport].showInjuries,
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

