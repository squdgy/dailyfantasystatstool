/*global Ext: false */
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

    getCols: function(sport, position) {
        var colmap = this.nflPosStatMap[position];
        var ncols = colmap.length;
        var cols = this.firstCols.slice();
        var statMap = this.statMap[sport];
        for (var i=0; i<ncols; i++){
            var stat = colmap[i];
            cols.push({text: statMap[stat], dataIndex: stat, width:40});
        }
        return cols.concat(this.lastCols);
    },
    
	initComponent: function() {
        this.statMap = {
            'nfl':{
                si1: 'PTD',
                si2: 'PYds',
                si3: '300+',
                si4: 'INT',
                si5: 'RYds',
                si6: 'RTD',
                si7: '100+ Ru',
                si8: 'RecY',
                si9: 'Rec',
                si10: 'ReTD',
                si11: '100+ Rec',
                si12: 'IPRTD',
                si13: 'IKRTD',
                si14: 'FL',
                si15: 'OFRTD',
                si16: '2PTP',
                si17: '2PTS',
                si18: 'SACK',
                si19: 'INT',
                si20: 'DFR',
                si21: 'DPRTD',
                si22: 'DKRTD',
                si23: 'DFRTD',
                si24: 'BK',
                si25: 'BKTD',
                si26: 'SAF',
                si27: 'PA',
                si28: 'PA0',
                si29: 'PA1-6',
                si30: 'PA7-13',
                si31: 'PA14-20',
                si32: 'PA21-27',
                si33: 'PA28-34',
                si34: 'PA35+',
                si35: 'PAT',
                si36: 'FG0-39',
                si37: 'FG0-19',
                si38: 'FG20-29',
                si39: 'FG30-39',
                si40: 'FG40-49',
                si41: 'FG50+',
                si42: 'P',
                si43: 'ITD',
                si44: 'FGYO30'
        }};
        this.nflPosStatMap = {
            QB : ['si2', 'si1', 'si4', 'si3', 'si5', 'si6', 'si14'],
            RB : ['si3', 'si5', 'si6', 'si14','si7', 'si8', 'si9', 'si10'],
            WR : ['si5', 'si6', 'si14', 'si8', 'si9', 'si10'],
            TE : ['si5', 'si6', 'si14', 'si8', 'si9', 'si10'],
            K : ['si35', 'si37', 'si38', 'si39', 'si40', 'si41'],
            D : ['si18', 'si43', 'si19', 'si20', 'si21', 'si22', 'si23', 'si24', 'si25', 'si27']
        };
        this.firstCols = [
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
        this.lastCols = [
                {
                    text: 'FP',
                    dataIndex: 'fp',
                    width: 60,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                }];
        this.mlbhCols = this.firstCols.concat([
                {
                    text: 'AB',
                    dataIndex: 'ab'
                }, {
                    text: 'H',
                    dataIndex: 'h'
                }, {
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
                    text: 'SO',
                    dataIndex: 'bso'
                },{
                    text: 'SB',
                    dataIndex: 'sb'
                },{
                    text: 'CS',
                    dataIndex: 'cs'
                },{
                    text: 'HBP',
                    dataIndex: 'hbp'
                },{
                    text: 'GIDP',
                    dataIndex: 'hidp'
                },{
                    text: 'SAC',
                    dataIndex: 'sac'
                },
                {
                    text: 'OUTS',
                    dataIndex: 'o'
                }], this.lastCols);
        this.mlbpCols = this.firstCols.concat([{
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
                }], this.lastCols);
        this.nbaCols = this.firstCols.concat([
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
                }], this.lastCols); 

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

