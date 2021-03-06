/*global Ext: false, DFST:false*/
Ext.define('DFST.view.statset.PlayerGrid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetplayergrid',
    requires: ['Ext.toolbar.Toolbar'],

	cls: 'player-grid',
	disabled: false,
    width: 1000,
    autoScroll: true,
    stateful: false,
    stateId: 'statsetplayergrid',
    
    getCols: function(sport, position) {
        var colmap = (sport === 'nfl') ? this.nflPosStatMap[position] : this.nhlPosStatMap[position];
        if (sport === 'nba') colmap = this.nbaPosStatMap[position];
        if (sport === 'mlb') colmap = this.mlbPosStatMap[position];
        if (sport === 'nas') colmap = this.nasPosStatMap[position];
        if (sport === 'golf') colmap = this.golfPosStatMap[position];
        if (colmap === undefined) return;
        var ncols = colmap.length;
        var cols = this.firstCols.slice();
        var statMap = this.statMap[sport];
        var colExtrasMap = this.colExtrasMap[sport];
        for (var i=0; i<ncols; i++){
            var stat = colmap[i];
            var width = (
                (sport === 'nfl' && (stat === 'si2' || stat === 'si5' || stat === 'si8')) ||
                (sport === 'nba' && stat === 'si13') ||
                (sport === 'nhl' && (stat === 'si18' || stat === 'si19' || stat === 'si20'))
                ) ? 55 : 38;
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
            'mlb': {
                'si20': {renderer: Ext.util.Format.numberRenderer('0.0')}
            },
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
            },
            'nas': {
                'si1' : {width: 60},
                'si2' : {width: 60},
                'si3' : {width: 60},
                'si4' : {width: 70},
                'si5' : {width: 60},
                'si6' : {width: 60}
            }
        };
        this.statMap = {
            'mlb':{
                //hitter:
                si1: 'AB',
                si2: 'H',
                si3: '1B',
                si4: '2B',
                si5: '3B',
                si6: 'HR',
                si7: 'RBI',
                si8: 'R',
                si9: 'W',
                si10: 'SB',
                si11: 'HbP',
                si12: 'SAC',
                si13: 'SO',
                si14: 'GIDP',
                si15: 'CS',
                si16: 'O',
                //pitcher:
                si17: 'W',
                si18: 'ER',
                si19: 'K',
                si20: 'IP',
                si21: 'H',
                si22: 'BB',
                si23: 'CG',
                si24: 'CGSO',
                si25: 'NH',
                si26: 'L',
                si27: 'S',
                si28: 'BS'
            },
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
                si14: 'Start',
                si15: 'DDbl',
                si16: 'TDbl'
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
                si20: 'SHM',
                si21: '5+ S',
                si22: '3+ BS',
                si23: '3+ PTS',
                si24: 'OTL',
                si25: '35+ SV'
            },
            nas :{
                si1: 'Start',
                si2: 'Finish',
                si3: 'Diff',
                si4: 'Completed',
                si5: 'Led',
                si6: 'Fastest'
            },
            golf : {
            }
        };
        var mlbHitterMap = ['si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si13', 'si14', 'si15', 'si16'];
        this.mlbPosStatMap = {
            '1B' : mlbHitterMap,
            '2B' : mlbHitterMap,
            '3B' : mlbHitterMap,
            'SS' : mlbHitterMap,
            'LF' : mlbHitterMap,
            'CF' : mlbHitterMap,
            'RF' : mlbHitterMap,
            'DH' : mlbHitterMap,
            'C' : mlbHitterMap,
            'P' : ['si17', 'si18', 'si19', 'si20', 'si21', 'si22', 'si23', 'si24', 'si25', 'si26', 'si27', 'si28'],
        },
        this.nbaPosStatMap = {
            PG : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si15', 'si16'],
            SG : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si15', 'si16'],
            G : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si15', 'si16'],
            "G-F" : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si15', 'si16'],
            SF : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si15', 'si16'],
            F : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si15', 'si16'],
            PF : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si15', 'si16'],
            "F-C" : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si15', 'si16'],
            C : ['si13', 'si14', 'si1', 'si2', 'si3', 'si4','si5', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si15', 'si16']
        };
        var skaterStats = ['si1', 'si2', 'si3', 'si4','si5', 'si8', 'si6', 'si7', 'si8', 'si9', 'si10', 'si11', 'si12', 'si13', 'si18', 'si19', 'si20', 'si21', 'si22', 'si23'];
        this.nhlPosStatMap = {
            G : ['si16', 'si15', 'si14', 'si17', 'si3', 'si13', 'si18', 'si24', 'si25'],
            RW : skaterStats,
            C :  skaterStats,
            LW : skaterStats,
            D :  skaterStats
        };
        this.nflPosStatMap = {
            QB : ['si45', 'si44', 'si2', 'si1', 'si4', 'si46', 'si3', 'si5', 'si6', 'si14'],
            RB : ['si47', 'si5', 'si6', 'si14','si7', 'si8', 'si9', 'si10'],
            WR : ['si5', 'si6', 'si14', 'si48', 'si9', 'si8', 'si10', 'si11'],
            TE : ['si5', 'si6', 'si14', 'si48', 'si9', 'si8', 'si10', 'si11'],
            K : ['si35', 'si37', 'si38', 'si39', 'si40', 'si41'],
            D : ['si18', 'si43', 'si19', 'si20', 'si21', 'si22', 'si23', 'si24', 'si25', 'si27']
        };
        this.nasPosStatMap = {
            D: ['si1', 'si2', 'si3', 'si4', 'si5', 'si6']
        };
        this.golfPosStatMap = {
            G: []
        };
        this.firstCols = [
                {   text: 'Date',
                    dataIndex: 'gd',
                    renderer: Ext.util.Format.dateRenderer('m-d'),
                    width: 60
                }];
        if (DFST.AppSettings[DFST.AppSettings.sport].hasTeams) {
            this.firstCols.push({
                text: 'Opp.',
                dataIndex: 'opp',
                renderer: this.formatOpponent,
                width: 60                
            });
        } else {
            this.firstCols.push({
                text: Ext.String.capitalize(DFST.AppSettings[DFST.AppSettings.sport].gameText),
                dataIndex: 'gameName',
                align: 'left',
                width: 200                
            });
        }

        this.lastCols = [
                {
                    text: 'FP',
                    dataIndex: 'fp',
                    width: 60,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                }];
        var pagingText = DFST.AppSettings[DFST.AppSettings.sport].gameText + 's per page';
        var pagingRow = {
            xtype: 'pagingtoolbar',
            dock: 'top',
            store: 'PlayerStatsMemory',
            displayInfo: true,
            plugins: { ptype: 'pagesizepicker', displayText: pagingText, options: [5, 10, 20, 50, 200] }
        };
        var toolsRow = {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'checkbox',
                stateful: false,
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
            }]
        };
        var includeToolsRow = DFST.AppSettings[DFST.AppSettings.sport].hasTeams;
        if (includeToolsRow) {
            this.dockedItems = [toolsRow, pagingRow];
        } else {
            this.dockedItems = [pagingRow];
        }
        Ext.apply(this, {
            store: 'PlayerStatsMemory',
			columns: {
                defaults: {
                    align: 'right',
                    style: 'text-align:center',
                    width: 35
                },
                items: this.firstCols.concat(this.lastCols)
            },
            dockedItems: this.dockedItems
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

