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

		// Перерисовать карточку ради отображения выделения <input>'а.
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

		// Перерисовать карточку ради отображения выделения <input>'а.
		showCard(4) // - для отладки. Удалить потом!
		// showCard(data.currentCardNumber)
	})

// Функция отображает карточку соответствующую переданному номеру.
function showCard (n) {
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
		showHeader()
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
	nextButton.setAttribute('disabled', true)

	// Если отображается 2-я карточка:
	if (n === 2) {
		// Поставить атрибут checked выбранному <input>'у.
		cardElement
			.querySelectorAll('input')
			.forEach(inputElement => {
				inputElement.removeAttribute('checked')

				if (inputElement.value === data.question2) {
					inputElement.setAttribute('checked', true)
				}
			})

		// Если в карточке № 2 есть ответ:
		// Сделать кнопку "Далее" доступной.
		if (data.question2) {
			nextButton.removeAttribute('disabled')
		}
	}

	// Если отображается 4-я карточка:
	if (n === 4) {
		// Поставить атрибут checked выбранному <input>'у.
		cardElement
			.querySelectorAll('input')
			.forEach(inputElement => {
				inputElement.removeAttribute('checked')

				if (inputElement.value === data.question4) {
					inputElement.setAttribute('checked', true)
				}
			})

		// Если в карточке № 4 есть ответ:
		// Сделать кнопку "Далее" доступной.
		if (data.question4) {
			nextButton.removeAttribute('disabled')
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

// Функция показывает шапку карточки.
function showHeader () {
	document.querySelector('[data-header]').style.display = ''
}

// Функция скрывает шапку карточки.
function hideHeader () {
	document.querySelector('[data-header]').style.display = 'none'
}