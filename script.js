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
	document.querySelector(`[data-card="${n}"]`).style.display = ''
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