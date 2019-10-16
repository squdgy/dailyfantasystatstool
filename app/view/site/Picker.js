/*global Ext: false, DFST: false */
Ext.define('DFST.view.site.Picker', {
    extend: 'Ext.toolbar.Toolbar',
    requires: ['DFST.store.Draftgroups', 'DFST.view.site.SportPicker'],
	alias: 'widget.sitepicker',
	
	cls: 'sitepicker',
	id: 'sitepicker',

	initComponent: function() {
	    var sites = [
	        { name: 'DraftKings', id: 1, 'sports' : ['mlb', 'nba', 'nfl', 'nhl', 'nas', 'golf']},
	        { name: 'Fanduel', id: 2, 'sports': ['mlb', 'nba', 'nfl', 'nhl', 'nas', 'golf']},
	        { name: 'FantasyDraft', id: 7, 'sports': [/*'mlb', 'nba', */'nfl', 'nhl'/*, 'golf'*/]},
	        { name: 'Yahoo', id: 6, 'sports': [/*'mlb', 'nba', 'nfl',*/ 'nhl'/*, 'golf'*/]}
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

		Ext.apply(this, {
			items: [
			'DRAFTAID.COM',
			{
                xtype: 'tbseparator'
            },{
                xtype: 'radiogroup',
                layout: {
                    type: 'hbox',
                },
                items: siteItems
            },{
                xtype: 'tbseparator'
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
                    '<div class="x-boundlist-item" style="border-bottom:1px solid #f0f0f0;margin-right:30px;">',
                    '<div>{name} - {[Ext.util.Format.date(values.startTime+"Z", "D g:i a T")]}<tpl if="lateSwap"> - late swap</tpl></div>',
                    '</div></tpl>'),
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '{name} - {[Ext.util.Format.date(values.startTime+"Z", "D g:i a T")]}',
                    '<tpl if="lateSwap"> late swap</tpl>',
                    '</tpl>')

            },{
                xtype: 'tbfill'
            },{
                xtype: 'sportPicker'
            },{
                xtype: 'tbspacer',
                width: 20
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
