/*
Contains weather display for games
*/
Ext.define('DFST.view.weather.Display', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.weatherdisplay',
    requires: [
        'DFST.view.weather.Hour'
    ],

	autoScroll: true,
	border: false,
    title: 'Weather',
    collapsible: true,
	animCollapse: true,    
    margins: '5 0 5 5',
	
	initComponent: function() {
		Ext.apply(this, {
            items: [{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    padding: 5,
                    align: 'stretch'
                },
                defaults:{
                    margins:'0 0 5 0',
                    flex: 1
                },
                items: [{
                    xtype: 'weatherhour'
                },{
                    xtype: 'weatherhour'
                },{
                    xtype: 'weatherhour'
                },{
                    xtype: 'weatherhour'
                },{
                    xtype: 'weatherhour'
                },{
                    xtype: 'weatherhour'
                }]
            }]
        });
		this.callParent(arguments);
	}
});

