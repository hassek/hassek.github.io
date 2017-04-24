$(document).ready(function () {
  $("div.header.categories a,.tag").click(function(e){
      var tag = $(this).text().substring(1);
      console.log(tag);
      $(".post").not("." + tag).hide();
      $(".post." + tag).show();
  });
});
