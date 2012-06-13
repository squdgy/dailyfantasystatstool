{"ts":1339108583893,"silentsave":true,"restoring":false,"patch":[[{"diffs":[[1,"Ext.define('DFST.view.Viewport', {\n    extend: 'Ext.container.Viewport',\n\n    requires: [\n        'DFST.view.filter.List',\n        'DFST.view.drilldown.Details',\n        'Ext.layout.container.Border'\n    ],\n    \n    stores: ['Stats'],\n\n\tlayout: 'border',\n\n\titems: [{\n\t\tregion: 'center',\n    \txtype: 'container',\n        layout: {\n            type: 'vbox',\n            padding: 5,\n            align: 'stretch'\n        },\n        defaults:{margins:'0 0 5 0'},\n        items: [{\n        \txtype: 'statsetgrid',\n            flex: 2\n        },{\n            xtype: 'drilldowndetails',\n            flex: 1,\n            hidden: true\n        }]\n\t}, {\n\t\tregion: 'west',\n\t\twidth: 370,\n        xtype: 'filterlist'\n\t}, {\n        region: 'south',\n        html: '<footer>Daily Fantasy Stats Tool, Version 0.5.1, Copyright 2012 Development Partners Software</footer>'\n    }\n    ]\n});\n\n"]],"start1":0,"start2":0,"length1":0,"length2":868}]],"length":868}
