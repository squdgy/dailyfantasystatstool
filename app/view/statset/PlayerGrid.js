/*global Ext: false */
Ext.define('DFST.view.statset.PlayerGrid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetplayergrid',
    requires: ['Ext.toolbar.Toolbar', 'Ext.ux.PageSizePicker'],

	cls: 'player-grid',
	disabled: false,
    maxHeight: 190,
    width: 900,
    autoScroll: true,
    stateful: true,
    stateId: 'statsetplayergrid',
    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: {
            xtype: 'checkbox',
            stateful: true,
            stateId: 'nextopp',
            stateEvents: ['change'],
            getState: function() {
                return {checked: this.getValue()};
            },
            applyState: function(state) {
                this.setValue(state.checked);
            },
            boxLabel: 'Only show games against next opponent',
            id: 'nextopp',
            name: 'nextopp'
        }
    }, {
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'PlayerStats',
        displayInfo: true,
        plugins: { ptype: 'pagesizepicker', displayText: 'Games per Page', options: [5, 10, 20, 50, 200] }
    }],

    getCols: function(sport, position) {
        var colmap = (sport === 'nfl') ? this.nflPosStatMap[position] : this.nhlPosStatMap[position];
        if (sport === 'nba') colmap = this.nbaPosStatMap[position];
        var ncols = colmap.length;
        var cols = this.firstCols.slice();
        var statMap = this.statMap[sport];
        var colExtrasMap = this.colExtrasMap[sport];
        for (var i=0; i<ncols; i++){
            var stat = colmap[i];
            var width = (stat === 'si18') ? 60 : 40;
            var colDef = {text: statMap[stat], dataIndex: stat, width:width};
            if (colExtrasMap && colExtrasMap[stat]) {
                Ext.apply(colDef, colExtrasMap[stat]);
            }
            cols.push(colDef);
        }
        return cols.concat(this.lastCols);
    },
    
	initComponent: function() {
        this.colExtrasMap = {
            'nba': {
                'si14': {renderer: this.intToBoolRenderer}
            },
            'nfl': {
                'si3' : {renderer: this.intToBoolRenderer},
                'si7' : {renderer: this.intToBoolRenderer, width: 70},
                'si11' : {renderer: this.intToBoolRenderer, width: 70},
                'si36' : {width: 60},
                'si37' : {width: 60},
                'si38' : {width: 60},
                'si39' : {width: 60},
                'si40' : {width: 60},
                'si41' : {width: 60}
            }
        };
        this.statMap = {
            'nba':{
                si1: 'P',
                si2: 'A',
                si3: 'RB',
                si4: 'B',
                si5: 'S',
                si6: 'TO',
                si7: 'FGM',
                si8: 'FGA',
                si9: 'FTM',
                si10: 'FTA',
                si11: '3MM',
                si12: '3A',
                si13: 'MIN',
                si14: 'Start'
            },
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
                si42: 'ITD',
                si43: 'FGYO30',
                si44: 'Att',
                si45: 'Comp',
                si46: 'Sck',
                si47: 'Att',
                si48: 'T'
            },
            'nhl':{
                si1: 'S',
                si2: 'G',
                si3: 'AST',
                si4: 'PPG',
                si5: 'PPA',
                si6: 'SHG',
                si7: 'SHA',
                si8: 'GWG',
                si9: 'SOG',
                si10: '+/-',
                si11: 'BS',
                si12: 'HT',
                si13: 'PIM',
                si14: 'W',
                si15: 'GA',
                si16: 'SV',
                si17: 'SO',
                si18: 'MIN',
                si19: 'PPM',
                si20: 'SHM'
        }};
        this.nbaPosStatMap = {
            PG : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12'],
            SG : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12'],
            G : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12'],
            "G-F" : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12'],
            SF : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12'],
            F : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12'],
            PF : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12'],
            "F-C" : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12'],
            C : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12']
        };
        this.nhlPosStatMap = {
            G : ['si16', 'si15', 'si14', 'si17', 'si3', 'si13', 'si18'],
            RW : ['si1', 'si2', 'si3', 'si4','si5', 'si8', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si13', 'si18', 'si19', 'si20'],
            C : ['si1', 'si2', 'si3', 'si4','si5', 'si8', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si13', 'si18', 'si19', 'si20'],
            LW : ['si1', 'si2', 'si3', 'si4','si5', 'si8', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si13', 'si18', 'si19', 'si20'],
            D : ['si1', 'si2', 'si3', 'si4','si5', 'si8', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si13', 'si18', 'si19', 'si20']
        };
        this.nflPosStatMap = {
            QB : ['si45', 'si44', 'si2', 'si1', 'si4', 'si46', 'si3', 'si5', 'si6', 'si14'],
            RB : ['si47', 'si5', 'si6', 'si14','si7', 'si8', 'si9', 'si10'],
            WR : ['si5', 'si6', 'si14', 'si48', 'si9', 'si8', 'si10', 'si11'],
            TE : ['si5', 'si6', 'si14', 'si48', 'si9', 'si8', 'si10', 'si11'],
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
        if (value > 0)
            return 'Y';
        return '';
	}
});

