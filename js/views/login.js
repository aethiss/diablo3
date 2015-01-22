/**
 * Created by aethiss on 22/01/15.
 */

define([
  "backbone",
  "text!template/login.html"
], function (Backbone, loginTemplate) {

  var LoginView = Backbone.View.extend({

    el: "#wrapper",
    template: _.template(loginTemplate),

    initialize: function(data) {

      // Remove presentation background
      this.$el.removeClass("startimage");
      this.$el.addClass("loadingimage");

      this.render();
    },

    render: function () {

      var self = this;
      this.$el.html(this.template({}));
      setTimeout(function () {
        self.afterRender(); self.playSong();
      }, 5);

      return this;
    },

    playSong: function() {
      document.getElementById("tristsong").play();
    },

    afterRender: function() {

      var imgfade = $("#imgload");
      var self = this;

      imgfade.fadeIn(2500, function() {
      imgfade.fadeOut(2500);
        self.afterRender();
      });

    }

  });

  return LoginView;
});