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
    url: 'http://api.flickr.com/services/feeds/photos_public.gne?tags=elcheatum&tagmode=any&format=json&jsoncallback=?',
    parse: function(response) {
      return response.items;
    }
  });

  var PhotoView = Backbone.View.extend({
    el: $('#photos'),
    template: $('#photo-template'),
    initialize: function() {
      this.collection = new PhotoList();

      this.render();
    },

    render: function() {
      var that = this;
      this.collection.fetch({
        success: function(results) {
          $.each(results.models, function(i, photo) {
            //console.log(photo.toJSON());
            that.renderPhoto(photo.toJSON());
          });
        },
        error: function(response) {

          //  Render error view here.
          console.log('collection fetch was a failure');
        }
      });

    },
    renderPhoto: function(photo) {
      var html = Mustache.to_html(this.template, photo);
      $(this.el).append(html);
      return this;
    }
  });

  var photoView = new PhotoView();

})(jQuery);
