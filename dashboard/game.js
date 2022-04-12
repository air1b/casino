/** @var */
var audio = new Audio('drum.mp3');
var loseSound = new Audio('lose.mp3');
var winSound = new Audio('win.mp3');

var addCoin = document.querySelector('#addcoin') 
var subCoin = document.querySelector('#subcoin') 
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
        if(elt == 'win'){
            addCoin.classList.remove('slide-out-top')
            addCoin.classList.add('d-none')
        }else{
            subCoin.classList.remove('slide-out-top')
            subCoin.classList.add('d-none')
        }

        clearTimeout(handleTimeout)
    } 
}

function popUp(){
    if(elt == 'win'){
        winSound.play()
    }else{
        loseSound.play()
    }
    modal.parentNode.setAttribute('id',`${elt}`)
    modal.setAttribute('id','modal')
    var msg = elt == 'win' ? "😎 <br> You win !" : "🤦‍♂️ <br> You lose !"
    modal.innerHTML = msg
    if(elt == 'win'){
        addCoin.classList.remove('d-none')
        addCoin.classList.add('slide-out-top')
    }else{
        subCoin.classList.remove('d-none')
        subCoin.classList.add('slide-out-top')
    }
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
        // popUp()
        handleTimeout = setTimeout(popUp,500)
        handleTimeout = setTimeout(popDown,5000)
    }else{
        elt = 'lose'
        // popUp()
        handleTimeout = setTimeout(popUp,500)
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
    time = 6000 
    // randomNumber(3,5) * 1000
    handleTimeout = setTimeout(showResult,time)
}

/** start the game */
function start(){
    if(!isRunning){
        audio.play()
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
