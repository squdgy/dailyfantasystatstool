/*global Ext: false, DFST: false */
Ext.define('DFST.view.game.Picker', {
    extend: 'Ext.panel.Panel',
	alias: 'widget.gamepicker',
	
	cls: 'gamepicker',
	id: 'gamepicker',
    collapsible: true,
    animCollapse: true,
    layout: 'fit',
    hidden: DFST.AppSettings.sport === 'nas',
    title: 'By Game(s)',
    items: [{
        xtype: 'fieldcontainer',
        id: 'games',
        defaultType: 'panel',
        layout: {
            type: 'table',
            columns: 2
        }
    }]
});
