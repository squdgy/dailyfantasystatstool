Ext.define('DFST.controller.Filters', {
    extend: 'Ext.app.Controller',

    stores: ['Stats', 'PlayerStats'],
    models: ['StatSet'],
    views: ['filter.List'],
    
    refs: [
        {ref: 'filterList', selector: 'filterlist'},
        {ref: 'dateFilter', selector: 'filterlist datefield'},
        {ref: 'filterData', selector: 'filterlist dataview'},
        {ref: 'filterShow', selector: 'filtershow'},
        {ref: 'filterForm', selector: 'filterwindow form'},
        {ref: 'filterCombo', selector: 'filterwindow combobox'}
    ],
    
    // At this point things haven't rendered yet since init gets called on controllers before the launch function
    // is executed on the Application
    init: function() {
        this.control({
            'filterlist datefield':{
                change: this.changeDate
            },
            'filterlist checkbox#probables':{
                change: this.changeProbables
            },
            'filterlist fieldcontainer#positions checkbox':{
                change: this.changePositions
            },
            'filterlist fieldcontainer radio':{
                change: this.changeScoring
            }            
        });
    },
    
    changeDate: function(datefield, newValue, oldValue, options) {
        var statsStore = this.getStatsStore();
        statsStore.filter([{id: 'gameDate', property: 'gameDate', value: newValue.toJSON()}]);
    },
    
    changeProbables: function(checkbox, newValue, oldValue, options) {
        var statsStore = this.getStatsStore();
        statsStore.filter([{id:'probables', property: 'probables', value: newValue}]);
    },

    changePositions: function(checkbox, newValue, oldValue, options) {
        var statsStore = this.getStatsStore();
        var positionCheckboxes = Ext.ComponentQuery.query('filterlist fieldcontainer checkbox');
        var value = '';
        for (var i=0; i<positionCheckboxes.length; i++) {
            var checkbox = positionCheckboxes[i];
            if (checkbox.getRawValue()) { //is checked
                if (value !== '') {
                    value += ':';
                }
                value += checkbox.inputValue;
            }
        }
        statsStore.filter([{id:'pos', property: 'pos', value: value}]);
    },
    
    changeScoring: function(radiobutton, newValue, oldValue, options) {
        if (newValue) {
            var statsStore = this.getStatsStore();
            statsStore.filter([{id:'scoring', property: 'scoring', value: radiobutton.inputValue}]);
            
            var playerStatsStore = this.getPlayerStatsStore();
            playerStatsStore.filter([{id:'scoring', property: 'scoring', value: radiobutton.inputValue}]);
        }
    },

    onLaunch: function() {
        /*
        var dataview = this.getFilterData(),
            store = this.getFilterStore();
            
        dataview.bindStore(store);
        dataview.getSelectionModel().select(store.getAt(0));
        */
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
