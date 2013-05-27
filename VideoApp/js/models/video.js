Video.VideoEle = DS.Model.extend({
    titleName: DS.attr('string'),
    src: DS.attr('string'),
    fileExt: DS.attr('string')
});

Video.VideoEle.FIXTURES = [];
