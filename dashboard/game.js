/** @var */

var isDown = false
var elt = ''
var modal = document.querySelector('.modal')
var title = document.querySelector('title')
var number = document.querySelector('#number span')
var mynumber = document.querySelector('#bet')
var emojis = ["🤣","😊","✌","🌹","🎂","🤳","🐱‍👤"]

/** time to timeout */
var time = 0

/** handlers time and interval thread */
var handleInterval = null
var handleTimeout = null

/** selectors */
var startBtn = document.querySelector('#start')
var game = document.querySelector('#game')

/** ready to play */
var listenerAdded = false

/** game is running */
var isRunning = false

/** mount the modal component */
function clickPopDown(){
    isDown = !isDown
    popDown()
    // document.querySelector(`.modal`).parentNode.classList.add('d-none')
}

/** destroy the modal component */
function popDown(){
    if(!isDown){
        document.querySelector(`#${elt}`).removeEventListener('click',clickPopDown(elt))
        if(document.querySelector(`.modal`).parentNode.classList.contains('d-none'))
            document.querySelector(`.modal`).parentNode.classList.remove('d-none')
        
        document.querySelector(`#${elt}`).removeAttribute('id')
        modal.removeAttribute('id')
        modal.innerHTML = ''
        game.addEventListener('mouseover',addListeners)
        clearTimeout(handleTimeout)
    } 
}

function popUp(){
    modal.parentNode.setAttribute('id',`${elt}`)
    modal.setAttribute('id','modal')
    var msg = elt == 'win' ? "😎 <br> You win !" : "🤦‍♂️ <br> You lose !"
    modal.innerHTML = msg
    document.querySelector(`#${elt}`).addEventListener('click',clickPopDown)
}


/** return random number (integer) */
function randomNumber(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/** change the number */
function changeNumber(){
    var random_number = randomNumber(1,7)
    number.innerHTML = random_number
    title.innerHTML = "who is it?-->"+emojis[random_number-1]
}

/** show the final result */
function showResult(){
    clearInterval(handleInterval)
    clearTimeout(handleTimeout)
    startBtn.removeEventListener('click',start)

    if(number.innerHTML == mynumber.value){
        elt = 'win'
        popUp()
        handleTimeout = setTimeout(popDown,5000)
    }else{
        elt = 'lose'
        popUp()
        handleTimeout = setTimeout(popDown,5000)
    }



    /** not ready to play */
    listenerAdded = false

    /** game is finished */
    isRunning = false
}

/** change the number all 40 ms */
function rollNumber(){
    handleInterval = setInterval(changeNumber,40)
}

/** stop the game */
function stopper(){
    time = randomNumber(3,5) * 1000
    handleTimeout = setTimeout(showResult,time)
}

/** start the game */
function start(){
    if(!isRunning){
        
        isRunning = true
        rollNumber()
        stopper()

    }else{
        
    }
}

/** make the game ready to play */
function addListeners(){
    
    if(!listenerAdded){
        startBtn.addEventListener('click', start)
        listenerAdded = true
        game.removeEventListener('mouseover',addListeners)
    }
}

/** remove this listener to avoid to make another party or to override the current game*/
game.addEventListener('mouseover',addListeners)
