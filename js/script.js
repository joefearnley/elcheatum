/**
 * Main javascript file for elcheatum.com
 *
 * @author Joe Fearnley
 */

$(document).ready(function() {
  $('#generate').click(function() {
    $("#photo").html('<img src="images/loading.gif" />');
    
    var flickrApiKey = '802074e4a7efce70a34ac2e985cc928d';
    var flickrUserId = '19111910%40N00';
    var flickrApiMethod = 'flickr.photos.search';
    var flickrTag = 'elcheatum';
    var url = 'http://api.flickr.com/services/rest/?method='+flickrApiMethod+
              '&api_key='+flickrApiKey+
              '&user_id='+flickrUserId+
              '&tags='+flickrTag+
              '&format=json&nojsoncallback=1';
    var html = '';
    var photos = [];

    $.getJSON(url, function(photoRsp) {
      if(photoRsp.stat == "ok") {
        var r = Math.ceil(Math.random()*(photoRsp.photos.total-1));
        try {
          photos = photoRsp.photos.photo;

          url = 'http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key='+flickrApiKey+'&photo_id='+photos[r].id+'&format=json&nojsoncallback=1';

          $.getJSON(url, function(sizeRsp) {
            if(sizeRsp.stat == "ok") {
              var r = Math.ceil(Math.random()*(photoRsp.photos.total-1));
                try {
                  var sizeData = sizeRsp.sizes.size[5];
                  var html ='<a href="http://www.flickr.com/photos/joefearnley/'+photos[r].id+'/" title="'+photos[r].title+'"><img src="'+sizeData.source+'" width="'+sizeData.width+'" height="'+sizeData.height+'" alt="El Cheatum"></a>';
                } catch(e) {
                   console.log("Error accessing flickr size data: " + e.message);
                }
            } else if(sizeRsp.stat == "fail") {
              html = "Flickr Error: " + sizeRsp.message;
            }

            $("#photo").html(html);
          });

        } catch(e) {
          console.log("Error accessing flickr photo data: " + e.message);
        }

      } else if(photoRsp.stat == "fail"){
        $("#photo").html("Flickr Error: " + photoRsp.photos.message);
      }
    });
  });
});

function updatePhoto() {

}
