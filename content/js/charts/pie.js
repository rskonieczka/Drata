
 ;(function(root) {
    var PieChart = function(){
        var arc = d3.svg.arc();
        var z = d3.scale.category20();
        var dims = {m: {l:10, r:10, t:10, b:30}};
        var pie = d3.layout.pie();

        var _drawOuterLabels = true, _drawDataKey = true, _innerRadius = 0, _keyLabels = false, _rotateArcs = false, _arcExpand = 0;
        var enterAntiClockwise = {
                  startAngle: Math.PI * 2,
                  endAngle: Math.PI * 2
                };
        var enterClockwise = {
          startAngle: 0,
          endAngle: 0
        };
        var events = {};
        var dispatch = d3.dispatch('togglePath', 'arcClick');
        var disabledItems = [];
        var _prevEnlarged;
        var raiseEvent = function(eventName, args){
            events.hasOwnProperty(eventName) && events[eventName](args);
        };

        function chart(selection){
            console.log('pie chart drawn');
            selection.each(function(data) {
                var container = d3.select(this);
                //console.log(data.key);
                var itemCount = data.values.length;
                if(!_drawDataKey){
                    dims.m.b = 10
                }
                chart.resize = function() { 
                    dims = {m: {l:10, r:10, t:10, b:30}};
                    if(!_drawDataKey){
                        dims.m.b = 10
                    }
                    container
                    .transition()
                    .duration(1000)
                    .call(chart);
                };
                //chart.container = this;
                chart.change = function(newData){
                    container
                    .datum(newData)
                    .call(chart);
                };

                chart.shuffleArcs = function(){
                    var l = data.values.length;
                    _.each(data.values, function(item, i){
                       item.enlarge = false;
                       item.index = l - item.index + 1;
                    });
                    chart.resize();
                }

                _.each(data.values, function(item, i){
                   if(!item.index || item.enlarge) item.index = item.enlarge ? 0 : i + 1;
                });


                dispatch.on("togglePath", function(d, i){
                    var toggle;
                    if(disabledItems.length === itemCount-1){
                        _.each(data.values, function(item){
                           item.disabled = false;
                        });
                        disabledItems = [];
                    }
                    else{
                        toggle = d.disabled;
                        d.disabled = !toggle;
                        if(toggle){
                            disabledItems.splice(disabledItems.indexOf(d.key), 1);
                        }else{
                            disabledItems.push(d.key);
                        }
                    }
                    chart.resize();
                });

                dispatch.on("arcClick", function(d, i){
                    _.each(data.values, function(item, i){
                       item.enlarge = false;
                       item.index = i + 1;
                    });
                    d.data.enlarge = d.data.key !== _prevEnlarged;
                    raiseEvent('arcClick', d);
                    chart.resize();
                });

                dims.w = $(this.parentNode).width();
                dims.h = $(this.parentNode).height();

                container.attr('width', dims.w).attr('height', dims.h);
                
                var gWrapper =  container
                    .selectAll('g.topgroup')
                    .data([data]);

                var gWrapperEnter = gWrapper.enter()
                    .append("g")
                    .attr('class', 'topgroup');

                gWrapperEnter.append("g").attr('class', 'arcs-group');
                
                if(_drawOuterLabels){
                    gWrapperEnter.append("g").attr("class", 'labels-group');
                    var labels = drata.models.labels().color(z).dims(dims).align('topcenter').dispatch(dispatch);
                    gWrapper
                        .select('g.labels-group')
                        .datum(data.values)
                        .call(labels);
                }
                
                z.domain(data.values.map(function(d){
                    return d.key;
                }));
                
                var r = Math.min(dims.w - dims.m.l - dims.m.r, dims.h - dims.m.t - dims.m.b)/2;
                
                //var r2 = _arcExpand ? r - _arcExpand/100 * r : r;
                var r2 = _arcExpand ? r - _arcExpand : r;

                pie.value(function(d) {
                    return d.disabled ? 0 : d.value;
                });

                if(_rotateArcs){
                    pie.sort(function(d){
                        return d.index;
                    });
                } 
                else{
                    pie.sort(null);
                }
                
                arc.outerRadius(r2);
                
                if(_innerRadius){
                    arc.innerRadius(r2 - _innerRadius);
                }else{
                    arc.innerRadius(r2/2);
                }

                var arcTween = function(a) {
                    var i = d3.interpolate(this._current, a);
                    this._current = i(0);
                    
                    if(a.data.key === _prevEnlarged){
                        var k = d3.interpolate(r , r2);
                        _prevEnlarged = undefined;
                        return function(t) {
                            return arc.outerRadius(k(t))(i(t));
                        };
                    }
                    else if(a.data.enlarge) {
                        var k = d3.interpolate(r2, r);
                        _prevEnlarged = a.data.key;
                        return function(t) {
                            return arc.outerRadius(k(t))(i(t));
                        };
                    }
                    else{
                        return function(t) {
                            return arc.outerRadius(r2)(i(t));
                        };    
                    }
                };

                // Interpolate exiting arcs start and end angles to Math.PI * 2
                // so that they 'exit' at the end of the data
                var arcTweenOut = function(a) {
                    var i = d3.interpolate(this._current, {
                        startAngle: Math.PI * 2, 
                        endAngle: Math.PI * 2,
                        value: 0
                    });
                    this._current = i(0);
                    return function (t) {
                        return arc(i(t));
                    };
                };

                var arcs = gWrapper.select('g.arcs-group')

                    .attr('transform','translate(' + (dims.w/2) + ',' + (r + dims.m.t) + ')') 
                    .selectAll('path')
                    .data(pie(data.values));

                arcs.enter()
                    .append('path')
                    .attr('class', 'arc')
                    .attr('id', function(d){
                        return d.data.key.replace(' ', '_');
                    })
                    .attr("fill", function (d, i) {
                        return z(d.data.key);
                    })
                    .each(function (d) {
                        this._current = {
                            data: d.data,
                            value: d.value,
                            startAngle: enterAntiClockwise.startAngle,
                            endAngle: enterAntiClockwise.endAngle
                        };
                    });

                
                arcs.transition().ease("poly(4)").duration(400).attrTween("d", function(d){
                    //console.log(d.data);
                    // if(d.data.disabled) {
                    //     return arcTweenOut.call(this, d);
                    // } 
                    // else{
                        return arcTween.call(this, d);
                    //}
                });

                arcs.exit()
                    .transition()
                    .duration(750)
                    .attrTween('d', arcTweenOut)
                    .remove(); // now remove the exiting arcs
                    
                gWrapperEnter.append("g").attr('class', 'text-group');
                
                

                var total = 0;

                for(var i = 0; i < data.values.length; i++){
                    if(!data.values[i].disabled) total = total + (+data.values[i].value);
                }
                function angle(d) {
                    var a = (d.startAngle + d.endAngle) * 90 / Math.PI;
                    return a > 90 ? a - 180 : a;
                }
                
                var texts = gWrapper.selectAll('g.text-group')
                    .attr('transform', 'translate(' + (dims.w/2) + ',' + (r + dims.m.t) + ')')
                    .selectAll('text')
                    .data(pie(data.values));
                    
                var textsEnter = texts.enter()
                    .append('svg:text')
                    .attr('transform', 'translate(0,0)')
                    .attr('fill', function(d, i){
                        return "#000";
                    });
                    

                if(_keyLabels){
                    textsEnter
                        .append('svg:textPath')
                        .attr('xlink:href', function(d){
                            return '#' + d.data.key.replace(' ', '_');
                        })
                        .text(function(d) { 
                            return d.data.key;
                        })
                        .attr('letter-spacing', 4);
                    texts.attr('dx', '10px')
                    .attr('dy', '30px');
                    
                }
                else{
                    textsEnter.attr("dy", ".35em");
                    texts
                        .style("text-anchor", "middle")
                        .text(function(d) { 
                            return d.data.disabled ? '' : Math.round(d.value/total * 100).toFixed(1) + '%';
                        });
                    texts.transition().duration(750).attr("transform", function(d) {
                        return "translate(" + arc.centroid(d) + ")";
                    });
                }

                if(_arcExpand){
                    arcs.on('click', dispatch.arcClick);
                    texts.on('click', dispatch.arcClick);
                }


                texts.exit().remove();

                if(_drawDataKey){
                    gWrapperEnter
                        .append('svg:text')
                        .attr('class', 'pie-label')
                        .attr('fill', '#1f77b4')
                        .style('text-anchor', 'middle');

                    var pieLabel = gWrapper.select('text.pie-label')
                        .text(data.key)
                        .attr('transform', 'translate(' +(dims.w/2)+ ',' + (r + r + dims.m.t + 15) + ')');                        
                }
                
                //rotate stuff

                // container
                //     .select('g.topgroup')
                //     .attr('transform', 'rotate(60, ' + (dims.w/2) + ',' + (dims.h/2) + ') translate(0,0)')
                //     .transition().duration(5000)
                //     .attr('transform', 'rotate(0, ' + (dims.w/2) + ',' + (dims.h/2) + ') translate(0,0)');
            
                
            });
            
            return chart;
        };

        chart.drawOuterLabels = function(value){
            if (!arguments.length) return _drawOuterLabels;
            _drawOuterLabels = value;
            return chart;
        };

        chart.drawDataKey = function(value){
            if (!arguments.length) return _drawDataKey;
            _drawDataKey = value;
            return chart;
        };

        chart.rotateArcs = function(value){
            if (!arguments.length) return _rotateArcs;
            _rotateArcs = value;
            return chart;
        };

        chart.arcExpand = function(value){
            if (!arguments.length) return _arcExpand;
            _arcExpand = value;
            return chart;
        };
        
        chart.keyLabels = function(value){
            if (!arguments.length) return _keyLabels;
            _keyLabels = value;
            return chart;
        };
        chart.innerRadius = function(value){
            if (!arguments.length) return _innerRadius;
            _innerRadius = value;
            return chart;
        };

        chart.onEvent = function(eventName, callback){
            events[eventName] = callback;
            return chart;
        };

        return chart;
    };
    root.drata.ns('charts').extend({
        pieChart : PieChart
    });
})(this);