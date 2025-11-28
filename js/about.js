function activate(id) {
  // 切換按鈕
  $(".location-btn").removeClass("select-btn");
  $(`.location-btn[data-location="${id}"]`).addClass("select-btn");

  // 切換點位
  $(".point").removeClass("show-point");
  $(`.point[data-location="${id}"]`).addClass("show-point");
}

// 按鈕 → 點位
$(document).on("click", ".location-btn", function() {
  activate($(this).data("location"));
});

// 點位 → 按鈕
$(document).on("click", ".point", function() {
  activate($(this).data("location"));
});