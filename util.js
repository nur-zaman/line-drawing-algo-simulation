const dda = document.getElementById('dda')
const midpoint = document.getElementById('midpoint')
const circle = document.getElementById('circle')

const ddaIN = document.getElementById('dda-input')
const midpointIN = document.getElementById('midp-input')
const circleIN = document.getElementById('circle-input')

function toggleInput(button,inputDOM){
    button.onclick=()=>{
    inputDOM.hidden = inputDOM.hidden ? false : true
}
}

toggleInput(dda,ddaIN)
toggleInput(midpoint,midpointIN)
toggleInput(circle,circleIN)

