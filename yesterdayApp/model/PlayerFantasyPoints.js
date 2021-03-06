/*global Ext: false */
/*
Copyright (c) 2012-2018 DraftAid.com
*/
Ext.define('yesterdayApp.model.PlayerFantasyPoints', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'HistoryType', type: 'string', defaultFalue: 'Fantasy Points' },
        { name: 'Team', type: 'string', defaultValue: '' },
        { name: 'Position', type: 'string', defaultValue: '' },
        { name: 'FirstName', type: 'string', defaultValue: '' },
        { name: 'LastName', type: 'string', defaultValue: '' },
        { name: 'Game', type: 'string', defaultValue: '' },
        { name: 'Salary', type: 'float', defaultValue: 0.0 },
        { name: 'FantasyPoints', type: 'float', defaultValue: 0.0 },
        { name: 'DollarsPerPoint', type: 'float', defaultValue: 0.0 },
        { name: 'HomeRuns', type: 'int', defaultValue: 0 }
    ]
});
