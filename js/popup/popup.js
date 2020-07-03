let assignments

function update() {
  let element = "";

  if (assignments == null) {
    document.getElementById("app").innerHTML = "<h3>課題がインポートされていません</h3><h4>TODOの画面でリロードすることで課題を更新します</h4>"
    return
  }

  if (assignments.length === 0) {
    document.getElementById("app").innerHTML = "<h3>残っている課題はありません</h3><h4>もしうまく反映されていなければTODOの画面でリロードしてください。</h4>"
    return
  }
  
  assignments.forEach((value, index) => {
    element += `<div class="task" id=assignment${index}><p>name: ${value.name}</p><p>limit: ${value.limit}</p><p>subject: ${value.subject}</p></div>`
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
