Video.videoView = Ember.View.extend({
    tagName : "source",
    src : 'pass-countdown.ogg',
    type : 'video/ogg',
    attributeBindings : 'src type'.w()
});

Video.playListSecView = Ember.View.extend({
  tagName: 'section',
  classNames: ['playlsit']
});

Video.outputTag = Ember.View.extend({
    tagName : 'output',
    id : ['videoList'],
    classNames : ['videoList']
});

Video.addFileTag = Ember.TextField.extend({
    type: 'file',
    multiple : true,
    attributeBindings: "multiple".w(),
    change: function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.get('controller').addVideo(evt);
    }
});

