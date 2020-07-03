async function loadElement(){
  setTimeout(() => {
    let assignments = null;
    while (assignments == null || assignments.children == null){
      assignments = document.querySelector("#yDmH0d > div.v7wOcf.ZGnOx > div.Z3qXvc.kdAl3b > div.pEwOBc")
    }
    
    let elements = assignments.children;
    let limit = "";
    let assignment_contents = []
    
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].className === "WN8ale i9glDf") {
        limit = elements[i].textContent
        continue
      }
      assignment = getAssignmentsInfo(elements[i])

      assignment.limit = getLimit(limit)
      assignment_contents.push(assignment)
    }

    chrome.storage.sync.set({"assignments": assignment_contents}, () => {})
    chrome.runtime.sendMessage({assignments: assignment_contents})
  }, 5000)
}

const days = ["期限: 日曜日", "期限: 月曜日", "期限: 火曜日", "期限: 水曜日", "期限: 木曜日", "期限: 金曜日", "期限: 土曜日"]

function getLimit(limit) {
  if (days.includes(limit))
    return getDataFromDay(limit)
  if (limit === "明日")
    return getTomorrowDate()
  if (limit === "期限なし")
    return limit

  return limit.slice(4)
}

function getAssignmentsInfo(element) {
  let name = element.getElementsByClassName("YVvGBb")[0].getElementsByClassName("onkcGd YVvGBb Evt7cb jp5EVb")[0].textContent
  let subject = element.getElementsByClassName("YVvGBb")[0].getElementsByClassName("QRiHXd")[0].textContent
  let rawLink = element.getElementsByClassName("YVvGBb")[0].getElementsByClassName("onkcGd YVvGBb Evt7cb jp5EVb")[0].getAttribute("href")

  let link = "https://classroom.google.com" + rawLink
  
  if (subject.includes("期限"))
    subject = subject.split("期限:")[0].slice(0, -3)

  return {name, subject, link}
}

function getTomorrowDate() {
  let today = new Date();
  today.setDate(today.getDate() + 1)

  return `${today.getMonth() + 1}月${today.getDate()}日`
}

function getDataFromDay(day) {
  let dayIndex = days.indexOf(day)

  let today = new Date();

  let dayToday = today.getDay();

  if (dayIndex < dayToday) {
    dayIndex += 7
  }

  let dayDiff = dayIndex - dayToday

  today.setDate(today.getDate() + dayDiff)

  return `${today.getMonth() + 1}月${today.getDate()}日`
}

loadElement()
