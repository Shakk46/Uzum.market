// Assets
const doc = document
const body = doc.body
const header = doc.querySelector('.header')
const main = doc.querySelector('.main')

function createDOMElement(type, className, textCont) {
    const element = doc.createElement(type)
    element.className = className
    element.textContent = textCont
}



// Анимация расширения поиска
const searchBarAdapt = doc.querySelector('.search-bar-adapt')
const searchBarInput = doc.querySelector('.search-bar-adapt input')
const searchBarClose = doc.querySelector('.search__close')

searchBarInput.addEventListener('click', () => {
    searchBarAdapt.classList.add('search-bar-adapt__focus')
    searchBarClose.style = 'display:block'
})

searchBarClose.addEventListener('click', () => {
    searchBarAdapt.classList.remove('search-bar-adapt__focus')
    searchBarClose.style = 'display:none;'
})

// Каталог комп версия 
const catalog = doc.querySelector('.catalog')
// Линк "Ещё"
const more = doc.querySelector('#more')
const catalogMenu = doc.querySelector('.catalog-menu')

catalog.addEventListener('click', () => {
    catalogMenu.classList.toggle('active')
})
more.addEventListener('click', () => {
    catalogMenu.classList.toggle('active')
})

