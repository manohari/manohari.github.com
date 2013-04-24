var images,lightbox,imgs,lbDiv;
images = ['images/image-3.jpg','images/image-4.jpg','images/image-5.jpg','images/image-6.jpg'];
lightbox = new Lightbox('imageRow',images);
imgs = document.getElementById("qunit-fixture").getElementsByTagName("img");
lightbox.createOverlay(imgs[0]);
test("Image Gallery", function() {	
	equal(imgs[0].dataset.imgid, 0);
	equal(imgs[1].dataset.imgid, 1);
	equal(imgs[2].dataset.imgid, 2);
	equal(imgs[3].dataset.imgid, 3);	
});

test("Image Gallery create overlay", function() {	
	var prevNav,nextNav,overlayImg;	
	preNav = document.getElementsByTagName('nav')[0];	
	equal(preNav.className, 'leftNav');	
	nextNav = document.getElementsByTagName('nav')[1];	
	equal(nextNav.className, 'rightNav');
	overlayImg = document.getElementsByTagName('img')[4];
	equal(overlayImg.dataset.navImg,0);
});

test("Image Gallery Navigation", function() {
	var nextButton,prevButton;
	nextButton = document.getElementsByTagName('button')[1];
	equal(nextButton.className,'next');
	prevButton = document.getElementsByTagName('button')[0];
	equal(prevButton.className,'prev');
});

test("Image Gallery Close function", function() {
	var closeButton,lb;
	closeButton = document.getElementsByTagName('button')[2];
	equal(closeButton.className,'close');	
	lightbox.close(closeButton);
	lb  = document.getElementById('lightbox');
	equal(lb,null);
	
});
