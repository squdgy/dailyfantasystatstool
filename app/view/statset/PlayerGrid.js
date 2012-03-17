Ext.define('DFST.view.statset.PlayerGrid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetplayergrid',

	cls: 'player-grid',
	disabled: false,

    requires: ['Ext.toolbar.Toolbar'],
    
    border: false,
    
	initComponent: function() {
		Ext.apply(this, {
		    store: 'PlayerStats',

			columns: [{
    			text: 'Date',
				dataIndex: 'date',
                renderer: Ext.util.Format.dateRenderer('m-d-Y')
			},{
        		text: 'Opp.',
				dataIndex: 'opp'
			},{
                text: 'FP',
                renderer: this.fantasyPointsRenderer
            },{
                text: '1B',
                dataIndex: '1b'
            }, {
                text: '2B',
                dataIndex: '2b'
            },{
                text: '3B',
                dataIndex: '3b'
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
                dataIndex: 'out'
            },{
                text: 'W',
                dataIndex: 'w'
            },{
                text: 'ER',
                dataIndex: 'er'
            },{
                text: 'SO',
                dataIndex: 'so'
            },{
                text: 'IP',
                dataIndex: 'ip'
            }]
		});

		this.callParent(arguments);
	},
    
    fantasyPointsRenderer: function(value, p, record) {
//Hitters: 1B = 1pt, 2B = 2pts, 3B = 3pts, HR = 4pts, RBI = 1pt, R = 1pt, BB = 1pt, SB = 2pts,
//HBP = 1, Out (calculated as at bats - hits) = -.25pt
//Pitchers: W = 5pts, ER = -1pt, SO = 1pt, IP = 1pt*
        var data = record.data;
        var pts = 1 * data["1b"];
        pts += 2 * data["2b"];
        pts += 3 * data["3b"];
        pts += 4 * data.hr;
        pts += 1 * data.rbi;
        pts += 1 * data.r;
        pts += 1 * data.bb;
        pts += 2 * data.sb;
        pts += 1 * data.hbp;
        pts -= (.25 * data.out);
        pts += 5 * data.w;
        pts -= 1 * data.er;
        pts += 1 * data.so;
        pts += 1 * data.ip;
        return Ext.String.format('<span class="avg-points">{0}</span>', pts);
    }

});

