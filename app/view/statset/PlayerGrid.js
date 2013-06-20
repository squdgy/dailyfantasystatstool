
Ext.define('DFST.view.statset.PlayerGrid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetplayergrid',

	cls: 'player-grid',
	disabled: false,

    requires: ['Ext.toolbar.Toolbar'],
    
    border: false,

    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'PlayerStats',
        displayInfo: true
    }],

	initComponent: function() {
        var firstCols = [
                {   text: 'Date',
                    dataIndex: 'gd',
                    renderer: Ext.util.Format.dateRenderer('m-d'),
                    width: 60
            	},{
                    text: 'Opp.',
                    dataIndex: 'opp',
                    renderer: this.formatOpponent,
                    width: 60
                }];
        var lastCols = [
                {
                    text: 'FP',
                    dataIndex: 'fp',
                    width: 60,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                }];
        this.mlbhCols = firstCols.concat([{
                    text: '1B',
                    dataIndex: 'x1b'
                }, {
                    text: '2B',
                    dataIndex: 'x2b'
                },{
                    text: '3B',
                    dataIndex: 'x3b'
                },{
                    text: 'HR',
                    dataIndex: 'hr'
                },{
                    text: 'R',
                    dataIndex: 'r'
                },{
                    text: 'RBI',
                    dataIndex: 'rbi'
                },{
                    text: 'BB',
                    dataIndex: 'bb'
                },{
                    text: 'SB',
                    dataIndex: 'sb'
                },{
                    text: 'HBP',
                    dataIndex: 'hbp'
                },{
                    text: 'OUT',
                    dataIndex: 'o'
                }], lastCols);
        this.mlbpCols = firstCols.concat([{
                    text: 'Win',
                    dataIndex: 'w'
                },{
                    text: 'Loss',
                    dataIndex: 'l'
                },{
                    text: 'IP',
                    dataIndex: 'ip',
                    renderer: Ext.util.Format.numberRenderer('0.0')
                },{
                    text: 'H',
                    dataIndex: 'ha'
                },{
                    text: 'ER',
                    dataIndex: 'er'
                },{
                    text: 'BB',
                    dataIndex: 'bba'
                },{
                    text: 'HB',
                    dataIndex: 'hb'
                },{
                    text: 'SO',
                    dataIndex: 'so'
                }], lastCols);
        this.nbaCols = firstCols.concat([
            {
                    text: 'MIN',
                    dataIndex: 'm'
                },{
                    text: 'START',
                    dataIndex: 'start'
                },{
                    text: 'P',
                    dataIndex: 'p'
                },{
                    text: 'A',
                    dataIndex: 'a'
                },{
                    text: 'Rb',
                    dataIndex: 'rb'
                }, {
                    text: 'B',
                    dataIndex: 'b'
                }, {
                    text: 'St',
                    dataIndex: 's'
                }, {
                    text: 'TO',
                    dataIndex: 'to'
                }, {
                    text: 'FGM',
                    dataIndex: 'fgm'
                }, {
                    text: 'FGA',
                    dataIndex: 'fga'
                }, {
                    text: 'FTM',
                    dataIndex: 'ftm'
                }, {
                    text: 'FTA',
                    dataIndex: 'fta'
                }, {
                    text: '3M',
                    dataIndex: 'tpm'
                }, {
                    text: '3A',
                    dataIndex: 'tpa'
                }], lastCols); 

		Ext.apply(this, {
		    store: 'PlayerStats',
			columns: {
                defaults: {
                    align: 'right',
                    style: 'text-align:center',
                    width: 35
                },
                items: this.mlbpCols
            }
		});

		this.callParent(arguments);
	},
    
    /**
	 * Opponent renderer
	 * @private
	 */
	formatOpponent: function(value, p, record) {
        var isHome = record.data.isHome;
        return (isHome ? record.data.opp : '@' + record.data.opp).toUpperCase();
	},
    
    intToBoolRenderer: function(value, p, record) {
        if (value >= 0)
            return 'Y';
        return '';
	}
    

});

