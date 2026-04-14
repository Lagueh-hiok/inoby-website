// 過濾內容
function getCategoryList(catString) {
  return String(catString)
    .split(/[,，、.\s]+/)
    .map(str => str.trim())
    .filter(Boolean);
};

// -------------------------------------------------------------------

// 系統資料-基本卡片
function renderWorkCase(item) {
  const tags = item.category
    .map(cat => `<span>${cat}</span>`)
    .join("");
  return `
    <div class="list-item">
        <img src="${item.logo || "../img/missimg/missLogo.png"}" class="logo" alt="${item.content}-Logo"/>

        <div class="content">
            <h3>${item.unit || ""}</h3>
            <p class="title">${item.content || ""}</p>
            <p class="desc">${item.desc || ""}</p>
            <div class="tags">
              ${tags}
            </div>
        </div>
    </div>
    `;
};

// 網站資料 基本卡片
function renderWebsiteCase(item) {
  return item.link ?
    `
      <a href="${item.link}" class="website-case" title="${item.title + "-連結"}">
        <div class="website-case_img">
            <img src="${item.imgurl}" alt="${item.title}">
        </div>
        <div class="website-case_content">
            <div class="website-case_info">
                ${item.date ? `<p class="website-case_date">${item.date}</p>` : ""}
                <p class="website-case_category">${item.category}</p>
            </div>
            <p class="website-case_title">${item.title}</p>
        </div>
      </a>
    `
    :
    `
      <div class="website-case">
        <div class="website-case_img">
            <img src="${item.imgurl || "../img/missimg/missImg.png"}" alt="${item.title}">
        </div>
        <div class="website-case_content">
            <div class="website-case_info">
                ${item.date ? `<p class="website-case_date">${item.date}</p>` : ""}
                <p class="website-case_category">${item.category}</p>
            </div>
            <p class="website-case_title">${item.title}</p>
        </div>
      </div>
    `
};

// -------------------------------------------------------------------
// 下拉選單拉選單生成
function setupFilter(cases, type) {
  const $select = $("#list-filter");

  // 清空
  $select.empty();
  $select.append(`<option value="全部">全部</option>`);

  // 取得分類
  const allCategoryList = cases.flatMap(item => getCategoryList(item.category));
  const uniqueCategories = [...new Set(allCategoryList)];

  // 塞進選單
  uniqueCategories.forEach(item => {
    $select.append(`<option value="${item}">${item}</option>`);
  });

  // 先解除舊事件（超重要，不然會重複綁）
  $select.off("change");

  // 綁新的
  $select.on("change", function () {
    const category = $(this).val();
    let filtered = cases;

    if (category !== "全部") {
      filtered = cases.filter(item => {
        const categoryList = getCategoryList(item.category);
        return categoryList.includes(category);
      });
    }

    $("#lists-pagination").pagination({
      dataSource: filtered,
      pageSize: type === "website" ? 9 : 10,
      callback: type === "website" ? renderWebsiteList : renderWorkList,
    });
  });
}

// -------------------------------------------------------------------

// 系統實例-渲染內容
function renderWorkList(data) {
  lenis.scrollTo(0);
  const $lists = $(".lists");
  $lists.empty();
  if (data.length <= 0) return $lists.append(`<div style="font-size: 24px; font-weight: bold; color: #555"> 錯誤，沒有資料 </div>`)
  data.forEach(item => $lists.append(renderWorkCase(item)));
};

// 網站實例-渲染內容
function renderWebsiteList(data) {
  lenis.scrollTo(0);
  const $lists = $(".lists");
  $lists.empty();
  if(data.length <= 0) return $lists.append(`<div style="font-size: 24px; font-weight: bold; color: #555"> 錯誤! 沒有資料! </div>`)
  $lists.append(`<div class="website-cases"></div>`)
  const $websiteCases = $(".website-cases");
  data.forEach(item => $websiteCases.append(renderWebsiteCase(item)));
};

// -------------------------------------------------------------------
// 抓取資料
let systemCases = [];
let websiteCases = [];

// 系統資料 - 抓取資料
fetch("./json/partners.json")
  .then(res => res.json())
  .then(cases => {
    systemCases = cases;
    // 預設顯示
    $("#lists-pagination").pagination({
      dataSource: cases,
      pageSize: 10,
      callback: renderWorkList,
    });

    // 生成下拉選單
    const allCategoryList = cases.flatMap(item => getCategoryList(item.category));
    const nuiqueCategories = [...new Set(allCategoryList)]
    const $select = $("#list-filter");

    nuiqueCategories.forEach((item) => {
      $select.append(`<option value="${item}">${item}</option>`);
    });

    // 綁定按鈕觸發
    setupFilter(systemCases, "work");
  });

// 網站資料 - 抓取資料
fetch("./json/websiteCases.json")
  .then(res => res.json())
  .then(cases => {
    websiteCases = cases;
  });

// -------------------------------------------------------------------
// 頁籤切換
$(".tab-btn").on("click", function () {
  $(".tab-btn").removeClass("active");
  $(this).addClass("active");

  const type = $(this).data("type");

  if (type === "work") {
    $("#lists-pagination").pagination({
      dataSource: systemCases,
      pageSize: 10,
      callback: renderWorkList,
    });

    setupFilter(systemCases, "work");
  }

  if (type === "website") {
    $("#lists-pagination").pagination({
      dataSource: websiteCases,
      pageSize: 9,
      callback: renderWebsiteList,
    });

    setupFilter(websiteCases, "website");
  }
});