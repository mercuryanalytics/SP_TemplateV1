$(document).ready(function () {
  //alert(isMobile());
  if (isMobile()) {
    if ($(".mrGridTable").length != 0) {
      var questionText = $(".mrQuestionText").html();
      var headColumn = $(".mrGridTable tr:first").html();
      var i = 0,
        j = 0;
      var html = questionText + "<br/><br/>";
      var tableTd = "";

      $("table.mrGridTable > tbody > tr")
        .not(":first")
        .each(function () {
          i = 0;
          $(this)
            .find("td")
            .each(function () {
              if ($(this).hasClass("mrGridCategoryText")) {
                html +=
                  $(this).html() +
                  "<br/><br/><table class='custom-mobile-grid' border='1'>" +
                  headColumn;
              } else {
                if (i == 0) {
                  html += "<tr class='table-row'>" + $(this).parent().html();
                  i++;
                }
              }
            });
          html += tableTd + "</table><br/><br/><br/>";
        });
    }
    //console.log(html);
    $(".questionArea").html(html);
    $(".custom-mobile-grid tr").each(function () {
      $(this).find("td:first").hide();
    });
    $(".table-row td:first-child").hide();
  }
});
