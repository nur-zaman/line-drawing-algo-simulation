const ddaRUN = document.getElementById("dda-run");
const midpointRUN = document.getElementById("midpoint-run");
const circleRUN = document.getElementById("circle-run");

const results = document.getElementById("results");

let DDAX = [];
let DDAY = [];
let MIDX = [];
let MIDY = [];
let circX = [];
let circY = [];
let dir = [];
let d = [];
let m;

ddaRUN.onclick = () => {
  DDAX = [];
  DDAY = [];
  m = 0;
  DDA();
  showResultsDDA();
  plotValues(DDAX, DDAY);
};

midpointRUN.onclick = () => {
  MIDX = [];
  MIDY = [];
  dir = [];
  d = [];
  midpointLine();
  showResultsMidpoint();
  plotValues(MIDX, MIDY);
};

circleRUN.onclick = () => {
  circX = [];
  circY = [];
  dir = [];
  d = [];
 let center = midPointCircle();

  showResultsCircle(center);
  plotCircle(circX, circY,center);
};

function drawPoints(x, y, pointX, pointY) {
  pointX.push(x);
  pointY.push(y);
}

function pushDirection(direction, dValue) {
  dir.push(direction);
  d.push(dValue);
}

function DDA() {
  let x1 = Number(document.getElementById("dda-x1").value);
  let x2 = Number(document.getElementById("dda-x2").value);
  let y1 = Number(document.getElementById("dda-y1").value);
  let y2 = Number(document.getElementById("dda-y2").value);

  m = (y2 - y1) / (x2 - x1);

  drawPoints(x1, y1, DDAX, DDAY);
  if (m > -1 && m < 1) {
    while (x1 < x2) {
      x1 += 1;
      y1 += m;
      drawPoints(x1, Math.round(y1), DDAX, DDAY);
    }
  } else {
    if (m != Infinity) mInv = 1 / m;
    else mInv = 0;
    while (y1 < y2) {
      x1 += mInv;
      y1 += 1;
      drawPoints(Math.round(x1), y1, DDAX, DDAY);
    }
  }
}

function showResultsDDA() {
  results.innerHTML = `<tr>
  <th>Points</th>
  <th>m</th>
</tr>`;
  for (let i = 0; i < DDAX.length; i++) {
    results.innerHTML += `<tr> <td>(${DDAX[i]},${DDAY[i]})</td><td>${m}</td> </tr>`;
  }
}

function midpointLine() {
  let dx, dy, incrE, incrNE, d, x, y;
  let x1 = Number(document.getElementById("midp-x1").value);
  let x2 = Number(document.getElementById("midp-x2").value);
  let y1 = Number(document.getElementById("midp-y1").value);
  let y2 = Number(document.getElementById("midp-y2").value);

  dx = x2 - x1;
  dy = y2 - y1;
  m = dy / dx;
  d = 2 * dy - dx;

  pushDirection("init", d);
  incrE = 2 * dy;
  incrNE = 2 * (dy - dx);
  x = x1;
  y = y1;

  drawPoints(x, y, MIDX, MIDY);

  while (x < x2) {
    if (d <= 0) {
      //choose E
      d = d + incrE;
      x = x + 1;
      pushDirection("E", d);
    } else {
      //choose NE
      d = d + incrNE;
      x = x + 1;
      y = y + 1;
      pushDirection("NE", d);
    }

    drawPoints(x, y, MIDX, MIDY); //The selected pixel closest to the line
  }
}

function showResultsMidpoint() {
  results.innerHTML = `<tr>
  <th>Points</th>
  <th>Direction</th>
  <th>d</th>
</tr>`;
  for (let i = 0; i < MIDX.length; i++) {
    results.innerHTML += `<tr> <td>(${MIDX[i]},${MIDY[i]})</td> 
    <td>${dir[i]}</td>
    <td>${d[i]}</td>
    </tr>`;
  }
}

function midPointCircle() {
  let x1 = Number(document.getElementById("circle-x1").value);
  let y1 = Number(document.getElementById("circle-y1").value);
  let radius = Number(document.getElementById("circle-r").value);
  let d = 1 - radius;

  let x 
  let y
  x = 0;

  y = radius;

  drawPoints(x , y , circX, circY);
  pushDirection("init", d);
  while (x < y) {
    if (d < 0) {
      //choose E

      d = d + 2 * x + 3;

      x = x + 1;
      pushDirection("E", d);
    } else {
      //choose SE

      d = d + 2 * x - 2 * y + 5;

      x = x + 1;

      y = y - 1;
      pushDirection("SE", d);
    }

    drawPoints(x , y , circX, circY);
  }
  return [x1,y1]
}

function showResultsCircle(center) {
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
</tr>`;
  for (let i = 0; i < circX.length; i++) {
    results.innerHTML += `<tr>
  <td>${d[i]}</td>
  <td>${dir[i]}</td>
  <td>(${circX[i]+center[0]},${circY[i]+center[1]})</td>
  <td>(${circX[i]+center[0]},${(-1 * circY[i])+center[1]})</td> 
  <td>(${(-1 * circX[i])+center[0]},${(-1 * circY[i])+center[1]})</td> 
  <td>(${(-1 * circX[i])+center[0]},${circY[i]+center[1]})</td> 
  <td>(${circY[i]+center[0]},${circX[i]+center[1]})</td> 
  <td>(${-1 * circY[i]+center[0]},${circX[i]+center[1]})</td> 
  <td>(${(-1 * circY[i])+center[0]},${(-1 * circX[i])+center[1]})</td> 
  <td>(${circY[i]+center[0]},${(-1 * circX[i]+center[1])})</td> 

  </tr>`;
  }
}

function plotValues(X, Y) {
  var trace1 = {
    x: X,
    y: Y,
    mode: "markers",
    type: "scatter",
  };

  var data = [trace1];
  var layout = {
    yaxis: {
      scaleanchor: "x",
    }
  }
  Plotly.newPlot("plot", data,layout);
}

function plotCircle(X, Y,center) {
  console.log(center)
  Z = X.length;
  for (let i = 0; i < Z; i++) {

    X.push(X[i]+center[0]);
    X.push((-1 * X[i])+center[0]);
    X.push((-1 * X[i])+center[0]);
    X.push(Y[i]+center[0]);
    X.push((-1 * Y[i])+center[0]);
    X.push((-1 * Y[i])+center[0]);
    X.push(Y[i]+center[0]);

    Y.push((-1 * Y[i])+center[1]);
    Y.push((-1 * Y[i])+center[1]);
    Y.push(Y[i]+center[1]);
    Y.push(X[i]+center[1]);
    Y.push(X[i]+center[1]);
    Y.push((-1 * X[i])+center[1]);
    Y.push((-1 * X[i])+center[1]);
    X[i]+=center[0]
    Y[i]+=center[1]
  }

  console.log(X);
  console.log(Y);

  var coordinates = {
    x: X,
    y: Y,
    name: 'Co-ordinates',
    mode: "markers",
    type: "scatter",
  };
  var centerPoint = {
    x: [center[0]],
    y: [center[1]],
    name: 'Center',
    mode: 'markers',
    type: 'scatter'
  }
  var data = [coordinates,centerPoint];


  var layout = {
    yaxis: {
      scaleanchor: "x",
    }
  }
  Plotly.newPlot("plot", data,layout);
}
