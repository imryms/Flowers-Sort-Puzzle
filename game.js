const tubesContainerElement = document.querySelector("#tubes-container")
const testTubeElement = document.querySelectorAll(".test-tube")
const slotElement = document.querySelectorAll(".slot")
const winnerContainerElement = document.querySelector("#winner-container")
const floatingFlower = document.querySelector("#floating-flower")
const gameScreenElement = document.querySelector('#game-screen')
const pointsElement = document.querySelector("#points")
let level
let floatingColor = null
// Get the saved total score from localStorage
let  totalScore = Number(localStorage.getItem("totalScore")) || 0
pointsElement.textContent = `Points: ${totalScore}`

const levelScoreElement = document.querySelector('#level-score')
const totalScoreElement = document.querySelector("#total-score")

// const levelNumberElement = document.querySelector('#game-level')

// refrenced by https://builtin.com/articles/urlsearchparams to find which level I am in
const parms = new URLSearchParams(window.location.search)
const levelFromUrl = parms.get("level")

if (levelFromUrl !== null) {
  level = Number(levelFromUrl)
} else {
  level = 1
}
console.log(levelFromUrl, level)

let levelScore = level * 200

const levelsTubes = {
  1: [
    ["red", "blue", "red", "blue"],
    ["blue", "red", "blue", "red"],
    [],
    [],
  ],

  2: [
    ["red", "blue", "green", "red"],
    ["blue", "green", "red", "blue"],
    ["green", "red", "blue", "green"],
    [],
  ],
}
// Create a copy of the level tubes so we don't modify the original level data
let tubes = (levelsTubes[level] || levelsTubes[1]).map((tube) => {
  return [...tube]
})

let selectedTube = null
let hideSelectedTop = false

function render() {
  slotElement.forEach((slot) => {
    slot.innerHTML = ""
  })

  tubes.forEach((tube, tubeIndex) => {
    const slots = testTubeElement[tubeIndex].querySelectorAll(".slot")
    tube.forEach((color, flowerIndex) => {
      if (
        tubeIndex === selectedTube &&
        hideSelectedTop === true &&
        flowerIndex === tube.length - 1
      ) {
        return
      }
      const slot = slots[flowerIndex]
      const flower = document.createElement("div")
      flower.classList.add("flower", color)
      slot.appendChild(flower)
    })
  })
}


testTubeElement.forEach((tube, tubeIndex) => {
  tube.addEventListener("click", () => handleTubeClick(tubeIndex))
})

const capacity = 4

function validMove(source, destination) {
  if (tubes[source].length === 0) {
    return false
  }

  if (tubes[destination].length === capacity) {
    return false
  }
  return true
}

function moveFlower(source, destination) {
  const movingColor = tubes[source].pop()
  tubes[destination].push(movingColor)

  render()
  if (checkWin()=== true){
    levelScoreElement.textContent = `Level Score: ${levelScore}`
    totalScore += levelScore
    localStorage.setItem("totalScore", totalScore)
    pointsElement.textContent = `Points: ${totalScore}`
    totalScoreElement.textContent = `Total Score: ${totalScore}`
    winnerContainerElement.style.display = "block"
    gameScreenElement.style.display="none"

  }
}


function handleTubeClick(tubeIndex) {
  if (selectedTube === null) {
    if (tubes[tubeIndex].length === 0) return

    selectedTube = tubeIndex
    hideSelectedTop = true
    floatingColor = tubes[tubeIndex][tubes[tubeIndex].length - 1]

    floatingFlower.innerHTML = ""
    const flower = document.createElement("div")
    flower.classList.add("flower", floatingColor)
    floatingFlower.appendChild(flower)

    const tubeRect = testTubeElement[tubeIndex].getBoundingClientRect()
    floatingFlower.style.left = tubeRect.left + tubeRect.width / 2 + "px"
    floatingFlower.style.transform = "translateX(-50%)"
    floatingFlower.style.top =tubeRect.top - floatingFlower.offsetHeight + "px"

    render()
    return
  }

  const source = selectedTube
  const destination = tubeIndex

  if (source === destination) {
    floatingFlower.innerHTML = ""
    floatingColor = null
    selectedTube = null
    hideSelectedTop = false
    render()
    return
  }

  if (validMove(source, destination)) {
    moveFlower(source, destination)
  }

  floatingFlower.innerHTML = ""
  floatingColor = null
  selectedTube = null
  hideSelectedTop = false
  render()
}

function isTubeComplete(tube){
  if(tube.length ===0){
    return true
  }
  if(tube.length !== capacity){
    return false
  }
  let firstColor = tube[0]
  for (let i=1; i<tube.length; i++){
    if(tube[i] !== firstColor){
      return false
    }
  }
  return true
}

function checkWin() {
  for( let i=0; i< tubes.length; i++){
    if(isTubeComplete(tubes[i])=== false){
      return false
    }
  }
  return true;
}

render()
