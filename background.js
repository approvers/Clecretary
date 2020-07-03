var assignments = []

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  assignments = request.assignments
})
