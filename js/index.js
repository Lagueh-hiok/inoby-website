// 影片播放

const video = document.getElementById('heroVideo');
video.addEventListener("canplay", () => {
    video.play().catch(err => {
        console.log("影片播放失敗", err);
    });
});


//- 數字增加動畫
const numberContainer = document.querySelectorAll(".count-number");
// 數字的狀態
const numbers = [
    {
        startNum: 1,
        currentNum: 1,
        endNum: 50,
    }, {
        startNum: 1,
        currentNum: 1,
        endNum: 100,
    },
];

// 開關控制
let animationStart = false;
// 開關檢測
const animationSwitch = () => {
    for (let x = 0; x < numbers.length; x++) {
        if (numbers[x].currentNum < numbers[x].endNum) {
            animationStart = true;
        } else {
            animationStart = false;
        };
    };
};

const startTime = Date.now(); //開始時間
const duration = 15; //每一個單位+1的時候需要的時間

function addUp() {
    // 檢查數字有沒有超過上限 (開關控制)
    animationSwitch();

    let now = Date.now();
    numberContainer.forEach((item, i) => {
        // 計算時間 
        let nowTime = startTime + duration * (numbers[i].currentNum - numbers[i].startNum);
        if (now > nowTime && numbers[i].currentNum < numbers[i].endNum) {
            numbers[i].currentNum++;
            item.innerHTML = numbers[i].currentNum + "+";
        };
    });

    if (animationStart) requestAnimationFrame(() => addUp());
};


const caseScroll = document.getElementById("caseScroll");

if (caseScroll) {
    const onScroll = () => {
        const windowHeight = window.innerHeight;
        const caseHeight = caseScroll.getBoundingClientRect().top - windowHeight / 2;

        if (caseHeight <= 0) {
            addUp();
            window.removeEventListener("scroll", onScroll);
        }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
}
// --------------------- 合作夥伴 ----------------------
function worksItem(item, index) {
    return item.link ? 
        `<a href="${item.link}" class="works-card" data-slot="${index}" title="${item.title}">
        <div class="img">
            <img src="${item.imgurl}" alt="">
        </div>
        <div class="info">
            ${ item.data ? `<p class="date">${item.date}</p>` : ""}
            <p class="category">${item.category}</p>
        </div>
        <h3>${item.title}</h3>
        </a>`
        :
        `<div class="works-card" data-slot="${index}">
        <div class="img">
            <img src="${item.imgurl}" alt="">
        </div>
        <div class="info">
            <p class="date">${item.date}</p>
            <p class="category">${item.category}</p>
        </div>
        <h3>${item.title}</h3>
        </div>`
};

fetch("./json/websiteCases.json")
    .then(res => res.json())
    .then((data) => {
        data.forEach((item, index) => {
            if (index <= 2) {
                return $(".works-left-grid").append(worksItem(item, index))
            }else if (index <= 7) {
                return $(".works-right-grid").append(worksItem(item, index))
            }
            return
        });
    })






















