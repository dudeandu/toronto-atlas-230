	//Width and height
			
  var width = parseInt(d3.select('#map-density').style('width')),
  mapRatio = 0.51,
  height = width * mapRatio;

var projection = d3.geoMercator()
        .scale(width * 113.9)
        .center([-67.957,39.967])
        .rotate([0,-13.19,0])
        .translate([width/2, height/2]);
        

//Define default path generator
var path = d3.geoPath().projection(projection);

// var colour =  d3.scaleThreshold().domain([1000000,1200000,1400000,1600000,1800000,2000000,2100000]).range(['#d3edf4','#bbdae6','#a3c7d8','#8ab5c9','#72a3bb','#5a91ae','#3d80a0','#166f93']);

var colour =  d3.scaleThreshold()
                .domain([1000,2500,5500,7500,10000,15000,25000])
                // .range([,"#6c3a0d","#a6611a","#dfc27d","#f5f5f5","#80cdc1","#018571","#01665e"]);
                .range(['#dde28c', '#cdc58b', '#bca889', '#ab8c86', '#997183', '#87567f', '#733a7b', '#5e1c76']);


//Create SVG element

var svg = d3.select("#map-density")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.append('rect').attr("width", width)
      .attr("height", height)
      .attr("id","backbox");

var g = svg.append("g").attr("width", width)
      .attr("height", height);

var labels = svg.append("g").attr("width", width)
      .attr("height", height);


var varByName = d3.map();
var var2ByName = d3.map();
var var3ByName = d3.map();


//   d3.csv("neighourhooddata.csv", function(error, data) {
d3.csv("./data/demographics.csv", function(error, data) {
    
      console.log(data)
   data.forEach(function(d) {
       varByName.set(d.GeoUID, +d["v_CA21_6: Population density per square kilometre"]);
    //    var2ByName.set(d.GeoUID, +d["v_CA21_4821: First generation"]);
    //    var3ByName.set(d.GeoUID, +d["v_CA21_4824: Second generation"] + +d["v_CA21_4827: Third generation or more"]);
    });



//Load in GeoJSON data
d3.json("./data/toronto-census-tracts-CT.json", function(error,json) {
  if (error) throw error;

  console.log(json)
          
  //Bind data and create one path per GeoJSON feature
  g.selectAll("path")
     .data(json.features)
     .enter().append("path")
     .attr("d", path)
     .attr("class", "ward")
     .attr("id", function(d) {
        // console.log(d)
                  return d.properties.id; })
     .attr("fill", function(d) { 
        return colour(varByName.get(d.properties.id)); })
        .attr("opacity", 0.9);



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

          var thisid = (d.properties.id);
          d3.select(this).classed("active-node", true);
        
          thisCentroid = getMyCentroid(this);
          
          d3.select("#tooltip")
                  .select("#value")
                  .html(function(){
                        return "<p class='ttvaluelabel'>Area: " 
                        + (d.properties.id) 
                        +  "</p><p class='ttvaluelabel'>Population per square kilometre:</p><p class='ttvalue'>" 
                        // + d.properties.GeoUID
                        // + "</p><p class='ttvaluelabel'>Average prices:</p><p class='ttvalue'>$" 
                        + d3.format(',.0f')(varByName.get(d.properties.id))
                        + "</p>";
                  });
        
                d3.selectAll("#tooltip").classed("hidden", false);
      })

          .on("mousemove", function(){
                d3.select("#tooltip")
                .style("top", thisCentroid[1]+"px")
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

width = parseInt(d3.select('#map-density').style('width')),
height = Math.round(width * mapRatio);


var projection = d3.geoMercator()
        .scale(width * 113.9)
        .center([-67.957,39.967])
        .rotate([0,-13.19,0])
        .translate([width/2, height/2]);

 


//Define default path generator
var path = d3.geoPath().projection(projection);

d3.select("#map-density")
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


}

d3.select(window).on('resize', resizemap);
d3.select(window).on('load', resizemap);




});
});