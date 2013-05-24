describe ("Video Play Tests", function(){
    var view,controller;
    beforeEach(function () {
        Ember.run(function () {
            var model = Video.VideoEle;
            controller = Video.playListController;
            view = Video.VideoView.create();
            view.append(); // Hook up to our document.;
        });
    });
    afterEach(function () {
        Ember.run(function () {
            view.remove(); // Unhook from our document.
        });
    });
    it ("Video player test case", function(){
        expect(view.$('source')).toBeTruthy();
        expect(view.$('source').context.src).toEqual('http://127.0.0.1:8020/VideoApp/pass-countdown.ogg');
        expect(view.$('source').context.type).toEqual('video/ogg');
    });

});

describe ("Video PlayList", function(){
    var view,playListController,model;
    beforeEach(function () {
        Ember.run(function () {
            playListController = Video.playListController;
            view = Video.PlayListSecView.create();
            view.append(); // Hook up to our document.
        });
    });
    afterEach(function () {
        Ember.run(function () {
            view.remove(); // Unhook from our document.
        });
    });
    it ("PlayList section tag", function(){
        expect(view.tagName).toEqual('section');
    });

    it ("Add Videos", function(){
        //playListController.addVideo();

    });
    it ("Remove Videos", function(){
        playListController.removeVideo();

    });

});