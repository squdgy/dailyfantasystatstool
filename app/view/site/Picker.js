/*global Ext: false, DFST: false */
Ext.define('DFST.view.site.Picker', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.sitepicker',
	
	cls: 'sitepicker',
	id: 'sitepicker',
	border: false,
    collapsible: true,
	animCollapse: true,
	
	initComponent: function() {
        var nflweeks = Ext.create('Ext.data.Store', {
            fields: ['week', 'name', 'startdate', 'enddate'],
            data : [
                {'week': 1, 'name':'Week 1', startdate: new Date('2016-09-08'), enddate: new Date('2016-09-14')},
                {'week': 2, 'name':'Week 2', startdate: new Date('2016-09-15'), enddate: new Date('2016-09-21')},
                {'week': 3, 'name':'Week 3', startdate: new Date('2016-09-22'), enddate: new Date('2016-09-28')},
                {'week': 4, 'name':'Week 4', startdate: new Date('2016-09-29'), enddate: new Date('2016-10-05')},
                {'week': 5, 'name':'Week 5', startdate: new Date('2016-10-06'), enddate: new Date('2016-10-12')},
                {'week': 6, 'name':'Week 6', startdate: new Date('2016-10-13'), enddate: new Date('2016-10-19')},
                {'week': 7, 'name':'Week 7', startdate: new Date('2016-10-20'), enddate: new Date('2016-10-26')},
                {'week': 8, 'name':'Week 8', startdate: new Date('2016-10-27'), enddate: new Date('2016-11-02')},
                {'week': 9, 'name':'Week 9', startdate: new Date('2016-11-03'), enddate: new Date('2016-11-09')},
                {'week': 10, 'name':'Week 10', startdate: new Date('2016-11-10'), enddate: new Date('2016-11-16')},
                {'week': 11, 'name':'Week 11', startdate: new Date('2016-11-17'), enddate: new Date('2016-11-23')},
                {'week': 12, 'name':'Week 12', startdate: new Date('2016-11-24'), enddate: new Date('2016-11-30')},
                {'week': 13, 'name':'Week 13', startdate: new Date('2016-12-01'), enddate: new Date('2016-12-07')},
                {'week': 14, 'name':'Week 14', startdate: new Date('2016-12-08'), enddate: new Date('2016-12-14')},
                {'week': 15, 'name':'Week 15', startdate: new Date('2016-12-15'), enddate: new Date('2016-12-21')},
                {'week': 16, 'name':'Week 16', startdate: new Date('2016-12-22'), enddate: new Date('2016-12-31')},
                {'week': 17, 'name':'Week 17', startdate: new Date('2016-01-01'), enddate: new Date('2016-01-02')}
            ]
        });    
        var getNearestNFLWeek = function(){
            var seasonStart = new Date(2016, 8, 4); // Thu Wk 1
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
        datesConfig.nas = {
                xtype: 'datefield',
                name: 'game_date',
                value: new Date()//,   // defaults to today
            };
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
                    //{ boxLabel: 'DraftStreet', name: 'rb', inputValue: '3'},
                    //{ boxLabel: 'DraftDay', name: 'rb', inputValue: '4'},
                    //{ boxLabel: 'FantasyFeud', name: 'rb', inputValue: '5'}
                    //{ boxLabel: 'Yahoo', name: 'rb', inputValue: '6'}
                ];
        if (DFST.AppSettings.sport !== 'nas'){
            siteItems.push({ boxLabel: 'FanDuel', name: 'rb', inputValue: '2' });
        }    
        if (DFST.AppSettings.sport !== 'nfl'){
            //siteItems.push({ boxLabel: 'FantasyFeud', name: 'rb', inputValue: '5'});
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
