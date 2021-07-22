const ddaRUN = document.getElementById("dda-run") 
const midpointRUN = document.getElementById("midpoint-run") 
const circleRUN = document.getElementById("circle-run") 

const results = document.getElementById("results") 

let DDAX = [] 
let DDAY = [] 
let MIDX = [] 
let MIDY = [] 
// let cirX=[]
// let cirY=[]
let dir = [] 
let d = [] 
let m 
ddaRUN.onclick = () => {
  DDAX = [] 
  DDAY = [] 
  m = 0
  DDA() 
  showResultsDDA() 
} 

midpointRUN.onclick = () => {
  MIDX = [] 
  MIDY = [] 
  dir = [] 
  d = [] 
  midpointLine() 
  showResultsMidpoint() 
} 


circleRUN.onclick = () => {
  MIDX = [] 
  MIDY = [] 
  dir = [] 
  d = [] 
  midPointCircle() 
  showResultsCircle() 
} 

function drawPoints(x, y, pointX, pointY) {
  pointX.push(x) 
  pointY.push(y) 
}

function pushDirection(direction, dValue) {
  dir.push(direction) 
  d.push(dValue) 
}

function DDA() {
  let x1 = Number(document.getElementById("dda-x1").value) 
  let x2 = Number(document.getElementById("dda-x2").value) 
  let y1 = Number(document.getElementById("dda-y1").value) 
  let y2 = Number(document.getElementById("dda-y2").value) 
  //   console.log(''+x1+' '+x2+' '+y1+' '+y2)

  
  m = (y2 - y1) / (x2 - x1) 
  console.log("m : " + m) 
  // console.log(DDAX)
  drawPoints(x1, y1, DDAX, DDAY) 
  if (m > -1 && m < 1) {
    while (x1 < x2) {
      x1 += 1 
      y1 += m 
      // console.log(this.DDAX)
      drawPoints(x1, Math.round(y1), DDAX, DDAY) 
    }
  } else {
    if (m != Infinity) mInv = 1 / m 
    else mInv = 0 
    while (y1 < y2) {
      x1 += mInv 
      y1 += 1 
      drawPoints(Math.round(x1), y1, DDAX, DDAY) 
    }
  }
}

function showResultsDDA() {
  results.innerHTML = `<tr>
  <th>Points</th>
  <th>m</th>
</tr>` 
  for (let i = 0;  i < DDAX.length;  i++) {
    results.innerHTML += `<tr> <td>(${DDAX[i]},${DDAY[i]})</td><td>${m}</td> </tr>` 
  }
}

function midpointLine() {
  let dx, dy, incrE, incrNE, d, x, y 
  let x1 = Number(document.getElementById("midp-x1").value) 
  let x2 = Number(document.getElementById("midp-x2").value) 
  let y1 = Number(document.getElementById("midp-y1").value) 
  let y2 = Number(document.getElementById("midp-y2").value) 

  dx = x2 - x1 
  dy = y2 - y1 
  m=dy/dx
  d = 2 * dy - dx 
  
  pushDirection("init", d) 
  incrE = 2 * dy 
  incrNE = 2 * (dy - dx) 
  x = x1 
  y = y1 

  drawPoints(x, y, MIDX, MIDY) 

  while (x < x2) {
    if (d <= 0) {
      //choose E
      d = d + incrE 
      x = x + 1 
      pushDirection("E", d) 
    } else {
      //choose NE
      d = d + incrNE 
      x = x + 1 
      y = y + 1 
      pushDirection("NE", d) 
    }

    drawPoints(x, y, MIDX, MIDY)  //The selected pixel closest to the line
  }
}

function showResultsMidpoint() {
  results.innerHTML = `<tr>
  <th>Points</th>
  <th>Direction</th>
  <th>d</th>
</tr>` 
  for (let i = 0 ; i < MIDX.length ; i++) {
    results.innerHTML += `<tr> <td>(${MIDX[i]},${MIDY[i]})</td> 
    <td>${dir[i]}</td>
    <td>${d[i]}</td>
    </tr>`
  }
}


function midPointCircle() {

  let x1 = Number(document.getElementById("circle-x1").value) 
  let y1 = Number(document.getElementById("circle-y1").value) 
  let radius = Number(document.getElementById("circle-r").value) 
    let d = 1 - radius
    
    let x = x1
    let y =y1
    x = 0;
    
    y = radius;
    
    drawPoints(x+x1, y+y1, MIDX, MIDY)
    pushDirection("init", d) 
    while (x < y) {
    
    if (d < 0) {
    
    //choose E
    
    d = d + 2*x + 3;
    
    x = x + 1;
    pushDirection("E", d) 
    }
    
    else {
    
    //choose SE
    
    d = d + 2*x - 2*y + 5;
    
    x = x + 1;
    
    y = y - 1;
    pushDirection("SE", d) 
    }
    
    drawPoints(x+x1, y+y1, MIDX, MIDY)
    
    }
}
  
function showResultsCircle(){
  results.innerHTML = `<tr>  
  <th>d</th>
  <th>Direction</th>
  <th>Zone 1</th>
  <th>Zone 2</th>
  <th>Zone 3</th>
  <th>Zone 4</th>
  <th>Zone 5</th>
  <th>Zone 6</th>
  <th>Zone 7</th>
  <th>Zone 8</th>
</tr>` 
  for (let i = 0 ; i < MIDX.length ; i++) {
    results.innerHTML += `<tr>
    <td>${d[i]}</td>
    <td>${dir[i]}</td>
    <td>(${MIDX[i]},${MIDY[i]})</td>
    <td>(${MIDX[i]},-${MIDY[i]})</td> 
    <td>(-${MIDX[i]},-${MIDY[i]})</td> 
    <td>(-${MIDX[i]},${MIDY[i]})</td> 
    <td>(${MIDY[i]},${MIDX[i]})</td> 
    <td>(-${MIDY[i]},${MIDX[i]})</td> 
    <td>(-${MIDY[i]},-${MIDX[i]})</td> 
    <td>(${MIDY[i]},-${MIDX[i]})</td> 

    </tr>`
  }
}



// console.log(DDAX) 
// console.log(DDAY) 
console.log(MIDX) 
console.log(MIDY) 
console.log(dir) 
console.log(d) 
