var settings = {
  async: true,
  crossDomain: true,
  url: 'https://ia9gfvlp4h.execute-api.us-east-1.amazonaws.com/qa/history',
  method: 'POST',
  processData: false,
  data: JSON.stringify({
    deviceID: 'sensorKolkata',
    timestamp: '1515825250133'
  })
};

$(document).ready(function() {
  console.log('ready!');
  showTrends();
});

var showTrends = function() {
  var series = [];
  var COSeries = [];
  var NO2Series = [];
  var NH3Series = [];
  var O3Series = [];
  var buildSeries = function(data) {
    var SO2SeriesObject = {
      name: 'SO2 Gas',
      data: []
    };
    var COSeriesObject = {
      name: 'CO Gas',
      data: []
    };
    var NO2SeriesObject = {
      name: 'NO2 Gas',
      data: []
    };
    var NH3SeriesObject = {
      name: 'NH3 Gas',
      data: []
    };
    var O3SeriesObject = {
      name: 'O3 Gas',
      data: []
    };

    if (data.length > 0) {
      data.map(function(datum) {
        var tempSO2 = [new Date(datum.timestamp * 1000).toString(), datum.data.readings.GAS_SO2.value];
        var tempCO = [new Date(datum.timestamp * 1000).toString(), datum.data.readings.GAS_CO.value];
        var tempNO2 = [new Date(datum.timestamp * 1000).toString(), datum.data.readings.GAS_NO2.value];
        var tempNH3 = [new Date(datum.timestamp * 1000).toString(), datum.data.readings.GAS_NH3.value];
        var tempO3 = [new Date(datum.timestamp * 1000).toString(), datum.data.readings.GAS_03.value];

        SO2SeriesObject.data.push(tempSO2);
        COSeriesObject.data.push(tempCO);
        NO2SeriesObject.data.push(tempNO2);
        NH3SeriesObject.data.push(tempNH3);
        O3SeriesObject.data.push(tempO3);
      });
      series.push(SO2SeriesObject);
      COSeries.push(COSeriesObject);
      NO2Series.push(NO2SeriesObject);
      NH3Series.push(NH3SeriesObject);
      O3Series.push(O3SeriesObject);
    } else {
      alert('could not plot chart as data are inadequate');
    }
  };

  $.ajax(settings).done(function(response) {
    console.log(response);
    response = JSON.parse(response);
    buildSeries(response.data);
    console.log(JSON.stringify(series));
    Highcharts.chart('container', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Trend Analysis'
      },
      subtitle: {
        text: 'Irregular timedata GAS values'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Quantity (ppb)'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} ppb'
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },

      series: series
    });

    /*---------CO2----------------------*  */

    Highcharts.chart('container2', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Trend Analysis'
      },
      subtitle: {
        text: 'Irregular timedata GAS values'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Quantity (ppb)'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} ppb'
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },

      series: COSeries
    });

    /*---------CO----------------------*/

    Highcharts.chart('container3', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Trend Analysis'
      },
      subtitle: {
        text: 'Irregular timedata GAS values'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Quantity (ppb)'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} ppb'
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },

      series: NO2Series
    });

    /*---------------------------------------------*/

    /*---------O3----------------------*/

    Highcharts.chart('container4', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Trend Analysis'
      },
      subtitle: {
        text: 'Irregular timedata GAS values'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Quantity (ppb)'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} ppb'
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },

      series: NH3Series
    });

    /*---------O3----------------------*/

    Highcharts.chart('container5', {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Trend Analysis'
      },
      subtitle: {
        text: 'Irregular timedata GAS values'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          // don't display the dummy year
          month: '%e. %b',
          year: '%b'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        title: {
          text: 'Quantity (ppb)'
        },
        min: 0
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} ppb'
      },

      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },

      series: O3Series
    });
  });
};
/*---------------------------------------------*/

/*function for select list from dropdown*/
function deviceList() {
  var devicelist = '',
    flag = 0;

  $.ajax({
    url: 'https://ia9gfvlp4h.execute-api.us-east-1.amazonaws.com/qa/devices',
    type: 'GET',
    data: {},
    dataType: 'json',
    success: function(response) {
      console.log(response);
      devicelist = '<option value="0" selected>select Device ID</option>';
      $.each(response.data, function(k, v) {
        devicelist += '<option value="' + v.device_id + '">' + v.device_id + '</option>';
        //alert(v.device_id);
      });

      $('#device').html(devicelist);
      //$("#city-button").find("span").text(currentcityname);
    },
    error: function() {
      // ShowMsg('error in citylist()..');
    }
  });
}
function selectDevice(elm) {
  //alert(v);

  var devid = $(elm).val();
  console.log(devid);
  var timestamp = $.now();

  settings.data = JSON.stringify({
    deviceID: devid,
    timestamp: '1515825250133'
  });
  $('#container').html('');

  showTrends();
  
}
