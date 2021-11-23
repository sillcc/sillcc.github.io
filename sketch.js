// recreation of demos in the book "Generative Design: visualize, program, and create with Processing"
// P.1.2.3
// Color palettes from rules
// based on P_1_2_3_01.pde (https://github.com/generative-design/Code-Package-Processing-3.x/blob/master/01_P/P_1_2_3_01/P_1_2_3_01.pde)
// interactions
//	Mouse:  x/y: palette sizes
//	Keys: s: save png; 1/2: switch color models 
//
// schien@mail.ncku.edu.tw, 20201014

let tileCountX = 7;
let tileCountY = 7;
// arrays for color components values
let hueValues = [];
let saturationValues = [];
let brightnessValues = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  // noLoop();
	
  // init with random values
  // for (let i=0; i<tileCountX; i++) {
	pal();
}

function draw() {
	// background(0, 0, 100);
	
	// count every tile
	let counter = 0;
	let currentTileCountX = int(map(mouseX, width, 0, 1, tileCountX));
  let currentTileCountY = int(map(mouseY, height, 0, 1, tileCountY));

  // let currentTileCountX = int(random(0, tileCountX));
  // let currentTileCountY = int(random(0, tileCountY));
 

	let tileWidth = width / float(currentTileCountX);
	let tileHeight = height / float(currentTileCountY);
	
	for (let gridY=0; gridY<tileCountY; gridY++) {
		for (let gridX=0; gridX<tileCountX; gridX++) {
			let posX = tileWidth*gridX;
			let posY = tileHeight*gridY;
			let index = counter % currentTileCountX;
			
			fill(hueValues[index], saturationValues[index], brightnessValues[index]);
			rect(posX, posY, tileWidth, tileHeight);
			counter++;
		}
	}
}

function render() {
  save("wallpaper.jpg");
}

function pal() {
  for (let i = 0; i < 2; i++) {
    hueValues[i] = int(random(0, 360));
    saturationValues[i] = int(random(0, 100));
    brightnessValues[i] = int(random(0, 100));
  }
}

// function keyPressed() {
// 	switch (key) {
// 		case '1':
// 			for (let i=0; i<tileCountX; i++) {
// 				hueValues[i] = int(random(0, 360));
// 				saturationValues[i] = int(random(0, 100));
// 				brightnessValues[i] = int(random(0, 100));
// 			}
// 			break;
// 		case '2':
// 			for (let i=0; i<tileCountX; i++) {
// 				hueValues[i] = int(random(0, 360));
// 				saturationValues[i] = int(random(0, 100));
// 				brightnessValues[i] = 100;
// 			}
// 			break;
// 		case '3':
// 			for (let i=0; i<tileCountX; i++) {
// 				hueValues[i] = int(random(0, 360));
// 				saturationValues[i] = 100;
// 				brightnessValues[i] = int(random(0, 100));
// 			}
// 			break;
// 		case '4':
// 			for (let i=0; i<tileCountX; i++) {
// 				hueValues[i] = 0;
// 				saturationValues[i] = 0;
// 				brightnessValues[i] = int(random(0, 100));
// 			}
// 			break;
// 		case '5':
// 			for (let i=0; i<tileCountX; i++) {
// 				hueValues[i] = 195;
// 				saturationValues[i] = 100;
// 				brightnessValues[i] = int(random(0, 100));
// 			}
// 			break;
// 		case '6':
// 			for (let i=0; i<tileCountX; i++) {
// 				hueValues[i] = 195;
// 				saturationValues[i] = int(random(0, 100));
// 				brightnessValues[i] = 100;
// 			}
// 			break;
// 		case '7':
// 			for (let i=0; i<tileCountX; i++) {
// 				hueValues[i] = int(random(0, 180));
// 				saturationValues[i] = int(random(80, 100));
// 				brightnessValues[i] = int(random(50, 90));
// 			}
// 			break;
// 		case '8':
// 			for (let i=0; i<tileCountX; i++) {
// 				hueValues[i] = int(random(180, 360));
// 				saturationValues[i] = int(random(80, 100));
// 				brightnessValues[i] = int(random(50, 90));
// 			}
// 			break;
// 		case '9':
// 			for (let i=0; i<tileCountX; i++) {
// 				if (i%2 === 0) {
// 					hueValues[i] = int(random(0, 360));
// 					saturationValues[i] = 100;
// 					brightnessValues[i] = int(random(0, 100));
// 				} else {
// 					hueValues[i] = 195;
// 					saturationValues[i] = int(random(0, 100));
// 					brightnessValues[i] = 100;
// 				}
// 			}
// 			break;
// 		case '0':
// 			for (let i=0; i<tileCountX; i++) {
// 				if (i%2 === 0) {
// 					hueValues[i] = 192;
// 					saturationValues[i] = int(random(0, 100));
// 					brightnessValues[i] = int(random(10, 100));
// 				} else {
// 					hueValues[i] = 273;
// 					saturationValues[i] = int(random(0, 100));
// 					brightnessValues[i] = int(random(10, 90));
// 				}
// 			}
// 			break;
// 		case 's':
// 		case 'S':
// 			save("color-palettes.png");
// 			break;
// 		default:
// 	}
// }


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}