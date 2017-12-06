document.addEventListener("DOMContentLoaded", ready);

function ready() {
	var startContent = 'Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в домашних условиях. При создании генератора мы использовали небезизвестный универсальный код речей. Текст генерируется абзацами случайным образом от двух до десяти предложений в абзаце, что позволяет сделать текст более привлекательным и живым для визуально-слухового восприятия.По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.';

	var source = Rx.Observable.fromEvent(document, 'click');

	var subscription = source
										.map(e => e.target)
										.filter(t => t.className === 'li')
										.subscribe(function (t) {
											clearContent();
											createPoints(t.getAttribute('data-count'));
										});

	var subscription2 = source
										.map(e => e.target)
										.filter(t => t.className === 'start')
										.subscribe(function (t) {
											clearContent();
											document.getElementById('contentInner').innerHTML = startContent;
										});										
	
};

function clearContent() {
	let contentInner = document.getElementById('contentInner');
	contentInner.innerHTML = '';
};

function createPoints(count) {
	console.log(count);

	let nums = [];

	for(let i = 0; i <= 2; i++) {
		let num_ = Math.random() * count;
		let num = Math.ceil(num_);
		nums.push(num);

		let pointEl = document.createElement('div');
		pointEl.className = 'point';
		pointEl.id = 'point_' + i;
		pointEl.setAttribute('data-num', num);
		pointEl.innerHTML = num;
		let contentInner = document.getElementById('contentInner');
		contentInner.appendChild(pointEl);
	};

	console.log(nums);
};

