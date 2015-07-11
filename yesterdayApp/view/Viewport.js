/*global Ext: false, DFST: false */
Ext.define('Yesterday.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'app.AppSettings', // from dfst app
        'yesterdayApp.view.yesterday.Grid',
        'Ext.layout.container.Border'
    ],
    
	layout: 'border',
	
	initComponent: function(){
        var sportLinks = '';
        var sports = ['mlb', 'nfl', 'nba', 'nhl'];
        for (var i in sports) {
            var sport = sports[i];
            if (sport === DFST.AppSettings.sport) {
                sportLinks += '<span class="sport-link">' + 
                    sport.toUpperCase() + '</span>';
            } else if (sport === 'nba' || sport === 'nhl' || sport === 'nfl') { // off-season
                sportLinks += '<span class="sport-link off-season">' + 
                    sport.toUpperCase() + '</span>';
            } else {  
                sportLinks += '<span class="sport-link"><a href="index.html?sport=' + 
                sport + '">' + 
                sport.toUpperCase() + '</a></span>';
            }
        }
        var footerHtml = '<footer>Daily Fantasy Stats Tool, Version ' + 
            DFST.AppSettings.version + 
            ', Copyright 2012-2015 Development Partners Software Corp. ' + 
            'Game time weather powered by <a href="http://www.forecast.io">Forecast.io</a>' + 
            sportLinks + 
            '</footer>';
		Ext.apply(this, {
            items: [
            /*put summary of choices here? site, filters, etc.
            {
                region: 'north',
                html: '<header>Summary</header>'
            },*/{
                region: 'center',
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    padding: 0,
                    align: 'stretch'
                }
            }, {
                region: 'west',
                width: 200,
                xtype: 'container'
            }, {
                region: 'west',
                width: 340,
                xtype: 'container'
            }, {
                region: 'west',
                width: 370,
                xtype: 'container'
            }, {
                region: 'east',
                width: 200,
                xtype: 'container',
                hidden: true
            }, {
                region: 'south',
                html: footerHtml
            }]}
		);

alert('foo');
        this.callParent(arguments);
	}
});

