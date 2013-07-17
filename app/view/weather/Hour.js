/* 
Contains 1 hour's weather for a game
*/
Ext.define('DFST.view.weather.Hour', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.weatherhour',

	autoScroll: true,
	border: false,
    title: '',
	
	initComponent: function() {
		Ext.apply(this, {
            tpl: new Ext.XTemplate(
                '<div class="post-data">',
                '<h1>{summary}</h1>',
                '<div>Probability of rain: {precipProbability}</div>',
                '</div>',
                '<div></div>'
                )
        });
		this.callParent(arguments);
	}
});

