const pointsElement = document.querySelector("#points-level")

let  totalScore = Number(localStorage.getItem("totalScore")) || 0
pointsElement.textContent = `Points: ${totalScore}`

const levelsElement = document.querySelectorAll(".levels")
const unlockedLevel = Number(localStorage.getItem("unlockedLevel")) || 2



levelsElement.forEach((level)=>{
const levelNumber = level.textContent

if (levelNumber <= unlockedLevel){
  level.href=`game.html?level=${levelNumber}`
}
else {
  level.addEventListener("click", () => {
    alert("Finish the previous level to unlock this one!")
  })
}

})

