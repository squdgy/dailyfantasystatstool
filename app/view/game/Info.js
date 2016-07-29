/*global Ext: false, DFST: false */
Ext.define('DFST.view.game.Info', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.gameinfo',

	autoScroll: true,
	border: false,
    header:false,
    margins: '5 0 5 5',
    padding: 5,

	initComponent: function() {
	    var template;
	    if (DFST.AppSettings.sport === 'mlb') {
	        template = new Ext.XTemplate(
                '<div>',
                '<h4>{awayPitcher} ({apthrows:this.formatHandedness}) - {away}</h4>',
                '<h4>{homePitcher} ({hpthrows:this.formatHandedness}) - {home}</h4>',
                '<h4>{gameTime}</h4>',
                '<div>{venue}</span>',
                '<div>Park factor (2015/runs): <em>{parkfactor}</em></div>',
                '</div>',
                {
                    formatHandedness: function(value) {
                        if (value === 2) return 'R';
                        if (value === 1) return 'L';
                        if (value === 3) return 'S';
                        return 'UNK' + value;
	                }
                });
	    } else {
	        template = new Ext.XTemplate('<div><div>{name}</div><div>{venue}</div></div>');
	    }
		Ext.apply(this, {
            tpl: template
        });
		this.callParent(arguments);
	}
});

