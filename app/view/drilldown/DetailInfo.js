/*global Ext: false */
/*
Contains drilldown details for individual players
*/
Ext.define('DFST.view.drilldown.DetailInfo', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.drilldowninfo',

	cls: 'drilldowninfo',
	border: false,
	
	initComponent: function() {
		Ext.apply(this, {
            /* Some day this should contain player bio info? pre 3-13-2013
			tpl: new Ext.XTemplate(
            '<div class="post-data">',
                '<h1 class="player-name">{name}</h1>',
                '<h3 class="player-team">{team}</h3>',
                '<h3 class="player-team">{pos}</h3>',
            '</div>',
            '<div class="filter-description"></div>', {
			}),
            */
		});

		this.callParent(arguments);
	}
});

