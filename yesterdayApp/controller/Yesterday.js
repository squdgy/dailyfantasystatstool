/*global Ext: false*/
Ext.define('yesterdayApp.controller.Yesterday', {
    extend: 'Ext.app.Controller',

    stores: ['Yesterday'],
    views: ['Grid'],
    refs: [
        { ref: 'dataGrid', selector: 'grid' }
    ],

    init: function() {
        var host = 'https://localhost:44301';    //local
        if (window.location.hostname.indexOf('azurewebsites') > 0) {
            host = 'http://draftaidapi.azurewebsites.net';  //live
        }
        var yesterdayStore = this.getYesterdayStore();
        yesterdayStore.proxy.url = host + '/api/history/';
        yesterdayStore.on('filterchange', this.onReportFilterChanged, this);
    },
    
    onLaunch: function() {
        this.getYesterdayStore().load();
    },
    
    onReportFilterChanged: function(store, filters, options) {
        var reportType = filters[0].getValue()[0];
        var grid = this.getDataGrid();
        var cols = grid.columnManager.getColumns();
        var homeRunsCol = cols.find(function(x){
            if (x.dataIndex == "HomeRuns")
                return x;
        });
        var fpCol = cols.find(function(x){
            if (x.dataIndex == "FantasyPoints")
                return x;
        });
        var salCol = cols.find(function(x){
            if (x.dataIndex == "Salary")
                return x;
        });
        var dppCol = cols.find(function(x){
            if (x.dataIndex == "DollarsPerPoint")
                return x;
        });
        if (reportType === "Home Runs") {
            homeRunsCol.setVisible(true);
            fpCol.setVisible(false);
            salCol.setVisible(false);
            dppCol.setVisible(false);
        }
        if (reportType === "Fantasy Points") {
            homeRunsCol.setVisible(false);
            fpCol.setVisible(true);
            salCol.setVisible(true);
            dppCol.setVisible(true);
        }
    }
});
