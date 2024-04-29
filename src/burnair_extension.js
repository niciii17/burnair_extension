// (c) Nicola Eschbach
// Make Burnair great again!
// ++++++++++++++++++++++++

// Improve detail window slider
$( '.c-popup' ).each(function () {
    this.style.setProperty( 'overflow', 'unset', 'important' );
});

// handle detail window slider apperance
function onClassChange(node, callback) {
    let lastClassString = node.classList.toString();
  
    const mutationObserver = new MutationObserver((mutationList) => {
      for (const item of mutationList) {
        if (item.attributeName === "class") {
          const classString = node.classList.toString();
          if (classString !== lastClassString) {
            callback(mutationObserver);
            lastClassString = classString;
            break;
          }
        }
      }
    });
    mutationObserver.observe(node, { attributes: true });
  
    return mutationObserver;
  }

const detailWindow = $('.c-popup')[0]
onClassChange(detailWindow, () => {
    const handler =  $(".resize-button-nob");
    if (detailWindow.classList.contains("closed")) {
        handler.css("display", "none")
    } else {
        handler.css("display", "block")
    }
});

$("#resize").css("top", "-18px")
$(".resize-button-nob").css({
    "clip-path": "polygon(20% 0%, 80% 0%, 99% 100%, 0 100%)",
    "height": "15px",
    "width": "90px",
    "left": "-2.5px",
    "top": "-5px",
    "border-radius": "unset",
    "background": "white",
    "display": "none"
}).append(`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="12" fill="currentColor" class="bi bi-grip-horizontal" viewBox="4 4 8 8">
<path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2m0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg>`)

// Observe Regions loaded and modify borders and content
function nodeInsertedCallback(event) {
    // Disable Backgorund on Region name
    // $(".leaflet-marker-icon .maxmode").css("background-color","")

    if (event.relatedNode.tagName.toLowerCase() !== "div") {
            return
    }

    // remove region names
    $('.leaflet-marker-icon .maxmode').each(function() {
        if ($(this).css('margin-top') === '-10px') {
            $(this).first().contents().filter(function() {
                return this.nodeType === 3; // Filter only text nodes
            }).remove();
            $(this).css("padding","1px");
        }
    });
    // Make thermal-forecast preview smaller
    $(".leaflet-marker-icon .maxmode").css({
        '-webkit-transform': 'scale(0.9)',
        '-moz-transform': 'scale(0.9)',
        '-ms-transform': 'scale(0.9)',
        'transform': 'scale(0.9)'
      })
        // Make stroke-width of region smaller
        $('[id^="clip_"]').css("stroke-width", "0.3em")
  };
  document.addEventListener('DOMNodeInserted', nodeInsertedCallback);