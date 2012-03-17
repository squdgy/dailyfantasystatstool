/*
Contains drilldown details for individual players
*/
Ext.define('DFST.view.drilldown.Details', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.drilldowndetails',

//    requires: ['Ext.toolbar.Toolbar'],

	cls: 'drilldown',
	autoScroll: true,
	border: false,
    title: 'Player Details',
    collapsible: true,
	animCollapse: true,    
    margins: '5 0 5 5',
	
	initComponent: function() {
		Ext.apply(this, {
            items: [{   
                xtype: 'drilldowninfo',
                width: 200
            }, {
                xtype: 'statsetplayergrid'
            }]
		});

		this.callParent(arguments);
	}
});

