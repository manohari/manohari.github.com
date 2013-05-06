var ip, drag, img, outputEle, imgDisplay, overlayEle, imgView, sectionEle, imgModleObj;
sectionEle = document.getElementsByTagName("section")[0];
imgDisplay =new ImageGalleryController();
imgView = new ImageGalleryView(imgDisplay);
test("Image Gallery components", function() {
    "use strict";
    ip = document.getElementsByTagName("input")[0].type;
    notEqual(ip, 'file','Input file tag not yet created');

    drag = document.getElementById("drop_zone");
    notEqual(drag, 'drop_zone','Drag and drop object not yet created');

    img = document.getElementsByTagName("img")[0];
    equal(img,null,'No image Tags exist');
});

test("Image Gallery components", function() {
    "use strict";
    var fileSec, fileEle, divEle, drag, dragDropEle;

    fileSec = imgView.createEle("section","uploadFile");
    imgView.addElement(sectionEle, fileSec);

    fileEle = imgView.createFileElement();
    imgView.addElement(fileSec,fileEle);
    equal(fileEle.type, 'file','Input file tag created');

    divEle = imgView.createEle("div", "dragdrop");
    imgView.addElement(sectionEle, divEle);

    drag = document.getElementById("drop_zone");
    equal(drag, null,'Drag and drop not yet created');

    dragDropEle = imgView.createDragDropEle();
    imgView.addElement(divEle, dragDropEle);

    drag = document.getElementById("drop_zone");
    equal(dragDropEle.id, 'drop_zone','Drag and drop created');

    img = document.getElementsByTagName("img")[0];
    equal(img,undefined,'Image Tags not yet exist');

    overlayEle = document.getElementById("overlayElement");
    equal(overlayEle.className, 'overlayElement', 'Lightbox div exist');
});
test("Image Gallery components", function(e) {
    "use strict";
    var outputTag, outputEle, imgTag, imgPath, lightbox;
    sectionEle = document.getElementsByTagName("section")[0];

    outputEle = document.getElementById('list');
    equal(outputEle,null, "output tag doesnt exist");

    outputTag = imgView.createOutputEle();
    imgView.addElement(sectionEle, outputTag);
    outputEle = document.getElementById('list');
    equal(outputTag.id,'list', "output tag exist");

    imgPath = '../images/image-4.jpg';
    imgTag = document.createElement("img");
    imgTag.src = imgPath;
    imgTag.className = "thumb";
    imgTag.title = 'image-4.jpg';
    imgTag.dataset.imgid = 0;
    outputTag.appendChild(imgTag);

    equal(imgTag.dataset.imgid,0, "one image is updated");
    imgDisplay.handleLightBoxEvent(e);

    overlayEle = document.getElementById("overlayElement");
    equal(overlayEle.style.display, 'block', "Lightbox layer shown");
    lightbox = new Lightbox('list');
    lightbox.createOverlay(imgTag);
});