/*global Ext: false */
Ext.define('yesterdayApp.view.Grid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.yesterdaygrid',
	title: 'All NBA DK performances - defaults to showing performances with > 50 pts with best performances first. Use column header filters/sort to change',
	autoScroll: true,
    store: 'Yesterday',
    columns: [
        // {text: "Choose Report >", dataIndex: 'HistoryType', width: 200, sortable: false,
        //     filter: { type: 'list', value: 'Fantasy Points', active: true, single:true}
        // },
        {  
            text : 'Row',
            dataIndex: 'rowIndex',
            sortable : false,
            width: 30,
            renderer : function(value, metaData, record, rowIndex, colIndex, store)    
            {
                 return rowIndex + 1;     
            }
        },
        {text: "Team", dataIndex: 'Team', width: 60, filter: 'list'},
        {text: "Opp", dataIndex: 'Opponent', width: 60, filter: 'list'},
        {text: "GameDate", dataIndex: 'GameDate', width: 60, filter: 'list', renderer: Ext.util.Format.dateRenderer('m-d')},
        {text: "Position", dataIndex: 'Position', width: 60, filter: 'list'},
        {text: "First", dataIndex: 'FirstName', width: 120, filter: 'string'},
        {text: "Last", dataIndex: 'LastName', width: 120, filter: 'string'},
        {text: "Salary", dataIndex: 'Salary', width: 120, filter: 'number', renderer: function(value, p, record) {
            if (value === 0)
                return 'N/A';
            return Ext.util.Format.currency(value, '$', -1); 
            }},
        {text: "FantasyPoints", dataIndex: 'FantasyPoints', width: 120, filter: 'number', renderer: Ext.util.Format.numberRenderer('0.00'),
            filter: { type: 'numeric', value: {gt: 50} }
        },
        {text: "$/Pt", dataIndex: 'DollarsPerPoint', width: 120, filter: 'number', renderer: Ext.util.Format.numberRenderer('0.00')}/*,
        {text: "HomeRuns", dataIndex: "HomeRuns", width: 80, hidden: false }*/
    ],
    
     plugins: 'gridfilters'
});
