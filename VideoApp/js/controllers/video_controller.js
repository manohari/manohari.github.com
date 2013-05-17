Video.videoController = Ember.Controller.extend({

});

Video.playListController =  Ember.ArrayController.create({
    content : [],
    vele : null,
    addVideo : function (ele,opt) {
        var files, loop, reader, self = this, fileData;
        if(opt === 0) {
            files = ele.target.files;
        }
        else {
            files = ele.dataTransfer.files;
        }
        for(loop = 0; loop < files.length; loop += 1) {
            fileData = files[loop];
            var manu = fileData.name;
            if(fileData.type.match('video/webm') || fileData.type.match('video/mp4') || fileData.type.match('video/ogg')) {
                reader = new FileReader();
                reader.onload = (function(f) {
                    return function(e) {
                        vele = Video.VideoEle.create({
                                        titleName : f.name,
                                        src : e.target.result,
                                        fileExt : f.type,
                                        id : loop
                                   });
                         self.pushObject(vele);
                    };
                })(files[loop]);
                reader.readAsDataURL(files[loop]);
            }
        }

    },
    removeVideo : function (ele) {
        this.removeObject(ele);

    }
});
DragNDrop.cancel = function(event) {
    event.preventDefault();
    return false;
};
DragNDrop.Droppable = Ember.Mixin.create({
    dragEnter: DragNDrop.cancel,
    dragOver: DragNDrop.cancel,
    drop: function(event) {
        event.preventDefault();
        Video.playListController.addVideo(event,1);
        return false;
    }
});

