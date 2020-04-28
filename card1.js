// Обработка 1-ой карточки.

// Повесить обработчик клика на кнопку "Начать".
document
	.querySelector('[data-start]')
	.addEventListener('click', () => {
		// Показать 2-ю карточку.
		data.currentCardNumber = 2
		showCard(2)
	})