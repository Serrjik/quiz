// Обработка 4-ой карточки.

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
    
// Функция изменяет состояние элементов на 4-ой карточке.
function showCard4 () {
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
