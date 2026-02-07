const pointsElement = document.querySelector("#points-level")

let  totalScore = Number(localStorage.getItem("totalScore")) || 0
pointsElement.textContent = `Points: ${totalScore}`

const levelsElement = document.querySelectorAll(".levels")

levelsElement.forEach((level)=>{
const levelNumber = level.textContent
level.href=`game.html?level=${levelNumber}`
})
