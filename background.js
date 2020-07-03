var assignments = []

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request)
  assignments = request.assignments
})
