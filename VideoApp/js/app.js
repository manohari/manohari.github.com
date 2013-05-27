window.Video = Ember.Application.create();
DragNDrop = Ember.Namespace.create();
Video.store = DS.Store.create({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});