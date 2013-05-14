Video.videoView = Ember.View.extend({
    tagName : "source",
    src : 'pass-countdown.ogg',
    type : 'video/ogg',
    attributeBindings : 'src type'.w()
});

Video.playListView = Ember.View.extend({
  tagName: 'section',
  classNames: ['playlsit']
});

