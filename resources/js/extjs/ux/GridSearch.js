/*global Ext: false*/
Ext.define('Ext.ux.GridSearch', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.gridsearch',
    uses: [
        'Ext.container.Container',
        'Ext.layout.container.HBox',
        'Ext.grid.Panel',
        'Ext.data.*',
        'Ext.button.Button',
        'Ext.menu.*',
        'Ext.form.field.Trigger'
    ],
    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {String} searchText Text to display in label
     */
    searchText: 'Search',

    /**
     * @cfg {String} searchTipText Text to display as input tooltip. Set to '' for no tooltip
     */ 
    searchTipText: 'Type to search and press Enter',

    /**
     * @cfg {String} searchFields Array of fields to search in
     */
    searchFields: [],
    
    /**
     * @cfg {String} position Where to display the search controls. Valid values are top and bottom
     * Corresponding toolbar has to exist at least with mimimum configuration tbar:[] for position:top or bbar:[]
     * for position bottom. Plugin does NOT create any toolbar.(defaults to "bottom")
     */
    position: 'bottom',

    /**
     * @cfg {Number} minChars Minimum characters to type before the request is made. If undefined (the default)
     * the trigger field shows magnifier icon and you need to click it or press enter for search to start. If it
     * is defined and greater than 0 then maginfier is not shown and search starts after minChars are typed.
     * (defaults to undefined)
     */

    /**
     * @cfg {String} minCharsTipText Tooltip to display if minChars is > 1
     */
    minCharsTipText: 'Type at least {0} characters',

    /**
     * @cfg {String} mode Use 'remote' for remote stores or 'local' for local stores. If mode is local
     * no data requests are sent to server the grid's store is filtered instead (defaults to "remote")
     */
    mode: 'remote',

    /**
     * @cfg {Number} width Width of input field in pixels (defaults to 100)
     */
    width: 100,

    /**
     * @cfg {String} xtype xtype is usually not used to instantiate this plugin but you have a chance to identify it
     */

    /**
     * @cfg {Object} paramNames Params name map (defaults to {fields:"fields", query:"query"}
     */
    paramNames: {
        fields:'fields',
        query:'query'
    },

    /**
     * @cfg {String} shortcutKey Key to focus the input field (defaults to r = Sea_r_ch). Empty string disables shortcut
     */
    shortcutKey: 'r',

    /**
     * @cfg {String} shortcutModifier Modifier for shortcutKey. Valid values: alt, ctrl, shift (defaults to "alt")
     */
    shortcutModifier: 'alt',

    /**
     * @cfg {Boolean} resetPage Resets the page and start properties to load 
     * page 1 if true (defaults to true)
     */
    resetPage: true,
    
    /**
     * @cfg {String} align "left" or "right" (defaults to "left")
     */

    /**
     * @cfg {Number} minLength Force user to type this many character before he can make a search 
     * (defaults to undefined)
     */

    /**
     * @cfg {Ext.Panel/String} toolbarContainer Panel (or id of the panel) which contains toolbar we want to render
     * search controls to (defaults to this.grid, the grid this plugin is plugged-in into)
     */

    constructor: function() {
        var me = this;
        
        me.callParent(arguments);
        me.mixins.observable.constructor.apply(this,arguments);
    },

    /**
     * @private
     * @param {Ext.grid.GridPanel/Ext.grid.EditorGrid} grid reference to grid this plugin is used for
     */
    init: function(grid) {
        this.grid = grid;

        // setup toolbar container if id was given
        if('string' === typeof this.toolbarContainer) {
            this.toolbarContainer = Ext.getCmp(this.toolbarContainer);
        }

        // do our processing after grid render and reconfigure
        grid.onRender = Ext.Function.createSequence(grid.onRender, this.onRender, this);
    },

    /**
     * adds plugin controls to <b>existing</b> toolbar
     * @private
     */
    onRender:function() {
        var panel = this.toolbarContainer || this.grid,
            tb, i;

        //finds the right toolbar (top/bottom)
        var docked = panel.getDockedItems();
        for (i = 0; i < docked.length; i++) {
            if (docked[i].dock == this.position && docked[i].componentCls == 'x-toolbar') {
                tb = docked[i];
                /*break;*/
            }
        }
        
        //if the toolbar isn't found, create one in the specified
        //position in the docked items
        if (!tb) {
            tb = Ext.create('Ext.toolbar.Toolbar',{ dock: this.position });
            this.grid.addDocked(tb);
        }

        this.menu = new Ext.menu.Menu();

        // handle position
        if('right' === this.align) { tb.add('->'); }
        else {
            if(0 < tb.items.getCount()) {
                if (tb.displayInfo) for (i = 0; i < tb.items.getCount(); i++) {
                    if (tb.items.items[i] == tb.displayItem) {
                        tb.displayItem = tb.remove(tb.items.items[i],false);
                        tb.remove(tb.items.items[i-1]);
                        break;
                    }
                }
                tb.add('-');
            }
        }

        // add label
        tb.add({
            xtype: 'tbtext',
            text: this.searchText
        });

        // add input field (TwinTriggerField in fact)
        this.field = Ext.create('Ext.form.field.Trigger',{
            width: this.width,
            selectOnFocus: (undefined === this.selectOnFocus) ? true : this.selectOnFocus,
            trigger1Cls: 'x-form-clear-trigger',
            trigger2Cls: (this.minChars) ? 'x-hide-display' : 'x-form-search-trigger',
            onTrigger1Click: this.createDelegate(this.onTriggerClear, this),
            onTrigger2Click: this.minChars ? Ext.emptyFn : this.createDelegate(this.onTriggerSearch, this),
            minLength: this.minLength
        });
        
        // install event handlers on input field
        this.field.on('render', function() {
            // register quick tip on the way to search
            if((undefined === this.minChars || 1 < this.minChars) && this.minCharsTipText) {
                Ext.QuickTips.register({
                    target: this.field.el,
                    text: this.minChars ? String.format(this.minCharsTipText, this.minChars) : this.searchTipText
                });
            }

            if(this.minChars) {
                this.field.el.on({scope:this, buffer:300, keyup:this.onKeyUp});
            }

            // install key map
            var map = new Ext.util.KeyMap(this.field.el, [{
                key: Ext.event.Event.ENTER,
                scope: this,
                fn: this.onTriggerSearch
            },{
                key: Ext.event.Event.ESC,
                scope: this,
                fn: this.onTriggerClear
            }]);
            map.stopEvent = true;
        }, this, {single:true});

        tb.add(this.field);

        // re-layout the panel if the toolbar is outside
        if(panel !== this.grid) {
            this.toolbarContainer.doLayout();
        }

        // keyMap
        if(this.shortcutKey && this.shortcutModifier) {
                var shortcutEl = this.grid.getEl();
                var shortcutCfg = [{
                    key:this.shortcutKey,
                    scope:this,
                    stopEvent:true,
                    fn:function() { this.field.focus(); }
                }];
                shortcutCfg[0][this.shortcutModifier] = true;
                this.keymap = new Ext.util.KeyMap(shortcutEl, shortcutCfg);
        }

        if (tb.displayInfo) {
            tb.add('->',tb.displayItem);
        }
    },
            
    /**
     * field el keypup event handler. Triggers the search
     * @private
     */
    onKeyUp:function(e, t, o) {

        // ignore special keys 
        if(e.isNavKeyPress()) { return; }

        var length = this.field.getValue().toString().length;
        if(0 === length || this.minChars <= length) {
            this.onTriggerSearch();
        }
    }, // eo function onKeyUp

    /**
     * Clear Trigger click handler
     * @private 
     */
    onTriggerClear: function() {
        if(this.field.getValue()) {
            this.field.setValue('');
            this.field.focus();
            this.onTriggerSearch();
        }
    },
    
    onTriggerSearch: function() {
        if(!this.field.isValid()) {
            return;
        }
        this.grid.fireEvent('search', this.field.getValue()); 
    },
    
    /**
     * @param {Boolean} true to disable search (TwinTriggerField), false to enable
     */
    setDisabled:function() {
        this.field.setDisabled.apply(this.field, arguments);
    }, // eo function setDisabled

    /**
     * Enable search (TwinTriggerField)
     */
    enable:function() {
        this.setDisabled(false);
    }, // eo function enable

    /**
     * Disable search (TwinTriggerField)
     */
    disable:function() {
        this.setDisabled(true);
    }, // eo function disable

    /**
     * Creates a function delegate, copied from ExtJS 3.4
     * @private
     */
    createDelegate : function(method, obj, args, appendArgs){
        //var method = this;
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true){
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }else if (Ext.isNumber(appendArgs)){
                callArgs = Array.prototype.slice.call(arguments, 0); // copy arguments first
                var applyArgs = [appendArgs, 0].concat(args); // create method call params
                Array.prototype.splice.apply(callArgs, applyArgs); // splice them in
            }
            return method.apply(obj || window, callArgs);
        }
    }

});