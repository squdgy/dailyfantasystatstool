/*global Ext: false, DFST: false */
Ext.define('DFST.view.site.Picker', {
    extend: 'Ext.panel.Panel',
    requires: ['DFST.store.Draftgroups'],
	alias: 'widget.sitepicker',
	
	cls: 'sitepicker',
	id: 'sitepicker',
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
        var title = 'Select a Site';
        if (selectedSiteItem !== null) {
            selectedSiteItem.checked = true;
            title += ' - ' + selectedSiteItem.boxLabel;
        }

		Ext.apply(this, {
            title: title,
			items: [{
                xtype: 'radiogroup',
                layout: {
                    type: 'table',
                    columns: 1
                },
                items: siteItems
            },{
                xtype: 'combobox',
                name: 'draftgroups',
                id: 'draftgroups',
                queryMode: 'local',
                store: Ext.create('DFST.store.Draftgroups'),
                displayField: 'name',
                valueField: 'dgid'
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
