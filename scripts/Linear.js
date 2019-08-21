var traces = [{
  x: [],
  y: [],
  mode: 'markers',
  type: 'scatter',
  name: 'data'
}];

traces.push({
  x: [],
  y: [],
  mode: 'markers',
  type: 'scatter',
  name: 'data'
});

traces.push({
  x: [],
  y: [],
  mode: 'markers',
  type: 'scatter',
  name: 'data'
});

traces.push({
  x: [],
  y: [],
  mode: 'markers',
  type: 'scatter',
  name: 'data'
});

var datasetx = [];
var datasety = [];
var setx = [];


var layout = {
  xaxis: {range: [-20, 20]},
  yaxis: {range: [-20, 20]},

  title:'Click on the plot to add more data points'
};

var myPlot = document.getElementById('myPlot')
Plotly.newPlot('myPlot', traces, layout, {hovermode: 'closest'});

Number.prototype.between = function(min, max) {
  return this >= min && this <= max;
};


Plotly.d3.select(".plotly").on('click', function(d, i) {
  var e = Plotly.d3.event;
  var bg = document.getElementsByClassName('nsewdrag drag')[0];
  var x = ((e.layerX - bg.attributes['x'].value + 4) / (bg.attributes['width'].value)) * (myPlot.layout.xaxis.range[1] - myPlot.layout.xaxis.range[0]) + myPlot.layout.xaxis.range[0];
  var y = ((e.layerY - bg.attributes['y'].value + 4) / (bg.attributes['height'].value)) * (myPlot.layout.yaxis.range[0] - myPlot.layout.yaxis.range[1]) + myPlot.layout.yaxis.range[1]
  if (x.between(myPlot.layout.xaxis.range[0], myPlot.layout.xaxis.range[1]) &&
    y.between(myPlot.layout.yaxis.range[0], myPlot.layout.yaxis.range[1])) {
    Plotly.extendTraces(myPlot, {
      x: [
        [x]
      ],
      y: [
        [y]
      ]
    }, [3]);
  }
  datasetx.push([1,x])
  setx.push(x)
  datasety.push(y)


});



function transpose(a) {

  // Calculate the width and height of the Array
  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;

  // In case it is a zero matrix, no transpose routine needed.
  if(h === 0 || w === 0) { return []; }

  /**
   * @var {Number} i Counter
   * @var {Number} j Counter
   * @var {Array} t Transposed data is stored in this array.
   */
  var i, j, t = [];

  // Loop through every item in the outer array (height)
  for(i=0; i<h; i++) {

    // Insert a new row (array)
    t[i] = [];

    // Loop through every item per item in outer array (width)
    for(j=0; j<w; j++) {

      // Save transposed data.
      t[i][j] = a[j][i];
    }
  }

  return t;
}


function mle() {

    var first = math.inv(math.multiply(transpose(datasetx), datasetx));
    var second = math.multiply(first, transpose(datasetx));
    var final = math.multiply(second, datasety)

    var yhat = math.multiply(datasetx, final);
    var residual = subvector(datasety,yhat);
    var RSS = math.multiply(residual, residual);
    var sighat = RSS/(datasetx.length - 2);
    var H = math.multiply(datasetx, second);

    var hii = [];

    for (j=0; j<H.length; j++){
        hii.push(H[j][j]);
    }

    var sresidual = [];

    for (k = 0; k < H.length; k++){

        sresidual.push(residual[k]/(math.sqrt(sighat*(1-hii[k]))));
    }

    var newtrace = [{
    x: [-20,20],
    y: [final[0] + (final[1])*(-20), final[0] + (final[1])*(20)],
    mode: 'lines',
    type: 'scatter',
    name: 'LR'
    }];

    var residualtrace = [{
    y: residual,
    mode: 'markers',
    type: 'scatter'

    }]

    var cooksdistance = [];


    for (i=0; i<datasetx.length; i++){
        var oneoutx = datasetx.slice(0);
        var oneouty = datasety.slice(0);

        oneoutx.splice(i,1);
        oneouty.splice(i,1);


        let ofirst = math.inv(math.multiply(transpose(oneoutx), oneoutx));
        let osecond = math.multiply(ofirst, transpose(oneoutx));
        let ofinal = math.multiply(osecond, oneouty);

         one = subvector(ofinal, final)

        var two = math.multiply(one,transpose(datasetx))
        var three = math.multiply(two, datasetx)
        var four = math.multiply(three,subvector(ofinal, final))

        var five = 2 * RSS
        var six = (datasetx.length - 2) * four
        var seven = six / five

        cooksdistance.push(seven)



    }

    var standlev = [{
    x: hii,
    y: sresidual,
    mode: 'markers',
    type: 'scatter'

    }]

    var cookstrace = [{
    x: hii,
    y: sresidual,
    z: cooksdistance,
        type: 'contour',
        showscale: false,
        contours: {
          coloring: 'lines',
          start: 0.5,
          end: 5,
          size: 0.5,
          showlabels: true,
          labelfont: {
            family: 'Raleway',
            size: 12,
            color: 'black',
          }
        }
        }
    ];


    var layout = {
      xaxis: {
        title: {
          text: 'Leverage',
        font: {
            size: 18,
            color: 'black'
          }
        },
      },
      yaxis: {
        title: {
          text: 'Standardised Residual',
        font: {
            size: 18,
            color: 'black'
          }
        }
      }
    };

    var layout2 = {
      yaxis: {
        title: {
          text: 'Residual',
        font: {
            size: 18,
            color: 'black'
          }
        },
      },

       xaxis: {
        title: {
          text: 'Point number',
        font: {
            size: 18,
            color: 'black'
          }
        },
      },
    };

    Plotly.plot('myPlot',newtrace);
    Plotly.plot('myPlot2',residualtrace,layout2);
    Plotly.newPlot('myPlot3',cookstrace,layout);
    Plotly.plot('myPlot3',standlev);

}


function subvector(a,b){
    return a.map((e,i) => e - b[i]);
}



function deleteTrace(){

    var traces = [{
    x: [],
    y: [],
    mode: 'markers',
    type: 'scatter',
    name: 'data'
    }];

    traces.push({
      x: [],
      y: [],
      mode: 'markers',
      type: 'scatter',
      name: 'data'
    });

    traces.push({
      x: [],
      y: [],
      mode: 'markers',
      type: 'scatter',
      name: 'data'
    });

    traces.push({
      x: [],
      y: [],
      mode: 'markers',
      type: 'scatter',
      name: 'data'
    });

    datasetx = [];
    datasety = [];
    setx = [];
    residualtrace = [];
    cookstrace = [];

     Plotly.newPlot('myPlot2',residualtrace);
     Plotly.newPlot('myPlot3',cookstrace);


    var layout = {
      xaxis: {range: [-20, 20]},
      yaxis: {range: [-20, 20]},
      title:'Click on the plot to add more data points'
    };

    Plotly.newPlot('myPlot', traces, layout, {hovermode: 'closest'});

    Number.prototype.between = function(min, max) {
      return this >= min && this <= max;
    };

};


function openCity(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}


document.getElementById("defaultOpen").click();

function main(){
    initGuidance(["myPlot","q1","q2"]);

}

$(document).ready(main);