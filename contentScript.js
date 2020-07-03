async function loadElement(){
  setTimeout(() => {
    let assignments = null;
    while (assignments == null || assignments.children == null){
      assignments = document.querySelector("#yDmH0d > div.v7wOcf.ZGnOx > div.Z3qXvc.kdAl3b > div.pEwOBc")
    }
    console.log(assignments)
    
    let elements = assignments.children;
    let limits = [];
    
    for (let i = 0; i < elements.length; i++) {
      console.log(elements[i]);
      if (elements[i].className === "WN8ale i9glDf")
        limits.push(elements[i].textContent)
    }
    console.log(limits)
  }, 5000)
}

loadElement()
