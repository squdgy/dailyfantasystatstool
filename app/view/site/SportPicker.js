/*global Ext: false, DFST: false */
Ext.define('DFST.view.site.SportPicker', {
    extend: 'Ext.container.Container',
	alias: 'widget.sportPicker',
	
    requires: ['DFST.AppSettings'],
    cls: 'sportpicker',
    html: '<h1>-</h1>',

    getSportLinks: function(){
        var sportLinks = '';
        var sports = [
            {name: 'mlb', text: 'MLB'}, 
            {name: 'nba', text: 'NBA'},
            {name: 'golf', text: 'GOLF'},
            {name: 'nas', text: 'NASCAR'},
            {name: 'nfl', text: 'NFL'},
            {name: 'nhl', text: 'NHL'}
        ];
        for (var i in sports) {
            var sport = sports[i].name;
            var sportText = sports[i].text;
            var url = 'statstool.html?site=' + DFST.AppSettings.getSite() + '&sport=' + sport;
            if (sport === DFST.AppSettings.sport) {
                sportLinks += '<span class="sport-link">' + 
                    sportText + '</span>';
            } else if (sport === 'mlb' || sport === 'nas' || sport === 'golf') { // off-season
                sportLinks += '<span class="sport-link off-season">' + 
                    sportText + '</span>';
            } else {  
                sportLinks += '<span class="sport-link"><a href="' + url + '">' + 
                    sportText + '</a></span>';
            }
        }
        return sportLinks;
 	},
 	
	updateSports: function(container) {
	    this.update(this.getSportLinks());
	}
});

