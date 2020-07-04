let assignments

function createMessageElement(title, subtitle) {
  const messageTitleElement = document.createElement("h3");
  messageTitleElement.setAttribute("class", "message__title");
  messageTitleElement.innerText = title;

  const messageSubtitleElement = document.createElement("h4");
  messageSubtitleElement.setAttribute("class", "message__subtitle");
  messageSubtitleElement.innerText = subtitle;

  const messageElement = document.createElement("div");
  messageElement.setAttribute("class", "message");
  messageElement.append(messageTitleElement, messageSubtitleElement);

  return messageElement;
}

function update() {
  const appElement = document.getElementById("app");

  if (assignments == null) {
    const messageElement = createMessageElement("課題がインポートされていません", "TODOの画面でリロードすることで課題を更新します。");
    appElement.appendChild(messageElement);
    return
  }

  if (assignments.length === 0) {
    const messageElement = createMessageElement("残っている課題はありません", "もしうまく反映されていなければTODOの画面でリロードしてください。");
    appElement.appendChild(messageElement);
    return
  }
  
  assignments.forEach((value, index) => {
    element += `<div class="task" id="assignment${index}"><p>name: ${value.name}</p><p>limit: ${value.limit}</p><p>subject: ${value.subject}</p></div>`
  })
  document.getElementById("app").innerHTML = element

  assignments.forEach((value, index) => 
    document.getElementById(`assignment${index}`).addEventListener("click", () => {
      chrome.tabs.create({url: value.link})
    })
  )
}

function refresh() {
  assignments = chrome.extension.getBackgroundPage().assignments;

  update()
}

chrome.storage.sync.get("assignments", (result) => {assignments = result.assignments; update()})
