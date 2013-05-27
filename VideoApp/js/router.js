Video.Router.map(function() {
    "use strict";
    this.route('playList',{path:"/playList"});
});

Video.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('playList');
  }
});
Video.PlayListRoute = Ember.Route.extend({
  model: function () {
    return Video.VideoEle.find();
  }

});
