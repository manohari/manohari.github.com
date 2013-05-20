Video.videoView = Ember.View.extend({
    tagName : "source",
    src : 'pass-countdown.ogg',
    type : 'video/ogg',
    classNames : 'videoFile',
    attributeBindings : "src type classNames".w()
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

Video.addFileTag = Ember.View.extend({
    tagName : "input",
    type: 'file',
    multiple : true,
    classNames : 'addFiles',
    attributeBindings: "type multiple classNames".w(),
    change: function(evt) {
        evt.preventDefault();
        this.get('controller').addVideo(evt,0);
    }
});

Video.DropTarget = Ember.View.extend(DragNDrop.Droppable);

Video.SearchTextField = Em.TextField.extend({
    insertNewline: function(){

        Video.playListController.loadNames();
    }
});