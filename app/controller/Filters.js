Ext.define('DFST.controller.Filters', {
    extend: 'Ext.app.Controller',

    stores: ['Stats', 'PlayerStats', 'SiteDetails'],
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
        
        var host = 'http://localhost:49533';
        var siteDetailsStore = this.getSiteDetailsStore();
        siteDetailsStore.proxy.url = host + '/api/site/';
        siteDetailsStore.filter([{id:'siteId', property: 'siteId', value: 'fd'}]);
        siteDetailsStore.load();
        
        this.control({
            'filterlist datefield':{
                change: this.changeDate
            },
            'filterlist checkbox#probables':{
                change: this.changeProbables
            },
            'filterlist checkbox#injured':{
                change: this.changeInjured
            },
            'filterlist fieldcontainer#positions checkbox':{
                change: this.changePositions
            },
            'filterlist fieldcontainer radio':{
                change: this.changeScoring
            },
            'filterlist splitbutton menu':{
                click: this.changePositionGroups
            },
            'filterlist multislider':{
                changecomplete: this.changeRange
            }            
        });
    },

    changeRange: function(slider, newValue, thumb, options) {
        var filterId = slider.id.substring(0, slider.id.indexOf('Range'));
        var statsStore = this.getStatsStore();
        var min = slider.thumbs[0].value;
        var max = slider.thumbs[1].value;
        if (min === slider.minValue && max === slider.maxValue) {
            statsStore.filters.removeAtKey(filterId);
            statsStore.filter();
            return;
        }
        statsStore.filter([{id: filterId, property: filterId, value: min + '|' + max}]);
    },

    changeDate: function(datefield, newValue, oldValue, options) {
        var statsStore = this.getStatsStore();
        statsStore.filter([{id: 'gameDate', property: 'gameDate', value: newValue.toJSON()}]);
    },
    
    changeProbables: function(checkbox, newValue, oldValue, options) {
        var statsStore = this.getStatsStore();
        statsStore.filter([{id:'probables', property: 'probables', value: newValue}]);
    },

    changeInjured: function(checkbox, newValue, oldValue, options) {
        var statsStore = this.getStatsStore();
        if (newValue) {
            statsStore.filter([{id:'inj', property: 'inj', value: false}]);
        } else {
            statsStore.filters.removeAtKey('inj');
            statsStore.filter();
            return;
        }
    },

    changePositions: function(checkbox, newValue, oldValue, options) {
/*
This next line shouldn't be needed work but is a work-around for the following bug, still not fixed in 4.1.0:
http://www.sencha.com/forum/showthread.php?171525-suspendEvents-did-not-affect-to-Ext.app.Controller.control                
*/
        if (checkbox.eventsSuspended) return;
        
        var statsStore = this.getStatsStore();
        var positionCheckboxes = Ext.ComponentQuery.query('filterlist fieldcontainer#positions checkbox');
        var value = '';
        for (var i=0; i<positionCheckboxes.length; i++) {
            var checkbox2 = positionCheckboxes[i];
            
            if (checkbox2.getRawValue()) { //is checked
                if (value !== '') {
                    value += ':';
                }
                value += checkbox2.inputValue;
            }
        }
        statsStore.filter([{id:'pos', property: 'pos', value: value}]);
    },
    
    changePositionGroups: function(menu, menuItem, e, options) {
        var statsStore = this.getStatsStore();
        var positionCheckboxes = Ext.ComponentQuery.query('filterlist fieldcontainer#positions checkbox');
        var len = positionCheckboxes.length;
        var option = menuItem.text;
        var checkbox, i, pos;
        if (option === 'none') {
            for (i=0; i<len; i++) {
                checkbox = positionCheckboxes[i];
                checkbox.suspendEvents(false);
                checkbox.setValue(false);
                checkbox.resumeEvents();                
            }
        } else if (option === 'all') {
            for (i=0; i<len; i++) {
                checkbox = positionCheckboxes[i];
                checkbox.suspendEvents(false);
                checkbox.setValue(true);
                checkbox.resumeEvents();                
            }
        } else if (option === 'pitchers') {
            for (i=0; i<len; i++) {
                checkbox = positionCheckboxes[i];                
                checkbox.suspendEvents(false);
                if (checkbox.inputValue === 'P'){                 
                    checkbox.setValue(true);
                } else {
                    checkbox.setValue(false);
                }
                checkbox.resumeEvents();                
            }
        } else if (option === 'outfielders') {
            for (i=0; i<len; i++) {
                checkbox = positionCheckboxes[i];                
                checkbox.suspendEvents(false);
                pos = checkbox.inputValue;
                if (pos === 'LF' || pos === 'RF' || pos === 'CF' || pos === 'OF' ){                 
                    checkbox.setValue(true);
                } else {
                    checkbox.setValue(false);
                }
                checkbox.resumeEvents();                
            }
        } else if (option === 'infielders') {
            for (i=0; i<len; i++) {
                checkbox = positionCheckboxes[i];                
                checkbox.suspendEvents(false);
                pos = checkbox.inputValue;
                if (pos === '1B' || pos === '2B' || pos === '3B' || pos === 'SS'){                 
                    checkbox.setValue(true);
                } else {
                    checkbox.setValue(false);
                }
                checkbox.resumeEvents();                
            }
        }
        this.changePositions(checkbox, false, false, null);
    },
    
    changeScoring: function(radiobutton, newValue, oldValue, options) {
        if (newValue) {
            var siteDetailsStore = this.getSiteDetailsStore();
            siteDetailsStore.filter([{id:'siteId', property: 'siteId', value: radiobutton.inputValue}]);
            siteDetailsStore.load();
            
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
