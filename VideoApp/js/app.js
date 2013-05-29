window.Video = Ember.Application.create();
DragNDrop = Ember.Namespace.create();
Video.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});