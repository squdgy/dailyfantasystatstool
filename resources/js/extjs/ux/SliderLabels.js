/*global Ext: false*/
Ext.define('Ext.ux.SliderLabels', {
    extend: 'Ext.slider.Tip',
    
    init: function(slider) {
        var me = this;
        me.callParent(arguments);
        slider.removeListener('dragend', me.hide);
        slider.on({
            scope: me,
            change: me.onSlide,
            afterrender: {
                fn: function() {
                    me.onSlide(slider, null, slider.thumbs[0]);
                },
                delay: 100
            }
        });
    }
});