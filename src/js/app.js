
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
	.timeInterval(); //emits indications of the amount of time elapsed between emissions

//need to subscribe our stream to a function
//everytime 100 milliseconds has passed this function will be called
const subs = stream$.subscribe(t =>{
	//if the start button has not been clicked no increment required
	if(startTimer === false)return;
	time += 1;
	
	//slice(-2) is used to retrieve the last two digits of a string i.e. allowing for double digits, looks better
	//first digit gives us the minute by dividing the current time by 600 and returning in int format 
	//second digit is sec --> divide time by ten mod 60 
	//third is 1/10 of sec --> mod 10 + add zero at end gives us 10, 20, 30 , 40 etc.  
	digital.innerHTML = ("0" + (parseInt(time/600))).slice(-2) + ":" + ("0" + (parseInt((time/10) % 60))).slice(-2) + ":" + (time % 10) +  "0";
});
//if canvas is supported
if (canvas.getContext){
	//need to access the rendering context and draw on it
	//call method getContext with param 2d
	const ctx = canvas.getContext('2d');
} else{
	//not supported in browser
}


