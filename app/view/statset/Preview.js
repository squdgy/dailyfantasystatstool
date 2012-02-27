Ext.define('FV.view.statset.Preview', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.statsetpreview',

    requires: ['Ext.toolbar.Toolbar'],

	cls: 'preview',
	autoScroll: true,
	border: false,
	
	initComponent: function() {
		Ext.apply(this, {
			tpl: new Ext.XTemplate(
			    '<div class="post-data">',
			        '<span class="post-date">{points}</span>',
			        '<h3 class="post-title">{team}</h3>',
			        '<h4 class="post-author">player {name}</h4>',
			    '</div>',
			    '<div class="post-body">{points}</div>', {

				getBody: function(value, all) {
					return Ext.util.Format.stripScripts(value);
				},

				defaultValue: function(v) {
					return v ? v : 'Unknown';
				},

				formatDate: function(value) {
					if (!value) {
						return '';
					}
					return Ext.Date.format(value, 'M j, Y, g:i a');
				}
			}),

			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				border: false,
				items: [{
					text: 'View in new tab',
					action: 'viewintab'
				}, {
					text: 'Go to post',
					action: 'gotopost'
				}]
			}]
		});

		this.callParent(arguments);
	}
});

