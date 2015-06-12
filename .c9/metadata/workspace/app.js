{"filter":false,"title":"app.js","tooltip":"/app.js","undoManager":{"mark":25,"position":25,"stack":[[{"start":{"row":13,"column":4},"end":{"row":13,"column":7},"action":"insert","lines":["// "],"id":2},{"start":{"row":14,"column":4},"end":{"row":14,"column":7},"action":"insert","lines":["// "]},{"start":{"row":15,"column":4},"end":{"row":15,"column":7},"action":"insert","lines":["// "]}],[{"start":{"row":13,"column":0},"end":{"row":17,"column":0},"action":"remove","lines":["    // compatibility: {","    //     ext: '4.2'","    // },","      ",""],"id":3}],[{"start":{"row":67,"column":0},"end":{"row":67,"column":3},"action":"remove","lines":["// "],"id":5},{"start":{"row":68,"column":0},"end":{"row":68,"column":3},"action":"remove","lines":["// "]},{"start":{"row":69,"column":0},"end":{"row":69,"column":3},"action":"remove","lines":["// "]},{"start":{"row":71,"column":0},"end":{"row":71,"column":3},"action":"remove","lines":["// "]},{"start":{"row":72,"column":0},"end":{"row":72,"column":3},"action":"remove","lines":["// "]},{"start":{"row":73,"column":0},"end":{"row":73,"column":3},"action":"remove","lines":["// "]},{"start":{"row":74,"column":0},"end":{"row":74,"column":3},"action":"remove","lines":["// "]},{"start":{"row":75,"column":0},"end":{"row":75,"column":3},"action":"remove","lines":["// "]},{"start":{"row":76,"column":0},"end":{"row":76,"column":3},"action":"remove","lines":["// "]},{"start":{"row":77,"column":0},"end":{"row":77,"column":3},"action":"remove","lines":["// "]},{"start":{"row":78,"column":0},"end":{"row":78,"column":3},"action":"remove","lines":["// "]},{"start":{"row":79,"column":0},"end":{"row":79,"column":3},"action":"remove","lines":["// "]},{"start":{"row":80,"column":0},"end":{"row":80,"column":3},"action":"remove","lines":["// "]},{"start":{"row":81,"column":0},"end":{"row":81,"column":3},"action":"remove","lines":["// "]},{"start":{"row":82,"column":0},"end":{"row":82,"column":3},"action":"remove","lines":["// "]},{"start":{"row":83,"column":0},"end":{"row":83,"column":3},"action":"remove","lines":["// "]},{"start":{"row":84,"column":0},"end":{"row":84,"column":3},"action":"remove","lines":["// "]}],[{"start":{"row":67,"column":66},"end":{"row":68,"column":0},"action":"insert","lines":["",""],"id":6},{"start":{"row":68,"column":0},"end":{"row":68,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":68,"column":4},"end":{"row":69,"column":0},"action":"insert","lines":["",""],"id":7},{"start":{"row":69,"column":0},"end":{"row":69,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":68,"column":0},"end":{"row":79,"column":9},"action":"insert","lines":["        var store   = this.up('[store]').store,","            columns = this.visibleColumnManager.getColumns(),","            len = columns.length, i,","            header, sorter;","","        for (i = 0; i < len; i++) {","            header = columns[i];","            sorter = store.getSorters().get(header.getSortParam());","","            // Important: A null sorter for this column will *clear* the UI sort indicator.","            header.setSortState(sorter);","        }"],"id":8}],[{"start":{"row":68,"column":0},"end":{"row":68,"column":4},"action":"remove","lines":["    "],"id":9},{"start":{"row":69,"column":0},"end":{"row":69,"column":4},"action":"remove","lines":["    "]},{"start":{"row":70,"column":0},"end":{"row":70,"column":4},"action":"remove","lines":["    "]},{"start":{"row":71,"column":0},"end":{"row":71,"column":4},"action":"remove","lines":["    "]},{"start":{"row":73,"column":0},"end":{"row":73,"column":4},"action":"remove","lines":["    "]},{"start":{"row":74,"column":0},"end":{"row":74,"column":4},"action":"remove","lines":["    "]},{"start":{"row":75,"column":0},"end":{"row":75,"column":4},"action":"remove","lines":["    "]},{"start":{"row":77,"column":0},"end":{"row":77,"column":4},"action":"remove","lines":["    "]},{"start":{"row":78,"column":0},"end":{"row":78,"column":4},"action":"remove","lines":["    "]},{"start":{"row":79,"column":0},"end":{"row":79,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":69,"column":57},"end":{"row":70,"column":0},"action":"insert","lines":["",""],"id":10},{"start":{"row":70,"column":0},"end":{"row":70,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":70,"column":8},"end":{"row":71,"column":0},"action":"insert","lines":["        sorters = store.getSorters();",""],"id":11}],[{"start":{"row":70,"column":45},"end":{"row":71,"column":0},"action":"remove","lines":["",""],"id":12}],[{"start":{"row":70,"column":44},"end":{"row":70,"column":45},"action":"remove","lines":[";"],"id":13}],[{"start":{"row":70,"column":44},"end":{"row":70,"column":45},"action":"insert","lines":[","],"id":14}],[{"start":{"row":70,"column":12},"end":{"row":70,"column":16},"action":"remove","lines":["    "],"id":15}],[{"start":{"row":70,"column":8},"end":{"row":70,"column":12},"action":"remove","lines":["    "],"id":16}],[{"start":{"row":70,"column":4},"end":{"row":70,"column":8},"action":"remove","lines":["    "],"id":17}],[{"start":{"row":70,"column":0},"end":{"row":70,"column":4},"action":"remove","lines":["    "],"id":18}],[{"start":{"row":70,"column":0},"end":{"row":70,"column":4},"action":"insert","lines":["    "],"id":19}],[{"start":{"row":70,"column":4},"end":{"row":70,"column":8},"action":"insert","lines":["    "],"id":20}],[{"start":{"row":76,"column":17},"end":{"row":76,"column":35},"action":"remove","lines":["store.getSorters()"],"id":21},{"start":{"row":76,"column":17},"end":{"row":76,"column":24},"action":"insert","lines":["sorters"]}],[{"start":{"row":81,"column":0},"end":{"row":84,"column":0},"action":"remove","lines":["    ","    var store   = this.up('[store]').store,","        sorters = store.getSorters();",""],"id":22}],[{"start":{"row":82,"column":0},"end":{"row":83,"column":0},"action":"remove","lines":["    // adjust grid headers",""],"id":23}],[{"start":{"row":68,"column":0},"end":{"row":69,"column":0},"action":"insert","lines":["    // adjust grid headers",""],"id":24}],[{"start":{"row":68,"column":0},"end":{"row":69,"column":0},"action":"remove","lines":["    // adjust grid headers",""],"id":25}],[{"start":{"row":66,"column":0},"end":{"row":95,"column":0},"action":"remove","lines":["/* Allow grid header to show multi-column sort indicators */","Ext.grid.header.Container.prototype.setSortState = function(val) {","    var store   = this.up('[store]').store,","        columns = this.visibleColumnManager.getColumns(),","        sorters = store.getSorters(),","        len = columns.length, i,","        header, sorter;","","    for (i = 0; i < len; i++) {","        header = columns[i];","        sorter = sorters.get(header.getSortParam());","","        // Important: A null sorter for this column will *clear* the UI sort indicator.","        header.setSortState(sorter);","    }    ","","    var me = this;","    if (sorters) {","        this.clearOtherSortStates(null);","        Ext.each(sorters, function(sorter) {","            var hd = me.down('gridcolumn[dataIndex=' + sorter.property  +']');","            if (hd) {","                hd.setSortState(sorter.direction, true, true);","            }","        }, this);","    } else {","        this.clearOtherSortStates(null);","    }","};",""],"id":26}],[{"start":{"row":65,"column":0},"end":{"row":66,"column":0},"action":"remove","lines":["",""],"id":27}],[{"start":{"row":45,"column":0},"end":{"row":59,"column":0},"action":"remove","lines":["","/* Fix for ExtJS 4.1.0 bug */","Ext.override(Ext.view.AbstractView, {","    onRender: function() ","    {","        var me = this;","        ","        this.callOverridden();","        ","        if (me.mask && Ext.isObject(me.store)) {","            me.setMaskBind(me.store);","        }","    }","});",""],"id":28}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":6,"column":33},"end":{"row":6,"column":33},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1433500936000,"hash":"fab2abec1c2ae65c9373c0284868066315f98839"}