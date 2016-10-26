angular.module('ruben-radar')
    .directive('drawRadar', function (d3) {
        return {
            //We restrict its use to an element
            //as usually  <bars-chart> is semantically
            //more understandable
            restrict: 'E',
            //this is important,
            //we don't want to overwrite our directive declaration
            //in the HTML mark-up
            replace: false,
            scope: {
                answers: '=answers'
            },
            link: function (scope, element, attrs) {
                // var data = [12,45,23,14,11,0];
                // var chart = d3.select(element[0]);
                var RadarChart = function(options) {
                    var oneSpinAngle = function () {
                        return 2 * Math.PI;
                    };
                    var rightAngle = function () {
                        return oneSpinAngle() / 4;
                    };
                    //deprecated
                    var radians = 2 * Math.PI;

                    var defaultConfig = {
                        //radio de los puntos sobre los ejes
                        radius: 5,

                        //tamaño del radar default
                        w: 500,
                        h: 500,

                        factorLegend: .85,

                        //cantidad de grados sobre la recta
                        levels: 3,

                        opacityArea: 0.5,
                        ToRight: 5,

                        //lo que esta adentro del main canvas se traslada
                        TranslateX: 80,
                        TranslateY: 30,
                        ExtraWidthX: 500,
                        ExtraWidthY: 100,
                        color: d3.scale.category10()
                    };

                    var distanceToCenter = function (radarRadius, stepInAxis, amountOfSteps) {
                        return radarRadius * (stepInAxis+1) / amountOfSteps;
                    };

                    var pointFor = function (radarRadius, axisNumber, amountOfAxis, stepInAxis, amountOfSteps) {
                        var angle = axisNumber / amountOfAxis * oneSpinAngle() - rightAngle();
                        var module = distanceToCenter(radarRadius, stepInAxis, amountOfSteps);
                        return {
                            x: module * Math.cos(angle),
                            y: module * Math.sin(angle)
                        };
                    };

                    var cfg = _.assign(defaultConfig, options);

                    this.draw = function(id, data){
                        // Get the maximum value from the data
                        var maxValueFromData = d3.max(data, function(i){
                            return d3.max(_.map(i, 'value'));
                        });
                        // that data cannot be smaller than 0
                        cfg.maxValue = Math.max(0, maxValueFromData);

                        var allAxis = _.map(data[0], 'axis');
                        var total = allAxis.length;
                        var radius = Math.min(cfg.w/2, cfg.h/2);

                        // Add the main canvas
                        var g = d3.select(id)
                                .append("svg")
                                .attr("width", cfg.w+cfg.ExtraWidthX)
                                .attr("height", cfg.h+cfg.ExtraWidthY)
                                .append("g")
                                .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

                        var tooltip;

                        //Circular segments
                        for(var j=0; j<cfg.levels-1; j++){
                            g.selectAll(".levels")
                                .data(allAxis)
                                .enter()
                                .append("svg:line")
                                .attr("x1", function(data, i){
                                    return pointFor(radius, i, total, j, cfg.levels).x;
                                })
                                .attr("y1", function(data, i){
                                    return pointFor(radius, i, total, j, cfg.levels).y;
                                })
                                .attr("x2", function(data, i){
                                    return pointFor(radius, i+1, total, j, cfg.levels).x;
                                })
                                .attr("y2", function(data, i){
                                    return pointFor(radius, i+1, total, j, cfg.levels).y;
                                })
                                .attr("class", "line")
                                .style("stroke", "grey")
                                .style("stroke-opacity", "0.75")
                                .style("stroke-width", "0.3px")
                                .attr("transform", "translate(" + (cfg.w/2) + ", " + (cfg.h/2) + ")");
                        }

                        //Text indicating at what % each level is
                        for(var j=0; j<cfg.levels; j++){
                            var levelFactor = radius*((j+1)/cfg.levels);
                            g.selectAll(".levels")
                                .data([1]) //dummy data
                                .enter()
                                .append("svg:text")
                                .attr("x", function(data){
                                    return levelFactor*(1-Math.sin(0));
                                })
                                .attr("y", function(data){
                                    return levelFactor*(1-Math.cos(0));
                                })
                                .attr("class", "legend")
                                .style("font-family", "sans-serif")
                                .style("font-size", "10px")
                                .attr("transform", "translate(" + (cfg.w/2-levelFactor + cfg.ToRight) + ", " + (cfg.h/2-levelFactor) + ")")
                                .attr("fill", "#737373")
                                .text(function () {
                                    return (j+1)*cfg.maxValue/cfg.levels;
                                });
                        }

                        series = 0;

                        var axis = g.selectAll(".axis")
                                .data(allAxis)
                                .enter()
                                .append("g")
                                .attr("class", "axis");

                        axis.append("line")
                            .attr("x1", cfg.w/2)
                            .attr("y1", cfg.h/2)
                            .attr("x2", function(data, i){
                                return cfg.w/2*(1-Math.sin(i*radians/total));
                            })
                            .attr("y2", function(data, i){
                                return cfg.h/2*(1-Math.cos(i*radians/total));
                            })
                            .attr("class", "line")
                            .style("stroke", "grey")
                            .style("stroke-width", "1px");

                        axis.append("text")
                            .attr("class", "legend")
                            .text(_.identity)
                            .style("font-family", "sans-serif")
                            .style("font-size", "11px")
                            .attr("text-anchor", "middle")
                            .attr("dy", "1.5em")
                            .attr("transform", function(data, i){return "translate(0, -10)";})
                            .attr("x", function(data, i){return cfg.w/2*(1-cfg.factorLegend*Math.sin(i*radians/total))-60*Math.sin(i*radians/total);})
                            .attr("y", function(data, i){
                                return cfg.h/2*(1-Math.cos(i*radians/total))-20*Math.cos(i*radians/total);
                            });


                        data.forEach(function(y, x){
                            dataValues = [];
                            g.selectAll(".nodes")
                                .data(y, function(j, i){
                                    dataValues.push([
                                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*Math.sin(i*radians/total)),
                                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*Math.cos(i*radians/total))
                                    ]);
                                });
                            dataValues.push(dataValues[0]);
                            g.selectAll(".area")
                                .data([dataValues])
                                .enter()
                                .append("polygon")
                                .attr("class", "radar-chart-serie"+series)
                                .style("stroke-width", "2px")
                                .style("stroke", cfg.color(series))
                                .attr("points",function(data) {
                                    var str="";
                                    for(var pti=0;pti<data.length;pti++){
                                        str=str+data[pti][0]+","+data[pti][1]+" ";
                                    }
                                    return str;
                                })
                                .style("fill", function(j, i){
                                    return cfg.color(series);
                                })
                                .style("fill-opacity", cfg.opacityArea)
                                .on('mouseover', function (data){
                                    z = "polygon."+d3.select(this).attr("class");
                                    g.selectAll("polygon")
                                        .transition(200)
                                        .style("fill-opacity", 0.1);
                                    g.selectAll(z)
                                        .transition(200)
                                        .style("fill-opacity", .7);
                                })
                                .on('mouseout', function(){
                                    g.selectAll("polygon")
                                        .transition(200)
                                        .style("fill-opacity", cfg.opacityArea);
                                });
                            series++;
                        });
                        series=0;


                        data.forEach(function(y, x){
                            g.selectAll(".nodes")
                                .data(y).enter()
                                .append("svg:circle")
                                .attr("class", "radar-chart-serie"+series)
                                .attr('r', cfg.radius)
                                .attr("alt", function(j){
                                    return Math.max(j.value, 0);
                                })
                                .attr("cx", function(j, i){
                                    dataValues.push([
                                        cfg.w/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*Math.sin(i*radians/total)),
                                        cfg.h/2*(1-(parseFloat(Math.max(j.value, 0))/cfg.maxValue)*Math.cos(i*radians/total))
                                    ]);
                                    return cfg.w/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*Math.sin(i*radians/total));
                                })
                                .attr("cy", function(j, i){
                                    return cfg.h/2*(1-(Math.max(j.value, 0)/cfg.maxValue)*Math.cos(i*radians/total));
                                })
                                .attr("data-id", function(j){
                                    return j.axis;
                                })
                                .style("fill", cfg.color(series)).style("fill-opacity", .9)
                                .on('mouseover', function (data){
                                    newX =  parseFloat(d3.select(this).attr('cx')) - 10;
                                    newY =  parseFloat(d3.select(this).attr('cy')) - 5;

                                    tooltip
                                        .attr('x', newX)
                                        .attr('y', newY)
                                        .text(function () {return data.value;})
                                        .transition(200)
                                        .style('opacity', 1);

                                    z = "polygon."+d3.select(this).attr("class");
                                    g.selectAll("polygon")
                                        .transition(200)
                                        .style("fill-opacity", 0.1);
                                    g.selectAll(z)
                                        .transition(200)
                                        .style("fill-opacity", .7);
                                })
                                .on('mouseout', function(){
                                    tooltip
                                        .transition(200)
                                        .style('opacity', 0);
                                    g.selectAll("polygon")
                                        .transition(200)
                                        .style("fill-opacity", cfg.opacityArea);
                                })
                                .append("svg:title")
                                .text(function(j){
                                    return Math.max(j.value, 0);
                                });

                            series++;
                        });

                        //Tooltip
                        tooltip = g.append('text')
                            .style('opacity', 0)
                            .style('font-family', 'sans-serif')
                            .style('font-size', '13px');
                    };
                };

                var w = 500,
                    h = 500;

                var colorscale = d3.scale.category10();

                //Legend titles
                var LegendOptions = ['Smartphone','Tablet'];

                // Data
                // This data should appear as a double array of each graph
                // TODO this is evil
                var data = [];
                data = _.groupBy(scope.answers, 'axis.description');
                data = _.mapValues(data, function (answers) {
                    return _.sumBy(answers, 'points') / answers.length;
                });
                data = [_.map(_.toPairs(data), function (o) {
                    return {axis: o[0], value: o[1]};
                })];

                //Options for the Radar chart, other than default
                var mycfg = {
                    w: w,
                    h: h,
                    maxValue: 0.6,
                    levels: 5,
                    ExtraWidthX: 300
                };

                //Call function to draw the Radar chart
                //Will expect that data is in %'s
                new RadarChart(mycfg).draw(element[0], data);

                ////////////////////////////////////////////
                /////////// Initiate legend ////////////////
                ////////////////////////////////////////////

                var svg = d3.select('#body')
                        .selectAll('svg')
                        .append('svg')
                        .attr("width", w+300)
                        .attr("height", h);

                //Create the title for the legend
                var text = svg.append("text")
                        .attr("class", "title")
                        .attr('transform', 'translate(90,0)')
                        .attr("x", w - 70)
                        .attr("y", 10)
                        .attr("font-size", "12px")
                        .attr("fill", "#404040")
                        .text("What % of owners use a specific service in a week");

                //Initiate Legend
                var legend = svg.append("g")
                        .attr("class", "legend")
                        .attr("height", 100)
                        .attr("width", 200)
                        .attr('transform', 'translate(90,20)')
                ;
                //Create colour squares
                legend.selectAll('rect')
                    .data(LegendOptions)
                    .enter()
                    .append("rect")
                    .attr("x", w - 65)
                    .attr("y", function(data, i){ return i * 20;})
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", function(data, i){ return colorscale(i);})
                ;
                //Create text next to squares
                legend.selectAll('text')
                    .data(LegendOptions)
                    .enter()
                    .append("text")
                    .attr("x", w - 52)
                    .attr("y", function(data, i){ return i * 20 + 9;})
                    .attr("font-size", "11px")
                    .attr("fill", "#737373")
                    .text(_.identity)
                ;
            }
        };
    })
;
