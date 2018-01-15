/*global Ext: false, DFST: false */
Ext.define('DFST.view.site.Picker', {
    extend: 'Ext.panel.Panel',
    requires: ['DFST.store.Draftgroups'],
	alias: 'widget.sitepicker',
	
	cls: 'sitepicker',
	id: 'sitepicker',
	layout: 'hbox',
	border: false,
    collapsible: true,
	animCollapse: true,
	
	initComponent: function() {
	    var sites = [
	        { name: 'DraftKings', id: 1, 'sports' : ['mlb', 'nas', 'nba', 'nfl', 'nhl']},
	        { name: 'Fanduel', id: 2, 'sports': ['mlb', 'nba', 'nfl', 'nhl']},
	        { name: 'FantasyDraft', id: 7, 'sports': ['nba'/*, 'nfl'*/]}
	    ];
	    var siteItems = [];
	    for (var i=0; i< sites.length; i++) {
	        var site = sites[i];
	        if (Ext.Array.findBy(site.sports, function(sport){
                return (sport === DFST.AppSettings.sport); }) === null) {
                continue;
            }
           siteItems.push({
               boxLabel: site.name,
               name: 'rb',
               inputValue: site.id,
               checked: site.id === DFST.AppSettings.siteId
           });
	    }
        var title = 'Select a site and game slate';
        var selectedSiteItem = Ext.Array.findBy(siteItems, function(item, index){
            return (item.inputValue == DFST.AppSettings.siteId); //compares string and int
        });
        if (selectedSiteItem !== null) {
            title += ' - ' + selectedSiteItem.boxLabel;
        }

		Ext.apply(this, {
            title: title,
			items: [{
                xtype: 'radiogroup',
                layout: {
                    type: 'hbox',
                },
                items: siteItems
            },{
                xtype: 'combobox',
                name: 'draftgroups',
                id: 'draftgroups',
                queryMode: 'local',
                store: Ext.create('DFST.store.Draftgroups'),
                displayField: 'name',
                valueField: 'dgid',
                width: 300,
                tpl: Ext.create('Ext.XTemplate', '<tpl for=".">', 
                    '<div class="x-boundlist-item" style="border-bottom:1px solid #f0f0f0;">',
                    '<div>{name} - {[Ext.util.Format.date(values.startTime+"Z", "D g:i a T")]}<tpl if="lateSwap"> - late swap</tpl></div>',
                    '</div></tpl>'),
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '{name} - {[Ext.util.Format.date(values.startTime+"Z", "D g:i a T")]}',
                    '<tpl if="lateSwap"> late swap</tpl>',
                    '</tpl>')

            }//,
// 			{
//                 xtype: 'button',
//                 id: 'globalreset',
//                 text: 'Reset Panels',
//                 tooltip: 'This will reset all panel and grid settings to app defaults (ex. expand/collapse, column order) and reload the page.'
// 			}
        ]});

		this.callParent(arguments);
	}
});
