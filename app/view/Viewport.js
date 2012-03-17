Ext.define('DFST.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'DFST.view.Viewer',
        'DFST.view.filter.List',
        'DFST.view.drilldown.Details',
        'Ext.layout.container.Border'
    ],

	layout: 'border',

	items: [{
		region: 'center',
    	xtype: 'container',
        items: [{
        	xtype: 'statsetgrid'
        },{
            xtype: 'drilldowndetails',
        }]
	}, {
		region: 'west',
		width: 350,
        xtype: 'filterlist'
	}
    ]
});

