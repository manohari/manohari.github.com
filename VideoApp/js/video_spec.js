describe ("Video Play Tests", function(){
    var view,controller;
    beforeEach(function () {
        Ember.run(function () {
            controller = App.VideosController.create({
                // We need a container to test views with linkTo.
                container: App.__container__,
                content: model
            });
            view = App.VideoView.create({
                    controller: controller,
                    context: controller
                });
            view.append(); // Hook up to our document.
        });
    });
    afterEach(function () {
        Ember.run(function () {
            view.remove(); // Unhook from our document.
        });
    });
    it ("Create Video Tag Page", function(){
        view.$('h2').should.have.text('Video');
        //div that has video tag embeded in it
        expect(view.$('.showVideos')).toBeTruthy();
        view.$('video').should.match('/video/');
    });

});

describe ("Video PlayList", function(){
    var view,playListController,model;
    beforeEach(function () {
        Ember.run(function () {
            model = App.Videos.find(1);
            playListController = App.VideosPlayListController.create({
                // We need a container to test views with linkTo.
                container: App.__container__,
                content: model
            });
            view = App.VideoPlayListView.create({
                    controller: playListController,
                    context: controller
                });
            view.append(); // Hook up to our document.
        });
    });
    afterEach(function () {
        Ember.run(function () {
            view.remove(); // Unhook from our document.
        });
    });
    it ("PlayList", function(){
        view.$('.headingPlayList').should.have.text('Video Playlist');
        //div that has video tags
        expect(view.$('.playVideo')).toBeTruthy();
        view.$('video').should.match('/video/');

    });

    it ("Add Videos", function(){
        playListController.addVideos();

    });
    it ("Remove Videos", function(){
        playListController.removeVideos();

    });
    it ("Shuffle Videos", function(){
        playListController.reoderVideos();

    });
});