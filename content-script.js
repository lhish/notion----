chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "inject") {
    init();
  }
});
function init() {
  console.log("init()");
  markdown = `# `;
  console.log(document.querySelector("h1"));
  const title = document.querySelector("h1").textContent;
  markdown += title + "\n";
  const content = document.querySelector(".notion-page-content");
  Array.from(content.children).forEach((node) => {
    markdown = change(node, markdown, "");
  });
  console.log(markdown);
}
function change(content, markdown, cenji) {
  console.log(content);
  const classname = content.getAttribute("class");
  console.log(classname);
  if (classname == "notion-selectable notion-text-block") {
    markdown += cenji + content.textContent + "\n";
  } else if (classname == "notion-selectable notion-header-block") {
    markdown += cenji + "# " + content.textContent + "\n";
  } else if (classname == "notion-selectable notion-sub_header-block") {
    markdown += cenji + "## " + content.textContent + "\n";
  } else if (classname == "notion-selectable notion-sub_sub_header-block") {
    markdown += cenji + "### " + content.textContent + "\n";
  } else if (classname == "notion-selectable notion-page-block") {
    //page
  } else if (classname == "notion-selectable notion-quote-block") {
    markdown += cenji + "> " + content.textContent + "\n";
  } else if (classname == "notion-selectable notion-table_of_contents-block") {
    markdown += cenji + "[TOC]\n";
  } else if ((classname == "notion-selectable notion-numbered_list-block")) {
    const inner = content.querySelector("div");
    const other=inner.querySelectorAll("div")[1];
    const index = inner.querySelector(".pseudoSelection");
    const realindex = index.querySelector("span");
    const regex = /&quot;([^&]*)\./;
    const match = realindex.outerHTML.match(regex);
    markdown+=cenji+match[1]+". ";
    const firstline_content=other.querySelector("div");
    markdown+=firstline_content.textContent+'\n';
    Array.from(content.children).slice(1).forEach((node) => {
      markdown = change(node, markdown, cenji+"    ");
    });
  }
  //console.log(markdown);
  return markdown;
}
