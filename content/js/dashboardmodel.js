var defaultWidgetModel = [
    '{"selectedDataKey":"Shopper Stop","segmentModel":{"chartType":"line","selection":[{"groupType":"selection","groups":[],"logic":"+","groupBy":"value","selectedProp":"price","isComplex":false},{"groupType":"selection","groups":[{"groupType":"selection","groups":[],"logic":"+","selectedProp":"price","isComplex":false},{"groupType":"selection","groups":[],"logic":"+","selectedProp":"tax","isComplex":false},{"groupType":"selection","groups":[],"logic":"+","selectedProp":"shippingPrice","isComplex":false}],"logic":"+","aliasName":"pr+tax+shp","groupBy":"value","selectedProp":"pr+tax+shp","isComplex":true}],"dataGroup":{"xAxisProp":"timestamp","hasGrouping":false,"hasDivideBy":false,"xAxisType":"time"},"group":[{"groupType":"condition","groups":[],"logic":"and","selection":{"groupType":"selection","groups":[],"logic":"+","selectedProp":"sex","isComplex":false},"isComplex":false,"operation":"=","value":"male"}],"properties":["price","geography","timestamp","sex","color","tax","shippingPrice"]},"sizex":"1"}',
    '{"selectedDataKey":"Shopper Stop","segmentModel":{"chartType":"bar","selection":[{"groupType":"selection","groups":[],"logic":"+","groupBy":"sum","selectedProp":"price","isComplex":false}],"dataGroup":{"groupByProp":"geography","divideByProp":"color","hasGrouping":true,"hasDivideBy":true,"xAxisType":"time"},"group":[{"groupType":"condition","groups":[],"logic":"and","selection":{"groupType":"selection","groups":[],"logic":"+","selectedProp":"price","isComplex":false},"isComplex":false,"operation":">","value":"200"},{"groupType":"condition","groups":[],"logic":"or","selection":{"groupType":"selection","groups":[],"logic":"+","selectedProp":"sex","isComplex":false},"isComplex":false,"operation":"=","value":"male"},{"groupType":"condition","groups":[{"groupType":"condition","groups":[],"logic":"and","selection":{"groupType":"selection","groups":[],"logic":"+","selectedProp":"tax","isComplex":false},"isComplex":false,"operation":">","value":"10"},{"groupType":"condition","groups":[],"logic":"or","selection":{"groupType":"selection","groups":[],"logic":"+","selectedProp":"geography","isComplex":false},"isComplex":false,"operation":"=","value":"texas"}],"logic":"and","selection":{"groupType":"selection","groups":[],"logic":"+","isComplex":false},"isComplex":true,"operation":">"}],"properties":["price","geography","timestamp","sex","color","tax","shippingPrice"]},"sizex":"2"}',
    '{"selectedDataKey":"Shopper Stop","segmentModel":{"chartType":"pie","selection":[{"groupType":"selection","groups":[],"logic":"+","groupBy":"sum","selectedProp":"tax","isComplex":false},{"groupType":"selection","groups":[],"logic":"+","groupBy":"count","selectedProp":"sex","isComplex":false},{"groupType":"selection","groups":[],"logic":"+","groupBy":"avg","selectedProp":"shippingPrice","isComplex":false}],"dataGroup":{"groupByProp":"geography","hasGrouping":true,"hasDivideBy":false},"group":[],"properties":["price","geography","timestamp","sex","color","tax","shippingPrice"]},"sizex":"1"}',
    '{"selectedDataKey":"Shopper Stop","segmentModel":{"chartType":"scatter","selection":[{"groupType":"selection","groups":[],"logic":"+","groupBy":"value","selectedProp":"price","isComplex":false}],"dataGroup":{"xAxisProp":"timestamp","groupByProp":"geography","hasGrouping":true,"hasDivideBy":false,"xAxisType":"time"},"group":[{"groupType":"condition","groups":[],"logic":"and","selection":{"groupType":"selection","groups":[],"logic":"+","selectedProp":"price","isComplex":false},"isComplex":false,"operation":">","value":"200"},{"groupType":"condition","groups":[],"logic":"and","selection":{"groupType":"selection","groups":[],"logic":"+","selectedProp":"color","isComplex":false},"isComplex":false,"operation":"!=","value":"violet"},{"groupType":"condition","groups":[{"groupType":"condition","groups":[],"logic":"and","selection":{"groupType":"selection","groups":[],"logic":"+","selectedProp":"shippingPrice","isComplex":false},"isComplex":false,"operation":">","value":"20"},{"groupType":"condition","groups":[],"logic":"and","selection":{"groupType":"selection","groups":[],"logic":"+","selectedProp":"tax","isComplex":false},"isComplex":false,"operation":"exists"}],"logic":"and","selection":{"groupType":"selection","groups":[],"logic":"+","isComplex":false},"isComplex":true,"operation":">"}],"properties":["price","geography","timestamp","sex","color","tax","shippingPrice"]},"sizex":"2"}',
    '{"selectedDataKey":"Shopper Stop","segmentModel":{"chartType":"area","selection":[{"groupType":"selection","groups":[{"groupType":"selection","groups":[],"logic":"+","selectedProp":"price","isComplex":false},{"groupType":"selection","groups":[],"logic":"+","selectedProp":"tax","isComplex":false},{"groupType":"selection","groups":[],"logic":"+","selectedProp":"shippingPrice","isComplex":false},{"groupType":"selection","groups":[],"logic":"*","selectedProp":"4","isComplex":false}],"logic":"+","aliasName":"price_tax_shipping2","groupBy":"value","selectedProp":"price_tax_shipping2","isComplex":true},{"groupType":"selection","groups":[{"groupType":"selection","groups":[],"logic":"+","selectedProp":"price","isComplex":false},{"groupType":"selection","groups":[],"logic":"+","selectedProp":"tax","isComplex":false},{"groupType":"selection","groups":[],"logic":"*","selectedProp":"2","isComplex":false}],"logic":"+","aliasName":"price_tax_2","groupBy":"value","selectedProp":"price_tax_2","isComplex":true},{"groupType":"selection","groups":[{"groupType":"selection","groups":[],"logic":"+","selectedProp":"price","isComplex":false}],"logic":"+","aliasName":"price_2","groupBy":"value","selectedProp":"price_2","isComplex":true}],"dataGroup":{"xAxisProp":"timestamp","hasGrouping":false,"xAxisType":"time"},"group":[],"properties":["price","geography","timestamp","sex","color","tax","shippingPrice"]},"sizex":"2"}'
    ];

    var widgets = defaultWidgetModel.map(function(item){
        return JSON.parse(item);
    })
    window.dashboardModel = {
        name: 'maneesh',
        widgets: widgets
    };