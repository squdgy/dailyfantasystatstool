/*global Ext: false, DFST: false */
Ext.define('DFST.view.site.Picker', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.sitepicker',
	
	cls: 'sitepicker',
	id: 'sitepicker',
	border: false,
    collapsible: true,
	animCollapse: true,
	
    stateful: true,
    stateId: 'sitepicker',
    
	initComponent: function() {
        var nflweeks = Ext.create('Ext.data.Store', {
            fields: ['week', 'name', 'startdate', 'enddate'],
            data : [
                {'week': 1, 'name':'Week 1', startdate: new Date('2014-09-04'), enddate: new Date('2014-09-08')},
                {'week': 2, 'name':'Week 2', startdate: new Date('2014-09-11'), enddate: new Date('2014-09-15')},
                {'week': 3, 'name':'Week 3', startdate: new Date('2014-09-18'), enddate: new Date('2014-09-22')},
                {'week': 4, 'name':'Week 4', startdate: new Date('2014-09-25'), enddate: new Date('2014-09-29')},
                {'week': 5, 'name':'Week 5', startdate: new Date('2014-10-02'), enddate: new Date('2014-10-06')},
                {'week': 6, 'name':'Week 6', startdate: new Date('2014-10-09'), enddate: new Date('2014-10-13')},
                {'week': 7, 'name':'Week 7', startdate: new Date('2014-10-16'), enddate: new Date('2014-10-20')},
                {'week': 8, 'name':'Week 8', startdate: new Date('2014-10-23'), enddate: new Date('2014-10-27')},
                {'week': 9, 'name':'Week 9', startdate: new Date('2014-10-30'), enddate: new Date('2014-11-03')},
                {'week': 10, 'name':'Week 10', startdate: new Date('2014-11-06'), enddate: new Date('2014-11-10')},
                {'week': 11, 'name':'Week 11', startdate: new Date('2014-11-13'), enddate: new Date('2014-11-17')},
                {'week': 12, 'name':'Week 12', startdate: new Date('2014-11-20'), enddate: new Date('2014-11-24')},
                {'week': 13, 'name':'Week 13', startdate: new Date('2014-11-27'), enddate: new Date('2014-12-01')},
                {'week': 14, 'name':'Week 14', startdate: new Date('2014-12-04'), enddate: new Date('2014-12-08')},
                {'week': 15, 'name':'Week 15', startdate: new Date('2014-12-11'), enddate: new Date('2014-12-15')},
                {'week': 16, 'name':'Week 16', startdate: new Date('2014-12-21'), enddate: new Date('2014-12-22')},
                {'week': 17, 'name':'Week 17', startdate: new Date('2014-12-28'), enddate: new Date('2014-12-28')}
            ]
        });        
        var getNearestNFLWeek = function(){
            var seasonStart = new Date(2014, 8, 4); // Thu Wk 1
            var today = new Date();
            today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            var diff = today - seasonStart; // in ms
            if (diff < 1) return 1;
            var daysSince = Math.abs(Math.round(diff/(1000*60*60*24)));
            var weeksSince = Math.abs(Math.floor(diff/(1000*60*60*24*7)));
            //Figure out what week to show based on day of week
            var mod = daysSince % 7;
            return (mod >= 5) ? weeksSince+2 : weeksSince+1;
        };
        var datesConfig = {};
        datesConfig.mlb = {
                xtype: 'datefield',
                name: 'game_date',
                value: new Date()//,   // defaults to today
                //minValue: new Date() // min date is today
            };
        datesConfig.nba = datesConfig.mlb;
        datesConfig.nhl = datesConfig.mlb;
        datesConfig.nfl = {
                xtype: 'combobox',
                //fieldLabel: 'Change',
                name: 'game_week',
                store: nflweeks,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'week',
                value: getNearestNFLWeek()
            };
            
        var siteItems = [
                    { boxLabel: 'DraftKings', name: 'rb', inputValue: '1'},
                    { boxLabel: 'FanDuel', name: 'rb', inputValue: '2' },
                    //{ boxLabel: 'DraftStreet', name: 'rb', inputValue: '3'},
                    { boxLabel: 'DraftDay', name: 'rb', inputValue: '4'},
                   //{ boxLabel: 'FantasyFeud', name: 'rb', inputValue: '5'}
                    { boxLabel: 'Yahoo', name: 'rb', inputValue: '6'}
                ];
        if (DFST.AppSettings.sport !== 'nfl'){
            siteItems.push({ boxLabel: 'FantasyFeud', name: 'rb', inputValue: '5'});
        }                
        var selectedSiteItem = Ext.Array.findBy(siteItems, function(item, index){
            return (item.inputValue == DFST.AppSettings.siteId); //compares string and int
        });
        var title = 'Select a Site';
        if (selectedSiteItem !== null) {
            selectedSiteItem.checked = true;
            title += ' - ' + selectedSiteItem.boxLabel;
        }

		Ext.apply(this, {
            title: title,
			items: [{
                xtype: 'radiogroup',
                layout: {
                    type: 'table',
                    columns: 1
                },
                items: siteItems
            },
            datesConfig[DFST.AppSettings.sport],
            {
                xtype: 'panel',
                border: false,
                html: '<ul class="notes">Notes:' +
                    '<li>You can switch back and forth amongst sites, dates, and sports and any lineup edits will be saved (for up to 3 days).</li>' +
                    '<li>Switching amongst sites will reset all filters that rely on site specific data, such as roster position.</li>' +
                    '<li>Salaries may not be available for all dates. If not, the player grid will be empty.</li>' +
                    '</ul>'
			},
			{
                xtype: 'button',
                id: 'globalreset',
                text: 'Reset Panels',
                tooltip: 'This will reset all panel and grid settings to app defaults (ex. expand/collapse, column order) and reload the page.'
			}
        ]});

		this.callParent(arguments);
	}
});
