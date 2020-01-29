(function (w, d, s, i, v, j, b) {
  w[i] = w[i] || function () {
    (w[i].v = w[i].v || []).push(arguments)
  };
  j = d.createElement(s),
    b = d.getElementsByTagName(s)[0];
  j.async = true;
  j.charset = "UTF-8";
  j.src = "https://www.v5kf.com/158422/v5kf.js";
  b.parentNode.insertBefore(j, b);
})(window, document, "script", "V5CHAT");
V5CHAT('nickname', sessionStorage.nickName);
V5CHAT('withoutBtn');

$(function () {
  $('#chat').click(function() {
    V5CHAT('showChat');
    V5CHAT('greeting', '你好，请问有什么可以帮到你');
    // V5CHAT('greeting', '你好欢迎使用\n[1] 第一条\n[2] 第二条');
  });
})
