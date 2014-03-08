/*global Ext: false */
Ext.define('DFST.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'DFST.AppSettings',
        'DFST.view.filter.List',
        'DFST.view.drilldown.Details',
        'DFST.view.rosterbuilder.Panel',
        'DFST.view.site.Picker',
        'DFST.view.weather.Display',
        'Ext.layout.container.Border'
    ],
    
    stores: ['Stats'],

	layout: 'border',

	items: [/*put summary of choices here? site, filters, etc.
	{ 
        region: 'north',
        html: '<header>Summary</header>'
    },*/{
		region: 'center',
        xtype: 'container',
        layout: {
            type: 'vbox',
            padding: 5,
            align: 'stretch'
        },
        defaults:{
            margins:'0 0 5 0',
            flex: 1
            },
        items: [{
            xtype: 'statsetgrid',
            flex: 3
        },{
            xtype: 'drilldowndetails',
            hidden: true,
            flex:2
        }]
	}, {
		region: 'west',
		width: 200,
        xtype: 'sitepicker'
	}, {
		region: 'west',
		width: 370,
        xtype: 'filterlist'
	}, {
        region: 'west',
        width: 340,
        xtype: 'rosterbuilder'
    }, {
        region: 'east',
        xtype: 'gamedetails',
        hidden: true
    }, {
        region: 'south',
        html: '<footer>Daily Fantasy Stats Tool, Version 2.1.1, Copyright 2012-2014 Development Partners Software Corp. Game time weather powered by <a href="http://www.forecast.io">Forecast.io</a><span class="sport-link"><!--<a href="index.html?sport=mlb">MLB</a>-->MLB</span><span class="sport-link"><!--<a href="index.html?sport=nfl">NFL</a>-->NFL</span><span class="sport-link"><a href="index.html?sport=nba">NBA</a></span><span class="sport-link"><a href="index.html?sport=nhl">NHL</a></span></footer>'
    }]
});

