{"filter":false,"title":"Yesterday.js","tooltip":"/app/store/Yesterday.js","undoManager":{"mark":48,"position":48,"stack":[[{"start":{"row":0,"column":0},"end":{"row":34,"column":0},"action":"insert","lines":["/*global Ext: false */","/* ","","Copyright (c) 2012-2015 Maura Wilder","","*/","Ext.define('DFST.store.PlayerStats', {","    extend: 'Ext.data.Store',","","    requires: ['Ext.data.reader.Json'],","    ","    model: 'DFST.model.PlayerStatSet',","","    autoLoad: false,","    pageSize: 500,","    sorters: [{","        property : 'gd',","        direction: 'DESC'","    }],","    remoteSort: true,","    remoteFilter: true,","\tproxy: {","\t\ttype: 'rest',","        headers: {'Accept': 'application/json'},","\t\turl: 'app/data/playerstats.json', //local data, overridden in controller","\t\treader: {","            type: 'json',","            rootProperty: 'stats',","            totalProperty: 'total'            ","\t\t},","\t\tnoCache: false","\t}","});","",""],"id":1}],[{"start":{"row":6,"column":23},"end":{"row":6,"column":34},"action":"remove","lines":["PlayerStats"],"id":2},{"start":{"row":6,"column":23},"end":{"row":6,"column":24},"action":"insert","lines":["Y"]}],[{"start":{"row":6,"column":24},"end":{"row":6,"column":25},"action":"insert","lines":["e"],"id":3}],[{"start":{"row":6,"column":25},"end":{"row":6,"column":26},"action":"insert","lines":["s"],"id":4}],[{"start":{"row":6,"column":26},"end":{"row":6,"column":27},"action":"insert","lines":["t"],"id":5}],[{"start":{"row":6,"column":27},"end":{"row":6,"column":28},"action":"insert","lines":["e"],"id":6}],[{"start":{"row":6,"column":28},"end":{"row":6,"column":29},"action":"insert","lines":["r"],"id":7}],[{"start":{"row":6,"column":29},"end":{"row":6,"column":30},"action":"insert","lines":["d"],"id":8}],[{"start":{"row":6,"column":30},"end":{"row":6,"column":31},"action":"insert","lines":["a"],"id":9}],[{"start":{"row":6,"column":31},"end":{"row":6,"column":32},"action":"insert","lines":["t"],"id":10}],[{"start":{"row":3,"column":18},"end":{"row":3,"column":19},"action":"remove","lines":["-"],"id":11}],[{"start":{"row":3,"column":17},"end":{"row":3,"column":18},"action":"remove","lines":["2"],"id":12}],[{"start":{"row":3,"column":16},"end":{"row":3,"column":17},"action":"remove","lines":["1"],"id":13}],[{"start":{"row":3,"column":15},"end":{"row":3,"column":16},"action":"remove","lines":["0"],"id":14}],[{"start":{"row":3,"column":14},"end":{"row":3,"column":15},"action":"remove","lines":["2"],"id":15}],[{"start":{"row":6,"column":31},"end":{"row":6,"column":32},"action":"remove","lines":["t"],"id":16}],[{"start":{"row":6,"column":31},"end":{"row":6,"column":32},"action":"insert","lines":["y"],"id":17}],[{"start":{"row":14,"column":14},"end":{"row":14,"column":17},"action":"remove","lines":["500"],"id":18},{"start":{"row":14,"column":14},"end":{"row":14,"column":15},"action":"insert","lines":["1"]}],[{"start":{"row":14,"column":15},"end":{"row":14,"column":16},"action":"insert","lines":["0"],"id":19}],[{"start":{"row":14,"column":16},"end":{"row":14,"column":17},"action":"insert","lines":["0"],"id":20}],[{"start":{"row":14,"column":17},"end":{"row":14,"column":18},"action":"insert","lines":["0"],"id":21}],[{"start":{"row":19,"column":16},"end":{"row":19,"column":20},"action":"remove","lines":["true"],"id":22},{"start":{"row":19,"column":16},"end":{"row":19,"column":17},"action":"insert","lines":["f"]}],[{"start":{"row":19,"column":17},"end":{"row":19,"column":18},"action":"insert","lines":["a"],"id":23}],[{"start":{"row":19,"column":18},"end":{"row":19,"column":19},"action":"insert","lines":["l"],"id":24}],[{"start":{"row":19,"column":19},"end":{"row":19,"column":20},"action":"insert","lines":["s"],"id":25}],[{"start":{"row":19,"column":20},"end":{"row":19,"column":21},"action":"insert","lines":["e"],"id":26}],[{"start":{"row":20,"column":18},"end":{"row":20,"column":22},"action":"remove","lines":["true"],"id":27},{"start":{"row":20,"column":18},"end":{"row":20,"column":19},"action":"insert","lines":["f"]}],[{"start":{"row":20,"column":19},"end":{"row":20,"column":20},"action":"insert","lines":["a"],"id":28}],[{"start":{"row":20,"column":20},"end":{"row":20,"column":21},"action":"insert","lines":["l"],"id":29}],[{"start":{"row":20,"column":21},"end":{"row":20,"column":22},"action":"insert","lines":["s"],"id":30}],[{"start":{"row":20,"column":22},"end":{"row":20,"column":23},"action":"insert","lines":["e"],"id":31}],[{"start":{"row":11,"column":23},"end":{"row":11,"column":36},"action":"remove","lines":["PlayerStatSet"],"id":32},{"start":{"row":11,"column":23},"end":{"row":11,"column":24},"action":"insert","lines":["Y"]}],[{"start":{"row":11,"column":24},"end":{"row":11,"column":25},"action":"insert","lines":["e"],"id":33}],[{"start":{"row":11,"column":25},"end":{"row":11,"column":26},"action":"insert","lines":["s"],"id":34}],[{"start":{"row":11,"column":26},"end":{"row":11,"column":27},"action":"insert","lines":["t"],"id":35}],[{"start":{"row":11,"column":27},"end":{"row":11,"column":28},"action":"insert","lines":["e"],"id":36}],[{"start":{"row":11,"column":28},"end":{"row":11,"column":29},"action":"insert","lines":["r"],"id":37}],[{"start":{"row":11,"column":29},"end":{"row":11,"column":30},"action":"insert","lines":["d"],"id":38}],[{"start":{"row":11,"column":30},"end":{"row":11,"column":31},"action":"insert","lines":["a"],"id":39}],[{"start":{"row":11,"column":31},"end":{"row":11,"column":32},"action":"insert","lines":["y"],"id":40}],[{"start":{"row":24,"column":17},"end":{"row":24,"column":28},"action":"remove","lines":["playerstats"],"id":41},{"start":{"row":24,"column":17},"end":{"row":24,"column":18},"action":"insert","lines":["y"]}],[{"start":{"row":24,"column":18},"end":{"row":24,"column":19},"action":"insert","lines":["e"],"id":42}],[{"start":{"row":24,"column":19},"end":{"row":24,"column":20},"action":"insert","lines":["s"],"id":43}],[{"start":{"row":24,"column":20},"end":{"row":24,"column":21},"action":"insert","lines":["t"],"id":44}],[{"start":{"row":24,"column":21},"end":{"row":24,"column":22},"action":"insert","lines":["e"],"id":45}],[{"start":{"row":24,"column":22},"end":{"row":24,"column":23},"action":"insert","lines":["r"],"id":46}],[{"start":{"row":24,"column":23},"end":{"row":24,"column":24},"action":"insert","lines":["d"],"id":47}],[{"start":{"row":24,"column":24},"end":{"row":24,"column":25},"action":"insert","lines":["a"],"id":48}],[{"start":{"row":24,"column":25},"end":{"row":24,"column":26},"action":"insert","lines":["y"],"id":49}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":24,"column":26},"end":{"row":24,"column":26},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1434713133431,"hash":"62645eeac09dc5293bb5f3320920df37bbba2ea6"}