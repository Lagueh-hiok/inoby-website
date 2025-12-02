function productItem(item) {
  const id = String(item.id).padStart(2, 0);
  return `
    <div class="product-item">
      <div class="product-item_img">
        <img src="${item.imgurl ?? ""}" alt="aaa" />
      </div>  
      <div class="product-item_toggle">
        <p class="product-item_number">${id}</p>
        <div class="product-item_content">
            <div class="product-item_header">
                <p class="product-item_title">
                    ${item.title}
                </p>
                <div class="product-item_icon">
                    +
                </div>
                <div class="product-item_icon active">
                    –
                </div>
            </div>
            <div class="product-item_text">
              <p>${item.content}</p>  
              ${item.cases ? `<p>相關案例: ${item.cases}</p>`: ""}  
            </div>
        </div>
      </div>
    </div>
  `
}
fetch("./json/product.json")
  .then(res => res.json())
  .then(data => {
    data.forEach((item) => 
      $(".products").append(productItem(item))
    );

    $(".product-item_icon").on("click", function() {
      const $productItem = $(this).closest(".product-item")

      $productItem.find(".product-item_icon").addClass("active")
      $(this).removeClass("active");
      
      $productItem.find(".product-item_text").toggle(300);
    });
  });

