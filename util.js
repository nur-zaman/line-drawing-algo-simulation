const dda = document.getElementById('dda')
const midpoint = document.getElementById('midpoint')
const circle = document.getElementById('circle')

const ddaIN = document.getElementById('dda-input')
const midpointIN = document.getElementById('midp-input')
const circleIN = document.getElementById('circle-input')


// console.log("in util")

function toggleInput(button,inputDOM){
    button.onclick=()=>{
    console.log("clicked")
    inputDOM.hidden = inputDOM.hidden ? false : true
}
}

// function showResultsDDA(){
//  results.innerHTML=``
// for(let i =0;i<DDAX.length;i++  ){
//     results.innerHTML+=`(${DDAX[i]},${DDAY[i]})`
// }

// }


toggleInput(dda,ddaIN)
toggleInput(midpoint,midpointIN)
toggleInput(circle,circleIN)

