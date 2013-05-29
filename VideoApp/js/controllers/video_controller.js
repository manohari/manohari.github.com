DragNDrop.cancel = function(event) {
    event.preventDefault();
    return false;
};
DragNDrop.Droppable = Ember.Mixin.create({
    dragEnter: DragNDrop.cancel,
    dragOver: DragNDrop.cancel,
    drop: function(event) {
        event.preventDefault();
        this.get('controller').addVideo(event,1);
        return false;
    }
});


DragNDrop.DroppableVideo = Ember.Mixin.create({
    dragEnter: DragNDrop.cancel,
    dragOver: DragNDrop.cancel,
    drop: function(event) {
        event.preventDefault();
        $('.videoFile')[0].src = $('.titles').val();
        return false;
    }
});
DragNDrop.Dragable = Ember.Mixin.create({
    attributeBindings: 'draggable',
    draggable: 'true',
    dragStart: function(event) {
        var dataTransfer = event.originalEvent.dataTransfer;
        dataTransfer.setData('Text', this.get('elementId'));
    }
});
Video.PlayListController =  Ember.ArrayController.extend({
    content : [],
    addVideo : function (ele,opt) {
        var files, loop, reader, self = this, fileData, vele;
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
                                        fileExt: f.type
                                   });
                    };
                })(files[loop],loop);
                reader.readAsDataURL(files[loop]);
            }
        }

       // console.log(this);

    },
    removeVideo : function (rec) {
        this.removeObject(rec);
    },
    loadNames : function() {
        var item, titleName,vele;
        titleName = this.get('titleName');
        vele = this.filterProperty('titleName',titleName);
        this.set('content',vele);
    }

});

