// DOMContentLoaded is fired once the document has been loaded and parsed,
// but without waiting for other external resources to load (css/images/etc)
// That makes the app more responsive and perceived as faster.
// https://developer.mozilla.org/Web/Reference/Events/DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {

  // We'll ask the browser to use strict code to help us catch errors earlier.
  // https://developer.mozilla.org/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
  'use strict';

  var translate = navigator.mozL10n.get;

  // We want to wait until the localisations library has loaded all the strings.
  // So we'll tell it to let us know once it's ready.
  navigator.mozL10n.once(start);

  // ---

  function start() {

    var message = document.getElementById('message');

    // We're using textContent because inserting content from external sources into your page using innerHTML can be dangerous.
    // https://developer.mozilla.org/Web/API/Element.innerHTML#Security_considerations
    message.textContent = translate('message');



  }



  // GEOLOCATION
var geolocation = document.querySelector("#geolocation"),
geolocationDisplay = document.querySelector("#geolocation-display");
if (geolocation && geolocationDisplay) {
geolocation.onclick = function () {
navigator.geolocation.getCurrentPosition(function (position) {
geolocationDisplay.innerHTML = "<strong>Latitude:</strong> " + position.coords.latitude + ", <strong>Longitude:</strong> " + position.coords.longitude;
geolocationDisplay.style.display = "block";



  
if  (document.getElementById('google').checked) {

// GOOGLE IMG
   /*var img = new Image();
    img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=13&size=300x300&sensor=false";
   document.getElementById('image').src = img.src;*/
  /*geolocationDisplay.appendChild(img);*/ //NON SERVE 
  
var map = new OpenLayers.Map({
        div: "map",
        allOverlays: true
    });

    var osm = new OpenLayers.Layer.OSM();
    var gmap = new OpenLayers.Layer.Google("Google Streets", {visibility: false});

    // note that first layer must be visible
    map.addLayers([osm, gmap]);

    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.zoomToMaxExtent();



  
  



  

}

  
// END OF GOOGLE IMG


// MAPQUEST
  
else if  (document.getElementById('mapquest').checked) {

 var options={
          elt:document.getElementById('map'),        
          zoom:13,                                   
          latLng:{lat:43.0059, lng:12.6000},   
          mtype:'osm'  
	  };

	      var map = new MQA.TileMap(options);
        MQA.withModule('directions', function() {

          map.addRoute([
            {latLng: {lat:position.coords.latitude, lng:position.coords.longitude}},
            {latLng: {lat:43.0059, lng:12.6000}}
          ]);
        });
} 
 
// FINE MAPQUEST
  
else if (document.getElementById('skobbler').checked) {  

//  SKOBBLER
    var map = L.skobbler.map('map', {
        apiKey: 'bc7b4da77e971c12cb0e069bffcf2771',

        mapStyle: 'day',
        bicycleLanes: true,
        onewayArrows: true,
        pois: 'all',
        primaryLanguage: 'en',
        fallbackLanguage: 'en',
        mapLabels: 'localNaming',
        retinaDisplay: 'auto',

        zoomControl: true,
        zoomControlPosition: 'top-left',

        center: [position.coords.latitude, position.coords.longitude],
        zoom: 12,
        /*transport: 'pedestrian',
				start:  [position.coords.latitude, position.coords.longitude],
				nonReachable: 1,
				range: 200,
				units: 'Meter',
				response_type: 'gps',
        startCoordinate: [position.coords.latitude, position.coords.longitude],
        destinationCoordinate: [43.0059, 12.6000]*/
      
      
    }); 
	 var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
   marker.bindPopup("This is where you are. And this is the area where you can get in 5 minutes by walking.", { offset: new L.Point(-1, -41) }).openPopup();
 
  //  END OF SKOBBLER
}
},
function () {
geolocationDisplay.innerHTML = "Failed to get your current location";
geolocationDisplay.style.display = "block";
});
};
}




});
