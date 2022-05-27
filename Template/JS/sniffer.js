//
// Sniffer object
//
function Sniffer() {
  // Set the Sniffer Properties first
  this.js = 1;
  this.uagent = navigator.userAgent.toLowerCase();
  this.product = navigator.product
    ? navigator.product.toLowerCase()
    : "unknown";
  this.screenres = this.getScreenRes();
  this.opsys = this.getOpSys();

  var versionStr = GetSwfVer(); // Gives "WIN 2,0,0,11"
  if (versionStr == -1) {
    this.flashVers = "0.0.0";
  } else {
    if (isIE && isWin && !isOpera) {
      tempArray = versionStr.split(" "); // ["WIN", "2,0,0,11"]
      tempString = tempArray[1]; // "2,0,0,11"
      versionArray = tempString.split(","); // ['2', '0', '0', '11']
    } else {
      versionArray = versionStr.split(".");
    }

    this.flashVers =
      versionArray[0] + "." + versionArray[1] + "." + versionArray[2];
  }
}

//
// Get the screen res (width;height)
//
Sniffer.prototype.getScreenRes = function() {
  if (window.screen) return window.screen.width + ";" + window.screen.height;
  else return "unknown";
};

//
// Get the Operating System //
//
Sniffer.prototype.getOpSys = function() {
  if (window.navigator.platform) {
    var os = window.navigator.platform.toLowerCase();
    var index = os.search(/\d| /gi);

    if (index != -1) return os.substring(0, index);
    else return os;
  }

  return "unknown";
};

//
// Debug message to allow showing sniffer values
//
Sniffer.prototype.Debug = function() {
  with (this) {
    alert(
      "js: " +
        js +
        "\n" +
        "uagent: " +
        uagent +
        "\n" +
        "product: " +
        product +
        "\n" +
        "screenres: " +
        screenres +
        "\n" +
        "opsys: " +
        opsys
    );
  }
};

var sniffObj;

function InitPageActions(action) {
  // Run the sniffer if requested
  if (typeof action == "undefined" || action == 2) {
    sniffObj = new Sniffer();
  }

  // Break Frames if requested
  if (typeof action == "undefined" || action == 3) {
    document.forms[0].target = "_top";
  }
}

//-->
