
function determineDocumentWidth(){
    return Math.max(
                    document.documentElement.clientWidth,
                    document.documentElement.offsetWidth,
                    document.documentElement.scrollWidth);
}

function determineDocumentHeight(){
    return Math.max(
                    document.body.clientHeight,
                    document.body.offsetHeight,
                    document.body.scrollHeight,
                    document.documentElement.clientHeight,
                    document.documentElement.offsetHeight,
                    document.documentElement.scrollHeight);
}

var setup = function() {
    var canvas = document.createElement('canvas');
    var textLabel = document.createElement('p');
    canvas.setAttribute('width', determineViewportWidth());
    canvas.setAttribute('height', determineDocumentHeight());
    textLabel.textContent = "Width: " + determineDocumentWidth().toString() + 
                            "\nHeight: " + determineDocumentHeight().toString();
    document.body.appendChild(textLabel);                         
    document.body.appendChild(canvas);

};

var handleResize = function() {
    var canvas = document.getElementByTagName('canvas')[0];
    var textLabel = docuemnt.getElementByTagName('p')[0];
    canvas.setAttribute('width', determineDocumentWidth());
    canvas.setAttribute('height', determineDocumentHeight());
    textLabel.textContent = "Width: " + determineDocumentWidth().toString() + 
                            "\nHeight: " + determineDocumentHeight().toString();
    
};

window.onload = setup;
window.onresize = handleResize;