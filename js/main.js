//-------------------------------------初始化----------------------------------------
//- Aos init
AOS.init();

//- Lenis 平滑滾動插件 init 
const lenis = new Lenis({
    autoRaf: true,
    easing: (t) => 1 - Math.pow(1 - t, 2.5),
    lerp: 0.001,
    // duration: 1.1,
    smoothTouch: false,
});
//-------------------------------------導覽列----------------------------------------
let menuSwitch = false;
$(".nav-menu_swicth").on("click", ()=>{
    if(menuSwitch) {
        $(".nav-menu_icon").addClass("open")
        $(".nav-menu").addClass("active")
    }else{
        $(".nav-menu_icon").removeClass("open")
        $(".nav-menu").removeClass("active")
    }
    menuSwitch = !menuSwitch;
})
//-------------------------------------程式碼開始----------------------------------------
//- 滾動至頂部 
function scrollTop() {
    lenis.scrollTo(0)
}

$("#top").on("click", scrollTop);

//- Marquee 
function createSeamlessScroller(containerId, contentId, direction, speed = 1) {
    const container = document.getElementById(containerId);
    const content = document.getElementById(contentId);
    if (!container || !content) { // 檢查是否有這些元素
        return;
    };

    const clonedContent = content.cloneNode(true);
    const clonedContent2 = content.cloneNode(true);
    const clonedContent3 = content.cloneNode(true);
    container.appendChild(clonedContent); // 把複製的元素推入第一個
    container.appendChild(clonedContent2); // 推入第二個
    container.appendChild(clonedContent3); // 推入第三個

    let scrollPosition = 0;

    container.style.display = "flex"
    container.style.flexWrap = "noWrap"
    function animate() { // 位移動畫
        if (direction === "left") {
            scrollPosition -= speed;
            if (scrollPosition <= -content.offsetWidth) {
                scrollPosition = 0;
            };
            container.style.transform = `translateX(${scrollPosition}px)`
        } else if (direction === "right") {
            scrollPosition -= speed;
            if (scrollPosition <= -content.offsetWidth) {
                scrollPosition = 0;
            };
            container.style.transform = `translateX(${-scrollPosition - content.offsetWidth}px)`
        } else if (direction === "top") {
            scrollPosition -= speed;
            if (scrollPosition <= -content.offsetHeight) {
                scrollPosition = 0;
            };
            container.style.transform = `translateY(${-scrollPosition}px)`
        } else if (direction === "bottom") {
            scrollPosition -= speed;
            if (scrollPosition <= -content.offsetHeight) {
                scrollPosition = 0;
            };
            container.style.transform = `translateY(${-scrollPosition}px)`
        };

        animationId = requestAnimationFrame(animate);
    };

    animate(); // 呼叫函式
    return {
        stop: () => cancelAnimationFrame(animate) // 停止跑馬燈
    }

};
// 添加跑馬燈
const scroller = createSeamlessScroller("serviceMarquee", "serviceMarquee-item", "left", 1);
const caseMarquee1 = createSeamlessScroller("caseMarquee1", "caseMarquee1-item", "right", 0.75);
const caseMarquee2 = createSeamlessScroller("caseMarquee2", "caseMarquee2-item", "left", 0.75);
const workMarquee1 = createSeamlessScroller("workCases1", "workCases1-item", "right", 0.75);
const workMarquee2 = createSeamlessScroller("workCases2", "workCases2-item", "left", 0.75);