// Обработка 3-ой карточки.

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
    
// Функция изменяет состояние элементов на 3-ей карточке.
function showCard3 () {
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