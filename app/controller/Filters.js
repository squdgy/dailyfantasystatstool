/*global Ext: false, DFST: false*/
Ext.define('DFST.controller.Filters', {
    extend: 'Ext.app.Controller',

    stores: ['Stats', 'PlayerStats', 'SiteDetails', 'Games'],
    models: ['StatSet'],
    views: ['filter.List', 'site.Picker', 'game.Picker'],
    
    refs: [
        {ref: 'draftgroupFilter', selector: 'sitepicker combobox#draftgroups'},
        {ref: 'probablesFilter', selector: 'filterlist checkbox#probables'},
        {ref: 'injuredFilter', selector: 'filterlist checkbox#injured'},
        {ref: 'positionFilters', selector: 'filterlist fieldcontainer#positions'},
        {ref: 'batsFilters', selector: 'filterlist fieldcontainer#bats'},
        {ref: 'salRangeFilter', selector: 'filterlist multislider#salRange'},
        {ref: 'cppRangeFilter', selector: 'filterlist multislider#cppRange'},
        {ref: 'cpp5RangeFilter', selector: 'filterlist multislider#cpp5Range'},
        {ref: 'afpRangeFilter', selector: 'filterlist multislider#afpRange'},
        {ref: 'afp5RangeFilter', selector: 'filterlist multislider#afp5Range'},
        {ref: 'ngRangeFilter', selector: 'filterlist multislider#ngRange'},
        {ref: 'projpRangeFilter', selector: 'filterlist multislider#projpRange'},
        {ref: 'cpprojpRangeFilter', selector: 'filterlist multislider#cpprojpRange'},
        {ref: 'notInLineupFilter', selector: 'filterlist checkbox#notinlineup'},
        {ref: 'gamesFilters', selector: 'filterlist fieldcontainer#games'},
        {ref: 'drilldowndetails',  selector: 'drilldowndetails'},
        {ref: 'gamedetails', selector: 'gamedetails'},
        {ref: 'export', selector: 'export'},
        {ref: 'rosterbuilder', selector: 'rosterbuilder'},
        {ref: 'viewport', selector: 'viewport'},
        {ref: 'sitePanel', selector: 'sitepicker'},
        {ref: 'sportPicker', selector: 'sportPicker'},
        {ref: 'gamePicker', selector: 'gamepicker'},
        {ref: 'positionsPanel', selector: '#positionsPanel'}
    ],
    
    // At this point things haven't rendered yet since init gets called on controllers before the launch function
    // is executed on the Application
    init: function() {
        
        //local variables
        this.draftgroupIsChanging = false;
        
        this.control({
            'sitepicker combobox#draftgroups':{
                change: this.changeDraftgroup
            },
            'sitepicker fieldcontainer radio':{
                change: this.changeSite
            },
            'sitepicker button#globalreset' : {
                click: this.resetEverything
            },
            'filterlist checkbox#probables':{
                change: this.changeProbables
            },
            'filterlist checkbox#injured':{
                change: this.changeInjured
            },
            'filterlist checkbox#notinlineup':{
                change: this.changeByLineup
            },
            'filterlist fieldcontainer#battingorderFilter checkbox':{
                change: this.changeLineupSpots
            },
            'filterlist fieldcontainer#positions checkbox':{
                change: this.changePositions
            },
            'filterlist fieldcontainer#bats checkbox':{
                change: this.changeBats
            },
            'filterlist splitbutton menu':{
                click: this.changePositionGroups
            },
            'filterlist multislider':{
                changecomplete: this.changeRange
            },
            'filterlist fieldcontainer#games button':{
                click: this.changeGames
            }/*, use a go button to change the filter on games, instead of this
            'filterlist fieldcontainer#games checkbox':{
                change: this.changeGames
            }*/,
            'filterlist button#export':{
                click: this.exportPlayers
            },
            'statsetgrid' : {
                search: this.searchForPlayer
            }
        });
        
        this.listen({            
            controller: {
                '*': {
                    appDraftgroupChanged: this.onDraftgroupChanged
                }
            }
        });

        
        // set up load masking
        var me = this;
        this.getSiteDetailsStore().on('beforeload', function(store){
            store.getProxy().extraParams = {
                sport: DFST.AppSettings.sport
            };
            me.getViewport().setLoading('Retrieving player salaries...');
        });
        this.getSiteDetailsStore().proxy.on('exception', function(proxy, response){
            me.getViewport().setLoading(false);
            if (response.status === 200) {
                var firstSiteRadio = Ext.ComponentQuery.query('sitepicker fieldcontainer radio')[0];
                firstSiteRadio.setValue(true);
                return;
            }
            Ext.Msg.alert('Error', 'Unable to reach server. Please try again later.');
        });        
        this.getStatsStore().on('load', function(){
            me.getViewport().setLoading(false);
        });
    },

    resetEverything: function() {
        var cp = Ext.state.Manager.getProvider();
        for (var item in cp.state) {
            Ext.state.Manager.clear(item);
        }
        window.location = document.URL;
    },
    
    searchForPlayer: function(value) {
        var statsStore = this.getStatsStore();
        if (value === '') {
            statsStore.filters.removeAtKey('name');
            statsStore.filter();
        }
        statsStore.filter([{id:'name', property: 'name', value: value}]);
    },

    exportPlayers: function() {
        var statsStore = this.getStatsStore();

        Ext.Ajax.request({
            method: 'GET',
            //cors: true,
            url: this.host + '/api/players/',
            headers: {
                'Accept': 'text/csv'
            },
            params: {
                page: 1, start: 0, limit: 999999, sort: '',
                filter: statsStore.proxy.encodeFilters(statsStore.filters.items)
            },
            success: function(xhr) {
                var encodedUri = encodeURI(xhr.responseText);
                var link = document.createElement("a");
                link.setAttribute("href", "data:," + encodedUri);
                link.setAttribute("download", "players.csv");
                link.click();                 
            },
            failure: function() {
                alert('Unable to export players');
            }
        });        
    },
    
    changeGames: function(checkbox, newValue, oldValue, options) {
        /*
        This next line shouldn't be needed work but is a work-around for the following bug, still not fixed in 4.1.0:
        http://www.sencha.com/forum/showthread.php?171525-suspendEvents-did-not-affect-to-Ext.app.Controller.control                
        */
        if (checkbox.eventsSuspended) return;
        
        var statsStore = this.getStatsStore();
        var gameCheckboxes = Ext.ComponentQuery.query('filterlist fieldcontainer#games checkbox');
        var value = '';
        var allChecked = true;
        for (var i=0; i<gameCheckboxes.length; i++) {
            var checkbox2 = gameCheckboxes[i];
            
            if (checkbox2.getRawValue()) { //is checked
                if (value !== '') {
                    value += ':';
                }
                var gameId = checkbox2.inputValue;
                //var team1 = this.getTeamCode(gameId.substring(11, 14));
                //var team2 = this.getTeamCode(gameId.substring(18, 21));
                value += gameId;
            } else {
                allChecked = false;
            }
        }
        if (allChecked) {
            statsStore.filters.removeAtKey('gameId');
            statsStore.filter();
        } else {
            statsStore.filter([{id:'gameId', property: 'gameId', value: value}]);
        }
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

    changeDraftgroup: function(draftgroupPicker, newValue, oldValue, options) {
        this.draftgroupIsChanging = oldValue !== undefined;

        if (this.draftgroupIsChanging) {
            var statsStore = this.getStatsStore();
            var gamesStore = this.getGamesStore();

            var filters = [
                {id: 'sport', property: 'sport', value: DFST.AppSettings.sport},
                {id: 'draftgroupId', property: 'draftgroupId', value: newValue }
            ];

            filters.push({id: 'sport', property: 'sport', value: DFST.AppSettings.sport});
            gamesStore.filter(filters);
            gamesStore.load();

            statsStore.filters.removeAtKey('gameId'); // clear all game filters
            statsStore.filter(filters);
            
            this.fireEvent('appDraftgroupChanged', newValue);
        }
    },

    onDraftgroupChanged: function(draftgroupId){
        // Change the list of position filters
        // All positions will reset to checked
        var posContainer = this.getPositionFilters();
        posContainer.removeAll(true);
        var draftgroup = this.getDraftGroup(draftgroupId);
        if (!draftgroup) return;

        var positions = draftgroup.rules.pos;
        var added = [];
        for (var i=0, mlen=positions.length; i < mlen; i++) {
            var pos = positions[i];
            if (added.includes(pos.rpId)) continue;
            posContainer.add(new Ext.form.field.Checkbox({
                        boxLabel: pos.details.name,
                        name: 'pos',
                        checked: true,
                        inputValue: pos.rpId
                    }));
            added.push(pos.rpId);
        }
        var posPanel = this.getPositionsPanel();
        if (added.length === 1) {
            posContainer.hide();
            if (!DFST.AppSettings[DFST.AppSettings.sport].hasExtraPositionFilters) {
                posPanel.hide();
            }
        } else {
            posContainer.show();
            posPanel.show();
        }
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
    
    /* Hide or show players that are known to be in or out of the day's starting lineup */
    changeByLineup: function(checkbox, newValue, oldValue, options) {
        /*
        This next line shouldn't be needed work but is a work-around for the following bug, still not fixed in 4.1.0:
        http://www.sencha.com/forum/showthread.php?171525-suspendEvents-did-not-affect-to-Ext.app.Controller.control                
        */
        if (checkbox.eventsSuspended) return;

        this.changeLineupSpots(checkbox, newValue, oldValue, options);
        return;
        /*
        var statsStore = this.getStatsStore();
        if (newValue) {
            var value = '1:2:3:4:5:6:7:8:9:10'; //all spots in lineup
            statsStore.filter([{id:'border', property: 'border', value: value}]);
        } else {
            statsStore.filters.removeAtKey('border');
            statsStore.filter();
            return;
        }
        */
    },
    
    /* Hide or show players that are batting in a particular spot in the lineup (1-9) */
    changeLineupSpots: function(checkbox, newValue, oldValue, options) {
        /*
        This next line shouldn't be needed work but is a work-around for the following bug, still not fixed in 4.1.0:
        http://www.sencha.com/forum/showthread.php?171525-suspendEvents-did-not-affect-to-Ext.app.Controller.control                
        */
        if (checkbox.eventsSuspended) return;

        var statsStore = this.getStatsStore();
        var bOrderCheckboxes = Ext.ComponentQuery.query('filterlist fieldcontainer#battingorderFilter checkbox');
        var filteringOutNonStarters = this.getNotInLineupFilter().getRawValue();      
        var value = filteringOutNonStarters ? '' : 0;
        for (var i=0; i<bOrderCheckboxes.length; i++) {
            var checkbox2 = bOrderCheckboxes[i];
            
            if (checkbox2.getRawValue()) { //is checked
                if (value !== '') {
                    value += ':';
                }
                value += checkbox2.inputValue;
            }
        }
        if (value !== '') {
            value += ':';
        }
        value += "10"; // always include pitcher
        
        if (value === '0:1:2:3:4:5:6:7:8:9:10') {
            statsStore.filters.removeAtKey('border');
            statsStore.filter();
            return;
        } 
        statsStore.filter([{id:'border', property: 'border', value: value}]);
    },
    
    getPositionsFilterValue: function() {
        return this.getCheckboxFilterValues('positions');
    },

    getCheckboxFilterValues: function(checkboxFieldId) {
        /* Return the value that will be sent to the server as the position
        filter value, filter id = posId*/
        var positionCheckboxes = Ext.ComponentQuery.query('filterlist fieldcontainer#' + checkboxFieldId + ' checkbox');
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
        return value;
    },  
    
    changePositions: function(checkbox, newValue, oldValue, options) {
        /*
        This next line shouldn't be needed work but is a work-around for the following bug, still not fixed in 4.1.0:
        http://www.sencha.com/forum/showthread.php?171525-suspendEvents-did-not-affect-to-Ext.app.Controller.control                
        */
        if (checkbox.eventsSuspended) return;
        
        this.getStatsStore()
            .filter([{id:'posId', property: 'posId', 
            value: this.getPositionsFilterValue()}]);
    },

    changeBats: function(checkbox, newValue, oldValue, options) {
        var filterValue = this.getCheckboxFilterValues('bats');
        this.getStatsStore()
            .filter([{id:'bats',property:'bats',value:filterValue}]);
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
                if (checkbox.boxLabel === 'P' || checkbox.boxLabel === 'SP'){                 
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
                pos = checkbox.boxLabel;
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
                pos = checkbox.boxLabel;
                if (pos === '1B' || pos === '2B' || pos === '3B' || pos === 'SS' ){
                    checkbox.setValue(true);
                } else {
                    checkbox.setValue(false);
                }
                checkbox.resumeEvents();                
            }
        }
        this.changePositions(checkbox, false, false, null);
    },
    
    changeSite: function(radiobutton, newValue, oldValue, options) {
        if (newValue) {
            var siteDetailsStore = this.getSiteDetailsStore();
            siteDetailsStore.filter([
                {id:'siteId', property: 'siteId', value: radiobutton.inputValue},
            ]);
        }
    },

    onSiteChanged: function(store, filters, options) {
        if (store.count() === 0) {
            this.getStatsStore().removeAll();
            this.getGamedetails().hide();
            this.getDrilldowndetails().hide();            
            return;
        }
        
        var site = store.first();
        //update DFST global
        DFST.AppSettings.siteId = site.get('siteId');

        // reset player store filters
        var statsStore = this.getStatsStore();
        statsStore.filters.removeAtKey('pos');
        statsStore.filters.removeAtKey('afp');
        statsStore.filters.removeAtKey('cpp');
        statsStore.filters.removeAtKey('sal');
        
        // update the sports links to have the correct site
        var sportPicker = this.getSportPicker();
        sportPicker.updateSports();
        
        // change the draftgroup filters to match the site and set the default dg
        var draftgroups = site.getAssociatedData().draftgroups;
        var dgFilter = this.getDraftgroupFilter();
        dgFilter.getStore().loadData(draftgroups, false);
        if (draftgroups.length > 0) {
            var dg = draftgroups[0];
            dgFilter.setValue(dg.dgid);
    
            this.onDraftgroupChanged(dg.dgId);
            statsStore.filters.add([
                {id:'probables', property: 'probables', value: this.getProbablesFilter().value},
                {id:'posId', property: 'posId', value: this.getPositionsFilterValue()},
                dgFilter
            ]);
    
            // only fire if valid draftgroup found
            this.fireEvent('appDraftgroupChanged', dg.dgid);
        }
    },
    
    onGamesChanged: function(store, records, wasSuccessful, options) {
        if (records === null) return;
        // Change the list of all games
        // All games on a new date will reset to checked
        var i, mlen, game, gameTime, alin, hlin, gameString;
        var gameCheckboxes = Ext.ComponentQuery.query('filterlist fieldcontainer#games checkbox');
        var len = gameCheckboxes.length;
        var isNewDate = len === 0;
        
        // If the draftgroup has not changed, keep track of already checked games
        // this is for MLB, where games are updated with info on lineup availability
        var checkedGames = {};
        if (len > 0) { // yyyy_mm_dd
            if (this.draftgroupIsChanging) {
                this.draftgroupIsChanging = false;
                isNewDate = true;
            } else {
                for (i = 0; i < len; i++) {
                    var item = gameCheckboxes[i];
                    if (item.getValue()) { //is checked
                        checkedGames[item.inputValue] = 1;
                    }
                }
                isNewDate = false;
            }
        }
        
        //Now, remove all existing games, and add em all back
        var gamesContainer = this.getGamesFilters();
        gamesContainer.removeAll(true);
        for (i=0, mlen=records.length; i < mlen; i++) {
            game = records[i];
            gameTime = Ext.Date.parse(game.get('gtime')+"Z","c");
            if (DFST.AppSettings.sport === 'nfl') {
                gameTime = Ext.Date.format(gameTime, 'g:i ') +
                    Ext.Date.format(gameTime, 'D').substring(0, 2);
            } else {
                gameTime = Ext.Date.format(gameTime, 'g:i');
            }
            alin = game.get('alin') ? '*' : '';
            hlin = game.get('hlin') ? '*' : '';
            gameString = this.getTeamCode(game.get('away')) + 
                alin + ' @ ' + this.getTeamCode(game.get('home')) +
                hlin + ' ' + gameTime;
            var gameId = game.get('gid');
            var isChecked = isNewDate ? true : checkedGames[gameId] === 1; // true on first load of games list
            gamesContainer.add(new Ext.form.field.Checkbox({
                        boxLabel: gameString.toUpperCase(),
                        name: 'game',
                        checked: isChecked,
                        inputValue: gameId
                    }));
        }
        if (records.length > 0) {
            gamesContainer.add(Ext.create('Ext.Button', {
                text: 'Apply Game Filters',
                id: 'gamesGo'
            }));
            // if a sport has no game logs, then hide that panel
            if (DFST.AppSettings[DFST.AppSettings.sport].showGameLog) {
                this.getDrilldowndetails().show();
            } else {
                this.getDrilldowndetails().hide();
            }
        } else {
            this.getGamedetails().hide();
            this.getDrilldowndetails().hide();
        }
        // if only 1 game then hide the gameFilters
        if (records.length < 2) {
            this.getGamePicker().hide();
        } else {
            this.getGamePicker().show();
        }
        
        // update the filters related to draftgroups
        // change the values for all value range filters
        var dgId = this.getDraftgroupFilter().getValue();
        var draftgroup = this.getDraftGroup(dgId);
        if (!draftgroup) return;
        var dgstats = draftgroup.stats;
        var salFilter = this.getSalRangeFilter();
        salFilter.setMinValue(dgstats.minsal);
        salFilter.setMaxValue(dgstats.maxsal);
        salFilter.increment = (dgstats.maxSal - dgstats.minsal) / 20;
        salFilter.setValue(0, dgstats.minsal);
        salFilter.setValue(1, dgstats.maxsal);

        var afpFilter = this.getAfpRangeFilter();
        afpFilter.setMinValue(dgstats.minfppg);
        afpFilter.setMaxValue(dgstats.maxfppg);
        afpFilter.increment = (dgstats.maxfppg - dgstats.minfppg) / 20;
        afpFilter.setValue(0, dgstats.minfppg);
        afpFilter.setValue(1, dgstats.maxfppg);

        var cppFilter = this.getCppRangeFilter();
        cppFilter.setMinValue(dgstats.mincpp);
        cppFilter.setMaxValue(dgstats.maxcpp);
        cppFilter.increment = (dgstats.maxcpp - dgstats.mincpp) / 20;
        cppFilter.setValue(0, dgstats.mincpp);
        cppFilter.setValue(1, dgstats.maxcpp);

        var afp5Filter = this.getAfp5RangeFilter();
        afp5Filter.setMinValue(dgstats.minfppg5);
        afp5Filter.setMaxValue(dgstats.maxfppg5);
        afp5Filter.increment = (dgstats.maxfppg5 - dgstats.minfppg5) / 20;
        afp5Filter.setValue(0, dgstats.minfppg5);
        afp5Filter.setValue(1, dgstats.maxfppg5);

        var cpp5Filter = this.getCpp5RangeFilter();
        cpp5Filter.setMinValue(dgstats.mincpp5);
        cpp5Filter.setMaxValue(dgstats.maxcpp5);
        cpp5Filter.increment = (dgstats.maxcpp5 - dgstats.mincpp5) / 20;
        cpp5Filter.setValue(0, dgstats.mincpp5);
        cpp5Filter.setValue(1, dgstats.maxcpp5);
    },
    
    getDraftGroup: function(draftgroupId) {
        var site = this.getSiteDetailsStore().first();
        return site.getAssociatedData().draftgroups.find(function(dg){if (dg.dgid === draftgroupId) return true;});
    },
    
    /* a team id is the 3 character identifier used by mlb;
    a team code is a more recognizeable 2-3 character identifier used at many sites */
    getTeamCode: function(teamId) {
        if (DFST.AppSettings.sport == "mlb") {
            switch (teamId.toUpperCase())
            {
                case "ANA":
                    return "laa";
                case "CHA":
                    return "cws";
                case "CHN":
                    return "chc";
                case "KCA":
                    return "kc";
                case "LAN":
                    return "lad";
                case "NYA":
                    return "nyy";
                case "NYN":
                    return "nym";
                case "SDN":
                    return "sd";
                case "SFN":
                    return "sf";
                case "TBA":
                    return "tb";
                case "WAS":
                    return "wsh";
                default:
                    return teamId.toLowerCase();
            }
        }
        return teamId.toLowerCase();
    },
    
    onLaunch: function() {
        var host = 'https://localhost:44302';
        if (window.location.hostname.indexOf('windows') >= 0) {
            host = 'https://draftaidapi.azurewebsites.net';  //live azure
        } else if (window.location.hostname.indexOf('draftaid.com') >= 0) {
            host = 'http://api.draftaid.com';  //live azure
        }
        this.host = host;
        
        // Set things up to update filters when we switch sites
        var siteDetailsStore = this.getSiteDetailsStore();
        siteDetailsStore.proxy.url = host + '/api/site/';
        siteDetailsStore.on('filterchange', this.onSiteChanged, this);
        siteDetailsStore.on('load', function(records, operation, success) {
            siteDetailsStore.filter([ //client side filtering on this store
                {id:'siteId', property: 'siteId', value: DFST.AppSettings.siteId}
            ]);
        });
        siteDetailsStore.load();
        
        // Set things up to update games filters when we switch sites
        var gamesStore = this.getGamesStore();
        gamesStore.getProxy().host = host;
        gamesStore.on('load', this.onGamesChanged, this);

        // allow stores to be loaded with all start up filters
        gamesStore.filters.endUpdate();
        
        // Set up a timer to update the games store periodically, so we can
        // show a visual indicator that the lineup is ready
        if (DFST.AppSettings.sport == "mlb")
        {
            var thisScope = this;
            setTimeout(function(){
                var task = {
                    run: function(){
                        var gamesStore = thisScope.getGamesStore();
                        gamesStore.load();
                    },
                    scope: thisScope,
                    interval: 1000 * 60 // every 60 seconds
                };
                Ext.TaskManager.start(task);        
            }, 5000);  // don't start this until the page has been up for 5 sec
        }
    }
    
});
