Video.Router.map(function() {
    "use strict";
    this.route('video'); //This is the default route
    this.route('playList');
});

Video.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('video');
  }
});