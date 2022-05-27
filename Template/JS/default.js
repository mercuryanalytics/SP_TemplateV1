//***********************************************************************
//***********************************************************************
//** Licensed Materials - Property of UNICOM Systems, Inc.
//** (C) Copyright UNICOM Systems, Inc. - a Division of UNICOM Global. 2001 - 2017
//***********************************************************************
//***********************************************************************
(function () {
  //if the browser does not support media queries add an event listener for window resize:
  if (!window.matchMedia) {
    var head = document.getElementsByTagName("head")[0];
    var linkElement = document.createElement("link");
    linkElement.setAttribute("rel", "stylesheet");
    linkElement.setAttribute("type", "text/css");
    linkElement.id = "noMediaQueryCss";
    head.appendChild(linkElement);

    var mediaQueryLinks = new Array();
    var links = head.getElementsByTagName("link");
    for (var i = 0; i < links.length; i++) {
      var mediaAttribute = links[i].getAttribute("media");
      if (
        mediaAttribute &&
        (mediaAttribute.search("min-width") > -1 ||
          mediaAttribute.search("max-width") > -1)
      ) {
        mediaQueryLinks.push(new mediaQueryLink(links[i]));
      }
    }

    //This is the function we'll perform EVERY time the window is resized
    var resizeHandler = function () {
      var bodyElement = document.getElementsByTagName("body")[0];
      var clientWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      for (var i = 0; i < mediaQueryLinks.length; i++) {
        var nHref = mediaQueryLinks[i].href(clientWidth);
        if (nHref != false) {
          var noMediaQueryCSS = nHref;
          var currentStyle = document.getElementById("noMediaQueryCss");
          if (nHref != currentStyle.getAttribute("href")) {
            //remove the child - this will cause a reflow of the css
            head.removeChild(currentStyle);

            //create a replacement stylesheet link
            var newLink = document.createElement("link");
            newLink.setAttribute("rel", "stylesheet");
            newLink.setAttribute("type", "text/css");
            newLink.id = "noMediaQueryCss";
            //appending the new link will caus a reflow.
            newLink.setAttribute("href", noMediaQueryCSS);
            head.appendChild(newLink);
          }
        }
      }
    };

    //add the css link element to the head
    resizeHandler();

    //now check for EventListener - standard
    if (window.addEventListener) {
      window.addEventListener("resize", resizeHandler, false);
    }
    //now ie
    else if (window.attachEvent) {
      window.attachEvent("onresize", resizeHandler);
    }
  }
  return;

  function mediaQueryLink(linkEl) {
    //takes a link element with a media attribute, looks for the min-width and the max-width, and creates a test function that passes back the href
    this.minWidth = null;
    this.maxWidth = null;

    var thisHref = linkEl.getAttribute("href");
    var mediaString = linkEl.getAttribute("media");

    //look for the min-width
    if (mediaString.search(/min\-width/) > -1) {
      var minString = mediaString.match(/min\-width\:\s+\d+px/)[0];
      minString = minString.match(/\d+/)[0];
      this.minWidth = Number(minString);
    }

    //look for the max-width
    if (mediaString.search(/max\-width/) > -1) {
      var maxString = mediaString.match(/max\-width\:\s+\d+px/)[0];
      maxString = maxString.match(/\d+/)[0];
      this.maxWidth = Number(maxString);
    }

    var _this = this;

    //when the object is asked for the href, do the following test of the current width of the browser (tValue argument).
    this.href = function (tValue) {
      if (_this.minWidth && _this.maxWidth) {
        if (_this.minWidth <= tValue && _this.maxWidth >= tValue) {
          return thisHref;
        } else {
          return false;
        }
      } else if (_this.minWidth && !_this.maxWidth) {
        if (tValue > _this.minWidth) {
          return thisHref;
        } else {
          return false;
        }
      } else {
        if (tValue < _this.maxWidth) {
          return thisHref;
        } else {
          return false;
        }
      }
    };
  }
  ////////////custom functions
})();

$(document).ready(function () {
  //alert("ready");
  $(".mrGridTable tr td").click(function () {
    //console.log("a");
    $(this).find("input:radio").attr("checked", true);
    $(this).find("input:checkbox").attr("checked", true);
  });
  if ($(".mrSingleText").length > 0) {
    let maxheight = 0;
    let maxwidth = 0;
    $(".mrSingleText").each(function () {
      if (maxheight < $(this).height()) maxheight = $(this).height();
      if (maxwidth < $(this).width()) maxwidth = $(this).width();
    });
    $(".mrSingleText").each(function () {
      if (maxheight < $(this).height()) maxheight = $(this).height();
      $(this).height(maxheight + "px");
      $(this).width(maxwidth + "px");
    });
  }
  if ($(".mrMultipleText").length > 0) {
    let maxheight = 0;
    let maxwidth = 0;
    $(".mrMultipleText").each(function () {
      if (maxheight < $(this).height()) maxheight = $(this).height();
      if (maxwidth < $(this).width()) maxwidth = $(this).width();
    });
    $(".mrMultipleText").each(function () {
      $(this).height(maxheight + "px");
      $(this).width(maxwidth + "px");
    });
  }
  //.
});

function isMobile() {
  return window.matchMedia("only screen and (max-width: 760px)").matches;
}
