var imageGalleryView =  function(imgController) {
    "use strict";
    var sec;
    sec = document.getElementsByTagName("section")[0];
    return { 
        displayForm : function() {
            //this function creates files upload multiple element as well as drag and drop elements in html page
            var spanEle, spanText, spanText2, outputEle;
            spanEle = document.createElement("span");
            spanEle.className = 'notes';
            spanText = document.createTextNode("Please select any one option from below ");
            spanEle.appendChild(spanText);
            sec.appendChild(spanEle);
            sec.appendChild(document.createElement("br"));
            
            spanEle = document.createElement("span");
            spanEle.className = 'notes';
            spanText2 = document.createTextNode("File Upload");
            spanEle.appendChild(spanText2);
            sec.appendChild(spanEle);
            
            this.addFileElement();
            
            spanEle = document.createElement("span");
            spanEle.className = 'notes';
            spanText = document.createTextNode("Drag and Drop");
            spanEle.appendChild(spanText);
            sec.appendChild(spanEle);
            
            this.addDragDropEle();
            //html5 output element to display all uploaded as well as drag and drop elements
            outputEle = document.createElement("output");
            outputEle.id = 'list';
            outputEle.addEventListener("click",imgController.handleLightBoxEvent,false);
            sec.appendChild(outputEle);
            
        },
        displayThumbNails : function (e) {
            //showing uploaded images as thumbnails format
            var span, image;
            span = document.createElement('span');
            image = document.createElement("img");
            image.className = 'thumb';
            image.src = e.target.result;
            span.appendChild(image);
            document.getElementById('list').insertBefore(span, null);
        },
        addFileElement : function() {
            var secEle, fileEle;
            secEle = document.createElement("section");
            secEle.className = 'uploadFile';
            sec.appendChild(secEle);
            
            //File upload element with multiple attribute and event
            fileEle = document.createElement("input");
            fileEle.type = "file";
            fileEle.id = "files";
            fileEle.name = 'files[]';
            fileEle.multiple = true;
            fileEle.addEventListener('change',function(e) {
                e.preventDefault();
                imgController.handleImageEvents(e,0);
            }, false);
            secEle.appendChild(fileEle);
        },
        addDragDropEle : function() {
            //drag and drop div creations
            var divEle, innerDiv;
            divEle = document.createElement("div");
            divEle.className = 'class="dragdrop">';
            sec.appendChild(divEle);
            //div inside above div
            innerDiv = document.createElement("div");
            innerDiv.id = 'drop_zone';
            innerDiv.className = 'dropZone';
            
            //event handlers for html5 drag and drop
            innerDiv.addEventListener('drop',function(e) {
                imgController.handleImageEvents(e,1);
            }, false);
            innerDiv.addEventListener('dragover', imgController.handleMouseOverEvent, false);
            innerDiv.addEventListener('dragleave', imgController.handleMouseLeaveEvent, false);
            innerDiv.addEventListener('dragenter', imgController.handleMouseEnterEvent, false);
            
            innerDiv.appendChild(document.createTextNode('Drop files here'));
            divEle.appendChild(innerDiv);
        }
    };
};
var imageGalleryModel = function () {
    return {
        removeHandler : function (imgControllerObj, ele) {
            var divEle, fileEle, outEle;
            if(ele === 'drag') {
                divEle = document.getElementById('drop_zone');
                divEle.removeEventListener('drop', imgControllerObj.handleImageEvents, false);
                divEle.removeEventListener('dragover', imgControllerObj.handleMouseOverEvent, false);
                divEle.removeEventListener('dragenter', imgControllerObj.handleMouseEnterEvent, false);
                divEle.removeEventListener('dragleave', imgControllerObj.handleMouseLeaveEvent, false);
            }
            
            //file handler removal
            if(ele === 'file') {
                fileEle = document.getElementsByTagName("input")[0];
                if(fileEle.type === 'file') {
                    fileEle.removeEventListener('change', imgControllerObj.handleImageEvents, false);
                }
            }
            
            if(ele === 'outEle') {
                outEle = document.getElementById("list");
                outEle.removeEventListener('click', imgControllerObj.handleLightBoxEvent, false)
            }
        } 
    };
};
var imageGalleryController =  function() {
    "use strict";
    //controller display html view and handle business logic of image reading and showing
    var viewForm, imgModel;
    imgModel = imageGalleryModel();
    return {
        handleImageEvents : function(e,opt){
            //File Reader API of HTML5 used to read image and display
            e.stopPropagation();
            e.preventDefault();
            var files, loop, FileData, reader, otherFormat =0;
            if(opt === 0) {
                //file api to read files when uploaded 
                files = e.target.files; 
            }
            else{
                //drag and drop method file reading
                files = e.dataTransfer.files;
            }
            for (loop = 0; loop < files.length; loop += 1) {
                FileData = files[loop];
                if (!FileData.type.match('image.*')) {
                    otherFormat += 1;
                    continue;
                }
                //html5 file reader api object
                 reader = new FileReader();
                 reader.onload = function(e) {
                     if(reader.readyState > 0) {
                         //generate thumbnails for all uploaded images
                         var viewForm = imageGalleryView(this);
                         viewForm.displayThumbNails(e);
                     }
                 }
                 reader.readAsDataURL(FileData);
            }
            if(otherFormat > 1) {
                alert('Only image files are allowed');
            }
            if(opt === 0) {
                imgModel.removeHandler(this,'file');
            }
            if(opt === 1) {
                imgModel.removeHandler(this,'drag');
            }
        },
        handleLightBoxEvent : function(e) {
            //light box API call to open lightbox and initiate image navigation
            var evt, imgs, imgLoop, imgLength, lightbox, imageArray = [];
            evt = e.target || e.srcElement;
            imgs = document.getElementsByTagName("img");
            imgLength = imgs.length;
            for(imgLoop = 0; imgLoop < imgLength; imgLoop += 1) {
                imgs[imgLoop].dataset.imgid = imgLoop;
                imageArray[imgLoop] = imgs[imgLoop].src;
            }
            imgModel.removeHandler(this,'outEle');
            document.getElementById("overlayElement").style.display = 'block';
            lightbox = new Lightbox('list');
            lightbox.createOverlay(evt);
        },
        handleMouseOverEvent : function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.dataTransfer.dropEffect = 'move';
        },
        handleMouseLeaveEvent : function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
        },
        handleMouseEnterEvent : function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.dataTransfer.effectAllowed = 'copyMove';
        },
        showForm : function() { 
            viewForm = imageGalleryView(this);
            viewForm.displayForm();
        }
     };
}; 