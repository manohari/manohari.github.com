Video.videoController = Ember.Controller.extend({

});

Video.playListController =  Ember.ArrayController.create({
    videoTags : [],
    addVideo : function (ele) {
        var files, loop, reader, self = this;
        files = ele.target.files;
        for(loop = 0; loop < files.length; loop += 1) {
            reader = new FileReader();
            reader.onload = function(e) {
                self.videoTags.pushObject(Video.videoView);
            };
            reader.readAsDataURL(files[loop]);
        }
        //console.log(this.videoTags);
    }
});

Video.listItemController = Ember.Object.extend({
        tagName : 'div'
})
