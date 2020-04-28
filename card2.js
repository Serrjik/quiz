// Обработка 2-ой карточки.

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
    
// Функция изменяет состояние элементов на 2-ой карточке.
function showCard2 () {
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