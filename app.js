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

/* Allow grid header to show multi-column sort indicators */
// Ext.grid.header.Container.prototype.setSortState = function(val) {
//     var store   = this.up('[store]').store,
//         sorters = store.getSorters();

//     // adjust grid headers
//     var me = this;
//     if (sorters) {
//         this.clearOtherSortStates(null);
//         Ext.each(sorters, function(sorter) {
//             var hd = me.down('gridcolumn[dataIndex=' + sorter.property  +']');
//             if (hd) {
//                 hd.setSortState(sorter.direction, true, true);
//             }
//         }, this);
//     } else {
//         this.clearOtherSortStates(null);
//     }
// };

/* override date encoding to include time zone */
Ext.JSON.encodeDate = function(o)
{
   return '"' + Ext.Date.format(o, 'c') + '"';
};
