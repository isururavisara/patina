function drags(dragElement, resizeElement, container) {
  let touched = false;
  window.addEventListener('touchstart', function() { touched = true; });
  window.addEventListener('touchend', function() { touched = false; });
  
  dragElement.on("mousedown touchstart", function(e) {
    dragElement.addClass("draggable");
    resizeElement.addClass("resizable");
    let startX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
    let dragWidth = dragElement.outerWidth();
    let posX = dragElement.offset().left + dragWidth - startX;
    let containerOffset = container.offset().left;
    let containerWidth = container.outerWidth();
    let minLeft = containerOffset + 10;
    let maxLeft = containerOffset + containerWidth - dragWidth - 10;

    dragElement.parents().on("mousemove touchmove", function(e) {
      if (touched === false) { e.preventDefault(); }
      let moveX = e.pageX ? e.pageX : e.originalEvent.touches[0].pageX;
      let leftValue = moveX + posX - dragWidth;
      if (leftValue < minLeft) { leftValue = minLeft; }
      else if (leftValue > maxLeft) { leftValue = maxLeft; }
      let widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + "%";
      $(".draggable").css("left", widthValue);
      $(".resizable").css("width", widthValue);
    });
  });
}