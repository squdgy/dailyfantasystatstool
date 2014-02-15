/*global Ext: false, DFST: false */
Ext.define('Ext.ux.DFSTGridViewDragDrop', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.dfstgridviewdragdrop',

    uses: [
        'Ext.view.DragZone',
        'Ext.grid.ViewDropZone'
    ],

    ddGroup : "DFSTGridDD",
    enableDrop: true,
    enableDrag: true,
    containerScroll: false,

    dragText : 'Dragging',
    
    /* override this to format drag text from data record*/
    dragTextRenderer : function(record) {
        return this.dragText;
    },
    
    /*funcs to override */
    onNodeOver: function() {},
    onNodeDrop: function() {},
    doStartDrag: function(record) { return true; },

    init : function(view) {
        view.on('render', this.onViewRender, this, {single: true});
    },

    destroy: function() {
        Ext.destroy(this.dragZone, this.dropZone);
    },

    enable: function() {
        var me = this;
        if (me.dragZone) {
            me.dragZone.unlock();
        }
        if (me.dropZone) {
            me.dropZone.unlock();
        }
        me.callParent();
    },

    disable: function() {
        var me = this;
        if (me.dragZone) {
            me.dragZone.lock();
        }
        if (me.dropZone) {
            me.dropZone.lock();
        }
        me.callParent();
    },

    onViewRender : function(view) {
        var me = this,
            scrollEl;

        if (me.enableDrag) {
            if (me.containerScroll) {
                scrollEl = view.getEl();
            }
            
            me.dragZone = new Ext.view.DragZone({
                view: view,
                ddGroup: me.dragGroup || me.ddGroup,
                dragText: me.dragText,
                containerScroll: me.containerScroll,
                scrollEl: scrollEl,
                onBeforeDrag: function(data, e) {
                    var record = data.view.getRecord(data.item);
                    this.dragText = me.dragTextRenderer(record);
                    return me.doStartDrag(record);
                }
            });
        }

        if (me.enableDrop) {
            me.dropZone = new Ext.grid.ViewDropZone({
                view: view,
                ddGroup: me.dropGroup || me.ddGroup,
                onNodeOver: me.onNodeOver,
                onNodeDrop: me.onNodeDrop
            });
        }
    }
});