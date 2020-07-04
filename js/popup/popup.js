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
    const title = "課題がインポートされていません";
    const subtitle = "TODOの画面でリロードすることで課題を更新します。";
    const messageElement = createMessageElement(title, subtitle);
    appElement.appendChild(messageElement);
    return
  }

  if (assignments.length === 0) {
    const title = "残っている課題はありません";
    const subtitle = "もしうまく反映されていなければTODOの画面でリロードしてください。";
    const messageElement = createMessageElement(title, subtitle);
    appElement.appendChild(messageElement);
    return
  }

  assignments.forEach((data) => {
    const taskNameElement = document.createElement("p");
    taskNameElement.innerText = `name: ${data.name}`;

    const taskLimitElement = document.createElement("p");
    taskLimitElement.innerText = `limit: ${data.limit}`;

    const taskSubjectElement = document.createElement("p");
    taskSubjectElement.innerText = `subject: ${data.subject}`;

    const taskElement = document.createElement("div");
    taskElement.setAttribute("class", "task");
    taskElement.append(taskNameElement, taskLimitElement, taskSubjectElement);
    taskElement.addEventListener("click", () => chrome.tabs.create({ url: data.link }));

    appElement.appendChild(taskElement);
  })
}

function refresh() {
  assignments = chrome.extension.getBackgroundPage().assignments;

  update()
}

chrome.storage.sync.get("assignments", (result) => {assignments = result.assignments; update()})
