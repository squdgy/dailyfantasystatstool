/*global Ext: false, DFST: false*/
Ext.define('DFST.controller.Filters', {
    extend: 'Ext.app.Controller',

    stores: ['Stats', 'PlayerStats', 'SiteDetails', 'Games'],
    models: ['StatSet'],
    views: ['filter.List', 'site.Picker'],
    
    refs: [
        {ref: 'dateFilter', selector: 'sitepicker datefield'},
        {ref: 'weekFilter', selector: 'sitepicker combobox'},
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
        {ref: 'sitePanel', selector: 'sitepicker'}
    ],
    
    // At this point things haven't rendered yet since init gets called on controllers before the launch function
    // is executed on the Application
    init: function() {
        
        //local variables
        this.gameDateIsChanging = false;
        
        this.control({
            'sitepicker datefield':{
                change: this.changeDate
            },
            'sitepicker combobox':{
                change: this.changeWeek
            },
            'sitepicker fieldcontainer radio':{
                change: this.changeScoring
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
        
        // set up load masking
        var me = this;
        this.getSiteDetailsStore().on('beforeload', function(){
            me.getViewport().setLoading('Retrieving player salaries...');
        });
        this.getSiteDetailsStore().proxy.on('exception', function(proxy, response){
            if (response.status === 200) {
                var firstSiteRadio = Ext.ComponentQuery.query('sitepicker fieldcontainer radio')[0];
                firstSiteRadio.setValue(true);
                return;
            }
            me.getViewport().setLoading(false);
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

    changeDate: function(datefield, newValue, oldValue, options) {
        this.gameDateIsChanging = oldValue !== undefined;

        var statsStore = this.getStatsStore();
        var filters = [{id:'gameDate', property: 'gameDate', value: newValue.toJSON()}];
        if (this.gameDateIsChanging) {
            this.fireEvent('appDateChanged', newValue);
            
            statsStore.filters.removeAtKey('gameId'); // clear all game filters
            statsStore.filter([{id: 'gameDate', property: 'gameDate', value: newValue.toJSON()}]);
            var gamesStore = this.getGamesStore();
            filters.push({id: 'sport', property: 'sport', value: DFST.AppSettings.sport});
            gamesStore.filter(filters);
        } else {
            statsStore.filter(filters);
        }
    },

    changeWeek: function(combobox, newValue, oldValue, options) {
        this.gameDateIsChanging = oldValue !== undefined;
        var statsStore = this.getStatsStore();
        var weekRecord = combobox.findRecordByValue(newValue);
        var gameDateStart = weekRecord.get('startdate');
        var gameDateEnd = weekRecord.get('enddate');
        var gamesStore = this.getGamesStore();
        
        if (this.gameDateIsChanging) {
            statsStore.filters.removeAtKey('gameId'); // clear all game filters
            statsStore.filter([
                {id:'gameDate', property: 'gameDate', value: gameDateStart.toJSON()},
                {id:'gameDateLast', property: 'gameDateLast', value: gameDateEnd.toJSON()}
            ]);
            gamesStore.filter([
                {id:'gameDate', property: 'gameDate', value: gameDateStart.toJSON()},
                {id:'gameDateLast', property: 'gameDateLast', value: gameDateEnd.toJSON()},
                {id: 'sport', property: 'sport', value: DFST.AppSettings.sport}
            ]);
        } else {
            if (gamesStore.getTotalCount() === 0) {
                gamesStore.filter([
                    {id:'gameDate', property: 'gameDate', value: gameDateStart.toJSON()},
                    {id:'gameDateLast', property: 'gameDateLast', value: gameDateEnd.toJSON()},
                    {id: 'sport', property: 'sport', value: DFST.AppSettings.sport}
                ]);
            }
            statsStore.filter([
                {id:'gameDate', property: 'gameDate', value: gameDateStart.toJSON()},
                {id:'gameDateLast', property: 'gameDateLast', value: gameDateEnd.toJSON()}
            ]);
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
    
    changeScoring: function(radiobutton, newValue, oldValue, options) {
        if (newValue) {
            var siteDetailsStore = this.getSiteDetailsStore();
            var dfsGameId = 2;//default fd game
            var siteId = radiobutton.inputValue;
            if (siteId == 1) dfsGameId = 1; //dk
            if (siteId == 3) dfsGameId = 3; //ds
            if (siteId == 4) dfsGameId = 4; //dd
            if (siteId == 5) dfsGameId = 5; //ff
            Ext.state.Manager.set('site', dfsGameId);
            if (DFST.AppSettings.sport == "mlb") dfsGameId += 100;
            if (DFST.AppSettings.sport == "nfl") dfsGameId += 200;
            if (DFST.AppSettings.sport == "nhl") dfsGameId += 300;
            siteDetailsStore.filter([
                {id:'siteId', property: 'siteId', value: radiobutton.inputValue},
                {id:'dfsGameId', property: 'dfsGameId', value: dfsGameId}
                ]);
            siteDetailsStore.load();
            
            this.getSitePanel().setTitle('Pick a Site - ' + radiobutton.boxLabel);
        }
    },

    onScoringChanged: function(store, records, wasSuccessful, options) {
        if (!wasSuccessful || records.length === 0) {
            this.getStatsStore().removeAll();
            this.getGamedetails().hide();
            this.getDrilldowndetails().hide();            
            return;
        }
        var site = records[0];
        
        // Change the list of position filters
        // All positions will reset to checked
        var posContainer = this.getPositionFilters();
        posContainer.removeAll(true);
        var positions = site.getAssociatedData().positions;
        for (var i=0, mlen=positions.length; i < mlen; i++) {
            var pos = positions[i];
            posContainer.add(new Ext.form.field.Checkbox({
                        boxLabel: pos.name,
                        name: 'pos',
                        checked: true,
                        inputValue: pos.id
                    }));
        }
        
        // change the values for all value range filters
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

        var cpp5Filter = this.getCpp5RangeFilter();
        cpp5Filter.setMinValue(site.get('cppmin'));
        cpp5Filter.setMaxValue(site.get('cppmax'));
        cpp5Filter.increment = site.get('cppstep');
        cpp5Filter.setValue(0, site.get('cppmin'));
        cpp5Filter.setValue(1, site.get('cppmax'));

        var afpFilter = this.getAfpRangeFilter();
        afpFilter.setMinValue(site.get('afpmin'));
        afpFilter.setMaxValue(site.get('afpmax'));
        afpFilter.increment = site.get('afpstep');
        afpFilter.setValue(0, site.get('afpmin'));
        afpFilter.setValue(1, site.get('afpmax'));

        var afp5Filter = this.getAfp5RangeFilter();
        afp5Filter.setMinValue(site.get('afpmin'));
        afp5Filter.setMaxValue(site.get('afpmax'));
        afp5Filter.increment = site.get('afpstep');
        afp5Filter.setValue(0, site.get('afpmin'));
        afp5Filter.setValue(1, site.get('afpmax'));
        
/*        
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
        
        // reset the filters for batting order
        var notinlineupFilter = this.getNotInLineupFilter();
        notinlineupFilter.suspendEvents(false);
        notinlineupFilter.setValue(false);
        notinlineupFilter.resumeEvents();
        var bOrderCheckboxes = Ext.ComponentQuery.query('filterlist fieldcontainer#battingorderFilter checkbox');
        for (i=0; i<bOrderCheckboxes.length; i++) {
            var cb = bOrderCheckboxes[i];
            cb.suspendEvents(false);
            cb.setValue(true);
            cb.resumeEvents();
        }        
*/
        // reset player store filters
        var statsStore = this.getStatsStore();
        statsStore.filters.removeAtKey('pos');
        statsStore.filters.removeAtKey('afp');
        statsStore.filters.removeAtKey('cpp');
        statsStore.filters.removeAtKey('sal');
                
        statsStore.filters.addAll([
            {id:'scoring', property: 'scoring', value: site.get('dfsGameId')},
            {id:'probables', property: 'probables', value: this.getProbablesFilter().value},
            {id:'posId', property: 'posId', value: this.getPositionsFilterValue()}
        ]);

        // call the changedate methods which will also refresh the player store
        var dateFilter = this.getDateFilter();
        if (dateFilter) {
            this.changeDate(dateFilter, dateFilter.value);
        } else {
            var weekFilter = this.getWeekFilter();
            this.changeWeek(weekFilter, weekFilter.value);
        }
        this.fireEvent('appScoringChanged', site.get('dfsGameId'));
    },
    
    onGamesChanged: function(store, records, wasSuccessful, options) {
        if (records === null) return;
        // Change the list of all games
        // All games on a new date will reset to checked
        var i, mlen, game, gameTime, alin, hlin, gameString;
        var gameCheckboxes = Ext.ComponentQuery.query('filterlist fieldcontainer#games checkbox');
        var len = gameCheckboxes.length;
        var isNewDate = len === 0;
        
        // If the game date has not changed, keep track of already checked games
        var checkedGames = {};
        if (len > 0) { // yyyy_mm_dd
            if (this.gameDateIsChanging) {
                this.gameDateIsChanging = false;
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
            gameTime = game.get('gtime');
            gameTime = new Date(gameTime); 
            // this time is actually utc, but new Date treats
            // it like local time, so add the timeoffset : 
            var tzo = gameTime.getTimezoneOffset();
            gameTime = Ext.Date.add(gameTime, Ext.Date.MINUTE, tzo);
            if (DFST.AppSettings.sport === "nfl") {
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
        } else {
            this.getGameDetails().hide();
            this.getDrilldowndetails().hide();
        }
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
        var host = 'http://localhost:49533';
        if (location.hostname.indexOf('azurewebsites') > 0) {
            host = 'http://dfstapi.cloudapp.net';  //live azure
        }
        this.host = host;
        
        var defaultGameId = DFST.AppSettings.siteId;
        if (DFST.AppSettings.sport == "mlb") 
            defaultGameId += 100;
        else if (DFST.AppSettings.sport == "nfl")
            defaultGameId += 200;
        else if (DFST.AppSettings.sport == "nhl")
            defaultGameId += 300;
        // Set things up to update filters when we switch sites
        var siteDetailsStore = this.getSiteDetailsStore();
        siteDetailsStore.proxy.url = host + '/api/site/';
        siteDetailsStore.filter([
            {id:'siteId', property: 'siteId', value: DFST.AppSettings.siteId},
            {id:'dfsGameId', property: 'dfsGameId', value: defaultGameId}
            ]);
        siteDetailsStore.on('load', this.onScoringChanged, this);
        siteDetailsStore.load();
        
        // Set things up to update games filters when we switch sites
        var gamesStore = this.getGamesStore();
        gamesStore.proxy.url = host + '/api/games/';
        gamesStore.on('load', this.onGamesChanged, this);
        if (DFST.AppSettings.sport === "nfl") {
            var weekFilter = this.getWeekFilter();
            this.changeWeek(weekFilter, weekFilter.value);
        } else {
            var filters = [{id:'gameDate', property: 'gameDate', value: (new Date()).toJSON()},
                               {id: 'sport', property: 'sport', value: DFST.AppSettings.sport}];
            gamesStore.filter(filters);
        }
        this.fireEvent('appDateChanged', new Date());
        
        // Set up a timer to update the games store periodically, so we can
        // show a visual indicator that the lineup is ready
        if (DFST.AppSettings.sport == "mlb")
        {
            var task = {
                run: function(){
                    var gamesStore = this.getGamesStore();
                    gamesStore.load();
                },
                scope: this,
                interval: 1000 * 60 // every 60 seconds
            };
            Ext.TaskManager.start(task);        
        }
    }
    
});
