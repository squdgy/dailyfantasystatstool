/*global Ext: false, DFST: false*/
Ext.define('DFST.controller.Filters', {
    extend: 'Ext.app.Controller',

    stores: ['Stats', 'PlayerStats', 'SiteDetails', 'Games'],
    models: ['StatSet'],
    views: ['filter.List'],
    
    refs: [
        {ref: 'dateFilter', selector: 'filterlist datefield'},
        {ref: 'weekFilter', selector: 'filterlist combobox'},
        {ref: 'probablesFilter', selector: 'filterlist checkbox#probables'},
        {ref: 'injuredFilter', selector: 'filterlist checkbox#injured'},
        {ref: 'positionFilters', selector: 'filterlist fieldcontainer#positions'},
        {ref: 'salRangeFilter', selector: 'filterlist multislider#salRange'},
        {ref: 'cppRangeFilter', selector: 'filterlist multislider#cppRange'},
        {ref: 'afpRangeFilter', selector: 'filterlist multislider#afpRange'},
        {ref: 'ngRangeFilter', selector: 'filterlist multislider#ngRange'},
        {ref: 'notInLineupFilter', selector: 'filterlist checkbox#notinlineup'},
        {ref: 'gamesFilters', selector: 'filterlist fieldcontainer#games'},
        {ref: 'drilldowndetails',  selector: 'drilldowndetails'},
        {ref: 'weatherdisplay', selector: 'weatherdisplay'}
    ],
    
    // At this point things haven't rendered yet since init gets called on controllers before the launch function
    // is executed on the Application
    init: function() {
        
        //local variables
        this.gameDateIsChanging = false;
        
        this.control({
            'filterlist datefield':{
                change: this.changeDate
            },
            'filterlist combobox':{
                change: this.changeWeek
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
            'filterlist fieldcontainer radio':{
                change: this.changeScoring
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
            }*/          
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
        this.gameDateIsChanging = true;
        var statsStore = this.getStatsStore();
        statsStore.filters.removeAtKey('gameId'); // clear all game filters
        statsStore.filter([{id: 'gameDate', property: 'gameDate', value: newValue.toJSON()}]);
        var gamesStore = this.getGamesStore();
        gamesStore.filter([{id:'gameDate', property: 'gameDate', value: newValue.toJSON()},
                           {id: 'sport', property: 'sport', value: DFST.AppSettings.sport}]);
    },

    changeWeek: function(combobox, newValue, oldValue, options) {
        this.gameDateIsChanging = true;
        var statsStore = this.getStatsStore();
        statsStore.filters.removeAtKey('gameId'); // clear all game filters
        var weekRecord = combobox.findRecordByValue(newValue);
        var gameDateStart = weekRecord.get('startdate');
        var gameDateEnd = weekRecord.get('enddate');
        statsStore.filter([{id: 'gameDate', property: 'gameDate', value: gameDateStart.toJSON()}]);
        var gamesStore = this.getGamesStore();
        gamesStore.filter([
            {id:'gameDate', property: 'gameDate', value: gameDateStart.toJSON()},
            {id:'gameDateLast', property: 'gameDateLast', value: gameDateEnd.toJSON()},
            {id: 'sport', property: 'sport', value: DFST.AppSettings.sport}
        ]);
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
        /* Return the value that will be sent to the server as the position
        filter value, filter id = posId*/
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
            var dfsGameId = 2;//default fd game
            //TODO: siteDetails store should only need to filter by gameId
            var siteId = radiobutton.inputValue;
            if (siteId == 1) dfsGameId = 1; //dk
            if (siteId == 4) dfsGameId = 4; //dd
            if (DFST.AppSettings.sport == "mlb") dfsGameId += 100;
            if (DFST.AppSettings.sport == "nfl") dfsGameId += 200;
            siteDetailsStore.filter([
                {id:'siteId', property: 'siteId', value: radiobutton.inputValue},
                {id:'dfsGameId', property: 'dfsGameId', value: dfsGameId}
                ]);
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

        var afpFilter = this.getAfpRangeFilter();
        afpFilter.setMinValue(site.get('afpmin'));
        afpFilter.setMaxValue(site.get('afpmax'));
        afpFilter.increment = site.get('afpstep');
        afpFilter.setValue(0, site.get('afpmin'));
        afpFilter.setValue(1, site.get('afpmax'));
        
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
            gameTime = Ext.Date.format(gameTime, 'g:i a');
            alin = game.get('alin') ? '*' : '';
            hlin = game.get('hlin') ? '*' : '';
            gameString = this.getTeamCode(game.get('away')) + 
                alin + ' @' + this.getTeamCode(game.get('home')) + 
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
            this.getWeatherdisplay().hide();
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
        
        var defaultGameId = 2;
        if (DFST.AppSettings.sport == "mlb") 
            defaultGameId = 102;
        else if (DFST.AppSettings.sport == "nfl")
            defaultGameId = 202;
        // Set things up to update filters when we switch sites
        var siteDetailsStore = this.getSiteDetailsStore();
        siteDetailsStore.proxy.url = host + '/api/site/';
        siteDetailsStore.filter([
            {id:'siteId', property: 'siteId', value: '2'},
            {id:'dfsGameId', property: 'dfsGameId', value: defaultGameId}
            ]);
        siteDetailsStore.on('load', this.onScoringChanged, this);
        siteDetailsStore.load();
        
        // Set things up to update games filters when we switch sites
        var gamesStore = this.getGamesStore();
        gamesStore.proxy.url = host + '/api/games/';
        gamesStore.on('load', this.onGamesChanged, this);
        gamesStore.filter([{id:'gameDate', property: 'gameDate', value: (new Date()).toJSON()},
                           {id: 'sport', property: 'sport', value: DFST.AppSettings.sport}]);
        
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
