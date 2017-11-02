
import {Observable} from 'rxjs/Rx';
import '../css/style.css';

const canvas = document.getElementById('stopwatch-canvas');
const digital = document.getElementById('digital');



//if canvas is supported
if (canvas.getContext){

	//need to access the rendering context and draw on it
	//call method getContext with param 2d
	const ctx = canvas.getContext('2d');
} else{
	//not supported in browser
}


