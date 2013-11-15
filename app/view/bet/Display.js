/*global Ext: false */
Ext.define('DFST.view.bet.Display', {
	extend: 'Ext.panel.Panel',
    alias: 'widget.betdisplay',

	autoScroll: true,
	border: false,
    header:false,
    margins: '5 0 5 5',
	
	initComponent: function() {
		Ext.apply(this, {
            tpl: new Ext.XTemplate(
                '<table class="bet-display">',
                '<tr>',
                '<th>Favorite</th>',
                '<th>Spread</th>',
                '<th>{home}</th>',
                '<th>{away}</th>',
                '<th>Projected Points</th>',
                '</tr>',
                '<tr>',
                '<tpl if="sh &lt; 0">',
                    '<td>{home}</td>',
                '<tpl else>',
                    '<td>{away}</td>',
                '</tpl>',                
                '<td>{sh:this.formatSpread}</td>',
                '<td>{mh:this.formatMoneyline}</td>',
                '<td>{ma:this.formatMoneyline}</td>',
                '<td>{pts}</td>',
                '</tr>',
                '</table>',
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

