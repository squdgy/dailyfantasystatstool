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
		Ext.apply(this, {
            tpl: new Ext.XTemplate(
                '<dl>',
                '<dt>Projected ' + ptsLabel + '</dt><dd>{pts}</dd>',
                '<dt>Favorite</dt>',
                '<tpl if="sh &lt; 0">',
                    '<dd>{home}</dd>',
                '<tpl else>',
                    '<dd>{away}</dd>',
                '</tpl>',                
                '<dt>Spread</dt><dd>{sh:this.formatSpread}</dd>',
                '<dt>Moneyline {home}</dt><dd>{mh:this.formatMoneyline}</dd>',
                '<dt>Moneyline {away}</dt><dd>{ma:this.formatMoneyline}</dd>',
                '</dl>',
                {
                    formatSpread: function(floatValue) {
                        return (Math.abs(floatValue));
                    },
                    formatMoneyline: function(ml) {
                        if (ml === 0) return 'N/A';
                        return ml;
                    }
                })
        });
		this.callParent(arguments);
	}
});

