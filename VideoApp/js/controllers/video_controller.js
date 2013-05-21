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


Video.playListController =  Ember.ArrayController.create({
    content : [],
    vele : [],
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
            if(fileData.type.match('video/webm') || fileData.type.match('video/mp4') || fileData.type.match('video/ogg')) {
                reader = new FileReader();
                reader.onload = (function(f,num) {
                    return function(e) {
                        vele = Video.VideoEle.createRecord({
                                        titleName: f.name.split(".")[0],
                                        src: e.target.result,
                                        fileExt: f.type,
                                        divNum: num+1
                                   });
                         self.pushObject(vele);

                    };
                })(files[loop],loop);
                reader.readAsDataURL(files[loop]);
            }
        }

    },
    removeVideo : function (rec) {
        var deleVideo = this.get('model');
        //console.log(rec);
        this.removeObject(rec);
       // deleVideo.deleteRecord();
        //deleVideo.save();


    },
    loadNames : function() {
        var item, titleName,vele;
        titleName = this.get('titleName');
        vele = this.filterProperty('titleName',titleName);
        this.set('content',vele);
    }

});

