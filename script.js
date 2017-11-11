var api="https://fcc-weather-api.glitch.me//api/current?";
var lat,lon;
$( document ).ready(function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          var lon = "lon=" + position.coords.longitude;
          var lat = "lat="+ position.coords.latitude;
          getInformation(lat,lon);
        });
    } else { 
        var lon = "Geolocation is not supported by this browser.";
    }
     });

function getInformation(lon,lat) {
  var urlString = api+lon+"&"+lat;
  $.ajax({
     url:urlString,
    success: function(result){
       $("#city").text(result.name+", " + result.sys.country);
       $("#wind").text("Wind:"+result.wind.speed +"km/h");
      $("#humidity").text("Humidity:"+result.main.humidity +"%");
       $("#cloudy").text("Cloudness:"+result.clouds.all +"%");
     $("#icon").text(result.weather[0].main);   
    getIcon(result.weather[0].main);
       $("#temp").text(result.main.temp+"°C"); 
       $("#button2").click(function(){
         $("#temp").text((result.main.temp*1.8)+32+"°F");
         $("#button2").css("opacity","1");
         $(".button").css("opacity","0.5");
           });
       $(".button").click(function(){
         $("#temp").text(result.main.temp+"°C");
         $("#button2").css("opacity","0.5");
         $(".button").css("opacity","1");
           });
  }  
      });
}

function getIcon(a){
   $('div.' + a).removeClass('hide');
}

function toFahrenheit(f) {
    return (f*1.8)+32;
}
