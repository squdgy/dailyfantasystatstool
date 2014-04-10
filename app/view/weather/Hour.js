/*global Ext: false */
/* 
Contains 1 hour's weather for a game
*/
Ext.define('DFST.view.weather.Hour', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.weatherhour',

	autoScroll: true,
	border: false,

	initComponent: function() {
		Ext.apply(this, {
            tpl: new Ext.XTemplate(
                '<div class="weather-hour">',
                '<hr/>',
                '<h4>{ti:this.formatTime}</h4>',
                '<h4>{su}</h4>',
                '<div>{pp:this.formatPercent}% chance of rain</div>',
                '<div>wind speed: {ws:this.formatSpeed} mph</div>',
                '</div>',
                {
                    formatTime: function(value) {
                        var hour = new Date(value);
                        hour = Ext.Date.add(hour, Ext.Date.MINUTE, hour.getTimezoneOffset());
                        return Ext.Date.format(hour, 'g:i a');
                    },
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

