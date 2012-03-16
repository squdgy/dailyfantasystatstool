Ext.define('DFST.controller.Filters', {
    extend: 'Ext.app.Controller',

    stores: ['Stats'],
    models: ['StatSet'],
//    views: ['filter.Add'],
    
    refs: [
        {ref: 'filterList', selector: 'filterlist'},
        {ref: 'filterData', selector: 'filterlist dataview'},
        {ref: 'filterShow', selector: 'filtershow'},
        {ref: 'filterForm', selector: 'filterwindow form'},
        {ref: 'filterCombo', selector: 'filterwindow combobox'},
        {ref: 'articleGrid', selector: 'articlegrid'},
        {
            ref: 'filterWindow', 
            selector: 'filterwindow', 
            autoCreate: true,
            xtype: 'filterwindow'
        }
    ],
    
//    requires: ['DFST.lib.FilterValidator'],

    // At this point things haven't rendered yet since init gets called on controllers before the launch function
    // is executed on the Application
    init: function() {
        this.control({
            'filterlist dataview': {
                selectionchange: this.loadFilter
            },
            'filterlist button[action=add]': {
                click: this.addFilter
            },
            'filterlist button[action=remove]': {
                click: this.removeFilter
            },
            'filterwindow button[action=create]': {
                click: this.createFilter
            }
        });
    },
    
    onLaunch: function() {
        var dataview = this.getFilterData(),
            store = this.getFiltersStore();
            
        dataview.bindStore(store);
        dataview.getSelectionModel().select(store.getAt(0));
    },
    
    /**
     * Loads the given filter into the viewer
     * @param {DFST.model.filter} filter The filter to load
     */
    loadFilter: function(selModel, selected) {
        var grid = this.getArticleGrid(),
            store = this.getArticlesStore(),
            filter = selected[0];

        if (filter) {
            this.getFilterShow().setTitle(filter.get('name'));
            grid.enable();
            store.load({
                params: {
                    filter: filter.get('url')
                }
            });            
        }
    },
    
    /**
     * Shows the add filter dialog window
     */
    addFilter: function() {
        this.getFilterWindow().show();
    },
    
    /**
     * Removes the given filter from the Filters store
     * @param {DFST.model.Filter} filter The filter to remove
     */
    removeFilter: function() {
        this.getFiltersStore().remove(this.getFilterData().getSelectionModel().getSelection()[0]);
    },
    
    /**
     * @private
     * Creates a new filter in the store based on a given url. First validates that the filter is well formed
     * using DFST.lib.FilterValidator.
     * @param {String} name The name of the Filter to create
     * @param {String} url The url of the Filter to create
     */
    createFilter: function() {
        var win   = this.getFilterWindow(),
            form  = this.getFilterForm(),
            combo = this.getFilterCombo(),
            store = this.getFiltersStore(),
            filter  = this.getFilterModel().create({
                name: combo.getDisplayValue(),
                url: combo.getValue()
            });

        form.setLoading({
            msg: 'Validating filter...'
        });
        
        DFST.lib.FilterValidator.validate(filter, {
            success: function() {
                store.add(filter);
                form.setLoading(false);
                win.hide();
            },
            failure: function() {
                form.setLoading(false);
                form.down('[name=filter]').markInvalid('The URL specified is not a valid RSS2 filter.');
            }
        });
    }
});
