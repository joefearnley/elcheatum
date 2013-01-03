/**
 * Main javascript file for elcheatum.com
 *
 * @author Joe Fearnley
 */
(function($){

  var Photo = Backbone.Model.extend({});

  var PhotoList = Backbone.Collection.extend({
    url: 'http://api.flickr.com/services/feeds/photos_public.gne?id=19111910@N00&tags=elcheatum&format=json&jsoncallback=?',
    parse: function(response) {
      return response.items;
    }
  });

  var PhotoView = Backbone.View.extend({
    el: $('#photos'),
    template: $('#photo-template').html(),
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
