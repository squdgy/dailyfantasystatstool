/*global Ext: false, DFST: false */
Ext.application({
    name: 'Yesterday',

    appFolder : 'yesterdayApp',
    
    // All controllers that should initialize
    controllers: [ 'Yesterday' ],

    //automatically load and instantiate DFST.view.Viewport
    autoCreateViewport: true,
    
    init : function(application) { // configure for sport
    alert('bar');
        var siteId = Ext.state.Manager.get('site');
        DFST.AppSettings.siteId = siteId || 1; //default to DK

        var cururl = document.URL;
        var lqs = cururl.lastIndexOf("?");
        if (lqs >= 0) {
            var qs = cururl.substring(lqs+1);
            if (qs.indexOf("sport=") >= 0) {
                var sport = qs.substring(6);
                if (sport === "nba" || sport === "mlb" || sport === "nfl" || sport === "nhl") { //supported sports
                    DFST.AppSettings.sport = sport;
                }
            }
        }
    }
});
