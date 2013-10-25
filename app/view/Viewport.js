/*global Ext: false */
Ext.define('DFST.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'DFST.AppSettings',
        'DFST.view.filter.List',
        'DFST.view.drilldown.Details',
        'DFST.view.weather.Display',
        'Ext.layout.container.Border'
    ],
    
    stores: ['Stats'],

	layout: 'border',

	items: [{
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
        },{
            xtype: 'weatherdisplay',
            hidden: true
        }]
	}, {
		region: 'west',
		width: 370,
        xtype: 'filterlist'
	}, {
        region: 'south',
        html: '<footer>Daily Fantasy Stats Tool, Version 1.0, Copyright 2012-2013 Development Partners Software Corp. Game time weather powered by <a href="http://www.forecast.io">Forecast.io</a><span class="sport-link"><!--<a href="index.html?sport=mlb">MLB</a>-->MLB</span><span class="sport-link"><a href="index.html?sport=nfl">NFL</a></span><span class="sport-link"><a href="index.html?sport=nba">NBA</a></span><span class="sport-link"><a href="index.html?sport=nhl">NHL</a></span></footer>'
    }
    ]
});

