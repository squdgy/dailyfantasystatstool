/*global Ext: false, DFST: false */
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
	
	initComponent: function(){
        var sportLinks = '';
        var sports = ['mlb', 'nfl', 'nba', 'nhl', 'nas'];
        for (var i in sports) {
            var sport = sports[i];
            if (sport === DFST.AppSettings.sport) {
                sportLinks += '<span class="sport-link">' + 
                    sport.toUpperCase() + '</span>';
            } else if (sport === 'mlb') { // off-season
                sportLinks += '<span class="sport-link off-season">' + 
                    sport.toUpperCase() + '</span>';
            } else {  
                sportLinks += '<span class="sport-link"><a href="index.html?sport=' + 
                sport + '">' + 
                sport.toUpperCase() + '</a></span>';
            }
        }
        var footerHtml = '<footer>Daily Fantasy Stats Tool, Version ' + 
            DFST.AppSettings.version + ' ' + DFST.AppSettings.appCopyRight + ' - ' +
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
                    align: 'stretch',
                    pack: 'justify'
                },
                defaults: {
                  margin: 1 
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
                width: 340,
                xtype: 'rosterbuilder'
            }, {
                region: 'west',
                width: 370,
                xtype: 'filterlist'
            }, {
                region: 'east',
                width: 200,
                xtype: 'gamedetails',
                hidden: true
            }, {
                region: 'south',
                html: footerHtml
            }]}
		);

        this.callParent(arguments);
	}
});

