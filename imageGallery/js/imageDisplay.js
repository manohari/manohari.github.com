var ImageGalleryView =  function(imgController) {
    "use strict";
    return {
        displayUI : function() {
              this.createUIElements();
        },
        createUIElements : function () {
            //this function creates files upload multiple element as well as drag and drop elements in html page
            var sec,secEle, fileEle, outEle, spanEle, divEle, innerDiv;
            sec = document.getElementsByTagName("section")[0];
            spanEle = this.createSpanElement("Please select any one option from below");
            this.addElement(sec,spanEle);

            sec.appendChild(document.createElement("br"));

            spanEle = this.createSpanElement("File Upload");
            this.addElement(sec,spanEle);

            secEle = this.createEle("section", "uploadFile");
            this.addElement(sec,secEle);

            fileEle = this.createFileElement();
            this.addElement(secEle,fileEle);

            spanEle = this.createSpanElement("Drag and Drop");
            this.addElement(sec,spanEle);

            divEle = this.createEle("div", "dragdrop");
            this.addElement(sec,divEle);

            innerDiv = this.createDragDropEle();
            this.addElement(divEle,innerDiv);
            //html5 output element to display all uploaded as well as drag and drop elements
            outEle = this.createOutputEle();
            this.addElement(sec,outEle);
        },
        addElement : function (parentEle,childEle) {
            parentEle.appendChild(childEle);
        },
        createOutputEle : function () {
            var outputEle;
            outputEle = document.createElement("output");
            outputEle.id = 'list';
            outputEle.addEventListener("click",imgController.handleLightBoxEvent,false);
            return outputEle;
        },
        createSpanElement : function (desc) {
            var spanEle, spanText;
            spanEle = document.createElement("span");
            spanEle.className = 'notes';
            spanText = document.createTextNode(desc);
            spanEle.appendChild(spanText);
            return spanEle;
        },
        displayThumbNails : function (imgSrc, imgName) {
            //showing uploaded images as thumbnails format
            var span, image;
            span = document.createElement('span');
            image = document.createElement("img");
            image.className = 'thumb';
            image.title = imgName;
            image.src = imgSrc;
            span.appendChild(image);
            document.getElementById('list').insertBefore(span, null);
        },
        createEle : function (htmlTag, attribute) {
            var htmlEle;
            htmlEle = document.createElement(htmlTag);
            htmlEle.className = attribute;
            return htmlEle;
        },
        createFileElement : function() {
            var fileEle;
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
            return fileEle;

        },
        createDragDropEle : function() {
            //drag and drop div creations
            var innerDiv;

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
            return innerDiv;
        }
    };
};
var ImageGalleryModel = function () {
    "use strict";
    return {
        getFileName : function (imgData) {
            return imgData.name;
        },
        getFileSrc : function(imgPath) {
            return imgPath.target.result;
        }
    };
};
var ImageGalleryController =  function() {
    "use strict";
    //controller display html view and handle business logic of image reading and showing
    var viewForm, imgModel, reader, imgName, imageSrc;
    imgModel = new ImageGalleryModel();
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
                         imgName = imgModel.getFileName(FileData);
                         imageSrc = imgModel.getFileSrc(e);
                         viewForm =  new ImageGalleryView(this);
                         viewForm.displayThumbNails(imageSrc, imgName);
                     }
                 };
                 reader.readAsDataURL(FileData);
            }
            if(otherFormat > 1) {
                alert('Only image files are allowed');
            }
            if(opt === 0) {
                this.removeEventHandlers('file');
            }
            if(opt === 1) {
                this.removeEventHandlers('drag');
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
        removeEventHandlers : function (ele) {
            var divEle, fileEle, outEle;
            if(ele === 'drag') {
                divEle = document.getElementById('drop_zone');
                divEle.removeEventListener('drop', this.handleImageEvents, false);
                divEle.removeEventListener('dragover', this.handleMouseOverEvent, false);
                divEle.removeEventListener('dragenter', this.handleMouseEnterEvent, false);
                divEle.removeEventListener('dragleave', this.handleMouseLeaveEvent, false);
            }

            //file handler removal
            if(ele === 'file') {
                fileEle = document.getElementsByTagName("input")[0];
                if(fileEle.type === 'file') {
                    fileEle.removeEventListener('change', this.handleImageEvents, false);
                }
            }
        },
        showUI : function() {
            viewForm = new ImageGalleryView(this);
            viewForm.displayUI();
        }
     };
};