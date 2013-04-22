function Lightbox(divId,imageArray) {
	this.divId = divId;
	this.imageArray = imageArray;
	this.init();
}

Lightbox.imageArray = [];
Lightbox.imagePosition = 0;

Lightbox.prototype.init = function() {
	var i,parentDiv,newDiv,imgEle,imgDiv,_this=this;	
	parentDiv = document.getElementById(this.divId);
	// Registering click event
	parentDiv.addEventListener("click", function(e) {
						_this._handleEvent(_this, e);
						});
	this.createThumbNails();
						
};

Lightbox.prototype.createThumbNails = function() {
	var imgLength,parentDiv,newDiv;
	imgLength = this.imageArray.length;
	parentDiv = document.getElementById(this.divId);
	newDiv = document.createElement('div');
	newDiv.className = 'set';
	parentDiv.appendChild(newDiv);
	for (i = 0; i < imgLength; i+= 1) {	
		imgDiv = document.createElement('div');
		imgDiv.className = 'single';
		newDiv.appendChild(imgDiv);
		imgEle = document.createElement('img');
		imgEle.id = i;
		imgEle.dataset.imgid = i;
		imgEle.src = this.imageArray[i];
		imgEle.className = 'thumbnail';	
		imgDiv.appendChild(imgEle);
	}
}

Lightbox.prototype._handleEvent = function(ligthboxObj, event) {
	var _this=ligthboxObj,e;
	e = event.srcElement || event.target;
	if(e.tagName.toLowerCase() === 'img') {
		_this.imagePosition = e.dataset.imgid;
		_this.createOverlay(e);
	}	
};

Lightbox.prototype.createOverlay = function(imgObj) {
	var _this=this,overlay,imageDiv,imageTag,closeDiv,closeButton;	// overlay
 	overlay = document.createElement('div');
  	overlay.className = 'overlayElement';
  	overlay.id = 'overlayElement';
  	document.body.appendChild(overlay);  	
 
  	// lightbox
  	imageDiv = document.createElement('div');
  	imageDiv.className = 'lightbox';
  	imageDiv.id = 'lightbox';
  	document.body.appendChild(imageDiv);

	// Navigation Menus
	_this._generateNavigation(imageDiv, 'prev');
	_this._generateNavigation(imageDiv, 'next');

	// Expanded Image	
	imageTag = document.createElement('img');
	imageTag.src = imgObj.src;
	imageTag.dataset.over = imgObj.src;
	imageTag.dataset.navImg = 'expanded_img';
	imageTag.id = 'expanded_img';
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
	if (typeof(document.getElementById('overlayElement')) != 'undefined' && document.getElementById('overlayElement') != null) {
  		document.body.removeChild(document.getElementById('overlayElement'));
	}
	if (typeof(document.getElementById('lightbox')) != 'undefined' && document.getElementById('lightbox') != null) {
  		document.body.removeChild(document.getElementById('lightbox'));
	}
	closeBtn.removeEventListener('click',this.close);
		
};

// Constructs navigation elements on the lightbox
Lightbox.prototype._generateNavigation = function(imgObj, nav) {
	var ele, navDiv, _this = this;
  	navDiv = document.createElement('div');
	if (nav == 'prev') {
		navDiv.className = 'leftNav';
	}
	else if (nav == 'next') {
		navDiv.className = 'rightNav';
	}
  	
  	imgObj.appendChild(navDiv);
  	ele = document.createElement('button');
  	ele.className = nav;
	if (nav == 'prev') {
		ele.appendChild(document.createTextNode("<"));  
	  	ele.addEventListener('click',function() {
	  							_this.prev(this);
	  							});
	}
	else if (nav == 'next') {
		ele.appendChild(document.createTextNode(">"));  
	 	ele.addEventListener('click',function() {
	 							_this.next(this);
	  							});
	}
	navDiv.appendChild(ele);
};


Lightbox.prototype.next = function(nextBtn) {
	this.imagePosition++;
	// Check to ensure the API call has not incremented imagePosition out of array context
	if (this.imagePosition < this.imageArray.length) {
		document.getElementById('expanded_img').src = document.getElementById(this.imagePosition).src;
	} else {
		this.imagePosition--;
	}
	nextBtn.removeEventListener('click',this.next);
	
};

Lightbox.prototype.prev = function(prevBtn) {
	this.imagePosition--;
	// Check to ensure the API call has not decremented imagePosition out of array context
	if (this.imagePosition >= 0) {
		document.getElementById('expanded_img').src = document.getElementById(this.imagePosition).src;
	} else {
		this.imagePosition++;
	}
	prevBtn.removeEventListener('click',this.prev);
};