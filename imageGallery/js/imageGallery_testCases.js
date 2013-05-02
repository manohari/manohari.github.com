var ip,drag,img;
test("Image Gallery components", function() {
    ip = document.getElementsByTagName("input")[0].type;
    notEqual(ip, 'file','Input file tag not yet created');
    drag = document.getElementById("drop_zone");
    notEqual(drag, 'drop_zone','Drag and drop object not yet created');
    img = document.getElementsByTagName("img")[0];
    equal(img,null,'No image Tags exist');
});

test("Image Gallery components", function() {
    var imgDisplay =new imageGalleryController();
    imgDisplay.showForm();
    ip = document.getElementById("files").type;
    console.log(document.getElementById("files"));
    equal(ip, 'file','Input file tag created');
    drag = document.getElementById("drop_zone");
    notEqual(drag, 'drop_zone','Drag and drop created');
    img = document.getElementsByTagName("img")[0];
    equal(img,undefined,'Image Tags not yet exist');
});