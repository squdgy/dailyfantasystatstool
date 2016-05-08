/*global Ext: false */
Ext.define('yesterdayApp.view.Grid', {
    extend: 'Ext.grid.Panel',
	alias: 'widget.yesterdaygrid',
	title: 'Yesterday\'s Fantasy Points',
	autoScroll: true,
    store: 'Yesterday',
    columns: [
        {text: "Team", dataIndex: 'Team', width: 100, filter: 'list'},
        {text: "Position", dataIndex: 'Position', width: 100, filter: 'list'},
        {text: "First", dataIndex: 'FirstName', width: 120, filter: 'string'},
        {text: "Last", dataIndex: 'LastName', width: 120, filter: 'string'},
        {text: "Game", dataIndex: 'Game', width: 120, filter: 'list'},
        {text: "Salary", dataIndex: 'Salary', width: 120, filter: 'number', renderer: function(value, p, record) {
            if (value === 0)
                return 'N/A';
            return Ext.util.Format.currency(value, '$', -1); 
            }},
        {text: "FantasyPoints", dataIndex: 'FantasyPoints', width: 120, filter: 'number', renderer: Ext.util.Format.numberRenderer('0.00')},
        {text: "$/Pt", dataIndex: 'DollarsPerPoint', width: 120, filter: 'number', renderer: Ext.util.Format.numberRenderer('0.00')}
    ],
    
     plugins: 'gridfilters'
});

