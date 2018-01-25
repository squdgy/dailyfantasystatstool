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
	   var footerHtml = '<footer>Daily Fantasy Stats Tool, Version ' + 
            DFST.AppSettings.version + ' ' + DFST.AppSettings.appCopyRight + ' - ' +
            'Game time weather powered by <a href="http://www.forecast.io">Forecast.io</a>' + 
            '</footer>';
            
		Ext.apply(this, {
            items: [
            {
                region: 'north',
                height: 80,
                xtype: 'sitepicker'
            },{
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

