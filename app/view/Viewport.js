Ext.define('DFST.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'DFST.AppSettings',
        'DFST.view.filter.List',
        'DFST.view.drilldown.Details',
        'Ext.layout.container.Border'
    ],
    
    stores: ['Stats'],

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
            flex: 2
        },{
            xtype: 'drilldowndetails',
            flex: 1,
            hidden: true
        }]
	}, {
		region: 'west',
		width: 370,
        xtype: 'filterlist'
	}, {
        region: 'south',
        html: '<footer>Daily Fantasy Stats Tool, Version 0.81, Copyright 2012-2013 Development Partners Software</footer>'
    }
    ]
});

