
/*
*REFERENCE FOR UNIT CIRCLE CALCULATION*
https://www.mathsisfun.com/geometry/unit-circle.html
*/

import {Observable} from 'rxjs/Rx';
import '../css/style.css';

const canvas = document.getElementById('stopwatch-canvas');
const splits = document.getElementById('split-container');
const digital = document.getElementById('digital');
let time = 0;
let startTimer = false

//start the timer 
Observable.fromEvent(document.getElementById('start'), 'click').subscribe(ev =>{
	startTimer = true;
});

//stop the timer
Observable.fromEvent(document.getElementById('stop'), 'click').subscribe(ev =>{
	startTimer = false;
});

//record the splits
Observable.fromEvent(document.getElementById('split'), 'click').subscribe(ev => {
	let splitTime = document.createElement("P");
	let val = document.createTextNode(digital.innerHTML);
	splitTime.appendChild(val);
	splits.appendChild(splitTime);
});

//reset the timer
Observable.fromEvent(document.getElementById('reset'), 'click').subscribe(ev =>{
	startTimer = false;
	time = 0;
	drawWatch(time);
	digital.innerHTML = "00:00:00";

	//clear the split times
	while (splits.hasChildNodes()) {
    	splits.removeChild(splits.lastChild);
	}
});



//first we need to create the stream
//this creates a time ordered stream that renders an element every tenth of a second
const stream$ = Observable
	.interval(100)
	//.timeInterval(); //emits indications of the amount of time elapsed between emissions

//need to subscribe our stream to a function
//everytime 100 milliseconds has passed this function will be called
const subs = stream$.subscribe(t =>{
	//if the start button has not been clicked no increment required
	if(startTimer === false)return;
	time ++;
	drawWatch(time);
	//slice(-2) is used to retrieve the last two digits of a string i.e. allowing for double digits, looks better
	//first digit gives us the minute by dividing the current time by 600 and returning in int format 
	//second digit is sec --> divide time by ten mod 60 
	//third is 1/10 of sec --> mod 10 + add zero at end gives us 10, 20, 30 , 40 etc.  
	digital.innerHTML = ("0" + (parseInt(time/600))).slice(-2) + ":" + ("0" + (parseInt((time/10) % 60))).slice(-2) + ":" + (time % 10) +  "0";
});

//watch drawing function
const drawWatch = (time) => {
	//if canvas is supported
	if (canvas.getContext){

		//need to access the rendering context and draw on it
		//call method getContext with param 2d
		const ctx = canvas.getContext('2d');
		const size = 100;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		/*
			arc():
				params:
					arc(x,y,r,sangle,eangle,counterclockwise)
					x --> x coord of center
					y --> y coord of center
					r --> radius of circle
					sangle --> start angle
					eangle --> end angle
					specify whether drawing counter/clockwise
		*/

		/*
			Math notes:
			-2 * PI =  360 degrees of a circle
			*REFERENCE FOR UNIT CIRCLE CALCULATION*
			https://www.mathsisfun.com/geometry/unit-circle.html

		*/
		//create the dot in the middle of watch
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.arc(size, size, 2, 0, 2 * Math.PI, false);
		ctx.stroke();

		//create the outer line of the watch
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.arc(size, size, size, 0, Math.PI * 2, false);
		ctx.stroke();

		//need to draw the 12 long lines on the clock
		for (let i = 0; i < 12; i++){
			const longLines = size * 0.2;
			let ang = i * (Math.PI * 2 / 12);
			ctx.moveTo(size + size * Math.cos(ang) * 1.0, size + size * Math.sin(ang) * 1.0);
			ctx.lineTo(size + (size - longLines) * Math.cos(ang) * 1.0, size + (size - longLines) * Math.sin(ang) * 1.0);
		}
		
		//need to draw the 60 short lines on the clock
		for (let i = 0; i < 60; i++){
			const shortLines = size * 0.1;
			let ang = i * (Math.PI * 2 / 60);
			ctx.moveTo(size + size * Math.cos(ang) * 1.0, size + size * Math.sin(ang) * 1.0);
			ctx.lineTo(size + (size - shortLines) * Math.cos(ang) * 1.0, size + (size - shortLines) * Math.sin(ang) * 1.0);
		}

		//draw the minute arm
		// Longer hand (minute), each minute goes one step
		let minAng = (time / 600 / 60 - 0.25) * (Math.PI * 2); //retrieve the angle 
		let minArmLen = size * 0.6; //sets the lenght of the arm, make it slightly shorter than sec
		drawHand(ctx, minAng, minArmLen, size);

		//This draws the seconds arm
		//need to change the angle for every tenth of a second
		let secAng = (time / 10 / 60 - 0.25) * (Math.PI * 2);
		let secArmLen = size * 0.85;
		drawHand(ctx, secAng, secArmLen, size);
		
		ctx.stroke();

	}
}

//function to draw the minute and second hands of the watch
function drawHand(ctx, ang, armLen, size){
	//moves the starting point to center of the watch
	ctx.moveTo(size, size);
	//draws a line to the appropriate point based on the time. 
	ctx.lineTo(size + armLen * Math.cos(ang), size + armLen * Math.sin(ang));
}
//calls our drawing function
drawWatch();


