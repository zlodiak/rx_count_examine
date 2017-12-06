document.addEventListener("DOMContentLoaded", ready);

let currNum;
let step;
let startContent = 'Это простейший тренажёр для детей, он проверяет способность считать. Предполагается, что: \
<br>дети от 1 до 3 лет должны уметь считать до 5 \
<br>дети от 4 до 5 лет должны уметь считать до 10 \
<br>дети от 6 до 7 лет должны уметь считать до 30 \
<br>дети от 7 до 9 лет должны уметь считать до 100 \
	<br><br>Чтобы проверить знания участнику предлагается последовательно в порядке возрастания выбрать кубики с цифрами \
';

function init() {
	currNum = -1;
	step = 0
	let startBtn = document.getElementById('start');
	startBtn.click();
};

function clearContent() {
	let contentInner = document.getElementById('contentInner');
	contentInner.innerHTML = '';
};

function deletePoint(id) {
	let pointEl = document.getElementById(id);
	pointEl.parentNode.removeChild(pointEl);
};

function createPoints(count) {
	let contentInner = document.getElementById('contentInner');

	for(let i = 0; i <= 2; i++) {
		let num_ = Math.random() * count;
		let num = Math.ceil(num_);

		let pointEl = document.createElement('div');
		pointEl.className = 'point';
		pointEl.id = 'point_' + i;
		pointEl.setAttribute('data-num', num);
		pointEl.innerHTML = num;		

		contentInner.appendChild(pointEl);
	};
};


function ready() {
	let ulEl = document.getElementById('ul');
	let contentInnerEl = document.getElementById('contentInner');

	let menu = Rx.Observable.fromEvent(ulEl, 'click');
	let contentInner = Rx.Observable.fromEvent(contentInnerEl, 'click');

	let subscription = menu
	.map(e => e.target)
	.filter(t => t.className === 'start' || t.className === 'li')
	.subscribe(function (t) {
		clearContent();
    switch (t.className) {
      case 'start':
				document.getElementById('contentInner').innerHTML = startContent;
        break;
      case 'li':				
				createPoints(t.getAttribute('data-count'));
        break;
    }
	});

	let subscription3 = contentInner
	.map(e => e.target)
	.filter(t => t.className === 'point')
	.subscribe(function (t) {
		let val = +document.getElementById(t.id).innerHTML;

		++step;
		deletePoint(t.id);

		if(currNum > val) { 
			alert('Not correct'); 
			init();
		} else {
			currNum = val;
			if(step > 2) { 
				alert('Correct'); 
				init();
			}
		}	
	});									
	
	init();
};


