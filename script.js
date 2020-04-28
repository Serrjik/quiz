// Основной скрипт, общие функции.

// Информация о состоянии приложения.
const data = {
	// Номер карточки, которая должна отображаться.
	currentCardNumber: 1,
	// Ответы пользователя:
	question2: null,
	question3: [],
	question4: null,
	question5: {
		name: '',
		email: '',
		// Флаг - разрешение обработки персональных данных.
		confirm: false
	}
}

// При загрузке страницы показать выбранную карточку.
showCard(data.currentCardNumber)

// Кнопка "Далее".
const nextButton = document.querySelector('[data-next]')
// Сделать кнопку "Далее" недоступной изначально.
nextButton.disabled = true

// Повесить обработчик клика на кнопку "Назад".
document
	.querySelector('[data-back]')
	.addEventListener('click', () => {
		// Показать предыдущую карточку.
		--data.currentCardNumber
		showCard(data.currentCardNumber)
	})

// Повесить обработчик клика на кнопку "Далее".
nextButton.addEventListener('click', () => {
	// Показать следующую карточку.
	data.currentCardNumber++
	showCard(data.currentCardNumber)
})

// Функция отображает карточку соответствующую переданному номеру.
function showCard (n) {
	updateProgress()

	// Если карточка № 1 или № 6:
	if (n === 1 || n === 6) {
		// В этой карточке нужно скрыть шапку и подвал.
		hideFooter()
		hideHeader()
	}

	// В остальных карточках:
	else {
		// Показать шапку и подвал.
		showFooter()
		showHeader(n)
	}

	// Скрыть все карточки.
	document
		.querySelectorAll('[data-card]')
		.forEach(x => x.style.display = 'none')

	// Показать карточку соответствующую переданному номеру.
	cardElement = document.querySelector(`[data-card="${n}"]`)
	cardElement.style.display = ''

	// Вызов функции изменения состояния элементов на карточке.
	switch (n) {
		case 2:
			showCard2()
			break
		case 3:
			showCard3()
			break
		case 4:
			showCard4()
			break
		case 5:
			showCard5()
			break
	}
}

// Функция показывает подвал карточки.
function showFooter () {
	document.querySelector('[data-footer]').style.display = ''
}

// Функция скрывает подвал карточки.
function hideFooter () {
	document.querySelector('[data-footer]').style.display = 'none'
}

// Функция показывает шапку карточки. Принимает номер карточки.
function showHeader (n) {
	const header = document.querySelector('[data-header]')

	switch (n) {
		case 2:
			header.innerHTML = `<h5 class="card-title">Какой язык программирования используется на FrontEnd'е?</h5>`
			break
		case 3:
			header.innerHTML = `<h5 class="card-title">Каким редактором пользуются программисты?</h5>`
			break
		case 4:
			header.innerHTML = `<h5 class="card-title">Что выведет следующий код?</h5>`
			break
		case 5:
			header.innerHTML = `<h5 class="card-title">Контактные данные для предложения на основе ваших ответов.</h5>`
			break
		default:
			header.innerHTML = ''
			break
	}
	
	header.style.display = ''
}

// Функция скрывает шапку карточки.
function hideHeader () {
	document.querySelector('[data-header]').style.display = 'none'
}

/*
	Функция добавляет переданный элемент в массив, если его там нет.
	Или удаляет переданный элемент из массива, если он уже присутствует.
*/
function toggleItem (array, item) {
	// Если элемент уже присутствует в массиве:
	if (array.includes(item)) {
		// Удалить этот элемент!
		const index = array.indexOf(item)
		array.splice(index, 1)
	}

	// Если такого элемента в массиве нет:
	else {
		// Добавить его!
		array.push(item)
	}
}

/* 
	Функция собирает информацию о том, сколько есть ответов на вопросы 
	и соответственно вызывает функцию setProgress. 
	// Функция изменяет состояние прогрессбара.
*/
function updateProgress () {
	// Полоса прогресса.
	const pElement = document.querySelector('[data-progressbar]')
	// Прогресс, зависит от количества отвеченных вопросов.
	let progress = 0

	if (data.question2) {
		progress++
	}

	if (data.question3.length) {
		progress++
	}

	if (data.question4) {
		progress++
	}

	if (data.question5.name) {
		progress++
	}

	if (data.question5.email) {
		progress++
	}

	if (data.question5.confirm) {
		progress++
	}

	// Если есть ответы на все вопросы:
	if (progress === 6) {
		pElement.classList.add("bg-success")
	}

	// Если есть ответы НЕ на все вопросы:
	else {
		pElement.classList.remove("bg-success")
	}

	progress = progress / 6 * 100

	pElement.style.width = `${progress}%`
}