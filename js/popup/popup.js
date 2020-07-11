function createMessageElement(title, subtitle) {
  const messageTitleElement = document.createElement("h3");
  messageTitleElement.classList.add("message__title");
  messageTitleElement.innerText = title;

  const messageSubtitleElement = document.createElement("h4");
  messageSubtitleElement.classList.add("message__subtitle");
  messageSubtitleElement.innerText = subtitle;

  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.append(messageTitleElement, messageSubtitleElement);

  return messageElement;
}

function update(assignments) {
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
    taskNameElement.classList.add("task__name");
    taskNameElement.innerText = `name: ${data.name}`;

    const taskLimitElement = document.createElement("p");
    taskLimitElement.classList.add("task__limit");
    taskLimitElement.innerText = `limit: ${data.limit}`;

    const taskSubjectElement = document.createElement("p");
    taskSubjectElement.classList.add("task__subject");
    taskSubjectElement.innerText = `subject: ${data.subject}`;

    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.append(taskNameElement, taskLimitElement, taskSubjectElement);
    taskElement.addEventListener("click", () => chrome.tabs.create({ url: data.link }));

    appElement.appendChild(taskElement);
  })
}

chrome.storage.sync.get("assignments", ({ assignments }) => update(assignments))
