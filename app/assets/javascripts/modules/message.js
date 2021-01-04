$(function () {
  function buildHTML(message) {
    if (message.image) {
      let html = 
        `<div class="main_chat__message-list__MsgBox" data-message-id=${message.id}>
          <div class="main_chat__message-list__member">
            ${message.user_name }
            <span class="main_chat__message-list__member__date">
              ${message.created_at}
            </span>
          </div>
          <div class="main_chat__message-list__message">
            <p class="main_chat__message-list__message__content">
              ${message.body}
            </p>
              <img class="main_chat__message-list__message__img" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html = 
        `<div class="main_chat__message-list__MsgBox" data-message-id=${message.id}>
          <div class="main_chat__message-list__member">
            ${message.user_name }
            <span class="main_chat__message-list__member__date">
              ${message.created_at}
            </span>
          </div>
          <div class="main_chat__message-list__message">
            <p class="main_chat__message-list__message__content">
              ${message.body}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $(".main_chat__message-from__form").on("submit",function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action")
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
    .fail(function(result) {
      alert("メッセージ送信に失敗しました");
    });
  });

  // $(function(){
  //   let reloadMessages=function(){
  //     let last_message_id = $(".main_chat__message-list__MsgBox:last").data("message-id") || 0;
  //     $.ajax({
  //       url: "api/messages",
  //       type: "get",
  //       dataType: "json",
  //       data: {id: last_message_id}
  //     })
  //     .done(function (messages) {
  //       if (messages.length !== 0) {
  //         let insertHTML = "";
  //         $.each(messages, function (i, message) {
  //           insertTML += buildHTML(message)
  //         });
  //         $(".main_chat__message-list").append(insertTML);
  //         $('.main_chat__message-list').animate({ scrollTop: $('.main_chat__message-list')[0].scrollHeight});
  //       }
  //     })
  //     .fail(function () {
  //       alert("error");
  //     })
  //   }
  // })
  // setInterval(reloadMessages, 7000);
});