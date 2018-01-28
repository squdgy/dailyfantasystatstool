/*global Ext: false, DFST: false */
Ext.define('DFST.view.site.SportPicker', {
    extend: 'Ext.container.Container',
	alias: 'widget.sportPicker',
	
    requires: ['DFST.AppSettings'],
    cls: 'sportpicker',
    html: '<h1>-</h1>',

    getSportLinks: function(){
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
        return sportLinks;
 	},
 	
	updateSports: function(container) {
	    this.update(this.getSportLinks());
	}
});

