Ext.define('DFST.controller.Filters', {
    extend: 'Ext.app.Controller',

    stores: ['Stats', 'PlayerStats', 'SiteDetails'],
    models: ['StatSet'],
    views: ['filter.List'],
    
    refs: [
        {ref: 'dateFilter', selector: 'filterlist datefield'},
        {ref: 'probablesFilter', selector: 'filterlist checkbox#probables'},
        {ref: 'injuredFilter', selector: 'filterlist checkbox#injured'},
        {ref: 'positionFilters', selector: 'filterlist fieldcontainer#positions'},
        {ref: 'salRangeFilter', selector: 'filterlist multislider#salRange'},
        {ref: 'cppRangeFilter', selector: 'filterlist multislider#cppRange'},
        {ref: 'afpRangeFilter', selector: 'filterlist multislider#afpRange'},
        {ref: 'ngRangeFilter', selector: 'filterlist multislider#ngRange'}
    ],
    
    // At this point things haven't rendered yet since init gets called on controllers before the launch function
    // is executed on the Application
    init: function() {
        
        var host = 'http://localhost:49533';
        var siteDetailsStore = this.getSiteDetailsStore();
        siteDetailsStore.proxy.url = host + '/api/site/';
        siteDetailsStore.filter([{id:'siteId', property: 'siteId', value: 'fd'}]);
        siteDetailsStore.on('load', this.onScoringChanged, this);
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
        /*
        This next line shouldn't be needed work but is a work-around for the following bug, still not fixed in 4.1.0:
        http://www.sencha.com/forum/showthread.php?171525-suspendEvents-did-not-affect-to-Ext.app.Controller.control                
        */
        if (checkbox.eventsSuspended) return;
        
        var statsStore = this.getStatsStore();
        statsStore.filter([{id:'probables', property: 'probables', value: newValue}]);
    },

    changeInjured: function(checkbox, newValue, oldValue, options) {
        /*
        This next line shouldn't be needed work but is a work-around for the following bug, still not fixed in 4.1.0:
        http://www.sencha.com/forum/showthread.php?171525-suspendEvents-did-not-affect-to-Ext.app.Controller.control                
        */
        if (checkbox.eventsSuspended) return;
        
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
        statsStore.filter([{id:'spos', property: 'spos', value: value}]);
    },
    
    changePositionGroups: function(menu, menuItem, e, options) {
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
                if (checkbox.inputValue === 'P' || checkbox.inputValue === 'SP'){                 
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
        }
    },

    onScoringChanged: function(store, records, wasSuccessful, options) {
        if (records.length === 0) return;
        var site = records[0];
        
        // Change the list of position filters
        // All positions will reset to checked
        var posContainer = this.getPositionFilters();
        posContainer.removeAll(true);
        var positions = site.get('pos');
        for (var i=0, mlen=positions.length; i < mlen; i++) {
            var pos = positions[i];
            posContainer.add(new Ext.form.field.Checkbox({
                        boxLabel: pos,
                        name: 'pos',
                        checked: true,
                        inputValue: pos
                    }));
        }
        
        // change the values for all range filters
        var salFilter = this.getSalRangeFilter();
        salFilter.setMinValue(site.get('salmin'));
        salFilter.setMaxValue(site.get('salmax'));
        salFilter.increment = site.get('salstep');
        salFilter.setValue(0, site.get('salmin'));
        salFilter.setValue(1, site.get('salmax'));

        var cppFilter = this.getCppRangeFilter();
        cppFilter.setMinValue(site.get('cppmin'));
        cppFilter.setMaxValue(site.get('cppmax'));
        cppFilter.increment = site.get('cppstep');
        cppFilter.setValue(0, site.get('cppmin'));
        cppFilter.setValue(1, site.get('cppmax'));

        var afpFilter = this.getAfpRangeFilter();
        afpFilter.setMinValue(site.get('afpmin'));
        afpFilter.setMaxValue(site.get('afpmax'));
        afpFilter.increment = site.get('afpstep');
        afpFilter.setValue(0, site.get('afpmin'));
        afpFilter.setValue(1, site.get('afpmax'));
        
        // set all other filters to default values
        var probablesFilter = this.getProbablesFilter();
        probablesFilter.suspendEvents(false);
        probablesFilter.setValue(true);
        probablesFilter.resumeEvents();    
        var injuredFilter = this.getInjuredFilter();
        injuredFilter.suspendEvents(false);
        injuredFilter.setValue(false);
        injuredFilter.resumeEvents();
        var ngRangeFilter = this.getNgRangeFilter();
        ngRangeFilter.setValue(0, ngRangeFilter.minValue);
        ngRangeFilter.setValue(1, ngRangeFilter.maxValue);
        
        
        // refresh player store
        var statsStore = this.getStatsStore();
        statsStore.clearFilter(true);
        statsStore.filter([
            {id: "gameDate", property: "gameDate", value: this.getDateFilter().value.toJSON()},
            {id:'scoring', property: 'scoring', value: site.get('siteId')},
            {id:'probables', property: 'probables', value: true}
            ]);
    },
    
    onLaunch: function() { //TODO: do we need to do anything in here?
        /*
        var dataview = this.getFilterData(),
            store = this.getFilterStore();
            
        dataview.bindStore(store);
        dataview.getSelectionModel().select(store.getAt(0));
        */
    }
    
});
