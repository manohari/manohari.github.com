Video.Router.map(function() {
    "use strict";
    this.route('video');
});

Video.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('video');
  }
});

