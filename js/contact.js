// 成功 toast
const success = `
    <section class='toast'>
        <div class='wrap'>
            <div class='text'>
                <h3 class='success'>感謝您的填寫，表單已成功送出！</h3>
                <p>收到表單後，將於 2～3 個工作天內（如遇假日將順延至上班日）回覆至您填寫的電子信箱。</p>
            </div>
            <button id='toastClear' class='btn'>確認</button>
        </div>
    </section>
  `;
// 失敗 toast
const fail = `
    <section class='toast'>
        <div class='wrap'>
            <div class='text'>
                <h3 class='fail'>系統忙碌中，表單暫時無法送出，請稍後再嘗試。</h3>
                <p>請稍後再進行嘗試，如持續無法送出，請改以電子郵件或電話聯繫我們。</p>
                <br/>
                <p>電子郵件 : gad@i-noby.com</p>
                <p>電話 : 02-77297391</p>
                <p>(客服服務時間:週一至週五9:00-12:00、13:00-18:00)</p>
            </div>
            <button id='toastClear' class='btn'>確認</button>
        </div>
    </section>
  `;

const showToast = (template) => {
  $(".toast").remove();
  // 添加toast
  $('body').append(template); 
  setTimeout(() => {
    $(".toast").addClass("show");
  }, 10);
  // 綁定關閉按鈕
  $('#toastClear').on('click',()=>{
    $(".toast").removeClass("show");
    $(".toast").addClass("hide");
    setTimeout(() => {
      $('.toast').remove();
    }, 600)
  });
};

// 正式環境 API 網址
const APIUrl = 'https://04qav2hfej.execute-api.ap-northeast-1.amazonaws.com/contact-us';
const form = document.getElementById('contactForm');
form.addEventListener('submit', async (e) => {
  // 初始化
  e.preventDefault();
  // 寄信格式
  const data = {
    name: form.name.value,
    email: form.email.value,
    type: form.type.value,
    message: form.message.value
  };
  // 發送 POST 
  try {
    const response = await fetch(APIUrl,{
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log(result);

    // 呼叫 toast
    showToast(success);
    form.reset();

  } catch (err) { // 錯誤回報
    console.error(err);
    // 呼叫 toast
    showToast(fail);
  };
});
