function createAndAppend(appendTo, elementType, textNode) {
    var newElement = document.createElement(elementType);
    var newTextNode = document.createTextNode(textNode);
    
    newElement.appendChild(newTextNode);
    appendTo.appendChild(newElement);

    return newElement;
}