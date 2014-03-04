/*global Ext: false */
/*
Contains drilldown details for individual players
*/
Ext.define('DFST.view.drilldown.Details', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.drilldowndetails',

	cls: 'drilldown',
	autoScroll: true,
	border: false,
    title: 'Game Log',
    collapsible: true,
    animCollapse: false, /* to get around extjs bug: http://www.sencha.com/forum/showthread.php?234627*/
    margins: '5 0 5 5',
	
    stateful: true,
    stateId: 'drilldowndetails',
	
	initComponent: function() {
		Ext.apply(this, {
            items: [{   
                xtype: 'drilldowninfo'
            }, {
                xtype: 'statsetplayergrid'
            }]
		});

		this.callParent(arguments);
	}
});

