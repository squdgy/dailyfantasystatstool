# README for dailyfantasystatstool
This is an interactive tool to help when picking players to use for daily 
fantasy sports lineups on web sites such as DraftKings, FanDuel, Yahoo, 
DraftDay etc. It includes a lot of data for individual players, and games, 
including latest betting lines, weather, park factors, starting lineups, 
injury info, batter vs. pitcher handedness splits, and last 5 games dfs stats.
It has up to date pricing and scoring rules for each dfs site, and so has data
such as fppg over the last 5 games and complete player game logs.

Currently, it supports 
* DraftKings: NFL/MLB/NBA/NHL/NAS/WNBA/GOLF
* FanDuel NFL/MLB/NBA/NHL/WNBA/GOLF
* FantasyDraft NFL/MLB/NBA/NHL/GOLF
* Yahoo NFL/MLB/NBA/NHL

It is primarily a javaScript app, using Sencha Ext JS 5.x 
and their MVC framework. This application is dependent on a backend web service,
 which is coded and hosted elsewhere, so although the UI might be interesting 
for anyone out there, the code needs these services to work. There is a 
server.js file included, so this application can run on node, but node is not 
required.

The app is currently active at http://draftaidapp.azurewebsites.net/. 
