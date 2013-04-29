(function() {
    "use strict";
function handleFileSelect(evt,opt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files,i,f,reader,otherFormat =0;
    if(opt === 0) {
        files = evt.target.files; // FileList object
    }
    else{
        files = evt.dataTransfer.files; // FileList object
    }
    // files is a FileList of File objects. List some properties.
    
    for (i = 0; i < files.length; i += 1) {
        f = files[i];
        // Only process image files.
        if (!f.type.match('image.*')) {
            otherFormat += 1;
            continue;
        }
         reader = new FileReader();
         // Closure to capture the file information.
         reader.onload = function(e) {
         // Render thumbnail.
             var span = document.createElement('span');
             span.innerHTML = ['<img class="thumb" src="', e.target.result,
                                '" title="', escape(f.name), '"/>'].join('');
             document.getElementById('list').insertBefore(span, null);
         }
         // Read in the image file as a data URL.
         reader.readAsDataURL(f);
         //console.log(reader.readAsDataURL(f));
    }
    if(otherFormat > 1) {
        alert('Only image files are allowed');
    }

}
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}
  
    // Setup the dnd listeners.
var dropZone = document.getElementsByTagName('div')[1];
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', function(e) {
                          handleFileSelect(e,1)
                          }, false);
document.getElementsByTagName('section')[1].addEventListener('change', function(e) {
                                                                handleFileSelect(e,0)
                              }, false);
})();