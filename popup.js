chrome.storage.sync.get("assignments", (result) => {
  let assignments = result.assignments;

  let element = "";

  assignments.forEach(value, () => {
    element += `<div>課題名: ${value.name}  limit: ${value.limit} subject:${value.subject}</div>`
  })
  document.getElementById("id").innerHTML = element
})
