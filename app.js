/*global Ext: false, DFST: false */
//FOR DEBUG PURPOSES, LET EXTJS FIGURE OUT WHERE SCRIPTS ARE AND LOAD THEM
Ext.Loader.setConfig({ 
    enabled: true,
    paths: { 
        Ext: 'ext-4.1.0/src'
    }
});
 
Ext.application({
    name: 'DFST',

    // All controllers that should initialize
    controllers: [
        'Stats',
        'Filters'
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
                if (sport === "nba" || sport === "mlb") { //supported sports
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
