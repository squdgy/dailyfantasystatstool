/*global Ext: false, DFST: false */
Ext.define('DFST.view.bet.Display', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.betdisplay',

	autoScroll: true,
	border: false,
    header:false,
    margins: '5 0 5 5',
    padding: 5,

	initComponent: function() {
        var ptsLabel = 'Points';
        if (DFST.AppSettings.sport === 'mlb') ptsLabel = 'Runs';
        if (DFST.AppSettings.sport === 'nhl') ptsLabel = 'Goals';
		Ext.apply(this, {
            tpl: new Ext.XTemplate(
                '<dl>',
                '<dt>Projected ' + ptsLabel + ' </dt><dd>{pts}</dd>',
                '<dt>Favorite</dt>',
                '<tpl if="sh &lt; 0">',
                    '<dd>{home}</dd>',
                '<tpl else>',
                    '<dd>{away}</dd>',
                '</tpl>',                
                '<dt>Spread</dt><dd>{sh:this.formatSpread}</dd>',
                '</dl>',
                {
                    formatSpread: function(floatValue) {
                        return (Math.abs(floatValue));
                    }
                })
        });
		this.callParent(arguments);
	}
});

