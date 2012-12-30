/**
 * Main javascript file for elcheatum.com
 *
 * @author Joe Fearnley
 */

(function($){

  var flickrSearchApi = {
    key: '802074e4a7efce70a34ac2e985cc928d',
    userId: '19111910%40N00',
    method: 'flickr.photos.search',
    tag: 'elcheatum',
    baseUrl: 'http://api.flickr.com/services/rest/'
  };

  var Photo = Backbone.Model.extend({});

  var PhotoList = Backbone.Collection.extend({
    model: Photo,
    url: 'http://api.flickr.com/services/feeds/photos_public.gne',
    parse: function(response) {
      //var results = {
      //  status: response.stat,
      //  photos: response.photos.photo
      //};
      return response;
    }
  });

  var PhotoView = Backbone.View.extend({
    el: $('#container'),
    template: $('#pic-template'),
    initialize: function() {
      this.collection = new PhotoList();

      this.loadData();
    },

    loadData: function() {
      var that = this;
      this.collection.fetch({
        data: {
          /*
          method: 'flickr.photos.search',
          api_key: '802074e4a7efce70a34ac2e985cc928d',
          tags: 'elcheatum',
          format: 'json',
          nojsoncallback: 1
         */
          tags: elcheatum,
          tagmode: any,
          format=json&jsoncallback=?
        },
        success: function(results) {

//          var status = results.models[0].attributes.status;
//          var photos = results.models[0].attributes.photos

          // check status and show error view if encountered.....
//          if(status == 'fail') {
//            console.log('API call failed');
//          } else if(status == 'ok') {
//            console.log('API call was a success');
//          }

          //$.each(photos, function(i, photo) {
          //  console.log('http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg');
          //});
          
          console.log(results.models);
          that.render(results.models);
        },
        error: function(response) {
          console.log('collection fetch was a failure');
        }
      });

    },
    render: function(photos) {
      var html = Mustache.to_html(this.template, photos);
      $(this.el).html(html);
      return this;

    }
  });

  var photoView = new PhotoView();

})(jQuery);
