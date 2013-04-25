function Lightbox(divId,imageArray) {
	"use strict";
	this.divId = divId;
	this.imageArray = imageArray;
	this.init();
}

Lightbox.imageArray = [];

Lightbox.prototype.init = function() {
	"use strict";
	var i,parentDiv,newDiv,imgEle,imgDiv,_this=this;	
	parentDiv = document.getElementById(this.divId);
	// Registering click event
	parentDiv.addEventListener("click", function(e) {
						_this._handleEvent(_this, e);
						});
	this.createThumbNails();
						
};

Lightbox.prototype.createThumbNails = function() {
	"use strict";
	var imgLength,parentDiv,newDiv,i,imgDiv,imgEle;
	imgLength = this.imageArray.length;
	parentDiv = document.getElementById(this.divId);
	newDiv = document.createElement('section');
	newDiv.className = 'set';
	parentDiv.appendChild(newDiv);
	for (i = 0; i < imgLength; i+= 1) {	
		imgDiv = document.createElement('article');
		imgDiv.className = 'single';
		newDiv.appendChild(imgDiv);
		imgEle = document.createElement('img');
		imgEle.dataset.imgid = i;
		imgEle.src = this.imageArray[i];
		imgEle.className = 'thumbnail';	
		imgDiv.appendChild(imgEle);
	}
};

Lightbox.prototype._handleEvent = function(ligthboxObj, event) {
	"use strict";
	var _this=ligthboxObj,e,overlay;
	e = event.srcElement || event.target;
	document.getElementsByTagName('div')[1].style.display = 'block';
	if(e.tagName.toLowerCase() === 'img') {
		_this.createOverlay(e);
	}	
};

Lightbox.prototype.createOverlay = function(imgObj) {
	"use strict";
	var _this=this,imageDiv,imageTag,closeDiv,closeButton,sec;	// overlay
	sec = document.getElementsByTagName("section")[0];
	imageDiv = document.createElement('div');
	imageDiv.className = 'lightbox';
	imageDiv.id = 'lightbox';
	sec.appendChild(imageDiv);

	// Navigation Menus
	_this.generateNavigation(imageDiv, 'prev');
	_this.generateNavigation(imageDiv, 'next');

	// Expanded Image	
	imageTag = document.createElement('img');
	imageTag.src = imgObj.src;
	imageTag.dataset.navImg = imgObj.dataset.imgid;
	imageDiv.appendChild(imageTag);
 
	// close 'X'
	closeDiv = document.createElement('div');
	imageDiv.appendChild(closeDiv);
	closeButton = document.createElement('button');
	closeButton.name = 'close';
	closeButton.value = 'X';
	closeButton.appendChild(document.createTextNode('X'));
	closeButton.className = 'close';
	closeButton.addEventListener('click',function() {
									_this.close(this);
									});
	closeDiv.appendChild(closeButton);  
		
};

Lightbox.prototype.close = function(closeBtn) {
	"use strict";
	if(document.getElementsByTagName("div")[3] !== null && document.getElementsByTagName("div")[3]) {		
		document.getElementsByTagName("div")[3].style.display = 'none';
	}		
	if (closeBtn.parentNode.parentNode !== null) {		
		closeBtn.parentNode.parentNode.parentNode.removeChild(closeBtn.parentNode.parentNode);
	}
	closeBtn.removeEventListener('click',this.close);
		
};

// Constructs navigation elements on the lightbox
Lightbox.prototype.generateNavigation = function(imgObj, nav) {
	"use strict";
	var ele, navDiv, _this = this;
	navDiv = document.createElement('nav');
	if (nav === 'prev') {
		navDiv.className = 'leftNav';
	}
	else if (nav === 'next') {
		navDiv.className = 'rightNav';
	}
	imgObj.appendChild(navDiv);
	ele = document.createElement('button');
	ele.className = nav;
	if (nav === 'prev') {
		ele.appendChild(document.createTextNode("<"));  
		ele.addEventListener('click',function() {
								_this.prev(this);
							});
	}
	else if (nav === 'next') {
		ele.appendChild(document.createTextNode(">"));  
		ele.addEventListener('click',function() {
								_this.next(this);
							});
	}
	navDiv.appendChild(ele);
};


Lightbox.prototype.next = function(nextBtn) {
	"use strict";
	var imageElement,newElement,currentImg;
	imageElement = nextBtn.parentElement.nextSibling;
	currentImg = imageElement.dataset.navImg;
	newElement = document.getElementsByTagName("img")[Number(currentImg)+1];
	if (newElement !== null && newElement !== undefined && newElement.dataset.imgid !== undefined) {
		imageElement.src = newElement.src;
		imageElement.dataset.navImg = newElement.dataset.imgid;
	}
	nextBtn.removeEventListener('click',this.next);
	
};

Lightbox.prototype.prev = function(prevBtn) {
	"use strict";
	var imageElement,newElement,currentImg;
	imageElement = prevBtn.parentElement.nextSibling.nextSibling;
	currentImg = imageElement.dataset.navImg;
	newElement = document.getElementsByTagName("img")[Number(currentImg)-1];
	if (newElement !== null && newElement !== undefined) {
		imageElement.src = newElement.src;
		imageElement.dataset.navImg = newElement.dataset.imgid;
	}
	prevBtn.removeEventListener('click',this.prev);
};