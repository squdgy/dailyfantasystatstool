# README for dailyfantasystatstool
This is an interactive tool to help with picking players to use for daily fantasy sports lineups on web sites
such as FanDuel, DraftStreet, DailyJoust etc. 

Currently, it supports FanDuel, DraftKings, and BuzzDraft.

It is primarily a JavaScript application, using Sencha Ext JS 4.x and their MVC framework.
This application is dependent on a backend web service, which is coded and hosted elsewhere, so although the UI might be interesting for anyone out there, the code needs these services to work.
There is a server.js file included, so this application can run on node, but node is not required.

The application is currently deployed to Azure at http://draftaidapp.azurewebsites.net/.
