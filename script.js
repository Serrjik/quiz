// Информация о состоянии приложения.
const data = {
	// Номер карточки, которая должна отображаться.
	currentCardNumber: 2,
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

// Повесить обработчик клика на кнопку "Начать".
document
	.querySelector('[data-start]')
	.addEventListener('click', () => {
		// Показать 2-ю карточку.
		data.currentCardNumber = 2
		showCard(2)
	})

// Повесить обработчик клика на кнопку "Назад".
document
	.querySelector('[data-back]')
	.addEventListener('click', () => {
		// Показать предыдущую карточку.
		--data.currentCardNumber
		showCard(data.currentCardNumber)
	})

// Повесить обработчик клика на кнопку "Далее".
document
	.querySelector('[data-next]')
	.addEventListener('click', () => {
		// Показать следующую карточку.
		data.currentCardNumber++
		showCard(data.currentCardNumber)
	})

// Повесить обработчик клика на 2-ую карточку.
document
	.querySelector('[data-card="2"]')
	.addEventListener('click', event => {
		// Ближайший родительский элемент <li> или сам <li>.
		const liElement = event.target.closest('li')

		// Если клик был не в области элемента <li>:
		if (!liElement) {
			return
		}

		// Если клик был в области элемента <li>:
		// Найти дочерний <input>.
		const inputElement = liElement.querySelector('input')
		// Запомнить ответ.
		data.question2 = inputElement.value

		// Перерисовать карточку.
		showCard(data.currentCardNumber)
	})

// Повесить обработчик клика на 3-ую карточку.
document
	.querySelector('[data-card="3"]')
	.addEventListener('click', event => {
		// Выбранная карточка с вариантом ответа.
		const sElement = event.target.closest('.card-selectable')

		// Если кликнули не по карточке с ответом:
		if (!sElement) {
			return
		}

		// <input> выбранной карточки.
		const inputElement = sElement.querySelector('input')
		// Значение <input>'а выбранной карточки.
		const value = inputElement.value

		// Запомнить ответ.
		toggleItem(data.question3, value)

		// Перерисовать карточку.
		showCard(data.currentCardNumber)
	})

// Повесить обработчик клика на 4-ую карточку.
document
	.querySelector('[data-card="4"]')
	.addEventListener('click', event => {
		// Ближайший родительский элемент <li> или сам <li>.
		const liElement = event.target.closest('li')

		// Если клик был не в области элемента <li>:
		if (!liElement) {
			return
		}

		// Если клик был в области элемента <li>:
		// Найти дочерний <input>.
		const inputElement = liElement.querySelector('input')
		// Запомнить ответ.
		data.question4 = inputElement.value

		// Перерисовать карточку.
		showCard(data.currentCardNumber)
	})

// Повесить обработчик поднятия клавиши на поле ввода "Имя" 5-ой карточки.
document
	.querySelector('[data-form-name]')
	.addEventListener('keyup', function () {
		// Запомнить ответ.
		data.question5.name = this.value.trim()
		// Перерисовать карточку.
		showCard(data.currentCardNumber)
	})

/* 
	Повесить обработчик поднятия клавиши 
	на поле ввода "Адрес электронной почты" 5-ой карточки. 
*/
document
	.querySelector('[data-form-email]')
	.addEventListener('keyup', function () {
		// Запомнить ответ.
		data.question5.email = this.value.trim()
		// Перерисовать карточку.
		showCard(data.currentCardNumber)
	})

/* 
	Повесить обработчик клика на чекбокс 
	"согласен на обработку данных" 5-ой карточки. 
*/
document
	.querySelector('[data-form-confirm]')
	.addEventListener('click', () => {
		// Запомнить ответ.
		data.question5.confirm = !data.question5.confirm
		// Перерисовать карточку.
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

	// Кнопка "Далее".
	const nextButton = document.querySelector('[data-next]')
	// Сделать кнопку "Далее" недоступной изначально.
	nextButton.disabled = true

	// Если отображается 2-я карточка:
	if (n === 2) {
		// Поставить атрибут checked выбранному <input>'у.
		cardElement
			.querySelectorAll('input')
			.forEach(inputElement => {
				inputElement.checked = false

				if (inputElement.value === data.question2) {
					inputElement.checked = true
				}
			})

		// Если в карточке № 2 есть ответ:
		if (data.question2) {
			// Сделать кнопку "Далее" доступной.
			nextButton.removeAttribute('disabled')
		}
	}

	// Если отображается 3-я карточка:
	else if (n === 3) {
		cardElement
			// Все карточки с ответами.
			.querySelectorAll('input')
			.forEach(inputElement => {
				// Сделать все карточки с ответами невыбранными.
				inputElement.removeAttribute('checked')

				if (inputElement.checked) {
					/*
						Установить отображение <input>'а
						соответственно его внутреннему состоянию.
					*/
					inputElement.checked = false
				}

				/*
					Если содержимое текущей карточки
					есть в массиве с ответами:
				*/
				if (data.question3.includes(inputElement.value)) {
					// Сделать текущую карточку выбранной.
					inputElement.checked = true
				}
			})

		// Если в карточке № 3 есть ответ:
		if (data.question3.length) {
			// Сделать кнопку "Далее" доступной.
			nextButton.removeAttribute('disabled')
		}
	}

	// Если отображается 4-я карточка:
	else if (n === 4) {
		// Поставить атрибут checked выбранному <input>'у.
		cardElement
			.querySelectorAll('input')
			.forEach(inputElement => {
				inputElement.checked = false

				if (inputElement.value === data.question4) {
					inputElement.checked = true
				}
			})

		// Если в карточке № 4 есть ответ:
		if (data.question4) {
			// Сделать кнопку "Далее" доступной.
			nextButton.removeAttribute('disabled')
		}
	}

	// Если отображается 5-я карточка:
	else if (n === 5) {
		// email address matching pattern
		const pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i
		let isEmailValid = false

		// Проверка валидный ли email?
		if ((data.question5.email).match(pattern) !== null) {
			isEmailValid = true
		}

		// Если в карточке № 5 есть валидные ответы:
		if (data.question5.name && isEmailValid && data.question5.confirm) {
			// Сделать кнопку "Далее" доступной.
			nextButton.disabled = false
		}
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

	else {
		pElement.classList.remove("bg-success")
	}

	progress = progress / 6 * 100

	pElement.style.width = `${progress}%`
}