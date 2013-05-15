Video.Router.map(function() {
    "use strict";
    this.route('video');
    this.route('addFile')
});

Video.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('video');
  }
});


