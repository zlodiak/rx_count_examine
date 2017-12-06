document.addEventListener("DOMContentLoaded", ready);

let currNum;
let step;
let startContent = 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.';

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
	.filter(t => t.className === 'li')
	.subscribe(function (t) {
		clearContent();
		createPoints(t.getAttribute('data-count'));
	});

	let subscription2 = menu
	.map(e => e.target)
	.filter(t => t.className === 'start')
	.subscribe(function (t) {
		clearContent();
		document.getElementById('contentInner').innerHTML = startContent;
	});		

	let subscription3 = contentInner
	.map(e => e.target)
	.filter(t => t.className === 'point')
	.subscribe(function (t) {
		let val = +document.getElementById(t.id).innerHTML;

		++step;
		deletePoint(t.id);

		if(currNum > val) { 
			alert('stop'); 
			init();
		} else {
			currNum = val;
			if(step > 2) { 
				alert('win'); 
				init();
			}
		}	
	});									
	
	init();
};


