$(document).ready(function () {
  $("div.header.categories a").click(function(e){
      var tag = $(this).text().substring(1);
      $(".post").not("." + tag).hide();
      $(".post." + tag).show();
  });
  $(".tag").click(function(e){ var tag = $(this).text().substring(1); $(".post").not("." + tag).hide(); })
});
