/*global Ext: false, DFST: false */
//FOR DEBUG PURPOSES, LET EXTJS FIGURE OUT WHERE SCRIPTS ARE AND LOAD THEM
Ext.Loader.setConfig({ 
    enabled: true,
    disableCaching: false,
    paths: { 
        Ext: 'resources/js/extjs'
    }
});
 
Ext.application({
    name: 'DFST',

    // All controllers that should initialize
    controllers: [
        'Stats',
        'Filters',
        'Rosters'
    ],
    
    //automatically load and instantiate DFST.view.Viewport
    autoCreateViewport: true,
    
    init : function(application) { // configure for sport
        var provider = Ext.supports.LocalStorage ? 
            new Ext.state.LocalStorageProvider() 
            : new Ext.state.CookieProvider();
        Ext.state.Manager.setProvider(provider);
        
        var siteId = 1; //default to DK
        var urlArgs = document.location.search.replace('?', '').split('&');
        for (var i=0; i<urlArgs.length; i++)
        {
            var arg = urlArgs[i].split('=');
            var argName = arg[0];
            var argValue = arg[1];
            if (argName === 'sport') {
                var sport = argValue;
                if (sport === "nba" || sport === "mlb" || sport === "nfl" || sport === "nhl" || sport === "nas") { //supported sports
                    DFST.AppSettings.sport = sport;
                }
            }
            if (argName === 'site') {
                switch (argValue) {
                    case 'fanduel':
                        siteId = 2;
                        break;
                    case 'fantasydraft':
                        siteId = 7;
                        break;
                    case 'yahoo':
                        siteId = 6;
                        break;
                    case 'draftkings':
                    default:
                        siteId = 1;
                        break;
                }
            }
        }

        if (DFST.AppSettings.sport === 'nas') {
            siteId = 1;
        // } else {
        //     //var siteId = Ext.state.Manager.get('site');
        //     //siteId = siteId || 1;
        }
        DFST.AppSettings.siteId = siteId;
    }
});

/* Fix for ajax requests not sending json request header in Firefox */
Ext.Ajax.defaultHeaders = {              
    'Accept' : 'application/json',  
    'Content-Type' : 'application/json'
};

/* override date encoding to include time zone */
Ext.JSON.encodeDate = function(o)
{
   return '"' + Ext.Date.format(o, 'c') + '"';
};
