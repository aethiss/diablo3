/**
 * Created by aethiss on 22/01/15.
 */

require.config({
  paths: {
    underscore: 'libs/underscore/underscore-1-7-0',
    backbone: 'libs/backbone/backbone-1-1-2',
    text: 'libs/require/text',
    'echo': 'libs/echo/echo'
  },
  // Help RequireJS load Backbone and Underscore.
  shim: {
    backbone: {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    underscore: {
      exports: "_"
    }
  }

});

define([
  "jquery",
  "underscore",
  "echo",
  "backbone",
  "views/login"
  ],
  function ($, _, Echo, Backbone,
    loginView
  ) {

    window.App = {
      userLogged: false,
      Router: {},
      Redirect: false,
      Views: {}
    };

    var currentView = undefined;
    var setupView = function (view, data) {
      if (currentView) {
        currentView.stopListening();
        currentView.remove();
        // re-attach correct div
        LoadView(view, data);
      } else {
        LoadView(view, data);
      }
    }

    var LoadView = function(view, data) {
      //console.log("Load View", loadDate(), view);
      currentView = new view({
        data: data
      });
    }


    var Router = Backbone.Router.extend({
      routes: {
        "": "index",
        "/": "index",
        "login": "login"
      },

      index: function () {
        console.log("index start...");
      },
      login: function () {
        setupView(loginView, false);
      }
    })

    App.Views.ListView = Backbone.View.extend({

      el: "body",
      events: {
        "click .start": "mouseOnStart"
      },

      initialize: function() {

        // bind esc button
        $(document).keyup(function(e) {
          //if (e.keyCode == 13) $('.save').click();     // enter
          if (e.keyCode == 27) window.location.href = "http://local.diablo3.com:8888/" // esc
        });

        this.initializeRouter();
      },

      initializeRouter: function () {
        App.Router = new Router();
        Backbone.history.start({ pushState: true, root: "/" });
      },

      mouseOnStart: function(e) {
        console.log($(e.currentTarget));

        var el = document.body
          , rfs = // for newer Webkit and Firefox
            el.requestFullScreen
            || el.webkitRequestFullScreen
            || el.mozRequestFullScreen
            || el.msRequestFullscreen
          ;
        if(typeof rfs!="undefined" && rfs){
          rfs.call(el);
        } else if(typeof window.ActiveXObject!="undefined"){
          // for Internet Explorer
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript!=null) {
            wscript.SendKeys("{F11}");
          }
        }

        window.App.Router.navigate("login", {trigger: true, replace: true});
      }


    });
    var view = new App.Views.ListView();


  }
);