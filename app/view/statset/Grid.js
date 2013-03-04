Ext.define('DFST.view.statset.Grid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetgrid',

	cls: 'statset-grid',
	disabled: false,

    requires: ['Ext.toolbar.Toolbar'],
    
    border: false,    
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
	    store: 'Stats',
        displayInfo: true
    }],
    
	initComponent: function() {
        var gridConfig = {};
        gridConfig["mlb"] = {
    	    store: 'Stats',

			columns: {
                defaults: {
                    align: 'right',
                    style: 'text-align:center',
                    width: 40
                },
                items: [{
                    text: 'Name',
                    dataIndex: 'name',
                    align: 'left',
                    width: 150,
                    renderer: this.formatName
                },{
                    text: 'Team',
                    dataIndex: 'team',
                    align: 'left',
                    width: 60,
                    renderer: this.formatTeam
                },{
                    text: 'OPP',
                    dataIndex: 'opp',
                    align: 'left',
                    width: 60,
                    renderer: this.formatOpponent
                },{
                    text: 'Pos',
                    dataIndex: 'spos',
                    align: 'left'
                },{
                    text: 'B-Order',
                    dataIndex: 'border',
                    renderer: this.formatBattingOrder
                },{
                    text: 'MR',
                    dataIndex: 'mr1',
                    hidden: true
                /* TODO
                },{
                    text: 'G',
                    dataIndex: 'ng'
                */
                },{
                    text: '1B',
                    dataIndex: 'x1b',
                    hidden: true
                },{
                    text: '2B',
                    dataIndex: 'x2b',
                    hidden: true
                },{
                    text: '3B',
                    dataIndex: 'x3b',
                    hidden: true
                },{
                    text: 'HR',
                    dataIndex: 'hr',
                    hidden: true
                },{
                    text: 'R',
                    dataIndex: 'r',
                    hidden: true
                },{
                    text: 'RBI',
                    dataIndex: 'rbi',
                    hidden: true
                },{
                    text: 'BB',
                    dataIndex: 'bb',
                    hidden: true
                },{
                    text: 'SB',
                    dataIndex: 'sb',
                    hidden: true
                },{
                    text: 'HBP',
                    dataIndex: 'hbp',
                    hidden: true
                },{
                    text: 'OUT',
                    dataIndex: 'o',
                    hidden: true
               },{
                    text: 'W',
                    dataIndex: 'w',
                    hidden: true
                },{
                    text: 'W/G',
                    dataIndex: 'aw',
                    hidden: true,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: 'ER',
                    dataIndex: 'er',
                    hidden: true
                },{
                    text: 'ER/G',
                    dataIndex: 'aer',
                    hidden: true,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: 'SO',
                    dataIndex: 'so',
                    hidden: true
                },{
                    text: 'SO/G',
                    dataIndex: 'aso',
                    hidden: true,
                    renderer: Ext.util.Format.numberRenderer('0.00')                
                },{
                    text: 'IP',
                    dataIndex: 'ip',
                    hidden: true
                },{
                    text: 'IP/G',
                    dataIndex: 'aip',
                    hidden: true
                },{
                    text: 'Avg Pts',
                    dataIndex: 'afp',
                    width: 60,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: '$',
                    dataIndex: 'sal',
                    width: 75,
                    renderer: this.moneyRenderer
                },{
                    text: '$/Pt',
                    dataIndex: 'cpp',
                    width: 75,
                    renderer: this.costPerPointRenderer
                }
                ]
			}
		}; 
        gridConfig["nba"] = {
            store: 'Stats',

			columns: {
                defaults: {
                    align: 'right',
                    style: 'text-align:center',
                    width: 40
                },
                items: [{
                    text: 'Name',
                    dataIndex: 'name',
                    align: 'left',
                    width: 150,
                    renderer: this.formatName
                },{
                    text: 'Team',
                    dataIndex: 'team',
                    align: 'left',
                    width: 60,
                    renderer: this.formatTeam
                },{
                    text: 'OPP',
                    dataIndex: 'opp',
                    align: 'left',
                    width: 60,
                    renderer: this.formatOpponent
                },{
                    text: 'Pos',
                    dataIndex: 'spos',
                    align: 'left'
                },{
                    text: 'Avg Pts',
                    dataIndex: 'afp',
                    width: 60,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: '$',
                    dataIndex: 'sal',
                    width: 75,
                    renderer: this.moneyRenderer
                },{
                    text: '$/Pt',
                    dataIndex: 'cpp',
                    width: 75,
                    renderer: this.costPerPointRenderer
                },{
                    text: 'ODR/5',
                    dataIndex: 'odr',
                    width: 75
                }
                ]
			}
		}; 
		Ext.apply(this, gridConfig[DFST.AppSettings.sport]);

		this.callParent(arguments);
	},

    formatBattingOrder: function(value, p, record) {
        if (value === 0) {
            return "";
        } else if (value === 10) { //pitcher
            return "N/A";
        } else {
            return value;
        }
    },
    
    moneyRenderer: function(value, p, record) {
        return Ext.util.Format.currency(value, '$', -1); 
    },
    
    /**
     * Cost Per Point renderer
     * @private
     */
    costPerPointRenderer: function(value, p, record) {
        if (value === 999999) {
            return "&infin;";
        } else {
            return this.moneyRenderer(value, p, record);
        }
    },
    
    /**
     * Name renderer
     * @private
     */
	formatName: function(value, p, record) {
        var isInjured = record.data.inj;
        var isProbable = record.data.pp;
        if (DFST.AppSettings.sport == "mlb")
        {
            value = '<a href="http://mlb.mlb.com/team/player.jsp?player_id=' + 
                record.get('id') + '" title="Click to view on MLB.com" target="mlb">' + value + '</a>';
        }
        if (isInjured) {
            return value + '<img src="images/16px-Injury_icon_2.svg.png" class="icon-indicator"/>';
        } else if (isProbable) {
            return value + '<img src="images/starting_pitcher.png" class="icon-indicator"/>';
        } else {
            return value;
        }
	},
    
	/**
     * Team renderer
     * @private
     */
	formatTeam: function(value, p, record) {
        var isHome = record.data.isHome;
        return (isHome ? '@' + value : value).toUpperCase();
	},
    
    /**
     * Opponent renderer
     * @private
     */
	formatOpponent: function(value, p, record) {
        var isHome = record.data.isHome;
        return (isHome ? record.data.opp : '@' + record.data.opp).toUpperCase();
	}
    
});

