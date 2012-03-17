Ext.define('DFST.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'DFST.view.filter.List',
        'DFST.view.drilldown.Details',
        'Ext.layout.container.Border'
    ],

	layout: 'border',

	items: [{
		region: 'center',
    	xtype: 'container',
        layout: {
            type: 'vbox',
            padding: 5,
            align: 'stretch'
        },
        defaults:{margins:'0 0 5 0'},
        items: [{
        	xtype: 'statsetgrid',
            flex: 1
        },{
            xtype: 'drilldowndetails',
            flex: 1,
            hidden: true
        }]
	}, {
		region: 'west',
		width: 270,
        xtype: 'filterlist'
	}
    ]
});

