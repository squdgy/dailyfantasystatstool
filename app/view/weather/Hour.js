/*global Ext: false */
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
                '<h1>{su}</h1>',
                '<div>{pp:this.formatPercent}% chance of rain</div>',
                '<div>wind speed: {ws:this.formatSpeed} mph</div>',
                '</div>',
                '<div></div>',
                {
                    formatPercent: function(floatValue) {
                        return (Number(floatValue*100)).toFixed(0);
                    },
                    formatSpeed: function(mps) { //meters per second to mph
                        return Math.round((mps * 3600 / 1610.3*1000)/1000);
                    }
                })
        });
		this.callParent(arguments);
	}
});

