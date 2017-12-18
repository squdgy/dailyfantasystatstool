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
        var siteItems = [
            { boxLabel: 'DraftKings', name: 'rb', inputValue: '1'},
            //{ boxLabel: 'Yahoo', name: 'rb', inputValue: '6'}
        ];
        if (DFST.AppSettings.sport !== 'nas'){
            siteItems.push({ boxLabel: 'FanDuel', name: 'rb', inputValue: '2' });
        }
        if (DFST.AppSettings.sport === 'nfl'){
            siteItems.push({ boxLabel: 'FantasyDraft', name: 'rb', inputValue: '7'});
        }
        var selectedSiteItem = Ext.Array.findBy(siteItems, function(item, index){
            return (item.inputValue == DFST.AppSettings.siteId); //compares string and int
        });
        var title = 'Select a site and game slate';
        if (selectedSiteItem !== null) {
            selectedSiteItem.checked = true;
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
