	//Width and height
			
  var width = parseInt(d3.select('#map-firearm-discharges').style('width')),
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

var svg = d3.select("#map-firearm-discharges")
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


//   d3.csv("neighourhooddata.csv", function(error, data) {
d3.csv("./data/shootings-firearm-discharges - 4326.csv", function(error, data) {
    
      console.log(data)

   data.forEach(function(d) {
       // varByName.set(d.id, d.covid);
    //    varByName.set(d.id, +d["Average Price"]);
        //   var2ByName.set(d.neighbourhood, +d["Average Price"]);
          d.coordinates = d.geometry.replace("{'type': 'MultiPoint', 'coordinates': [[","")
                                    .replace("]]}","")
                                    .split(",")
    });




//Load in GeoJSON data
d3.json("./data/neighbourhoods-terrain.json", function(error,json) {
  if (error) throw error;

          
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
         .attr("fill", "#111");
         
         
    g.selectAll("circle")
        .data(data)
        // .data(data.filter( (d) => { return d.OCC_YEAR == "2022"}))
        .enter().append("circle")
        .attr("class", "event")
        .attr("id", function (d,i) { return "circle" + i })
        .attr("data-id", function (d,i) { return i })
        .attr("r", function (d) { 
            if (width >= 500) {
                return 2
            } else if (width < 500 && width >= 300) {
                return 1
            } else if ( width < 300 ) {
                return 0.5
            }
        })
        .attr("cx", function (d) { return projection(d.coordinates)[0]; })
        .attr("cy", function (d) { return projection(d.coordinates)[1]; })
        .attr("fill", "#CC3311" ); 



  



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

       


  d3.selectAll(".event")

    .on("mouseover", function(d) {

        this.parentNode.appendChild(this);

        var thisid = d3.select(this).attr("data-id");
        d3.select(this).classed("active-node", true);
        
        thisCentroid = getMyCentroid(this);
        // console.log(thisCentroid);
        
        d3.select("#tooltip")
                .select("#value")
                .html(function(){

                return "<p class='ttname'>Date: " 
                    + (data[thisid].OCC_DATE) 
                    // +  "</p><p class='ttvaluelabel'>Neighbourhood:</p><p class='ttvalue'>" 
                    +  "</p><p class='ttvaluelabel'>Neighbourhood:</p><p class='ttname'>" 
                    + data[thisid].NEIGHBOURHOOD_140 
                    +  "</p><p class='ttvaluelabel'>Injuries:</p><p class='ttvalue'>" 
                    + d3.format(',')(data[thisid].INJURIES) 
                    +  "</p><p class='ttvaluelabel'>Deaths:</p><p class='ttvalue'>" 
                    + d3.format(',')(data[thisid].DEATH) 
                    + "</p>";


                });
        
                d3.selectAll("#tooltip").classed("hidden", false);
      })

          .on("mousemove", function(){
                d3.select("#tooltip")
                // .style("top", thisCentroid[1]+"px")
                .style("top", "0px")
                // .style("top", function() {
                //     if (thisCentroid[1] > (height/2)) {return (thisCentroid[1]-100)+"px";}
                //     else {return (thisCentroid[1])+"px";}
                //   })
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

width = parseInt(d3.select('#map-firearm-discharges').style('width')),
height = Math.round(width * mapRatio);


var projection = d3.geoMercator()
        .scale(width * 113.9)
        .center([-67.957,39.967])
        .rotate([0,-13.19,0])
        .translate([width/2, height/2]);

 


//Define default path generator
var path = d3.geoPath().projection(projection);

d3.select("#map-firearm-discharges")
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

d3.selectAll(".event")
    .attr("cx", function (d) { return projection(d.coordinates)[0]; })
    .attr("cy", function (d) { return projection(d.coordinates)[1]; })
    .attr("r", function (d) { 
        if (width >= 500) {
            return 2
        } else if (width < 500 && width >= 300) {
            return 1
        } else if ( width < 300 ) {
            return 0.5
        }
    })

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