/*global Ext: false, DFST: false */
Ext.define('DFST.view.statset.Grid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.statsetgrid',

	cls: 'statset-grid',
	disabled: false,
	
    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.util.*',
        'Ext.ux.BoxReorderer',
        'Ext.ux.ToolbarDroppable',
        'Ext.ux.DFSTGridViewDragDrop',
        'Ext.ux.PageSizePicker',
        'Ext.ux.GridSearch'
        ],
    
    border: false,    
    
    dockedItems: [{
        xtype: 'pagingtoolbar',
        dock: 'bottom',
        store: 'Stats',
        displayInfo: true,
        plugins: { ptype: 'pagesizepicker' }
    }],
    
    plugins: [{
        ptype:'gridsearch',
        position: 'bottom',
        searchText: 'Search for player',
        searchTipText: 'Searches first name and last name',
        searchFields: ['fname', 'lname'],
        width: 200
    }],
    
    viewConfig: {
        plugins: {
            ptype: 'dfstgridviewdragdrop',
            dragGroup: 'ddplayer',
            enableDrop: false,
            dragTextRenderer : function(record) {
                return 'Drag ' + record.get('fname') + ' ' + 
                    record.get('lname') + ' to the lineup builder';
            },
            doStartDrag: function(dragrec) {
                var playerId = dragrec.get('id');
                var rgrid = Ext.getCmp('rostergrid');
                if (!rgrid) return;
                var store = rgrid.store;
                          
                // make sure player not already in roster & ahas salary
                var existingRec = store.findRecord('pid', playerId);
                if (existingRec && existingRec.get('sal') > 0) { 
                    return false; 
                }
                
                return true;
            }
        }
    },

	initComponent: function() {
        var gridConfig = {};
        gridConfig.mlb = {
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
                    tooltip: 'name',
                    renderer: this.formatName
                },{
                    text: 'B',
                    dataIndex: 'bats',
                    align: 'left',
                    width: 25,
                    tooltip: 'bats',
                    renderer: this.formatHandedness
                },{
                    text: 'Th',
                    dataIndex: 'throws',
                    align: 'left',
                    width: 25,
                    tooltip: 'throws',
                    renderer: this.formatHandedness
                },{
                    text: 'Vs',
                    dataIndex: 'opp_throws',
                    align: 'left',
                    width: 25,
                    tooltip: 'handedness of opposing pitcher',
                    renderer: this.formatHandedness
                },{
                    text: 'Team',
                    dataIndex: 'team',
                    align: 'left',
                    width: 60,
                    tooltip: 'team',
                    renderer: this.formatTeam
                },{
                    text: 'Opp',
                    dataIndex: 'opp',
                    align: 'left',
                    width: 60,
                    tooltip: 'opponent',
                    renderer: this.formatOpponent
                },{
                    text: 'Pos',
                    dataIndex: 'spos',
                    tooltip: 'position',
                    align: 'left'
                },{
                    text: 'Lineup',
                    dataIndex: 'border',
                    tooltip: 'position in batting order (when known)',
                    renderer: this.formatBattingOrder
                },{
                    text: 'G',
                    dataIndex: 'ng',
                    tooltip: 'games played'
                },{
                    text: 'BA(Ph)',
                    dataIndex: 'ph_ba',
                    width: 55,
                    tooltip: 'batting average vs opponent pitcher\'s handedness',
                    renderer: this.formatVsPitcherHandedness
                },{
                    text: 'OBP(Ph)',
                    dataIndex: 'ph_obp',
                    width: 55,
                    tooltip: 'on-base percentage vs opponent pitcher\'s handedness',
                    renderer: this.formatVsPitcherHandedness
                },{
                    text: 'SLG(Ph)',
                    dataIndex: 'ph_slg',
                    width: 55,
                    tooltip: 'slugging vs opponent pitcher\'s handedness',
                    renderer: this.formatVsPitcherHandedness
                },{
                    text: 'OPS(Ph)',
                    dataIndex: 'ph_ops',
                    width: 55,
                    tooltip: 'on-base plus slugging vs opponent pitcher\'s handedness',
                    renderer: this.formatVsPitcherHandedness
                },{
                    text: 'wOBA(Ph)',
                    dataIndex: 'ph_woba',
                    width: 55,
                    tooltip: 'weighted on-base average vs opponent pitcher\'s handedness',
                    renderer: this.formatVsPitcherHandedness
                },/*{
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
                },*/{
                    text: 'Avg Pts',
                    dataIndex: 'afp',
                    width: 60,
                    tooltip: 'average fantasy points season-to-date',
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: 'Avg FP-5',
                    dataIndex: 'afp5',
                    width: 60,
                    tooltip: 'average fantasy points over player\'s last 5 games',
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: '$',
                    dataIndex: 'sal',
                    width: 80,
                    tooltip: 'current salary',
                    renderer: this.moneyRenderer
                },{
                    text: '$/Pt',
                    dataIndex: 'cpp',
                    width: 60,
                    tooltip: 'cost per point season-to-date',
                    renderer: this.costPerPointRenderer
                },{
                    text: '$/FP-5',
                    dataIndex: 'cpp5',
                    width: 60,
                    tooltip: 'cost per point over player\'s last 5 games',
                    renderer: this.costPerPointRenderer
                }]
			}
		}; 
        gridConfig.nfl = {
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
                    text: 'Opp',
                    dataIndex: 'opp',
                    align: 'left',
                    width: 60,
                    renderer: this.formatOpponent
                },{
                    text: 'Pos',
                    dataIndex: 'spos',
                    align: 'left'
                },{
                    text: 'G',
                    dataIndex: 'ng'
                },{
                    text: 'Depth',
                    dataIndex: 'dep'
                },{
                    text: 'Avg Pts',
                    dataIndex: 'afp',
                    width: 60,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: 'Avg FP-5',
                    dataIndex: 'afp5',
                    width: 70,
                    tooltip: 'average fantasy points over last 5 games',
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: '$',
                    dataIndex: 'sal',
                    width: 75,
                    renderer: this.moneyRenderer
                },{
                    text: '$/FP',
                    dataIndex: 'cpp',
                    width: 75,
                    renderer: this.costPerPointRenderer
                },{
                    text: '$/FP-5',
                    dataIndex: 'cpp5',
                    width: 75,
                    tooltip: 'cost per point over last 5 games',
                    renderer: this.costPerPointRenderer
                },{
                    text: 'Proj',
                    dataIndex: 'projp',
                    width: 75,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: '$/Proj',
                    dataIndex: 'cpprojp',
                    width: 75,
                    renderer: this.costPerPointRenderer
                }]
			}
		}; 
        gridConfig.nhl = {
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
                    text: 'Opp',
                    dataIndex: 'opp',
                    align: 'left',
                    width: 60,
                    tooltip: 'Opponent',
                    renderer: this.formatOpponent
                },{
                    text: 'Pos',
                    dataIndex: 'spos',
                    align: 'left'
                },{
                    text: 'Line',
                    dataIndex: 'border',
                    tooltip: 'which line he plays on',
                    renderer: this.formatBattingOrder
                },{
                    text: 'G',
                    dataIndex: 'ng'
                },{
                    text: 'Avg FP',
                    dataIndex: 'afp',
                    width: 70,
                    tooltip: 'average fantasy points as reported by the selected site',
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: 'Avg FP-5',
                    dataIndex: 'afp5',
                    width: 70,
                    tooltip: 'average fantasy points over last 5 games',
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: '$',
                    dataIndex: 'sal',
                    width: 75,
                    tooltip: 'player salary at the selected site',
                    renderer: this.moneyRenderer
                },{
                    text: '$/FP',
                    dataIndex: 'cpp',
                    width: 75,
                    tooltip: 'cost per point over the season to date',
                    renderer: this.costPerPointRenderer
                },{
                    text: '$/FP-5',
                    dataIndex: 'cpp5',
                    width: 75,
                    tooltip: 'cost per point over last 5 games',
                    renderer: this.costPerPointRenderer
                },{
                    text: 'Proj',
                    dataIndex: 'projp',
                    width: 75,
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: '$/Proj',
                    dataIndex: 'cpprojp',
                    width: 75,
                    renderer: this.costPerPointRenderer
                }]
			}
		}; 
        gridConfig.nba = {
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
                    text: 'Opp',
                    dataIndex: 'opp',
                    align: 'left',
                    width: 60,
                    tooltip: 'Opponent',
                    renderer: this.formatOpponent
                },{
                    text: 'Pos',
                    dataIndex: 'spos',
                    align: 'left'
                },{
                    text: 'G',
                    dataIndex: 'ng'
                },{
                    text: 'Avg FP',
                    dataIndex: 'afp',
                    width: 70,
                    tooltip: 'average fantasy points as reported by the selected site',
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: 'Avg FP-5',
                    dataIndex: 'afp5',
                    width: 70,
                    tooltip: 'average fantasy points over last 5 games',
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: '$',
                    dataIndex: 'sal',
                    width: 75,
                    tooltip: 'player salary at the selected site',
                    renderer: this.moneyRenderer
                },{
                    text: '$/FP',
                    dataIndex: 'cpp',
                    width: 75,
                    tooltip: 'cost per point over the season to date',
                    renderer: this.costPerPointRenderer
                },{
                    text: '$/FP-5',
                    dataIndex: 'cpp5',
                    width: 75,
                    tooltip: 'cost per point over last 5 games',
                    renderer: this.costPerPointRenderer
                },{
                    text: 'ODR-5',
                    dataIndex: 'odr',
                    width: 75,
                    tooltip: 'opponent defensive efficiency rank over the last 5 games. A higher number indicates a better matchup for the player.'
                }
                ]
			}
		}; 
		
		gridConfig.nas = {
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
                    text: 'Races',
                    dataIndex: 'ng',
                    tooltip: '# races'
                },{
                    text: 'Start',
                    dataIndex: 'qpos',
                    tooltip: 'Qualifying Position'
                },{
                    text: '$',
                    dataIndex: 'sal',
                    width: 75,
                    tooltip: 'player salary at the selected site',
                    renderer: this.moneyRenderer
                },{
                    text: '$/FP',
                    dataIndex: 'cpp',
                    width: 75,
                    tooltip: 'cost per point over the season to date',
                    renderer: this.costPerPointRenderer
                },{
                    text: '$/FP-5',
                    dataIndex: 'cpp5',
                    width: 75,
                    tooltip: 'cost per point over last 5 games',
                    renderer: this.costPerPointRenderer
                },{
                    text: 'Avg Pts',
                    dataIndex: 'afp',
                    width: 60,
                    tooltip: 'average fantasy points season-to-date',
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: 'Avg FP-5',
                    dataIndex: 'afp5',
                    width: 60,
                    tooltip: 'average fantasy points over player\'s last 5 games',
                    renderer: Ext.util.Format.numberRenderer('0.00')
                },{
                    text: 'P1 Pos',
                    dataIndex: 'p1pos',
                    width: 50,
                    tooltip: 'Practice 1 Position'
                },{
                    text: 'P1 Speed',
                    dataIndex: 'p1sp',
                    width: 60,
                    tooltip: 'Practice 1 Best Lap Speed'
                },{
                    text: 'P2 Pos',
                    dataIndex: 'p2pos',
                    width: 50,
                    tooltip: 'Practice 2 Position'
                },{
                    text: 'P2 Speed',
                    dataIndex: 'p2sp',
                    width: 60,
                    tooltip: 'Practice 2 Best Lap Speed'
                },{
                    text: 'P3 Pos',
                    dataIndex: 'p3pos',
                    width: 50,
                    tooltip: 'Practice 3 Position'
                },{
                    text: 'P3 Speed',
                    dataIndex: 'p3sp',
                    width: 60,
                    tooltip: 'Practice 3 Best Lap Speed'
                }]
            }
		};
		
		// State will vary by sport
		this.stateId = DFST.AppSettings.sport + '-statsetgrid';
		this.stateful = false;
		
		Ext.apply(this, gridConfig[DFST.AppSettings.sport]);

        var me = this;
        me.on({
            // wait for the first layout to access the headerCt (we only want this once):
            single: true,
            // tell the toolbar's droppable plugin that it accepts items from the columns' dragdrop group
            afterlayout: function(grid) {
                var headerCt = grid.child("headercontainer");
                droppable.addDDGroup(headerCt.reorderer.dragZone.ddGroup);
            }
        });
        me.on({
            sortchange: function(headerCt, column, direction, eOpts) {
                //alert('sortchange');
            }
        });        

        var reorderer = Ext.create('Ext.ux.BoxReorderer', {
            listeners: {
                Drop: function(r, c, button) { //update sort direction when button is dropped
                    me.changeSortDirection(button, false);
                }
            }
        });    
        
        var droppable = Ext.create('Ext.ux.ToolbarDroppable', {
            /**
             * Creates the new toolbar item from the drop event
             */
            createItem: function(data) {
                var header = data.header,
                    headerCt = header.ownerCt,
                    reorderer = headerCt.reorderer;

                // Hide the drop indicators of the standard HeaderDropZone
                // in case user had a pending valid drop in 
                if (reorderer) {
                    reorderer.dropZone.invalidateDrop();
                }

                me.down("#sortlabel").hide();
                me.down("#clearsort").show();
                return me.createSorterButtonConfig({
                    text: header.text,
                    sortData: {
                        property: header.dataIndex,
                        direction: "ASC"
                    }
                });
            },

            /**
             * Custom canDrop implementation which returns true if a column can be added to the toolbar
             * @param {Object} data Arbitrary data from the drag source. For a HeaderContainer, it will
             * contain a header property which is the Header being dragged.
             * @return {Boolean} True if the drop is allowed
             */
            canDrop: function(dragSource, event, data) {
                var sorters = me.getSorters(),
                    header  = data.header,
                    length = sorters.length,
                    entryIndex = this.calculateEntryIndex(event),
                    targetItem = this.toolbar.getComponent(entryIndex),
                    i;

                // Group columns have no dataIndex and therefore cannot be sorted
                // If target isn't reorderable it could not be replaced
                if (!header.dataIndex || (targetItem && targetItem.reorderable === false)) {
                    return false;
                }

                for (i = 0; i < length; i++) {
                    if (sorters[i].property == header.dataIndex) {
                        return false;
                    }
                }
                return true;
            },

            afterLayout: function () {
                me.doSort();
            }
        });

        //create the toolbar with the 2 plugins
        this.tbar = {
            itemId: 'tbar',
            items  : [{
                xtype: 'button',
                text: 'Reset sort',
                id: 'clearsort',
                reorderable: false,
                hidden: true,
                listeners: {
                    click : function(button) {
                        me.clearSortButtons();
                        me.store.sorters.clear();
                        me.store.load();
                    }
                }
            }, {
                xtype: 'tbtext',
                id: 'sortlabel',
                text: 'Drag headers here to enable sorting by multiple columns. Click on header to sort by 1 column.'
            }],
            plugins: [reorderer, droppable]
        };
        
		this.callParent(arguments);
	},

    onTextFieldChange: function() {
        console.log('tfc');
    },
    
    /**
     * Callback handler used when a sorter button is clicked or reordered
     * @param {Ext.Button} button The button that was clicked
     * @param {Boolean} changeDirection True to change direction (default). Set to false for reorder
     * operations as we wish to preserve ordering there
     */
    changeSortDirection: function (button, changeDirection) {
        var sortData = button.sortData,
            iconCls  = button.iconCls;
        
        if (sortData) {
            if (changeDirection !== false) {
                button.sortData.direction = Ext.String.toggle(button.sortData.direction, "ASC", "DESC");
                button.setIconCls(Ext.String.toggle(iconCls, "sort-direction-asc", "sort-direction-desc"));
            }
            this.doSort();
        }
    },
    doSort: function () {
        var sorters = this.getSorters();
        this.store.sort(sorters);
    },

    /**
     * Returns an array of sortData from the sorter buttons
     * @return {Array} Ordered sort data from each of the sorter buttons
     */
    getSorters: function () {
        var sorters = [];
        var tbar = this.down('#tbar');
 
        Ext.each(tbar.query('button'), function(button) {
            if (button.sortData) {
                sorters.push(button.sortData);
            }
        }, this);

        return sorters;
    },
    
    /**
     * Convenience function for creating Toolbar Buttons that are tied to sorters
     * @param {Object} config Optional config object
     * @return {Object} The new Button configuration
     */
    createSorterButtonConfig: function (config) {
        var me = this;
        config = config || {};
        Ext.applyIf(config, {
            listeners: {
                click: function(button, e) {
                    if (button.sortData) {
                        me.changeSortDirection(button, true);
                    }
                }
            },
            iconCls: 'sort-direction-' + config.sortData.direction.toLowerCase(),
            reorderable: true,
            xtype: 'button'
        });
        return config;
    },

    clearSortButtons: function() {
        var tbar = this.down('#tbar');
        this.down("#sortlabel").show();
        this.down("#clearsort").hide();
 
        Ext.each(tbar.query('button'), function(button) {
            if (button.sortData) {
                tbar.remove(button);
            }
        }, this);
    },
    
    formatBattingOrder: function(value, p, record) {
        if (value === 0) {
            return "";
        } else if (value === 10) { //pitcher
            return "";
        } else {
            return value;
        }
    },
    
    /**
     * Money renderer
     * @private
     */
    moneyRenderer: function(value, p, record) {
        if (value === 0)
            return '∞';
        return Ext.util.Format.currency(value, '$', -1); 
    },
    
    /**
     * Cost Per Point renderer
     * @private
     */
    costPerPointRenderer: function(value, p, record) {
        if (value === 999999) {
            return "N/A";
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
        var name = record.data.fname + " " + record.data.lname;
        if (DFST.AppSettings.sport == "mlb")
        {
            value = '<a href="http://mlb.mlb.com/team/player.jsp?player_id=' + 
                record.get('id') + '" title="Click to view on MLB.com" target="mlb">' + value + '</a>';
        }
        var probImg = (record.data.pd === 'Likely') ? 'images/probable_016.png' : 'images/starter_016.png';
        if (isInjured && isProbable) {
            return name + '<img src="' + probImg +'" class="icon-indicator" data-qtip="' + record.data.pd + '"/><img src="images/16px-Injury_icon_2.svg.png" class="icon-indicator" data-qtip="' + record.data.injd + '"/>';
        }
        if (isInjured) {
            return name + '<img src="images/16px-Injury_icon_2.svg.png" class="icon-indicator" data-qtip="' + record.data.injd + '"/>';
        } else if (isProbable) {
            return name + '<img src="' + probImg + '" class="icon-indicator" data-qtip="' + record.data.pd + '"/>';
        } else {
            return name;
        }
	},

    /**
     * Handedness renderer
     * @private
     */
    formatHandedness: function(value, p, record) {
        if (value === 2) return 'R';
        if (value === 1) return 'L';
        if (value === 3) return 'S';
        return 'UNK';
	},

    formatVsPitcherHandedness: function(value, p, record) {
        var pitcherhand = record.data.opp_throws;
        if (pitcherhand === 1 || pitcherhand === 2) {
            return Ext.util.Format.number(value, '0.000');
        }
        return 'UNK';
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
