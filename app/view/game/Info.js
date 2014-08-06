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
		Ext.apply(this, {
            tpl: new Ext.XTemplate(
                '<div>',
                '<h4>{awayPitcher} ({apthrows:this.formatHandedness}) - {away}</h4>',
                '<h4>{homePitcher} ({hpthrows:this.formatHandedness}) - {home}</h4>',
                '<div>{venue}</span>',
                '<div>park factor: {parkfactor}</span>',
                '</div>',
                {
                    formatHandedness: function(value) {
                        if (value === 2) return 'R';
                        if (value === 1) return 'L';
                        if (value === 3) return 'S';
                        return 'UNK' + value;
	                }
                })
        });
		this.callParent(arguments);
	}
});

