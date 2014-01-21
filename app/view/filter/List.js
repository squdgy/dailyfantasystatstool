/*global Ext: false, DFST:false*/
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
        var nflweeks = Ext.create('Ext.data.Store', {
            fields: ['week', 'name', 'startdate', 'enddate'],
            data : [
                {'week': 1, 'name':'Week 1', startdate: new Date('2013-09-05'), enddate: new Date('2013-09-09')},
                {'week': 2, 'name':'Week 2', startdate: new Date('2013-09-12'), enddate: new Date('2013-09-16')},
                {'week': 3, 'name':'Week 3', startdate: new Date('2013-09-19'), enddate: new Date('2013-09-23')},
                {'week': 4, 'name':'Week 4', startdate: new Date('2013-09-26'), enddate: new Date('2013-09-30')},
                {'week': 5, 'name':'Week 5', startdate: new Date('2013-10-03'), enddate: new Date('2013-10-07')},
                {'week': 6, 'name':'Week 6', startdate: new Date('2013-10-10'), enddate: new Date('2013-10-14')},
                {'week': 7, 'name':'Week 7', startdate: new Date('2013-10-17'), enddate: new Date('2013-10-21')},
                {'week': 8, 'name':'Week 8', startdate: new Date('2013-10-24'), enddate: new Date('2013-10-28')},
                {'week': 9, 'name':'Week 9', startdate: new Date('2013-10-31'), enddate: new Date('2013-11-04')},
                {'week': 10, 'name':'Week 10', startdate: new Date('2013-11-07'), enddate: new Date('2013-11-11')},
                {'week': 11, 'name':'Week 11', startdate: new Date('2013-11-14'), enddate: new Date('2013-11-18')},
                {'week': 12, 'name':'Week 12', startdate: new Date('2013-11-21'), enddate: new Date('2013-11-25')},
                {'week': 13, 'name':'Week 13', startdate: new Date('2013-11-28'), enddate: new Date('2013-12-02')},
                {'week': 14, 'name':'Week 14', startdate: new Date('2013-12-05'), enddate: new Date('2013-12-09')},
                {'week': 15, 'name':'Week 15', startdate: new Date('2013-12-12'), enddate: new Date('2013-12-16')},
                {'week': 16, 'name':'Week 16', startdate: new Date('2013-12-22'), enddate: new Date('2013-12-23')},
                {'week': 17, 'name':'Week 17', startdate: new Date('2013-12-29'), enddate: new Date('2013-12-29')}
            ]
        });        
        var getNearestNFLWeek = function(){
            var seasonStart = new Date(2013, 8, 5); // Thu Wk 1
            var today = new Date();
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            var diff = today - seasonStart; // in ms
            var daysSince = Math.abs(Math.round(diff/(1000*60*60*24)));
            var weeksSince = Math.abs(Math.floor(diff/(1000*60*60*24*7)));
            //Figure out what week to show based on day of week
            var mod = daysSince % 7;
            return (mod >= 5) ? weeksSince+2 : weeksSince+1;
        };
        var datesConfig = {};
        datesConfig.mlb = {
                xtype: 'datefield',
                fieldLabel: '1. Pick a date', //this is the day we want to do estimates for
                name: 'game_date',
                width: 230,
                value: new Date()//,   // defaults to today
                //minValue: new Date() // min date is today
            };
        datesConfig.nba = datesConfig.mlb;
        datesConfig.nhl = datesConfig.mlb;
        datesConfig.nfl = {
                xtype: 'combobox',
                fieldLabel: '1. Pick a week',
                labelWidth: 105,
                name: 'game_week',
                store: nflweeks,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'week',
                value: getNearestNFLWeek()
            };
        var siteItems = [
                    { boxLabel: 'DraftKings', name: 'rb', inputValue: '1'},
                    { boxLabel: 'FanDuel', name: 'rb', inputValue: '2', checked: true },
                    { boxLabel: 'DraftDay', name: 'rb', inputValue: '4'},
                    { boxLabel: 'FantasyFeud', name: 'rb', inputValue: '5'}
                ];
        if (DFST.AppSettings.sport === 'nfl') {
            //siteItems.push({ boxLabel: 'DraftStreet', name: 'rb', inputValue: '3'});
        }

		Ext.apply(this, {
			items: [
            datesConfig[DFST.AppSettings.sport],
            {
                xtype: 'label',
                text: '2. Pick a site (for scoring and positions):'
            },
            {
                xtype: 'radiogroup',
                layout: {
                    type: 'table',
                    columns: 3
                },
                items: siteItems
            },            
            {
                xtype: 'label',
                text: '3. Apply filters to narrow down the list of players to choose from:'
            },
            {
                xtype: 'panel',
                collapsible: true,
                collapsed: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'Roster Position Filters',
                items: [
                {
                    html: 'Roster positions may vary among sites.<br/>If you change sites, all roster position filters will reset to checked.'
                },    
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
                    layout: {
                        type: 'table',
                        columns: 4
                    }
                }]
            },
            {
                xtype: 'panel',
                hidden: DFST.AppSettings.sport !== 'mlb',                    
                collapsible: true,
                collapsed: true,
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
                title: 'Value Filters',
                items: [
                {
                    width: '100%',
                    html: 'Pricing varies among sites.<br/>If you change sites, these filters will reset.'
                },{
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
                collapsed: true,
                animCollapse: true,
                layout: 'vbox',
                title: 'Miscellaneous Filters',
                items: [
                {
                    xtype: 'checkbox',
                    id: 'injured',
                    boxLabel: 'Hide Injured Players',
                    checked: false
                },
                {
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
                },
                {
                    fieldLabel: 'ODR-5',
                    xtype: 'multislider',
                    id: 'odrRange',
                    width: 350,
                    values: [0, 30],
                    increment: 1,
                    minValue: 0,
                    maxValue: 30,
                    hidden: DFST.AppSettings.sport !== 'nba'
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

