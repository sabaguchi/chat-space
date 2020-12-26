$(function () {
  function buildHTML(message) {
    if (message.image) {
      let html = `<div class="main_chat__message-list__member">
                    ${message.user_name }
                    <span class="main_chat__message-list__member__date">
                      ${message.created_at}
                    </span>
                  </div>
                  <div class="main_chat__message-list__message">
                    <p class="main_chat__message-list__message__content">
                      ${message.body}
                    </p>
                    <img class="main_chat__message-list__message__img" src="message.image">
                  </div>`
      return html;
    } else {
      let html = `<div class="main_chat__message-list__member">
      ${message.user_name }
      <span class="main_chat__message-list__member__date">
        ${message.created_at}
      </span>
    </div>
    <div class="main_chat__message-list__message">
      <p class="main_chat__message-list__message__content">
        ${message.body}
      </p>
    </div>`
      return html;
    };
  }
  $(".main_chat__message-from__form").on("submit",function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action")
    console.log(url)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      let html = buildHTML(data);
      $('.main_chat__message-list').append(html);
      $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  });
});