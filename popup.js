let assignments

function update() {
  let element = "";

  console.log(assignments)
  
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

function moveToAssignment(url) {
  console.log(url)
  chrome.tabs.create({url})
}

chrome.storage.sync.get("assignments", (result) => {assignments = result.assignments; update()})
document.getElementById("refresh").addEventListener("click", refresh)
