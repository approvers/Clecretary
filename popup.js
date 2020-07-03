let assignments

function update() {
  let element = "";

  console.log(assignments)
  
  assignments.forEach((value) => {
    element += `<div class="task"><p>name: ${value.name}</p><p>limit: ${value.limit}</p><p>subject:${value.subject}</p></div>`
  })
  document.getElementById("app").innerHTML = element
}

function refresh() {
  assignments = chrome.extension.getBackgroundPage().assignments;

  update()
}

chrome.storage.sync.get("assignments", (result) => {assignments = result.assignments; update()})
document.getElementById("refresh").addEventListener("click", refresh)
