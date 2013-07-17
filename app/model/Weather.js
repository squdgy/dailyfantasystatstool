/* Describes time frame hour of weather for one game */
Ext.define('DFST.model.Weather', {
    extend: 'Ext.data.Model',
    
    fields: [ 
/*        
        { name: 'gid', type: 'string', defaultValue: '' },  //game id
*/        
        { name: 'time', type: 'string', defaultValue: '' },
        { name: 'humidity', type: 'float', defaultValue: 0.0 },
        { name: 'precipIntensity', type: 'float', defaultValue: 0.0 },
        { name: 'precipProbability', type: 'float', defaultValue: 0.0 },
        { name: 'precipType', type: 'string', defaultValue: '' },
        { name: 'pressure', type: 'float', defaultValue: 0.0 },
        
        { name: 'summary', type: 'string', defaultValue: '' },   //summary
        { name: 'temperature', type: 'float', defaultValue: 0.0 },
        { name: 'windBearing', type: 'float', defaultValue: 0.0 },
        { name: 'windSpeed', type: 'float', defaultValue: 0.0 }
    ]
});
