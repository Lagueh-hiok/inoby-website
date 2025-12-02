

// 過濾內容
function getCategoryList(catString) {
  return String(catString)
    .split(/[,，、.\s]+/)
    .map(str => str.trim())
    .filter(Boolean);
};

// 後端資料-基本卡片
function renderbackstageCase(item) {
  return `
    <div class="backstage-case">
        <div class="backstage-case_logo">
            <img src="${item.logo}" alt="台北市職能發展學院">
        </div>
        <div class="backtage-case_content">
            <p class="backstage-case_text">${item.content}</p>
            <p class="backstage-case_category">${item.category}</p>
        </div>
    </div>
    `;
};

// 後端系統實例-渲染內容
function renderbackstageList(data) {
  const $container = $(".backstage-cases");
  $container.empty();
  if(data.length <= 0) return $container.append(`<div style="font-size: 24px; font-weight: bold; color: #555"> 錯誤! 沒有資料! </div>`)
  data.forEach(item => $container.append(renderbackstageCase(item)));
};

// 後台系統實例
fetch("./json/backstageCase.json")
  .then(res => res.json())
  .then(cases => {
    $("#backstage-pagination").pagination({
      dataSource: cases,
      pageSize: 4,
      callback: renderbackstageList,
    });

    // 綁定按鈕觸發
    $(".filter-backstage-btn").on("click", function() {
      $(".filter-backstage-btn").removeClass("select-btn");
      $(this).addClass("select-btn");

      const category = $(this).data("cat");
      let filtered = cases;
      
      if(category !== "全部") {
        filtered = cases.filter(item => {
          const categoryList = getCategoryList(item.category);
          return categoryList.includes(category);
        });
      };

      $("#backstage-pagination").pagination({
        dataSource: filtered,
        pageSize: 4,
        callback: renderbackstageList,
      });
    
    });
  });


// 前端資料 基本卡片
function renderFrontendCase(item) {
  return item.link ?
    `
      <a href="${item.link}" class="frontend-case" title="${item.title + "-連結"}">
        <div class="frontend-case_img">
            <img src="${item.imgurl}" alt="${item.title}">
        </div>
        <div class="frontend-case_content">
            <div class="frontend-case_info">
                <p class="frontend-case_date">${item.date || "未提供日期"}</p>
                <p class="frontend-case_category">${item.category}</p>
            </div>
            <p class="frontend-case_title">${item.title}</p>
        </div>
      </a>
    `
    :
    `
      <div class="frontend-case">
        <div class="frontend-case_img">
            <img src="${item.imgurl}" alt="${item.title}">
        </div>
        <div class="frontend-case_content">
            <div class="frontend-case_info">
                <p class="frontend-case_date">${item.date || "未提供日期"}</p>
                <p class="frontend-case_category">${item.category}</p>
            </div>
            <p class="frontend-case_title">${item.title}</p>
        </div>
      </div>
    `
    
};

// 前端系統實例-渲染內容
function renderFrontendList(data) {
  const $container = $(".frontend-cases");
  $container.empty();
  if(data.length <= 0) return $container.append(`<div style="font-size: 24px; font-weight: bold; color: #555"> 錯誤! 沒有資料! </div>`)
  data.forEach(item => $container.append(renderFrontendCase(item)));
};

// 前台系統實例
fetch("./json/frontendCase.json")
  .then(res => res.json())
  .then(cases => {
    $("#frontend-pagination").pagination({
      dataSource: cases,
      pageSize: 9,
      callback: renderFrontendList,
    });


    // 綁定按鈕觸發
    $(".filter-frontend-btn").on("click", function() {
      $(".filter-frontend-btn").removeClass("select-btn");
      $(this).addClass("select-btn");
      const category = $(this).data("cat");
      let filtered = cases;
      
      if(category !== "全部") {
        filtered = cases.filter(item => {
          const categoryList = getCategoryList(item.category);
          return categoryList.includes(category);
        });
      }

      $("#frontend-pagination").pagination({
        dataSource: filtered,
        pageSize: 9,
        callback: renderFrontendList,
      });
    
    });
  });