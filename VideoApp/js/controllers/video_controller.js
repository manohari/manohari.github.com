Video.videoController = Ember.Controller.extend({

});

Video.playListController =  Ember.ArrayController.create({
    addVideo : function (ele) {
        var files, loop, reader, vele, self = this,fileType;
        files = ele.target.files;
        for(loop = 0; loop < files.length; loop += 1) {
            fileType = files[loop].type;
            if(fileType.match('video/webm') || fileType.match('video/mp4') || fileType.match('video/ogg')) {
                reader = new FileReader();
                reader.onload = function(e) {
                    vele = Video.VideoEle.create({
                        src : e.target.result,
                        id : loop,
                        fileExt : fileType
                   });
                   self.pushObject(vele);
                };
                reader.readAsDataURL(files[loop]);
            }
        }

    }
});

DragNDrop.cancel = function(event) {
    event.preventDefault();
    return false;
};

