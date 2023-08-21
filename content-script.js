chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "inject") {
    init();
  }
});
function randomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function querySelector_tag_(element, str) {
  console.log(element);
  let retc ;
  for(i in element.childNodes){
    if(element.childNodes[i].tagName.toLowerCase()==str){
      retc=element.childNodes[i];
      break;
    }
  }
  return retc;
}
function querySelector_tag_All_(element, str) {
  const ret = [];
  for (i in element.childNodes) {
    if (element.childNodes[i].tagName&&element.childNodes[i].tagName.toLowerCase() == str) {
      ret.push(element.childNodes[i]);
    }
  }
  return ret;
}
function querySelector_class_(element, str) {
  console.log(element);
  let retc ;
  for(i in element.childNodes){
    if(element.childNodes[i].classname.toLowerCase()==str){
      retc=element.childNodes[i];
      break;
    }
  }
  return retc;
}
function querySelector_class_All_(element, str) {
  const ret = [];
  for (i in element.childNodes) {
    if (element.childNodes[i].classname.toLowerCase() == str) {
      ret.push(element.childNodes[i]);
    }
  }
  return ret;
}
function init() {
  console.log("init()");
  markdown = `# `;
  console.log(document.querySelector("h1"));
  const title = document.querySelector("h1").textContent;
  markdown += title + "\n";
  // let cenjim = 0;
  // let cenjimi = 0;
  // while (1) {
  //   freshDoc=null;
  //   chrome.runtime.sendMessage({ type: 'getDoc' }, (response) => {
  //     freshDoc = response.document;
  //   });
  //   const content = freshDoc.querySelector(".notion-page-content");

  //   Array.from(content.children).forEach((node) => {
  //     let cenjimin = cenjim;
  //     let cenjimin_ = cenjim;
  //     cenjimi = max(cenjimi, openarrow(node, 0, cenjimin, cenjimin_));
  //   });
  //   if (cenjimi > cenjim) {
  //     cenjim = cenjimi;
  //   } else {
  //     break;
  //   }
  // }
  const contentconst = document.querySelector(".notion-page-content");
  contentconst.id = "notion-page-content-id";
  const content = document.getElementById("notion-page-content-id");
  console.log(content);
  for (i in content.childNodes) {
    markdown = change(content.childNodes[i], markdown, "");
  }
  // for(let i=0;i<content.children.length;i++){
  //   markdown=change(content.children[i],markdown,"");
  // }
  // content.children.forEach((node) => {
  //   markdown = change(node, markdown, "");
  // });
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
  } else if (classname == "notion-selectable notion-numbered_list-block") {
    const inner = querySelector_tag_(content, "div");
    if (inner != null) {
      const other = inner[1];
      const index = querySelector_class_(inner, "pseudoSelection");
      const realindex = querySelector_tag_(index, "span");
      const regex = /&quot;([^&]*)\./;
      const match = realindex.outerHTML.match(regex);
      markdown += cenji + match[1] + ". ";
      const firstline_content = querySelector_tag_(other, "div");
      markdown += firstline_content.textContent + '\n';
      Array.from(other.childNodes).slice(1).forEach((node) => {
        console.log(node);

        markdown = change(node, markdown, cenji + "    ");
      });
    }
  } else if (classname == "notion-selectable notion-toggle-block") {
    const inner1=querySelector_tag_(content,"div");
    console.log(inner1);
    const inner = querySelector_tag_All_(inner1, "div");
    console.log(inner);
    const arrow = querySelector_tag_(inner[0], "div");
    console.log(arrow);
    arrow.click();
    console.log(content);
    const textcontent = inner[1];
    console.log(textcontent);
    console.log(querySelector_tag_(querySelector_tag_(textcontent, "div"), "div").textContent);
    markdown += cenji + querySelector_tag_(querySelector_tag_(textcontent, "div"), "div").textContent + '\n';
    console.log(querySelector_tag_All_(textcontent, "div"));
    console.log(querySelector_tag_(querySelector_tag_All_(textcontent, "div")[1], "div").childNodes);
    const contentchildren=querySelector_tag_(querySelector_tag_All_(textcontent, "div")[1], "div").childNodes;
    for(i in contentchildren){

      console.log(contentchildren[i]);
      markdown = change(contentchildren[i], markdown, cenji + "    ");
    }
  }
  //console.log(markdown);
  return markdown;
}
