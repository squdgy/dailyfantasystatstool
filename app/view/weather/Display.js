/*global Ext: false */
Ext.define('DFST.view.weather.Display', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.gamedetails',
    requires: [
        'DFST.view.bet.Display',
        'DFST.view.weather.Hour'
    ],

    cls: 'gamedetails',
	autoScroll: true,
	border: false,
    title: 'Game Details',
    collapsible: true,
	animCollapse: true,    
    margins: '5 0 5 5',
	
	initComponent: function() {
		Ext.apply(this, {
            items: [{
                    xtype: 'betdisplay'
                },{
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

