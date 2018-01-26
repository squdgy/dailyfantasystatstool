/*global Ext: false, DFST: false */
Ext.define('DFST.view.site.SportPicker', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.sportPicker',
	
    requires: ['DFST.AppSettings'],
    cls: 'sportpicker',
    border: false,
	layout: 'hbox',
	
	initComponent: function(){
        var sportLinks = '';
        var sports = ['mlb', 'nfl', 'nba', 'nhl', 'nas'];
        for (var i in sports) {
            var sport = sports[i];
            var url = 'statstool.html?site=' + DFST.AppSettings.getSite() + '&sport=' + sport;
            if (sport === DFST.AppSettings.sport) {
                sportLinks += '<span class="sport-link">' + 
                    sport.toUpperCase() + '</span>';
            } else if (sport === 'mlb' || sport === 'nas' || sport === 'nfl') { // off-season
                sportLinks += '<span class="sport-link off-season">' + 
                    sport.toUpperCase() + '</span>';
            } else {  
                sportLinks += '<span class="sport-link"><a href="' + url + '">' + 
                    sport.toUpperCase() + '</a></span>';
            }
        }
		Ext.apply(this, {
            items: [
            {
                xtype: 'panel',
                border: false,
                html: sportLinks
            }]}
		);

        this.callParent(arguments);
	}
});

