function Lightbox(divId,imageArray) {
	this.divId = divId;
	this.imageArray = imageArray;
	this.init();
}

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
		//imgEle.addEventListener('click', function() {
  		//			_this.createOverlay(this); });	
		imgDiv.appendChild(imgEle);
	}
	_this.initEvent();
	
};

Lightbox.prototype.initEvent = function() {
	var element = document.body,_this=this;
    if (window.attachEvent) {
        element.attachEvent("click", _this.handleEvent);
    } else {
        element.addEventListener("click", _this.handleEvent, false);
    }
};

Lightbox.prototype.handleEvent = function (e) {
	var el = e.srcElement || e.target,_this=this;
	if(el.tagName.toLowerCase() === 'img') {
		_this.createOverlay(el);
	}
	
}



Lightbox.prototype.createOverlay = function(imgObj) {
	var imageTag,overlay,imageDiv,closeDiv,anchorEle,_this=this,next,prev,navDiv,leftDiv,rightDiv;
	/*var elem, evt = e;
 	if (evt.srcElement) {
 		elem = evt.srcElement;
 	} 
 	else if (evt.target) {
 		elem = evt.target;
 	}
 	imgObj = elem;*/
 	overlay = document.createElement('div');
  	overlay.className = 'overlayElement';
  	overlay.id = 'overlayElement';
  	document.body.appendChild(overlay);  	
  	
  	//image Div
  	imageDiv = document.createElement('div');
  	imageDiv.className = 'lightbox';
  	imageDiv.id = 'lightbox';
  	document.body.appendChild(imageDiv);
  	
  	//leftdiv
  	leftDiv = document.createElement('div');
  	leftDiv.className = 'leftNav';
  	leftDiv.addEventListener('mouseover',function() {
  					_this.showLeftNavigation(this);
  					});
  	imageDiv.appendChild(leftDiv);
  	prev = document.createElement('a');
  	prev.className = 'prev';
  	prev.id = 'prev';
  	prev.style.display = 'none';
  	prev.href = '#';
  	prev.appendChild(document.createTextNode("<"));  
  	prev.addEventListener('click',function() {
  						_this.prev(this);
  						});
  	leftDiv.appendChild(prev);
  	
  	//rightDiv
  	rightDiv = document.createElement('div');
  	rightDiv.className = 'rightNav';
  	rightDiv.addEventListener('mouseover',function() {
  					_this.showRightNavigation(this);
  					});
  					
  	imageDiv.appendChild(rightDiv);
  	next = document.createElement('a');
  	next.className = 'next';
  	next.id = 'next';
  	next.style.display = 'none';
  	next.href = '#';
  	next.appendChild(document.createTextNode(">"));  	
  	next.addEventListener('click',function() {
  						_this.next(this);
  						});
  	rightDiv.appendChild(next);
  	
    imageTag = document.createElement('img');
    imageTag.src = imgObj.src;
    imageTag.className = imgObj.id;
  	imageDiv.appendChild(imageTag);
  	
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

Lightbox.prototype.prev = function(prevbtn) {
	var imageElement,newElement;
	imageElement = prevbtn.parentElement.nextSibling.nextSibling;
  	currentId = imageElement.className;
  	if (currentId > 0 ) {
    	document.getElementById('prev').style.display='none';
   		newElement = document.getElementById(Number(currentId)-1);
  		imageElement.src = newElement.src;
  		imageElement.className = newElement.id;
   	} 
  	
};
Lightbox.prototype.next = function(nextbtn) {
	var imageElement,newElement;
   	imageElement = nextbtn.parentElement.nextSibling;
    currentId = imageElement.className;
	newElement = document.getElementById(Number(currentId)+1);
	if (newElement !== null) {
		imageElement.src = newElement.src;
		imageElement.className = newElement.id;
	}
};

Lightbox.prototype.showLeftNavigation = function(eleObj) {
	var imgId;
	imgId = eleObj.nextSibling.nextSibling.className;
	if (typeof(document.getElementById('prev')) !== 'undefined' && document.getElementById('prev') !== null && imgId > 0) {
		document.getElementById('prev').style.display = 'block';
		document.getElementById('next').style.display = 'none';
	}
};
Lightbox.prototype.showRightNavigation = function(rightNavObj) {
	var _this = this,imgId;
	 imgId = rightNavObj.nextSibling.className;
	if (typeof(document.getElementById('next')) !== 'undefined' && document.getElementById('next') !== null) {
		if(this.imageArray.length-1 == Number(imgId))  {
			document.getElementById('next').style.display = 'none';
		}
		else {			
			document.getElementById('next').style.display = 'block';
			document.getElementById('prev').style.display = 'none';
		}
	}
	
}
