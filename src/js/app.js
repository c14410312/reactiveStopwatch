import {Observable} from 'rxjs/Rx';

//now an object
let counter = {value: 0};

//functions that increment, decrement and reset the counter 
const inc = acc => ({value: acc.value + 1});
const dec = acc => ({value: acc.value - 1});
const res = acc => ({value: 0});

const display = document.getElementById('display');
const incButton = document.getElementById('increment');
const decButton = document.getElementById('decrement');
const resButton = document.getElementById('reset');

//observe events on the buttons
//getting and observable from click events related to Buttons
//merge can take a merge of existing streams
//scan is operating on all the buttons

// mapto maps the click events to each of the functions specified in mapTo(X)
const button$ = Observable.merge(
	Observable.fromEvent(incButton, 'click').mapTo(inc),
	Observable.fromEvent(decButton, 'click').mapTo(dec),
	Observable.fromEvent(resButton, 'click').mapTo(res)
)

button$
	.scan((acc, update) => update(acc), counter)
	.subscribe(counter => {
	display.innerHTML = counter.value;
});
