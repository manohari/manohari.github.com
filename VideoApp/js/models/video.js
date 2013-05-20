Video.VideoEle = DS.Model.extend({
    titleName: DS.attr('string'),
    src : DS.attr('string'),
    divNum : DS.attr('number'),
    fileExt : DS.attr('string')
});