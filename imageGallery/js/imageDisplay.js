var imageGalleryViews =  function(imgController) {
    "use strict";
    return { 
        displayForm : function() {
            var sec,spanEle,spanText,spanText2,fileEle,secEle,divEle,innerDiv,outputEle;
            sec = document.getElementsByTagName("section")[0];
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
            secEle = document.createElement("section");
            secEle.className = 'uploadFile';
            sec.appendChild(secEle);
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
            spanEle = document.createElement("span");
            spanEle.className = 'notes';
            spanText = document.createTextNode("Drag and Drop");
            spanEle.appendChild(spanText);
            sec.appendChild(spanEle);
            divEle = document.createElement("div");
            divEle.className = 'class="dragdrop">';
            sec.appendChild(divEle);
            innerDiv = document.createElement("div");
            innerDiv.id = 'drop_zone';
            innerDiv.className = 'drop_zone';
            innerDiv.addEventListener('dragover',function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.dataTransfer.dropEffect = 'copy';
            }, false);
            innerDiv.addEventListener('drop',function(e) {
                imgController.handleImageEvents(e,1);
            }, false);
            innerDiv.addEventListener('dragleave',function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
            }, false);
            innerDiv.addEventListener('dragenter',function(evt) {
                evt.preventDefault();
                evt.stopPropagation();
                evt.dataTransfer.effectAllowed = 'copyMove';
            }, false);
            innerDiv.appendChild(document.createTextNode('Drop files here'));
            divEle.appendChild(innerDiv);
            outputEle = document.createElement("output");
            outputEle.id = 'list';
            sec.appendChild(outputEle);
            
            
        },
        displayThumbNails : function (e) {
            var span,image;
            span = document.createElement('span');
            image = document.createElement("img");
            image.className = 'thumb';
            image.src = e.target.result;
            span.appendChild(image);
            document.getElementById('list').insertBefore(span, null);
        }
    };
};
var imageGalleryModel = function () {
    return {
        showLB : function(e) {
            var evt,imgs,imgLoop,imgLength,lightbox,imageArray = [];
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
        handleFileSelectEvent : function (e,opt) {
            e.stopPropagation();
            e.preventDefault();
            var files,i,f,reader,otherFormat =0,span,image,images,thumbnails;
            if(opt === 0) {
                files = e.target.files; 
            }
            else{
                files = e.dataTransfer.files;
            }
            for (i = 0; i < files.length; i += 1) {
                f = files[i];
                if (!f.type.match('image.*')) {
                    otherFormat += 1;
                    continue;
                }
                 reader = new FileReader();
                 reader.onload = function(e) {
                     if(reader.readyState > 0) {
                         var viewForm = imageGalleryViews(this);
                         viewForm.displayThumbNails(e);
                         
                     }
                 }
                 reader.readAsDataURL(f);
            }
            if(otherFormat > 1) {
                alert('Only image files are allowed');
            } else {
                var op = document.getElementsByTagName('output')[0];
                op.addEventListener("click",this.showLB,false);
            }

        }
    };

    
};
var imageGalleryControllers =  function() {
    "use strict";
    return {
        handleImageEvents : function(evt,opt){
            var imgModel = imageGalleryModel();
            imgModel.handleFileSelectEvent(evt,opt);
        },
        showForm : function() { 
            var viewForm = imageGalleryViews(this);
            viewForm.displayForm();
        }
    };
}; 