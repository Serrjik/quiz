// Обработка 5-ой карточки.

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
    
// Функция изменяет состояние элементов на 5-ой карточке.
function showCard5 () {
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
