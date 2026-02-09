let totalScore = Number(localStorage.getItem("totalScore")) || 0
const pointsElement = document.querySelector("#points")
pointsElement.textContent = `Points: ${totalScore}`

const levelsElement = document.querySelectorAll(".levels")
let unlockedLevel = Number(localStorage.getItem("unlockedLevel")) || 2

levelsElement.forEach((level)=>{
const levelNumber = level.textContent
if (levelNumber <= unlockedLevel){
  level.href=`game.html?level=${levelNumber}`
}
else {
  level.addEventListener("click", (event) => {
  event.preventDefault() //prevent the browser open the link
  alert("Finish the previous level to unlock this one!")
  })
  level.classList.add("locked")
}
})

const resetProgressElement = document.querySelector("#reset-progress")
resetProgressElement.addEventListener("click", ()=> {
  localStorage.setItem("totalScore","0")
  localStorage.setItem("unlockedLevel","2")
  location.reload()
})
