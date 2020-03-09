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

// Повесить обработчик клика на 5-ую карточку.
document
	.querySelector('[data-card="5"]')
	.addEventListener('click', event => {
		// Чекбокс "согласен на обработку данных".
		const checkElement = event.target.closest('.form-check')

		// Если кликнули по чекбоксу "согласен на обработку данных":
		if (checkElement) {
			// <input> чекбокса "согласен на обработку данных".
			const inputCheckElement = checkElement.querySelector('input')
			// Запомнить ответ.
			// Если чекбокс "согласен на обработку данных" включен:
			if (data.question5.confirm === true) {
				data.question5.confirm = false
			}

			// Если чекбокс "согласен на обработку данных" выключен:
			else {
				data.question5.confirm = true
			}
		}

		// Перерисовать карточку.
		showCard(data.currentCardNumber)
	})

/*
	Повесить обработчик события input
	(изменение значения) на 5-ую карточку.
*/
document
	.querySelector('[data-card="5"]')
	.addEventListener('input', event => {
		console.log(event)
		// Поле ввода, на котором сработало событие.
		const input = event.target
		
		// Если это поле ввода "Имя":
		if (input.type === "text") {
			// Запомнить ответ.
			data.question5.name = (input.value).trim()
		}

		// Если это поле ввода "Адрес электронной почты":
		else if (input.type === "email") {
			// Запомнить ответ.
			data.question5.email = (input.value).trim()
		}

		// Перерисовать карточку.
		showCard(data.currentCardNumber)
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
		// cardElement
			// Все карточки с ответами.
			// .querySelectorAll('input')
			// .forEach(inputElement => {
				/*
					Перерисовать <input>'ы чтобы их отображение
					соответствовало их внутреннему состоянию checked.
				*/
				// inputElement.outerHTML = inputElement.outerHTML
			// })

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
		// Поставить атрибут checked выбранному <input>'у.
		inputCheckElement = cardElement.querySelector('.form-check > input')

		if (data.question5.confirm === true) {
			inputCheckElement.checked = true
		}

		else {
			inputCheckElement.checked = false
		}

		// email address matching pattern
		const pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i
		let isEmailValid = false

		// Проверка валидный ли email?
		if ((data.question5.email).match(pattern) !== null) {
			isEmailValid = true
		}

		// Если в карточке № 5 есть ответ:
		if (data.question5.name && isEmailValid && data.question5.confirm) {
			// Сделать кнопку "Далее" доступной.
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