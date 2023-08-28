	//Width and height
			
  var width = parseInt(d3.select('#map-tree-coverage').style('width')),
  mapRatio = 0.51,
  height = width * mapRatio;

var projection = d3.geoMercator()
        .scale(width * 113.9)
        .center([-67.957,39.967])
        .rotate([0,-13.19,0])
        .translate([width/2, height/2]);
        

//Define default path generator
var path = d3.geoPath().projection(projection);


var colour =  d3.scaleThreshold().domain([800000,1000000,1200000,1400000,1600000,1800000,2000000]).range(['#d3edf4','#bbdae6','#a3c7d8','#8ab5c9','#72a3bb','#5a91ae','#3d80a0','#166f93']);



//Create SVG element

var svg = d3.select("#map-tree-coverage")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.append('rect').attr("width", width)
      .attr("height", height)
      .attr("id","backbox");

var g = svg.append("g").attr("width", width)
      .attr("height", height);

var gb = svg.append("g").attr("width", width)
      .attr("height", height);

var gc = svg.append("g").attr("width", width)
      .attr("height", height);

var labels = svg.append("g").attr("width", width)
      .attr("height", height);


var varByName = d3.map();
var var2ByName = d3.map();


//   d3.csv("neighourhooddata.csv", function(error, data) {
d3.csv("./data/tree-data.csv", function(error, data) {
    
      console.log(data)

   data.forEach(function(d) {
       varByName.set(d.neighbourhood, d.treeCover);
    //    varByName.set(d.id, +d["Average Price"]);
        //   var2ByName.set(d.neighbourhood, +d["Average Price"]);
          
    });




//Load in GeoJSON data
d3.json("./data/tree-coverage-B.json", function(error,jsonb) {
    // console.log(jsonb)
    
    d3.json("./data/neighbourhoods-terrain.json", function(error,json) {
        if (error) throw error;
        console.log(json)
          
  //Bind data and create one path per GeoJSON feature
  g.selectAll("path")
     .data(json.features)
     .enter().append("path")
     .attr("d", path)
     .attr("class", "ward")
     .attr("id", function(d) {
         return d.properties.NAME; })
        //  .attr("fill", function(d) { return colour(var2ByName.get(d.properties.NAME)); });
        //  .attr("fill", none);
         .attr("fill", "#F8F8F8");



  //Bind data and create one path per GeoJSON feature
  gb.selectAll("path")
     .data(jsonb.features)
     .enter().append("path")
     .attr("d", path)
     .attr("class", "trees")
     .attr("id", function(d) {
         return d.properties.NAME; })
        //  .attr("fill", function(d) { return colour(var2ByName.get(d.properties.NAME)); });
        //  .attr("fill", none);
         .attr("fill", "#569548");
          
  //Bind data and create one path per GeoJSON feature
  gc.selectAll("path")
     .data(json.features)
     .enter().append("path")
     .attr("d", path)
     .attr("class", "ward")
     .attr("id", function(d) {
         return d.properties.NAME; })
        //  .attr("fill", function(d) { return colour(var2ByName.get(d.properties.NAME)); });
         .attr("stroke", "#333")
         .attr("fill", "none");
         
         
    // g.selectAll("circle")
    //     .data(data)
    //     // .data(data.filter( (d) => { return d.OCC_YEAR == "2022"}))
    //     .enter().append("circle")
    //     .attr("class", "event")
    //     .attr("id", function (d,i) { return "circle" + i })
    //     .attr("data-id", function (d,i) { return i })
    //     .attr("r",2)
    //     .attr("cx", function (d) { return projection(d.coordinates)[0]; })
    //     .attr("cy", function (d) { return projection(d.coordinates)[1]; })
    //     .attr("fill", "#CC3311" ); 



   



    labels.append("text")
    .attr('class', "area-label area-label-background roadLabel dvplabel")
    .attr("x", function (d) { return projection([-79.330649,43.729977])[0]; })
    .attr("y", function (d) { return projection([-79.330649,43.729977])[1]; }) 
    .text("DVP");
    // .attr("transform", "translate(-10,0)rotate(-45)")
    // .style("text-anchor", "end");

labels.append("text")
    .attr('class', "area-label area-label-background roadLabel fourohonelabel")
    .attr("x", function (d) { return projection([-79.539926,43.712250])[0]; })
    .attr("y", function (d) { return projection([-79.539926,43.712250])[1]; }) 
    .text("401");

labels.append("text")
    .attr('class', "area-label area-label-background roadLabel fourohonelabelB")
    .attr("x", function (d) { return projection([-79.303541,43.770411])[0]; })
    .attr("y", function (d) { return projection([-79.303541,43.770411])[1]; }) 
    .text("401");

labels.append("text")
    .attr('class', "area-label area-label-background scarboroughlabel")
    .attr("x", function (d) { return projection([-79.227722,43.766097])[0]; })
    .attr("y", function (d) { return projection([-79.227722,43.766097])[1]; }) 
    .text("Scarborough");

labels.append("text")
    .attr('class', "area-label area-label-background etobicokelabel")
    .attr("x", function (d) { return projection([-79.545872,43.664813])[0]; })
    .attr("y", function (d) { return projection([-79.545872,43.664813])[1]; }) 
    .text("Etobicoke");


labels.append("text")
    .attr('class', "area-label area-label-background northyorklabel")
    .attr("x", function (d) { return projection([-79.435117, 43.766014])[0]; })
    .attr("y", function (d) { return projection([-79.435117, 43.766014])[1]; }) 
    .text("North York");

labels.append("text")
    .attr('class', "area-label area-label-background eastyorklabel")
    .attr("x", function (d) { return projection([-79.326359, 43.690753])[0]; })
    .attr("y", function (d) { return projection([-79.326359, 43.690753])[1]; }) 
    .text("East York");

labels.append("text")
    .attr('class', "area-label area-label-background yorklabel")
    .attr("x", function (d) { return projection([-79.486996,43.687415])[0]; })
    .attr("y", function (d) { return projection([-79.486996,43.687415])[1]; }) 
    .text("York");

labels.append("text")
    .attr('class', "area-label area-label-background downtownlabel")
    .attr("x", function (d) { return projection([-79.382080,43.659100])[0]; })
    .attr("y", function (d) { return projection([-79.382080,43.659100])[1]; }) 
    .text("Downtown");

labels.append("text")
    .attr('class', "area-label roadLabel dvplabel")
    .attr("x", function (d) { return projection([-79.330649,43.729977])[0]; })
    .attr("y", function (d) { return projection([-79.330649,43.729977])[1]; }) 
    .text("DVP");

labels.append("text")
    .attr('class', "area-label roadLabel fourohonelabel")
    .attr("x", function (d) { return projection([-79.539926,43.712250])[0]; })
    .attr("y", function (d) { return projection([-79.539926,43.712250])[1]; }) 
    .text("401");

labels.append("text")
    .attr('class', "area-label roadLabel fourohonelabelB")
    .attr("x", function (d) { return projection([-79.303541,43.770411])[0]; })
    .attr("y", function (d) { return projection([-79.303541,43.770411])[1]; }) 
    .text("401");

labels.append("text")
    .attr('class', "area-label scarboroughlabel")
    .attr("x", function (d) { return projection([-79.227722,43.766097])[0]; })
    .attr("y", function (d) { return projection([-79.227722,43.766097])[1]; }) 
    .text("Scarborough");

labels.append("text")
    .attr('class', "area-label etobicokelabel")
    .attr("x", function (d) { return projection([-79.545872,43.664813])[0]; })
    .attr("y", function (d) { return projection([-79.545872,43.664813])[1]; }) 
    .text("Etobicoke");


labels.append("text")
    .attr('class', "area-label northyorklabel")
    .attr("x", function (d) { return projection([-79.435117, 43.766014])[0]; })
    .attr("y", function (d) { return projection([-79.435117, 43.766014])[1]; }) 
    .text("North York");

labels.append("text")
    .attr('class', "area-label eastyorklabel")
    .attr("x", function (d) { return projection([-79.326359, 43.690753])[0]; })
    .attr("y", function (d) { return projection([-79.326359, 43.690753])[1]; }) 
    .text("East York");

labels.append("text")
    .attr('class', "area-label yorklabel")
    .attr("x", function (d) { return projection([-79.486996,43.687415])[0]; })
    .attr("y", function (d) { return projection([-79.486996,43.687415])[1]; }) 
    .text("York");

labels.append("text")
    .attr('class', "area-label downtownlabel")
    .attr("x", function (d) { return projection([-79.382080,43.659100])[0]; })
    .attr("y", function (d) { return projection([-79.382080,43.659100])[1]; }) 
    .text("Downtown");




        
            function getMyCentroid(element) {
                var bbox = element.getBBox();
                return [bbox.x + bbox.width/2, bbox.y + bbox.height/2];
            }
            
            var thisCentroid = [];

       


            d3.selectAll(".ward")

            .on("mouseover", function(d) {
        
                  this.parentNode.appendChild(this);
        
                  var thisid = (d.properties.NAME);
                  d3.select(this).classed("active-node", true);
                
                  thisCentroid = getMyCentroid(this);
                  
                  d3.select("#tooltip")
                          .select("#value")
                          .html(function(){
                            if ( isNaN(varByName.get(d.properties.NAME)) || varByName.get(d.properties.NAME) <= 0) {
                                console.log(varByName.get(d.properties.NAME))
                                return "<p class='ttname'>Area: " 
                                + (d.properties.NAME) 
                                +  "</p><p class='ttvaluelabel'>Percent tree coverage</p><p class='ttvalue'>" 
                                // + d.properties.GeoUID
                                // + "</p><p class='ttvaluelabel'>Average prices:</p><p class='ttvalue'>$" 
                                + "Data unavailable"
                                + "</p>";
                            } else {
                                return "<p class='ttname'>Area: " 
                                + (d.properties.NAME) 
                                +  "</p><p class='ttvaluelabel'>Percent tree coverage</p><p class='ttvalue'>" 
                                // + d.properties.GeoUID
                                // + "</p><p class='ttvaluelabel'>Average prices:</p><p class='ttvalue'>$" 
                                // + d3.format('$,')(varByName.get(d.properties.NAME))
                                + d3.format(',')(varByName.get(d.properties.NAME)) + "%"
                                + "</p>";
                            }
                          });
                
                        d3.selectAll("#tooltip").classed("hidden", false);
              })

          .on("mousemove", function(){
                d3.select("#tooltip")
                // .style("top",(d3.event.pageY-140)+"px")
                // .style("left", function() {
                //     if (d3.event.pageX > (width - 80)) {return (d3.event.pageX-140)+"px";}
                //     else if (d3.event.pageX < (80)) {return (d3.event.pageX)+"px";}
                //     else {return (d3.event.pageX-60)+"px";}
                //   });
                // .style("top", thisCentroid[1]+"px")
                .style("top", function() {
                    if (thisCentroid[1] > (height/2)) {return (thisCentroid[1]-60)+"px";}
                    else {return (thisCentroid[1])+"px";}
                  })
                .style("left", function() {
                    if (thisCentroid[0] > (width/2)) {return (thisCentroid[0]-140)+"px";}
                    else {return (thisCentroid[0])+"px";}
                  });
              })

    .on("mouseout", function() {
             d3.select("#tooltip").classed("hidden", true);
             d3.select(this).classed("active-node", false);
              });


    d3.selectAll('#backbox')
      .on("click", function() {
        d3.select(".active-node").classed("active-node", false);
        d3.select("#tooltip").classed("hidden", true);
    });



function resizemap() {

width = parseInt(d3.select('#map-tree-coverage').style('width')),
height = Math.round(width * mapRatio);


var projection = d3.geoMercator()
        .scale(width * 113.9)
        .center([-67.957,39.967])
        .rotate([0,-13.19,0])
        .translate([width/2, height/2]);

 


//Define default path generator
var path = d3.geoPath().projection(projection);

d3.select("#map-tree-coverage")
      .attr("width", width)
      .attr("height", height);

d3.select("svg")
      .attr("width", width)
      .attr("height", height);

d3.select("#backbox")
      .attr("width", width)
      .attr("height", height);

d3.selectAll("g")
      .attr("width", width)
      .attr("height", height);


d3.selectAll(".ward")
    .attr("d", path);

d3.selectAll(".trees")
    .attr("d", path);

    d3.selectAll('.scarboroughlabel')
    .attr("x", function (d) { return projection([-79.227722,43.766097])[0]; })
    .attr("y", function (d) { return projection([-79.227722,43.766097])[1]; }) 

d3.selectAll('.etobicokelabel')
  .attr("x", function (d) { return projection([-79.545872,43.664813])[0]; })
    .attr("y", function (d) { return projection([-79.545872,43.664813])[1]; }) 

d3.selectAll('.downtownlabel')
    .attr("x", function (d) { return projection([-79.382080,43.659100])[0]; })
    .attr("y", function (d) { return projection([-79.382080,43.659100])[1]; }) 

d3.selectAll('.eastyorklabel')
    .attr("x", function (d) { return projection([-79.326359, 43.690753])[0]; })
    .attr("y", function (d) { return projection([-79.326359, 43.690753])[1]; }) 

d3.selectAll('.yorklabel')
    .attr("x", function (d) { return projection([-79.486996,43.687415])[0]; })
    .attr("y", function (d) { return projection([-79.486996,43.687415])[1]; }) 

d3.selectAll('.northyorklabel')
    .attr("x", function (d) { return projection([-79.435117, 43.766014])[0]; })
    .attr("y", function (d) { return projection([-79.435117, 43.766014])[1]; }) 

d3.selectAll(".dvplabel")
  .attr("x", function (d) { return projection([-79.330649,43.729977])[0]; })
  .attr("y", function (d) { return projection([-79.330649,43.729977])[1]; }) ;

d3.selectAll(".fourohonelabel")
  .attr("x", function (d) { return projection([-79.539926,43.712250])[0]; })
  .attr("y", function (d) { return projection([-79.539926,43.712250])[1]; });

d3.selectAll(".fourohonelabelB")
  .attr("x", function (d) { return projection([-79.303541,43.770411])[0]; })
  .attr("y", function (d) { return projection([-79.303541,43.770411])[1]; });


}

d3.select(window).on('resize', resizemap);
d3.select(window).on('load', resizemap);




});
});
});