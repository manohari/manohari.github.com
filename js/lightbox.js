function Lightbox(divId,imageArray) {
	this.divId = divId;
	this.imageArray = imageArray;
	this.init();
}

Lightbox.imageArray = [];
Lightbox.imagePosition = 0;

Lightbox.prototype.init = function() {
	var i,parentDiv,newDiv,imgEle,imgDiv,imgLength,_this=this;	
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
		imgEle.src = this.imageArray[i];
		imgEle.className = 'thumbnail';	
		imgDiv.appendChild(imgEle);
	}
	 // Registering click event
	 parentDiv.addEventListener("click", function(e) {
						_this._handleEvent(_this, e);
						});
};

Lightbox.prototype._handleEvent = function(ligthboxObj, event) {
	var _this=ligthboxObj,e;
	e = event.srcElement || event.target;
	if(e.tagName.toLowerCase() === 'img') {
		_this.imagePosition = e.id;
		_this.createOverlay();
	}
};

Lightbox.prototype.createOverlay = function() {
	var imgObj, _this=this,overlay,imageDiv,imageTag,closeDiv,anchorEle;

	// overlay
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
	imgObj = document.getElementById(this.imagePosition);
    imageTag = document.createElement('img');
    imageTag.src = imgObj.src;
    imageTag.id = 'expanded_img';
  	imageDiv.appendChild(imageTag);
 
	// close 'X'
  	closeDiv = document.createElement('div');
  	imageDiv.appendChild(closeDiv);
  	anchorEle = document.createElement('a');
  	anchorEle.href = '#';
  	anchorEle.appendChild(document.createTextNode('X'));
  	anchorEle.addEventListener('click',function() {
  									_this.close();
  								});
  	closeDiv.appendChild(anchorEle);  	
};

Lightbox.prototype.close = function() {
	if (typeof(document.getElementById('overlayElement')) != 'undefined' && document.getElementById('overlayElement') != null) {
  		document.body.removeChild(document.getElementById('overlayElement'));
	}
	if (typeof(document.getElementById('lightbox')) != 'undefined' && document.getElementById('lightbox') != null) {
  		document.body.removeChild(document.getElementById('lightbox'));
	}	
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
  	navDiv.addEventListener('mouseover',function() {
  					_this._showNavigation(_this, nav);
  					});
  	navDiv.addEventListener('mouseout', _this._hideNavigation);
  	imgObj.appendChild(navDiv);

  	ele = document.createElement('a');
  	ele.className = nav;
  	ele.id = nav;
  	ele.style.display = 'none';
  	ele.href = '#';
	if (nav == 'prev') {
		ele.appendChild(document.createTextNode("<"));  
	  	ele.addEventListener('click',function() {
	 						 _this.prev();
	  						});
	}
	else if (nav == 'next') {
		ele.appendChild(document.createTextNode(">"));  
	 	ele.addEventListener('click',function() {
	  							_this.next();
	  						});
	}
	navDiv.appendChild(ele);
};

// Logic to display navigation icon based on the image position
Lightbox.prototype._showNavigation = function(lighboxObj, nav) {
var _this = lighboxObj,imageArrayLength;
	imageArrayLength = _this.imageArray.length;
	
	if (nav == 'prev') {
		if (_this.imagePosition > 0 && _this.imageArray.length > 1) {
			document.getElementById('prev').style.display = 'block';
		}
		else {
			document.getElementById('prev').style.display = 'none';
		}
	}
	else if (nav == 'next') {
		if ((imageArrayLength-1) > _this.imagePosition && imageArrayLength > 1) {
			document.getElementById('next').style.display = 'block';
		}
		else {
			document.getElementById('next').style.display = 'none';
		}
	}
};

// Hides navigation
Lightbox.prototype._hideNavigation = function() {
	if (typeof(document.getElementById('prev')) !== 'undefined' && document.getElementById('prev') !== null) {
		document.getElementById('prev').style.display = 'none';
	}
	if (typeof(document.getElementById('next')) !== 'undefined' && document.getElementById('next') !== null) {
		document.getElementById('next').style.display = 'none';
	}
};

Lightbox.prototype.next = function() {
	this.imagePosition++;
	// Check to ensure the API call has not incremented imagePosition out of array context
	if (this.imagePosition < this.imageArray.length) {
		document.getElementById('expanded_img').src = document.getElementById(this.imagePosition).src;
	} else {
		this.imagePosition--;
	}
};

Lightbox.prototype.prev = function() {
	this.imagePosition--;
	// Check to ensure the API call has not decremented imagePosition out of array context
	if (this.imagePosition >= 0) {
		document.getElementById('expanded_img').src = document.getElementById(this.imagePosition).src;
	} else {
		this.imagePosition++;
	}
};