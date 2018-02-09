function initMap() {
      }
function fetchLocation()
{
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://ia9gfvlp4h.execute-api.us-east-1.amazonaws.com/qa/location",
      "method": "POST",
      "processData": false,
      "data": "{\"deviceID\":\"sensorKolkata\"}"
}

$.ajax(settings).done(function (response) {
   response = JSON.parse(response);
    console.log(response.status);
    if (response.status == 1)
        {
          console.log((response.data[0].gps_lat).length);
             console.log(response.data[0].gps_lon);
            var llat=(response.data[0].gps_lat).substring(0,(response.data[0].gps_lat).length-1);
            var llon=(response.data[0].gps_lon).substring(0,(response.data[0].gps_lon).length-1);
            //console.log(llat.toString+"  "+llon.toString); 
           
            var aa = {lat: Number(llat), lng: Number(llon), deviceId: response.data[0].device_id};
            var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            fullscreenControl:true,
            center: aa,
            
        });

        var contentString = '<button onclick=getDevId(\''+response.data[0].device_id+'\')>Click me</button>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });

        var marker = new google.maps.Marker({
          position: aa,
          map: map,
          title: aa.deviceId
        });
        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
            
            
            
           /* var markersData = [
            {
              lat: llat,
              lng: llon,

            }]; 

            // creating markers with createMarker function
            function displayMarkers(){

               // this variable sets the map bounds and zoom level according to markers position
               var bounds = new google.maps.LatLngBounds();

           // For loop that runs through the info on markersData making it possible to createMarker function to create the markers
           for (var i = 0; i < markersData.length; i++){

              var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);

              var createMarker(latlng);

              // Marker’s Lat. and Lng. values are added to bounds variable
              bounds.extend(lat lng); 
           }

           // Finally the bounds variable is used to set the map bounds
           // with API’s fitBounds() function
           map.fitBounds(bounds);
        }
            
          // This function creates each marker and sets their Info Window content
        function createMarker(latlng){
           var marker = new google.maps.Marker({
              map: map,
              position: latlng,
              title: name
           });

           // This event expects a click on a marker
           // When this event is fired the infowindow content is created
           // and the infowindow is opened
           google.maps.event.addListener(marker, 'mouseover', function() {

              // Variable to define the HTML content to be inserted in the infowindow
              var iwContent = '<div id="iw_container">' +
              '<div class="iw_title">' + name + '</div>' +
              '<div class="iw_content">' + address1 + '<br />' +
              address2 + '<br />' +
              postalCode + '</div></div>';

              // including content to the infowindow
              infoWindow.setContent(iwContent);

              // opening the infowindow in the current map and at the current marker location
              infoWindow.open(map, marker);
           });
        } */ 
            
            
  
            
      }
    
        
});
    
}

function getDevId(idd)
{
    localStorage.setItem("deviceId",idd);
    window.location.href='dashboard.html';
}
