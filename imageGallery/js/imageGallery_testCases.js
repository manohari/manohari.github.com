var ip, drag, img, outputEle, imgDisplay, overlayEle;
imgDisplay =new imageGalleryController();
test("Image Gallery components", function() {
    ip = document.getElementsByTagName("input")[0].type;
    notEqual(ip, 'file','Input file tag not yet created');
    drag = document.getElementById("drop_zone");
    notEqual(drag, 'drop_zone','Drag and drop object not yet created');
    img = document.getElementsByTagName("img")[0];
    equal(img,null,'No image Tags exist');
});

test("Image Gallery components", function() {
    imgDisplay.showForm();
    ip = document.getElementById("files").type;
    equal(ip, 'file','Input file tag created');
    drag = document.getElementById("drop_zone");
    notEqual(drag, 'drop_zone','Drag and drop created');
    img = document.getElementsByTagName("img")[0];
    equal(img,undefined,'Image Tags not yet exist');
    
    overlayEle = document.getElementById("overlayElement");
    equal(overlayEle.className, 'overlayElement', 'Lightbox div exist');
});
test("Image Gallery components", function(e) {
    var imgEle, outputEle, imgTag, imgTag, imgPath, imgModleObj, lightbox;
    imgDisplay.showForm();
    outputEle = document.getElementById('list');
    notEqual(outputEle,undefined, "output tag exist");
    imgPath = '../Fancybox/images/image-4.jpg';
    imgTag = document.createElement("img");
    imgTag.src = imgPath;
    imgTag.className = "thumb";
    imgTag.dataset.imgid = 0;
    outputEle.appendChild(imgTag);
    imgEle = document.getElementsByTagName("img")[0];
    equal(imgEle.dataset.imgid,0, "one image is updated");
    
    imgModleObj = new imageGalleryModel();
    imgDisplay.handleLightBoxEvent(e);
    overlayEle = document.getElementById("overlayElement");
    equal(overlayEle.style.display, 'block', "Lightbox layer shown");
    lightbox = new Lightbox('list');
    lightbox.createOverlay(imgEle);
});