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
        var cururl = document.URL;
        //console.log(cururl);
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

/* Fix for ExtJS 4.1.0 bug */
Ext.override(Ext.view.AbstractView, {
    onRender: function() 
    {
        var me = this;
        
        this.callOverridden();
        
        if (me.mask && Ext.isObject(me.store)) {
            me.setMaskBind(me.store);
        }
    }
});

/* Fix for ajax requests not sending json request header in Firefox */
Ext.Ajax.defaultHeaders = {              
    'Accept' : 'application/json',  
    'Content-Type' : 'application/json'
};
