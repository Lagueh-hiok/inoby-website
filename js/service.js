function serviceItem(item) {
  const id = String(item.id).padStart(2, 0);
  return `
    <div class="service-item">
        <p class="service-item_number">${id}</p>
        <div class="service-item_content">
            <div class="service-item_header">
                <p class="service-item_title">
                    ${item.title}
                </p>
                <div class="service-item_icon">
                    +
                </div>
                <div class="service-item_icon active">
                    –
                </div>
            </div>
            <p class="service-item_text">${item.content}</p>
        </div>
    </div>
  `
}

fetch("./json/service.json")
  .then(res => res.json())
  .then(data => {
    data.forEach((item) => 
      $(".services").append(serviceItem(item))
    );

    $(".service-item_icon").on("click", function() {
      const $serviceItem = $(this).closest(".service-item")

      $serviceItem.find(".service-item_icon").addClass("active")
      $(this).removeClass("active");
      
      $serviceItem.find(".service-item_text").toggle(300);
    });
  });

