document.addEventListener("DOMContentLoaded", function () {
  console.log("1123123123");
  var btn = document.getElementById("btn");
  btn.addEventListener("click", function () {
    console.log("clicked");
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs);
      if (tabs.length > 0) {
        fetch("content-script.js")
          .then((res) => res.text())
          .then((code) => {
            chrome.tabs.sendMessage(tabs[0].id, {
              type: "inject",
              code: code,
            });
          });
      } else {
        console.error("No active tab found");
      }
    });
  });
});
